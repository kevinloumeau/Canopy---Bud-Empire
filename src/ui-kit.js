// The hidden component kit (?ui=kit): every shared component from components.css over a plain map-toned backdrop,
// so each reskin phase can be checked in one place before it touches a real screen. Not reachable from the game UI.
export function mountUiKit(){
  const kit=document.createElement('div');
  kit.className='ui-kit';
  kit.innerHTML=`<style>.ui-kit{position:fixed;inset:0;z-index:100;overflow:auto;padding:16px;background:linear-gradient(135deg,#d9c39a,#9cb07e 55%,#3c5a44);font-family:'Bricolage Grotesque',sans-serif}
.ui-kit section{display:grid;gap:10px;max-width:420px;margin:0 auto 16px;padding:14px;border-radius:24px}
.ui-kit .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}</style>
<section class="ui-glass"><h1 class="ui-title">Component kit</h1><p class="ui-delta">Glass A, the shared style for day and night. <a href="./" style="color:inherit">Back to the game</a></p></section>
<section class="ui-glass"><span class="ui-label">HUD</span>
 <div class="ui-hud ui-glass"><div class="ui-hud-cash"><b class="ui-mono">$1.88M</b><small class="ui-mono">+$76.2K/s</small></div><span class="ui-hud-sep"></span><span class="ui-delta">Queue <b class="ui-mono" style="color:var(--ui-ink)">18/18</b></span></div>
 <div class="row"><button class="ui-icon-button ui-glass" aria-label="Zoom in">+</button><button class="ui-icon-button ui-glass" aria-label="Zoom out">−</button><span class="ui-toast ui-glass">Line is full · upgrade the order desk</span></div></section>
<section class="ui-glass"><span class="ui-label">Map tags</span><div class="row">
 <span class="ui-tag ui-glass">Seeds</span><span class="ui-tag ui-glass is-selected has-upgrade">Grow<small class="ui-mono">Lv 30</small></span><span class="ui-tag ui-glass has-upgrade">Harvest</span><span class="ui-tag ui-glass">Lounge<small class="ui-mono">Open · $250K</small></span><span class="ui-tag ui-glass is-locked">Pickup</span><span class="ui-tag ui-glass is-spender">★ Big spender</span></div></section>
<section class="ui-glass is-strong"><span class="ui-label">Segmented control</span>
 <div class="ui-segmented"><button aria-pressed="false">Seeds<b class="ui-mono">Lv 30</b></button><button aria-pressed="true">Grow<b class="ui-mono">Lv 30</b></button><button aria-pressed="false">Harvest<b class="ui-mono">Lv 30</b></button><button aria-pressed="false">Pack<b class="ui-mono">Lv 30</b></button></div>
 <span class="ui-label">Cards and buttons</span>
 <div class="ui-card is-brass row" style="justify-content:space-between"><div><div class="ui-label">Bottleneck</div>Grow trails Seeds by 33%</div><button class="ui-button is-accent">Curing · <span class="ui-mono">$1.80K</span></button></div>
 <div class="ui-card"><div class="ui-label">Grow room · Lv 30 → 31</div><div class="ui-stat ui-mono">112.9 → <em>116.5</em></div><div class="ui-delta">units per batch, +3.2% output</div></div>
 <div class="row"><button class="ui-button is-primary">Upgrade · <span class="ui-mono">$41.2K</span></button><button class="ui-button is-quiet">Max +33</button><button class="ui-button is-danger">Reset</button><button class="ui-button is-primary" disabled>Need $8.4K</button></div>
 <span class="ui-label">Progress and badges</span>
 <div class="ui-progress"><i style="width:62%"></i></div>
 <div class="ui-ladder"><i class="is-done"></i><i class="is-done"></i><i class="is-next"></i><i></i><i></i></div>
 <div class="row"><span class="ui-badge"></span><span class="ui-badge is-alert"></span></div></section>
<section class="ui-dialog ui-glass is-strong"><h2 class="ui-title">Welcome back</h2><p class="ui-delta">Dialog surface for the moments in Phase 5.</p><button class="ui-button is-primary">Collect</button></section>`;
  document.body.append(kit);
}
