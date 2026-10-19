# Blender station models

Each station is built by a Python script, so a model can be rebuilt, re-tiered or re-lit from code and opened in
Blender on a Mac. The scripts came from the "Three.js shop diorama" thread (October 18, 2026); `canopy_kit.py` holds
the shared palette, brass, plants and buds, so keep it next to the station scripts.

| Script | Model | Game station |
|---|---|---|
| `grow_bench.py` | `public/models/grow_bench.glb` | grow (index 1) |
| `harvest_bench.py` | `public/models/harvest_bench.glb` | harvest (index 2) |
| `pack_bench.py` | `public/models/pack_bench.glb` | pack (index 3) |
| `pickup_desk.py` | `public/models/pickup_desk.glb` | pickup (index 5) |

All four are the tier 3 look; the 3D map shows them at every tier until tier 1 and 2 variants exist. Seeds, the
order desks and the online orders deck are still grey boxes.

`security_booth.py` builds all five security booth looks (Lv 1, 10, 30, 50, 75) from one script:
`blender -b -P security_booth.py -- OUT_DIR TIER` writes `security_booth_tierTIER.glb`. Every tier stands on the same
brass-edged mat, so the map scales all five alike.

Every station also has Lv 50 and Lv 75 looks (map keys `index.4` and `index.5`): `seeds_bench_tier4.py`,
`seeds_bench_tier5.py`, `grow_bench_tier4.py`, `grow_bench_tier5.py` (need `seedgrow45_parts.py`),
`harvest_bench_tier4.py`, `harvest_bench_tier5.py`, `pack_bench_tier4.py`, `pack_bench_tier5.py` (need `tier45_parts.py`)
and `order_desk_tier4.py`, `order_desk_tier5.py`, `pickup_desk_tier4.py`, `pickup_desk_tier5.py` (need `luxe_parts.py`).
They share tier 3's footprint, origin and facing.

## Rebuilding a model

1. Run the script in Blender 5.2 (`blender -b -P grow_bench.py -- OUT_DIR`, or paste it into the Scripting tab).
   It saves a `.blend`, exports a `.glb` and renders a transparent PNG at the game's 30° angle.
2. Compress the export into the game: `npx @gltf-transform/cli meshopt OUT_DIR/grow_bench.glb public/models/grow_bench.glb`.
   The 3D map loads it with Three.js's meshopt decoder.

The models stay in Blender units: the 3D map scales each one so it spans the same width on screen as the station's
tier 3 sprite (`stationSpriteSize` in `src/sunny-world.js`) and centres it on the station's footprint. A model must
face the camera the way its sprite does (Blender's camera looking along (-1, 1, -1), as `canopy_kit.finish` sets up).
