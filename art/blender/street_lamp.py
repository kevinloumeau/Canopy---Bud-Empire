"""Canopy street lamp: green post with a fluted base, cream lantern and a small green banner.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_lamp.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("StreetLamp")
POST = K.mat("LampPost", "#1f5a3c", .45, .15)
GLOWM = K.mat("LampGlow", "#fbefc2", .4, 0, 1.6)

K.cyl("Foot", .2, .2, .06, (0, 0, 0), POST, 32)
K.cyl("Base", .15, .11, .55, (0, 0, .06), POST, 32)
K.cyl("BaseRing", .14, .14, .05, (0, 0, .58), POST, 32)
K.cyl("Post", .055, .055, 2.6, (0, 0, .62), POST, 24)
for z in (1.3, 3.0):
    K.cyl(f"Collar{z}", .075, .075, .06, (0, 0, z), POST, 24)
K.cyl("Neck", .06, .12, .12, (0, 0, 3.2), POST, 24)
K.cyl("LanternBase", .19, .19, .06, (0, 0, 3.28), POST, 24)
K.cyl("Lantern", .19, .24, .46, (0, 0, 3.34), GLOWM, 32)
K.cyl("LanternTop", .27, .27, .06, (0, 0, 3.8), POST, 32)
K.cyl("Roof", .25, .07, .16, (0, 0, 3.86), POST, 32)
K.cyl("FinialStem", .025, .025, .08, (0, 0, 4.0), POST, 12)
K.cyl("Finial", .045, .0, .1, (0, 0, 4.07), POST, 16)
# banner on two short arms, hanging toward -Y (the sprite shows it on the lower-left face)
for z in (2.1, 2.75):
    K.box(f"BannerArm{z}", (.025, .28, .025), (0, -.15, z), POST, .006)
K.box("Banner", (.02, .22, .62), (0, -.19, 2.13), K.GREEN, .008)
K.box("BannerTail", (.02, .1, .1), (0, -.13, 2.05), K.GREEN, .008)

def fit_height(h):
    """Scale the whole prop about its floor origin so it stands h metres tall (the game's map size / 1.69)."""
    dg = bpy.context.evaluated_depsgraph_get(); top = 0
    for o in bpy.data.objects:
        if o.type in ("MESH", "FONT"):
            ev = o.evaluated_get(dg); top = max(top, max((ev.matrix_world @ Vector(c)).z for c in ev.bound_box))
    f = h / top
    for o in bpy.data.objects:
        if not o.parent and o.type in ("MESH", "FONT", "CURVE"):
            o.location *= f; o.scale *= f
    return f
fit_height(2.72)
K.finish(OUT, "street_lamp", ortho=3.1, centre=(0, 0, 1.38))
