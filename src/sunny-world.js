// Style prototype ("?look=sunny"): instead of a diorama floating in a dark studio, the main shop sits on a sunlit
// city block that runs to the screen edges. The shop's slab and the sidewalk are one continuous paved plaza, a
// kerb drops to sunken asphalt streets on all four sides, and muted low-rise neighbours sit beyond the far kerbs so
// the shop stays the brightest, most detailed thing on screen. Cars circulate on the streets and pedestrians walk
// the pavements. Off by default; nothing here touches saves or rules.
//
// Two passes: `back` paints the ground and everything behind or beside-left of the shop (where the shop is nearer
// and paints over any overlap); `front` paints only low furniture, cars and walkers on the front and right, placed
// so nothing tall ever covers a station.
export const SUNNY = typeof location !== 'undefined' && /[?&]look=sunny\b/.test(location.search);
// The shop's own Ludo sprites (stations, display case) stay off unless asked for: mixed with the drawn shell they read as pasted on.
export const SHOP_SPRITES = SUNNY && /[?&]sprites=shop\b/.test(location.search);

// Hero sprites (rendered in Ludo.ai from the sprite brief). Each is placed by its footprint centre: `w` is the
// on-screen width in world units at zoom 1, `drop` how far the image's bottom edge sits below the footprint centre
// (the near corner of an isometric base projects below its centre). Until an image loads, the code-drawn fallback
// paints instead, so a slow network never leaves a hole.
const SPRITES = { person: { w: .95, drop: .1 }, counter: { w: 3.3, drop: .55 }, grow: { w: 4.3, drop: .62 }, car: { w: 3.1, drop: .55 }, tree: { w: 3.4, drop: .5 } };
if (SUNNY && typeof Image !== 'undefined') for (const name in SPRITES) { const img = new Image(); img.decoding = 'async'; img.src = 'sprites/' + name + '.png'; SPRITES[name].img = img; }
// Interior batch: stations come in three visual tiers named per the brief (station.<key>.tier<N>.png under
// sprites/interior/). They load lazily on first use; a missing file marks itself absent so the code-drawn station
// keeps painting, and a missing tier falls back to the nearest tier that exists.
const STATION_KEYS = ['seeds', 'grow', 'harvest', 'pack', 'orders', 'pickup', 'security']; // index 6 is the ID desk, levelled by idStaff
const STATION_SIZE = { seeds: { w: 3.6, drop: .6 }, grow: { w: 4.3, drop: .62 }, harvest: { w: 3.8, drop: .6 }, pack: { w: 3.6, drop: .6 }, orders: { w: 2.65, drop: .5 }, pickup: { w: 3.4, drop: .5 }, security: { w: 1.9, drop: .45 } };
function lazySprite(name, file, size) {
  if (SPRITES[name] || !SUNNY || typeof Image === 'undefined') return;
  const img = new Image(); img.decoding = 'async'; img.onerror = () => { SPRITES[name].missing = true; }; img.src = file;
  SPRITES[name] = Object.assign({ img }, size);
}
export function stationTier(level) { return level >= 20 ? 3 : level >= 10 ? 2 : 1; }
// Returns the sprite name to draw for station i at this level, or null while none is available.
export function stationSprite(i, level) {
  const key = STATION_KEYS[i]; if (!key) return null;
  const want = stationTier(level), order = [want, ...[1, 2, 3].filter(t => t !== want).sort((a, b) => Math.abs(a - want) - Math.abs(b - want))];
  for (const t of order) {
    const name = 'station.' + key + '.tier' + t;
    lazySprite(name, 'sprites/interior/' + name + '.png', STATION_SIZE[key]);
    if (spriteReady(name)) return name;
  }
  return null;
}
// People: cast members are picked by a stable identity; customer 07 (Kevin's own outfit) is weighted to show up twice as often.
const CAST = { customer: [1, 2, 3, 4, 5, 6, 7, 7], walker: [1, 2, 3, 4, 7] };
const STAFF_FOR_LINE = [2, 2, 2, 1, 1, 1, 3, 1]; // seeds/grow/harvest growers, pack/orders/pickup budtenders, 6 is the ID desk, 7 the lounge host
// Every figure sits on the same 448x640 canvas, 600 px tall with its feet 8 px above the bottom edge.
// Figures are drawn 2.3 units tall: the Ludo counters and cars came out chunky, and true-to-life people looked like toys beside them.
const PERSON_SIZE = { h: 2.3 * 640 / 600, drop: 2.3 * 8 / 600 + .03 };
const CYCLE_07 = 35;
function hashId(n) { n = Math.imul((n | 0) + 1, 0x9e3779b1) >>> 0; n = Math.imul(n ^ (n >>> 15), 0x45d9f3b) >>> 0; return (n ^ (n >>> 16)) >>> 0; }
function personName(role, nn, walking) { return 'person.' + role + '.0' + nn + '.' + (walking ? 'walk' : 'stand'); }
// Draws a sprite figure in place of a code-drawn one. Walking alternates the stand and stride frames on the step
// cycle; facing < 0 mirrors it, since every sprite faces front-right. Returns false until the frame has loaded.
export function drawPersonSprite(api, x, z, identity, employee, facing, phase, amount) {
  let role = employee ? 'staff' : 'customer', nn;
  if (employee) nn = STAFF_FOR_LINE[identity] || 1;
  else if (identity < 0) { role = 'walker'; nn = CAST.walker[(-identity) % CAST.walker.length]; if (nn === 7) role = 'customer'; }
  else nn = CAST.customer[hashId(identity) % CAST.customer.length];
  const walking = amount > .3 && Math.floor(phase / Math.PI) % 2 === 0;
  let name = personName(role, nn, walking);
  const base = personName(role, nn, false);
  // Customer 07 has a full 35-frame Ludo walk cycle (about 18 frames a stride); the others still swap stand and stride.
  if (role === 'customer' && nn === 7 && amount > .3) {
    const f = (((Math.floor(phase * 9 / Math.PI) % CYCLE_07) + CYCLE_07) % CYCLE_07), cycle = 'person.customer.07.cycle.' + (f < 10 ? '0' : '') + f;
    lazySprite(cycle, 'sprites/people/cycle/' + cycle + '.png', PERSON_SIZE);
    if (spriteReady(cycle)) name = cycle;
    else for (let k = 0; k < CYCLE_07; k++) { const n = 'person.customer.07.cycle.' + (k < 10 ? '0' : '') + k; lazySprite(n, 'sprites/people/cycle/' + n + '.png', PERSON_SIZE); }
  }
  lazySprite(name, 'sprites/people/' + name + '.png', PERSON_SIZE);
  lazySprite(base, 'sprites/people/' + base + '.png', PERSON_SIZE);
  const use = spriteReady(name) ? name : spriteReady(base) ? base : null;
  if (!use) return false;
  const p = api.project(x, 0, z), u = api.unit;
  api.ellipse(p.x + u * .06, p.y + u * .03, u * .34, u * .1, 'rgba(14,28,20,.22)');
  // Staff sprites are rendered facing the other way from the customers, so they are mirrored to face the floor.
  return drawSprite(api, use, x, z, employee ? facing >= 0 : facing < 0);
}
// Shop fixtures from the interior batch, sized in world units like the stations.
const FIXTURE_SIZE = { 'station.security.site': { w: 2.2, drop: .45 }, 'event.festival.stall': { w: 2.6, drop: .45 }, 'station.orders.compact.tier1': { w: 2.15, drop: .45 }, 'station.orders.compact.tier2': { w: 2.15, drop: .45 }, 'station.orders.compact.tier3': { w: 2.2, drop: .45 }, 'shop.kiosk': { w: 1, drop: 0 }, 'shop.displaycase': { w: 4, drop: .55 }, 'shop.planter.small': { w: .95, drop: .12 },
  // Latest main-shop-v2 batch: placed by main.js on world boxes or wall anchors, so their sizes here are unused.
  ...Object.fromEntries(['lounge.sofa', 'lounge.coffee.table', 'lounge.lamp.on', 'lounge.lamp.off', 'lounge.rug.floor', 'lounge.carpet.entry', 'lounge.sign.lit', 'lounge.sign.dark', 'street.bollard', 'street.sconce', 'shell.exit.lamp', 'shell.fan.housing', 'drone.courier.loaded'].map(n => [n, { w: 1, drop: 0 }])) };
// The narrower order desk used once the bank has two or three counters, at the station's tier.
export function compactOrderSprite(level) { return fixtureSprite('station.orders.compact.tier' + stationTier(level)) || null; }
export function fixtureSprite(name) { if (!FIXTURE_SIZE[name]) return null; lazySprite(name, 'sprites/interior/' + name + '.png', FIXTURE_SIZE[name]); return spriteReady(name) ? name : null; }
// Shop shell (Kevin chose an all-sprite shop): wall modules stretched over a wall run's screen box, and floor
// textures unwarped from the floor sprites, laid as a pattern in the floor plane so any outline can be filled.
export function spriteImage(name) { return SPRITES[name] && SPRITES[name].img; }
export function shellSprite(name) { lazySprite(name, 'sprites/shell/' + name + '.png', { w: 1, drop: 0 }); return spriteReady(name) ? name : null; }
export function drawSpan(api, name, x0, z0, x1, z1, h, y0) {
  if (!name || !spriteReady(name)) return false;
  y0 = y0 || 0;
  const a = api.project(x0, y0, z0), b = api.project(x1, y0, z1), ta = api.project(x0, y0 + h, z0), tb = api.project(x1, y0 + h, z1);
  const l = Math.min(a.x, b.x), r = Math.max(a.x, b.x), t = Math.min(ta.y, tb.y), bt = Math.max(a.y, b.y);
  api.ctx.drawImage(SPRITES[name].img, l, t, r - l, bt - t);
  return true;
}
// Stretches a sprite over the screen box of a world-space box, for pieces with depth such as stairs.
// Wall modules are stored flattened front-on (flat.<name>.png, unwarped from the isometric sprite) and sheared on to
// the wall's own plane here, so every module meets the floor and its neighbours at exactly the camera's angle.
// (x0, z0) is the end at the image's left edge; u0..u1 picks a horizontal slice of the image (to drop end caps).
export function drawWallFace(api, name, x0, z0, x1, z1, y0, h, u0, u1) {
  const flat = 'flat.' + name.replace(/^shell\./, '');
  lazySprite(flat, 'sprites/shell/' + flat + '.png', { w: 1, drop: 0 });
  if (!spriteReady(flat)) return false;
  const img = SPRITES[flat].img, W = img.naturalWidth, H = img.naturalHeight, a = u0 || 0, b = u1 === undefined ? 1 : u1, sw = W * (b - a);
  const tl = api.project(x0, y0 + h, z0), tr = api.project(x1, y0 + h, z1), bl = api.project(x0, y0, z0), ctx = api.ctx;
  ctx.save(); ctx.transform((tr.x - tl.x) / sw, (tr.y - tl.y) / sw, (bl.x - tl.x) / H, (bl.y - tl.y) / H, tl.x, tl.y);
  ctx.drawImage(img, W * a, 0, sw, H, 0, 0, sw, H); ctx.restore();
  return true;
}
// With `keepAspect`, the sprite fills the box's screen width at its own proportions, standing on the box's bottom edge.
export function drawBoxSprite(api, name, x0, x1, z0, z1, y0, y1, keepAspect, scale) {
  if (!name || !spriteReady(name)) return false;
  const pts = [];
  for (const x of [x0, x1]) for (const z of [z0, z1]) for (const y of [y0, y1]) pts.push(api.project(x, y, z));
  const l = Math.min(...pts.map(q => q.x)), r = Math.max(...pts.map(q => q.x)), t = Math.min(...pts.map(q => q.y)), b = Math.max(...pts.map(q => q.y));
  // keepAspect 'height' instead fills the box's screen height and hangs from its top-right corner (a stair's landing).
  const img = SPRITES[name].img, ar = img.naturalHeight / img.naturalWidth;
  // scale shrinks that fit about the same top-right anchor.
  if (keepAspect === 'height') { const hh = (b - t) * (scale || 1), w = hh / ar; api.ctx.drawImage(img, r - w, t, w, hh); return true; }
  const h = keepAspect ? (r - l) * ar : b - t;
  api.ctx.drawImage(img, l, b - h, r - l, h);
  return true;
}
const FLOOR_TEX = {};
// Seamless ground textures from the Ludo ground batch; the mezzanine timber and grow-room concrete are unwarped from the shell's floor sprites.
const TEXTURE_FILES = { herringbone: 'sprites/ground/ground.floor.herringbone.png', sidewalk: 'sprites/ground/ground.sidewalk.concrete.png', asphalt: 'sprites/ground/ground.asphalt.png' };
export function floorPattern(api, name, size) {
  if (!SUNNY || typeof Image === 'undefined') return null;
  let t = FLOOR_TEX[name];
  if (!t) { t = FLOOR_TEX[name] = { img: new Image() }; t.img.src = TEXTURE_FILES[name] || 'sprites/shell/tex.floor.' + name + '.png'; }
  if (!t.img.complete || !t.img.naturalWidth) return null;
  if (!t.pattern) { t.pattern = api.ctx.createPattern(t.img, 'repeat'); if (!t.pattern) return null; }
  if (!t.pattern.setTransform || typeof DOMMatrix === 'undefined') return null;
  const o = api.project(0, 0, 0), ex = api.project(1, 0, 0), ez = api.project(0, 0, 1), k = size / t.img.naturalWidth;
  t.pattern.setTransform(new DOMMatrix([(ex.x - o.x) * k, (ex.y - o.y) * k, (ez.x - o.x) * k, (ez.y - o.y) * k, o.x, o.y]));
  return t.pattern;
}
export function spriteReady(name) { const s = SPRITES[name]; return !!(s && !s.missing && s.img && s.img.complete && s.img.naturalWidth); }
// Draws a sprite at world (x, z) on the current floor; flip mirrors it so a car can face the other way along a street.
export function drawSprite(api, name, x, z, flip, scale) {
  const s = SPRITES[name]; if (!spriteReady(name)) return false;
  const q = api.project(x, 0, z), u = api.unit, ar = s.img.naturalHeight / s.img.naturalWidth, w = (s.h ? s.h / ar : s.w) * u * (scale || 1), h = w * ar, ctx = api.ctx;
  ctx.save(); ctx.translate(q.x, q.y + s.drop * u * (scale || 1)); if (flip) ctx.scale(-1, 1);
  ctx.drawImage(s.img, -w / 2, -h, w, h); ctx.restore();
  return true;
}

const P = -.012, G = -.33, L = 90; // plaza level (flush with the slab top), street level, half-extent of the streets
const ROADS = [{ along: 'x', at: -18.5 }, { along: 'x', at: 21.5 }, { along: 'z', at: -22.5 }, { along: 'z', at: 22.5 }];
const RW = 6; // street width kerb to kerb
const PAVER = '#d2c8ab', PAVER_LINE = '#b5aa8c', TACTILE = 'rgba(217,194,122,.38)', KERB = '#e2dac4', KERB_FACE = '#a69d85', ASPHALT = '#5a5e64';
const STONE = ['#d6d0c2', '#a9a295', '#c1bbad'], TAN = ['#dac9b6', '#ad9b87', '#c6b29d'], SAGE = ['#c9cfc6', '#9ea59b', '#b4bab0'], MAUVE = ['#d6cdcf', '#a9a0a2', '#c2b8ba'];
// Neighbours: [x, z, w, d, h, wall, awning]. All beyond the far kerbs; heights stay low so they read as a backdrop.
const BUILDINGS = [
  [-34, -32, 14, 14, 9, STONE, '#8a9e8c'], [-16, -31, 11, 12, 6, TAN, '#b7a07a'], [-3, -31, 11, 12, 7, SAGE, '#8a9e8c'],
  [10, -31, 11, 12, 5, MAUVE, '#9c8f9e'], [23, -31, 11, 12, 8, STONE, '#b7a07a'], [36, -31, 11, 12, 6, TAN, '#8a9e8c'],
  [-34, -15, 12, 11, 6, TAN, '#9c8f9e'], [-34, -2, 12, 11, 7, SAGE, '#b7a07a'], [-34, 11, 12, 11, 5, STONE, '#8a9e8c'], [-34, 24, 12, 11, 6, MAUVE, '#b7a07a']
];
// Kept toward the kerb, clear of the facades behind them.
const FAR_TREES = [[-12, -22.4], [-1, -22.4], [10, -22.4], [21, -22.4], [-26.4, -13], [-26.4, -2], [-26.4, 9], [-26.4, 20]];
const NEAR_TREES = [[-15, -13.5], [-5, -13.5], [5, -13.5], [15, -13.5], [-17, 4]]; // behind / left of the shop only; nothing under the delivery deck's legs
export const LAMPS = [[-18.5, -14.5], [18.5, -14.5], [-18.5, 17.5], [18.5, 17.5], [0, -14.5], [-18.5, 1]];
// Walkers: [x0, z0, x1, z1, count, back-pass?]; each walks the segment back and forth on its own phase.
// Lanes keep clear of the trees, lamps and furniture: the rear and left walks run between the slab and the props, the
// front walk along the kerb in front of the planters and bench, the right walk between the slab and the bus stop.
const WALKS = [[-19, -11.6, 19, -11.6, 3, true], [-15.2, -15, -15.2, 18, 2, true], [-30, -24, 30, -24, 3, true], [-28, -26, -28, 26, 2, true],
  [-19, 18.3, 19, 18.3, 3, false], [15.3, -15, 15.3, 18, 2, false]];
// Cars: [road index, lane offset from centre, direction, phase, colour]
const CARS = [[0, -1.5, 1, 0, '#e0564a'], [0, -1.5, 1, .45, '#f4f1e4'], [0, 1.5, -1, .2, '#4f8fd0'], [2, -1.5, -1, .1, '#f2c14e'], [2, 1.5, 1, .6, '#6ea845'],
  [1, -1.5, 1, .3, '#e8913c'], [1, 1.5, -1, .75, '#8a6fd1'], [3, -1.5, -1, .5, '#4f8fd0'], [3, 1.5, 1, .05, '#f4f1e4']];

export function drawSunnyWorld(api, front, alpha) {
  if (!(alpha > 0)) return;
  const ctx = api.ctx, p = api.project;
  ctx.save(); ctx.globalAlpha = alpha;
  const quad = (x0, z0, x1, z1, y, fill) => api.poly([p(x0, y, z0), p(x1, y, z0), p(x1, y, z1), p(x0, y, z1)], fill);
  const byDepth = list => list.slice().sort((a, b) => api.depth({ x: a[0], z: a[1] }) - api.depth({ x: b[0], z: b[1] }));
  if (!front) {
    // One paved plaza everywhere: the slab's own concrete, with the slab's scoring lattice carried right across it
    // and a soft checker so large flat areas keep some texture at every zoom.
    ctx.fillStyle = PAVER; ctx.fillRect(0, 0, api.width, api.height);
    const plazaTex = floorPattern(api, 'sidewalk', 6);
    if (plazaTex) quad(-L, -L, L, L, P, plazaTex);
    for (let x = -19.5 + 1.5; x < 19.5; x += 1.5) for (let z = -15.5 + 1.5; z < 18.5; z += 1.5) {
      if (x > -13 && x < 13 && z > -9 && z < 12) continue;
      if (((Math.round(x / 1.5) + Math.round(z / 1.5)) & 1) === 0) quad(x - 1.5, z - 1.5, x, z, P, 'rgba(255,255,240,.07)');
    }
    for (let k = -11.5 - 1.5 * 30; k < 60; k += 1.5) { api.line([[k, P + .004, -L], [k, P + .004, L]], PAVER_LINE, .02); api.line([[-L, P + .004, k + 1.5 * 3], [L, P + .004, k + 1.5 * 3]], PAVER_LINE, .02); }
    ROADS.forEach(r => roadSurface(api, quad, r));
    ROADS.forEach(r => roadKerbs(api, quad, r));
    ROADS.forEach(r => roadMarkings(api, quad, r));
    crossing(api, quad, 'x', 21.5, -8); crossing(api, quad, 'z', -22.5, 4); crossing(api, quad, 'x', -18.5, 8);
    [[22.5, -18.5], [-22.5, 21.5], [22.5, 21.5]].forEach(([x, z]) => { crossing(api, quad, 'x', z, x - 5.5); crossing(api, quad, 'x', z, x + 5.5); crossing(api, quad, 'z', x, z - 5.5); crossing(api, quad, 'z', x, z + 5.5); });
    // Buildings, trees, props, cars and walkers share one depth sort, so a car on the far street never paints over a near tree.
    streetShadows(api, false);
    const jobs = [];
    const at = (x, z, f) => jobs.push([x, z, f]);
    BUILDINGS.forEach(b => at(b[0], b[1], () => building(api, b)));
    FAR_TREES.concat(NEAR_TREES).forEach(([x, z]) => at(x, z, () => streetTree(api, x, z)));
    LAMPS.filter(([x, z]) => z < -9 || x < -13).forEach(([x, z]) => at(x, z, () => lamp(api, x, z)));
    // Left-side street life: a coffee cart and café seating by the entrance, bins and a hydrant.
    at(-18, 7.5, () => cart(api, -18, 7.5)); at(-17, 12.5, () => umbrella(api, -17, 12.5)); at(-17, 15.5, () => umbrella(api, -17, 15.5));
    at(-18.5, -8, () => bin(api, -18.5, -8)); at(-18.5, 10.5, () => hydrant(api, -18.5, 10.5));
    drawCars(api, true, at); drawWalkers(api, true, at);
    byDepth(jobs).forEach(j => j[2]());
  } else {
    streetShadows(api, true);
    const jobs = [];
    const at = (x, z, f) => jobs.push([x, z, f]);
    LAMPS.filter(([x, z]) => !(z < -9 || x < -13)).forEach(([x, z]) => at(x, z, () => lamp(api, x, z)));
    [[18, -6], [18, 6], [-8, 16.5], [8, 16.5]].forEach(([x, z]) => at(x, z, () => planter(api, x, z)));
    at(0, 16.5, () => bench(api, 0, 16.5, true)); // mirrored to run along the front street
    at(18, 0, () => bench(api, 18, 0)); at(14, 16, () => bikeRack(api, 14, 16));
    at(18.5, -11, () => busStop(api, 18.5, -11)); at(18.5, 12, () => bin(api, 18.5, 12)); at(12, 15.4, () => hydrant(api, 12, 15.4));
    drawCars(api, false, at); drawWalkers(api, false, at);
    byDepth(jobs).forEach(j => j[2]());
  }
  ctx.restore();
}

function roadSurface(api, quad, { along, at }) {
  const a0 = at - RW / 2, a1 = at + RW / 2;
  if (along === 'x') quad(-L, a0, L, a1, G, ASPHALT); else quad(a0, -L, a1, L, G, ASPHALT);
  const tarmac = floorPattern(api, 'asphalt', 8);
  if (tarmac) { if (along === 'x') quad(-L, a0, L, a1, G, tarmac); else quad(a0, -L, a1, L, G, tarmac); }
  // Manhole covers down one lane.
  const p = api.project, u = api.unit;
  for (let k = -36; k <= 36; k += 24) { const q = along === 'x' ? p(k, G + .002, at - 1.5) : p(at + 1.5, G + .002, k); api.ellipse(q.x, q.y, u * .45, u * .25, '#4a4e54'); api.ellipse(q.x, q.y, u * .32, u * .17, '#5f636a'); }
}

// Kerb faces: the far wall of each sunken street, segmented so nothing is drawn across the intersections, plus a
// pale kerb stone along the top edge on both sides.
function roadKerbs(api, quad, { along, at }) {
  const a0 = at - RW / 2, a1 = at + RW / 2, p = api.project;
  const cross = ROADS.filter(r => r.along !== along).map(r => r.at);
  const segs = [[-L, cross[0] - RW / 2], [cross[0] + RW / 2, cross[1] - RW / 2], [cross[1] + RW / 2, L]];
  segs.forEach(([s0, s1]) => {
    if (along === 'x') {
      api.poly([p(s0, P, a0), p(s1, P, a0), p(s1, G, a0), p(s0, G, a0)], KERB_FACE);
      quad(s0, a0 - .3, s1, a0, P + .002, KERB); quad(s0, a1, s1, a1 + .3, P + .002, KERB);
    } else {
      api.poly([p(a0, P, s0), p(a0, P, s1), p(a0, G, s1), p(a0, G, s0)], KERB_FACE);
      quad(a0 - .3, s0, a0, s1, P + .002, KERB); quad(a1, s0, a1 + .3, s1, P + .002, KERB);
    }
  });
}

function roadMarkings(api, quad, { along, at }) {
  const cross = ROADS.filter(r => r.along !== along).map(r => r.at);
  for (let k = -L; k < L; k += 3) {
    if (cross.some(c => Math.abs(k + .8 - c) < RW / 2 + .5)) continue;
    if (along === 'x') api.line([[k, G + .004, at], [k + 1.6, G + .004, at]], '#f2d16b', .06); else api.line([[at, G + .004, k], [at, G + .004, k + 1.6]], '#f2d16b', .06);
  }
  // Stop lines before each intersection.
  cross.forEach(c => [-1, 1].forEach(s => { const e = c + s * (RW / 2 + .4), l0 = s > 0 ? at : at - RW / 2, l1 = s > 0 ? at + RW / 2 : at;
    if (along === 'x') quad(e - .15, l0, e + .15, l1, G + .005, '#f4f1e8'); else quad(l0, e - .15, l1, e + .15, G + .005, '#f4f1e8'); }));
}

// A zebra crossing across a street at position `pos` along it, with tactile paving on both kerbs.
function crossing(api, quad, along, at, pos) {
  const a0 = at - RW / 2, a1 = at + RW / 2;
  for (let k = 0; k < 6; k++) { const s = a0 + .55 + k * .85; if (along === 'x') quad(pos - 1.6, s, pos + 1.6, s + .45, G + .006, '#f4f1e8'); else quad(s, pos - 1.6, s + .45, pos + 1.6, G + .006, '#f4f1e8'); }
  if (along === 'x') { quad(pos - 1.6, a0 - .9, pos + 1.6, a0 - .3, P + .003, TACTILE); quad(pos - 1.6, a1 + .3, pos + 1.6, a1 + .9, P + .003, TACTILE); }
  else { quad(a0 - .9, pos - 1.6, a0 - .3, pos + 1.6, P + .003, TACTILE); quad(a1 + .3, pos - 1.6, a1 + .9, pos + 1.6, P + .003, TACTILE); }
}

// A muted low-rise neighbour: walls, parapet, a sparse grid of pale windows, a glazed ground floor under a plain
// awning, then a haze wash over the whole thing so it sits back from the shop.
// Ludo neighbour buildings, picked by wall colour and height, scaled to the footprint's on-screen width and set on
// its nearest corner, fully opaque (a see-through building reads as a ghost).
function buildingSprite(api, x0, x1, z0, z1, h, wall) {
  const name = wall === STONE ? (h >= 8 ? 'building.mid.stone' : 'building.low.stone') : wall === TAN ? 'building.low.tan' : wall === SAGE ? 'building.low.sage' : 'building.corner';
  lazySprite(name, 'sprites/buildings/' + name + '.png', { w: 1, drop: 0 });
  if (!spriteReady(name)) return false;
  const p = api.project, base = [p(x0, P, z0), p(x1, P, z0), p(x1, P, z1), p(x0, P, z1)];
  const l = Math.min(...base.map(q => q.x)), r = Math.max(...base.map(q => q.x)), b = Math.max(...base.map(q => q.y));
  const top = Math.min(...[p(x0, P + h, z0), p(x1, P + h, z0), p(x1, P + h, z1), p(x0, P + h, z1)].map(q => q.y));
  const img = SPRITES[name].img, ar = img.naturalHeight / img.naturalWidth, ht = Math.min((r - l) * 1.04 * ar, (b - top) * 1.05), w = ht / ar, ctx = api.ctx;
  ctx.drawImage(img, (l + r) / 2 - w / 2, b - ht + api.unit * .3, w, ht);
  return true;
}

function building(api, [x, z, w, d, h, wall, awning]) {
  const p = api.project, x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2;
  api.poly([p(x0, P, z1), p(x0 - h * .3, P, z1 + h * .18), p(x1 - h * .3, P, z1 + h * .18), p(x1, P, z1)], 'rgba(40,40,30,.12)');
  if (buildingSprite(api, x0, x1, z0, z1, h, wall)) return;
  api.box(x, z, P, w, d, h, wall);
  api.box(x, z, P + h, w + .2, d + .2, .3, [api.shade(wall[0], .93), api.shade(wall[1], .9), api.shade(wall[2], .9)]);
  for (let y = 2.9; y < h - .9; y += 1.8) {
    for (let k = x0 + 1; k < x1 - 1; k += 1.8) api.poly([p(k, y, z1 + .01), p(k + .8, y, z1 + .01), p(k + .8, y + .95, z1 + .01), p(k, y + .95, z1 + .01)], '#dfe6e8');
    for (let k = z0 + 1; k < z1 - 1; k += 1.8) api.poly([p(x1 + .01, y, k), p(x1 + .01, y, k + .8), p(x1 + .01, y + .95, k + .8), p(x1 + .01, y + .95, k)], '#d3dcdf');
  }
  api.poly([p(x0 + .6, P + .2, z1 + .01), p(x1 - .6, P + .2, z1 + .01), p(x1 - .6, P + 1.8, z1 + .01), p(x0 + .6, P + 1.8, z1 + .01)], '#aac3cb');
  api.poly([p(x1 + .01, P + .2, z0 + .6), p(x1 + .01, P + .2, z1 - .6), p(x1 + .01, P + 1.8, z1 - .6), p(x1 + .01, P + 1.8, z0 + .6)], '#b9ced4');
  api.poly([p(x0 + .4, P + 2.3, z1), p(x1 - .4, P + 2.3, z1), p(x1 - .4, P + 1.95, z1 + .8), p(x0 + .4, P + 1.95, z1 + .8)], awning);
  api.poly([p(x1, P + 2.3, z0 + .4), p(x1, P + 2.3, z1 - .4), p(x1 + .8, P + 1.95, z1 - .4), p(x1 + .8, P + 1.95, z0 + .4)], awning);
  const haze = 'rgba(238,230,214,.24)';
  api.poly([p(x0, P, z1), p(x1, P, z1), p(x1, P + h + .3, z1), p(x0, P + h + .3, z1)], haze);
  api.poly([p(x1, P, z0), p(x1, P, z1), p(x1, P + h + .3, z1), p(x1, P + h + .3, z0)], haze);
  api.poly([p(x0, P + h + .3, z0), p(x1, P + h + .3, z0), p(x1, P + h + .3, z1), p(x0, P + h + .3, z1)], haze);
}

// Soft shadows on the ground plane. The ground is an affine image of the world plane, so a blurred disc drawn under
// that transform lies flat on it. The disc is pre-rendered once (radial gradients misbehave under the skewed
// transform, and Safari has no canvas filter). Each object gets a tight contact shadow under its footprint and a
// fainter cast shadow thrown down-right, away from the sprites' upper-left key light.
let SHADOW_TEX = null;
function shadowTexture() {
  if (SHADOW_TEX || typeof document === 'undefined') return SHADOW_TEX;
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  [[0, 1], [.25, .92], [.5, .62], [.72, .3], [.88, .1], [1, 0]].forEach(([t, a]) => grad.addColorStop(t, 'rgba(46,52,36,' + a + ')'));
  g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  return (SHADOW_TEX = c);
}
export function softShadow(api, x, y, z, rx, rz, alpha) {
  const tex = shadowTexture(); if (!tex) return;
  const o = api.project(x, y, z), ex = api.project(x + 1, y, z), ez = api.project(x, y, z + 1), ctx = api.ctx;
  ctx.save(); ctx.transform(ex.x - o.x, ex.y - o.y, ez.x - o.x, ez.y - o.y, o.x, o.y);
  ctx.globalAlpha *= alpha; ctx.drawImage(tex, -rx, -rz, rx * 2, rz * 2); ctx.restore();
}
// Contact plus cast for a footprint of half-sizes hx × hz with a given height.
function groundShadow(api, x, y, z, hx, hz, height) {
  softShadow(api, x, y, z, hx * 1.25, hz * 1.25, .42);
  const reach = height * .45;
  softShadow(api, x + reach * .6, y, z - reach * .15, hx + reach * .7, hz * 1.1 + reach * .2, .22);
}
function streetShadows(api, front) {
  const rear = ([x, z]) => z < -9 || x < -13;
  if (!front) FAR_TREES.concat(NEAR_TREES).forEach(([x, z]) => { softShadow(api, x, P, z, .9, .9, .35); softShadow(api, x + 1.5, P, z - .3, 2.2, 1.8, .2); });
  LAMPS.filter(l => rear(l) !== front).forEach(([x, z]) => { softShadow(api, x, P, z, .35, .35, .45); softShadow(api, x + 1.6, P, z - .3, 1.6, .35, .16); });
  if (front) [[18, -6], [18, 6], [-8, 16.5], [8, 16.5]].forEach(([x, z]) => groundShadow(api, x, P, z, .55, 1.4, 1));
  if (front) groundShadow(api, 0, P, 16.5, 1.2, .35, .9);
  if (front) groundShadow(api, 18, P, 0, .35, 1.2, .9);
}
function streetTree(api, x, z) {
  const p = api.project, u = api.unit;
  if (((Math.round(x) + Math.round(z)) & 3) === 1 && prop(api, 'street.tree.02', x, z)) return;
  if (drawSprite(api, 'tree', x, z)) return;
  const sh = p(x, P, z); api.ellipse(sh.x - u * .8, sh.y + u * .2, u * 1.8, u * .7, 'rgba(40,50,30,.18)');
  // Tree pit: dark soil under an iron grate.
  api.poly([p(x - .8, P + .003, z - .8), p(x + .8, P + .003, z - .8), p(x + .8, P + .003, z + .8), p(x - .8, P + .003, z + .8)], '#5a4a38');
  for (let k = -.6; k <= .6; k += .3) api.line([[x - .8, P + .005, z + k], [x + .8, P + .005, z + k]], '#3a3f3c', .03);
  api.line([[x, P, z], [x, 2.4, z]], '#7a5232', .2);
  [[-.6, 2.6, .3, 1, '#3f7432'], [0, 3, 0, 1.25, '#4f8a38'], [.6, 2.7, -.3, .95, '#5f9a3e'], [.1, 3.7, .1, .9, '#7cb648']].forEach(([dx, y, dz, r, c], k) => { const q = p(x + dx, y, z + dz); api.blob(q.x, q.y, u * r, u * r * .9, c, x * 5 + z + k, .1); });
  const hi = p(x + .3, 3.9, z - .2); api.ellipse(hi.x, hi.y, u * .4, u * .26, 'rgba(255,255,210,.3)');
}

// Street props from the Ludo street batch; each falls back to its drawn version until the image has loaded.
const PROPS = { 'street.lamp': { h: 4.6, drop: .1 }, 'street.bench': { w: 2.4, drop: .25 }, 'street.planter': { w: 3.2, drop: .35 }, 'street.cafe.table': { w: 2.3, drop: .3 },
  'street.coffeecart': { w: 2.6, drop: .35 }, 'street.bin': { h: 1.1, drop: .1 }, 'street.hydrant': { h: .95, drop: .08 }, 'street.bikerack': { w: 2.6, drop: .35 },
  'street.busstop': { w: 3.6, drop: .4 }, 'street.tree.02': { h: 5.4, drop: .4 } };
function prop(api, name, x, z, flip) {
  if (!PROPS[name]) return false;
  lazySprite(name, 'sprites/street/' + name + '.png', PROPS[name]);
  return drawSprite(api, name, x, z, flip);
}
function lamp(api, x, z) {
  if (prop(api, 'street.lamp', x, z)) return;
  api.box(x, z, P, .5, .5, .25, ['#4a5450', '#2f3a36', '#3a4641']);
  api.line([[x, P, z], [x, 4.4, z]], '#2f3a36', .09);
  api.box(x, z, 4.3, .55, .55, .35, ['#f6e7b6', '#2f3a36', '#3a4641']);
  // A small banner hung from the post, in the shop's green.
  const p = api.project; api.poly([p(x + .08, 3.9, z), p(x + .08, 2.6, z), p(x + .9, 2.6, z), p(x + .9, 3.9, z)], '#3e6e5c');
}

function planter(api, x, z) {
  if (prop(api, 'street.planter', x, z)) return;
  const p = api.project, u = api.unit;
  api.box(x, z, P, 1.8, 1.1, .6, ['#cfc6b0', '#9b917a', '#b5ab93']);
  for (let k = 0; k < 3; k++) { const q = p(x - .5 + k * .5, .6, z); api.blob(q.x, q.y, u * .45, u * .36, ['#4f8a38', '#6ea845', '#8fc257'][k], x + k, .14); }
  [['#e8524a', -.4], ['#f4c542', .1], ['#f39ab4', .45]].forEach(([c, dx]) => { const q = p(x + dx, .9, z + .1); api.ellipse(q.x, q.y, u * .1, u * .1, c); });
}

function bench(api, x, z, flip) {
  if (prop(api, 'street.bench', x, z, flip)) return;
  const wood = ['#b98a5a', '#7a5636', '#9c7247'], iron = ['#3a3f3c', '#22262a', '#2f3435'];
  [-1, 1].forEach(s => api.box(x + s * 1, z, P, .12, .6, .5, iron));
  for (let i = 0; i < 4; i++) api.box(x, z - .3 + i * .2, P + .48, 2.4, .15, .08, wood);
  api.box(x, z - .42, P + .56, 2.4, .1, .6, wood);
}

function umbrella(api, x, z) {
  if (prop(api, 'street.cafe.table', x, z)) return;
  const p = api.project, u = api.unit;
  api.box(x, z, P, .9, .9, .55, ['#e8e2d2', '#b3ac9a', '#cfc8b6']);
  api.line([[x, P + .5, z], [x, 2.4, z]], '#6b6b6b', .06);
  const q = p(x, 2.3, z); api.ellipse(q.x, q.y, u * 1.05, u * .52, '#e0564a'); api.ellipse(q.x, q.y - u * .08, u * .55, u * .22, '#ef7a6e');
  [[-.6, .4], [.6, -.4]].forEach(([dx, dz]) => api.box(x + dx, z + dz, P, .4, .4, .45, ['#3e6e5c', '#2a4c3f', '#35604f']));
}

function cart(api, x, z) {
  if (prop(api, 'street.coffeecart', x, z)) return;
  const p = api.project, u = api.unit;
  const body = ['#f4f1e4', '#b9ad8f', '#d9cfae'];
  api.box(x, z, P + .35, 2, 1.1, 1, body);
  api.box(x, z + .5, P + 1.35, 2.1, .3, .12, ['#3e6e5c', '#2a4c3f', '#35604f']);
  api.poly([p(x - 1.2, P + 2.2, z - .6), p(x + 1.2, P + 2.2, z - .6), p(x + 1.2, P + 1.9, z + .9), p(x - 1.2, P + 1.9, z + .9)], '#e0564a');
  for (let k = -1; k <= 1; k += .5) api.poly([p(x + k - .2, P + 2.2, z - .6), p(x + k + .05, P + 2.2, z - .6), p(x + k + .05, P + 1.9, z + .9), p(x + k - .2, P + 1.9, z + .9)], '#f8f3e6');
  [-1, 1].forEach(s => api.line([[x + s * 1.1, P + 1.35, z - .5], [x + s * 1.1, P + 2.2, z - .5]], '#3a3f3c', .05));
  [-.7, .7].forEach(dx => { const q = p(x + dx, P + .3, z + .5); api.ellipse(q.x, q.y, u * .3, u * .3, '#25282b'); api.ellipse(q.x, q.y, u * .12, u * .12, '#8a8f93'); });
  api.box(x - .5, z, P + 1.35, .5, .4, .35, ['#8a5a3a', '#5a3a22', '#70482e']); api.box(x + .5, z, P + 1.35, .4, .4, .3, ['#f4c542', '#b0891f', '#d4a92f']);
}

function bin(api, x, z) { if (prop(api, 'street.bin', x + 0, z)) return; api.box(x, z, P, .6, .6, .9, ['#2f4a3f', '#1d3029', '#27403a']); api.box(x, z, P + .9, .7, .7, .1, ['#3a5a4c', '#223a30', '#2f4c40']); }
function hydrant(api, x, z) { if (prop(api, 'street.hydrant', x + 0, z)) return; api.box(x, z, P, .35, .35, .8, ['#e0564a', '#9c3a31', '#c2483e']); api.box(x, z, P + .3, .7, .3, .22, ['#e0564a', '#9c3a31', '#c2483e']); api.box(x, z, P + .8, .25, .25, .18, ['#f0a090', '#9c3a31', '#c2483e']); }
function bikeRack(api, x, z) { if (prop(api, 'street.bikerack', x + .8, z)) return; for (let k = 0; k < 3; k++) { const bx = x + k * .8; api.line([[bx, P, z - .5], [bx, P + .8, z - .5], [bx, P + .8, z + .5], [bx, P, z + .5]], '#3a3f3c', .06); } }

function busStop(api, x, z) {
  if (prop(api, 'street.busstop', x, z)) return;
  const p = api.project, glass = 'rgba(190,220,230,.55)';
  [-1.4, 1.4].forEach(dz => api.line([[x + .5, P, z + dz], [x + .5, 2.5, z + dz]], '#3a3f3c', .07));
  api.poly([p(x + .5, P + .1, z - 1.4), p(x + .5, P + .1, z + 1.4), p(x + .5, 2.4, z + 1.4), p(x + .5, 2.4, z - 1.4)], glass);
  api.box(x, z, 2.5, 1.6, 3.2, .18, ['#3e6e5c', '#2a4c3f', '#35604f']);
  bench(api, x, z); api.box(x + .5, z - 1.5, P, .18, .4, 2.6, ['#4a5450', '#2f3a36', '#3a4641']);
}

// A rounded compact car, nose along x or z, drawn at street level.
function car(api, x, z, along, color) {
  const p = api.project, u = api.unit, ax = along === 'x', Lc = 2.6, W = 1.3;
  const variant = { '#e0564a': 'red', '#f4f1e4': 'white', '#4f8fd0': 'blue', '#f2c14e': 'yellow', '#6ea845': 'green', '#e8913c': 'orange', '#8a6fd1': 'purple' }[color];
  const carName = (variant ? 'street.car.' + variant : 'street.van') + (ax ? '.fr' : '.fl');
  lazySprite(carName, 'sprites/street/' + carName + '.png', variant ? { w: 3.1, drop: .55 } : { w: 3.3, drop: .55 });
  if (spriteReady(carName) || spriteReady('car')) groundShadow(api, x, G, z, ax ? 1.5 : .75, ax ? .75 : 1.5, 1.4);
  if (carName === 'street.car.red.fr' ? spriteReady('car') : spriteReady(carName)) {
    const ctx = api.ctx, q = api.project(x, G, z);
    ctx.save(); ctx.translate(0, q.y - api.project(x, 0, z).y);
    drawSprite(api, carName === 'street.car.red.fr' ? 'car' : carName, x, z, false); ctx.restore(); return;
  }
  if (spriteReady('car')) {
    // One red hero sprite stands in for every colour; z-street cars are mirrored so they face along their lane.
    const ctx = api.ctx, hue = { '#f4f1e4': 0, '#4f8fd0': 210, '#f2c14e': 45, '#6ea845': 100, '#e8913c': 25, '#8a6fd1': 260 }[color] || 0;
    ctx.save(); if (hue && 'filter' in ctx) ctx.filter = 'hue-rotate(' + hue + 'deg)';
    const q = api.project(x, G, z); api.ctx.translate(0, q.y - api.project(x, 0, z).y);
    drawSprite(api, 'car', x, z, !ax); ctx.restore(); return;
  }
  const sh = p(x, G, z); api.ellipse(sh.x - u * .4, sh.y + u * .2, u * 1.8, u * .7, 'rgba(30,30,30,.22)');
  [[-.85, 1], [.85, 1], [-.85, -1], [.85, -1]].forEach(([a, s]) => { const q = ax ? p(x + a, G + .25, z + s * W / 2) : p(x + s * W / 2, G + .25, z + a); api.ellipse(q.x, q.y, u * .24, u * .24, '#25282b'); });
  const dark = api.shade(color, .72), mid = api.shade(color, .86);
  api.box(x, z, G + .25, ax ? Lc : W, ax ? W : Lc, .6, [color, ax ? dark : mid, ax ? mid : dark]);
  api.box(x - (ax ? .15 : 0), z - (ax ? 0 : .15), G + .85, ax ? 1.5 : W * .86, ax ? W * .86 : 1.5, .5, ['#e9eef0', '#7f98a6', '#9fb6c2']);
}

// Cars loop along their lane; the back pass takes the rear and left streets, the front pass the front and right.
function drawCars(api, back, at) {
  const t = api.now * .00022;
  const list = CARS.map(([ri, lane, dir, phase, color]) => {
    const r = ROADS[ri], s = (((phase + dir * t) % 1) + 1) % 1 * 90 - 45;
    return r.along === 'x' ? [s, r.at + lane, 'x', color] : [r.at + lane, s, 'z', color];
  }).filter(c => back === (c[1] < -12 || c[0] < -19));
  list.forEach(c => at(c[0], c[1], () => car(api, ...c)));
}

// Pedestrians pace their pavement segment; each has its own phase so they spread out and cross paths.
function drawWalkers(api, back, at) {
  const t = api.now * .00012;
  WALKS.filter(w => w[5] === back).forEach(([x0, z0, x1, z1, n], wi) => {
    for (let k = 0; k < n; k++) {
      const ph = ((t * (.8 + k * .17) + k / n + wi * .31) % 1), f = ph < .5 ? ph * 2 : 2 - ph * 2;
      const px = x0 + (x1 - x0) * f, pz = z0 + (z1 - z0) * f;
      const dir = (x1 - x0) * (ph < .5 ? 1 : -1), stride = api.now * .009 + k * 1.7;
      at(px, pz, () => { if (!drawPersonSprite(api, px, pz, -(wi * 3 + k + 1), false, dir, stride, api.now > 0 ? 1 : 0)) api.person(px, pz, 40 + wi * 7 + k, api.now > 0); });
    }
  });
}
