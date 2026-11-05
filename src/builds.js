// Big purchases take real time to raise (Kevin, 2026-10-20): paying for the rooftop lounge or the online orders deck
// starts a construction site, and the place opens when the timer runs out. Timers are wall-clock end times, so they
// keep running while the game is closed, paused or hidden, and game speed does not hurry them.
// Lounge 3 min, drone port 4 min, pickup window 2 min (Kevin, 2026-10-22: the window's 45 s was too quick). Each can
// be finished early for cash (skipCost).
// City buildings (src/city-buildings.js): 5 min a stage for the first two, 6 for the late pair.
// Branches (Kevin, 2026-11-05: "they should also take time to construct"): paying to open one raises it on its lot,
// a minute longer for each branch further down the street. Keys branch0..branch4 follow STORES' order.
export const BRANCH_BUILD_SECONDS=[180,240,300,360,420];
export const BUILD_SECONDS={lounge:180,deck:240,window:120,flagship:480,warehouse:300,growhouse:300,billboard:360,terplab:360};
BRANCH_BUILD_SECONDS.forEach((s,i)=>{BUILD_SECONDS['branch'+i]=s;});
export const branchBuildKey=i=>'branch'+i;
// The branch a build key opens, or -1.
export function branchOfBuild(key){const m=/^branch(\d)$/.exec(key);return m?Number(m[1]):-1;}

// A save's timers: each key is an end time in ms, or 0 for no build. A clock set back cannot leave a build longer
// than its full time.
export function migrateBuilds(raw,now=Date.now()){
  const out={};
  Object.keys(BUILD_SECONDS).forEach(key=>{
    const end=Number(raw?.[key]);
    out[key]=Number.isFinite(end)&&end>0?Math.min(end,now+BUILD_SECONDS[key]*1000):0;
  });
  return out;
}
export function startBuild(builds,key,now=Date.now()){builds[key]=now+BUILD_SECONDS[key]*1000;}
export function isBuilding(builds,key){return !!(builds&&builds[key]>0);}
// Seconds still to go (0 once done or when nothing is building).
export function buildLeft(builds,key,now=Date.now()){return isBuilding(builds,key)?Math.max(0,(builds[key]-now)/1000):0;}
// Share of the build still to go, 1 at the start and 0 when it opens.
export function buildShareLeft(builds,key,now=Date.now()){return buildLeft(builds,key,now)/BUILD_SECONDS[key];}
// Builds whose time is up, cleared from the save; the caller opens each one.
export function finishBuilds(builds,now=Date.now()){
  return Object.keys(BUILD_SECONDS).filter(key=>isBuilding(builds,key)&&builds[key]<=now).map(key=>{builds[key]=0;return key;});
}
export function buildClock(seconds){const s=Math.max(0,Math.ceil(seconds));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
// Paying to skip (Kevin, 2026-10-22): finishing a build now costs half its price for the share of time still to go,
// in in-game cash, rounded up to $10 and never under $100. 0 when nothing is building.
export function skipCost(builds,key,price,now=Date.now()){
  if(!isBuilding(builds,key))return 0;
  return Math.max(100,Math.ceil(price*.5*buildShareLeft(builds,key,now)/10)*10);
}
// Ends the build's time now; finishBuilds then opens it like any other.
export function skipBuild(builds,key,now=Date.now()){if(!isBuilding(builds,key))return false;builds[key]=Math.min(builds[key],now);return true;}
