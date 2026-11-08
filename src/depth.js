import {sharesFor,SHARE_BASE,SHARE_BONUS} from './progression.js';
export const BOOST_MAX=20;
export const boostCost=level=>Math.min(Number.MAX_SAFE_INTEGER,Math.floor(250*2.25**level));
export const FORMATS=[
  {name:'Flower',cost:0,value:1,demand:1,packing:1,service:1,share:5,detail:'Half the door wants it · standard service'},
  {name:'Pre-rolls',cost:2500,value:1.45,demand:1.25,packing:1.8,service:.85,share:3,detail:'+45% value for the 3 in 10 who want them · faster pickup · slower packing'},
  {name:'Edibles',cost:10000,value:2.2,demand:.6,packing:3,service:1.2,share:2,detail:'+120% value for the 1 in 5 who want them · lower demand · slow packing'}
];
// Who wants what: of every ten customers five want flower, three pre-rolls and two edibles. Each strain stocks its own
// types: a customer who wants pre-rolls of a strain that only sells flower takes flower at flower's price.
const FORMAT_MIX=[];FORMATS.forEach((f,i)=>{for(let n=0;n<f.share;n++)FORMAT_MIX.push(i)});
export const STRAIN_COUNT=4;
// A type costs more on a pricier strain, in step with what it earns there: Meadow Mint $1.5K pre-rolls / $6K edibles up to
// Midnight Orchid $3.5K / $14K. Four strains fully stocked cost $47.5K (one unlock for every strain was $12.5K); the 1-hour
// sim against main lands within noise (-4% at 30 min, +2% at 1 h).
export const FORMAT_COST_SCALE=[0.6,0.8,1,1.4];
export function formatCost(index,strain){return Math.round((FORMATS[index]?.cost||0)*(FORMAT_COST_SCALE[strain]??1));}
const row=raw=>[true,raw?.[1]===true,raw?.[2]===true];
// `byStrain[strain][type]`. Old saves stocked a type for every strain at once (and before that kept a `formats` choice
// per strain); each strain keeps every type the shop had. Flower is always stocked, so `active` (units on the HUD and
// delivery sheet) is flower.
export function migrateMenu(raw){
  const r=raw&&typeof raw==='object'?raw:{};
  const byStrain=Array.isArray(r.byStrain)?Array.from({length:STRAIN_COUNT},(_,i)=>row(r.byStrain[i])):Array.from({length:STRAIN_COUNT},()=>row(r.unlocked));
  return {byStrain,active:0};
}
// Does `strain` sell as `type`? With no strain: does any strain (of `strains`, default all) sell as it.
export function stocks(menu,type,strain,strains){
  if(type===0)return true;
  if(Number.isInteger(strain))return menu.byStrain?.[strain]?.[type]===true;
  return (strains||menu.byStrain.map((_,i)=>i)).some(i=>menu.byStrain?.[i]?.[type]===true);
}
export function wantedFormat(menu,sequence,strain){const want=FORMAT_MIX[Math.abs(sequence|0)%FORMAT_MIX.length];return stocks(menu,want,strain)?want:0;}
export function formatPremium(menu,want,strain){return FORMATS[stocks(menu,want,strain)?want:0].value;}
export function stockedFormats(menu,strain){return FORMATS.map((f,i)=>i).filter(i=>stocks(menu,i,strain));}
// Stock a new type for one strain, paying that strain's cost once.
export function unlockFormat(state,index,strain){
  const m=state.productMenu;if(!FORMATS[index]||!m.byStrain[strain])return false;if(stocks(m,index,strain))return true;
  const cost=formatCost(index,strain);if(state.money<cost)return false;state.money-=cost;m.byStrain[strain][index]=true;return true;
}
// A factor of the stocked mix: one property averaged over the door, each customer counting the type they buy. For one
// strain, or averaged over `strains` (the menu) when none is given.
export function menuFormatFactor(menu,property,strain,strains){
  const one=i=>FORMAT_MIX.reduce((n,f)=>n+FORMATS[stocks(menu,f,i)?f:0][property],0)/FORMAT_MIX.length;
  if(Number.isInteger(strain))return one(strain);
  const list=strains&&strains.length?strains:[0];return list.reduce((n,i)=>n+one(i),0)/list.length;
}
const FIRST=[['FIRST BATCH',100,40],['STEADY SUPPLY',1500,450],['MASS MARKET',20000,6000],['CITY CONTRACT',250000,90000]];
// The order ladder never runs out (it used to stop after index 20, about $43T lifetime, and read ALL ORDERS FILLED):
// each Empire contract asks three times the last and pays a fifth of its goal. It ends only where the numbers stop
// being finite.
export function milestone(index){if(!Number.isInteger(index)||index<0)return null;const row=FIRST[index];if(row)return {name:row[0],goal:row[1],reward:row[2]};
  const goal=1000000*3**(index-4),reward=200000*3**(index-4);return Number.isFinite(goal)&&goal<Number.MAX_VALUE/3?{name:'EMPIRE CONTRACT '+(index-3),goal,reward}:null;}
// Prestige pays shares for all-time revenue (earlier runs plus this one), never for hoarded cash. The first
// reopen needs $10M; after that any new share makes reopening worthwhile, and the player chooses when.
export function prestigeOffer(state){
  const p=state.empire,rank=p.prestige||0,shares=p.shares||0,allTime=(p.lifetimeAll||0)+Math.max(0,state.lifetime||0);
  // A reopen pays the shares the curve adds between the last reopen's all-time revenue and now, on top of the shares
  // already held, so saves that earned shares on the older, steeper curve keep them and keep earning at the new pace.
  const earned=sharesFor(p.lifetimeAll||0),reached=sharesFor(allTime),gain=Math.max(0,reached-earned),total=shares+gain;
  const target=allTime<SHARE_BASE?SHARE_BASE:Math.ceil(SHARE_BASE*(Math.max(earned,reached)+1)**3/1000-1e-6);
  return {rank,shares,total,gain,allTime,target,eligible:gain>=1,current:1+shares*SHARE_BONUS,multiplier:1+total*SHARE_BONUS};
}
export const OFFLINE_STEP=14400, OFFLINE_MAX=OFFLINE_STEP*6;
// Fixed simulation steps driven by elapsed time, not timer callback count.
// Long visible stalls use the same capped estimate as a suspended tab; the player's own cap is applied on collection.
export function elapsedSteps(seconds,speed){const elapsed=Math.max(0,Number.isFinite(seconds)?seconds:0);return elapsed>5?{steps:0,offline:Math.min(OFFLINE_MAX,elapsed)}:{steps:Math.floor((elapsed+1e-8)/.05)*speed,offline:0};}
