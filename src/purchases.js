// The App Store bridge for the store: StoreKit 2 through the @capgo/native-purchases Capacitor plugin, reached the same
// way as the other plugins (window.Capacitor.Plugins), so the web build needs no import and simply has no purchases.
// Every call resolves; nothing here throws into the game.
//
// Test mode for a browser or a review build: add ?store=test to the URL (or set localStorage canopy-store=test) and
// every buy succeeds after a short pause with a fake transaction id, so the whole flow can be played without Apple.
import {PRODUCTS,productById} from './store.js';

function testMode(win){
  try{if(win.location&&/[?&]store=test\b/.test(win.location.search))return true;}catch(e){}
  try{return win.localStorage&&win.localStorage.getItem('canopy-store')==='test';}catch(e){return false;}
}
const cancelled=e=>/cancel/i.test(String(e&&(e.code||e.message||e)));
export function createPurchases(win=typeof window!=='undefined'?window:null){
  const plugin=win&&win.Capacitor&&win.Capacitor.Plugins&&win.Capacitor.Plugins.NativePurchases;
  const native=!!(plugin&&win.Capacitor.isNativePlatform&&win.Capacitor.isNativePlatform());
  const test=!native&&!!win&&testMode(win);
  const prices={};let loaded=false;
  return {
    // Can this build sell anything at all? (The iOS app, or test mode.)
    available:native||test,
    test,
    // The App Store's localised price strings by product id, once loaded; the catalogue's fallback labels meanwhile.
    price(id){const p=productById(id);return prices[id]||(p?p.price:'');},
    // Products the App Store knows about. Before Kevin creates them in App Store Connect this is empty, and the tiles
    // say they are not ready instead of failing on tap.
    ready(id){return test||(native&&loaded&&!!prices[id]);},
    async load(){
      if(test){loaded=true;return true;}
      if(!native)return false;
      try{const r=await plugin.getProducts({productIdentifiers:PRODUCTS.map(p=>p.id)});(r&&r.products||[]).forEach(p=>{if(p&&p.identifier)prices[p.identifier]=p.priceString||'';});loaded=true;return true;}
      catch(e){return false;}
    },
    // Resolves {productId, txn} when paid, null when the player cancels, and {error} when the App Store refuses.
    async buy(id){
      if(test){await new Promise(r=>setTimeout(r,700));return {productId:id,txn:'test-'+Date.now()};}
      if(!native)return {error:'unavailable'};
      try{const t=await plugin.purchaseProduct({productIdentifier:id,quantity:1});return t&&t.transactionId?{productId:t.productIdentifier||id,txn:String(t.transactionId)}:null;}
      catch(e){return cancelled(e)?null:{error:String(e&&(e.message||e))};}
    },
    // One-time packs the Apple account already owns: [{productId, txn}].
    async restore(){
      if(test)return [];
      if(!native)return [];
      try{await plugin.restorePurchases();}catch(e){}
      try{const r=await plugin.getPurchases();return (r&&r.purchases||[]).filter(t=>{const p=productById(t&&t.productIdentifier);return p&&p.type==='nonconsumable';}).map(t=>({productId:t.productIdentifier,txn:String(t.transactionId||'')}));}
      catch(e){return null;}
    },
    // Purchases that finish outside a tap (Ask to Buy approved later, an interrupted buy) arrive here.
    listen(fn){if(!native||!plugin.addListener)return;try{plugin.addListener('transactionUpdated',t=>{if(t&&t.productIdentifier&&t.transactionId)fn({productId:t.productIdentifier,txn:String(t.transactionId)});});}catch(e){}},
  };
}
