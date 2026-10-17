// Breeding, as the iOS app has it: six cultivars, one for each pair of different base strains. A cross needs the
// Breeding bench from the Shop and both parents at strain level 5, costs $15K × 3 per cultivar already found, and
// takes five minutes of game time, so it pauses with the game and while it is closed. Each discovery adds +2% to
// every sale for good and survives reopening. Save shape matches the app: crosses {done:['0-1',…], active:{pair,remaining}}.
import {crossSeconds} from './perks.js';
export const CULTIVARS=[
  {id:'0-1',name:'Golden Hour',parents:[0,1],lore:'The patio pour'},
  {id:'0-2',name:'Lavender Field',parents:[0,2],lore:'Cool, floral and easy'},
  {id:'0-3',name:'Moonlit Meadow',parents:[0,3],lore:'A meadow at dusk, sealed in a jar'},
  {id:'1-2',name:'Sunset Static',parents:[1,2],lore:'Warm haze with a hum'},
  {id:'1-3',name:'Ember Orchid',parents:[1,3],lore:'A slow burn after dark'},
  {id:'2-3',name:'Twilight Velvet',parents:[2,3],lore:'The last call of the night'}
];
export const PARENT_LEVEL=5, CROSS_SECONDS=300, CROSS_BONUS=.02, CROSS_BASE=15000;
const ids=CULTIVARS.map(c=>c.id);
// Saves from the web strain library (ten cultivars with real-time crosses) keep every discovery: pair crosses map to
// the same pair, and a self-cross becomes the first undiscovered pair that includes its strain.
const OLD_PAIRS={'honey-mint':'0-1','lavender-frost':'0-2','moonlit-mint':'0-3','sunset-haze':'1-2','amber-orchid':'1-3','velvet-midnight':'2-3'};
const OLD_SELF={'mint-select':0,'amber-gold':1,'violet-reserve':2,'orchid-noir':3};
function fromLibrary(old,done){
  if(OLD_PAIRS[old])return OLD_PAIRS[old];
  const s=OLD_SELF[old];if(s===undefined)return null;
  return CULTIVARS.find(c=>c.parents.includes(s)&&!done.includes(c.id))?.id||null;
}
export function migrateCrosses(raw,library,breed,now=Date.now()){
  const done=[];let active=null;
  if(raw&&typeof raw==='object'){
    (Array.isArray(raw.done)?raw.done:[]).forEach(id=>{if(ids.includes(id)&&!done.includes(id))done.push(id)});
    const a=raw.active;if(a&&ids.includes(a.pair)&&!done.includes(a.pair)&&Number.isFinite(a.remaining))active={pair:a.pair,remaining:Math.max(0,Math.min(CROSS_SECONDS,a.remaining))};
    return {done,active};
  }
  (Array.isArray(library)?library:[]).forEach(id=>{const pair=fromLibrary(id,done);if(pair&&!done.includes(pair))done.push(pair)});
  if(breed&&typeof breed==='object'&&Number.isFinite(breed.ready)){
    const pair=fromLibrary(breed.id,done);
    if(pair&&!done.includes(pair))active={pair,remaining:Math.max(0,Math.min(CROSS_SECONDS,Math.ceil((breed.ready-now)/1000)))};
  }
  return {done,active};
}
export const crossBonus=crosses=>(crosses?.done?.length||0)*CROSS_BONUS;
export const crossCost=crosses=>CROSS_BASE*3**(crosses?.done?.length||0);
// What a card shows: discovered, breeding (time left), ready to breed, or the pair still being prepared.
export function cultivarStatus(state,c){
  const x=state.crosses;
  if(x.done.includes(c.id))return {kind:'known'};
  if(x.active&&x.active.pair===c.id)return {kind:'growing',remaining:x.active.remaining};
  if(!(state.breedingLevel>0))return {kind:'bench'};
  const levels=c.parents.map(i=>state.strains[i]||0);
  if(levels.some(l=>l<PARENT_LEVEL))return {kind:'prepare',levels,missing:c.parents.find((i,k)=>levels[k]<PARENT_LEVEL)};
  return {kind:'open',cost:crossCost(x),busy:!!x.active};
}
export function startCross(state,id){
  const c=CULTIVARS.find(x=>x.id===id);if(!c)return false;const s=cultivarStatus(state,c);
  if(s.kind!=='open'||s.busy||state.money<s.cost)return false;
  state.money-=s.cost;state.crosses.active={pair:id,remaining:crossSeconds(state.perks,CROSS_SECONDS)};return true;
}
// Game-time tick; returns the cultivar when the cross finishes.
export function tickCross(state,dt){
  const a=state.crosses.active;if(!a||!(dt>0))return null;
  a.remaining=Math.max(0,a.remaining-dt);if(a.remaining>0)return null;
  state.crosses.active=null;if(!state.crosses.done.includes(a.pair))state.crosses.done.push(a.pair);
  return CULTIVARS.find(c=>c.id===a.pair);
}
// Card order as in the app: the cross in progress, pairs ready to breed, pairs being prepared, then discoveries.
const ORDER={growing:0,open:1,bench:2,prepare:2,known:3};
export function sortedCultivars(state){return CULTIVARS.map(c=>({c,s:cultivarStatus(state,c)})).sort((a,b)=>ORDER[a.s.kind]-ORDER[b.s.kind]);}
