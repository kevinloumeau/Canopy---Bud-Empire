// One upgrade animation for every purchase that levels something up (Kevin, 2026-11-05: "most to all upgrades should
// have a small upgrade animation"). The same three beats everywhere, so a station level, a research level, the lounge,
// the window, the drone port, a branch station and a store level all feel like one system:
//   - on the map, a brass ring spreads across the floor under what was bought and fades, over a quick warm glow;
//   - the thing itself gives a short squash and spring (stations, branch stations and the street fixtures);
//   - in the menu, the tile, sign or button that was pressed springs and a brass glint passes over it.
// A new look (a tier change) gets the bigger ring. Everything is pooled and lasts under a second, so on a phone it
// costs at most a few extra draws while it plays and nothing once it is done. Reduced motion skips all of it.
const PULSE_SECONDS = .9, BUMP_SECONDS = .62, PRESS_MEMORY = 1500, MAX_PULSES = 6;
// The pressed element that springs: the whole tile or map sign rather than the small button inside it.
// A map sign's buy box is redrawn after a purchase, so the sign around it is the one that lasts.
const POP_TILES = '.marker, .page-tile, .page-hero, .map-tile, .goal-tile, .station-tile', POP_BUTTONS = 'button, [role=button]';
const popTarget = el => el && el.closest ? el.closest(POP_TILES) || el.closest(POP_BUTTONS) : null;

export function createUpgradeFx(reducedMotion, now = () => performance.now()) {
  const reduced = () => !!(reducedMotion && reducedMotion.matches);
  const pulses = [], bumps = {}, fixtureBumps = {};
  let pressed = null, pressedAt = 0;
  if (typeof document !== 'undefined') document.addEventListener('pointerdown', e => {
    const t = popTarget(e.target);
    if (t) { pressed = t; pressedAt = now(); }
  }, true);
  if (typeof document !== 'undefined') document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { const t = popTarget(document.activeElement); if (t) { pressed = t; pressedAt = now(); } }
  }, true);

  // Springs the element just pressed (or the one given). Restarts cleanly when tapped again mid-animation.
  function pop(el) {
    if (reduced()) return;
    const target = el || (pressed && now() - pressedAt < PRESS_MEMORY ? pressed : null);
    if (!target || !target.isConnected || !target.classList) return;
    target.classList.remove('upgrade-pop');
    void target.offsetWidth;
    target.classList.add('upgrade-pop');
    clearTimeout(target._upgradePop);
    target._upgradePop = setTimeout(() => target.classList.remove('upgrade-pop'), 700);
  }

  // at: a map point {x, y?, z}; r: the ring's reach in map units; station: a key the frame's station entry asks
  // about with bump(); fixtures: map3d fixture keys to spring; big: a new look.
  function play({ at, r = 1.4, station, fixtures, big = false, ui = true } = {}) {
    if (ui) pop();
    if (reduced()) return;
    const t = now();
    if (at) {
      pulses.push({ x: at.x, y: at.y || 0, z: at.z, r: big ? r * 1.45 : r, big, at: t });
      if (pulses.length > MAX_PULSES) pulses.shift();
    }
    if (station !== undefined) bumps[station] = t;
    (fixtures || []).forEach(k => { fixtureBumps[k] = t; });
  }

  // 0..1 through a station's spring, or undefined when it is still.
  function bump(key) {
    const at = bumps[key]; if (at === undefined) return undefined;
    const k = (now() - at) / 1000 / BUMP_SECONDS;
    if (k >= 1) { delete bumps[key]; return undefined; }
    return Math.max(0, k);
  }

  // The frame's live rings ({x, y, z, r, t: 0..1, big}) and springing fixtures ({key: 0..1}); null when nothing plays.
  function frame() {
    const t = now();
    for (let n = pulses.length - 1; n >= 0; n--) if ((t - pulses[n].at) / 1000 >= PULSE_SECONDS) pulses.splice(n, 1);
    const rings = pulses.map(p => ({ x: p.x, y: p.y, z: p.z, r: p.r, big: p.big, t: (t - p.at) / 1000 / PULSE_SECONDS }));
    let springs = null;
    Object.keys(fixtureBumps).forEach(k => {
      const s = (t - fixtureBumps[k]) / 1000 / BUMP_SECONDS;
      if (s >= 1) delete fixtureBumps[k]; else (springs || (springs = {}))[k] = Math.max(0, s);
    });
    return { rings: rings.length ? rings : null, springs };
  }

  function busy() { return pulses.length > 0 || Object.keys(bumps).length > 0 || Object.keys(fixtureBumps).length > 0; }

  return { play, pop, bump, frame, busy };
}

