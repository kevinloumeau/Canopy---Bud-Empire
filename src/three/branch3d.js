// Branch scenes in the 3D map (phase 7). main.js runs each branch's own Canvas drawing (branch-maps.js) with the
// drawing primitives recording world shapes instead of painting (recordBranch): boxes, cords, flat polygons, ellipses
// and the text on wall faces. This layer turns one frame's record into a few instanced meshes and three merged polygon
// meshes, so the five hand-drawn blocks come to the 3D map from the same code that draws them in 2D.
//
// Shapes the 2D map draws inside lit() (lamps, glowing panes, signs) arrive marked lit: they are unlit here, so they
// keep their painted colour by day and glow against the darkened scene at night.
import * as THREE from 'three';

const MAX_BOXES = 5000, MAX_SEGMENTS = 8000, MAX_BLOBS = 4000, MAX_VERTS = 90000, MAX_LIGHTS = 8;
// The text canvases: 256 by 64 drawing pixels, at twice that resolution.
const FACE_W = 256, FACE_H = 64, FACE_RES = 2;

const parsed = new Map();
// '#rgb', '#rrggbb' and their alpha forms to [Color, alpha]; anything else (gradients) is null.
function parseColour(c) {
  if (typeof c !== 'string') return null;
  let hit = parsed.get(c);
  if (hit !== undefined) return hit;
  hit = null;
  if (c[0] === '#') {
    let hex = c.slice(1);
    if (hex.length === 3 || hex.length === 4) hex = hex.split('').map(h => h + h).join('');
    if (hex.length === 6 || hex.length === 8) hit = [new THREE.Color('#' + hex.slice(0, 6)), hex.length === 8 ? parseInt(hex.slice(6), 16) / 255 : 1];
  } else if (/^rgba?\(/.test(c)) {
    const n = c.match(/[\d.]+/g).map(Number);
    hit = [new THREE.Color(`rgb(${n[0]},${n[1]},${n[2]})`), n.length > 3 ? n[3] : 1];
  }
  parsed.set(c, hit);
  return hit;
}

export function createBranchLayer(parent) {
  const group = new THREE.Group();
  group.visible = false;
  parent.add(group);
  const matrix = new THREE.Matrix4(), position = new THREE.Vector3(), scale = new THREE.Vector3(), quaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3(), white = new THREE.Color('#ffffff');

  function instanced(geometry, max, mat, cast = true) {
    const mesh = new THREE.InstancedMesh(geometry, mat, max);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.setColorAt(0, white);
    mesh.count = 0; mesh.castShadow = cast; mesh.receiveShadow = true; mesh.frustumCulled = false;
    group.add(mesh);
    return mesh;
  }
  const lambert = opts => new THREE.MeshLambertMaterial({ color: '#ffffff', ...opts });
  const basic = opts => new THREE.MeshBasicMaterial({ color: '#ffffff', ...opts });
  const glassOpts = { transparent: true, opacity: .32, depthWrite: false };
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1).translate(0, .5, 0);
  const cordGeometry = new THREE.CylinderGeometry(.5, .5, 1, 8, 1).translate(0, .5, 0);
  const blobGeometry = new THREE.IcosahedronGeometry(1, 2), discGeometry = new THREE.CylinderGeometry(1, 1, .02, 20), faceDisc = new THREE.CircleGeometry(1, 24).rotateY(Math.PI / 4);
  const sets = {
    box: [instanced(boxGeometry, MAX_BOXES, lambert()), instanced(boxGeometry, 800, basic()), instanced(boxGeometry, 800, lambert(glassOpts), false)],
    cord: [instanced(cordGeometry, MAX_SEGMENTS, lambert()), instanced(cordGeometry, 1500, basic())],
    blob: [instanced(blobGeometry, MAX_BLOBS, lambert()), instanced(blobGeometry, 600, basic())],
    disc: [instanced(discGeometry, MAX_BLOBS, lambert(), false), instanced(discGeometry, 600, basic(), false)],
    // Upright discs facing the camera (a clock face, a round sign): the circle turned to face along (1, 0, 1).
    facing: [instanced(faceDisc, 600, lambert({ side: THREE.DoubleSide }), false), instanced(faceDisc, 300, basic({ side: THREE.DoubleSide }), false)]
  };

  // Flat polygons: merged each frame into one mesh per kind (lit, unlit, see-through), fanned from their first point.
  function polyMesh(mat, alpha) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_VERTS * 3), 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(MAX_VERTS * 3), 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_VERTS * (alpha ? 4 : 3)), alpha ? 4 : 3).setUsage(THREE.DynamicDrawUsage));
    g.setDrawRange(0, 0);
    Object.assign(mat, { vertexColors: true, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    const mesh = new THREE.Mesh(g, mat);
    // They take shadows but cast none: flat, double-sided and often lying on another surface, they would shade themselves.
    mesh.frustumCulled = false; mesh.receiveShadow = true;
    group.add(mesh);
    return { mesh, g, alpha, n: 0 };
  }
  const polys = [polyMesh(lambert(), false), polyMesh(basic(), false), polyMesh(lambert({ transparent: true, depthWrite: false }), true)];

  // Text and marks on wall faces, each a canvas laid on its wall; kept while the scene still draws it.
  const faces = new Map();
  function faceMesh(f, unit) {
    const key = f.x.toFixed(2) + ',' + f.y.toFixed(2) + ',' + f.z.toFixed(2) + ',' + f.alongZ;
    let mesh = faces.get(key);
    if (!mesh) {
      const canvas = document.createElement('canvas');
      canvas.width = FACE_W * FACE_RES; canvas.height = FACE_H * FACE_RES;
      const ctx = canvas.getContext('2d');
      ctx.scale(FACE_RES, FACE_RES); ctx.translate(FACE_W / 2, FACE_H / 2);
      // The 2D map draws a face in screen pixels: run of them per world unit along the wall, unit per unit of height.
      const run = unit * Math.SQRT1_2;
      try { f.draw(ctx, run); } catch (e) { /* a face that cannot draw here is left blank */ }
      const map = new THREE.CanvasTexture(canvas);
      map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4;
      mesh = new THREE.Mesh(new THREE.PlaneGeometry(FACE_W / run, FACE_H / unit), basic({ map, transparent: true, alphaTest: .05, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
      mesh.position.set(f.x, f.y, f.z);
      if (f.alongZ) mesh.rotation.y = Math.PI / 2;
      group.add(mesh);
      faces.set(key, mesh);
    }
    return mesh;
  }

  const lights = [];
  for (let i = 0; i < MAX_LIGHTS; i++) {
    const light = new THREE.PointLight('#ffd9a0', 0, 9, 1.4);
    group.add(light);
    lights.push(light);
  }

  function put(set, lit, glass, build) {
    const mesh = glass ? set[2] : set[lit ? 1 : 0];
    if (!mesh || mesh.count >= mesh.instanceMatrix.count) return null;
    build(matrix);
    mesh.setMatrixAt(mesh.count, matrix);
    return [mesh, mesh.count++];
  }
  function tint(hit, colourHit) { if (hit) hit[0].setColorAt(hit[1], colourHit[0]); }
  // Uploads only the part of a buffer in use: the buffers are sized for the busiest branch, and sending them whole
  // every frame moved megabytes to the graphics chip for a few hundred shapes.
  function upload(attr, count) {
    attr.clearUpdateRanges();
    if (count > 0) attr.addUpdateRange(0, count * attr.itemSize);
    attr.needsUpdate = true;
  }
  // A fingerprint of one kind of recorded shape, so a kind that drew the same as last frame (most of a branch stands
  // still) is neither rebuilt nor sent again.
  function fingerprint(list, fields) {
    let h = 2166136261 ^ list.length;
    const mix = v => { h = Math.imul(h ^ v, 16777619); };
    const value = v => {
      if (typeof v === 'number') mix(Math.round(v * 4096));
      else if (typeof v === 'string') for (let i = 0; i < v.length; i++) mix(v.charCodeAt(i));
      else if (Array.isArray(v)) { mix(v.length); v.forEach(value); }
      else mix(v ? 1 : 0);
    };
    list.forEach(item => fields.forEach(f => value(item[f])));
    return h;
  }
  const last = {};
  function changed(kind, list, fields) {
    const h = fingerprint(list, fields);
    if (last[kind] === h) return false;
    last[kind] = h;
    return true;
  }
  function begin(list) { list.forEach(m => { m.count = 0; }); }
  function finish(list) {
    list.forEach(m => {
      upload(m.instanceMatrix, m.count);
      if (m.instanceColor) upload(m.instanceColor, m.count);
    });
  }

  return {
    group,
    update(scene, night) {
      if (changed('boxes', scene.boxes, ['x', 'y', 'z', 'w', 'd', 'h', 'c', 'lit'])) {
        begin(sets.box);
        scene.boxes.forEach(b => {
          const c = parseColour(b.c);
          if (!c || c[1] < .05) return;
          tint(put(sets.box, b.lit, c[1] < .9, m => m.compose(position.set(b.x, b.y, b.z), quaternion.identity(), scale.set(Math.max(.01, b.w), Math.max(.01, b.h), Math.max(.01, b.d)))), c);
        });
        finish(sets.box);
      }
      if (changed('lines', scene.lines, ['pts', 'c', 'w', 'lit'])) {
        begin(sets.cord);
        scene.lines.forEach(l => {
          const c = parseColour(l.c);
          if (!c || c[1] < .5) return;
          const w = Math.max(.02, l.w);
          for (let i = 1; i < l.pts.length; i++) {
            const a = l.pts[i - 1], b = l.pts[i];
            dir.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
            const len = dir.length();
            if (len < 1e-4) continue;
            dir.divideScalar(len);
            tint(put(sets.cord, l.lit, false, m => m.compose(position.set(a[0], a[1], a[2]), quaternion.setFromUnitVectors(up, dir), scale.set(w, len, w))), c);
          }
        });
        finish(sets.cord);
      }
      if (changed('ellipses', scene.ellipses, ['at', 'rx', 'ry', 'c', 'lit'])) {
        const round = sets.blob.concat(sets.disc, sets.facing);
        begin(round);
        scene.ellipses.forEach((e, order) => {
          const c = parseColour(e.c);
          if (!c || c[1] < .5) return;
          // A wide, flat ellipse is a disc lying on the surface (a pond, a pebble, a plate); a taller-than-wide one is
          // an upright disc facing the camera, standing a little proud of its wall and each later one a hair nearer, so
          // it paints over the last like the 2D map's; anything between is a solid seen from the camera (a canopy).
          const flat = e.ry / e.rx < .66, r = e.rx, toCamera = .08 + order * .0015;
          if (e.ry > e.rx * 1.05) tint(put(sets.facing, e.lit, false, m => m.compose(position.set(e.at[0] + toCamera, e.at[1], e.at[2] + toCamera), quaternion.identity(), scale.set(e.rx, e.ry, e.rx))), c);
          else if (flat) tint(put(sets.disc, e.lit, false, m => m.compose(position.set(e.at[0], e.at[1], e.at[2]), quaternion.identity(), scale.set(r, 1, r))), c);
          else tint(put(sets.blob, e.lit, false, m => m.compose(position.set(e.at[0], e.at[1], e.at[2]), quaternion.identity(), scale.set(r, Math.max(.4, e.ry / e.rx) * r, r))), c);
        });
        finish(round);
      }
      if (changed('polys', scene.polys, ['pts', 'c', 'lit'])) {
        polys.forEach(p => { p.n = 0; });
        const n = new THREE.Vector3();
        scene.polys.forEach(p => {
          const c = parseColour(p.c);
          if (!c || c[1] < .08 || p.pts.length < 3) return;
          const set = polys[c[1] < .9 ? 2 : p.lit ? 1 : 0], tris = p.pts.length - 2;
          if (set.n + tris * 3 > MAX_VERTS) return;
          const P = set.g.attributes.position.array, N = set.g.attributes.normal.array, C = set.g.attributes.color.array, k = set.alpha ? 4 : 3;
          const o = p.pts[0];
          // The normal over the whole outline (Newell's method): an arch repeats its first corner, so the first three
          // points alone can give no normal at all, which lit the arched windows black.
          n.set(0, 0, 0);
          for (let i = 0; i < p.pts.length; i++) {
            const a = p.pts[i], b = p.pts[(i + 1) % p.pts.length];
            n.x += (a[1] - b[1]) * (a[2] + b[2]); n.y += (a[2] - b[2]) * (a[0] + b[0]); n.z += (a[0] - b[0]) * (a[1] + b[1]);
          }
          if (n.lengthSq() < 1e-12) return;
          // Face the normal up or toward the camera side, and wind the triangles to match: double-sided shading turns
          // the normal round on a triangle seen from behind.
          const flip = n.y < -1e-6 || (Math.abs(n.y) < 1e-6 && n.x + n.z < 0);
          if (flip) n.negate();
          n.normalize();
          for (let t = 1; t <= tris; t++) (flip ? [o, p.pts[t + 1], p.pts[t]] : [o, p.pts[t], p.pts[t + 1]]).forEach(v => {
            const i = set.n++;
            P[i * 3] = v[0]; P[i * 3 + 1] = v[1]; P[i * 3 + 2] = v[2];
            N[i * 3] = n.x; N[i * 3 + 1] = n.y; N[i * 3 + 2] = n.z;
            C[i * k] = c[0].r; C[i * k + 1] = c[0].g; C[i * k + 2] = c[0].b; if (set.alpha) C[i * k + 3] = c[1];
          });
        });
        polys.forEach(p => {
          p.g.setDrawRange(0, p.n);
          ['position', 'normal', 'color'].forEach(a => upload(p.g.attributes[a], p.n));
        });
      }
      const used = new Set();
      scene.faces.forEach(f => used.add(faceMesh(f, scene.unit)));
      faces.forEach(mesh => { mesh.visible = used.has(mesh); });
      // The scene's light fixtures (its glow() calls) light their surroundings after dark, the biggest first.
      const fixtures = (scene.fixtures || []).slice().sort((a, b) => b.size - a.size);
      lights.forEach((light, i) => {
        const f = fixtures[i];
        // Lights stay in the scene at zero when unused: changing how many there are recompiles every material.
        light.intensity = f ? night * 6 * Math.min(1.5, f.size) : 0;
        if (f) light.position.set(f.x, f.y, f.z);
      });
    }
  };
}
