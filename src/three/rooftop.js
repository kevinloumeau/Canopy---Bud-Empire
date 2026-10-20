// The rooftop lounge: a new floor on top of the shop, reached by a glass elevator that climbs from the old lounge
// room behind the curtained doorway. Guests ride up, spend their session on the roof and ride back down.
// The roof grows with the lounge's tiers: Speakeasy is the pergola, its sofas and the fire table; Dab bar adds the
// bar; Vinyl nights the DJ booth; Terrace the parasol tables along the front; Private booths drapes the pergola;
// Tasting bar sets jar flights on the bar; Chef's table lays a long table by the front rail; Members' club adds the
// brass and velvet. Before the lounge is bought the roof
// is a taped-off slab and the shaft a bare steel frame.
// Every position comes from layout.rooftop (ROOFTOP in main.js), which also places the guests' standing spots.
import * as THREE from 'three';
import { HEIGHT_SCALE } from './camera.js';
import { compactModel } from './compact.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const BRASS = '#d0a54e', OAK = '#b98d5c', OAK_DARK = '#6e4a2c', STEEL = '#1f4a35', CREAM = '#efe4cf', VELVET = '#6b2436';

export function buildRooftop(world, layout, { box, span, material }) {
  const r = layout.rooftop;
  if (!r) return null;
  const roof = new THREE.Group();
  world.add(roof);
  const { x0, x1, z0, z1, y } = r, lift = r.lift;
  const tiers = Array.from({ length: 9 }, () => new THREE.Group());
  tiers.forEach(g => roof.add(g));
  const [site, t1, t2, t3, t4, t5, t6, t7, t8] = tiers, levels = tiers.slice(1);
  // The code-built furniture each Blender model replaces, hidden once its model loads (loadModels, below).
  const [k1, k2, k3, k4, k5, k6, k7, k8] = levels.map(t => { const k = new THREE.Group(); t.add(k); return k; });
  // Everything a bought lounge has, whatever its tier: deck boards, glass balustrade, elevator glazing and cab.
  const open = new THREE.Group(); roof.add(open);
  const glass = new THREE.MeshStandardMaterial({ color: '#cfe6df', roughness: .1, metalness: 0, transparent: true, opacity: .28, depthWrite: false });
  const glassy = (mesh) => { mesh.material = glass; mesh.castShadow = false; mesh.receiveShadow = false; return mesh; };
  const glow = (colour, emissive) => new THREE.MeshLambertMaterial({ color: colour, emissive, emissiveIntensity: 0 });
  const lights = [];

  // The slab on top of the top floor's glazing, with a cream lip, and the deck boards on it.
  span(roof, x0, x1, y - .3, y, z0, z1, '#e4ddcc');
  span(roof, x0 - .05, x1 + .05, y - .34, y - .22, z0 - .05, z1 + .05, '#e1dbc0', { cast: false });
  // The deck steps back from the top floor like the floors below it: posts stand on the top floor under its front,
  // and its rear, out over the back pavement, rests on steel columns from the ground with a beam under the slab.
  const below = layout.floors[2].y, rear = layout.floors[0].z - layout.floors[0].d / 2;
  [[x0 + .3, z1 - .3], [x1 - .3, z1 - .3]].forEach(([px, pz]) => box(roof, px, below, pz, .3, y - .3 - below, .3, '#33372f'));
  if (z0 < rear) {
    [x0 + .3, 0, x1 - .3].forEach(px => box(roof, px, 0, z0 + .3, .32, y - .3, .32, STEEL));
    span(roof, x0, x1, y - .62, y - .3, z0 + .14, z0 + .46, STEEL);
  }
  const deckCanvas = document.createElement('canvas'); deckCanvas.width = 256; deckCanvas.height = 256;
  const dc = deckCanvas.getContext('2d');
  dc.fillStyle = '#b98654'; dc.fillRect(0, 0, 256, 256);
  for (let k = 0; k < 8; k++) {
    dc.fillStyle = ['#bf8c59', '#b4814f', '#c39260', '#b78552'][k % 4]; dc.fillRect(0, k * 32 + 1, 256, 30);
    dc.fillStyle = '#8f6038'; dc.fillRect((k * 97) % 256, k * 32, 2, 32);
  }
  const deckTexture = new THREE.CanvasTexture(deckCanvas);
  deckTexture.colorSpace = THREE.SRGBColorSpace; deckTexture.wrapS = deckTexture.wrapT = THREE.RepeatWrapping; deckTexture.anisotropy = 4;
  deckTexture.repeat.set((x1 - x0) / 2.4, (z1 - z0) / 2.4);
  const deck = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0 - .2, z1 - z0 - .2).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: deckTexture }));
  deck.position.set((x0 + x1) / 2, y + .004, (z0 + z1) / 2); deck.receiveShadow = true; open.add(deck);

  // The glass balustrade on all four edges, slim green posts and a brass cap rail; a gap where the bridge lands.
  const railH = 1.05, gap = [lift.z - .6, lift.z + .6];
  function balustrade(alongZ, a0, a1, at, group) {
    const n = Math.max(1, Math.round((a1 - a0) / 1.6)), step = (a1 - a0) / n;
    const piece = (p0, p1, y0, y1, t, c, o) => alongZ ? span(group, at - t, at + t, y0, y1, p0, p1, c, o) : span(group, p0, p1, y0, y1, at - t, at + t, c, o);
    for (let k = 0; k <= n; k++) { const p = a0 + k * step; piece(p - .04, p + .04, y, y + railH, .04, STEEL); }
    piece(a0, a1, y + railH - .03, y + railH + .03, .06, BRASS, { cast: false });
    glassy(piece(a0, a1, y + .08, y + railH - .05, .01, '#cfe6df'));
  }
  balustrade(false, x0, x1, z1, open); balustrade(false, x0, x1, z0, open); balustrade(true, z0, z1, x1, open);
  balustrade(true, gap[1], z1, x0, open);
  // With room for a second bridge: the rail stops either side of its landing, and a short piece fills the gap until
  // the second shaft is bought.
  const gap2 = r.lift2 ? [r.lift2.z - .6, r.lift2.z + .6] : null, gapFill = new THREE.Group(); open.add(gapFill);
  if (gap2) { balustrade(true, z0, gap2[0], x0, open); balustrade(true, gap2[1], gap[0], x0, open); balustrade(true, gap2[0], gap2[1], x0, gapFill); }
  else balustrade(true, z0, gap[0], x0, open);
  // Before opening: tape round the slab's edge on short posts, a pallet of boards and a covered stack.
  const tape = (ax, az, bx, bz) => {
    const len = Math.hypot(bx - ax, bz - az), m = new THREE.Mesh(new THREE.BoxGeometry(len, .06, .02), material('#e8b13a', { emissive: '#3a2a00' }));
    m.position.set((ax + bx) / 2, y + .75, (az + bz) / 2); m.rotation.y = -Math.atan2(bz - az, bx - ax); site.add(m);
  };
  const corners = [[x0 + .2, z0 + .2], [x1 - .2, z0 + .2], [x1 - .2, z1 - .2], [x0 + .2, z1 - .2]];
  corners.forEach(([cx, cz], k) => { box(site, cx, y, cz, .07, .8, .07, '#d8cfbd'); const [nx, nz] = corners[(k + 1) % 4]; tape(cx, cz, nx, nz); });
  // Stand-ins for the diorama's rooftop_site.glb (strapped lumber on a pallet, crates under a tied tarp, cement sacks).
  const kSite = new THREE.Group(); site.add(kSite);
  box(kSite, -2.2, y, -4.6, 1.6, .18, 1.1, '#9a7a52'); box(kSite, -2.2, y + .18, -4.6, 1.5, .5, 1, '#c9a978');
  box(kSite, 1.8, y, -5.4, 1.2, .9, 1.2, '#8e9a86');
  box(kSite, 3.6, y, -4.5, .9, .14, 1.4, '#9a7a52');
  // While the lounge is being built (frame.loungeBuild, the share done): a tower crane swings over the roof with a
  // pallet on its hook, a scaffold stands round the lift's landing, and the deck boards go down strip by strip.
  const works = new THREE.Group(); works.visible = false; roof.add(works);
  const AMBER = '#e8b13a', mastX = x1 - 1.3, mastZ = z0 + 1.1, mastH = 6.2;
  box(works, mastX, y, mastZ, .9, .25, .9, '#8d918a');
  box(works, mastX, y + .25, mastZ, .32, mastH, .32, AMBER);
  for (let h = 1; h < mastH; h += 1.1) box(works, mastX, y + .25 + h, mastZ, .38, .07, .38, '#6b5320');
  const jib = new THREE.Group(); jib.position.set(mastX, y + .25 + mastH, mastZ); works.add(jib);
  box(jib, 0, 0, 0, .55, .45, .5, '#efe4cf');
  box(jib, -3.6, .45, 0, 7.2, .18, .22, AMBER); box(jib, 1.2, .45, 0, 2.4, .18, .22, AMBER);
  box(jib, 2.1, .1, 0, .7, .5, .5, '#8d918a');
  box(jib, 0, .45, 0, .14, 1, .14, AMBER);
  const hookX = -4.6, cableTop = .45, cableLen = 3.4;
  box(jib, hookX, cableTop - cableLen, 0, .03, cableLen, .03, '#2e3330');
  box(jib, hookX, cableTop - cableLen - .45, 0, 1, .12, .7, '#9a7a52'); box(jib, hookX, cableTop - cableLen - .33, 0, .9, .3, .6, '#c9a978');
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffb52e' }));
  beacon.position.set(0, 1.55, 0); jib.add(beacon);
  // Scaffold round the lift's landing at the deck's left edge.
  const sx = x0 + .5, sz = lift.z;
  [[-.7, -.9], [.7, -.9], [-.7, .9], [.7, .9]].forEach(([dx, dz]) => box(works, sx + dx, y, sz + dz, .06, 2.6, .06, '#9aa39b'));
  [.9, 1.8].forEach(h => { box(works, sx, y + h, sz - .9, 1.46, .05, .06, '#9aa39b'); box(works, sx, y + h, sz + .9, 1.46, .05, .06, '#9aa39b'); box(works, sx, y + h - .04, sz, 1.4, .05, 1.7, '#c9a978'); });
  // The boards, laid from the back of the deck to the front as the build runs.
  const strips = Array.from({ length: 10 }, (_, k) => {
    const zA = z0 + .1 + (z1 - z0 - .2) * k / 10;
    return box(works, (x0 + x1) / 2, y + .01, zA + (z1 - z0 - .2) / 20, x1 - x0 - .2, .03, (z1 - z0 - .2) / 10 - .04, OAK, { cast: false });
  });

  // Before the lounge opens (Kevin, 2026-10-20) the bare steel frame wears a tall banner on its two street faces, a
  // vertical billboard for the store in forest green and brass. The glass shaft takes over once the lounge opens.
  const bannerCanvas = document.createElement('canvas'); bannerCanvas.width = 160; bannerCanvas.height = 1600;
  {
    const c = bannerCanvas.getContext('2d'), W = bannerCanvas.width, H = bannerCanvas.height;
    c.fillStyle = STEEL; c.fillRect(0, 0, W, H);
    c.strokeStyle = BRASS; c.lineWidth = 6; c.strokeRect(10, 10, W - 20, H - 20); c.lineWidth = 2; c.strokeRect(20, 20, W - 40, H - 40);
    // The leaf mark: five slim leaflets fanned from one stem.
    c.save(); c.translate(W / 2, 250); c.fillStyle = BRASS;
    [-1.1, -.55, 0, .55, 1.1].forEach((a, k) => { const len = k === 2 ? 120 : k % 4 ? 100 : 72; c.save(); c.rotate(a); c.beginPath(); c.ellipse(0, -len / 2, 13, len / 2, 0, 0, Math.PI * 2); c.fill(); c.restore(); });
    c.fillRect(-3, 0, 6, 46); c.restore();
    c.fillStyle = CREAM; c.font = '800 104px Georgia, serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    'CANOPY'.split('').forEach((ch, k) => c.fillText(ch, W / 2, 420 + k * 145));
    c.fillStyle = BRASS; c.fillRect(W / 2 - 40, 1300, 80, 4);
    c.font = '700 26px Georgia, serif'; ['CANNABIS', 'CO.'].forEach((t, k) => c.fillText(t, W / 2, 1360 + k * 44));
  }
  const bannerTexture = new THREE.CanvasTexture(bannerCanvas); bannerTexture.colorSpace = THREE.SRGBColorSpace; bannerTexture.anisotropy = 4;
  const banner = new THREE.Group(); roof.add(banner);
  {
    const bannerMat = new THREE.MeshLambertMaterial({ map: bannerTexture }), b0 = 2.9, b1 = y + 2.75;
    const face = (w) => new THREE.Mesh(new THREE.PlaneGeometry(w, b1 - b0), bannerMat);
    const front = face(lift.w + .06); front.position.set(lift.x, (b0 + b1) / 2, lift.z + lift.d / 2 + .03); banner.add(front);
    const side = face(lift.d + .06); side.rotation.y = -Math.PI / 2; side.position.set(lift.x - lift.w / 2 - .03, (b0 + b1) / 2, lift.z); banner.add(side);
    banner.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  }

  // The elevator: a sleek glass shaft from the ground to just above the roof, its brass cab riding inside with its
  // passenger. Slim dark corner posts, a thin ring at each landing, a flat cap with a fine brass edge, and a thin
  // flat canopy over the doorway on to the bridge. A short bridge crosses to the deck. The lounge can buy a second
  // shaft beside the first (r.lift2), shown once frame.loungeLift says so.
  const hw = lift.w / 2, hd = lift.d / 2, crown = y + 2.9, pier = .09;
  function shaft(lz, frame, inside) {
    const lx = lift.x, g = [lz - .6, lz + .6];
    // Code-built stand-ins, each hidden once its Blender model loads (loadModels): the shaft's frame, its glass, the
    // cab and the bridge.
    const kf = new THREE.Group(), ki = new THREE.Group(), kb = new THREE.Group(); frame.add(kf); inside.add(ki); inside.add(kb);
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => box(kf, lx + sx * (hw - pier / 2), 0, lz + sz * (hd - pier / 2), pier, crown, pier, STEEL));
    // Rings round the outside, so the shaft stays clear for the cab and its rider.
    const band = (h, t, c, out = .01) => {
      const a0 = lx - hw - out, a1 = lx + hw + out, b0 = lz - hd - out, b1 = lz + hd + out, w = .04;
      span(kf, a0, a1, h, h + t, b0, b0 + w, c, { cast: false }); span(kf, a0, a1, h, h + t, b1 - w, b1, c, { cast: false });
      span(kf, a0, a0 + w, h, h + t, b0, b1, c, { cast: false }); span(kf, a1 - w, a1, h, h + t, b0, b1, c, { cast: false });
    };
    [0, layout.floors[1].y, layout.floors[2].y, y].forEach(h => band(h + 2.62, .06, STEEL));
    span(kf, lx - hw - .03, lx + hw + .03, crown, crown + .16, lz - hd - .03, lz + hd + .03, STEEL);
    band(crown + .16, .025, BRASS, .03);
    span(kf, lx + hw, lx + hw + .6, y + 2.5, y + 2.55, lz - hd + .05, lz + hd - .05, STEEL);
    [[false, lz + hd], [false, lz - hd], [true, lx - hw], [true, lx + hw]].forEach(([alongZ, at]) => {
      glassy(alongZ ? span(ki, at - .01, at + .01, .05, crown, lz - hd + .06, lz + hd - .06, '#cfe6df') : span(ki, lx - hw + .06, lx + hw - .06, .05, crown, at - .01, at + .01, '#cfe6df'));
    });
    const cab = new THREE.Group(); inside.add(cab);
    const cabK = new THREE.Group(); cab.add(cabK);
    const cw = lift.w - .3, cd = lift.d - .3, ch = 2.35;
    span(cabK, -cw / 2, cw / 2, 0, .12, -cd / 2, cd / 2, '#2b302d');
    span(cabK, -cw / 2, cw / 2, ch - .14, ch, -cd / 2, cd / 2, BRASS);
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => box(cabK, sx * (cw / 2 - .04), .12, sz * (cd / 2 - .04), .08, ch - .26, .08, BRASS));
    span(cabK, -cw / 2 + .05, -cw / 2 + .1, .12, ch - .14, -cd / 2 + .1, cd / 2 - .1, OAK_DARK, { cast: false });
    const cabLamp = new THREE.Mesh(new THREE.BoxGeometry(cw - .3, .04, cd - .3), glow('#fff2c8', '#ffd58a'));
    cabLamp.position.y = ch - .16; cabK.add(cabLamp); lights.push([cabLamp.material, .4, 1.2]);
    cab.position.set(lx, 0, lz);
    // The bridge from the landing to the deck: boards, glass sides with brass rails, and the red runner on to the deck.
    const bx0 = lx + hw, bx1 = x0;
    span(kb, bx0, bx1 + .05, y - .26, y, g[0], g[1], '#e4ddcc');
    g.forEach(z => {
      span(kb, bx0, bx1, y + railH - .03, y + railH + .03, z - .05, z + .05, BRASS, { cast: false });
      glassy(span(kb, bx0, bx1, y + .05, y + railH - .05, z - .01, z + .01, '#cfe6df'));
    });
    span(kb, bx0 + .05, x0 + 1.2, y + .006, y + .016, lz - .38, lz + .38, VELVET, { cast: false });
    span(kb, bx0 + .05, x0 + 1.2, y + .004, y + .012, lz - .45, lz + .45, BRASS, { cast: false });
    return { cab, cabK, kf, ki, kb, frame, inside, lz, cabLamp };
  }
  const shafts = [shaft(lift.z, roof, open)];
  const second = new THREE.Group(); open.add(second);
  if (r.lift2) shafts.push(shaft(r.lift2.z, second, second));
  const cab = shafts[0].cab, cab2 = shafts[1] ? shafts[1].cab : null;

  const kOlive = new THREE.Group(); open.add(kOlive);
  // Planters along the left balustrade and in the corners, with soft shrubs; two olive trees in tall pots.
  const clump = new THREE.IcosahedronGeometry(1, 1);
  const bush = (g, bx, by, bz, rr, c) => { const b = new THREE.Mesh(clump, material(c)); b.position.set(bx, by, bz); b.scale.set(rr, rr * .8, rr); b.castShadow = b.receiveShadow = true; g.add(b); };
  const kPlant = new THREE.Group(); open.add(kPlant);
  const planters = [[x0 + .2, x0 + .9, z0 + .2, (r.lift2 ? r.lift2.z : lift.z) - .9], [x0 + .2, x0 + .9, lift.z + .9, z1 - .2]];
  planters.forEach(([a, b, c, d]) => {
    span(kPlant, a, b, y, y + .55, c, d, '#1f5e40');
    span(kPlant, a - .03, b + .03, y + .55, y + .6, c - .03, d + .03, '#e1dbc0', { cast: false });
    for (let z = c + .35; z < d - .2; z += .55) bush(kPlant, (a + b) / 2, y + .8, z, .32, (Math.round(z * 3) % 2) ? '#6b9250' : '#5f8648');
  });
  [[x1 - .5, z1 - .5], [x1 - .6, z0 + .6]].forEach(([px, pz]) => {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(.34, .26, .7, 20).translate(0, .35, 0), material('#d9cdb4'));
    pot.position.set(px, y, pz); pot.castShadow = pot.receiveShadow = true; kOlive.add(pot);
    box(kOlive, px, y + .7, pz, .1, 1.1, .1, '#7a6142');
    [[0, 2.05, 0, .55, '#8aa66a'], [-.25, 1.8, .2, .4, '#7a9a5c'], [.22, 1.9, -.2, .42, '#9cb57a']].forEach(([ox, oy, oz, rr, c]) => bush(kOlive, px + ox, y + oy, pz + oz, rr, c));
  });

  // String lights: warm bulbs on sagging wires between the balustrade's corner posts and the pergola.
  const bulbs = [];
  const wireMat = new THREE.MeshLambertMaterial({ color: '#2b302d' });
  function stringLights(group, ax, az, ay, bx, bz, by, n) {
    const points = [];
    for (let k = 0; k <= n * 2; k++) {
      const t = k / (n * 2), sag = Math.sin(Math.PI * t) * .45, pt = [ax + (bx - ax) * t, ay + (by - ay) * t - sag, az + (bz - az) * t];
      points.push(new THREE.Vector3(...pt));
      if (k % 2 === 0) bulbs.push([group, pt[0], pt[1] - .07, pt[2]]);
    }
    // A slim cable rather than a hairline, so it keeps its weight at every zoom.
    const wire = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), n * 4, .014, 4), wireMat);
    group.add(wire);
  }

  // Speakeasy: the pergola over the rear left, an L of cream sofas with velvet cushions, the brass fire table.
  const p = { x0: x0 + 1.4, x1: x0 + 6.2, z0: z0 + .25, z1: z0 + 3.4, h: 2.75 };
  [[p.x0, p.z0], [p.x1, p.z0], [p.x1, p.z1], [p.x0, p.z1]].forEach(([px, pz]) => box(k1, px, y, pz, .14, p.h, .14, STEEL));
  span(k1, p.x0 - .1, p.x1 + .1, y + p.h, y + p.h + .16, p.z0 - .07, p.z0 + .07, STEEL);
  span(k1, p.x0 - .1, p.x1 + .1, y + p.h, y + p.h + .16, p.z1 - .07, p.z1 + .07, STEEL);
  for (let x = p.x0 + .1; x < p.x1; x += .38) span(k1, x - .04, x + .04, y + p.h + .16, y + p.h + .26, p.z0 - .3, p.z1 + .3, OAK);
  const sofa = (g, ax0, ax1, az0, az1, back) => {
    span(g, ax0, ax1, y, y + .22, az0, az1, OAK_DARK);
    span(g, ax0 + .03, ax1 - .03, y + .22, y + .48, az0 + .03, az1 - .03, CREAM);
    if (back === 'z0') span(g, ax0, ax1, y + .22, y + .92, az0, az0 + .22, CREAM);
    if (back === 'x0') span(g, ax0, ax0 + .22, y + .22, y + .92, az0, az1, CREAM);
    if (back === 'x1') span(g, ax1 - .22, ax1, y + .22, y + .92, az0, az1, CREAM);
  };
  sofa(k1, p.x0 + .25, p.x1 - .5, p.z0 + .15, p.z0 + .95, 'z0');
  sofa(k1, p.x0 + .25, p.x0 + 1.05, p.z0 + .95, p.z1 - .3, 'x0');
  [[p.x0 + 1, p.z0 + .45], [p.x0 + 2.6, p.z0 + .45], [p.x0 + 3.6, p.z0 + .45], [p.x0 + .55, p.z0 + 1.7]].forEach(([cx, cz]) => box(k1, cx, y + .48, cz, .32, .3, .14, VELVET));
  const fx = p.x0 + 2.5, fz = p.z0 + 2.05;
  span(k1, fx - .9, fx + .9, y, y + .38, fz - .45, fz + .45, '#3a3f3a');
  span(k1, fx - .92, fx + .92, y + .38, y + .44, fz - .47, fz + .47, '#d8d2c2');
  span(k1, fx - .6, fx + .6, y + .44, y + .47, fz - .15, fz + .15, BRASS, { cast: false });
  let flame = new THREE.Mesh(new THREE.BoxGeometry(1.1, .12, .1).translate(0, .06, 0), new THREE.MeshBasicMaterial({ color: '#ffb35a', transparent: true, opacity: .9 }));
  flame.position.set(fx, y + .47, fz); k1.add(flame);
  stringLights(t1, p.x0, p.z1, y + p.h, x0 + .25, z1 - .2, y + railH + .9, 9);
  stringLights(t1, p.x1, p.z1, y + p.h, x1 - .3, z1 - .2, y + railH + .9, 12);
  box(t1, x0 + .25, y, z1 - .2, .06, railH + .95, .06, STEEL); box(t1, x1 - .3, y, z1 - .2, .06, railH + .95, .06, STEEL);
  // Greenery over the pergola (Kevin, 2026-10-19, in place of its LOUNGE sign): leafy clumps along the slats and
  // beams, thicker toward the posts, with vines trailing down the front posts. One instanced mesh, two greens.
  // The diorama's rooftop_pergola_vines.glb takes over once it loads (kVines is the stand-in it hides).
  const kVines = new THREE.Group(); t1.add(kVines);
  const leafGeo = new THREE.IcosahedronGeometry(.17, 0);
  const leafMat = new THREE.MeshLambertMaterial({ color: '#ffffff' });
  const leafSpots = [];
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const top = y + p.h + .26, slats = 13;
  for (let i = 0; i < slats; i++) {
    const sx = p.x0 + .1 + i * (p.x1 - p.x0 - .2) / (slats - 1);
    // Each slat carries a run of clumps that thins out toward the middle of the span.
    for (let z = p.z0 - .25; z <= p.z1 + .25; z += .3) {
      const edge = Math.min(Math.abs(z - p.z0), Math.abs(z - p.z1));
      if (rand() < .35 + edge * .25) continue;
      leafSpots.push([sx + (rand() - .5) * .22, top + rand() * .08, z + (rand() - .5) * .16, .7 + rand() * .7]);
    }
  }
  [p.z0, p.z1].forEach(bz => { for (let x = p.x0 - .05; x <= p.x1 + .05; x += .22) leafSpots.push([x, top - .04 + rand() * .06, bz + (rand() - .5) * .2, .8 + rand() * .5]); });
  // Vines down the two street-side posts and part way down the rear ones, wrapping as they fall.
  [[p.x0, p.z1, 2.3], [p.x1, p.z1, 2.1], [p.x0, p.z0, 1.2], [p.x1, p.z0, 1.4]].forEach(([vx, vz, drop]) => {
    for (let d = 0; d < drop; d += .16) { const a = d * 4.2 + vx; leafSpots.push([vx + Math.cos(a) * .12, y + p.h + .1 - d, vz + Math.sin(a) * .12, .55 + rand() * .35 - d * .1]); }
  });
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, leafSpots.length);
  const leafM = new THREE.Matrix4(), leafQ = new THREE.Quaternion(), leafE = new THREE.Euler(), leafS = new THREE.Vector3(), leafP = new THREE.Vector3(), leafC = new THREE.Color();
  const greens = ['#4f8a3a', '#3f7a33', '#6a9e45', '#2f6a30'];
  leafSpots.forEach(([lx, ly, lz, sc], i) => {
    leafE.set(rand() * 3, rand() * 3, rand() * 3); leafQ.setFromEuler(leafE);
    leafS.set(sc * 1.2, sc * .7 / HEIGHT_SCALE, sc); leafP.set(lx, ly, lz);
    leaves.setMatrixAt(i, leafM.compose(leafP, leafQ, leafS)); leaves.setColorAt(i, leafC.set(greens[i % greens.length]));
  });
  leaves.castShadow = true; leaves.receiveShadow = true; kVines.add(leaves);

  // Smoke: each seated guest breathes out a soft puff now and then that drifts up and fades. A small pool of sprites
  // shared by every guest, four puffs each, so it stays cheap on phones.
  const smokeCanvas = document.createElement('canvas'); smokeCanvas.width = smokeCanvas.height = 64;
  const sc = smokeCanvas.getContext('2d'), grad = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)'); grad.addColorStop(.5, 'rgba(255,255,255,.6)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
  sc.fillStyle = grad; sc.fillRect(0, 0, 64, 64);
  const smokeTexture = new THREE.CanvasTexture(smokeCanvas);
  const SMOKE_PUFFS = 4, SMOKE_PERIOD = 4400, SMOKE_LIFE = 4200;
  const puffs = [];
  const smoke = new THREE.Group(); open.add(smoke);
  function puff(i) {
    while (puffs.length <= i) {
      const m = new THREE.SpriteMaterial({ map: smokeTexture, color: '#e9e4dc', transparent: true, depthWrite: false, opacity: 0 });
      const sprite = new THREE.Sprite(m); sprite.renderOrder = 5; smoke.add(sprite); puffs.push(sprite);
    }
    return puffs[i];
  }

  // Dab bar: a green-tiled bar along the rear right with a cream top, a brass foot rail, three stools, a back bar.
  const b = { x0: x1 - 4.4, x1: x1 - 1.2, z: z0 + 1.5 };
  span(k2, b.x0, b.x1, y, y + 1.05, b.z - .45, b.z, '#25523b');
  span(k2, b.x0 - .06, b.x1 + .06, y + 1.05, y + 1.12, b.z - .55, b.z + .1, '#ece4d2');
  span(k2, b.x0, b.x1, y + .18, y + .22, b.z + .16, b.z + .2, BRASS, { cast: false });
  span(k2, b.x0, b.x1, y, y + 1.9, z0 + .2, z0 + .55, OAK_DARK);
  [.8, 1.35].forEach(h => span(k2, b.x0 + .1, b.x1 - .1, y + h, y + h + .05, z0 + .2, z0 + .7, OAK, { cast: false }));
  for (let x = b.x0 + .5; x < b.x1 - .2; x += .6) [.85, 1.4].forEach((h, k) => box(k2, x + k * .15, y + h + .05, z0 + .48, .14, .24, .14, ['#527e60', '#b28b64', '#75999a', '#d5bd8c'][Math.round(x * 3 + k) & 3]));
  [b.x0 + .6, (b.x0 + b.x1) / 2, b.x1 - .6].forEach(sx => {
    box(k2, sx, y, b.z + .55, .06, .72, .06, BRASS);
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .08, 16).translate(0, .04, 0), material(VELVET));
    seat.position.set(sx, y + .72, b.z + .55); seat.castShadow = true; k2.add(seat);
  });
  const barLamps = [b.x0 + .7, (b.x0 + b.x1) / 2, b.x1 - .7].map(lx => {
    box(k2, lx, y + 1.95, b.z - .25, .02, .6, .02, '#343f33', { cast: false });
    const shade = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 8), glow('#f3d9a6', '#ffb36a'));
    shade.position.set(lx, y + 1.9, b.z - .25); k2.add(shade); lights.push([shade.material, .3, 1.4]);
    return shade;
  });
  box(k2, (b.x0 + b.x1) / 2, y + 1.9, z0 + .2, .02, .7, b.z - z0, '#343f33', { cast: false });
  span(k2, b.x0 - .1, b.x1 + .1, y + 2.55, y + 2.6, z0 + .2, b.z - .2, STEEL, { cast: false });
  void barLamps;

  // Vinyl nights: the DJ booth at the right edge, facing across the deck, with its speakers and a dance floor.
  const d = { x: x1 - .9, z: z1 - 2.2 };
  span(k3, d.x - .35, d.x + .35, y, y + 1, d.z - .8, d.z + .8, '#1d2422');
  span(k3, d.x - .4, d.x + .4, y + 1, y + 1.06, d.z - .85, d.z + .85, BRASS, { cast: false });
  [-.4, .4].forEach(o => { const deckDisc = new THREE.Mesh(new THREE.CylinderGeometry(.22, .22, .03, 20), material('#2e3330')); deckDisc.position.set(d.x, y + 1.08, d.z + o); k3.add(deckDisc); });
  [d.z - 1.05, d.z + 1.05].forEach(sz => { box(k3, d.x + .1, y, sz, .45, 1.35, .45, '#262b29'); const cone = new THREE.Mesh(new THREE.CircleGeometry(.15, 16).rotateY(-Math.PI / 2), material('#4a514d')); cone.position.set(d.x - .13, y + .9, sz); k3.add(cone); });
  const dance = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.2).rotateX(-Math.PI / 2), glow('#4a3a33', '#d06aa0'));
  dance.position.set(d.x - 2.4, y + .012, d.z); dance.receiveShadow = true; k3.add(dance); lights.push([dance.material, .05, .45]);
  stringLights(t3, x1 - .3, z1 - .2, y + railH + .9, x1 - .3, z0 + 1, y + railH + 1.6, 10);
  box(t3, x1 - .3, y, z0 + 1, .06, railH + 1.65, .06, STEEL);

  // Terrace: bistro tables under two forest-and-cream parasols along the front.
  [[x0 + 2.8, z1 - 1.05], [x0 + 5.6, z1 - 1.05]].forEach(([tx, tz]) => {
    const top = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, .05, 20).translate(0, .025, 0), material('#ece4d2'));
    top.position.set(tx, y + .74, tz); top.castShadow = true; k4.add(top);
    box(k4, tx, y, tz, .07, .74, .07, '#2b302d');
    [[-.62, 0], [.62, 0]].forEach(([ox, oz]) => { box(k4, tx + ox, y, tz + oz, .38, .45, .38, OAK); box(k4, tx + ox, y + .45, tz + oz, .4, .05, .4, CREAM); });
    box(k4, tx, y + .79, tz, .05, 1.8, .05, '#e1dbc0');
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(1.25, .45, 8, 1, true).translate(0, -.22, 0), new THREE.MeshLambertMaterial({ color: '#f1e7cc', side: THREE.DoubleSide }));
    canopy.position.set(tx, y + 2.85, tz); canopy.castShadow = true; k4.add(canopy);
    const stripe = new THREE.Mesh(new THREE.ConeGeometry(1.27, .1, 8, 1, true).translate(0, -.42, 0), material('#1f6b47'));
    stripe.position.copy(canopy.position); k4.add(stripe);
  });

  // The four later tiers dress the same deck rather than rearranging it, keeping clear of the guests' standing spots
  // (ROOFTOP_SPOTS in main.js) and the walk from the bridge.
  // Private booths: velvet drapes tied back at the pergola's posts and a brass curtain rod along its front and side.
  const drape = (px, pz, alongX, dir) => {
    const w = .42, h = p.h - .12, o = .1 * dir;
    // The drape hangs from the beam, gathered toward the post, pinched in by its tie-back at mid height.
    const at = (a, b, y0, y1) => alongX ? span(k5, px + o + a * dir, px + o + b * dir, y + y0, y + y1, pz - .06, pz + .06, VELVET) : span(k5, px - .06, px + .06, y + y0, y + y1, pz + o + a * dir, pz + o + b * dir, VELVET);
    at(0, w, h - 1.1, h); at(0, w * .45, .95, h - 1.1); at(0, w * .8, 0, .95);
    alongX ? span(k5, px + o, px + o + .2 * dir, y + 1.05, y + 1.12, pz - .08, pz + .08, BRASS, { cast: false }) : span(k5, px - .08, px + .08, y + 1.05, y + 1.12, pz + o, pz + o + .2 * dir, BRASS, { cast: false });
  };
  drape(p.x0, p.z1, true, 1); drape(p.x1, p.z1, true, -1); drape(p.x1, p.z1, false, -1); drape(p.x1, p.z0, false, 1);
  span(t5, p.x0, p.x1, y + p.h - .1, y + p.h - .05, p.z1 + .06, p.z1 + .1, BRASS, { cast: false });
  span(t5, p.x1 + .06, p.x1 + .1, y + p.h - .1, y + p.h - .05, p.z0, p.z1, BRASS, { cast: false });
  // Tasting bar: a flight of glass jars of the house strains along the bar top, each on its oak board, and a menu
  // board on the back bar.
  for (let k = 0; k < 4; k++) {
    const jx = b.x0 + .5 + k * (b.x1 - b.x0 - 1) / 3, jz = b.z - .22;
    span(k6, jx - .26, jx + .26, y + 1.12, y + 1.15, jz - .13, jz + .13, OAK);
    [-.13, .13].forEach((ox, j) => {
      const jar = new THREE.Mesh(new THREE.CylinderGeometry(.075, .075, .2, 10).translate(0, .1, 0), new THREE.MeshLambertMaterial({ color: '#d7ece4', transparent: true, opacity: .5 }));
      jar.position.set(jx + ox, y + 1.15, jz); k6.add(jar);
      box(k6, jx + ox, y + 1.16, jz, .09, .1, .09, ['#5f8a3c', '#7a9a42', '#4f7a3a', '#8c9a4a'][(k + j) & 3]);
      box(k6, jx + ox, y + 1.35, jz, .16, .03, .16, BRASS, { cast: false });
    });
  }
  const menuX = (b.x0 + b.x1) / 2;
  span(k6, menuX - .75, menuX + .75, y + 1.97, y + 2.47, z0 + .3, z0 + .36, '#22302a');
  span(k6, menuX - .8, menuX + .8, y + 1.94, y + 2.5, z0 + .26, z0 + .3, OAK_DARK);
  for (let k = 0; k < 4; k++) span(k6, menuX - .6, menuX + (k & 1 ? .25 : .5), y + 2.36 - k * .1, y + 2.38 - k * .1, z0 + .36, z0 + .37, CREAM, { cast: false });
  // Chef's table: a long oak table along the front rail between the parasols and the dance floor, laid with plates
  // of infused courses, a cream runner, brass candle lamps and stools on the rail side.
  const c7 = { x0: x0 + 6.9, x1: x0 + 9.1, z: z1 - .85 };
  span(k7, c7.x0, c7.x1, y + .72, y + .78, c7.z - .3, c7.z + .3, OAK);
  [[c7.x0 + .1, -.22], [c7.x0 + .1, .22], [c7.x1 - .1, -.22], [c7.x1 - .1, .22]].forEach(([lx, oz]) => box(k7, lx, y, c7.z + oz, .07, .72, .07, OAK_DARK));
  span(k7, c7.x0 + .1, c7.x1 - .1, y + .78, y + .79, c7.z - .1, c7.z + .1, CREAM, { cast: false });
  for (let k = 0; k < 4; k++) {
    const px2 = c7.x0 + .3 + k * (c7.x1 - c7.x0 - .6) / 3;
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(.12, .1, .02, 14).translate(0, .01, 0), material('#fbf8ee'));
    plate.position.set(px2, y + .79, c7.z - .17 + (k & 1) * .34); k7.add(plate);
    box(k7, px2, y + .8, c7.z - .17 + (k & 1) * .34, .08, .04, .08, '#6f9a45');
    box(k7, px2, y, c7.z + .46, .07, .5, .07, BRASS); box(k7, px2, y + .5, c7.z + .46, .28, .06, .28, VELVET);
  }
  [c7.x0 + .55, c7.x1 - .55].forEach(lx => {
    box(k7, lx, y + .79, c7.z, .05, .22, .05, BRASS, { cast: false });
    const candle = new THREE.Mesh(new THREE.SphereGeometry(.07, 10, 6), glow('#fff0c8', '#ffc56a'));
    candle.position.set(lx, y + 1.05, c7.z); k7.add(candle); lights.push([candle.material, .3, 1.6]);
  });
  // Members' club: brass stanchions and a velvet rope lining the walk in from the bridge, a velvet rug edged in brass
  // under the parasols, and tall brass lanterns at the deck's far corners.
  [lift.z - .55, lift.z + .55].forEach(rz => {
    [x0 + .45, x0 + 1.35].forEach(rx => { box(t8, rx, y, rz, .07, .82, .07, BRASS); box(t8, rx, y + .82, rz, .13, .08, .13, BRASS); });
    span(t8, x0 + .45, x0 + 1.35, y + .66, y + .71, rz - .025, rz + .025, VELVET, { cast: false });
  });
  span(t8, x0 + 1.6, x0 + 6.4, y + .006, y + .014, z1 - 1.95, z1 - .25, BRASS, { cast: false });
  span(t8, x0 + 1.7, x0 + 6.3, y + .008, y + .018, z1 - 1.85, z1 - .35, VELVET, { cast: false });
  [[x1 - .35, z1 - 1.1], [x0 + 6.6, z0 + .35]].forEach(([lx, lz]) => {
    box(k8, lx, y, lz, .26, .1, .26, BRASS); box(k8, lx, y + .1, lz, .06, 1.25, .06, BRASS);
    const lantern = new THREE.Mesh(new THREE.BoxGeometry(.24, .34, .24).translate(0, .17, 0), glow('#fff1cf', '#ffcf7a'));
    lantern.position.set(lx, y + 1.35, lz); lantern.castShadow = false; k8.add(lantern); lights.push([lantern.material, .35, 1.5]);
    box(k8, lx, y + 1.69, lz, .3, .05, .3, BRASS, { cast: false });
  });

  // The bulbs, one instanced mesh per tier so each appears with its tier.
  const bulbGeometry = new THREE.SphereGeometry(.06, 8, 6);
  const bulbMat = glow('#fff1cf', '#ffcf7a'); lights.push([bulbMat, .2, 1.6]);
  const byGroup = new Map();
  bulbs.forEach(([g, ...xyz]) => { if (!byGroup.has(g)) byGroup.set(g, []); byGroup.get(g).push(xyz); });
  const mtx = new THREE.Matrix4(), bulbMeshes = [];
  byGroup.forEach((spots, g) => {
    const mesh = new THREE.InstancedMesh(bulbGeometry, bulbMat, spots.length);
    spots.forEach(([bx2, by2, bz2], i) => mesh.setMatrixAt(i, mtx.makeTranslation(bx2, by2, bz2)));
    g.add(mesh); bulbMeshes.push(mesh);
  });

  // A warm light over the deck after dark.
  const roofLight = new THREE.PointLight('#ffc98a', 0, 14, 1.2);
  roofLight.position.set((x0 + x1) / 2, y + 2.6, (z0 + z1) / 2); world.add(roofLight);


  // The lounge door under the LOUNGE sign (Kevin, 2026-10-19): a real door in the facade's doorway, always there,
  // opening on to a short back hallway that leads to the elevator. Before the lounge is bought it is shut with a
  // STAFF ONLY plaque and the sign is taped COMING SOON; once open it stands open behind the velvet drapes.
  const sh = layout.shell, face = sh.loungeFront, dx = sh.loungeDoor.x, head = sh.loungeHeader, hw2 = .7, thick = .81;
  const lobby = new THREE.Group(); roof.add(lobby);
  const lobbyK = new THREE.Group(); lobby.add(lobbyK);
  span(lobbyK, dx - hw2 - .12, dx - hw2, 0, head + .12, face - .02, face + .1, '#1f4a35');
  span(lobbyK, dx + hw2, dx + hw2 + .12, 0, head + .12, face - .02, face + .1, '#1f4a35');
  span(lobbyK, dx - hw2 - .12, dx + hw2 + .12, head, head + .14, face - .02, face + .1, '#1f4a35');
  // The hallway behind it: reveals through the wall's thickness, a runner on the floor, a back wall and a sconce.
  const back = face - thick - 1.5;
  span(lobbyK, dx - hw2 - .1, dx - hw2, 0, head, back, face - .02, '#26302a', { cast: false });
  span(lobbyK, dx + hw2, dx + hw2 + .1, 0, head, back, face - .02, '#26302a', { cast: false });
  span(lobbyK, dx - hw2, dx + hw2, 0, head, back - .1, back, '#2f3a32', { cast: false });
  span(lobbyK, dx - hw2, dx + hw2, head, head + .05, back, face - .02, '#1d241f', { cast: false });
  span(lobbyK, dx - .38, dx + .38, .004, .014, back, face - .02, VELVET, { cast: false });
  const hallLamp = new THREE.Mesh(new THREE.SphereGeometry(.1, 12, 8), glow('#fff2c8', '#ffd58a'));
  hallLamp.position.set(dx, head - .45, back + .06); lobbyK.add(hallLamp); lights.push([hallLamp.material, .6, 1.2]);
  // The leaf hangs from its left jamb and swings in toward the hallway.
  const hinge = new THREE.Group(); hinge.position.set(dx - hw2 + .02, 0, face + .02); lobbyK.add(hinge);
  const leafW = hw2 * 2 - .04, leafH = head - .03;
  span(hinge, 0, leafW, .01, leafH, -.03, .03, '#2d6146');
  [[.32, .95], [1.15, 1.85]].forEach(([a, b]) => span(hinge, .14, leafW - .14, a, b, .03, .05, '#357052', { cast: false }));
  span(hinge, .08, leafW - .08, .02, .2, .03, .045, BRASS, { cast: false });
  span(hinge, leafW - .2, leafW - .12, .95, 1.1, .03, .1, BRASS, { cast: false });
  const plaqueCanvas = document.createElement('canvas'); plaqueCanvas.width = 256; plaqueCanvas.height = 96;
  const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas); plaqueTexture.colorSpace = THREE.SRGBColorSpace;
  const plaque = new THREE.Mesh(new THREE.PlaneGeometry(.66, .25), new THREE.MeshBasicMaterial({ map: plaqueTexture }));
  plaque.position.set(leafW * .62, 1.5, .056); hinge.add(plaque);
  // COMING SOON tape across the LOUNGE sign beside the doorway (shell.js), two strips crossing at a slant.
  const tapeCanvas = document.createElement('canvas'); tapeCanvas.width = 512; tapeCanvas.height = 64;
  const tapeTexture = new THREE.CanvasTexture(tapeCanvas); tapeTexture.colorSpace = THREE.SRGBColorSpace; tapeTexture.anisotropy = 4;
  const tapeMat = new THREE.MeshBasicMaterial({ map: tapeTexture, transparent: true });
  const signTape = new THREE.Group(); signTape.position.set(dx + 2.1, 2.02, face + .05); lobby.add(signTape);
  [.12, -.1].forEach((tilt, k) => { const strip = new THREE.Mesh(new THREE.PlaneGeometry(2.3, .26), tapeMat); strip.rotation.z = tilt; strip.position.z = k * .006; signTape.add(strip); });
  function paintDoorSigns() {
    const font = '"Fredoka", "Bricolage Grotesque", sans-serif';
    let c = plaqueCanvas.getContext('2d');
    c.fillStyle = '#ece4d2'; c.fillRect(0, 0, 256, 96); c.strokeStyle = BRASS; c.lineWidth = 6; c.strokeRect(3, 3, 250, 90);
    c.fillStyle = '#1f3a2c'; c.font = `600 40px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('STAFF ONLY', 128, 51);
    plaqueTexture.needsUpdate = true;
    c = tapeCanvas.getContext('2d'); c.clearRect(0, 0, 512, 64);
    c.fillStyle = '#e8b13a'; c.fillRect(0, 6, 512, 52);
    c.fillStyle = '#2b2414'; c.font = `600 34px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('COMING SOON  ·  COMING SOON', 256, 33);
    tapeTexture.needsUpdate = true;
  }
  paintDoorSigns();
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', paintDoorSigns);
  let doorAngle = 0, doorLeaf = null, doorStaff = null;
  const shaftGlass = [];
  // The Blender furniture (the diorama's rooftop_*.glb, each origin on its footprint, at the stations' 1.69 map units
  // per metre). Each set swaps in for its code-built stand-in once it loads; the named parts take over the stand-ins'
  // glowing materials so the sign, the fire, the bar lamps and the dance floor still light up at night.
  const vineMats = [];
  const loaded = new Set(), modelled = new Set(), flameGlow = glow('#fff0c8', '#ffc56a');
  lights.push([flameGlow, .3, 1.6]);
  function loadModels(loader, base) {
    const sets = [
      { file: 'rooftop_site.glb', parent: site, hide: kSite, at: [[0, 0]] },
      { file: 'rooftop_speakeasy.glb', parent: t1, hide: k1, at: [[x0 + 3.8, z0 + 1.825]] },
      { file: 'rooftop_pergola_vines.glb', parent: t1, hide: kVines, at: [[x0 + 3.8, z0 + 1.825]] },
      { file: 'rooftop_bar.glb', parent: t2, hide: k2, at: [[(b.x0 + b.x1) / 2, b.z - .225]] },
      { file: 'rooftop_dj_booth.glb', parent: t3, hide: k3, at: [[d.x, d.z]] },
      { file: 'rooftop_parasol_table.glb', parent: t4, hide: k4, at: [[x0 + 2.8, z1 - 1.05], [x0 + 5.6, z1 - 1.05]] },
      { file: 'rooftop_olive.glb', parent: open, hide: kOlive, at: [[x1 - .5, z1 - .5], [x1 - .6, z0 + .6]] },
      // One drape modelled off its post toward +x, turned for each of the four (as drape() above places them).
      { file: 'rooftop_drapes.glb', parent: t5, hide: k5, at: [[p.x0, p.z1, 0], [p.x1, p.z1, Math.PI], [p.x1, p.z1, Math.PI / 2], [p.x1, p.z0, -Math.PI / 2]] },
      { file: 'rooftop_jar_flight.glb', parent: t6, hide: k6, at: [[(b.x0 + b.x1) / 2, b.z - .225]] },
      { file: 'rooftop_chefs_table.glb', parent: t7, hide: k7, at: [[x0 + 8, z1 - .85]] },
      { file: 'rooftop_lantern.glb', parent: t8, hide: k8, at: [[x1 - .35, z1 - 1.1], [x0 + 6.6, z0 + .35]] },
    ];
    sets.forEach(set => modelled.add(set.parent));
    sets.forEach(set => loader.load(base + set.file, gltf => {
      const source = gltf.scene;
      source.traverse(o => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
      const fire = source.getObjectByName('Flame'), floor = source.getObjectByName('DanceFloor');
      // The pergola's LOUNGE sign is gone (Kevin, 2026-10-19); the greenery tops the beam instead.
      source.traverse(o => { if (/^Sign/.test(o.name)) o.visible = false; });
      if (fire) fire.traverse(o => { if (o.isMesh) { o.material = flame.material; o.castShadow = false; } });
      if (floor) floor.traverse(o => { if (o.isMesh) o.material = dance.material; });
      barLamps.forEach((shade, i) => { const lamp = source.getObjectByName('BarLamp' + i); if (lamp) lamp.traverse(o => { if (o.isMesh) { o.material = shade.material; o.castShadow = false; } }); });
      // The candles and lanterns take the stand-ins' glow, so they light up after dark too.
      source.traverse(o => { if (o.isMesh && /^(CandleGlow|LanternGlow)/.test(o.name)) { o.material = flameGlow; o.castShadow = false; } });
      // The vines' leaves darken after dark like the stand-in leaves (update, below).
      source.traverse(o => { const m = o.isMesh && o.material; if (m && /^Vine/.test(m.name) && !vineMats.some(v => v[0] === m)) vineMats.push([m, m.color.clone()]); });
      compactModel(source);
      set.at.forEach(([ax, az, turn], i) => {
        const holder = new THREE.Group();
        if (turn) holder.rotation.y = turn;
        holder.add(i ? source.clone() : source);
        holder.scale.set(1.69, 1.69 / HEIGHT_SCALE, 1.69);
        holder.position.set(ax, y, az);
        set.parent.add(holder);
      });
      if (fire) flame = fire;
      set.hide.visible = false;
      loaded.add(set.parent);
    }, undefined, e => console.warn('3D map: could not load ' + set.file, e)));
    // The festoon bulb (string_bulb.glb): its globe takes over the bulbs' spheres, keeping their glow, and its black
    // socket is instanced at the same spots.
    loader.load(base + 'string_bulb.glb', gltf => {
      const source = gltf.scene; source.updateMatrixWorld(true);
      const unitOf = name => {
        const node = source.getObjectByName(name), parts = [];
        if (!node) return null;
        node.traverse(o => { if (o.isMesh) { const g = o.geometry.clone().applyMatrix4(o.matrixWorld); Object.keys(g.attributes).forEach(a => { if (a !== 'position' && a !== 'normal') g.deleteAttribute(a); }); parts.push(g.index ? g.toNonIndexed() : g); } });
        return mergeGeometries(parts).scale(1.69, 1.69 / HEIGHT_SCALE, 1.69);
      };
      const globe = unitOf('Bulb'), socket = unitOf('Socket');
      if (!globe || !socket) return;
      const rubber = new THREE.MeshLambertMaterial({ color: '#22262a' });
      bulbMeshes.forEach(mesh => {
        mesh.geometry = globe;
        const cap = new THREE.InstancedMesh(socket, rubber, mesh.count);
        cap.instanceMatrix.copy(mesh.instanceMatrix); mesh.parent.add(cap);
      });
    }, undefined, e => console.warn('3D map: could not load string_bulb.glb', e));
    // The elevator, its bridge, the lounge door and the deck planters (the diorama's lounge_*.glb and deck_planter*.glb).
    const place = (parent, source, px, py, pz) => {
      const holder = new THREE.Group(); holder.add(source);
      holder.scale.set(1.69, 1.69 / HEIGHT_SCALE, 1.69); holder.position.set(px, py, pz); parent.add(holder);
      source.traverse(o => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
      compactModel(source);
      return holder;
    };
    const load = (file, done) => loader.load(base + file, gltf => done(gltf.scene), undefined, e => console.warn('3D map: could not load ' + file, e));
    load('lounge_elevator_shaft.glb', source => shafts.forEach((sh, i) => {
      const copy = i ? source.clone() : source;
      copy.traverse(o => { if (o.isMesh && o.material && /Glass/.test(o.material.name)) { o.material = glass; o.castShadow = o.receiveShadow = false; if (!i) shaftGlass.push(o); } });
      place(sh.frame, copy, lift.x, 0, sh.lz); sh.kf.visible = sh.ki.visible = false;
    }));
    load('lounge_elevator_cab.glb', source => shafts.forEach((sh, i) => {
      const copy = i ? source.clone() : source;
      // No handrail across the riders: a bar at hip height reads as cutting through them.
      copy.traverse(o => { if (/^Rail/.test(o.name)) o.visible = false; if (o.name === 'CabLamp') o.traverse(m => { if (m.isMesh) { m.material = sh.cabLamp.material; m.castShadow = false; } }); });
      place(sh.cab, copy, 0, 0, 0); sh.cabK.visible = false;
    }));
    load('lounge_bridge.glb', source => shafts.forEach((sh, i) => {
      const copy = i ? source.clone() : source;
      copy.traverse(o => { if (o.isMesh && o.material && /Glass/.test(o.material.name)) { o.material = glass; o.castShadow = o.receiveShadow = false; } });
      place(sh.inside, copy, (lift.x + lift.w / 2 + x0) / 2, y, sh.lz); sh.kb.visible = false;
    }));
    load('lounge_door.glb', source => {
      const leaf = source.getObjectByName('DoorLeaf'), staff = source.getObjectByName('StaffPlaque'), sconce = source.getObjectByName('Sconce');
      if (!leaf) return;
      if (sconce) sconce.traverse(o => { if (o.isMesh) { o.material = hallLamp.material; o.castShadow = false; } });
      place(lobby, source, dx, 0, face); doorLeaf = leaf; doorStaff = staff; lobbyK.visible = false;
    });
    const plantFiles = ['deck_planter.glb', 'deck_planter_short.glb'];
    let planted = 0;
    plantFiles.forEach((file, i) => load(file, source => {
      const [a, b, c, d] = planters[i]; place(open, source, (a + b) / 2, y, (c + d) / 2);
      if (++planted === plantFiles.length) kPlant.visible = false;
    }));
  }

  // A copy of the deck as the map shows it at `tier`, for the menus' lounge picture (map3d.loungePicture): only what
  // stands on the deck, so the elevator shaft, its bridge and the columns down to the street are left out, and no
  // smoke. Null until every model that tier shows has loaded.
  function pictureCopy(tier, lifts) {
    const shown = Math.min(levels.length, Math.max(1, tier)), saved = [...tiers, open, second, gapFill, smoke];
    if (!levels.slice(0, shown).every(g => !modelled.has(g) || loaded.has(g)) || !loaded.has(open)) return null;
    const was = saved.map(g => g.visible);
    site.visible = false; open.visible = true; smoke.visible = false;
    levels.forEach((g, k) => { g.visible = k < shown; });
    second.visible = !!lifts; gapFill.visible = !lifts;
    const copy = roof.clone();
    saved.forEach((g, k) => { g.visible = was[k]; });
    copy.updateMatrixWorld(true);
    const drop = [], bounds = new THREE.Box3();
    copy.traverse(o => {
      if (o === copy) return;
      if (!o.visible || o.isSprite) { drop.push(o); return; }
      if (!o.isMesh || o.isInstancedMesh) return;
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      bounds.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
      if (bounds.max.y < y - .05 || bounds.min.x < x0 - .2) drop.push(o);
    });
    drop.forEach(o => o.parent && o.parent.remove(o));
    return copy;
  }

  return {
    loadModels,
    pictureCopy,
    update(frame) {
      const tier = frame.loungeOpen ? Math.max(1, frame.loungeTier || 1) : 0, night = frame.night || 0;
      site.visible = !tier; open.visible = !!tier;
      const building = !tier && frame.loungeBuild != null;
      works.visible = building; banner.visible = !tier;
      if (building) {
        strips.forEach((m, k) => { m.visible = k < Math.floor(frame.loungeBuild * strips.length); });
        jib.rotation.y = Math.sin((frame.time || 0) / 5000) * .7;
        beacon.visible = Math.floor((frame.time || 0) / 500) % 2 === 0;
      }
      levels.forEach((g, k) => { g.visible = tier > k; });
      // The cab carries whoever is riding (main.js moves it with them) and waits where it last stopped.
      cab.position.y = frame.liftY || 0;
      if (cab2) { cab2.position.y = frame.liftY2 || 0; second.visible = !!frame.loungeLift; gapFill.visible = !frame.loungeLift; }
      // The door stands open while the lounge is open and shuts (STAFF ONLY, sign taped) while it is a lot.
      doorAngle += ((tier ? 1.75 : 0) - doorAngle) * .15;
      hinge.rotation.y = doorAngle; plaque.visible = !tier; signTape.visible = !tier;
      if (doorLeaf) { doorLeaf.rotation.y = doorAngle; if (doorStaff) doorStaff.visible = !tier; }
      // Before the lounge is bought the first shaft is a bare frame: its glass goes in with the lounge.
      shaftGlass.forEach(o => { o.visible = !!tier; });
      lights.forEach(([m, day, nightGlow]) => { m.emissiveIntensity = day + night * nightGlow; });
      flame.scale.y = .8 + Math.sin((frame.time || 0) / 130) * .2 + Math.sin((frame.time || 0) / 53) * .1;
      flame.visible = tier >= 1;
      leafMat.color.setScalar(1 - night * .45);
      vineMats.forEach(([m, base]) => m.color.copy(base).multiplyScalar(1 - night * .45));
      // Each smoker's puffs run on their own clock (offset by id) so the roof never exhales in unison.
      const smokers = tier ? frame.loungeSmokers || [] : [], now = frame.time || 0;
      let used = 0;
      smokers.forEach(g => {
        for (let k = 0; k < SMOKE_PUFFS; k++) {
          const t = ((now + (g.id * 1777) % SMOKE_PERIOD + k * SMOKE_PERIOD / SMOKE_PUFFS) % SMOKE_PERIOD) / SMOKE_LIFE;
          if (t >= 1) continue;
          const sprite = puff(used++), size = .75 + t * 2.3, drift = Math.sin(t * 3 + g.id + k) * .2;
          sprite.visible = true;
          sprite.position.set(g.x + (g.facing || 0) * .4 + drift + t * .25, y + 1.65 + t * 2, g.z + .1 - t * .15);
          sprite.scale.set(size, size / HEIGHT_SCALE, 1);
          sprite.material.opacity = Math.min(1, t * 6) * Math.pow(1 - t, .8) * .95;
          sprite.material.color.setScalar(.72 - night * .25);
        }
      });
      for (let i = used; i < puffs.length; i++) puffs[i].visible = false;
      roofLight.intensity = tier ? night * 6 : 0;
    }
  };
}
