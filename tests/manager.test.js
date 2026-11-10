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
test('the saved station survives a bad save',()=>{assert.deepEqual(migrateManager(null),{at:-1,met:false,xp:0,called:false,avatar:'blazer-woman'});assert.deepEqual(migrateManager({at:3,met:true,xp:7.9,called:true,avatar:'trench-coat'}),{at:3,met:true,xp:7,called:true,avatar:'trench-coat'});assert.deepEqual(migrateManager({at:9,met:'yes',xp:-4,called:1,avatar:'security-guard'}),{at:-1,met:false,xp:0,called:false,avatar:'blazer-woman'});});
import {floorSpot} from '../src/manager.js';
test('a floor tap lands on the top slab it hits, kept inside its edges',()=>{
  const floors=[{y:0,x:.75,z:2.475,w:24.5,d:18.95},{y:4.7,z:-2.95,w:18,d:7.4},{y:9.4,z:-3.6,w:13,d:6.6}];
  // The same screen point lands further back on higher floors (a plain stand-in for the camera).
  const ground=y=>({x:2,z:3-y*.8});
  const top=floorSpot(ground,floors);assert.equal(top.floor,2);assert.equal(top.y,9.4);
  const ground2=y=>({x:-11.4,z:8});const g=floorSpot(ground2,floors);assert.equal(g.floor,0);assert.ok(g.x>=-11.5+.6-1e-9);
  assert.equal(floorSpot(()=>({x:40,z:40}),floors),null);});

import {CALL_FIRST,CALL_EVERY,CALL_AFTER_MISS,CALL_LASTS,CALL_WORK,LEVEL_CALLS,MANAGER_MAX,managerLevel,levelProgress,handsOnAt,callSeconds,callPay,createCalls,tickCalls} from '../src/manager.js';
const allBuilt=[true,true,true,true,true,true];
test('a call opens away from the manager, waits while they walk, and is handled by standing there',()=>{
  const w=createWalker(spots[4]);w.target=4;const c=createCalls();
  assert.equal(tickCalls(c,CALL_FIRST-1,w,allBuilt,0),null);
  for(const roll of [0,.5,.999,1]){const d=createCalls();const ev=tickCalls(d,CALL_FIRST,w,allBuilt,roll);assert.equal(ev.type,'open');assert.notEqual(ev.station,4);}
  const ev=tickCalls(c,1,w,allBuilt,0);assert.deepEqual(ev,{type:'open',station:0});
  assert.equal(tickCalls(c,10,w,allBuilt),null);assert.equal(c.call.left,CALL_LASTS-10);
  sendTo(w,0,spots[0]);assert.equal(tickCalls(c,500,w,allBuilt),null,'the clock stops while the manager is on the way');assert.equal(c.call.left,CALL_LASTS-10);
  while(w.moving)stepWalker(w,.1);
  assert.equal(tickCalls(c,CALL_WORK-.5,w,allBuilt),null);assert.deepEqual(tickCalls(c,.5,w,allBuilt),{type:'done',station:0});
  assert.equal(c.call,null);assert.equal(c.wait,CALL_EVERY);});
test('a call left alone closes with nothing lost, and one built station never calls itself',()=>{
  const w=createWalker(spots[4]);w.target=4;const c=createCalls();tickCalls(c,CALL_FIRST,w,allBuilt,.3);
  assert.deepEqual(tickCalls(c,CALL_LASTS,w,allBuilt),{type:'missed',station:1});assert.equal(c.wait,CALL_AFTER_MISS);
  const only=createCalls();assert.equal(tickCalls(only,CALL_FIRST,w,[false,false,false,false,true,false],.5),null);assert.equal(only.call,null);
  assert.equal(tickCalls(createCalls(),0,w,allBuilt),null);assert.equal(tickCalls(createCalls(),99,null,allBuilt),null);});
test('levels rise with calls handled and raise the hands-on speed and the pay',()=>{
  assert.equal(managerLevel(0),1);assert.equal(managerLevel(2),1);assert.equal(managerLevel(3),2);assert.equal(managerLevel(1e9),MANAGER_MAX);
  LEVEL_CALLS.forEach((n,i)=>assert.equal(managerLevel(n),i+1));
  assert.deepEqual(levelProgress(5),{level:2,share:.4,left:3,max:false});assert.equal(levelProgress(999).max,true);
  assert.equal(handsOnAt(1),HANDS_ON);assert.equal(handsOnAt(MANAGER_MAX),2.4);assert.equal(handsOnAt(99),2.4);
  for(let l=2;l<=MANAGER_MAX;l++){assert.ok(handsOnAt(l)>handsOnAt(l-1));assert.ok(callSeconds(l)>callSeconds(l-1));}
  assert.equal(callPay(100,1),1000);assert.equal(callPay(0,1),25);assert.equal(callPay(NaN,3),25);assert.equal(callPay(100,MANAGER_MAX),2800);
  const w=createWalker(spots[2]);w.target=2;assert.equal(handsOn(w,2,4),1.8);assert.equal(handsOn(w,3,4),1);});

import {AVATARS,avatarId} from '../src/manager.js';import {existsSync} from 'node:fs';
test('every manager avatar has its model and its portrait, and an unknown look falls back to the first',()=>{
  assert.ok(AVATARS.length>=6);assert.equal(new Set(AVATARS.map(a=>a.id)).size,AVATARS.length);
  for(const a of AVATARS){assert.ok(existsSync('public/models/people/'+a.id+'.glb'),a.id+' model');assert.ok(existsSync('public/guide/avatars/'+a.id+'.webp'),a.id+' portrait');assert.ok(a.name);}
  assert.equal(avatarId('nope'),AVATARS[0].id);assert.equal(avatarId(AVATARS[2].id),AVATARS[2].id);});
