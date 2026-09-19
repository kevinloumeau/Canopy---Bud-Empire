// Settings sheet: one gear in the HUD gathers sound, lighting, the start guide and reset, which used to sit at the bottom of the Shop tab.
import {manageDialog} from './dialog-focus.js';
export function mountSettings({getState,setSpeed}){
 const $=id=>document.getElementById(id);
 const gear=document.createElement('button');gear.type='button';gear.id='settingsOpen';gear.setAttribute('aria-label','Settings');gear.setAttribute('aria-haspopup','dialog');gear.title='Settings';
 gear.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h9m4 0h3M4 12h3m4 0h9M4 17h11m4 0h1"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
 document.querySelector('.speed-controls').appendChild(gear);
 const wrap=document.createElement('div');wrap.className='modal-wrap settings-wrap';wrap.id='settingsModal';wrap.hidden=true;
 wrap.innerHTML='<div class="modal settings" role="dialog" aria-modal="true" aria-labelledby="settingsTitle"><div class="settings-head"><h2 id="settingsTitle">Settings</h2><button type="button" class="settings-close" aria-label="Close settings">×</button></div>'+
  '<div class="settings-list">'+
  '<button type="button" class="settings-row" data-proxy="pause"><span>Game</span><b data-mirror="pause"></b></button>'+
  '<button type="button" class="settings-row" data-proxy="soundToggle"><span>Sound</span><b data-mirror="soundToggle"></b></button>'+
  '<button type="button" class="settings-row" data-proxy="lightToggle"><span>Lighting</span><b data-mirror="lightToggle"></b></button>'+
  '<button type="button" class="settings-row" data-proxy="guide"><span>Start guide</span><b>Replay</b></button>'+
  '</div><div class="settings-foot"><button type="button" class="settings-row settings-danger" data-proxy="resetOpen"><span>Start over</span><b>Reset everything</b></button><p class="settings-note">Canopy: Bud Empire · saves in this browser</p></div></div>';
 document.body.append(wrap);
 const modal=wrap.querySelector('.modal'),closeButton=wrap.querySelector('.settings-close');
 let opener=null;
 function sync(){
  const sound=$('soundToggle'),light=$('lightToggle');
  const state=getState();
  wrap.querySelector('[data-mirror=pause]').textContent=state.gameSpeed===0?'Paused · resume':'Playing · pause';
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
  if(key==='pause'){setSpeed(getState().gameSpeed===0?1:0);sync();return;}
  if(key==='guide'){close();const replay=document.querySelector('.guide-replay');if(replay)replay.click();return;}
  if(key==='resetOpen'){close();const reset=$('resetOpen');if(reset)reset.click();return;}
  const target=$(key);if(target)target.click();setTimeout(sync,0);
 });
 manageDialog(wrap,close);
 setInterval(()=>{if(!document.hidden&&!wrap.hidden)sync();},500);
 return {open,close};
}
