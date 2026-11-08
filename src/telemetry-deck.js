// TelemetryDeck provider for src/telemetry.js (Kevin chose TelemetryDeck on 2026-11-08 for TestFlight retention).
// Nothing is sent until TELEMETRYDECK_APP_ID holds the app ID from dashboard.telemetrydeck.com (App -> Set Up App).
// The player is a random install id made on this device; the SDK hashes it (SHA-256 + salt) before it leaves, so
// TelemetryDeck counts devices for retention without ever learning who anyone is. The SDK (~3 KB) is bundled
// statically: the entry runs as a classic script (scripts/make-classic.mjs), and a bundler dynamic import would need
// import.meta there and stop the game at start-up.
import TelemetryDeck from '@telemetrydeck/sdk';
export const TELEMETRYDECK_APP_ID='';
const INSTALL_KEY='canopy-install-id';
const QUEUE_MAX=50;

export function installId(storage,random){
 let id=null;
 try{id=storage&&storage.getItem(INSTALL_KEY);}catch(e){id=null;}
 if(id)return id;
 id=random?random():Math.random().toString(36).slice(2)+Date.now().toString(36);
 try{if(storage)storage.setItem(INSTALL_KEY,id);}catch(e){}
 return id;
}

// Returns send(name, props) for createTelemetry's provider option, or null when there is no app ID.
export function deckProvider(options){
 const o=options||{},appID=o.appID===undefined?TELEMETRYDECK_APP_ID:o.appID;
 if(!appID)return null;
 const base=Object.assign({},o.payload||{});
 const load=o.load||(()=>Promise.resolve(TelemetryDeck));
 let deck=null,failed=false;const waiting=[];
 const post=(name,props)=>{try{const p=deck.signal(name,Object.assign({},base,props));if(p&&p.catch)p.catch(()=>{});}catch(e){}};
 load().then(Deck=>{
  deck=new Deck({appID,clientUser:installId(o.storage,o.random),testMode:!!o.testMode});
  waiting.splice(0).forEach(item=>post(item[0],item[1]));
 }).catch(()=>{failed=true;waiting.length=0;});
 return function send(name,props){
  if(failed)return;
  if(deck)return post(name,props);
  if(waiting.length<QUEUE_MAX)waiting.push([name,props]);
 };
}
