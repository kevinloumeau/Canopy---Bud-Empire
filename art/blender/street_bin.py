"""Canopy street bin: rounded green litter bin with a slot on its -Y face.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_bin.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetBin")
BIN = K.mat("BinGreen", "#3f7a52", .5); BIN_D = K.mat("BinGreenDeep", "#2d6040", .55)
K.box("Plinth", (.5, .44, .06), (0, 0, 0), BIN_D, .03)
K.box("Body", (.46, .4, .78), (0, 0, .05), BIN, .1, 6)
K.box("Lid", (.48, .42, .14), (0, 0, .8), BIN, .12, 6)
K.box("DoorPanel", (.36, .02, .48), (0, -.2, .12), BIN_D, .03)
K.box("Slot", (.24, .03, .09), (0, -.205, .66), K.DARK, .03)
K.box("SlotRim", (.28, .02, .13), (0, -.2, .64), BIN_D, .04)
K.finish(OUT, "street_bin", ortho=1.4, centre=(0, 0, .5))
