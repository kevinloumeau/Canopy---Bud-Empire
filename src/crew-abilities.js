// Crew abilities: each production station's crew learns one tap ability once trained to ABILITY_UNLOCK. For a short
// burst its station works ABILITY_FACTOR times faster and every sale pays ABILITY_SALES more, then it recharges. The
// sales lift is what makes a tap count: most of the time the line is paced by customers walking through, not by the
// stations, and bursts from several crews stack. The recharge clock starts at the tap and keeps running while the game is
// closed, so a returning player finds their crew ready. Clocks are game seconds, like the big spender's rush.
export const ABILITIES=[
  {name:'Seed rush'},{name:'Grow lights'},{name:'Trim sprint'},
  {name:'Pack sprint'},{name:'Fast orders'},{name:'Express pickup'}
];
export const ABILITY_FACTOR=3;
export const ABILITY_SALES=.15;
export const ABILITY_UNLOCK=3;
export const ABILITY_SECONDS=120;
export const ABILITY_RECHARGE=900;
const clock=(v,max)=>Number.isFinite(Number(v))?Math.max(0,Math.min(max,Number(v))):0;
export function migrateAbilities(old){
  const o=old&&typeof old==='object'?old:{};
  return {active:ABILITIES.map((_,i)=>clock(o.active&&o.active[i],ABILITY_SECONDS)),recharge:ABILITIES.map((_,i)=>clock(o.recharge&&o.recharge[i],ABILITY_RECHARGE))};
}
export function abilityStatus(abilities,i,crewLevel){
  if(!ABILITIES[i])return 'none';
  if((crewLevel||0)<ABILITY_UNLOCK)return 'locked';
  if(abilities.active[i]>0)return 'active';
  return abilities.recharge[i]>0?'recharging':'ready';
}
export function useAbility(abilities,i,crewLevel){
  if(abilityStatus(abilities,i,crewLevel)!=='ready')return false;
  abilities.active[i]=ABILITY_SECONDS;abilities.recharge[i]=ABILITY_RECHARGE;return true;
}
// Offline time passes through here too: a burst running when the game closed simply ends, and recharges finish.
export function tickAbilities(abilities,seconds){
  const dt=Math.max(0,seconds||0);
  for(let i=0;i<ABILITIES.length;i++){abilities.active[i]=Math.max(0,abilities.active[i]-dt);abilities.recharge[i]=Math.max(0,abilities.recharge[i]-dt)}
}
export function abilityFactor(abilities,i){return abilities&&abilities.active[i]>0?ABILITY_FACTOR:1}
export function abilitySales(abilities){return 1+ABILITY_SALES*(abilities?abilities.active.filter(s=>s>0).length:0)}
export function clockLabel(seconds){const s=Math.ceil(Math.max(0,seconds));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
