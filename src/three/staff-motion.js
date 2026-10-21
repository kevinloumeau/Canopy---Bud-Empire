import * as THREE from 'three';

// Staff work motion: each rigged staff figure (Kevin's Meshy characters, Mixamo skeleton) plays its idle, and on top of
// it its arms, spine and head are posed for the job at its post. staffPose() says where the hands go and how the body
// leans, as a pure function of the role and the post's clock; poseStaff() reaches the hands there with two-bone IK.
// Stations use their own motion clock (station-motion.js's CYCLE), so the packer's hands come down with the press ram
// and the pickup clerk lifts a bag as the counter's bag lifts off. The hands keep the idle's wrists (no bent-back
// wrists): only the upper arm and forearm are turned.
// Body frame (the model's own): +z forward, +y up, +x the figure's left. Hand targets are given from the shoulder in
// units of the arm's full reach, with x outward from that arm's side, so one pose fits every model.

import { CYCLE } from './station-motion.js';

const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const ease = v => { v = clamp01(v); return v * v * (3 - 2 * v); };
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
// A bump that rises and falls inside [from, to] of a 0..1 phase.
const bump = (p, from, to) => Math.sin(Math.PI * clamp01((p - from) / (to - from)));
const blendPose = (a, b, t) => ({ lean: a.lean + (b.lean - a.lean) * t, yaw: a.yaw + (b.yaw - a.yaw) * t, pitch: a.pitch + (b.pitch - a.pitch) * t, left: mix(a.left, b.left, t), right: mix(a.right, b.right, t) });
// A hash in 0..1 for picking the next spot from a whole number.
const pick = (n, salt) => { const s = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453; return s - Math.floor(s); };

// Staff roles by post. Station i is seeds, grow, harvest, pack, (order desks are 'desk'), pickup.
export const STATION_ROLES = ['seeds', 'grow', 'harvest', 'pack', 'desk', 'pickup'];

// role, clock in seconds, act 0..1 (is the post serving someone now). Returns { lean, yaw, pitch, left, right }:
// lean forward and head turn (yaw, + to the figure's left) and nod (pitch, + down) in radians; each hand target is
// [out, up, forward] from its shoulder in reaches, or null to leave that arm to the idle.
export function staffPose(role, clock, act = 1) {
  const t = clock || 0;
  switch (role) {
    case 'seeds': {
      // Dibbing seeds into the tray: the right hand presses one cell after another along the row, the left steadies it.
      const beat = t * 1.3, cell = Math.floor(beat), p = beat - cell, dip = bump(p, .25, .75);
      // Along the row and back (cells 0 1 2 3 4 3 2 1), a cell each beat.
      const row = c => { c %= 8; return -.25 + .125 * (c < 5 ? c : 8 - c); };
      const along = row(cell), next = row(cell + 1), x = p > .75 ? along + (next - along) * ease((p - .75) / .25) : along;
      return { lean: .22, yaw: -x * .5, pitch: .38, left: [.05, -.62, .5], right: [x, -.5 - .14 * dip, .62] };
    }
    case 'grow': {
      // Tending the plants: the right hand goes from plant to plant and works through the leaves; eyes follow it.
      const span = 3, n = Math.floor(t / span), p = (t - n * span) / span;
      const at = k => [-.2 + .45 * pick(k, 1), -.42 + .2 * pick(k, 2), .72 + .12 * pick(k, 3)];
      const hand = p < .3 ? mix(at(n - 1), at(n), ease(p / .3)) : at(n);
      const work = p > .3 ? Math.sin((p - .3) * 26) * .035 : 0;
      hand[0] += work; hand[1] += Math.abs(work) * .6;
      return { lean: .12, yaw: -hand[0] * .6, pitch: .15 - hand[1] * .3, left: null, right: hand };
    }
    case 'harvest': {
      // Trimming at the board: the left hand holds the plant, the right snips round it, and every few seconds lays a
      // trimmed bud out on the tray at its side.
      const span = CYCLE[2] / 3, p = (t % span) / span, lay = bump(p, .72, 1);
      const snip = Math.sin(t * 13) * .025, round = Math.sin(t * 1.7) * .06;
      const right = mix([-.02 + round, -.48 + snip, .5], [.32, -.62, .42], lay);
      return { lean: .3, yaw: -.25 * lay, pitch: .45, left: [-.08, -.5, .55], right };
    }
    case 'pack': {
      // The press stroke (as station-motion moves PressRam: .1 to .35 of the cycle) with both hands on its handle,
      // then pouches from the tray into the crate one after another, and back to the handle for the next batch.
      const p = (t / CYCLE[3]) % 1, press = bump(p, .1, .35);
      const handle = d => { const h = [.08, -.24 - .26 * d, .55]; return { lean: .1 + .18 * d, yaw: 0, pitch: .3, left: h, right: h.slice() }; };
      const fill = swing => ({ lean: .2, yaw: -.35 + .7 * swing, pitch: .4, left: [.08, -.55, .5], right: mix([.36, -.6, .42], [-.02, -.52, .62], swing) });
      if (p < .37) return handle(press);
      if (p < .45) return blendPose(handle(0), fill(0), ease((p - .37) / .08));
      if (p < .87) { const q = (p - .45) / .42 * 4, f = q - Math.floor(q); return fill(f < .5 ? ease(f / .5) : 1 - ease((f - .5) / .5)); }
      return blendPose(fill(0), handle(0), ease((p - .87) / .1));
    }
    case 'desk': {
      // At the order desk: typing while a customer orders, glancing up at them now and then; hands rest on the desk.
      const type = act * .03, look = act * (Math.sin(t * .9) > .6 ? 1 : 0);
      return {
        lean: .1, yaw: 0, pitch: .3 - .35 * look,
        left: [.04, -.55 + type * Math.max(0, Math.sin(t * 19)), .55],
        right: [.04, -.55 + type * Math.max(0, Math.sin(t * 19 + 2.2)), .57],
      };
    }
    case 'pickup': case 'window': {
      // Handing over an order: down to the bag on the counter, lift it, hold it out to the customer, back. The counter's
      // own bags lift at .4 to .7 of the cycle (station-motion's handoff); the window clerk keeps the same beat.
      const p = (t / CYCLE[5]) % 1, k = act;
      const rest = [.12, -.62, .42], take = [.12, -.66, .55], out = [.08, -.22, .88];
      let right = rest;
      if (p < .4) right = mix(rest, take, ease((p - .25) / .15));
      else if (p < .7) right = mix(take, out, ease((p - .4) / .3));
      else if (p < .85) right = out;
      else right = mix(out, rest, ease((p - .85) / .15));
      right = mix(rest, right, k);
      return { lean: .12 + .08 * k * bump(p, .3, .9), yaw: 0, pitch: .3 - .25 * k * bump(p, .45, .9), left: [.12, -.62, .4], right };
    }
    case 'guard': {
      // On the door: hands clasped in front, standing tall, scanning the room and the door in slow looks with holds.
      const scan = Math.sin(t * .45) + .35 * Math.sin(t * 1.1);
      return { lean: -.04, yaw: .55 * Math.max(-1, Math.min(1, scan * 1.2)), pitch: .05, left: [-.42, -.72, .32], right: [-.38, -.72, .36] };
    }
    case 'host': {
      // The lounge host: hands loosely together, looking over the roof, and now and then a welcoming open hand.
      const span = 9, p = (t % span) / span, wave = bump(p, .6, .9);
      return {
        lean: 0, yaw: .4 * Math.sin(t * .35) + .3 * wave, pitch: .05,
        left: [-.38, -.62, .42], right: mix([-.34, -.62, .45], [.45, -.32, .62], wave),
      };
    }
  }
  return null;
}

// GLTFLoader drops the colon from Mixamo's bone names (mixamorig:Hips loads as mixamorigHips).
const A = 'mixamorig';
const ARM = { left: [A + 'LeftArm', A + 'LeftForeArm', A + 'LeftHand'], right: [A + 'RightArm', A + 'RightForeArm', A + 'RightHand'] };
const POSED = [A + 'Spine', A + 'Spine2', A + 'Neck', A + 'Head', ...ARM.left.slice(0, 2), ...ARM.right.slice(0, 2)];

// The bones one staff copy needs (null when its skeleton isn't the Mixamo one these poses are for).
export function bindStaff(body) {
  const bones = {};
  body.traverse(o => { if (o.isBone && o.name.startsWith(A)) bones[o.name.replace(':', '')] = o; });
  if (!POSED.every(n => bones[n]) || !bones[ARM.left[2]] || !bones[ARM.right[2]]) return null;
  return { body, bones, idle: POSED.map(() => new THREE.Quaternion()), targets: {}, weight: 0 };
}

const inv = new THREE.Matrix4(), rel = new THREE.Matrix4(), scale = new THREE.Vector3();
const pq = new THREE.Quaternion(), bq = new THREE.Quaternion(), dq = new THREE.Quaternion(), aq = new THREE.Quaternion();
const sp = new THREE.Vector3(), ep = new THREE.Vector3(), hp = new THREE.Vector3(), tp = new THREE.Vector3();
const u = new THREE.Vector3(), v = new THREE.Vector3(), a = new THREE.Vector3(), b = new THREE.Vector3();
const ce = new THREE.Vector3(), cw = new THREE.Vector3(), X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0);
// A bone's position and rotation in the body frame. Taking the body's world matrix back out cancels the map's
// non-uniform height scale on the holder, so these are rigid.
function inBody(bone, pos, quat) {
  bone.updateWorldMatrix(true, false);
  rel.multiplyMatrices(inv, bone.matrixWorld).decompose(pos || tp, quat || bq, scale);
}
// Turns a bone by `delta`, a rotation in the body frame.
function turn(bone, delta) {
  inBody(bone.parent, null, pq); inBody(bone, null, bq);
  bone.quaternion.copy(pq.invert().multiply(dq.copy(delta).multiply(bq)));
}
function turnAbout(bone, axis, angle) { if (angle) turn(bone, aq.setFromAxisAngle(axis, angle)); }
// Turns a bone so its child lies along `to` (body-frame direction), the smallest turn that does.
function aim(bone, child, to) {
  inBody(bone, a); inBody(child, b);
  turn(bone, dq.setFromUnitVectors(b.sub(a).normalize(), to));
}
// Two-bone reach: the hand to `target` (body frame), the elbow bent out to the side and back, as an arm hangs.
function reach(bones, names, side, target) {
  const upper = bones[names[0]], fore = bones[names[1]], hand = bones[names[2]];
  inBody(upper, sp); inBody(fore, ep); inBody(hand, hp);
  const la = ep.distanceTo(sp), lb = hp.distanceTo(ep), d = Math.max(.05 * (la + lb), Math.min((la + lb) * .995, tp.copy(target).distanceTo(sp)));
  u.copy(target).sub(sp).normalize();
  const cosA = Math.max(-1, Math.min(1, (la * la + d * d - lb * lb) / (2 * la * d))), sinA = Math.sqrt(1 - cosA * cosA);
  v.set(side * .55, -.45, -.5); v.addScaledVector(u, -v.dot(u)).normalize();
  const elbow = a.copy(sp).addScaledVector(u, la * cosA).addScaledVector(v, la * sinA), wrist = b.copy(sp).addScaledVector(u, d);
  const toElbow = ce.subVectors(elbow, sp).normalize(), toWrist = cw.subVectors(wrist, elbow).normalize();
  aim(upper, fore, toElbow);
  aim(fore, hand, toWrist);
}

// Poses one staff copy for its post, after its mixer has played the idle. w (0..1) eases between the idle and the
// work pose, so a figure settles into work rather than snapping. Returns the hand targets (body frame) for tests.
export function poseStaff(rig, role, clock, act, w = 1) {
  const pose = staffPose(role, clock, act);
  if (!rig || !pose || w <= 0) return null;
  const { body, bones } = rig;
  POSED.forEach((n, i) => rig.idle[i].copy(bones[n].quaternion));
  body.updateWorldMatrix(true, false);
  inv.copy(body.matrixWorld).invert();
  // Lean from the waist (split over two spine bones), then the head's turn and nod on the neck and head.
  turnAbout(bones[A + 'Spine'], X, pose.lean * .5); turnAbout(bones[A + 'Spine2'], X, pose.lean * .5);
  turnAbout(bones[A + 'Neck'], Y, pose.yaw * .5); turnAbout(bones[A + 'Head'], Y, pose.yaw * .5);
  turnAbout(bones[A + 'Head'], X, pose.pitch);
  const out = {};
  [['left', 1], ['right', -1]].forEach(([arm, side]) => {
    const h = pose[arm];
    if (!h) return;
    const names = ARM[arm];
    inBody(bones[names[0]], sp); inBody(bones[names[1]], ep); inBody(bones[names[2]], hp);
    const r = ep.distanceTo(sp) + hp.distanceTo(ep), target = (rig.targets[arm] = rig.targets[arm] || new THREE.Vector3()).set(sp.x + side * h[0] * r, sp.y + h[1] * r, sp.z + h[2] * r);
    reach(bones, names, side, target);
    out[arm] = target;
  });
  if (w < 1) POSED.forEach((n, i) => bones[n].quaternion.slerp(rig.idle[i], 1 - w));
  return out;
}
// Where a hand is now, in the body frame (for tests).
export function handInBody(rig, arm) {
  rig.body.updateWorldMatrix(true, false);
  inv.copy(rig.body.matrixWorld).invert();
  const p = new THREE.Vector3();
  inBody(rig.bones[ARM[arm][2]], p);
  return p;
}
