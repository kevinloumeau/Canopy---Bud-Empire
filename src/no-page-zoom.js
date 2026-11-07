// The page never zooms. A double tap on the menu used to blow the whole web view up and push the UI off the right
// edge. The viewport meta and `touch-action` in ui.css stop it in the browser; these listeners cover WebKit's own
// pinch (gesturestart) and dblclick zoom paths. The map is unaffected: it reads pointer events, which still fire.
export function installNoPageZoom(doc=globalThis.document){
 if(!doc||doc.__noPageZoom)return false;
 doc.__noPageZoom=true;
 const stop=event=>{if(event.cancelable)event.preventDefault()};
 for(const type of ['gesturestart','gesturechange','gestureend'])doc.addEventListener(type,stop,{passive:false});
 doc.addEventListener('dblclick',stop,{passive:false});
 return true;
}
