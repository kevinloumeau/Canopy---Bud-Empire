import test from 'node:test';
import assert from 'node:assert/strict';
import {createNativeSaveWriter} from '../src/native-save.js';
const settle=()=>new Promise(resolve=>setImmediate(resolve));
test('native backup starts immediately and serializes the newest pending snapshot',async()=>{
  const calls=[],finish=[];
  const write=createNativeSaveWriter({set(args){calls.push(args);return new Promise(r=>finish.push(r))}},'shift-save');
  write('first');assert.deepEqual(calls,[{key:'shift-save',value:'first'}]);
  write('second');write('latest');assert.equal(calls.length,1);
  finish.shift()();await settle();assert.equal(calls[1].value,'latest');
  finish.shift()();await settle();
});
test('failed bridge calls do not reject globally or block subsequent saves',async()=>{
  let count=0;const values=[];
  const write=createNativeSaveWriter({set({value}){values.push(value);if(count++===0)return Promise.reject(new Error('unavailable'));return Promise.resolve()}},'shift-save');
  write('first');write('latest');await settle();assert.deepEqual(values,['first','latest']);
});
test('synchronous failure and web-only launches remain safe',()=>{
  const write=createNativeSaveWriter({set(){throw new Error('offline bridge')}},'shift-save');
  assert.doesNotThrow(()=>{write('one');write('two');createNativeSaveWriter(null,'shift-save')('web')});
});
