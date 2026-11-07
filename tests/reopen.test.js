import test from 'node:test';import assert from 'node:assert/strict';
import {migrateRun,freshRun,tickRun,paybackSeconds,reopenMoment,REOPEN_PAYBACK,REPLAY_SPEED,SURE_RATIO} from '../src/reopen.js';
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
  assert.deepEqual(migrateRun({time:100,curve:[0,5,'x',500]}),{time:100,offered:false,curve:[0,5,null,100]});
  assert.deepEqual(migrateRun({time:-3,offered:true,curve:[]}),{time:0,offered:true,curve:[]});
});
test('once shown, the card stays up while the gain keeps rising',()=>{
  const run=freshRun();for(let t=0;t<3000;t++)tickRun(run,1,100*2**(t/300));// still doubling every 5 minutes
  assert.equal(reopenMoment(offer(20),run,100*2**10),null,'never shown and too slow: hidden');
  // Shown once at 30 min...
  const early=freshRun();for(let t=0;t<1800;t++)tickRun(early,1,t<600?100*2**(t/60):102400+(t-600));
  assert.ok(reopenMoment(offer(20),early,103600));assert.equal(early.offered,true);
  // ...then the run climbs again for hours: the card keeps showing, without a minutes estimate.
  for(let t=0;t<3*3600;t++)tickRun(early,1,103600*2**(t/900));
  const m=reopenMoment(offer(400),early,103600*2**12);assert.ok(m);assert.equal(m.minutes,null);assert.equal(m.gain,400);
  assert.equal(migrateRun(JSON.parse(JSON.stringify(early))).offered,true,'survives a reload');
  assert.equal(freshRun().offered,false,'a new run starts hidden');
});
test('a 3 h curve with a ratio over 10 still returns a moment',()=>{
  const run=freshRun();for(let t=0;t<3*3600;t++)tickRun(run,1,10*2**(t/600));
  assert.equal(reopenMoment(offer(20),run,10*2**18),null,'a 2x jump on the same curve stays hidden');
  const o=offer(200);assert.ok(o.multiplier/o.current>=SURE_RATIO);
  const m=reopenMoment(o,run,10*2**18);assert.ok(m,'shown');assert.equal(m.minutes,null);
});
