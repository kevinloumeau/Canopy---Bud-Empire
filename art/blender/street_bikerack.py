"""Canopy bike rack: black hoops on a green slab in a row along Y, one cream bike parked along X.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_bikerack.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetBikeRack")
IRON = K.mat("RackBlack", "#24272a", .45, .3)
FRAME = K.mat("BikeCream", "#e3d8bd", .45); TYRE = K.mat("Tyre", "#2a2a2a", .7); FENDER = K.mat("Fender", "#a8c3cf", .45)
SADDLE = K.mat("Saddle", "#a86a43", .6)
K.box("Slab", (.7, 1.5, .06), (0, 0, 0), K.GREEN, .02)
for i, y in enumerate((-.5, 0, .5)):
    pts = [(-.28 + .56 * t, y, .06 + .55 * math.sin(math.pi * t) ** .45) for t in [k / 16 for k in range(17)]]
    K.tube(f"Hoop{i}", pts, .024, IRON)
def wheel(tag, x, y, z, r=.3):
    pts = [(x + r * math.cos(t / 32 * 6.283), y, z + r * math.sin(t / 32 * 6.283)) for t in range(33)]
    K.tube(tag + "Tyre", pts, .022, TYRE)
    for k in range(12):
        a = k / 12 * 6.283
        K.tube(f"{tag}Spoke{k}", [(x, y, z), (x + r * math.cos(a), y, z + r * math.sin(a))], .003, FRAME)
    K.tube(tag + "Fender", [(x + (r + .04) * math.cos(a), y, z + (r + .04) * math.sin(a)) for a in [math.radians(d) for d in range(20, 161, 10)]], .02, FENDER)
BY = .25
wheel("Rear", .45, BY, .31); wheel("Front", -.5, BY, .31)
K.tube("Frame", [(.45, BY, .31), (.1, BY, .3), (-.35, BY, .7), (.2, BY, .72), (.1, BY, .3)], .022, FRAME)
K.tube("SeatStay", [(.45, BY, .31), (.2, BY, .72), (.24, BY, .8)], .016, FRAME)
K.tube("Fork", [(-.5, BY, .31), (-.38, BY, .72), (-.36, BY, .86)], .02, FRAME)
K.tube("Bars", [(-.33, BY - .22, .9), (-.36, BY, .86), (-.33, BY + .22, .9)], .016, K.BRASS)
for s in (-1, 1): K.tube(f"Grip{s}", [(-.33, BY + s * .22, .9), (-.33, BY + s * .28, .9)], .02, SADDLE)
K.box("Saddle", (.2, .1, .05), (.24, BY, .8), SADDLE, .025)
K.finish(OUT, "street_bikerack", ortho=2.0, centre=(0, 0, .45))
