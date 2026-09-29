import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {characterPose,characterHand} from '../src/character-animation.js';
import {CHARACTER_CLIPS} from '../src/character-clips.js';
import {createNativeMap,NATIVE_STRIDE} from '../src/native-map.js';
test('character loops remain within their pose atlas and hand attachment stays finite',()=>{
 for(let i=-100;i<300;i++){const pose=characterPose({phase:i*.73,amount:(i%10)/9},i*293,4);for(const [field,name] of [['idle','idle'],['walk','walking']]){const clip=CHARACTER_CLIPS[name];assert.ok(pose[field]>=clip.offset&&pose[field]<clip.offset+clip.frames)}assert.ok(characterHand(pose).every(Number.isFinite));assert.ok(pose.blend>=0&&pose.blend<=1)}
 assert.deepEqual(characterPose({still:true,amount:1,phase:8},8000,4),characterPose({still:true},0,0));
});
test('native character assets match the GPU vertex and animation layouts',()=>{
 const root=new URL('../ios/App/App/Characters/',import.meta.url);const info=JSON.parse(fs.readFileSync(new URL('TieDye.json',root)));assert.equal(fs.statSync(new URL('TieDye.vertices',root)).size,info.vertices*80);assert.equal(fs.statSync(new URL('TieDye.indices',root)).size,info.indices*4);assert.equal(fs.statSync(new URL('TieDye.poses',root)).size,info.totalFrames*info.bones*64);
});
test('custom customers use the skinned mesh while staff and unavailable assets retain procedural people',()=>{
 const capture=(available,id=0,employee=false,bag=false)=>{let packet;const m=createNativeMap({canopyNativeMapAvailable:true,canopyNativeCharacterAvailable:available,webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}});m.begin({width:390,height:844,x:195,y:300,unit:40,angle:.57});m.person(0,0,0,id,employee,bag,{amount:1,phase:2,heading:1},400);m.finish();const b=Buffer.from(packet.data,'base64'),f=new Float32Array(b.buffer,b.byteOffset,b.length/4),r=[];for(let i=0;i<f.length;i+=NATIVE_STRIDE)r.push([...f.slice(i,i+NATIVE_STRIDE)]);return r};
 assert.equal(capture(true).filter(r=>r[3]===4).length,1);assert.ok(capture(true,0,false,true).length>1);for(const args of [[false],[true,0,true]])assert.ok(capture(...args).every(r=>r[3]!==4));assert.ok(capture(true,0,false,true).flat().every(Number.isFinite));
});

test('caramel has its own animation atlas and coexists with tie-dye customers',async()=>{
 const {CHARACTER_CLIPS:clips}=await import('../src/caramel-clips.js');
 for(let i=-100;i<100;i++){const pose=characterPose({phase:i*.83,amount:.6},i*257,2,'Caramel');for(const [field,key] of [['idle','idle'],['walk','walking']])assert.ok(pose[field]>=clips[key].offset&&pose[field]<clips[key].offset+clips[key].frames);assert.ok(characterHand(pose,'Caramel').every(Number.isFinite))}
 const root=new URL('../ios/App/App/Characters/',import.meta.url),info=JSON.parse(fs.readFileSync(new URL('Caramel.json',root)));for(const [ext,bytes] of [['vertices',info.vertices*80],['indices',info.indices*4],['poses',info.totalFrames*info.bones*64]])assert.equal(fs.statSync(new URL('Caramel.'+ext,root)).size,bytes);
 const capture=available=>{let packet;const m=createNativeMap({canopyNativeMapAvailable:true,canopyNativeCharacterAvailable:true,canopyNativeCaramelAvailable:available,webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}});m.begin({width:390,height:844,x:195,y:300,unit:40,angle:.57});for(const id of [0,1])m.person(id,0,0,id,false,true,{amount:1,phase:2,heading:1},400);m.person(4,0,0,2,true,false,{},0);m.finish();const b=Buffer.from(packet.data,'base64'),f=new Float32Array(b.buffer,b.byteOffset,b.length/4),types=[];for(let i=3;i<f.length;i+=NATIVE_STRIDE)types.push(f[i]);assert.ok([...f].every(Number.isFinite));return types};
 const types=capture(true);assert.equal(types.filter(t=>t===4).length,1);assert.equal(types.filter(t=>t===5).length,1);assert.ok(!capture(false).includes(5));
});

test('every native customer selects one of the eleven imports, with independent fallback',()=>{
 const root=new URL('../ios/App/App/Characters/',import.meta.url),names=['TieDye','Caramel','Beanie','Cream','Bearded','Chef','Colorful','Blazer','Office','Plaid','Utility'];for(const name of names){const info=JSON.parse(fs.readFileSync(new URL(name+'.json',root)));for(const [ext,bytes] of [['vertices',info.vertices*80],['indices',info.indices*4],['poses',info.totalFrames*info.bones*64]])assert.equal(fs.statSync(new URL(name+'.'+ext,root)).size,bytes)}
 const capture=kinds=>{let packet;const m=createNativeMap({canopyNativeMapAvailable:true,canopyNativeCharacterKinds:kinds,webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}});m.begin({width:390,height:844,x:195,y:300,unit:40,angle:.57});for(let id=0;id<55;id++)m.person(id,0,0,id,false,false,{},0);m.finish();const b=Buffer.from(packet.data,'base64'),f=new Float32Array(b.buffer,b.byteOffset,b.length/4),types=[];for(let id=3;id<f.length;id+=NATIVE_STRIDE)types.push(f[id]);return types};
 const all=Array.from({length:11},(_,i)=>i+4),types=capture(all);assert.equal(types.length,55);assert.ok(types.every(type=>all.includes(type)));assert.deepEqual(all.map(type=>types.filter(t=>t===type).length),Array(11).fill(5));assert.ok(capture([6]).every(type=>type===6));
 const nearIdle=characterPose({amount:.01},0),nearWalk=characterPose({amount:.99},0);assert.ok(nearIdle.blend<.001);assert.ok(nearWalk.blend>.999);
});

test('security uses its own rig and older staff-only bundles retain their two uniforms',()=>{
 const root=new URL('../ios/App/App/Characters/',import.meta.url);for(const name of ['Security','GreenMan','GreenWoman']){const info=JSON.parse(fs.readFileSync(new URL(name+'.json',root)));for(const [ext,bytes] of [['vertices',info.vertices*80],['indices',info.indices*4],['poses',info.totalFrames*info.bones*64]])assert.equal(fs.statSync(new URL(name+'.'+ext,root)).size,bytes)}
 let packet;const m=createNativeMap({canopyNativeMapAvailable:true,canopyNativeCharacterKinds:[15,16,17],webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}});m.begin({width:390,height:844,x:195,y:300,unit:40,angle:.57});m.person(0,0,0,4,true,false,{role:'security'},0);m.person(0,0,0,0,true,false,{},0);m.person(0,0,0,1,true,false,{},0);m.finish();const b=Buffer.from(packet.data,'base64'),f=new Float32Array(b.buffer,b.byteOffset,b.length/4),types=[];for(let i=3;i<f.length;i+=NATIVE_STRIDE)types.push(f[i]);assert.deepEqual(types,[15,16,17]);
});

test('revised staff atlases and five-character roster stay separate from security',()=>{
 const root=new URL('../ios/App/App/Characters/',import.meta.url);
 for(const name of ['GrayEmployee','DarkHairedEmployee','YoungEmployee']){
  const info=JSON.parse(fs.readFileSync(new URL(name+'.json',root)));
  for(const [ext,bytes] of [['vertices',info.vertices*80],['indices',info.indices*4],['poses',info.totalFrames*info.bones*64]])assert.equal(fs.statSync(new URL(name+'.'+ext,root)).size,bytes);
  for(let i=0;i<200;i++){const pose=characterPose({amount:.6,phase:i*.73},i*197,3,name);for(const [field,key] of [['idle','idle'],['walk','walking']])assert.ok(pose[field]>=info.clips[key].offset&&pose[field]<info.clips[key].offset+info.clips[key].frames);assert.ok(characterHand(pose,name).every(Number.isFinite))}
 }
 const capture=kinds=>{let packet;const m=createNativeMap({canopyNativeMapAvailable:true,canopyNativeCharacterKinds:kinds,webkit:{messageHandlers:{canopyMap:{postMessage:p=>packet=p}}}});m.begin({width:390,height:844,x:195,y:300,unit:40,angle:.57});for(let id=0;id<10;id++)m.person(0,0,0,id,true,false,{},0);m.person(0,0,0,4,true,false,{role:'security'},0);m.finish();const b=Buffer.from(packet.data,'base64'),f=new Float32Array(b.buffer,b.byteOffset,b.length/4),types=[];for(let i=3;i<f.length;i+=NATIVE_STRIDE)types.push(f[i]);return types};
 assert.deepEqual(capture([15,16,17,18,19,20]),[15,16,16,17,17,18,18,19,19,20,20]);
 assert.deepEqual(capture([15,18]),[15,...Array(10).fill(18)]);
 assert.ok(capture([15]).every(kind=>kind<=3||kind===15));
});

test('native renderer validates packet kinds against its loaded roster, not the old kind-17 limit',()=>{
 const swift=fs.readFileSync(new URL('../ios/App/App/CanopyMapRenderer.swift',import.meta.url),'utf8');
 assert.match(swift,/let highestKind = Float\(max\(3, characters\.keys\.max\(\) \?\? 3\)\)/);
 assert.match(swift,/r\.positionType\.w <= highestKind/);
 assert.match(swift,/r\.positionType\.w\.rounded\(\.towardZero\) == r\.positionType\.w/);
 for(const [kind,name] of [[18,'GrayEmployee'],[19,'DarkHairedEmployee'],[20,'YoungEmployee']])assert.ok(swift.includes(`${kind}: "${name}"`));
});
