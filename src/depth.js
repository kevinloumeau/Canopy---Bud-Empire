export const BOOST_MAX=12;
export const boostCost=level=>Math.min(Number.MAX_SAFE_INTEGER,Math.floor(250*2.25**level));
export const FORMATS=[
  {name:'Flower',cost:0,value:1,demand:1,packing:1,service:1,share:5,detail:'Half the door wants it · standard service'},
  {name:'Pre-rolls',cost:2500,value:1.45,demand:1.25,packing:1.8,service:.85,share:3,detail:'+45% value for the 3 in 10 who want them · faster pickup · slower packing'},
  {name:'Edibles',cost:10000,value:2.2,demand:.6,packing:3,service:1.2,share:2,detail:'+120% value for the 1 in 5 who want them · lower demand · slow packing'}
];
// Who wants what: of every ten customers five want flower, three pre-rolls and two edibles — among the formats the
// shop sells (a format nobody sells yet sends its fans to flower). A customer takes a menu strain sold their way when
// there is one, and a format's premium is only paid by a customer who wanted it, so a menu that is all edibles sells
// most of its jars at flower prices while a mixed menu serves everyone at theirs.
const FORMAT_MIX=[];FORMATS.forEach((f,i)=>{for(let n=0;n<f.share;n++)FORMAT_MIX.push(i)});
export function wantedFormat(menu,sequence){const want=FORMAT_MIX[Math.abs(sequence|0)%FORMAT_MIX.length];return menu.unlocked[want]?want:0;}
export function strainForFormat(menu,menuStrains,pick,want,sequence){
  if(strainFormat(menu,pick)===want)return pick;
  const same=(menuStrains||[]).filter(i=>strainFormat(menu,i)===want);
  return same.length?same[Math.abs(sequence|0)%same.length]:pick;
}
export function formatPremium(menu,strain,want){return strainFormat(menu,strain)===want?FORMATS[strainFormat(menu,strain)].value:1;}
// Each strain on the menu is sold in its own format. `formats[strain]` is the format index per strain (an old save's
// single choice becomes every strain's format); `active` is the format most of the menu uses, kept for unit labels.
export function migrateMenu(raw){
  const r=raw&&typeof raw==='object'?raw:{};const unlocked=[true,r.unlocked?.[1]===true,r.unlocked?.[2]===true];
  const active=Number.isInteger(r.active)&&unlocked[r.active]?r.active:0;
  const formats=(Array.isArray(r.formats)?r.formats:[]).map(v=>Number.isInteger(v)&&unlocked[v]?v:active);
  return {unlocked,active,formats};
}
export function strainFormat(menu,strain){const f=menu.formats?.[strain];return Number.isInteger(f)&&FORMATS[f]&&menu.unlocked[f]?f:menu.active;}
// Pick a format for one strain, paying its unlock the first time any strain uses it.
export function chooseFormat(state,index,strain){
  if(!FORMATS[index]||!Number.isInteger(strain)||strain<0)return false;const m=state.productMenu;
  if(!m.unlocked[index]){if(state.money<FORMATS[index].cost)return false;state.money-=FORMATS[index].cost;m.unlocked[index]=true}
  if(!Array.isArray(m.formats))m.formats=[];
  for(let i=0;i<=strain;i++)if(!Number.isInteger(m.formats[i]))m.formats[i]=m.active;
  m.formats[strain]=index;return true;
}
// The format most of the menu sells in (lowest index on a tie) — units on the HUD and delivery sheet follow it.
export function dominantFormat(menu,menuStrains){
  const counts=FORMATS.map(()=>0);(menuStrains||[]).forEach(i=>{counts[strainFormat(menu,i)]++});
  let best=0;counts.forEach((n,i)=>{if(n>counts[best])best=i});return (menuStrains||[]).length?best:menu.active;
}
// A factor of the format mix on the menu: the mean of one property across the strains on sale.
export function menuFormatFactor(menu,menuStrains,property){
  const list=(menuStrains||[]);if(!list.length)return FORMATS[menu.active][property];
  return list.reduce((n,i)=>n+FORMATS[strainFormat(menu,i)][property],0)/list.length;
}
const FIRST=[['FIRST BATCH',100,40],['STEADY SUPPLY',1500,450],['MASS MARKET',20000,6000],['CITY CONTRACT',250000,90000]];
export function milestone(index){if(!Number.isInteger(index)||index<0||index>20)return null;const row=FIRST[index];return row?{name:row[0],goal:row[1],reward:row[2]}:{name:'EMPIRE CONTRACT '+(index-3),goal:1000000*3**(index-4),reward:200000*3**(index-4)};}
// Prestige is gated on this run's lifetime revenue, not on hoarding cash.
export function prestigeOffer(state){const rank=state.empire.prestige||0,target=10000000*3**Math.min(rank,18);return {rank,target,eligible:rank<19&&state.lifetime>=target,multiplier:1+(rank+1)*.2};}
// Fixed simulation steps driven by elapsed time, not timer callback count.
// Long visible stalls use the same capped estimate as a suspended tab.
export function elapsedSteps(seconds,speed){const elapsed=Math.max(0,Number.isFinite(seconds)?seconds:0);return elapsed>5?{steps:0,offline:Math.min(14400,elapsed)}:{steps:Math.floor((elapsed+1e-8)/.05)*speed,offline:0};}
