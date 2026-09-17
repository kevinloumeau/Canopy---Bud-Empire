import {BOOST_MAX} from './depth.js';
// Reuse the original purchase nodes so prices, handlers and saves remain authoritative.
export function mountShopBrowser({getState,components,kiosks,queueLimit,recommend}) {
  const pane=document.querySelector('[data-pane="boosts"]');
  pane.classList.add('shop-browser');
  const categories=['Production','Service','Customers','Products'];
  const definitions=[['upgradeStorage',0],['boost',0],['buyKiosk',1],['buyAutoDrone',1],['componentBuy1',1],['componentBuy2',1],['componentBuy5',1],['componentBuy8',1],['upgradeQueue',2],['componentBuy0',2],['componentBuy7',2],['componentBuy3',3],['componentBuy4',3],['componentBuy6',3]];
  const rows=definitions.map(([id,category])=>{
    const button=document.getElementById(id),node=button.parentElement;
    node.classList.add('shop-item');
    const copy=node.querySelector('.shop-copy,.storage-copy'),badge=document.createElement('span');
    badge.className='shop-level';copy.append(badge);
    button.setAttribute('aria-label',copy.querySelector('h2,b').textContent+' upgrade');
    return {id,category,node,button,badge};
  });
  const header=document.createElement('div');header.className='shop-browser-header';
  header.innerHTML='<nav class="shop-categories" aria-label="Upgrade categories">'+categories.map((name,i)=>'<button type="button" data-shop-category="'+i+'" aria-pressed="'+(i===0)+'">'+name+'</button>').join('')+'</nav><div class="shop-filter"><span id="shopCount"></span><label><input id="shopAffordable" type="checkbox">Affordable</label></div>';
  const recommendation=document.createElement('button');recommendation.type='button';recommendation.className='shop-recommendation';
  recommendation.innerHTML='<span><small>RECOMMENDED · BOTTLENECK</small><strong></strong></span><span aria-hidden="true">↗</span>';
  recommendation.onclick=()=>recommend(true);
  const list=document.createElement('div');list.className='shop-items';
  const empty=document.createElement('p');empty.className='shop-empty';empty.textContent='Nothing affordable here yet. Turn off the filter to see what’s next.';
  const completed=document.createElement('details');completed.className='shop-completed';
  completed.innerHTML='<summary>Completed</summary><div></div>';
  const milestone=pane.querySelector('.shop-milestone'),reset=pane.querySelector('.shop-reset');
  pane.prepend(header,recommendation,list,empty,completed);
  pane.append(milestone,reset);
  let category=0;
  header.querySelectorAll('[data-shop-category]').forEach(button=>button.onclick=()=>{category=Number(button.dataset.shopCategory);render()});
  header.querySelector('input').onchange=render;
  function render(){
    const state=getState(),affordable=header.querySelector('input').checked;
    let count=0,done=0;
    header.querySelectorAll('[data-shop-category]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.shopCategory)===category)));
    rows.forEach(row=>{
      let level,max;
      if(row.id.startsWith('componentBuy')){const c=components[Number(row.id.replace('componentBuy',''))];level=state[c.key];max=c.max}
      else if(row.id==='buyAutoDrone'){level=state.autoDrone.bulk?2:state.autoDrone.owned?1:0;max=2}
      else if(row.id==='buyKiosk'){level=kiosks();max=3}
      else if(row.id==='upgradeStorage'){level=state.storageLevel;max=20}
      else if(row.id==='upgradeQueue'){level=queueLimit();max=20}
      else {level=state.globalLevel;max=BOOST_MAX}
      const isDone=level>=max,target=isDone?completed.lastElementChild:list;
      if(row.node.parentElement!==target){const next=rows.slice(rows.indexOf(row)+1).find(other=>other.node.parentElement===target);target.insertBefore(row.node,next?next.node:null)}
      row.badge.textContent=row.id==='buyAutoDrone'?(isDone?'Bulk installed · controls in Online':level===1?'Single installed · bulk available':'One-time upgrade'):row.id==='upgradeQueue'?level+'/20 places':row.id==='buyKiosk'?level+'/3 installed':'Lv '+level+(Number.isFinite(max)?'/'+max:'');
      row.node.hidden=row.category!==category||(!isDone&&affordable&&row.button.disabled);
      if(row.category===category){if(isDone)done++;else if(!row.node.hidden)count++}
    });
    header.querySelector('#shopCount').textContent=count+' upgrade'+(count===1?'':'s');
    empty.hidden=count>0;
    empty.textContent=affordable?'Nothing affordable here yet. Turn off the filter to see what’s next.':'All upgrades in this category are complete.';
    completed.hidden=done===0;completed.querySelector('summary').textContent='Completed · '+done;
    recommendation.querySelector('strong').textContent=recommend(false);
  }
  return {render};
}
