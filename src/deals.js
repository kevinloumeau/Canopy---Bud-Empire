// Daily deals (Kevin, 2026-11-08, from the idle games study): two or three offers that change every four hours, each
// bought once per window. They are priced in seconds of the shop's income, like every reward since the 2026-11-07
// retune, so a deal costs the same share of sales at $5/s and at $5M/s. A deal is a real bargain: what it buys is
// worth about twice its price when the player uses it (rush, crew, flyers), or covers hours of away pay (night shift).
// Families: at most one deal of each family shows at a time, so a window never offers two rushes.
// Each deal names its 3D icon (public/icons/3d/<icon>.png), a short name, and what it does in a few words.
export const DEAL_HOURS=4,DEAL_SLOTS=3;
export const DEALS={
  rush5:{family:'rush',name:'Rush hour',effect:'2× sales for 5 min',icon:'research-service',rush:300,price:150},
  rush10:{family:'rush',name:'Long rush',effect:'2× sales for 10 min',icon:'research-service',rush:600,price:300},
  coffee:{family:'crew',name:'Crew coffee',effect:'Every crew bursts now',icon:'research-boost',price:0},
  flyers:{family:'flyers',name:'Flyer drop',effect:'More walk-ins for 10 min',icon:'research-traffic',buzz:600,price:0},
  night2:{family:'night',name:'Night shift',effect:'+2 h away pay next time',icon:'research-offline',night:7200,price:720},
  night4:{family:'night',name:'Double shift',effect:'+4 h away pay next time',icon:'research-offline',night:14400,price:1200}
};
export const FAMILIES=['rush','crew','flyers','night'];
// A crew burst is +30% sales for 90 s per crew (crew-abilities.js); coffee charges half of what the bursts add.
export const COFFEE_SHARE=.5,FLYER_SHARE=.5,FLYER_MIN_LIFT=.08;
export const MIN_PRICE=50;

// The window a moment falls in: four-hour blocks of the player's local day (midnight, 4 am, 8 am...).
export function dealWindow(now=Date.now(),offsetMinutes=new Date(now).getTimezoneOffset()){
  return Math.floor((now-offsetMinutes*60000)/(DEAL_HOURS*3600000));}
export function windowEnds(window,offsetMinutes=new Date().getTimezoneOffset()){return (window+1)*DEAL_HOURS*3600000+offsetMinutes*60000;}
export function migrateDeals(raw){const d=raw&&typeof raw==='object'?raw:{};
  const ids=a=>Array.isArray(a)?a.filter(id=>DEALS[id]).slice(0,DEAL_SLOTS):[];
  const night=Number(d.night);
  return {window:Number.isFinite(Number(d.window))?Math.floor(Number(d.window)):-1,offers:ids(d.offers),bought:ids(d.bought).filter(id=>ids(d.offers).indexOf(id)>=0),
    night:Number.isFinite(night)?Math.max(0,Math.min(DEALS.night4.night,night)):0};}
// A small seeded shuffle, so the same window always rolls the same deals for the same shop.
function rng(seed){let s=(Math.abs(Math.floor(seed))*2654435761+1013904223)>>>0;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
// The offers for a window: up to three families the shop can use (`usable` says which), one variant of each.
export function pickDeals(window,usable){const r=rng(window),fams=FAMILIES.filter(f=>usable(f));
  for(let i=fams.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[fams[i],fams[j]]=[fams[j],fams[i]];}
  return fams.slice(0,DEAL_SLOTS).map(f=>{const v=Object.keys(DEALS).filter(id=>DEALS[id].family===f);return v[Math.floor(r()*v.length)];});}
// Rolls a new set when the window changes. Returns true when it did.
export function rollDeals(d,window,usable){if(d.window===window&&d.offers.length)return false;
  d.window=window;d.offers=pickDeals(window,usable);d.bought=[];return true;}
// The price, given income per second and, for crew and flyers, the seconds of income the deal adds.
export function dealPrice(id,income,addedSeconds=0){const deal=DEALS[id];if(!deal)return Infinity;
  const seconds=deal.family==='crew'?addedSeconds*COFFEE_SHARE:deal.family==='flyers'?addedSeconds*FLYER_SHARE:deal.price;
  return Math.max(MIN_PRICE,Math.round(Math.max(0,income||0)*seconds));}
export function canBuy(d,id){return d.offers.indexOf(id)>=0&&d.bought.indexOf(id)<0;}
// A bought night shift adds to the next long absence's cap, then is spent.
export function nightBonus(d){return d&&d.night>0?d.night:0;}
export function spendNight(d,awaySeconds){if(d.night>0&&awaySeconds>=900){d.night=0;return true;}return false;}
// "2h 13m" / "13m" until the next set.
export function untilLabel(ms){const m=Math.max(1,Math.ceil(ms/60000)),h=Math.floor(m/60);return h?h+'h '+(m%60)+'m':m+'m';}
