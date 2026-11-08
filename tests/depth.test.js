import test from 'node:test';
import assert from 'node:assert/strict';
import {FORMATS,wantedFormat,formatPremium,stocks,formatCost,BOOST_MAX,boostCost,migrateMenu,unlockFormat,stockedFormats,menuFormatFactor,milestone,prestigeOffer,elapsedSteps} from '../src/depth.js';
import {sharesFor,migrateProgression,customerType,satisfyCustomer,saleMultiplier} from '../src/progression.js';
const T=true,F=false,rows=(...r)=>({byStrain:[0,1,2,3].map(i=>r[i]||[T,F,F]),active:0});
test('old and invalid menus stay usable; a type unlocks once per strain, at that strain\'s cost, and trades speed for value',()=>{
  assert.deepEqual(migrateMenu(),rows());assert.equal(migrateMenu({active:2,unlocked:[]}).active,0);
  const s={money:formatCost(1,0),productMenu:migrateMenu()};
  assert.equal(unlockFormat(s,2,0),false);assert.equal(unlockFormat(s,1,0),true);assert.equal(s.money,0);
  assert.equal(unlockFormat(s,0,0),true);assert.equal(unlockFormat(s,1,0),true);assert.equal(s.money,0);assert.equal(unlockFormat(s,9,0),false);
  assert.deepEqual(stockedFormats(s.productMenu,0),[0,1]);assert.deepEqual(stockedFormats(s.productMenu,1),[0],'another strain still sells flower only');
  assert.deepEqual([0,1,2,3].map(i=>[formatCost(1,i),formatCost(2,i)]),[[1500,6000],[2000,8000],[2500,10000],[3500,14000]]);
  s.money=1e6;assert.equal(unlockFormat(s,1,3),true);assert.equal(s.money,1e6-formatCost(1,3));assert.ok(formatCost(1,3)>formatCost(1,0));
  assert.equal(unlockFormat(s,1,7),false,'no such strain');
  assert.ok(FORMATS[1].packing>FORMATS[0].packing);assert.ok(FORMATS[1].service<FORMATS[0].service);assert.ok(FORMATS[2].demand<FORMATS[0].demand)});
test('old saves keep every type they had, on every strain; new saves round-trip per strain',()=>{
  const legacy=migrateMenu({active:2,unlocked:[true,false,true],formats:[2,0,2]});
  assert.deepEqual(legacy,rows([T,F,T],[T,F,T],[T,F,T],[T,F,T]));assert.deepEqual(stockedFormats(legacy,3),[0,2]);
  const mixed=rows([T,T,F],[T,F,T]);assert.deepEqual(migrateMenu(JSON.parse(JSON.stringify(mixed))),mixed);
  assert.deepEqual(migrateMenu({byStrain:[[false,'x',1]]}),rows(),'junk rows fall back to flower');
  const flower=migrateMenu();assert.equal(menuFormatFactor(flower,'value'),1);assert.equal(menuFormatFactor(flower,'packing',0),1);
  const all=rows([T,T,T]);
  assert.ok(Math.abs(menuFormatFactor(all,'value',0)-(5*1+3*1.45+2*2.2)/10)<1e-9);assert.equal(menuFormatFactor(all,'value',1),1);
  assert.ok(Math.abs(menuFormatFactor(all,'value',undefined,[0,1])-((5*1+3*1.45+2*2.2)/10+1)/2)<1e-9,'the door averages the menu');
  assert.ok(Math.abs(menuFormatFactor(legacy,'packing',2)-(8*1+2*3)/10)<1e-9,'pre-roll fans buy flower until pre-rolls are stocked');
});
test('milestones continue past city without non-finite costs or rewards',()=>{assert.equal(milestone(3).goal,250000);assert.equal(milestone(4).goal,1000000);for(let i=0;i<=20;i++){const m=milestone(i);assert.ok(Number.isSafeInteger(m.goal));assert.ok(m.reward<m.goal)}assert.ok(milestone(21));assert.ok(boostCost(BOOST_MAX-1)<250*4**(BOOST_MAX-1));assert.ok(Number.isSafeInteger(boostCost(500)))});
test('prestige pays shares for all-time revenue, migrates old ranks and multiplies base sales',()=>{const s={money:0,lifetime:9999999,empire:migrateProgression({prestige:0})};assert.equal(prestigeOffer(s).eligible,false);s.lifetime++;let o=prestigeOffer(s);assert.equal(o.eligible,true);assert.equal(o.gain,10);assert.equal(o.multiplier,1.5);s.lifetime=40000000;assert.equal(prestigeOffer(s).gain,15);s.empire.shares=20;s.empire.lifetimeAll=40000000;s.lifetime=0;assert.equal(prestigeOffer(s).eligible,false);assert.equal(prestigeOffer(s).target,40960000);s.lifetime=4100000;assert.equal(prestigeOffer(s).gain,1);assert.equal(saleMultiplier(s.empire),2);const old=migrateProgression({prestige:2});assert.equal(old.shares,8);assert.equal(old.lifetimeAll,40000000);assert.ok(Math.abs(saleMultiplier(old)-1.4)<1e-9);assert.equal(migrateProgression({prestige:2,shares:3,lifetimeAll:5}).shares,3);assert.equal(migrateProgression({prestige:Infinity}).prestige,0);assert.equal(migrateProgression({prestige:9999}).prestige,999)});
test('VIP reward requires reputation unlock and a fast handoff',()=>{assert.equal(customerType(60,6),'vip');assert.notEqual(customerType(59,6),'vip');const p=migrateProgression({reputation:70});assert.equal(satisfyCustomer(p,-1,'vip','everyday',15),2);assert.equal(satisfyCustomer(p,-1,'vip','everyday',16),1)});
test('delayed timers preserve fixed steps, cap long-stall estimates and respect pause',()=>{assert.deepEqual(elapsedSteps(.2,4),{steps:16,offline:0});assert.deepEqual(elapsedSteps(.2,0),{steps:0,offline:0});assert.deepEqual(elapsedSteps(100000,1),{steps:0,offline:86400});assert.deepEqual(elapsedSteps(100000,0),{steps:0,offline:86400});assert.equal(elapsedSteps(-1,1).steps,0);assert.equal(elapsedSteps(NaN,1).steps,0);assert.equal(migrateProgression({returnReport:{seconds:86400,earnings:[1,2,3,4]}}).returnReport.seconds,86400)});

test('customers come for a type — half flower, three in ten pre-rolls, one in five edibles — and get it when their strain stocks it',()=>{
  const all=rows([T,T,T]),flower=rows();
  const wants=[...Array(10).keys()].map(n=>wantedFormat(all,n,0));
  assert.deepEqual([0,1,2].map(f=>wants.filter(w=>w===f).length),[5,3,2]);
  assert.equal(wantedFormat(flower,9,0),0,'nobody gets a type the strain does not stock yet');
  assert.equal(wantedFormat(all,9,1),0,'edibles of Amber Bloom are not on the menu');
  assert.equal(formatPremium(all,2,0),FORMATS[2].value);assert.equal(formatPremium(all,2,1),1);assert.equal(formatPremium(flower,2,0),1);
  assert.equal(stocks(all,2),true,'some strain sells edibles');assert.equal(stocks(all,2,undefined,[1,2]),false);
  // Ten customers' takings times the door's demand: stocking every type beats flower alone.
  const takings=menu=>[...Array(10).keys()].reduce((n,id)=>n+formatPremium(menu,wantedFormat(menu,id,0),0),0)*menuFormatFactor(menu,'demand',0);
  assert.ok(takings(all)>takings(flower),`every type (${takings(all)}) should beat flower alone (${takings(flower)})`);
});

test('the order milestone ladder keeps going past $43T with the same formula',()=>{
  for(let i=21;i<=60;i++){const m=milestone(i),prev=milestone(i-1);assert.ok(m,'step '+i);assert.equal(m.name,'EMPIRE CONTRACT '+(i-3));
    assert.ok(Math.abs(m.goal/prev.goal-3)<1e-9);assert.ok(Math.abs(m.reward/m.goal-.2)<1e-9);assert.ok(Number.isFinite(m.reward));}
  assert.equal(milestone(-1),null);assert.equal(milestone(1.5),null);
  // It ends only before the numbers overflow.
  assert.equal(milestone(1000),null);
});

test('saves holding shares from the old square-root curve keep them and keep earning on the cube-root curve',()=>{
  // 4,800 shares came from $2.3T on the old curve; the cube root of that is only ~613, so a reopen pays what the curve
  // adds past the last reopen's revenue, not the gap to 4,800.
  const s={money:0,lifetime:0,empire:migrateProgression({shares:4800,lifetimeAll:2.3e12})};
  let o=prestigeOffer(s);assert.equal(o.eligible,false);assert.equal(o.total,4800);
  s.lifetime=o.target-s.empire.lifetimeAll;o=prestigeOffer(s);assert.equal(o.gain,1);assert.equal(o.total,4801);
  s.lifetime=2.3e12;assert.equal(prestigeOffer(s).gain,sharesFor(4.6e12)-sharesFor(2.3e12));
});
