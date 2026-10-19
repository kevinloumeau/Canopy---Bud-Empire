"""Canopy hanging basket (shell.js, two against the rear wall of each upper floor): a woven cream rope basket on three
brass chains from a ceiling rose, spilling pothos.  shell.js's numbers: hanger .7 world down from the hook, basket
.55 x .48 map across and .3 world tall, leaves trailing about .55 world below its rim.
Origin at the top hook point (the ceiling rose); everything hangs below z=0.  About 2K triangles.

Needs canopy_kit.py and planter_parts.py in the same folder.  Run headless with
    blender -b -P hanging_basket.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
from mathutils import Vector
import planter_parts as P

OUT = K.begin("HangingBasket")
rnd = random.Random(3); M, V = P.M, P.V
ROPE = K.mat("Rope", "#e3d6b4", .85); ROPE_D = K.mat("RopeBand", "#cdbd96", .85)
EARTH = K.mat("PlanterSoil", "#514633", 1.); STEM = K.mat("PothosStem", "#5c7f3a", .7)
LEAVES = [K.mat("PothosDeep", "#4f7f3c", .6, two_sided=True), K.mat("PothosMid", "#6a9a48", .55, two_sided=True),
          K.mat("PothosLight", "#9cc46e", .55, two_sided=True)]
SHRUBS = [K.mat("ShrubA", "#5f8648", .78), K.mat("ShrubB", "#6b9250", .76), K.mat("ShrubC", "#7aa257", .76)]

RX, RY, BH = .55 * M / 2, .48 * M / 2, .3 * V           # basket half-widths and height
BT, BB = -.7 * V, -1.0 * V                               # rim and base heights below the hook
K.cyl("Rose", .045, .03, .02, (0, 0, -.02), K.BRASS, 16)
K.cyl("Hook", .012, .012, .03, (0, 0, -.05), K.BRASS, 8)
b = K.cyl("Basket", RX * .78, RX, BH, (0, 0, BB), ROPE, 16); b.scale.y = RY / RX
for i, f in enumerate((.25, .55, .85)):
    r = RX * (.78 + .22 * f) + .004
    o = K.cyl(f"Band{i}", r, r, .018, (0, 0, BB + BH * f - .009), ROPE_D, 16); o.scale.y = RY / RX
o = K.cyl("Lip", RX + .012, RX + .012, .022, (0, 0, BT - .02), ROPE_D, 16); o.scale.y = RY / RX
o = K.cyl("Soil", RX - .01, RX - .01, .01, (0, 0, BT - .012), EARTH, 12); o.scale.y = RY / RX
# Three brass chains from the hook to the rim, each a slim rod with a ring of links suggested by beads.
top = Vector((0, 0, -.06))
for i in range(3):
    a = math.pi / 2 + i * 2.094
    end = Vector((math.cos(a) * RX * .95, math.sin(a) * RY * .95, BT + .01)); d = end - top
    c = K.cyl(f"Chain{i}", .005, .005, d.length, (0, 0, 0), K.BRASS, 6)
    c.location = top; c.rotation_mode = "QUATERNION"; c.rotation_quaternion = d.to_track_quat("Z", "Y")
    for k in range(1, 6):
        K.cyl(f"Chain{i}Link{k}", .009, .009, .012, tuple(top + d * (k / 6) - Vector((0, 0, .006))), K.BRASS, 6)
# A mound of foliage on the soil and pothos spilling over the rim.
for j in range(3):
    a = j * 2.094 + .4
    P.lump(f"Mound{j}", (math.cos(a) * RX * .45, math.sin(a) * RY * .45, BT + .06), RX * .62, SHRUBS[j], .7, j, a)
for i in range(12):
    a = i * 2 * math.pi / 12 + rnd.uniform(-.2, .2)
    p = (math.cos(a) * RX * 1.02, math.sin(a) * RY * 1.02, BT + .02)
    P.strand(f"Vine{i}", p, rnd.uniform(.16, .42), LEAVES, STEM, rnd, .085, .055, .02, (math.cos(a) * .05, math.sin(a) * .05), stem=False, pairs=True)
K.finish(OUT, "hanging_basket", ortho=1.3, centre=(0, 0, -.6))
