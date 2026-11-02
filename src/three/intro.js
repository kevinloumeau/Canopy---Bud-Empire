// The first-load build (Kevin, 2026-11-02: "the stations by themselves is a little weak. speed it up too"). As the
// loading card lifts, the shop assembles itself in about a second and a quarter: the floors spread out and the walls
// grow up out of them storey by storey, the fittings and counters pop into place behind them, the stations come up
// down the line (main.js stationPop), the people step in, and the storefront sign drops in last with a warm flash.
//
// Every piece grows from the middle of its own base with a small overshoot. Nothing is rebuilt or re-materialled:
// apply() scales and hides the pieces just for the frame's draw and restore() puts them back straight after, so the
// rest of the map code (which places props, people and stations every frame) never sees the intro, and once it ends
// nothing is left running. The town round the shop stays put, so the shop builds on a finished street.
import * as THREE from 'three';

// Seconds from the card lifting. Structure (floors, walls, big fittings) first, rising storey by storey; the small
// fittings a beat behind; people after the stations (main.js STATION_POP); the sign last.
const STRUCTURE = { at: 0, rise: .3, sweep: .1, take: .36 };
const FITTINGS = { at: .2, rise: .3, sweep: .14, take: .3 };
const PEOPLE = { at: .5, spread: .3, take: .26 };
const SIGN = { at: .8, take: .4, flash: .55, glow: 1.6 };
export const INTRO_SECONDS = SIGN.at + SIGN.flash;

// Grows 0 → 1 with a soft overshoot that settles (an ease-out-back).
const grow = (t, overshoot = 1.7) => { if (t <= 0) return 0; if (t >= 1) return 1; const k = t - 1; return 1 + (overshoot + 1) * k * k * k + overshoot * k * k; };
const clamp01 = v => Math.max(0, Math.min(1, v));

export function createIntro({ parts, characters, hideWhilePeople = [], sign }) {
  let pieces = null;
  const touched = [], bounds = new THREE.Box3(), size = new THREE.Vector3(), base = new THREE.Vector3();

  // The shop's pieces, found once when the intro starts (every model has loaded by then): each top-level shop group is
  // split down into its own pieces while it spans more than a couple of metres, so a wall, a shelf and a lamp each
  // get their own pop rather than the whole shell growing as one.
  function collect() {
    pieces = [];
    const found = [];
    const visit = (o, depth) => {
      if (!o.visible || o.isLight || o.isInstancedMesh || o === sign) return;
      bounds.setFromObject(o);
      if (bounds.isEmpty()) return;
      bounds.getSize(size);
      if (!o.isMesh && o.children.length && depth < 4 && Math.max(size.x, size.z) > 3) { o.children.forEach(c => visit(c, depth + 1)); return; }
      found.push({ o, box: bounds.clone(), big: Math.max(size.x, size.y, size.z) > 1.6 });
    };
    parts.forEach(o => { if (o.parent) visit(o, 0); });
    if (!found.length) return;
    const all = new THREE.Box3();
    found.forEach(p => all.union(p.box));
    const lowest = all.min.y, height = Math.max(.001, all.max.y - lowest), across = Math.max(.001, all.max.x - all.min.x + all.max.z - all.min.z);
    found.forEach(({ o, box, big }) => {
      // Pivot: the middle of the piece's base, in its parent's space.
      o.parent.updateWorldMatrix(true, false);
      const pivot = o.parent.worldToLocal(base.set((box.min.x + box.max.x) / 2, box.min.y, (box.min.z + box.max.z) / 2).clone());
      const up = clamp01((box.min.y - lowest) / height), along = clamp01((box.min.x - all.min.x + box.min.z - all.min.z) / across);
      const beat = big ? STRUCTURE : FITTINGS;
      pieces.push({ o, pivot, at: beat.at + up * beat.rise + along * beat.sweep, take: beat.take });
    });
  }

  // Scales one object about a pivot for this frame only (restore() undoes it).
  function pose(o, pivot, s) {
    touched.push([o, o.position.x, o.position.y, o.position.z, o.scale.x, o.scale.y, o.scale.z, o.visible]);
    if (s <= 0) { o.visible = false; return; }
    if (pivot) o.position.set(pivot.x + (o.position.x - pivot.x) * s, pivot.y + (o.position.y - pivot.y) * s, pivot.z + (o.position.z - pivot.z) * s);
    o.scale.multiplyScalar(s);
  }

  let glowSaved = null;
  return {
    // t: seconds since the card lifted, or below 0 when no intro is playing. Returns whether anything was posed.
    apply(t) {
      if (!(t >= 0) || t > INTRO_SECONDS) return false;
      if (!pieces) collect();
      pieces.forEach(p => { const s = grow((t - p.at) / p.take); if (s < 1) pose(p.o, p.pivot, s); });
      characters().forEach((holder, i) => {
        // A scattered order (not left to right), so the crowd arrives as a crowd.
        const at = PEOPLE.at + ((i * .37) % 1) * PEOPLE.spread, s = grow((t - at) / PEOPLE.take, 1.2);
        if (s < 1) pose(holder, null, s);
      });
      if (t < PEOPLE.at + PEOPLE.spread + PEOPLE.take) hideWhilePeople.forEach(o => pose(o, null, 0));
      if (sign) {
        const s = grow((t - SIGN.at) / SIGN.take, 2.4);
        if (s < 1) pose(sign, null, s);
        const m = sign.material, flash = clamp01((t - SIGN.at - SIGN.take * .5) / SIGN.flash);
        if (m && flash > 0 && flash < 1) { glowSaved = [m, m.emissiveIntensity]; m.emissiveIntensity += SIGN.glow * Math.sin(flash * Math.PI); }
      }
      return touched.length > 0 || !!glowSaved;
    },
    restore() {
      for (let i = touched.length - 1; i >= 0; i--) {
        const [o, px, py, pz, sx, sy, sz, vis] = touched[i];
        o.position.set(px, py, pz); o.scale.set(sx, sy, sz); o.visible = vis;
      }
      touched.length = 0;
      if (glowSaved) { glowSaved[0].emissiveIntensity = glowSaved[1]; glowSaved = null; }
    },
    // A rebuilt map (lost context) or a replayed intro finds its pieces afresh.
    reset() { pieces = null; }
  };
}
