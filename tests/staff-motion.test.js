import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneRigged } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { staffPose, bindStaff, poseStaff, handInBody, STATION_ROLES } from '../src/three/staff-motion.js';
import { CYCLE } from '../src/three/station-motion.js';

const ROLES = [...STATION_ROLES, 'window', 'guard', 'host'];

// The game's GLBs carry textures that need a browser to decode; the skeleton and clips are all these tests need.
async function parse(file) {
  const b = fs.readFileSync(new URL('../public/models/people/' + file, import.meta.url));
  const len = b.readUInt32LE(12), json = JSON.parse(b.subarray(20, 20 + len).toString());
  delete json.images; delete json.textures; delete json.samplers;
  (json.materials || []).forEach(m => { delete m.emissiveTexture; delete m.normalTexture; delete m.occlusionTexture; if (m.pbrMetallicRoughness) { delete m.pbrMetallicRoughness.baseColorTexture; delete m.pbrMetallicRoughness.metallicRoughnessTexture; } });
  let text = JSON.stringify(json); while (text.length % 4) text += ' ';
  const head = Buffer.alloc(20), rest = b.subarray(20 + len);
  head.write('glTF', 0); head.writeUInt32LE(2, 4); head.writeUInt32LE(20 + text.length + rest.length, 8); head.writeUInt32LE(text.length, 12); head.write('JSON', 16);
  const out = Buffer.concat([head, Buffer.from(text), rest]);
  return new GLTFLoader().parseAsync(out.buffer.slice(out.byteOffset, out.byteOffset + out.length), '');
}

test('every role gives finite poses whose hands stay within reach, through a whole cycle', () => {
  for (const role of ROLES) for (let t = 0; t < 12; t += .05) for (const act of [0, 1]) {
    const p = staffPose(role, t, act);
    assert.ok(p, role);
    for (const k of ['lean', 'yaw', 'pitch']) assert.ok(Number.isFinite(p[k]) && Math.abs(p[k]) < .8, role + ' ' + k);
    for (const arm of ['left', 'right']) if (p[arm]) {
      const d = Math.hypot(...p[arm]);
      assert.ok(p[arm].every(Number.isFinite) && d > .3 && d < 1.0, role + ' ' + arm + ' reach ' + d + ' at ' + t);
    }
  }
});

test('poses move smoothly: no hand jumps between frames', () => {
  for (const role of ROLES) {
    let last = staffPose(role, 0, 1);
    for (let t = 1 / 60; t < 20; t += 1 / 60) {
      const p = staffPose(role, t, 1);
      for (const arm of ['left', 'right']) if (p[arm]) assert.ok(Math.hypot(p[arm][0] - last[arm][0], p[arm][1] - last[arm][1], p[arm][2] - last[arm][2]) < .06, role + ' ' + arm + ' jumps at ' + t.toFixed(2));
      last = p;
    }
  }
});

test('the packer bears down as the press ram drops, and the pickup clerk holds the bag out as it lifts', () => {
  const low = staffPose('pack', CYCLE[3] * .225).right[1], before = staffPose('pack', CYCLE[3] * .05).right[1];
  assert.ok(low < before - .2);
  const out = staffPose('pickup', CYCLE[5] * .75, 1).right, rest = staffPose('pickup', CYCLE[5] * .1, 1).right;
  assert.ok(out[2] > rest[2] + .3 && out[1] > rest[1] + .3);
  // No one at the counter: the clerk's hand stays at rest.
  assert.deepEqual(staffPose('pickup', CYCLE[5] * .75, 0).right, rest);
});

for (const file of ['green-uniform-woman.glb', 'chef.glb', 'security-guard.glb', 'staff-young.glb']) test(file + ': hands reach their targets on the real skeleton', async () => {
  const gltf = await parse(file), body = cloneRigged(gltf.scene), holder = new THREE.Group();
  holder.add(body); holder.scale.set(1.69, 1.69 / 1.3, 1.69); holder.rotation.y = .7;
  const mixer = new THREE.AnimationMixer(body);
  mixer.clipAction(gltf.animations.find(c => /^Idle/.test(c.name))).play();
  const rig = bindStaff(body);
  assert.ok(rig);
  const head = body.getObjectByName('mixamorigHead');
  for (const role of ROLES) for (const t of [0, 1.3, 2.9, 4.4]) {
    mixer.setTime(t);
    const targets = poseStaff(rig, role, t, 1);
    for (const arm of ['left', 'right']) if (targets[arm]) {
      const miss = handInBody(rig, arm).distanceTo(targets[arm]);
      assert.ok(miss < .03, file + ' ' + role + ' ' + arm + ' misses by ' + miss.toFixed(3));
    }
  }
  // Leaning forward takes the head forward (+z), not back.
  mixer.setTime(0);
  const at = () => { body.updateWorldMatrix(true, true); const m = new THREE.Matrix4().copy(body.matrixWorld).invert().multiply(head.matrixWorld); return new THREE.Vector3().setFromMatrixPosition(m); };
  const upright = at();
  mixer.setTime(0); poseStaff(rig, 'harvest', 0, 1);
  assert.ok(at().z > upright.z + .03);
});
