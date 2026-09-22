// First-run walkthrough: a hero card, then the shop is raised one site at a time — each step spotlights a construction
// site on the map, explains the station, and a tap on the site (or the card's Build button) builds it — then the lounge
// lot behind the shelving is pointed out for later (a `select` step spotlights and selects without building) — and
// finally the sign flips. Seen once, replayable from Settings; on a replay every site is already standing so the steps
// just read.
import {manageDialog} from './dialog-focus.js';
const SEEN_KEY='shift-guide-seen';
const STEPS=[
 {hero:true,eyebrow:'Canopy · Day one',title:'Your shop opens today.',text:'Grow it, stock it, sell it. The lot is yours: raise the seven stations, then flip the sign and let the neighborhood in.',cta:'Start building',beats:[['flowers','Grow'],['boosts','Sell'],['empire','Expand']]},
 {build:'door',eyebrow:'Site 1 of 7 · Security',title:'Start at the door',text:'Every dispensary begins with an ID check. A quicker doorman means a shorter line.',target:'[data-marker=security]'},
 {build:0,eyebrow:'Site 2 of 7 · Seeds',title:'Seed station',text:'Where every harvest starts. Equipment grows each batch; employees speed the cycle.',target:'[data-marker="0"]'},
 {build:1,eyebrow:'Site 3 of 7 · Grow',title:'Grow room',text:'Seedlings take their time under the lamps — usually your first bottleneck.',target:'[data-marker="1"]'},
 {build:2,eyebrow:'Site 4 of 7 · Harvest',title:'Harvest table',text:'Ripe plants are trimmed and cured here. Boutique strains take longer but pay more.',target:'[data-marker="2"]'},
 {build:3,eyebrow:'Site 5 of 7 · Pack',title:'Packing bar',text:'Flower is weighed and jarred for the counter — and, later, for rooftop deliveries.',target:'[data-marker="3"]'},
 {build:4,eyebrow:'Site 6 of 7 · Orders',title:'Order desk',text:'Customers order here first. Desk levels grow each basket and add places in line.',target:'[data-marker="4"]'},
 {build:5,eyebrow:'Site 7 of 7 · Pickup',title:'Pickup counter',text:'Bags change hands and cash lands in the till. Every sale is finished here.',target:'[data-marker="5"]'},
 {select:'lounge',eyebrow:'Later · The back room',title:'Smoking lounge',text:'A speakeasy waits behind the shelving for your first quarter-million. Guests who go in skip the line: a cover at the curtain, one jar at a premium.',target:'[data-marker=lounge]'},
 {open:true,eyebrow:'Canopy · Grand opening',title:'Ready to open.',text:'Every station is standing and your crew is at their posts. Flip the sign: customers walk in and cash arrives as bags go out. Feed the slowest station first; the rest can wait.',cta:'Open the shop'}
];
const BUILT_PAUSE=900;
export function mountStartGuide({showTray,collapse,fit,paintHero,sound,report,isBuilt,build,shopOpen,openShop,finish,sheet,reserve,select}){
 // `sheet` drops the tray and `reserve` keeps the map framed above the docked card, so every site stays on screen.
 const root=document.createElement('div');root.className='start-guide';root.hidden=true;
 root.innerHTML='<div class="guide-dim"></div><div class="guide-ring" hidden></div>'+
  '<section class="guide-card" role="dialog" aria-modal="true" aria-labelledby="guideTitle">'+
  '<div class="guide-hero" hidden><canvas class="guide-hero-art" width="760" height="380" aria-hidden="true"></canvas></div>'+
  '<div class="guide-dots" aria-hidden="true"></div><p class="guide-eyebrow" hidden></p><h2 id="guideTitle"></h2><p id="guideText"></p><ul class="guide-beats" hidden></ul>'+
  '<div class="guide-sign" hidden aria-hidden="true"><i class="guide-sign-string"></i><i class="guide-sign-string"></i><div class="guide-plaque"><span class="guide-face is-closed">Closed</span><span class="guide-face is-open">Open</span></div></div>'+
  '<div class="guide-actions"><p class="guide-tap" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11V4.5a1.5 1.5 0 0 1 3 0V11m0-3.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.9-2.5L3.5 15a1.6 1.6 0 0 1 2.4-2l3.1 3"/></svg><span>Tap to build</span></p><button type="button" class="guide-skip">Skip</button><button type="button" class="guide-next">Next</button></div></section>';
 document.body.append(root);
 const $=s=>root.querySelector(s),ring=$('.guide-ring'),dots=$('.guide-dots');
 dots.innerHTML=STEPS.map(()=>'<i></i>').join('');
 let step=-1,raf=0,lastTarget=null,finished=false,advanceTimer=0;
 const built=s=>s.build===undefined||!isBuilt||isBuilt(s.build);
 // Steps that dock the card beside a spotlit lot: the seven sites and the lounge.
 const site=s=>s.build!==undefined||s.select!==undefined;
 function place(){
  const target=lastTarget&&document.querySelector(lastTarget);
  if(!target){ring.hidden=true;return;}
  const r=target.getBoundingClientRect(),pad=6;
  if(r.width===0||r.height===0){ring.hidden=true;return;}
  ring.hidden=false;ring.style.left=(r.left-pad)+'px';ring.style.top=(r.top-pad)+'px';ring.style.width=(r.width+pad*2)+'px';ring.style.height=(r.height+pad*2)+'px';
 }
 function track(){place();raf=requestAnimationFrame(track);}
 function show(i){
  clearTimeout(advanceTimer);advanceTimer=0;
  step=i;const s=STEPS[i];if(report)report('guide_step',{step:i+1});
  if(s.tray&&showTray)showTray(s.tray);
  if(sheet&&(site(s)||s.open))sheet();
  if(select&&site(s))select(s.build!==undefined?s.build:s.select);
  $('#guideTitle').textContent=s.title;$('#guideText').textContent=s.text;
  root.classList.toggle('is-hero',!!s.hero);$('.guide-hero').hidden=!s.hero;$('.guide-eyebrow').hidden=!s.eyebrow;$('.guide-eyebrow').textContent=s.eyebrow||'';
  const beats=$('.guide-beats');beats.hidden=!s.beats;
  if(s.beats&&!beats.childElementCount){s.beats.forEach(([tray,label])=>{const li=document.createElement('li'),icon=document.querySelector('[data-tray='+tray+'] svg');if(icon)li.append(icon.cloneNode(true));li.append(Object.assign(document.createElement('span'),{textContent:label}));beats.append(li);});}
  if(s.hero&&paintHero)paintHero($('.guide-hero-art'));
  const pending=!built(s),opening=!!s.open&&!!shopOpen&&!shopOpen();
  root.classList.toggle('is-site',site(s));root.classList.toggle('is-build',pending);root.classList.remove('is-built');root.classList.toggle('is-open',!!s.open);
  $('.guide-tap').hidden=!pending;
  const next=$('.guide-next');next.disabled=false;
  // The last card has one job; a Skip beside "Open the shop" would do the same thing.
  $('.guide-skip').hidden=!!s.open;
  next.textContent=pending?'Build':s.open?(opening?s.cta:'Let’s grow'):s.cta||(i===STEPS.length-1?'Done':'Next');
  Array.from(dots.children).forEach((d,j)=>d.classList.toggle('is-on',j<=i));
  lastTarget=s.target||null;root.dataset.step=String(i);root.classList.toggle('is-spotlight',!!s.target||!!s.open);
  if(fit)fit();if(reserve)reserve(site(s)||s.open?$('.guide-card').offsetHeight+12:0);requestAnimationFrame(place);next.focus({preventScroll:true});
 }
 // Resume lands on the first site still to be raised, or on the opening if every site is standing.
 function pendingStep(){
  const site=STEPS.findIndex(s=>s.build!==undefined&&!built(s));
  if(site>=0)return site;
  return shopOpen&&!shopOpen()?STEPS.findIndex(s=>s.open):0;
 }
 function open(options){finished=false;root.hidden=false;document.body.classList.add('guide-open');cancelAnimationFrame(raf);track();show(options&&options.resume?pendingStep():0);}
 function close(){
  if(report&&!root.hidden)report(finished?'guide_complete':'guide_skip',{step:step+1});
  clearTimeout(advanceTimer);advanceTimer=0;openTimers.forEach(clearTimeout);openTimers=[];opening=false;root.hidden=true;document.body.classList.remove('guide-open');cancelAnimationFrame(raf);
  root.classList.remove('is-opening','is-leaving');$('.guide-sign').hidden=true;$('.guide-actions').hidden=false;
  try{localStorage.setItem(SEEN_KEY,'1');}catch(e){}
  if(reserve)reserve(0);if(finish)finish();if(collapse)collapse();
 }
 function advance(){if(step<STEPS.length-1)show(step+1);else{finished=true;close();}}
 // Opening: the shop opens at once (customers start walking in behind the card), the card's copy turns to the
 // celebration, a hanging plaque drops in and flips from Closed to Open, the world flashes warm and rains confetti,
 // then the card lifts away. Under reduced motion the card simply closes.
 let opening=false,openTimers=[];
 function celebrate(){
  if(opening)return;const wasOpen=shopOpen&&shopOpen();
  if(openShop)openShop();finished=true;if(sound)sound('open');
  const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||wasOpen){close();return;}
  opening=true;root.classList.add('is-opening');
  $('#guideTitle').textContent='Open for business!';$('#guideText').textContent='The sign is up and the first customers are on their way. Welcome to Canopy.';
  $('.guide-actions').hidden=true;$('.guide-sign').hidden=false;
  openTimers=[setTimeout(()=>{if(sound)sound('sparkle');},650),setTimeout(()=>{root.classList.add('is-leaving');},1500),setTimeout(()=>{opening=false;close();},1900)];
 }
 // A build step's primary action: raise the site if it is still a site, then move on after the reveal.
 function act(){
  const s=STEPS[step];if(!s)return;
  if(s.build!==undefined&&!built(s)){
   if(!build||!build(s.build))return;
   root.classList.remove('is-build');root.classList.add('is-built');$('.guide-tap').hidden=true;
   const next=$('.guide-next');next.textContent='Built';next.disabled=true;
   advanceTimer=setTimeout(advance,BUILT_PAUSE);return;
  }
  if(s.open){celebrate();return;}
  if(sound)sound('tap');advance();
 }
 $('.guide-next').onclick=act;
 $('.guide-skip').onclick=()=>{if(!opening)close();};
 // The world is inert while the guide is open, so a tap on the spotlighted site lands on the dim layer; treat it as the tap.
 $('.guide-dim').addEventListener('click',e=>{
  const s=STEPS[step];if(!s||s.build===undefined||built(s)||ring.hidden)return;
  const r=ring.getBoundingClientRect(),m=16;
  if(e.clientX>=r.left-m&&e.clientX<=r.right+m&&e.clientY>=r.top-m&&e.clientY<=r.bottom+m)act();
 });
 root.addEventListener('keydown',e=>{if(e.key==='Escape'&&!opening)close();});
 manageDialog(root,close);
 return {open,close,seen(){try{return !!localStorage.getItem(SEEN_KEY);}catch(e){return true;}}};
}
