import test from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTERS,migrateJourney,advanceJourney,currentChapter} from '../src/journey.js';
const state=()=>({money:30,lifetime:0,sold:0,lines:[1,1,1,1,1,1],strains:[1,0,0,0],empire:{stores:[{level:0},{level:0},{level:0},{level:0},{level:0}],network:{stores:[{relationship:0},{relationship:0},{relationship:0}]}},journey:migrateJourney()});
test('legacy and malformed journals migrate to safe, known chapter IDs',()=>{
 for(const raw of [null,undefined,3,{}, {completed:'first-bags'}])assert.deepEqual(migrateJourney(raw),{completed:[]});
 assert.deepEqual(migrateJourney({completed:['river','river','unknown']}),{completed:['river']});
});
test('chapters use actual sales, upgrades, unlocks, branch stations and stars without changing the economy',()=>{
 const s=state();assert.equal(currentChapter(s).id,'first-bags');
 s.sold=10;s.lines.fill(3);s.strains[1]=1;s.empire.stores.forEach(b=>{b.level=1;b.lines=[3,3,3,3,3,3]});s.empire.stars=[7,0,0,0,0];s.flagship=1;s.city={warehouse:1,growhouse:1,billboard:1,terplab:1};s.empire.prestige=1;
 const before=structuredClone(s);assert.equal(advanceJourney(s).length,CHAPTERS.length);assert.equal(currentChapter(s),null);
 const {journey,...economy}=s;const {journey:old,...original}=before;assert.deepEqual(economy,original);
 assert.deepEqual(advanceJourney(s),[]);
});
test('existing players get credit out of order and completed chapters remain complete on reload',()=>{
 const s=state();s.empire.stores[0].level=1;advanceJourney(s);assert.deepEqual(s.journey.completed,['river']);assert.equal(currentChapter(s).id,'first-bags');
 s.journey=migrateJourney(JSON.parse(JSON.stringify(s.journey)));s.empire.stores[0].level=0;
 assert.deepEqual(advanceJourney(s),[]);assert.deepEqual(s.journey.completed,['river']);
});
test('fresh runs have no journal carryover and partial progress is bounded',()=>{
 const s=state();s.sold=7;assert.equal(currentChapter(s).progress,7);assert.equal(advanceJourney(s).length,0);
 s.sold=100;advanceJourney(s);assert.equal(currentChapter(s).id,'rhythm');assert.equal(currentChapter(state()).id,'first-bags');
});

test('the story runs on past the first hour: far branches, HQ, every city building, a full store and the first reopen',()=>{
 const ids=CHAPTERS.map(c=>c.id);
 for(const id of ['full-house','oasis','alpine','warehouse','growhouse','hq','billboard','terplab','reopen'])assert.ok(ids.includes(id),id);
 assert.equal(new Set(ids).size,ids.length);
 const s=state();s.journey.completed=ids.slice(0,7);
 assert.equal(currentChapter(s).id,'full-house');
 s.empire.stars=[7,0,0,0,0];advanceJourney(s);assert.equal(currentChapter(s).id,'oasis');
 s.empire.stores[3].level=1;s.empire.stores[4].level=1;advanceJourney(s);assert.equal(currentChapter(s).id,'warehouse');
 s.city={warehouse:1,growhouse:0,billboard:0,terplab:0};advanceJourney(s);assert.equal(currentChapter(s).id,'growhouse');
 s.city.growhouse=2;s.flagship=1;advanceJourney(s);assert.equal(currentChapter(s).id,'billboard');
 s.city.billboard=1;s.city.terplab=1;advanceJourney(s);assert.equal(currentChapter(s).id,'reopen');
 s.empire.prestige=1;advanceJourney(s);assert.equal(currentChapter(s),null);
 // Every chapter names a destination the Goals card can open.
 for(const c of CHAPTERS)assert.ok(/^(pickup|stations|flowers|river|riverside|empire|map|store\d)$/.test(c.destination),c.id);
});
