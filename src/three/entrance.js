// The sprite shop's entrance (Kevin, 2026-10-19): a neon leaf OPEN blade sign that sticks out from the street door
// frame's post. The Blender doorway's flat corner canopy and its lamp are hidden (layout.fixtures `hide`); Kevin tried
// a striped awning there and dropped it. Positions come from layout.entrance (main.js): the facade's outer face x and
// the sign's box.
import * as THREE from 'three';

const GREEN = '#1f6b47', BRASS = '#d0a54e';

export function buildEntrance(world, layout, { span, model }) {
  const e = layout.entrance;
  if (!e) return null;
  const group = new THREE.Group();
  world.add(group);
  const wall = e.x;

  // A mesh from explicit corners in map units (the world group stretches heights).
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
  // The neon leaf: a blade sign hung from a green bracket off the door post, its faces toward the street either way.
  const s = e.sign, bracket = new THREE.Group();
  group.add(bracket);
  span(bracket, s.x0, wall, s.y1 + .08, s.y1 + .16, s.z - .05, s.z + .05, GREEN);
  [s.x0 + .12, s.x1 - .12].forEach(x => span(bracket, x - .015, x + .015, s.y1, s.y1 + .08, s.z - .015, s.z + .015, BRASS, { cast: false }));
  span(bracket, s.x0 - .04, s.x1 + .04, s.y0 - .04, s.y1 + .04, s.z - .05, s.z + .05, '#1d211f');
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
  [s.z - .052, s.z + .052].forEach(z => { const m = quad([[s.x0, s.y1, z], [s.x1, s.y1, z], [s.x1, s.y0, z], [s.x0, s.y0, z]], [[0, 1], [1, 1], [1, 0], [0, 0]], neonMat); m.castShadow = false; bracket.attach(m); });
  // The Blender bracket and panel (origin on the floor under the bracket's foot on the post) take over once loaded,
  // with the neon painted on both of its faces.
  if (model) model('blade_sign.glb', wall, 0, s.z, scene => {
    let faces = 0;
    scene.traverse(o => { if (o.isMesh && /^SignFace/.test(o.name)) { o.material = neonMat; o.castShadow = false; faces++; } });
    if (faces) bracket.visible = false; else scene.parent.visible = false;
  }, group);
  return group;
}
