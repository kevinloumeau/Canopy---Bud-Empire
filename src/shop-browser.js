import {BOOST_MAX} from './depth.js';
// Reuse the original purchase nodes so prices, handlers and saves remain authoritative.
export function mountShopBrowser({getState,components,kiosks,queueLimit,recommend}) {
  const pane=document.querySelector('[data-pane="boosts"]');
  pane.classList.add('shop-browser');
  const categories=['Production','Service','Customers','Products','Online'];
  // Six upgrades per shelf: Production, Service, Customers, Products, Online.
  const definitions=[['upgradeStorage',0],['boost',0],['componentBuy10',0],['componentBuy11',0],['componentBuy12',0],['componentBuy13',0],
    ['buyKiosk',1],['componentBuy1',1],['componentBuy2',1],['componentBuy5',1],['componentBuy8',1],['componentBuy14',1],
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
  recommendation.innerHTML='<span><small>RECOMMENDED · BOTTLENECK</small><strong></strong></span><span aria-hidden="true">↗</span>';
  recommendation.onclick=()=>recommend(true);
  const list=document.createElement('div');list.className='shop-items';
  const empty=document.createElement('p');empty.className='shop-empty';empty.textContent='Nothing affordable here yet. Turn off the filter to see what’s next.';
  const milestone=pane.querySelector('.shop-milestone'),reset=pane.querySelector('.shop-reset');
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
      else if(row.id==='buyKiosk'){level=kiosks();max=3}
      else if(row.id==='upgradeStorage'){level=state.storageLevel;max=20}
      else if(row.id==='upgradeQueue'){level=queueLimit();max=30}
      else {level=state.globalLevel;max=BOOST_MAX}
      // Maxed-out upgrades stay in the grid, greyed, and sink to the end of their category.
      const isDone=level>=max;row.node.classList.toggle('is-maxed',isDone);order.push({row,isDone});
      row.badge.textContent=row.id==='buyAutoDrone'?(isDone?'Bulk installed · controls in Deliveries':level===1?'Single installed · bulk available':'One-time upgrade'):row.id==='upgradeQueue'?level+'/30 places':row.id==='buyKiosk'?level+'/3 installed':'Lv '+level+(Number.isFinite(max)?'/'+max:'');
      row.node.hidden=row.category!==category||(!isDone&&affordable&&row.button.disabled);
      if(row.category===category){if(isDone)done++;else if(!row.node.hidden)count++}
    });
    const sequence=order.filter(o=>!o.isDone).concat(order.filter(o=>o.isDone)).map(o=>o.row);
    const key=sequence.map(r=>r.id).join(',');if(key!==render.key){render.key=key;sequence.forEach(r=>list.appendChild(r.node))}
    empty.hidden=count>0||done>0;
    empty.textContent='Nothing here yet.';
    recommendation.querySelector('strong').textContent=recommend(false);
  }
  function show(index){category=index;header.querySelectorAll('[data-shop-category]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.shopCategory)===index)));render();}
  return {render,show};
}
