"""Canopy street planter: long stone trough of three flowering box bushes.  Long along Y.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_planter.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("StreetPlanter")
rnd = K.rnd
STONE = K.mat("PlanterStone", "#d8cfbf", .85)
LEAF1 = K.mat("BushLeaf", "#7fae3e", .6); LEAF2 = K.mat("BushLeafDeep", "#5c8f2f", .65)
PINK = K.mat("FlowerPink", "#ec9ab0", .6); ORANGE = K.mat("FlowerOrange", "#ef9a4a", .6); CENTRE = K.mat("FlowerCentre", "#f6d36a", .6)

def bush(tag, c, r):
    """A rounded box bush: a dome of overlapping rounded leaves, with a few small flowers."""
    bm = bmesh.new(); tone = []
    for i in range(150):
        u = rnd.uniform(-.35, 1); v = rnd.uniform(0, 6.283); q = math.sqrt(1 - u * u)
        n = Vector((q * math.cos(v), q * math.sin(v), u))
        res = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=r * .42)
        rot = (n + Vector((0, 0, .9))).normalized().to_track_quat("Z", "Y").to_matrix().to_4x4()
        for vv in res["verts"]: vv.co.z *= .3; vv.co.x *= 1.0; vv.co = rot @ vv.co
        bmesh.ops.translate(bm, verts=res["verts"], vec=n * r * 1.0)
        tone.append(rnd.random() < .4)
    me = bpy.data.meshes.new(tag); bm.to_mesh(me); bm.free()
    me.materials.append(LEAF1); me.materials.append(LEAF2)
    per = len(me.polygons) // len(tone)
    for i, t in enumerate(tone):
        if t:
            for p in me.polygons[i * per:(i + 1) * per]: p.material_index = 1
    for p in me.polygons: p.use_smooth = True
    o = K.link(bpy.data.objects.new(tag, me)); o.location = c
    bm = bmesh.new(); bmesh.ops.create_icosphere(bm, subdivisions=3, radius=r * .8)
    cm = bpy.data.meshes.new(tag + "Core"); bm.to_mesh(cm); bm.free(); cm.materials.append(LEAF2)
    for p in cm.polygons: p.use_smooth = True
    K.link(bpy.data.objects.new(tag + "Core", cm)).location = c
    for j in range(7):
        u = rnd.uniform(.1, .9); v = rnd.uniform(0, 6.283); q = math.sqrt(1 - u * u)
        p = Vector(c) + Vector((q * math.cos(v), q * math.sin(v), u)) * r * 1.08
        m = PINK if j % 2 else ORANGE
        for k in range(5):
            a = k * 1.2566
            K.cyl(f"{tag}F{j}P{k}", .024, .024, .012, tuple(p + Vector((math.cos(a), math.sin(a), 0)) * .026), m, 8)
        K.cyl(f"{tag}F{j}C", .012, .012, .014, tuple(p), CENTRE, 8)

L, D, H = 1.9, .5, .42
K.box("Trough", (D, L, H), (0, 0, 0), STONE, .03, 3)
K.box("Soil", (D - .1, L - .1, .02), (0, 0, H - .06), K.SOIL, .005)
for i, y in enumerate((-.58, 0, .58)):
    bush(f"Bush{i}", (0, y + rnd.uniform(-.03, .03), H + .08), .26)
K.finish(OUT, "street_planter", ortho=2.5, centre=(0, 0, .5))
