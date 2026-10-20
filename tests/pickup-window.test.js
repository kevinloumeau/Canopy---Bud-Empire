import test from 'node:test';
import assert from 'node:assert/strict';
import {walkupShare,walkupCount,windowSlot,createWindowLine,addWalkups,stepWindowLine,windowFigures,WINDOW_LINE_MAX} from '../src/pickup-window.js';

const stairs=()=>[[18,-2.2,7],[18,-2.2,8.2],[18,0,12.1],[17.8,0,13.1]];
const HIDDEN=7.9;

test('one online order in three is a walk-up, counted by order number',()=>{
  assert.deepEqual([0,1,2,3,4,5].map(walkupShare),[false,false,true,false,false,true]);
  assert.equal(walkupCount(0,3),1);assert.equal(walkupCount(46,10),3);assert.equal(walkupCount(5,0),0);
});
test('the line holds a fixed number and turns the rest back to the drones',()=>{
  const line=createWindowLine();
  assert.equal(addWalkups(line,4,stairs),4);assert.equal(addWalkups(line,10,stairs),WINDOW_LINE_MAX-4);assert.equal(addWalkups(line,1,stairs),0);
});
test('walk-ups climb out, queue in place, are served one at a time and go back down with a bag',()=>{
  const line=createWindowLine();addWalkups(line,3,stairs);
  assert.equal(windowFigures(line,HIDDEN).length,0,'everyone starts out of sight');
  const served=new Set();let sawServing=false;
  for(let t=0;t<120;t+=.1){
    sawServing=stepWindowLine(line,.1,stairs)||sawServing;
    line.people.forEach(p=>{if(p.bag)served.add(p.id)});
    assert.ok(line.people.filter(p=>p.phase==='queue'&&p.serve>0&&!p.bag).length<=1,'one at the hatch at a time');
    if(t>14&&t<15){const q=line.people.filter(p=>p.phase==='queue');if(q.length)assert.deepEqual({x:q[0].x,z:q[0].z},windowSlot(0))}
  }
  assert.ok(sawServing);assert.equal(line.people.length,0,'all three went back down');
  assert.equal(served.size,3);
});
test('places run back along the pavement from the hatch',()=>{
  const a=windowSlot(0),b=windowSlot(1),c=windowSlot(2);
  assert.ok(b.x<a.x&&c.x<b.x);assert.equal(b.z,c.z);
});
test('figures face the hatch while standing and never show below the stairs',()=>{
  const line=createWindowLine();addWalkups(line,2,stairs);
  for(let t=0;t<30;t+=.1){stepWindowLine(line,.1,stairs);windowFigures(line,HIDDEN).forEach(f=>{assert.ok(f.z>HIDDEN);if(!f.moving)assert.equal(f.facing,1)})}
});
