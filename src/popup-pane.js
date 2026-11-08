// The weekend market's page in the Empire tab (popup-event.js has the rules). Built like a branch's Stations page so it
// reads as one of the shops: the market's tickets and pace on the stalls' head, the four stalls as ring tiles (a tap
// buys a level, the ring fills toward the stall's next doubling, the best buy wears the brass), then the three prizes as ring tiles filling with the weekend's takings. Fits the half-open sheet on an iPhone SE.
import {POPUP_STALLS,POPUP_PRIZES,POPUP_STALL_MAX,POPUP_TIER,POPUP_TROPHY_BONUS,stallCost,stallOpenable,bestStall,popupRate} from './popup-event.js';
import {abbr} from './progression.js';

const svg=paths=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';
const RING='<svg class="map-ring-track" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="25"/><circle class="map-ring-fill" cx="28" cy="28" r="25" pathLength="100"/></svg>';
const LOCK='<svg class="map-lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const CHECK='<svg class="map-lock" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
// A market stall under its scalloped awning (the Empire door; main.js draws the same on the map tag).
export const TENT=svg('<path d="M4 9 5.6 4h12.8L20 9"/><path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/><path d="M5.5 11v9M18.5 11v9M5.5 15h13M3 20h18M10 4 9 9M14 4l1 5"/>');
// A ticket, drawn small before every ticket figure.
export const TICKET='<svg class="popup-ticket" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M14 7v2M14 11v2M14 15v2"/></svg>';
const STALL_GLYPHS=[
  svg('<path d="M12 20v-7M12 13c-3.5 0-5.5-2.5-5.5-6 3.5 0 5.5 2.5 5.5 6Zm0 0c3.5 0 5.5-2.5 5.5-6-3.5 0-5.5 2.5-5.5 6ZM12 9.5c-1.2-1.6-1.2-3.6 0-5.5 1.2 1.9 1.2 3.9 0 5.5ZM8 20h8"/>'),
  svg('<path d="M4 15.5 16.5 6l2.5 3.3L6.5 18.8Z"/><path d="M14 8l2.5 3.3M18.5 5.5c.8-.6 1.4-1.6 1.2-2.7"/>'),
  svg('<rect x="4" y="8" width="16" height="11" rx="2.5"/><path d="M8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8M8.5 13.5h.01M12 12.5h.01M15.5 13.5h.01M10 16h.01M14 16h.01"/>'),
  svg('<path d="M8 4 4 6.5l1.5 4L8 9.5V20h8V9.5l2.5 1 1.5-4L16 4c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z"/>')
];
const PRIZE_GLYPHS={
  cash:svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M14.5 10a2.5 2 0 0 0-5 0c0 2.5 5 1.5 5 4a2.5 2 0 0 1-5 0"/>'),
  keepsake:svg('<path d="M3 6c6 4 12 4 18 0"/><path d="M5.5 7.6 6 12l2.6-3.4M10.5 8.9 12 13l1.5-4.1M15.4 8.6 18 12l.5-4.4"/>'),
  trophy:svg('<path d="M8 4h8v5a4 4 0 0 1-8 0ZM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4v3h-4z"/>')
};
const tickets=n=>TICKET+abbr(Math.floor(n));
const clamp=v=>Math.max(0,Math.min(1,Number.isFinite(v)?v:0));

export function mountPopupPage({getState,getWindow,buy,format}){
 const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;};
 const set=(node,html)=>{if(node.innerHTML!==html)node.innerHTML=html;};
 // The stalls' head carries the market's tickets and what it takes a second; the back bar carries the time left.
 const stallHead=el('div','page-head','<b>Stalls</b><span class="page-meta"></span>');
 const stallGrid=el('div','page-tiles is-stations is-four');
 const stalls=POPUP_STALLS.map((s,j)=>{const b=el('button','page-tile map-tile');b.type='button';
  b.innerHTML='<span class="map-ring">'+RING+'<span class="page-glyph">'+STALL_GLYPHS[j]+'</span><b class="page-level"></b></span><b class="map-tile-name">'+s.short+'</b><small class="map-tile-figure"></small>';
  b.onclick=()=>{buy(j);sync();};stallGrid.append(b);return {b,ring:b.querySelector('.map-ring'),level:b.querySelector('.page-level'),figure:b.querySelector('.map-tile-figure'),sig:''};});
 const stallGroup=el('section','page-group popup-stalls');stallGroup.append(stallHead,stallGrid);
 const prizeHead=el('div','page-head','<b>Prizes</b><span class="page-meta"></span>');
 const prizeGrid=el('div','page-tiles');
 const prizes=POPUP_PRIZES.map(p=>{const d=el('div','page-tile map-tile');d.innerHTML='<span class="map-ring">'+RING+'<span class="page-glyph">'+PRIZE_GLYPHS[p.kind]+'</span></span><b class="map-tile-name"></b><small class="map-tile-figure"></small>';prizeGrid.append(d);
  return {b:d,ring:d.querySelector('.map-ring'),name:d.querySelector('.map-tile-name'),figure:d.querySelector('.map-tile-figure'),sig:''};});
 const prizeGroup=el('section','page-group popup-prizes');prizeGroup.append(prizeHead,prizeGrid);

 const paint=(t,cls,label,figure,share)=>{const sig=[cls,label,figure,share.toFixed(3)].join('|');if(sig===t.sig)return;t.sig=sig;
  t.ring.style.setProperty('--share',clamp(share).toFixed(3));set(t.figure,figure);t.b.className=cls;if(t.b.tagName==='BUTTON')t.b.setAttribute('aria-label',label);t.b.title=label;};
 function sync(){
  const s=getState(),pp=s.popup,win=getWindow();if(!pp||!win||pp.key<0)return;
  const speed=s.gameSpeed||1,rate=popupRate(pp)*speed,best=bestStall(pp);
  set(stallHead.lastChild,tickets(pp.tickets)+'<span class="popup-rate">+'+abbr(Math.floor(rate))+'<span class="map-per">/s</span></span>');
  stallHead.lastChild.setAttribute('aria-label',abbr(pp.tickets)+' tickets, '+abbr(rate)+' a second');
  stalls.forEach((t,j)=>{const l=pp.stalls[j],can=stallOpenable(pp,j),max=l>=POPUP_STALL_MAX,cost=max?0:stallCost(j,l),ok=can&&!max&&pp.tickets>=cost,isBest=j===best&&ok,name=POPUP_STALLS[j].name;
   if(t.level.textContent!==(l?String(l):''))t.level.textContent=l?String(l):'';t.level.hidden=!l;
   const label=name+(max?', maxed':!can?', opens after the '+POPUP_STALLS[j-1].name:!l?', open for '+abbr(cost)+' tickets':', level '+l+', next level '+abbr(cost)+' tickets')+(isBest?', best buy':'');
   paint(t,'page-tile map-tile'+(max?' is-max':!can?' is-locked':isBest?' is-best':ok?' is-ready':''),label,max?CHECK+'Max':!can?LOCK+abbr(cost):tickets(cost),max?1:l?(l%POPUP_TIER)/POPUP_TIER:clamp(pp.tickets/cost));});
  set(prizeHead.lastChild,tickets(pp.earned)+' taken');
  POPUP_PRIZES.forEach((p,i)=>{const t=prizes[i],done=!!(pp.prizes&1<<i),name=p.kind==='keepsake'?win.theme.keepsake:p.kind==='trophy'?'+'+Math.round(POPUP_TROPHY_BONUS*100)+'% sales':'Cash gift';
   if(t.name.textContent!==name)t.name.textContent=name;
   const what=p.kind==='cash'?'a cash gift of 10 minutes of income':p.kind==='keepsake'?win.theme.keepsake+' on your street, for good':'a trophy worth +'+Math.round(POPUP_TROPHY_BONUS*100)+'% sales for good';
   paint(t,'page-tile map-tile is-goal'+(done?' is-max':''),(done?'Won: ':'At '+abbr(p.target)+' tickets taken: ')+what,done?CHECK+'Won':tickets(p.target),done?1:pp.earned/p.target);});
 }
 return {nodes:[stallGroup,prizeGroup],sync};
}
