"""Canopy street terrace: Low workshop, modelled from public/sprites/buildings/building.workshop.low.png.

Footprint 7.71 x 7.23 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingWorkshopLow")
B.palette()
W, D, H = 4.562, 4.278, 3.39

CREAMW = K.mat("CreamWall", "#ece4d2", .7); GREEN = K.mat("ShopGreen", "#4f7d5d", .55); GDOOR = K.mat("GarageGreen", "#3d6448", .55)
B.walls(W, D, H, [], CREAMW, CREAMW, parapet=.4)
F = B.faces(W, D)
f = F["front"]
for x in (.0, W * .64, W):
    f.box(f"Pier{x:.2f}", x, 0, .24, H - .45, .1, GREEN)
for fa, xs in ((F["side"], (F["side"].length * .5,)),):
    for x in xs: fa.box(f"SidePier{x:.2f}", x, 0, .24, H - .45, .1, GREEN)
B.prism("GreenBase", W, D, 0, .25, GREEN, 0, .04)
gx = W * .32
f.box("GarageFrame", gx, 0, 2.6, 2.35, .05, B.M["CREAM"])
for s in (-1, 1):
    f.box(f"Garage{s}", gx + s * .6, .08, 1.15, 2.05, .08, GDOOR)
    for k in range(3): f.box(f"GaragePane{s}{k}", gx + s * .6 - .36 + k * .36, 1.55, .28, .3, .09, B.M["GLASS"])
    f.box(f"GarageHandle{s}", gx + s * .07, 1.0, .04, .3, .11, B.M["BRASS"])
for k in range(5): f.box(f"Transom{k}", gx - 1.0 + k * .5, 2.42, .4, .3, .06, B.M["GLASS"])
f.box("TransomFrame", gx, 2.38, 2.6, .38, .04, B.M["FRAME"])
B.door(f, "Door", W * .82, .1, .62, 1.75)
f.box("Lamp", W * .82, 2.05, .12, .16, .22, B.M["BRASS"])
for i, u in enumerate([0.25, 0.76]): B.window(F["side"], f"SW{i}", u * F["side"].length, .95, 0.55, 0.95)

K.finish(OUT, "building_workshop_low", ortho=9.3, centre=(0, 0, H * .5))
