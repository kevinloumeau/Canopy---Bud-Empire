import test from 'node:test';import assert from 'node:assert/strict';
import {PERKS,migratePerks,perkLevel,perkCost,buyPerk,perkStart,spenderGap,rushLength,crossSeconds} from '../src/perks.js';
test('old saves get one point per share; bad levels are clamped',()=>{
  assert.deepEqual(migratePerks(undefined,8),{points:8,levels:{}});
  assert.deepEqual(migratePerks({points:3.7,levels:{seed:9,rush:-1,nope:2}},50),{points:3,levels:{seed:3}});
});
test('buying spends points, climbs the cost ladder and stops at max',()=>{
  const p={points:20,levels:{}};
  assert.equal(perkCost(p,'seed'),2);assert.ok(buyPerk(p,'seed'));assert.equal(p.points,18);assert.equal(perkCost(p,'seed'),4);
  assert.ok(buyPerk(p,'seed'));assert.ok(buyPerk(p,'seed'));assert.equal(p.points,6);assert.equal(perkCost(p,'seed'),null);assert.equal(buyPerk(p,'seed'),false);
  assert.equal(buyPerk({points:1,levels:{}},'crew'),false);assert.equal(buyPerk(p,'missing'),false);
  PERKS.forEach(x=>assert.equal(x.blurb(0).length>0,true));
});
test('perk effects',()=>{
  const p={points:0,levels:{seed:2,crew:3,vault:1,regulars:2,rush:1,breeder:2}};
  assert.deepEqual(perkStart(p),{money:10000,line:16,offlineLevel:1});
  assert.deepEqual(perkStart({points:0,levels:{}}),{money:0,line:1,offlineLevel:0});
  assert.equal(spenderGap(p,400),200);assert.equal(rushLength(p),90);assert.equal(crossSeconds(p,300),180);assert.equal(crossSeconds(undefined,300),300);
  assert.equal(perkLevel(undefined,'seed'),0);
});
