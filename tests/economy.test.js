import test from 'node:test';
import assert from 'node:assert/strict';
import {counterLanes,stationTier,tierBoost,retailBoost,batchSize,capacity,stationCost,staffCost,basketSize,storageCapacity,readyCapacity,onlineSize,counterServiceDuration,patience,walkSpeed,preferredStrain,rewardScale} from '../src/economy.js';
import {migrateProgression,satisfyCustomer,dailyStatus,claimDaily,eventStatus,claimEvent,goalStatus,claimGoal,recordGoal,storeRate,buyStore,STORES} from '../src/progression.js';

test('tiers double output at 10/20/30/50/75/100 and per-level gains stay linear between them',()=>{
  assert.deepEqual([1,9,10,19,20,30,50,75,100,140].map(stationTier),[0,0,1,1,2,3,4,5,6,6]);
  assert.equal(tierBoost(9),1);assert.equal(tierBoost(10),2);assert.equal(tierBoost(100),64);
  assert.equal(batchSize(1),1);assert.ok(Math.abs(batchSize(9)-4.2)<1e-9);assert.ok(Math.abs(batchSize(10)-9.2)<1e-9);
  assert.equal(capacity(0,3,2),0);assert.ok(Math.abs(capacity(10,1,1.25)-9.2*1.3*1.25)<1e-9);
  assert.equal(stationCost(120,0),120);assert.equal(stationCost(120,2),Math.floor(120*1.16*1.16));assert.equal(staffCost(2),Math.floor(20*2.56));
});

test('retail tier needs both counters and scales baskets, storage and web orders',()=>{
  assert.equal(retailBoost([1,1,1,1,10,9]),1);assert.equal(retailBoost([1,1,1,1,10,10]),2);assert.equal(retailBoost([1,1,1,1,50,75]),16);
  assert.equal(basketSize([1,1,1,1,1,1]),1);assert.equal(basketSize([1,1,1,1,5,1]),3);assert.equal(basketSize([1,1,1,1,11,10]),12);
  assert.equal(storageCapacity(0,[1,1,1,1,1,1]),100);assert.equal(storageCapacity(2,[1,1,1,1,20,20]),1200);
  assert.equal(readyCapacity(1,[1,1,1,1,1,1]),150);assert.equal(readyCapacity(0,[1,1,1,1,10,10]),200);
  assert.equal(onlineSize(0,[1,1,1,1,1,1]),4);assert.equal(onlineSize(6,[1,1,1,1,1,1]),7);assert.equal(onlineSize(0,[1,1,1,1,30,30]),32);
});

test('counter handoff keeps its 1.4s floor and the service format factor',()=>{
  assert.ok(Math.abs(counterServiceDuration(5,1)-4.4)<1e-9);assert.ok(Math.abs(counterServiceDuration(4,1)-3.4)<1e-9);
  assert.ok(counterServiceDuration(5,1e6)>1.4&&counterServiceDuration(5,1e6)<1.6&&counterServiceDuration(5,1e12)<1.45);
  assert.ok(Math.abs(counterServiceDuration(5,1,1.2)-4.4*1.2)<1e-9);assert.ok(Math.abs(counterServiceDuration(4,1,1.2)-3.4)<1e-9);
});

test('queue comfort stretches patience, floor flow speeds walking, curing/duration are exposed as sale bonuses',()=>{
  assert.equal(patience('hurried',0),20);assert.equal(patience('vip',0),15);assert.ok(Math.abs(patience('hurried',1)-23)<1e-9);assert.ok(Math.abs(patience('vip',8)-33)<1e-9);
  assert.ok(Math.abs(walkSpeed(0)-2.8)<1e-9);assert.ok(Math.abs(walkSpeed(8)-2.8*1.8)<1e-9);assert.ok(Math.abs(walkSpeed(undefined)-2.8)<1e-9);
  const p=migrateProgression({});
  assert.equal(satisfyCustomer(p,-1,'hurried','everyday',21),1);
  assert.ok(satisfyCustomer(p,-1,'hurried','everyday',21,1.15)>1);
  assert.equal(satisfyCustomer(p,-1,'vip','everyday',16,1.05),1);
  assert.equal(satisfyCustomer(p,-1,'vip','everyday',15,1),2);
});

test('customer types pick a matching strain when the menu offers one',()=>{
  const levels=[1,1,0,1];
  assert.equal(preferredStrain('regular',[0,1,3],levels),0);
  assert.equal(preferredStrain('hurried',[1,3],levels),null);
  assert.equal(preferredStrain('vip',[0,1,3],levels),3);
  assert.equal(preferredStrain('vip',[0],levels),null);
  assert.equal(preferredStrain('regular',[2],levels),null);
});

test('fixed rewards scale with income but never shrink, and the scale is applied on claim',()=>{
  assert.equal(rewardScale(0),1);assert.equal(rewardScale(2),1);assert.equal(rewardScale(400),100);assert.equal(rewardScale(NaN),1);
  const now=Date.UTC(2026,8,17,12);
  const s={money:0,lifetime:0,empire:migrateProgression({daily:{day:0,streak:0}},now)};
  assert.equal(dailyStatus(s.empire,now).reward,150);assert.equal(dailyStatus(s.empire,now,10).reward,1500);
  assert.equal(claimDaily(s,now,10),1500);assert.equal(s.money,1500);assert.equal(claimDaily(s,now,10),0);
  const e=eventStatus(s.empire,now,3);assert.equal(e.reward,eventStatus(s.empire,now).reward*3);
  assert.equal(goalStatus(s.empire,0,4).reward,600);recordGoal(s.empire,'pickup',10);assert.equal(claimGoal(s,0,4),600);
  assert.equal(goalStatus(s.empire,0,0.5).reward,150);
});

test('branch income follows the main shop retail tier and survives migration',()=>{
  const s={money:1e9,lifetime:1e9,empire:migrateProgression({})};
  assert.equal(s.empire.retailBoost,1);buyStore(s,0);
  const base=storeRate(s.empire,0);assert.equal(base,STORES[0].rate);
  s.empire.retailBoost=8;assert.equal(storeRate(s.empire,0),base*8);
  assert.equal(migrateProgression(s.empire).retailBoost,8);assert.equal(migrateProgression({retailBoost:0}).retailBoost,1);assert.equal(migrateProgression({retailBoost:Infinity}).retailBoost,1);
});

test('counters gain a service lane every five levels',()=>{assert.deepEqual([0,1,5,6,10,11,29,30,31].map(counterLanes),[1,1,1,2,2,3,6,6,7])});
