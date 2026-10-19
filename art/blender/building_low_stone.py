"""Canopy street terrace: Low terrace, stone, modelled from public/sprites/buildings/building.low.stone.png.

Footprint 7.63 x 7.94 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingLowStone")
B.palette()
W, D, H = 4.515, 4.698, 6.54

STONE = K.mat("Stone", "#d8d1c3", .75)
g = 2.95
B.walls(W, D, H, [g], STONE, STONE)
F = B.faces(W, D)
B.door(F["front"], "Door", W * .48, .14, .62, 1.75)
for x in (.0, W): F["front"].box(f"Quoin{x}", x, 0, .2, H - .5, .03, B.M["CREAM"])
for i, u in enumerate([0.22, 0.75]): B.window(F["front"], f"FG{i}", u * F["front"].length, .8, 0.55, 1.0)
for i, u in enumerate([0.25, 0.72]): B.window(F["front"], f"FU{i}", u * F["front"].length, g + .6, 0.55, 0.95, arch=True)
for i, u in enumerate([0.2, 0.5, 0.8]): B.window(F["side"], f"SG{i}", u * F["side"].length, .8, 0.55, 1.0)
for i, u in enumerate([0.25, 0.72]): B.window(F["side"], f"SU{i}", u * F["side"].length, g + .6, 0.55, 0.95, arch=True)

K.finish(OUT, "building_low_stone", ortho=9.7, centre=(0, 0, H * .5))
