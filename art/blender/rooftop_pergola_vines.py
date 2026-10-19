"""Canopy rooftop lounge: the climbing vine over the Speakeasy pergola, in place of the code-built leaf blobs in
src/three/rooftop.js ("Greenery over the pergola").  Leaf clusters mat the tops of the oak slats, thickest over the
two beams and thinning toward the middle; leaves spill over the beam faces; short strands hang from the beams; vines
wind down the two street-side posts almost to the deck and part way down the rear ones.

Same origin as rooftop_speakeasy: the centre of the pergola's post rectangle on the deck, map
(ROOFTOP.x0 + 3.8, ROOFTOP.y, ROOFTOP.z0 + 1.825).  Map +x is Blender +X, map +z is Blender -Y (street side at -Y).
Horizontal map units / 1.69, world heights x 0.7247, as every lounge model.  Leaf materials are VineDeep, VineMid
and VineFresh (double-sided), stems VineStem; nothing is driven by code, so it can all be merged.

Needs canopy_kit.py and vine_parts.py in the same folder.  Run headless with
    blender -b -P rooftop_pergola_vines.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
from mathutils import Vector
import canopy_kit as K
import vine_parts as VP

OUT = K.begin("RooftopPergolaVines")
H, V = 1 / 1.69, .7247
rnd = random.Random(11)
DEEP = K.mat("VineDeep", "#356b2e", .62, two_sided=True)
MID = K.mat("VineMid", "#4f8a3a", .6, two_sided=True)
FRESH = K.mat("VineFresh", "#79a84a", .58, two_sided=True)
STEM = K.mat("VineStem", "#5a4a2c", .7)
TOPS = [MID, MID, DEEP, FRESH]          # sunlit top: mostly mid green, some deep, a few young leaves
SIDES = [DEEP, MID]                     # hanging and shaded leaves run darker

PX, PZ, PH = 2.4, 1.575, 2.75           # post rectangle half spans and height (map units / world)
TOP = (PH + .26) * V                    # top of the oak slats
BEAM = (PH + .16) * V                   # top of the steel beams
X = lambda x: x * H                     # map x -> Blender X
Y = lambda z: -z * H                    # map z -> Blender Y

# ---------- the mat over the slats ----------
slat_x = []; x = -PX + .1
while x < PX: slat_x.append(x); x += .38
n = 0
for i, sx in enumerate(slat_x):
    z = -PZ - .3
    while z <= PZ + .3:
        edge = min(abs(z - -PZ), abs(z - PZ))            # map units from the nearer beam
        if rnd.random() < .78 - edge * .32:
            VP.cluster(f"Top{n}", (X(sx + rnd.uniform(-.08, .08)), Y(z + rnd.uniform(-.06, .06)), TOP + rnd.uniform(-.005, .03)),
                       rnd.uniform(.2, .27), TOPS, rnd); n += 1
        z += .2
    # Between slats near the beams the vine knits across, so fill the gaps there.
    if i < len(slat_x) - 1:
        for bz in (-PZ, PZ):
            for dz in (-.18, .12):
                if rnd.random() < .7:
                    VP.cluster(f"Top{n}", (X(sx + .19), Y(bz + dz * (1 if bz > 0 else -1) + rnd.uniform(-.05, .05)), TOP - .01),
                               rnd.uniform(.2, .26), TOPS, rnd); n += 1

# ---------- leaves spilling over both beam faces, and a few short strands hanging from them ----------
m = 0; h = 0
for bz, face in ((PZ, 1), (-PZ, -1)):
    x = -PX - .05
    while x <= PX + .05:
        # a cluster tipped forward over the outer face of the beam
        lean = rnd.uniform(.9, 1.3)
        VP.cluster(f"Spill{m}", (X(x + rnd.uniform(-.05, .05)), Y(bz + face * .1), BEAM - .03 * rnd.random()),
                   rnd.uniform(.2, .25), SIDES + [MID], rnd, rot=(face * lean, 0, rnd.uniform(0, 6.3))); m += 1
        x += .22
    # strands: denser and longer at the street side, a few at the back
    xs = [-PX + .35 + .62 * k for k in range(8)] if face > 0 else [-PX + .7 + 1.3 * k for k in range(4)]
    for hx in xs:
        if hx > PX: continue
        L = rnd.uniform(.14, .42) if face > 0 else rnd.uniform(.1, .25)
        VP.hanging(f"Hang{h}", (X(hx + rnd.uniform(-.1, .1)), Y(bz + face * .09), BEAM - .02), L, SIDES, STEM, rnd, size=.065); h += 1

# ---------- vines winding down the posts (street side nearly to the deck, rear part way) ----------
for (sx, sz, drop) in ((-1, 1, 2.3), (1, 1, 2.1), (-1, -1, 1.2), (1, -1, 1.4)):
    cx, cy = X(sx * PX), Y(sz * PZ)
    tag = f"Post{'L' if sx < 0 else 'R'}{'F' if sz > 0 else 'B'}"
    VP.spiral(tag, cx, cy, BEAM - .02, drop * V, .055, SIDES + [FRESH], STEM, rnd, size=.085, step=.045, turns_per_m=1.6)
    # a second, shorter runner on the same post so it reads as a leafy column rather than a single thread
    VP.spiral(tag + "B", cx, cy, BEAM - .04, drop * V * .7, .06, SIDES, STEM, rnd, size=.08, step=.05, turns_per_m=1.3)
    # a fuller knot of leaves where the vine leaves the beam
    for k in range(3):
        a = rnd.uniform(0, 6.3)
        VP.cluster(f"Knot{sx}{sz}{k}", (cx + math.cos(a) * .05, cy + math.sin(a) * .05, BEAM - .05 - k * .07),
                   rnd.uniform(.18, .22), SIDES, rnd, tilt=.9)

K.finish(OUT, "rooftop_pergola_vines", ortho=4.2, centre=(0, 0, 1.2))
