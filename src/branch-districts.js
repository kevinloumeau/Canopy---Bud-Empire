// Branches on the flagship's own map (Kevin, 2026-11-02: "instead of the empire separate maps I want the new
// dispensaries to be unlocked on the same map, a block or two over, scrollable"). The front and rear streets carry on
// east past the flagship's first ring, and every branch has a city block of its own along them, one after another:
// its hand-drawn scene (branch-maps.js, recorded into 3D as it always was) on a plot in the middle of the block, a
// column of terraces either side of it, a terraced row behind it across the rear street and a low row in front across
// the front street. Cross streets split the districts. Only the open branches and the next lot are ever on screen:
// the east haze stops just past the next lot, so the town grows to the right as the empire does.
//
// World units are the main map's. A branch scene's own origin lands on its district's centre.
import { BRANCH_THEMES } from './branch-maps.js';

export const DISTRICT_PITCH = 70, FIRST_DISTRICT_X = 77, DISTRICT_Z = 1.5;
// The cross streets along z: the flagship ring's east back street (x 42) and one after every district.
export const CROSS_STREETS = BRANCH_THEMES.map((_, i) => FIRST_DISTRICT_X + DISTRICT_PITCH / 2 + i * DISTRICT_PITCH);
export const DISTRICT_COUNT = BRANCH_THEMES.length;
// The flagship's own east haze ramp (sunny-world HAZE_RAMP.east) and the flagship view's east limits (SUNNY_VIEW):
// with no branch on the way the town ends where it always did.
export const MAIN_EAST_HAZE = [45, 58];

export function districtCentre(i) { return { x: FIRST_DISTRICT_X + i * DISTRICT_PITCH, z: DISTRICT_Z }; }
// The block's kerb-to-kerb x range (the cross streets either side, six wide) and z range (rear street -18.5, front 21.5).
export function districtBlock(i) {
  const c = districtCentre(i).x;
  return { x0: c - DISTRICT_PITCH / 2 + 3, x1: c + DISTRICT_PITCH / 2 - 3, z0: -15.5, z1: 18.5 };
}
// The branch's plot in world units: its scene's land plot moved onto the district (BRANCH_THEMES[].land.plot).
export function districtPlot(i) {
  const c = districtCentre(i), [x0, x1, z0, z1] = BRANCH_THEMES[i].land.plot;
  return { x0: c.x + x0, x1: c.x + x1, z0: c.z + z0, z1: c.z + z1 };
}

// Which districts the map shows: every open branch, and the first unopened one as an empty lot for lease. `levels`
// are the branches' levels in order (state.empire.stores[].level).
export function shownDistricts(levels) {
  const out = [];
  for (let i = 0; i < DISTRICT_COUNT; i++) {
    const open = (levels[i] || 0) > 0;
    out.push({ index: i, open });
    if (!open) break;
  }
  return out;
}
// The east haze ramp: from just past the last shown district's far cross street to gone a dozen units on, so its
// right-hand column of terraces stands in the clear and nothing beyond is ever seen.
export function eastHaze(levels) {
  const shown = shownDistricts(levels), last = shown[shown.length - 1];
  if (!last) return MAIN_EAST_HAZE.slice();
  const edge = CROSS_STREETS[last.index] + 3;
  return [edge + 3, edge + 16];
}

// The district a ground point is in (its block plus half the streets round it), or -1 on the flagship's side.
export function districtAt(x) {
  const i = Math.floor((x - (FIRST_DISTRICT_X - DISTRICT_PITCH / 2)) / DISTRICT_PITCH);
  return i >= 0 && i < DISTRICT_COUNT ? i : -1;
}

// The neighbours round every district, as the main map's Blender terraces (city_* and building_* models, fitted to a
// footprint by placeProps' p.fit), fronts toward the camera (+z) as the flagship's own. Fixed seeds per district, so
// the skyline never reshuffles. Tall ones stand behind; the front row stays two storeys so it never hides the shop.
const TALL = ['city_brick_5', 'city_cream_5', 'city_terra_4', 'city_sage_4', 'city_stone_4', 'city_brick_4', 'city_corner_4'];
const MID = ['city_stone_3', 'city_tan_3', 'city_sage_3', 'building_mid_stone', 'building_apartment_brick', 'building_townhouse_sage', 'building_rowhouse_terracotta'];
const LOW = ['city_mauve_2', 'city_terra_2', 'building_low_sage', 'building_low_stone', 'building_low_tan', 'building_shop_narrow', 'building_workshop_low'];
function seeded(n) { let seed = (n + 1) * 2654435761 >>> 0; return () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296); }
// A run of lots along one side, from a to b, butted edge to edge. Widths wander between `min` and `max` (then stretch to
// fill the run exactly), and a model is fitted to its lot and stands taller the wider it is, so a row of uneven lots
// reads as a skyline instead of a row of the same box (Kevin, 2026-11-05: "sparse and repetitive").
function lots(a, b, min, max, rand) {
  const widths = [];
  let sum = 0;
  while (sum < b - a - min * .5) { const w = min + rand() * (max - min); widths.push(w); sum += w; }
  const k = (b - a) / sum, out = [];
  let at = a;
  widths.forEach(w => { out.push([at, at + w * k]); at += w * k; });
  return out;
}
export function districtTerraces(i) {
  const block = districtBlock(i), plot = districtPlot(i), rand = seeded(i * 7 + 3), out = [];
  // Never the same model twice in a row, so neighbours always differ.
  let last = '';
  const pick = list => { let f = list[Math.floor(rand() * list.length)]; if (f === last) f = list[(list.indexOf(f) + 1) % list.length]; return (last = f); };
  const add = (file, x0, x1, z0, z1) => out.push({ file: file + '.glb', x: (x0 + x1) / 2, z: (z0 + z1) / 2, rot: 0, fit: { w: x1 - x0, d: z1 - z0 } });
  // The flanks: a column each side of the plot, two units in from the cross street's kerb and at most nine wide (a
  // model is fitted to its lot and stands taller the wider it is), any room left between it and the plot an open
  // plaza. Three storeys at most beside the shop and the front corner two, so neither hides it.
  const left = [block.x0 + 2, Math.min(plot.x0 - 1, block.x0 + 11)], right = [Math.max(plot.x1 + 1, block.x1 - 11), block.x1 - 2];
  [left, right].forEach(([x0, x1]) => {
    if (x1 - x0 < 5) return;
    lots(block.z0 + 2, block.z1 - 2, 6.6, 8.8, rand).forEach(([z0, z1], k, all) => add(k === all.length - 1 ? pick(LOW) : pick(rand() < .25 ? LOW : MID), x0, x1, z0, z1));
  });
  // Behind, across the rear street: a terraced row two units back from its kerb, eight deep, mostly tall with the odd
  // low one between for a broken skyline, a corner block on the junction at its east end.
  lots(block.x0 + 2, block.x1 - 2, 6.4, 9.4, rand).forEach(([x0, x1], k, all) => {
    const r = rand();
    add(k === all.length - 1 ? 'city_corner_4' : pick(r < .5 ? TALL : r < .82 ? MID : LOW), x0, x1, -31.5, -23.5);
  });
  // In front, across the front street: a low row facing the camera (lots kept narrow so none stands tall enough to
  // hide the shop), a corner shop at its east end.
  lots(block.x0 + 2, block.x1 - 2, 6.8, 8.8, rand).forEach(([x0, x1], k, all) => add(k === all.length - 1 ? 'building_corner' : pick(LOW), x0, x1, 28, 35.5));
  return out;
}

// The lot for lease: the next branch's plot as an open green lot behind a low post-and-rail fence, a few trees along
// its back and sides and an A-frame board at the gap in the front, where its small tag stands.
export function leaseLot(i) {
  const p = districtPlot(i), c = districtCentre(i), rand = seeded(i * 11 + 5), props = [];
  for (let x = p.x0 + 3; x < p.x1 - 2; x += 5 + rand() * 2.5) props.push({ file: (rand() < .4 ? 'street_tree' : 'tree') + '.glb#lawn', x, z: p.z0 + 2.2 + rand() * 1.2, rot: rand() * 6.28, scale: .8 + rand() * .35 });
  [p.x0 + 2.4, p.x1 - 2.4].forEach(x => { for (let z = p.z0 + 8; z < p.z1 - 5; z += 6 + rand() * 2) props.push({ file: 'tree.glb#lawn', x: x + (rand() - .5), z, rot: rand() * 6.28, scale: .75 + rand() * .3 }); });
  props.push({ file: 'aframe_sign.glb', x: c.x + 3.4, z: p.z1 - .2, rot: 0 });
  return { ...p, gap: 3, tag: { x: c.x, y: 2.2, z: p.z1 - 1 }, props };
}
