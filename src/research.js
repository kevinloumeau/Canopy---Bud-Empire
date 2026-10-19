// Shop research: the shop's upgrades sit on three branches (Grow, Retail, Delivery), and six pairs of them are forks where a
// run takes one side or the other. The first level bought on either side picks it and closes its partner until the shop is
// reopened, so the choice comes back fresh every run. Pure functions over the save so they can be tested in Node.
export const RESEARCH_BRANCHES=[
  {id:'grow',name:'Grow',keys:['seedBatchLevel','curingLevel','trendLevel','harvestBatchLevel','packSpeedLevel','breedingLevel','growBatchLevel','terpeneLevel','offlineLevel']},
  {id:'retail',name:'Retail',keys:['basketLevel','trafficLevel','signLevel','comfortLevel','scannerLevel','pickupLevel','readyLevel','serviceLevel','kioskSpeedLevel','displayLevel','loyaltyLevel','durationLevel']},
  {id:'delivery',name:'Delivery',keys:['webLevel','onlineBonusLevel','fleetLevel','cargoLevel','repeatLevel']}
];
// gate: levels the branch needs before the fork opens, so the second fork of a branch is a step further down the road.
export const FORKS=[
  {id:'yield',branch:'grow',name:'Steady premium or chase the trend',sides:['curingLevel','trendLevel'],gate:0},
  {id:'lab',branch:'grow',name:'Bigger harvests or stronger strains',sides:['growBatchLevel','terpeneLevel'],gate:12},
  {id:'shelf',branch:'retail',name:'Bigger baskets or more shoppers',sides:['basketLevel','trafficLevel'],gate:0},
  {id:'counter',branch:'retail',name:'Counters or kiosks',sides:['serviceLevel','kioskSpeedLevel'],gate:0},
  {id:'regulars',branch:'retail',name:'Tips or lasting effects',sides:['loyaltyLevel','durationLevel'],gate:12},
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
