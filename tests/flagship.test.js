import test from 'node:test';
import assert from 'node:assert/strict';
import {FLAGSHIP_MAX,flagshipCost,flagshipSales,migrateFlagship,payFlagship,openFlagshipStage,flagshipUnlocked,FLAGSHIP_UNLOCK_LIFETIME,FLAGSHIP_UNLOCK_SECONDS,flagshipQuote,FLAGSHIP_STAGES} from '../src/flagship.js';
import {holdQuote,heldQuote,migrateQuotes} from '../src/stage-quotes.js';

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
test('a slow run still gets the lot by time, and a save with a stage built keeps it',()=>{
  assert.equal(flagshipUnlocked(0,0,FLAGSHIP_UNLOCK_SECONDS-1),false);assert.equal(flagshipUnlocked(0,0,FLAGSHIP_UNLOCK_SECONDS),true);
  assert.equal(flagshipUnlocked(0,2),true,'an HQ built before the unlock moved up stays open');
});
test('each stage costs minutes of income when it comes up for sale, held until it is bought',()=>{
  assert.equal(flagshipQuote(0,0),FLAGSHIP_STAGES[0].cost,'no income: the floor price');
  assert.equal(flagshipQuote(1,1e8),Math.round(FLAGSHIP_STAGES[1].minutes*60*1e8));
  const s={money:0,flagship:0,quotes:{}};holdQuote(s,'flagship',0,flagshipQuote(0,1e8));
  assert.equal(flagshipCost(0,s),flagshipQuote(0,1e8));holdQuote(s,'flagship',0,flagshipQuote(0,1e9));assert.equal(flagshipCost(0,s),flagshipQuote(0,1e8),'a held price does not creep');
  s.money=flagshipCost(0,s)-1;assert.equal(payFlagship(s),false);s.money+=1;assert.equal(payFlagship(s),true);
  openFlagshipStage(s);assert.equal(heldQuote(s,'flagship',1),null,'the next stage gets its own price');
  for(let i=1;i<FLAGSHIP_MAX;i++)assert.ok(FLAGSHIP_STAGES[i].minutes>FLAGSHIP_STAGES[i-1].minutes);
  assert.deepEqual(migrateQuotes({flagship:{stage:1,price:5},bad:{stage:-1,price:2},'x y':{stage:0,price:1},warehouse:{stage:0,price:NaN}}),{flagship:{stage:1,price:5}});
});
