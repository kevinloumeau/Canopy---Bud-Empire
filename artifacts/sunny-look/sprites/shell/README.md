# Shop shell sprites (brief section 11)

29 transparent PNGs. Generated with Ludo `image generate-with-style`, using the hero order counter as the style reference, 4 candidates each, shop palette at full saturation.

Facing convention: `.left` pieces run along the back-left wall, so on screen they rise from lower-left to upper-right. `.right` pieces run along the back-right wall and fall from upper-left to lower-right. Ludo often ignored the requested facing, so each file is the candidate with the correct on-screen direction, pooled from both the `.left` and `.right` generations.

Weak spots: the slab edges read more like blocks than thin fascias, and the seedling racks use two different designs. `shell.shelf.wall.*` and `shell.door.exit` are fine but chunky. None of these are upscaled yet.
