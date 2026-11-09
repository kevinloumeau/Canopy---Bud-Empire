// The store screen: a bag button beside the goals flag opens one glass dialog over the dimmed map. The 2× boost card
// leads (the one brass button: claim the free boost, else use a token), then the four packs as 3D icon tiles in a 2×2
// grid, then Restore purchases. Rules live in store.js and the App Store bridge in purchases.js.
import {manageDialog} from './dialog-focus.js';
import {tieLast} from './no-lone-words.js';
import {PRODUCTS,BOOST_SECONDS,AD_BOOST_SECONDS,JAR_MAX,JAR_MIN,boostLeft,boostRoom,useToken,claimGift,giftReady,addBoost,adsLeft,countAd,dayNumber,forSale,grantPurchase,storeBadge,boostClock,jarTokens} from './store.js';
import {freeReady,adSpinsLeft,nextFreeIn,spinClock} from './spin.js';

const BAG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2Z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>';
const PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5Z"/></svg>';
const WHEEL='<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#1d4a31" stroke="#e9d9a8" stroke-width="2"/><path d="M20 20V3.5A16.5 16.5 0 0 1 35.7 15Z" fill="#4a9c6e"/><path d="M20 20 35.7 15A16.5 16.5 0 0 1 29.7 33.3Z" fill="#2c6a49"/><path d="M20 20 29.7 33.3A16.5 16.5 0 0 1 6 29Z" fill="#3b8a5f"/><path d="M20 20 6 29A16.5 16.5 0 0 1 20 3.5Z" fill="#245a3d"/><circle cx="20" cy="20" r="4" fill="#e9d9a8"/><path d="M16.5 1.5h7L20 7Z" fill="#e9d9a8"/></svg>';
const CHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
// Each pack: its 3D icon (reused from the Goals and Research art), a count chip for the token packs, and one short line
// on what it does.
const LOOKS={
  adfree:{icon:'goal-screen',line:'Every ad reward, no ad'},
  tipjar:{icon:'goal-coin',line:'Fills as you play'},
  starter:{icon:'goal-gift',line:'3 boosts + 2 h of sales'},
  double:{icon:'goal-star',line:'Every dollar, for good'},
  boosts5:{icon:'research-boost',count:'×5',line:'10 hours of 2×'},
  boosts20:{icon:'research-boost',count:'×20',line:'40 hours of 2×'},
};
// The 2×2 grid; the two boost packs share one row under it.
const TILES=['adfree','tipjar','starter','double'],ROW=['boosts5','boosts20'];
export function mountStore({getState,purchases,ads,format,incomeRate,changed,notify,haptic,openSpin=()=>{},now=()=>Date.now()}){
  const store=()=>getState().store;
  const button=document.createElement('button');button.type='button';button.id='storeOpen';button.title='Store';button.setAttribute('aria-label','Open the store');button.setAttribute('aria-haspopup','dialog');
  button.innerHTML=BAG+'<span id="storeBadge" hidden></span>';
  const goals=document.getElementById('goalsOpen');(goals?goals.parentElement:document.querySelector('.hud')).insertBefore(button,goals?goals.nextSibling:null);
  const wrap=document.createElement('div');wrap.className='modal-wrap store-wrap';wrap.id='storeModal';wrap.hidden=true;
  wrap.innerHTML='<div class="modal store" role="dialog" aria-modal="true" aria-labelledby="storeTitle">'+
    '<div class="store-head"><h2 id="storeTitle">Store</h2><button type="button" class="store-close" aria-label="Close the store">×</button></div>'+
    '<section class="store-boost" aria-labelledby="storeBoostTitle">'+
      '<div class="store-boost-art"><svg class="store-ring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29"/><circle class="store-ring-fill" cx="32" cy="32" r="29" pathLength="100"/></svg><img src="icons/3d/research-boost.png" alt="" draggable="false" decoding="async"></div>'+
      '<div class="store-boost-text"><h3 id="storeBoostTitle">2× earnings</h3><p id="storeBoostState"></p></div>'+
      '<span class="store-tokens" id="storeTokens"></span>'+
      '<button type="button" class="store-use" id="storeUse"></button>'+
      '<button type="button" class="store-ad" id="storeAd" hidden>'+PLAY+'<span>Watch ad · +30 min</span><small></small></button>'+
    '</section>'+
    '<button type="button" class="store-spin" id="storeSpin"><span class="store-spin-art" aria-hidden="true">'+WHEEL+'</span><span class="store-spin-text"><b>Lucky spin</b><small id="storeSpinState"></small></span><em id="storeSpinTag"></em></button>'+
    '<ul class="store-packs" id="storePacks">'+TILES.map(key=>{const p=PRODUCTS.find(x=>x.key===key),l=LOOKS[key];return '<li><button type="button" class="store-pack" data-pack="'+key+'">'+
      '<span class="store-pack-art" aria-hidden="true"><img src="icons/3d/'+l.icon+'.png" alt="" draggable="false" decoding="async"></span>'+
      '<b>'+tieLast(p.name)+'</b><small data-line>'+tieLast(l.line)+'</small>'+(key==='tipjar'?'<span class="store-jar" aria-hidden="true"><i></i></span>':'')+'<span class="store-price"></span></button></li>';}).join('')+'</ul>'+
    '<div class="store-row"><span class="store-row-art" aria-hidden="true"><img src="icons/3d/research-boost.png" alt="" draggable="false" decoding="async"></span><span class="store-row-text"><b>Boost packs</b><small>2 h of 2× each</small></span>'+
      ROW.map(key=>'<button type="button" class="store-chip" data-pack="'+key+'"><span class="store-chip-n">'+LOOKS[key].count+'</span><span class="store-price"></span></button>').join('')+'</div>'+
    '<div class="store-foot"><button type="button" class="store-restore" id="storeRestore">Restore purchases</button><p class="store-note" id="storeNote"></p></div>'+
  '</div>';
  document.body.append(wrap);
  const $=sel=>wrap.querySelector(sel);
  let busy=null,opener=null;
  function close(){wrap.hidden=true;if(opener&&opener.focus)opener.focus();}
  function open(){opener=document.activeElement;render();wrap.hidden=false;$('.store-close').focus();purchases.load().then(render);}
  button.onclick=open;$('.store-close').onclick=close;
  wrap.addEventListener('click',e=>{if(e.target===wrap)close();});
  manageDialog(wrap,close);
  function cashFor(hours){return incomeRate()*hours*3600;}
  function give(got,quiet){
    if(!got)return false;
    if(got.cash){const s=getState();s.money+=got.cash;s.lifetime+=got.cash;}
    changed();haptic('firm');
    if(!quiet)notify(got.double?'2× SALES FOREVER':got.key==='adfree'?'AD-FREE REWARDS · NO MORE ADS':got.key==='tipjar'?'TIP JAR · +'+got.tokens+' BOOSTS':got.key==='starter'?'STARTER PACK · +'+got.tokens+' BOOSTS · +'+format(got.cash):'+'+got.tokens+' BOOSTS','upgrade');
    return true;
  }
  function use(){
    const s=store(),t=now();
    if(giftReady(s)){claimGift(s);changed();haptic('firm');notify('FREE BOOST · +1','upgrade');render();return;}
    if(s.tokens<1){const pack=$('[data-pack=boosts5]');if(pack)pack.focus();return;}
    if(!useToken(s,t)){notify('BOOST IS FULL · 12 H MAX');return;}
    changed();haptic('firm');notify('2× EARNINGS · 2 HOURS','upgrade');render();
  }
  $('#storeUse').onclick=use;
  $('#storeSpin').onclick=()=>{close();openSpin();};
  $('#storeAd').onclick=async()=>{
    const s=store(),t=now();if(busy||!ads.available||adsLeft(s,dayNumber(t))<1||boostRoom(s,t)<AD_BOOST_SECONDS)return;
    busy='ad';render();const ok=await ads.show();busy=null;
    if(ok&&countAd(s,dayNumber(now()))&&addBoost(s,now(),AD_BOOST_SECONDS)){changed();haptic('firm');notify('2× EARNINGS · 30 MIN','upgrade');}
    render();
  };
  wrap.querySelectorAll('[data-pack]').forEach(tile=>tile.onclick=async()=>{
    const key=tile.dataset.pack,p=PRODUCTS.find(x=>x.key===key),s=store();
    if(busy||!forSale(s,key))return;
    if(!purchases.available){notify('BUY IN THE CANOPY APP');return;}
    if(!purchases.ready(p.id)){notify('STORE OPENS SOON');return;}
    busy=key;render();
    const r=await purchases.buy(p.id);busy=null;
    if(r&&r.error)notify('PURCHASE DIDN’T GO THROUGH');
    else if(r)give(grantPurchase(store(),r.productId,r.txn,cashFor));
    render();
  });
  $('#storeRestore').onclick=async()=>{
    if(busy)return;busy='restore';render();
    const list=await purchases.restore();busy=null;
    if(list===null)notify('COULDN’T REACH THE APP STORE');
    else{const got=list.map(t=>grantPurchase(store(),t.productId,t.txn,cashFor)).filter(Boolean);got.forEach(g=>give(g,true));notify(got.length?'PURCHASES RESTORED':'NOTHING TO RESTORE');}
    render();
  };
  // Purchases that complete later (Ask to Buy, an interrupted buy) are granted whenever they arrive.
  purchases.listen(t=>{if(give(grantPurchase(store(),t.productId,t.txn,cashFor)))render();});
  function set(el,prop,value){if(el[prop]!==value)el[prop]=value;}
  function render(){
    const s=store(),t=now(),left=boostLeft(s,t),badge=storeBadge(s);
    const b=document.getElementById('storeBadge');set(b,'textContent',badge);set(b,'hidden',!badge);
    button.classList.toggle('has-gift',!!badge);button.classList.toggle('is-boosting',left>0);
    if(wrap.hidden)return;
    const card=$('.store-boost');card.classList.toggle('is-on',left>0);
    card.style.setProperty('--boost',(left>0?Math.min(1,left/Math.max(BOOST_SECONDS,left)):0).toFixed(3));
    set($('#storeBoostState'),'textContent',left>0?boostClock(left)+' left':s.owned.double?'On top of your 2× forever':tieLast('2 hours per boost'));
    set($('#storeTokens'),'textContent',s.tokens===1?'1 boost':s.tokens+' boosts');
    const gift=giftReady(s),use=$('#storeUse');
    set(use,'innerHTML',gift?'Claim free boost':s.tokens<1?'No boosts left':left>0?'Add 2 hours':'Start 2× boost');
    use.disabled=!gift&&(s.tokens<1||boostRoom(s,t)<BOOST_SECONDS-1);
    const ad=$('#storeAd'),adsToday=adsLeft(s,dayNumber(t));
    ad.hidden=!ads.available;ad.disabled=busy==='ad'||adsToday<1||boostRoom(s,t)<AD_BOOST_SECONDS;
    set(ad.querySelector('span'),'textContent',busy==='ad'?(ads.free?'Adding…':'Playing ad…'):adsToday<1?'Back tomorrow':(ads.free?'Free':'Watch ad')+' · +30 min');
    set(ad.querySelector('small'),'textContent',adsToday<1?'':'· '+adsToday+' left');ad.classList.toggle('is-free',!!ads.free);
    const sp=s.spin,ready=freeReady(sp,t),adSpins=ads.available?Math.min(adSpinsLeft(sp,dayNumber(t)),adsToday):0;
    set($('#storeSpinState'),'textContent',ready?(sp.free>1?'2 free spins ready':'Free spin ready'):adSpins?tieLast((ads.free?'Free':'Ad')+' spin · next free in '+spinClock(nextFreeIn(sp,t))):tieLast('Next free spin in '+spinClock(nextFreeIn(sp,t))));
    set($('#storeSpinTag'),'textContent',ready?'Free':adSpins?(ads.free?'Free':'Ad'):'');$('#storeSpin').classList.toggle('is-ready',ready);
    PRODUCTS.forEach(p=>{
      const tile=$('[data-pack='+p.key+']');if(!tile)return;
      const jar=p.key==='tipjar',owned=p.type==='nonconsumable'&&!!s.owned[p.key],filling=jar&&!forSale(s,p.key),price=tile.querySelector('.store-price');
      tile.classList.toggle('is-owned',owned);tile.classList.toggle('is-busy',busy===p.key);tile.classList.toggle('is-filling',filling);
      tile.disabled=owned||filling;
      const line=jar?(jarTokens(s)+' of '+JAR_MAX+' boosts'):LOOKS[p.key].line,small=tile.querySelector('[data-line]');if(small)set(small,'innerHTML',tieLast(line));
      if(jar)tile.style.setProperty('--jar',(s.jar/JAR_MAX).toFixed(3));
      const label=owned?CHECK+'Owned':filling?'Opens at '+JAR_MIN:busy===p.key?'…':!purchases.available?'In the app':purchases.price(p.id);
      set(price,'innerHTML',label);
      tile.setAttribute('aria-label',p.name+'. '+line+'. '+(owned?'Owned':filling?'Opens at '+JAR_MIN+' boosts':purchases.available?purchases.price(p.id):'Available in the iOS app'));
    });
    $('#storeRestore').hidden=!purchases.available||purchases.test;
    set($('#storeNote'),'textContent',purchases.test?'Test store: nothing is charged.':purchases.available?'':tieLast('Packs are sold in the iOS app.'));
  }
  setInterval(()=>{if(!document.hidden)render();},1000);
  render();
  return {open,close,render};
}
