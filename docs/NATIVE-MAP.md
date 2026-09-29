# Native iOS map

The iOS build now renders the shop and all five branches with Metal. The browser build retains Canvas and its classic Safari-compatible bundle. The user's September 27 approval explicitly supersedes the earlier requirement to preserve Canvas **for the iOS map**.

## Architecture

- `src/native-map.js` exports the existing world geometry as compact, versioned Float32 instance packets. No Canvas screenshots or textures are sent to Metal. Architecture, station upgrades, construction, animated production, branch projects, customers and delivery drones continue to use the existing simulation and scene layout.
- `CanopyMapRenderer.swift` renders instanced beveled boxes, ellipsoids, cylinders and triangulated faces through a real depth buffer. A directional shadow pass, hemisphere fill, material highlights and up to 32 clustered fixture lights establish depth by day and night.
- `CanopyMapShaders.txt` contains Metal shader source, compiled once during renderer initialization and cached by the platform. It is deliberately a bundled text resource so building the app does not require downloading the optional Xcode Metal toolchain.
- The existing accessible web controls, station markers, text and fine effects remain in a transparent overlay. UIKit still draws the tab bar. Metal uses the same fixed projection, scale and pan origin as selection and labels; no rotation is introduced.
- The native map fits the complete main shop into the largest available area around the panel, accounting for the status bar. Riverside and Alpine have actual river-channel openings rather than relying on painter order to cover an unbroken ground slab.

Only one packet may be outstanding. Acknowledgment follows GPU completion. Paused gameplay requests fewer frames; Low Power Mode limits the native scene to 20 fps, with a normal target of 30 fps. Frame production stops with the existing app/document suspension behavior. An unavailable renderer, invalid packet, GPU failure or bridge timeout restores the Canvas view. Late acknowledgments cannot hide that fallback.

## Saves and distribution

The renderer does not own gameplay or progress. `shift-save`, native Preferences backup, offline settlement and purchase logic are unchanged. The Site identity is unchanged. No deployment, App Store submission or TestFlight upload is part of this change.

## Validation

- Production/classic build and Capacitor synchronization.
- 98 unit tests, including projection, material alpha, concave polygon triangulation and bridge backpressure.
- Native bridge browser checks at 390×844 and 1440×900: geometry packets, station upgrades, panel switching, drag, pinch, fixed orientation, zoom/selection, exact paused save/reload and failure recovery.
- Existing native navigation, backup ordering, corrupted-local recovery and suspension-deduplication suite at phone and desktop sizes.
- Debug simulator and unsigned Release iPhone builds.
- Native iPhone and iPad live checks: upgrades charge and increase levels, Staff opens, zoom and station selection work, and each run completes 300 pickups with zero order-before-pickup violations across more than 200 samples.
- Real Metal frame acknowledgments and screenshots on isolated iPhone and iPad simulators; day/night main shop and all five branches on iPhone, plus main shop and Riverside on iPad.

`tests/fixtures/native-map-ios-review.js` is an isolated review fixture, loaded only through the Debug-only `CANOPY_MAP_REVIEW_SCRIPT` launch environment. It is never activated in a Release build. The fixture must only be used in a disposable simulator because it seeds test progress.

Physical-device GPU pacing, battery/thermal behavior and gesture feel are not established by simulator or browser results. The current implementation should receive an on-device pass before distribution.

### Imported tie-dye customer

The low-poly Meshy character is an additional native customer style (one quarter of customer IDs); staff and remaining customer styles are preserved. `scripts/import-meshy-character.py <zip>` prepares the supplied rigged ZIP into `ios/App/App/Characters` and regenerates `src/character-clips.js`. The manifest records the source ZIP SHA-256. One 4,156-triangle mesh, one 1024px base-color texture and a shared 23-bone animation atlas use about 1 MB. Idle and walking poses blend on the GPU; gait follows distance traveled, heading follows the game path, and shopping bags follow the animated right hand. The running clip is retained in the atlas for future use. Playback speed accelerates the existing walk cycle; it does not change the simulation.

Assets load once, participate in scene lighting/depth/shadows, and fall back to procedural customers if unavailable. Original emissive/specular export settings are intentionally omitted. Reduced motion selects a fixed idle pose. Browser Canvas customers and saves are unchanged.

### Caramel trench-coat customer

`Meshy_AI_Rigged_Caramel_Trench_biped.zip` adds a second native model without replacing TieDye. Import with `python3 scripts/import-meshy-character.py /path/to/Meshy_AI_Rigged_Caramel_Trench_biped.zip --name Caramel --idle Idle_11`. The importer now accepts a named model and explicit idle clip; this ZIP also includes Idle_7. Caramel uses 10,111 triangles, a 1024px texture and its own 23-bone pose atlas (about 1.8 MB prepared). The idle clip's exported vertical offset is removed to align the soles with the walking floor.

Native instance type 4 selects TieDye and type 5 selects Caramel, with separate buffers, texture and animation metadata per model. IDs modulo four select TieDye at 0, Caramel at 2, and existing procedural styles at 1/3. Staff remain procedural. Each model has its own availability flag, so a missing asset falls back independently. Character atlas and hand-attachment helpers select the matching model; animation clocks and gameplay paths are shared.

### Earlier roster and animation smoothing

The latest user decision supersedes the modulo-four mix above: even customer IDs use TieDye and odd IDs use Caramel. If either imported asset is unavailable, use the other for all customers. Staff retain the procedural renderer. Both atlases now sample at 60 Hz and blend the final 180 ms toward the opening pose; the runtime interpolates those samples. Smoothstep eases walking/idle blend endpoints, and native heading/gait transitions use wall-time damping for consistent softness at every game speed. The retained procedural fallback still supports browsers and native asset failure.

### Revised staff imports (September 28, 2026)

Follow-up correction: the on-device screenshot exposed an old kind-17 cap in native packet validation. The range now follows the loaded character dictionary (currently kinds 4–20), rejecting non-integer and unavailable kinds. Native staff imports no longer trigger immediate Canvas fallback. That fallback also uses the same app camera frame, so renderer failure cannot independently reframe the shop beneath its station labels. Real iPhone/iPad simulator runs and a deliberate native fallback are recorded in `artifacts/map-alignment`; this supersedes the initial skipped-validation status below.

The supplied revised Gray Employee, Dark Haired Employee and Young Employee exports join the regular native staff pool alongside GreenMan and GreenWoman. Stable staff IDs select from available types 16–20; type 15 remains exclusively Security. Missing regular models are skipped and an empty pool retains procedural staff. The customer pool (types 4–14), browser Canvas renderer, staff training, gameplay and saves are unchanged.

Repeat each import with `python3 scripts/import-meshy-character.py <source.zip> --name <name> --idle Idle_11`, pairing the following archive/name values:

- `Meshy_AI_Revised_Gray_Employee_biped.zip` → `GrayEmployee`
- `Meshy_AI_Revised_Dark_Haired_E_biped.zip` → `DarkHairedEmployee`
- `Meshy_AI_Revised_Young_Employe_biped.zip` → `YoungEmployee`

Prepared mesh/index buffers, 1024px textures, 23-bone atlases and source-hash manifests live in the bundled `Characters` directory. Each generated `src/*-employee-clips.js` supplies its own animation metadata. Idle_11 and Walking use the existing 60 Hz sampling, eased seams and smoothstep blending; Running is stored for future use. The original dark-haired mesh contains 226,978 triangles and is retained without simplification. Tests, native compilation, visual inspection and performance checks were explicitly skipped by request; asset preparation and Capacitor synchronization are implementation steps only, not evidence of on-device correctness.
