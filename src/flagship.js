import {heldQuote,quotePrice} from './stage-quotes.js';
// The flagship (Kevin, 2026-11-02): one big project to save toward from hour 2 on, when income flattens and buys
// come every 10-20 minutes. It goes up in four stages; each stage is paid in full, raised on a build timer like the
// lounge and the window (builds.js key 'flagship'), and once open lifts sales in every shop by FLAGSHIP_STEP.
// Each stage costs `minutes` of income at the time it comes up for sale (src/stage-quotes.js), never less than `cost`.
export const FLAGSHIP_STAGES=[
  {name:'Foundations',cost:1.2e9,minutes:10,summary:'Break ground. Every shop sells 20% more.'},
  {name:'Frame',cost:2.4e9,minutes:20,summary:'The frame goes up. Another 20% on every sale.'},
  {name:'Glass',cost:4e9,minutes:35,summary:'Glazed and lit. Another 20% on every sale.'},
  {name:'Grand opening',cost:5.5e9,minutes:50,summary:'Signed and open. Another 20%, and it lights the skyline.'}
];
export const FLAGSHIP_MAX=FLAGSHIP_STAGES.length,FLAGSHIP_STEP=.2;
// Unlocks at $120B earned: about 2 hours into a first run that plays every system (six-hour sim, 2026-11-07), and the
// four stages take it past hour 4.
export const FLAGSHIP_UNLOCK_LIFETIME=1.2e11;

export function migrateFlagship(value){
  return typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(FLAGSHIP_MAX,Math.floor(value))):0;
}
export function flagshipStage(level){return FLAGSHIP_STAGES[migrateFlagship(level)-1]||null;}
export function flagshipNext(level){return FLAGSHIP_STAGES[migrateFlagship(level)]||null;}
// The next stage's price: the one held for it in state.quotes when `state` is given and holds one, else its floor.
export function flagshipCost(level,state){const next=flagshipNext(level);if(!next)return null;return heldQuote(state,'flagship',migrateFlagship(level))??next.cost;}
// The price to hold for the next stage when it comes up for sale at `income` a second.
export function flagshipQuote(level,income){const next=flagshipNext(level);return next?quotePrice(next.cost,next.minutes,income):null;}
// Sales multiplier from the stages that are open.
export function flagshipSales(level){return 1+FLAGSHIP_STEP*migrateFlagship(level);}
// A slower run (one that skips the branch lines, say) still gets the lot after FLAGSHIP_UNLOCK_SECONDS of open-shop time
// (state.run.time), so the late game never waits on a dollar figure it may not reach. A save that already built a stage
// (from before the unlock moved up) keeps the HQ open.
export const FLAGSHIP_UNLOCK_SECONDS=2.5*3600;
export function flagshipUnlocked(lifetime,level=0,runSeconds=0){return Number(lifetime)>=FLAGSHIP_UNLOCK_LIFETIME||migrateFlagship(level)>0||Number(runSeconds)>=FLAGSHIP_UNLOCK_SECONDS;}
// Pays for the next stage; the caller starts its build and calls openFlagshipStage when the timer ends.
export function payFlagship(state){
  const cost=flagshipCost(state.flagship,state);
  if(cost===null||!Number.isFinite(state.money)||state.money<cost)return false;
  state.money-=cost;return true;
}
export function openFlagshipStage(state){state.flagship=Math.min(FLAGSHIP_MAX,migrateFlagship(state.flagship)+1);return state.flagship;}
