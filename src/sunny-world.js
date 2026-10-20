// The sunny look (the default since 2026-10-15): instead of a diorama floating in a dark studio, the main shop sits
// on a sunlit city block that runs to the screen edges. The shop's slab and the sidewalk are one continuous paved plaza, a
// kerb drops to sunken asphalt streets on all four sides, and muted low-rise neighbours sit beyond the far kerbs so
// the shop stays the brightest, most detailed thing on screen. Cars circulate on the streets and pedestrians walk
// the pavements. Nothing here touches saves or rules.
//
// Two passes: `back` paints the ground and everything behind or beside-left of the shop (where the shop is nearer
// and paints over any overlap); `front` paints only low furniture, cars and walkers on the front and right, placed
// so nothing tall ever covers a station.
// Kevin made the sunny all-sprite shop the default on 2026-10-13 (shipped to main 2026-10-15). Since the 2D map was
// removed (2026-10-19, the game is iOS-first and the map is 3D only) both are always on: the studio diorama and the
// drawn shop only ever drew in Canvas 2D, so "?look=classic" and "?sprites=drawn" no longer do anything.
export const SUNNY = true;
// The shop's own sprites (stations, shell, people), which the 3D map records as upright cards.
export const SHOP_SPRITES = true;

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
// Renders that came out off the map's angle. The map's floor edges run at 30° (screen slopes +0.577 down-right and
// -0.577 up-right); the grow bench's tier 1 and tier 3 renders came out at a 2:1 pitch (26.6°) and tier 1 turned
// a few degrees as well, so beside the seeds bench they read as rotated against the floor (Kevin, 2026-10-16: "grow
// station perspective is off"). Each entry is the render's own floor-edge slopes, measured on the base of the render
// (down-right, up-right; image px, y down), and drawSprite shears the image so both edges land on the map's slopes:
// every upright stays upright, and the aspect change is split between width and height so pots and plants stretch
// as little as possible. The PNGs stay as rendered. Tier 2 already follows the map's slopes.
const RENDER_AXES = { 'station.grow.tier1': [.424, -.6], 'station.grow.tier3': [.458, -.552] };
// A tier render framed differently from the rest of its station's set gets its own size: Kevin's ChatGPT tier 3
// pickup desk (2026-10-17, the PICKUP arch restored) is cropped tighter round its arch and side cabinet, so at the
// station's width it came out small; this lays its counter over the earlier tier 3 desk's footprint.
const TIER_SIZE = { 'station.pickup.tier3': { w: 4.1, drop: .62, ox: -.35 } };
// Sprite files asked for and not yet in (or failed), so the loading card can stay up until the people and fixtures
// the first frames asked for have arrived (spritesLoading, used by main.js) rather than popping in one by one.
let spritesInFlight = 0;
export function spritesLoading() { return spritesInFlight; }
function lazySprite(name, file, size) {
  if (SPRITES[name] || !SUNNY || typeof Image === 'undefined') return;
  const img = new Image(); img.decoding = 'async';
  spritesInFlight++;
  img.onload = () => { spritesInFlight--; };
  img.onerror = () => { spritesInFlight--; SPRITES[name].missing = true; };
  img.src = file;
  SPRITES[name] = Object.assign({ img }, size, TIER_SIZE[name], RENDER_AXES[name] ? { axes: RENDER_AXES[name] } : null);
}
// The shear that squares a render's floor edges (slopes mL down-right, mR up-right) to the map's. With x' = sx·x and
// y' = sy·y + k·x the two edge slopes become (sy·m + k) / sx; matching both fixes sy / sx and k, and the remaining
// uniform scale is split so width shrinks and height grows by the same factor.
export function squareUp(api, axes) {
  const o = api.project(0, 0, 0), ex = api.project(1, 0, 0), ez = api.project(0, 0, 1);
  const tX = (ex.y - o.y) / (ex.x - o.x), tZ = (ez.y - o.y) / (ez.x - o.x), ratio = (tX - tZ) / (axes[0] - axes[1]);
  const sy = Math.sqrt(ratio), sx = 1 / sy;
  return { sx, sy, k: sx * tX - sy * axes[0] };
}
// The sprite's on-screen width (and any sideways nudge) for station i at a tier, so the 3D map can size each
// Blender model to cover exactly what its sprite covered.
export function stationSpriteSize(i, tier) {
  const key = STATION_KEYS[i]; if (!key) return null;
  const size = TIER_SIZE['station.' + key + '.tier' + tier] || STATION_SIZE[key];
  return { w: size.w, ox: size.ox || 0 };
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
// Height of the top of a person's head above the floor: every cut-out's figure starts 16 px down its 320 px canvas.
export const PERSON_HEAD_Y = PERSON_V3_SIZE.h * (320 - 16) / 320 - PERSON_V3_SIZE.drop;
// The stride the walk frames show: the planted foot travels about 36 px of the 224x320 frame from contact to pass,
// a quarter of the cycle, so one cycle (two steps) covers about 1.6 world units of pavement and the step phase turns
// 3.9 radians per unit walked. Feet only stay put when the frames change at the pace of the ground going by.
export const WALK_STEP_RATE = 3.9;
// How much of the glide under a held pose is taken back (1 holds the figure still until the next pose).
const WALK_PIN = 1;
function hashId(n) { n = Math.imul((n | 0) + 1, 0x9e3779b1) >>> 0; n = Math.imul(n ^ (n >>> 15), 0x45d9f3b) >>> 0; return (n ^ (n >>> 16)) >>> 0; }
function personName(role, nn, walking) { return 'person.' + role + '.' + (nn < 10 ? '0' : '') + nn + '.' + (walking ? 'walk' : 'stand'); }
// Walkers on the pavement carry a pickup bag by a stable identity, as if they had just left the shop.
export function walkerHasBag(identity) { return hashId(identity) % 3 === 0; }
// Draws a sprite figure in place of a code-drawn one. Walking alternates the stand and stride frames on the step
// cycle. Customers and walkers pick the left- or right-facing variant from the sign of `facing` and carry the pickup
// bag when `bag` is set; staff play their v4 work loop while `working` is set, mirrored to face the floor (the
// original and v3 renders stand in until the loop's frames have loaded). `ground` is the distance the figure has
// walked in world units, and `heading` (a unit {x, z}, optional) the way it is walking. Returns false until a frame
// has loaded.
export function drawPersonSprite(api, x, z, identity, employee, facing, ground, amount, bag, working, heading) {
  const phase = ground * WALK_STEP_RATE;
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
  // Walking up the screen (away from the camera) the figure shows its back, facing up-right (mirrored for up-left),
  // empty-handed only, so anyone carrying a bag keeps the front cycle. Where Kevin's eight-frame rear walk exists
  // (person.<role>.<nn>.walk.back.00-07.png: contact, down, passing, reach on each foot, head-locked) it steps and is
  // pinned like the front cycle; frame 00 is asked for first, so a person without the set costs one missed request.
  // Otherwise the walk-v5 rear still glides with the step's rise and settle.
  let rearShown = false;
  if (!employee && amount > .3 && heading && !bag && heading.x + heading.z < -.05) {
    const rear = personName(role, nn, true) + '.back', cyc = rear + '.0';
    lazySprite(rear, 'sprites/people/' + rear + '.png', PERSON_V3_SIZE);
    lazySprite(cyc + 0, 'sprites/people/' + cyc + '0.png', PERSON_V3_SIZE);
    const eighth = phase / (Math.PI / 4), key = Math.round(eighth), frame = cyc + ((key % 8) + 8) % 8;
    if (spriteReady(cyc + 0)) for (let k = 1; k < 8; k++) lazySprite(cyc + k, 'sprites/people/' + cyc + k + '.png', PERSON_V3_SIZE);
    if (spriteReady(frame)) {
      name = frame; lift = 0; rearShown = true;
      const back = (eighth - key) * (Math.PI / 4) / WALK_STEP_RATE * WALK_PIN; x -= heading.x * back; z -= heading.z * back;
    } else if (spriteReady(rear)) { name = rear; lift = amount * .04 * (1 - Math.cos(2 * phase)) / 2; rearShown = true; }
    if (rearShown) flip = heading.x - heading.z < 0;
  }
  // Kevin's 2026-10-15 walk cycles: four frames a step pair (contact, pass, contact, pass), stored facing right and
  // mirrored to face left. The step phase picks the frame, and the frames carry the rise and settle, so no bob.
  // Each pose is shown either side of its own moment in the stride, and while it is held the figure stays where that
  // pose belongs (it moves on in a small hop at the change of pose, the way a stepped sprite walks): gliding on under
  // a held pose is what made the planted foot skate.
  if (!employee && amount > .3 && !rearShown) {
    const cyc = personName(role, nn, true) + (bag ? '.bag' : '.empty') + '.0', quarter = phase / (Math.PI / 2), key = Math.round(quarter);
    for (let f = 0; f < 4; f++) lazySprite(cyc + f, 'sprites/people/' + cyc + f + '.png', PERSON_V3_SIZE);
    const frame = cyc + ((key % 4) + 4) % 4;
    if (spriteReady(frame)) {
      name = frame; flip = facing < 0; lift = 0;
      if (heading) { const back = (quarter - key) * (Math.PI / 2) / WALK_STEP_RATE * WALK_PIN; x -= heading.x * back; z -= heading.z * back; }
    }
  }
  if (name === personName(role, nn, walking)) {
    // Original single-direction renders, until the variant has loaded or when it is missing.
    if (nn > (ORIGINAL_RENDERS[role] || 0)) return false;
    lazySprite(name, 'sprites/people/' + name + '.png', PERSON_SIZE);
    lazySprite(base, 'sprites/people/' + base + '.png', PERSON_SIZE);
    name = spriteReady(name) ? name : spriteReady(base) ? base : null;
  }
  if (!name) return false;
  sunShadow(api, x, 0, z, .24, .2, 2.3, .9, .8);
  return drawSprite(api, name, x, z, flip, 1, lift);
}
// Shop fixtures from the interior batch, sized in world units like the stations.
const FIXTURE_SIZE = { 'station.security.site': { w: 2.2, drop: .45 }, 'event.festival.stall': { w: 2.6, drop: .45 }, 'station.orders.compact.tier1': { w: 2.15, drop: .45 }, 'station.orders.compact.tier2': { w: 2.15, drop: .45 }, 'station.orders.compact.tier3': { w: 2.2, drop: .45 }, 'shop.kiosk': { w: 1, drop: 0 }, 'shop.displaycase': { w: 4, drop: .55 }, 'shop.planter.small': { w: .95, drop: .12 },
  // Latest main-shop-v2 batch: placed by main.js on world boxes or wall anchors, so their sizes here are unused.
  ...Object.fromEntries(['lounge.sofa', 'lounge.coffee.table', 'lounge.lamp.on', 'lounge.lamp.off', 'lounge.rug.floor', 'lounge.carpet.entry', 'lounge.carpet.runner', 'lounge.sign.lit', 'lounge.sign.dark', 'street.bollard', 'street.sconce', 'shell.exit.lamp', 'shell.fan.housing', 'drone.courier.loaded', 'drone.courier.empty', 'prop.jar', 'prop.pickup.bag', 'prop.carton', 'prop.tote', 'prop.cap', 'prop.tee'].map(n => [n, { w: 1, drop: 0 }])) };
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
  if (s.axes) { const m = squareUp(api, s.axes); ctx.transform(m.sx, m.k, 0, m.sy, 0, 0); }
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
// Neighbours: [near-corner x, near-corner z, render, 3D model]. Every block round the shop is terraced edge to edge, two
// units back from the kerbs: a row's fronts share one z and a column's one x, each building butted to the last (a joint
// overlaps by a few tenths rather than leaving an alley), corner shops at the junctions. The render names the lot (its
// footprint); the optional 3D model is one of the city terraces (art/blender/city/city_buildings.py) built on that
// lot with 2 to 5 storeys and a shop on the ground floor (Kevin, 2026-10-19: break up the identical two- and
// three-storey blocks, shops rather than plain house fronts). The tall ones stand behind and left of the shop; the
// front row, the right column and the front corners stay two or three storeys so they never hide it.
const BUILDINGS = [
  // Far row, facing the shop across the rear street.
  [-7.72, -23.5, 'building.rowhouse.terracotta', 'city_terra_4'],
  [0.8, -23.5, 'building.low.sage'],
  [10.02, -23.5, 'building.apartment.brick', 'city_brick_5'],
  [17.5, -23.5, 'building.corner', 'city_corner_4'],
  // Left column, packed from the front street's kerb so its head clears the rear street...
  [-27.5, 16.5, 'building.corner'],
  [-27.5, 9.65, 'building.low.stone', 'city_stone_4'],
  [-27.5, 2.11, 'building.low.sage'],
  [-27.5, -5.44, 'building.mid.stone', 'city_cream_5'],
  // ...and a second column on its heels filling the block out to the side back street, its roofs showing over the first.
  [-35.4, 16.5, 'building.townhouse.sage', 'city_sage_4'],
  [-35.4, 10.86, 'building.low.tan', 'city_tan_3'],
  [-35.4, 3.59, 'building.low.stone', 'city_stone_3'],
  [-35.4, -4.1, 'building.workshop.low', 'city_brick_4'],
  // Right column, likewise.
  [37, 16.5, 'building.low.stone', 'city_stone_3'],
  [37, 8.96, 'building.mid.stone'],
  [37, 2.2, 'building.low.sage', 'city_mauve_2'],
  [37, -5.35, 'building.low.tan'],
  // Front row, across the front street, facing away.
  [-8.03, 35.5, 'building.apartment.brick'],
  [0.63, 35.5, 'building.rowhouse.terracotta', 'city_terra_2'],
  [9.2, 35.5, 'building.low.sage'],
  [17.46, 35.5, 'building.mid.stone'],
  // Corner blocks of the first ring.
  [-27.5, -23.5, 'building.corner'],
  [-34.83, -23.5, 'building.rowhouse.terracotta', 'city_terra_4'],
  [36.97, -23.5, 'building.apartment.brick'],
  [-27.5, 35.5, 'building.townhouse.sage', 'city_sage_3'],
  [-34.61, 35.5, 'building.low.tan', 'city_tan_3'],
  [37, 35.5, 'building.low.sage', 'city_mauve_2']
];
// The 3D terraces' Blender bounds in metres along three.js x and z ([x0, x1, z0, z1], origin at the body's centre,
// shopfronts and awnings included) and their roof and top heights, from art/blender/city/city_meta.json. A model is
// fitted to its lot by these bounds (map3d's p.fit), so the same numbers say where its roof is in map units.
const MODEL_BOUNDS = {
  building_apartment_brick: [-2.902, 2.902, -2.1975, 2.2575, 7.338, 7.6], building_corner: [-2.387, 3.007, -2.245, 2.865, 5.388, 5.65],
  building_low_sage: [-2.6945, 2.6945, -2.452, 3.122, 6.628, 6.89], building_low_stone: [-2.3575, 2.3575, -2.449, 2.569, 6.298, 6.56],
  building_low_tan: [-2.3425, 2.3825, -2.325, 2.385, 5.808, 6.07], building_mid_stone: [-2.603, 2.603, -2.2185, 2.2785, 7.548, 7.81],
  building_rowhouse_terracotta: [-2.7215, 2.7215, -2.0765, 2.5965, 6.938, 7.2], building_shop_narrow: [-2.5495, 2.5495, -1.943, 2.613, 6.778, 7.04],
  building_townhouse_sage: [-2.322, 2.322, -1.8425, 2.0425, 7.898, 8.16], building_workshop_low: [-2.401, 2.401, -2.239, 2.359, 3.148, 3.41],
  city_brick_4: [-2.3811, 3.1511, -2.2391, 3.0091, 10.418, 10.69], city_brick_5: [-2.9018, 3.4118, -2.1976, 2.9676, 12.868, 13.14],
  city_corner_4: [-2.387, 3.157, -2.245, 3.015, 10.418, 10.69], city_cream_5: [-2.603, 3.113, -2.2183, 2.9883, 12.868, 13.14],
  city_mauve_2: [-2.6947, 2.6947, -2.4521, 3.2221, 5.518, 6.21], city_sage_3: [-2.3219, 3.0919, -1.8426, 2.6126, 7.968, 8.24],
  city_sage_4: [-2.3219, 2.3219, -1.8426, 2.6126, 10.418, 10.69], city_stone_3: [-2.3574, 3.1274, -2.4491, 3.2191, 7.968, 8.24],
  city_stone_4: [-2.3574, 2.3974, -2.4491, 3.2191, 10.418, 10.69], city_tan_3: [-2.3426, 2.3426, -2.3249, 3.0949, 7.968, 8.66],
  city_terra_2: [-2.7213, 3.4913, -2.0763, 2.8463, 5.518, 5.79], city_terra_4: [-2.7213, 2.7213, -2.0763, 2.8463, 10.418, 11.11]
};
const HEIGHT_UP = Math.sqrt(1.5); // the 3D map's height stretch (camera.js HEIGHT_SCALE): world height = map height × this
// A terrace's 3D model: its city model if it names one, else the render's own (building.low.sage is building_low_sage).
const modelOf = b => b[3] || b[2].replace(/\./g, '_');
// Where a terrace's model lands on its lot: map x and z of a point given in the model's metres, the roof's height in map
// units and the model's scale (map units per metre across x).
function lotFit(b) {
  const f = BUILDING_SPRITES[b[2]], [bx0, bx1, bz0, bz1, roof, top] = MODEL_BOUNDS[modelOf(b)], sx = f.w / (bx1 - bx0), sz = f.d / (bz1 - bz0);
  const x0 = b[0] - f.w, z0 = b[1] - f.d;
  return { sx, x: mx => x0 + (mx - bx0) * sx, z: mz => z0 + (mz - bz0) * sz, roof: P + roof * sx / HEIGHT_UP, top: P + top * sx / HEIGHT_UP, w: -2 * bx0, d: -2 * bz0 };
}
// Rooftop clutter on every terrace (Kevin, 2026-10-19: HVAC units, water towers, skylights, stair bulkheads, dishes):
// a few pieces per roof in its four quarters, picked by a fixed seed per building so the skyline never reshuffles. A
// water tower only stands on four storeys and up, in the back quarter where it hides nothing; the corner shops lose
// their cut-off front quarter.
const PROP_HALF = { roof_hvac: .75, roof_skylight: .65, roof_vents: .45, roof_access: .85, roof_dish: .45, roof_watertower: .86 };
const ROOF_PROPS = (() => {
  const out = [];
  BUILDINGS.forEach((b, i) => {
    const fit = lotFit(b), name = modelOf(b), tall = fit.top - P > 15, hw = fit.w / 2 - .42, hd = fit.d / 2 - .42;
    let seed = (i + 1) * 2654435761 >>> 0;
    const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
    // Quarters in model metres: back-left, back-right, front-left, front-right (front is +z).
    const quarters = [[-1, -1], [1, -1], [-1, 1], [1, 1]].filter(([qx, qz]) => !(/corner/.test(name) && qx > 0 && qz > 0));
    const kinds = ['roof_hvac', 'roof_skylight', 'roof_vents', 'roof_access', 'roof_dish', 'roof_hvac', 'roof_skylight'];
    const n = 2 + Math.floor(rand() * 2);
    quarters.sort(() => rand() - .5);
    quarters.slice(0, n).forEach(([qx, qz], k) => {
      let file = kinds[Math.floor(rand() * kinds.length)];
      if (k === 0 && tall && rand() < .7) { file = 'roof_watertower'; qx = -1; qz = -1; }
      // Each piece sits toward its quarter's outer corner, clear of the middle where the next quarter's piece reaches.
      const half = PROP_HALF[file], mx = qx * Math.max(half + .05, hw - half) + (rand() - .5) * .15, mz = qz * Math.max(half + .05, hd - half) + (rand() - .5) * .15;
      out.push({ file: file + '.glb', x: fit.x(mx), y: fit.roof, z: fit.z(mz), rot: rand() < .5 ? 0 : Math.PI / 2, scale: fit.sx / 1.69 });
    });
  });
  // One piece per quarter at most, so two never share a spot when a water tower took the back one.
  const seen = new Set();
  return out.filter(p => { const key = Math.round(p.x) + ',' + Math.round(p.z); if (seen.has(key)) return false; seen.add(key); return true; });
})();
// Past the first ring of streets the town carries on as plain silhouettes (Kevin, 2026-10-19: lower detail and muted so
// the eye stays on the shop): every block beyond the back streets filled with lots of two to six storeys, each one
// box with a parapet and a dark band of windows per storey, all drawn in a single mesh. The far and left sides stand
// taller; the blocks on the camera's side stay low so nothing rises between the viewer and the shop.
const BLOCK_SPAN = 72;
function bandsAlong(along) {
  const at = ROADS.filter(r => r.along === along).map(r => r.at).sort((a, b) => a - b), out = [];
  let from = -BLOCK_SPAN;
  at.forEach(a => { out.push([from, a - RW / 2]); from = a + RW / 2; });
  out.push([from, BLOCK_SPAN]);
  return out;
}
const MUTED = ['#c9b9a6', '#bba596', '#b7bdb1', '#c4bdb0', '#b49384', '#c7a993', '#bfb6b6', '#cfc4ad'];
const SILHOUETTES = (() => {
  const xs = bandsAlong('z'), zs = bandsAlong('x'), out = [];
  let seed = 97;
  const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
  xs.forEach(([bx0, bx1], i) => zs.forEach(([bz0, bz1], j) => {
    const outer = i === 0 || j === 0 || i === xs.length - 1 || j === zs.length - 1;
    if (!outer) return;
    const near = i === xs.length - 1 || j === zs.length - 1, x0 = bx0 + 2, x1 = bx1 - 2, z0 = bz0 + 2, z1 = bz1 - 2;
    // Rows from the block's front (+z) back, lots from its right (+x) end, so the fronts line up along the kerbs.
    for (let zb = z1; zb - 5 > z0 - .01;) {
      const d = Math.min(zb - z0, 6 + rand() * 2.5);
      for (let xb = x1; xb - 5 > x0 - .01;) {
        const w = Math.min(xb - x0, 6.5 + rand() * 3), storeys = near ? 1 + Math.floor(rand() * 2) : 2 + Math.floor(rand() * 5);
        out.push({ x0: xb - w, x1: xb, z0: zb - d, z1: zb, storeys, colour: MUTED[Math.floor(rand() * MUTED.length)] });
        xb -= w;
      }
      zb -= d;
    }
  }));
  return out;
})();
// The town ends in haze. Beyond the back streets the ground, the far terraces and the cars fade into the sky colour
// over a dozen units (HAZE_RAMP: where each side starts to fade and where it is gone), so no edge of the paving and
// no end of a street is ever on screen. SUNNY_VIEW is the camera's matching limit, in world units: the point under
// the view's anchor stays inside `centre` (the shop block and its first ring of streets), and the visible area stays
// inside `reach`, measured along the camera's rotated axes (screen-right and screen-down across the ground), so the
// view never runs past the haze at any zoom; main.js applies it.
const HAZE = [220, 217, 203];
// Kevin (2026-10-19) had the haze pulled in to start just past the first ring's back streets.
const HAZE_RAMP = { west: [-46, -58], east: [45, 58], north: [-40, -54], south: [35, 47] };
const ramp = (v, [from, to]) => Math.max(0, Math.min(1, (v - from) / (to - from)));
function hazeAt(x, z) { return Math.max(ramp(x, HAZE_RAMP.west), ramp(x, HAZE_RAMP.east), ramp(z, HAZE_RAMP.north), ramp(z, HAZE_RAMP.south)); }
const hazeRGBA = a => 'rgba(' + HAZE[0] + ',' + HAZE[1] + ',' + HAZE[2] + ',' + a + ')';
export const SUNNY_VIEW = { centre: { x: [-32, 42], z: [-30, 34] }, reach: { rx: [-42.3, 52.7], rz: [-43.9, 48.2] } };
// Down the middle of the two-unit pavement between the kerb and the facades behind it.
const FAR_TREES = [[-12, -22.5], [-1, -22.5], [10, -22.5], [14.5, -22.5], [-26.5, -13], [-26.5, -2], [-26.5, 9], [-26.5, 20]];
// A street tree's pit on the 3D map, apart from the tree: the model's own pit (`#low` keeps only its Pit parts) or the
// square iron grate, unturned so its sides run with the kerb, and shrunk where it is wider than the pavement allows
// (the narrowest pavements are two units kerb to facade, so a pit is at most 1.6 across). The tree itself stands in
// it without its pit (`#lawn`), at its own turn and size. Half-widths in map units at the model's own size.
const PIT_HALF = { street_tree: .75 * 1.69, tree: .46 * 1.69, grate: .75 * 1.69 };
const treePit = (kind, x, z) => ({ file: kind === 'grate' ? 'street_tree_grate.glb' : kind + '.glb#low', x, z, rot: 0, scale: Math.min(1, .8 / PIT_HALF[kind]) });
const NEAR_TREES = [[-15, -13.5], [-5, -13.5], [5, -13.5], [16.5, -13.5], [-17, 4]]; // behind / left of the shop only; nothing under the delivery deck's legs
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
// Everything that stands on the streets, with its footprint (half-extents along x and z about its ground point) and,
// for what stands still, its shadow: [height, contact, cast, half-x, half-z] (the footprint's half-extents unless given)
// or a function that draws it. Buildings take theirs from the baked block shadows.
function streetJobs(api) {
  const jobs = [];
  let kind = 'building';
  const at = (x, z, f, hx = .5, hz = hx, shade) => jobs.push({ kind, x0: x - hx, x1: x + hx, z0: z - hz, z1: z + hz, depth: api.depth({ x, z }), draw: f,
    shadow: typeof shade === 'function' ? shade : shade && (() => sunShadow(api, x, P, z, shade[3] === undefined ? hx : shade[3], shade[4] === undefined ? hz : shade[4], shade[0], shade[1], shade[2])) });
  // The 3D map's Blender model for the job just added: its file, where its feet stand (the render's anchor) and its
  // turn; a render drawn mirrored to run the other way is the model turned a quarter.
  const model = (name, x, z, flip) => { jobs[jobs.length - 1].model = { file: name.includes('.glb') ? name : name + '.glb', x, z, rot: flip ? -Math.PI / 2 : 0 }; };
  BUILDINGS.forEach(b => { const f = BUILDING_SPRITES[b[2]], x = b[0] - f.w / 2, z = b[1] - f.d / 2; at(x, z, () => building(api, b), f.w / 2, f.d / 2); jobs[jobs.length - 1].model = { file: modelOf(b) + '.glb', x, z, rot: 0, fit: { w: f.w, d: f.d } }; });
  kind = 'prop';
  ROOF_PROPS.concat(CITY_PROPS).forEach(p => { at(p.x, p.z, () => {}, .5, .5); jobs[jobs.length - 1].model = p; });
  kind = 'tree';
  // The 3D map's Blender trees follow streetTree's own pick: the tall street tree where its `& 3` rule puts one, the
  // round tree everywhere else (both drawn instanced, one set of draws for all of them).
  FAR_TREES.concat(NEAR_TREES).forEach(([x, z]) => {
    const kind = streetTreeKind(x, z);
    at(x, z, () => streetTree(api, x, z), 1.3, 1.3, () => treeShadow(api, x, z, 2.4, 4.8)); model(kind + '.glb#lawn', x, z);
    at(x, z, () => {}, .8, .8); jobs[jobs.length - 1].model = treePit(kind, x, z);
  });
  kind = 'prop';
  LAMPS.forEach(([x, z]) => { at(x, z, () => lamp(api, x, z), .4, .4, [4.6, .9, .75, .2, .2]); model('street_lamp', x, z); });
  // Left-side street life: a coffee cart and café seating by the entrance, bins and a hydrant.
  at(-18, 7.5, () => cart(api, -18, 7.5), 1.3, 1, () => sunShadow(api, -18.35, P, 7.27, 1.05, .6, 2.3, 1, 1)); model('street_coffeecart', -18, 7.5);
  // Kevin's café set (2026-10-15) stands in for the two drawn umbrellas; the news boxes face the shop.
  at(-17, 14, () => { if (!prop(api, 'street.awning.cafe', -17, 14)) { umbrella(api, -17, 12.5); umbrella(api, -17, 15.5); } }, 2.3, 1.6, () => sunShadow(api, -17.6, P, 13.4, 1.6, 1.3, 2.6, .8, .9)); model('street_cafe_awning', -17, 14);
  at(-18.5, -8, () => bin(api, -18.5, -8), .4, .4, [1.1, 1, 1, .3, .3]); model('street_bin', -18.5, -8); at(-18.5, 10.5, () => hydrant(api, -18.5, 10.5), .3, .3, [.95, 1, 1, .2, .2]); model('street_hydrant', -18.5, 10.5);
  at(-17.6, -3, () => prop(api, 'street.newsboxes', -17.6, -3, true), 1.3, 1, () => sunShadow(api, -18.1, P, -3.5, .4, 1.5, 2.8, .9, 1)); model('street_newsboxes', -17.6, -3, true); // the row's feet stand back from the render's centre; the boxes stand about 2.8 tall
  // Shadow footprints below are measured against each render's feet (Kevin, 2026-10-17: a shadow beside a prop reads as a
  // floating blob); several renders are centred off their footprint or run along z.
  [[18, -6], [-8, 16.5], [8, 16.5]].forEach(([x, z]) => { at(x, z, () => planter(api, x, z), 1.6, 1.2, () => sunShadow(api, x - .7, P, z - .65, .55, 1.8, 1.2, 1, .8)); model('street_planter', x, z); });
  // Kevin (2026-10-19) turned the planter behind the subway a quarter to run along x, its back face flush with the
  // well's back railing (the model is 3.22 long by 1.14 deep).
  const sz = SUBWAY.z - SUBWAY.hz - .05 - .57;
  at(17.9, sz, () => {}, 1.61, .57); model('street_planter', 17.9, sz, true);
  at(0, 16.5, () => bench(api, 0, 16.5, true), 1.2, .5, () => sunShadow(api, -.36, P, 16.38, 1.1, .32, .9, .9, 1)); model('street_bench', 0, 16.5, true); // mirrored to run along the front street
  at(18, 0, () => bench(api, 18, 0), .5, 1.2, () => sunShadow(api, 17.73, P, -.33, .32, 1.1, .9, .9, 1)); model('street_bench', 18, 0);
  at(14, 16, () => bikeRack(api, 14, 16), 1.3, .6, () => sunShadow(api, 14.24, P, 15.47, .45, 1.25, 1.2, .7, .7)); model('street_bikerack', 14.8, 16);
  at(18.5, -11, () => busStop(api, 18.5, -11), .9, 1.8, [2.6, .8, .9, .7, 1.6]); model('street_busstop', 18.5, -11);
  at(19, 14.4, () => bin(api, 19, 14.4), .4, .4, [1.1, 1, 1, .3, .3]); model('street_bin', 19, 14.4); at(12, 15.4, () => hydrant(api, 12, 15.4), .3, .3, [.95, 1, 1, .2, .2]); model('street_hydrant', 12, 15.4);
  // 2026-10-15 street dressing: a delivery pallet by the bus stop, a fingerpost and two meters on the right kerb,
  // olive pots either side of the front bench, and a pedestrian light at the front crossing.
  at(17.2, -7.5, () => prop(api, 'street.deliveryboxes', 17.2, -7.5), 1.15, .9, () => sunShadow(api, 16.81, P, -7.89, .8, .65, 1.3, 1.1, 1)); model('street_deliveryboxes', 17.2, -7.5);
  at(19.4, 3.6, () => prop(api, 'street.signpost', 19.4, 3.6), .3, .3, [3.8, .6, .7, .12, .12]); model('street_signpost', 19.4, 3.6);
  // Kevin (2026-10-19) put a subway entrance where the two meters stood; the bin steps past its mouth. The well is
  // sunk through the pavement slab (townLayout's holes) and riders walk up out of it and back down (SUBWAY_RIDES).
  at(SUBWAY.x, SUBWAY.z, () => {}, SUBWAY.hx, SUBWAY.hz); model('street_subway', SUBWAY.x, SUBWAY.z);
  [-3.2, 3.2].forEach(x => { at(x, 16.5, () => prop(api, 'street.planter.round', x, 16.5), .6, .6, () => { sunShadow(api, x, P, 16.5, .45, .45, .8, 1, .8); softShadow(api, x + SUN.x * .9, P, 16.5 + SUN.z * .9, .75, .7, .22 * daylight(api)); }); model('street_planter_round', x, 16.5); });
  at(-10.8, 17.4, () => prop(api, 'street.trafficlight', -10.8, 17.4), .3, .3, () => sunShadow(api, -10.63, P, 16.98, .12, .12, 4.3, .6, .7)); model('street_trafficlight', -10.8, 17.4); // the post stands right of the render's centre
  kind = 'car'; drawCars(api, at);
  kind = 'walker'; drawWalkers(api, at);
  return jobs;
}
// The road paint and kerb paving (lane dashes, stop lines, zebra crossings, tactile strips) as flat rectangles, from
// the same functions the 2D ground pass uses, for the 3D map.
export function groundMarks() {
  const out = [];
  const quad = (x0, z0, x1, z1, y, colour) => out.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y, colour });
  const api = { project: () => ({ x: 0, y: 0 }), width: 1, height: 1, unit: 1,
    line: ([a, b], colour, w) => a[0] === b[0] ? quad(a[0] - w / 2, a[2], a[0] + w / 2, b[2], a[1], colour) : quad(a[0], a[2] - w / 2, b[0], a[2] + w / 2, a[1], colour) };
  ROADS.forEach(r => roadMarkings(api, quad, r));
  MID_CROSSINGS.forEach(([along, at, pos]) => crossing(api, quad, along, at, pos));
  ROADS.filter(r => r.along === 'x').forEach(rz => ROADS.filter(r => r.along === 'z').forEach(rx => { const x = rx.at, z = rz.at; crossing(api, quad, 'x', z, x - 5.5); crossing(api, quad, 'x', z, x + 5.5); crossing(api, quad, 'z', x, z - 5.5); crossing(api, quad, 'z', x, z + 5.5); }));
  return out;
}
// The street's standing things (each with its footprint, kind and draw call) for the 3D map, which records the
// draws of the ones it shows as sprites.
export function streetItems(api) { return streetJobs(api); }
// The floor textures and how many world units one tile spans, for the 3D map's floors.
export function floorTextureFiles() {
  const file = name => TEXTURE_FILES[name] || 'sprites/shell/tex.floor.' + name + '.png';
  return { sidewalk: { url: file('sidewalk'), size: 6 }, asphalt: { url: file('asphalt'), size: 8 }, herringbone: { url: file('herringbone'), size: 4 }, timber: { url: file('timber'), size: 4 }, concrete: { url: file('concrete'), size: 4 } };
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
    MID_CROSSINGS.forEach(([along, at, pos]) => crossing(api, quad, along, at, pos));
    // Zebra crossings on all four arms of every junction (the walkers' lanes round the shop run through the ones at the
    // shop's own corners).
    ROADS.filter(r => r.along === 'x').forEach(rz => ROADS.filter(r => r.along === 'z').forEach(rx => { const x = rx.at, z = rz.at; crossing(api, quad, 'x', z, x - 5.5); crossing(api, quad, 'x', z, x + 5.5); crossing(api, quad, 'z', x, z - 5.5); crossing(api, quad, 'z', x, z + 5.5); }));
    groundHaze(api);
  }
  // Buildings, trees, props, cars and walkers share one footprint-aware sort (orderJobs), so a car on the far street
  // never paints over a near tree, nor a car on the front or right street over the terraces beyond it.
  // Shadows go down first, all of them, so a long one never paints over something already standing behind it.
  const jobs = streetJobs(api).filter(j => behindShop(j) !== front);
  if (!front) blockShadows(api);
  jobs.forEach(j => j.shadow && j.shadow());
  orderJobs(jobs).forEach(j => j.draw());
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

// Mid-block zebras: [the street's axis, the street, where along it].
const MID_CROSSINGS = [['x', 21.5, -8], ['z', -22.5, 4], ['x', -18.5, 8]];
// A junction arm's zebra spans 3.9 to 7.1 from the junction's centre (crossings at ±5.5, 3.2 wide), so the stop bar
// stands just behind it at 7.6, across the lane that drives into the junction (traffic keeps right: heading +x the lane
// is on the +z side, heading +z on the -x side). The yellow centre line runs dashed between junctions, laid out from
// each block's middle so both ends finish alike, turns solid for the last stretch before each stop bar and breaks for
// the mid-block zebras, so no dash runs into a crossing or past a stop bar.
const STOP_AT = 7.6, DASH = 1.6, DASH_GAP = 1.4, SOLID_RUN = 3;
function roadMarkings(api, quad, { along, at }) {
  const cross = ROADS.filter(r => r.along !== along).map(r => r.at).sort((a, b) => a - b), y = G + .004;
  const centre = (k0, k1) => along === 'x' ? quad(k0, at - .05, k1, at + .05, y, '#f2d16b') : quad(at - .05, k0, at + .05, k1, y, '#f2d16b');
  const zebras = MID_CROSSINGS.filter(([a, r]) => a === along && r === at).map(c => c[2]);
  const stops = [-L - STOP_AT].concat(cross, [L + STOP_AT]);
  for (let i = 0; i + 1 < stops.length; i++) {
    const s0 = stops[i] + STOP_AT + .15, s1 = stops[i + 1] - STOP_AT - .15;
    if (s1 - s0 < 2) continue;
    // Solid runs into the stop bars (not at the map's ends), dashes between, broken round a mid-block zebra.
    const d0 = i > 0 ? s0 + SOLID_RUN : s0, d1 = i + 2 < stops.length ? s1 - SOLID_RUN : s1;
    if (i > 0) centre(s0, d0);
    if (i + 2 < stops.length) centre(d1, s1);
    const runs = [];
    let from = d0;
    zebras.filter(z => z > d0 && z < d1).forEach(z => { runs.push([from, z - 2.4]); from = z + 2.4; });
    runs.push([from, d1]);
    runs.forEach(([r0, r1]) => {
      const n = Math.floor((r1 - r0 + DASH_GAP) / (DASH + DASH_GAP));
      if (n < 1) return;
      const start = (r0 + r1) / 2 - (n * (DASH + DASH_GAP) - DASH_GAP) / 2;
      for (let k = 0; k < n; k++) centre(start + k * (DASH + DASH_GAP), start + k * (DASH + DASH_GAP) + DASH);
    });
  }
  // Stop bars before each junction, on the lane driving into it.
  cross.forEach(c => [-1, 1].forEach(s => {
    const e = c + s * STOP_AT, inbound = -s, l0 = along === 'x' ? (inbound > 0 ? at : at - RW / 2) : (inbound > 0 ? at - RW / 2 : at), l1 = l0 + RW / 2;
    if (along === 'x') quad(e - .15, l0 + .1, e + .15, l1 - .1, G + .005, '#f4f1e8'); else quad(l0 + .1, e - .15, l1 - .1, e + .15, G + .005, '#f4f1e8');
  }));
  // A give-way bar on both lanes a metre before each mid-block zebra.
  zebras.forEach(z => [-1, 1].forEach(s => {
    const e = z + s * 2.2;
    if (along === 'x') quad(e - .1, at - RW / 2 + .1, e + .1, at + RW / 2 - .1, G + .005, '#f4f1e8'); else quad(at - RW / 2 + .1, e - .1, at + RW / 2 - .1, e + .1, G + .005, '#f4f1e8');
  }));
}

// Kerbs for the 3D map: a pale kerb stone down every block's edge, standing from the street up just proud of the
// pavement so the edge reads as a kerb rather than a cut slab, flush and darker where a zebra lands (a curb cut, the
// tactile strip beside it), and a drain grate in the gutter on the approach to every zebra and every dozen units between.
const KERB_W = .32;
function kerbsAndDrains() {
  const out = [];
  const box = (x0, x1, z0, z1, y0, y1, colour) => out.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y0, h: y1 - y0, colour });
  const zebraAt = (along, at) => {
    const list = MID_CROSSINGS.filter(([a, r]) => a === along && r === at).map(c => c[2]);
    ROADS.filter(r => r.along !== along).forEach(r => list.push(r.at - 5.5, r.at + 5.5));
    return list.sort((a, b) => a - b);
  };
  ROADS.forEach(({ along, at }) => {
    const cross = ROADS.filter(r => r.along !== along).map(r => r.at).sort((a, b) => a - b), zebras = zebraAt(along, at);
    const segs = [];
    let from = -L; cross.forEach(c => { segs.push([from, c - RW / 2]); from = c + RW / 2; }); segs.push([from, L]);
    [-1, 1].forEach(side => {
      const edge = at + side * RW / 2, inner = edge + side * (KERB_W - .04), outer = edge - side * .04;
      segs.forEach(([s0, s1]) => {
        // Cut the run round each zebra's landing.
        const cuts = zebras.filter(z => z > s0 && z < s1);
        let k = s0;
        cuts.forEach(z => {
          if (z - 1.7 > k) box(...(along === 'x' ? [k, z - 1.7, inner, outer] : [inner, outer, k, z - 1.7]), G, P + .03, KERB);
          box(...(along === 'x' ? [z - 1.7, z + 1.7, inner, outer] : [inner, outer, z - 1.7, z + 1.7]), G, P + .004, '#c7bc9f');
          k = z + 1.7;
        });
        if (s1 > k) box(...(along === 'x' ? [k, s1, inner, outer] : [inner, outer, k, s1]), G, P + .03, KERB);
        // Drains: just upstream of each zebra landing and at even steps along the gutter between.
        const gutter = edge - side * .42, drains = cuts.map(z => z + (z < (s0 + s1) / 2 ? 2.4 : -2.4));
        for (let d = s0 + 6; d < s1 - 6; d += 12) if (!cuts.some(z => Math.abs(z - d) < 4)) drains.push(d);
        drains.forEach(d => {
          box(...(along === 'x' ? [d - .45, d + .45, gutter - .22, gutter + .22] : [gutter - .22, gutter + .22, d - .45, d + .45]), G, G + .012, '#6d6f6c');
          box(...(along === 'x' ? [d - .36, d + .36, gutter - .14, gutter + .14] : [gutter - .14, gutter + .14, d - .36, d + .36]), G, G + .016, '#2e3133');
        });
      });
    });
  });
  return out;
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
// transform, and Safari has no canvas filter).
//
// One sun lights the whole map. Kevin's renders are lit from the viewer's left and a little in front: faces turned
// down-left are the bright ones, faces turned down-right sit in shade, tree crowns catch it on their upper left. So
// every shadow falls the other way, straight right on screen: along SUN on the ground, SUN_REACH units for each
// unit of height (a high sun keeps them short and readable). Each object gets a tight contact shadow under its
// footprint, which stays after dark as ambient occlusion, and a cast shadow along SUN that fades out with the daylight.
export const SUN = { x: Math.SQRT1_2, z: -Math.SQRT1_2 }, SUN_REACH = .42;
let SHADOW_TEX = null, POOL_TEX = null, STREAK_TEX = null;
function shadowTexture() {
  if (SHADOW_TEX || typeof document === 'undefined') return SHADOW_TEX;
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  [[0, 1], [.25, .92], [.5, .62], [.72, .3], [.88, .1], [1, 0]].forEach(([t, a]) => grad.addColorStop(t, 'rgba(46,52,36,' + a + ')'));
  g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  return (SHADOW_TEX = c);
}
// A contact pool: evenly dark across the middle, where the object stands, softening only toward its rim, so the part
// that shows past the object's base reads as the floor darkening under it rather than a faint smudge.
function poolTexture() {
  if (POOL_TEX || typeof document === 'undefined') return POOL_TEX;
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  [[0, 1], [.45, 1], [.6, .8], [.75, .46], [.88, .17], [1, 0]].forEach(([t, a]) => grad.addColorStop(t, 'rgba(40,46,32,' + a + ')'));
  g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  return (POOL_TEX = c);
}
// A cast shadow's shape: an even core where it leaves the object, thinning and fading toward its tip, soft along both sides.
// The image's x runs along the sun from the object outward, its y across.
function streakTexture() {
  if (STREAK_TEX || typeof document === 'undefined') return STREAK_TEX;
  const W = 128, H = 64, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'), img = g.createImageData(W, H);
  for (let i = 0; i < W; i++) {
    const u = (i + .5) / W, along = Math.min(1, u / .08) * (u < .4 ? 1 : Math.pow((1 - u) / .6, 1.4)), half = 1 - .25 * u;
    for (let j = 0; j < H; j++) {
      const v = Math.abs((j + .5) / H * 2 - 1) / half, t = v >= 1 ? 0 : v < .55 ? 1 : (1 - v) / .45, across = t * t * (3 - 2 * t), o = (j * W + i) * 4;
      img.data[o] = 46; img.data[o + 1] = 52; img.data[o + 2] = 36; img.data[o + 3] = Math.round(255 * along * across);
    }
  }
  g.putImageData(img, 0, 0);
  return (STREAK_TEX = c);
}
const daylight = api => (api.daylight === undefined ? 1 : api.daylight);
export function softShadow(api, x, y, z, rx, rz, alpha, tex = shadowTexture()) {
  if (!tex) return;
  const o = api.project(x, y, z), ex = api.project(x + 1, y, z), ez = api.project(x, y, z + 1), ctx = api.ctx;
  ctx.save(); ctx.transform(ex.x - o.x, ex.y - o.y, ez.x - o.x, ez.y - o.y, o.x, o.y); ctx.scale(rx / 64, rz / 64);
  ctx.globalAlpha *= alpha; ctx.drawImage(tex, -64, -64); ctx.restore();
}
// The shadow of an object standing at (x, y, z) on a footprint of half-sizes hx × hz, `height` tall: a contact pool
// under the footprint and a streak along SUN from its middle out past its sunward-far edge by the height's reach.
// `contact` and `cast` scale the two (1 is a person-weight shadow).
export function sunShadow(api, x, y, z, hx, hz, height, contact = 1, cast = 1) {
  const day = daylight(api);
  if (contact > 0) softShadow(api, x, y, z, hx + .3, hz + .3, .55 * contact * (.6 + .4 * day), poolTexture());
  if (!(height > 0) || !(cast > 0) || !(day > 0)) return;
  const tex = streakTexture(); if (!tex) return;
  // The streak is swept along SUN from the footprint's long side, so a row (a bench, the news boxes) throws one band the
  // length of the row instead of an oval centred on it: the image's x runs along SUN, its y along the long axis.
  const xLong = hx >= hz, hl = xLong ? hx : hz, hs = xLong ? hz : hx, reach = height * SUN_REACH, ctx = api.ctx;
  const o = api.project(x, y, z), ea = api.project(x + SUN.x, y, z + SUN.z), eb = xLong ? api.project(x + 1, y, z) : api.project(x, y, z + 1);
  ctx.save(); ctx.transform(ea.x - o.x, ea.y - o.y, eb.x - o.x, eb.y - o.y, o.x, o.y);
  ctx.globalAlpha *= .62 * cast * day;
  const len = hs * 1.4 + reach + .1, half = hl + .12;
  ctx.translate(-hs * .7, -half); ctx.scale(len / tex.width, half * 2 / tex.height); ctx.drawImage(tex, 0, 0); ctx.restore();
}
// A tree: the trunk's own shadow, and the crown's as a soft round pool thrown along SUN by the crown's height.
function treeShadow(api, x, z, crown, top) {
  const day = daylight(api);
  sunShadow(api, x, P, z, .25, .25, crown * .7, .8, .7);
  if (day > 0) { const r = top * SUN_REACH * .82; softShadow(api, x + SUN.x * r, P, z + SUN.z * r, 1.7, 1.6, .5 * day); }
}
// Contact plus cast for a footprint of half-sizes hx × hz with a given height (vehicles and low street furniture).
function groundShadow(api, x, y, z, hx, hz, height) { sunShadow(api, x, y, z, hx, hz, height, 1.15, 1); }

// The long shadows of the town's buildings, which never move: drawn once into a canvas laid
// out on the ground plane (1 px = 1 / BAKE_PX of a world unit), softened once with a canvas shadow blur (which Safari
// supports, unlike ctx.filter), and laid down with the ground's affine transform each frame in one drawImage. Each
// block's shadow is the hull of its footprint and that footprint carried along SUN by its height, so overlapping
// terraces union into one shade rather than stacking. The blur also leaves a soft fringe round every footprint, which
// grounds the facades facing the camera. (The shop's own tower would throw its shadow back under its walls and floors,
// where none of it shows, so it is left out.)
const BAKE = { x0: -64, x1: 74, z0: -66, z1: 66 }, BAKE_PX = 6;
let BAKED = null;
function bakedShadows() {
  if (BAKED !== null || typeof document === 'undefined') return BAKED;
  const W = Math.round((BAKE.x1 - BAKE.x0) * BAKE_PX), H = Math.round((BAKE.z1 - BAKE.z0) * BAKE_PX);
  const solid = document.createElement('canvas'); solid.width = W; solid.height = H;
  const g = solid.getContext('2d'), px = x => (x - BAKE.x0) * BAKE_PX, pz = z => (z - BAKE.z0) * BAKE_PX;
  const block = (x0, x1, z0, z1, h, alpha) => {
    const dx = SUN.x * h * SUN_REACH, dz = SUN.z * h * SUN_REACH;
    const pts = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], all = pts.concat(pts.map(([x, z]) => [x + dx, z + dz]));
    g.globalAlpha = alpha; g.beginPath(); hull(all).forEach(([x, z], i) => (i ? g.lineTo(px(x), pz(z)) : g.moveTo(px(x), pz(z)))); g.closePath(); g.fill();
  };
  g.fillStyle = '#000';
  BUILDINGS.forEach(([x1, z1, name]) => { const f = BUILDING_SPRITES[name]; block(x1 - f.w, x1, z1 - f.d, z1, f.h, 1 - hazeAt(x1 - f.w / 2, z1 - f.d / 2)); });
  // Soften: the blurred copy of the solid shapes, thrown back onto the canvas from off its edge, in the shadow colour.
  const out = document.createElement('canvas'); out.width = W; out.height = H;
  const o = out.getContext('2d');
  o.shadowColor = 'rgb(46,52,36)'; o.shadowBlur = BAKE_PX * 1.1; o.shadowOffsetX = W; o.drawImage(solid, -W, 0);
  return (BAKED = out);
}
function hull(pts) {
  pts = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), lo = [], hi = [];
  pts.forEach(q => { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); });
  for (let i = pts.length - 1; i >= 0; i--) { const q = pts[i]; while (hi.length >= 2 && cross(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}
function blockShadows(api) {
  const day = daylight(api), tex = day > 0 && bakedShadows(); if (!tex) return;
  const o = api.project(BAKE.x0, P, BAKE.z0), ex = api.project(BAKE.x0 + 1, P, BAKE.z0), ez = api.project(BAKE.x0, P, BAKE.z0 + 1), ctx = api.ctx;
  ctx.save(); ctx.transform(ex.x - o.x, ex.y - o.y, ez.x - o.x, ez.y - o.y, o.x, o.y); ctx.scale(1 / BAKE_PX, 1 / BAKE_PX);
  ctx.globalAlpha *= .5 * day; ctx.drawImage(tex, 0, 0); ctx.restore();
}
const streetTreeKind = (x, z) => ((Math.round(x) + Math.round(z)) & 3) === 1 ? 'street_tree' : 'tree';
function streetTree(api, x, z) {
  const p = api.project, u = api.unit;
  if (streetTreeKind(x, z) === 'street_tree' && prop(api, 'street.tree.02', x, z)) return;
  if (drawSprite(api, 'tree', x, z)) return;
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
  'street.meter': { h: 1.9, drop: .08 }, 'street.trafficlight': { h: 4.3, drop: .1 }, 'street.signpost': { h: 3.8, drop: .1 }, 'street.newsboxes': { w: 2.6, drop: .4 },
  'street.deliveryboxes': { w: 2.3, drop: .5 }, 'street.planter.round': { h: 2.5, drop: .18 }, 'street.awning.cafe': { w: 4.6, drop: .55 } };
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
// Street dressing round the first ring of blocks (Kevin, 2026-10-19: bins, news boxes, hydrants, meters, bollards, bike
// racks, scooters, mixed trees and shrub planters, and cars parked along the kerbs). Each kerb of a block other than the
// shop's own (already dressed by hand above) gets a run of pieces 0.55 in from the kerb, trees a little further in,
// cycling a fixed pattern from a seeded start so neighbouring runs differ; nothing lands on a zebra's landing or
// within reach of a tree or lamp already there, nor where the haze has the ground. Cars park on the quiet back streets
// only (the four streets round the shop carry the traffic and have no room at the kerb), facing the way their lane
// runs, with gaps. The kerbside pieces and parked cars are low-poly versions (art/blender/city/city_props.py, a few
// hundred triangles at most) since there are dozens of them; each parked car is painted by its tint.
const DRESSING = ['tree', 'meter', 'hydrant', 'bin', 'scooter', 'shrub', 'bikerack', 'recycling', 'meter', 'tree', 'newsboxes', 'shrub', 'bollards', 'scooter'];
const PARKED_PAINT = ['#4f8fd0', '#e0564a', '#f2c14e', '#6ea845', '#f4f1e4', '#8a6fd1', '#e8913c', '#3d4a52', '#b8c2c4'];
const CITY_PROPS = (() => {
  const out = [], taken = FAR_TREES.concat(NEAR_TREES, LAMPS).map(([x, z]) => ({ x, z, r: 1.4 }));
  let seed = 41;
  const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
  const free = (x, z, r) => !taken.some(t => Math.hypot(t.x - x, t.z - z) < t.r + r) && hazeAt(x, z) < .45;
  const put = (file, x, z, rot, r, extra) => { out.push({ file: file + '.glb', x, z, rot, ...extra }); taken.push({ x, z, r }); };
  const inner = [bandsAlong('z').slice(1, -1), bandsAlong('x').slice(1, -1)];
  const shop = ([x0, x1], [z0, z1]) => x0 < 0 && x1 > 0 && z0 < 0 && z1 > 0;
  ROADS.forEach(({ along, at }) => {
    const cross = ROADS.filter(r => r.along !== along).map(r => r.at).sort((a, b) => a - b);
    const zebras = MID_CROSSINGS.filter(([a, r]) => a === along && r === at).map(c => c[2]);
    cross.forEach(c => zebras.push(c - 5.5, c + 5.5));
    [-1, 1].forEach(side => {
      const kerb = at + side * RW / 2;
      // The blocks this kerb fronts: those of the inner ring touching it, not the shop's.
      const across = inner[along === 'x' ? 1 : 0].filter(([a0, a1]) => Math.abs((side > 0 ? a0 : a1) - kerb) < .01);
      if (!across.length) return;
      inner[along === 'x' ? 0 : 1].forEach(([s0, s1]) => {
        if (shop(...(along === 'x' ? [[s0, s1], across[0]] : [across[0], [s0, s1]]))) return;
        // Faces the street: on an x street the pieces on the +z kerb turn to face -z, and so on.
        const rot = along === 'x' ? (side > 0 ? Math.PI : 0) : (side > 0 ? -Math.PI / 2 : Math.PI / 2);
        let k = Math.floor(rand() * DRESSING.length);
        for (let u = s0 + 1.6; u < s1 - 1.6; u += 3 + rand() * 1.8) {
          if (zebras.some(z => Math.abs(z - u) < 2.4)) continue;
          // Trees stand down the middle of the pavement so their pits stay on it; shrubs a little in from the kerb.
          const kind = DRESSING[k++ % DRESSING.length], depth = kind === 'tree' ? 1 : kind === 'shrub' ? .95 : .55;
          const off = kerb + side * depth, x = along === 'x' ? u : off, z = along === 'x' ? off : u, r = kind === 'tree' ? 1.3 : .7;
          if (!free(x, z, r)) continue;
          if (kind === 'tree') {
            // Three kinds of street tree, each a little bigger or smaller: the tall one in its own pit, the round one in
            // its own pit, or the round one in a square iron grate.
            const pick = rand(), scale = .8 + rand() * .45, tree = pick < .35 ? 'street_tree' : 'tree';
            out.push({ file: tree + '.glb#lawn', x, z, rot: rand() * 6.28, scale }, treePit(pick < .65 ? tree : 'grate', x, z)); taken.push({ x, z, r });
          } else if (kind === 'meter') { put('street_lp_meter', x, z, rot, r); }
          else if (kind === 'hydrant') put('street_lp_hydrant', x, z, rot, r);
          else if (kind === 'bin') put('street_lp_bin', x, z, rot, r);
          else if (kind === 'recycling') put('street_recycling', x, z, rot, r);
          else if (kind === 'newsboxes') put('street_lp_newsboxes', x, z, rot, r);
          else if (kind === 'bikerack') put('street_lp_bikerack', x, z, rot, r);
          else if (kind === 'shrub') put('street_shrub_planter', x, z, rot, r);
          else if (kind === 'scooter') put(rand() < .5 ? 'street_scooter_mint' : 'street_scooter_red', x, z, rot + (rand() - .5) * .5, r);
          else if (kind === 'bollards') [-.7, 0, .7].forEach(d => put('street_lp_bollard', along === 'x' ? x + d : x, along === 'x' ? z : z + d, 0, .3));
        }
      });
    });
  });
  // Parked cars on the back streets, between the junctions' stop bars.
  ROADS.slice(4).forEach(({ along, at }) => {
    const cross = ROADS.filter(r => r.along !== along).map(r => r.at).sort((a, b) => a - b), stops = [-L].concat(cross, [L]);
    for (let i = 0; i + 1 < stops.length; i++) [-1, 1].forEach(side => {
      const heading = along === 'x' ? side : -side, lane = at + side * 1.9;
      const rot = along === 'x' ? (heading > 0 ? 0 : Math.PI) : (heading > 0 ? -Math.PI / 2 : Math.PI / 2);
      for (let u = stops[i] + STOP_AT + 3.4; u < stops[i + 1] - STOP_AT - 3.4; u += 5.4 + rand() * 1.5) {
        const x = along === 'x' ? u : lane, z = along === 'x' ? lane : u;
        if (rand() < .3 || hazeAt(x, z) > .5) continue;
        const van = rand() < .18;
        out.push({ file: van ? 'van.glb' : 'street_lp_car.glb', x, y: G, z, rot, tint: van ? undefined : PARKED_PAINT[Math.floor(rand() * PARKED_PAINT.length)] });
        if (van) u += 1;
      }
    });
  });
  return out;
})();
function carSprite(colour, view) {
  const name = 'street.' + (colour === 'van' ? 'van' : 'car.' + colour) + '.' + view;
  lazySprite(name, 'sprites/street/' + name + '.png', (colour === 'van' ? VAN_VIEW : CAR_VIEW)[view]);
  return spriteReady(name) ? name : null;
}
// Wheel spin (Kevin, 2026-10-17: "the car wheels should rotate"). The renders are stills, so the two near-side
// wheels of every view get a ring of lug nuts and four rim slots painted over the hubcap, turned by the distance the
// car has driven: no wheel slides on the road and each turn takes 2π tyre radii. Per render, image px of its 620-wide
// cut-out: hub centre, the hub's semi-diameter pointing the way the car drives (A) and its upward conjugate (B), both
// fitted to the hubcap's own ellipse, and the tyre's radius. Four-fold marks repeat every quarter turn, so even at
// 20 frames a second a turn per frame stays under half a repeat and the wheels never seem to run backward.
const CAR_WHEELS = {
  'car.blue.bl': [[297.5, 467.8, 26.1, -15.1, -0.4, -38.7, 79.4], [565.5, 314.9, 23.7, -13.7, 0.3, -36.9, 76.3]],
  'car.blue.br': [[59, 302.3, -24.6, -14.2, 2.8, -38.9, 72], [310.8, 445.8, -24.6, -14.2, 3, -38.5, 71.8]],
  'car.blue.fl': [[282.9, 533.2, -24, 13.8, 0.4, -45.4, 85.6], [553.4, 380.6, -22.6, 13, 0.8, -44.8, 82.4]],
  'car.blue.fr': [[60.3, 346.4, 23.7, 13.7, 1.6, -37.6, 72.7], [337.3, 506.5, 24.1, 13.9, 1.7, -37.5, 74.5]],
  'car.green.bl': [[297.7, 464.2, 26, -15, -0.5, -38.5, 82.5], [564.8, 313.7, 23.7, -13.7, 0.2, -37.1, 78.1]],
  'car.green.br': [[59.5, 301.9, -24.8, -14.3, 2.9, -39.4, 74.8], [310.6, 446.1, -24.9, -14.4, 3.3, -39, 75.6]],
  'car.green.fl': [[282.6, 536.7, -24.1, 13.9, 0.8, -45.7, 88.7], [553, 384, -22.9, 13.2, 1.1, -45.2, 86]],
  'car.green.fr': [[61.1, 346.1, 23.7, 13.7, 1.7, -37.6, 75.1], [337.5, 505.4, 24.2, 14, 1.9, -37.5, 78.3]],
  'car.orange.bl': [[297.4, 463.6, 26, -15, -0.3, -38.9, 78.4], [564.5, 313.2, 23.6, -13.6, 0.5, -37.6, 75.3]],
  'car.orange.br': [[59.3, 300.6, -24.7, -14.3, 2.7, -39.2, 71.9], [310.7, 443.6, -24.8, -14.3, 3.1, -38.8, 71.8]],
  'car.orange.fl': [[282.9, 532.5, -23.9, 13.8, 0.5, -44.7, 85.7], [552.9, 379.6, -22.7, 13.1, 0.9, -44.1, 82.5]],
  'car.orange.fr': [[61.5, 350.3, 23.9, 13.8, 1.2, -38.1, 72.9], [337.7, 509.7, 24.4, 14.1, 1.2, -38.7, 74.2]],
  'car.purple.bl': [[297.1, 465.4, 25.9, -15, -0.1, -39.4, 80.8], [564.5, 313.8, 23.5, -13.6, 0.5, -38.5, 77.1]],
  'car.purple.br': [[58.5, 308.2, -24.5, -14.1, 3.1, -39.9, 74.3], [310.5, 451.8, -24.8, -14.3, 3.3, -39.3, 75]],
  'car.purple.fl': [[282.7, 535.1, -24.2, 14, 0.5, -45.8, 85.9], [553, 383.4, -23, 13.3, 1, -45.4, 82.9]],
  'car.purple.fr': [[60.7, 347.5, 23.8, 13.7, 1.3, -38.1, 74.4], [337.6, 507.9, 24.3, 14, 1.6, -38.4, 76.3]],
  'car.red.bl': [[297.4, 465.1, 26.1, -15.1, -0.3, -39, 78.7], [565, 313.2, 23.7, -13.7, 0.3, -37.2, 75.6]],
  'car.red.br': [[59.4, 304.5, -24.8, -14.3, 2.9, -39.7, 72.4], [310.6, 447.8, -24.8, -14.3, 3.2, -39.1, 72.4]],
  'car.red.fl': [[282.9, 533.6, -24.4, 14.1, 0, -45.9, 85.7], [553.6, 381.1, -23.1, 13.4, 0.1, -45.3, 82.1]],
  'car.red.fr': [[61.1, 347.1, 23.8, 13.7, 1.6, -37.8, 72.3], [338, 506.6, 24.1, 13.9, 1.4, -38.5, 73.8]],
  'car.white.bl': [[297.4, 463.5, 26.1, -15.1, -0.4, -38.8, 81.1], [564.7, 312.6, 23.6, -13.6, 0.4, -37.3, 77]],
  'car.white.br': [[58.6, 302.7, -24.7, -14.3, 2.7, -39.3, 73.8], [310.3, 445.9, -24.8, -14.3, 3.2, -38.8, 74.3]],
  'car.white.fl': [[282.8, 535.5, -24.2, 14, 0.6, -45.4, 86.2], [552.5, 383.4, -22.9, 13.2, 1.1, -45.2, 83.1]],
  'car.white.fr': [[60.8, 346.3, 23.8, 13.8, 1.6, -37.8, 73.8], [337.2, 505.9, 24.1, 13.9, 1.8, -38, 74.8]],
  'car.yellow.bl': [[297.7, 463.5, 25.9, -15, -0.3, -38.5, 78.5], [564.6, 312.5, 23.6, -13.6, 0.2, -37, 75.4]],
  'car.yellow.br': [[59.2, 303.3, -24.8, -14.3, 2.8, -39.2, 72], [310.5, 445.6, -24.8, -14.3, 3.3, -38.7, 72]],
  'car.yellow.fl': [[282.9, 534.2, -24.2, 14, 0.2, -45.8, 85.9], [553.4, 380.6, -22.8, 13.2, 0.5, -45, 82.6]],
  'car.yellow.fr': [[61.4, 345.8, 24.2, 14, 1.1, -38.2, 72.1], [337.4, 504.6, 24.3, 14, 1.2, -38.4, 73.8]],
  'van.bl': [[306.8, 504.5, 27.1, -15.6, -0.6, -39.6, 83.1], [563.4, 358.7, 24.7, -14.3, 0.2, -39.1, 81.2]],
  'van.br': [[60.9, 312.5, -23.6, -13.6, 3.9, -36.1, 69.3], [305.9, 453, -24.7, -14.2, 3.7, -36.3, 71.8]],
  'van.fl': [[273.5, 539.9, -22, 12.7, 0, -38, 73.4], [545.2, 386.1, -21.5, 12.4, 0.7, -38.1, 72]],
  'van.fr': [[67.3, 365.9, 23.8, 13.7, 3.3, -34, 68.3], [342.5, 522.1, 22.7, 13.1, 2.6, -32.3, 70]]
};
function drawWheels(api, name, key, x, z, roll, haze) {
  const s = SPRITES[name], wheels = CAR_WHEELS[key]; if (!wheels || !api.now) return;
  const u = api.unit, q = api.project(x, 0, z), nw = s.img.naturalWidth || s.img.width, k = s.w * u / nw, ctx = api.ctx;
  const x0 = q.x + (s.ox || 0) * u - s.w * u / 2, y0 = q.y + s.drop * u - (s.img.naturalHeight || s.img.height) * k;
  const up = Math.abs(api.project(x, 1, z).y - q.y) || 1;
  ctx.save(); ctx.globalAlpha *= 1 - (haze || 0);
  wheels.forEach(([cx, cy, ax, ay, bx, by, tyre]) => {
    if (Math.hypot(bx, by) * k < 2) return; // too small to read
    ctx.save(); ctx.translate(x0 + cx * k, y0 + cy * k); ctx.transform(ax * k, ay * k, bx * k, by * k, 0, 0);
    ctx.rotate(-roll * up / (tyre * k)); // rolling forward carries the top of the wheel the way the car drives
    ctx.fillStyle = 'rgba(64,56,48,.5)';
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2;
      ctx.beginPath(); ctx.arc(Math.cos(a) * .36, Math.sin(a) * .36, .085, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, .82, a + .38, a + .98); ctx.arc(0, 0, .64, a + .98, a + .38, true); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  });
  ctx.restore();
}
// A compact car or the van, nose along x or z, heading `dir` (+1 toward the camera), drawn at street level: Kevin's
// render for that view where it has loaded, else the drawn stand-in.
function car(api, x, z, along, dir, colour, roll) {
  const p = api.project, u = api.unit, ax = along === 'x', Lc = 2.6, W = 1.3, van = colour === 'van';
  const name = carSprite(colour, ax ? (dir > 0 ? 'fr' : 'br') : (dir > 0 ? 'fl' : 'bl'));
  if (name) {
    const haze = hazeAt(x, z), ctx = api.ctx, q = p(x, G, z);
    ctx.save(); ctx.translate(0, q.y - p(x, 0, z).y);
    drawSprite(api, name, x, z, false, 1, 0, haze); drawWheels(api, name, name.slice(7), x, z, roll || 0, haze); ctx.restore(); return;
  }
  const color = CAR_PAINT[colour] || colour;
  [[-.85, 1], [.85, 1], [-.85, -1], [.85, -1]].forEach(([a, s]) => { const q = ax ? p(x + a, G + .25, z + s * W / 2) : p(x + s * W / 2, G + .25, z + a); api.ellipse(q.x, q.y, u * .24, u * .24, '#25282b'); });
  const dark = api.shade(color, .72), mid = api.shade(color, .86);
  api.box(x, z, G + .25, ax ? Lc : W, ax ? W : Lc, .6, [color, ax ? dark : mid, ax ? mid : dark]);
  api.box(x - (ax ? .15 : 0), z - (ax ? 0 : .15), G + .85, ax ? 1.5 : W * .86, ax ? W * .86 : 1.5, .5, ['#e9eef0', '#7f98a6', '#9fb6c2']);
}

// Cars loop along their lane, each sorted by its own footprint (a 4.2-unit car, 4.8 for the van, 1.9 wide).
// Where each car is at `now`: shared by the 2D map's street pass and the 3D map (src/three/map3d.js).
export function carPlacements(now) {
  const t = now * .00009 * 90 / CAR_LOOP; // about 8 units a second, four walkers' pace, whatever the loop's length
  return CARS.map(([ri, dir, phase, colour]) => {
    // Right-hand traffic: heading +x the kerb is on the +z side, heading +z it is on the -x side.
    const r = ROADS[ri], s = (((phase + dir * t) % 1) + 1) % 1 * CAR_LOOP - CAR_LOOP / 2, lane = (r.along === 'x' ? dir : -dir) * 1.5, ax = r.along === 'x';
    // roll: how far this car has driven since the clock started, for its wheels.
    return { x: ax ? s : r.at + lane, z: ax ? r.at + lane : s, along: r.along, dir, colour, roll: (dir * phase + t) * CAR_LOOP, paint: CAR_PAINT[colour] || colour, van: colour === 'van' };
  });
}
function drawCars(api, at) {
  carPlacements(api.now).forEach(({ x, z, along, dir, colour, roll }) => {
    const hl = colour === 'van' ? 2.4 : 2.1, hw = .95, ax = along === 'x';
    at(x, z, () => car(api, x, z, along, dir, colour, roll), ax ? hl : hw, ax ? hw : hl, () => {
      const ctx = api.ctx, sl = colour === 'van' ? 2.5 : 2, sw = colour === 'van' ? 1.2 : 1;
      ctx.save(); ctx.globalAlpha *= 1 - hazeAt(x, z); groundShadow(api, x, G, z, ax ? sl : sw, ax ? sw : sl, colour === 'van' ? 2.6 : 1.7); ctx.restore();
    });
  });
}

// Pedestrians pace their pavement segment there and back. Each walks at their own pace in world units a second (a
// stroll, whatever the segment's length: Kevin found the earlier pace far too quick, and the far pavements, being
// longer, used to be walked at a run), starts at their own point of the loop, faces the way they are going on screen,
// and takes their steps from the ground covered so the feet never slide (see WALK_STEP_RATE).
const WALK_BASE = WALKS.reduce((acc, w) => (acc.push(acc[acc.length - 1] + w[4]), acc), [0]);
// The subway entrance on the right-hand pavement: the well's centre and the half-extents of the hole it needs in the
// slab (street_subway.glb's walls, 1.4 m by 2.9 m outside, at 1.69 map units a metre, plus a sliver). Its mouth faces
// +z and the stairs run down toward -z: eight 0.29 m treads of 0.2 m, then a landing 1.6 m down.
export const SUBWAY = { x: 18, z: 9.85, hx: 1.2, hz: 2.47 };
const SUB_M = 1.69, SUB_Y = SUB_M / (1 / Math.cos(Math.atan(Math.SQRT1_2))); // metres to map units, across and up
const SUB_MOUTH = SUBWAY.z + 1.35 * SUB_M, SUB_FOOT = SUB_MOUTH - 8 * .29 * SUB_M, SUB_DEEP = P - 1.6 * SUB_Y;
const SUB_PASSAGE = SUBWAY.z - 1.35 * SUB_M + .35; // the far wall's face, where the passage opens, plus half a figure
// Riders: a path from out of sight below the landing (through the passage in the far wall), up the stairs and out
// onto the pavement, walked back and forth like the walks above, so each one comes up, goes about and heads back
// down. Points are [x, y, z]; one runs to the bus stop, the other round the corner to the front crossing.
const SUBWAY_RIDES = [
  [[SUBWAY.x - .3, SUB_DEEP, SUBWAY.z - 8], [SUBWAY.x - .3, SUB_DEEP, SUB_FOOT], [SUBWAY.x - .3, P, SUB_MOUTH], [SUBWAY.x - .5, P, SUB_MOUTH + 1.4],
    [15.3, P, SUB_MOUTH + 1.4], [15.3, P, -8.6], [16.9, P, -10.2]],
  [[SUBWAY.x + .3, SUB_DEEP, SUBWAY.z - 8], [SUBWAY.x + .3, SUB_DEEP, SUB_FOOT], [SUBWAY.x + .3, P, SUB_MOUTH], [16.8, P, SUB_MOUTH + 2],
    [16.7, P, 18.3], [-9.5, P, 18.3]]
];
// The way up out of the subway on lane dx (either side of the well's centre), for the online pickup window's walk-ups
// (pickup-window.js): from out of sight in the passage, along the landing, up the stairs and a step onto the pavement.
// Points are [x, y, z]; a figure is only drawn once past SUBWAY_HIDDEN_Z, as with the riders.
export function subwayStairs(dx) { return [[SUBWAY.x + dx, SUB_DEEP, SUB_PASSAGE - .8], [SUBWAY.x + dx, SUB_DEEP, SUB_FOOT], [SUBWAY.x + dx, P, SUB_MOUTH], [SUBWAY.x + dx - .2, P, SUB_MOUTH + 1]]; }
export const SUBWAY_HIDDEN_Z = SUB_PASSAGE;
// Where each rider is at `now`: the walks' pacing over the path's length, y included for the stairs.
function riderPlacement(path, g, now) {
  const legs = path.slice(1).map((b, i) => Math.hypot(b[0] - path[i][0], b[2] - path[i][2])), len = legs.reduce((a, b) => a + b, 0), loop = len * 2;
  const pace = 1.5 + (g * 7 % 5) * .12, s = (now * .001 * pace + ((g * .53) % 1) * loop) % loop, outbound = s < len;
  let d = outbound ? s : loop - s, i = 0;
  while (i < legs.length - 1 && d > legs[i]) d -= legs[i++];
  const a = path[i], b = path[i + 1], f = legs[i] ? d / legs[i] : 0, dir = outbound ? 1 : -1;
  const hx = (b[0] - a[0]) / (legs[i] || 1) * dir, hz = (b[2] - a[2]) / (legs[i] || 1) * dir;
  return { g, s, x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, z: a[2] + (b[2] - a[2]) * f, facing: Math.sign(hx - hz) || .3, heading: { x: hx, z: hz } };
}
// Where each pavement walker is at `now`, shared with the 3D map like carPlacements.
export function walkerPlacements(now) {
  const out = [];
  WALKS.forEach(([x0, z0, x1, z1, n], wi) => {
    const len = Math.hypot(x1 - x0, z1 - z0), screenDir = Math.sign((x1 - x0) - (z1 - z0));
    for (let k = 0; k < n; k++) {
      const g = WALK_BASE[wi] + k, pace = 1.5 + (g * 7 % 5) * .12, loop = len * 2;
      const s = (now * .001 * pace + ((g * .37 + k / n) % 1) * loop) % loop, outbound = s < len, f = outbound ? s / len : 2 - s / len;
      out.push({ g, s, x: x0 + (x1 - x0) * f, z: z0 + (z1 - z0) * f, facing: screenDir * (outbound ? 1 : -1) || .3,
        heading: { x: (x1 - x0) / len * (outbound ? 1 : -1), z: (z1 - z0) / len * (outbound ? 1 : -1) } });
    }
  });
  // Past the landing a rider is in the passage under the pavement, where a standing figure's head would poke up through
  // the slab behind the well (Kevin, 2026-10-19), so they leave the map at the doorway and come back through it.
  SUBWAY_RIDES.forEach((path, k) => { const r = riderPlacement(path, WALK_BASE[WALKS.length] + k, now); if (r.z > SUB_PASSAGE) out.push(r); });
  return out;
}
function drawWalkers(api, at) {
  walkerPlacements(api.now).forEach(w => at(w.x, w.z, () => drawWalker(api, w), .4));
}
// One walker from walkerPlacements, as the street draws it; the 3D map records the same call to stand the figure up.
export function drawWalker(api, { g, s, x, z, facing, heading }) {
  if (!drawPersonSprite(api, x, z, -(g + 1), false, facing, s + g * .44, api.now > 0 ? 1 : 0, walkerHasBag(g + 1), false, heading)) api.person(x, z, 40 + g, api.now > 0);
}

// The block's layout for the 3D map: streets, terraces (footprints from their renders), trees, lamps and haze, in
// the same world units the 2D passes above use.
export function townLayout() {
  return {
    roads: ROADS.map(r => ({ ...r })), roadWidth: RW, plazaY: P, streetY: G, extent: L,
    colours: { paver: PAVER, asphalt: ASPHALT }, marks: groundMarks().concat(kerbsAndDrains()),
    buildings: BUILDINGS.map(b => { const f = BUILDING_SPRITES[b[2]]; return { x0: b[0] - f.w, x1: b[0], z0: b[1] - f.d, z1: b[1], h: lotFit(b).top, wall: f.wall[0], roof: f.wall[1], model: modelOf(b) + '.glb' }; }),
    silhouettes: SILHOUETTES.map(b => ({ ...b })),
    trees: FAR_TREES.concat(NEAR_TREES).map(t => t.slice()), lamps: LAMPS.map(l => l.slice()),
    haze: { colour: HAZE.slice(), ramp: { west: HAZE_RAMP.west.slice(), east: HAZE_RAMP.east.slice(), north: HAZE_RAMP.north.slice(), south: HAZE_RAMP.south.slice() } },
    sun: { x: SUN.x, z: SUN.z, reach: SUN_REACH },
    // Openings through the pavement and the street floor under it, for sunken models (the subway well).
    holes: [{ x0: SUBWAY.x - SUBWAY.hx, x1: SUBWAY.x + SUBWAY.hx, z0: SUBWAY.z - SUBWAY.hz, z1: SUBWAY.z + SUBWAY.hz }]
  };
}
