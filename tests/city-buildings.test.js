import test from 'node:test';
import assert from 'node:assert/strict';
import {CITY_BUILDINGS,migrateCity,cityUnlocked,cityCost,cityQuote,payCity,openCityStage,awayExtraSeconds,awayPay,outputFactor,trafficFactor,terpFactor} from '../src/city-buildings.js';
import {BUILD_SECONDS} from '../src/builds.js';
import {FLAGSHIP_UNLOCK_LIFETIME} from '../src/flagship.js';
import {cityLots} from '../src/sunny-world.js';

test('old saves start with every lot unbuilt',()=>{
  const c=migrateCity(undefined);CITY_BUILDINGS.forEach(b=>assert.equal(c[b.id],0));
  assert.equal(migrateCity({warehouse:99,growhouse:-2,billboard:'x'}).warehouse,3);assert.equal(migrateCity({growhouse:-2}).growhouse,0);
});
test('each stage is paid, built, then counts',()=>{
  const s={money:0,city:migrateCity()};
  CITY_BUILDINGS.forEach(b=>{
    for(let k=0;k<b.stages.length;k++){s.money=cityCost(b.id,k)-1;assert.equal(payCity(s,b.id),false);s.money+=1;assert.equal(payCity(s,b.id),true);assert.equal(s.money,0);openCityStage(s,b.id)}
    assert.equal(cityCost(b.id,s.city[b.id]),null);s.money=1e15;assert.equal(payCity(s,b.id),false);
  });
});
test('stages get dearer and unlocks come in order around the HQ',()=>{
  CITY_BUILDINGS.forEach(b=>{for(let k=1;k<b.stages.length;k++)assert.ok(b.stages[k].cost>b.stages[k-1].cost);assert.ok(BUILD_SECONDS[b.id]>0)});
  for(let i=1;i<CITY_BUILDINGS.length;i++)assert.ok(CITY_BUILDINGS[i].unlock>CITY_BUILDINGS[i-1].unlock);
  assert.ok(CITY_BUILDINGS.some(b=>b.unlock<FLAGSHIP_UNLOCK_LIFETIME)&&CITY_BUILDINGS.some(b=>b.unlock>FLAGSHIP_UNLOCK_LIFETIME));
  assert.equal(cityUnlocked('warehouse',CITY_BUILDINGS[0].unlock-1),false);assert.equal(cityUnlocked('warehouse',CITY_BUILDINGS[0].unlock),true);
});
test('each building does its own job',()=>{
  const none=migrateCity(),full={warehouse:3,growhouse:3,billboard:3,terplab:3};
  assert.equal(awayExtraSeconds(none),0);assert.equal(awayPay(none),1);assert.equal(outputFactor(none),1);assert.equal(trafficFactor(none),1);assert.equal(terpFactor(none,1,1),1);
  assert.equal(awayExtraSeconds(full),12*3600);assert.ok(Math.abs(awayPay(full)-1.75)<1e-9);assert.ok(Math.abs(outputFactor(full)-1.6)<1e-9);assert.ok(Math.abs(trafficFactor(full)-1.6)<1e-9);
  // The house strain off trend gets nothing; trending and boutique strains do.
  assert.equal(terpFactor(full,0,2),1);assert.ok(terpFactor(full,0,0)>2);assert.ok(terpFactor(full,2,3)>1.5);assert.ok(terpFactor(full,2,2)>terpFactor(full,2,3));
});
test('every building has a lot on the west or back of the block, clear of the branches to the east',()=>{
  const lots=cityLots();CITY_BUILDINGS.forEach(b=>{assert.ok(lots[b.id],b.id);assert.ok(lots[b.id].x1<22.5,b.id)});
});
test('city lots open an hour or more apart, by earnings or by time, and are priced in minutes of income',()=>{
  for(let i=1;i<CITY_BUILDINGS.length;i++)assert.ok(CITY_BUILDINGS[i].hours-CITY_BUILDINGS[i-1].hours>=1,CITY_BUILDINGS[i].id);
  assert.equal(cityUnlocked('growhouse',0,0,CITY_BUILDINGS[1].hours*3600),true);assert.equal(cityUnlocked('growhouse',0,0,0),false);
  assert.equal(cityUnlocked('billboard',0,1),true,'a lot built before the unlocks moved up stays open');
  const b=CITY_BUILDINGS[2];assert.equal(cityQuote(b.id,0,1e8),Math.round(b.stages[0].minutes*60*1e8));assert.equal(cityQuote(b.id,0,0),b.stages[0].cost);
  const s={money:0,city:migrateCity(),quotes:{[b.id]:{stage:0,price:123e9}}};assert.equal(cityCost(b.id,0,s),123e9);
  s.money=123e9;assert.equal(payCity(s,b.id),true);assert.equal(s.money,0);
});
