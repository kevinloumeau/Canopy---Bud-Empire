import test from 'node:test';
import assert from 'node:assert/strict';
import {FORMATS,wantedFormat,formatPremium,BOOST_MAX,boostCost,migrateMenu,unlockFormat,stockedFormats,menuFormatFactor,milestone,prestigeOffer,elapsedSteps} from '../src/depth.js';
import {migrateProgression,customerType,satisfyCustomer,saleMultiplier} from '../src/progression.js';
test('old and invalid menus stay usable; a type unlocks once, for every strain, and trades speed for value',()=>{assert.deepEqual(migrateMenu(),{active:0,unlocked:[true,false,false]});assert.equal(migrateMenu({active:2,unlocked:[]}).active,0);const s={money:2500,productMenu:migrateMenu()};assert.equal(unlockFormat(s,2),false);assert.equal(unlockFormat(s,1),true);assert.equal(s.money,0);assert.equal(unlockFormat(s,0),true);assert.equal(unlockFormat(s,1),true);assert.equal(s.money,0);assert.equal(unlockFormat(s,9),false);assert.deepEqual(stockedFormats(s.productMenu),[0,1]);assert.ok(FORMATS[1].packing>FORMATS[0].packing);assert.ok(FORMATS[1].service<FORMATS[0].service);assert.ok(FORMATS[2].demand<FORMATS[0].demand)});
test('every strain sells in every stocked type: an old per-strain choice is dropped and what was unlocked stays',()=>{
  const legacy=migrateMenu({active:2,unlocked:[true,false,true],formats:[2,0,2]});
  assert.deepEqual(legacy,{active:0,unlocked:[true,false,true]});assert.deepEqual(stockedFormats(legacy),[0,2]);
  const flower=migrateMenu();assert.equal(menuFormatFactor(flower,'value'),1);assert.equal(menuFormatFactor(flower,'packing'),1);
  const all={unlocked:[true,true,true],active:0};
  assert.ok(Math.abs(menuFormatFactor(all,'value')-(5*1+3*1.45+2*2.2)/10)<1e-9);
  assert.ok(Math.abs(menuFormatFactor(legacy,'packing')-(8*1+2*3)/10)<1e-9,'pre-roll fans buy flower until pre-rolls are stocked');
});
test('milestones continue past city without non-finite costs or rewards',()=>{assert.equal(milestone(3).goal,250000);assert.equal(milestone(4).goal,1000000);for(let i=0;i<=20;i++){const m=milestone(i);assert.ok(Number.isSafeInteger(m.goal));assert.ok(m.reward<m.goal)}assert.equal(milestone(21),null);assert.ok(boostCost(BOOST_MAX-1)<250*4**(BOOST_MAX-1));assert.ok(Number.isSafeInteger(boostCost(500)))});
test('prestige pays shares for all-time revenue, migrates old ranks and multiplies base sales',()=>{const s={money:0,lifetime:9999999,empire:migrateProgression({prestige:0})};assert.equal(prestigeOffer(s).eligible,false);s.lifetime++;let o=prestigeOffer(s);assert.equal(o.eligible,true);assert.equal(o.gain,10);assert.equal(o.multiplier,1.5);s.lifetime=40000000;assert.equal(prestigeOffer(s).gain,20);s.empire.shares=20;s.empire.lifetimeAll=40000000;s.lifetime=0;assert.equal(prestigeOffer(s).eligible,false);assert.equal(prestigeOffer(s).target,44100000);s.lifetime=4100000;assert.equal(prestigeOffer(s).gain,1);assert.equal(saleMultiplier(s.empire),2);const old=migrateProgression({prestige:2});assert.equal(old.shares,8);assert.equal(old.lifetimeAll,40000000);assert.ok(Math.abs(saleMultiplier(old)-1.4)<1e-9);assert.equal(migrateProgression({prestige:2,shares:3,lifetimeAll:5}).shares,3);assert.equal(migrateProgression({prestige:Infinity}).prestige,0);assert.equal(migrateProgression({prestige:9999}).prestige,999)});
test('VIP reward requires reputation unlock and a fast handoff',()=>{assert.equal(customerType(60,6),'vip');assert.notEqual(customerType(59,6),'vip');const p=migrateProgression({reputation:70});assert.equal(satisfyCustomer(p,-1,'vip','everyday',15),2);assert.equal(satisfyCustomer(p,-1,'vip','everyday',16),1)});
test('delayed timers preserve fixed steps, cap long-stall estimates and respect pause',()=>{assert.deepEqual(elapsedSteps(.2,4),{steps:16,offline:0});assert.deepEqual(elapsedSteps(.2,0),{steps:0,offline:0});assert.deepEqual(elapsedSteps(100000,1),{steps:0,offline:86400});assert.deepEqual(elapsedSteps(100000,0),{steps:0,offline:86400});assert.equal(elapsedSteps(-1,1).steps,0);assert.equal(elapsedSteps(NaN,1).steps,0);assert.equal(migrateProgression({returnReport:{seconds:86400,earnings:[1,2,3,4]}}).returnReport.seconds,86400)});

test('customers come for a type — half flower, three in ten pre-rolls, one in five edibles — and always get it once it is stocked',()=>{
  const all={unlocked:[true,true,true],active:0},flower={unlocked:[true,false,false],active:0};
  const wants=[...Array(10).keys()].map(n=>wantedFormat(all,n));
  assert.deepEqual([0,1,2].map(f=>wants.filter(w=>w===f).length),[5,3,2]);
  assert.equal(wantedFormat(flower,9),0,'nobody wants a type the shop does not stock yet');
  assert.equal(formatPremium(all,2),FORMATS[2].value);assert.equal(formatPremium(flower,2),1);
  // Ten customers' takings times the door's demand: stocking every type beats flower alone.
  const takings=menu=>[...Array(10).keys()].reduce((n,id)=>n+formatPremium(menu,wantedFormat(menu,id)),0)*menuFormatFactor(menu,'demand');
  assert.ok(takings(all)>takings(flower),`every type (${takings(all)}) should beat flower alone (${takings(flower)})`);
});
