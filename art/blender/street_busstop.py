"""Canopy bus shelter: curved green roof on a green frame, glass back and ends, cream bench facing +X. Long along Y.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_busstop.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetBusStop")
FRAME = K.mat("ShelterGreen", "#2f7a4c", .45, .1); ROOF = K.mat("RoofGreen", "#3a8a54", .4)
GLS = K.mat("ShelterGlass", "#cfe6dc", .1); GLS.blend_method = "BLEND"
b = GLS.node_tree.nodes["Principled BSDF"]; b.inputs["Alpha"].default_value = .3
SEAT = K.mat("SeatCream", "#efe6cc", .5)
W, L, H = 1.07, 2.13, 2.0
for x in (-W / 2, W / 2):
    for y in (-L / 2, L / 2):
        K.box(f"Post{x:.1f}{y:.1f}", (.06, .06, H), (x, y, 0), FRAME, .01)
K.box("BaseBack", (.06, L, .06), (-W / 2, 0, 0), FRAME, .01)
for y in (-L / 2, L / 2):
    K.box(f"BaseEnd{y:.1f}", (W, .06, .06), (0, y, 0), FRAME, .01)
    K.box(f"GlassEnd{y:.1f}", (W - .1, .02, H - .4), (0, y, .2), GLS, .004)
K.box("GlassBack", (.02, L - .1, H - .4), (-W / 2, 0, .2), GLS, .004)
K.box("TopBack", (.06, L, .06), (-W / 2, 0, H - .1), FRAME, .01)
K.box("TopFront", (.06, L, .06), (W / 2, 0, H - .1), FRAME, .01)
# curved roof: a half-tube sheet along Y
R = W / 2 + .12; n = 16; verts = []; faces = []
for i in range(n + 1):
    a = math.pi * i / n
    for y in (-L / 2 - .1, L / 2 + .1):
        verts.append((R * math.cos(a), y, H - .05 + .35 * math.sin(a)))
for i in range(n):
    faces.append((2 * i, 2 * i + 2, 2 * i + 3, 2 * i + 1))
me = bpy.data.meshes.new("Roof"); me.from_pydata(verts, [], faces)
ro = K.link(bpy.data.objects.new("Roof", me), ROOF)
ro.modifiers.new("Thick", "SOLIDIFY").thickness = .05
ro.modifiers.new("Bevel", "BEVEL").width = .015
for p in me.polygons: p.use_smooth = True
K.box("Seat", (.36, L - .4, .05), (-W / 2 + .26, 0, .45), SEAT, .02)
K.box("SeatBack", (.04, L - .4, .3), (-W / 2 + .08, 0, .55), SEAT, .015)
for y in (-L / 2 + .35, L / 2 - .35):
    K.box(f"SeatLeg{y:.1f}", (.3, .04, .45), (-W / 2 + .24, y, 0), FRAME, .01)
K.finish(OUT, "street_busstop", ortho=3.4, centre=(0, 0, 1.0))
