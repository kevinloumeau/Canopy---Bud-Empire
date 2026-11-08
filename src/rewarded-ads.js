// Rewarded ads: optional, never forced. The player taps "Watch ad" for a 30-minute boost or to double the welcome back
// pay, and gets the reward only when the ad was watched to the end.
//
// The native side is not wired yet: the AdMob plugin crashes the app at launch without an AdMob app id in Info.plist,
// so it lands in its own PR once Kevin has an AdMob account (and ad fill for a cannabis-themed game is tested on
// TestFlight first). Until then `available` is false outside test mode and every ad button stays hidden.
//
// Test mode: ?ads=test (or localStorage canopy-ads=test) plays a 2-second stand-in "ad" and grants the reward.
function testMode(win){
  try{if(win.location&&/[?&]ads=test\b/.test(win.location.search))return true;}catch(e){}
  try{return win.localStorage&&win.localStorage.getItem('canopy-ads')==='test';}catch(e){return false;}
}
export function createAds(win=typeof window!=='undefined'?window:null){
  const test=!!win&&testMode(win);
  return {
    available:test,
    test,
    // Resolves true only when the reward was earned.
    async show(){
      if(!test)return false;
      const doc=win.document,veil=doc.createElement('div');veil.className='ad-standin';veil.setAttribute('role','status');veil.textContent='Test ad';doc.body.append(veil);
      await new Promise(r=>setTimeout(r,2000));veil.remove();return true;
    },
  };
}
