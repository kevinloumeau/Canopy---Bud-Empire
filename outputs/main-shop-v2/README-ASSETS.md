# Canopy sprite asset pack

Built-in image generation with transparent PNG output, followed by measured geometry adjustments and direct edge cleanup. The original prompt set and revision prompts are included.

Contents:
- Six low construction-site sprites: seeds, grow, harvest, pack, orders and pickup.
- Seven car colors in four views, plus four delivery-van views.
- Nine new characters: six customers and three walkers. Thirty-four standing/walking and empty/bag right-facing poses; the jogger has no shopping-bag state. Left-facing versions are mirrored derivatives.
- Four-phase walk sheets for thirteen customers and seven walkers, empty/bag except the jogger. Individual frames include both facing directions.
- Six clear-glass tube fittings, three conveyor modules, elevated landing, eight street props and two glazing orientations.

The new cast includes East Asian, Black, South Asian and retained existing character identities. Outfits and role props remain consistent. The supplied dog walker remains unchanged; the protected attachment is preserved exactly and excluded from cleanup.

Placement and scale:
- Ground axes target screen slopes +/-tan(30 degrees), approximately +/-0.577. Vertical edges remain vertical.
- Geometry reports record selected line or landmark measurements and applied mappings. Raster measurement and generated detail have finite precision; curved surfaces, limbs and naturally tilted props do not represent straight ground axes.
- Nominal adult height 1.75 m. Car length 3.7 m, roof 1.45 m and wheel diameter 0.6 m; van length 4.8 m and roof 1.9 m. These are design targets, not a shared PNG pixel scale.
- Scale sprites by opaque artwork and ground contact, not their canvas margins. Vehicle hub/light landmarks and glazing square proportions were checked separately.
- Walk frames use a 512 x 448 transparent canvas and common foot baseline at y=424. Frames 00-03 form the repeating sequence. Left-facing frames are horizontal mirrors.
- Glass panes/tubes preserve their tint and reflections with translucent alpha; brass, wood and painted frames remain opaque.

Files are an asset handoff. No game source, saved progress, hosting identity or publication was changed. Original renders and discarded variants remain outside the packaged deliverables in workspace raw folders or the generated-image archive.
