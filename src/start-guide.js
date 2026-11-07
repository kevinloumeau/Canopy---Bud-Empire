// First-run walkthrough on the 3D map (Kevin, 2026-11-04: "the camera zoom and pinned to each station with description
// and click to build, one by one, then focusing on a single guest walking in going through each step").
//
// 1. A hero card.
// 2. Seven sites, in line order: the camera glides in and holds on the site, a ring pulses round its sign and one brass
//    Build button (or a tap on the site) raises it.
// 3. The grow room goes to Lv 10, its first new look. The guide grants exactly what that costs when it opens, so the
//    player spends it here; anything left unspent when the guide closes is taken back (Kevin: "have enough money to do
//    that at the start and replenish the money after the tutorial").
// 4. The sign flips, and the camera follows the first guest through the door: ID check, order desk, pickup and out with
//    the bag, with one caption per step.
// 5. Coming up: the camera pans over the ghost buys, the rooftop lounge and the next city building.
// 6. The camera eases back to the whole shop and play begins.
// Seen once (SEEN_KEY), replayable from Settings; on a replay every site is already standing so those steps just read.
import {manageDialog} from './dialog-focus.js';
const SEEN_KEY='shift-guide-seen';
const GROW_GOAL=10;
const STEPS=[
 {hero:true,eyebrow:'Canopy · Day one',title:'Your shop opens today.',text:'Raise seven stations, flip the sign and let the neighborhood in.',cta:'Start building',beats:[['factory','Build'],['flowers','Sell'],['empire','Expand']]},
 {build:'door',eyebrow:'Build · 1 of 7',title:'Security',text:'Every guest shows ID here first.',target:'[data-marker=security]'},
 {build:0,eyebrow:'Build · 2 of 7',title:'Seed station',text:'Every harvest starts with a seed.',target:'[data-marker="0"]'},
 {build:1,eyebrow:'Build · 3 of 7',title:'Grow room',text:'Seedlings fill out under the lamps.',target:'[data-marker="1"]'},
 {build:2,eyebrow:'Build · 4 of 7',title:'Harvest table',text:'Ripe plants are trimmed and cured.',target:'[data-marker="2"]'},
 {build:3,eyebrow:'Build · 5 of 7',title:'Packing bar',text:'Flower is weighed and sealed in jars.',target:'[data-marker="3"]'},
 {build:4,eyebrow:'Build · 6 of 7',title:'Order desk',text:'Guests pick a strain and pay here.',target:'[data-marker="4"]'},
 {build:5,eyebrow:'Build · 7 of 7',title:'Pickup counter',text:'Bags go out, cash comes in.',target:'[data-marker="5"]'},
 {upgrade:1,eyebrow:'Upgrade · On the house',title:'Grow room to Lv 10',text:'A new look and double the harvest.',target:'[data-marker="1"]'},
 {open:true,eyebrow:'Grand opening',title:'Ready to open.',text:'Flip the sign and follow your first guest inside.',cta:'Open the shop'},
 {follow:true}
];
// The guest's walk, one caption per step. `stage` comes from main.js (guideGuest): door, order, pickup, out.
const WALK=[
 {stage:'door',title:'ID at the door',text:'Security checks every guest first.'},
 {stage:'order',title:'Order at the desk',text:'They pick a strain and pay.'},
 {stage:'pickup',title:'Bag at pickup',text:'A packed jar goes in the bag.'},
 {stage:'out',title:'Sold!',text:'Every bag out the door pays the till.'}
];
const BUILT_PAUSE=900,UPGRADED_PAUSE=1500,OUT_PAUSE=2600;
export function mountStartGuide({showTray,collapse,fit,sound,report,isBuilt,build,shopOpen,openShop,finish,sheet,reserve,select,camera,grow,guest}){
 // `sheet` folds the tray away on every step and `reserve` keeps the map framed above the docked card. `camera` points
 // the 3D view (look at a site, follow the guest, hand back); `grow` reads and buys the grow room's upgrade with the
 // guide's grant; `guest` reports where the followed guest is in their visit.
 const root=document.createElement('div');root.className='start-guide';root.hidden=true;
 root.innerHTML='<div class="guide-dim"></div><div class="guide-ring" hidden></div>'+
  '<section class="guide-card" role="dialog" aria-modal="true" aria-labelledby="guideTitle">'+
  '<div class="guide-hero" hidden><img class="guide-hero-art" src="guide/hero.webp" width="380" height="190" alt="" decoding="async"></div>'+
  '<div class="guide-dots" aria-hidden="true"></div><p class="guide-eyebrow" hidden></p><h2 id="guideTitle"></h2><p id="guideText" aria-live="polite"></p><ul class="guide-beats" hidden></ul>'+
  '<ol class="guide-walk" hidden aria-hidden="true">'+WALK.map(()=>'<li></li>').join('')+'</ol>'+
  '<div class="guide-sign" hidden aria-hidden="true"><i class="guide-sign-string"></i><i class="guide-sign-string"></i><div class="guide-plaque"><span class="guide-face is-closed">Closed</span><span class="guide-face is-open">Open</span></div></div>'+
  '<div class="guide-actions"><p class="guide-tap" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11V4.5a1.5 1.5 0 0 1 3 0V11m0-3.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a6 6 0 0 1-4.9-2.5L3.5 15a1.6 1.6 0 0 1 2.4-2l3.1 3"/></svg><span>Tap to build</span></p><button type="button" class="guide-skip">Skip</button><button type="button" class="guide-next">Next</button></div></section>';
 document.body.append(root);
 const $=s=>root.querySelector(s),ring=$('.guide-ring'),dots=$('.guide-dots'),walkDots=$('.guide-walk');
 const steps=STEPS.filter(s=>!s.follow);
 dots.innerHTML=steps.map(()=>'<i></i>').join('');
 let step=-1,raf=0,lastTarget=null,finished=false,advanceTimer=0,walk=-1,walkTimer=0,walkWatch=0;
 const built=s=>s.build===undefined||!isBuilt||isBuilt(s.build);
 const upgraded=()=>!grow||grow.level()>=GROW_GOAL;
 // Steps that dock the card under the map and pin the camera: the sites, the upgrade, the opening and the walk.
 const docked=s=>s.build!==undefined||s.upgrade!==undefined||!!s.open||!!s.follow;
 function place(){
  const target=lastTarget&&document.querySelector(lastTarget);
  if(!target){ring.hidden=true;return;}
  const r=target.getBoundingClientRect(),pad=6;
  if(r.width===0||r.height===0){ring.hidden=true;return;}
  ring.hidden=false;ring.style.left=(r.left-pad)+'px';ring.style.top=(r.top-pad)+'px';ring.style.width=(r.width+pad*2)+'px';ring.style.height=(r.height+pad*2)+'px';
 }
 function track(){place();raf=requestAnimationFrame(track);}
 function setCopy(title,text){$('#guideTitle').textContent=title;$('#guideText').textContent=text;}
 function show(i){
  clearTimeout(advanceTimer);advanceTimer=0;
  step=i;const s=STEPS[i];if(report)report('guide_step',{step:i+1});
  if(s.follow){startWalk();return;}
  if(sheet)sheet();
  if(select&&s.build!==undefined)select(s.build);
  if(select&&s.upgrade!==undefined)select(s.upgrade);
  if(camera){if(s.build!==undefined)camera.look(s.build);else if(s.upgrade!==undefined)camera.look(s.upgrade);else if(s.open)camera.look('door');}
  setCopy(s.title,s.text);
  root.classList.toggle('is-hero',!!s.hero);$('.guide-hero').hidden=!s.hero;$('.guide-eyebrow').hidden=!s.eyebrow;$('.guide-eyebrow').textContent=s.eyebrow||'';
  const beats=$('.guide-beats');beats.hidden=!s.beats;walkDots.hidden=true;
  if(s.beats&&!beats.childElementCount){s.beats.forEach(([tray,label])=>{const li=document.createElement('li'),icon=document.querySelector('[data-tray='+tray+'] svg');if(icon)li.append(icon.cloneNode(true));li.append(Object.assign(document.createElement('span'),{textContent:label}));beats.append(li);});}
  const pending=!built(s),upgrading=s.upgrade!==undefined&&!upgraded(),opening=!!s.open&&!!shopOpen&&!shopOpen();
  root.classList.toggle('is-site',docked(s));root.classList.toggle('is-build',pending||upgrading);root.classList.remove('is-built','is-walk');root.classList.toggle('is-open',!!s.open);
  $('.guide-tap').hidden=!pending;
  const next=$('.guide-next');next.disabled=false;
  // The opening card has one job; a Skip beside "Open the shop" would do the same thing.
  $('.guide-skip').hidden=!!s.open;
  next.textContent=pending?'Build':upgrading?'Upgrade · '+(grow.price?grow.price():'Lv '+GROW_GOAL):s.open?(opening?s.cta:'Follow a guest'):s.cta||'Next';
  Array.from(dots.children).forEach((d,j)=>d.classList.toggle('is-on',j<=i));
  lastTarget=s.target||null;root.dataset.step=String(i);root.classList.toggle('is-spotlight',!!s.target||!!s.open);
  if(fit)fit();if(reserve)reserve(docked(s)?$('.guide-card').offsetHeight+12:0);requestAnimationFrame(place);next.focus({preventScroll:true});
 }
 // The walk: the camera follows one guest and the caption changes as they reach each station. The card waits on the
 // guest, so its only button is Skip until they leave with the bag; then one brass button hands the shop over.
 function startWalk(){
  if(sheet)sheet();lastTarget=null;ring.hidden=true;walk=-1;
  root.classList.remove('is-hero','is-build','is-built','is-open');root.classList.add('is-site','is-walk','is-spotlight');
  $('.guide-hero').hidden=true;$('.guide-beats').hidden=true;$('.guide-tap').hidden=true;$('.guide-sign').hidden=true;$('.guide-actions').hidden=false;
  $('.guide-eyebrow').hidden=false;$('.guide-eyebrow').textContent='Your first guest';
  setCopy('Here they come','Watch one visit, start to finish.');
  walkDots.hidden=false;Array.from(walkDots.children).forEach(d=>d.className='');
  $('.guide-skip').hidden=false;const next=$('.guide-next');next.hidden=true;
  if(camera)camera.follow();
  if(fit)fit();if(reserve)reserve($('.guide-card').offsetHeight+12);
  clearInterval(walkWatch);walkWatch=setInterval(watchGuest,200);watchGuest();
 }
 function watchGuest(){
  const stage=guest?guest():'gone';
  const at=WALK.findIndex(w=>w.stage===stage);
  // A guest who vanished without a bag (or a game with no guest at all) still ends the walk.
  if(stage==='gone'&&walk<WALK.length-1){showWalk(WALK.length-1);return;}
  if(at>walk)showWalk(at);
 }
 function showWalk(i){
  walk=i;const w=WALK[i];if(report)report('guide_walk',{stage:w.stage});
  setCopy(w.title,w.text);
  Array.from(walkDots.children).forEach((d,j)=>{d.classList.toggle('is-on',j<i);d.classList.toggle('is-now',j===i);});
  if(sound&&i>0)sound('tap');
  if(i===WALK.length-1){clearInterval(walkWatch);walkWatch=0;clearTimeout(walkTimer);walkTimer=setTimeout(startTour,OUT_PAUSE);}
 }
 // Coming up: the camera visits what the shop can buy next (the ghost items, the lounge, the next city building), one
 // caption and one Next each, then hands over.
 let tour=[],tourAt=-1;
 function startTour(){tour=camera&&camera.tour?camera.tour():[];tourAt=-1;nextStop();}
 function nextStop(){
  tourAt++;document.body.classList.remove('guide-ghosts');
  if(tourAt>=tour.length){root.classList.remove('is-tour');lastTarget=null;ring.hidden=true;handOver();return;}
  const t=tour[tourAt];root.classList.add('is-tour');walkDots.hidden=true;
  $('.guide-eyebrow').textContent=t.eyebrow;setCopy(t.title,t.text);
  if(t.glow)document.body.classList.add('guide-ghosts');
  lastTarget=t.target||null;ring.hidden=true;
  const next=$('.guide-next');next.hidden=false;next.disabled=false;next.textContent='Next';$('.guide-skip').hidden=false;
  camera.stop(t);if(sound&&tourAt>0)sound('tap');if(reserve)reserve($('.guide-card').offsetHeight+12);next.focus({preventScroll:true});
 }
 function handOver(){
  walkDots.hidden=false;$('.guide-eyebrow').textContent='Your turn';setCopy('The shop is yours.','Upgrade the slowest station first.');
  Array.from(walkDots.children).forEach(d=>{d.classList.add('is-on');d.classList.remove('is-now');});
  const next=$('.guide-next');next.hidden=false;next.textContent='Let’s grow';$('.guide-skip').hidden=true;root.classList.add('is-done');
  if(camera)camera.home();if(reserve)reserve($('.guide-card').offsetHeight+12);next.focus({preventScroll:true});
 }
 // Resume lands on the first site still to be raised, then the upgrade, then the opening.
 function pendingStep(){
  const site=STEPS.findIndex(s=>s.build!==undefined&&!built(s));
  if(site>=0)return site;
  if(!upgraded()&&!(shopOpen&&shopOpen()))return STEPS.findIndex(s=>s.upgrade!==undefined);
  return shopOpen&&!shopOpen()?STEPS.findIndex(s=>s.open):0;
 }
 function open(options){
  finished=false;root.hidden=false;document.body.classList.add('guide-open');cancelAnimationFrame(raf);track();
  // The upgrade's cash arrives with the guide, so the top bar already shows it while the sites go up.
  if(grow&&grow.grant&&!(shopOpen&&shopOpen()))grow.grant();
  show(options&&options.resume?pendingStep():0);
 }
 function close(){
  if(report&&!root.hidden)report(finished?'guide_complete':'guide_skip',{step:step+1});
  clearTimeout(advanceTimer);advanceTimer=0;clearTimeout(walkTimer);walkTimer=0;clearInterval(walkWatch);walkWatch=0;openTimers.forEach(clearTimeout);openTimers=[];opening=false;
  root.hidden=true;document.body.classList.remove('guide-open');cancelAnimationFrame(raf);
  root.classList.remove('is-opening','is-leaving','is-walk','is-done','is-tour');document.body.classList.remove('guide-ghosts');tour=[];tourAt=-1;$('.guide-sign').hidden=true;$('.guide-actions').hidden=false;$('.guide-next').hidden=false;
  try{localStorage.setItem(SEEN_KEY,'1');}catch(e){}
  if(reserve)reserve(0);if(finish)finish();if(grow&&grow.settle)grow.settle();if(camera)camera.release();if(collapse)collapse();
 }
 function advance(){if(step<STEPS.length-1)show(step+1);else{finished=true;close();}}
 // Opening: the shop opens at once (the first guest starts walking in behind the card), the copy turns to the
 // celebration, a hanging plaque drops in and flips from Closed to Open, the world flashes warm, then the walk begins.
 // Under reduced motion the plaque is skipped.
 let opening=false,openTimers=[];
 function celebrate(){
  if(opening)return;const wasOpen=shopOpen&&shopOpen();
  if(openShop)openShop();if(sound)sound('open');
  const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||wasOpen){advance();return;}
  opening=true;root.classList.add('is-opening');
  setCopy('Open for business!','The first guest is on their way.');
  $('.guide-actions').hidden=true;$('.guide-sign').hidden=false;
  openTimers=[setTimeout(()=>{if(sound)sound('sparkle');},650),setTimeout(()=>{opening=false;root.classList.remove('is-opening');advance();},1700)];
 }
 // A step's primary action: raise the site, buy the upgrade, open the shop, or move on.
 function act(){
  if(root.classList.contains('is-done')){finished=true;close();return;}
  if(root.classList.contains('is-tour')){nextStop();return;}
  const s=STEPS[step];if(!s||s.follow)return;
  if(s.build!==undefined&&!built(s)){
   if(!build||!build(s.build))return;
   settle('Built',BUILT_PAUSE);return;
  }
  if(s.upgrade!==undefined&&!upgraded()){
   if(!grow.buy())return;
   $('.guide-eyebrow').textContent='Lv '+GROW_GOAL+' · New look';
   settle('Upgraded',UPGRADED_PAUSE);return;
  }
  if(s.open){celebrate();return;}
  if(sound)sound('tap');advance();
 }
 function settle(label,pause){
  root.classList.remove('is-build');root.classList.add('is-built');$('.guide-tap').hidden=true;
  const next=$('.guide-next');next.textContent=label;next.disabled=true;
  advanceTimer=setTimeout(advance,pause);
 }
 $('.guide-next').onclick=act;
 $('.guide-skip').onclick=()=>{if(!opening)close();};
 // The world is inert while the guide is open, so a tap on the spotlit site lands on the dim layer; treat it as the tap.
 $('.guide-dim').addEventListener('click',e=>{
  const s=STEPS[step];if(!s||!root.classList.contains('is-build')||ring.hidden)return;
  const r=ring.getBoundingClientRect(),m=16;
  if(e.clientX>=r.left-m&&e.clientX<=r.right+m&&e.clientY>=r.top-m&&e.clientY<=r.bottom+m)act();
 });
 root.addEventListener('keydown',e=>{if(e.key==='Escape'&&!opening)close();});
 manageDialog(root,close);
 return {open,close,seen(){try{return !!localStorage.getItem(SEEN_KEY);}catch(e){return true;}}};
}
