import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Every Meshy person's arms hang on their own side of the body. The overalls and punk-jacket shoppers were built with
// an upper-arm turn that swung each arm across the chest (the wrist landed the right distance out, on the wrong side),
// so in the game one arm stuck out stiffly and the other sank into the body, and their walk flung an arm up and out.
const PEOPLE = fs.readdirSync(new URL('../public/models/people/', import.meta.url)).filter(f => f.endsWith('.glb'));

// The game's GLBs carry textures that need a browser to decode; the skeleton, skin and clips are all these tests need.
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

function rig(gltf) {
  const o = gltf.scene, mixer = new THREE.AnimationMixer(o);
  let skin; o.traverse(m => { if (m.isSkinnedMesh) skin = m; });
  const at = name => o.getObjectByName(name).getWorldPosition(new THREE.Vector3());
  function play(test, t) {
    const clip = gltf.animations.find(c => test.test(c.name));
    mixer.stopAllAction(); const a = mixer.clipAction(clip); a.reset().play(); a.time = t * clip.duration; mixer.update(0); o.updateMatrixWorld(true);
    // The figure's own frame: forward from the head to the 'headfront' bone, side = forward x up (the figure's left).
    const forward = at('headfront').sub(at('mixamorigHead')); forward.y = 0; forward.normalize();
    return { forward, side: forward.clone().cross(new THREE.Vector3(0, 1, 0)).multiplyScalar(-1).normalize(), hips: at('mixamorigHips'), height: at('mixamorigHead').y - at('mixamorigHips').y + .5 };
  }
  // Where the skin of a bone's hand actually is (the bones can sit away from the surface they drive).
  function handSkin(side) {
    const bone = skin.skeleton.bones.findIndex(b => b.name === 'mixamorig' + side + 'Hand'), si = skin.geometry.attributes.skinIndex, sw = skin.geometry.attributes.skinWeight;
    const v = new THREE.Vector3(), sum = new THREE.Vector3(); let n = 0;
    for (let i = 0; i < si.count; i++) for (let k = 0; k < 4; k++) if (si.getComponent(i, k) === bone && sw.getComponent(i, k) > .5) { skin.getVertexPosition(i, v); sum.add(v.applyMatrix4(skin.matrixWorld)); n++; }
    return sum.divideScalar(n);
  }
  return { at, play, handSkin };
}

test('every person stands with each hand beside its own hip, not across the body', async () => {
  for (const file of PEOPLE) {
    const r = rig(await parse(file));
    for (const t of [0, .25, .5, .75]) {
      const f = r.play(/^Idle/, t);
      for (const [side, sign] of [['Left', 1], ['Right', -1]]) {
        const shoulder = r.at('mixamorig' + side + 'Arm').sub(f.hips).dot(f.side), hand = r.handSkin(side).sub(f.hips);
        assert.ok(Math.sign(shoulder) === sign, file + ' ' + side + ' shoulder on its side');
        const out = hand.dot(f.side) * sign / f.height, ahead = hand.dot(f.forward) / f.height;
        assert.ok(out > .08 && out < .3, `${file} ${side} hand ${out.toFixed(2)} out from the hips at ${t}`);
        assert.ok(Math.abs(ahead) < .12, `${file} ${side} hand ${ahead.toFixed(2)} ahead of the hips at ${t}`);
      }
    }
  }
});

test('walking, every hand swings at the hip on its own side and never lifts out', async () => {
  for (const file of PEOPLE) {
    const r = rig(await parse(file));
    for (let t = 0; t < 1; t += .125) {
      const f = r.play(/^Walking$/, t);
      for (const [side, sign] of [['Left', 1], ['Right', -1]]) {
        const hand = r.handSkin(side).sub(f.hips), out = hand.dot(f.side) * sign / f.height, up = hand.y / f.height;
        assert.ok(out > -.15 && out < .3, `${file} ${side} walking hand ${out.toFixed(2)} out at ${t}`);
        assert.ok(up < .1, `${file} ${side} walking hand ${up.toFixed(2)} above the hips at ${t}`);
      }
    }
  }
});
