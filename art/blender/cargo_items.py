"""Canopy production-line cargo: the six items riding the belts and glass tubes between stations (map3d.js
buildCargoKinds).  Each sits under an empty Cargo0..Cargo5 placed at its base centre; code merges each empty's meshes
into one vertex-coloured instanced mesh, so material colours become vertex colours and textures are not used.
  Cargo0 seedling in a small terracotta pot     Cargo1 grown plant with fan leaves and frosted colas
  Cargo2 trimmed buds on a kraft tray           Cargo3 sealed jar (green glass, gold lid, cream label)
  Cargo4 pickup bag (kraft, folded top, rope handles, green label)   Cargo5 taped shipping box with a label
True scale (they ride inside a tube bore of .68 map units): metres = map units / 1.69 on every axis, and nothing is
taller or wider than about .55 map units.  The empties are spaced along X for the preview only.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P cargo_items.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy, bmesh
from mathutils import Vector, Matrix
import canopy_kit as K

OUT = K.begin("CargoItems")
M = 1 / 1.69
rnd = random.Random(3)
POT = K.mat("CargoPot", "#b8673f", .75); POT_RIM = K.mat("CargoPotRim", "#c97a50", .75); EARTH = K.mat("CargoSoil", "#4a3424", 1.)
STEMM = K.mat("CargoStem", "#5b8a3c", .6)
LEAF_Y = K.mat("CargoLeafYoung", "#86b955", .6, two_sided=True); LEAF_D = K.mat("CargoLeafDeep", "#3f7a33", .6, two_sided=True)
LEAF_M = K.mat("CargoLeafMid", "#4f8a3a", .6, two_sided=True)
TRAY = K.mat("CargoTray", "#c9a46a", .8); JAR = K.mat("CargoJarGlass", "#a9cdb3", .3); LID = K.mat("CargoLid", "#d2b25e", .35)
LABEL = K.mat("CargoLabel", "#f3efda", .7); BAG = K.mat("CargoBag", "#d9bd88", .85); BAG_D = K.mat("CargoBagFold", "#bf9f68", .85)
ROPE = K.mat("CargoRope", "#8a6e44", .8); GREENL = K.mat("CargoGreenLabel", "#496f50", .6)
CARTON = K.mat("CargoCarton", "#c49a5e", .85); TAPE = K.mat("CargoTape", "#e6d6ad", .6)

slots = []
def cargo(k, x):
    e = bpy.data.objects.new(f"Cargo{k}", None); K.col.objects.link(e); e.location = (x, 0, 0); slots.append(e); return e

def own(e, objs):
    for o in objs:
        if o is None: continue
        o.parent = e; o.matrix_parent_inverse = Matrix.Translation(e.location).inverted()   # keep it where it was built

def leaf_card(name, m, L, W):
    """A pointed leaflet card, 4 triangles, base at origin, tip along +Y."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    vs = [bm.verts.new(p) for p in ((0, 0, 0), (-W, L * .45, 0), (0, L, 0), (W, L * .45, 0), (0, L * .45, W * .4))]
    for f in ((0, 4, 1), (1, 4, 2), (2, 4, 3), (3, 4, 0)): bm.faces.new([vs[i] for i in f])
    bm.to_mesh(me); bm.free(); me.materials.append(m)
    for p in me.polygons: p.use_smooth = True
    return me

def fan(name, m, L, n=5):
    """A small fan leaf: n leaflet cards spread in a fan (4n triangles), petiole at origin pointing +Y."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    for j in range(n):
        a = (j - (n - 1) / 2) * .5; ln = L * (1 - .3 * abs(j - (n - 1) / 2) / ((n - 1) / 2))
        R = Matrix.Rotation(-a, 4, 'Z'); W = ln * .14
        vs = [bm.verts.new(R @ Vector(p)) for p in ((0, 0, 0), (-W, ln * .45, -ln * .05), (0, ln, -ln * .12), (W, ln * .45, -ln * .05), (0, ln * .45, W * .3))]
        for f in ((0, 4, 1), (1, 4, 2), (2, 4, 3), (3, 4, 0)): bm.faces.new([vs[i] for i in f])
    bm.to_mesh(me); bm.free(); me.materials.append(m)
    for p in me.polygons: p.use_smooth = True
    return me

def place(name, me, loc, yaw, pitch, s=1.):
    o = bpy.data.objects.new(name, me); K.col.objects.link(o)
    o.location = loc; o.rotation_euler = (pitch, 0, yaw - math.pi / 2); o.scale = (s,) * 3; return o

def small_pot(tag, x, r, h):
    a = K.cyl(f"{tag}Pot", r * .78, r, h * .85, (x, 0, 0), POT, 14)
    b = K.cyl(f"{tag}Rim", r * 1.08, r * 1.08, h * .2, (x, 0, h * .8), POT_RIM, 14)
    c = K.cyl(f"{tag}Soil", r * .95, r * .95, .004, (x, 0, h * .98), EARTH, 12)
    return [a, b, c]

def blob(name, m, c, r, sy=1.25, sub=1):
    me = bpy.data.meshes.new(name); bm = bmesh.new(); bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    for v in bm.verts: v.co.z *= sy
    bm.to_mesh(me); bm.free(); me.materials.append(m)
    for p in me.polygons: p.use_smooth = True
    o = bpy.data.objects.new(name, me); K.col.objects.link(o); o.location = c; return o

GAP = .3
# ---------- 0: seedling ----------
x = 0; e = cargo(0, x)
r, h = .1 * M, .13 * M
parts = small_pot("Seed", x, r, h)
parts.append(K.cyl("SeedStem", .0045, .0055, .075, (x, 0, h * .95), STEMM, 5))
young = leaf_card("SeedLeafMesh", LEAF_Y, .045, .012); first = leaf_card("SeedCotyMesh", LEAF_M, .028, .011)
for j, (yaw, z, me, p) in enumerate(((0, .045, first, .2), (math.pi, .047, first, .2), (math.pi / 2, .065, young, .45), (-math.pi / 2, .066, young, .45), (.8, .072, young, .9))):
    parts.append(place(f"SeedLeaf{j}", me, (x, 0, h * .95 + z), yaw, p))
own(e, parts)

# ---------- 1: grown plant ----------
x += GAP; e = cargo(1, x)
r, h = .12 * M, .15 * M
parts = small_pot("Plant", x, r, h)
parts.append(K.cyl("PlantStem", .006, .008, .16, (x, 0, h * .95), STEMM, 5))
fans = [fan("PlantFanDeep", LEAF_D, .1, 7), fan("PlantFanMid", LEAF_M, .09, 7)]
for tier, z in enumerate((.05, .09, .13)):
    for a in range(4):
        yaw = a * math.pi / 2 + tier * .7
        parts.append(place(f"PlantLeaf{tier}{a}", fans[(tier + a) % 2], (x, 0, h * .95 + z), yaw, -.25 + tier * .15, 1 - tier * .18))
for j, (dx, dy, z, rr) in enumerate(((0, 0, .165, .024), (.04, .012, .135, .017), (-.035, -.018, .14, .017))):
    parts.append(blob(f"PlantCola{j}", K.BUD, (x + dx, dy, h * .95 + z), rr, 1.7))
    for k in range(3):    # orange hairs
        a = k * 2.1 + j
        parts.append(blob(f"PlantPistil{j}{k}", K.PISTIL, (x + dx + math.cos(a) * rr * .8, dy + math.sin(a) * rr * .8, h * .95 + z + rr * .5), rr * .22, 1, 0))
own(e, parts)

# ---------- 2: trimmed buds on a tray ----------
x += GAP; e = cargo(2, x)
parts = [K.box("TrayBase", (.42 * M, .3 * M, .012), (x, 0, 0), TRAY, .003, 1)]
for sx in (-1, 1):
    parts.append(K.box(f"TrayLipX{sx}", (.006, .3 * M, .02), (x + sx * (.42 * M / 2 - .003), 0, 0), TRAY, .002, 1))
    parts.append(K.box(f"TrayLipY{sx}", (.42 * M, .006, .02), (x, sx * (.3 * M / 2 - .003), 0), TRAY, .002, 1))
for j, (dx, dy, s, yaw) in enumerate(((-.06, .02, 1.25, .3), (.06, -.02, 1.2, 1.9), (0, .015, 1.35, 4.), (.02, -.035, .95, 2.6))):
    parts.append(K.inst(f"TrayBud{j}", K.NUG_MESH, (x + dx, dy, .01), (0, 0, yaw), s))
own(e, parts)

# ---------- 3: sealed jar ----------
x += GAP; e = cargo(3, x)
r = .13 * M
parts = [K.cyl("JarBody", r, r, .3 * M, (x, 0, 0), JAR, 16),
         K.cyl("JarShoulder", r * .86, r * .86, .02, (x, 0, .3 * M), JAR, 16),
         K.cyl("JarLid", r * 1.02, r * 1.02, .05 * M, (x, 0, .3 * M + .012), LID, 16)]
lb = K.box("JarLabel", (.13 * M, .006, .11 * M), (x, -r + .001, .08 * M), LABEL, 0, 1)
parts.append(lb)
parts.append(K.box("JarLabelMark", (.05 * M, .006, .03 * M), (x, -r - .001, .14 * M), GREENL, 0, 1))
own(e, parts)

# ---------- 4: pickup bag ----------
x += GAP; e = cargo(4, x)
bw, bd, bh = .32 * M, .2 * M, .36 * M
parts = [K.box("BagBody", (bw, bd, bh), (x, 0, 0), BAG, .004, 1),
         K.box("BagFold", (bw + .004, bd + .004, .05 * M), (x, 0, bh - .045 * M), BAG_D, .003, 1)]
for k, dy in enumerate((-.035, .035)):
    parts.append(K.tube(f"BagHandle{k}", [(x - .035, dy, bh), (x - .03, dy, bh + .03), (x, dy, bh + .042), (x + .03, dy, bh + .03), (x + .035, dy, bh)], .003, ROPE))
    parts[-1].data.bevel_resolution = 0; parts[-1].data.resolution_u = 2
parts.append(K.box("BagLabel", (.16 * M, .004, .14 * M), (x, -bd / 2 - .001, .13 * M), GREENL, 0, 1))
parts.append(K.box("BagLabelMark", (.06 * M, .004, .06 * M), (x, -bd / 2 - .003, .17 * M), LABEL, 0, 1))
own(e, parts)

# ---------- 5: shipping box ----------
x += GAP; e = cargo(5, x)
cw, cd, ch = .38 * M, .3 * M, .26 * M
parts = [K.box("BoxBody", (cw, cd, ch), (x, 0, 0), CARTON, .004, 1),
         K.box("BoxSeam", (cw + .002, .002, .002), (x, 0, ch), CARTON, 0, 1),
         K.box("BoxTape", (.08 * M, cd + .004, .004), (x, 0, ch - .002), TAPE, 0, 1)]
for s in (-1, 1):
    parts.append(K.box(f"BoxTapeSide{s}", (.08 * M, .004, .12 * M), (x, s * (cd / 2 + .001), ch - .12 * M), TAPE, 0, 1))
parts.append(K.box("BoxLabel", (.004, .12 * M, .09 * M), (x + cw / 2 + .001, -.02, .08 * M), GREENL, 0, 1))
parts.append(K.box("BoxLabelLines", (.004, .08 * M, .012), (x + cw / 2 + .003, -.02, .12 * M), LABEL, 0, 1))
own(e, parts)

K.finish(OUT, "cargo_items", ortho=1.15, centre=(GAP * 2.5, 0, .05))
