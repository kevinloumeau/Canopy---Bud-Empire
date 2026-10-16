// Strain library: cross two strains you grow to discover a named cultivar. Each discovery is permanent (it survives
// reopening) and adds a little to every sale's value, so the library is a collection with a reason to finish it.
// A cross takes real minutes, so it keeps ticking while the game is closed and gives a reason to come back.
export const CULTIVARS=[
  {id:'mint-select',name:'Mint Select',parents:[0,0]},
  {id:'amber-gold',name:'Amber Gold',parents:[1,1]},
  {id:'honey-mint',name:'Honey Mint',parents:[0,1]},
  {id:'lavender-frost',name:'Lavender Frost',parents:[0,2]},
  {id:'sunset-haze',name:'Sunset Haze',parents:[1,2]},
  {id:'violet-reserve',name:'Violet Reserve',parents:[2,2]},
  {id:'moonlit-mint',name:'Moonlit Mint',parents:[0,3]},
  {id:'amber-orchid',name:'Amber Orchid',parents:[1,3]},
  {id:'velvet-midnight',name:'Velvet Midnight',parents:[2,3]},
  {id:'orchid-noir',name:'Orchid Noir',parents:[3,3]}
];
// Rarity follows the rarer parent: crosses with Violet Haze are rare, with Midnight Orchid epic.
export const RARITY=[
  {name:'Common',bonus:.02,minutes:15,base:2000,incomeSeconds:300},
  {name:'Rare',bonus:.03,minutes:45,base:15000,incomeSeconds:900},
  {name:'Epic',bonus:.05,minutes:120,base:80000,incomeSeconds:2400}
];
const MINUTE=60000;
export function rarityOf(c){const top=Math.max(c.parents[0],c.parents[1]);return top>=3?2:top>=2?1:0;}
export function migrateLibrary(raw){
  const ids=CULTIVARS.map(c=>c.id),list=(Array.isArray(raw)?raw:[]).filter((id,i,a)=>ids.includes(id)&&a.indexOf(id)===i);
  return list;
}
export function migrateBreed(raw){
  if(!raw||typeof raw!=='object'||!CULTIVARS.some(c=>c.id===raw.id)||!Number.isFinite(raw.ready))return null;
  return {id:raw.id,ready:Math.max(0,raw.ready),minutes:Number.isFinite(raw.minutes)?Math.max(1,raw.minutes):RARITY[rarityOf(CULTIVARS.find(c=>c.id===raw.id))].minutes};
}
export function libraryBonus(library){return (library||[]).reduce((sum,id)=>{const c=CULTIVARS.find(x=>x.id===id);return c?sum+RARITY[rarityOf(c)].bonus:sum},0);}
export function crossCost(c,income){const r=RARITY[rarityOf(c)];return Math.round(Math.max(r.base,(Number.isFinite(income)?income:0)*r.incomeSeconds));}
// What a card should say: discovered, growing (with time left), ready to collect, needs a parent, or can be crossed.
export function cultivarStatus(state,c,now=Date.now(),income=0){
  const known=state.library.includes(c.id),breeding=state.breed&&state.breed.id===c.id;
  if(known)return {kind:'known'};
  if(breeding)return state.breed.ready<=now?{kind:'ready'}:{kind:'growing',remaining:state.breed.ready-now,share:1-(state.breed.ready-now)/(state.breed.minutes*MINUTE)};
  const missing=c.parents.filter(i=>!(state.strains[i]>0));
  if(missing.length)return {kind:'locked',missing};
  return {kind:'open',cost:crossCost(c,income),minutes:RARITY[rarityOf(c)].minutes,busy:!!state.breed};
}
export function startCross(state,id,now=Date.now(),income=0){
  const c=CULTIVARS.find(x=>x.id===id);if(!c)return false;const s=cultivarStatus(state,c,now,income);
  if(s.kind!=='open'||s.busy||state.money<s.cost)return false;
  state.money-=s.cost;state.breed={id,ready:now+s.minutes*MINUTE,minutes:s.minutes};return true;
}
export function collectCross(state,now=Date.now()){
  const b=state.breed;if(!b||b.ready>now)return null;state.breed=null;
  if(!state.library.includes(b.id))state.library.push(b.id);return CULTIVARS.find(c=>c.id===b.id);
}
