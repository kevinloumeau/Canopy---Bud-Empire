// Background music: a soft lo-fi loop over a low city hum, synthesised with Web Audio like the sound effects (sfx.js), so
// it costs no download, never runs out and loops without a seam (each bar is scheduled as it comes round).
// The loop: 74 BPM, an eight-bar round of four warm seventh chords on a mellow electric piano, a round bass, a brushed
// kit (kick, rim, swung hats) and a four-bar piano answer in the second half; under it a vinyl crackle, a low street hum
// that breathes, and now and then a car passing two blocks away.
// It starts only after the first tap (iOS will not start audio without one), fades in, sits well under the effects,
// dips for big moments (duck) and stops, with the audio clock suspended, while the app is hidden.
export const BPM=74,BEAT=60/BPM,BAR=BEAT*4,ROUND=8;
export const MUSIC_LEVEL=.55;
// Chords (MIDI notes) and bass roots: Fmaj9 · Em9 · Dm9 · Cmaj9.
export const CHORDS=[[53,57,60,64,67],[52,55,59,62,66],[50,53,57,60,64],[48,52,55,59,62]];
export const ROOTS=[41,40,38,36];
// The answer phrase, as [beat, note] pairs per bar (bars 4–7 of the round): F major pentatonic, high and sparse.
const ANSWER=[[[0.5,72],[1.5,69],[3,67]],[[1,69],[2.5,64]],[[0.5,74],[1.5,72],[2,69],[3.5,67]],[[1,65],[2,64],[3,60]]];
const midiHz=m=>440*Math.pow(2,(m-69)/12);
// A small stable hash so each bar's variations (ghost kicks, hat accents, chord re-hits) repeat every few rounds rather
// than changing with Math.random, which keeps the loop recognisable.
function chance(bar,salt){let h=(bar*374761393+salt*668265263)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967296;}
// Everything one bar plays, in beats from the bar's start: [{kind, beat, note?, gain, length?}].
export function barPlan(bar){
 const slot=((bar%ROUND)+ROUND)%ROUND,chord=CHORDS[slot%4],out=[];
 chord.forEach((note,i)=>out.push({kind:'keys',beat:i*.03,note,gain:i===0?.9:.7,length:BEAT*3.6}));
 if(chance(bar,1)>.45)chord.slice(1,4).forEach((note,i)=>out.push({kind:'keys',beat:2.5+i*.025,note,gain:.4,length:BEAT*1.4}));
 out.push({kind:'bass',beat:0,note:ROOTS[slot%4],gain:1,length:BEAT*1.8});
 out.push({kind:'bass',beat:2.5,note:ROOTS[slot%4]+(chance(bar,2)>.5?7:12),gain:.7,length:BEAT*1.2});
 [0,2].forEach(beat=>out.push({kind:'kick',beat,gain:1}));
 if(chance(bar,3)>.55)out.push({kind:'kick',beat:1.5,gain:.55});
 [1,3].forEach(beat=>out.push({kind:'rim',beat:beat+.04,gain:1}));
 for(let e=0;e<8;e++){const off=e%2===1;out.push({kind:'hat',beat:e/2+(off?.09:0),gain:off?.55:(e%4===0?1:.8)*(chance(bar,10+e)>.85?.4:1)});}
 if(slot>=4)ANSWER[slot-4].forEach(([beat,note])=>out.push({kind:'lead',beat,note,gain:1,length:BEAT*1.1}));
 return out;
}
export function makeMusic(getContext){
 let ctx=null,bus=null,keysBus=null,drumBus=null,lfo=null,beds=[],timer=0,nextBar=0,nextTime=0,on=false,live=false,noise=null,carClock=0;
 function build(){
  ctx=getContext();if(!ctx)return false;if(bus)return true;
  bus=ctx.createGain();bus.gain.value=0;bus.connect(ctx.destination);
  // Keys: a warm low-pass and a slow tremolo, like an old electric piano through a small amp.
  const keysTone=ctx.createBiquadFilter();keysTone.type='lowpass';keysTone.frequency.value=1500;keysTone.Q.value=.4;
  keysBus=ctx.createGain();keysBus.gain.value=1;const trem=ctx.createOscillator(),tremDepth=ctx.createGain();trem.frequency.value=4.2;tremDepth.gain.value=.12;trem.connect(tremDepth);tremDepth.connect(keysBus.gain);trem.start();
  keysBus.connect(keysTone);keysTone.connect(bus);
  const drumTone=ctx.createBiquadFilter();drumTone.type='lowpass';drumTone.frequency.value=4200;drumBus=ctx.createGain();drumBus.connect(drumTone);drumTone.connect(bus);
  // Tape wow: one slow wobble shared by every pitched note (±7 cents).
  lfo=ctx.createGain();lfo.gain.value=7;const wow=ctx.createOscillator();wow.frequency.value=.35;wow.connect(lfo);wow.start();
  return true;
 }
 function noiseBuffer(){
  if(noise)return noise;const n=ctx.sampleRate,b=ctx.createBuffer(1,n,n),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;return noise=b;
 }
 // A looping bed buffer whose last half second is crossfaded into its start, so the loop point has no click.
 function seamless(seconds,fill){
  const rate=ctx.sampleRate,n=Math.floor(rate*seconds),fade=Math.floor(rate*.5),raw=new Float32Array(n+fade);fill(raw,rate);
  const b=ctx.createBuffer(1,n,rate),d=b.getChannelData(0);
  for(let i=0;i<n;i++)d[i]=raw[i];for(let i=0;i<fade;i++){const k=i/fade;d[i]=raw[i]*k+raw[n+i]*(1-k);}
  return b;
 }
 function startBeds(){
  // Street hum: brown noise, low-passed, breathing slowly as traffic comes and goes.
  const hum=ctx.createBufferSource();hum.buffer=seamless(6,(d)=>{let last=0;for(let i=0;i<d.length;i++){last=(last+.02*(Math.random()*2-1))/1.02;d[i]=last*3.2;}});hum.loop=true;
  const humTone=ctx.createBiquadFilter();humTone.type='lowpass';humTone.frequency.value=420;const humGain=ctx.createGain();humGain.gain.value=.05;
  const swell=ctx.createOscillator(),swellDepth=ctx.createGain();swell.frequency.value=.06;swellDepth.gain.value=.02;swell.connect(swellDepth);swellDepth.connect(humGain.gain);
  hum.connect(humTone);humTone.connect(humGain);humGain.connect(bus);hum.start();swell.start();
  // Vinyl crackle: sparse soft clicks over a faint hiss.
  const crackle=ctx.createBufferSource();crackle.buffer=seamless(4,(d,rate)=>{for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*.018;for(let c=0;c<d.length/rate*7;c++){const at=Math.floor(Math.random()*(d.length-40)),g=(Math.random()*.5+.2)*(Math.random()<.15?1.8:1);for(let k=0;k<30;k++)d[at+k]+=(Math.random()*2-1)*g*Math.exp(-k/5);}});crackle.loop=true;
  const crackleTone=ctx.createBiquadFilter();crackleTone.type='highpass';crackleTone.frequency.value=1800;const crackleGain=ctx.createGain();crackleGain.gain.value=.05;
  crackle.connect(crackleTone);crackleTone.connect(crackleGain);crackleGain.connect(bus);crackle.start();
  beds=[hum,swell,crackle];
 }
 function stopBeds(){beds.forEach(s=>{try{s.stop();}catch(e){}});beds=[];}
 function voice(type,freq,gain,at,length,dest,detune){
  const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;if(detune)o.detune.value=detune;lfo.connect(o.detune);
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(gain,at+.012);g.gain.exponentialRampToValueAtTime(gain*.35,at+Math.min(.9,length*.4));g.gain.exponentialRampToValueAtTime(.0001,at+length);
  o.connect(g);g.connect(dest);o.start(at);o.stop(at+length+.05);
 }
 function hit(gain,at,length,type,from,to,q,dest){
  const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noiseBuffer();f.type=type;f.Q.value=q||.7;f.frequency.setValueAtTime(from,at);if(to)f.frequency.exponentialRampToValueAtTime(to,at+length);
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(gain,at+.004);g.gain.exponentialRampToValueAtTime(.0001,at+length);
  s.connect(f);f.connect(g);g.connect(dest);s.start(at,Math.random()*.5);s.stop(at+length+.02);
 }
 function playEvent(e,at){
  const t=at+e.beat*BEAT;
  if(e.kind==='keys'){const f=midiHz(e.note);voice('sine',f,.03*e.gain,t,e.length,keysBus);voice('triangle',f*2,.006*e.gain,t,e.length*.35,keysBus,4);}
  else if(e.kind==='bass')voice('sine',midiHz(e.note),.11*e.gain,t,e.length,bus);
  else if(e.kind==='lead'){const f=midiHz(e.note);voice('sine',f,.022,t,e.length,keysBus);voice('sine',f*3,.003,t,e.length*.3,keysBus);}
  else if(e.kind==='kick'){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(105,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16*e.gain,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+.32);o.connect(g);g.connect(drumBus);o.start(t);o.stop(t+.36);}
  else if(e.kind==='rim')hit(.045*e.gain,t,.11,'bandpass',1900,1200,.9,drumBus);
  else if(e.kind==='hat')hit(.016*e.gain,t,.045,'highpass',7200,0,.5,drumBus);
 }
 // A car two blocks away: a slow band-passed swell, every 14–30 s.
 function maybeCar(at){carClock-=BAR;if(carClock>0)return;carClock=14+Math.random()*16;
  const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain(),len=3.2;s.buffer=noiseBuffer();s.loop=true;f.type='bandpass';f.Q.value=1.4;
  f.frequency.setValueAtTime(260,at);f.frequency.exponentialRampToValueAtTime(620,at+len*.5);f.frequency.exponentialRampToValueAtTime(240,at+len);
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(.035,at+len*.5);g.gain.exponentialRampToValueAtTime(.0001,at+len);s.connect(f);f.connect(g);g.connect(bus);s.start(at);s.stop(at+len+.05);
 }
 // Looks a second ahead every quarter second and schedules each bar that starts in that window.
 function pump(){
  if(!live)return;
  while(nextTime<ctx.currentTime+1.2){barPlan(nextBar).forEach(e=>playEvent(e,nextTime));maybeCar(nextTime);nextBar++;nextTime+=BAR;}
 }
 function begin(){
  if(live||!on||document.hidden||!build())return;
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  live=true;nextTime=ctx.currentTime+.15;carClock=8;startBeds();
  bus.gain.cancelScheduledValues(ctx.currentTime);bus.gain.setValueAtTime(Math.max(.0001,bus.gain.value),ctx.currentTime);bus.gain.linearRampToValueAtTime(MUSIC_LEVEL,ctx.currentTime+3);
  pump();timer=setInterval(pump,250);
 }
 function end(fade){
  if(!live)return;live=false;clearInterval(timer);timer=0;
  const t=ctx.currentTime;bus.gain.cancelScheduledValues(t);bus.gain.setValueAtTime(bus.gain.value,t);bus.gain.linearRampToValueAtTime(0,t+(fade||.01));
  const stop=()=>{if(!live)stopBeds();};if(fade)setTimeout(stop,fade*1000+60);else stop();
 }
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){end();if(ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});}
  else if(ctx){ctx.resume().catch(()=>{});begin();}
 });
 return {
  // Whether music should play; it begins at the next unlock() (a tap) or straight away once audio is running.
  set(enabled){on=!!enabled;if(!on)end(.6);else if(ctx&&ctx.state==='running')begin();},
  // Call from a user gesture: creates the context on iOS and starts the loop.
  unlock(){if(on)try{begin();}catch(e){}},
  // Dips the music for a big moment's sound, then brings it back.
  duck(seconds){if(!live)return;const t=ctx.currentTime,hold=seconds||1.6;bus.gain.cancelScheduledValues(t);bus.gain.setValueAtTime(bus.gain.value,t);bus.gain.linearRampToValueAtTime(MUSIC_LEVEL*.3,t+.08);bus.gain.setValueAtTime(MUSIC_LEVEL*.3,t+hold);bus.gain.linearRampToValueAtTime(MUSIC_LEVEL,t+hold+1.4);},
  playing(){return live;},
  // Offline render for checks (tests/music-preview.mjs): schedules `seconds` of the loop on the given context at once.
  preview(seconds){if(!build())return;startBeds();bus.gain.value=MUSIC_LEVEL;carClock=8;nextTime=.05;while(nextTime<seconds){barPlan(nextBar).forEach(e=>playEvent(e,nextTime));maybeCar(nextTime);nextBar++;nextTime+=BAR;}}
 };
}
