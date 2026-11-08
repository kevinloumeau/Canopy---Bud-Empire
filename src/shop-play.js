import {TYPES,STRAIN_TYPE} from './strains.js';
import {FORMATS,stockedFormats} from './depth.js';
import {manageDialog} from './dialog-focus.js';
import {tieLast} from './no-lone-words.js';

// Shop activity, as on iOS: a pill on the map that leads with whatever needs the player now. Walk-ins sometimes ask the
// budtender for a pick (a good match tips about 12 seconds of income at pickup), every five minutes of play closes a shift with a recap and one
// piece of advice.
export const SHIFT_SECONDS=300;
export const MOMENT_SECONDS=18;
// A good pick tips TIP_SECONDS of the shop's income (never under $50, like a shop-event tip). It used to tip 20% of one
// sale, under a quarter of a second of income, every minute or so (2026-11-07 review).
export const TIP_SECONDS=12, TIP_MIN=50;
const cap=(n,max=1e300)=>Number.isFinite(n)?Math.max(0,Math.min(max,n)):0;
const freshShift=()=>({seconds:0,served:0,matches:0,earned:0,deliveries:0,transfers:0,queuePeak:0,waitTotal:0,stockoutSeconds:0});
function migrateShift(raw){const shift=freshShift();for(const key of Object.keys(shift))shift[key]=cap(raw?.[key],key==='seconds'?SHIFT_SECONDS:1e300);return shift;}
export function migrateShopPlay(raw){
  return {version:1,cooldown:cap(raw?.cooldown??35,90),sequence:Math.floor(cap(raw?.sequence)),matches:Math.floor(cap(raw?.matches)),tips:cap(raw?.tips),
    shift:migrateShift(raw?.shift),recap:raw?.recap?migrateShift(raw.recap):null,recapUnread:raw?.recapUnread===true};
}
// Every unlocked strain on the menu, in every type that strain stocks, is a pick the budtender can offer.
export function picks(state,menuStrains){
  return menuStrains.filter(i=>state.strains[i]>0).flatMap(strain=>{const type=STRAIN_TYPE[strain]??0;return stockedFormats(state.productMenu,strain).map(format=>({strain,format,type,trait:TYPES[type],formatName:FORMATS[format].name}));});
}
const NAMES=['Avery','Eden','Noa','Remy','Sage','Robin'];
// One customer, one request: a strain type most of the time, and every third request a type of product when the shop
// stocks one beyond flower. A request is only made when the menu has both a right and a wrong answer for it (a menu that is all
// edibles never hears "Something without flower."), so the three choices always hold at least one of each, rotated so
// the right one is not always first. With fewer than two strains on the menu there is nothing to choose between.
export function createMoment(play,customer,options){
  if(new Set(options.map(o=>o.strain)).size<2)return null;
  const sequence=play.sequence++,want=options[sequence%options.length];
  const byFormat={ok:want.format>0&&options.some(o=>o.format!==want.format),matches:o=>o.format===want.format};
  const byType={ok:options.some(o=>o.type!==want.type),matches:o=>o.type===want.type};
  const preferred=sequence%3===2?[byFormat,byType]:[byType,byFormat],ask=preferred.find(r=>r.ok);
  if(!ask)return null;
  const formatRequest=ask===byFormat;
  const request=formatRequest?['','Something rolled and ready.','Something without flower.'][want.format]:['A balanced house pick, please.','A bright daytime pick, please.','An evening-style pick, please.'][want.type];
  const others=options.filter(o=>!ask.matches(o));
  const rotated=[...others.slice(sequence%others.length),...others],wrong=rotated.find(o=>o.strain!==want.strain)||rotated[0];
  const pool=[...rotated,...options.filter(o=>o!==want)];
  // Three different strains where the menu has them, and always one wrong answer.
  const choices=[want,wrong];
  for(const o of pool)if(choices.length<3&&!choices.includes(o)&&!choices.some(c=>c.strain===o.strain))choices.push(o);
  for(const o of pool)if(choices.length<3&&!choices.includes(o))choices.push(o);
  for(let i=0;i<sequence%choices.length;i++)choices.push(choices.shift());
  return {customerId:customer.id,name:NAMES[sequence%NAMES.length],request,choices,remaining:MOMENT_SECONDS,opened:false,formatRequest,target:formatRequest?want.format:want.type,variant:Math.floor(Math.random()*6)};
}
export function judgeChoice(moment,index){
  const option=moment.choices[index];
  return option?{option,matched:moment.formatRequest?option.format===moment.target:option.type===moment.target}:null;
}
export function tipFor(income){return Math.max(TIP_MIN,Math.round(Math.max(0,Number.isFinite(income)?income:0)*TIP_SECONDS));}
export function recordServed(play,customer,earned){
  const shift=play.shift;shift.served++;shift.waitTotal+=cap(customer.waitSeconds);shift.earned+=cap(earned);
  if(customer.momentMatched){shift.matches++;play.matches++}
}
// Returns true when the shift just closed and a recap is waiting.
export function tickShift(play,dt,{queue=0,stockout=false}={}){
  const shift=play.shift;shift.seconds+=dt;shift.queuePeak=Math.max(shift.queuePeak,queue);if(stockout)shift.stockoutSeconds+=dt;
  if(shift.seconds<SHIFT_SECONDS)return false;
  play.recap={...shift,seconds:SHIFT_SECONDS};play.recapUnread=true;play.shift=freshShift();return true;
}
// Advice only names a fix the shop can still buy: once all three order counters are open, a busy shift points at
// faster service instead, and once queue comfort is maxed, long waits point at the Orders team alone.
export const MAX_ORDER_COUNTERS=3;
export const MAX_COMFORT=20;
export function shiftAdvice(recap,{counters=1,comfortLevel=0}={}){
  if(recap.stockoutSeconds>30)return {text:'Keep pickup stocked: check your Pack and Orders stations.',short:'Pickup ran dry · check Pack',station:3};
  if(recap.served&&recap.waitTotal/recap.served>25)return {text:comfortLevel>=MAX_COMFORT?'Customers waited a while. Train the Orders team to serve faster.':'Customers waited a while. Train the Orders team or buy Express lanes.',short:'Long waits · speed up Orders',station:4};
  if(recap.queuePeak>8)return {text:counters>=MAX_ORDER_COUNTERS?'A busy shift. Upgrade the Orders desk and team so every counter serves faster.':'A busy shift. Add an order counter to spread the queue.',short:counters>=MAX_ORDER_COUNTERS?'Long line · upgrade Orders':'Long line · add a counter',station:4};
  return {text:'Try another customer recommendation next shift. Great matches earn extra tips.',moment:true};
}
// Branch alerts pointed at the old Stock and People tabs (shelves, transfers, drivers, regulars). The store pages are
// down to stations and upgrades now (2026-11-03), so there is nothing there to chase; the map's brass shows the buys.
export function operationsAlerts(){return [];}

// The pick card asks in plain words (Kevin, 2026-11-07): a short question in the guest's voice, and on each answer the
// one word that answers it, so the match reads at a glance. Hybrids are balanced, sativas daytime, indicas evening.
export const MOOD=['Balanced','Daytime','Evening'];
// Thirteen ways to ask (Kevin, 2026-11-07: "10-15 questions that vary"), two or three for each thing a guest can want.
// Each moment keeps the one it drew (variant), so the card does not change wording while it is open.
export const QUESTIONS={
  type:[
    ['Got something balanced?','Something not too up, not too down?','What\'s good for a chill hang with friends?'],
    ['Got something for the daytime?','Something to get me going?','Anything for a creative afternoon?'],
    ['Got something for the evening?','Something to help me unwind tonight?','What\'s good for a lazy night in?']],
  format:[[],['Got something rolled and ready?','Anything I can grab and go?'],['Got something without flower?','Anything I don\'t have to smoke?']]
};
export function momentQuestion(moment){
  const list=QUESTIONS[moment.formatRequest?'format':'type'][moment.target]||['What would you pick for me?'];
  return list[(moment.variant||0)%list.length];
}
// What each answer shows: the tag answers the question (a mood, or a product type) and the line under it names the
// strain's type. The product itself shows as a 3D badge on the strain, so a tile never needs a third line.
export function pickLabel(moment,option){
  return {tag:moment.formatRequest?option.formatName:MOOD[option.type],line:option.trait};
}

const icon=path=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>';
const LEAF=icon('<path d="M12 21v-8"/><path d="M12 13c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Z"/><path d="M12 15c0-4 2.3-6.5 7-6.5 0 4.2-2.5 6.5-7 6.5Z"/>');
// The floor's pulse, not three lines: a hamburger reads as the game's main menu.
const PULSE=icon('<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>');
const CLOSE=icon('<path d="M6 6l12 12M18 6 6 18"/>');
const CHEVRON=icon('<path d="m9 6 6 6-6 6"/>');
const SPARK=icon('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5"/>');
const svg=html=>{const t=document.createElement('template');t.innerHTML=html;return t.content.firstChild;};
// Minutes to the next recap, rounded up, so the label only changes once a minute.
// The five-minute recap clock is called the floor, not a shift, so it never reads against the shift goals' "Shift N".
export function shiftTimeLeft(seconds){const left=Math.max(0,SHIFT_SECONDS-seconds);return left<60?'Recap in under a minute':'Recap in '+Math.ceil(left/60)+' min';}
// The panel, on the glass components: this shift as open figures with a thin progress line and last shift's advice as
// the brass next-action card. A customer asking for a pick gets their own card in the middle of the screen instead.
// lane: where the pill and the feedback note live while the panel is closed (the top lane in main.js), so they line up
// with the other status chips and toasts rather than sitting on their own spot.
const ART=(name,cls)=>'<img class="'+cls+'" src="icons/3d/'+name+'.png" alt="" draggable="false" decoding="async">';
export function mountShopPlay({getState,getMoment,getAlerts,names,colors,format,choose,skip,navigate,changed,opening,closing,lane}){
  const root=document.createElement('div');root.className='shop-play';
  root.innerHTML='<button type="button" id="shopActivity" class="shop-activity" aria-expanded="false" aria-controls="shopActivityPanel">'+PULSE+'<span></span></button>'+
    '<section id="shopActivityPanel" class="shop-activity-panel" aria-label="Shop activity" hidden><div class="shop-activity-heading"><h2>Shop activity</h2><button type="button" id="shopActivityClose" aria-label="Close shop activity">'+CLOSE+'</button></div>'+
    '<section class="shift-recap" id="shiftRecap"></section></section>'+
    '<button type="button" id="momentBubble" class="moment-bubble" aria-label="Help this customer choose" hidden>'+LEAF+'</button><p class="shop-play-feedback" role="status" hidden></p>';
  document.getElementById('world').appendChild(root);
  // The pick card: centred over a soft scrim, outside the app so the map and menus go inert behind it.
  const overlay=document.createElement('div');overlay.className='moment-overlay';overlay.hidden=true;
  overlay.innerHTML='<section class="moment-card" role="dialog" aria-modal="true" aria-labelledby="momentQuestion" aria-describedby="momentHint">'+
    '<button type="button" class="moment-close" aria-label="Decide later">'+CLOSE+'</button>'+
    '<div class="moment-guest" aria-hidden="true">'+ART('goal-person','moment-guest-art')+'</div>'+
    '<p class="moment-kicker"></p><h2 id="momentQuestion"></h2><p class="moment-hint" id="momentHint">'+tieLast('Suggest one. A good match tips 20%.')+'</p>'+
    '<div class="moment-picks" role="group" aria-label="Your suggestion"></div>'+
    '<button type="button" class="moment-skip">Let the team choose</button></section>';
  document.body.appendChild(overlay);
  const $=id=>root.querySelector('#'+id),panel=$('shopActivityPanel'),pill=$('shopActivity'),bubble=$('momentBubble'),feedback=root.querySelector('.shop-play-feedback');
  const card=overlay.querySelector('.moment-card'),picksBox=overlay.querySelector('.moment-picks');
  let key='',momentKey='',feedbackTimer;
  const notes=lane&&lane.notes||root;if(lane&&lane.status){lane.status.prepend(pill);notes.appendChild(feedback);pill.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){close();e.stopPropagation()}})}
  function openMoment(){
    const moment=getMoment();if(!moment)return false;
    if(!panel.hidden)close();
    moment.opened=true;momentKey='';renderMoment();overlay.hidden=false;pill.setAttribute('aria-expanded','true');changed();return true;
  }
  function closeMoment(){
    if(overlay.hidden)return;overlay.hidden=true;pill.setAttribute('aria-expanded','false');
    const moment=getMoment();if(moment)moment.opened=false;
  }
  manageDialog(overlay,()=>{closeMoment();render()});
  function open(){
    if(openMoment())return;
    if(panel.hidden&&opening)opening();
    panel.hidden=false;panel.querySelector('.shop-activity-heading').after(feedback);pill.setAttribute('aria-expanded','true');
    getState().shopPlay.recapUnread=false;changed();render();
  }
  function close(){
    const wasOpen=!panel.hidden;panel.hidden=true;notes.appendChild(feedback);pill.setAttribute('aria-expanded','false');
    if(wasOpen&&closing)closing();pill.focus({preventScroll:true});
  }
  pill.onclick=()=>panel.hidden?open():close();bubble.onclick=open;$('shopActivityClose').onclick=close;
  root.addEventListener('keydown',e=>{if(e.key==='Escape'){close();e.stopPropagation()}});
  // A tap on the scrim around the card puts the question off for later; the guest keeps waiting at the door.
  overlay.addEventListener('click',e=>{if(e.target===overlay){closeMoment();render()}});
  card.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.choice!==undefined){closeMoment();choose(Number(b.dataset.choice))}
    else if(b.classList.contains('moment-skip')){closeMoment();skip()}
    else if(b.classList.contains('moment-close'))closeMoment();
    render();});
  $('shiftRecap').addEventListener('click',e=>{if(!e.target.closest('.activity-advice'))return;const recap=getState().shopPlay.recap,tip=recap&&advice(recap);if(tip&&tip.station!==undefined){close();navigate(tip)}});
  const advice=recap=>{const state=getState();return shiftAdvice(recap,{counters:state.orderCounters,comfortLevel:state.comfortLevel});};
  const el=(tag,props,...kids)=>{const node=Object.assign(document.createElement(tag),props);node.append(...kids);return node;};
  const figure=(label,value)=>el('div',{},el('dt',{textContent:label}),el('dd',{textContent:value}));
  // Three answer tiles: the strain's own 3D render with its product on a corner badge, the name, the brass-edged word
  // that answers the question, and the other half underneath.
  function renderMoment(){
    const moment=getMoment();if(!moment)return;
    const next=JSON.stringify([moment.customerId,moment.choices,moment.variant,moment.portrait]);if(next===momentKey)return;momentKey=next;
    overlay.querySelector('.moment-kicker').textContent=moment.name+' asks';
    // The guest's own face: a portrait of the shopper model walking in (people-*.png), else a generic figure.
    const face=overlay.querySelector('.moment-guest-art'),src='icons/3d/'+(moment.portrait||'goal-person')+'.png';if(face.getAttribute('src')!==src)face.setAttribute('src',src);
    overlay.querySelector('.moment-guest').classList.toggle('is-portrait',!!moment.portrait);
    overlay.querySelector('#momentQuestion').textContent=tieLast(momentQuestion(moment));
    picksBox.replaceChildren(...moment.choices.map((option,i)=>{
      const label=pickLabel(moment,option),name=names[option.strain];
      const b=el('button',{type:'button',className:'moment-pick'});b.dataset.choice=i;
      if(colors&&colors[option.strain])b.style.setProperty('--strain',colors[option.strain]);
      b.setAttribute('aria-label','Suggest '+name+', '+option.formatName+', '+option.trait);
      b.innerHTML='<span class="moment-pick-art">'+ART('strain-'+option.strain,'moment-pick-strain')+ART('goods-'+option.format,'moment-pick-goods')+'</span>';
      b.append(el('strong',{textContent:name}),el('span',{className:'moment-pick-tag',textContent:label.tag}),el('small',{textContent:label.line}));
      return b;}));
  }
  function render(){
    const play=getState().shopPlay,moment=getMoment(),alerts=getAlerts(),shift=play.shift;
    if(!moment&&!overlay.hidden){overlay.hidden=true;pill.setAttribute('aria-expanded',String(!panel.hidden))}
    if(moment&&!overlay.hidden)renderMoment();
    const label=moment?moment.name+' needs a pick':play.recapUnread?'Floor recap ready':alerts.length?alerts[0].title:'Shop activity';
    pill.querySelector('span').textContent=label;pill.classList.toggle('is-moment',!!moment);
    const glyph=moment?'leaf':'pulse';if(pill.dataset.icon!==glyph){pill.dataset.icon=glyph;pill.querySelector('svg').outerHTML=moment?LEAF:PULSE}
    pill.classList.toggle('has-update',!!moment||play.recapUnread||alerts.length>0);pill.setAttribute('aria-label',label+(moment?' · Open their question':' · Open shop activity'));
    const next=JSON.stringify([play.recap,alerts,shift.served,shift.matches,Math.floor(shift.earned),Math.floor(shift.seconds/10),getState().orderCounters,getState().comfortLevel]);
    if(next===key)return;key=next;
    const focused=document.activeElement,scroll=panel.scrollTop,refocus=root.contains(focused)&&!!focused.closest('#shiftRecap');
    const recapBox=$('shiftRecap'),progress=el('progress',{max:SHIFT_SECONDS,value:shift.seconds});progress.setAttribute('aria-label','Time to the next floor recap');
    recapBox.replaceChildren(el('div',{className:'activity-head'},el('h3',{textContent:'On the floor'}),el('span',{textContent:shiftTimeLeft(shift.seconds)})),progress,
      el('dl',{className:'activity-figures'},figure('Served',String(shift.served)),figure('Great picks',String(shift.matches)),figure('Earned',format(shift.earned))));
    if(play.recap){
      // Last recap as three open figures; a brass button only when there is a station to fix, and it opens that station.
      const r=play.recap,tip=advice(r);
      recapBox.append(el('div',{className:'activity-last'},el('h4',{textContent:'Last 5 min'}),el('dl',{className:'activity-figures is-last'},figure('Earned',format(r.earned)),figure('Served',String(r.served)),figure('Avg wait',r.served?Math.round(r.waitTotal/r.served)+'s':'–'))));
      if(tip.station!==undefined){const card=el('button',{type:'button',className:'activity-advice',title:tip.text},svg(SPARK),el('strong',{textContent:tip.short||tip.text}),svg(CHEVRON));recapBox.appendChild(card)}
    }
    if(refocus&&!focused.isConnected){(recapBox.querySelector('button')||pill).focus({preventScroll:true});panel.scrollTop=scroll}
  }
  return {
    render,close,open,
    position(point,visible){bubble.hidden=!visible||!panel.hidden||!overlay.hidden;if(visible){bubble.style.left=point.x+'px';bubble.style.top=point.y+'px'}},
    feedback(text){feedback.textContent=text;feedback.hidden=false;clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>{feedback.hidden=true},5000)},
    reset(){key='';momentKey='';panel.hidden=true;overlay.hidden=true;pill.setAttribute('aria-expanded','false');bubble.hidden=true;feedback.hidden=true}
  };
}
