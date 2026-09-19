// Keep keyboard interaction inside an open modal and return focus to its opener.
const roots=[];
function syncBackground(){
  const app=document.querySelector('.app'),active=roots.some(root=>!root.hidden);
  if(app){app.inert=active;if(active)app.setAttribute('aria-hidden','true');else app.removeAttribute('aria-hidden');}
}
export function manageDialog(root,close) {
  roots.push(root);
  let wasOpen=false,opener=null,lastOutside=document.activeElement;
  const focusables=()=>Array.from(root.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,[tabindex="0"]')).filter(el=>el.getClientRects().length);
  document.addEventListener('focusin',event=>{if(!root.contains(event.target))lastOutside=event.target;});
  function sync(){
    const open=!root.hidden;
    syncBackground();
    if(open&&!wasOpen){opener=lastOutside;const first=focusables()[0];if(first&&!root.contains(document.activeElement))first.focus({preventScroll:true});}
    if(!open&&wasOpen&&opener?.isConnected&&opener.getClientRects().length)opener.focus({preventScroll:true});
    wasOpen=open;
  }
  root.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&close){event.preventDefault();event.stopPropagation();close();return;}
    if(event.key!=='Tab')return;
    const items=focusables(),first=items[0],last=items[items.length-1];
    if(!first){event.preventDefault();return;}
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['hidden']});sync();
}
