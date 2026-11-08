// Weekend pop-up markets (2026-11-08, from the idle games study: "a weekend map, a branch-sized pop-up, with its own
// short economy and a cosmetic or permanent reward, every 3-4 weeks"; Kolibri's event mines often doubled weekend
// revenue). Every third weekend, Friday 00:00 to Monday 00:00 local time, a market opens on the next empty block along
// the street. It runs on its own currency, tickets: four stalls earn them, and tickets buy stall levels, nothing else.
// The shop's cash never pays for the market and the market never pays cash, so the main economy is untouched. What the
// weekend is for is its three prizes, each paid the moment the market's takings reach it: a cash gift (minutes of the
// shop's income), the theme's keepsake on the flagship's street (kept for good) and a trophy worth POPUP_TROPHY_BONUS
// sales for good (kept through reopens, like branch stars). When the weekend ends the market packs up: its tickets and
// stalls go, its prizes stay.
//
// Pure: main.js owns the state (state.popup), ticks it with the shop's game time and pays the prizes.
import {DAY} from './progression.js';

// The first market opens Friday 13 November 2026; then one every POPUP_EVERY_DAYS. Local dates, so it opens at the
// player's own midnight and daylight saving never shifts it.
export const POPUP_FIRST=[2026,10,13], POPUP_EVERY_DAYS=21, POPUP_DAYS=3;
// The four themes take turns. stripes: the tent canopies' two colours. keepsake: what the second prize leaves on the
// flagship's street for good (bunting in the theme's colours).
export const POPUP_THEMES=[
  {id:'farmers',name:'Farmers’ Market',stripes:['#2f7a4d','#f3ead2'],trim:'#d0a54e',keepsake:'Market bunting'},
  {id:'harvest',name:'Harvest Fair',stripes:['#c4633b','#f4e4c4'],trim:'#7b4a2a',keepsake:'Harvest bunting'},
  {id:'lantern',name:'Lantern Night',stripes:['#2b4a73','#ecd9a6'],trim:'#e2b44f',keepsake:'Lantern string'},
  {id:'bloom',name:'Garden Party',stripes:['#c9617f','#fbeef0'],trim:'#5f8f5a',keepsake:'Bloom bunting'}
];
export const POPUP_THEME_IDS=POPUP_THEMES.map(t=>t.id);
// The stalls, opened in order. base: tickets a second at Lv 1; open: what opening it costs; price: its Lv 2 price.
// A stall's takings double every 10 levels (as the stations' tiers do), and each level costs POPUP_GROWTH more, so
// the market's run flattens out over an hour or so of play instead of running away (simulated 2026-11-08, buying the
// best stall every second: prize 1 at ~4 min, prize 2 at ~20, prize 3 at ~75, sooner with the time away).
export const POPUP_STALLS=[
  {id:'flower',name:'Flower tent',short:'Flower',base:1,open:0,price:8},
  {id:'preroll',name:'Pre-roll cart',short:'Pre-rolls',base:6,open:120,price:70},
  {id:'edible',name:'Edibles stand',short:'Edibles',base:40,open:2500,price:600},
  {id:'merch',name:'Merch booth',short:'Merch',base:260,open:45000,price:6000}
];
export const POPUP_GROWTH=1.3, POPUP_STALL_MAX=50, POPUP_TIER=10;
// Takings that pay each prize. kind: 'cash' (POPUP_GIFT_BASE in quarter-seconds of income, the reward scale's unit:
// 2400 = 10 minutes), 'keepsake', 'trophy'.
export const POPUP_PRIZES=[
  {kind:'cash',name:'Cash gift',target:5e4},
  {kind:'keepsake',name:'Keepsake',target:2e7},
  {kind:'trophy',name:'Trophy',target:2.5e8}
];
export const POPUP_GIFT_BASE=2400, POPUP_TROPHY_BONUS=.03;
// While the game is closed the stalls keep selling at a quarter of their pace, so the weekend rewards coming back to
// play over leaving it shut, and only for the part of the time away the market was open.
export const POPUP_AWAY_PAY=.25;
// The market waits for a shop that has found its feet: open, and this much earned.
export const POPUP_UNLOCK_LIFETIME=25000;

const num=(v,lo=0,hi=Number.MAX_SAFE_INTEGER)=>Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):lo;
function eventStart(k){const [y,m,d]=POPUP_FIRST;return new Date(y,m,d+k*POPUP_EVERY_DAYS).getTime();}
function eventEnd(k){const [y,m,d]=POPUP_FIRST;return new Date(y,m,d+k*POPUP_EVERY_DAYS+POPUP_DAYS).getTime();}
function eventOf(k){return {key:k,start:eventStart(k),end:eventEnd(k),theme:POPUP_THEMES[((k%POPUP_THEMES.length)+POPUP_THEMES.length)%POPUP_THEMES.length]};}
// The event k whose window holds `now`, if any.
export function popupWindow(now=Date.now()){
  const k=Math.floor((now-eventStart(0))/(POPUP_EVERY_DAYS*DAY));
  for(const j of [k-1,k,k+1]){if(j<0)continue;const e=eventOf(j);if(now>=e.start&&now<e.end)return e;}
  return null;
}
// The next market to open after `now` (the one running, if any, is not next).
export function nextPopup(now=Date.now()){
  let k=Math.max(0,Math.floor((now-eventStart(0))/(POPUP_EVERY_DAYS*DAY)));
  while(eventStart(k)<=now)k++;
  return eventOf(k);
}
// ?popup on the URL opens the next market now, for a look at it between weekends: the same key as the real one, so a
// market started early simply carries on when its weekend comes.
export function previewWindow(now=Date.now()){const e=nextPopup(now);return {...e,start:now-HOUR_MS,end:now+POPUP_DAYS*DAY,preview:true};}
const HOUR_MS=3600000;

export function freshMarket(){return POPUP_STALLS.map((_,j)=>j?0:1);}
export function migratePopup(raw){
  const r=raw&&typeof raw==='object'?raw:{};
  const key=Number.isInteger(r.key)&&r.key>=0?r.key:-1;
  const stalls=POPUP_STALLS.map((_,j)=>Math.floor(num(r.stalls?.[j],j?0:1,POPUP_STALL_MAX)));
  if(!stalls[0])stalls[0]=1;
  // A stall can only be open when the one before it is.
  for(let j=1;j<stalls.length;j++)if(!stalls[j-1])stalls[j]=0;
  return {key,tickets:num(r.tickets,0,1e300),earned:num(r.earned,0,1e300),stalls,prizes:Math.floor(num(r.prizes,0,7)),
    trophies:Math.floor(num(r.trophies,0,999)),keepsakes:(Array.isArray(r.keepsakes)?r.keepsakes:[]).filter((id,i,a)=>POPUP_THEME_IDS.includes(id)&&a.indexOf(id)===i),
    seen:Number.isInteger(r.seen)?r.seen:-1};
}
// Brings the state in line with the calendar. A new weekend opens a fresh market ('opened'); a market whose weekend
// is over packs up ('closed'). Trophies and keepsakes are kept either way.
export function syncPopup(pp,win){
  if(win&&pp.key!==win.key){pp.key=win.key;pp.tickets=0;pp.earned=0;pp.stalls=freshMarket();pp.prizes=0;return 'opened';}
  if(!win&&pp.key>=0){pp.key=-1;pp.tickets=0;pp.earned=0;pp.stalls=freshMarket();pp.prizes=0;return 'closed';}
  return '';
}
export function stallRate(j,level){return level>0?POPUP_STALLS[j].base*level*Math.pow(2,Math.floor(level/POPUP_TIER)):0;}
export function popupRate(pp){return pp.stalls.reduce((sum,l,j)=>sum+stallRate(j,l),0);}
// What the stall's next level (or its opening) costs.
export function stallCost(j,level){return level<=0?POPUP_STALLS[j].open:Math.ceil(POPUP_STALLS[j].price*Math.pow(POPUP_GROWTH,level-1));}
export function stallOpenable(pp,j){return j===0||pp.stalls[j-1]>0;}
export function buyStall(pp,j){
  if(!POPUP_STALLS[j]||pp.key<0||!stallOpenable(pp,j))return false;const l=pp.stalls[j];if(l>=POPUP_STALL_MAX)return false;
  const cost=stallCost(j,l);if(pp.tickets<cost)return false;pp.tickets-=cost;pp.stalls[j]=l+1;return true;
}
// The stall that adds the most takings per ticket now (whether or not it is affordable): the market's one brass buy.
export function bestStall(pp){
  let best=-1,score=-1;const now=popupRate(pp);
  pp.stalls.forEach((l,j)=>{if(l>=POPUP_STALL_MAX||!stallOpenable(pp,j))return;const gain=stallRate(j,l+1)-stallRate(j,l),s=(gain||now*.001)/stallCost(j,l);if(s>score){score=s;best=j;}});
  return best;
}
// Runs the market for `seconds` (game seconds while playing, or the time away at POPUP_AWAY_PAY). Returns the prizes
// reached by this tick, by index; main.js pays them and then marks them with claimPrize.
export function tickPopup(pp,seconds,pay=1){
  if(pp.key<0)return [];const add=popupRate(pp)*Math.max(0,Number.isFinite(seconds)?seconds:0)*pay;
  pp.tickets=Math.min(1e300,pp.tickets+add);pp.earned=Math.min(1e300,pp.earned+add);
  return duePrizes(pp);
}
export function duePrizes(pp){return POPUP_PRIZES.map((p,i)=>i).filter(i=>!(pp.prizes&1<<i)&&pp.earned>=POPUP_PRIZES[i].target);}
// Marks prize i paid and keeps what it leaves for good. Returns false when it was already paid.
export function claimPrize(pp,i,themeId){
  if(!POPUP_PRIZES[i]||pp.prizes&1<<i)return false;pp.prizes|=1<<i;
  const kind=POPUP_PRIZES[i].kind;
  if(kind==='keepsake'&&POPUP_THEME_IDS.includes(themeId)&&!pp.keepsakes.includes(themeId))pp.keepsakes.push(themeId);
  if(kind==='trophy')pp.trophies++;
  return true;
}
// Seconds of the time away that the market was open: the overlap of [from, to] with the weekend.
export function awayOverlap(win,from,to){if(!win)return 0;return Math.max(0,(Math.min(to,win.end)-Math.max(from,win.start))/1000);}
export function popupSalesBonus(pp){return (pp?.trophies||0)*POPUP_TROPHY_BONUS;}
export function popupUnlocked(state){return !!state.shopOpen&&(state.lifetime||0)>=POPUP_UNLOCK_LIFETIME;}
// '2d 4h', '5h 12m', '14m' (the countdown on the tag and the page).
export function popupClock(ms){
  const m=Math.max(0,Math.floor(ms/60000)),d=Math.floor(m/1440),h=Math.floor(m%1440/60),mm=m%60;
  return d?d+'d '+h+'h':h?h+'h '+mm+'m':Math.max(1,mm)+'m';
}
