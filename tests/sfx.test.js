import test from 'node:test';
import assert from 'node:assert/strict';
import {makeSound,AMBIENT_MIN_GAP,DUCKING,streakStep} from '../src/sfx.js';
import {cueFor,PASSIVE_HAPTIC} from '../src/sound-cues.js';

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

const KINDS=['tap','sale','coin','buy','upgrade','levelup','tier','cash','denied','whoosh','sparkle','start','build','achievement','fanfare','reopen','open'];

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

test('the kit has every cue the game asks for, and the stub exercises a compressor and reverb when they exist',()=>{
 withBrowser(log=>{
  const play=makeSound();assert.deepEqual([...play.kinds].sort(),[...KINDS].sort());
  globalThis.window.AudioContext.prototype.createDynamicsCompressor=function(){const p=()=>({value:0});return {threshold:p(),knee:p(),ratio:p(),attack:p(),release:p(),connect(){}};};
  globalThis.window.AudioContext.prototype.createConvolver=function(){return {buffer:null,connect(){}};};
  const full=makeSound();KINDS.forEach(k=>full(k,true));assert.ok(full.output(),'the music has a shared output to join');
 });
});

test('level-ups bought in a run climb the scale, then settle back after a pause',()=>{
 let s=0;for(let i=0;i<10;i++)s=streakStep(s,300);assert.equal(s,6,'tops out six steps up');
 assert.equal(streakStep(s,2000),0);assert.equal(streakStep(0,300),1);
});

test('only the big moments duck the music',()=>{assert.deepEqual(Object.keys(DUCKING).sort(),['achievement','fanfare','reopen']);});

test('each toast plays the sound that matches what happened',()=>{
 const cases=[
  ['DOWNTOWN IS OPEN · +$1.2K/s','upgrade','fanfare'],['Reopened · +12 shares · 1.4× sales','upgrade','reopen'],
  ['ACHIEVEMENT · FIRST HARVEST · +1% SALES',undefined,'achievement'],['CHAPTER COMPLETE · Street corner','upgrade','achievement'],
  ['GOAL COMPLETE · +$500','upgrade','cash'],['DAILY REWARD · +$2K','upgrade','cash'],['WHILE AWAY +$4.1K',undefined,'cash'],['$900 ORDER BONUS',undefined,'cash'],
  ['Need $40 more',undefined,'denied'],['STORAGE FULL · expand it in Research',undefined,null],
  ['LOUNGE UNDER CONSTRUCTION · opens in 3:00','upgrade','start'],['CANOPY HQ · LOBBY UNDER WAY · done in 5:00','upgrade','start'],
  ['DELIVERY PAD BUILT · drones take the rest','upgrade','build'],['LINE EXPANDED · 8 customers','upgrade','build'],
  ['Grow · LEVEL 12','upgrade','levelup'],['SECURITY · LEVEL 4','upgrade','levelup'],['Pack EMPLOYEE · +3 LEVELS','upgrade','levelup'],
  ['AMBER BLOOM UNLOCKED','upgrade','buy'],['BOOST · 2× SALES FOR 10 MIN','upgrade','buy'],['GAME SPEED · 2×',undefined,null]
 ];
 cases.forEach(([m,k,want])=>assert.equal(cueFor(m,k),want,m));
});

test('passive cues bring their own haptic; tapped ones rely on the tap',()=>{
 assert.equal(PASSIVE_HAPTIC.achievement,'firm');assert.equal(PASSIVE_HAPTIC.cash,'light');assert.equal(PASSIVE_HAPTIC.levelup,undefined);
});
