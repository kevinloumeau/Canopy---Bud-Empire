// Founder perks: a prestige shop. Each reopening pays one founder point per share gained, and points buy permanent
// perks that shape every later run. Shares stay untouched, so spending points never lowers the sales bonus.
// Costs climb about 2.5x a level (2026-11-07 review: the old 179-point shop was bought out by the 3rd reopen), so a real
// spend choice is still left at reopens 4-6, and Founder's stake soaks up points after that.
const CASH=['$0','$1K','$10K','$100K','$1M','$10M'];
export const PERKS=[
  {id:'seed',name:'Seed money',blurb:level=>'Reopen with '+CASH[level]+' cash',costs:[2,5,12,30,75]},
  {id:'crew',name:'Veteran crew',blurb:level=>'Stations reopen at level '+(1+level*5),costs:[3,7,16,36,80]},
  {id:'vault',name:'Kept vault',blurb:level=>'Back-room safe reopens at level '+level,costs:[2,5,12,25,50]},
  {id:'regulars',name:'Regulars',blurb:level=>'Shop events '+(level*25)+'% more often',costs:[3,8]},
  {id:'rush',name:'Long rush',blurb:level=>'Rushes last '+(60+level*30)+'s',costs:[2,6]},
  {id:'breeder',name:"Breeder's eye",blurb:level=>'Crosses '+(level*20)+'% faster',costs:[3,8]},
  // Run-shaping perks: each one changes what the first minutes of a new shop look like, not just a number.
  {id:'trainer',name:'Head trainer',blurb:level=>level?'Bottleneck crew trains itself every '+['','4 min','2 min','1 min'][level]:'Bottleneck crew trains itself',costs:[3,8,20]},
  {id:'kiosk',name:'Kiosks on day one',blurb:level=>'Reopen with '+(level||1)+' self-order kiosk'+(level>1?'s':''),costs:[2,6,15]},
  {id:'menu',name:'Full menu',blurb:level=>level>1?'Reopen selling pre-rolls and edibles':'Reopen selling pre-rolls',costs:[3,10]},
  {id:'seedbank',name:'Seed bank',blurb:level=>'Reopen with '+(1+Math.max(1,level))+' strains unlocked',costs:[2,6,15]},
  {id:'drone',name:'Drone pad',blurb:level=>level>1?'Reopen with the bulk drone':'Reopen with the auto drone',costs:[4,12]},
  {id:'lounge',name:'Rooftop lease',blurb:level=>'Reopen with the lounge at tier '+Math.max(1,level),costs:[6,15]},
  {id:'branch',name:'Kept branch',blurb:level=>'Your best branch stays open, up to level '+[3,3,6,10][level],costs:[5,14,35]},
  // The seventh station look: flagship models rebuilt in ebony, emerald and gold (art/blender/founder_finish.py).
  {id:'finish',name:"Founder's finish",blurb:()=>'Lv 100 stations and a Lv 75 door booth take the founder look',costs:[10]},
  // The repeatable sink: +10% sales a level, forever, at a price that grows 1.5x a level.
  {id:'stake',name:"Founder's stake",blurb:level=>'+'+(Math.max(1,level)*10)+'% sales in every shop',repeat:true,cost:level=>Math.round(25*1.5**level)}
];
export const STAKE_MAX=99;
// Highest level a perk can reach (repeatable perks stop at STAKE_MAX, far past what any save can pay for).
export const perkMax=p=>p.repeat?STAKE_MAX:p.costs.length;
export const FOUNDER_LOOK=6,FOUNDER_LEVEL=100;
const num=(v,max)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
// Saves from before the shop start with one point per share they already hold, so veterans have something to spend.
export function migratePerks(raw,shares=0){
  if(!raw||typeof raw!=='object')return {points:num(shares,1e6),levels:{}};
  const levels={};PERKS.forEach(p=>{const l=num(raw.levels?.[p.id],perkMax(p));if(l)levels[p.id]=l});
  return {points:num(raw.points,1e6),levels};
}
export function perkLevel(perks,id){return perks?.levels?.[id]||0;}
export function perkCost(perks,id){const p=PERKS.find(x=>x.id===id),l=perkLevel(perks,id);if(!p||l>=perkMax(p))return null;return p.repeat?p.cost(l):p.costs[l];}
export function buyPerk(perks,id){const c=perkCost(perks,id);if(c===null||perks.points<c)return false;perks.points-=c;perks.levels[id]=perkLevel(perks,id)+1;return true;}
// What a fresh run starts with, and the in-run modifiers.
export function perkStart(perks){const l=id=>perkLevel(perks,id);
  return {money:[0,1e3,1e4,1e5,1e6,1e7][l('seed')],line:1+l('crew')*5,offlineLevel:l('vault'),kiosks:l('kiosk'),formats:l('menu'),strains:l('seedbank'),drone:l('drone'),lounge:l('lounge'),branchCap:[0,3,6,10][l('branch')]};}
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
export const stakeMultiplier=perks=>1+.1*perkLevel(perks,'stake');
// Start perks bought mid-run take effect at once (2026-11-07 review: before, they waited a whole extra run, so a first
// reopen never started with any). Returns what to hand the running shop for going from `before` to `after` levels:
// cash is the difference, the rest are floors the shop is raised to.
export function startGrant(before,after){const a=perkStart(after),b=perkStart(before);
  return {money:Math.max(0,a.money-b.money),line:a.line>b.line?a.line:0,offlineLevel:a.offlineLevel,kiosks:a.kiosks,formats:a.formats,strains:a.strains,drone:a.drone,lounge:a.lounge};}
