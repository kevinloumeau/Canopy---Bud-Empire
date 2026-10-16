// Founder perks: a prestige shop. Each reopening pays one founder point per share gained, and points buy permanent
// perks that shape every later run. Shares stay untouched, so spending points never lowers the sales bonus.
export const PERKS=[
  {id:'seed',name:'Seed money',blurb:level=>'Reopen with '+['$0','$1K','$10K','$100K'][level]+' cash',costs:[2,4,8]},
  {id:'crew',name:'Veteran crew',blurb:level=>'Stations reopen at level '+(1+level*5),costs:[3,6,12]},
  {id:'vault',name:'Kept vault',blurb:level=>'Back-room safe reopens at level '+level,costs:[2,4,6]},
  {id:'regulars',name:'Regulars',blurb:level=>'Big spenders '+(level*25)+'% more often',costs:[3,6]},
  {id:'rush',name:'Long rush',blurb:level=>'Rushes last '+(60+level*30)+'s',costs:[2,4]},
  {id:'thumb',name:'Green thumb',blurb:level=>'Crosses '+(level*20)+'% faster',costs:[3,6]}
];
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
export function perkStart(perks){return {money:[0,1000,10000,100000][perkLevel(perks,'seed')],line:1+perkLevel(perks,'crew')*5,offlineLevel:perkLevel(perks,'vault')};}
export const spenderGap=(perks,base)=>base*(1-.25*perkLevel(perks,'regulars'));
export const rushLength=perks=>60+30*perkLevel(perks,'rush');
export const crossMinutes=(perks,minutes)=>Math.max(1,Math.round(minutes*(1-.2*perkLevel(perks,'thumb'))));
