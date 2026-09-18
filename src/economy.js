// Main-shop throughput maths. Pure functions over plain numbers so they can be unit-tested and simulated in Node.
export const STATION_TIERS=['Starter','Established','Advanced','Premium','Signature','Elite','Flagship'];
export const TIER_LEVELS=[1,10,20,30,50,75,100];
export const TIER_COLORS=['#b4c5a0','#92d5a4','#8ad6d9','#efd18c','#afbfdb','#c5a7cd','#f2e6bf'];
export function stationTier(level){let tier=0;for(let n=1;n<TIER_LEVELS.length;n++)if(level>=TIER_LEVELS[n])tier=n;return tier;}
// Each tier doubles a station's output, so upgrades keep mattering after the linear per-level gain fades.
export function tierBoost(level){return Math.pow(2,stationTier(level));}
// The retail tier is the lower of the two counters; both must tier up to grow baskets, storage and web orders.
export function retailTier(lines){return Math.min(stationTier(lines[4]),stationTier(lines[5]));}
export function retailBoost(lines){return Math.pow(2,retailTier(lines));}
export function batchSize(level){return (1+(level-1)*.4)*tierBoost(level);}
export function capacity(level,staff,multiplier){return level>0?batchSize(level)*(1+staff*.3)*multiplier:0;}
export function stationCost(base,level){return Math.floor(base*Math.pow(1.16,level));}
export function staffCost(level){return Math.floor(20*Math.pow(1.6,level));}
// Customers buy a basket of bags that grows with the order desk and doubles with each retail tier.
export function basketSize(lines){return (1+Math.floor(Math.max(0,lines[4]-1)/2))*retailBoost(lines);}
export function storageCapacity(level,lines){return (100+level*100)*retailBoost(lines);}
export function readyCapacity(level,lines){return (100+level*50)*retailBoost(lines);}
export function onlineSize(completed,lines){return (4+(completed%5)*3)*retailBoost(lines);}
// Counters open an extra service lane every five levels, so their levels keep paying off past the handoff floor.
export function counterLanes(level){return 1+Math.floor(Math.max(0,(level||0)-1)/5);}
// Both equipment and training shorten the handoff, with gentler gains at high levels; 1.4s is the physical floor per lane.
export function counterServiceDuration(station,rate,serviceFactor=1){return (1.4+Math.max(1.2/Math.pow(rate,.15),[2,3][station-4]/rate))*(station===5?serviceFactor:1);}
// Hurried shoppers and VIPs judge their whole visit; Queue comfort stretches how long they stay cheerful.
export function patience(type,comfortLevel){return (type==='vip'?15:20)*(1+Math.max(0,comfortLevel||0)*.15);}
// Customers walk a little faster with each Floor flow level, closing the gap between counter capacity and real sales.
export function walkSpeed(trafficLevel){return 2.8*(1+Math.max(0,trafficLevel||0)*.1);}
// Regulars want the everyday strain; collectors and VIPs reach for the priciest boutique strain on the menu.
export function preferredStrain(type,menu,levels){
  const boutique=menu.filter(i=>i>0&&levels[i]>0);
  if(type==='collector'||type==='vip'){if(boutique.length)return boutique[boutique.length-1];}
  else if(menu.indexOf(0)>=0&&levels[0]>0)return 0;
  return null;
}
// Fixed cash rewards (daily, goals, events) scale with current income so they stay worth claiming after the first hour.
export function rewardScale(incomePerSecond){return Math.max(1,(Number.isFinite(incomePerSecond)?incomePerSecond:0)/4);}
