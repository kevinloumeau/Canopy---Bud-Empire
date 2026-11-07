// Small pure guards for the ID door and the save (gameplay review, 2026-11-07), kept here so node tests can run them.
import {storageCapacity,readyCapacity,basketSize} from './economy.js';
import {requestCap} from './deliveries.js';

// The ceiling for idle totals (money, lifetime, all-time revenue, lounge takings). Floats are fine for idle sums,
// so this is only a guard against Infinity and garbage, not a cap a player can reach.
export const BIG=1e300;

// How long the doorman spends on the head of the line: the show length when the door has time to spare, never longer
// than the next walker needs to reach their place behind (0.7 back), never shorter than the trained speed. A walker
// with no known distance (a newcomer pushed this tick, before their own move has run) leaves the door free.
export function idCheckLength(trained,show,behindDistance,walkSpeed){
  const gap=Number.isFinite(behindDistance)&&walkSpeed>0?(behindDistance-.7)/walkSpeed:Infinity;
  const length=Math.max(trained,Math.min(show,gap));
  return length>0&&Number.isFinite(length)?length:(trained>0?trained:show);
}

// What each of the five stock cells may hold on load: the live caps, with the line levels' retail boost.
export function stockCaps(next){
  const basket=Math.max(1,Math.round(basketSize(next.lines)*(1+(next.basketLevel||0)*.04)));
  const shelf=storageCapacity(next.storageLevel||0,next.lines);
  return [shelf,shelf,shelf,shelf,Math.max(readyCapacity(next.readyLevel||0,next.lines),4*basket)];
}
export function onlineRequestLimit(next){return requestCap(next.onlineCompleted,next.webLevel);}

// Seconds of offline pay owed. Each moment pays once: pay runs from the later of the last save and the latest time
// already paid, so winding the device clock forward, collecting and winding it back can't be farmed.
export function offlineSeconds(now,lastSeen,paidThrough){
  const from=Math.max(Number(lastSeen)||0,Number(paidThrough)||0);
  return Math.max(0,(now-from)/1000);
}
