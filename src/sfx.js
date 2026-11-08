// Sound effects: a small synthesised kit (no audio files), so the build stays self-contained, offline and licence-free
// (see docs/AUDIO.md). Every cue is short, soft and throttled per kind, and every pitched cue sits in F major, the key
// of the music (music.js), so effects land inside the loop instead of clashing with it.
// The mix: cues → a short room reverb (bells and chords only) → master → a gentle compressor → speakers. The music has
// its own bus into the same compressor (play.output()), so the two never stack into a clip on the phone speaker.
// Loudness ladder, softest first: sale and tap (every few seconds) < coin, buy, start < levelup, cash < build,
// achievement < fanfare, reopen (the two big moments; the music ducks under them, see main.js).
// Customers walk in silently. Cues driven by the simulation rather than by a tap (sale, whoosh) are rate-limited to one
// every several seconds: customers arrive faster than once a second, so per-event playback turns into a constant jingle.
// Repeated taps vary a little in pitch, and level-ups bought in a run climb the scale, so mashing Upgrade never sounds
// like the same sample on repeat.
// makeSound() returns play(kind, enabled). Mobile browsers only start audio inside a user gesture, so main.js also
// calls play.unlock() on every tap (iOS can interrupt the context after a call or Siri, and a tap brings it back).
const THROTTLE={fanfare:1500,reopen:3000,tap:60,sale:9000,upgrade:200,buy:120,levelup:90,cash:250,achievement:1200,denied:250,whoosh:12000,sparkle:400,build:400,start:400,open:1000,coin:90};
export const AMBIENT_MIN_GAP=Math.min(THROTTLE.sale,THROTTLE.whoosh);
// Cues loud enough that the music should dip under them.
export const DUCKING={fanfare:1.9,reopen:2.6,achievement:1.2};
// F major, two octaves up from F4, for cues that climb.
const SCALE=[349.23,392,440,523.25,587.33,659.25,698.46,783.99,880,1046.5,1174.66,1318.51,1396.91];
const STREAK_GAP=1400,STREAK_TOP=6;
export function streakStep(previousStep,sinceLast){return sinceLast<STREAK_GAP?Math.min(STREAK_TOP,previousStep+1):0;}
export function makeSound(){
 let context=null,master=null,output=null,room=null,noise=null,streak=0,streakAt=-1e9;const last={};
 function impulse(seconds){
  const rate=context.sampleRate,n=Math.floor(rate*seconds),b=context.createBuffer(2,n,rate);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);let lp=0;for(let i=0;i<n;i++){lp+=(Math.random()*2-1-lp)*.35;d[i]=lp*Math.pow(1-i/n,3.2);}}
  return b;
 }
 function ensure(){
  const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;
  if(!context){
   // iOS 17+: mix with whatever the player is listening to and respect the ring/silent switch, like most idle games.
   try{const s=window.navigator&&window.navigator.audioSession;if(s&&s.type!=='ambient')s.type='ambient';}catch(e){}
   context=new Audio();
   output=context.createGain();output.gain.value=1;
   const glue=context.createDynamicsCompressor?context.createDynamicsCompressor():null;
   if(glue){glue.threshold.value=-20;glue.knee.value=12;glue.ratio.value=3;glue.attack.value=.004;glue.release.value=.25;output.connect(glue);glue.connect(context.destination);}
   else output.connect(context.destination);
   master=context.createGain();master.gain.value=.85;master.connect(output);
   if(context.createConvolver){try{const verb=context.createConvolver();verb.buffer=impulse(1.4);room=context.createGain();room.gain.value=.22;room.connect(verb);verb.connect(master);}catch(e){room=null;}}
  }
  if(context.state!=='running'&&context.resume)context.resume().catch(()=>{});
  return context;
 }
 function noiseBuffer(){
  if(noise)return noise;const length=context.sampleRate*.5,buffer=context.createBuffer(1,length,context.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<length;i++)data[i]=Math.random()*2-1;return noise=buffer;
 }
 // One decaying note: wave, frequency (optionally gliding to `to`), peak gain, duration, start offset, reverb send.
 function note(type,freq,gain,duration,at,to,wet){
  const osc=context.createOscillator(),env=context.createGain(),t=context.currentTime+(at||0);
  osc.type=type;osc.frequency.setValueAtTime(freq,t);if(to)osc.frequency.exponentialRampToValueAtTime(to,t+duration*.8);
  env.gain.setValueAtTime(.0001,t);env.gain.exponentialRampToValueAtTime(gain,t+.008);env.gain.exponentialRampToValueAtTime(.0001,t+duration);
  osc.connect(env);env.connect(master);if(wet&&room)env.connect(room);osc.start(t);osc.stop(t+duration+.02);
 }
 // A soft bell: a sine with a quieter, quickly fading partial a fifth and an octave up — rounder than a triangle.
 function bell(freq,gain,duration,at,wet){note('sine',freq,gain,duration,at,0,wet===undefined?1:wet);note('sine',freq*2.005,gain*.28,duration*.45,at,0,wet===undefined?1:wet);note('sine',freq*3.01,gain*.08,duration*.2,at);}
 // Filtered noise burst: a tick, a thud or a whoosh depending on the filter sweep.
 function hiss(gain,duration,at,from,to,q){
  const src=context.createBufferSource(),filter=context.createBiquadFilter(),env=context.createGain(),t=context.currentTime+(at||0);
  src.buffer=noiseBuffer();filter.type='bandpass';filter.Q.value=q||1;filter.frequency.setValueAtTime(from,t);filter.frequency.exponentialRampToValueAtTime(to,t+duration);
  env.gain.setValueAtTime(.0001,t);env.gain.exponentialRampToValueAtTime(gain,t+.01);env.gain.exponentialRampToValueAtTime(.0001,t+duration);
  src.connect(filter);filter.connect(env);env.connect(master);src.start(t);src.stop(t+duration+.02);
 }
 const wobble=()=>1+(Math.random()-.5)*.06;
 const CUES={
  // Soft UI tick for tabs and toggles: a wooden click, a hair different each time.
  tap(){const w=wobble();hiss(.07,.035,0,2600*w,1500*w,2.2);note('sine',1397*w,.026,.045,0);},
  // A sale: the muted thump of a bag set on the counter and one soft, low note — no bell, no high harmonics.
  sale(){hiss(.04,.07,0,700,220,1.2);note('sine',523.25,.04,.15,0);note('sine',783.99,.015,.12,.03);},
  // A single soft coin for repeated ticks such as lounge covers.
  coin(){const w=wobble();bell(1760*w,.06,.16,0,.4);},
  // A purchase (new strain, research, perk): a felt-tipped register "tok" and two warm notes.
  buy(){hiss(.05,.05,0,1100,500,1.6);bell(523.25,.04,.25,.02,.5);bell(783.99,.032,.3,.07,.5);},
  // Upgrade: a rising three-note arpeggio for anything that isn't a station level.
  upgrade(){[[523.25,0],[659.25,.07],[783.99,.14]].forEach(([f,at])=>bell(f,.045,.26,at,.6));},
  // A station level: two quick notes that climb the F major scale with every level bought in a run, then settle back.
  levelup(){const s=streak;hiss(.03,.04,0,1800,900,1.4);bell(SCALE[s],.042,.22,0,.5);bell(SCALE[s+2],.04,.3,.06,.6);if(s>=STREAK_TOP)bell(SCALE[s+4],.025,.4,.12,1);},
  // A station's new look (a tier): the level-up opened out into a little run.
  tier(){[0,2,4,7].forEach((d,i)=>bell(SCALE[2+d],.05,.42,i*.06,1));hiss(.03,.4,.18,3000,7000,.8);},
  // Collecting cash (rewards, bonuses, away pay): a soft drawer slide and a short cascade of coins.
  cash(){hiss(.05,.12,0,900,2400,.9);[[1568,.05],[1760,.1],[2093,.15],[2349,.2]].forEach(([f,at])=>bell(f*wobble(),.032,.2,at,.5));note('sine',523.25,.04,.3,.04);},
  // Can't afford: a low, round two-tone shrug — never a buzzer.
  denied(){note('triangle',220,.04,.12,0,200);note('triangle',174.61,.035,.18,.09,160);},
  // Courier drone leaving: a short rotor whoosh and rising hum.
  whoosh(){hiss(.07,.5,0,300,2400,.8);note('sawtooth',180,.014,.45,0,420);},
  // Reveals and events: a quick sparkle.
  sparkle(){[[1318.51,0],[1567.98,.05],[2093,.1],[2637,.15]].forEach(([f,at])=>bell(f,.035,.3,at,.8));hiss(.02,.25,.1,4000,6000,1);},
  // Construction starting: two soft mallet knocks on wood.
  start(){[0,.13].forEach((at,i)=>{hiss(.08,.08,at,420-i*60,180,1.5);note('sine',196-i*22,.05,.1,at,150);});},
  // Construction finished: a thud, then a four-note arpeggio that rings.
  build(){hiss(.1,.18,0,180,60,1);note('sine',87.31,.07,.24,0,55);[[523.25,.16],[659.25,.23],[783.99,.3],[1046.5,.38]].forEach(([f,at])=>bell(f,.05,.4,at,1));},
  // An achievement or chapter: a warm open chord with a high bell answering it — gentler than a fanfare, but its own.
  achievement(){[[349.23,0],[440,.03],[523.25,.06],[659.25,.09]].forEach(([f,at])=>{note('triangle',f,.035,1.1,at,0,1);});bell(1396.91,.05,.9,.28);bell(1760,.04,1,.42);hiss(.025,.7,.3,3500,8000,.8);},
  // A big milestone (a branch, HQ or city stage opening, the lounge, the window): the loudest cue. A low thump, a bright
  // major chord that swells and rings, a rising run and a shimmer on top. Music ducks for it.
  fanfare(){hiss(.13,.22,0,200,60,1);note('sine',87.31,.1,.35,0,52);
   [[349.23,.04],[440,.08],[523.25,.12],[698.46,.16],[880,.2]].forEach(([f,at])=>{note('triangle',f,.055,1.5,at,0,1);note('sine',f*2,.014,1,at+.01);});
   [[1046.5,.42],[1318.51,.5],[1567.98,.58],[2093,.66]].forEach(([f,at])=>bell(f,.045,.55,at,1));hiss(.04,1.1,.45,3000,8000,.8);},
  // Reopening (a fresh run with shares): a slow sunrise rather than a burst — a low chord blooms, a second chord lifts
  // a step, and bells walk up over it.
  reopen(){note('sine',87.31,.08,1.6,0,0,1);
   [[349.23,0],[440,.05],[523.25,.1]].forEach(([f,at])=>note('triangle',f,.04,1.6,at,0,1));
   [[392,.75],[466.16,.8],[587.33,.85],[698.46,.9]].forEach(([f,at])=>note('triangle',f,.04,1.8,at,0,1));
   [[1046.5,.9],[1174.66,1.05],[1396.91,1.2],[1760,1.35],[2093,1.5]].forEach(([f,at])=>bell(f,.04,.9,at,1));hiss(.035,2,.8,2500,9000,.7);},
  // Opening the shop: a warm chord swell with a bell on top.
  open(){[[261.63,0],[329.63,.02],[392,.04],[523.25,.06]].forEach(([f,at])=>note('triangle',f,.045,.9,at,0,1));bell(1567.98,.045,.7,.25);bell(2093,.035,.8,.4);hiss(.025,.6,.2,2000,5000,1);}
 };
 function play(kind,enabled){
  if(!enabled||document.hidden||!CUES[kind])return;
  try{
   const now=Date.now();if(now-(last[kind]||0)<(THROTTLE[kind]||150))return;
   if(kind==='levelup'){streak=streakStep(streak,now-streakAt);streakAt=now;}
   last[kind]=now;
   if(!ensure())return;CUES[kind]();if(play.onCue)play.onCue(kind);
  }catch(e){/* Audio is optional when the browser denies playback. */}
 }
 play.unlock=function(enabled){if(!enabled)return;try{ensure();}catch(e){}};
 // The shared context for the music (music.js), created on first use.
 play.context=function(){try{return ensure();}catch(e){return null;}};
 // Where the music connects: the compressor in front of the speakers, shared with the effects.
 play.output=function(){return output;};
 play.kinds=Object.keys(CUES);
 // A hook run when a cue starts, so main.js can duck the music under the big ones.
 play.onCue=null;
 return play;
}
