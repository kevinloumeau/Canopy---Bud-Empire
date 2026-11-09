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
// Kevin's clay art (2026-11-09, public/icons/spin): the rim, pointer and hub stay still around the turning slices, and
// each prize's icon rides on its slice. The slices themselves stay drawn here, each as wide as its odds.
const ART='icons/spin/',ICON={cash10:'coins',cash30:'coins',boost15:'double',coffee:'coffee',token1:'boost1',token3:'boost3',jackpot:'jackpot'};
const LABEL={cash10:'10 min',cash30:'30 min',boost15:'15 min'};
export function prizeIcon(id){return ART+ICON[id]+'.webp';}
// The rim picture's ring centre and size in the 220-unit wheel (measured off the art: outer radius 108, opening 82).
const RIM={x:2.16,y:-1.25,w:216.3,h:220.9},R=86,c=110;
function wheelSvg(){let paths='',art='';
  sliceAngles().forEach(sl=>{const a0=(sl.start-90)*Math.PI/180,a1=(sl.end-90)*Math.PI/180,sweep=sl.end-sl.start;
    const x0=c+R*Math.cos(a0),y0=c+R*Math.sin(a0),x1=c+R*Math.cos(a1),y1=c+R*Math.sin(a1);
    paths+='<path d="M'+c+' '+c+'L'+x0.toFixed(2)+' '+y0.toFixed(2)+'A'+R+' '+R+' 0 '+(sweep>180?1:0)+' 1 '+x1.toFixed(2)+' '+y1.toFixed(2)+'Z" fill="'+COLOURS[sl.id]+'"/>';
    // The icon as big as the slice allows at its radius (none on a sliver), the time beside it on the wide slices. The
    // icons are clay objects, so they stay upright as the wheel turns (play() counter-turns them).
    const mid=(sl.start+sl.end)/2,label=LABEL[sl.id]&&sweep>=50,r=label?R*.5:R*.66,size=Math.min(28,2*Math.PI*r*sweep/360*.72);
    if(size<12)return;
    const m=(mid-90)*Math.PI/180,tx=c+r*Math.cos(m),ty=c+r*Math.sin(m);
    art+='<image class="spin-icon" href="'+prizeIcon(sl.id)+'" x="'+(tx-size/2).toFixed(1)+'" y="'+(ty-size/2).toFixed(1)+'" width="'+size.toFixed(1)+'" height="'+size.toFixed(1)+'"/>';
    if(label){const lr=R*.8,lx=c+lr*Math.cos(m),ly=c+lr*Math.sin(m),rot=mid>90&&mid<270?mid+180:mid;
      art+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" transform="rotate('+rot.toFixed(1)+' '+lx.toFixed(1)+' '+ly.toFixed(1)+')" fill="'+(INK[sl.id]||'#f3f0e4')+'" font-size="10.5">'+LABEL[sl.id]+'</text>';}});
  const lines=sliceAngles().map(sl=>{const a=(sl.start-90)*Math.PI/180;return '<path d="M'+c+' '+c+'L'+(c+R*Math.cos(a)).toFixed(2)+' '+(c+R*Math.sin(a)).toFixed(2)+'"/>';}).join('');
  return '<svg class="spin-wheel" viewBox="0 0 220 220" aria-hidden="true"><g class="spin-turn">'+paths+'<g class="spin-lines">'+lines+'</g><g class="spin-art">'+art+'</g></g>'+
    '<image class="spin-rim" href="'+ART+'rim.webp" x="'+RIM.x+'" y="'+RIM.y+'" width="'+RIM.w+'" height="'+RIM.h+'"/>'+
    '<image class="spin-hub" href="'+ART+'hub.webp" x="'+(c-21)+'" y="'+(c-21.4)+'" width="42" height="42.8"/></svg>';}

export function mountSpin({getState,ads,format,incomeRate,pay,changed,notify,haptic,sound=()=>{},now=()=>Date.now(),random=Math.random}){
  const spin=()=>getState().store.spin,store=()=>getState().store;
  const wrap=document.createElement('div');wrap.className='modal-wrap store-wrap spin-wrap';wrap.id='spinModal';wrap.hidden=true;
  wrap.innerHTML='<div class="modal store spin" role="dialog" aria-modal="true" aria-labelledby="spinTitle">'+
    '<div class="store-head"><h2 id="spinTitle">Lucky spin</h2><button type="button" class="store-close" aria-label="Close the lucky spin">×</button></div>'+
    '<div class="spin-stage"><img class="spin-pointer" src="'+ART+'pointer.webp" alt="" draggable="false">'+wheelSvg()+'</div>'+
    '<p class="spin-result" id="spinResult" role="status" aria-live="polite"></p>'+
    // The odds sit behind a small "Odds" link under the buttons (Kevin, 2026-11-09: the list was too much on show); the
    // slices are still drawn as wide as their odds.
    '<ul class="spin-odds" id="spinOdds" aria-label="Prizes and their odds" hidden>'+PRIZES.map(p=>'<li><img src="'+prizeIcon(p.id)+'" alt="" draggable="false"><span>'+tieLast(p.name)+'</span><b>'+p.odds+'%</b></li>').join('')+'</ul>'+
    '<button type="button" class="spin-free" id="spinFree"></button>'+
    '<button type="button" class="store-ad spin-ad" id="spinAd" hidden>'+PLAY+'<span></span><small></small></button>'+
    '<p class="spin-note"><span id="spinNote"></span>&nbsp;<button type="button" class="spin-odds-link" id="spinOddsLink" aria-expanded="false" aria-controls="spinOdds">Odds</button></p>'+
  '</div>';
  document.body.append(wrap);
  const $=sel=>wrap.querySelector(sel),turn=$('.spin-turn');
  let busy=false,angle=0,opener=null,result='';
  function close(){if(busy)return;wrap.hidden=true;result='';if(opener&&opener.focus)opener.focus();}
  function open(){opener=document.activeElement;render();wrap.hidden=false;$('.store-close').focus();}
  $('#spinOddsLink').onclick=()=>{const list=$('#spinOdds'),open=list.hidden;list.hidden=!open;$('#spinOddsLink').setAttribute('aria-expanded',String(open));$('#spinOddsLink').textContent=open?'Hide odds':'Odds';};
  $('.store-close').onclick=close;wrap.addEventListener('click',e=>{if(e.target===wrap)close();});manageDialog(wrap,close);
  function still(){return !!(window.__canopySnap||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches));}
  // Turns the wheel to the prize, then pays it.
  function play(prize){busy=true;result='';render();sound('start');
    const target=landingTurn(prize.id,random(),still()?0:6),base=angle-angle%360;angle=base+360+target;
    const ms=still()?0:3600;turn.style.transition=ms?'transform '+ms+'ms cubic-bezier(.12,.72,.16,1)':'none';turn.style.transform='rotate('+angle+'deg)';
    turn.querySelectorAll('.spin-icon').forEach(el=>{el.style.transition=turn.style.transition;el.style.transform='rotate('+(-angle)+'deg)';});
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
