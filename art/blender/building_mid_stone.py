"""Canopy street terrace: Mid terrace, stone, modelled from public/sprites/buildings/building.mid.stone.png.

Footprint 8.46 x 7.16 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingMidStone")
B.palette()
W, D, H = 5.006, 4.237, 7.79

STONE = K.mat("Stone", "#dcd5c6", .75); GREEN = K.mat("ShopGreen", "#6a9670", .55)
g, b2 = 2.45, 4.8
B.walls(W, D, H, [g, b2], GREEN, STONE)
F = B.faces(W, D)
B.shopfront(F["front"], "Shop", .1, W - .1, g, GREEN, door_at=W * .52)
for i, u in enumerate([0.25, 0.72]): B.window(F["front"], f"F2W{i}", u * F["front"].length, g + .55, 0.5, 0.95)
for i, u in enumerate([0.25, 0.72]): B.window(F["front"], f"F3W{i}", u * F["front"].length, b2 + .5, 0.5, 0.95)
for i, u in enumerate([0.3, 0.75]): B.window(F["side"], f"S2W{i}", u * F["side"].length, g + .55, 0.5, 0.95)
for i, u in enumerate([0.3, 0.75]): B.window(F["side"], f"S3W{i}", u * F["side"].length, b2 + .5, 0.5, 0.95)
for i, u in enumerate([0.62]): B.window(F["side"], f"SG{i}", u * F["side"].length, .7, 0.55, 1.0)

K.finish(OUT, "building_mid_stone", ortho=9.7, centre=(0, 0, H * .5))
