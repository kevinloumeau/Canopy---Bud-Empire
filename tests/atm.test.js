import test from 'node:test';
import assert from 'node:assert/strict';
import {ATM_BUILD,ATM_MACHINE_COSTS,ATM_SPOTS,ATM_STAND_X,migrateAtm,atmLook,atmFeeShare,atmUseShare,atmUseSeconds,wantsCash,atmCapacity,atmIncome,atmLevelCost,atmMachineCost,buyAtm,buyAtmLevel,buyAtmLevels,atmMaxQuote,buyAtmMachine,freeAtm} from '../src/atm.js';

test('saves keep only a sane level and machine count',()=>{
  assert.deepEqual(migrateAtm(),{level:0,machines:0});
  assert.deepEqual(migrateAtm({level:12.7,machines:9}),{level:12,machines:3});
  assert.deepEqual(migrateAtm({level:-4,machines:2}),{level:0,machines:0});
  assert.deepEqual(migrateAtm({level:5}),{level:5,machines:1});
  assert.deepEqual(migrateAtm({level:400,machines:'x'}),{level:100,machines:1});
});
test('the look changes at the station look levels and takes the founder finish at Lv 100',()=>{
  assert.deepEqual([1,9,10,29,30,50,74,75,99,100].map(atmLook),[1,1,2,2,3,4,4,5,5,6]);
});
test('levels raise the fee and the share of cash users and speed up withdrawals',()=>{
  for(let l=1;l<100;l++){
    assert.ok(atmFeeShare(l+1)>atmFeeShare(l),'fee at '+l);
    assert.ok(atmUseShare(l+1)>atmUseShare(l),'share at '+l);
    assert.ok(atmUseSeconds(l+1)<atmUseSeconds(l),'speed at '+l);
  }
  assert.equal(atmUseShare(1),.3);assert.ok(Math.abs(atmUseShare(100)-.4)<1e-9);
  assert.equal(atmUseSeconds(1),3.5);assert.ok(Math.abs(atmUseSeconds(100)-1.5)<.01);
  assert.equal(atmFeeShare(0),0);
});
test('cash users are spread evenly through the arrivals',()=>{
  const users=[...Array(1000).keys()].filter(id=>wantsCash(id,1)).length;
  assert.ok(users>=299&&users<=301,String(users));
  assert.equal([...Array(100).keys()].filter(id=>wantsCash(id,0)).length,0);
});
test('fees follow customers until the machines are full, and a machine adds room',()=>{
  const one={level:1,machines:1},two={level:1,machines:2};
  assert.equal(atmIncome({level:0,machines:0},2,100),0);
  const light=atmIncome(one,.2,100);
  assert.ok(Math.abs(light-.2*.3*atmFeeShare(1)*100)<1e-9);
  assert.ok(Math.abs(atmIncome(one,20,100)-atmCapacity(one)*atmFeeShare(1)*100)<1e-9);
  assert.ok(atmIncome(two,20,100)>atmIncome(one,20,100)*1.99);
});
test('buying: build, levels, max and machines, never past the cash or the caps',()=>{
  const s={money:ATM_BUILD-1,atm:migrateAtm()};
  assert.equal(buyAtm(s),false);assert.equal(buyAtmLevel(s),false);assert.equal(atmMachineCost(s.atm),null);
  s.money=ATM_BUILD;assert.equal(buyAtm(s),true);assert.deepEqual(s.atm,{level:1,machines:1});assert.equal(s.money,0);assert.equal(buyAtm(s),false);
  s.money=atmLevelCost(1);assert.equal(buyAtmLevel(s),true);assert.equal(s.atm.level,2);assert.equal(s.money,0);
  s.money=1e6;const quote=atmMaxQuote(s.atm,s.money);const bought=buyAtmLevels(s);
  assert.equal(bought,quote.levels);assert.ok(Math.abs(1e6-quote.cost-s.money)<1e-6);
  s.money=1e15;buyAtmLevels(s);assert.equal(s.atm.level,100);assert.equal(atmLevelCost(100),null);assert.equal(buyAtmLevel(s),false);
  assert.equal(atmMachineCost(s.atm),ATM_MACHINE_COSTS[0]);assert.equal(buyAtmMachine(s),true);assert.equal(buyAtmMachine(s),true);
  assert.equal(s.atm.machines,3);assert.equal(atmMachineCost(s.atm),null);assert.equal(buyAtmMachine(s),false);
});
test('a machine is free until a customer holds it',()=>{
  assert.equal(freeAtm([],2),0);
  assert.equal(freeAtm([{cash:{machine:0}}],2),1);
  assert.equal(freeAtm([{cash:{machine:0}},{cash:{machine:1}}],2),-1);
  assert.equal(freeAtm([{cash:null}],0),-1);
});
test('the machines stand on the left pavement, clear of the storefront, the walkers and each other',()=>{
  ATM_SPOTS.forEach(s=>{assert.ok(s.x<-14&&s.x>-14.7);assert.ok(s.z>9.3,'past the corner post')});
  for(let i=0;i<ATM_SPOTS.length;i++)for(let j=i+1;j<ATM_SPOTS.length;j++)assert.ok(Math.abs(ATM_SPOTS[i].z-ATM_SPOTS[j].z)>=1.1);
  // The cash user stands between the machine and the customers' lane (x -12.4).
  assert.ok(ATM_STAND_X>ATM_SPOTS[0].x&&ATM_STAND_X<-12.9);
});
