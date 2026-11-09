import test from 'node:test';import assert from 'node:assert/strict';
import {HANDS_ON,FLOOR_Y,STATION_FLOOR,workSpots,route,createWalker,sendTo,stepWalker,handsOn,migrateManager} from '../src/manager.js';
const machinePos=[{x:-3,z:-3,y:9.4},{x:3,z:-3,y:9.4},{x:3,z:-.3,y:4.7},{x:-3,z:-.3,y:4.7},{x:-2.8,z:2.5,y:0},{x:5.2,z:2.5,y:0}];
const spots=workSpots(machinePos,{x:-2.8,z:2.5});
test('every station has a spot on its own floor',()=>{spots.forEach((s,i)=>assert.equal(s.y,FLOOR_Y[STATION_FLOOR[i]]));});
test('a route ends on the spot and only changes height on the stairs',()=>{
  for(let a=0;a<6;a++)for(let b=0;b<6;b++){const pts=route(spots[a],spots[b]),end=pts[pts.length-1]||spots[a];
    assert.ok(Math.hypot(end.x-spots[b].x,end.z-spots[b].z)<1e-9&&end.y===spots[b].y,a+'->'+b);
    let prev=spots[a];for(const p of pts){if(p.y!==prev.y)assert.ok(p.stair||prev.stair,'height changes only on a stair '+a+'->'+b);prev=p;}
    const climbs=pts.filter(p=>p.stair).length;assert.equal(climbs>0,STATION_FLOOR[a]!==STATION_FLOOR[b]);}});
test('the walker gets there, and hands-on counts only once it stands still at the station',()=>{
  const w=createWalker(spots[4]);w.target=4;assert.equal(handsOn(w,4),HANDS_ON);
  assert.equal(sendTo(w,0,spots[0]),true);assert.equal(handsOn(w,0),1,'walking');assert.equal(handsOn(w,4),1);
  let t=0;while(w.moving&&t<120){stepWalker(w,.1);t+=.1;}
  assert.ok(!w.moving&&t<60,'reaches the top floor in under a minute: '+t.toFixed(1));assert.equal(w.y,FLOOR_Y[2]);assert.equal(handsOn(w,0),HANDS_ON);
  assert.ok(w.ground>5);assert.equal(sendTo(w,0,spots[0]),false,'already there');});
test('the saved station survives a bad save',()=>{assert.deepEqual(migrateManager(null),{at:-1,met:false});assert.deepEqual(migrateManager({at:3,met:true}),{at:3,met:true});assert.deepEqual(migrateManager({at:9,met:'yes'}),{at:-1,met:false});});
import {floorSpot} from '../src/manager.js';
test('a floor tap lands on the top slab it hits, kept inside its edges',()=>{
  const floors=[{y:0,x:.75,z:2.475,w:24.5,d:18.95},{y:4.7,z:-2.95,w:18,d:7.4},{y:9.4,z:-3.6,w:13,d:6.6}];
  // The same screen point lands further back on higher floors (a plain stand-in for the camera).
  const ground=y=>({x:2,z:3-y*.8});
  const top=floorSpot(ground,floors);assert.equal(top.floor,2);assert.equal(top.y,9.4);
  const ground2=y=>({x:-11.4,z:8});const g=floorSpot(ground2,floors);assert.equal(g.floor,0);assert.ok(g.x>=-11.5+.6-1e-9);
  assert.equal(floorSpot(()=>({x:40,z:40}),floors),null);});
