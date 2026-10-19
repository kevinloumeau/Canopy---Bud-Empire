// The rooftop lounge: a new floor on top of the shop, reached by a glass elevator that climbs from the old lounge
// room behind the curtained doorway. Guests ride up, spend their session on the roof and ride back down.
// The roof grows with the lounge's tiers: Speakeasy is the pergola, its sofas and the fire table; Dab bar adds the
// bar; Vinyl nights the DJ booth; Terrace the parasol tables along the front. Before the lounge is bought the roof
// is a taped-off slab and the shaft a bare steel frame.
// Every position comes from layout.rooftop (ROOFTOP in main.js), which also places the guests' standing spots.
import * as THREE from 'three';

const BRASS = '#d0a54e', OAK = '#b98d5c', OAK_DARK = '#6e4a2c', STEEL = '#1f4a35', CREAM = '#efe4cf', VELVET = '#6b2436';

export function buildRooftop(world, layout, { box, span, material }) {
  const r = layout.rooftop;
  if (!r) return null;
  const roof = new THREE.Group();
  world.add(roof);
  const { x0, x1, z0, z1, y } = r, lift = r.lift;
  const tiers = [new THREE.Group(), new THREE.Group(), new THREE.Group(), new THREE.Group(), new THREE.Group()];
  tiers.forEach(g => roof.add(g));
  const [site, t1, t2, t3, t4] = tiers;
  // Everything a bought lounge has, whatever its tier: deck boards, glass balustrade, elevator glazing and cab.
  const open = new THREE.Group(); roof.add(open);
  const glass = new THREE.MeshStandardMaterial({ color: '#cfe6df', roughness: .1, metalness: 0, transparent: true, opacity: .28, depthWrite: false });
  const glassy = (mesh) => { mesh.material = glass; mesh.castShadow = false; mesh.receiveShadow = false; return mesh; };
  const glow = (colour, emissive) => new THREE.MeshLambertMaterial({ color: colour, emissive, emissiveIntensity: 0 });
  const lights = [];

  // The slab on top of the top floor's glazing, with a cream lip, and the deck boards on it.
  span(roof, x0, x1, y - .3, y, z0, z1, '#e4ddcc');
  span(roof, x0 - .05, x1 + .05, y - .34, y - .22, z0 - .05, z1 + .05, '#e1dbc0', { cast: false });
  // Posts under the slab's open corners and along its front, like the floors below.
  const below = layout.floors[2].y;
  [[x0 + .3, z1 - .3], [0, z1 - .3], [x1 - .3, z1 - .3], [x1 - .3, (z0 + z1) / 2]].forEach(([px, pz]) => box(roof, px, below, pz, .3, y - .3 - below, .3, '#33372f'));
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
  balustrade(true, z0, gap[0], x0, open); balustrade(true, gap[1], z1, x0, open);
  // Before opening: tape round the slab's edge on short posts, a pallet of boards and a covered stack.
  const tape = (ax, az, bx, bz) => {
    const len = Math.hypot(bx - ax, bz - az), m = new THREE.Mesh(new THREE.BoxGeometry(len, .06, .02), material('#e8b13a', { emissive: '#3a2a00' }));
    m.position.set((ax + bx) / 2, y + .75, (az + bz) / 2); m.rotation.y = -Math.atan2(bz - az, bx - ax); site.add(m);
  };
  const corners = [[x0 + .2, z0 + .2], [x1 - .2, z0 + .2], [x1 - .2, z1 - .2], [x0 + .2, z1 - .2]];
  corners.forEach(([cx, cz], k) => { box(site, cx, y, cz, .07, .8, .07, '#d8cfbd'); const [nx, nz] = corners[(k + 1) % 4]; tape(cx, cz, nx, nz); });
  box(site, -2.2, y, -4.6, 1.6, .18, 1.1, '#9a7a52'); box(site, -2.2, y + .18, -4.6, 1.5, .5, 1, '#c9a978');
  box(site, 1.8, y, -5.4, 1.2, .9, 1.2, '#8e9a86');
  box(site, 3.6, y, -2.8, .9, .14, 1.4, '#9a7a52');

  // The elevator: a green steel tower from the ground to a crown above the roof, glazed on every side, its brass cab
  // riding inside. A short bridge crosses from its landing to the deck.
  const hw = lift.w / 2, hd = lift.d / 2, crown = y + 2.9;
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => box(roof, lift.x + sx * (hw - .06), 0, lift.z + sz * (hd - .06), .12, crown, .12, STEEL));
  [0, layout.floors[1].y, layout.floors[2].y, y].forEach(h => span(roof, lift.x - hw, lift.x + hw, h + 2.6, h + 2.72, lift.z - hd, lift.z + hd, STEEL, { cast: false }));
  span(roof, lift.x - hw - .1, lift.x + hw + .1, crown, crown + .5, lift.z - hd - .1, lift.z + hd + .1, '#2c5a44');
  span(roof, lift.x - hw - .16, lift.x + hw + .16, crown + .5, crown + .58, lift.z - hd - .16, lift.z + hd + .16, '#e1dbc0');
  [[false, lift.z + hd], [false, lift.z - hd], [true, lift.x - hw], [true, lift.x + hw]].forEach(([alongZ, at]) => {
    const pane = alongZ ? span(open, at - .01, at + .01, .05, crown, lift.z - hd + .06, lift.z + hd - .06, '#cfe6df') : span(open, lift.x - hw + .06, lift.x + hw - .06, .05, crown, at - .01, at + .01, '#cfe6df');
    glassy(pane);
  });
  const cab = new THREE.Group(); open.add(cab);
  const cw = lift.w - .3, cd = lift.d - .3, ch = 2.35;
  span(cab, -cw / 2, cw / 2, 0, .12, -cd / 2, cd / 2, '#2b302d');
  span(cab, -cw / 2, cw / 2, ch - .14, ch, -cd / 2, cd / 2, BRASS);
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => box(cab, sx * (cw / 2 - .04), .12, sz * (cd / 2 - .04), .08, ch - .26, .08, BRASS));
  span(cab, -cw / 2 + .05, -cw / 2 + .1, .12, ch - .14, -cd / 2 + .1, cd / 2 - .1, OAK_DARK, { cast: false });
  span(cab, -cw / 2, cw / 2, 1, 1.05, -cd / 2, cd / 2, BRASS, { cast: false });
  const cabLamp = new THREE.Mesh(new THREE.BoxGeometry(cw - .3, .04, cd - .3), glow('#fff2c8', '#ffd58a'));
  cabLamp.position.y = ch - .16; cab.add(cabLamp); lights.push([cabLamp.material, .4, 1.2]);
  cab.position.set(lift.x, 0, lift.z);
  // The bridge from the landing to the deck: boards, glass sides with brass rails.
  const bx0 = lift.x + hw, bx1 = x0;
  span(open, bx0, bx1 + .05, y - .26, y, gap[0], gap[1], '#e4ddcc');
  [gap[0], gap[1]].forEach(z => {
    span(open, bx0, bx1, y + railH - .03, y + railH + .03, z - .05, z + .05, BRASS, { cast: false });
    glassy(span(open, bx0, bx1, y + .05, y + railH - .05, z - .01, z + .01, '#cfe6df'));
  });
  // The red runner from the elevator, across the bridge and on to the deck, where it meets the seating.
  span(open, bx0 + .05, x0 + 1.2, y + .006, y + .016, lift.z - .38, lift.z + .38, VELVET, { cast: false });
  span(open, bx0 + .05, x0 + 1.2, y + .004, y + .012, lift.z - .45, lift.z + .45, BRASS, { cast: false });

  // Planters along the left balustrade and in the corners, with soft shrubs; two olive trees in tall pots.
  const clump = new THREE.IcosahedronGeometry(1, 1);
  const bush = (g, bx, by, bz, rr, c) => { const b = new THREE.Mesh(clump, material(c)); b.position.set(bx, by, bz); b.scale.set(rr, rr * .8, rr); b.castShadow = b.receiveShadow = true; g.add(b); };
  [[x0 + .2, x0 + .9, z0 + .2, lift.z - .9], [x0 + .2, x0 + .9, lift.z + .9, z1 - .2]].forEach(([a, b, c, d]) => {
    span(open, a, b, y, y + .55, c, d, '#1f5e40');
    span(open, a - .03, b + .03, y + .55, y + .6, c - .03, d + .03, '#e1dbc0', { cast: false });
    for (let z = c + .35; z < d - .2; z += .55) bush(open, (a + b) / 2, y + .8, z, .32, (Math.round(z * 3) % 2) ? '#6b9250' : '#5f8648');
  });
  [[x1 - .5, z1 - .5], [x1 - .6, z0 + .6]].forEach(([px, pz]) => {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(.34, .26, .7, 20).translate(0, .35, 0), material('#d9cdb4'));
    pot.position.set(px, y, pz); pot.castShadow = pot.receiveShadow = true; open.add(pot);
    box(open, px, y + .7, pz, .1, 1.1, .1, '#7a6142');
    [[0, 2.05, 0, .55, '#8aa66a'], [-.25, 1.8, .2, .4, '#7a9a5c'], [.22, 1.9, -.2, .42, '#9cb57a']].forEach(([ox, oy, oz, rr, c]) => bush(open, px + ox, y + oy, pz + oz, rr, c));
  });

  // String lights: warm bulbs on sagging wires between the balustrade's corner posts and the pergola.
  const bulbs = [];
  const wireMat = new THREE.LineBasicMaterial({ color: '#2b302d' });
  function stringLights(group, ax, az, ay, bx, bz, by, n) {
    const points = [];
    for (let k = 0; k <= n * 2; k++) {
      const t = k / (n * 2), sag = Math.sin(Math.PI * t) * .45, pt = [ax + (bx - ax) * t, ay + (by - ay) * t - sag, az + (bz - az) * t];
      points.push(new THREE.Vector3(...pt));
      if (k % 2 === 0) bulbs.push([group, pt[0], pt[1] - .07, pt[2]]);
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), wireMat));
  }

  // Speakeasy: the pergola over the rear left, an L of cream sofas with velvet cushions, the brass fire table.
  const p = { x0: x0 + 1.4, x1: x0 + 6.2, z0: z0 + .25, z1: z0 + 3.4, h: 2.75 };
  [[p.x0, p.z0], [p.x1, p.z0], [p.x1, p.z1], [p.x0, p.z1]].forEach(([px, pz]) => box(t1, px, y, pz, .14, p.h, .14, STEEL));
  span(t1, p.x0 - .1, p.x1 + .1, y + p.h, y + p.h + .16, p.z0 - .07, p.z0 + .07, STEEL);
  span(t1, p.x0 - .1, p.x1 + .1, y + p.h, y + p.h + .16, p.z1 - .07, p.z1 + .07, STEEL);
  for (let x = p.x0 + .1; x < p.x1; x += .38) span(t1, x - .04, x + .04, y + p.h + .16, y + p.h + .26, p.z0 - .3, p.z1 + .3, OAK);
  const sofa = (g, ax0, ax1, az0, az1, back) => {
    span(g, ax0, ax1, y, y + .22, az0, az1, OAK_DARK);
    span(g, ax0 + .03, ax1 - .03, y + .22, y + .48, az0 + .03, az1 - .03, CREAM);
    if (back === 'z0') span(g, ax0, ax1, y + .22, y + .92, az0, az0 + .22, CREAM);
    if (back === 'x0') span(g, ax0, ax0 + .22, y + .22, y + .92, az0, az1, CREAM);
    if (back === 'x1') span(g, ax1 - .22, ax1, y + .22, y + .92, az0, az1, CREAM);
  };
  sofa(t1, p.x0 + .25, p.x1 - .5, p.z0 + .15, p.z0 + .95, 'z0');
  sofa(t1, p.x0 + .25, p.x0 + 1.05, p.z0 + .95, p.z1 - .3, 'x0');
  [[p.x0 + 1, p.z0 + .45], [p.x0 + 2.6, p.z0 + .45], [p.x0 + 3.6, p.z0 + .45], [p.x0 + .55, p.z0 + 1.7]].forEach(([cx, cz]) => box(t1, cx, y + .48, cz, .32, .3, .14, VELVET));
  const fx = p.x0 + 2.5, fz = p.z0 + 2.05;
  span(t1, fx - .9, fx + .9, y, y + .38, fz - .45, fz + .45, '#3a3f3a');
  span(t1, fx - .92, fx + .92, y + .38, y + .44, fz - .47, fz + .47, '#d8d2c2');
  span(t1, fx - .6, fx + .6, y + .44, y + .47, fz - .15, fz + .15, BRASS, { cast: false });
  const flame = new THREE.Mesh(new THREE.BoxGeometry(1.1, .12, .1).translate(0, .06, 0), new THREE.MeshBasicMaterial({ color: '#ffb35a', transparent: true, opacity: .9 }));
  flame.position.set(fx, y + .47, fz); t1.add(flame);
  stringLights(t1, p.x0, p.z1, y + p.h, x0 + .25, z1 - .2, y + railH + .9, 9);
  stringLights(t1, p.x1, p.z1, y + p.h, x1 - .3, z1 - .2, y + railH + .9, 12);
  box(t1, x0 + .25, y, z1 - .2, .06, railH + .95, .06, STEEL); box(t1, x1 - .3, y, z1 - .2, .06, railH + .95, .06, STEEL);
  // The neon LOUNGE sign on the pergola's front beam, toward the street.
  const signCanvas = document.createElement('canvas'); signCanvas.width = 512; signCanvas.height = 128;
  const c = signCanvas.getContext('2d');
  c.font = '800 80px "Bricolage Grotesque", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.shadowColor = '#ff6fa8'; c.shadowBlur = 20; c.fillStyle = '#ff8fbf'; c.fillText('LOUNGE', 256, 66); c.shadowBlur = 0; c.fillStyle = '#fff4f8'; c.fillText('LOUNGE', 256, 66);
  const signTexture = new THREE.CanvasTexture(signCanvas); signTexture.colorSpace = THREE.SRGBColorSpace;
  const signMat = new THREE.MeshBasicMaterial({ map: signTexture, transparent: true });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.2, .55), signMat);
  sign.position.set((p.x0 + p.x1) / 2, y + p.h + .5, p.z1 + .09); t1.add(sign);
  span(t1, (p.x0 + p.x1) / 2 - 1.1, (p.x0 + p.x1) / 2 + 1.1, y + p.h + .16, y + p.h + .22, p.z1 - .02, p.z1 + .06, '#1a1216', { cast: false });

  // Dab bar: a green-tiled bar along the rear right with a cream top, a brass foot rail, three stools, a back bar.
  const b = { x0: x1 - 4.4, x1: x1 - 1.2, z: z0 + 1.5 };
  span(t2, b.x0, b.x1, y, y + 1.05, b.z - .45, b.z, '#25523b');
  span(t2, b.x0 - .06, b.x1 + .06, y + 1.05, y + 1.12, b.z - .55, b.z + .1, '#ece4d2');
  span(t2, b.x0, b.x1, y + .18, y + .22, b.z + .16, b.z + .2, BRASS, { cast: false });
  span(t2, b.x0, b.x1, y, y + 1.9, z0 + .2, z0 + .55, OAK_DARK);
  [.8, 1.35].forEach(h => span(t2, b.x0 + .1, b.x1 - .1, y + h, y + h + .05, z0 + .2, z0 + .7, OAK, { cast: false }));
  for (let x = b.x0 + .5; x < b.x1 - .2; x += .6) [.85, 1.4].forEach((h, k) => box(t2, x + k * .15, y + h + .05, z0 + .48, .14, .24, .14, ['#527e60', '#b28b64', '#75999a', '#d5bd8c'][Math.round(x * 3 + k) & 3]));
  [b.x0 + .6, (b.x0 + b.x1) / 2, b.x1 - .6].forEach(sx => {
    box(t2, sx, y, b.z + .55, .06, .72, .06, BRASS);
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .08, 16).translate(0, .04, 0), material(VELVET));
    seat.position.set(sx, y + .72, b.z + .55); seat.castShadow = true; t2.add(seat);
  });
  const barLamps = [b.x0 + .7, (b.x0 + b.x1) / 2, b.x1 - .7].map(lx => {
    box(t2, lx, y + 1.95, b.z - .25, .02, .6, .02, '#343f33', { cast: false });
    const shade = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 8), glow('#f3d9a6', '#ffb36a'));
    shade.position.set(lx, y + 1.9, b.z - .25); t2.add(shade); lights.push([shade.material, .3, 1.4]);
    return shade;
  });
  box(t2, (b.x0 + b.x1) / 2, y + 1.9, z0 + .2, .02, .7, b.z - z0, '#343f33', { cast: false });
  span(t2, b.x0 - .1, b.x1 + .1, y + 2.55, y + 2.6, z0 + .2, b.z - .2, STEEL, { cast: false });
  void barLamps;

  // Vinyl nights: the DJ booth at the right edge, facing across the deck, with its speakers and a dance floor.
  const d = { x: x1 - .9, z: z1 - 2.2 };
  span(t3, d.x - .35, d.x + .35, y, y + 1, d.z - .8, d.z + .8, '#1d2422');
  span(t3, d.x - .4, d.x + .4, y + 1, y + 1.06, d.z - .85, d.z + .85, BRASS, { cast: false });
  [-.4, .4].forEach(o => { const deckDisc = new THREE.Mesh(new THREE.CylinderGeometry(.22, .22, .03, 20), material('#2e3330')); deckDisc.position.set(d.x, y + 1.08, d.z + o); t3.add(deckDisc); });
  [d.z - 1.05, d.z + 1.05].forEach(sz => { box(t3, d.x + .1, y, sz, .45, 1.35, .45, '#262b29'); const cone = new THREE.Mesh(new THREE.CircleGeometry(.15, 16).rotateY(-Math.PI / 2), material('#4a514d')); cone.position.set(d.x - .13, y + .9, sz); t3.add(cone); });
  const dance = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.2).rotateX(-Math.PI / 2), glow('#4a3a33', '#d06aa0'));
  dance.position.set(d.x - 2.4, y + .012, d.z); dance.receiveShadow = true; t3.add(dance); lights.push([dance.material, .05, .45]);
  stringLights(t3, x1 - .3, z1 - .2, y + railH + .9, x1 - .3, z0 + 1, y + railH + 1.6, 10);
  box(t3, x1 - .3, y, z0 + 1, .06, railH + 1.65, .06, STEEL);

  // Terrace: bistro tables under two forest-and-cream parasols along the front.
  [[x0 + 2.8, z1 - 1.05], [x0 + 5.6, z1 - 1.05]].forEach(([tx, tz]) => {
    const top = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, .05, 20).translate(0, .025, 0), material('#ece4d2'));
    top.position.set(tx, y + .74, tz); top.castShadow = true; t4.add(top);
    box(t4, tx, y, tz, .07, .74, .07, '#2b302d');
    [[-.62, 0], [.62, 0]].forEach(([ox, oz]) => { box(t4, tx + ox, y, tz + oz, .38, .45, .38, OAK); box(t4, tx + ox, y + .45, tz + oz, .4, .05, .4, CREAM); });
    box(t4, tx, y + .79, tz, .05, 1.8, .05, '#e1dbc0');
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(1.25, .45, 8, 1, true).translate(0, -.22, 0), new THREE.MeshLambertMaterial({ color: '#f1e7cc', side: THREE.DoubleSide }));
    canopy.position.set(tx, y + 2.85, tz); canopy.castShadow = true; t4.add(canopy);
    const stripe = new THREE.Mesh(new THREE.ConeGeometry(1.27, .1, 8, 1, true).translate(0, -.42, 0), material('#1f6b47'));
    stripe.position.copy(canopy.position); t4.add(stripe);
  });

  // The bulbs, one instanced mesh per tier so each appears with its tier.
  const bulbGeometry = new THREE.SphereGeometry(.06, 8, 6);
  const bulbMat = glow('#fff1cf', '#ffcf7a'); lights.push([bulbMat, .2, 1.6]);
  const byGroup = new Map();
  bulbs.forEach(([g, ...xyz]) => { if (!byGroup.has(g)) byGroup.set(g, []); byGroup.get(g).push(xyz); });
  const mtx = new THREE.Matrix4();
  byGroup.forEach((spots, g) => {
    const mesh = new THREE.InstancedMesh(bulbGeometry, bulbMat, spots.length);
    spots.forEach(([bx2, by2, bz2], i) => mesh.setMatrixAt(i, mtx.makeTranslation(bx2, by2, bz2)));
    g.add(mesh);
  });

  // A warm light over the deck after dark.
  const roofLight = new THREE.PointLight('#ffc98a', 0, 14, 1.2);
  roofLight.position.set((x0 + x1) / 2, y + 2.6, (z0 + z1) / 2); world.add(roofLight);

  let cabY = 0, lastTime = null;
  return {
    update(frame) {
      const time = performance.now(), dt = lastTime === null ? 0 : Math.min(.1, Math.max(0, (time - lastTime) / 1000)); lastTime = time;
      const tier = frame.loungeOpen ? Math.max(1, frame.loungeTier || 1) : 0, night = frame.night || 0;
      site.visible = !tier; open.visible = !!tier;
      t1.visible = tier >= 1; t2.visible = tier >= 2; t3.visible = tier >= 3; t4.visible = tier >= 4;
      // The cab eases toward the floor it is called to, and waits there.
      const target = frame.liftTarget === undefined ? cabY : frame.liftTarget * y;
      cabY += (target - cabY) * Math.min(1, dt * 1.6);
      if (Math.abs(target - cabY) < .01) cabY = target;
      cab.position.y = cabY;
      lights.forEach(([m, day, nightGlow]) => { m.emissiveIntensity = day + night * nightGlow; });
      flame.scale.y = .8 + Math.sin((frame.time || 0) / 130) * .2 + Math.sin((frame.time || 0) / 53) * .1;
      flame.visible = tier >= 1;
      signMat.color.setScalar(.75 + night * .25);
      roofLight.intensity = tier ? night * 6 : 0;
    }
  };
}
