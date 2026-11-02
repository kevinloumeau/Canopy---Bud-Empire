// City buildings (Kevin, 2026-11-02: "similar to the HQ should there be other buildings around; ie terp lab, grow
// house, warehouse"). Four more lots round the block come up for sale one by one, each in three paid stages raised on
// a build timer like Canopy HQ (src/flagship.js), and each does its own job rather than another flat +% sales:
//   Warehouse      pays more while you are away (longer cap, bigger offline pay),
//   Grow house     every station makes more (capacity, not price),
//   Billboard      more walk-ins (demand, so counters and kiosks matter again),
//   Terp lab       the trending and boutique strains sell for more (rewards the menu you pick).
// Unlocks follow a six-hour play sim on main: $300M is ~30 min in, $1.5B ~1 h, HQ at $6B ~2 h, $20B ~3.5 h and $50B
// ~5 h, so the last two fill the stretch after the branches are done. Each lot keeps its old terrace until it unlocks.
export const CITY_BUILDINGS=[
  {id:'warehouse',name:'Warehouse',unlock:3e8,lot:[-8.03,35.5],stages:[
    {name:'Loading dock',cost:1.2e8},{name:'High racks',cost:3e8},{name:'Cold vault',cost:7e8}],
    // +4 h away and +25% offline pay per stage.
    effect:'away'},
  {id:'growhouse',name:'Grow house',unlock:1.5e9,lot:[-27.5,-5.44],stages:[
    {name:'Glasshouse',cost:4e8},{name:'Hydro benches',cost:1e9},{name:'Light deck',cost:2.4e9}],
    // +20% station output per stage.
    effect:'output'},
  {id:'billboard',name:'Billboard',unlock:2e10,lot:[-7.72,-23.5],stages:[
    {name:'Street boards',cost:4e9},{name:'Digital screen',cost:9e9},{name:'Rooftop spectacular',cost:1.8e10}],
    // +20% walk-ins per stage.
    effect:'traffic'},
  {id:'terplab',name:'Terp lab',unlock:5e10,lot:[0.8,-23.5],stages:[
    {name:'Extraction room',cost:9e9},{name:'Flavour library',cost:1.8e10},{name:'Master blender',cost:3.2e10}],
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
export function cityUnlocked(id,lifetime){const b=cityBuilding(id);return !!b&&Number(lifetime)>=b.unlock;}
export function cityNext(id,stage){const b=cityBuilding(id);return b&&b.stages[stage|0]||null;}
export function cityCost(id,stage){return cityNext(id,stage)?.cost??null;}
// Pays for the next stage; the caller starts its build and calls openCityStage when the timer ends.
export function payCity(state,id){
  const cost=cityCost(id,state.city[id]);
  if(cost===null||!Number.isFinite(state.money)||state.money<cost)return false;
  state.money-=cost;return true;
}
export function openCityStage(state,id){const b=cityBuilding(id);state.city[id]=Math.min(b.stages.length,(state.city[id]|0)+1);return state.city[id];}

// Effects, each a plain factor from the stages open (city = state.city).
export const AWAY_HOURS=4,AWAY_PAY=.25,OUTPUT_STEP=.2,TRAFFIC_STEP=.2,TREND_STEP=.35,BOUTIQUE_STEP=.2;
export function awayExtraSeconds(city){return (city?.warehouse|0)*AWAY_HOURS*3600;}
export function awayPay(city){return 1+(city?.warehouse|0)*AWAY_PAY;}
export function outputFactor(city){return 1+(city?.growhouse|0)*OUTPUT_STEP;}
export function trafficFactor(city){return 1+(city?.billboard|0)*TRAFFIC_STEP;}
// Strain i's price factor: trending strain, boutique strains (every strain past the house one), or neither.
export function terpFactor(city,i,trending){const n=city?.terplab|0;return (i===trending?1+n*TREND_STEP:1)*(i>0?1+n*BOUTIQUE_STEP:1);}
// What one more stage gives, in a few words for the buy box.
export function stageGain(id){
  return {warehouse:'+4h away · +25% pay',growhouse:'+20% output',billboard:'+20% walk-ins',terplab:'+35% trend strain'}[id]||'';
}
