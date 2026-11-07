import test from 'node:test';
import assert from 'node:assert/strict';
import {makeHaptics,hapticBridge} from '../src/haptics.js';

test('the iPhone bridge wins over navigator.vibrate',()=>{
 const posted=[],vibrated=[];
 const send=hapticBridge({webkit:{messageHandlers:{canopyHaptic:{postMessage:m=>posted.push(m)}}},navigator:{vibrate:ms=>vibrated.push(ms)}});
 send('firm');
 assert.deepEqual(posted,[{kind:'firm'}]);assert.deepEqual(vibrated,[]);
});

test('falls back to navigator.vibrate, and to nothing at all',()=>{
 const vibrated=[];hapticBridge({navigator:{vibrate:ms=>vibrated.push(ms)}})('light');
 assert.equal(vibrated.length,1);
 assert.equal(hapticBridge({navigator:{}}),null);
 assert.equal(makeHaptics({send:null}).available,false);
 assert.equal(makeHaptics({send:null})('firm'),false);
});

test('respects the setting, reduced motion and unknown kinds',()=>{
 const sent=[];let on=true,reduce=false,t=0;
 const play=makeHaptics({send:k=>sent.push(k),enabled:()=>on,reducedMotion:()=>reduce,now:()=>t+=1000});
 on=false;play('firm');on=true;
 reduce=true;play('select');play('light');reduce=false;
 play('buzz');play('select');
 assert.deepEqual(sent,['light','select']);
});

test('a firm buzz swallows lighter ones right after it, and repeats are spaced',()=>{
 const sent=[];let t=0;const play=makeHaptics({send:k=>sent.push(k),now:()=>t});
 play('firm');t=50;play('light');play('firm');t=100;play('select');
 t=400;play('light');t=420;play('light');t=500;play('light');
 assert.deepEqual(sent,['firm','light','light']);
});
