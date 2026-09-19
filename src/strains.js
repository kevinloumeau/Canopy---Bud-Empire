// Strains as a gameplay axis: what is on the menu shapes the grow room, foot traffic, tips and reputation,
// and every strain earns a signature perk at level 5 and 10. All pure; main.js owns the state.

// Boutique strains are harder to grow. Mastery (levels) claws back up to 60% of the penalty by level 10.
export const GROW_PENALTY=[0,.08,.15,.25];
export function mastery(level){return Math.max(0,Math.min(1,(level-1)/9));}
export function strainGrowFactor(i,level){return 1-GROW_PENALTY[i]*(1-mastery(level)*.6);}
// The grow room runs at the average difficulty of the strains on the menu: you grow what you sell.
export function growFactor(menu,levels){if(!menu.length)return 1;return menu.reduce((t,i)=>t+strainGrowFactor(i,levels[i]||1),0)/menu.length;}

// A fuller menu draws a bigger crowd, and the trending strain pulls extra traffic while it is on the menu.
export function trafficFactor(menu,trendIndex){return (1+.08*Math.max(0,menu.length-1))*(menu.indexOf(trendIndex)>=0?1.25:1);}

// Potency as THC%: everyday flower starts around 14%, each boutique tier adds 4 points and every level half a point,
// so a maxed Midnight Orchid tops out near 30%. VIPs tip for strength above the everyday baseline; everyone else a little.
export const THC_BASE=14,THC_TIER=4,THC_LEVEL=.5;
export function potency(i,level){return THC_BASE+i*THC_TIER+Math.max(0,(level||0)-1)*THC_LEVEL;}
export function tipFactor(type,thc){return 1+Math.max(0,thc-THC_BASE)/(type==='vip'?60:120);}

// Trending strain: rotates on a fixed cadence of play time and pays +35% while it lasts.
export const TREND_SECONDS=480,TREND_PRICE=1.35;
export function trendPrice(i,trendIndex){return i===trendIndex?TREND_PRICE:1;}
export function nextTrend(current,count,seed){return (current+1+(Math.abs(Math.floor(seed))%(count-1)))%count;}
export function migrateTrend(raw,count){
  const r=raw&&typeof raw==='object'?raw:{};
  const index=Number.isInteger(r.index)&&r.index>=0&&r.index<count?r.index:1;
  const remaining=Number.isFinite(r.remaining)&&r.remaining>0?Math.min(TREND_SECONDS,r.remaining):TREND_SECONDS;
  return {index,remaining};
}
// Advances the trend clock; returns true when the trending strain changed.
export function tickTrend(trend,seconds,count,seed){
  trend.remaining-=seconds;if(trend.remaining>0)return false;
  const laps=Math.floor(-trend.remaining/TREND_SECONDS)+1;
  for(let n=0;n<laps;n++)trend.index=nextTrend(trend.index,count,seed+n);
  trend.remaining+=laps*TREND_SECONDS;return true;
}

// Signature perks: one per strain, tier 1 at level 5 and tier 2 at level 10.
export const PERKS=[
  {name:'House favourite',effect:['Everyday sales pay +10%','Everyday sales pay +20%'],locked:'Level 5: everyday sales pay more'},
  {name:'Rolls easy',effect:['Pack station +15% faster','Pack station +30% faster'],locked:'Level 5: faster packing'},
  {name:'Word of mouth',effect:['Boutique sales earn +1 reputation','Boutique sales earn +2 reputation'],locked:'Level 5: boutique sales build reputation'},
  {name:'Velvet rope',effect:['VIPs pay 25% more','VIPs pay 50% more'],locked:'Level 5: VIPs pay more'}
];
export function perkTier(level){return level>=10?2:level>=5?1:0;}
export function everydayBonus(levels){return 1+.1*perkTier(levels[0]||0);}
export function packBonus(levels){return 1+.15*perkTier(levels[1]||0);}
export function reputationBonus(levels){return perkTier(levels[2]||0);}
export function vipBonus(levels){return 1+.25*perkTier(levels[3]||0);}

// VIP reserve: VIPs order the highest-potency boutique strain on the menu and buy double baskets. A VIP served their
// reserve leaves a shout-out that pulls extra traffic for a while; a VIP offered only everyday flower snubs the shop.
export const VIP_BUZZ_SECONDS=45,VIP_BUZZ_TRAFFIC=1.3,VIP_BASKET=2,VIP_REPUTATION=3,VIP_SNUB_REPUTATION=2;
export function reserveStrain(menu,levels){let best=null,bestPotency=-1;menu.forEach(i=>{const p=potency(i,levels[i]||0);if(i>0&&p>bestPotency){best=i;bestPotency=p}});return best;}
export function buzzFactor(seconds){return seconds>0?VIP_BUZZ_TRAFFIC:1;}

// Sativa, indica, hybrid. Sativas are daytime flower and indicas evening flower: each swings with the shop's day/night
// cycle, +15% in its window and -9% out of it. Hybrids hold their price around the clock.
export const TYPES=['Hybrid','Sativa','Indica'],HYBRID=0,SATIVA=1,INDICA=2;
export const STRAIN_TYPE=[HYBRID,SATIVA,HYBRID,INDICA];
export const TIME_SWING=.15,TIME_DIP=.09;
export function timeFactor(type,night){
  if(type===SATIVA)return night?1-TIME_DIP:1+TIME_SWING;
  if(type===INDICA)return night?1+TIME_SWING:1-TIME_DIP;
  return 1;
}
export function peakType(night){return night?INDICA:SATIVA;}
