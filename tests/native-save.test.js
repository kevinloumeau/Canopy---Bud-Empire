import test from 'node:test';
import assert from 'node:assert/strict';
import {createNativeSave,shouldRestore,parseSave,saveSeq,NATIVE_KEY} from '../src/native-save.js';
import {nativePlugin} from '../src/native-plugins.js';

const save=(seq,extra={})=>JSON.stringify({money:100,saveSeq:seq,...extra});
function fakePlugin(value){const store={};if(value!==undefined)store[NATIVE_KEY]=value;const sets=[];
  return {store,sets,async get({key}){return {value:key in store?store[key]:null}},async set({key,value}){sets.push(value);store[key]=value}};}
function fakeSession(){const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};}
function rig(local,native,opts={}){const plugin=opts.plugin===null?null:fakePlugin(native);let stored=local,reloads=0;
  const ns=createNativeSave({plugin,getLocal:()=>stored,setLocal:raw=>{if(opts.failSet)return false;stored=raw;return true},reload:()=>reloads++,session:opts.session||fakeSession()});
  return {ns,plugin,get local(){return stored},get reloads(){return reloads}};}

test('parseSave and saveSeq accept only real saves',()=>{
  assert.equal(parseSave(''),null);assert.equal(parseSave('{}'),null);assert.equal(parseSave('[1]'),null);assert.equal(parseSave('nope'),null);
  assert.deepEqual(parseSave(save(3)),{money:100,saveSeq:3});
  assert.equal(saveSeq({}),0);assert.equal(saveSeq({saveSeq:'x'}),0);assert.equal(saveSeq({saveSeq:7}),7);
});

test('restores only when the web copy is gone, broken or behind',()=>{
  assert.equal(shouldRestore(null,save(5)),true);
  assert.equal(shouldRestore('garbage',save(5)),true);
  assert.equal(shouldRestore(save(4),save(5)),true);
  assert.equal(shouldRestore(save(5),save(5)),false);
  assert.equal(shouldRestore(save(9),save(5)),false);
  assert.equal(shouldRestore(save(1),null),false);
  assert.equal(shouldRestore(null,'{}'),false);
  // An existing save from before the mirror has no counter and the native copy is empty: never touched.
  assert.equal(shouldRestore(JSON.stringify({money:5}),null),false);
});

test('a wiped web view gets the native copy back and reloads once',async()=>{
  const r=rig(null,save(40));
  r.ns.write(save(1));assert.equal(r.plugin.sets.length,0,'held until the copies are compared');
  assert.equal(await r.ns.start(),'restored');
  assert.equal(r.local,save(40));assert.equal(r.reloads,1);assert.equal(r.ns.blocked,true);
  r.ns.write(save(2));assert.equal(r.plugin.store[NATIVE_KEY],save(40),'the fresh boot never overwrites the native copy');
});

test('after the reload the copies match and the player is told',async()=>{
  const session=fakeSession();
  const first=rig(null,save(40),{session});await first.ns.start();
  const second=rig(first.local,save(40),{session});
  assert.equal(await second.ns.start(),'recovered');assert.equal(second.reloads,0);
  const third=rig(first.local,save(40),{session});assert.equal(await third.ns.start(),'kept');
});

test('a restore that will not stick stops mirroring instead of looping',async()=>{
  const r=rig(null,save(40),{failSet:true});
  assert.equal(await r.ns.start(),'stuck');assert.equal(r.reloads,0);
  r.ns.write(save(1));assert.equal(r.plugin.store[NATIVE_KEY],save(40));
  const session=fakeSession();session.setItem('canopy-save-restored','1');
  const again=rig(null,save(40),{session});assert.equal(await again.ns.start(),'stuck');assert.equal(again.reloads,0);
});

test('a normal launch mirrors the held save and every later one',async()=>{
  const r=rig(save(10),save(10));
  r.ns.write(save(11));assert.equal(await r.ns.start(),'kept');
  assert.deepEqual(r.plugin.sets,[save(11)]);
  r.ns.write(save(12));await Promise.resolve();assert.equal(r.plugin.store[NATIVE_KEY],save(12));
});

test('first launch after the update copies the existing save without touching it',async()=>{
  const old=JSON.stringify({money:435000});
  const r=rig(old,undefined);assert.equal(await r.ns.start(),'kept');assert.equal(r.local,old);assert.equal(r.reloads,0);
  r.ns.write(save(1,{money:435000}));assert.equal(r.plugin.sets.length,1);
});

test('in a browser there is no plugin and nothing happens',async()=>{
  const r=rig(save(3),undefined,{plugin:null});
  assert.equal(r.ns.available,false);assert.equal(await r.ns.start(),'none');r.ns.write(save(4));assert.equal(r.ns.blocked,false);
  assert.equal(nativePlugin('Preferences'),null);
});

test('an unreadable native store freezes the mirror',async()=>{
  const plugin={async get(){throw new Error('x')},sets:[],async set({value}){this.sets.push(value)}};
  const ns=createNativeSave({plugin,getLocal:()=>save(1),setLocal:()=>true,reload:()=>{},session:fakeSession()});
  assert.equal(await ns.start(),'unreadable');ns.write(save(2));assert.equal(plugin.sets.length,0);
});
