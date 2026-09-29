import test from 'node:test';
import assert from 'node:assert/strict';
import {migrateShopPlay,momentOptions,createMoment,resolveMoment,recordPickup,tickShift,recapSuggestion,operationsAlerts} from '../src/shop-play.js';
import {migrateMenu} from '../src/depth.js';
import {migrateProgression} from '../src/progression.js';

const state=()=>({strains:[1,1,1,1],productMenu:migrateMenu(),shopPlay:migrateShopPlay(),empire:migrateProgression()});
test('old and malformed saves migrate without a live customer or invalid counters',()=>{
 assert.equal(migrateShopPlay().cooldown,35);const p=migrateShopPlay({cooldown:Infinity,matches:-1,shift:{seconds:Infinity,served:-4},recap:{seconds:300,earned:NaN},customerId:9});assert.equal(p.matches,0);assert.equal(p.shift.seconds,0);assert.equal(p.recap.earned,0);assert.equal(p.customerId,undefined);
});
test('moments only offer owned strains and formats, including a starter menu',()=>{
 const s=state();s.strains=[1,0,0,0];assert.deepEqual(momentOptions(s).map(o=>[o.strain,o.format]),[[0,0]]);const m=createMoment(s,{id:3});assert.equal(m.choices.length,1);assert.equal(resolveMoment(m,0).matched,true);assert.equal(resolveMoment(m,3),null);
});
test('each rotating request has a matching answer; locked formats stay out',()=>{
 const s=state();s.productMenu.unlockedByStrain[1]=[true,true,false];
 for(let n=0;n<30;n++){const m=createMoment(s,{id:n});assert.ok(m.choices.some((_,i)=>resolveMoment(m,i).matched));assert.ok(m.choices.every(o=>o.format<2));assert.ok(m.choices.length>=2&&m.choices.length<=3);}
});
test('shift counts customers rather than bags and saves a bounded recap',()=>{
 const p=migrateShopPlay();recordPickup(p,{bags:7,waitSeconds:12,momentMatched:true},80);assert.equal(p.shift.served,1);assert.equal(p.matches,1);assert.equal(tickShift(p,299,{queue:10,stockout:true}),false);assert.equal(tickShift(p,1),true);assert.equal(p.recap.seconds,300);assert.equal(p.recap.served,1);assert.equal(p.recap.earned,80);assert.equal(p.recap.queuePeak,10);assert.equal(p.shift.seconds,0);assert.equal(p.recapUnread,true);assert.equal(recapSuggestion(p.recap).station,3);
 const saved=migrateShopPlay(JSON.parse(JSON.stringify(p)));assert.deepEqual(saved,p);
});
test('alerts are actionable only for open branches and update with operations',()=>{
 const s=state();assert.deepEqual(operationsAlerts(s),[]);s.empire.stores[0].level=1;const b=s.empire.network.stores[0];b.stock[0]=10;b.raw=30;
 let alerts=operationsAlerts(s);assert.ok(alerts.some(a=>a.id==='regular-0'&&a.tab===2&&a.control==='storyServe0'));assert.ok(alerts.some(a=>a.id==='driver-0'&&a.line===0));b.relationship=3;b.demand=0;assert.ok(!operationsAlerts(s).some(a=>a.id==='regular-0'||a.id==='driver-0'));
 s.empire.stores[1].level=1;s.empire.network.stores[1].raw=0;alerts=operationsAlerts(s);assert.ok(alerts.some(a=>a.id==='harvest-1'&&a.store===0&&a.transferTo===1));s.empire.network.jobs.push({kind:'transfer',to:1});assert.ok(!operationsAlerts(s).some(a=>a.id==='harvest-1'));
});
