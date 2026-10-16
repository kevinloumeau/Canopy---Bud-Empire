import {BRANCH_NAMES,LINES,REGULARS,storyStatus,deliveryReason} from './operations.js';
import {TYPES,STRAIN_TYPE} from './strains.js';
import {FORMATS,strainFormat} from './depth.js';

// Shop activity, as on iOS: a pill on the map that leads with whatever needs the player now. Walk-ins sometimes ask the
// budtender for a pick (a good match tips 20% at pickup), every five minutes of play closes a shift with a recap and one
// piece of advice, and branch stores raise operations alerts (a regular's order ready, shelves empty or full, a branch
// short of harvest, a driver free).
export const SHIFT_SECONDS=300;
export const MOMENT_SECONDS=18;
export const TIP_SHARE=.2;
const cap=(n,max=1e12)=>Number.isFinite(n)?Math.max(0,Math.min(max,n)):0;
const freshShift=()=>({seconds:0,served:0,matches:0,earned:0,deliveries:0,transfers:0,queuePeak:0,waitTotal:0,stockoutSeconds:0});
function migrateShift(raw){const shift=freshShift();for(const key of Object.keys(shift))shift[key]=cap(raw?.[key],key==='seconds'?SHIFT_SECONDS:1e12);return shift;}
export function migrateShopPlay(raw){
  return {version:1,cooldown:cap(raw?.cooldown??35,90),sequence:Math.floor(cap(raw?.sequence)),matches:Math.floor(cap(raw?.matches)),tips:cap(raw?.tips),
    shift:migrateShift(raw?.shift),recap:raw?.recap?migrateShift(raw.recap):null,recapUnread:raw?.recapUnread===true};
}
// Every unlocked strain on the menu, sold in its format, is a pick the budtender can offer.
export function picks(state,menuStrains){
  return menuStrains.filter(i=>state.strains[i]>0).map(strain=>{const format=strainFormat(state.productMenu,strain),type=STRAIN_TYPE[strain]??0;return {strain,format,type,trait:TYPES[type],formatName:FORMATS[format].name};});
}
const NAMES=['Avery','Eden','Noa','Remy','Sage','Robin'];
// One customer, one request: a strain type most of the time, and every third request a format when the shop sells one
// beyond flower. The right answer is always among the three choices, rotated so it is not always first.
export function createMoment(play,customer,options){
  const sequence=play.sequence++,want=options[sequence%options.length];
  if(!want)return null;
  const formatRequest=sequence%3===2&&want.format>0;
  const request=formatRequest?['','Something rolled and ready.','Something without flower.'][want.format]:['A balanced house pick, please.','A bright daytime pick, please.','An evening-style pick, please.'][want.type];
  const matches=o=>formatRequest?o.format===want.format:o.type===want.type,others=options.filter(o=>!matches(o));
  const choices=[want,...others.slice(sequence%Math.max(1,others.length)),...options.filter(o=>o!==want)].filter((o,i,all)=>all.findIndex(x=>x.strain===o.strain&&x.format===o.format)===i).slice(0,3);
  for(let i=0;i<sequence%choices.length;i++)choices.push(choices.shift());
  return {customerId:customer.id,name:NAMES[sequence%NAMES.length],request,choices,remaining:MOMENT_SECONDS,opened:false,formatRequest,target:formatRequest?want.format:want.type};
}
export function judgeChoice(moment,index){
  const option=moment.choices[index];
  return option?{option,matched:moment.formatRequest?option.format===moment.target:option.type===moment.target}:null;
}
export function tipFor(sale){return Math.max(1,Math.round(sale*TIP_SHARE));}
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
export function shiftAdvice(recap){
  if(recap.stockoutSeconds>30)return {text:'Keep pickup stocked: check your Pack and Orders stations.',station:3};
  if(recap.served&&recap.waitTotal/recap.served>25)return {text:'Customers waited a while. Train the Orders team or improve queue comfort.',station:4};
  if(recap.queuePeak>8)return {text:'A busy shift. Add an order counter to spread the queue.',station:4};
  return {text:'Try another customer recommendation next shift. Great matches earn extra tips.',moment:true};
}
export function operationsAlerts(empire){
  const network=empire.network,alerts=[];
  network.stores.forEach((store,i)=>{
    if(!empire.stores[i]?.level)return;
    const story=storyStatus(empire,i),name=BRANCH_NAMES[i];
    if(story.ready)alerts.push({id:'regular-'+i,title:REGULARS[i].name+'’s request is ready',detail:name+' · '+story.need+' '+LINES[story.line].name,store:i,tab:2,control:'storyServe'+i});
    const recipe=LINES[store.recipe];
    if(store.shelves[store.recipe]===0)alerts.push({id:'shelf-'+i,title:name+' needs shelf space',detail:'Allocate space for '+recipe.name,store:i,tab:1,control:'shelfMore'+i+store.recipe});
    else if(store.stock[store.recipe]>=store.shelves[store.recipe])alerts.push({id:'full-'+i,title:name+' shelves are full',detail:'Check deliveries or your shelf plan',store:i,tab:1,control:'deliverySend'+i,details:true});
    else if(i>0&&store.raw<recipe.raw&&!network.jobs.some(job=>job.kind==='transfer'&&job.to===i))alerts.push({id:'harvest-'+i,title:name+' needs harvest',detail:'Send a transfer from Riverside',store:0,tab:1,control:'transferSend0',details:true,transferTo:i});
    const line=store.stock.findIndex((_,j)=>!deliveryReason(empire,i,j));
    if(line>=0)alerts.push({id:'driver-'+i,title:'Driver ready for '+name,detail:store.demand+' requests · dispatch '+LINES[line].name,store:i,tab:1,control:'deliverySend'+i,details:true,line});
  });
  return alerts;
}

const icon=path=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>';
const LEAF=icon('<path d="M12 21v-8"/><path d="M12 13c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Z"/><path d="M12 15c0-4 2.3-6.5 7-6.5 0 4.2-2.5 6.5-7 6.5Z"/>');
const LIST=icon('<path d="M5 7h14M5 12h14M5 17h9"/>');
export function mountShopPlay({getState,getMoment,getAlerts,names,format,choose,skip,navigate,changed,opening,closing}){
  const root=document.createElement('div');root.className='shop-play';
  root.innerHTML='<button type="button" id="shopActivity" class="shop-activity" aria-expanded="false" aria-controls="shopActivityPanel">'+LIST+'<span></span></button>'+
    '<section id="shopActivityPanel" class="shop-activity-panel" aria-label="Shop activity" hidden><div class="shop-activity-heading"><h2>Shop activity</h2><button type="button" id="shopActivityClose" aria-label="Close shop activity">×</button></div>'+
    '<div id="budtenderMoment"></div><section class="shift-recap" id="shiftRecap"></section><section class="operations-alerts"><h3>Operations</h3><div id="operationsAlerts"></div></section></section>'+
    '<button type="button" id="momentBubble" class="moment-bubble" aria-label="Help this customer choose" hidden>'+LEAF+'</button><p class="shop-play-feedback" role="status" hidden></p>';
  document.getElementById('world').appendChild(root);
  const $=id=>root.querySelector('#'+id),panel=$('shopActivityPanel'),pill=$('shopActivity'),bubble=$('momentBubble'),feedback=root.querySelector('.shop-play-feedback');
  let key='',feedbackTimer;
  function open(){
    if(panel.hidden&&opening)opening();
    panel.hidden=false;panel.querySelector('.shop-activity-heading').after(feedback);pill.setAttribute('aria-expanded','true');
    const moment=getMoment();if(moment)moment.opened=true;getState().shopPlay.recapUnread=false;changed();render();
  }
  function close(){
    const wasOpen=!panel.hidden;panel.hidden=true;root.appendChild(feedback);pill.setAttribute('aria-expanded','false');
    const moment=getMoment();if(moment)moment.opened=false;if(wasOpen&&closing)closing();pill.focus({preventScroll:true});
  }
  pill.onclick=()=>panel.hidden?open():close();bubble.onclick=open;$('shopActivityClose').onclick=close;
  root.addEventListener('keydown',e=>{if(e.key==='Escape'){close();e.stopPropagation()}});
  $('budtenderMoment').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.choice!==undefined)choose(Number(b.dataset.choice));else if(b.dataset.skip!==undefined)skip();render();});
  $('operationsAlerts').addEventListener('click',e=>{const b=e.target.closest('[data-alert]');if(!b)return;const alert=getAlerts().find(a=>a.id===b.dataset.alert);if(alert){close();navigate(alert)}});
  $('shiftRecap').addEventListener('click',e=>{if(!e.target.closest('button'))return;const recap=getState().shopPlay.recap;if(recap){close();navigate(shiftAdvice(recap))}});
  const el=(tag,props)=>Object.assign(document.createElement(tag),props);
  function render(){
    const play=getState().shopPlay,moment=getMoment(),alerts=getAlerts();
    const label=moment?moment.name+' needs a pick':play.recapUnread?'Shift recap ready':alerts.length?alerts[0].title:'Shop activity';
    pill.querySelector('span').textContent=label;pill.classList.toggle('is-moment',!!moment);
    const glyph=moment?'leaf':'list';if(pill.dataset.icon!==glyph){pill.dataset.icon=glyph;pill.querySelector('svg').outerHTML=moment?LEAF:LIST}
    panel.classList.toggle('has-moment',!!moment);panel.querySelector('h2').textContent=moment?moment.name+' needs a pick':'Shop activity';
    pill.classList.toggle('has-update',!!moment||play.recapUnread||alerts.length>0);pill.setAttribute('aria-label',label+' · Open shop activity');
    const next=JSON.stringify([moment&&[moment.customerId,moment.choices,moment.opened],play.recap,alerts,Math.floor(play.shift.seconds/10)]);
    if(next===key)return;key=next;
    const focused=document.activeElement,scroll=panel.scrollTop,box=$('budtenderMoment');
    const memory=root.contains(focused)?{choice:focused.dataset.choice,alert:focused.dataset.alert,customer:box.dataset.customerId,skip:focused.dataset.skip!==undefined,recap:!!focused.closest('#shiftRecap')}:null;
    box.dataset.customerId=moment?String(moment.customerId):'';box.replaceChildren();
    if(moment){
      const options=el('div',{className:'moment-options'});
      moment.choices.forEach((option,i)=>{const b=el('button',{type:'button'});b.dataset.choice=i;b.append(el('strong',{textContent:names[option.strain]+' · '+option.formatName}),el('small',{textContent:option.trait}));options.appendChild(b)});
      const pass=el('button',{type:'button',className:'moment-skip',textContent:'Let the team choose'});pass.dataset.skip='';
      box.append(el('p',{className:'moment-quote',textContent:'“'+moment.request+'”'}),options,pass,el('small',{className:'moment-note',textContent:'Tap a pick to recommend it. A good match earns a tip.'}));
    }
    const recapBox=$('shiftRecap');recapBox.replaceChildren(el('h3',{textContent:play.recap?'Last shift · 5 minutes':'Your shift'}));
    if(play.recap){
      const r=play.recap;
      recapBox.append(el('p',{textContent:r.served+' served · '+r.matches+' great matches · '+format(r.earned)+' earned'}),
        el('p',{className:'recap-detail',textContent:r.deliveries+' deliveries · '+r.transfers+' transfers · peak queue '+r.queuePeak+(r.served?' · '+Math.round(r.waitTotal/r.served)+'s average wait':'')}),
        el('button',{type:'button',textContent:shiftAdvice(r).text}));
    }else recapBox.appendChild(el('p',{textContent:'Your recap arrives after five minutes of play.'}));
    const progress=el('progress',{max:SHIFT_SECONDS,value:play.shift.seconds});progress.setAttribute('aria-label','Current shift progress');recapBox.appendChild(progress);
    const list=$('operationsAlerts');list.replaceChildren();
    if(!alerts.length)list.appendChild(el('p',{textContent:'All caught up.'}));
    alerts.forEach(a=>{const b=el('button',{type:'button'});b.dataset.alert=a.id;b.append(el('strong',{textContent:a.title}),el('small',{textContent:a.detail+' →'}));list.appendChild(b)});
    if(memory&&!focused.isConnected){
      let target;
      if(memory.choice!==undefined&&moment&&memory.customer===String(moment.customerId))target=box.querySelector('[data-choice="'+memory.choice+'"]');
      else if(memory.skip&&moment&&memory.customer===String(moment.customerId))target=box.querySelector('[data-skip]');
      else if(memory.alert)target=Array.from(list.querySelectorAll('button')).find(b=>b.dataset.alert===memory.alert)||list.querySelector('button');
      else if(memory.recap)target=recapBox.querySelector('button');
      (target||pill).focus({preventScroll:true});panel.scrollTop=scroll;
    }
  }
  return {
    render,close,open,
    position(point,visible){bubble.hidden=!visible||!panel.hidden;if(visible){bubble.style.left=point.x+'px';bubble.style.top=point.y+'px'}},
    feedback(text){feedback.textContent=text;feedback.hidden=false;clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>{feedback.hidden=true},5000)},
    reset(){key='';panel.hidden=true;pill.setAttribute('aria-expanded','false');bubble.hidden=true;feedback.hidden=true}
  };
}
