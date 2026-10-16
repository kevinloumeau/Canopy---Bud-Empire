# Canopy sprite prompts for ChatGPT

Made on 2026-10-15 from an audit of `public/sprites` on the Map detail review branch (about 360 sprites wired, last commit 2ea24b5) and of what the game still draws in code.

## How to use this list

- **One ChatGPT chat per group.** Paste the group's first prompt with the attachments it names. Then paste each "Next" line in the same chat, so every sprite in the set comes out in the same style.
- **Attachments** are files from the repo's `public/sprites/` folder (the same PNGs in your `main-shop-v2` outputs). Attach the ones named in each prompt.
- **Save** each result as the file name given, into `outputs/main-shop-v2/<group folder>`. A thread crops, cleans and wires them; you don't need to remove backgrounds.
- **Every prompt asks for** one sprite on a plain white background with margin all round. Raw renders at 1536x1024 (or 1024x1536 for people) are fine.

---

# Priority 1: missing sprites the game needs

## 1. Construction sites for the six stations

**Why:** a new game starts with every station unbuilt (`lines: [0,0,0,0,0,0]`). The sprite shop draws the tier-1 station anyway, so new players see finished benches they haven't bought. Only the ID desk has a site render (`station.security.site`).
**Adds:** `station.seeds.site.png`, `station.grow.site.png`, `station.harvest.site.png`, `station.pack.site.png`, `station.orders.site.png`, `station.pickup.site.png` (folder `sites/`). Wiring them takes one small code hook, the same one the ID desk already uses.
**Attach:** `interior/station.security.site.png`, `interior/station.seeds.tier2.png`

**First prompt:**
```
Isometric game sprite for a cozy cannabis dispensary idle game. Match the two attached images exactly: same soft clay-like 3D finish, warm sunny light from the upper left, gentle contact shadow, same camera. Standard 45° isometric camera; edges follow screen slopes +0.577 and -0.577 (30° dimetric).

Subject: an unbuilt station plot for the SEEDS bench. The footprint is the same size and shape as the attached seeds bench (station.seeds.tier2). Show a pale concrete floor patch marked out with yellow-and-black hazard tape on four short yellow stakes, a small stack of oak boards, one orange traffic cone, a closed cardboard crate labelled with a seedling icon, and a yellow hard hat on the boards. Nothing taller than a person's knee, so the room behind stays visible. Style must match the attached construction site (station.security.site) so the two read as a set.

One sprite only, centred on a plain white background with generous margin on every side. No text, no floor beyond the plot, no extra objects.
```

**Next** (paste one at a time in the same chat; save each under the name shown):
- `station.grow.site.png`: `Same style and size. Now the GROW bench plot: replace the seedling crate with a stack of three empty black grow pots and a coiled green hose.`
- `station.harvest.site.png`: `Same style and size. Now the HARVEST bench plot: replace the crate with an empty wooden drying rack lying flat and a pair of trimming shears on the boards.`
- `station.pack.site.png`: `Same style and size. Now the PACK bench plot: replace the crate with a flat-packed stack of kraft cartons and a roll of brown tape.`
- `station.orders.site.png`: `Same style and size. Now the ORDER COUNTER plot: replace the crate with a boxed card terminal and a rolled-up green floor mat.`
- `station.pickup.site.png`: `Same style and size. Now the PICKUP COUNTER plot: replace the crate with a stack of kraft pickup bags with rope handles and a small brass bell.`

---

## 2. Cars and a van, re-rendered to scale

**Why:** you pulled the cars on 2026-10-13 because they read far too small beside the shop and the walkers, so the streets are empty (`CARS = []` in `src/sunny-world.js`). The old set also only has front views, so a car driving away from the camera had no render.
**Replaces:** the 15 `street/street.car.*` and `street.van.*` files. New set: 4 views each, `fl`, `fr` (front three-quarter, heading screen-left or screen-right) and `bl`, `br` (rear three-quarter, driving away).
**Attach:** `street/street.car.blue.fl.png` (look), `people/person.customer.07.stand.empty.right.png` (scale)

**First prompt:**
```
Isometric game sprite for a sunny city-block idle game. Match the attached car's look: rounded compact European city car, soft clay-like 3D finish, warm sunny light from the upper left, soft contact shadow. Standard 45° isometric camera; edges follow screen slopes +0.577 and -0.577 (30° dimetric). The car's sides must run exactly along those slopes.

Scale: the attached person is an adult 1.75 m tall. Build the car at real size against them: roof about 1.45 m (a little below the person's shoulder), length about 3.7 m, wheels about 0.6 m across. Do not include the person in the image.

Subject: the car painted soft sky blue with a cream roof, seen from the front-left three-quarter (nose pointing toward the lower left of the screen).

One car only, centred on a plain white background with generous margin. No road, no text, no number plate text.
```
Save as `street.car.blue.fl.png`.

**Next:**
- `street.car.blue.fr.png`: `Same car, same scale. Nose pointing toward the lower right of the screen.`
- `street.car.blue.bl.png`: `Same car, same scale. Seen from behind: rear pointing toward the lower left of the screen, nose away from the camera, tail lights visible.`
- `street.car.blue.br.png`: `Same car, same scale. Seen from behind: rear pointing toward the lower right of the screen.`
- Then repeat those four lines for each colour, starting with: `Same car and scale, now painted [COLOUR]. Front-left view.` Colours: `sage green` (green), `tangerine orange` (orange), `soft lavender` (purple), `tomato red` (red), `cream white` (white), `mustard yellow` (yellow).
- `street.van.fl.png` and the other three views: `Same style and scale. Now a boxy small delivery van, white with a green side stripe, about 1.9 m tall and 4.8 m long. Front-left view.`

---

## 3. Nine more people for the queue and streets

**Why:** a full queue is 18 people and the cast is 11 (customers 01-07, walkers 01-04), so faces still repeat. About 9 more brings it to 20 so a full queue never shows the same person twice. Suggested split: six customers and three walkers.
**Adds:** `person.customer.08` to `.13` and `person.walker.05` to `.07`, each in four poses facing right: `stand.empty.right`, `stand.bag.right`, `walk.empty.right`, `walk.bag.right`. The thread mirrors them for the left-facing files, as it already does for the staff.
**Attach:** `people/person.customer.07.stand.empty.right.png` (style and scale standard), `people/person.walker.01.walk.bag.left.png` (walking pose and bag)

**First prompt:**
```
Character sprite for a cozy isometric idle game. Match the attached figures exactly in style, proportion and detail: slim adult build, simple rounded clay-like 3D finish, small calm face with minimal detail, soft warm light from the upper left, soft contact shadow under the feet. Not Pixar-style, not detailed or glossy; keep it as simple as the attached person.

Camera: standard 45° isometric view from above, the figure in three-quarter view facing toward the lower right of the screen, full body, feet at the bottom.

Character (customer 08): a woman in her 30s with a short black bob, olive bomber jacket over a cream tee, dark straight jeans, white sneakers, small crossbody bag.
Pose: standing relaxed, arms at her sides, hands empty.

One figure only, centred on a plain white portrait canvas with generous margin. No text, no ground, no props other than what she wears.
```
Save as `person.customer.08.stand.empty.right.png`.

**Next, for the same character:**
- `…stand.bag.right.png`: `Same person, same pose, now holding a kraft paper shopping bag with rope handles in the hand nearest the camera, like the attached walker.`
- `…walk.empty.right.png`: `Same person, mid-stride walking toward the lower right: front leg forward with heel down, back leg pushing off, arms swinging gently. Hands empty.`
- `…walk.bag.right.png`: `Same person, same walking stride, carrying the kraft paper bag.`

**Then start a new chat for each character**, using the first prompt with only the "Character" line changed:
- customer 09: `a man in his 50s, grey beard, navy chore coat, white shirt, tan chinos, brown boots.`
- customer 10: `a woman in her 20s with long braids, lilac hoodie, light wide-leg jeans, chunky white sneakers.`
- customer 11: `a man in his 30s with a buzz cut and round glasses, mustard knit sweater, black trousers, white sneakers.`
- customer 12: `an older woman in her 60s, short silver hair, long camel coat, burgundy scarf, low black boots.`
- customer 13: `a man in his 20s with curly red hair, green track jacket, grey joggers, retro trainers.`
- walker 05: `a jogger in her 30s, ponytail, coral running top, black leggings, running shoes, small earbuds.` (no bag variants needed; save stand and walk only)
- walker 06: `a man in his 40s walking a small tan dog on a red lead; denim jacket, white tee, khaki trousers. The dog trots beside his front foot.`
- walker 07: `a young woman holding a skateboard under one arm, oversized striped tee, cargo shorts, high socks, skate shoes.`

The Figma trial already made a jogger, dog walker and skater, but they came out too detailed next to the cast, so these redo them in ChatGPT.

---

## 4. A real walk cycle (Ludo or ChatGPT)

**Why:** every walker uses two frames (stand and one stride) plus a bob, which reads as a shuffle. A proper loop needs at least four frames per facing: left contact, pass, right contact, pass.
**Already there:** a 35-frame Ludo walk cycle for customer 07 is in `public/sprites/people/cycle/` but isn't wired yet. The thread can wire that one first as a test before more are made.
**Adds:** `person.<id>.walk.<bag|empty>.right.f1.png` to `.f4.png` per character; left is mirrored.
**Recommended route:** Ludo, since it keeps the figure consistent across frames and you approved it for animation. Use this text with the character's `stand` render as input:
```
Walk cycle in place, side three-quarter view facing lower right, matching the input character exactly. 4 frames looping: (1) left foot forward heel down, (2) passing, right leg lifting, (3) right foot forward heel down, (4) passing, left leg lifting. Gentle arm swing, relaxed city stroll, no bounce exaggeration. Same canvas size, same feet position every frame, transparent background.
```
**ChatGPT fallback** (one chat per character, attach the character's `stand.empty.right` and `walk.empty.right`):
```
Using the attached character exactly as drawn (same clothes, face, proportions, finish, camera and light), draw a 4-frame walk cycle as four separate figures side by side in one row, evenly spaced, all facing the lower right, feet on the same baseline: frame 1 left foot forward with heel down, frame 2 passing with the right leg lifting, frame 3 right foot forward with heel down, frame 4 passing with the left leg lifting. Plain white background, generous margin, no text or numbers.
```
Save as `person.<id>.walk.empty.sheet.png`; the thread splits the four frames.

---

# Priority 2: improvements to sprites already in the game

## 5. Glass tube kit, one clean bore

**Why:** you want the tube system to make sense and look cleaner. The route is now settled (Map detail review, 2026-10-15): the grow bench's glass drop falls through the floor and turns straight into the back of the harvest bench; the pack drop falls through the floor and turns right; on the ground floor a short stub runs out of the product wall into the pickup counter. All tubes share one bore. The drop renders keep fixed directions and can't be mirrored, so each is its own piece. See `/mnt/project-files/map-review-r23-after-tubes.jpg`.
**Replaces:** `shell/tube.straight.png`, `tube.elbow.png`, `tube.port.png`, `tube.run.grow.png`, `tube.run.pack.png`; adds `tube.stub.pickup.png`.
**Attach:** `shell/tube.run.grow.png`, `shell/tube.port.png`, `interior/station.seeds.tier2.png`

**First prompt:**
```
Isometric game sprite for a cozy cannabis dispensary idle game, matching the attached pieces' soft clay-like 3D finish, warm sunny light from the upper left and the shop's forest green and brass palette. Standard 45° isometric camera; edges follow screen slopes +0.577 and -0.577 (30° dimetric).

Subject: one straight section of a clear glass pneumatic transport tube, running along the +0.577 screen slope. Clean clear glass with a faint green tint and one soft highlight streak, constant bore, a thin forest-green and brass collar at each end. Empty inside. The tube's bore and collars must stay exactly the same in every later piece.

One piece only, centred on a plain white background with generous margin. No text.
```
Save as `tube.straight.png`.

**Next:**
- `tube.elbow.png`: `Same tube, same bore and collars: a smooth 90° elbow turning a vertical drop into a horizontal run along the +0.577 slope, heading toward the lower right.`
- `tube.run.grow.png`: `Same tube, same bore: the grow drop. A vertical tube about one storey tall. At the top, a short inlet enters from the left along the -0.577 slope through a brass collar. Halfway down it passes through a floor slab, marked by a flat brass floor ring. At the bottom a smooth elbow turns it forward toward the lower left, ending in an open brass collar. Empty inside.`
- `tube.run.pack.png`: `Same tube, same bore: the pack drop. Same as the grow drop (inlet from the left at the top, brass floor ring halfway down), but at the bottom the elbow turns it toward the lower right along the +0.577 slope.`
- `tube.stub.pickup.png`: `Same tube, same bore: a short horizontal stub about 0.6 m long along the +0.577 slope, coming out of a flat forest-green wall plate with a brass rim and ending in an open brass collar.`
- `tube.port.png`: `Same tube, same bore: the receiving port where a tube ends at a bench, a short brass funnel with a round glass hatch and a small green status light.`

---

## 6. Conveyor belt modules that tile

**Why:** you asked for belts that flow smoothly and look cleaner. The two belt renders (`shell.conveyor.upper`, `shell.conveyor.lower`) are one-piece troughs scaled to a fixed span, so they can't follow a route. A straight module that tiles plus two end caps lets the thread lay belts at any length, with cargo riding the bed.
**Route:** one belt behind the seeds and grow benches on the top floor, one behind the harvest bench running to the pack bench on the mezzanine. Both are straight runs, so one tiling module plus two end caps covers them.
**Replaces:** `shell/shell.conveyor.upper.png`, `shell.conveyor.lower.png`; adds `belt.straight.png`, `belt.end.in.png`, `belt.end.out.png`.
**Attach:** `shell/shell.conveyor.upper.png`, `interior/station.pack.tier2.png`

**First prompt:**
```
Isometric game sprite for a cozy cannabis dispensary idle game, matching the attached images' soft clay-like 3D finish, warm sunny light from the upper left and forest green and brass palette. Standard 45° isometric camera; edges follow screen slopes +0.577 and -0.577 (30° dimetric).

Subject: one straight module of a slim, clean conveyor belt, about 1.2 m long, running along the +0.577 screen slope, waist-height on two slim forest-green legs. Flat matte charcoal belt surface with no items on it, low brass side rails, cream side panels. Both ends are cut square and open so identical modules can butt together into a seamless run. Belt surface flat and evenly lit so it tiles.

One module only, centred on a plain white background with generous margin. No text.
```
Save as `belt.straight.png`.

**Next:**
- `belt.end.in.png`: `Same belt, same width and height: the start of the run, with a rounded drum end cap and a small brass hopper above the belt where items drop on.`
- `belt.end.out.png`: `Same belt, same width and height: the end of the run, with a rounded drum end cap and a short brass chute angled down off the end.`

---

## 7. Mezzanine stair landing platform

**Why:** the landing between the two stair flights is code-drawn (a slab with drawn glass rails in `src/main.js`). A render matching the stairs would make that corner read as one built piece.
**Adds:** `shell/shell.stairs.landing.png`
**Attach:** `shell/shell.stairs.main.png`, `shell/shell.stairs.upper.png`, `shell/railing.glass.up-right.png`

**Prompt:**
```
Isometric game sprite for a cozy cannabis dispensary idle game, matching the attached stairs and railing exactly: forest-green steel stringers, oak treads, brass handrail, clear glass balustrade, soft clay-like 3D finish, warm sunny light from the upper left. Standard 45° isometric camera; edges follow screen slopes +0.577 and -0.577 (30° dimetric).

Subject: a rectangular stair landing platform about 1.2 m wide and 2.5 m long, its long side along the -0.577 slope, standing 2 m off the floor on two slim forest-green posts. Oak deck matching the treads. Glass balustrade with brass top rail on the outer long edge and the far short edge only; the near short edge and the inner long edge are open where the flights arrive.

One piece only, centred on a plain white background with generous margin. No stairs, no text.
```

---

## 8. Street props

**Why:** the streets have about a dozen prop types. More variety makes the block feel lived in, closer to the Klondike look.
**Already made:** the Figma trial has a flower stall, mailboxes and parked scooters in `/mnt/project-files/firefly-trial/`, ready to wire if you pick them. These prompts add the rest.
**Adds:** files in `street/`, names below.
**Attach:** `street/street.coffeecart.png`, `street/street.bench.png`

**First prompt:**
```
Isometric game sprite for a sunny city-block idle game. Match the attached street props exactly: soft clay-like 3D finish, warm sunny light from the upper left, soft contact shadow, cheerful muted palette of sage, cream, terracotta and brass. Standard 45° isometric camera; edges follow screen slopes +0.577 and -0.577 (30° dimetric).

Subject: a pedestrian traffic light on a slim dark-green pole, about 3 m tall, with a crossing button box at waist height and a lit green walking-person signal facing the lower left.

One prop only, centred on a plain white background with generous margin. No ground, no text.
```
Save as `street.trafficlight.png`.

**Next** (same chat):
- `street.newsboxes.png`: `Same style: a row of three newspaper vending boxes in red, blue and cream, waist high.`
- `street.meter.png`: `Same style: a single parking meter on a short dark-green post.`
- `street.signpost.png`: `Same style: a street name sign post with two crossed blank green blades, about 3 m tall.`
- `street.planter.round.png`: `Same style: a round terracotta planter with a small olive tree, knee high.`
- `street.foodtruck.png`: `Same style: a small cream taco food truck with a sage awning open on its side, parked along the +0.577 slope, at real scale next to a 1.75 m adult.`
- `street.deliveryboxes.png`: `Same style: a small stack of four kraft cardboard parcels on a wooden pallet, knee high.`
- `street.awning.cafe.png`: `Same style: two small round cafe tables with four bistro chairs under one terracotta parasol.`

---

## 9. Grow-room glazing (optional)

**Why:** the glass walls around the top-floor grow room are drawn as thin green lines in code (`drawSlimGlazing`), the one part of that floor that isn't a render. Optional; it reads fine from a distance.
**Adds:** `shell/flat.wall.glazing.left.png`, `flat.wall.glazing.right.png`
**Attach:** `shell/flat.wall.window.left.png`

**Prompt:**
```
Isometric game sprite for a cozy cannabis dispensary idle game, matching the attached wall's soft clay-like 3D finish and forest green and brass palette, warm sunny light from the upper left. Standard 45° isometric camera; edges follow screen slopes +0.577 and -0.577 (30° dimetric).

Subject: a flat greenhouse glass wall panel, 3 m wide and 3 m tall, running along the -0.577 slope: slim forest-green steel mullions dividing it into three tall panes, clear glass with a faint green tint and one soft reflection, a brass base rail. The panel is seen from inside the room. Ends cut square so panels butt together.

One panel only, centred on a plain white background with generous margin. No text.
```
**Next:** `flat.wall.glazing.right.png`: `Same panel, now running along the +0.577 slope.`

---

## Not in this list

- **Staff:** the staff-work-v4 set covers every post, and the lounge host is in. They face right and are mirrored in code; a left-facing set is only worth making if the mirroring bothers you.
- **Exit door:** you said the render is fine; the fix was the wall cut behind it.
- **Branch stores:** the three branch maps are still fully drawn in code. Sprite-ifying them is phase 3 of the roadmap and would be its own batch.
