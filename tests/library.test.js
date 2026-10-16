import test from 'node:test';
import assert from 'node:assert/strict';
import {CULTIVARS,RARITY,rarityOf,migrateLibrary,migrateBreed,libraryBonus,crossCost,cultivarStatus,startCross,collectCross} from '../src/library.js';
const fresh=()=>({money:1e6,strains:[1,1,0,0],library:[],breed:null});
test('crosses need both parents, cost money, take real time and add a permanent bonus once',()=>{
 const s=fresh(),t=1e12;
 assert.equal(cultivarStatus(s,CULTIVARS.find(c=>c.id==='lavender-frost'),t).kind,'locked');
 assert.equal(startCross(s,'lavender-frost',t),false);
 assert.equal(startCross(s,'honey-mint',t),true);assert.equal(s.money,1e6-2000);
 assert.equal(startCross(s,'mint-select',t),false,'one cross at a time');
 assert.equal(collectCross(s,t+14*60000),null);assert.equal(cultivarStatus(s,CULTIVARS[2],t+60000).kind,'growing');
 assert.equal(collectCross(s,t+15*60000).name,'Honey Mint');assert.deepEqual(s.library,['honey-mint']);
 assert.equal(cultivarStatus(s,CULTIVARS[2],t).kind,'known');assert.equal(startCross(s,'honey-mint',t),false);
 assert.ok(Math.abs(libraryBonus(s.library)-.02)<1e-9);
});
test('rarity follows the rarer parent and cost scales with income',()=>{
 assert.deepEqual(CULTIVARS.map(rarityOf),[0,0,0,1,1,1,2,2,2,2]);
 assert.equal(crossCost(CULTIVARS[0],0),2000);assert.equal(crossCost(CULTIVARS[0],100),30000);
 assert.ok(Math.abs(libraryBonus(CULTIVARS.map(c=>c.id))-(3*.02+3*.03+4*.05))<1e-9);
});
test('library saves migrate safely',()=>{
 assert.deepEqual(migrateLibrary(['honey-mint','nope','honey-mint',4]),['honey-mint']);assert.deepEqual(migrateLibrary(null),[]);
 assert.equal(migrateBreed({id:'nope',ready:5}),null);assert.equal(migrateBreed({id:'orchid-noir',ready:NaN}),null);
 assert.deepEqual(migrateBreed({id:'orchid-noir',ready:5}),{id:'orchid-noir',ready:5,minutes:RARITY[2].minutes});
});
