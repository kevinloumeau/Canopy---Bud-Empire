// Late builds (Canopy HQ, the city buildings) are priced in minutes of income, not fixed dollars (2026-11-07). A fixed
// price was either reached at once (a player running every branch line) or never (one who didn't), and both the HQ and
// all twelve city stages were done by hour 2.5. Each stage's price is set once, when the stage comes up for sale (its
// unlock, or the end of the stage before), from what the shop earns a second then, and it holds until that stage is
// bought, so the price never creeps while the player saves. state.quotes = {key: {stage, price}}.
export function migrateQuotes(raw){
  const out={};if(!raw||typeof raw!=='object')return out;
  Object.keys(raw).forEach(k=>{const q=raw[k];if(/^[a-z]{1,16}$/.test(k)&&q&&Number.isInteger(q.stage)&&q.stage>=0&&q.stage<16&&Number.isFinite(q.price)&&q.price>0)out[k]={stage:q.stage,price:q.price};});
  return out;
}
// minutes of `income` a second, never below the stage's floor price.
export function quotePrice(floor,minutes,income){const earned=Number.isFinite(income)&&income>0?Math.round(minutes*60*income):0;return Math.max(floor,earned);}
// The held price for `key` at `stage`, or null if none is held for that stage.
export function heldQuote(state,key,stage){const q=state?.quotes?.[key];return q&&q.stage===(stage|0)?q.price:null;}
// Holds a price for `key` at `stage` if none is held yet; returns the held price.
export function holdQuote(state,key,stage,price){
  if(!state.quotes||typeof state.quotes!=='object')state.quotes={};
  const held=heldQuote(state,key,stage);if(held!==null)return held;
  state.quotes[key]={stage:stage|0,price};return price;
}
