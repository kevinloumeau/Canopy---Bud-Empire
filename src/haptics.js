// Haptics: one helper for every buzz in the game.
// WKWebView has no navigator.vibrate, so inside the iPhone app the game posts {kind} to the native `canopyHaptic`
// handler (ios/App/App/CanopyViewController.swift), which plays a real Taptic Engine tick. Android browsers fall back
// to navigator.vibrate; iPhone Safari has neither, so nothing happens there.
// Three weights: select (tabs, station picks), light (buys), firm (new looks, finished builds, shop opening, rewards).
// A firm buzz swallows lighter ones fired just after it, so one Collect that claims several rewards, or a buy that
// also finishes a build, is felt once. Reduced motion drops the select ticks, which only decorate navigation.
const VIBRATE={select:8,light:14,firm:22};
const RANK={select:0,light:1,firm:2};
const SAME_GAP=60,FIRM_SHADOW=180;
export function hapticBridge(win){
 const h=win&&win.webkit&&win.webkit.messageHandlers&&win.webkit.messageHandlers.canopyHaptic;
 if(h&&typeof h.postMessage==='function')return kind=>h.postMessage({kind});
 const nav=win&&win.navigator;
 if(nav&&typeof nav.vibrate==='function')return kind=>nav.vibrate(VIBRATE[kind]);
 return null;
}
export function makeHaptics(options){
 const o=options||{},send=o.send!==undefined?o.send:hapticBridge(typeof window!=='undefined'?window:null);
 const now=o.now||(()=>Date.now()),enabled=o.enabled||(()=>true),reduced=o.reducedMotion||(()=>false);
 let lastKind=null,lastAt=-Infinity,firmAt=-Infinity;
 function play(kind){
  if(!send||!(kind in RANK)||!enabled())return false;
  if(kind==='select'&&reduced())return false;
  const t=now();
  if(kind===lastKind&&t-lastAt<SAME_GAP)return false;
  if(RANK[kind]<RANK.firm&&t-firmAt<FIRM_SHADOW)return false;
  lastKind=kind;lastAt=t;if(kind==='firm')firmAt=t;
  try{send(kind)}catch(e){return false}
  return true;
 }
 play.available=!!send;
 return play;
}
