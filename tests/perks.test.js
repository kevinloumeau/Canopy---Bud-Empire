import test from 'node:test';import assert from 'node:assert/strict';
import {FOUNDER_LOOK,FOUNDER_LEVEL,PERKS,perkMax,startGrant,stakeMultiplier,STAKE_MAX,migratePerks,perkLevel,perkCost,buyPerk,perkStart,spenderGap,rushLength,crossSeconds,trainerGap,keptBranch} from '../src/perks.js';
test('old saves get one point per share; bad levels are clamped',()=>{
  assert.deepEqual(migratePerks(undefined,8),{points:8,levels:{}});
  assert.deepEqual(migratePerks({points:3.7,levels:{seed:9,rush:-1,nope:2,stake:500}},50),{points:3,levels:{seed:5,stake:STAKE_MAX}});
});
test('buying spends points, climbs the cost ladder and stops at max',()=>{
  const p={points:20,levels:{}};
  assert.equal(perkCost(p,'seed'),2);assert.ok(buyPerk(p,'seed'));assert.equal(p.points,18);assert.equal(perkCost(p,'seed'),5);
  assert.ok(buyPerk(p,'seed'));assert.ok(buyPerk(p,'seed'));assert.equal(p.points,1);assert.equal(perkCost(p,'seed'),30);assert.equal(buyPerk(p,'seed'),false);
  p.points=1000;assert.ok(buyPerk(p,'seed'));assert.ok(buyPerk(p,'seed'));assert.equal(perkCost(p,'seed'),null);assert.equal(buyPerk(p,'seed'),false);
  assert.equal(buyPerk({points:1,levels:{}},'crew'),false);assert.equal(buyPerk(p,'missing'),false);
  PERKS.forEach(x=>assert.equal(x.blurb(0).length>0,true));
});
test('perk effects',()=>{
  const p={points:0,levels:{seed:2,crew:3,vault:1,regulars:2,rush:1,breeder:2}};
  assert.deepEqual(perkStart(p),{money:10000,line:16,offlineLevel:1,kiosks:0,formats:0,strains:0,drone:0,lounge:0,branchCap:0});
  assert.deepEqual(perkStart({points:0,levels:{}}),{money:0,line:1,offlineLevel:0,kiosks:0,formats:0,strains:0,drone:0,lounge:0,branchCap:0});
  assert.equal(spenderGap(p,400),200);assert.equal(rushLength(p),90);assert.equal(crossSeconds(p,300),180);assert.equal(crossSeconds(undefined,300),300);
  assert.equal(perkLevel(undefined,'seed'),0);
});
test('run-shaping perks',()=>{
  const p={points:0,levels:{trainer:2,kiosk:3,menu:2,seedbank:1,drone:1,lounge:1,branch:2}};
  assert.deepEqual(perkStart(p),{money:0,line:1,offlineLevel:0,kiosks:3,formats:2,strains:1,drone:1,lounge:1,branchCap:6});
  assert.equal(trainerGap(p),120);assert.equal(trainerGap({levels:{}}),0);
  assert.ok(PERKS.length>=12&&new Set(PERKS.map(x=>x.id)).size===PERKS.length);
  PERKS.forEach(x=>{for(let l=0;l<=Math.min(perkMax(x),20);l++)assert.ok(!/undefined|NaN/.test(x.blurb(l)),x.id+' '+l)});
  assert.deepEqual(migratePerks({points:1,levels:{branch:9,kiosk:2}}),{points:1,levels:{kiosk:2,branch:3}});
});
test('kept branch picks the best earner and caps its level',()=>{
  assert.deepEqual(keptBranch([10,7,4,0,0],[100,300,200,0,0],6),{index:1,level:6});
  assert.deepEqual(keptBranch([2,0,0,0,0],[50,0,0,0,0],10),{index:0,level:2});
  assert.equal(keptBranch([0,0,0,0,0],[0,0,0,0,0],10),null);assert.equal(keptBranch([5,0,0,0,0],[9,0,0,0,0],0),null);
});
test("founder's finish is a one-level perk for the seventh look",()=>{
  assert.equal(perkCost({levels:{}},'finish'),10);const p={points:10,levels:{}};assert.ok(buyPerk(p,'finish'));assert.equal(perkCost(p,'finish'),null);
  assert.equal(FOUNDER_LOOK,6);assert.equal(FOUNDER_LEVEL,100);
});
test('the shop lasts to reopens 4-6, then Founder\'s stake soaks up points',()=>{
  const fixed=PERKS.filter(p=>!p.repeat).reduce((t,p)=>t+p.costs.reduce((a,b)=>a+b,0),0);
  // Natural reopens land near 20, 60, 140, 300 and 600 cumulative shares (1 point each): the fixed shop is not bought out
  // by the 4th reopen, and is by about the 5th to 6th.
  assert.ok(fixed>300&&fixed<=900,String(fixed));
  PERKS.filter(p=>!p.repeat).forEach(p=>{for(let i=1;i<p.costs.length;i++)assert.ok(p.costs[i]>=p.costs[i-1]*2,p.id+' climbs')});
  const p={points:100,levels:{}};assert.equal(perkCost(p,'stake'),25);assert.ok(buyPerk(p,'stake'));assert.equal(perkCost(p,'stake'),38);
  assert.ok(buyPerk(p,'stake'));assert.equal(perkCost(p,'stake'),56);assert.equal(stakeMultiplier(p),1.2);assert.equal(stakeMultiplier(undefined),1);
  assert.ok(perkCost({levels:{stake:30}},'stake')>1e6,'the sink keeps getting dearer');
});
test('start perks bought mid-run grant at once: cash difference plus floors',()=>{
  const g=startGrant({levels:{seed:1}},{levels:{seed:2,kiosk:1,crew:1}});
  assert.equal(g.money,9000);assert.equal(g.kiosks,1);assert.equal(g.line,6);
  const none=startGrant({levels:{crew:2}},{levels:{crew:2,rush:1}});assert.equal(none.money,0);assert.equal(none.line,0);
  assert.equal(startGrant({levels:{}},{levels:{seed:5}}).money,1e7);
});
