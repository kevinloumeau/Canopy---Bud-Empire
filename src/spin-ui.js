// The lucky spin's screen: one glass dialog like the store. The wheel is an SVG with each slice as wide as its odds,
// the odds listed under it, then the free spin button (cream, the dialog's one main action) and the ad spin under it.
// Rules live in spin.js; main.js pays the prize through `pay`.
import {manageDialog} from './dialog-focus.js';
import {tieLast} from './no-lone-words.js';
import {PRIZES,sliceAngles,landingTurn,rollPrize,takeSpin,freeReady,adSpinsLeft,nextFreeIn,spinClock,prizeById} from './spin.js';
import {adsLeft,countAd,dayNumber} from './store.js';

const PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5Z"/></svg>';
// Slice colours: forest tones that take turns, the rare prizes lighter so they read as special. Never brass (brass is
// the next buy's).
const COLOURS={cash10:'#2c6a49',boost15:'#3b8a5f',coffee:'#245a3d',cash30:'#4a9c6e',token1:'#2f7351',token3:'#8fd3a8',jackpot:'#f1e3b8'};
const INK={token3:'#123020',jackpot:'#123020'};
function wheelSvg(){const R=100,c=110;let paths='',labels='';
  sliceAngles().forEach(sl=>{const p=prizeById(sl.id),a0=(sl.start-90)*Math.PI/180,a1=(sl.end-90)*Math.PI/180,sweep=sl.end-sl.start;
    const x0=c+R*Math.cos(a0),y0=c+R*Math.sin(a0),x1=c+R*Math.cos(a1),y1=c+R*Math.sin(a1);
    paths+='<path d="M'+c+' '+c+'L'+x0.toFixed(2)+' '+y0.toFixed(2)+'A'+R+' '+R+' 0 '+(sweep>180?1:0)+' 1 '+x1.toFixed(2)+' '+y1.toFixed(2)+'Z" fill="'+COLOURS[sl.id]+'"/>';
    if(sweep>=7){const mid=(sl.start+sl.end)/2,m=(mid-90)*Math.PI/180,r=sweep>=25?R*.64:R*.8,tx=c+r*Math.cos(m),ty=c+r*Math.sin(m),rot=mid>90&&mid<270?mid+180:mid;
      labels+='<text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" transform="rotate('+rot.toFixed(1)+' '+tx.toFixed(1)+' '+ty.toFixed(1)+')" fill="'+(INK[sl.id]||'#f3f0e4')+'" font-size="'+(sweep>=50?13:11)+'">'+p.slice+'</text>';}});
  const lines=sliceAngles().map(sl=>{const a=(sl.start-90)*Math.PI/180;return '<path d="M'+c+' '+c+'L'+(c+R*Math.cos(a)).toFixed(2)+' '+(c+R*Math.sin(a)).toFixed(2)+'"/>';}).join('');
  return '<svg class="spin-wheel" viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="108" class="spin-rim"/><g class="spin-turn">'+paths+'<g class="spin-lines">'+lines+'</g><g class="spin-labels">'+labels+'</g></g>'+
    '<circle cx="110" cy="110" r="17" class="spin-hub"/><path class="spin-leaf" d="M110 121c-.4-3.6-.1-6.4 1-8.5 1.6-2.9 4.6-4.5 8-4.9-.2 3.7-1.7 6.5-4.7 8-1.4.7-2.8 1-4.3 1m-1-1.6c-2.6-.1-4.7-1-6.2-2.7-1.2-1.4-1.8-3.2-1.8-5.3 2.3 0 4.3.6 5.8 1.9 1.4 1.3 2.1 3.2 2.2 6.1"/></svg>';}

export function mountSpin({getState,ads,format,incomeRate,pay,changed,notify,haptic,sound=()=>{},now=()=>Date.now(),random=Math.random}){
  const spin=()=>getState().store.spin,store=()=>getState().store;
  const wrap=document.createElement('div');wrap.className='modal-wrap store-wrap spin-wrap';wrap.id='spinModal';wrap.hidden=true;
  wrap.innerHTML='<div class="modal store spin" role="dialog" aria-modal="true" aria-labelledby="spinTitle">'+
    '<div class="store-head"><h2 id="spinTitle">Lucky spin</h2><button type="button" class="store-close" aria-label="Close the lucky spin">×</button></div>'+
    '<div class="spin-stage"><span class="spin-pointer" aria-hidden="true"></span>'+wheelSvg()+'</div>'+
    '<p class="spin-result" id="spinResult" role="status" aria-live="polite"></p>'+
    '<ul class="spin-odds" aria-label="Prizes and their odds">'+PRIZES.map(p=>'<li><i style="background:'+COLOURS[p.id]+'"></i><span>'+tieLast(p.name)+'</span><b>'+p.odds+'%</b></li>').join('')+'</ul>'+
    '<button type="button" class="spin-free" id="spinFree"></button>'+
    '<button type="button" class="store-ad spin-ad" id="spinAd" hidden>'+PLAY+'<span></span><small></small></button>'+
    '<p class="spin-note" id="spinNote"></p>'+
  '</div>';
  document.body.append(wrap);
  const $=sel=>wrap.querySelector(sel),turn=$('.spin-turn');
  let busy=false,angle=0,opener=null,result='';
  function close(){if(busy)return;wrap.hidden=true;result='';if(opener&&opener.focus)opener.focus();}
  function open(){opener=document.activeElement;render();wrap.hidden=false;$('.store-close').focus();}
  $('.store-close').onclick=close;wrap.addEventListener('click',e=>{if(e.target===wrap)close();});manageDialog(wrap,close);
  function still(){return !!(window.__canopySnap||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches));}
  // Turns the wheel to the prize, then pays it.
  function play(prize){busy=true;result='';render();sound('start');
    const target=landingTurn(prize.id,random(),still()?0:6),base=angle-angle%360;angle=base+360+target;
    const ms=still()?0:3600;turn.style.transition=ms?'transform '+ms+'ms cubic-bezier(.12,.72,.16,1)':'none';turn.style.transform='rotate('+angle+'deg)';
    setTimeout(()=>{busy=false;const got=pay(prize);spin().last=prize.id;result=got||prize.name;changed();haptic('firm');render();},ms+80);}
  $('#spinFree').onclick=()=>{const t=now();if(busy||!takeSpin(spin(),t,'free'))return;play(rollPrize(random()));};
  $('#spinAd').onclick=async()=>{const t=now(),day=dayNumber(t);if(busy||!ads.available||adSpinsLeft(spin(),day)<1||adsLeft(store(),day)<1)return;
    busy=true;render();const ok=await ads.show();busy=false;
    if(ok&&countAd(store(),dayNumber(now()))&&takeSpin(spin(),now(),'ad',dayNumber(now())))play(rollPrize(random()));else render();};
  function set(el,prop,value){if(el[prop]!==value)el[prop]=value;}
  function render(){if(wrap.hidden&&!busy)return;const s=spin(),t=now(),day=dayNumber(t),ready=freeReady(s,t);
    const adLeft=Math.min(adSpinsLeft(s,day),adsLeft(store(),day)),free=$('#spinFree'),ad=$('#spinAd');
    set(free,'textContent',busy?'Spinning…':ready?(s.free>1?'Free spin · 2 ready':'Free spin'):'Next free spin in '+spinClock(nextFreeIn(s,t)));
    free.disabled=busy||!ready;free.classList.toggle('is-wait',!ready);
    ad.hidden=!ads.available;ad.disabled=busy||adLeft<1;
    set(ad.querySelector('span'),'textContent',adLeft<1?'No more ad spins today':(ads.free?'Free spin':'Spin with an ad'));
    set(ad.querySelector('small'),'textContent',adLeft<1?'':'· '+adLeft+' left today');
    set($('#spinResult'),'innerHTML',result?'You won <b>'+tieLast(result)+'</b>':'');
    set($('#spinNote'),'textContent',ready?'One free spin every 8 hours. Spins can’t be bought.':'Free spins come every 8 hours. Spins can’t be bought.');}
  setInterval(()=>{if(!wrap.hidden&&!busy)render();},1000);
  return {open,close,render};
}
