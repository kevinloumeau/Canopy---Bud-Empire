// City buildings (src/city-buildings.js): the warehouse, grow house, billboard and terp lab on lots round the block
// (layout.cityLots, sunny-world.js). Each lot keeps its old terrace until it comes up for sale; then it shows a fenced
// plot with a small FOR SALE board, and each paid stage rises out of the ground while it builds (scaffold and a
// blinking beacon on site), like Canopy HQ (flagship.js).
// Every part is a box (or a few prisms and cylinders) merged by colour into one mesh per stage, so each building
// costs a handful of draws and well under 2K triangles.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CITY_BUILDINGS, CITY_TOPS } from '../city-buildings.js';

const FOREST = '#1f4a35', FOREST_DEEP = '#173a2a', BRASS = '#d0a54e', CREAM = '#efe4cf', STONE = '#d8d0bf', STONE_DARK = '#a9a08f';
const STEEL = '#3c4a44', DIRT = '#8f7a5e', BRICK = '#b0644a', BRICK_DARK = '#8a4b38', ROLLER = '#8d958f', WHITE = '#f3f1ea';
const COPPER = '#c27a4a', TANK = '#c9cfcc', SCAFFOLD = '#c9a978', POLE = '#9aa39b';
const NIGHT_GLASS = new THREE.Color('#1c2a36');
const FONT = '"Bricolage Grotesque", "Helvetica Neue", sans-serif';


export function buildCityBuildings(world, layout, { material, nightWindows }) {
  const lots = layout.cityLots || {}, P = layout.plazaY;
  const unit = new THREE.BoxGeometry(1, 1, 1).translate(0, .5, 0);
  // A painted canvas texture (a sign or a screen), repainted when the fonts land.
  function canvasTexture(w, h, paint) {
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace;
    const draw = (...args) => { paint(canvas.getContext('2d'), w, h, ...args); tex.needsUpdate = true; };
    draw(); if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', () => draw());
    tex.repaint = draw;
    return tex;
  }
  function signTexture(lines, { bg = FOREST_DEEP, fg = CREAM, accent = BRASS, w = 512, h = 192 } = {}) {
    return canvasTexture(w, h, (c, W, H) => {
      c.fillStyle = bg; c.fillRect(0, 0, W, H); c.strokeStyle = accent; c.lineWidth = 4; c.strokeRect(8, 8, W - 16, H - 16);
      c.textAlign = 'center'; c.textBaseline = 'middle';
      lines.forEach(([text, size, colour, y]) => {
        c.fillStyle = colour === 'accent' ? accent : fg; c.font = '700 ' + size + 'px ' + FONT; if ('letterSpacing' in c) c.letterSpacing = Math.round(size / 9) + 'px';
        c.fillText(text, W / 2, H * y);
      });
    });
  }
  // A sign plane facing +z (toward the camera) or turned by rot.
  function sign(tex, w, h, x, y, z, rot = 0, glow = .12) {
    const mat = new THREE.MeshLambertMaterial({ map: tex, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: glow });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = rot; m.userData.glow = glow;
    return m;
  }

  // Parts gathered by colour, merged into one mesh each (seal). Prisms (gable roofs, sawtooth) and cylinders (tanks)
  // go in through the same lists.
  function parts(group) {
    const byColour = new Map();
    const push = (g, colour) => { if (!byColour.has(colour)) byColour.set(colour, []); byColour.get(colour).push(g); };
    return {
      add(x, y, z, w, h, d, colour) { const g = unit.clone(); g.scale(w, h, d); g.translate(x, y, z); push(g, colour); },
      span(xa, xb, ya, yb, za, zb, colour) { this.add((xa + xb) / 2, ya, (za + zb) / 2, xb - xa, yb - ya, zb - za, colour); },
      // A roof prism along x: base w (z) wide, h tall, length len along x, ridge in the middle (lean shifts it, -.5..0.5).
      prism(x, y, z, len, w, h, colour, lean = 0) {
        const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(lean * w, h); s.closePath();
        const g = new THREE.ExtrudeGeometry(s, { depth: len, bevelEnabled: false }); g.rotateY(Math.PI / 2); g.translate(x - len / 2, y, z);
        push(g.index ? g.toNonIndexed() : g, colour);
      },
      cylinder(x, y, z, r, h, colour, seg = 12) { const g = new THREE.CylinderGeometry(r, r, h, seg).translate(x, y + h / 2, z); push(g.toNonIndexed(), colour); },
      seal(materials = {}) {
        byColour.forEach((list, colour) => {
          // Boxes come indexed; merge everything as plain triangles so the prisms fit in.
          const geos = list.map(g => g.index ? g.toNonIndexed() : g);
          geos.forEach(g => { Object.keys(g.attributes).forEach(k => { if (k !== 'position' && k !== 'normal') g.deleteAttribute(k); }); });
          const mat = materials[colour] || material(colour);
          const mesh = new THREE.Mesh(mergeGeometries(geos), mat);
          mesh.castShadow = mesh.receiveShadow = !mat.transparent;
          group.add(mesh);
        });
        return group;
      }
    };
  }

  // The plot for sale: dirt behind a low forest fence with a brass rail, and a FOR SALE board facing the camera.
  function forSale(root, lot, name) {
    const g = new THREE.Group(); root.add(g); const p = parts(g);
    p.span(lot.x0 + .2, lot.x1 - .2, P, P + .04, lot.z0 + .2, lot.z1 - .2, DIRT);
    const fx0 = lot.x0 + .25, fx1 = lot.x1 - .25, fz0 = lot.z0 + .25, fz1 = lot.z1 - .25, fh = 1.3, ft = .1;
    [[fx0, fx1, fz1 - ft, fz1], [fx0, fx1, fz0, fz0 + ft], [fx0, fx0 + ft, fz0, fz1], [fx1 - ft, fx1, fz0, fz1]].forEach(([a, b, c, d]) => {
      p.span(a, b, P, P + fh, c, d, FOREST); p.span(a - .02, b + .02, P + fh, P + fh + .07, c - .02, d + .02, BRASS);
    });
    const cx = (lot.x0 + lot.x1) / 2;
    [-1.3, 1.3].forEach(dx => p.add(cx + dx, P + fh, fz1 - .05, .1, .7, .1, STEEL));
    p.seal();
    g.add(sign(signTexture([[name.toUpperCase(), 54, 'fg', .4], ['FOR SALE', 30, 'accent', .74]]), 3.2, 1.2, cx, P + fh + 1, fz1 + .02));
    return g;
  }
  // Scaffold round the lot's camera face and a blinking beacon, shown while a stage builds.
  function site(root, lot, height) {
    const g = new THREE.Group(); root.add(g); const p = parts(g);
    const z = lot.z1 + .15;
    for (let y = 2.2; y < height; y += 2.4) p.span(lot.x0 + .3, lot.x1 - .3, P + y, P + y + .06, z, z + .4, SCAFFOLD);
    for (let k = 0; k <= 4; k++) p.add(lot.x0 + .35 + (lot.x1 - lot.x0 - .7) * k / 4, P, z + .3, .06, height, .06, POLE);
    p.seal();
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(.14, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffb52e' }));
    beacon.position.set(lot.x1 - .4, P + height + .2, z + .3); g.add(beacon); g.userData.beacon = beacon;
    return g;
  }

  // Each building's stages: groups[k] stands from stage k+1 on (and rises in while stage k+1 builds); a group with
  // `until` hides once that stage opens (a wall that a later stage raises). glow: materials lit after dark.
  const DESIGNS = {
    warehouse(root, lot) {
      const x0 = lot.x0 + .4, x1 = lot.x1 - .4, z0 = lot.z0 + .4, z1 = lot.z1 - .4, cx = (x0 + x1) / 2;
      const lamp = material('#f6e7b8', { emissive: '#ffd27a', emissiveIntensity: 0, name: 'cityLamp' });
      // Stage 1, Loading dock: a brick shed with three roller doors to the front, a steel canopy and a dock apron.
      const s1 = new THREE.Group(), a = parts(s1);
      a.span(x0, x1, P, P + 4.2, z0, z1, BRICK); a.span(x0 - .06, x1 + .06, P + 4.2, P + 4.45, z0 - .06, z1 + .06, BRICK_DARK);
      a.span(x0, x1, P, P + .5, z1, z1 + .9, STONE_DARK);
      for (let k = 0; k < 3; k++) { const dx = x0 + .6 + k * (x1 - x0 - 1.2) / 3, w = (x1 - x0 - 1.2) / 3 - .3; a.span(dx + .15, dx + .15 + w, P + .5, P + 3, z1, z1 + .05, ROLLER); a.span(dx + .15, dx + .15 + w, P + 3, P + 3.12, z1, z1 + .08, STEEL); }
      a.span(x0, x1, P + 3.3, P + 3.42, z1, z1 + 1.1, STEEL);
      a.span(x0 + .3, x0 + .9, P + 3.42, P + 3.6, z1 + .5, z1 + .9, 'lamp');
      a.seal({ lamp });
      // Stage 2, High racks: two storeys more, a sawtooth roof with north lights, and a brass band.
      const s2 = new THREE.Group(), b = parts(s2);
      b.span(x0, x1, P + 4.45, P + 6.2, z0, z1, BRICK); b.span(x0 - .06, x1 + .06, P + 5, P + 5.2, z1, z1 + .08, BRASS);
      for (let k = 0; k < 6; k++) b.span(x0 + .5 + k * (x1 - x0 - 1) / 6, x0 + .5 + k * (x1 - x0 - 1) / 6 + .6, P + 5.4, P + 6, z1, z1 + .05, 'win');
      const teeth = 3, tw = (z1 - z0) / teeth;
      for (let k = 0; k < teeth; k++) b.prism(cx, P + 6.2, z0 + tw * (k + .5), x1 - x0, tw, 1.1, STONE_DARK, .45);
      b.seal({ win: lamp });
      // Stage 3, Cold vault: rooftop chillers, a brass name band and lit dock lamps.
      const s3 = new THREE.Group(), c = parts(s3);
      [[x0 + 1.1, z0 + 1], [x0 + 2.6, z0 + 1], [x1 - 1.2, z0 + 1]].forEach(([x, z]) => {
        c.add(x, P + 7.3, z, 1.2, .8, 1, WHITE); c.cylinder(x, P + 8.1, z, .38, .08, STEEL, 10);
      });
      c.span(x0 - .08, x1 + .08, P + 3.7, P + 4.15, z1 + .02, z1 + .1, FOREST);
      c.seal();
      s3.add(sign(signTexture([['CANOPY SUPPLY CO.', 50, 'fg', .52]], { h: 96 }), (x1 - x0) * .8, .42, cx, P + 3.92, z1 + .12, 0, .15));
      return { groups: [s1, s2, s3], lamps: [lamp] };
    },
    growhouse(root, lot) {
      const x0 = lot.x0 + .45, x1 = lot.x1 - .45, z0 = lot.z0 + .45, z1 = lot.z1 - .45, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
      // Green glass that glows pink-violet under the grow lights (stage 3) and warm after dark.
      const glass = material('#8fcfa6', { transparent: true, opacity: .7, emissive: '#c46bd8', emissiveIntensity: 0, depthWrite: false, name: 'cityGlass' });
      const plants = material('#4f8f3e', { emissive: '#2c6a24', emissiveIntensity: .05, name: 'cityPlants' });
      // One glasshouse bay: a stone base, glass walls and a pitched glass roof on white ribs.
      function bay(p, za, zb) {
        const w = zb - za, mz = (za + zb) / 2;
        p.span(x0, x1, P, P + .7, za, zb, STONE);
        p.span(x0 + .05, x1 - .05, P + .7, P + 3.2, za + .05, zb - .05, 'glass');
        p.prism(cx, P + 3.2, mz, x1 - x0, w, 1.9, 'glass');
        for (let k = 0; k <= 6; k++) { const x = x0 + (x1 - x0) * k / 6; p.add(x, P + .7, zb - .04, .1, 2.5, .1, WHITE); p.add(x, P + .7, za + .04, .1, 2.5, .1, WHITE); p.prism(x, P + 3.2, mz, .1, w + .08, 1.96, WHITE); }
        p.span(x0, x1, P + 3.15, P + 3.25, za, zb, WHITE);
      }
      // Stage 1, Glasshouse: the front bay over young plants.
      const s1 = new THREE.Group(), a = parts(s1); bay(a, cz, z1);
      for (let r = 0; r < 3; r++) a.span(x0 + .5, x1 - .5, P + .7, P + 1.1, cz + .5 + r * (z1 - cz - 1) / 3, cz + .8 + r * (z1 - cz - 1) / 3, 'plants');
      a.seal({ glass, plants });
      // Stage 2, Hydro benches: the back bay, and both bays filled with benches of grown plants.
      const s2 = new THREE.Group(), b = parts(s2); bay(b, z0, cz);
      for (let r = 0; r < 3; r++) b.span(x0 + .5, x1 - .5, P + .7, P + 1.6, z0 + .5 + r * (cz - z0 - 1) / 3, z0 + .85 + r * (cz - z0 - 1) / 3, 'plants');
      for (let r = 0; r < 3; r++) b.span(x0 + .5, x1 - .5, P + 1.1, P + 1.6, cz + .5 + r * (z1 - cz - 1) / 3, cz + .8 + r * (z1 - cz - 1) / 3, 'plants');
      b.seal({ glass, plants });
      // Stage 3, Light deck: lamp rails under the ridges (lit), roof vents and a sign on the front.
      const s3 = new THREE.Group(), c = parts(s3);
      [cz - (cz - z0) / 2, cz + (z1 - cz) / 2].forEach(z => { c.span(x0 + .4, x1 - .4, P + 3.1, P + 3.2, z - .4, z - .3, 'led'); c.span(x0 + .4, x1 - .4, P + 3.1, P + 3.2, z + .3, z + .4, 'led'); c.add(x0 + 1.4, P + 5.1, z, .6, .45, .6, STEEL); c.add(x1 - 1.4, P + 5.1, z, .6, .45, .6, STEEL); });
      const led = new THREE.MeshBasicMaterial({ color: '#e08af0' });
      c.seal({ led });
      s3.add(sign(signTexture([['CANOPY GROW HOUSE', 46, 'fg', .52]], { h: 96 }), 3.6, .5, cx, P + .45, z1 + .03, 0, .15));
      return { groups: [s1, s2, s3], glass, plants };
    },
    billboard(root, lot) {
      const x0 = lot.x0 + .4, x1 = lot.x1 - .4, z0 = lot.z0 + .4, z1 = lot.z1 - .4, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
      // Stage 1, Street boards: a three-storey cream block with poster boards across its front.
      const s1 = new THREE.Group(), a = parts(s1);
      a.span(x0, x1, P, P + 7.2, z0, z1, CREAM); a.span(x0 - .08, x1 + .08, P + 7.2, P + 7.5, z0 - .08, z1 + .08, STONE_DARK);
      a.span(x0, x1, P, P + .4, z1, z1 + .06, STONE_DARK);
      for (let f = 0; f < 3; f++) for (let k = 0; k < 4; k++) a.span(x0 + .5 + k * (x1 - x0 - 1) / 4 + .2, x0 + .5 + (k + 1) * (x1 - x0 - 1) / 4 - .2, P + 1 + f * 2.2, P + 2.4 + f * 2.2, z1, z1 + .04, f === 0 ? FOREST : '#5d6f80');
      a.seal();
      const poster = signTexture([['CANOPY', 64, 'fg', .44], ['OPEN DAILY', 26, 'accent', .76]], { bg: '#2c6b4c' });
      s1.add(sign(poster, 3.4, 1.28, cx, P + 3.2 + 1.1, z1 + .07, 0, .15));
      // Stage 2, Digital screen: a big lit screen on a steel frame over the roof, cycling ads.
      const s2 = new THREE.Group(), b = parts(s2), sw = (x1 - x0) * .9, sh = 3.6, sy = P + 8.4, sz = cz + 1.2;
      b.span(cx - sw / 2 - .15, cx + sw / 2 + .15, sy - .15, sy + sh + .15, sz - .25, sz - .02, STEEL);
      [-sw / 3, 0, sw / 3].forEach(dx => b.add(cx + dx, P + 7.5, sz - .4, .22, sy - P - 7.5, .22, STEEL));
      b.seal();
      const ads = [['CANOPY', 'TRENDING NOW', '#1f4a35'], ['FRESH DROP', 'IN STORE TODAY', '#5a2d6b'], ['CANOPY', 'ORDER ONLINE', '#7a3b1f']];
      const screenTex = canvasTexture(512, 256, (c, W, H, k = 0) => {
        const [big, small, bg] = ads[k % ads.length];
        c.fillStyle = bg; c.fillRect(0, 0, W, H); c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = CREAM; c.font = '700 84px ' + FONT; if ('letterSpacing' in c) c.letterSpacing = '8px'; c.fillText(big, W / 2, H * .42);
        c.fillStyle = BRASS; c.font = '700 32px ' + FONT; if ('letterSpacing' in c) c.letterSpacing = '6px'; c.fillText(small, W / 2, H * .76);
      });
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), screenMat); screen.position.set(cx, sy + sh / 2, sz); s2.add(screen);
      // Stage 3, Rooftop spectacular: a taller crown frame with brass bulbs round a big leaf mark and spotlights.
      const s3 = new THREE.Group(), c = parts(s3), ty = sy + sh + .3;
      c.span(cx - 1.6, cx + 1.6, ty, ty + .2, sz - .3, sz, STEEL);
      [-1.4, 1.4].forEach(dx => c.add(cx + dx, ty, sz - .2, .14, 3.4, .14, STEEL));
      for (let k = 0; k < 14; k++) { const t = k / 14 * Math.PI * 2; c.add(cx + Math.cos(t) * 1.45, ty + 1.9 + Math.sin(t) * 1.45, sz + .02, .16, .16, .08, 'bulb'); }
      [-sw / 2 + .4, sw / 2 - .4].forEach(dx => { c.add(cx + dx, sy - .45, sz + .3, .3, .3, .45, STEEL); });
      const bulb = new THREE.MeshBasicMaterial({ color: '#ffd98a' });
      c.seal({ bulb });
      const leaf = new THREE.Mesh(mergeGeometries([[0, 1.15], [-.6, .9], [.6, .9]].map(([ang, len]) => {
        const g = new THREE.SphereGeometry(.5, 10, 6); g.scale(.3, len, .06); g.translate(0, len * .5, 0); g.rotateZ(ang); return g;
      })), new THREE.MeshBasicMaterial({ color: '#7fd18f' }));
      leaf.position.set(cx, ty + 1.05, sz + .05); s3.add(leaf);
      return { groups: [s1, s2, s3], screenTex, ads, bulb, leaf };
    },
    terplab(root, lot) {
      const x0 = lot.x0 + .45, x1 = lot.x1 - .45, z0 = lot.z0 + .45, z1 = lot.z1 - .45, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
      const band = material('#7fb8b0', { emissive: '#bfeee6', emissiveIntensity: 0, name: 'cityLabBand' });
      // After dark the glass bands go dark with lit rooms behind a share of them (nightWindows), not pale daylight cyan.
      if (nightWindows) nightWindows(band, 'grid', { share: .35, strength: .75, cell: [1.15, 1.25, 1.15], origin: [x0 + .4, P + .02, z0 + .4] });
      band.userData.day = band.color.clone();
      const amber = new THREE.MeshLambertMaterial({ color: '#e8a93a', emissive: '#ffb347', emissiveIntensity: .35, transparent: true, opacity: .85 });
      // Stage 1, Extraction room: a white two-storey lab with a long teal glass band and a forest door.
      const s1 = new THREE.Group(), a = parts(s1);
      a.span(x0, x1, P, P + 6, z0, z1, WHITE); a.span(x0 - .06, x1 + .06, P + 6, P + 6.25, z0 - .06, z1 + .06, STONE_DARK);
      a.span(x0 + .4, x1 - .4, P + 1.2, P + 2.4, z1, z1 + .05, 'band'); a.span(x0 + .4, x1 - .4, P + 3.8, P + 5, z1, z1 + .05, 'band');
      a.span(x1 - .05, x1 + .01, P + 3.8, P + 5, z0 + .4, z1 - .4, 'band');
      a.span(cx - .6, cx + .6, P, P + 1.1, z1, z1 + .06, FOREST);
      a.seal({ band });
      s1.add(sign(signTexture([['TERP LAB', 54, 'fg', .52]], { h: 96, bg: FOREST }), 2.4, .45, cx, P + 2.95, z1 + .07, 0, .15));
      // Stage 2, Flavour library: a glass rooftop storey set back, and a row of steel tanks beside it.
      const s2 = new THREE.Group(), b = parts(s2);
      b.span(x0 + .5, cx + .6, P + 6.25, P + 8.9, z0 + .5, z1 - .8, 'band'); b.span(x0 + .4, cx + .7, P + 8.9, P + 9.1, z0 + .4, z1 - .7, WHITE);
      for (let k = 0; k < 3; k++) b.cylinder(cx + 1.4 + k * 1.05, P + 6.25, z0 + 1.4, .42, 2.3, TANK, 12);
      for (let k = 0; k < 3; k++) b.cylinder(cx + 1.4 + k * 1.05, P + 8.55, z0 + 1.4, .2, .25, STEEL, 8);
      b.seal({ band });
      // Stage 3, Master blender: a tall copper column with brass rings and a glowing amber still dome on the front of the roof.
      const s3 = new THREE.Group(), c = parts(s3);
      c.cylinder(cx + 2.4, P + 6.25, cz + 1.2, .45, 6, COPPER, 12);
      for (let k = 1; k < 6; k++) c.cylinder(cx + 2.4, P + 6.25 + k, cz + 1.2, .5, .1, BRASS, 12);
      c.span(cx + 1.05, cx + 2.05, P + 9.9, P + 10.05, cz + 1.15, cz + 1.25, COPPER);
      c.seal();
      const dome = new THREE.Mesh(new THREE.SphereGeometry(.85, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), amber);
      dome.position.set(cx + 2.4 - 1.6, P + 6.25, cz + 1.4); dome.castShadow = true; s3.add(dome);
      return { groups: [s1, s2, s3], band, amber };
    }
  };

  const built = CITY_BUILDINGS.filter(b => lots[b.id]).map(def => {
    const lot = lots[def.id], root = new THREE.Group(); root.name = 'city-' + def.id; root.visible = false; world.add(root);
    const sale = forSale(root, lot, def.name), parts = DESIGNS[def.id](root, lot);
    parts.groups.forEach(g => root.add(g));
    const tops = CITY_TOPS[def.id], scaffold = site(root, lot, tops[3] + .4);
    const signs = []; root.traverse(o => { if (o.isMesh && o.userData.glow !== undefined) signs.push(o); });
    return { def, root, sale, parts, scaffold, signs };
  });

  return {
    // frame.city: stages open per id; frame.cityClaimed: lots up for sale or bought; frame.cityBuild: {id: share done}.
    update(frame) {
      const night = frame.night || 0, t = frame.time || 0, city = frame.city || {}, claimed = frame.cityClaimed || {}, builds = frame.cityBuild || {};
      built.forEach(({ def, root, sale, parts, scaffold, signs }) => {
        root.visible = !!claimed[def.id];
        if (!root.visible) return;
        const stage = city[def.id] | 0, build = builds[def.id], building = build != null;
        sale.visible = stage === 0 && !building;
        parts.groups.forEach((g, k) => {
          const rising = building && k === stage;
          g.visible = k < stage || rising;
          g.scale.y = rising ? Math.max(.02, build) : 1;
        });
        scaffold.visible = building;
        // The scaffold reaches the top of the stage going up, not the finished building.
        if (building) scaffold.scale.y = CITY_TOPS[def.id][Math.min(3, stage + 1)] / CITY_TOPS[def.id][3];
        scaffold.userData.beacon.visible = building && Math.floor(t / 500) % 2 === 0;
        signs.forEach(s => { s.material.emissiveIntensity = s.userData.glow + night * .7; });
        if (def.id === 'warehouse') parts.lamps.forEach(m => { m.emissiveIntensity = night * .9; });
        if (def.id === 'growhouse') {
          // Grow lights (stage 3) wash the glass violet, pulsing slowly; otherwise it only warms after dark.
          parts.glass.emissive.set(stage >= 3 ? '#c46bd8' : '#ffd896');
          parts.glass.emissiveIntensity = stage >= 3 ? .35 + .1 * Math.sin(t / 900) + night * .3 : night * .25;
          parts.plants.emissiveIntensity = .05 + (stage >= 3 ? .2 : 0);
        }
        if (def.id === 'billboard') {
          const k = Math.floor(t / 6000) % parts.ads.length;
          if (parts.screenTex.shown !== k) { parts.screenTex.shown = k; parts.screenTex.repaint(k); }
          parts.bulb.color.set(Math.floor(t / 400) % 2 ? '#ffd98a' : '#f6b94a');
          parts.leaf.material.color.set('#7fd18f').multiplyScalar(1 + night * .4);
        }
        if (def.id === 'terplab') { parts.band.emissiveIntensity = 0; parts.band.color.copy(parts.band.userData.day).lerp(NIGHT_GLASS, night * .85); parts.amber.emissiveIntensity = .35 + .15 * Math.sin(t / 700) + night * .4; }
      });
    }
  };
}
