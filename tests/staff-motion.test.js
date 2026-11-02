import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneRigged } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { staffPose, bindStaff, poseStaff, poseCarry, handInBody, relaxHand, HAND_NARROW, STATION_ROLES } from '../src/three/staff-motion.js';
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
  // Staff stand tall at work: the head stays over the body rather than pushing forward of it.
  mixer.setTime(0);
  const at = () => { body.updateWorldMatrix(true, true); const m = new THREE.Matrix4().copy(body.matrixWorld).invert().multiply(head.matrixWorld); return new THREE.Vector3().setFromMatrixPosition(m); };
  const upright = at();
  mixer.setTime(0); poseStaff(rig, 'harvest', 0, 1);
  const dz = at().z - upright.z;
  assert.ok(Math.abs(dz) < .015, file + ' head moves ' + dz.toFixed(3));
});

for (const file of ['beanie-character.glb', 'chef-woman.glb']) test(file + ': a shopper carrying a bag holds it out from the hip, walking or standing', async () => {
  const gltf = await parse(file), body = cloneRigged(gltf.scene), holder = new THREE.Group();
  holder.add(body); holder.scale.set(1.69, 1.69 / 1.3, 1.69); holder.rotation.y = -1.1;
  const mixer = new THREE.AnimationMixer(body), rig = bindStaff(body);
  assert.ok(rig);
  const walk = mixer.clipAction(gltf.animations.find(c => /^Walking$/.test(c.name))); walk.play();
  for (const t of [0, .3, .6, .9]) for (const swing of [-1, 0, 1]) {
    mixer.setTime(t + swing * .01);
    const free = handInBody(rig, 'right'), target = poseCarry(rig, swing, 1), hand = handInBody(rig, 'right');
    assert.ok(hand.distanceTo(target) < .03, file + ' misses by ' + hand.distanceTo(target).toFixed(3));
    // Out to the figure's right (-x), past where the walk swings it, and no higher, so the bag hangs clear of the leg.
    assert.ok(hand.x < -.15 && hand.x < free.x - .03, file + ' hand not out from the hip ' + hand.x.toFixed(3));
    assert.ok(hand.y < free.y + .05, file + ' hand raised ' + (hand.y - free.y).toFixed(3));
  }
});

test('working hands relax: curled toward the palm, fingers drawn in, gently moving, and back to the idle at w 0', () => {
  const hand = new THREE.Bone(), fingers = new THREE.Vector3(0, 1, 0), palm = new THREE.Vector3(0, 0, 1);
  const tip = (side, t, w) => { hand.quaternion.identity(); hand.scale.set(1, 1, 1); relaxHand(hand, side, t, w); return fingers.clone().applyQuaternion(hand.quaternion); };
  for (const side of [1, -1]) {
    const seen = [];
    for (let t = 0; t < 12; t += .25) {
      const f = tip(side, t, 1);
      // Fingertips tip toward the palm side (+z), never back: a soft 20 to 45 degree curl.
      const curl = Math.atan2(f.dot(palm), f.y);
      assert.ok(curl > .35 && curl < .8, 'curl ' + curl.toFixed(2));
      assert.ok(Math.abs(hand.scale.x - HAND_NARROW) < 1e-9 && hand.scale.y < 1 && hand.scale.z === 1);
      seen.push(curl);
    }
    assert.ok(Math.max(...seen) - Math.min(...seen) > .05, 'the hand moves a little');
    tip(side, 3, 0);
    assert.ok(hand.quaternion.angleTo(new THREE.Quaternion()) < 1e-9 && hand.scale.x === 1, 'w 0 leaves the idle hand');
  }
});
