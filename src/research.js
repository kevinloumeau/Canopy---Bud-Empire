// Shop research: twelve picks on three branches (Grow, Retail, Delivery), and three pairs of them are forks where a run
// takes one side or the other. The first level bought on either side picks it and closes its partner until the shop is
// reopened, so the choice comes back fresh every run. Pure functions over the save so they can be tested in Node.
//
// Research used to be 26 picks, and a sim of the real shop showed most of them did nothing you could measure. Small
// lines that each tuned one corner of the shop now ride together on one pick (ALSO), and picks that never paid are gone
// (CUT, refunded once by mergeResearch). Every key stays on the save, so the effects that read them keep working.
export const RESEARCH_BRANCHES=[
  {id:'grow',name:'Grow',keys:['growBatchLevel','curingLevel','trendLevel','breedingLevel','offlineLevel']},
  {id:'retail',name:'Retail',keys:['basketLevel','trafficLevel','displayLevel','loyaltyLevel','serviceLevel']},
  {id:'delivery',name:'Delivery',keys:['webLevel','onlineBonusLevel','fleetLevel','cargoLevel']}
];
// Lines that now level up with the pick they are listed under: one purchase raises them all.
export const ALSO={
  growBatchLevel:['seedBatchLevel','harvestBatchLevel','packSpeedLevel'],
  trafficLevel:['signLevel'],
  loyaltyLevel:['durationLevel'],
  serviceLevel:['kioskSpeedLevel','scannerLevel','comfortLevel'],
  webLevel:['repeatLevel']
};
// Picks taken out of Research, with the price their first level cost, so old saves get back what they spent.
// Ready-bag storage now grows with the basket on its own (see readyCapacity in main.js).
export const CUT={pickupLevel:1200,readyLevel:600,terpeneLevel:2800};
export const RESEARCH_VERSION=2;
// The price research charges for a level (same curve as the Research cards): gentle for eight levels, steep to 20, and
// ×1.6 a level through Mastery (levels 21 to 30), so the last levels are a late-run project. Levels 1-20 cost what they
// always did, so nothing a save already bought changes price.
export const MASTERY_FROM=20,MASTERY_MAX=30;
export function levelCost(base,level){return Math.round(base*Math.pow(1.8,Math.min(level,8))*Math.pow(2.15,Math.max(0,Math.min(level,MASTERY_FROM)-8))*Math.pow(1.6,Math.max(0,level-MASTERY_FROM)));}
// Effects that would run past sense over 30 levels give half a step a level in Mastery: Breeding's grow-time cut and the
// drone fleet's launch gap (3% a level to 60%, then 1.5% to 75%), and repeat web orders (4% to 80%, then 1% to 90%).
export function tapered(level,step,tail){const l=Math.max(0,Number(level)||0);return Math.min(l,MASTERY_FROM)*step+Math.max(0,l-MASTERY_FROM)*tail;}
// Is a level in the Mastery tier (past 20)?
export function isMastery(level){return level>MASTERY_FROM;}
// Brings a save from the 26-pick list to this one, once. Merged lines all take the highest level any of them had, so
// nobody loses a level; cut lines go to zero and their whole cost comes back as cash. Returns the refund.
export function mergeResearch(state){
  if(state.researchVersion>=RESEARCH_VERSION)return 0;
  Object.keys(ALSO).forEach(key=>{const keys=[key].concat(ALSO[key]),top=Math.max.apply(null,keys.map(k=>Math.max(0,Number(state[k])||0)));keys.forEach(k=>{state[k]=top})});
  let refund=0;
  Object.keys(CUT).forEach(key=>{const level=Math.max(0,Number(state[key])||0);for(let l=0;l<level;l++)refund+=levelCost(CUT[key],l);state[key]=0});
  state.researchVersion=RESEARCH_VERSION;
  return refund;
}
// gate: levels the branch needs before the fork opens (all three open from the start).
export const FORKS=[
  {id:'yield',branch:'grow',name:'Steady premium or chase the trend',sides:['curingLevel','trendLevel'],gate:0},
  {id:'shelf',branch:'retail',name:'Bigger baskets or more VIPs',sides:['basketLevel','trafficLevel'],gate:0},
  {id:'drones',branch:'delivery',name:'Faster drones or bigger loads',sides:['fleetLevel','cargoLevel'],gate:0}
];
export function forkOf(key){return FORKS.find(f=>f.sides.indexOf(key)>=0)||null;}
export function branchOf(key){return RESEARCH_BRANCHES.find(b=>b.keys.indexOf(key)>=0)||null;}
export function branchLevels(state,branchId){const b=RESEARCH_BRANCHES.find(x=>x.id===branchId);return b?b.keys.reduce((t,k)=>t+(Math.max(0,Number(state[k])||0)),0):0;}
// Saves from before research have no picks: whichever side of a fork already has levels is the one taken (the larger, if
// both do), so nobody's shop changes. Levels already bought on a closed side keep working; they just can't grow.
export function migrateForks(saved,state){
  const out={};
  FORKS.forEach(f=>{
    const pick=saved&&typeof saved==='object'?saved[f.id]:null;
    if(f.sides.indexOf(pick)>=0){out[f.id]=pick;return}
    const [a,b]=f.sides.map(k=>Math.max(0,Number(state&&state[k])||0));
    out[f.id]=a||b?(b>a?f.sides[1]:f.sides[0]):null;
  });
  return out;
}
export function freshForks(){const out={};FORKS.forEach(f=>{out[f.id]=null});return out;}
// 'open' (not a fork, or the side taken), 'pick' (the fork is undecided and this side can be chosen), 'closed' (its partner
// was taken) or 'gated' (the branch hasn't enough levels yet to open this fork).
export function sideStatus(state,key){
  const f=forkOf(key);if(!f)return 'open';
  const pick=state.forks&&state.forks[f.id];
  if(pick)return pick===key?'open':'closed';
  return branchLevels(state,f.branch)>=f.gate?'pick':'gated';
}
export function partnerOf(key){const f=forkOf(key);return f?f.sides[1-f.sides.indexOf(key)]:null;}
export function levelsToGate(state,key){const f=forkOf(key);return f?Math.max(0,f.gate-branchLevels(state,f.branch)):0;}
// Buying a level on an undecided side takes it. Returns true when this purchase made the choice.
export function takeSide(state,key){const f=forkOf(key);if(!f||state.forks[f.id])return false;state.forks[f.id]=key;return true;}
