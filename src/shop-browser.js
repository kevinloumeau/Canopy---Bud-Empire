import {BOOST_MAX} from './depth.js';
// Reuse the original purchase nodes so prices, handlers and saves remain authoritative.
export function mountShopBrowser({getState,components,kiosks,queueLimit,recommend,recommendInfo,openDeliveries,deliveryDesk}) {
  const pane=document.querySelector('[data-pane="boosts"]');
  pane.classList.add('shop-browser');
  const categories=['Production','Service','Customers','Products','Online'];
  // Keep related upgrades on the same shelf; the Service shelf includes counter expansion.
  const definitions=[['upgradeStorage',0],['boost',0],['componentBuy10',0],['componentBuy11',0],['componentBuy12',0],['componentBuy13',0],['componentBuy25',0],
    ['buyKiosk',1],['componentBuy5',1],['buyOrderCounter',1],['componentBuy1',1],['componentBuy2',1],['componentBuy8',1],['componentBuy14',1],
    ['upgradeQueue',2],['componentBuy0',2],['componentBuy7',2],['componentBuy15',2],['componentBuy16',2],['componentBuy17',2],
    ['componentBuy3',3],['componentBuy4',3],['componentBuy18',3],['componentBuy19',3],['componentBuy20',3],['componentBuy21',3],
    ['buyAutoDrone',4],['componentBuy9',4],['componentBuy6',4],['componentBuy22',4],['componentBuy23',4],['componentBuy24',4]];
  const rows=definitions.map(([id,category])=>{
    const button=document.getElementById(id),node=button.parentElement;
    node.classList.add('shop-item');
    const copy=node.querySelector('.shop-copy,.storage-copy'),badge=document.createElement('span');
    badge.className='shop-level';copy.append(badge);
    button.setAttribute('aria-label',copy.querySelector('h2,b').textContent+' upgrade');
    return {id,category,node,button,badge};
  });
  const header=document.createElement('div');header.className='shop-browser-header';
  const icons={Production:'<path d="M4 8h16v11H4zM4 8l3-4h10l3 4M12 4v4"/>',Service:'<path d="M4 17h16M6 17a6 6 0 0 1 12 0M12 8v3M10 8h4"/>',Customers:'<circle cx="9" cy="8" r="3"/><circle cx="16" cy="9" r="2.4"/><path d="M3 20a6 6 0 0 1 12 0M13 20a4.5 4.5 0 0 1 8 0"/>',Products:'<path d="M12 21c-4.5-2.5-7-6-7-10a7 7 0 0 1 14 0c0 4-2.5 7.5-7 10ZM12 21V9"/>',Online:'<path d="M9 10h6v4H9zM4 6h3M17 6h3M5.5 6v4h3.5M18.5 6v4H15M9 14l-3 5M15 14l3 5M12 14v6"/>'};
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
      const isDone=level>=max,kioskPair=row.id==='buyKiosk'||row.id==='componentBuy5';row.node.classList.toggle('is-maxed',isDone);order.push({row,isDone:isDone&&!kioskPair});
      row.badge.textContent=row.id==='buyAutoDrone'?(isDone?'Bulk installed · controls in Delivery desk':level===1?'Single installed · bulk available':'One-time upgrade'):row.id==='buyOrderCounter'?level+'/3 staffed':row.id==='upgradeQueue'?level+'/30 places':row.id==='buyKiosk'?level+'/3 installed':'Lv '+level+(Number.isFinite(max)?'/'+max:'');
      row.node.hidden=row.category!==category||(!isDone&&affordable&&row.button.disabled);
      if(row.category===category){if(isDone)done++;else if(!row.node.hidden)count++}
    });
    const sequence=order.filter(o=>!o.isDone).concat(order.filter(o=>o.isDone)).map(o=>o.row);
    const key=sequence.map(r=>r.id).join(',');if(key!==render.key){render.key=key;sequence.forEach(r=>list.appendChild(r.node))}
    desk.hidden=category!==4||!deliveryDesk;
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
      rows.forEach(row=>row.node.classList.toggle('is-pick',row.id===info.id));
    }else recommendation.querySelector('strong').textContent=recommend(false);
  }
  function show(index){category=index;header.querySelectorAll('[data-shop-category]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.shopCategory)===index)));render();}
  function categoryOf(id){const row=rows.find(r=>r.id===id);return row?row.category:0;}
  return {render,show,categoryOf};
}
