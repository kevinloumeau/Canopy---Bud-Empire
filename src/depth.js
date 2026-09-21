export const BOOST_MAX=12;
export const boostCost=level=>Math.min(Number.MAX_SAFE_INTEGER,Math.floor(250*2.25**level));
export const FORMATS=[
  {name:'Flower',cost:0,value:1,demand:1,packing:1,service:1,detail:'Steady demand · standard service'},
  {name:'Pre-rolls',cost:2500,value:1.45,demand:1.25,packing:1.8,service:.85,detail:'+45% value · faster pickup · slower packing'},
  {name:'Edibles',cost:10000,value:2.2,demand:.6,packing:3,service:1.2,detail:'+120% value · lower demand · slow packing'}
];
export function migrateMenu(raw){const r=raw&&typeof raw==='object'?raw:{};const unlocked=[true,r.unlocked?.[1]===true,r.unlocked?.[2]===true];return {unlocked,active:Number.isInteger(r.active)&&unlocked[r.active]?r.active:0};}
export function chooseFormat(state,index){if(!FORMATS[index])return false;const m=state.productMenu;if(!m.unlocked[index]){if(state.money<FORMATS[index].cost)return false;state.money-=FORMATS[index].cost;m.unlocked[index]=true}m.active=index;return true;}
const FIRST=[['FIRST BATCH',100,40],['STEADY SUPPLY',1500,450],['MASS MARKET',20000,6000],['CITY CONTRACT',250000,90000]];
export function milestone(index){if(!Number.isInteger(index)||index<0||index>20)return null;const row=FIRST[index];return row?{name:row[0],goal:row[1],reward:row[2]}:{name:'EMPIRE CONTRACT '+(index-3),goal:1000000*3**(index-4),reward:200000*3**(index-4)};}
// Prestige is gated on this run's lifetime revenue, not on hoarding cash.
export function prestigeOffer(state){const rank=state.empire.prestige||0,target=10000000*3**Math.min(rank,18);return {rank,target,eligible:rank<19&&state.lifetime>=target,multiplier:1+(rank+1)*.2};}
// Fixed simulation steps driven by elapsed time, not timer callback count.
// Long visible stalls use the same capped estimate as a suspended tab.
export function elapsedSteps(seconds,speed){const elapsed=Math.max(0,Number.isFinite(seconds)?seconds:0);return elapsed>5?{steps:0,offline:Math.min(14400,elapsed)}:{steps:Math.floor((elapsed+1e-8)/.05)*speed,offline:0};}
