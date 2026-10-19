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
  // Its frame: a brass bar along the front and two slim brass arms back to the wall under the fabric.
  span(group, out - .03, out + .02, front - .05, front, z0, z1, BRASS, { cast: false });
  [z0 + .06, z1 - .06].forEach(z => span(group, out, wall, front - .32, front - .28, z - .02, z + .02, BRASS, { cast: false }));

  // The neon leaf: a blade sign hung from a green bracket off the door post, its faces toward the street either way.
  const s = e.sign;
  span(group, s.x0, wall, s.y1 + .08, s.y1 + .16, s.z - .05, s.z + .05, GREEN);
  [s.x0 + .12, s.x1 - .12].forEach(x => span(group, x - .015, x + .015, s.y1, s.y1 + .08, s.z - .015, s.z + .015, BRASS, { cast: false }));
  span(group, s.x0 - .04, s.x1 + .04, s.y0 - .04, s.y1 + .04, s.z - .05, s.z + .05, '#1d211f');
  const neon = document.createElement('canvas'); neon.width = 256; neon.height = 256;
  const nc = neon.getContext('2d');
  nc.fillStyle = '#141816'; nc.fillRect(0, 0, 256, 256);
  // Seven leaflets fanned from the stem's head, longest in the middle, traced as glowing tube.
  const leaf = () => {
    nc.beginPath();
    [[0, 1], [-.42, .82], [.42, .82], [-.85, .62], [.85, .62], [-1.25, .36], [1.25, .36]].forEach(([a, len]) => {
      const L = 92 * len, w = 15 * len, ang = a - Math.PI / 2;
      const tip = [128 + Math.cos(ang) * L, 168 + Math.sin(ang) * L], side = [-Math.sin(ang) * w, Math.cos(ang) * w];
      const mid = [128 + Math.cos(ang) * L * .5, 168 + Math.sin(ang) * L * .5];
      nc.moveTo(128, 168);
      nc.quadraticCurveTo(mid[0] + side[0], mid[1] + side[1], tip[0], tip[1]);
      nc.quadraticCurveTo(mid[0] - side[0], mid[1] - side[1], 128, 168);
    });
    nc.moveTo(128, 168); nc.lineTo(128, 226);
  };
  nc.lineJoin = nc.lineCap = 'round';
  leaf(); nc.shadowColor = '#3bff7a'; nc.shadowBlur = 22; nc.strokeStyle = '#4dff86'; nc.lineWidth = 9; nc.stroke();
  leaf(); nc.shadowBlur = 0; nc.strokeStyle = '#dfffe8'; nc.lineWidth = 3.5; nc.stroke();
  const neonTexture = new THREE.CanvasTexture(neon); neonTexture.colorSpace = THREE.SRGBColorSpace;
  const neonMat = new THREE.MeshBasicMaterial({ map: neonTexture, toneMapped: false, side: THREE.DoubleSide });
  [s.z - .052, s.z + .052].forEach(z => quad([[s.x0, s.y1, z], [s.x1, s.y1, z], [s.x1, s.y0, z], [s.x0, s.y0, z]], [[0, 1], [1, 1], [1, 0], [0, 0]], neonMat).castShadow = false);
  return group;
}
