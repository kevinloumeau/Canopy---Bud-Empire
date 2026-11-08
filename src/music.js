// Background music: a soft lo-fi loop over a low city hum, synthesised with Web Audio like the sound effects (sfx.js), so
// it costs no download, needs no licence (docs/AUDIO.md), never runs out and loops without a seam (each bar is
// scheduled as it comes round).
// The form, at 74 BPM: a sixteen-bar round (about 52 s). Bars 0–7 walk four warm seventh chords (the A section), bars
// 8–15 lift to the B section and turn back home; a piano answer sings over the second half of each section, and the
// last bar drops the kick for a small fill. Every fourth round is a breather with no drums, so a long session never
// feels like the same beat for an hour.
// Day and night: in daylight the loop is F major, brushed kit and swung hats. After dark (the map's night, read at the
// top of each round so a change never lands mid-phrase) it moves to D minor, the keys darken, a slow pad comes in, the
// kit goes half-time and quiet, and fewer cars pass.
// Under it all: a vinyl crackle, a low street hum that breathes, and now and then a car passing two blocks away.
// It starts only after a tap (iOS will not start audio without one), fades in, sits well under the effects, dips for
// big moments (duck) and stops, with the audio clock suspended, while the app is hidden.
export const BPM=74,BEAT=60/BPM,BAR=BEAT*4,ROUND=16,BREATHER_EVERY=4;
export const MUSIC_LEVEL=.3;
// Chords (MIDI notes) and bass roots for each bar of a round's two sections, by mood.
// Day, F major — A: Fmaj9 · Em9 · Dm9 · Cmaj9; B: Bbmaj9 · Am7(11) · Gm9 · C9sus4.
// Night, D minor — A: Dm9 · Bbmaj9 · Gm9 · Am7; B: Gm9 · Fmaj9 · Bbmaj9 · C9sus4.
const FMAJ9=[53,57,60,64,67],EM9=[52,55,59,62,66],DM9=[50,53,57,60,64],CMAJ9=[48,52,55,59,62],BBMAJ9=[46,50,53,57,60],AM11=[45,48,52,55,62],GM9=[43,46,50,53,57],C9SUS=[48,53,58,62,67],AM7=[45,48,52,55,60];
export const SECTIONS={
 day:{A:[FMAJ9,EM9,DM9,CMAJ9],B:[BBMAJ9,AM11,GM9,C9SUS],rootsA:[41,40,38,36],rootsB:[46,45,43,36]},
 night:{A:[DM9,BBMAJ9,GM9,AM7],B:[GM9,FMAJ9,BBMAJ9,C9SUS],rootsA:[38,46,43,45],rootsB:[43,41,46,36]}
};
// The day A chords, kept for older checks.
export const CHORDS=SECTIONS.day.A,ROOTS=SECTIONS.day.rootsA;
// Answer phrases as [beat, note] pairs per bar, sung over bars 4–7 (A) and 12–15 (B). All in key, high and sparse.
const PHRASES={
 day:{A:[[[0.5,72],[1.5,69],[3,67]],[[1,69],[2.5,64]],[[0.5,74],[1.5,72],[2,69],[3.5,67]],[[1,65],[2,64],[3,60]]],
      B:[[[0.5,74],[2,72],[3,69]],[[1,72],[2.5,76]],[[0.5,70],[1.5,74],[3,72]],[[1,67],[2,65],[3.5,67]]]},
 night:{A:[[[1,69],[2.5,65]],[[0.5,62],[2,65]],[[1,67],[3,70]],[[0.5,69],[2,64]]],
        B:[[[1,70],[2.5,67]],[[0.5,69],[2,72]],[[1,65],[3,62]],[[0.5,67],[2.5,65]]]}
};
const midiHz=m=>440*Math.pow(2,(m-69)/12);
// A small stable hash so each bar's variations (ghost kicks, hat accents, chord re-hits) repeat every few rounds rather
// than changing with Math.random, which keeps the loop recognisable.
function chance(bar,salt){let h=(bar*374761393+salt*668265263)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967296;}
export function isBreather(bar){return Math.floor(bar/ROUND)%BREATHER_EVERY===BREATHER_EVERY-1;}
// The chord a bar plays, for checks.
export function chordFor(bar,night){const slot=((bar%ROUND)+ROUND)%ROUND,mood=SECTIONS[night?'night':'day'];return (slot<8?mood.A:mood.B)[slot%4];}
// Everything one bar plays, in beats from the bar's start: [{kind, beat, note?, gain, length?}].
export function barPlan(bar,night){
 const slot=((bar%ROUND)+ROUND)%ROUND,moodName=night?'night':'day',mood=SECTIONS[moodName],section=slot<8?'A':'B',i=slot%4;
 const chord=(section==='A'?mood.A:mood.B)[i],root=(section==='A'?mood.rootsA:mood.rootsB)[i],rest=isBreather(bar),out=[];
 chord.forEach((note,k)=>out.push({kind:'keys',beat:k*(night?.05:.03),note,gain:k===0?.9:.7,length:BEAT*3.6}));
 if(!night&&chance(bar,1)>.45)chord.slice(1,4).forEach((note,k)=>out.push({kind:'keys',beat:2.5+k*.025,note,gain:.4,length:BEAT*1.4}));
 if(night)[chord[1],chord[3]].forEach(note=>out.push({kind:'pad',beat:0,note,gain:1,length:BAR*1.02}));
 out.push({kind:'bass',beat:0,note:root,gain:1,length:BEAT*(rest?3.6:1.8)});
 if(!rest)out.push({kind:'bass',beat:2.5,note:root+(chance(bar,2)>.5?7:12),gain:night?.55:.7,length:BEAT*1.2});
 const fill=slot===ROUND-1;
 if(!rest){
  if(night){
   out.push({kind:'kick',beat:0,gain:.85});if(!fill&&chance(bar,3)>.5)out.push({kind:'kick',beat:2.5,gain:.5});
   out.push({kind:'rim',beat:2.04,gain:.7});
   for(let e=0;e<8;e++)if(e%2===1||chance(bar,20+e)>.6)out.push({kind:'hat',beat:e/2+(e%2?.09:0),gain:.45});
  }else{
   out.push({kind:'kick',beat:0,gain:1});if(!fill)out.push({kind:'kick',beat:2,gain:1});
   if(chance(bar,3)>.55)out.push({kind:'kick',beat:1.5,gain:.55});
   [1,3].forEach(beat=>out.push({kind:'rim',beat:beat+.04,gain:1}));
   if(fill)out.push({kind:'rim',beat:3.54,gain:.5});
   for(let e=0;e<8;e++){const off=e%2===1;out.push({kind:'hat',beat:e/2+(off?.09:0),gain:off?.55:(e%4===0?1:.8)*(chance(bar,10+e)>.85?.4:1)});}
  }
 }
 if(slot%8>=4)PHRASES[moodName][section][slot%4].forEach(([beat,note])=>out.push({kind:'lead',beat,note,gain:night?.8:1,length:BEAT*(night?1.6:1.1)}));
 return out;
}
// options: output() returns the node to play into (the effects' compressor), night() says whether the map is dark.
export function makeMusic(getContext,options){
 const o=options||{};
 let ctx=null,bus=null,keysBus=null,keysTone=null,drumBus=null,drumGain=null,room=null,lfo=null,beds=[],timer=0,nextBar=0,nextTime=0,on=false,live=false,noise=null,carClock=0,night=false;
 const nightNow=()=>{try{return !!(o.night&&o.night());}catch(e){return false;}};
 function impulse(seconds){
  const rate=ctx.sampleRate,n=Math.floor(rate*seconds),b=ctx.createBuffer(2,n,rate);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);let lp=0;for(let i=0;i<n;i++){lp+=(Math.random()*2-1-lp)*.25;d[i]=lp*Math.pow(1-i/n,2.6);}}
  return b;
 }
 function build(){
  ctx=getContext();if(!ctx)return false;if(bus)return true;
  bus=ctx.createGain();bus.gain.value=0;bus.connect((o.output&&o.output())||ctx.destination);
  // Keys: a warm low-pass and a slow tremolo, like an old electric piano through a small amp, with a little room.
  keysTone=ctx.createBiquadFilter();keysTone.type='lowpass';keysTone.frequency.value=1500;keysTone.Q.value=.4;
  keysBus=ctx.createGain();keysBus.gain.value=1;const trem=ctx.createOscillator(),tremDepth=ctx.createGain();trem.frequency.value=4.2;tremDepth.gain.value=.12;trem.connect(tremDepth);tremDepth.connect(keysBus.gain);trem.start();
  keysBus.connect(keysTone);keysTone.connect(bus);
  if(ctx.createConvolver){try{const verb=ctx.createConvolver();verb.buffer=impulse(2.2);room=ctx.createGain();room.gain.value=.28;keysTone.connect(room);room.connect(verb);verb.connect(bus);}catch(e){room=null;}}
  const drumTone=ctx.createBiquadFilter();drumTone.type='lowpass';drumTone.frequency.value=4200;drumBus=ctx.createGain();drumGain=drumBus;drumBus.connect(drumTone);drumTone.connect(bus);
  // Tape wow: one slow wobble shared by every pitched note (±7 cents).
  lfo=ctx.createGain();lfo.gain.value=7;const wow=ctx.createOscillator();wow.frequency.value=.35;wow.connect(lfo);wow.start();
  return true;
 }
 // The mood's colour: darker keys and a quieter kit after dark, eased over a few seconds.
 function setMood(isNight,at){
  night=isNight;const t=at||ctx.currentTime;
  keysTone.frequency.cancelScheduledValues(t);keysTone.frequency.setValueAtTime(keysTone.frequency.value,t);keysTone.frequency.linearRampToValueAtTime(isNight?950:1500,t+4);
  drumGain.gain.cancelScheduledValues(t);drumGain.gain.setValueAtTime(drumGain.gain.value,t);drumGain.gain.linearRampToValueAtTime(isNight?.7:1,t+4);
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
  const humTone=ctx.createBiquadFilter();humTone.type='lowpass';humTone.frequency.value=420;const humGain=ctx.createGain();humGain.gain.value=.045;
  const swell=ctx.createOscillator(),swellDepth=ctx.createGain();swell.frequency.value=.06;swellDepth.gain.value=.018;swell.connect(swellDepth);swellDepth.connect(humGain.gain);
  hum.connect(humTone);humTone.connect(humGain);humGain.connect(bus);hum.start();swell.start();
  // Vinyl crackle: sparse soft clicks over a faint hiss.
  const crackle=ctx.createBufferSource();crackle.buffer=seamless(4,(d,rate)=>{for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*.018;for(let c=0;c<d.length/rate*7;c++){const at=Math.floor(Math.random()*(d.length-40)),g=(Math.random()*.5+.2)*(Math.random()<.15?1.8:1);for(let k=0;k<30;k++)d[at+k]+=(Math.random()*2-1)*g*Math.exp(-k/5);}});crackle.loop=true;
  const crackleTone=ctx.createBiquadFilter();crackleTone.type='highpass';crackleTone.frequency.value=1800;const crackleGain=ctx.createGain();crackleGain.gain.value=.04;
  crackle.connect(crackleTone);crackleTone.connect(crackleGain);crackleGain.connect(bus);crackle.start();
  beds=[hum,swell,crackle];
 }
 function stopBeds(){beds.forEach(s=>{try{s.stop();}catch(e){}});beds=[];}
 function voice(type,freq,gain,at,length,dest,detune,attack){
  const osc=ctx.createOscillator(),g=ctx.createGain(),rise=attack||.012;osc.type=type;osc.frequency.value=freq;if(detune)osc.detune.value=detune;lfo.connect(osc.detune);
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(gain,at+rise);
  if(attack)g.gain.setValueAtTime(gain,at+length*.6);else g.gain.exponentialRampToValueAtTime(gain*.35,at+Math.min(.9,length*.4));
  g.gain.exponentialRampToValueAtTime(.0001,at+length);
  osc.connect(g);g.connect(dest);osc.start(at);osc.stop(at+length+.05);
 }
 function hit(gain,at,length,type,from,to,q,dest){
  const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noiseBuffer();f.type=type;f.Q.value=q||.7;f.frequency.setValueAtTime(from,at);if(to)f.frequency.exponentialRampToValueAtTime(to,at+length);
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(gain,at+.004);g.gain.exponentialRampToValueAtTime(.0001,at+length);
  s.connect(f);f.connect(g);g.connect(dest);s.start(at,Math.random()*.5);s.stop(at+length+.02);
 }
 function playEvent(e,at){
  const t=at+e.beat*BEAT;
  if(e.kind==='keys'){const f=midiHz(e.note);voice('sine',f,.03*e.gain,t,e.length,keysBus);voice('triangle',f*2,.006*e.gain,t,e.length*.35,keysBus,4);}
  // The bass is a round sine plus a quiet octave, so a phone speaker (which drops everything under ~150 Hz) still hears it.
  else if(e.kind==='bass'){const f=midiHz(e.note);voice('sine',f,.1*e.gain,t,e.length,bus);voice('sine',f*2,.022*e.gain,t,e.length*.8,bus);}
  else if(e.kind==='pad'){const f=midiHz(e.note+12);voice('sine',f,.011*e.gain,t,e.length,keysBus,-6,1.2);voice('sine',f,.011*e.gain,t,e.length,keysBus,6,1.2);}
  else if(e.kind==='lead'){const f=midiHz(e.note);voice('sine',f,.021*e.gain,t,e.length,keysBus);voice('sine',f*3,.0028*e.gain,t,e.length*.3,keysBus);}
  else if(e.kind==='kick'){const osc=ctx.createOscillator(),g=ctx.createGain();osc.type='sine';osc.frequency.setValueAtTime(105,t);osc.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.15*e.gain,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+.32);osc.connect(g);g.connect(drumBus);osc.start(t);osc.stop(t+.36);}
  else if(e.kind==='rim')hit(.04*e.gain,t,.11,'bandpass',1900,1200,.9,drumBus);
  else if(e.kind==='hat')hit(.014*e.gain,t,.045,'highpass',7200,0,.5,drumBus);
 }
 // A car two blocks away: a slow band-passed swell, every 14–30 s by day and 30–60 s at night.
 function maybeCar(at){carClock-=BAR;if(carClock>0)return;carClock=night?30+Math.random()*30:14+Math.random()*16;
  const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain(),len=3.2;s.buffer=noiseBuffer();s.loop=true;f.type='bandpass';f.Q.value=1.4;
  f.frequency.setValueAtTime(260,at);f.frequency.exponentialRampToValueAtTime(620,at+len*.5);f.frequency.exponentialRampToValueAtTime(240,at+len);
  g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(.03,at+len*.5);g.gain.exponentialRampToValueAtTime(.0001,at+len);s.connect(f);f.connect(g);g.connect(bus);s.start(at);s.stop(at+len+.05);
 }
 function scheduleBar(at){
  if(nextBar%ROUND===0){const n=nightNow();if(n!==night)setMood(n,at);}
  barPlan(nextBar,night).forEach(e=>playEvent(e,at));maybeCar(at);nextBar++;
 }
 // Looks a second ahead every quarter second and schedules each bar that starts in that window.
 function pump(){
  if(!live)return;
  while(nextTime<ctx.currentTime+1.2){scheduleBar(nextTime);nextTime+=BAR;}
 }
 function begin(){
  if(live||!on||document.hidden||!build())return;
  if(ctx.state!=='running')ctx.resume().catch(()=>{});
  live=true;nextTime=ctx.currentTime+.15;carClock=8;nextBar=nextBar-(nextBar%ROUND);setMood(nightNow());startBeds();
  bus.gain.cancelScheduledValues(ctx.currentTime);bus.gain.setValueAtTime(Math.max(.0001,bus.gain.value),ctx.currentTime);bus.gain.linearRampToValueAtTime(MUSIC_LEVEL,ctx.currentTime+3);
  pump();timer=setInterval(pump,250);
 }
 function end(fade){
  if(!live)return;live=false;clearInterval(timer);timer=0;
  const t=ctx.currentTime;bus.gain.cancelScheduledValues(t);bus.gain.setValueAtTime(bus.gain.value,t);bus.gain.linearRampToValueAtTime(0,t+(fade||.01));
  const stop=()=>{if(!live)stopBeds();};if(fade)setTimeout(stop,fade*1000+60);else stop();
 }
 if(typeof document!=='undefined')document.addEventListener('visibilitychange',()=>{
  if(document.hidden){end();if(ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});}
  else if(ctx){ctx.resume().catch(()=>{});begin();}
 });
 return {
  // Whether music should play; it begins at the next unlock() (a tap) or straight away once audio is running.
  set(enabled){on=!!enabled;if(!on)end(.6);else if(ctx&&ctx.state==='running')begin();},
  // Call from a user gesture: creates the context on iOS and starts the loop (or wakes it after an interruption).
  unlock(){if(!on)return;try{if(live&&ctx&&ctx.state!=='running')ctx.resume().catch(()=>{});begin();}catch(e){}},
  // Dips the music for a big moment's sound, then brings it back.
  duck(seconds){if(!live)return;const t=ctx.currentTime,hold=seconds||1.6;bus.gain.cancelScheduledValues(t);bus.gain.setValueAtTime(bus.gain.value,t);bus.gain.linearRampToValueAtTime(MUSIC_LEVEL*.3,t+.08);bus.gain.setValueAtTime(MUSIC_LEVEL*.3,t+hold);bus.gain.linearRampToValueAtTime(MUSIC_LEVEL,t+hold+1.4);},
  playing(){return live;},
  night(){return night;},
  // Offline render for checks (scripts/audio-preview.mjs): schedules `seconds` of the loop at once, from `startBar`.
  preview(seconds,startBar,isNight){if(!build())return;startBeds();bus.gain.value=MUSIC_LEVEL;carClock=8;nextBar=startBar||0;night=!!isNight;keysTone.frequency.value=night?950:1500;drumGain.gain.value=night?.7:1;nextTime=.05;while(nextTime<seconds){barPlan(nextBar,night).forEach(e=>playEvent(e,nextTime));maybeCar(nextTime);nextBar++;nextTime+=BAR;}}
 };
}
