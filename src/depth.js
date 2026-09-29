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
export function formatUnlocked(menu,strain,index){
  if(index===0)return true;
  return menu?.unlockedByStrain?.[strain]?.[index]===true;
}
export function wantedFormat(menu,sequence){
  const want=FORMAT_MIX[Math.abs(sequence|0)%FORMAT_MIX.length];
  return want===0||menu.unlockedByStrain?.some(row=>row?.[want]===true)?want:0;
}
export function strainForFormat(menu,menuStrains,pick,want,sequence){
  if(strainFormat(menu,pick)===want)return pick;
  const same=(menuStrains||[]).filter(i=>strainFormat(menu,i)===want);
  return same.length?same[Math.abs(sequence|0)%same.length]:pick;
}
export function formatPremium(menu,strain,want){return strainFormat(menu,strain)===want?FORMATS[strainFormat(menu,strain)].value:1;}
// Each strain owns its format unlocks. Legacy global unlocks are retained only for strains that were already using
// them; an old single active choice becomes the four original strains' format so existing saves keep that setup.
export function migrateMenu(raw){
  const r=raw&&typeof raw==='object'?raw:{};
  const legacyUnlocked=[true,r.unlocked?.[1]===true,r.unlocked?.[2]===true];
  const legacyActive=Number.isInteger(r.active)&&FORMATS[r.active]&&legacyUnlocked[r.active]?r.active:0;
  const hasNewUnlocks=Array.isArray(r.unlockedByStrain);
  const sourceFormats=Array.isArray(r.formats)?r.formats:(raw&&legacyActive?[legacyActive,legacyActive,legacyActive,legacyActive]:[]);
  const unlockedByStrain=sourceFormats.map((value,strain)=>{
    const saved=hasNewUnlocks&&Array.isArray(r.unlockedByStrain[strain])?r.unlockedByStrain[strain]:[];
    const row=[true,saved[1]===true,saved[2]===true];
    if(!hasNewUnlocks&&Number.isInteger(value)&&legacyUnlocked[value])row[value]=true;
    return row;
  });
  if(hasNewUnlocks)r.unlockedByStrain.forEach((saved,strain)=>{if(!unlockedByStrain[strain])unlockedByStrain[strain]=[true,saved?.[1]===true,saved?.[2]===true]});
  const formats=sourceFormats.map((value,strain)=>Number.isInteger(value)&&FORMATS[value]&&formatUnlocked({unlockedByStrain},strain,value)?value:0);
  const active=Number.isInteger(r.active)&&FORMATS[r.active]&&formats.includes(r.active)?r.active:(formats[0]||0);
  return {active,formats,unlockedByStrain};
}
export function strainFormat(menu,strain){const f=menu.formats?.[strain];return Number.isInteger(f)&&FORMATS[f]&&formatUnlocked(menu,strain,f)?f:0;}
// Pick a format for one strain, paying separately the first time that strain uses it.
export function chooseFormat(state,index,strain){
  if(!FORMATS[index]||!Number.isInteger(strain)||strain<0)return false;const m=state.productMenu;
  if(!Array.isArray(m.unlockedByStrain))m.unlockedByStrain=[];
  if(!Array.isArray(m.unlockedByStrain[strain]))m.unlockedByStrain[strain]=[true,false,false];
  if(!formatUnlocked(m,strain,index)){if(state.money<FORMATS[index].cost)return false;state.money-=FORMATS[index].cost;m.unlockedByStrain[strain][index]=true}
  if(!Array.isArray(m.formats))m.formats=[];
  for(let i=0;i<=strain;i++)if(!Number.isInteger(m.formats[i]))m.formats[i]=0;
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
// The week's special: a mild, always-on modifier that rotates deterministically with the UTC week, so every
// player shares the same week without a server. Each entry nudges one corner of the economy and names it.
export const WEEKLIES=[
  {id:'green-thumb',name:'Green Thumb Week',detail:'Grow room output +15%',grow:1.15},
  {id:'terpene-fair',name:'Terpene Fair',detail:'Boutique strains pay +15%',boutique:1.15},
  {id:'street-fair',name:'Street Fair',detail:'Walk-ins arrive 12% faster',traffic:1.12},
  {id:'courier-rally',name:'Courier Rally',detail:'Online orders pay +20%',online:1.2},
  {id:'neighborhood-days',name:'Neighborhood Days',detail:'Branch income +15%',branch:1.15},
  {id:'high-tea',name:'High Tea Week',detail:'Lounge sessions pay +25%',lounge:1.25}
];
export function weeklySpecial(now){const week=Math.floor((now/86400000+4)/7);return WEEKLIES[((week%WEEKLIES.length)+WEEKLIES.length)%WEEKLIES.length];}
// How much time away still pays. A cozy game is checked in on morning and evening, so the cap covers a night's
// sleep rather than a lunch break: the usual reason to cap tightly is conversion pressure on an in-app purchase,
// and this game sells nothing. (Idle practitioners name a stingy cap as a churn driver — Anthony Pecorella, GDC
// Europe 2016, on his own churn out of Egg Inc's two-hour cap.)
export const OFFLINE_SECONDS=43200;
// Fixed simulation steps driven by elapsed time, not timer callback count.
// Long visible stalls use the same capped estimate as a suspended tab.
export function elapsedSteps(seconds,speed){const elapsed=Math.max(0,Number.isFinite(seconds)?seconds:0);return elapsed>5?{steps:0,offline:Math.min(OFFLINE_SECONDS,elapsed)}:{steps:Math.floor((elapsed+1e-8)/.05)*speed,offline:0};}

// Stored speed values remain mode identifiers so existing saves keep their selection.
export function playbackRate(mode){return mode===1?.7:mode===2?1.4:mode===4?4:0;}
