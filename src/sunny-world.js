// The sunny look (the default since 2026-10-15): instead of a diorama floating in a dark studio, the main shop sits
// on a sunlit city block that runs to the screen edges. The shop's slab and the sidewalk are one continuous paved plaza, a
// kerb drops to sunken asphalt streets on all four sides, and muted low-rise neighbours sit beyond the far kerbs so
// the shop stays the brightest, most detailed thing on screen. Cars circulate on the streets and pedestrians walk
// the pavements. "?look=classic" brings the studio diorama back; nothing here touches saves or rules.
//
// Two passes: `back` paints the ground and everything behind or beside-left of the shop (where the shop is nearer
// and paints over any overlap); `front` paints only low furniture, cars and walkers on the front and right, placed
// so nothing tall ever covers a station.
// Kevin made the sunny all-sprite shop the default on 2026-10-13 (shipped to main 2026-10-15). "?look=sunny" and
// "?sprites=shop" are still accepted; "?look=classic" opts out of the city block, "?sprites=drawn" of the shop sprites.
const search = typeof location !== 'undefined' ? location.search : '';
export const SUNNY = !/[?&]look=(classic|studio|drawn)\b/.test(search);
// The shop's own sprites (stations, shell, people) come with the sunny look: mixed with the drawn shell they read as pasted on.
export const SHOP_SPRITES = SUNNY && !/[?&]sprites=(drawn|off|none)\b/.test(search);

// Hero sprites (rendered in Ludo.ai from the sprite brief). Each is placed by its footprint centre: `w` is the
// on-screen width in world units at zoom 1, `drop` how far the image's bottom edge sits below the footprint centre
// (the near corner of an isometric base projects below its centre). Until an image loads, the code-drawn fallback
// paints instead, so a slow network never leaves a hole.
const SPRITES = { person: { w: .95, drop: .1 }, counter: { w: 3.3, drop: .55 }, grow: { w: 4.3, drop: .62 }, tree: { w: 3.4, drop: .5 } };
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
  // An unbought station is its taped-off plot (Kevin's 2026-10-15 site renders, on the bench's own footprint).
  if (!(level > 0) && key !== 'security') {
    const site = 'station.' + key + '.site';
    lazySprite(site, 'sprites/interior/' + site + '.png', STATION_SIZE[key]);
    if (spriteReady(site)) return site;
  }
  const want = stationTier(level), order = [want, ...[1, 2, 3].filter(t => t !== want).sort((a, b) => Math.abs(a - want) - Math.abs(b - want))];
  for (const t of order) {
    const name = 'station.' + key + '.tier' + t;
    lazySprite(name, 'sprites/interior/' + name + '.png', STATION_SIZE[key]);
    if (spriteReady(name)) return name;
  }
  return null;
}
// People: the twenty characters (thirteen customers, seven street walkers: people-v3 plus Kevin's nine of 2026-10-15)
// form one cast, since every one of them comes in stand/walk, bag/empty, left/right variants. Customers take the
// queue cast in turn by id, so the same figure is never within nineteen places of itself in a queue (Kevin: too many
// repeats in a row); the jogger (walker 5, who has no bag pose) keeps to the pavements. Street walkers are cast by
// their index along WALKS, fifteen different figures, the seven walkers spread among them.
const PEOPLE = [['customer', 1], ['customer', 2], ['customer', 3], ['customer', 4], ['customer', 5], ['customer', 6], ['customer', 7], ['customer', 8], ['customer', 9], ['customer', 10], ['customer', 11], ['customer', 12], ['customer', 13],
  ['walker', 1], ['walker', 2], ['walker', 3], ['walker', 4], ['walker', 5], ['walker', 6], ['walker', 7]];
// The people with an original single-direction render to stand in while their variants load: Kevin's 2026-10-15 cast
// (customers 8 to 13, walkers 5 to 7) was only ever rendered facing both ways, so asking for one would be a 404.
const ORIGINAL_RENDERS = { customer: 7, walker: 4, staff: 3 };
const QUEUE_CAST = PEOPLE.map((_, i) => i).filter(i => !(PEOPLE[i][0] === 'walker' && PEOPLE[i][1] === 5));
const WALKER_CAST = [13, 0, 14, 1, 15, 2, 16, 3, 17, 4, 18, 5, 19, 6, 7];
const STAFF_FOR_LINE = [2, 2, 2, 1, 1, 1, 3, 1];
// staff-v3 working poses by line: growers upstairs, a packer at pack and pickup, budtenders at orders and the online counter, the supervisor at the ID desk.
const STAFF_V3 = { 0: '05.grower', 1: '05.grower', 2: '05.grower', 3: '06.packer', 4: '04.budtender', 5: '06.packer', 6: '07.supervisor', 7: '04.budtender' }; // seeds/grow/harvest growers, pack/orders/pickup budtenders, 6 is the ID desk, 7 the online packing counter
// staff-work-v4 (Kevin, 2026-10-14): eight distinct staff, one per post, each with a four-frame work loop on the same
// 224x320 canvas as people-v3 (anchor x 112, feet at y 315). The renders face screen right only, so a figure that
// faces the floor (facing >= 0) is mirrored. Identity 8 is the lounge host; 7, the online packing counter of the
// drawn deck, shares the packer.
const STAFF_V4 = { 0: '04.seeds', 1: '05.grow', 2: '06.harvest', 3: '07.pack', 4: '08.orders', 5: '09.pickup', 6: '10.security', 7: '07.pack', 8: '11.lounge' };
// The loop runs at 4 fps as a ping-pong (1 2 3 4 3 2) while the post is working and holds frame 1 when it is idle or
// when motion is reduced (api.now is 0 then); each identity starts at its own point in the loop.
const STAFF_V4_LOOP = [1, 2, 3, 4, 3, 2];
function staffV4Frame(api, identity, working) { return working && api.now ? STAFF_V4_LOOP[Math.floor(api.now / 250 + identity * 1.7) % 6] : 1; }
// Every figure sits on the same 448x640 canvas, 600 px tall with its feet 8 px above the bottom edge.
// Figures are drawn 2.3 units tall: the Ludo counters and cars came out chunky, and true-to-life people looked like toys beside them.
const PERSON_SIZE = { h: 2.3 * 640 / 600, drop: 2.3 * 8 / 600 + .03 };
// people-complete-v3: every customer and walker also comes as 224x320 variants, posed stand/walk, with or without the
// pickup bag in hand, facing left or right (so no mirroring). Figures are about 295 px tall with their feet 5 px up.
const PERSON_V3_SIZE = { h: 2.3 * 320 / 295, drop: 2.3 * 5 / 295 + .03 };
function hashId(n) { n = Math.imul((n | 0) + 1, 0x9e3779b1) >>> 0; n = Math.imul(n ^ (n >>> 15), 0x45d9f3b) >>> 0; return (n ^ (n >>> 16)) >>> 0; }
function personName(role, nn, walking) { return 'person.' + role + '.' + (nn < 10 ? '0' : '') + nn + '.' + (walking ? 'walk' : 'stand'); }
// Walkers on the pavement carry a pickup bag by a stable identity, as if they had just left the shop.
export function walkerHasBag(identity) { return hashId(identity) % 3 === 0; }
// Draws a sprite figure in place of a code-drawn one. Walking alternates the stand and stride frames on the step
// cycle. Customers and walkers pick the left- or right-facing variant from the sign of `facing` and carry the pickup
// bag when `bag` is set; staff play their v4 work loop while `working` is set, mirrored to face the floor (the
// original and v3 renders stand in until the loop's frames have loaded). Returns false until a frame has loaded.
export function drawPersonSprite(api, x, z, identity, employee, facing, phase, amount, bag, working) {
  let role = 'staff', nn;
  if (employee) nn = STAFF_FOR_LINE[identity] || 1;
  else [role, nn] = PEOPLE[identity < 0 ? WALKER_CAST[(-identity - 1) % WALKER_CAST.length] : QUEUE_CAST[identity % QUEUE_CAST.length]];
  if (role === 'walker' && nn === 5) bag = false; // the jogger carries nothing
  const walking = amount > .3 && Math.floor(phase / Math.PI) % 2 === 0;
  // The walk is two frames (stand, stride) on the step cycle, so the body also rises and settles once a step, the way
  // a walker does, to carry the motion between them. `phase` advances with the ground covered, never with the clock.
  let lift = amount > .3 ? amount * .05 * (1 - Math.cos(2 * phase)) / 2 : 0;
  let name = personName(role, nn, walking), flip = employee ? facing >= 0 : facing < 0;
  const base = personName(role, nn, false);
  // Staff: the v4 work loop first, all four frames requested together so the loop never stutters on a late frame.
  const v4 = employee && STAFF_V4[identity] ? 'person.staff.' + STAFF_V4[identity] + '.work.0' : null;
  if (v4) {
    for (let f = 1; f <= 4; f++) lazySprite(v4 + f, 'sprites/people/' + v4 + f + '.png', PERSON_V3_SIZE);
    const frame = v4 + staffV4Frame(api, identity, working);
    if (spriteReady(frame)) name = frame; else if (spriteReady(v4 + '1')) name = v4 + '1';
  }
  // Latest renders face both ways themselves, so no mirroring. The staff ones are role-specific working poses
  // (no walking frames); their `facing` keeps the sign the original mirrored renders used, so >= 0 faces the floor.
  const v3 = name !== personName(role, nn, walking) ? null : employee
    ? (STAFF_V3[identity] || (identity > 7 ? '04.budtender' : null)) && 'person.staff.' + (STAFF_V3[identity] || '04.budtender') + '.work.' + (facing >= 0 ? 'left' : 'right')
    : personName(role, nn, walking) + (bag ? '.bag' : '.empty') + (facing < 0 ? '.left' : '.right');
  if (v3) {
    lazySprite(v3, 'sprites/people/' + v3 + '.png', PERSON_V3_SIZE);
    if (spriteReady(v3)) { name = v3; flip = false; }
  }
  // Kevin's 2026-10-15 walk cycles: four frames a step pair (contact, pass, contact, pass), stored facing right and
  // mirrored to face left. The step phase picks the frame, and the frames carry the rise and settle, so no bob.
  if (!employee && amount > .3) {
    const cyc = personName(role, nn, true) + (bag ? '.bag' : '.empty') + '.0';
    for (let f = 0; f < 4; f++) lazySprite(cyc + f, 'sprites/people/' + cyc + f + '.png', PERSON_V3_SIZE);
    const frame = cyc + ((Math.floor(phase / (Math.PI / 2)) % 4) + 4) % 4;
    if (spriteReady(frame)) { name = frame; flip = facing < 0; lift = 0; }
  }
  if (name === personName(role, nn, walking)) {
    // Original single-direction renders, until the variant has loaded or when it is missing.
    if (nn > (ORIGINAL_RENDERS[role] || 0)) return false;
    lazySprite(name, 'sprites/people/' + name + '.png', PERSON_SIZE);
    lazySprite(base, 'sprites/people/' + base + '.png', PERSON_SIZE);
    name = spriteReady(name) ? name : spriteReady(base) ? base : null;
  }
  if (!name) return false;
  const p = api.project(x, 0, z), u = api.unit;
  api.ellipse(p.x + u * .06, p.y + u * .03, u * .34, u * .1, 'rgba(14,28,20,.22)');
  return drawSprite(api, name, x, z, flip, 1, lift);
}
// Shop fixtures from the interior batch, sized in world units like the stations.
const FIXTURE_SIZE = { 'station.security.site': { w: 2.2, drop: .45 }, 'event.festival.stall': { w: 2.6, drop: .45 }, 'station.orders.compact.tier1': { w: 2.15, drop: .45 }, 'station.orders.compact.tier2': { w: 2.15, drop: .45 }, 'station.orders.compact.tier3': { w: 2.2, drop: .45 }, 'shop.kiosk': { w: 1, drop: 0 }, 'shop.displaycase': { w: 4, drop: .55 }, 'shop.planter.small': { w: .95, drop: .12 },
  // Latest main-shop-v2 batch: placed by main.js on world boxes or wall anchors, so their sizes here are unused.
  ...Object.fromEntries(['lounge.sofa', 'lounge.coffee.table', 'lounge.lamp.on', 'lounge.lamp.off', 'lounge.rug.floor', 'lounge.carpet.entry', 'lounge.sign.lit', 'lounge.sign.dark', 'street.bollard', 'street.sconce', 'shell.exit.lamp', 'shell.fan.housing', 'drone.courier.loaded', 'prop.jar', 'prop.pickup.bag', 'prop.carton', 'prop.tote', 'prop.cap', 'prop.tee'].map(n => [n, { w: 1, drop: 0 }])) };
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
export function spriteReady(name) { const s = SPRITES[name]; return !!(s && !s.missing && s.img && (s.ready || (s.img.complete && s.img.naturalWidth))); }
// Draws a sprite at world (x, z) on the current floor; flip mirrors it so a figure can face the other way. A size's
// `ox` is how far (in world units of screen width) the image's centre sits right of the footprint centre, for renders
// such as the vehicles whose mirrors or tail stick out on one side.
export function drawSprite(api, name, x, z, flip, scale, lift, haze) {
  const s = SPRITES[name]; if (!spriteReady(name)) return false;
  const q = api.project(x, 0, z), u = api.unit, ar = (s.img.naturalHeight || s.img.height) / (s.img.naturalWidth || s.img.width), w = (s.h ? s.h / ar : s.w) * u * (scale || 1), h = w * ar, ctx = api.ctx;
  ctx.save(); ctx.translate(q.x + (s.ox || 0) * u * (scale || 1) * (flip ? -1 : 1), q.y + (s.drop * (scale || 1) - (lift || 0)) * u); if (flip) ctx.scale(-1, 1);
  ctx.drawImage(s.img, -w / 2, -h, w, h);
  if (haze > 0) { const m = hazeMask(name); if (m) { ctx.globalAlpha *= haze; ctx.drawImage(m, -w / 2, -h, w, h); } }
  ctx.restore();
  return true;
}
// A sprite's haze: its own silhouette in the haze colour, kept at a quarter of the render's size (the haze is soft),
// laid over the sprite at the haze's strength, so a far render fades into the sky without the ground showing through.
function hazeMask(name) {
  const s = SPRITES[name]; if (s.hazeMask !== undefined) return s.hazeMask;
  if (typeof document === 'undefined') return (s.hazeMask = null);
  const w = Math.max(1, Math.round((s.img.naturalWidth || s.img.width) / 4)), h = Math.max(1, Math.round((s.img.naturalHeight || s.img.height) / 4)), c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'); g.drawImage(s.img, 0, 0, w, h); g.globalCompositeOperation = 'source-in'; g.fillStyle = hazeRGBA(1); g.fillRect(0, 0, w, h);
  return (s.hazeMask = c);
}

const P = -.012, G = -.33, L = 90; // plaza level (flush with the slab top), street level, half-extent of the streets
// Streets, kerb to kerb 6 wide, sunk a third of a unit below the pavement. The four round the shop carry the traffic;
// behind each terrace runs a quiet back street (a block's depth beyond the first), so every row of neighbours fronts a
// street of its own instead of standing on the heels of the row before it, and every street runs on through its
// junctions into the haze rather than ending.
const ROADS = [{ along: 'x', at: -18.5 }, { along: 'x', at: 21.5 }, { along: 'z', at: -22.5 }, { along: 'z', at: 22.5 },
  { along: 'x', at: -36.5 }, { along: 'x', at: 40.5 }, { along: 'z', at: -48.5 }, { along: 'z', at: 42 }];
const RW = 6; // street width kerb to kerb
const PAVER = '#d2c8ab', PAVER_LINE = '#b5aa8c', TACTILE = 'rgba(217,194,122,.38)', KERB = '#e2dac4', KERB_FACE = '#a69d85', ASPHALT = '#5a5e64';
const STONE = ['#d6d0c2', '#a9a295', '#c1bbad'], TAN = ['#dac9b6', '#ad9b87', '#c6b29d'], SAGE = ['#c9cfc6', '#9ea59b', '#b4bab0'], MAUVE = ['#d6cdcf', '#a9a0a2', '#c2b8ba'];
const BRICK = ['#c4907a', '#8e6250', '#a8785f'], TERRA = ['#d9a085', '#a86d55', '#c0836a'];
// Kevin's city-block-v4 renders (2026-10-14; five of the v3 neighbours re-rendered plus five new designs), each scaled
// by its own door opening: a front door stands 1.2 adult sprites tall, so `door` (the door's height in image px) sets
// the draw scale and nothing is stretched to a footprint. These renders follow the map's 30° screen slopes, so they
// are drawn as they are; the corner shop's door reads a little taller than the others, so it draws a touch smaller.
// `foot` and `base` are the ground-contact vertex (the near corner) as fractions of the image; w and d are the
// footprint that scale implies, along x and z.
const DOOR_H = 2.3 * 1.2;
const BUILDING_SPRITES = {
  'building.corner': { door: 137.6, foot: 0.52, base: 0.999, w: 7.73, d: 7.25, wall: SAGE, h: 6 },
  'building.low.sage': { door: 117.8, foot: 0.546, base: 0.998, w: 8.77, d: 7.95, wall: SAGE, h: 6 },
  'building.low.stone': { door: 125.9, foot: 0.515, base: 0.999, w: 7.63, d: 7.94, wall: STONE, h: 6 },
  'building.low.tan': { door: 122.1, foot: 0.541, base: 0.999, w: 7.58, d: 7.52, wall: TAN, h: 6 },
  'building.mid.stone': { door: 120.9, foot: 0.541, base: 0.998, w: 8.46, d: 7.16, wall: STONE, h: 9 },
  'building.apartment.brick': { door: 117.8, foot: 0.574, base: 0.999, w: 9.47, d: 7.09, wall: BRICK, h: 9 },
  'building.rowhouse.terracotta': { door: 120.9, foot: 0.578, base: 1, w: 8.86, d: 6.68, wall: TERRA, h: 6 },
  'building.shop.narrow': { door: 124, foot: 0.586, base: 0.999, w: 8.28, d: 6.23, wall: MAUVE, h: 6 },
  'building.townhouse.sage': { door: 124, foot: 0.559, base: 0.999, w: 7.51, d: 5.89, wall: SAGE, h: 9 },
  'building.workshop.low': { door: 125.2, foot: 0.577, base: 0.999, w: 7.71, d: 7.23, wall: STONE, h: 4.5 }
};
// Neighbours: [near-corner x, near-corner z, render]. Every block round the shop is terraced edge to edge, two units
// back from the kerbs: a row's fronts share one z and a column's one x, each building butted to the last (a joint
// overlaps by a few tenths rather than leaving an alley), corner shops at the junctions. A second ring of terraces
// stands across the back streets (a whole block behind the first ring, never on its heels, so their fronts and the
// street between show above the first ring's roofs), and the outermost of them stand in the haze.
const BUILDINGS = [
  // Far row, facing the shop across the rear street.
  [-7.72, -23.5, 'building.rowhouse.terracotta'],
  [0.8, -23.5, 'building.low.sage'],
  [10.02, -23.5, 'building.apartment.brick'],
  [17.5, -23.5, 'building.corner'],
  // Left column, packed from the front street's kerb so its head clears the rear street.
  [-27.5, 16.5, 'building.corner'],
  [-27.5, 9.65, 'building.low.stone'],
  [-27.5, 2.11, 'building.low.sage'],
  [-27.5, -5.44, 'building.mid.stone'],
  // Right column, likewise.
  [37, 16.5, 'building.low.stone'],
  [37, 8.96, 'building.mid.stone'],
  [37, 2.2, 'building.low.sage'],
  [37, -5.35, 'building.low.tan'],
  // Front row, across the front street, facing away.
  [-8.03, 35.5, 'building.apartment.brick'],
  [0.63, 35.5, 'building.rowhouse.terracotta'],
  [9.2, 35.5, 'building.low.sage'],
  [17.46, 35.5, 'building.mid.stone'],
  // Corner blocks of the first ring.
  [-27.5, -23.5, 'building.corner'],
  [-34.83, -23.5, 'building.rowhouse.terracotta'],
  [36.97, -23.5, 'building.apartment.brick'],
  [-27.5, 35.5, 'building.townhouse.sage'],
  [-34.61, 35.5, 'building.low.tan'],
  [35.13, 35.5, 'building.low.stone'],
  // Second ring: the row beyond the rear back street...
  [-10.04, -41.5, 'building.townhouse.sage'],
  [-3.06, -41.5, 'building.low.tan'],
  [3.97, -41.5, 'building.low.stone'],
  [10.88, -41.5, 'building.townhouse.sage'],
  [18.55, -41.5, 'building.shop.narrow'],
  [-27.5, -41.5, 'building.corner'],
  [-34.83, -41.5, 'building.low.sage'],
  [36.77, -41.5, 'building.low.sage'],
  [55.46, -41.5, 'building.mid.stone'],
  [62.57, -41.5, 'building.townhouse.sage'],
  // ...the columns beyond the side back streets...
  [-53.5, 16.5, 'building.apartment.brick'],
  [-53.5, 9.81, 'building.low.tan'],
  [-53.5, 2.69, 'building.rowhouse.terracotta'],
  [-53.5, -3.59, 'building.townhouse.sage'],
  [-53.5, -23.5, 'building.apartment.brick'],
  [56.5, 16.5, 'building.apartment.brick'],
  [56.5, 9.81, 'building.low.tan'],
  [56.5, 2.69, 'building.rowhouse.terracotta'],
  [56.5, -3.59, 'building.townhouse.sage'],
  // ...and the far row's run beyond the right back street, fading out.
  [55.28, -23.5, 'building.shop.narrow'],
  [62.51, -23.5, 'building.low.stone'],
  [70.39, -23.5, 'building.shop.narrow']
];
// The town ends in haze. Beyond the back streets the ground, the far terraces and the cars fade into the sky colour
// over a dozen units (HAZE_RAMP: where each side starts to fade and where it is gone), so no edge of the paving and
// no end of a street is ever on screen. SUNNY_VIEW is the camera's matching limit, in world units: the point under
// the view's anchor stays inside `centre` (the shop block and its first ring of streets), and the visible area stays
// inside `reach`, measured along the camera's rotated axes (screen-right and screen-down across the ground), so the
// view never runs past the haze at any zoom; main.js applies it.
const HAZE = [220, 217, 203];
const HAZE_RAMP = { west: [-55, -66], east: [57, 69], north: [-51, -62], south: [44, 55] };
const ramp = (v, [from, to]) => Math.max(0, Math.min(1, (v - from) / (to - from)));
function hazeAt(x, z) { return Math.max(ramp(x, HAZE_RAMP.west), ramp(x, HAZE_RAMP.east), ramp(z, HAZE_RAMP.north), ramp(z, HAZE_RAMP.south)); }
const hazeRGBA = a => 'rgba(' + HAZE[0] + ',' + HAZE[1] + ',' + HAZE[2] + ',' + a + ')';
export const SUNNY_VIEW = { centre: { x: [-32, 42], z: [-30, 34] }, reach: { rx: [-55, 69], rz: [-58, 63] } };
// Kept toward the kerb, clear of the facades behind them.
const FAR_TREES = [[-12, -22.4], [-1, -22.4], [10, -22.4], [14.5, -22.4], [-26.4, -13], [-26.4, -2], [-26.4, 9], [-26.4, 20]];
const NEAR_TREES = [[-15, -13.5], [-5, -13.5], [5, -13.5], [16.5, -13.5], [-17, 4]]; // the right rear tree sits past the food truck's cab // behind / left of the shop only; nothing under the delivery deck's legs
export const LAMPS = [[-18.5, -14.5], [18.5, -14.5], [-18.5, 17.5], [18.5, 17.5], [0, -14.5], [-18.5, 1]];
// Walkers: [x0, z0, x1, z1, count]; each walks the segment back and forth on its own phase.
// Lanes keep clear of the trees, lamps and furniture: the rear and left walks run between the slab and the props, the
// front walk along the kerb in front of the planters and bench, the right walk between the slab and the bus stop.
const WALKS = [[-19, -11.6, 19, -11.6, 3], [-15.2, -15, -15.2, 18, 2], [-30, -22.9, 30, -22.9, 3], [-26.9, -26, -26.9, 26, 2],
  [-19, 18.3, 19, 18.3, 3], [15.3, -15, 15.3, 14, 2]];
// Cars: [road index, direction (+1 toward the camera: +x on the x streets, +z on the z streets), phase, colour or
// 'van']. Traffic keeps to the right, so the direction picks the lane (see drawCars). Kevin pulled the first cars on
// 2026-10-13 for reading far too small; his 2026-10-15 set (CAR_VIEW) is drawn 4.2 units long, with rear views for
// the lanes going away. Every car runs the same CAR_LOOP-unit loop at the same speed, so the phases are a timetable
// (solved by search over the lane rectangles): no two cars' bodies ever meet at any of the four junctions, with four
// units to spare, and cars sharing a lane stay a car's length and more apart.
const CARS = [[0, 1, .63, 'blue'], [0, -1, .16, 'red'], [0, 1, .53, 'van'], [1, 1, .95, 'green'], [1, -1, .48, 'white'], [1, 1, .38, 'yellow'],
  [2, 1, .86, 'purple'], [2, -1, .38, 'orange'], [2, -1, .91, 'van'], [3, 1, .12, 'blue'], [3, -1, .09, 'red'], [3, 1, .6, 'white']];
const CAR_LOOP = 132; // each car's run, centred on the shop: both ends lie in the haze, so no car pops into view

// Draw order on the streets. Each job carries its footprint on the ground; the shop is drawn between the two passes,
// so a job goes in the back pass only when nothing of it can hide the shop (its footprint ends left of the slab or
// behind it) and in the front pass otherwise. Within a pass, two footprints a plane x = c or z = c separates have a
// fixed order, since the one at larger x (or larger z) is nearer the camera and can never be hidden by the other;
// that is what keeps a car passing another in the next lane, or driving past a building, from painting over it.
// Footprints that overlap keep the centre-depth order.
const SHOP = { x0: -12, x1: 12, z0: -7.5, z1: 12 };
const behindShop = b => b.x1 <= SHOP.x0 || b.z1 <= SHOP.z0;
function inFront(a, b) {
  const sx = a.x0 >= b.x1 - 1e-6 ? 1 : b.x0 >= a.x1 - 1e-6 ? -1 : 0, sz = a.z0 >= b.z1 - 1e-6 ? 1 : b.z0 >= a.z1 - 1e-6 ? -1 : 0;
  // Separable on both axes in opposite senses means the two never overlap on screen, so no order is imposed.
  return sx && sz ? (sx === sz ? sx : 0) : sx || sz;
}
function orderJobs(jobs) {
  jobs.sort((a, b) => a.depth - b.depth);
  const n = jobs.length, before = jobs.map(() => []);
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const r = inFront(jobs[i], jobs[j]); if (r > 0) before[i].push(j); else if (r < 0) before[j].push(i); }
  const out = [], seen = new Uint8Array(n), visit = i => { if (seen[i]) return; seen[i] = 1; before[i].forEach(visit); out.push(jobs[i]); };
  for (let i = 0; i < n; i++) visit(i);
  return out;
}
// Everything that stands on the streets, with its footprint (half-extents along x and z about its ground point).
function streetJobs(api) {
  const jobs = [];
  const at = (x, z, f, hx = .5, hz = hx) => jobs.push({ x0: x - hx, x1: x + hx, z0: z - hz, z1: z + hz, depth: api.depth({ x, z }), draw: f });
  BUILDINGS.forEach(b => { const f = BUILDING_SPRITES[b[2]]; at(b[0] - f.w / 2, b[1] - f.d / 2, () => building(api, b), f.w / 2, f.d / 2); });
  FAR_TREES.concat(NEAR_TREES).forEach(([x, z]) => at(x, z, () => streetTree(api, x, z), 1.3));
  LAMPS.forEach(([x, z]) => at(x, z, () => lamp(api, x, z), .4));
  // Left-side street life: a coffee cart and café seating by the entrance, bins and a hydrant.
  at(-18, 7.5, () => cart(api, -18, 7.5), 1.3, 1);
  // Kevin's café set (2026-10-15) stands in for the two drawn umbrellas; the news boxes face the shop, and his food
  // truck parks nose-first with the traffic on the rear pavement, hatch toward the walkers.
  at(-17, 14, () => { if (!prop(api, 'street.awning.cafe', -17, 14)) { umbrella(api, -17, 12.5); umbrella(api, -17, 15.5); } }, 2.3, 1.6);
  at(-18.5, -8, () => bin(api, -18.5, -8), .4); at(-18.5, 10.5, () => hydrant(api, -18.5, 10.5), .3);
  at(-17.6, -3, () => prop(api, 'street.newsboxes', -17.6, -3, true), 1.3, 1); at(9.5, -13.6, () => prop(api, 'street.foodtruck', 9.5, -13.6), 3.75, 1.1);
  [[18, -6], [18, 6], [-8, 16.5], [8, 16.5]].forEach(([x, z]) => at(x, z, () => planter(api, x, z), 1.6, 1.2));
  at(0, 16.5, () => bench(api, 0, 16.5, true), 1.2, .5); // mirrored to run along the front street
  at(18, 0, () => bench(api, 18, 0), .5, 1.2); at(14, 16, () => bikeRack(api, 14, 16), 1.3, .6);
  at(18.5, -11, () => busStop(api, 18.5, -11), .9, 1.8); at(18.5, 12, () => bin(api, 18.5, 12), .4); at(12, 15.4, () => hydrant(api, 12, 15.4), .3);
  // 2026-10-15 street dressing: a delivery pallet by the bus stop, a fingerpost and two meters on the right kerb,
  // olive pots either side of the front bench, and a pedestrian light at the front crossing.
  at(17.2, -7.5, () => prop(api, 'street.deliveryboxes', 17.2, -7.5), 1.15, .9);
  at(19.4, 3.6, () => prop(api, 'street.signpost', 19.4, 3.6), .3); [8.4, 10.2].forEach(z => at(19.3, z, () => prop(api, 'street.meter', 19.3, z), .25));
  [-3.2, 3.2].forEach(x => at(x, 16.5, () => prop(api, 'street.planter.round', x, 16.5), .6));
  at(-10.8, 17.4, () => prop(api, 'street.trafficlight', -10.8, 17.4), .3);
  drawCars(api, at); drawWalkers(api, at);
  return jobs;
}

export function drawSunnyWorld(api, front, alpha) {
  if (!(alpha > 0)) return;
  const ctx = api.ctx, p = api.project;
  ctx.save(); ctx.globalAlpha = alpha;
  const quad = (x0, z0, x1, z1, y, fill) => api.poly([p(x0, y, z0), p(x1, y, z0), p(x1, y, z1), p(x0, y, z1)], fill);
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
    for (let k = -L + .5; k < L; k += 1.5) { api.line([[k, P + .004, -L], [k, P + .004, L]], PAVER_LINE, .02); api.line([[-L, P + .004, k + 1.5 * 3], [L, P + .004, k + 1.5 * 3]], PAVER_LINE, .02); }
    ROADS.forEach(r => roadSurface(api, quad, r));
    ROADS.forEach(r => roadKerbs(api, quad, r));
    ROADS.forEach(r => roadMarkings(api, quad, r));
    crossing(api, quad, 'x', 21.5, -8); crossing(api, quad, 'z', -22.5, 4); crossing(api, quad, 'x', -18.5, 8);
    // Zebra crossings on all four arms of every junction (the walkers' lanes round the shop run through the ones at the
    // shop's own corners).
    ROADS.filter(r => r.along === 'x').forEach(rz => ROADS.filter(r => r.along === 'z').forEach(rx => { const x = rx.at, z = rz.at; crossing(api, quad, 'x', z, x - 5.5); crossing(api, quad, 'x', z, x + 5.5); crossing(api, quad, 'z', x, z - 5.5); crossing(api, quad, 'z', x, z + 5.5); }));
    groundHaze(api);
  }
  // Buildings, trees, props, cars and walkers share one footprint-aware sort (orderJobs), so a car on the far street
  // never paints over a near tree, nor a car on the front or right street over the terraces beyond it.
  streetShadows(api, front);
  orderJobs(streetJobs(api).filter(j => behindShop(j) !== front)).forEach(j => j.draw());
  ctx.restore();
}

// The haze over the ground plane: one linear gradient per side, laid along that side's normal on screen (the ground is
// an affine image of the world plane, so a world-space band is a screen-space band), clear at the ramp's start and
// solid past its end, where the gradient clamps. Renders standing in the haze take their own share in hazeMask.
function groundHaze(api) {
  const ctx = api.ctx, p = api.project;
  const band = (along, [a, b]) => {
    const p0 = along === 'x' ? p(0, P, a) : p(a, P, 0), p1 = along === 'x' ? p(0, P, b) : p(b, P, 0), d = along === 'x' ? p(1, P, a) : p(a, P, 1);
    let nx = p0.y - d.y, ny = d.x - p0.x; const len = Math.hypot(nx, ny) || 1; nx /= len; ny /= len;
    const dist = (p1.x - p0.x) * nx + (p1.y - p0.y) * ny, g = ctx.createLinearGradient(p0.x, p0.y, p0.x + nx * dist, p0.y + ny * dist);
    g.addColorStop(0, hazeRGBA(0)); g.addColorStop(.5, hazeRGBA(.5)); g.addColorStop(1, hazeRGBA(1));
    ctx.fillStyle = g; ctx.fillRect(0, 0, api.width, api.height);
  };
  band('x', HAZE_RAMP.north); band('x', HAZE_RAMP.south); band('z', HAZE_RAMP.west); band('z', HAZE_RAMP.east);
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
  const cross = ROADS.filter(r => r.along !== along).map(r => r.at).sort((a, b) => a - b), segs = [];
  let from = -L; cross.forEach(c => { segs.push([from, c - RW / 2]); from = c + RW / 2; }); segs.push([from, L]);
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
  const a0 = at - RW / 2, a1 = at + RW / 2, c = api.project(along === 'x' ? pos : at, G, along === 'x' ? at : pos), m = api.unit * 6;
  if (c.x < -m || c.x > api.width + m || c.y < -m || c.y > api.height + m) return;
  for (let k = 0; k < 6; k++) { const s = a0 + .55 + k * .85; if (along === 'x') quad(pos - 1.6, s, pos + 1.6, s + .45, G + .006, '#f4f1e8'); else quad(s, pos - 1.6, s + .45, pos + 1.6, G + .006, '#f4f1e8'); }
  if (along === 'x') { quad(pos - 1.6, a0 - .9, pos + 1.6, a0 - .3, P + .003, TACTILE); quad(pos - 1.6, a1 + .3, pos + 1.6, a1 + .9, P + .003, TACTILE); }
  else { quad(a0 - .9, pos - 1.6, a0 - .3, pos + 1.6, P + .003, TACTILE); quad(a1 + .3, pos - 1.6, a1 + .9, pos + 1.6, P + .003, TACTILE); }
}

// A neighbour render at its door-derived scale, its ground-contact vertex on the footprint's near corner.
function buildingSprite(api, name, x1, z1) {
  const f = BUILDING_SPRITES[name];
  lazySprite(name, 'sprites/buildings/' + name + '.png', { w: 1, drop: 0 });
  if (!spriteReady(name)) return false;
  const img = SPRITES[name].img, k = DOOR_H * api.unit / f.door, w = img.naturalWidth * k, h = img.naturalHeight * k, q = api.project(x1, P, z1);
  const l = q.x - f.foot * w, t = q.y - f.base * h;
  // Most of the town is off screen at any one time; a building whose image misses the viewport costs nothing.
  if (l > api.width || l + w < 0 || t > api.height || t + h < 0) return true;
  const ctx = api.ctx, haze = hazeAt(x1 - f.w / 2, z1 - f.d / 2);
  ctx.drawImage(img, l, t, w, h);
  if (haze > 0) { const m = hazeMask(name); if (m) { ctx.save(); ctx.globalAlpha *= haze; ctx.drawImage(m, l, t, w, h); ctx.restore(); } }
  return true;
}

// Until its render has loaded, a muted low-rise block on the same footprint: walls, parapet, a sparse grid of pale
// windows, a glazed ground floor under a plain awning, then a haze wash so it sits back from the shop.
function building(api, [x1, z1, name]) {
  const f = BUILDING_SPRITES[name], p = api.project, w = f.w, d = f.d, h = f.h, wall = f.wall, awning = '#8a9e8c';
  const x0 = x1 - w, z0 = z1 - d, x = x1 - w / 2, z = z1 - d / 2, near = p(x1, P, z1), far = p(x0, P + 14, z0);
  if (near.y < -api.unit * 4 || far.y > api.height + api.unit * 2 || Math.max(near.x, p(x1, P, z0).x) < 0 || Math.min(near.x, p(x0, P, z1).x) > api.width) return;
  api.poly([p(x0, P, z1), p(x0 - h * .3, P, z1 + h * .18), p(x1 - h * .3, P, z1 + h * .18), p(x1, P, z1)], 'rgba(40,40,30,.12)');
  if (buildingSprite(api, name, x1, z1)) return;
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
  // Planters get a tight contact shadow under their base; a cast shadow out to the side made them read as floating.
  if (front) [[18, -6], [18, 6], [-8, 16.5], [8, 16.5]].forEach(([x, z]) => softShadow(api, x + .05, P, z + .05, 1.25, .55, .3));
  if (front) groundShadow(api, 0, P, 16.5, 1.2, .35, .9);
  if (front) groundShadow(api, 18, P, 0, .35, 1.2, .9);
  if (front) { softShadow(api, 17.2, P, -7.5, .85, .85, .3); [-3.2, 3.2].forEach(x => softShadow(api, x, P, 16.5, .6, .6, .3)); }
  else { groundShadow(api, 9.5, P, -13.6, 3.3, 1.2, 1.6); softShadow(api, -17.6, P, -3, .5, 1.1, .3); }
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
  'street.busstop': { w: 3.6, drop: .4 }, 'street.tree.02': { h: 5.4, drop: .4 },
  // Kevin's 2026-10-15 props, sized against the 2.3-unit adult: a 1.4 m meter, 3.2 m signal post, 2.8 m signpost, a
  // row of three news boxes, a 1.2 m pallet, a potted olive and the café set (umbrella, two tables, four chairs).
  // The food truck is a vehicle, placed by its wheels like the van (7.5 wide, nose +x, hatch facing +z).
  'street.meter': { h: 1.9, drop: .08 }, 'street.trafficlight': { h: 4.3, drop: .1 }, 'street.signpost': { h: 3.8, drop: .1 }, 'street.newsboxes': { w: 2.6, drop: .4 },
  'street.deliveryboxes': { w: 2.3, drop: .5 }, 'street.planter.round': { h: 2.5, drop: .18 }, 'street.awning.cafe': { w: 4.6, drop: .55 }, 'street.foodtruck': { w: 7.48, drop: 1.4, ox: -.09 } };
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

// Kevin's vehicle set (2026-10-15): the city car in seven colours and a delivery van, each in four views, named by
// where the nose or tail points: fl nose down-left (driving +z), fr nose down-right (+x), bl tail down-left (driving
// -z), br tail down-right (-x). Each view is placed by its own wheel landmarks (no two renders share a pixel scale):
// the near-side hubs stand for the wheelbase (2.86 units of a 4.2-unit car, 3.7 of the van, so a car's roof sits
// about head height on a 2.3-unit walker), `drop` puts the lowest pixel, the near tyre, below the footprint centre
// and `ox` is the image centre's offset from it. The renders follow the map's 30° slopes, so nothing is mirrored.
const CAR_VIEW = { fl: { w: 4.65, drop: .93, ox: -.22 }, fr: { w: 4.54, drop: .92, ox: .23 }, bl: { w: 4.69, drop: .98, ox: -.26 }, br: { w: 4.95, drop: 1.03, ox: .24 } };
const VAN_VIEW = { fl: { w: 5.98, drop: 1.21, ox: .01 }, fr: { w: 5.88, drop: 1.2, ox: .08 }, bl: { w: 6.29, drop: 1.22, ox: -.22 }, br: { w: 6.67, drop: 1.24, ox: .37 } };
const CAR_PAINT = { blue: '#4f8fd0', red: '#e0564a', orange: '#e8913c', yellow: '#f2c14e', green: '#6ea845', purple: '#8a6fd1', white: '#f4f1e4', van: '#f4f1e4' };
function carSprite(colour, view) {
  const name = 'street.' + (colour === 'van' ? 'van' : 'car.' + colour) + '.' + view;
  lazySprite(name, 'sprites/street/' + name + '.png', (colour === 'van' ? VAN_VIEW : CAR_VIEW)[view]);
  return spriteReady(name) ? name : null;
}
// A compact car or the van, nose along x or z, heading `dir` (+1 toward the camera), drawn at street level: Kevin's
// render for that view where it has loaded, else the drawn stand-in.
function car(api, x, z, along, dir, colour) {
  const p = api.project, u = api.unit, ax = along === 'x', Lc = 2.6, W = 1.3, van = colour === 'van';
  const name = carSprite(colour, ax ? (dir > 0 ? 'fr' : 'br') : (dir > 0 ? 'fl' : 'bl'));
  if (name) {
    const hl = van ? 2.6 : 2.1, hw = van ? 1.3 : 1.05, haze = hazeAt(x, z), ctx = api.ctx, q = p(x, G, z);
    ctx.save(); ctx.globalAlpha *= 1 - haze; groundShadow(api, x, G, z, ax ? hl : hw, ax ? hw : hl, 1.4); ctx.restore();
    ctx.save(); ctx.translate(0, q.y - p(x, 0, z).y);
    drawSprite(api, name, x, z, false, 1, 0, haze); ctx.restore(); return;
  }
  const color = CAR_PAINT[colour] || colour;
  const sh = p(x, G, z); api.ellipse(sh.x - u * .4, sh.y + u * .2, u * 1.8, u * .7, 'rgba(30,30,30,.22)');
  [[-.85, 1], [.85, 1], [-.85, -1], [.85, -1]].forEach(([a, s]) => { const q = ax ? p(x + a, G + .25, z + s * W / 2) : p(x + s * W / 2, G + .25, z + a); api.ellipse(q.x, q.y, u * .24, u * .24, '#25282b'); });
  const dark = api.shade(color, .72), mid = api.shade(color, .86);
  api.box(x, z, G + .25, ax ? Lc : W, ax ? W : Lc, .6, [color, ax ? dark : mid, ax ? mid : dark]);
  api.box(x - (ax ? .15 : 0), z - (ax ? 0 : .15), G + .85, ax ? 1.5 : W * .86, ax ? W * .86 : 1.5, .5, ['#e9eef0', '#7f98a6', '#9fb6c2']);
}

// Cars loop along their lane, each sorted by its own footprint (a 4.2-unit car, 4.8 for the van, 1.9 wide).
function drawCars(api, at) {
  const t = api.now * .00009 * 90 / CAR_LOOP; // about 8 units a second, four walkers' pace, whatever the loop's length
  CARS.forEach(([ri, dir, phase, colour]) => {
    // Right-hand traffic: heading +x the kerb is on the +z side, heading +z it is on the -x side.
    const r = ROADS[ri], s = (((phase + dir * t) % 1) + 1) % 1 * CAR_LOOP - CAR_LOOP / 2, lane = (r.along === 'x' ? dir : -dir) * 1.5, ax = r.along === 'x';
    const x = ax ? s : r.at + lane, z = ax ? r.at + lane : s, hl = colour === 'van' ? 2.4 : 2.1, hw = .95;
    at(x, z, () => car(api, x, z, r.along, dir, colour), ax ? hl : hw, ax ? hw : hl);
  });
}

// Pedestrians pace their pavement segment there and back. Each walks at their own pace in world units a second (a
// stroll, whatever the segment's length: Kevin found the earlier pace far too quick, and the far pavements, being
// longer, used to be walked at a run), starts at their own point of the loop, faces the way they are going on screen,
// and takes their steps from the ground covered so the feet never slide.
const WALK_BASE = WALKS.reduce((acc, w) => (acc.push(acc[acc.length - 1] + w[4]), acc), [0]);
function drawWalkers(api, at) {
  WALKS.forEach(([x0, z0, x1, z1, n], wi) => {
    const len = Math.hypot(x1 - x0, z1 - z0), screenDir = Math.sign((x1 - x0) - (z1 - z0));
    for (let k = 0; k < n; k++) {
      const g = WALK_BASE[wi] + k, pace = 1.5 + (g * 7 % 5) * .12, loop = len * 2;
      const s = (api.now * .001 * pace + ((g * .37 + k / n) % 1) * loop) % loop, out = s < len, f = out ? s / len : 2 - s / len;
      const px = x0 + (x1 - x0) * f, pz = z0 + (z1 - z0) * f, facing = screenDir * (out ? 1 : -1) || .3;
      at(px, pz, () => { if (!drawPersonSprite(api, px, pz, -(g + 1), false, facing, s * 3.6 + g * 1.7, api.now > 0 ? 1 : 0, walkerHasBag(g + 1))) api.person(px, pz, 40 + g, api.now > 0); }, .4);
    }
  });
}
