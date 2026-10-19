import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { rigStation, bindStation, moveStation, growth, CYCLE } from '../src/three/station-motion.js';

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
async function load(file) {
  const b = fs.readFileSync(new URL('../public/models/' + file, import.meta.url));
  const gltf = await loader.parseAsync(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength), '');
  return gltf.scene;
}
const kinds = rig => rig.parts.reduce((a, o) => { a[o.userData.motion.m] = (a[o.userData.motion.m] || 0) + 1; return a; }, {});

test('grow cycle runs seedling to full and back without a jump at the wrap', () => {
  assert.equal(growth(0), 0); assert.equal(growth(.8), 1);
  assert.ok(growth(.999) < .01);
  assert.ok(growth(.36) > .45 && growth(.36) < .55);
});

const MODELS = { 0: ['seeds_bench_tier1', 'seeds_bench_tier2', 'seeds_bench'], 1: ['grow_bench_tier1', 'grow_bench_tier2', 'grow_bench'], 2: ['harvest_bench_tier1', 'harvest_bench_tier2', 'harvest_bench'], 3: ['pack_bench_tier1', 'pack_bench_tier2', 'pack_bench'], 4: ['order_desk_tier1', 'order_desk_tier2', 'order_desk'], 5: ['pickup_desk_tier1', 'pickup_desk_tier2', 'pickup_desk'] };
const EXPECT = { 0: 'sprout', 1: 'plant', 2: 'trim', 3: 'press', 4: 'key', 5: 'handoff' };

for (const [index, files] of Object.entries(MODELS)) for (const file of files) test(file + ' rigs and animates with the station clock', async () => {
  const source = rigStation(await load(file + '.glb'), +index);
  const box = new THREE.Box3().setFromObject(source), meshes = [];
  source.traverse(o => { if (o.isMesh) meshes.push(o); });
  const clone = source.clone(), rig = bindStation(clone, +index);
  assert.ok(rig, 'has moving parts');
  assert.ok(kinds(rig)[EXPECT[index]] > 0, JSON.stringify(kinds(rig)));
  // Rigging only regroups parts: the model at rest is the same size.
  const after = new THREE.Box3().setFromObject(source);
  assert.ok(after.min.distanceTo(box.min) < 1e-6 && after.max.distanceTo(box.max) < 1e-6);
  // Mid-cycle at least one part has moved; a stopped clock leaves the pose unchanged frame to frame.
  const pose = () => { clone.updateMatrixWorld(true); const m = []; clone.traverse(o => { if (o.isMesh) m.push(...o.matrixWorld.elements); }); return m; };
  const settle = clock => { for (let i = 0; i < 120; i++) moveStation(rig, { clock, act: 1 }, 1 / 20); return pose(); };
  const a = settle(0), b = settle(CYCLE[index] * .2), m = settle(CYCLE[index] * .5);
  assert.ok(a.some((v, i) => Math.abs(v - b[i]) > 1e-4 || Math.abs(v - m[i]) > 1e-4), 'something moves');
  assert.ok(m.every(Number.isFinite));
  if (+index !== 4) { moveStation(rig, { clock: CYCLE[index] * .5, act: 1 }, 1 / 60); const c = pose(); assert.ok(m.every((v, i) => Math.abs(v - c[i]) < 1e-3), 'still when the clock stops'); }
  // The source keeps its rest pose, which the station menu pictures render.
  assert.ok(new THREE.Box3().setFromObject(source).max.distanceTo(box.max) < 1e-6);
  assert.equal(meshes.length > 0, true);
});
