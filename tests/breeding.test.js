import test from 'node:test';import assert from 'node:assert/strict';
import {CULTIVARS,migrateCrosses,crossBonus,crossCost,cultivarStatus,startCross,tickCross,sortedCultivars} from '../src/breeding.js';
const base=o=>({money:1e9,strains:[5,5,5,5],breedingLevel:1,perks:{points:0,levels:{}},crosses:{done:[],active:null},...o});
test('six cultivars, one per pair of different strains',()=>{
  assert.equal(CULTIVARS.length,6);assert.ok(CULTIVARS.every(c=>c.parents[0]<c.parents[1]&&c.id===c.parents.join('-')));
});
test('crossing needs the Breeding bench and both parents at level 5',()=>{
  assert.equal(cultivarStatus(base({breedingLevel:0}),CULTIVARS[0]).kind,'bench');
  const s=cultivarStatus(base({strains:[6,3,0,0]}),CULTIVARS[0]);assert.equal(s.kind,'prepare');assert.deepEqual(s.levels,[6,3]);assert.equal(s.missing,1);
  assert.equal(cultivarStatus(base(),CULTIVARS[0]).kind,'open');
});
test('cost triples per discovery; five minutes of game time; +2% each',()=>{
  const s=base();assert.equal(crossCost(s.crosses),15000);
  assert.ok(startCross(s,'0-1'));assert.equal(s.money,1e9-15000);assert.deepEqual(s.crosses.active,{pair:'0-1',remaining:300});
  assert.equal(startCross(s,'0-2'),false,'one cross at a time');
  assert.equal(tickCross(s,299),null);assert.equal(tickCross(s,1).name,'Golden Hour');assert.deepEqual(s.crosses,{done:['0-1'],active:null});
  assert.equal(crossCost(s.crosses),45000);assert.equal(crossBonus(s.crosses),.02);assert.equal(cultivarStatus(s,CULTIVARS[0]).kind,'known');
  assert.equal(startCross(base({money:100}),'0-1'),false);
});
test("Breeder's eye shortens the cross",()=>{const s=base({perks:{points:0,levels:{breeder:2}}});startCross(s,'2-3');assert.equal(s.crosses.active.remaining,180);});
test('cards sort: breeding, ready, preparing, discovered',()=>{
  const s=base({strains:[5,5,5,1],crosses:{done:['0-1'],active:{pair:'1-2',remaining:20}}});
  assert.deepEqual(sortedCultivars(s).map(e=>e.s.kind),['growing','open','prepare','prepare','prepare','known']);
});
test('web library saves keep every discovery',()=>{
  const now=1e12;
  assert.deepEqual(migrateCrosses(undefined,['honey-mint','mint-select','orchid-noir','velvet-midnight'],{id:'sunset-haze',ready:now+60000,minutes:45},now),{done:['0-1','0-2','0-3','2-3'],active:{pair:'1-2',remaining:60}});
  assert.deepEqual(migrateCrosses(undefined,['honey-mint'],{id:'honey-mint',ready:now},now),{done:['0-1'],active:null},'a cross of a known pair is dropped');
  assert.deepEqual(migrateCrosses({done:['0-1','0-1','9-9'],active:{pair:'0-1',remaining:50}},[]),{done:['0-1'],active:null});
  assert.deepEqual(migrateCrosses({done:[],active:{pair:'1-3',remaining:900}},[]),{done:[],active:{pair:'1-3',remaining:300}});
  assert.deepEqual(migrateCrosses(null,null,null),{done:[],active:null});
});
