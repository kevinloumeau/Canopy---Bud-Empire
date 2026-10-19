"""Canopy delivery pallet: four taped kraft cartons on an oak pallet.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_deliveryboxes.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetDeliveryBoxes")
PAL = K.mat("PalletWood", "#c79a63", .7); TAPE = K.mat("Tape", "#e8d3a6", .5)
PL, PD = 1.2, 1.0
for x in (-PL / 2 + .08, 0, PL / 2 - .08):
    K.box(f"Block{x:.2f}", (.14, PD, .1), (x, 0, 0), PAL, .01)
for i in range(5):
    K.box(f"TopBoard{i}", (PL, .16, .03), (0, -PD / 2 + .08 + i * (PD - .16) / 4, .1), PAL, .008)
for y in (-PD / 2 + .08, PD / 2 - .08):
    K.box(f"BotBoard{y:.2f}", (PL, .14, .02), (0, y, -.0), PAL, .006)
def carton(tag, x, y, z, w, d, h, rot=0):
    o = K.box(tag, (w, d, h), (x, y, z), K.KRAFT, .015); o.rotation_euler.z = rot
    t = K.box(tag + "Tape", (w + .004, .1, h + .004), (x, y, z - .002), TAPE, .005); t.rotation_euler.z = rot
    t = K.box(tag + "TapeTop", (.1, d + .004, .004), (x + w * .5 - .05, y, z + h), TAPE, .002); t.rotation_euler.z = rot
Z = .13
carton("BoxA", -.28, -.22, Z, .55, .5, .42)
carton("BoxB", .28, -.22, Z, .55, .5, .48)
carton("BoxC", -.28, .26, Z, .55, .46, .5)
carton("BoxD", -.26, .0, Z + .5, .52, .48, .4)
carton("BoxE", .3, .26, Z, .52, .44, .36)
K.finish(OUT, "street_deliveryboxes", ortho=2.0, centre=(0, 0, .55))
