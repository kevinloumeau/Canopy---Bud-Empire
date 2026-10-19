"""Canopy street terrace: Low terrace, tan, modelled from public/sprites/buildings/building.low.tan.png.

Footprint 7.58 x 7.52 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingLowTan")
B.palette()
W, D, H = 4.485, 4.450, 6.05

TAN = K.mat("Tan", "#d9bb8f", .75); GREEN = K.mat("ShopGreen", "#6a9670", .55)
g = 2.75
B.walls(W, D, H, [g], TAN, TAN)
F = B.faces(W, D)
B.shopfront(F["front"], "Shop", .1, W - .1, g, GREEN, door_at=W * .48)
F["side"].box("GreenPier", .1, 0, .24, g, .14, GREEN)
for i, u in enumerate([0.18, 0.5, 0.82]): B.window(F["front"], f"FW{i}", u * F["front"].length, g + .6, 0.5, 0.9)
for i, u in enumerate([0.3, 0.75]): B.window(F["side"], f"SW{i}", u * F["side"].length, g + .6, 0.5, 0.9)
for i, u in enumerate([0.6]): B.window(F["side"], f"SG{i}", u * F["side"].length, .85, 0.5, 0.95)

K.finish(OUT, "building_low_tan", ortho=9.4, centre=(0, 0, H * .5))
