import test from 'node:test';
import assert from 'node:assert/strict';
import {LOUNGE_TIERS,LOUNGE_MAX,migrateLounge,loungeTier,loungeUpgradeCost,loungeSeats,loungeSessionSeconds,buyLoungeTier,loungeShare,wantsLounge,loungeAdmission,loungeTake,loungeRate,loungeCurrentRate} from '../src/lounge.js';

test('the tiers get dearer and bigger, and each buys more seats and a higher take',()=>{
  assert.equal(LOUNGE_TIERS.length,LOUNGE_MAX);
  for(let i=1;i<LOUNGE_TIERS.length;i++){
    const a=LOUNGE_TIERS[i-1],b=LOUNGE_TIERS[i];
    assert.ok(b.cost>a.cost*2,`${b.name} is not a big step up from ${a.name}`);
    assert.ok(b.seats>a.seats&&b.cover>a.cover&&b.spend>a.spend&&b.share<=a.share);
  }
  assert.ok(LOUNGE_TIERS[0].cost>=200000,'the first tier is a late-game buy');
});
test('old saves have no lounge and malformed levels are clamped',()=>{
  for(const value of [undefined,null,NaN,Infinity,'2',{},-3])assert.equal(migrateLounge(value),0);
  assert.equal(migrateLounge(2.7),2);assert.equal(migrateLounge(99),LOUNGE_MAX);
  assert.equal(loungeTier(0),null);assert.equal(loungeSeats(0),0);assert.equal(loungeSessionSeconds(0),0);
});
test('buying charges each tier once, in order, and stops at the members’ room',()=>{
  const state={money:LOUNGE_TIERS[0].cost-1};
  assert.equal(buyLoungeTier(state),false);assert.equal(state.lounge,undefined);
  state.money=LOUNGE_TIERS.reduce((n,t)=>n+t.cost,0);
  LOUNGE_TIERS.forEach((tier,i)=>{assert.equal(loungeUpgradeCost(i),tier.cost);assert.equal(buyLoungeTier(state),true);assert.equal(state.lounge,i+1)});
  assert.equal(state.money,0);assert.equal(loungeUpgradeCost(LOUNGE_MAX),null);assert.equal(buyLoungeTier(state),false);
  const loaded=JSON.parse(JSON.stringify(state));assert.equal(migrateLounge(loaded.lounge),LOUNGE_MAX);
});
test('one guest in `share` heads for the curtain, nobody does while it is shut, VIPs go twice as often and always at the top level',()=>{
  for(let n=0;n<20;n++)assert.equal(wantsLounge(0,n,'regular'),false);
  assert.equal(loungeShare(0,'vip'),0);
  const first=[...Array(40).keys()].filter(n=>wantsLounge(1,n,'regular'));
  assert.deepEqual(first,[3,7,11,15,19,23,27,31,35,39]);
  assert.equal([...Array(30).keys()].filter(n=>wantsLounge(3,n,'hurried')).length,10);
  assert.equal(loungeShare(1,'vip'),2);assert.equal([...Array(40).keys()].filter(n=>wantsLounge(1,n,'vip')).length,20);
  assert.equal(loungeShare(3,'vip'),2);
  assert.equal(wantsLounge(LOUNGE_MAX,0,'vip'),true);assert.equal(wantsLounge(LOUNGE_MAX,7,'vip'),true);
  assert.equal([...Array(30).keys()].filter(n=>wantsLounge(LOUNGE_MAX,n,'regular')).length,15);
});
test('admission needs an open lounge, a free seat and a spare jar',()=>{
  assert.equal(loungeAdmission(0,0,10).admit,false);
  const tier1=loungeAdmission(1,0,10);assert.equal(tier1.seats,4);assert.equal(tier1.admit,true);
  assert.equal(loungeAdmission(1,4,10).admit,false);assert.equal(loungeAdmission(1,4,10).seat,false);
  assert.equal(loungeAdmission(1,3,0).admit,false);assert.equal(loungeAdmission(1,3,0).jar,false);
  assert.equal(loungeAdmission(2,5,1).admit,true);
});
test('a session takes the cover plus one jar at the tier premium',()=>{
  assert.deepEqual(loungeTake(0,80),{cover:0,spend:0,total:0});
  const t=loungeTake(1,80);assert.equal(t.cover,LOUNGE_TIERS[0].cover);assert.equal(t.spend,240);assert.equal(t.total,t.cover+240);
  assert.ok(loungeTake(4,80).total>loungeTake(1,80).total);
  assert.equal(loungeTake(1,-5).spend,0);
  assert.ok(loungeRate(4,80)>loungeRate(1,80)&&loungeRate(0,80)===0);
});
test('the rate right now counts one take per session for every seat taken, never more than the tier seats',()=>{
  const take=loungeTake(1,80).total,session=LOUNGE_TIERS[0].session;
  assert.equal(loungeCurrentRate(1,0,80),0);
  assert.equal(loungeCurrentRate(1,2,80),take*2/session);
  assert.equal(loungeCurrentRate(1,4,80),loungeRate(1,80),'every seat busy matches the card\'s full-house rate');
  assert.equal(loungeCurrentRate(1,9,80),loungeRate(1,80),'guests beyond the seats do not count');
  assert.equal(loungeCurrentRate(0,3,80),0,'nothing before the lounge opens');
  assert.equal(loungeCurrentRate(1,-2,80),0);assert.equal(loungeCurrentRate(1,NaN,80),0);
});
