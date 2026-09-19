import test from 'node:test';
import assert from 'node:assert/strict';
import {growFactor,strainGrowFactor,trafficFactor,potency,tipFactor,trendPrice,nextTrend,migrateTrend,tickTrend,TREND_SECONDS,perkTier,everydayBonus,packBonus,reputationBonus,vipBonus,reserveStrain,buzzFactor,VIP_BUZZ_TRAFFIC,timeFactor,peakType,STRAIN_TYPE,SATIVA,INDICA,HYBRID} from '../src/strains.js';

test('boutique strains slow the grow room and mastery claws most of it back',()=>{
  assert.equal(strainGrowFactor(0,1),1);assert.equal(strainGrowFactor(0,10),1);
  assert.ok(Math.abs(strainGrowFactor(3,1)-.75)<1e-9);assert.ok(Math.abs(strainGrowFactor(3,10)-.9)<1e-9);
  assert.equal(growFactor([],[1,0,0,0]),1);assert.equal(growFactor([0],[1,0,0,0]),1);
  assert.ok(Math.abs(growFactor([0,3],[1,0,0,1])-(1+.75)/2)<1e-9);
});

test('a fuller menu and the trending strain draw more traffic',()=>{
  assert.equal(trafficFactor([0],1),1);assert.ok(Math.abs(trafficFactor([0,1,2,3],-1)-1.24)<1e-9);
  assert.ok(Math.abs(trafficFactor([0,1],1)-1.08*1.25)<1e-9);
});

test('potency reads as THC% and tips VIPs twice as hard as regulars',()=>{
  assert.equal(potency(0,1),14);assert.equal(potency(3,10),30.5);assert.equal(potency(1,3),19);
  assert.ok(Math.abs(tipFactor('regular',30.5)-1.1375)<1e-9);assert.ok(Math.abs(tipFactor('vip',30.5)-1.275)<1e-9);assert.equal(tipFactor('vip',14),1);
});

test('trend rotates on its cadence, never repeats itself, and migrates safely',()=>{
  assert.equal(trendPrice(2,2),1.35);assert.equal(trendPrice(1,2),1);
  for(let seed=0;seed<12;seed++)assert.notEqual(nextTrend(1,4,seed),1);
  assert.deepEqual(migrateTrend(undefined,4),{index:1,remaining:TREND_SECONDS});
  assert.deepEqual(migrateTrend({index:9,remaining:-3},4),{index:1,remaining:TREND_SECONDS});
  assert.deepEqual(migrateTrend({index:3,remaining:20},4),{index:3,remaining:20});
  const t={index:0,remaining:10};assert.equal(tickTrend(t,5,4,0),false);assert.equal(t.remaining,5);
  assert.equal(tickTrend(t,6,4,0),true);assert.notEqual(t.index,0);assert.ok(t.remaining>0&&t.remaining<=TREND_SECONDS);
  const long={index:0,remaining:1};tickTrend(long,TREND_SECONDS*2+1,4,3);assert.ok(long.remaining>0&&long.remaining<=TREND_SECONDS);
});

test('signature perks unlock at level 5 and 10',()=>{
  assert.deepEqual([1,4,5,9,10].map(perkTier),[0,0,1,1,2]);
  assert.equal(everydayBonus([10,0,0,0]),1.2);assert.equal(packBonus([1,5,0,0]),1.15);assert.equal(reputationBonus([1,1,10,0]),2);assert.equal(vipBonus([1,1,1,5]),1.25);assert.equal(vipBonus([1,1,1,4]),1);
});

test('the VIP reserve is the most potent boutique strain on the menu, never Meadow Mint',()=>{
  assert.equal(reserveStrain([0],[10,0,0,0]),null);
  assert.equal(reserveStrain([0,1,2],[1,10,1,0]),1);// Amber at 22.5% edges a fresh Violet at 22%
  assert.equal(reserveStrain([0,1,3],[1,10,0,1]),3);// a tier beats levels once the gap is more than one tier
  assert.equal(buzzFactor(0),1);assert.equal(buzzFactor(12),VIP_BUZZ_TRAFFIC);
});

test('sativas peak by day, indicas by night, hybrids never move',()=>{
  assert.equal(timeFactor(HYBRID,false),1);assert.equal(timeFactor(HYBRID,true),1);
  assert.ok(Math.abs(timeFactor(SATIVA,false)-1.15)<1e-9);assert.ok(Math.abs(timeFactor(SATIVA,true)-.91)<1e-9);
  assert.ok(Math.abs(timeFactor(INDICA,true)-1.15)<1e-9);assert.ok(Math.abs(timeFactor(INDICA,false)-.91)<1e-9);
  assert.equal(peakType(false),SATIVA);assert.equal(peakType(true),INDICA);
  assert.deepEqual(STRAIN_TYPE,[HYBRID,SATIVA,HYBRID,INDICA]);
});
