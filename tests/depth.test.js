import test from 'node:test';
import assert from 'node:assert/strict';
import {FORMATS,wantedFormat,strainForFormat,formatPremium,BOOST_MAX,boostCost,migrateMenu,chooseFormat,strainFormat,dominantFormat,menuFormatFactor,milestone,prestigeOffer,elapsedSteps} from '../src/depth.js';
import {migrateProgression,customerType,satisfyCustomer,saleMultiplier} from '../src/progression.js';
test('old and invalid menus stay usable; unlocks charge once and choices trade speed for value',()=>{assert.deepEqual(migrateMenu(),{active:0,unlocked:[true,false,false],formats:[]});assert.equal(migrateMenu({active:2,unlocked:[]}).active,0);const s={money:2500,productMenu:migrateMenu()};assert.equal(chooseFormat(s,2,0),false);assert.equal(chooseFormat(s,1,0),true);assert.equal(s.money,0);assert.equal(chooseFormat(s,0,0),true);assert.equal(chooseFormat(s,1,0),true);assert.equal(s.money,0);assert.equal(chooseFormat(s,9,0),false);assert.equal(chooseFormat(s,1),false);assert.ok(FORMATS[1].packing>FORMATS[0].packing);assert.ok(FORMATS[1].service<FORMATS[0].service);assert.ok(FORMATS[2].demand<FORMATS[0].demand)});
test('formats are chosen per strain: an old single choice covers every strain, the mix sets units and factors',()=>{
  const legacy=migrateMenu({active:1,unlocked:[true,true,false]});assert.equal(strainFormat(legacy,0),1);assert.equal(strainFormat(legacy,5),1);
  const s={money:10000,productMenu:migrateMenu({active:0,unlocked:[true,true,false]})};
  assert.equal(chooseFormat(s,1,2),true);assert.equal(s.money,10000,'a format already unlocked is free for another strain');
  assert.equal(strainFormat(s.productMenu,2),1);assert.equal(strainFormat(s.productMenu,0),0);assert.equal(strainFormat(s.productMenu,7),0);
  assert.equal(chooseFormat(s,2,3),true);assert.equal(s.money,0);assert.equal(strainFormat(s.productMenu,3),2);
  assert.equal(dominantFormat(s.productMenu,[0,2,3]),0);assert.equal(dominantFormat(s.productMenu,[2,3,7,3]),2);assert.equal(dominantFormat(s.productMenu,[]),0);
  assert.ok(Math.abs(menuFormatFactor(s.productMenu,[0,2],'value')-(1+1.45)/2)<1e-9);assert.equal(menuFormatFactor(s.productMenu,[3],'packing'),3);
  const restored=migrateMenu(JSON.parse(JSON.stringify(s.productMenu)));assert.deepEqual(restored.formats,s.productMenu.formats);
  const trimmed=migrateMenu({active:0,unlocked:[true,false,false],formats:[0,2,1]});assert.deepEqual(trimmed.formats,[0,0,0],'formats never point at a locked format');
});
test('milestones continue past city without non-finite costs or rewards',()=>{assert.equal(milestone(3).goal,250000);assert.equal(milestone(4).goal,1000000);for(let i=0;i<=20;i++){const m=milestone(i);assert.ok(Number.isSafeInteger(m.goal));assert.ok(m.reward<m.goal)}assert.equal(milestone(21),null);assert.ok(boostCost(BOOST_MAX-1)<250*4**(BOOST_MAX-1));assert.ok(Number.isSafeInteger(boostCost(500)))});
test('prestige is gated on lifetime revenue, safely migrates and multiplies base sales',()=>{const s={money:0,lifetime:9999999,empire:migrateProgression({prestige:0})};assert.equal(prestigeOffer(s).eligible,false);s.lifetime++;assert.equal(prestigeOffer(s).eligible,true);s.empire.prestige=1;assert.equal(prestigeOffer(s).eligible,false);assert.equal(saleMultiplier(s.empire),1.2);assert.equal(migrateProgression({prestige:Infinity}).prestige,0);assert.equal(migrateProgression({prestige:999}).prestige,19)});
test('VIP reward requires reputation unlock and a fast handoff',()=>{assert.equal(customerType(60,6),'vip');assert.notEqual(customerType(59,6),'vip');const p=migrateProgression({reputation:70});assert.equal(satisfyCustomer(p,-1,'vip','everyday',15),2);assert.equal(satisfyCustomer(p,-1,'vip','everyday',16),1)});
test('delayed timers preserve fixed steps, cap long-stall estimates and respect pause',()=>{assert.deepEqual(elapsedSteps(.2,4),{steps:16,offline:0});assert.deepEqual(elapsedSteps(.2,0),{steps:0,offline:0});assert.deepEqual(elapsedSteps(100000,1),{steps:0,offline:14400});assert.equal(elapsedSteps(-1,1).steps,0);assert.equal(elapsedSteps(NaN,1).steps,0);assert.equal(migrateProgression({returnReport:{seconds:86400,earnings:[1,2,3,4]}}).returnReport.seconds,86400)});

test('customers come for a format — half flower, three in ten pre-rolls, one in five edibles — switch strain to get it, and pay the premium only then',()=>{
  const mixed={unlocked:[true,true,true],active:0,formats:[0,1,2,2]};
  const wants=[...Array(10).keys()].map(n=>wantedFormat(mixed,n));
  assert.deepEqual([0,1,2].map(f=>wants.filter(w=>w===f).length),[5,3,2]);
  assert.equal(wantedFormat({unlocked:[true,false,false],active:0,formats:[]},9),0,'nobody wants a format the shop does not sell yet');
  assert.equal(strainForFormat(mixed,[0,1,2,3],0,2,0),2);assert.equal(strainForFormat(mixed,[0,1,2,3],0,2,1),3);
  assert.equal(strainForFormat(mixed,[0,1,2,3],1,1,7),1,'a strain already sold their way is kept');
  const edibles={unlocked:[true,true,true],active:2,formats:[2,2,2,2]},flower={unlocked:[true,true,true],active:0,formats:[0,0,0,0]};
  assert.equal(strainForFormat(edibles,[0,1,2,3],1,0,4),1,'with nothing sold their way they keep the pick');
  assert.equal(formatPremium(edibles,1,0),1);assert.equal(formatPremium(edibles,1,2),FORMATS[2].value);
  // Ten customers' takings, times the menu's demand factor: all edibles trails all flower, and a mixed menu beats both.
  const takings=(menu,list)=>[...Array(10).keys()].reduce((n,id)=>{const want=wantedFormat(menu,id),s=strainForFormat(menu,list,id%list.length,want,id);return n+formatPremium(menu,s,want)},0);
  const demand=(menu,list)=>list.reduce((n,i)=>n+FORMATS[menu.formats[i]].demand,0)/list.length;
  const list=[0,1,2,3],allEdibles=takings(edibles,list)*demand(edibles,list),allFlower=takings(flower,list)*demand(flower,list),mix=takings(mixed,list)*demand(mixed,list);
  assert.ok(allEdibles<allFlower,`all edibles (${allEdibles}) should trail all flower (${allFlower})`);
  assert.ok(mix>allFlower,`a mixed menu (${mix}) should beat all flower (${allFlower})`);
});
