// Renders the Empire tab's landmark icons (public/icons/3d/landmark-*.png) from the game's own 3D map, so each tile
// shows the building as the player sees it: the flagship shop, Canopy HQ and the four city buildings, finished.
// It runs the game in ?snap mode (scripts/snap3d.mjs) on a seeded late-game save, hides everything outside one lot,
// draws it twice (on black and on white) and takes the alpha from the difference, so the edges stay clean.
//
//   npm run dev                       # port 4173
//   node scripts/map-icons.mjs        # writes public/icons/3d/landmark-{shop,hq,warehouse,growhouse,billboard,terplab}.png
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'map-icons-'));
const save = {
  money: 1e12, lifetime: 1e12, orderCounters: 3, idStaff: 5, doorBuilt: true, shopOpen: true, lines: [75, 75, 75, 75, 75, 75], staff: [8, 8, 8, 8, 8, 8],
  stock: [80, 101, 0, 11, 40], strains: [2, 2, 1, 1], menuStrains: [0, 1, 2], kiosk: true, secondKiosk: true, thirdKiosk: true, lounge: 1,
  pickupWindow: { owned: true, level: 75 }, atm: { level: 50, machines: 3 }, autoDrone: { owned: true }, flagship: 4,
  city: { warehouse: 3, growhouse: 3, billboard: 3, terplab: 3 }, citySeen: ['warehouse', 'growhouse', 'billboard', 'terplab'], flagshipSeen: true
};
writeFileSync(join(dir, 'save.json'), JSON.stringify(save));
const page = `(async () => {
  const d = window.__canopySnap.map3d(), { THREE, scene, world, camera, renderer, haze } = d, sw = await import('/src/sunny-world.js');
  const layout = sw.townLayout(), lots = { hq: layout.flagshipLot, ...layout.cityLots, shop: { x0: -12.6, x1: 12.6, z0: -10.5, z1: 12.8 } };
  const PX = 320, out = {}, box = new THREE.Box3(), c = new THREE.Vector3(), v = new THREE.Vector3();
  const saved = { bg: scene.background, size: renderer.getSize(new THREE.Vector2()), ratio: renderer.getPixelRatio(), cam: { l: camera.left, r: camera.right, t: camera.top, b: camera.bottom } };
  // No haze: an icon is the building alone, in clear air.
  const hazeWas = [haze.hazeX.value.clone(), haze.hazeZ.value.clone()]; haze.hazeX.value.set(1e4, 1e4 + 1, 1e4, 1e4 + 1); haze.hazeZ.value.set(1e4, 1e4 + 1, 1e4, 1e4 + 1);
  const meshes = []; scene.traverse(o => { if ((o.isMesh || o.isInstancedMesh || o.isSprite || o.isPoints || o.isLine) && o.visible) meshes.push(o); });
  for (const [id, lot] of Object.entries(lots)) {
    const shown = [];
    meshes.forEach(o => {
      box.setFromObject(o); if (box.isEmpty()) { o.visible = false; return; }
      box.getCenter(c); const inside = c.x > lot.x0 && c.x < lot.x1 && c.z > lot.z0 && c.z < lot.z1 && box.max.x - box.min.x < (lot.x1 - lot.x0) + 2 && box.max.z - box.min.z < (lot.z1 - lot.z0) + 2;
      o.visible = inside; if (inside) shown.push(o);
    });
    // Fit the camera to what is shown, in the map's own view.
    camera.updateMatrixWorld(); const inv = camera.matrixWorldInverse; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    shown.forEach(o => { box.setFromObject(o); for (let k = 0; k < 8; k++) { v.set(k & 1 ? box.max.x : box.min.x, k & 2 ? box.max.y : box.min.y, k & 4 ? box.max.z : box.min.z).applyMatrix4(inv); x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y); } });
    const span = Math.max(x1 - x0, y1 - y0) * 1.04, mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    camera.left = mx - span / 2; camera.right = mx + span / 2; camera.top = my + span / 2; camera.bottom = my - span / 2; camera.updateProjectionMatrix();
    renderer.setPixelRatio(1); renderer.setSize(PX, PX, false);
    const grab = colour => { scene.background = new THREE.Color(colour); renderer.render(scene, camera); const cv = document.createElement('canvas'); cv.width = cv.height = PX; cv.getContext('2d').drawImage(renderer.domElement, 0, 0, PX, PX); return cv.getContext('2d').getImageData(0, 0, PX, PX); };
    const black = grab(0x000000), white = grab(0xffffff), img = new ImageData(PX, PX);
    for (let p = 0; p < black.data.length; p += 4) {
      const a = 1 - ((white.data[p] - black.data[p]) + (white.data[p + 1] - black.data[p + 1]) + (white.data[p + 2] - black.data[p + 2])) / 765;
      img.data[p + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
      for (let k = 0; k < 3; k++) img.data[p + k] = a > .004 ? Math.min(255, Math.round(black.data[p + k] / a)) : 0;
    }
    const cv = document.createElement('canvas'); cv.width = cv.height = PX; cv.getContext('2d').putImageData(img, 0, 0); out[id] = cv.toDataURL('image/png');
    meshes.forEach(o => { o.visible = true; });
  }
  haze.hazeX.value.copy(hazeWas[0]); haze.hazeZ.value.copy(hazeWas[1]);
  scene.background = saved.bg; renderer.setPixelRatio(saved.ratio); renderer.setSize(saved.size.x, saved.size.y, false); Object.assign(camera, { left: saved.cam.l, right: saved.cam.r, top: saved.cam.t, bottom: saved.cam.b }); camera.updateProjectionMatrix();
  return out;
})()`;
const json = execFileSync('node', ['scripts/snap3d.mjs', join(dir, 'frame.png'), '--size', '1200x900', '--save', join(dir, 'save.json'), '--eval', page, '--wait', '100'], { maxBuffer: 1 << 28 }).toString();
const icons = JSON.parse(json.split('\n').find(line => line.startsWith('{')));
for (const [id, url] of Object.entries(icons)) {
  const file = join('public/icons/3d', 'landmark-' + id + '.png'); writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
  console.log(file);
}
