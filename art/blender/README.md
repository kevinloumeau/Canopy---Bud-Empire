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

The founder look (map keys `index.6`, unlocked by the Founder's finish perk at Lv 100, and Lv 75 for the door booth)
is the Lv 75 model rebuilt in ebony, emerald lacquer and gold by `founder_finish.py`, which recolours materials by name
and keeps every part name: `blender -b -P founder_finish.py -- OUT_DIR order_desk_tier5.py` writes
`order_desk_founder.glb` (`-- OUT_DIR security_booth.py 5` for the booth, then `gltf-transform meshopt` like the
other booth files).

## Rebuilding a model

1. Run the script in Blender 5.2 (`blender -b -P grow_bench.py -- OUT_DIR`, or paste it into the Scripting tab).
   It saves a `.blend`, exports a `.glb` and renders a transparent PNG at the game's 30° angle.
2. Compress the export into the game: `npx @gltf-transform/cli meshopt OUT_DIR/grow_bench.glb public/models/grow_bench.glb`.
   The 3D map loads it with Three.js's meshopt decoder.

The models stay in Blender units: the 3D map scales each one so it spans the same width on screen as the station's
tier 3 sprite (`stationSpriteSize` in `src/sunny-world.js`) and centres it on the station's footprint. A model must
face the camera the way its sprite does (Blender's camera looking along (-1, 1, -1), as `canopy_kit.finish` sets up).

`street_subway.py` builds `public/models/street_subway.glb`, the subway entrance on the right-hand pavement: a stair
well sunk below the pavement (the map cuts a hole through the slab for it, `SUBWAY` in `src/sunny-world.js`), green
railings on cream coping, brass globe lamps (`LampGlow`, lit at night) and a sign over the far rail.

## City round the shop (`city/`)

`city/city_buildings.py` builds the `city_*` terraces: 2 to 5 storeys on the lots of the ten terrace renders, shops on
the ground floor (sign boards, display windows with goods and posters, recessed doors, plain or striped awnings),
parapet trims and fire escapes. `city/city_props.py` builds the rooftop clutter (`roof_*`) and the extra street dressing
(`street_lp_*` low-poly kerbside pieces and parked car, scooters, recycling bins, shrub planters, tree grates). Both use
`city/city_kit.py`, which imports `canopy_kit` and `building_parts` from this folder and flattens every model to one
vertex-coloured material (plus a white `CarPaint` the game tints per parked car), so each kind is one instanced draw.
Run them with bpy (`python city_buildings.py -- OUT_DIR`); they write `city_meta.json`, whose bounds and roof heights
are copied into `MODEL_BOUNDS` in `src/sunny-world.js`.

## Online pickup window

`pickup_window.py` builds `public/models/pickup_window.glb`, the walk-up window on the floor's front edge that serves
online orders once the delivery deck is built (`src/pickup-window.js`): one bay of the storefront (same green frame,
brass beads, cream "ONLINE PICKUP" sign band in Bricolage and cornice), only 0.2 m deep, with a service hatch: an oak
ledge out over the pavement with a bell and a bag, a sliding pane pushed aside, and an oak shelf inside under the left half.
A glass feed tube (main.js `layout.transport`) rises out of the floor behind it and comes down onto that shelf. The clerk is the game's own staff figure. `aframe_sign.py` builds `public/models/aframe_sign.glb`, the chalkboard
A-frame on the pavement. Both are street props: copied as plain exports (no meshopt), since the map bakes props into
float geometry and quantized positions would be clamped to a metre.
