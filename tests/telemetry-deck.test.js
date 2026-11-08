import test from 'node:test';
import assert from 'node:assert/strict';
import {deckProvider,installId,TELEMETRYDECK_APP_ID} from '../src/telemetry-deck.js';

function fakeStorage(){const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),map:m};}
function fakeDeck(log){return class{constructor(opts){this.opts=opts;log.made.push(opts);}signal(type,payload){log.sent.push([type,payload]);return Promise.resolve();}};}
const tick=()=>new Promise(r=>setTimeout(r,0));

test('no app ID means no provider, so nothing can be sent',()=>{
 assert.equal(deckProvider({appID:''}),null);
 if(!TELEMETRYDECK_APP_ID)assert.equal(deckProvider({}),null,'the shipped default stays silent until the ID is pasted in');
});

test('the install id is random, made once and kept',()=>{
 const storage=fakeStorage();let n=0;
 const a=installId(storage,()=>'id-'+(++n)),b=installId(storage,()=>'id-'+(++n));
 assert.equal(a,'id-1');assert.equal(b,'id-1');
});

test('signals sent before the SDK loads are queued, then go out with the base payload',async()=>{
 const log={made:[],sent:[]},storage=fakeStorage();
 const send=deckProvider({appID:'APP',storage,random:()=>'dev-1',testMode:true,payload:{platform:'ios'},load:()=>Promise.resolve(fakeDeck(log))});
 send('session_start',{day:'0'});
 assert.equal(log.sent.length,0);
 await tick();
 send('return_day',{day:'1'});
 assert.deepEqual(log.made,[{appID:'APP',clientUser:'dev-1',testMode:true}]);
 assert.deepEqual(log.sent,[['session_start',{platform:'ios',day:'0'}],['return_day',{platform:'ios',day:'1'}]]);
});

test('a failed SDK load drops signals quietly',async()=>{
 const send=deckProvider({appID:'APP',storage:fakeStorage(),load:()=>Promise.reject(new Error('offline'))});
 send('session_start',{});await tick();
 assert.doesNotThrow(()=>send('session_alive',{minutes:'1'}));
});
