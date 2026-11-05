// The branch shops' buildings in the flagship's 3D style (Kevin, 2026-11-05: "the old stores are still mostly the old
// 2d style ... revamp the stores to be more aligned with the style of the main store. keep each one to the theme").
// Until now each branch's building came to the 3D map traced from its 2D drawing (branch-maps.js through branch3d.js):
// flat boxes and painted polygons. Here every branch gets a real building with the flagship's vocabulary: textured
// walls with the tile dado and brass rail, slim forest-green glazing on glass, cream slab edges, brass pendants and
// sconces, and a lit forest-green fascia lettered in Fredoka. Each keeps its own theme in its materials and massing:
// Riverside's cedar loft and glasshouse, Old Town's three-storey brick townhouse with arched windows and a mansard,
// City Center's glass atrium under a curtain-wall tower, Desert Oasis's stucco courtyard block with a roof terrace,
// and Alpine's stone-and-timber lodge under a gable with its conservatory wing.
//
// The drawing still supplies everything round the building (land, river, trees, benches, lamps, people) and the
// stations; branch-maps.js leaves its own building out when the 3D map draws (api.station is set there). Positions
// are the drawing's scene units, so a shop sits where its drawing stood; map3d moves the group onto its district.
//
// Draw calls: the plain solids of a shop merge into one vertex-coloured mesh, glass into one, lit parts into one, and
// each textured wall face is a mesh of its own (a handful a shop).
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const SIGN_FONT = '"Fredoka", "Bricolage Grotesque", sans-serif';
// The flagship's own palette (shell.js): frame green, brass, cream, the slab edge.
const FRAME = '#2c5a44', FRAME_DARK = '#1f4232', BRASS = '#d0a54e', CREAM = '#f1ead6', SLAB = '#e9e4d8', FASCIA = '#23432f';
const GLASS = '#cfe6df';

// ---- Canvas textures, each one tile of `size` world units square ---------------------------------------------------
const textures = {};
function canvasTexture(key, draw, px = 256) {
  if (textures[key]) return textures[key];
  const c = document.createElement('canvas');
  c.width = c.height = px;
  const g = c.getContext('2d');
  draw(g, px);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  return (textures[key] = t);
}
// A seeded wobble so the textures are the same every load.
function rng(seed) { let s = seed >>> 0; return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) + 0x9e3779b9 >>> 0) / 4294967296); }
function shade(hex, f) { const c = new THREE.Color(hex); c.multiplyScalar(f); return '#' + c.getHexString(); }

const WALLS = {
  // Vertical cedar boards with dark reveals (Riverside).
  cedar: { size: 2.4, colour: '#b9804e', draw(g, n) { const r = rng(3), w = n / 7; for (let i = 0; i < 7; i++) { g.fillStyle = shade('#c08a55', .9 + r() * .18); g.fillRect(i * w, 0, w, n); g.fillStyle = '#7a4e2c'; g.fillRect(i * w, 0, 3, n); g.fillStyle = 'rgba(255,240,210,.12)'; g.fillRect(i * w + 4, 0, 2, n); } } },
  // Honey brick in running bond with pale joints (Old Town).
  brick: { size: 2.2, colour: '#c98f62', draw(g, n) { const r = rng(7), rows = 12, cols = 4, h = n / rows, w = n / cols; g.fillStyle = '#e8dcc4'; g.fillRect(0, 0, n, n); for (let y = 0; y < rows; y++) for (let x = -1; x < cols; x++) { g.fillStyle = shade(['#c98f62', '#bd7f55', '#d29c6c', '#b97a52'][Math.floor(r() * 4)], .95 + r() * .1); g.fillRect(x * w + (y % 2) * w / 2 + 2, y * h + 2, w - 4, h - 4); } } },
  // Warm stucco, softly mottled (Desert Oasis).
  stucco: { size: 3, colour: '#e3c79c', draw(g, n) { const r = rng(11); g.fillStyle = '#e3c79c'; g.fillRect(0, 0, n, n); for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(${r() < .5 ? '255,244,220' : '170,128,86'},${.05 + r() * .06})`; const x = r() * n, y = r() * n, s = 6 + r() * 26; g.beginPath(); g.arc(x, y, s, 0, 7); g.fill(); g.beginPath(); g.arc(x - n * Math.sign(x - n / 2), y, s, 0, 7); g.fill(); } } },
  // Coursed fieldstone (Alpine).
  stone: { size: 2.6, colour: '#a6a092', draw(g, n) { const r = rng(5); g.fillStyle = '#6e6a60'; g.fillRect(0, 0, n, n); let y = 0; while (y < n) { const h = 22 + r() * 22; let x = -r() * 40; while (x < n) { const w = 34 + r() * 50; g.fillStyle = shade(['#b3ad9f', '#a29c8d', '#bdb6a6', '#958f82'][Math.floor(r() * 4)], .94 + r() * .1); g.beginPath(); g.roundRect(x + 2, y + 2, w - 4, Math.min(h, n - y) - 4, 6); g.fill(); x += w; } y += h; } } },
  // Pale limestone ashlar (City Center's podium and Old Town's stone bands).
  ashlar: { size: 3, colour: '#d9d3c4', draw(g, n) { g.fillStyle = '#c9c2b2'; g.fillRect(0, 0, n, n); for (let y = 0; y < 4; y++) for (let x = -1; x < 3; x++) { g.fillStyle = (x + y) % 2 ? '#ddd7c8' : '#d4cdbd'; g.fillRect(x * n / 2 + (y % 2) * n / 4 + 2, y * n / 4 + 2, n / 2 - 4, n / 4 - 4); } } },
  // The flagship's curtain wall (City Center's tower): green mullions, glass in two tones and a few lit panes.
  curtain: { size: 4, colour: '#4d6f68', draw(g, n) { const r = rng(9), cols = 4, rows = 3, w = n / cols, h = n / rows; g.fillStyle = FRAME_DARK; g.fillRect(0, 0, n, n); for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const lit = r() < .22; const grad = g.createLinearGradient(x * w, y * h, x * w + w, y * h + h); grad.addColorStop(0, lit ? '#f6e3b4' : '#7fa8a2'); grad.addColorStop(1, lit ? '#e7c98c' : '#4c7570'); g.fillStyle = grad; g.fillRect(x * w + 5, y * h + 5, w - 10, h - 14); } g.fillStyle = '#d6dccb'; for (let y = 0; y < rows; y++) g.fillRect(0, y * h + h - 9, n, 4); } }
};
const FLOORS = {
  // Square terracotta tiles (Desert Oasis).
  terracotta: { size: 2, draw(g, n) { const r = rng(13); g.fillStyle = '#e5d2b2'; g.fillRect(0, 0, n, n); for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = shade('#c98a62', .9 + r() * .16); g.fillRect(x * n / 4 + 3, y * n / 4 + 3, n / 4 - 6, n / 4 - 6); } } },
  // Big pale stone tiles (City Center).
  stoneTile: { size: 3.4, draw(g, n) { g.fillStyle = '#b9bdb3'; g.fillRect(0, 0, n, n); for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) { g.fillStyle = (x + y) % 2 ? '#dfe0d6' : '#d5d7cc'; g.fillRect(x * n / 2 + 2, y * n / 2 + 2, n / 2 - 4, n / 2 - 4); } } },
  // Wide oak planks (Riverside, Alpine).
  planks: { size: 3, draw(g, n) { const r = rng(17), rows = 8, h = n / rows; for (let y = 0; y < rows; y++) { let x = -r() * n; while (x < n) { const w = n * (.35 + r() * .4); g.fillStyle = shade('#c49563', .88 + r() * .2); g.fillRect(x, y * h, w, h); g.fillStyle = '#7e5634'; g.fillRect(x, y * h, 2, h); x += w; } g.fillStyle = '#7e5634'; g.fillRect(0, y * h, n, 2); } } }
};
// The flagship's tile dado (shell.js), a unit wide and its height tall: stack-bond joints and the brass rail on top.
function dadoTexture(tile) {
  return canvasTexture('dado' + tile, (g, n) => {
    g.fillStyle = tile; g.fillRect(0, 0, n, n);
    g.fillStyle = '#cfdcc4';
    for (let x = 0; x < n; x += n / 4) g.fillRect(x, 12, 3, n);
    g.fillRect(0, n * .55, n, 3);
    g.fillStyle = '#dcc48e'; g.fillRect(0, 0, n, 11);
  });
}

// ---- The builder ----------------------------------------------------------------------------------------------------
export function buildBranchShop(world, index, { hazed, model }) {
  const group = new THREE.Group();
  group.visible = false;
  world.add(group);
  const solids = [], glass = [], lit = [];
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
  const unitBox = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
  function push(list, geometry, colour) {
    const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    col.set(colour);
    const n = g.attributes.position.count, c = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b; }
    g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    list.push(g);
    return g;
  }
  // A box by its extents.
  function span(x0, x1, y0, y1, z0, z1, colour, list = solids) {
    const g = push(list, unitBox, colour);
    g.applyMatrix4(m4.compose(v.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), q.identity(), s.set(Math.max(.005, x1 - x0), Math.max(.005, y1 - y0), Math.max(.005, z1 - z0))));
  }
  function place(geometry, colour, x, y, z, { ry = 0, rx = 0, list = solids, sx = 1, sy = 1, sz = 1 } = {}) {
    const g = push(list, geometry, colour);
    g.applyMatrix4(m4.compose(v.set(x, y, z), q.setFromEuler(new THREE.Euler(rx, ry, 0)), s.set(sx, sy, sz)));
  }
  const cyl = new THREE.CylinderGeometry(.5, .5, 1, 10, 1), cone = new THREE.ConeGeometry(.5, 1, 8, 1), ball = new THREE.IcosahedronGeometry(.5, 1);
  // A post (round) from y0 to y1.
  function post(x, z, y0, y1, r = .09, colour = FRAME) { place(cyl, colour, x, (y0 + y1) / 2, z, { sx: r * 2, sz: r * 2, sy: y1 - y0 }); }

  // A wall face with its texture: along x facing +z (at z), or along z facing +x (at x). The solid behind it carries
  // the wall's thickness in the texture's mean colour; the face sits just proud of it.
  const faces = [];
  function face(kind, alongZ, a0, a1, at, y0, y1, { offset = 0, flip = false } = {}) {
    const spec = WALLS[kind], t = canvasTexture(kind, spec.draw).clone();
    t.needsUpdate = true;
    t.repeat.set((a1 - a0) / spec.size, (y1 - y0) / spec.size);
    t.offset.set(a0 / spec.size + offset, y0 / spec.size);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(a1 - a0, y1 - y0), hazed('#ffffff', { map: t }));
    mesh.receiveShadow = true;
    if (alongZ) { mesh.rotation.y = flip ? -Math.PI / 2 : Math.PI / 2; mesh.position.set(at + (flip ? -.006 : .006), (y0 + y1) / 2, (a0 + a1) / 2); }
    else { if (flip) mesh.rotation.y = Math.PI; mesh.position.set((a0 + a1) / 2, (y0 + y1) / 2, at + (flip ? -.006 : .006)); }
    group.add(mesh); faces.push(mesh);
    return mesh;
  }
  function wall(kind, alongZ, a0, a1, at, y0, y1, thick = .3) {
    const c = WALLS[kind].colour;
    if (alongZ) span(at - thick, at, y0, y1, a0, a1, c); else span(a0, a1, y0, y1, at - thick, at, c);
    face(kind, alongZ, a0, a1, at, y0, y1);
  }
  // The flagship's tile dado and brass rail along the foot of a wall face.
  function dado(alongZ, a0, a1, at, y0 = 0, h = 1.15, tile = '#7fa38a') {
    const t = dadoTexture(tile).clone(); t.needsUpdate = true; t.repeat.set((a1 - a0) / .9, 1);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(a1 - a0, h), hazed('#ffffff', { map: t }));
    mesh.receiveShadow = true;
    if (alongZ) { mesh.rotation.y = Math.PI / 2; mesh.position.set(at + .012, y0 + h / 2, (a0 + a1) / 2); }
    else mesh.position.set((a0 + a1) / 2, y0 + h / 2, at + .012);
    group.add(mesh);
  }
  // A floor slab with its top textured (planks, tiles) or plain.
  function floor(x0, x1, z0, z1, y = 0, kind = 'planks', thick = .25) {
    const spec = FLOORS[kind], t = canvasTexture('floor-' + kind, spec.draw).clone();
    t.needsUpdate = true; t.repeat.set((x1 - x0) / spec.size, (z1 - z0) / spec.size);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(-Math.PI / 2), hazed('#ffffff', { map: t }));
    top.position.set((x0 + x1) / 2, y + .004, (z0 + z1) / 2); top.receiveShadow = true;
    group.add(top);
    span(x0, x1, y - thick, y, z0, z1, '#b89c78');
  }
  // An upper slab: cream edge band on the open sides, the underside in oak.
  function slab(x0, x1, z0, z1, y, kind = 'planks', { edge = SLAB } = {}) {
    floor(x0, x1, z0, z1, y, kind, .32);
    span(x0 - .02, x1 + .02, y - .32, y - .02, z1 - .02, z1 + .03, edge);
  }
  // Slim forest-green glazing: plinth, a mullion every `bay`, a transom and head rail, glass between.
  function glazing(alongZ, a0, a1, at, y0, y1, { bay = 1.4, plinth = .25, transom = true } = {}) {
    const n = Math.max(1, Math.round((a1 - a0) / bay)), step = (a1 - a0) / n;
    const bar = (p0, p1, b0, b1, d = .07) => alongZ ? span(at - d, at + d, b0, b1, p0, p1, FRAME) : span(p0, p1, b0, b1, at - d, at + d, FRAME);
    if (plinth) bar(a0, a1, y0, y0 + plinth, .12);
    for (let k = 0; k <= n; k++) { const p = a0 + k * step; bar(p - .035, p + .035, y0 + plinth, y1); }
    if (transom && y1 - y0 > 2.4) bar(a0, a1, y1 - .9, y1 - .84);
    bar(a0, a1, y1 - .08, y1);
    if (alongZ) span(at - .015, at + .015, y0 + plinth, y1 - .08, a0, a1, GLASS, glass); else span(a0, a1, y0 + plinth, y1 - .08, at - .015, at + .015, GLASS, glass);
  }
  // A glass balustrade with a green top rail and posts.
  function balustrade(alongZ, a0, a1, at, y, h = 1) {
    const n = Math.max(1, Math.round((a1 - a0) / 1.6)), step = (a1 - a0) / n;
    for (let k = 0; k <= n; k++) { const p = a0 + k * step; alongZ ? span(at - .04, at + .04, y, y + h, p - .04, p + .04, FRAME) : span(p - .04, p + .04, y, y + h, at - .04, at + .04, FRAME); }
    alongZ ? span(at - .06, at + .06, y + h - .07, y + h, a0, a1, FRAME) : span(a0, a1, y + h - .07, y + h, at - .06, at + .06, FRAME);
    alongZ ? span(at - .012, at + .012, y + .08, y + h - .07, a0, a1, GLASS, glass) : span(a0, a1, y + .08, y + h - .07, at - .012, at + .012, GLASS, glass);
  }
  // A wrought-iron rail (Old Town): thin black bars under a rail.
  function ironRail(alongZ, a0, a1, at, y, h = 1) {
    for (let p = a0; p <= a1 + 1e-3; p += .28) alongZ ? span(at - .02, at + .02, y, y + h, p - .02, p + .02, '#22261f') : span(p - .02, p + .02, y, y + h, at - .02, at + .02, '#22261f');
    alongZ ? span(at - .05, at + .05, y + h - .06, y + h, a0, a1, '#22261f') : span(a0, a1, y + h - .06, y + h, at - .05, at + .05, '#22261f');
    alongZ ? span(at - .03, at + .03, y + .1, y + .14, a0, a1, '#22261f') : span(a0, a1, y + .1, y + .14, at - .03, at + .03, '#22261f');
  }
  // A forest-green column with brass collars at foot and head.
  function column(x, z, y0, y1) {
    span(x - .13, x + .13, y0, y1, z - .13, z + .13, FRAME);
    span(x - .17, x + .17, y0, y0 + .18, z - .17, z + .17, BRASS);
    span(x - .17, x + .17, y1 - .14, y1, z - .17, z + .17, BRASS);
  }
  // A brass pendant: cord, cap and a glowing shade.
  function pendant(x, z, y, drop = .9) {
    span(x - .012, x + .012, y - drop, y, z - .012, z + .012, '#3a3a30');
    place(cone, BRASS, x, y - drop - .12, z, { sx: .5, sz: .5, sy: .28 });
    place(ball, '#ffe7b0', x, y - drop - .28, z, { sx: .22, sy: .18, sz: .22, list: lit });
  }
  // A wall sconce on a face toward +z.
  function sconce(x, z, y) {
    span(x - .1, x + .1, y - .2, y + .2, z, z + .06, BRASS);
    place(ball, '#ffe7b0', x, y + .05, z + .2, { sx: .26, sy: .3, sz: .26, list: lit });
  }
  // A window on a face toward +z (or +x): green frame, glass, a cross of glazing bars, a stone sill; arched heads
  // take a half-round light. Lit warm after dark (the window material's glow).
  const panes = [];
  function window(alongZ, a, at, y0, w, h, { arch = false, sill = CREAM, surround = null, bars = true } = {}) {
    const g = new THREE.Shape(), r = w / 2, hs = arch ? h - r : h;
    g.moveTo(-r, 0); g.lineTo(r, 0); g.lineTo(r, hs);
    if (arch) g.absarc(0, hs, r, 0, Math.PI, false); else g.lineTo(-r, hs);
    g.lineTo(-r, 0);
    const frame = new THREE.Shape(), fr = r + .12, fhs = hs;
    frame.moveTo(-fr, -.06); frame.lineTo(fr, -.06); frame.lineTo(fr, fhs);
    if (arch) frame.absarc(0, fhs, fr, 0, Math.PI, false); else { frame.lineTo(fr, fhs + .12); frame.lineTo(-fr, fhs + .12); }
    frame.lineTo(-fr, -.06);
    frame.holes.push(g);
    const rot = alongZ ? Math.PI / 2 : 0;
    const at3 = (d, u, y) => alongZ ? [at + d, y, a - u] : [a + u, y, at + d];
    if (surround) { const sur = new THREE.Shape(), sr = fr + .2; sur.moveTo(-sr, -.12); sur.lineTo(sr, -.12); sur.lineTo(sr, fhs); if (arch) sur.absarc(0, fhs, sr, 0, Math.PI, false); else { sur.lineTo(sr, fhs + .32); sur.lineTo(-sr, fhs + .32); } sur.lineTo(-sr, -.12); sur.holes.push(frame.clone()); place(new THREE.ExtrudeGeometry(sur, { depth: .05, bevelEnabled: false, curveSegments: 8 }), surround, ...at3(.0, 0, y0), { ry: rot }); }
    place(new THREE.ExtrudeGeometry(frame, { depth: .1, bevelEnabled: false, curveSegments: 8 }), FRAME, ...at3(0, 0, y0), { ry: rot });
    const pane = new THREE.ShapeGeometry(g, 8);
    pane.applyMatrix4(new THREE.Matrix4().makeRotationY(rot));
    pane.translate(...at3(.03, 0, y0));
    panes.push(pane);
    if (bars) {
      const t = .035;
      if (alongZ) { span(at + .02, at + .08, y0, y0 + h - .05, a - t, a + t, FRAME); span(at + .02, at + .08, y0 + hs * .55 - t, y0 + hs * .55 + t, a - r, a + r, FRAME); }
      else { span(a - t, a + t, y0, y0 + h - .05, at + .02, at + .08, FRAME); span(a - r, a + r, y0 + hs * .55 - t, y0 + hs * .55 + t, at + .02, at + .08, FRAME); }
    }
    if (sill) alongZ ? span(at, at + .22, y0 - .14, y0, a - r - .2, a + r + .2, sill) : span(a - r - .2, a + r + .2, y0 - .14, y0, at, at + .22, sill);
  }
  // A plant: pot and a low-poly crown, for planters, the glasshouse benches and the terraces.
  function plant(x, y, z, size = .6, pot = '#b5734f', green = '#5f8a57') {
    place(cyl, pot, x, y + size * .3, z, { sx: size * .7, sz: size * .7, sy: size * .6 });
    place(ball, green, x, y + size * .9, z, { sx: size * 1.05, sy: size * .9, sz: size * 1.05 });
    place(ball, shade(green, 1.18), x + size * .14, y + size * 1.15, z + size * .1, { sx: size * .6, sy: size * .55, sz: size * .6 });
  }
  // A long planter box of shrubs.
  function planterBox(x0, x1, z, y, colour = '#3f5a44') {
    span(x0, x1, y, y + .45, z - .3, z + .3, colour);
    span(x0 - .04, x1 + .04, y + .45, y + .5, z - .34, z + .34, BRASS);
    for (let x = x0 + .35; x < x1 - .2; x += .55) place(ball, ['#5f8a57', '#6f9a60', '#557d4f'][Math.round(x * 3) % 3 + (Math.round(x * 3) % 3 < 0 ? 3 : 0)], x, y + .7, z, { sx: .7, sy: .55, sz: .6 });
  }
  // A grow bench under an LED bar, as the flagship's glasshouse dressing.
  function growBench(x0, x1, z, y) {
    span(x0, x1, y + .7, y + .78, z - .35, z + .35, '#7a6a52');
    [x0 + .1, x1 - .1].forEach(x => span(x - .05, x + .05, y, y + .7, z - .3, z + .3, FRAME));
    for (let x = x0 + .3; x < x1 - .1; x += .5) plant(x, y + .78, z, .38, '#8a6a4c', '#6c9d5c');
    span(x0 + .1, x1 - .1, y + 2, y + 2.06, z - .25, z + .25, '#e9f1e3', lit);
  }
  // A glasshouse: green frame, glass walls on the open sides, a ridged glass roof, two grow benches inside.
  function glasshouse(x0, x1, z0, z1, y, h = 2.5, ridge = 1.1) {
    span(x0, x1, y, y + .15, z0, z1, '#b9bba8');
    glazing(false, x0, x1, z1, y + .15, y + h, { bay: 1.15, plinth: .2 });
    glazing(true, z0, z1, x1, y + .15, y + h, { bay: 1.15, plinth: .2 });
    glazing(true, z0, z1, x0, y + .15, y + h, { bay: 1.15, plinth: .2 });
    // Ridge along x down the middle, roof panes either side.
    const zm = (z0 + z1) / 2, top = y + h, len = Math.hypot((z1 - z0) / 2, ridge), ang = Math.atan2(ridge, (z1 - z0) / 2);
    [[z1, 1], [z0, -1]].forEach(([ze, sgn]) => {
      const g = new THREE.BoxGeometry(x1 - x0, .03, len);
      place(g, GLASS, (x0 + x1) / 2, top + ridge / 2, (ze + zm) / 2, { rx: sgn * ang, list: glass });
      for (let x = x0; x <= x1 + 1e-3; x += (x1 - x0) / Math.max(2, Math.round((x1 - x0) / 1.15))) place(new THREE.BoxGeometry(.07, .07, len), FRAME, x, top + ridge / 2, (ze + zm) / 2, { rx: sgn * ang });
    });
    span(x0, x1, top + ridge - .05, top + ridge + .05, zm - .06, zm + .06, FRAME);
    // Gable ends.
    [x0, x1].forEach(x => { const tri = new THREE.Shape([new THREE.Vector2(-z0, 0), new THREE.Vector2(-z1, 0), new THREE.Vector2(-zm, ridge)]); const tg = new THREE.ShapeGeometry(tri); tg.rotateY(Math.PI / 2); tg.translate(x, top, 0); push(glass, tg, GLASS); });
    growBench(x0 + .4, x1 - .4, z0 + 1.1, y + .15);
    growBench(x0 + .4, x1 - .4, z1 - 1.2, y + .15);
  }
  // A pitched roof along x (ridge at zr) from eaves y0 to ridge y1, over z0..z1, with overhang.
  function gableRoof(x0, x1, z0, z1, y0, y1, colour, { over = .45, ridgeColour = null } = {}) {
    const zr = (z0 + z1) / 2, run = (z1 - z0) / 2 + over, rise = (y1 - y0) * (run / ((z1 - z0) / 2)), len = Math.hypot(run, rise), ang = Math.atan2(rise, run);
    const yMid = y1 - rise / 2;
    [[1, z1], [-1, z0]].forEach(([sgn]) => place(new THREE.BoxGeometry(x1 - x0 + over * 2, .22, len), colour, (x0 + x1) / 2, yMid, zr + sgn * run / 2, { rx: sgn * ang }));
    span(x0 - over, x1 + over, y1 - .05, y1 + .14, zr - .14, zr + .14, ridgeColour || shade(colour, .8));
    // Standing seams on the front slope.
    for (let x = x0 - over + .5; x < x1 + over; x += .7) place(new THREE.BoxGeometry(.05, .06, len), shade(colour, 1.25), x, yMid + .12, zr + run / 2, { rx: ang });
  }
  // A gable end wall (triangle) at x, in a wall texture.
  function gableEnd(kind, x, z0, z1, y0, y1) {
    const zr = (z0 + z1) / 2, tri = new THREE.Shape([new THREE.Vector2(-z1, y0), new THREE.Vector2(-z0, y0), new THREE.Vector2(-zr, y1)]);
    const g = new THREE.ShapeGeometry(tri), spec = WALLS[kind], uv = g.attributes.uv, pos = g.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / spec.size, pos.getY(i) / spec.size);
    g.rotateY(Math.PI / 2); g.translate(x + .006, 0, 0);
    const mesh = new THREE.Mesh(g, hazed('#ffffff', { map: canvasTexture(kind, spec.draw) }));
    mesh.receiveShadow = true; group.add(mesh);
    const back = new THREE.ExtrudeGeometry(tri, { depth: .3, bevelEnabled: false });
    back.rotateY(Math.PI / 2); back.translate(x - .3, 0, 0);
    push(solids, back, spec.colour);
  }

  // The fascia: a forest-green board with a brass edge, the branch's name in cream Fredoka over DISPENSARY in brass,
  // and the leaf mark; painted on a canvas, lit so it reads at night as the flagship's sign does.
  function fascia(name, x, y, z, w, h = 1.15, { alongZ = false, sub = 'DISPENSARY' } = {}) {
    const px = 128, c = document.createElement('canvas');
    c.width = Math.round(w * px); c.height = Math.round(h * px);
    const g = c.getContext('2d'), texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4;
    const paint = () => {
      const W = c.width, H = c.height;
      g.fillStyle = FASCIA; g.fillRect(0, 0, W, H);
      g.strokeStyle = BRASS; g.lineWidth = H * .06; g.strokeRect(g.lineWidth / 2, g.lineWidth / 2, W - g.lineWidth, H - g.lineWidth);
      // The leaf mark, a gap, then the name over DISPENSARY, centred as one group.
      const mark = H * .52, gap = H * .22;
      let size = H * .44;
      g.font = `600 ${size}px ${SIGN_FONT}`;
      while (g.measureText(name).width > W - mark - gap - H * .5 && size > 8) { size *= .94; g.font = `600 ${size}px ${SIGN_FONT}`; }
      const tw = g.measureText(name).width, x0 = (W - (mark + gap + tw)) / 2, tx = x0 + mark + gap;
      g.fillStyle = '#f3e7cd'; g.textAlign = 'left'; g.textBaseline = 'middle';
      g.fillText(name, tx, H * (sub ? .43 : .52));
      if (sub) {
        let sz = H * .17; g.font = `600 ${sz}px ${SIGN_FONT}`;
        const spaced = sub.split('').join(String.fromCharCode(8202));
        while (g.measureText(spaced).width > tw && sz > 6) { sz *= .94; g.font = `600 ${sz}px ${SIGN_FONT}`; }
        g.fillStyle = BRASS; g.textAlign = 'center'; g.fillText(spaced, tx + tw / 2, H * .75);
      }
      // A five-leaf fan.
      const lx = x0 + mark / 2, ly = H * .6;
      g.fillStyle = BRASS;
      for (let k = -2; k <= 2; k++) { g.save(); g.translate(lx, ly); g.rotate(k * .5); g.beginPath(); g.ellipse(0, -mark * .3, mark * .1, mark * .3, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
      texture.needsUpdate = true;
    };
    paint();
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', paint);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: texture }));
    if (alongZ) { mesh.rotation.y = Math.PI / 2; mesh.position.set(x + .07, y, z); span(x - .06, x + .06, y - h / 2, y + h / 2, z - w / 2, z + w / 2, FASCIA); }
    else { mesh.position.set(x, y, z + .07); span(x - w / 2, x + w / 2, y - h / 2, y + h / 2, z - .06, z + .06, FASCIA); }
    group.add(mesh);
    return mesh;
  }
  // A menu board on a face toward +z: dark green with the product lines in cream.
  function menuBoard(x, y, z, w, h, lines) {
    const c = document.createElement('canvas'), px = 110;
    c.width = Math.round(w * px); c.height = Math.round(h * px);
    const g = c.getContext('2d'), texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    const paint = () => {
      g.fillStyle = '#20382b'; g.fillRect(0, 0, c.width, c.height);
      g.strokeStyle = BRASS; g.lineWidth = 8; g.strokeRect(4, 4, c.width - 8, c.height - 8);
      g.fillStyle = '#efe4c8'; g.textAlign = 'center'; g.textBaseline = 'middle';
      const step = c.height / (lines.length + 1);
      lines.forEach((t, i) => {
        let size = step * .55; g.font = `600 ${size}px ${SIGN_FONT}`;
        while (g.measureText(t).width > c.width * .84 && size > 6) { size *= .94; g.font = `600 ${size}px ${SIGN_FONT}`; }
        g.fillText(t, c.width / 2, step * (i + 1));
      });
      texture.needsUpdate = true;
    };
    paint();
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', paint);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), hazed('#ffffff', { map: texture }));
    mesh.position.set(x, y, z + .04); group.add(mesh);
    span(x - w / 2 - .05, x + w / 2 + .05, y - h / 2 - .05, y + h / 2 + .05, z - .02, z + .03, BRASS);
  }
  // A Blender prop at a spot (the flagship's own planters, olives, benches).
  const prop = (file, x, y, z, ry = 0, scale = 1) => model && model(file, x, y, z, (scene, holder) => { holder.rotation.y = ry; if (scale !== 1) holder.scale.multiplyScalar(scale); }, group);
  // A sofa (box seat, back and arms) facing +z.
  function sofa(x, z, y, w, colour, face = 1) {
    span(x - w / 2, x + w / 2, y, y + .42, z - .4, z + .4, colour);
    span(x - w / 2, x + w / 2, y + .42, y + .95, z - face * .4 - .12, z - face * .4 + .12, shade(colour, .85));
    [-1, 1].forEach(sd => span(x + sd * w / 2 - .12, x + sd * w / 2 + .12, y + .42, y + .7, z - .4, z + .4, shade(colour, .85)));
  }
  function table(x, z, y, r = .5) {
    place(cyl, '#4b3a2c', x, y + .35, z, { sx: .1, sz: .1, sy: .7 });
    place(cyl, '#c49a62', x, y + .72, z, { sx: r * 2, sz: r * 2, sy: .06 });
  }
  // String lights between two points: a cord and glowing bulbs.
  function festoon(x0, z0, x1, z1, y, sag = .35, n = 8) {
    const at = t => new THREE.Vector3(x0 + (x1 - x0) * t, y - Math.sin(t * Math.PI) * sag, z0 + (z1 - z0) * t), up = new THREE.Vector3(0, 1, 0);
    for (let k = 0; k <= n; k++) {
      const a = at(k / n);
      if (k < n) {
        const b = at((k + 1) / n), d = b.clone().sub(a), len = d.length();
        const g = push(solids, cyl, '#3a3a30');
        g.applyMatrix4(m4.compose(a.clone().add(b).multiplyScalar(.5), q.setFromUnitVectors(up, d.normalize()), s.set(.025, len, .025)));
      }
      place(ball, '#ffe7b4', a.x, a.y - .1, a.z, { sx: .12, sy: .15, sz: .12, list: lit });
    }
  }

  const ctx = { span, place, post, wall, face, dado, floor, slab, glazing, balustrade, ironRail, column, pendant, sconce, window, plant, planterBox, growBench, glasshouse, gableRoof, gableEnd, fascia, menuBoard, prop, sofa, table, festoon, cyl, cone, ball, glassList: glass, litList: lit };
  const bounds = (SHOPS[index] || (() => null))(ctx);

  // Merge each kind into one mesh.
  const merge = (list, mat, cast) => {
    if (!list.length) return null;
    const mesh = new THREE.Mesh(mergeGeometries(list, false), mat);
    mesh.castShadow = cast; mesh.receiveShadow = true;
    group.add(mesh);
    list.forEach(g => g.dispose());
    return mesh;
  };
  merge(solids, hazed('#ffffff', { vertexColors: true }), true);
  merge(glass, new THREE.MeshStandardMaterial({ color: '#ffffff', vertexColors: true, roughness: .1, metalness: 0, transparent: true, opacity: .28, depthWrite: false, side: THREE.DoubleSide }), false);
  merge(lit, new THREE.MeshBasicMaterial({ color: '#ffffff', vertexColors: true }), false);
  // Window glass: dark teal by day, warm lamplight after dark.
  const windowMat = new THREE.MeshLambertMaterial({ color: '#3f5f5a', emissive: '#000000', side: THREE.DoubleSide });
  if (panes.length) { const w = new THREE.Mesh(mergeGeometries(panes.map(p => p.index ? p.toNonIndexed() : p), false), windowMat); w.receiveShadow = true; group.add(w); }
  unitBox.dispose();
  let lastNight = null;
  group.userData.bounds = bounds;
  group.userData.night = night => {
    if (night === lastNight) return;
    lastNight = night;
    windowMat.emissive.set(night ? '#c79a55' : '#000000');
    windowMat.color.set(night ? '#6e5a3a' : '#3f5f5a');
  };
  return group;
}

// ---- The five shops -------------------------------------------------------------------------------------------------
// Each returns its building's footprint (scene units), which the build site's scaffold wraps.
const SHOPS = [
  // Riverside: a cedar riverwalk pavilion. A timber loft over the rear half carries a lounge and, at the sunny end, a
  // glasshouse nursery; a flat cedar roof over the loft's back carries the name. The front stays open to the boardwalk.
  k => {
    const X0 = -6.5, X1 = 10.5, Z0 = -8.25, Z1 = 5.4, LOFT = 4.8, LZ = -2.6;
    k.floor(X0, X1, Z0, Z1, 0, 'planks');
    // A low forest-green kerb along the open front and right edges, as the flagship's.
    k.span(X0, X1, -.25, .06, Z1 - .08, Z1 + .02, '#2c5a44'); k.span(X1 - .08, X1 + .02, -.25, .06, Z0, Z1, '#2c5a44');
    // Cedar rear and left walls, two storeys, the flagship's tile dado at the foot (sage tile here).
    k.wall('cedar', false, X0, X1, Z0 + .3, 0, 9.3);
    k.dado(false, X0, X1, Z0 + .3, 0, 1.15, '#8fae95');
    k.wall('cedar', true, Z0, LZ, X0 + .25, 0, 9.3, .25);
    k.dado(true, Z0 + .3, LZ, X0 + .25, 0, 1.15, '#8fae95');
    // Ground floor: three tall windows behind the line and a menu board between the first two.
    [-2.6, 2.9, 7.6].forEach(x => k.window(false, x, Z0 + .3, 1.6, 2.2, 2.4));
    k.menuBoard(.2, 2.9, Z0 + .3, 1.6, 1.9, ['FLOWER', 'PRE-ROLLS', 'EDIBLES', 'WELLNESS']);
    [-5.2, 5.2, 9.6].forEach(x => k.sconce(x, Z0 + .3, 3.55));
    // The loft: slab, glass balustrade along its front and right end, green columns under its edge.
    k.slab(X0, X1, Z0, LZ, LOFT);
    k.balustrade(false, X0, X1, LZ - .05, LOFT);
    k.balustrade(true, Z0 + .3, LZ, X1 - .05, LOFT);
    [-3.3, 3.1, 10.3].forEach(x => k.column(x, LZ - .2, 0, LOFT - .32));
    [-4.8, -1.6, 1.5, 4.6].forEach(x => k.pendant(x, LZ - 1.4, LOFT - .32, .8));
    // Loft windows: a band of three over the lounge.
    [-4.4, -.6, 3.2].forEach(x => k.window(false, x, Z0 + .3, LOFT + .9, 2, 2.1));
    // Upstairs lounge on the left: two sofas, a low table, planters at the rail; the glasshouse on the right.
    k.sofa(-4.6, -5.5, LOFT, 1.6, '#b4644a'); k.sofa(-2.3, -5.5, LOFT, 1.6, '#6f8f7d');
    k.span(-4.1, -2.8, LOFT, LOFT + .38, -4.5, -3.8, '#4b3a2c');
    k.table(.6, -4.6, LOFT); k.table(2.4, -5.6, LOFT, .45);
    k.planterBox(-6, -3.6, LZ - .55, LOFT); k.planterBox(-.6, 2.6, LZ - .55, LOFT);
    k.glasshouse(5.4, 10.2, -7.9, -3, LOFT, 2.4, 1);
    k.festoon(X0 + .2, LZ - .05, 5.2, LZ - .05, LOFT + 2.3, .35, 12);
    // A flat cedar roof over the loft's back with the name on its fascia, skylights in it.
    k.span(X0 - .1, 5.2, 9.3, 9.55, Z0, -5, '#6f4a2c');
    k.span(X0 - .1, 5.2, 9.3, 9.36, -5, -4.95, '#3f5a44');
    k.fascia('RIVERSIDE', -.65, 8.65, -4.95, 6.4, 1.1);
    [-3.6, .9].forEach(x => k.span(x - .8, x + .8, 9.55, 9.7, -7.4, -5.9, '#bfe0d6'));
    // Ground floor right: a cedar shelf wall of plants and jars (the nursery shop) beside the line.
    k.span(6.4, 10.3, 0, .9, Z0 + .3, Z0 + 1.1, '#8a5f33'); k.span(6.35, 10.35, .9, .98, Z0 + .25, Z0 + 1.15, '#e5ddc4');
    for (let x = 6.8; x < 10.1; x += .62) k.plant(x, .98, Z0 + .7, .38, '#c98466', '#6c9d5c');
    // Planters at the open front corners.
    k.planterBox(X0 + .3, X0 + 2.4, Z1 - .5, 0); k.planterBox(X1 - 2.6, X1 - .3, Z1 - .5, 0);
    return { x0: X0, x1: X1, z0: Z0, z1: Z1 };
  },
  // Old Town: a three-storey honey-brick townhouse on the square. Arched windows with stone surrounds on the first two
  // floors, shuttered squares above, stone bands and cornice, a slate mansard with dormers and chimneys. A narrow
  // atelier with a wrought-iron rail runs over the back of the shop, its fascia lit beneath.
  k => {
    const X0 = -8.5, X1 = 8.5, Z0 = -8.9, Z1 = 6.9, AT = 4.8, AZ = -4;
    k.floor(X0, X1, Z0, Z1, 0, 'planks');
    k.span(X0, X1, -.25, .06, Z1 - .08, Z1 + .02, '#2c5a44');
    const RZ = Z0 + .36;
    k.wall('brick', false, X0, X1, RZ, 0, 11.6, .36);
    k.wall('brick', true, Z0, -2.8, X0 + .3, 0, 9, .3);
    k.dado(false, X0, X1, RZ, 0, 1, '#3f6a52'); k.dado(true, Z0 + .36, -2.8, X0 + .3, 0, 1, '#3f6a52');
    // Stone bands at each floor, a cornice under the roof.
    [[4.55, 4.95], [8.85, 9.2]].forEach(([a, b]) => { k.span(X0 - .1, X1 + .1, a, b, RZ - .1, RZ + .12, '#dccaa6'); k.span(X0 + .3, X0 + .42, a, b, Z0, -2.8, '#dccaa6'); });
    k.span(X0 - .25, X1 + .25, 11.6, 12, RZ - .2, RZ + .25, '#dccaa6');
    [-5.6, 0, 5.6].forEach(x => {
      k.window(false, x, RZ, 1.15, 2.2, 3, { arch: true, surround: '#e4d4b2' });
      k.window(false, x, RZ, 5.7, 2, 2.7, { arch: true, surround: '#e4d4b2' });
      k.window(false, x, RZ, 9.75, 1.5, 1.5, { surround: '#e4d4b2' });
      // Shutters either side of the top windows and a window box under the middle floor's.
      [-1, 1].forEach(sd => k.span(x + sd * 1.05 - .28, x + sd * 1.05 + .28, 9.7, 11.3, RZ, RZ + .07, '#3f5a44'));
      k.planterBox(x - 1.1, x + 1.1, RZ + .35, 5.15, '#3f5a44');
    });
    // Mansard: a steep slate slope, dormers and two chimneys.
    const slope = new THREE.BoxGeometry(X1 - X0 + .3, .2, 1.85);
    k.place(slope, '#5d6467', 0, 12.85, RZ - .45, { rx: 1.05 });
    k.span(X0 - .05, X1 + .05, 13.6, 13.75, RZ - 1.4, RZ - .7, '#4a5053');
    [-3.6, 3.6].forEach(x => { k.span(x - .7, x + .7, 12, 13.1, RZ - .3, RZ + .2, '#e4d4b2'); k.window(false, x, RZ + .2, 12.15, .8, .8, { sill: null, bars: false }); k.gableRoof(x - .7, x + .7, RZ - .4, RZ + .3, 13.1, 13.6, '#5d6467', { over: .12 }); });
    [-5, 5].forEach(x => { k.span(x - .45, x + .45, 12.6, 14.4, RZ - 1.2, RZ - .5, '#b97a52'); k.span(x - .52, x + .52, 14.4, 14.55, RZ - 1.27, RZ - .43, '#dccaa6'); });
    // Left flank windows.
    [-7.2, -4.6].forEach(z => k.window(true, z, X0 + .3, 1.3, 1.6, 2.4, { arch: true, surround: '#e4d4b2' }));
    // The atelier: slab, iron rail, a long potting bench, two olive trees and a café table.
    k.slab(X0 + .3, X1, Z0 + .36, AZ, AT);
    k.ironRail(false, X0 + .3, X1, AZ - .05, AT, 1);
    k.span(-6, -1.6, AT, AT + .85, -7.6, -6.9, '#7a5a40'); k.span(-6.1, -1.5, AT + .85, AT + .93, -7.65, -6.85, '#e5ddc4');
    for (let x = -5.6; x < -1.8; x += .7) k.plant(x, AT + .93, -7.25, .4, '#c98466', '#6c9d5c');
    k.table(1.6, -6, AT); k.table(4.4, -6.6, AT, .45);
    k.prop('rooftop_olive.glb', -7.2, AT, -5);
    k.prop('rooftop_olive.glb', 7.4, AT, -5);
    // The fascia under the atelier's edge, pendants and sconces in the shop.
    k.fascia('OLD TOWN', 0, AT - .95, AZ, 7.6, 1.2);
    [-6.6, -3.3, 3.3, 6.6].forEach(x => k.pendant(x, AZ - 1, AT - .32, .75));
    [-7.4, -2.8, 2.8, 7.4].forEach(x => k.sconce(x, RZ, 3.9));
    // The street front: two stone pilasters and a slim green-and-cream striped awning on a green frame.
    [X0 + .3, X1 - .3].forEach(x => { k.span(x - .3, x + .3, 0, 3.9, Z1 - .9, Z1 - .3, '#dccaa6'); k.span(x - .38, x + .38, 3.9, 4.15, Z1 - .98, Z1 - .22, '#e8dcc0'); });
    for (let i = 0; i < 16; i++) { const x = X0 + .6 + i * (X1 - X0 - 1.2) / 16; k.place(new THREE.BoxGeometry((X1 - X0 - 1.2) / 16, .06, 1.6), i % 2 ? '#f1ead6' : '#3f6a52', x + (X1 - X0 - 1.2) / 32, 3.7, Z1 + .05, { rx: .32 }); }
    k.span(X0 + .6, X1 - .6, 3.88, 4, Z1 - .75, Z1 - .62, '#2c5a44');
    return { x0: X0, x1: X1, z0: Z0, z1: Z1 };
  },
  // City Center: the glass atrium under its tower. A pale stone podium wall, forest-green curtain walling across the
  // atrium's back and left, two upper terrace wings joined by a glass bridge round the elevator, a glass roof grid,
  // and the tower rising behind in the flagship's curtain wall with a roof garden and a beacon mast.
  k => {
    const X0 = -10.5, X1 = 10.5, Z0 = -10.2, Z1 = 5.8, UP = 5.2, UZ = -2.55, TOP = 8.4;
    k.floor(X0, X1, Z0, Z1, 0, 'stoneTile');
    // Tower: four textured faces, a roof slab, plant rooms and planters, a mast.
    const T = { x0: -2, x1: 10, z0: -13, z1: -10.3, h: 15.5 };
    k.span(T.x0, T.x1, 0, T.h, T.z0, T.z1, '#4d6f68');
    k.face('curtain', false, T.x0, T.x1, T.z1, TOP, T.h);
    k.face('curtain', true, T.z0, T.z1, T.x1, TOP, T.h);
    k.span(T.x0 - .2, T.x1 + .2, T.h, T.h + .3, T.z0 - .2, T.z1 + .2, '#d6dccb');
    k.span(-1.2, 1.4, T.h + .3, T.h + 1.3, -12.6, -11.2, '#c9d1c8'); k.span(6.6, 8.2, T.h + .3, T.h + 1.1, -12.5, -11.1, '#c9d1c8');
    k.planterBox(2.2, 5.6, -10.9, T.h + .3);
    k.post(9, -12.2, T.h + .3, T.h + 3, .05, '#c8d3cc');
    k.place(k.ball, '#ff9a7a', 9, T.h + 3.1, -12.2, { sx: .22, sy: .22, sz: .22, list: k.litList });
    // The atrium's back and left: curtain walling over a stone podium band.
    k.wall('ashlar', false, X0, X1, Z0 + .3, 0, 1.2); k.wall('curtain', false, X0, X1, Z0 + .3, 1.2, TOP);
    k.wall('ashlar', true, Z0, -2.8, X0 + .3, 0, 1.2); k.wall('curtain', true, Z0, -2.8, X0 + .3, 1.2, TOP);
    k.span(X0, X1, 1.15, 1.25, Z0 + .3, Z0 + .38, BRASS); k.span(X0 + .3, X0 + .38, 1.15, 1.25, Z0, -2.8, BRASS);
    // Upper terrace wings and the bridge, glass balustrades, planting.
    k.slab(X0, -3.4, Z0 + .3, UZ, UP, 'stoneTile');
    k.slab(3.4, X1, Z0 + .3, UZ, UP, 'stoneTile');
    k.slab(-3.4, 3.4, Z0 + .3, -7.9, UP, 'stoneTile');
    k.balustrade(false, X0, -3.4, UZ - .05, UP); k.balustrade(false, 3.4, X1, UZ - .05, UP);
    k.balustrade(true, UZ, -7.9, -3.4, UP); k.balustrade(true, UZ, -7.9, 3.4, UP);
    k.balustrade(false, -3.4, 3.4, -7.95, UP);
    k.balustrade(true, Z0 + .3, UZ, X1 - .05, UP);
    [-9.8, -3.5, 3.5, 9.8].forEach(x => k.column(x, UZ - .25, 0, UP - .32));
    [-6.9, 6.9].forEach(x => { k.planterBox(x - 2.6, x + 2.6, -9.3, UP); k.sofa(x, -4.4, UP, 2.2, x < 0 ? '#c98466' : '#7f9c8a'); });
    k.festoon(-9.8, UZ - .25, -3.5, UZ - .25, UP + 2.3); k.festoon(3.5, UZ - .25, 9.8, UZ - .25, UP + 2.3);
    // Glass roof grid over the atrium.
    k.span(X0, X1, TOP - .02, TOP + .02, Z0, -3.2, '#cfe6df', k.glassList);
    for (let x = X0; x <= X1 + 1e-3; x += 2.1) k.span(x - .05, x + .05, TOP, TOP + .14, Z0, -3.2, '#2c5a44');
    for (let z = Z0; z <= -3.2 + 1e-3; z += 1.7) k.span(X0, X1, TOP, TOP + .1, z - .04, z + .04, '#2c5a44');
    k.span(X0, X1, TOP - .1, TOP + .18, -3.3, -3.1, '#2c5a44');
    // The fascia on the left wing's edge and a menu panel at the right.
    k.fascia('CITY CENTER', -6.9, UP - .95, UZ, 6.4, 1.2);
    k.menuBoard(6.9, UP - .95, UZ, 4.6, 1.2, ['FLOWERS · EDIBLES', 'CONCENTRATES · WELLNESS']);
    [-8.2, -5.6, 5.6, 8.2].forEach(x => k.pendant(x, UZ - 1.2, UP - .32, .7));
    return { x0: X0, x1: X1, z0: -13, z1: Z1 };
  },
  // Desert Oasis: a stucco courtyard block. Thick warm walls with deep arched niches lined in sage tile, terracotta
  // coping, a terracotta tile floor; on the roof terrace a cedar pergola lounge and a glass grow room under a ridged
  // roof, with the name on the terrace's edge.
  k => {
    const X0 = -8.5, X1 = 8.5, Z0 = -8.3, Z1 = 6.3, ROOF = 4.8, RZ = -2.2;
    k.floor(X0, X1, Z0, Z1, 0, 'terracotta');
    k.span(X0, X1, -.25, .06, Z1 - .08, Z1 + .02, '#2c5a44');
    const BZ = Z0 + .4;
    k.wall('stucco', false, X0, X1, BZ, 0, ROOF + .75, .5);
    k.wall('stucco', true, Z0, -.7, X0 + .35, 0, ROOF + .75, .35);
    k.dado(false, X0, X1, BZ, 0, .9, '#c98a62'); k.dado(true, Z0 + .4, -.7, X0 + .35, 0, .9, '#c98a62');
    // Arched niches: sage tile backs, stucco reveals, a lit sconce in each.
    [-5.6, 0, 5.6].forEach(x => k.window(false, x, BZ, 1, 2.3, 3.1, { arch: true, surround: '#d7b98c', sill: '#c98a62' }));
    // Terracotta coping on the parapets and roof terrace edges.
    k.slab(X0 + .35, X1, BZ, RZ, ROOF, 'terracotta', { edge: '#e3c79c' });
    k.span(X0 - .1, X1 + .1, ROOF + .75, ROOF + .92, BZ - .6, BZ + .1, '#c46a48');
    k.span(X0 - .05, X0 + .45, ROOF + .75, ROOF + .92, Z0, -.7, '#c46a48');
    k.span(X0 + .35, X0 + .6, ROOF, ROOF + .75, BZ, RZ, '#e3c79c'); k.span(X1 - .25, X1, ROOF, ROOF + .75, BZ, RZ, '#e3c79c');
    k.span(X1 - .3, X1 + .05, ROOF + .75, ROOF + .9, BZ, RZ, '#c46a48');
    k.balustrade(false, X0 + .6, X1 - .25, RZ - .05, ROOF, .9);
    // Pergola lounge on the left.
    [[-7.4, -7.3], [-7.4, -3.2], [-2.4, -7.3], [-2.4, -3.2]].forEach(([x, z]) => k.span(x - .12, x + .12, ROOF, ROOF + 2.6, z - .12, z + .12, '#a3744a'));
    [-7.4, -2.4].forEach(x => k.span(x - .14, x + .14, ROOF + 2.6, ROOF + 2.8, -7.5, -3, '#a3744a'));
    for (let x = -7.6; x <= -2.2; x += .55) k.span(x - .06, x + .06, ROOF + 2.8, ROOF + 2.92, -7.7, -2.8, '#c2955f');
    k.sofa(-6.2, -5.6, ROOF, 1.5, '#b4644a'); k.sofa(-3.6, -5.6, ROOF, 1.5, '#6f8f7d');
    k.place(k.cyl, '#9a8b74', -4.9, ROOF + .2, -4.2, { sx: 1, sz: 1, sy: .4 });
    k.place(k.ball, '#ffb052', -4.9, ROOF + .45, -4.2, { sx: .45, sy: .3, sz: .45, list: k.litList });
    k.festoon(-7.4, -3.2, -2.4, -3.2, ROOF + 2.5, .3, 7);
    // Glass grow room on the right, solar panels between.
    k.glasshouse(2.7, 8, -7.8, -3.1, ROOF, 2.4, 1);
    for (let i = 0; i < 3; i++) k.place(new THREE.BoxGeometry(2.2, .06, 1), i % 2 ? '#2a4457' : '#24384a', -.2, ROOF + .55, -7.2 + i * 1.2, { rx: .5 });
    // The fascia on the terrace edge; pendants and sconces.
    k.fascia('DESERT OASIS', 0, ROOF - .95, RZ, 7.6, 1.2);
    [-5.6, 0, 5.6].forEach(x => k.sconce(x, BZ, 3.6));
    [-4.6, -1.4, 1.8, 5].forEach(x => k.pendant(x, RZ - 1.3, ROOF - .32, .75));
    [-6.6, 6.6].forEach(x => k.column(x, RZ - .25, 0, ROOF - .32));
    // A staff door at the right end of the back wall.
    k.span(7.1, 8.1, 0, 2.3, BZ, BZ + .06, '#3f5a44'); k.span(7, 8.2, 2.3, 2.42, BZ, BZ + .1, '#c46a48');
    return { x0: X0, x1: X1, z0: Z0, z1: Z1 };
  },
  // Alpine: a stone-and-timber lodge. Fieldstone rear and gable walls with a timber band, tall lit windows, a charcoal
  // standing-seam gable and a stone chimney; a green-framed glass conservatory wing on the left carries a timber roof
  // terrace reached by an outside stair. The name hangs from the gable's front eave.
  k => {
    const X0 = -3, X1 = 11, Z0 = -8.4, Z1 = 4.3, EAVE = 5.2;
    k.floor(X0, X1, Z0, Z1, 0, 'planks');
    k.span(X0, X1, -.25, .06, Z1 - .08, Z1 + .02, '#2c5a44');
    const BZ = Z0 + .4;
    k.wall('stone', false, X0, X1, BZ, 0, EAVE, .4);
    k.wall('stone', true, Z0, -.9, X1, 0, EAVE, .3);
    k.dado(false, X0, X1, BZ, 0, .9, '#6f8f7d');
    k.span(X0 - .05, X1 + .05, 2.5, 2.75, BZ - .1, BZ + .14, '#7a5432');
    [-.9, 2.6, 6.1, 9.4].forEach(x => k.window(false, x, BZ, 3, 1.5, 1.8));
    [0.85, 4.35, 7.75].forEach(x => k.sconce(x, BZ, 3.9));
    // Gable roof over the back of the hall, timber gable end and the chimney.
    k.gableRoof(X0, X1, Z0, -3.8, EAVE, 8.1, '#45514e');
    k.gableEnd('cedar', X1 + .02, Z0, -3.8, EAVE, 8.1);
    k.span(8.45, 10.15, EAVE - .5, 10, -7.85, -6.15, '#a6a092'); k.span(8.35, 10.25, 10, 10.25, -7.95, -6.05, '#3d4645');
    // Exposed timber trusses under the eave and a fascia board hung from it.
    [X0 + .2, 4, X1 - .2].forEach(x => k.span(x - .12, x + .12, 0, EAVE, -3.9, -3.66, '#7a5432'));
    k.span(X0, X1, EAVE - .3, EAVE, -3.9, -3.6, '#7a5432');
    k.fascia('ALPINE', 4.3, EAVE - .95, -3.6, 6.2, 1.15);
    [1, 7].forEach(x => k.pendant(x, -5, EAVE - .3, .8));
    // The conservatory wing: stone sill, green glazing, LED grow benches, a timber terrace on top.
    const C = { x0: -9.6, x1: -3.6, z0: Z0, z1: -3.2 };
    k.span(C.x0, C.x1, 0, .3, C.z0, C.z1, '#a6a092');
    k.span(C.x0, C.x1, .3, 4.3, C.z0, C.z0 + .3, '#a6a092'); k.face('stone', false, C.x0, C.x1, C.z0 + .3, .3, 4.3);
    k.glazing(false, C.x0, C.x1, C.z1, .3, 4.3, { bay: 1.2 });
    k.glazing(true, C.z0, C.z1, C.x0, .3, 4.3, { bay: 1.2 });
    k.glazing(true, C.z0, C.z1, C.x1, .3, 4.3, { bay: 1.2 });
    k.growBench(C.x0 + .5, C.x1 - .5, -7.3, .3); k.growBench(C.x0 + .5, C.x1 - .5, -4.4, .3);
    k.slab(C.x0, C.x1, C.z0, C.z1, 4.6, 'planks');
    [[false, C.x0, C.x1, C.z1 - .05], [true, C.z0, C.z1, C.x0 + .05]].forEach(([az, a0, a1, at]) => k.balustrade(az, a0, a1, at, 4.6));
    k.sofa(-7.6, -6.4, 4.6, 1.4, '#b4644a'); k.sofa(-5.4, -6.4, 4.6, 1.4, '#6f8f7d');
    k.place(k.cyl, '#9a8b74', -6.5, 4.8, -4.9, { sx: .9, sz: .9, sy: .4 });
    k.place(k.ball, '#ffb052', -6.5, 5.05, -4.9, { sx: .4, sy: .28, sz: .4, list: k.litList });
    k.festoon(-9.4, -3.4, -3.8, -3.4, 6.6, .3, 7);
    // The stair up the conservatory's courtyard side.
    for (let i = 0; i < 9; i++) k.span(-3.55, -2.25, i * .51, i * .51 + .14, -3.3 - i * .55 - .5, -3.3 - i * .55, '#8a6a48');
    k.span(-2.3, -2.2, 0, 5.4, -8, -3.3, '#5a4530');
    return { x0: C.x0, x1: X1, z0: Z0, z1: Z1 };
  }
];
