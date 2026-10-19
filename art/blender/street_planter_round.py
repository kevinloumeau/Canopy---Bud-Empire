"""Canopy round street planter: terracotta pot with a small olive tree.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_planter_round.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("StreetPlanterRound")
rnd = K.rnd
BARK = K.mat("OliveBark", "#7a5a3c", .8)
OLEAF = K.mat("OliveLeaf", "#5e7a44", .55, two_sided=True)
OLIVE = K.mat("Olive", "#a7b04a", .4)

leaf_me = bpy.data.meshes.new("OliveLeafMesh")
bm = bmesh.new(); res = bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1)
for v in res["verts"]: v.co = Vector((v.co.x * .022, (v.co.y + 1) * .055, v.co.z * .006))
bm.to_mesh(leaf_me); bm.free(); leaf_me.materials.append(OLEAF)
for p in leaf_me.polygons: p.use_smooth = True

K.cyl("Pot", .2, .27, .42, (0, 0, 0), K.TERRA, 48)
K.cyl("PotRim", .29, .29, .07, (0, 0, .4), K.TERRA_D, 48)
K.cyl("Soil", .26, .26, .02, (0, 0, .43), K.SOIL, 32)
trunk = [(0, 0, .44), (.02, .01, .62), (-.01, .02, .78), (0, 0, .9)]
K.tube("Trunk", trunk, .05, BARK, .03)
branches = []
for i in range(6):
    a = i * 1.05 + rnd.uniform(-.2, .2); z0 = .72 + .04 * (i % 3)
    p0 = Vector((0, 0, z0)); p1 = p0 + Vector((math.cos(a) * .17, math.sin(a) * .17, .2 + rnd.uniform(0, .14)))
    p2 = p1 + Vector((math.cos(a) * .26, math.sin(a) * .26, .02))
    K.tube(f"Branch{i}", [tuple(p0), tuple(p1), tuple(p2)], .014, BARK, .006)
    branches.append((p0, p1, p2))
n = 0
for p0, p1, p2 in branches:
    for t in [i / 11 for i in range(2, 12)]:
        base = p1.lerp(p2, t) if t > .45 else p0.lerp(p1, t * 2)
        for s in (-1, 1):
            o = bpy.data.objects.new(f"OLeaf{n}", leaf_me); K.link(o); n += 1
            o.location = base; o.rotation_euler = (rnd.uniform(-.9, .5), rnd.uniform(-.5, .5), rnd.uniform(0, 6.3))
            o.scale = (1.5,) * 3
    for j in range(2):
        K.cyl(f"Olive{n}{j}", .024, .024, .04, tuple(p1.lerp(p2, .3 + .3 * j) + Vector((0, 0, -.03))), OLIVE, 12)
K.finish(OUT, "street_planter_round", ortho=1.7, centre=(0, 0, .65))
