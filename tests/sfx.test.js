import test from 'node:test';
import assert from 'node:assert/strict';
import {makeSound,AMBIENT_MIN_GAP} from '../src/sfx.js';

// A stub Web Audio graph that records what each cue builds, so a broken cue fails here instead of being swallowed in the browser.
function stubAudio(){
 const log={oscillators:0,noise:0,connects:0,starts:0,resumes:0};
 const param=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}});
 const node=()=>({connect(){log.connects++;},start(){log.starts++;},stop(){},gain:param(),frequency:param(),Q:param(),type:'',buffer:null});
 class AudioContext{
  constructor(){this.state='suspended';this.currentTime=0;this.sampleRate=48000;this.destination={};}
  resume(){log.resumes++;this.state='running';return Promise.resolve();}
  createGain(){return node();}
  createOscillator(){log.oscillators++;return node();}
  createBufferSource(){log.noise++;return node();}
  createBiquadFilter(){return node();}
  createBuffer(channels,length){return {getChannelData(){return new Float32Array(length);}};}
 }
 return {AudioContext,log};
}

function withBrowser(fn){
 const {AudioContext,log}=stubAudio();
 globalThis.window={AudioContext};globalThis.document={hidden:false};
 try{return fn(log);}finally{delete globalThis.window;delete globalThis.document;}
}

const KINDS=['tap','sale','coin','upgrade','denied','whoosh','sparkle','build','open'];

test('every cue builds and starts an audio graph without throwing',()=>{
 withBrowser(log=>{
  KINDS.forEach(kind=>{const play=makeSound();play(kind,true);});
  assert.ok(log.oscillators>=KINDS.length,'each cue plays at least one note');
  assert.ok(log.starts>=KINDS.length);
  assert.equal(log.resumes,KINDS.length,'a suspended context is resumed once per fresh player');
 });
});

test('sound stays silent when disabled, hidden or unknown, and throttles repeats',()=>{
 withBrowser(log=>{
  const play=makeSound();
  play('sale',false);play('nope',true);
  globalThis.document.hidden=true;play('sale',true);globalThis.document.hidden=false;
  assert.equal(log.oscillators,0);
  play('sale',true);const after=log.oscillators;play('sale',true);
  assert.equal(log.oscillators,after,'a second sale inside the throttle window is dropped');
 });
});

test('unlock primes the context only while sound is on',()=>{
 withBrowser(log=>{
  const play=makeSound();play.unlock(false);assert.equal(log.resumes,0);play.unlock(true);assert.equal(log.resumes,1);
 });
});

test('missing Web Audio is harmless',()=>{
 globalThis.window={};globalThis.document={hidden:false};
 try{assert.doesNotThrow(()=>makeSound()('sale',true));}finally{delete globalThis.window;delete globalThis.document;}
});

test('simulation-driven cues stay rare so a busy shop is not a constant jingle',()=>{
 assert.ok(AMBIENT_MIN_GAP>=8000,'sale and whoosh each wait at least eight seconds between plays');
 withBrowser(log=>{
  const play=makeSound();
  for(let i=0;i<50;i++){play('sale',true);play('whoosh',true);}
  const once=makeSound();once('sale',true);once('whoosh',true);
  assert.equal(log.oscillators,2*(2+1),'fifty rapid sales and drone launches play each cue exactly once');
 });
});

test('customers walk in silently: there is no door chime cue',()=>{
 withBrowser(log=>{makeSound()('chime',true);assert.equal(log.oscillators,0);});
});
