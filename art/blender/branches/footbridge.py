"""Riverside footbridge: an arched cedar footbridge spanning along X, plank deck on curved stringers, iron-dark
posts with a cedar handrail, two stone piers and a pair of lanterns at mid-span.

Fits the 2D footbridge: 8.15 map units long (4.82 m), 1.8 wide (1.07 m), rising 1.5 (1.09 m) at the middle, rails
1 tall (.72 m). The deck ends at z 0, each end on the origin's level; the piers drop to the water below.
Run headless:  python footbridge.py -- OUT_DIR
"""
import math
from branch_kit import K, tris

OUT = K.begin("Footbridge")
CEDAR = K.mat("Cedar", "#cf9f62", .7); CEDAR_B = K.mat("CedarLight", "#b07f42", .7); CEDAR_D = K.mat("CedarDark", "#8a5f33", .75)
IRON = K.mat("PostDark", "#243529", .5); RAIL = K.mat("Handrail", "#c9b58a", .6); STONE = K.mat("PierStone", "#a5a897", .85)
BRASS = K.mat("Brass", "#dcc089", .35, .35); LAMP = K.mat("LampGlow", "#fff0c2", .4, 0, 1.5)
L, WID, RISE, RAIL_H, N = 4.82, 1.07, 1.09, .72, 14
at = lambda t: (-L / 2 + L * t, RISE * 4 * t * (1 - t))
slope = lambda t: math.atan(RISE * 4 * (1 - 2 * t) / L)

for t in (.28, .72):                               # stone piers from the riverbed to under the deck
    x, z = at(t)
    K.box(f"Pier{t}", (.26, WID - .2, z + .5), (x, 0, -.55), STONE, .02, 1)
for i in range(N):                                 # deck planks across the width, following the arch
    t = (i + .5) / N; x, z = at(t)
    o = K.box(f"Plank{i}", (L / N * 1.04 / math.cos(slope(t)), WID, .05), (x, 0, z - .05), CEDAR if i % 2 else CEDAR_B, .006, 1)
    o.rotation_euler.y = -slope(t)
for s in (-1, 1):                                  # curved stringers, posts and the handrail on each side
    y = s * (WID / 2 - .02)
    pts = [at(i / N) for i in range(N + 1)]
    K.tube(f"Stringer{s}", [(x, y, z - .1) for x, z in pts], .055, CEDAR_D)
    K.tube(f"Handrail{s}", [(x, y, z + RAIL_H) for x, z in pts], .028, RAIL)
    K.tube(f"MidRail{s}", [(x, y, z + RAIL_H * .5) for x, z in pts], .014, CEDAR_D)
    for i in range(0, N + 1, 2):
        x, z = at(i / N)
        K.box(f"Post{s}_{i}", (.05, .05, RAIL_H), (x, y, z - .02), IRON, .008, 1)
    x, z = at(.5)                                  # a lantern on each side at the crown
    K.box(f"LanternBase{s}", (.12, .12, .05), (x, y, z + RAIL_H), BRASS, .01, 1)
    K.box(f"Lantern{s}", (.13, .13, .17), (x, y, z + RAIL_H + .05), LAMP, .01, 1)
    K.box(f"LanternCap{s}", (.16, .16, .04), (x, y, z + RAIL_H + .22), IRON, .01, 1)
for o in K.col.objects:                            # keep the curves light
    if o.type == "CURVE": o.data.bevel_resolution = 1; o.data.resolution_u = 2
K.finish(OUT, "footbridge", ortho=6.0, centre=(0, 0, .5))
tris(OUT, "footbridge")
