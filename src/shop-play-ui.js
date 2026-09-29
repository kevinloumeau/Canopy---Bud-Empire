import {recapSuggestion,SHIFT_SECONDS} from './shop-play.js';
import './shop-play.css';

const icon=d=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const leafIcon=icon('<path d="M12 21v-8"/><path d="M12 13c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Z"/><path d="M12 15c0-4 2.3-6.5 7-6.5 0 4.2-2.5 6.5-7 6.5Z"/>'),listIcon=icon('<path d="M5 7h14M5 12h14M5 17h9"/>');
const speech='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v12H9l-5 4V4Z"/><path d="M8 8h8M8 12h5"/></svg>';
export function mountShopPlay({getState,getMoment,getAlerts,names,format,choose,skip,navigate,changed,opening,closing}){
 const world=document.getElementById('world'),root=document.createElement('div');root.className='shop-play';
 root.innerHTML='<button type="button" id="shopActivity" class="shop-activity" aria-expanded="false" aria-controls="shopActivityPanel">'+listIcon+'<span></span></button><section id="shopActivityPanel" class="shop-activity-panel" aria-label="Shop activity" hidden><div class="shop-activity-heading"><h2>Shop activity</h2><button type="button" id="shopActivityClose" aria-label="Close shop activity">×</button></div><div id="budtenderMoment"></div><section class="shift-recap" id="shiftRecap"></section><section class="operations-alerts"><h3>Operations</h3><div id="operationsAlerts"></div></section></section><button type="button" id="momentBubble" class="moment-bubble" aria-label="Help this customer choose" hidden>'+leafIcon+'</button><p class="shop-play-feedback" role="status" hidden></p>';
 world.appendChild(root);const $=id=>root.querySelector('#'+id),panel=$('shopActivityPanel'),toggle=$('shopActivity'),bubble=$('momentBubble'),feedback=root.querySelector('.shop-play-feedback');let key='',feedbackTimer;
 function open(){if(panel.hidden&&opening)opening();panel.hidden=false;panel.querySelector('.shop-activity-heading').after(feedback);toggle.setAttribute('aria-expanded','true');const m=getMoment();if(m)m.opened=true;getState().shopPlay.recapUnread=false;changed();render();}
 function close(){const wasOpen=!panel.hidden;panel.hidden=true;root.appendChild(feedback);toggle.setAttribute('aria-expanded','false');const m=getMoment();if(m)m.opened=false;if(wasOpen&&closing)closing();toggle.focus({preventScroll:true});}
 toggle.onclick=()=>panel.hidden?open():close();bubble.onclick=open;$('shopActivityClose').onclick=close;
 root.addEventListener('keydown',e=>{if(e.key==='Escape'){close();e.stopPropagation();}});
 $('budtenderMoment').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.choice!==undefined)choose(Number(b.dataset.choice));else if(b.dataset.skip!==undefined)skip();render();});
 $('operationsAlerts').addEventListener('click',e=>{const b=e.target.closest('[data-alert]');if(!b)return;const a=getAlerts().find(a=>a.id===b.dataset.alert);if(a){close();navigate(a);}});
 $('shiftRecap').addEventListener('click',e=>{if(!e.target.closest('button'))return;const recap=getState().shopPlay.recap;if(recap){close();navigate(recapSuggestion(recap));}});
 function render(){
  const state=getState(),play=state.shopPlay,m=getMoment(),alerts=getAlerts();
  const label=m?m.name+' needs a pick':play.recapUnread?'Shift recap ready':alerts.length?alerts[0].title:'Shop activity';
  toggle.querySelector('span').textContent=label;toggle.classList.toggle('is-moment',!!m);const want=m?'leaf':'list';if(toggle.dataset.icon!==want){toggle.dataset.icon=want;toggle.querySelector('svg').outerHTML=m?leafIcon:listIcon}panel.classList.toggle('has-moment',!!m);panel.querySelector('h2').textContent=m?m.name+' needs a pick':'Shop activity';toggle.classList.toggle('has-update',!!m||play.recapUnread||alerts.length>0);toggle.setAttribute('aria-label',label+' · Open shop activity');
  const nextKey=JSON.stringify([m&&[m.customerId,m.choices,m.opened],play.recap,alerts,Math.floor(play.shift.seconds/10)]);
  if(key===nextKey)return;key=nextKey;
  const focused=document.activeElement,scrollTop=panel.scrollTop,slot=$('budtenderMoment');
  const focusIdentity=root.contains(focused)?{id:focused.id,choice:focused.dataset.choice,alert:focused.dataset.alert,customer:slot.dataset.customerId,skip:focused.dataset.skip!==undefined,recap:!!focused.closest('#shiftRecap')}:null;
  slot.dataset.customerId=m?String(m.customerId):'';slot.replaceChildren();
  if(m){const quote=document.createElement('p');quote.className='moment-quote';quote.textContent='“'+m.request+'”';const hint=document.createElement('small');hint.className='moment-note';hint.textContent='Tap a pick to recommend it. A good match earns a tip.';const options=document.createElement('div');options.className='moment-options';m.choices.forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.dataset.choice=i;const title=document.createElement('strong');title.textContent=names[o.strain]+' · '+o.formatName;const trait=document.createElement('small');trait.textContent=o.trait;b.append(title,trait);options.appendChild(b);});const skipButton=document.createElement('button');skipButton.type='button';skipButton.dataset.skip='';skipButton.className='moment-skip';skipButton.textContent='Let the team choose';slot.append(quote,options,skipButton,hint);}
  const recap=$('shiftRecap');recap.replaceChildren();const h=document.createElement('h3');h.textContent=play.recap?'Last shift · 5 minutes':'Your shift';recap.appendChild(h);
  if(play.recap){const r=play.recap,summary=document.createElement('p');summary.textContent=r.served+' served · '+r.matches+' great matches · '+format(r.earned)+' earned';const detail=document.createElement('p');detail.className='recap-detail';detail.textContent=r.deliveries+' deliveries · '+r.transfers+' transfers · peak queue '+r.queuePeak+(r.served?' · '+Math.round(r.waitTotal/r.served)+'s average wait':'');const advice=document.createElement('button');advice.type='button';advice.textContent=recapSuggestion(r).text;recap.append(summary,detail,advice);}else{const p=document.createElement('p');p.textContent='Your recap arrives after five minutes of play.';recap.appendChild(p);}
  const progress=document.createElement('progress');progress.max=SHIFT_SECONDS;progress.value=play.shift.seconds;progress.setAttribute('aria-label','Current shift progress');recap.appendChild(progress);
  const list=$('operationsAlerts');list.replaceChildren();if(!alerts.length){const p=document.createElement('p');p.textContent='All caught up.';list.appendChild(p);}alerts.forEach(a=>{const b=document.createElement('button');b.type='button';b.dataset.alert=a.id;const title=document.createElement('strong');title.textContent=a.title;const detail=document.createElement('small');detail.textContent=a.detail+' →';b.append(title,detail);list.appendChild(b);});
  if(focusIdentity&&!focused.isConnected){
   let replacement;
   if(focusIdentity.choice!==undefined&&m&&focusIdentity.customer===String(m.customerId))replacement=slot.querySelector('[data-choice="'+focusIdentity.choice+'"]');
   else if(focusIdentity.skip&&m&&focusIdentity.customer===String(m.customerId))replacement=slot.querySelector('[data-skip]');
   else if(focusIdentity.alert)replacement=Array.from(list.querySelectorAll('button')).find(b=>b.dataset.alert===focusIdentity.alert)||list.querySelector('button');
   else if(focusIdentity.recap)replacement=recap.querySelector('button');
   (replacement||toggle).focus({preventScroll:true});panel.scrollTop=scrollTop;
  }
 }
 return {render,close,position(point,visible){bubble.hidden=!visible||!panel.hidden;if(visible){bubble.style.left=point.x+'px';bubble.style.top=point.y+'px';}},feedback(message){feedback.textContent=message;feedback.hidden=false;clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>{feedback.hidden=true},5000);},reset(){key='';panel.hidden=true;toggle.setAttribute('aria-expanded','false');bubble.hidden=true;feedback.hidden=true;},open};
}
