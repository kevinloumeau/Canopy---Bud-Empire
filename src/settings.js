// Settings sheet: one gear in the HUD gathers sound, lighting, the start guide and reset, which used to sit at the bottom of the Shop tab.
export function mountSettings(){
 const $=id=>document.getElementById(id);
 const gear=document.createElement('button');gear.type='button';gear.id='settingsOpen';gear.setAttribute('aria-label','Settings');gear.setAttribute('aria-haspopup','dialog');gear.title='Settings';
 gear.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3m0 13v3M4.2 6.2l2.1 2.1m11.4 11.4 2.1 2.1M2.5 12h3m13 0h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1"/></svg>';
 document.querySelector('.speed-controls').appendChild(gear);
 const wrap=document.createElement('div');wrap.className='modal-wrap settings-wrap';wrap.id='settingsModal';wrap.hidden=true;
 wrap.innerHTML='<div class="modal settings" role="dialog" aria-modal="true" aria-labelledby="settingsTitle"><div class="settings-head"><h2 id="settingsTitle">Settings</h2><button type="button" class="settings-close" aria-label="Close settings">×</button></div>'+
  '<div class="settings-list">'+
  '<button type="button" class="settings-row" data-proxy="soundToggle"><span>Sound</span><b data-mirror="soundToggle"></b></button>'+
  '<button type="button" class="settings-row" data-proxy="lightToggle"><span>Lighting</span><b data-mirror="lightToggle"></b></button>'+
  '<button type="button" class="settings-row" data-proxy="guide"><span>Start guide</span><b>Replay</b></button>'+
  '</div><div class="settings-foot"><button type="button" class="settings-row settings-danger" data-proxy="resetOpen"><span>Start over</span><b>Reset everything</b></button><p class="settings-note">Canopy: Bud Empire · saves in this browser</p></div></div>';
 document.body.append(wrap);
 const modal=wrap.querySelector('.modal'),closeButton=wrap.querySelector('.settings-close');
 let opener=null;
 function sync(){
  const sound=$('soundToggle'),light=$('lightToggle');
  wrap.querySelector('[data-mirror=soundToggle]').textContent=sound?(sound.textContent.replace('Sound ','')==='on'?'On':'Off'):'';
  wrap.querySelector('[data-mirror=lightToggle]').textContent=light?(light.getAttribute('aria-pressed')==='true'?'Night':'Day'):'';
 }
 function open(){opener=document.activeElement;sync();wrap.hidden=false;closeButton.focus();}
 function close(){wrap.hidden=true;if(opener&&opener.focus)opener.focus();}
 gear.onclick=open;closeButton.onclick=close;
 wrap.addEventListener('click',e=>{if(e.target===wrap)close();});
 wrap.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close();}});
 wrap.querySelectorAll('[data-proxy]').forEach(button=>button.onclick=()=>{
  const key=button.dataset.proxy;
  if(key==='guide'){close();const replay=document.querySelector('.guide-replay');if(replay)replay.click();return;}
  if(key==='resetOpen'){close();const reset=$('resetOpen');if(reset)reset.click();return;}
  const target=$(key);if(target)target.click();setTimeout(sync,0);
 });
 setInterval(()=>{if(!wrap.hidden)sync();},500);
 return {open,close};
}
