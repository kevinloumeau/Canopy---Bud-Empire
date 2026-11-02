// The flagship (Kevin, 2026-11-02): one big project to save toward from hour 3 on, when income flattens and buys
// come every 10-20 minutes. It goes up in four stages; each stage is paid in full, raised on a build timer like the
// lounge and the window (builds.js key 'flagship'), and once open lifts sales in every shop by FLAGSHIP_STEP.
export const FLAGSHIP_STAGES=[
  {name:'Foundations',cost:120e6,summary:'Break ground. Every shop sells 20% more.'},
  {name:'Frame',cost:240e6,summary:'The frame goes up. Another 20% on every sale.'},
  {name:'Glass',cost:400e6,summary:'Glazed and lit. Another 20% on every sale.'},
  {name:'Grand opening',cost:550e6,summary:'Signed and open. Another 20%, and it lights the skyline.'}
];
export const FLAGSHIP_MAX=FLAGSHIP_STAGES.length,FLAGSHIP_STEP=.2;
// Unlocks at $600M earned, about 2.5 hours into a first run (twelve-hour sim), so it is there when buys thin out.
export const FLAGSHIP_UNLOCK_LIFETIME=600e6;

export function migrateFlagship(value){
  return typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(FLAGSHIP_MAX,Math.floor(value))):0;
}
export function flagshipStage(level){return FLAGSHIP_STAGES[migrateFlagship(level)-1]||null;}
export function flagshipNext(level){return FLAGSHIP_STAGES[migrateFlagship(level)]||null;}
export function flagshipCost(level){return flagshipNext(level)?.cost??null;}
// Sales multiplier from the stages that are open.
export function flagshipSales(level){return 1+FLAGSHIP_STEP*migrateFlagship(level);}
export function flagshipUnlocked(lifetime){return Number(lifetime)>=FLAGSHIP_UNLOCK_LIFETIME;}
// Pays for the next stage; the caller starts its build and calls openFlagshipStage when the timer ends.
export function payFlagship(state){
  const cost=flagshipCost(state.flagship);
  if(cost===null||!Number.isFinite(state.money)||state.money<cost)return false;
  state.money-=cost;return true;
}
export function openFlagshipStage(state){state.flagship=Math.min(FLAGSHIP_MAX,migrateFlagship(state.flagship)+1);return state.flagship;}
