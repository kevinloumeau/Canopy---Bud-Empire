import * as THREE from 'three';

// Station work motion: named parts of the Blender station models move with the station's own work clock (main.js's
// taskClocks, which only run while the station is working), so a station reads as busy and freezes when it stalls.
// rigStation runs once on a loaded model: it wraps each plant, sprout or bag in a pivot at its base and tags the parts
// (userData.motion, which survives clone()). bindStation collects one clone's tagged parts; moveStation poses them.
// Everything is transforms and one emissive per screen: no new meshes, no draw calls, no per-frame allocation.

// Seconds of work per readable cycle, by station (seeds, grow, harvest, pack, order desk, pickup). Grow matches the
// 2D crop cycle it replaces.
export const CYCLE = [7, 9, 8, 6, 3, 4];
const SCREENS = /^(ReaderScreen|MonitorGlass|ScaleScreen|TillGlass)$/;

const bounds = new THREE.Box3(), part = new THREE.Box3(), base = new THREE.Vector3();
function baseOf(objects) {
  bounds.makeEmpty();
  objects.forEach(o => {
    o.updateMatrix();
    if (o.geometry) { if (!o.geometry.boundingBox) o.geometry.computeBoundingBox(); bounds.union(part.copy(o.geometry.boundingBox).applyMatrix4(o.matrix)); }
    else bounds.expandByPoint(o.position);
  });
  return base.set((bounds.min.x + bounds.max.x) / 2, bounds.min.y, (bounds.min.z + bounds.max.z) / 2);
}
// Named children of the model grouped by the regex's first capture, in name order.
function groups(objects, re) {
  const out = new Map();
  objects.forEach(o => { const m = re.exec(o.name); if (m) { if (!out.has(m[1])) out.set(m[1], []); out.get(m[1]).push(o); } });
  return [...out.keys()].sort().map(k => out.get(k));
}
// Wraps sibling parts in a group placed at their base, so scaling the group grows them up out of the soil or tray.
function pivot(parts, motion) {
  const parent = parts[0].parent, g = new THREE.Group(), at = baseOf(parts);
  g.position.copy(at); g.userData.motion = Object.assign({ rest: at.toArray() }, motion);
  parent.add(g);
  parts.forEach(p => { p.position.sub(at); g.add(p); });
  return g;
}
const tag = (o, motion) => { o.userData.motion = Object.assign({ rest: o.position.toArray(), size: o.scale.toArray() }, motion); };
const each = (list, fn) => list.forEach((o, k) => fn(o, k, list.length));

export function rigStation(source, index) {
  // Only the model's own direct parts (the Blender exports are flat); parts nested under another (the order desk's
  // keys under its reader) are matched too.
  const all = [];
  source.traverse(o => { if (o !== source && o.name) all.push(o); });
  const named = re => all.filter(o => re.test(o.name));
  if (index === 0) groups(all, /^S(\d+)(?:Leaf|Stem|Top)/).forEach((parts, k, list) => pivot(parts, { m: 'sprout', k, n: list.length }));
  if (index === 1) groups(all, /^P(\d+)(?:Stem|Leaf|Pet|Branch|Cola|SideCola|Sugar|TopSugar|Crown)/).forEach((parts, k) => {
    pivot(parts, { m: 'plant', k });
    parts.forEach(p => { if (/(Cola|Sugar)\d*$/.test(p.name)) tag(p, { m: 'bud' }); });
  });
  if (index === 2) {
    each(named(/^(?:T\dP\d|Plant|Corner)(?:Leaf|Pet|BranchLeaf)/), (o, k, n) => tag(o, { m: 'trim', k: (k * 7) % n, n }));
    each(named(/^(?:Tray\d?Nug|BoardNug)\d+$/), (o, k, n) => tag(o, { m: 'fill', k, n, from: .1, span: .75 }));
  }
  if (index === 3) {
    named(/^Press(?:Ram|Head|Plate)$/).forEach(o => tag(o, { m: 'press', amp: .03 }));
    named(/^ScalePan$/).forEach(o => tag(o, { m: 'press', amp: .008 }));
    each(named(/^(?:TopCratePouch|Box)\d+$/), (o, k, n) => tag(o, { m: 'fill', k, n, from: .35, span: .5 }));
    each(named(/^TrayNug\d+$/), (o, k, n) => tag(o, { m: 'drain', k, n }));
  }
  if (index === 4) named(/^Key\d+$/).forEach((o, k) => tag(o, { m: 'key', k }));
  if (index === 5) groups(all, /^(?:Bag|FlatBag)(\d+)/).forEach((parts, k, list) => pivot(parts, { m: 'handoff', k, n: list.length }));
  if (index !== 6) all.forEach(o => { if (SCREENS.test(o.name) && o.isMesh) o.userData.motion = { m: 'screen' }; });
  return source;
}

// One clone's moving parts, with its own screen materials (clones share the source's) so desks glow independently.
export function bindStation(root, index) {
  const parts = [];
  root.traverse(o => {
    const t = o.userData.motion;
    if (!t) return;
    if (t.m === 'screen') {
      o.material = o.material.clone();
      if (o.material.emissive) o.material.emissive.copy(o.material.color).lerp(new THREE.Color('#bff5dc'), .5);
    }
    parts.push(o);
  });
  return parts.length ? { index, parts, act: 0, grow: [] } : null;
}

const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const ease = v => { v = clamp01(v); return v * v * (3 - 2 * v); };
// Grow plants: up from a seedling over most of the cycle, full for a beat, then cut back for the next crop.
export function growth(phase) { return phase < .72 ? phase / .72 : phase > .86 ? (1 - phase) / .14 : 1; }

// s: the frame's station ({ clock: work seconds, act: 0..1 working, full: output store full }); dt in wall seconds.
export function moveStation(rig, s, dt) {
  const clock = s.clock || 0, period = CYCLE[rig.index] || 6, phase = (clock / period) % 1, follow = 1 - Math.exp(-dt * 4);
  rig.act += ((s.act || 0) - rig.act) * follow;
  const parts = rig.parts;
  for (let i = 0; i < parts.length; i++) {
    const o = parts[i], t = o.userData.motion;
    switch (t.m) {
      case 'plant': {
        const target = s.full ? 1 : growth((clock / period + t.k * .23) % 1);
        // Eased toward its target, so a store filling up lets the crop finish growing rather than jump.
        const g = rig.grow[t.k] = rig.grow[t.k] === undefined ? target : rig.grow[t.k] + (target - rig.grow[t.k]) * follow;
        o.scale.setScalar(.2 + .8 * ease(g));
        o.userData.g = g;
        o.rotation.z = Math.sin(clock * 1.1 + t.k * 1.7) * .025;
        break;
      }
      case 'bud': {
        // Flowers set late: the colas swell in over the last third of growth.
        const b = ease((o.parent.userData.g - .55) / .35);
        o.scale.set(t.size[0] * b, t.size[1] * b, t.size[2] * b);
        break;
      }
      case 'sprout': {
        const p = (clock / period + t.k * .17) % 1, g = p > .9 ? 1 - (p - .9) / .1 : ease(p / .8);
        o.scale.setScalar(.06 + .94 * g);
        break;
      }
      case 'trim': {
        // Leaves come off one at a time through the cycle; a fresh plant (in full leaf) arrives at the end.
        const at = .1 + .7 * t.k / t.n, g = phase > .92 ? (phase - .92) / .08 : 1 - clamp01((phase - at) / .06);
        o.scale.set(t.size[0] * g, t.size[1] * g, t.size[2] * g);
        break;
      }
      case 'fill': case 'drain': {
        // Fill: items appear in turn and are cleared at the end. Drain: the reverse, items taken in turn.
        const at = (t.m === 'fill' ? t.from : .35) + (t.m === 'fill' ? t.span : .5) * t.k / t.n;
        const shown = phase > .93 ? 1 - (phase - .93) / .07 : ease((phase - at) / .05), g = t.m === 'fill' ? shown : 1 - shown;
        o.scale.set(t.size[0] * g, t.size[1] * g, t.size[2] * g);
        break;
      }
      case 'press': o.position.y = t.rest[1] - t.amp * Math.sin(Math.PI * clamp01((phase - .1) / .25)); break;
      case 'key': o.position.y = t.rest[1] - (Math.floor(clock * 6) % 9 === (t.k * 4) % 9 ? .006 * rig.act : 0); break;
      case 'handoff': {
        // One bag at a time lifts off the counter to the customer, and a fresh one is set down in its place.
        const mine = Math.floor(clock / period) % t.n === t.k;
        const lift = mine ? ease((phase - .4) / .3) : 0, gone = mine ? (phase < .85 ? ease((phase - .6) / .2) : 1 - ease((phase - .85) / .15)) : 0;
        o.position.y = t.rest[1] + (phase < .85 ? .1 * lift : 0);
        o.scale.setScalar(1 - gone);
        break;
      }
      case 'screen': o.material.emissiveIntensity = rig.act * (.35 + .08 * Math.sin(clock * 23) + (Math.sin(clock * 3.1) > .96 ? .15 : 0)); break;
    }
  }
}
