// Sound effects: a small synthesised kit (no audio files), so the build stays self-contained and offline.
// Every cue is short, quiet and throttled per kind; the upgrade arpeggio is the loudest at roughly -20 dBFS.
// The sale cue is deliberately the softest: it fires on every pickup, so it is a low, muted tap rather than a ding.
// Customers walk in silently. Cues driven by the simulation rather than by a tap (sale, whoosh) are rate-limited to one every several
// seconds: customers arrive faster than once a second, so per-event playback turns into a constant jingle.
// makeSound() returns play(kind, enabled). Mobile browsers only start audio inside a user gesture, so main.js also
// calls play.unlock() on the first pointer or key event to create and resume the context while sound is on.
const THROTTLE={tap:60,sale:9000,upgrade:200,denied:250,whoosh:12000,sparkle:400,build:400,open:1000,coin:90};
export const AMBIENT_MIN_GAP=Math.min(THROTTLE.sale,THROTTLE.whoosh);
export function makeSound(){
 let context=null,master=null,noise=null;const last={};
 function ensure(){
  const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;
  if(!context){context=new Audio();master=context.createGain();master.gain.value=.9;master.connect(context.destination);}
  if(context.state==='suspended')context.resume().catch(()=>{});
  return context;
 }
 function noiseBuffer(){
  if(noise)return noise;const length=context.sampleRate*.5,buffer=context.createBuffer(1,length,context.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<length;i++)data[i]=Math.random()*2-1;return noise=buffer;
 }
 // One decaying note: wave, frequency (optionally gliding to `to`), peak gain, duration, start offset.
 function note(type,freq,gain,duration,at,to){
  const osc=context.createOscillator(),env=context.createGain(),t=context.currentTime+(at||0);
  osc.type=type;osc.frequency.setValueAtTime(freq,t);if(to)osc.frequency.exponentialRampToValueAtTime(to,t+duration*.8);
  env.gain.setValueAtTime(.0001,t);env.gain.exponentialRampToValueAtTime(gain,t+.008);env.gain.exponentialRampToValueAtTime(.0001,t+duration);
  osc.connect(env);env.connect(master);osc.start(t);osc.stop(t+duration+.02);
 }
 // Filtered noise burst: a tick, a thud or a whoosh depending on the filter sweep.
 function hiss(gain,duration,at,from,to,q){
  const src=context.createBufferSource(),filter=context.createBiquadFilter(),env=context.createGain(),t=context.currentTime+(at||0);
  src.buffer=noiseBuffer();filter.type='bandpass';filter.Q.value=q||1;filter.frequency.setValueAtTime(from,t);filter.frequency.exponentialRampToValueAtTime(to,t+duration);
  env.gain.setValueAtTime(.0001,t);env.gain.exponentialRampToValueAtTime(gain,t+.01);env.gain.exponentialRampToValueAtTime(.0001,t+duration);
  src.connect(filter);filter.connect(env);env.connect(master);src.start(t);src.stop(t+duration+.02);
 }
 const CUES={
  // Soft UI tick for tabs and toggles.
  tap(){hiss(.05,.04,0,2400,1400,2);note('sine',1500,.02,.05,0);},
  // A sale: the muted thump of a bag set on the counter and one soft, low note — no bell, no high harmonics.
  sale(){hiss(.035,.07,0,700,220,1.2);note('sine',523,.03,.15,0);note('sine',784,.012,.12,.03);},
  // A single coin for repeated ticks such as offline earnings.
  coin(){note('triangle',2093,.06,.12,0);note('sine',3136,.03,.1,.03);},
  // Upgrade: a rising three-note arpeggio.
  upgrade(){[[523,0],[659,.07],[784,.14]].forEach(([f,at])=>note('triangle',f,.07,.22,at));note('sine',1568,.03,.3,.2);},
  // Can't afford: a low two-tone bonk.
  denied(){note('square',196,.035,.12,0,170);note('square',147,.03,.16,.1,130);},
  // Courier drone leaving: a short rotor whoosh and rising hum.
  whoosh(){hiss(.09,.5,0,300,2400,.8);note('sawtooth',180,.02,.45,0,420);},
  // Rewards, goals and events: a quick sparkle.
  sparkle(){[[1319,0],[1568,.05],[2093,.1],[2637,.15]].forEach(([f,at])=>note('sine',f,.05,.28,at));hiss(.03,.25,.1,4000,6000,1);},
  // Construction finished: a thud, then the upgrade arpeggio.
  build(){hiss(.12,.18,0,180,60,1);note('sine',90,.08,.22,0,55);[[523,.16],[659,.23],[784,.3],[1047,.38]].forEach(([f,at])=>note('triangle',f,.06,.24,at));},
  // Opening the shop: a warm chord swell with a bell on top.
  open(){[[262,0],[330,.02],[392,.04],[523,.06]].forEach(([f,at])=>note('triangle',f,.05,.9,at));note('sine',1568,.05,.7,.25);note('sine',2093,.04,.8,.4);hiss(.03,.6,.2,2000,5000,1);}
 };
 function play(kind,enabled){
  if(!enabled||document.hidden||!CUES[kind])return;
  try{
   const now=Date.now();if(now-(last[kind]||0)<(THROTTLE[kind]||150))return;last[kind]=now;
   if(!ensure())return;CUES[kind]();
  }catch(e){/* Audio is optional when the browser denies playback. */}
 }
 play.unlock=function(enabled){if(!enabled)return;try{ensure();}catch(e){}};
 return play;
}
