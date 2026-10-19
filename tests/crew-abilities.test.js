import test from 'node:test';
import assert from 'node:assert/strict';
import {ABILITIES,ABILITY_UNLOCK,ABILITY_FACTOR,ABILITY_SALES,ABILITY_SECONDS,ABILITY_RECHARGE,migrateAbilities,abilityStatus,useAbility,tickAbilities,abilityFactor,abilitySales,clockLabel} from '../src/crew-abilities.js';

test('every production station has one crew ability',()=>{assert.equal(ABILITIES.length,6)});

test('old saves and junk migrate to idle, ready clocks',()=>{
  for(const old of [undefined,null,'x',{active:[NaN,-5,'z']},{recharge:'no'}]){
    const a=migrateAbilities(old);
    assert.deepEqual(a.active,[0,0,0,0,0,0]);assert.equal(a.recharge.length,6);
    a.recharge.forEach(r=>assert.ok(r>=0&&r<=ABILITY_RECHARGE));
  }
  assert.equal(migrateAbilities({active:[50],recharge:[700]}).active[0],50);
  assert.equal(migrateAbilities({active:[1e9]}).active[0],ABILITY_SECONDS);
});

test('an ability unlocks with crew level, runs, then recharges',()=>{
  const a=migrateAbilities();
  assert.equal(abilityStatus(a,1,ABILITY_UNLOCK-1),'locked');
  assert.equal(useAbility(a,1,ABILITY_UNLOCK-1),false);
  assert.equal(abilityStatus(a,1,ABILITY_UNLOCK),'ready');
  assert.equal(useAbility(a,1,ABILITY_UNLOCK),true);
  assert.equal(abilityStatus(a,1,ABILITY_UNLOCK),'active');
  assert.equal(abilityFactor(a,1),ABILITY_FACTOR);assert.equal(abilityFactor(a,0),1);
  assert.equal(useAbility(a,1,ABILITY_UNLOCK),false);
  tickAbilities(a,ABILITY_SECONDS);
  assert.equal(abilityStatus(a,1,ABILITY_UNLOCK),'recharging');assert.equal(abilityFactor(a,1),1);
  tickAbilities(a,ABILITY_RECHARGE-ABILITY_SECONDS);
  assert.equal(abilityStatus(a,1,ABILITY_UNLOCK),'ready');
});

test('time away recharges every crew at once',()=>{
  const a=migrateAbilities();[0,2,5].forEach(i=>useAbility(a,i,10));
  tickAbilities(a,3600);
  [0,2,5].forEach(i=>assert.equal(abilityStatus(a,i,10),'ready'));
});

test('sales lift stacks with each running crew',()=>{
  const a=migrateAbilities();assert.equal(abilitySales(a),1);
  useAbility(a,0,5);useAbility(a,3,5);
  assert.ok(Math.abs(abilitySales(a)-(1+2*ABILITY_SALES))<1e-9);
});

test('countdown label',()=>{assert.equal(clockLabel(899.2),'15:00');assert.equal(clockLabel(61),'1:01');assert.equal(clockLabel(0),'0:00')});
