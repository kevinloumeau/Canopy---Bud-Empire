import {BOOST_MAX} from './depth.js';
import {FORKS,sideStatus,levelsToGate,forkOf} from './research.js';
// Reuse the original purchase nodes so prices, handlers and saves remain authoritative.
export function mountShopBrowser({getState,components,kiosks,queueLimit,recommend,recommendInfo,openDeliveries,deliveryDesk}) {
  const pane=document.querySelector('[data-pane="boosts"]');
  pane.classList.add('shop-browser');
  // Research runs down three branches. A fork's two sides sit next to each other in the order below; a run takes one.
  const categories=['Grow','Retail','Delivery'];
  const byKey=key=>'componentBuy'+components.findIndex(c=>c.key===key);
  const definitions=[['upgradeStorage',0],['boost',0],[byKey('seedBatchLevel'),0],[byKey('curingLevel'),0],[byKey('trendLevel'),0],[byKey('harvestBatchLevel'),0],[byKey('packSpeedLevel'),0],[byKey('breedingLevel'),0],[byKey('growBatchLevel'),0],[byKey('terpeneLevel'),0],[byKey('offlineLevel'),0],
    ['upgradeQueue',1],['buyKiosk',1],['buyOrderCounter',1],[byKey('basketLevel'),1],[byKey('trafficLevel'),1],[byKey('signLevel'),1],[byKey('comfortLevel'),1],[byKey('scannerLevel'),1],[byKey('pickupLevel'),1],[byKey('readyLevel'),1],[byKey('serviceLevel'),1],[byKey('kioskSpeedLevel'),1],[byKey('displayLevel'),1],[byKey('loyaltyLevel'),1],[byKey('durationLevel'),1],
    ['buyAutoDrone',2],[byKey('webLevel'),2],[byKey('onlineBonusLevel'),2],[byKey('fleetLevel'),2],[byKey('cargoLevel'),2],[byKey('repeatLevel'),2]];
  // One label over each undecided fork and an "or" between its sides.
  const forkMarks=FORKS.map(f=>{const head=document.createElement('p');head.className='shop-fork-head';head.innerHTML='<b>Choose one</b><span>'+f.name+'</span>';const or=document.createElement('p');or.className='shop-fork-or';or.setAttribute('aria-hidden','true');or.innerHTML='<span>or</span>';return {fork:f,head,or,ids:f.sides.map(byKey)}});
  const rows=definitions.map(([id,category])=>{
    const button=document.getElementById(id),node=button.parentElement;
    node.classList.add('shop-item');
    const copy=node.querySelector('.shop-copy,.storage-copy'),badge=document.createElement('span');
    badge.className='shop-level';copy.append(badge);
    button.setAttribute('aria-label',copy.querySelector('h2,b').textContent+' upgrade');
    return {id,category,node,button,badge};
  });
  const header=document.createElement('div');header.className='shop-browser-header';
  const icons={Grow:'<path d="M12 21c-4.5-2.5-7-6-7-10a7 7 0 0 1 14 0c0 4-2.5 7.5-7 10ZM12 21V9"/>',Retail:'<path d="M4 17h16M6 17a6 6 0 0 1 12 0M12 8v3M10 8h4"/>',Delivery:'<path d="M9 10h6v4H9zM4 6h3M17 6h3M5.5 6v4h3.5M18.5 6v4H15M9 14l-3 5M15 14l3 5M12 14v6"/>'};
  header.innerHTML='<nav class="shop-categories" aria-label="Upgrade categories">'+categories.map((name,i)=>'<button type="button" data-shop-category="'+i+'" aria-pressed="'+(i===0)+'"><svg class="shop-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(icons[name]||'')+'</svg><em>'+name+'</em></button>').join('')+'</nav>';
  const recommendation=document.createElement('button');recommendation.type='button';recommendation.className='shop-recommendation';
  // Same shape as the bottleneck card: brass icon, label and name, then the price on a brass chip.
  recommendation.innerHTML='<svg class="shop-rec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2Z"/></svg><span class="shop-rec-copy"><small>Recommended</small><strong></strong></span><span class="shop-rec-go"><b></b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></span>';
  recommendation.onclick=()=>recommend(true);
  const list=document.createElement('div');list.className='shop-items';
  const empty=document.createElement('p');empty.className='shop-empty';empty.textContent='Nothing affordable here yet. Turn off the filter to see what’s next.';
  const milestone=pane.querySelector('.shop-milestone'),reset=pane.querySelector('.shop-reset');
  // Online opens with the delivery desk itself, so Deliveries needs no tab of its own.
  const desk=document.createElement('button');desk.type='button';desk.className='shop-desk';desk.hidden=true;
  desk.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 10h7l1.5 3.5h-10zM8.5 10 5 7m10.5 3L19 7M8.5 13.5 5 17m10.5-3.5L19 17M2 7h6m8 0h6M2 17h6m8 0h6"/></svg><span class="shop-desk-copy"><em>Delivery desk</em><b>Delivery desk</b><small></small></span><i class="shop-desk-count" hidden></i><span class="shop-desk-price" hidden><b></b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></span><i class="shop-desk-meter" hidden><i></i></i><svg class="shop-desk-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
  desk.onclick=()=>{if(openDeliveries)openDeliveries()};
  list.prepend(desk);
  pane.prepend(header,recommendation,list,empty);
  pane.append(milestone,reset);
  let category=0;
  header.querySelectorAll('[data-shop-category]').forEach(button=>button.onclick=()=>{category=Number(button.dataset.shopCategory);render()});
  function render(){
    const state=getState(),affordable=false;
    let count=0,done=0;const order=[];
    header.querySelectorAll('[data-shop-category]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.shopCategory)===category)));
    rows.forEach(row=>{
      let level,max;
      if(row.id.startsWith('componentBuy')){const c=components[Number(row.id.replace('componentBuy',''))];level=state[c.key];max=c.max}
      else if(row.id==='buyAutoDrone'){level=state.autoDrone.bulk?2:state.autoDrone.owned?1:0;max=2}
      else if(row.id==='buyOrderCounter'){level=state.orderCounters;max=3}
      else if(row.id==='buyKiosk'){level=kiosks();max=3}
      else if(row.id==='upgradeStorage'){level=state.storageLevel;max=20}
      else if(row.id==='upgradeQueue'){level=queueLimit();max=30}
      else {level=state.globalLevel;max=BOOST_MAX}
      // Keep kiosk hardware and software together; other completed upgrades sink to the end.
      const closed=row.id.startsWith('componentBuy')&&sideStatus(state,components[Number(row.id.replace('componentBuy',''))].key)==='closed';
      const isDone=level>=max||closed,kioskPair=row.id==='buyKiosk'||row.id==='componentBuy5';row.node.classList.toggle('is-maxed',isDone);order.push({row,isDone:isDone&&!kioskPair});
      const side=row.id.startsWith('componentBuy')?sideStatus(state,components[Number(row.id.replace('componentBuy',''))].key):'open',key=side!=='open'?components[Number(row.id.replace('componentBuy',''))].key:null;
      row.badge.textContent=side==='closed'?'Closed this run'+(level?' · Lv '+level+' kept':''):side==='gated'?'Opens at '+forkOf(key).gate+' '+categories[row.category]+' levels · '+levelsToGate(state,key)+' to go':row.id==='buyAutoDrone'?(isDone?'Bulk installed · controls in Delivery desk':level===1?'Single installed · bulk available':'One-time upgrade'):row.id==='buyOrderCounter'?level+'/3 staffed':row.id==='upgradeQueue'?level+'/30 places':row.id==='buyKiosk'?level+'/3 installed':'Lv '+level+(Number.isFinite(max)?'/'+max:'');
      row.node.hidden=row.category!==category||(!isDone&&affordable&&row.button.disabled);
      if(row.category===category){if(isDone)done++;else if(!row.node.hidden)count++}
    });
    const sequence=order.filter(o=>!o.isDone).concat(order.filter(o=>o.isDone)).map(o=>o.row);
    // Undecided forks get their label above the first side and the "or" between the two.
    const open=forkMarks.filter(m=>m.ids.every(id=>{const r=rows.find(x=>x.id===id);return r&&r.category===category&&sideStatus(state,components[Number(id.replace('componentBuy',''))].key)==='pick'}));
    const key=sequence.map(r=>r.id).join(',')+'|'+category+'|'+open.map(m=>m.fork.id).join(',');
    if(key!==render.key){render.key=key;forkMarks.forEach(m=>{m.head.remove();m.or.remove()});sequence.forEach(r=>{const mark=open.find(m=>m.ids[0]===r.id),after=open.find(m=>m.ids[1]===r.id);if(mark)list.appendChild(mark.head);if(after)list.appendChild(after.or);list.appendChild(r.node)})}
    desk.hidden=category!==2||!deliveryDesk;
    if(!desk.hidden){const d=deliveryDesk(),note=desk.querySelector('small'),title=desk.querySelector('b'),count=desk.querySelector('.shop-desk-count'),price=desk.querySelector('.shop-desk-price'),meter=desk.querySelector('.shop-desk-meter');
      // Unbuilt, the desk is the shelf's next step: a brass card above the list with its price and savings so far.
      const unbuilt=!d.built;desk.classList.toggle('is-unbuilt',unbuilt);desk.classList.toggle('is-short',unbuilt&&!d.ready);
      if(unbuilt&&desk.parentElement===list)list.before(desk);else if(!unbuilt&&desk.parentElement!==list)list.prepend(desk);
      title.textContent=unbuilt?'Build the delivery pad':'Delivery desk';
      note.textContent=unbuilt?(d.ready?'Opens web orders':'Opens web orders · '+d.toGo+' to go'):d.waiting?d.waiting+' waiting to send':'No orders waiting';
      price.hidden=meter.hidden=!unbuilt;price.firstChild.textContent=d.price||'';meter.firstChild.style.width=Math.round((d.progress||0)*100)+'%';
      count.hidden=!d.built||!d.waiting;count.textContent=d.waiting;desk.setAttribute('aria-label',unbuilt?'Build the delivery pad, '+d.price+', '+note.textContent:'Delivery desk, '+note.textContent)}
    empty.hidden=count>0||done>0;
    empty.textContent='Nothing here yet.';
    const info=recommendInfo&&recommendInfo();
    if(info){
      recommendation.querySelector('small').textContent='Recommended · '+info.where;
      recommendation.querySelector('strong').textContent=info.name;
      recommendation.querySelector('.shop-rec-go b').textContent=info.price;
      recommendation.classList.toggle('is-short',!info.affordable);
      recommendation.setAttribute('aria-label','Recommended: '+info.name+', '+info.where+', '+info.price);
      // A fork the advice points at lights both sides: the choice stays the player's.
      const forkIds=info.fork?(forkMarks.find(m=>m.fork.id===info.fork)||{ids:[]}).ids:[];
      rows.forEach(row=>row.node.classList.toggle('is-pick',info.fork?forkIds.indexOf(row.id)>=0:row.id===info.id));
    }else recommendation.querySelector('strong').textContent=recommend(false);
  }
  function show(index){category=index;header.querySelectorAll('[data-shop-category]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.shopCategory)===index)));render();}
  function categoryOf(id){const row=rows.find(r=>r.id===id);return row?row.category:0;}
  return {render,show,categoryOf,categories};
}
