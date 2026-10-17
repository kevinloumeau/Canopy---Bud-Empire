CANOPY — REAR WALK FRAMES v7

20 people × 8 PNG frames = 160 frames.
Customer 01 is the previously corrected set; the remaining 19 people are new.
Customers 01–13 and walkers 01–07. Rear three-quarter, facing upper right.
No shopping bags. Dog/leash, skateboard, earbuds and other intrinsic details remain.

Each person folder contains:
  frames/         Eight full-resolution RGBA PNGs, 00 through 07.
  walk-8x1.png    Transparent eight-cell horizontal sprite strip, left to right.
  contact-sheet.jpg  Labeled static review sheet.
  JSON records   Generation provenance and alignment/check information.

All individual frames are 1536 px tall. Most are 1024 px wide; walker 06
uses a wider canvas to retain the whole dog and leash. See manifest.json
for exact canvas and atlas cell dimensions. Keep each cell at its fixed
canvas size; do not independently crop or fit every frame to its bounds.

Head alignment: a fixed region from frame 00 is reused in all eight frames.
The upper head pixels are identical, with a short blended collar transition.
Bodies were uniformly scaled and translated to align the head/waist where
visible. Long hair below that region and clothing folds remain generated.

Playback order: 00,01,02,03,04,05,06,07, then repeat.
Two opposing contact poses are at 00 and 04. 02 and 06 are passing poses.
Start at approximately 8 frames per 1.2 seconds and tune to map movement.

Reviewed as stills: identity, rear direction, opposing contact poses,
head consistency, complete silhouettes and transparent backgrounds.
File checks cover counts, alpha, canvas bounds and identical head regions.
These checks do not establish foot planting or smooth motion at game size.
Long coats obscure some leg articulation. Dog motion needs in-game review.

This is an asset handoff. No game wiring, publication, video, bag variants
or additional front-view cycles were performed in this batch.
