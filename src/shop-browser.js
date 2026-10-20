import {BOOST_MAX} from './depth.js';
import {FORKS,sideStatus,levelsToGate,forkOf} from './research.js';
// Reuse the original purchase nodes so prices, handlers and saves remain authoritative. Order counters, kiosks and the
// customer line live on the Orders station instead (see order-extras.js); Start over lives in Settings.
export function mountShopBrowser({getState,components,kiosks,queueLimit,recommend,recommendInfo,openDeliveries,deliveryDesk}) {
  const pane=document.querySelector('[data-pane="boosts"]');
  pane.classList.add('shop-browser');
  // Research runs down three branches. A fork's two sides sit next to each other in the order below; a run takes one.
  const categories=['Grow','Retail','Delivery'];
  const byKey=key=>'componentBuy'+components.findIndex(c=>c.key===key);
  const definitions=[['upgradeStorage',0],['boost',0],[byKey('seedBatchLevel'),0],[byKey('curingLevel'),0],[byKey('trendLevel'),0],[byKey('harvestBatchLevel'),0],[byKey('packSpeedLevel'),0],[byKey('breedingLevel'),0],[byKey('growBatchLevel'),0],[byKey('terpeneLevel'),0],[byKey('offlineLevel'),0],
    [byKey('basketLevel'),1],[byKey('trafficLevel'),1],[byKey('signLevel'),1],[byKey('comfortLevel'),1],[byKey('scannerLevel'),1],[byKey('pickupLevel'),1],[byKey('readyLevel'),1],[byKey('serviceLevel'),1],[byKey('kioskSpeedLevel'),1],[byKey('displayLevel'),1],[byKey('loyaltyLevel'),1],[byKey('durationLevel'),1],
    [byKey('webLevel'),2],[byKey('onlineBonusLevel'),2],[byKey('fleetLevel'),2],[byKey('cargoLevel'),2],[byKey('repeatLevel'),2]];
  // One label over each undecided fork and an "or" between its sides.
  const forkMarks=FORKS.map(f=>{const head=document.createElement('p');head.className='shop-fork-head';head.innerHTML='<b>Choose one</b><span>'+f.name+'</span>';const or=document.createElement('p');or.className='shop-fork-or';or.setAttribute('aria-hidden','true');or.innerHTML='<span>or</span>';const end=document.createElement('i');end.className='shop-fork-end';end.setAttribute('aria-hidden','true');return {fork:f,head,or,end,ids:f.sides.map(byKey)}});
  const rows=definitions.map(([id,category])=>{
    const button=document.getElementById(id),node=button.parentElement;
    node.classList.add('shop-item');
    const copy=node.querySelector('.shop-copy,.storage-copy'),badge=document.createElement('span');
    badge.className='shop-level';copy.append(badge);
    button.setAttribute('aria-label',copy.querySelector('h2,b').textContent+' upgrade');
    const effect=document.createElement('small');effect.className='shop-effect';node.append(effect);
    return {id,category,node,button,badge,effect,symbol:node.querySelector('.shop-symbol')};
  });
  const header=document.createElement('div');header.className='shop-browser-header';
  const icons={Grow:'<path d="M12 21c-4.5-2.5-7-6-7-10a7 7 0 0 1 14 0c0 4-2.5 7.5-7 10ZM12 21V9"/>',Retail:'<path d="M4 17h16M6 17a6 6 0 0 1 12 0M12 8v3M10 8h4"/>',Delivery:'<path d="M9 10h6v4H9zM4 6h3M17 6h3M5.5 6v4h3.5M18.5 6v4H15M9 14l-3 5M15 14l3 5M12 14v6"/>'};
  header.innerHTML='<nav class="shop-categories" aria-label="Upgrade categories">'+categories.map((name,i)=>'<button type="button" data-shop-category="'+i+'" aria-pressed="'+(i===0)+'"><svg class="shop-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(icons[name]||'')+'</svg><em>'+name+'</em></button>').join('')+'</nav>';
  const list=document.createElement('div');list.className='shop-items';
  const empty=document.createElement('p');empty.className='shop-empty';empty.textContent='Nothing affordable here yet. Turn off the filter to see what’s next.';
  const milestone=pane.querySelector('.shop-milestone'),reset=pane.querySelector('.shop-reset');
  // Online opens with the delivery desk itself, so Deliveries needs no tab of its own.
  const desk=document.createElement('button');desk.type='button';desk.className='shop-desk';desk.hidden=true;
  desk.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 10h7l1.5 3.5h-10zM8.5 10 5 7m10.5 3L19 7M8.5 13.5 5 17m10.5-3.5L19 17M2 7h6m8 0h6M2 17h6m8 0h6"/></svg><span class="shop-desk-copy"><em>Delivery desk</em><b>Delivery desk</b><small></small></span><i class="shop-desk-count" hidden></i><span class="shop-desk-price" hidden><b></b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></span><i class="shop-desk-meter" hidden><i></i></i><svg class="shop-desk-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
  desk.onclick=()=>{if(openDeliveries)openDeliveries()};
  list.prepend(desk);
  // Below the list: one line for research that opens later, and a fold for what is maxed or closed this run.
  const later=document.createElement('p');later.className='shop-later';later.hidden=true;
  const doneToggle=document.createElement('button');doneToggle.type='button';doneToggle.className='shop-done-toggle';doneToggle.hidden=true;doneToggle.setAttribute('aria-expanded','false');
  let showDone=false;doneToggle.onclick=()=>{showDone=!showDone;render();};
  pane.prepend(header,list,later,doneToggle,empty);
  pane.append(milestone,reset);reset.hidden=true;
  // Building the delivery pad and its drones live on the Online card in Stations (the deliveries panel).
  const droneNode=document.getElementById('buyAutoDrone');if(droneNode&&droneNode.parentElement&&pane.contains(droneNode))droneNode.parentElement.hidden=true;
  let category=0;
  header.querySelectorAll('[data-shop-category]').forEach(button=>button.onclick=()=>{category=Number(button.dataset.shopCategory);showDone=false;render()});
  function render(){
    const state=getState(),affordable=false;
    let count=0,done=0;const order=[],gates={};
    header.querySelectorAll('[data-shop-category]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.shopCategory)===category)));
    rows.forEach(row=>{
      let level,max;
      if(row.id.startsWith('componentBuy')){const c=components[Number(row.id.replace('componentBuy',''))];level=state[c.key];max=c.max}
      else if(row.id==='buyAutoDrone'){level=state.autoDrone.bulk?2:state.autoDrone.owned?1:0;max=2}
      else if(row.id==='upgradeStorage'){level=state.storageLevel;max=20}
      else {level=state.globalLevel;max=BOOST_MAX}
      const key=row.id.startsWith('componentBuy')?components[Number(row.id.replace('componentBuy',''))].key:null,side=key?sideStatus(state,key):'open';
      const isDone=level>=max||side==='closed',gated=side==='gated'&&!isDone;row.node.classList.toggle('is-maxed',isDone);order.push({row,isDone});
      // Rows keep one short figure; the long states fold into the lines under the list.
      row.badge.textContent=side==='closed'?'Closed':isDone?'Max':'Lv '+level;
      row.badge.setAttribute('aria-label',side==='closed'?'Closed this run'+(level?', level '+level+' kept':''):'Level '+level);
      row.node.classList.toggle('shows-verb',side==='pick');
      // The ring around the icon fills with the level; the effect line is the tile's tooltip.
      if(row.symbol)row.symbol.style.setProperty('--lv',Math.min(1,Number.isFinite(max)&&max?level/max:0).toFixed(3));
      // Under the name: what the next level gives ("+0% → +6% seed batch" shows "+6% seed batch"), the full line as tooltip.
      const effect=row.node.querySelector('strong'),full=effect?effect.textContent.trim():'',next=full.split('→').pop().split(' · ')[0].trim();
      if(row.effect.textContent!==next)row.effect.textContent=next;row.node.title=full?row.node.querySelector('h2,b').textContent+' · '+full:'';
      const here=row.category===category;
      if(here&&gated){const gate=forkOf(key).gate+' '+categories[row.category]+' levels · '+levelsToGate(state,key)+' to go';(gates[gate]=gates[gate]||[]).push(row.node.querySelector('h2,b').textContent);}
      row.node.hidden=!here||gated||(isDone&&!showDone);
      if(here){if(isDone)done++;else if(!gated)count++}
    });
    const sequence=order.filter(o=>!o.isDone).concat(order.filter(o=>o.isDone)).map(o=>o.row);
    // Undecided forks get their label above the first side and the "or" between the two.
    const open=forkMarks.filter(m=>m.ids.every(id=>{const r=rows.find(x=>x.id===id);return r&&r.category===category&&sideStatus(state,components[Number(id.replace('componentBuy',''))].key)==='pick'}));
    const key=sequence.map(r=>r.id).join(',')+'|'+category+'|'+open.map(m=>m.fork.id).join(',');
    if(key!==render.key){render.key=key;forkMarks.forEach(m=>{m.head.remove();m.or.remove();m.end.remove()});sequence.forEach(r=>{const mark=open.find(m=>m.ids[0]===r.id),after=open.find(m=>m.ids[1]===r.id);if(mark)list.appendChild(mark.head);if(after)list.appendChild(after.or);list.appendChild(r.node);if(after)list.appendChild(after.end)})}
    desk.hidden=true;
    if(!desk.hidden){const d=deliveryDesk(),note=desk.querySelector('small'),title=desk.querySelector('b'),count=desk.querySelector('.shop-desk-count'),price=desk.querySelector('.shop-desk-price'),meter=desk.querySelector('.shop-desk-meter');
      // Unbuilt, the desk is the shelf's next step: a brass card above the list with its price and savings so far.
      const unbuilt=!d.built;desk.classList.toggle('is-unbuilt',unbuilt);desk.classList.toggle('is-short',unbuilt&&!d.ready);
      if(unbuilt&&desk.parentElement===list)list.before(desk);else if(!unbuilt&&desk.parentElement!==list)list.prepend(desk);
      title.textContent=unbuilt?(d.building?'Building the pickup window':'Build the pickup window'):'Delivery desk';
      note.textContent=unbuilt?(d.building?'Opens in '+d.clock:d.ready?'Opens web orders':'Opens web orders · '+d.toGo+' to go'):d.waiting?d.waiting+' waiting to send':'No orders waiting';
      price.hidden=meter.hidden=!unbuilt;price.firstChild.textContent=(d.building?d.clock:d.price)||'';meter.firstChild.style.width=Math.round((d.progress||0)*100)+'%';
      count.hidden=!d.built||!d.waiting;count.textContent=d.waiting;desk.setAttribute('aria-label',unbuilt?'Build the pickup window, '+d.price+', '+note.textContent:'Delivery desk, '+note.textContent)}
    const gateLines=Object.keys(gates);later.hidden=!gateLines.length;
    later.innerHTML=gateLines.map(g=>'<span><b>Opens at '+g.replace(' · ','</b> · ')+'<small>'+gates[g].join(' or ')+'</small></span>').join('');
    doneToggle.hidden=!done;doneToggle.setAttribute('aria-expanded',String(showDone));
    doneToggle.innerHTML='<span>'+(showDone?'Hide maxed and closed':'Maxed and closed')+'</span><b>'+done+'</b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(showDone?'m6 15 6-6 6 6':'m6 9 6 6 6-6')+'"/></svg>';
    empty.hidden=count>0||done>0||gateLines.length>0;
    empty.textContent='Nothing here yet.';
    // The best buy, when it is research, gets the brass price; its tab gets a brass dot. Station advice stays on the map.
    const info=recommendInfo&&recommendInfo(),forkIds=info&&info.fork?(forkMarks.find(m=>m.fork.id===info.fork)||{ids:[]}).ids:[];
    const picked=row=>!!info&&(info.fork?forkIds.indexOf(row.id)>=0:row.id===info.id);
    rows.forEach(row=>row.node.classList.toggle('is-pick',picked(row)));
    const pickTab=rows.filter(picked).map(r=>r.category)[0];
    header.querySelectorAll('[data-shop-category]').forEach(b=>b.classList.toggle('has-pick',Number(b.dataset.shopCategory)===pickTab));
  }
  function show(index){category=index;header.querySelectorAll('[data-shop-category]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.shopCategory)===index)));render();}
  function categoryOf(id){const row=rows.find(r=>r.id===id);return row?row.category:0;}
  return {render,show,categoryOf,categories};
}
