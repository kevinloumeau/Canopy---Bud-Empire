import test from 'node:test';
import assert from 'node:assert/strict';
import {BUILD_SECONDS,migrateBuilds,startBuild,isBuilding,buildLeft,buildShareLeft,finishBuilds,buildClock,skipCost,skipBuild} from '../src/builds.js';
import {AUTO_DRONE_COST,migrateAutoDrone,payAutoDrone,grantAutoDrone} from '../src/auto-drone.js';

test('old saves have no builds running',()=>{
  const b=migrateBuilds(undefined,1000);assert.deepEqual(b,{lounge:0,deck:0,window:0});assert.equal(isBuilding(b,'lounge'),false);
  assert.deepEqual(migrateBuilds({lounge:'x',deck:-5},1000),{lounge:0,deck:0,window:0});
});
test('a build runs on the wall clock and finishes once',()=>{
  const b=migrateBuilds({},0);startBuild(b,'lounge',0);
  assert.equal(buildLeft(b,'lounge',0),BUILD_SECONDS.lounge);assert.equal(buildShareLeft(b,'lounge',BUILD_SECONDS.lounge*500),.5);
  assert.deepEqual(finishBuilds(b,BUILD_SECONDS.lounge*1000-1),[]);
  // A long absence finishes it too: the end time has simply passed.
  assert.deepEqual(finishBuilds(b,BUILD_SECONDS.lounge*1000+3600e3),['lounge']);
  assert.equal(isBuilding(b,'lounge'),false);assert.deepEqual(finishBuilds(b,1e12),[]);
});
test('a clock set back cannot stretch a build past its full time',()=>{
  const b=migrateBuilds({deck:1e12},0);assert.equal(buildLeft(b,'deck',0),BUILD_SECONDS.deck);
});
test('the countdown reads minutes and seconds',()=>{assert.equal(buildClock(180),'3:00');assert.equal(buildClock(89.2),'1:30');assert.equal(buildClock(0),'0:00')});
test('the deck is paid for at purchase and opens on grant',()=>{
  const s={money:AUTO_DRONE_COST,autoDrone:migrateAutoDrone()};assert.equal(payAutoDrone(s),true);assert.equal(s.money,0);assert.equal(s.autoDrone.owned,false);
  grantAutoDrone(s);assert.equal(s.autoDrone.owned,true);assert.equal(s.autoDrone.enabled,true);s.money=AUTO_DRONE_COST;assert.equal(payAutoDrone(s),false);
});
test('a build can be skipped for half its price times the time left',()=>{
  const b=migrateBuilds(undefined,0);assert.equal(skipCost(b,'window',3000,0),0);
  startBuild(b,'window',0);assert.equal(skipCost(b,'window',3000,0),1500);
  assert.equal(skipCost(b,'window',3000,BUILD_SECONDS.window*500),750);
  assert.equal(skipCost(b,'window',100,BUILD_SECONDS.window*999),100);
  assert.equal(skipBuild(b,'window',1000),true);assert.deepEqual(finishBuilds(b,1000),['window']);assert.equal(skipBuild(b,'window',1000),false);
});
