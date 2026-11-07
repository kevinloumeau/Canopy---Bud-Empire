// Slims the map's models for the phone budget, with no visible change at game zoom. Run it after any Blender export
// (and after `gltf-transform meshopt`, which it keeps): it only touches files it has not slimmed before, marking each
// one in asset.extras.canopySlim, so running it again is safe.
//
//   node scripts/slim-models.mjs                 # every model in public/models not slimmed yet
//   node scripts/slim-models.mjs a.glb b.glb     # just these (paths)
//   node scripts/slim-models.mjs --force a.glb   # again, even if already marked
//
// Props and stations: meshoptimizer's simplifier drops triangles that change the shape by under 0.2% of each part's
// size (bevels and round tubes with more segments than the map can show), keeping every part, name and material, so
// station-motion.js and compact.js still find their parts. The street props in JOIN are merged into one mesh per
// material first (the map bakes them that way anyway), so their tiny repeated pieces simplify as one shape.
// Vertex-coloured models are only marked. People (public/models/people): skinned, so left as they are, but their 1024px textures go to 512px, a quarter of
// the GPU memory each; a figure is at most a few hundred pixels tall even fully zoomed in on a phone.
import { NodeIO, PropertyType, VertexLayout } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, flatten, join, simplify, textureCompress, weld } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { basename, join as path } from 'node:path';

const ERROR = 0.002, TEXTURE = 512, JOIN = new Set(['street_queue_post.glb', 'street_lamp.glb']);
const MODELS = 'public/models';

await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready, MeshoptSimplifier.ready]);
// Separate vertex buffers, as Blender writes them: the map's merges (compact.js, shell.js) expect plain attributes.
const io = new NodeIO().setVertexLayout(VertexLayout.SEPARATE).registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });

const args = process.argv.slice(2), force = args.includes('--force');
let files = args.filter(a => !a.startsWith('--'));
if (!files.length) {
  const list = async dir => (await readdir(dir)).filter(f => f.endsWith('.glb')).map(f => path(dir, f));
  files = [...await list(MODELS), ...await list(path(MODELS, 'people'))];
}

const triangles = doc => doc.getRoot().listMeshes().reduce((n, m) => n + m.listPrimitives()
  .reduce((k, p) => k + (p.getIndices() ? p.getIndices().getCount() : p.getAttribute('POSITION').getCount()) / 3, 0), 0);

let before = 0, after = 0, done = 0;
for (const file of files) {
  const doc = await io.read(file), asset = doc.getRoot().getAsset(), extras = asset.extras || {};
  if (extras.canopySlim && !force) continue;
  const person = file.includes('/people/'), name = basename(file), was = triangles(doc);
  // Vertex-coloured models (the city blocks) keep their shape: the simplifier would smear their painted stripes.
  const painted = doc.getRoot().listMeshes().some(m => m.listPrimitives().some(p => p.getAttribute('COLOR_0')));
  if (painted) { asset.extras = { ...extras, canopySlim: { skipped: 'vertex colours' } }; await io.write(file, doc); continue; }
  if (person) {
    await doc.transform(textureCompress({ encoder: sharp, resize: [TEXTURE, TEXTURE] }));
  } else {
    if (JOIN.has(name)) await doc.transform(dedup(), flatten(), join({ keepNamed: false }));
    // Weld gives every part its own copy of a shared buffer; dedup shares identical ones again, so a part repeated
    // through the model (a bench's buds, a shelf's jars) stays one geometry on the GPU.
    await doc.transform(weld(), simplify({ simplifier: MeshoptSimplifier, ratio: 0, error: ERROR, lockBorder: false }),
      dedup({ propertyTypes: [PropertyType.ACCESSOR] }));
  }
  asset.extras = { ...extras, canopySlim: person ? { texture: TEXTURE } : { error: ERROR } };
  await io.write(file, doc);
  const now = triangles(doc);
  before += was; after += now; done++;
  console.log(name.padEnd(36), person ? `textures ≤ ${TEXTURE}px` : `${was} → ${now} triangles`);
}
console.log(`${done} file(s) slimmed${before ? `, ${before} → ${after} triangles` : ''}`);
