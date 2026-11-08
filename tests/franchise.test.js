import test from 'node:test';
import assert from 'node:assert/strict';
import {FRANCHISE_TIERS,FRANCHISE_GAIN,FRANCHISE_PRICE,franchiseOffer,signFranchise,franchiseTier} from '../src/franchise.js';
import {migrateProgression,saleMultiplier,STORES} from '../src/progression.js';

const shop=(over={})=>{const empire=migrateProgression({});Object.assign(empire,over);return {money:0,lifetime:0,empire};};
const finishAll=p=>{p.stars=STORES.map(()=>7);};

test('franchise tiers stay locked until every branch is finished, then open on all-time revenue and sign for cash',()=>{
  const s=shop({lifetimeAll:5e12});s.money=1e15;
  assert.equal(franchiseOffer(s).need,'branches');assert.equal(signFranchise(s),false);
  s.empire.stars=STORES.map((_,i)=>i<4?7:3);assert.equal(franchiseOffer(s).need,'branches','four finished branches are not enough');
  finishAll(s.empire);s.empire.lifetimeAll=1e12-1;assert.equal(franchiseOffer(s).need,'revenue');
  s.lifetime=1;const o=franchiseOffer(s);assert.equal(o.need,null);assert.equal(o.cost,FRANCHISE_TIERS[0].revenue*FRANCHISE_PRICE);
  const before=saleMultiplier(s.empire);assert.equal(signFranchise(s),true);assert.equal(s.money,1e15-o.cost);
  assert.equal(franchiseTier(s.empire),1);assert.ok(Math.abs(saleMultiplier(s.empire)/before-FRANCHISE_GAIN)<1e-9);
  assert.equal(franchiseOffer(s).need,'revenue','the next tier needs more revenue');
});
test('short on cash says so; every tier signed leaves nothing next',()=>{
  const s=shop({lifetimeAll:1e30});finishAll(s.empire);
  assert.equal(franchiseOffer(s).need,'cash');assert.equal(signFranchise(s),false);
  s.money=1e30;FRANCHISE_TIERS.forEach(()=>assert.equal(signFranchise(s),true));
  assert.equal(franchiseOffer(s).next,null);assert.equal(signFranchise(s),false);
  assert.ok(Math.abs(franchiseOffer(s).current-FRANCHISE_GAIN**FRANCHISE_TIERS.length)<1e-6);
});
test('saves keep their tier, and junk tiers fall back to none',()=>{
  assert.equal(migrateProgression({franchise:2}).franchise,2);
  assert.equal(migrateProgression({franchise:-3}).franchise,0);assert.equal(migrateProgression({franchise:'x'}).franchise,0);
  assert.equal(migrateProgression({franchise:99}).franchise,FRANCHISE_TIERS.length);
});
