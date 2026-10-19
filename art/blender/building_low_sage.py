"""Canopy street terrace: Low terrace, sage, modelled from public/sprites/buildings/building.low.sage.png.

Footprint 8.77 x 7.95 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingLowSage")
B.palette()
W, D, H = 5.189, 4.704, 6.87

CREAMW = K.mat("CreamWall", "#ebe2cd", .7); SAGE = K.mat("Sage", "#a9c2a2", .7); GREEN = K.mat("ShopGreen", "#5f8c66", .55)
g = 3.05
B.walls(W, D, H, [g], GREEN, CREAMW, side_upper=SAGE)
F = B.faces(W, D)
B.shopfront(F["front"], "Shop", .12, W - .12, g, GREEN, door_at=W * .52)
B.awning(F["front"], "Awn", W * .45, g - .05, W * .62, .5, .75)
for i, u in enumerate([0.3, 0.7]): B.window(F["front"], f"FW{i}", u * F["front"].length, g + .75, 0.62, 1.1)
for i, u in enumerate([0.28, 0.72]): B.window(F["side"], f"SW{i}", u * F["side"].length, g + .75, 0.62, 1.1)
for i, u in enumerate([0.28, 0.72]): B.window(F["side"], f"SG{i}", u * F["side"].length, .85, 0.62, 1.1)

K.finish(OUT, "building_low_sage", ortho=10.4, centre=(0, 0, H * .5))
