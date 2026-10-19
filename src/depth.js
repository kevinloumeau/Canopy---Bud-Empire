import {sharesFor,SHARE_BASE,SHARE_BONUS} from './progression.js';
export const BOOST_MAX=20;
export const boostCost=level=>Math.min(Number.MAX_SAFE_INTEGER,Math.floor(250*2.25**level));
export const FORMATS=[
  {name:'Flower',cost:0,value:1,demand:1,packing:1,service:1,share:5,detail:'Half the door wants it · standard service'},
  {name:'Pre-rolls',cost:2500,value:1.45,demand:1.25,packing:1.8,service:.85,share:3,detail:'+45% value for the 3 in 10 who want them · faster pickup · slower packing'},
  {name:'Edibles',cost:10000,value:2.2,demand:.6,packing:3,service:1.2,share:2,detail:'+120% value for the 1 in 5 who want them · lower demand · slow packing'}
];
// Who wants what: of every ten customers five want flower, three pre-rolls and two edibles. Every strain on the menu
// sells in every type the shop stocks, so a customer always gets their way and pays that type's premium; a type the
// shop does not stock yet sends its fans to flower.
const FORMAT_MIX=[];FORMATS.forEach((f,i)=>{for(let n=0;n<f.share;n++)FORMAT_MIX.push(i)});
export function wantedFormat(menu,sequence){const want=FORMAT_MIX[Math.abs(sequence|0)%FORMAT_MIX.length];return menu.unlocked[want]?want:0;}
export function formatPremium(menu,want){return FORMATS[menu.unlocked[want]?want:0].value;}
// The types the shop stocks. Old saves kept a `formats` choice per strain; it is dropped, and what was unlocked stays
// unlocked. Flower is always stocked, so `active` (units on the HUD and delivery sheet) is flower.
export function migrateMenu(raw){
  const r=raw&&typeof raw==='object'?raw:{};
  return {unlocked:[true,r.unlocked?.[1]===true,r.unlocked?.[2]===true],active:0};
}
export function stockedFormats(menu){return FORMATS.map((f,i)=>i).filter(i=>menu.unlocked[i]);}
// Stock a new type for every strain, paying its unlock once.
export function unlockFormat(state,index){
  const m=state.productMenu;if(!FORMATS[index])return false;if(m.unlocked[index])return true;
  if(state.money<FORMATS[index].cost)return false;state.money-=FORMATS[index].cost;m.unlocked[index]=true;return true;
}
// A factor of the stocked mix: one property averaged over the door, each customer counting the type they buy.
export function menuFormatFactor(menu,property){return FORMAT_MIX.reduce((n,f)=>n+FORMATS[menu.unlocked[f]?f:0][property],0)/FORMAT_MIX.length;}
const FIRST=[['FIRST BATCH',100,40],['STEADY SUPPLY',1500,450],['MASS MARKET',20000,6000],['CITY CONTRACT',250000,90000]];
export function milestone(index){if(!Number.isInteger(index)||index<0||index>20)return null;const row=FIRST[index];return row?{name:row[0],goal:row[1],reward:row[2]}:{name:'EMPIRE CONTRACT '+(index-3),goal:1000000*3**(index-4),reward:200000*3**(index-4)};}
// Prestige pays shares for all-time revenue (earlier runs plus this one), never for hoarded cash. The first
// reopen needs $10M; after that any new share makes reopening worthwhile, and the player chooses when.
export function prestigeOffer(state){
  const p=state.empire,rank=p.prestige||0,shares=p.shares||0,allTime=(p.lifetimeAll||0)+Math.max(0,state.lifetime||0);
  const total=Math.max(shares,sharesFor(allTime)),gain=total-shares,next=total+1;
  const target=allTime<SHARE_BASE?SHARE_BASE:Math.ceil(SHARE_BASE*(next/10)**2-1e-6);
  return {rank,shares,total,gain,allTime,target,eligible:gain>=1,current:1+shares*SHARE_BONUS,multiplier:1+total*SHARE_BONUS};
}
export const OFFLINE_STEP=14400, OFFLINE_MAX=OFFLINE_STEP*6;
// Fixed simulation steps driven by elapsed time, not timer callback count.
// Long visible stalls use the same capped estimate as a suspended tab; the player's own cap is applied on collection.
export function elapsedSteps(seconds,speed){const elapsed=Math.max(0,Number.isFinite(seconds)?seconds:0);return elapsed>5?{steps:0,offline:Math.min(OFFLINE_MAX,elapsed)}:{steps:Math.floor((elapsed+1e-8)/.05)*speed,offline:0};}
