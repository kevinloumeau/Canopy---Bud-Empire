// The reveal a big purchase plays on the map (Kevin, 2026-11-07: "when a ghost item is bought i want it to be a
// little dramatic, map should scroll and center on it if its not, and have a little animation that takes a second or
// two", then "apply that to other large purchase or upgrades"). main.js first glides the camera to the thing if it
// sits off the middle of the map, then this plays, on wall time:
//   - a column of warm light rises out of the spot and fades, with brass sparkles bursting up and drifting out;
//   - the bought fixture (kiosk, window parts, drone port, ATM machine) pops up out of the floor with a small overshoot
//     and settles; until the camera arrives it stays hidden, so it appears in front of the player;
//   - at its start, onStart runs (the big upgrade ring, dust and a sound in main.js).
// The pool holds at most three reveals; each costs two draws while it plays and nothing once it is done.
// Reduced motion skips the animation and only runs onStart.
export const REVEAL_SECONDS = 1.6, MAX_REVEALS = 3;

export function createRevealFx(reducedMotion, now = () => performance.now()) {
  const reduced = () => !!(reducedMotion && reducedMotion.matches);
  const list = [];
  let seed = 0;

  // at: a map point {x, y?, z}; r: the light's reach in map units; h: how tall it rises; fixtures: map3d fixture keys
  // that pop in; atm: an ATM machine slot that pops in; delay: seconds to wait (the camera glide) before it plays.
  function play({ at, r = 1.4, h = 3, fixtures = [], atm = null, delay = 0, onStart } = {}) {
    if (!at) return;
    if (reduced()) { if (onStart) onStart(); return; }
    // A second reveal on the same keys replaces the first, so nothing stays hidden behind a stale timer.
    for (let n = list.length - 1; n >= 0; n--) {
      const old = list[n];
      if ((atm !== null && old.atm === atm) || old.fixtures.some(k => fixtures.includes(k))) { if (!old.fired && old.onStart) old.onStart(); list.splice(n, 1); }
    }
    list.push({ x: at.x, y: at.y || 0, z: at.z, r, h, fixtures, atm, start: now() + Math.max(0, delay) * 1000, onStart, fired: false, seed: seed++ });
    while (list.length > MAX_REVEALS) { const gone = list.shift(); if (!gone.fired && gone.onStart) gone.onStart(); }
  }

  // The frame's live beams ({x, y, z, r, h, t: 0..1, seed}), the fixtures popping in ({key: t}, t < 0 while hidden)
  // and the ATM slot popping in ({machine, t}); null when nothing plays.
  function frame() {
    const t = now();
    let beams = null, pops = null, atm = null;
    for (let n = list.length - 1; n >= 0; n--) {
      const p = list[n], k = (t - p.start) / 1000 / REVEAL_SECONDS;
      if (k >= 1) { if (!p.fired && p.onStart) p.onStart(); list.splice(n, 1); continue; }
      if (k >= 0 && !p.fired) { p.fired = true; if (p.onStart) p.onStart(); }
      if (k >= 0) (beams || (beams = [])).push({ x: p.x, y: p.y, z: p.z, r: p.r, h: p.h, t: k, seed: p.seed });
      p.fixtures.forEach(key => { (pops || (pops = {}))[key] = k; });
      if (p.atm !== null) atm = { machine: p.atm, t: k };
    }
    return { beams, pops, atm };
  }

  function busy() { return list.length > 0; }

  return { play, frame, busy };
}

// [across, up] scale of a fixture popping in, for t from 0 to 1; null while it waits hidden (t < 0).
// It grows out of the floor with a little overshoot by 40%, then a stretch-and-settle that dies away.
export function popScale(t) {
  if (t === undefined || t === null) return [1, 1];
  if (t < 0) return null;
  if (t >= 1) return [1, 1];
  const g = Math.min(1, t / .4), c = 1.9, b = 1 + (c + 1) * Math.pow(g - 1, 3) + c * Math.pow(g - 1, 2);
  const s = t > .4 ? (t - .4) / .6 : 0, wobble = s ? Math.sin(s * Math.PI * 2) * Math.pow(1 - s, 2) * .09 : 0;
  return [Math.max(.001, b * (1 - wobble * .5)), Math.max(.001, b * (1 + wobble))];
}
