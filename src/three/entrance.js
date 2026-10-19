// The sprite shop's entrance (Kevin, 2026-10-19): a striped fabric awning over the street door, and a green neon leaf
// on a blade sign that sticks out from the door frame's post. The Blender doorway's flat corner canopy and its lamp are
// hidden in its place (layout.fixtures `hide`). Positions come from layout.entrance (main.js): the facade's outer face
// x, the door opening's z span, the post's z and the header's height.
import * as THREE from 'three';

const GREEN = '#1f6b47', CREAM = '#f1e7cc', BRASS = '#d0a54e';

export function buildEntrance(world, layout, { span }) {
  const e = layout.entrance;
  if (!e) return null;
  const group = new THREE.Group();
  world.add(group);
  const wall = e.x, out = e.x - e.reach;

  // The awning's fabric: stripes running down the slope, a pair every ~0.45 units across the door.
  const stripes = document.createElement('canvas'); stripes.width = 64; stripes.height = 8;
  const sc = stripes.getContext('2d');
  sc.fillStyle = GREEN; sc.fillRect(0, 0, 64, 8); sc.fillStyle = CREAM; sc.fillRect(32, 0, 32, 8);
  const stripeTexture = new THREE.CanvasTexture(stripes); stripeTexture.colorSpace = THREE.SRGBColorSpace;
  stripeTexture.wrapS = THREE.RepeatWrapping; stripeTexture.magFilter = THREE.NearestFilter;
  const pairs = Math.max(2, Math.round((e.z1 - e.z0) / .45));
  const fabric = new THREE.MeshLambertMaterial({ map: stripeTexture, side: THREE.DoubleSide });
  // The valance: the same stripes with a scalloped hem cut out of its lower edge, one scallop per stripe.
  const hem = document.createElement('canvas'); hem.width = 64; hem.height = 32;
  const hc = hem.getContext('2d');
  hc.fillStyle = GREEN; hc.fillRect(0, 0, 32, 32); hc.fillStyle = CREAM; hc.fillRect(32, 0, 32, 32);
  hc.globalCompositeOperation = 'destination-out';
  [16, 48].forEach(cx => { hc.beginPath(); hc.ellipse(cx, 34, 15, 12, 0, Math.PI, 0); hc.lineTo(cx + 16, 32); hc.lineTo(cx - 16, 32); hc.fill(); });
  hc.fillRect(0, 31, 64, 1);
  const hemTexture = new THREE.CanvasTexture(hem); hemTexture.colorSpace = THREE.SRGBColorSpace;
  hemTexture.wrapS = THREE.RepeatWrapping; hemTexture.magFilter = THREE.NearestFilter;
  const valance = new THREE.MeshLambertMaterial({ map: hemTexture, side: THREE.DoubleSide, alphaTest: .5 });

  // A mesh from explicit corners in map units (the world group stretches heights), u across the door.
  function quad(corners, uvs, mat) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(corners.flat(), 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs.flat(), 2));
    g.setIndex(corners.length === 4 ? [0, 1, 2, 0, 2, 3] : [0, 1, 2]);
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); m.castShadow = m.receiveShadow = true;
    group.add(m);
    return m;
  }
  const { z0, z1, top, front, drop } = e;
  quad([[wall, top, z0], [wall, top, z1], [out, front, z1], [out, front, z0]], [[0, 1], [pairs, 1], [pairs, 0], [0, 0]], fabric);
  quad([[out, front, z0], [out, front, z1], [out, front - drop, z1], [out, front - drop, z0]], [[0, 1], [pairs, 1], [pairs, 0], [0, 0]], valance);
  // Plain cheeks at both ends, in the green.
  const cheek = new THREE.MeshLambertMaterial({ color: GREEN, side: THREE.DoubleSide });
  [z0, z1].forEach(z => quad([[wall, top, z], [out, front, z], [out, front - drop, z]], [[0, 0], [0, 0], [0, 0]], cheek));
  // It hangs from a green fascia board standing on the door frame's header, so its back edge meets something solid
  // (Kevin, 2026-10-19: the first try floated above the frame).
  span(group, wall - .1, wall + .02, e.header, top + .08, z0 - .04, z1 + .04, GREEN);
  span(group, wall - .12, wall + .03, top + .08, top + .12, z0 - .05, z1 + .05, BRASS, { cast: false });
  // Its frame: a brass bar along the front, and two brass struts from the header's face up to it.
  span(group, out - .03, out + .02, front - .05, front, z0, z1, BRASS, { cast: false });
  const strut = new THREE.MeshLambertMaterial({ color: BRASS });
  [z0 + .08, z1 - .08].forEach(z => {
    const from = new THREE.Vector3(wall - .1, e.header - .32, z), to = new THREE.Vector3(out + .02, front - .05, z), dir = to.clone().sub(from);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(.022, .022, dir.length(), 6), strut);
    rod.position.copy(from).add(to).multiplyScalar(.5); rod.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    rod.castShadow = true; group.add(rod);
  });

  // The neon leaf: a blade sign hung from a green bracket off the door post, its faces toward the street either way.
  const s = e.sign;
  span(group, s.x0, wall, s.y1 + .08, s.y1 + .16, s.z - .05, s.z + .05, GREEN);
  [s.x0 + .12, s.x1 - .12].forEach(x => span(group, x - .015, x + .015, s.y1, s.y1 + .08, s.z - .015, s.z + .015, BRASS, { cast: false }));
  span(group, s.x0 - .04, s.x1 + .04, s.y0 - .04, s.y1 + .04, s.z - .05, s.z + .05, '#1d211f');
  // Kevin's 2026-10-19 reference: a serrated seven-leaf outline in green neon with OPEN in thin tube letters beneath.
  // The leaf is one continuous tube round the leaflets' union: each pass strokes every leaflet, then the union is filled
  // with the panel's dark so only the outer half of the strokes (the silhouette) is left.
  const neon = document.createElement('canvas'); neon.width = 256; neon.height = 284;
  const nc = neon.getContext('2d');
  nc.fillStyle = '#0d120f'; nc.fillRect(0, 0, 256, 284);
  const cx = 128, cy = 150;
  const leaflet = (a, len) => {
    // Up one edge and back down the other, a tooth every few pixels; widest a little below the middle, pointed tip.
    const L = 118 * len, W = 17 * len, ang = a - Math.PI / 2, ux = Math.cos(ang), uy = Math.sin(ang), n = 16;
    const edge = side => Array.from({ length: n + 1 }, (_, k) => {
      const t = k / n, w = W * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.08)), .9) * (k % 2 ? 1 : .72);
      return [cx + ux * L * t - uy * w * side, cy + uy * L * t + ux * w * side];
    });
    const right = edge(1), left = edge(-1).reverse();
    nc.moveTo(cx, cy); right.forEach(q => nc.lineTo(q[0], q[1])); left.forEach(q => nc.lineTo(q[0], q[1])); nc.closePath();
  };
  const leaf = () => { nc.beginPath(); [[0, 1], [-.5, .84], [.5, .84], [-1.05, .7], [1.05, .7], [-1.6, .38], [1.6, .38]].forEach(([a, len]) => leaflet(a, len)); };
  nc.lineJoin = nc.lineCap = 'round';
  leaf(); nc.shadowColor = '#29ff6a'; nc.shadowBlur = 18; nc.strokeStyle = '#3df27a'; nc.lineWidth = 12; nc.stroke();
  leaf(); nc.shadowBlur = 0; nc.strokeStyle = '#e4ffe9'; nc.lineWidth = 6; nc.stroke();
  leaf(); nc.fillStyle = '#0f1812'; nc.fill();
  const stem = () => { nc.beginPath(); nc.moveTo(cx, cy - 6); nc.lineTo(cx, cy + 34); };
  stem(); nc.shadowBlur = 14; nc.strokeStyle = '#3df27a'; nc.lineWidth = 7; nc.stroke();
  stem(); nc.shadowBlur = 0; nc.strokeStyle = '#e4ffe9'; nc.lineWidth = 3; nc.stroke();
  nc.font = '300 54px "Fredoka", sans-serif'; nc.textAlign = 'center'; nc.textBaseline = 'alphabetic';
  nc.lineWidth = 2.5; nc.shadowColor = '#29ff6a'; nc.shadowBlur = 16; nc.strokeStyle = '#7dff9f'; nc.strokeText('OPEN', cx, 262, 210);
  nc.shadowBlur = 0; nc.strokeStyle = '#ecfff0'; nc.lineWidth = 1.5; nc.strokeText('OPEN', cx, 262, 210);
  const neonTexture = new THREE.CanvasTexture(neon); neonTexture.colorSpace = THREE.SRGBColorSpace;
  const neonMat = new THREE.MeshBasicMaterial({ map: neonTexture, toneMapped: false, side: THREE.DoubleSide });
  [s.z - .052, s.z + .052].forEach(z => quad([[s.x0, s.y1, z], [s.x1, s.y1, z], [s.x1, s.y0, z], [s.x0, s.y0, z]], [[0, 1], [1, 1], [1, 0], [0, 0]], neonMat).castShadow = false);
  return group;
}
