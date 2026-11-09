import test from 'node:test';
import assert from 'node:assert/strict';
import {FORKS,RESEARCH_BRANCHES,ALSO,CUT,RESEARCH_VERSION,levelCost,mergeResearch,freshForks,migrateForks,sideStatus,takeSide,partnerOf,levelsToGate,forkOf,MASTERY_FROM,MASTERY_MAX,tapered,isMastery} from '../src/research.js';
const OLD=['trafficLevel','pickupLevel','readyLevel','curingLevel','durationLevel','kioskSpeedLevel','onlineBonusLevel','comfortLevel','scannerLevel','webLevel','seedBatchLevel','growBatchLevel','harvestBatchLevel','packSpeedLevel','serviceLevel','signLevel','loyaltyLevel','basketLevel','terpeneLevel','breedingLevel','displayLevel','trendLevel','fleetLevel','cargoLevel','repeatLevel','offlineLevel'];
const KEYS=['growBatchLevel','curingLevel','trendLevel','breedingLevel','offlineLevel','basketLevel','trafficLevel','displayLevel','loyaltyLevel','serviceLevel','webLevel','onlineBonusLevel','fleetLevel','cargoLevel'];
const shop=levels=>{const s={};OLD.forEach(k=>{s[k]=0});return Object.assign(s,levels)};
test('every shop upgrade sits on exactly one branch and forks pair two upgrades of the same branch',()=>{
  const all=RESEARCH_BRANCHES.flatMap(b=>b.keys);assert.deepEqual([...all].sort(),[...KEYS].sort());
  FORKS.forEach(f=>{assert.equal(f.sides.length,2);f.sides.forEach(k=>assert.ok(RESEARCH_BRANCHES.find(b=>b.id===f.branch).keys.includes(k)))});
  const sides=FORKS.flatMap(f=>f.sides);assert.equal(new Set(sides).size,sides.length);
});
test('old saves take whichever side already has levels and keep every level',()=>{
  const s=shop({curingLevel:19,trendLevel:18,basketLevel:19,trafficLevel:4,serviceLevel:1});
  s.forks=migrateForks(undefined,s);
  assert.equal(s.forks.yield,'curingLevel');assert.equal(s.forks.shelf,'basketLevel');assert.equal(s.forks.counter,undefined);
  assert.equal(s.forks.drones,null);assert.equal(s.forks.lab,undefined);
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
test('every fork is open from the start',()=>{
  const s=shop({});s.forks=freshForks();
  KEYS.forEach(k=>assert.notEqual(sideStatus(s,k),'gated'));assert.equal(levelsToGate(s,'trendLevel'),0);
});
test('every old line either stays a pick, rides along with one, or is cut and refunded',()=>{
  const riders=Object.values(ALSO).flat(),cut=Object.keys(CUT);
  OLD.forEach(k=>assert.equal([KEYS.includes(k),riders.includes(k),cut.includes(k)].filter(Boolean).length,1,k));
  Object.keys(ALSO).forEach(k=>assert.ok(KEYS.includes(k)));
});
test('old saves merge once: riders take the highest level, cut lines refund what they cost',()=>{
  const s=shop({growBatchLevel:2,seedBatchLevel:7,harvestBatchLevel:3,signLevel:5,trafficLevel:1,readyLevel:2,pickupLevel:1,terpeneLevel:0,comfortLevel:4});
  const refund=mergeResearch(s);
  ['growBatchLevel','seedBatchLevel','harvestBatchLevel','packSpeedLevel'].forEach(k=>assert.equal(s[k],7));
  assert.equal(s.trafficLevel,5);assert.equal(s.signLevel,5);
  ['serviceLevel','kioskSpeedLevel','scannerLevel','comfortLevel'].forEach(k=>assert.equal(s[k],4));
  assert.equal(s.readyLevel,0);assert.equal(s.pickupLevel,0);
  assert.equal(refund,levelCost(600,0)+levelCost(600,1)+levelCost(1200,0));assert.equal(refund,600+1080+1200);
  assert.equal(s.researchVersion,RESEARCH_VERSION);assert.equal(mergeResearch(s),0);
});
test('Mastery: levels 1-20 keep their old prices, 21-30 cost 1.6x a level',()=>{
  const old=(base,level)=>Math.round(base*Math.pow(1.8,Math.min(level,8))*Math.pow(2.15,Math.max(0,level-8)));
  for(let l=0;l<MASTERY_FROM;l++)assert.equal(levelCost(1500,l),old(1500,l));
  assert.equal(MASTERY_FROM,20);assert.equal(MASTERY_MAX,30);
  for(let l=MASTERY_FROM;l<MASTERY_MAX;l++)assert.ok(Math.abs(levelCost(1500,l+1)/levelCost(1500,l)-1.6)<1e-6);
  // Grow lights' last level is a late-run buy, not a minute of income.
  assert.ok(levelCost(1500,29)>1e11&&levelCost(1500,29)<2e11);
  assert.equal(isMastery(20),false);assert.equal(isMastery(21),true);
});
test('tapered effects slow to half a step in Mastery and never pass sense',()=>{
  assert.equal(tapered(10,.03,.015),.3);assert.ok(Math.abs(tapered(20,.03,.015)-.6)<1e-9);assert.ok(Math.abs(tapered(30,.03,.015)-.75)<1e-9);
  assert.ok(tapered(30,.04,.01)<1);assert.equal(tapered(-3,.03,.015),0);
});
