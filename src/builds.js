// Big purchases take real time to raise (Kevin, 2026-10-20): paying for the rooftop lounge or the online orders deck
// starts a construction site, and the place opens when the timer runs out. Timers are wall-clock end times, so they
// keep running while the game is closed, paused or hidden, and game speed does not hurry them.
// Lounge 3 min, deck 90 s: long enough to feel like a build, short enough to wait out in one sitting. The pickup
// window, the first and cheapest online buy, takes 45 s.
export const BUILD_SECONDS={lounge:180,deck:90,window:45};

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
