// Reopening as a moment: the run remembers when its income first reached each level, so it can say how long a fresh
// shop, earning `ratio` times more per sale, would take to get back to today's income. Pure; main.js owns the state.
const STEPS_PER_DOUBLING=4,MAX_STEP=200;
export const REOPEN_PAYBACK=20*60;
// A new shop replays the old run about twice as fast: higher sales buy each upgrade sooner, and those compound.
// Measured on the retuned economy (2026-10-19 sim, reopening at 30/60/120 min): the curve read 24/36/36 min and the
// next run caught up in 14/18/19 min.
export const REPLAY_SPEED=2;
// Reopening also has to at least double base sales: smaller jumps showed the card every few minutes in the sim.
export const MIN_RATIO=2;
const stepOf=rate=>rate>=1?Math.min(MAX_STEP,Math.floor(Math.log2(rate)*STEPS_PER_DOUBLING)):-1;
// Old saves have no curve; `null` marks a run whose start was never seen.
export function migrateRun(raw){
  if(!raw||typeof raw!=='object'||!Array.isArray(raw.curve))return {time:0,curve:null};
  const time=Number.isFinite(raw.time)?Math.max(0,raw.time):0;
  return {time,curve:raw.curve.slice(0,MAX_STEP+1).map(t=>Number.isFinite(t)&&t>=0?Math.min(t,time):null)};
}
export const freshRun=()=>({time:0,curve:[]});
export function tickRun(run,dt,rate){
  run.time+=Math.max(0,dt);if(!run.curve)return;
  const top=stepOf(rate);for(let k=run.curve.length;k<=top;k++)run.curve[k]=run.time;
}
// Seconds a new shop would need to match `rate`, or null when this run's start is unknown.
// paybackSeconds reads the curve as is; reopenMoment applies REPLAY_SPEED.
export function paybackSeconds(run,rate,ratio){
  if(!run.curve)return null;const target=rate/Math.max(1,ratio);
  if(target<1)return 0;const step=Math.min(MAX_STEP,Math.ceil(Math.log2(target)*STEPS_PER_DOUBLING-1e-9));const t=run.curve[step];return t==null?run.time:t;
}
// The brass card shows once reopening is on offer, at least doubles base sales, and the new shop would be back to
// today's income within 20 minutes. A save from before the curve existed only needs the doubling.
export function reopenMoment(offer,run,rate){
  if(!offer.eligible)return null;const ratio=offer.multiplier/offer.current;if(ratio<MIN_RATIO)return null;const seconds=paybackSeconds(run,rate,ratio);
  const replay=seconds===null?null:seconds/REPLAY_SPEED,worth=replay===null||replay<=REOPEN_PAYBACK;
  return worth?{gain:offer.gain,ratio,minutes:replay===null?null:Math.max(1,Math.ceil(replay/60))}:null;
}
