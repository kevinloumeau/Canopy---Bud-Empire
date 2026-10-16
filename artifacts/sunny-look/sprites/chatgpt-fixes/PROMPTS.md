# ChatGPT fixes for the 45° shop sprites

Covers: the open lounge door (green drapes), the tier 3 pickup desk (no arch), the tier 3 packing bench (busy), and the delivery deck (floating pieces).

Work through one folder at a time in a fresh ChatGPT chat. Upload every image in that folder, plus the style reference named for that fix (in `style-refs/`), then paste the prompt. Ask for 2–3 versions if the first misses. Save the result under the filename shown and send it back to me (or drop it in `artifacts/sunny-look/sprites/shop45/`).

**Every prompt ends with the same rules block.** Keep it; it holds the angle and the look.

```
RULES: Output one single object on a fully transparent background (real alpha, not a checkerboard pattern), PNG.
Camera: true isometric 2:1, rotated 45° around the vertical axis, 30° down, orthographic, no perspective. Match the angle, footprint and orientation of current.png / angle-guide.png exactly. Do not rotate or mirror it.
Look: soft 3D render like the style reference: matte clay and painted wood, rounded slightly chunky toy-like shapes, gentle ambient occlusion, warm soft light from the upper left, small soft contact shadow, no outlines.
Palette: forest green #2f5d4a, brass #c9a35c, cream #f4f1e4, light oak #c9a070, dark walnut for flagship pieces.
No people, no floor tile, no walls or background, no extra objects, no text except what is asked.
```

---

## 1. `shell.lounge.door.open.png`
Upload: `1-lounge-door-open/current.png`, `1-lounge-door-open/angle-guide.png`, `style-refs/style-ref-order-counter.png`

```
Edit current.png. Keep the doorway exactly the same size, angle and position. Change the drapes from green to rich burgundy velvet (#6e1f2b), heavy folds, tied back to each side with brass tie-backs. Keep the warm golden glow coming from inside the doorway. Keep the oak door frame. Remove any leftover checkerboard or white halo around the edges.
[paste RULES block]
```

## 2. `station.pickup.tier3.png`
Upload: `2-pickup-tier3/current.png`, `2-pickup-tier3/tier2-for-shape.png`, `2-pickup-tier3/angle-guide.png`, `style-refs/style-ref-order-counter.png`

```
Edit current.png. It is the flagship pickup desk but it is missing its sign arch. Add a tall brass arch over the desk with a forest green sign reading PICKUP, positioned and sized like the arch in tier2-for-shape.png (same side, same height, same angle). Keep the dark walnut desk, the wrapped parcels and the warm light strip exactly as they are. The only text is PICKUP.
[paste RULES block]
```

## 3. `station.pack.tier3.png`
Upload: `3-pack-tier3/current.png`, `3-pack-tier3/tier2-for-shape.png`, `3-pack-tier3/angle-guide.png`, `style-refs/style-ref-order-counter.png`

```
Redraw this packing bench as the flagship (tier 3) version, using tier2-for-shape.png for the exact shape, footprint and angle. Change only the materials and contents: dark walnut cabinet with brass inlays and a warm light strip under the top; on top, a small brass scale, a neat stack of folded cream boxes, a row of five labelled glass jars of green buds and a roll of brass stickers. Tidy and premium, NOT a pile of colourful items, no candy, no fruit.
[paste RULES block]
```

---

## 4. `deck.delivery.site.png` and `deck.delivery.built.png`
The current versions come out as floating separate pieces. Each deck must be ONE solid, connected structure standing on the ground.
Upload: `4-delivery-deck/angle-guide.png`, `4-delivery-deck/current-site.png` (or `current-built.png`), `style-refs/style-ref-order-counter.png`

**Under construction (`deck.delivery.site.png`):**
```
Redraw the rooftop delivery deck from angle-guide.png as ONE single solid, connected structure: a raised wooden deck platform on sturdy green steel legs that reach the ground, a short open staircase attached to the side of the deck leading up to it, and a small square drone landing pad on its own posts rising directly from the back corner of the same deck (physically joined to it, not floating). Under construction: yellow-black hazard tape around the pad railing, stacked cardboard cartons, a plain sheet-covered counter, and a cream sign on two posts reading COMING SOON. Every part touches and connects; nothing hovers in the air. Same layout and angle as angle-guide.png.
[paste RULES block]
```

**Finished (`deck.delivery.built.png`):**
Upload the image you just accepted for the site version as well, so both match.
```
Redraw this exact same deck structure, same shape, size, angle and layout, now finished: the deck is clean light oak, the counter is green and cream with brass trim, the landing pad is yellow-and-dark-green striped with a small orange cone, a brass railing runs around the pad, and the sign reads ONLINE ORDERS. No hazard tape and no cartons. One solid connected structure standing on the ground; nothing floats.
[paste RULES block]
```

---

## Any other piece (template)
Upload the current sprite from `shop45/`, its crop from `guides-45/`, and the style reference.

```
Edit current.png. Keep the object, its shape, footprint, angle and orientation exactly. Change: <describe the one change>.
[paste RULES block]
```

**Tips**
- If ChatGPT returns a checkerboard instead of real transparency, reply: "The background must be real transparency (alpha 0), not a drawn checkerboard."
- If the angle drifts, reply: "Match the angle of angle-guide.png exactly; floor edges must run at 26.6° to horizontal."
- Keep a version you like even if the background is white; I can remove it.
