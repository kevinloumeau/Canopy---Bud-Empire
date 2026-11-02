import test from 'node:test';
import assert from 'node:assert/strict';
import {FLAGSHIP_MAX,flagshipCost,flagshipSales,migrateFlagship,payFlagship,openFlagshipStage,flagshipUnlocked,FLAGSHIP_UNLOCK_LIFETIME} from '../src/flagship.js';

test('old saves start with no flagship',()=>{assert.equal(migrateFlagship(undefined),0);assert.equal(migrateFlagship(99),FLAGSHIP_MAX);assert.equal(flagshipSales(0),1)});
test('each stage is paid, built, then lifts sales',()=>{
  const s={money:flagshipCost(0)-1,flagship:0};assert.equal(payFlagship(s),false);
  s.money+=1;assert.equal(payFlagship(s),true);assert.equal(s.money,0);assert.equal(s.flagship,0);
  openFlagshipStage(s);assert.equal(s.flagship,1);assert.ok(Math.abs(flagshipSales(1)-1.2)<1e-9);
  for(let i=1;i<FLAGSHIP_MAX;i++){s.money=flagshipCost(s.flagship);assert.equal(payFlagship(s),true);openFlagshipStage(s)}
  assert.equal(flagshipCost(s.flagship),null);s.money=1e12;assert.equal(payFlagship(s),false);
  openFlagshipStage(s);assert.equal(s.flagship,FLAGSHIP_MAX);
});
test('stages get dearer',()=>{for(let i=1;i<FLAGSHIP_MAX;i++)assert.ok(flagshipCost(i)>flagshipCost(i-1))});
test('it shows up only in the late game',()=>{assert.equal(flagshipUnlocked(FLAGSHIP_UNLOCK_LIFETIME-1),false);assert.equal(flagshipUnlocked(FLAGSHIP_UNLOCK_LIFETIME),true)});
