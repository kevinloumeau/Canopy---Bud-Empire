import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { compactModel } from '../src/three/compact.js';
import { rigStation, bindStation } from '../src/three/station-motion.js';

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
async function load(file) {
  const b = fs.readFileSync(new URL('../public/models/' + file, import.meta.url));
  const gltf = await loader.parseAsync(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), '');
  return gltf.scene;
}
const meshes = root => { const out = []; root.traverse(o => { if (o.isMesh) out.push(o); }); return out; };
const triangles = root => meshes(root).reduce((n, o) => n + (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3, 0);
// The world-space outline of everything drawn in each material.
function outlines(root) {
  root.updateMatrixWorld(true);
  const out = new Map();
  meshes(root).forEach(o => {
    if (!out.has(o.material)) out.set(o.material, new THREE.Box3());
    out.get(o.material).union(new THREE.Box3().setFromObject(o, true));
  });
  return out;
}

test('a quantized station keeps every triangle where it was, in far fewer meshes', async () => {
  const scene = await load('security_booth_tier5.glb');
  scene.position.set(3, 1, -2); scene.scale.set(1.69, 1.2, 1.69);
  const before = outlines(scene), count = meshes(scene).length, tris = triangles(scene);
  compactModel(scene);
  const after = outlines(scene);
  assert.ok(meshes(scene).length < count / 3, `${meshes(scene).length} of ${count} meshes left`);
  assert.equal(triangles(scene), tris);
  before.forEach((box, mat) => {
    const now = after.get(mat);
    assert.ok(now, 'material ' + mat.name + ' still drawn');
    ['min', 'max'].forEach(k => ['x', 'y', 'z'].forEach(a => assert.ok(Math.abs(now[k][a] - box[k][a]) < 1e-3, `${mat.name} ${k}.${a}`)));
  });
});

test('moving station parts stay their own objects and still bind', async () => {
  const scene = await load('grow_bench_tier5.glb');
  rigStation(scene, 1);
  const tagged = []; scene.traverse(o => { if (o.userData.motion) tagged.push(o); });
  compactModel(scene);
  tagged.forEach(o => { let p = o; while (p.parent) p = p.parent; assert.equal(p, scene, o.name + ' still in the model'); });
  const rig = bindStation(scene.clone(), 1);
  assert.equal(rig.parts.length, tagged.length);
});

test('driven, hidden and see-through parts are left alone; mirrored parts keep their facing', () => {
  const root = new THREE.Group(), solid = new THREE.MeshLambertMaterial(), glass = new THREE.MeshLambertMaterial({ transparent: true });
  // Boxes come with a group per face, which glTF parts never have.
  const box = () => { const g = new THREE.BoxGeometry(1, 1, 1); g.clearGroups(); return g; };
  const add = (name, mat, x, sx = 1) => { const m = new THREE.Mesh(box(), mat); m.name = name; m.position.x = x; m.scale.x = sx; root.add(m); return m; };
  add('A', solid, 0); add('B', solid, 3, -1); add('Rotor', solid, 6); add('G1', glass, 9); add('G2', glass, 12);
  const hidden = new THREE.Group(); hidden.visible = false; root.add(hidden);
  const inside = new THREE.Mesh(box(), solid); hidden.add(inside);
  compactModel(root);
  const names = root.children.map(c => c.name).sort();
  assert.deepEqual(names, ['', 'G1', 'G2', 'Merged', 'Rotor']);
  assert.equal(inside.parent, hidden);
  // Every triangle of the merged mesh faces the way its normals point (counter-clockwise from outside).
  const g = root.children.find(c => c.name === 'Merged').geometry, p = g.attributes.position, n = g.attributes.normal, ix = g.index;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), face = new THREE.Vector3(), normal = new THREE.Vector3();
  for (let t = 0; t < ix.count; t += 3) {
    a.fromBufferAttribute(p, ix.getX(t)); b.fromBufferAttribute(p, ix.getX(t + 1)); c.fromBufferAttribute(p, ix.getX(t + 2));
    face.subVectors(b, a).cross(c.clone().sub(a));
    normal.fromBufferAttribute(n, ix.getX(t));
    assert.ok(face.dot(normal) > 0, 'triangle ' + t / 3 + ' faces out');
  }
});
