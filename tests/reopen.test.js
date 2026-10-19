import test from 'node:test';import assert from 'node:assert/strict';
import {migrateRun,freshRun,tickRun,paybackSeconds,reopenMoment,REOPEN_PAYBACK,REPLAY_SPEED} from '../src/reopen.js';
const offer=(gain,shares=0)=>({eligible:gain>=1,gain,current:1+shares*.05,multiplier:1+(shares+gain)*.05});
test('the curve records when income first reached each level',()=>{
  const run=freshRun();
  for(let t=0;t<3600;t++)tickRun(run,1,10*2**(t/600));// income doubles every 10 minutes
  // A shop earning 1.5x per sale gets back to today's ~$640/s about 5.8 minutes sooner than this run did.
  const s=paybackSeconds(run,640,1.5);assert.ok(s>=3249&&s<3420,String(s));
  assert.equal(paybackSeconds(run,640,1000),0);
  assert.equal(paybackSeconds({time:5,curve:null},640,2),null);
});
test('the card shows only when payback is under 20 minutes',()=>{
  // Fast start, then a plateau: income doubles every minute for ten minutes, then creeps up.
  const run=freshRun();for(let t=0;t<3000;t++)tickRun(run,1,t<600?100*2**(t/60):102400+(t-600));
  const rate=104800;
  assert.equal(reopenMoment(offer(0),run,rate),null);
  assert.equal(reopenMoment(offer(1,20),run,rate),null,'+1 share on 20 does not double base sales');
  assert.equal(reopenMoment(offer(10),run,rate),null,'+50% is not enough');
  const climbing=freshRun();for(let t=0;t<3000;t++)tickRun(climbing,1,100*2**(t/300));
  assert.equal(reopenMoment(offer(20),climbing,100*2**10),null,'a run still climbing fast is not worth reopening');
  const m=reopenMoment(offer(20),run,rate);assert.ok(m&&m.minutes<=REOPEN_PAYBACK/60,JSON.stringify(m));assert.equal(m.gain,20);
  // The estimate is the curve's time sped up by REPLAY_SPEED.
  assert.equal(m.minutes,Math.ceil(paybackSeconds(run,rate,2)/REPLAY_SPEED/60));
});
test('old saves only need the doubling',()=>{
  const run=migrateRun(undefined);assert.equal(run.curve,null);
  assert.equal(reopenMoment(offer(10,20),run,1e6),null);assert.equal(reopenMoment(offer(20,20),run,1e6),null);assert.equal(reopenMoment(offer(40,20),run,1e6).minutes,null);
});
test('migration keeps a valid curve and drops junk',()=>{
  assert.deepEqual(migrateRun({time:100,curve:[0,5,'x',500]}),{time:100,curve:[0,5,null,100]});
  assert.deepEqual(migrateRun({time:-3,curve:[]}),{time:0,curve:[]});
});
