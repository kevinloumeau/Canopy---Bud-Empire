"""Canopy pedestrian light: green pole with a two-lamp signal head facing -Y and a push-button box.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_trafficlight.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetTrafficLight")
POST = K.mat("PoleGreen", "#2f6b48", .45, .1); STONE = K.mat("FootStone", "#ddd5c3", .8)
RED_OFF = K.mat("LampRedOff", "#4a2a28", .3); WALK = K.mat("LampGlow", "#7cf09a", .3, 0, 2.5)
K.cyl("Footing", .14, .15, .1, (0, 0, 0), STONE, 32)
K.cyl("Foot", .08, .1, .1, (0, 0, .1), POST, 24)
K.cyl("Pole", .045, .045, 2.25, (0, 0, .2), POST, 24)
K.cyl("Cap", .055, .055, .05, (0, 0, 2.45), K.BRASS, 24)
K.cyl("CapBall", .04, .03, .06, (0, 0, 2.5), K.BRASS, 24)
for z in (1.6, 2.2): K.cyl(f"Clamp{z}", .06, .06, .06, (0, 0, z), K.BRASS, 24)
HX = -.22
K.box("Head", (.36, .22, .7), (HX, -.02, 1.58), POST, .05, 4)
for z, m in ((2.03, RED_OFF), (1.71, WALK)):
    K.cyl(f"Visor{z}", .15, .15, .045, (HX, -.13, z + .1), POST, 32).rotation_euler.x = math.pi / 2
    K.cyl(f"Lens{z}", .125, .125, .02, (HX, -.18, z + .1), m, 32).rotation_euler.x = math.pi / 2
K.box("Bracket", (.2, .05, .05), (-.1, 0, 1.9), K.BRASS, .01)
K.box("ButtonBox", (.1, .08, .16), (0, -.07, .95), POST, .02)
K.cyl("Button", .03, .03, .015, (0, -.115, 1.03), K.BRASS, 16).rotation_euler.x = math.pi / 2

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
fit_height(2.54)
K.finish(OUT, "street_trafficlight", ortho=2.9, centre=(0, 0, 1.3))
