import test from 'node:test';
import assert from 'node:assert/strict';
import {colorRGBA,nativeProjection,createNativeMap,NATIVE_STRIDE} from '../src/native-map.js';
test('native map preserves fixed projection for labels and focal zoom',()=>{
 const c={x:195,y:310,unit:12,angle:.57},p=[-3,9.4,-3],screen=nativeProjection(p,c);
 const expected=[195+(-3*Math.cos(.57)+3*Math.sin(.57))*12,310+((-3*Math.sin(.57)-3*Math.cos(.57))*.5-9.4)*12];
 assert.deepEqual(screen,expected);
 const scale=2,anchor=[160,200],next={...c,unit:c.unit*scale,x:anchor[0]-(anchor[0]-c.x)*scale,y:anchor[1]-(anchor[1]-c.y)*scale};
 assert.deepEqual(nativeProjection(p,next),screen.map((n,i)=>anchor[i]+(n-anchor[i])*scale));
});
test('native material alpha combines tint and construction fade',()=>{
 assert.deepEqual(colorRGBA('#ff800080',.5),[1,128/255,0,64/255]);
 assert.deepEqual(colorRGBA('rgba(10,20,30,0.4)',.5),[10/255,20/255,30/255,.2]);
 assert.equal(colorRGBA({gradient:true}),null);
});
test('native packets contain finite world geometry, concave faces and bounded submission',()=>{
 let packet;const env={canopyNativeMapAvailable:true,webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}};
 const map=createNativeMap(env);map.begin({width:390,height:844,x:195,y:300,unit:12,angle:.57});
 map.box(0,0,0,3,2,1,'#cfb184');map.plant(1,2,1,1,2,.9);map.jar(1,0,1,1);map.person(2,2,0,3,false,true,{amount:1,phase:1},0);
 map.line([[0,2,0],[0,0,0]],'#aaaaaa',.1);
 const ps=[[0,0],[2,0],[2,2],[1,1],[0,2]].map(([x,z])=>map.project({x:x*12,y:z*6},x,0,z));map.poly(ps,'#abcdef');
 map.finish();assert.equal(packet.version,1);const b=Buffer.from(packet.data,'base64');assert.equal(b.length%(NATIVE_STRIDE*4),0);
 const floats=new Float32Array(b.buffer,b.byteOffset,b.length/4);assert.ok([...floats].every(Number.isFinite));
 let triangles=0;for(let i=0;i<floats.length;i+=NATIVE_STRIDE)if(floats[i+3]===3)triangles++;assert.equal(triangles,3);
 assert.equal(map.available(performance.now()),false);assert.equal(map.available(performance.now()+3000),true);assert.equal(map.enabled,false);
});
test('web build does not activate native graphics without the installed bridge',()=>{assert.equal(createNativeMap({}),null)});

test('native herringbone clips diagonal boards to every floor edge',async()=>{
 const {herringboneBoards}=await import('../src/native-map.js');const floor={w:7.7,d:6.3,z:-2};const boards=herringboneBoards(floor);let area=0,slopes=new Set();
 for(const board of boards){assert.ok(board.length>=3);for(let i=0;i<board.length;i++){const [x,z]=board[i],next=board[(i+1)%board.length];assert.ok(x>=-floor.w/2-1e-8&&x<=floor.w/2+1e-8&&z>=floor.z-floor.d/2-1e-8&&z<=floor.z+floor.d/2+1e-8);area+=(x*next[1]-next[0]*z)/2;if(Math.abs(next[0]-x)>.01&&Math.abs(next[1]-z)>.01)slopes.add(Math.round((next[1]-z)/(next[0]-x)))}}
 assert.ok(Math.abs(area-floor.w*floor.d)<1e-8,'boards cover the floor without gaps or overlap');assert.deepEqual([...slopes].sort(),[-1,1]);
});
test('native details retain leaf direction and worker/fan animation',()=>{
 const meta={width:390,height:844,x:195,y:300,unit:20,angle:.57};
 const capture=draw=>{let packet;const map=createNativeMap({canopyNativeMapAvailable:true,webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}});map.begin(meta);draw(map);map.finish();const b=Buffer.from(packet.data,'base64');const floats=new Float32Array(b.buffer,b.byteOffset,b.length/4);assert.ok([...floats].every(Number.isFinite));return {data:packet.data,floats}};
 for(const a of [0,Math.PI/2,-Math.PI/3]){const r=capture(m=>{m.project({x:195,y:300},0,0,0);m.leaf(195,300,20,a,'#abcdef')});let tip=false;for(let i=0;i<r.floats.length;i+=NATIVE_STRIDE)for(const offset of [0,4,8]){const p=nativeProjection([...r.floats.slice(i+offset,i+offset+3)],meta);if(Math.hypot(p[0]-(195+20*Math.cos(a)),p[1]-(300+20*Math.sin(a)))<.001)tip=true}assert.ok(tip,'leaf tip follows its source angle')}
 const person=(m,cycle)=>m.person(0,0,0,1,true,false,{workActivity:1,workCycle:cycle,workTime:cycle*1000,amount:0,phase:0},0);
 assert.notEqual(capture(m=>person(m,0)).data,capture(m=>person(m,1)).data,'working hands and watering can move');
 assert.notEqual(capture(m=>m.fan(0,0,0,0)).data,capture(m=>m.fan(0,0,0,3000)).data,'native rotor rotates');
});

test('pendant uses one globe and service arches have continuous opaque rails',()=>{
 const capture=draw=>{let packet;const map=createNativeMap({canopyNativeMapAvailable:true,webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}});map.begin({width:390,height:844,x:195,y:300,unit:40,angle:.57});draw(map);map.finish();const b=Buffer.from(packet.data,'base64'),floats=new Float32Array(b.buffer,b.byteOffset,b.length/4),records=[];for(let i=0;i<floats.length;i+=NATIVE_STRIDE)records.push([...floats.slice(i,i+NATIVE_STRIDE)]);return records};
 const pendant=capture(m=>m.pendant(2,3,4));const globes=pendant.filter(r=>r[3]===1);assert.equal(globes.length,1,'no intersecting highlight globes');assert.ok(globes[0][7]>.5,'globe contributes fixture lighting');assert.equal(globes[0][4],globes[0][5]);assert.equal(globes[0][5],globes[0][6]);
 for(const [half,rise] of [[1.16,.72],[1.95,1.25]]){const arch=capture(m=>m.arch(0,3.75,2.45,half,rise));assert.ok(arch.length>0);assert.ok(arch.every(r=>r[3]===3&&r[15]===1&&r.every(Number.isFinite)),'solid triangles replace overlapping capped tubes');const wood=arch.filter(r=>r[7]===0),light=arch.filter(r=>r[7]===1);assert.ok(wood.length&&light.length);assert.ok(light.every(r=>r[2]>3.85&&r[6]>3.85&&r[10]>3.85),'light inlay stays in front of the rail');}
});
