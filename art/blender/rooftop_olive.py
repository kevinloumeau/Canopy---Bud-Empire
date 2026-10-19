"""Canopy rooftop olive (rooftop.js): an olive tree in a tall cream pot, two of which stand in the rooftop deck's
corners.  Pot from rooftop.js (radius .34 top / .26 foot, .7 world high, #d9cdb4); the tree is a gnarled forked trunk
with sprays of slim silvery leaves and a few olives, in the look of the street's potted olive (street.planter.round).
Origin at the pot's centre on the deck.

Needs canopy_kit.py and tree_parts.py in the same folder.  Run headless with
    blender -b -P rooftop_olive.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("RooftopOlive")
rnd = random.Random(3)
M, V = 1 / 1.69, .7247
POT = K.mat("OlivePot", "#d9cdb4", .55); POT_D = K.mat("OlivePotBand", "#c9bb9e", .6)
EARTH = K.mat("PotSoil", "#4a3628", 1.); BARK = K.mat("OliveBark", "#7d6a52", .85)
LEAF_TOP = K.mat("OliveLeaf", "#6f8550", .6, two_sided=True); LEAF_SILVER = K.mat("OliveLeafSilver", "#9aab7c", .55, two_sided=True)
FRUIT = K.mat("Olive", "#8d9a3c", .35)

# ---------- the pot: tapered, with a rolled lip and a band ----------
R0, R1, PH = .26 * M, .34 * M, .7 * V
K.cyl("Pot", R0, R1, PH, (0, 0, 0), POT, 40)
K.cyl("PotLip", R1 + .012, R1 + .012, .045, (0, 0, PH - .045), POT, 40)
K.cyl("PotBand", R0 + .012, R0 + .016, .04, (0, 0, .03), POT_D, 40)
K.cyl("Soil", R1 - .022, R1 - .022, .01, (0, 0, PH - .008), EARTH, 32)   # sits just above the lip's top cap

# ---------- one slim leaf mesh, shared: a lance shape with a fold down the middle ----------
def leaf_mesh(name, L=.13, W=.024):
    me = bpy.data.meshes.new(name)
    pts = [(0, 0), (.25, .8), (.55, 1.), (.8, .7), (1., 0)]
    v = [(0, 0, 0)] + [(L * t, W * w, W * .25 * w) for t, w in pts[1:-1]] + [(L, 0, 0)] + [(L * t, -W * w, W * .25 * w) for t, w in pts[1:-1]]
    v[0] = (0, 0, 0)
    mid = [(L * t, 0, -W * .15) for t, _ in pts[1:-1]]
    verts = v + mid
    # indices: 0 base, 1-3 left, 4 tip, 5-7 right, 8-10 midrib
    f = [(0, 1, 8), (1, 2, 9, 8), (2, 3, 10, 9), (3, 4, 10), (0, 8, 5), (8, 9, 6, 5), (9, 10, 7, 6), (10, 4, 7)]
    me.from_pydata(verts, [], f)
    for p in me.polygons: p.use_smooth = True
    return me
LEAVES = []
for m in (LEAF_TOP, LEAF_SILVER):
    me = leaf_mesh(f"OliveLeaf_{m.name}"); me.materials.append(m); LEAVES.append(me)
FRUIT_ME = bpy.data.meshes.new("OliveFruit"); bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=7, radius=.021)
bm.to_mesh(FRUIT_ME); bm.free(); FRUIT_ME.materials.append(FRUIT)
for p in FRUIT_ME.polygons: p.use_smooth = True

# ---------- trunk and branches ----------
TOP = PH - .03
trunk_top = Vector((.02, -.01, .98))
K.tube("Trunk", [(0, 0, TOP - .05), (.03, .01, TOP + .2), (-.02, .0, .7), (.025, -.015, .86), tuple(trunk_top)], .045, BARK, .03)
# Crown centres from rooftop.js (y 2.05 / 1.8 / 1.9 world; offsets (0,0), (-.25,.2), (.22,-.2) map; radii .55 / .4 / .42).
CROWNS = [((0, 0, 2.05 * V), .55 * M), ((-.25 * M, -.2 * M, 1.8 * V), .4 * M), ((.22 * M, .2 * M, 1.9 * V), .42 * M)]
n_leaf = 0
for b, (c, r) in enumerate(CROWNS):
    c = Vector(c)
    # Two or three branches out to each crown, each ending in sprays of leaves along its last third.
    for k in range(3 if b == 0 else 2):
        a = rnd.uniform(0, 6.3)
        end = c + Vector((math.cos(a) * r * .55, math.sin(a) * r * .55, rnd.uniform(-.05, .08)))
        mid = trunk_top.lerp(end, .5) + Vector((0, 0, .04))
        K.tube(f"Branch{b}{k}", [tuple(trunk_top), tuple(mid), tuple(end)], .016, BARK, .007)
        for s in range(12):
            t = rnd.uniform(.35, 1.)
            base = trunk_top.lerp(mid, min(1, t * 2)) if t < .5 else mid.lerp(end, (t - .5) * 2)
            for q in range(5):
                yaw = rnd.uniform(0, 6.3); pitch = rnd.uniform(-.2, .7)
                o = bpy.data.objects.new(f"Leaf{n_leaf}", LEAVES[(q + s) % 2]); K.col.objects.link(o); n_leaf += 1
                o.location = base + Vector((rnd.uniform(-.02, .02), rnd.uniform(-.02, .02), rnd.uniform(-.01, .02)))
                o.rotation_euler = (rnd.uniform(-.4, .4), -pitch, yaw); o.scale = (rnd.uniform(.85, 1.25),) * 3
        for f in range(3):
            o = bpy.data.objects.new(f"Olive{b}{k}{f}", FRUIT_ME); K.col.objects.link(o)
            o.location = end.lerp(mid, rnd.uniform(.1, .4)) + Vector((0, 0, -.03)); o.scale = (1, 1, 1.25)
print("leaves", n_leaf)
K.finish(OUT, "rooftop_olive", ortho=2.1, centre=(0, 0, .85))
