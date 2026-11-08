import test from 'node:test';import assert from 'node:assert/strict';
import {DEALS,FAMILIES,DEAL_SLOTS,DEAL_HOURS,MIN_PRICE,dealWindow,windowEnds,migrateDeals,pickDeals,rollDeals,dealPrice,canBuy,nightBonus,spendNight,untilLabel} from '../src/deals.js';
const all=()=>true;
test('a window is four hours of the local day',()=>{const off=300,start=Date.UTC(2026,10,8,5,0,0);// 00:00 at UTC-5
 const w=dealWindow(start,off);assert.equal(dealWindow(start+DEAL_HOURS*3600000-1,off),w);assert.equal(dealWindow(start+DEAL_HOURS*3600000,off),w+1);
 assert.equal(windowEnds(w,off),start+DEAL_HOURS*3600000);});
test('up to three deals, one per family, the same for the same window',()=>{
 for(let w=0;w<200;w++){const o=pickDeals(w,all);assert.equal(o.length,DEAL_SLOTS);assert.equal(new Set(o.map(id=>DEALS[id].family)).size,o.length);assert.deepEqual(pickDeals(w,all),o);}
 const seen=new Set();for(let w=0;w<60;w++)pickDeals(w,all).forEach(id=>seen.add(id));assert.equal(seen.size,Object.keys(DEALS).length,'every deal comes round');
 assert.deepEqual(pickDeals(7,f=>f==='rush').map(id=>DEALS[id].family),['rush'],'only what the shop can use');
 assert.ok(FAMILIES.every(f=>Object.values(DEALS).some(d=>d.family===f)));});
test('a new window rolls a new set and clears what was bought',()=>{const d=migrateDeals();
 assert.equal(rollDeals(d,10,all),true);assert.equal(d.offers.length,3);const id=d.offers[0];assert.ok(canBuy(d,id));d.bought.push(id);assert.ok(!canBuy(d,id));
 assert.equal(rollDeals(d,10,all),false,'same window keeps its set');assert.equal(rollDeals(d,11,all),true);assert.deepEqual(d.bought,[]);assert.ok(!canBuy(d,'nope'));});
test('prices are seconds of income, never below the floor',()=>{
 assert.equal(dealPrice('rush5',100),15000);assert.equal(dealPrice('rush10',100),30000);assert.equal(dealPrice('rush5',0),MIN_PRICE);
 assert.equal(dealPrice('coffee',100,162),8100,'half of what the bursts add');assert.equal(dealPrice('flyers',100,120),6000);
 for(const id of Object.keys(DEALS)){const d=DEALS[id];if(d.rush)assert.ok(d.price<d.rush,'a rush pays back double: '+id);}});
test('a night shift lifts the next long absence, then is spent',()=>{const d=migrateDeals({night:7200});
 assert.equal(nightBonus(d),7200);assert.equal(spendNight(d,300),false,'a short break keeps it');assert.equal(spendNight(d,3600),true);assert.equal(nightBonus(d),0);});
test('old and broken saves migrate',()=>{assert.deepEqual(migrateDeals(null),{window:-1,offers:[],bought:[],night:0});
 const d=migrateDeals({window:'12',offers:['rush5','bogus','night2'],bought:['night2','coffee'],night:1e9});
 assert.deepEqual(d,{window:12,offers:['rush5','night2'],bought:['night2'],night:DEALS.night4.night});});
test('the countdown reads in hours and minutes',()=>{assert.equal(untilLabel(3*3600000+5*60000),'3h 5m');assert.equal(untilLabel(20000),'1m');assert.equal(untilLabel(45*60000),'45m');});
