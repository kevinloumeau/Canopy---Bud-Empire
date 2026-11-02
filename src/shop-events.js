// Shop events on the map (Kevin, 2026-11-02): every few minutes something happens in the shop and a small gold tag
// rides above the customer who brought it. One system, grown from the big spender tag: the same clock, the same tag and
// the same tap, with four kinds that take turns. Tapping pays; missing one costs nothing.
const STAR='M12 2.8l2.75 5.82 6.35.8-4.67 4.38 1.2 6.3L12 17.02 6.37 20.1l1.2-6.3L2.9 9.42l6.35-.8z';
const BOLT='M13.5 2 5 13.4h5.6L9.4 22l9.1-12.2h-5.7z';
const CHECK='M9 2.5h6a1 1 0 0 1 1 1V5h2a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 6 5h2V3.5a1 1 0 0 1 1-1zm1 1.5v1.6h4V4zm5.9 6.2-1.3-1.3-3.9 3.9-1.8-1.8-1.3 1.3 3.1 3.1z';
const CROWN='M3 7.5l4.6 3.6L12 4.5l4.4 6.6L21 7.5 19.3 18H4.7zM4.7 19.4h14.6V21H4.7z';
export const SHOP_EVENTS={
  spender:{name:'Big spender',icon:STAR,label:'Big spender in the shop: tap for a tip'},
  rush:{name:'Rush hour',icon:BOLT,label:'Rush hour: tap for double sales'},
  inspection:{name:'Inspection',icon:CHECK,label:'Inspector in the shop: tap to pass for reputation and a bonus'},
  vip:{name:'VIP request',icon:CROWN,label:'VIP request: tap for a big tip and more walk-ins'}};
// The order they take turns in. The first is always a big spender, so the first shift goal's hint still fits.
export const EVENT_ORDER=['spender','rush','inspection','spender','vip','rush','inspection','vip'];
export function eventKind(count,twist){return twist==='spender'?'spender':EVENT_ORDER[Math.max(0,Math.floor(count||0))%EVENT_ORDER.length];}
// Seconds until the next event: two to seven minutes, before the Regulars perk shortens it.
export function eventGap(seed){return 120+(Math.abs(Math.floor(seed||0))*97)%300;}
export const INSPECTION_REPUTATION=10,VIP_EVENT_BUZZ=60;
// What a tap pays, given the shop's income per second and the rush length the perks allow. Cash tips never drop below $50.
export function eventReward(kind,income,rushSeconds){const tip=s=>Math.max(50,Math.round(Math.max(0,income||0)*s));
  if(kind==='rush')return {rush:rushSeconds,cash:0,reputation:0,buzz:0};
  if(kind==='inspection')return {rush:0,cash:tip(45),reputation:INSPECTION_REPUTATION,buzz:0};
  if(kind==='vip')return {rush:0,cash:tip(120),reputation:0,buzz:VIP_EVENT_BUZZ};
  return {rush:0,cash:tip(90),reputation:0,buzz:0};}
// The toast after a tap, in the game's caps style.
export function eventToast(kind,reward,fmt){
  if(kind==='rush')return 'RUSH HOUR · 2× SALES FOR '+reward.rush+'S';
  if(kind==='inspection')return 'INSPECTION PASSED · +'+reward.reputation+' REPUTATION · +'+fmt(reward.cash);
  if(kind==='vip')return 'VIP REQUEST FILLED · +'+fmt(reward.cash)+' · MORE WALK-INS';
  return 'BIG SPENDER TIP +'+fmt(reward.cash);}
