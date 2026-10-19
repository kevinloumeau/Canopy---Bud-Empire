import test from 'node:test';
import assert from 'node:assert/strict';
import {FORKS,RESEARCH_BRANCHES,freshForks,migrateForks,sideStatus,takeSide,partnerOf,levelsToGate,forkOf} from '../src/research.js';
const KEYS=['trafficLevel','pickupLevel','readyLevel','curingLevel','durationLevel','kioskSpeedLevel','onlineBonusLevel','comfortLevel','scannerLevel','webLevel','seedBatchLevel','growBatchLevel','harvestBatchLevel','packSpeedLevel','serviceLevel','signLevel','loyaltyLevel','basketLevel','terpeneLevel','breedingLevel','displayLevel','trendLevel','fleetLevel','cargoLevel','repeatLevel','offlineLevel'];
const shop=levels=>{const s={};KEYS.forEach(k=>{s[k]=0});return Object.assign(s,levels)};
test('every shop upgrade sits on exactly one branch and forks pair two upgrades of the same branch',()=>{
  const all=RESEARCH_BRANCHES.flatMap(b=>b.keys);assert.deepEqual([...all].sort(),[...KEYS].sort());
  FORKS.forEach(f=>{assert.equal(f.sides.length,2);f.sides.forEach(k=>assert.ok(RESEARCH_BRANCHES.find(b=>b.id===f.branch).keys.includes(k)))});
  const sides=FORKS.flatMap(f=>f.sides);assert.equal(new Set(sides).size,sides.length);
});
test('old saves take whichever side already has levels and keep every level',()=>{
  const s=shop({curingLevel:19,trendLevel:18,basketLevel:19,trafficLevel:4,serviceLevel:1});
  s.forks=migrateForks(undefined,s);
  assert.equal(s.forks.yield,'curingLevel');assert.equal(s.forks.shelf,'basketLevel');assert.equal(s.forks.counter,'serviceLevel');
  assert.equal(s.forks.drones,null);assert.equal(s.forks.lab,null);
  assert.equal(sideStatus(s,'curingLevel'),'open');assert.equal(sideStatus(s,'trendLevel'),'closed');assert.equal(s.trendLevel,18);
  assert.equal(migrateForks({yield:'trendLevel',shelf:'nonsense'},s).yield,'trendLevel');
  assert.equal(migrateForks({yield:'trendLevel',shelf:'nonsense'},s).shelf,'basketLevel');
});
test('first purchase on an undecided side takes it and closes the partner',()=>{
  const s=shop({});s.forks=freshForks();
  assert.equal(sideStatus(s,'fleetLevel'),'pick');assert.equal(sideStatus(s,'cargoLevel'),'pick');
  assert.equal(takeSide(s,'cargoLevel'),true);assert.equal(takeSide(s,'fleetLevel'),false);
  assert.equal(sideStatus(s,'cargoLevel'),'open');assert.equal(sideStatus(s,'fleetLevel'),'closed');
  assert.equal(partnerOf('cargoLevel'),'fleetLevel');assert.equal(sideStatus(s,'webLevel'),'open');assert.equal(forkOf('webLevel'),null);
});
test('a branch\'s second fork opens once the branch has enough levels',()=>{
  const s=shop({seedBatchLevel:5});s.forks=freshForks();
  assert.equal(sideStatus(s,'growBatchLevel'),'gated');assert.equal(levelsToGate(s,'growBatchLevel'),7);
  s.curingLevel=7;assert.equal(sideStatus(s,'terpeneLevel'),'pick');assert.equal(levelsToGate(s,'terpeneLevel'),0);
});
