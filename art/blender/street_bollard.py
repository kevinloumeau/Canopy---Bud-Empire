"""Canopy street bollard: square cream post on a green plinth with a brass cap.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_bollard.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("StreetBollard")
POST = K.mat("BollardStone", "#efe4c6", .55)
K.box("Plinth", (.26, .26, .14), (0, 0, 0), K.GREEN_D, .02)
K.box("Post", (.18, .18, .86), (0, 0, .14), POST, .02)
K.cyl("CapRing", .065, .07, .04, (0, 0, 1.0), K.BRASS, 32)
K.cyl("Cap", .065, .05, .05, (0, 0, 1.04), K.BRASS, 32)
K.finish(OUT, "street_bollard", ortho=1.5, centre=(0, 0, .55))
