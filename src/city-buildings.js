import {heldQuote,quotePrice} from './stage-quotes.js';
// City buildings (Kevin, 2026-11-02: "similar to the HQ should there be other buildings around; ie terp lab, grow
// house, warehouse"). Four more lots round the block come up for sale one by one, each in three paid stages raised on
// a build timer like Canopy HQ (src/flagship.js), and each does its own job rather than another flat +% sales:
//   Warehouse      keeps paying for longer while you are away (a longer offline cap, at the normal rate),
//   Grow house     every station makes more (capacity, not price),
//   Billboard      more walk-ins (demand, so counters and kiosks matter again),
//   Terp lab       the trending and boutique strains sell for more (rewards the menu you pick).
// Unlocks follow a six-hour sim of a first run that plays every system (2026-11-07): $6B is ~1 h in, HQ at $200B ~2 h,
// $400B ~2.5 h, $1.2T ~3.5 h and $2.5T ~5 h, an hour or more apart, so the last ones fill the stretch after the
// branches are done. Each stage costs `minutes` of income when it comes up for sale (src/stage-quotes.js), never less
// than its `cost`. Each lot keeps its old terrace until it unlocks.
export const CITY_BUILDINGS=[
  {id:'warehouse',hours:1.25,name:'Warehouse',unlock:5e9,lot:[-8.03,35.5],stages:[
    {name:'Loading dock',cost:1.2e8,minutes:8},{name:'High racks',cost:3e8,minutes:12},{name:'Cold vault',cost:7e8,minutes:16}],
    // +4 h away and +25% offline pay per stage.
    effect:'away'},
  {id:'growhouse',hours:3.25,name:'Grow house',unlock:3e11,lot:[-27.5,-5.44],stages:[
    {name:'Glasshouse',cost:4e8,minutes:12},{name:'Hydro benches',cost:1e9,minutes:16},{name:'Light deck',cost:2.4e9,minutes:16}],
    // +20% station output per stage.
    effect:'output'},
  {id:'billboard',hours:4.5,name:'Billboard',unlock:7e11,lot:[-7.72,-23.5],stages:[
    {name:'Street boards',cost:4e9,minutes:12},{name:'Digital screen',cost:9e9,minutes:16},{name:'Rooftop spectacular',cost:1.8e10,minutes:20}],
    // +20% walk-ins per stage.
    effect:'traffic'},
  {id:'terplab',hours:5.5,name:'Terp lab',unlock:1.2e12,lot:[0.8,-23.5],stages:[
    {name:'Extraction room',cost:9e9,minutes:12},{name:'Flavour library',cost:1.8e10,minutes:16},{name:'Master blender',cost:3.2e10,minutes:20}],
    // +35% on the trending strain and +20% on boutique strains per stage.
    effect:'terps'}
];
export const CITY_MAX=3;
// Tops of what stands on each lot per stage (0 = for sale), in map units, for the map tags (src/three/city-buildings.js builds to these).
export const CITY_TOPS={warehouse:[2.6,6.6,7.4,8.6],growhouse:[2.6,5.4,5.6,6.6],billboard:[2.6,7.6,12.8,16.4],terplab:[2.6,6.6,9.4,12.6]};
export const CITY_IDS=CITY_BUILDINGS.map(b=>b.id);
export function cityBuilding(id){return CITY_BUILDINGS.find(b=>b.id===id)||null;}

// A save's stages per building, 0-3 each; anything missing or broken starts at 0.
export function migrateCity(raw){
  const out={};
  CITY_BUILDINGS.forEach(b=>{const v=raw&&raw[b.id];out[b.id]=typeof v==='number'&&Number.isFinite(v)?Math.max(0,Math.min(b.stages.length,Math.floor(v))):0;});
  return out;
}
// A slower run still gets each lot after its `hours` of open-shop time (state.run.time); a save that already built a
// stage (from before the unlocks moved up) keeps the lot open.
export function cityUnlocked(id,lifetime,stage=0,runSeconds=0){const b=cityBuilding(id);return !!b&&(Number(lifetime)>=b.unlock||(stage|0)>0||Number(runSeconds)>=b.hours*3600);}
export function cityNext(id,stage){const b=cityBuilding(id);return b&&b.stages[stage|0]||null;}
// The next stage's price: the one held for it in state.quotes when `state` is given and holds one, else its floor.
export function cityCost(id,stage,state){const next=cityNext(id,stage);if(!next)return null;return heldQuote(state,id,stage|0)??next.cost;}
// The price to hold for the next stage when it comes up for sale at `income` a second.
export function cityQuote(id,stage,income){const next=cityNext(id,stage);return next?quotePrice(next.cost,next.minutes,income):null;}
// Pays for the next stage; the caller starts its build and calls openCityStage when the timer ends.
export function payCity(state,id){
  const cost=cityCost(id,state.city[id],state);
  if(cost===null||!Number.isFinite(state.money)||state.money<cost)return false;
  state.money-=cost;return true;
}
export function openCityStage(state,id){const b=cityBuilding(id);state.city[id]=Math.min(b.stages.length,(state.city[id]|0)+1);return state.city[id];}

// Effects, each a plain factor from the stages open (city = state.city).
// Kevin (2026-11-08) chose a cap-only Warehouse: away pay runs at the shop's real rate, never more than playing.
export const AWAY_HOURS=4,OUTPUT_STEP=.2,TRAFFIC_STEP=.2,TREND_STEP=.35,BOUTIQUE_STEP=.2;
export function awayExtraSeconds(city){return (city?.warehouse|0)*AWAY_HOURS*3600;}
export function awayPay(city){return 1;}
export function outputFactor(city){return 1+(city?.growhouse|0)*OUTPUT_STEP;}
export function trafficFactor(city){return 1+(city?.billboard|0)*TRAFFIC_STEP;}
// Strain i's price factor: trending strain, boutique strains (every strain past the house one), or neither.
export function terpFactor(city,i,trending){const n=city?.terplab|0;return (i===trending?1+n*TREND_STEP:1)*(i>0?1+n*BOUTIQUE_STEP:1);}
// What one more stage gives, in a few words for the buy box.
export function stageGain(id){
  return {warehouse:'+4h away',growhouse:'+20% output',billboard:'+20% walk-ins',terplab:'+35% trend strain'}[id]||'';
}
