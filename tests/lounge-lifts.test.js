import test from 'node:test';
import assert from 'node:assert/strict';
import {makeLifts,tickLifts,LIFT_SEATS,LIFT_CLEAR} from '../src/lounge-lifts.js';

let asks=0;
const guest=(id,lift,extra={})=>({id,phase:'lounge',lift,liftAsk:++asks,liftShaft:null,shaft:0,...extra});
// Runs the cabs (and the roof walk main.js drives) in 0.05 s steps, recording each cab's floor every step.
function run(lifts,customers,seconds,onStep){
  const left=[];
  for(let t=0;t<seconds;t+=.05){
    customers.forEach(c=>{if(c.lift==='roof')c.roofWalk=Math.min(1,c.roofWalk+.05/3)});
    tickLifts(lifts,customers,.05,{leave:c=>{c.phase='leaving';left.push(c)}});
    onStep&&onStep();
  }
  return left;
}

test('the cab waits on the ground until every guest it takes has stepped in',()=>{
  const lifts=makeLifts(),customers=[1,2,3,4].map(id=>guest(id,'waitUp'));
  let leftWithBoarders=false;
  run(lifts,customers,30,()=>{if(lifts[0].y>0&&customers.some(c=>c.lift==='boarding'&&c.liftShaft===0&&lifts[0].boarding===null))leftWithBoarders=true});
  assert.equal(leftWithBoarders,false);
  assert.ok(customers.slice(0,LIFT_SEATS).every(c=>c.lift==='roof'),'the first three rode up together');
});

test('on the roof the cab stays until every rider is out of the door before going back down',()=>{
  const lifts=makeLifts(),customers=[1,2,3].map(id=>guest(id,'waitUp'));
  let departedEarly=false,wasUp=false;
  run(lifts,customers,8,()=>{
    if(lifts[0].y===1)wasUp=true;
    // Someone on the roof asks to go down as soon as they can, which would pull the cab away.
    if(wasUp&&!customers.some(c=>c.id===9))customers.push(guest(9,'waitDown',{lift:'waitDown'}));
    if(wasUp&&lifts[0].y<1&&customers.some(c=>c.lift==='roof'&&c.roofWalk<LIFT_CLEAR))departedEarly=true;
  });
  assert.ok(wasUp);
  assert.equal(departedEarly,false);
});

test('riders coming down all step out before the cab takes anyone else, then head for the back door',()=>{
  const lifts=makeLifts();lifts[0].y=1;
  const customers=[1,2].map(id=>guest(id,'waitDown'));
  let movedWithExiting=false;
  const left=run(lifts,customers,12,()=>{
    if(customers.length===2&&lifts[0].y===0&&customers.every(c=>c.lift==='exit'))customers.push(guest(3,'waitUp'));
    if(lifts[0].y>0&&lifts[0].y<1&&customers.some(c=>c.lift==='exit'))movedWithExiting=true;
  });
  assert.equal(movedWithExiting,false);
  assert.deepEqual(left.map(c=>c.id),[1,2]);
  assert.equal(customers[2].lift,'roof','the next guest rode up after they were out');
});

test('a guest who vanishes mid-ride does not jam the cab',()=>{
  const lifts=makeLifts(),customers=[guest(1,'waitUp'),guest(2,'waitUp')];
  run(lifts,customers,1);
  customers.splice(0,2);
  run(lifts,customers,10);
  assert.equal(lifts[0].boarding,null);assert.equal(lifts[0].unloading,null);assert.equal(lifts[0].trip,null);
});
