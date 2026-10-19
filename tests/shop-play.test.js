import test from 'node:test';
import assert from 'node:assert/strict';
import {migrateShopPlay,createMoment,judgeChoice,tickShift,recordServed,shiftAdvice,tipFor,shiftTimeLeft,SHIFT_SECONDS} from '../src/shop-play.js';

test('old saves get a fresh shop activity state and bad values are clamped',()=>{
  const p=migrateShopPlay(undefined);
  assert.equal(p.cooldown,35);assert.equal(p.sequence,0);assert.equal(p.recap,null);assert.equal(p.shift.seconds,0);
  const q=migrateShopPlay({cooldown:500,sequence:-4,tips:NaN,shift:{seconds:9999,served:3},recap:{served:2},recapUnread:true});
  assert.equal(q.cooldown,90);assert.equal(q.sequence,0);assert.equal(q.tips,0);assert.equal(q.shift.seconds,SHIFT_SECONDS);assert.equal(q.recap.served,2);assert.equal(q.recapUnread,true);
});

test('a moment always offers the right answer among at most three picks',()=>{
  const options=[{strain:0,format:0,type:0},{strain:1,format:0,type:1},{strain:2,format:0,type:0},{strain:3,format:1,type:2}];
  for(let n=0;n<12;n++){
    const play=migrateShopPlay({sequence:n}),m=createMoment(play,{id:7},options);
    assert.equal(play.sequence,n+1);assert.ok(m.choices.length<=3);
    assert.ok(m.choices.some((_,i)=>judgeChoice(m,i).matched),'sequence '+n);
  }
  assert.equal(createMoment(migrateShopPlay(),{id:1},[]),null);
});

test('nobody asks for a pick until the menu has two strains to choose between',()=>{
  const play=migrateShopPlay();
  assert.equal(createMoment(play,{id:1},[{strain:0,format:0,type:0}]),null);
  assert.equal(play.sequence,0);
  const m=createMoment(play,{id:2},[{strain:0,format:0,type:0},{strain:1,format:0,type:1}]);
  assert.equal(m.choices.length,2);assert.ok(m.choices.some((_,i)=>judgeChoice(m,i).matched));
});

test('a shift closes after five minutes with a recap and advice',()=>{
  const play=migrateShopPlay();
  recordServed(play,{waitSeconds:40,momentMatched:true},100);
  assert.equal(tickShift(play,200,{queue:3}),false);
  assert.equal(tickShift(play,100,{queue:9}),true);
  assert.equal(play.recap.served,1);assert.equal(play.recap.matches,1);assert.equal(play.recap.queuePeak,9);assert.equal(play.shift.served,0);assert.ok(play.recapUnread);
  assert.equal(shiftAdvice(play.recap).station,4);
  assert.equal(tipFor(100),20);assert.equal(tipFor(1),1);
});

test('the recap clock counts whole minutes down to the last one',()=>{
  assert.equal(shiftTimeLeft(0),'Recap in 5 min');assert.equal(shiftTimeLeft(174),'Recap in 3 min');
  assert.equal(shiftTimeLeft(250),'Recap in under a minute');assert.equal(shiftTimeLeft(SHIFT_SECONDS+5),'Recap in under a minute');
});
