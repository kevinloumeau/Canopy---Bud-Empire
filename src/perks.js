// Founder perks: a prestige shop. Each reopening pays one founder point per share gained, and points buy permanent
// perks that shape every later run. Shares stay untouched, so spending points never lowers the sales bonus.
export const PERKS=[
  {id:'seed',name:'Seed money',blurb:level=>'Reopen with '+['$0','$1K','$10K','$100K'][level]+' cash',costs:[2,4,8]},
  {id:'crew',name:'Veteran crew',blurb:level=>'Stations reopen at level '+(1+level*5),costs:[3,6,12]},
  {id:'vault',name:'Kept vault',blurb:level=>'Back-room safe reopens at level '+level,costs:[2,4,6]},
  {id:'regulars',name:'Regulars',blurb:level=>'Big spenders '+(level*25)+'% more often',costs:[3,6]},
  {id:'rush',name:'Long rush',blurb:level=>'Rushes last '+(60+level*30)+'s',costs:[2,4]},
  {id:'breeder',name:"Breeder's eye",blurb:level=>'Crosses '+(level*20)+'% faster',costs:[3,6]},
  // Run-shaping perks: each one changes what the first minutes of a new shop look like, not just a number.
  {id:'trainer',name:'Head trainer',blurb:level=>level?'Bottleneck crew trains itself every '+['','4 min','2 min','1 min'][level]:'Bottleneck crew trains itself',costs:[3,6,12]},
  {id:'kiosk',name:'Kiosks on day one',blurb:level=>'Reopen with '+(level||1)+' self-order kiosk'+(level>1?'s':''),costs:[2,4,8]},
  {id:'menu',name:'Full menu',blurb:level=>level>1?'Reopen selling pre-rolls and edibles':'Reopen selling pre-rolls',costs:[2,5]},
  {id:'seedbank',name:'Seed bank',blurb:level=>'Reopen with '+(1+Math.max(1,level))+' strains unlocked',costs:[2,4,6]},
  {id:'drone',name:'Drone pad',blurb:level=>level>1?'Reopen with the bulk drone':'Reopen with the auto drone',costs:[3,6]},
  {id:'lounge',name:'Rooftop lease',blurb:level=>'Reopen with the lounge at tier '+Math.max(1,level),costs:[5,10]},
  {id:'branch',name:'Kept branch',blurb:level=>'Your best branch stays open, up to level '+[3,3,6,10][level],costs:[4,8,12]},
  // The seventh station look: flagship models rebuilt in ebony, emerald and gold (art/blender/founder_finish.py).
  {id:'finish',name:"Founder's finish",blurb:()=>'Lv 100 stations and a Lv 75 door booth take the founder look',costs:[6]}
];
export const FOUNDER_LOOK=6,FOUNDER_LEVEL=100;
const num=(v,max)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
// Saves from before the shop start with one point per share they already hold, so veterans have something to spend.
export function migratePerks(raw,shares=0){
  if(!raw||typeof raw!=='object')return {points:num(shares,1e6),levels:{}};
  const levels={};PERKS.forEach(p=>{const l=num(raw.levels?.[p.id],p.costs.length);if(l)levels[p.id]=l});
  return {points:num(raw.points,1e6),levels};
}
export function perkLevel(perks,id){return perks?.levels?.[id]||0;}
export function perkCost(perks,id){const p=PERKS.find(x=>x.id===id),l=perkLevel(perks,id);return p&&l<p.costs.length?p.costs[l]:null;}
export function buyPerk(perks,id){const c=perkCost(perks,id);if(c===null||perks.points<c)return false;perks.points-=c;perks.levels[id]=perkLevel(perks,id)+1;return true;}
// What a fresh run starts with, and the in-run modifiers.
export function perkStart(perks){const l=id=>perkLevel(perks,id);
  return {money:[0,1000,10000,100000][l('seed')],line:1+l('crew')*5,offlineLevel:l('vault'),kiosks:l('kiosk'),formats:l('menu'),strains:l('seedbank'),drone:l('drone'),lounge:l('lounge'),branchCap:[0,3,6,10][l('branch')]};}
// Head trainer: seconds between free crew levels at the bottleneck station, or 0 without the perk.
export const trainerGap=perks=>[0,240,120,60][perkLevel(perks,'trainer')];
// Kept branch: which branch carries over (the best-earning one, by the caller's rates) and at what level.
export function keptBranch(levels,rates,cap){
  if(!cap)return null;let best=-1;levels.forEach((l,i)=>{if(l>0&&(best<0||rates[i]>rates[best]))best=i});
  return best<0?null:{index:best,level:Math.min(cap,levels[best])};
}
export const spenderGap=(perks,base)=>base*(1-.25*perkLevel(perks,'regulars'));
export const rushLength=perks=>60+30*perkLevel(perks,'rush');
export const crossSeconds=(perks,seconds)=>Math.max(1,Math.round(seconds*(1-.2*perkLevel(perks,'breeder'))));
