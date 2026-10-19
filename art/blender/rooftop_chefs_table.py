"""Canopy rooftop lounge: the Chef's table tier, a long oak table laid for an infused tasting along the front rail.

Matches rooftop.js (PR #64, t7): c7 = {x0: x0 + 6.9, x1: x0 + 9.1, z: z1 - .85}; the top 2.2 x .6 map at .72-.78 world
on four dark oak legs, a cream runner, four places at c7.x0 + .3 + k * (2.2 - .6) / 3 alternating z -.17 / +.17,
four velvet stools on brass poles on the rail side (z + .46), and two brass candle lamps at c7.x0 + .55 and
c7.x1 - .55.  Smokers' lounge dressing, no wine: a bud on each tasting plate, two glass tasting jars, two brass
ashtrays, a rolling tray, a grinder and a low plant in the middle.
The origin is the table's centre on the deck, map ((c7.x0 + c7.x1) / 2, y, c7.z) = (x0 + 8.0, y, z1 - .85); the rail
side (map +z) is Blender -Y.  The candle cores are "CandleGlow0" and "CandleGlow1", material "CandleGlow".

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_chefs_table.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy, bmesh
import canopy_kit as K

def H(m): return m / 1.69
def V(w): return w * .7247

OUT = K.begin("RooftopChefsTable")
rr = random.Random(9)
OAKT = K.mat("TableOak", "#b98d5c", .55)
OAKD = K.mat("OakDark", "#6e4a2c", .6)
VELVET = K.mat("Velvet", "#6b2436", .85)
PLATE = K.mat("Porcelain", "#fbf8ee", .3)
RUNNER = K.mat("Runner", "#efe4cf", .8)
GLOW = K.mat("CandleGlow", "#fff0c8", .4, 0, 4.)
ASH = K.mat("Ash", "#8d8a84", .9)
PAPER = K.mat("Papers", "#f4efe2", .8)
JAR = K.glass("JarGlass", "#e3f1ea")

L, D = H(2.2), H(.6)
TOP = V(.78)
# ---------- the table: oak top on dark oak legs with an apron ----------
K.box("TableTop", (L, D, V(.06)), (0, 0, V(.72)), OAKT, .01, 2)
K.box("Apron", (L - H(.2), D - H(.14), V(.08)), (0, 0, V(.64)), OAKD, .006, 1)
for sx in (-1, 1):
    for sy in (-1, 1):
        K.box(f"Leg{sx}{sy}", (H(.07), H(.07), V(.64)), (sx * (L / 2 - H(.1)), sy * H(.22), 0), OAKD, .006, 1)
K.box("Runner", (L - H(.2), H(.2), .004), (0, 0, TOP), RUNNER, 0)

def buds(name, m):
    bm = bmesh.new()
    for x, y, z, r in ((-.01, -.006, .013, .016), (.011, .006, .016, .017), (0, 0, .036, .015)):
        res = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=r)
        for v in res["verts"]: v.co *= 1 + rr.uniform(-.15, .15); v.co.z *= 1.15
        bmesh.ops.translate(bm, verts=res["verts"], vec=(x, y, z))
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    me.materials.append(m); return me
PB = buds("PlateBuds", K.DRY_D)

# ---------- four places: plate with a tasting bud, and a velvet stool on the rail side ----------
for k in range(4):
    x = H(-.8 + k * 1.6 / 3); y = -H(-.17 + (k & 1) * .34)
    K.cyl(f"Plate{k}", H(.12), H(.1), .012, (x, y, TOP), PLATE, 14)
    K.inst(f"PlateNug{k}", PB, (x + .008, y, TOP + .01), (0, 0, rr.uniform(0, 6.3)), 1.15)
    K.cyl(f"StoolFoot{k}", .05, .05, .008, (x, -H(.46), 0), K.BRASS, 12)
    K.cyl(f"StoolPole{k}", H(.035), H(.035), V(.5), (x, -H(.46), 0), K.BRASS, 8)
    K.cyl(f"StoolRing{k}", .045, .045, .008, (x, -H(.46), V(.2)), K.BRASS, 12)
    K.cyl(f"StoolSeat{k}", H(.15), H(.14), V(.06), (x, -H(.46), V(.5)), VELVET, 14)

# ---------- two brass candle lamps on the runner ----------
for i, sx in enumerate((-1, 1)):
    x = sx * H(1.1 - .55)
    K.cyl(f"CandleFoot{i}", .028, .024, .01, (x, 0, TOP), K.BRASS, 10)
    K.cyl(f"CandleStem{i}", .008, .008, V(.22), (x, 0, TOP), K.BRASS, 8)
    K.cyl(f"CandleCup{i}", .02, .03, .02, (x, 0, TOP + V(.22) - .01), K.BRASS, 10)
    K.cyl(f"CandleGlow{i}", .016, .013, .04, (x, 0, TOP + V(.22) + .006), GLOW, 10)
    K.cyl(f"CandleChimney{i}", .028, .03, .07, (x, 0, TOP + V(.22) + .006), JAR, 10)

# ---------- two glass tasting jars, a low plant in the middle ----------
JB = buds("JarBuds", K.DRY)
for i, sx in enumerate((-1, 1)):
    x = sx * .2
    K.cyl(f"TastingJar{i}", .03, .03, .085, (x, 0, TOP), JAR, 12)
    K.inst(f"TastingJar{i}Buds", JB, (x, 0, TOP + .003), (0, 0, i * 2.), 1.)
    K.cyl(f"TastingJar{i}Lid", .032, .03, .014, (x, 0, TOP + .085), K.BRASS, 12)
K.cyl("PlantPot", .045, .035, .05, (0, 0, TOP), K.mat("PotCream", "#d9cdb4", .6), 12)
K.cyl("PlantSoil", .04, .04, .004, (0, 0, TOP + .048), K.SOIL, 10)
for i in range(4):
    K.leaf_at(f"PlantLeaf{i}", (0, 0, TOP + .05), i * 1.571 + .4, .45, .55, K.LEAF_MESHES[i % 2])

# ---------- smokers' dressing at the table ends: two ashtrays, a rolling tray and a grinder ----------
def ashtray(name, x, y):
    K.cyl(name, .032, .028, .014, (x, y, TOP), K.BRASS, 12)
    K.cyl(name + "Ash", .024, .024, .002, (x, y, TOP + .012), ASH, 10)
    o = K.box(name + "Rest", (.03, .008, .006), (x + .02, y, TOP + .012), PAPER, .002, 1); o.rotation_euler.z = .4
ashtray("AshtrayA", -.6, .075)
ashtray("AshtrayB", .6, -.075)
K.box("RollingTray", (.1, .07, .008), (-.6, -.07, TOP), K.BRASS, .003, 1)
K.box("RollingTrayIn", (.09, .06, .002), (-.6, -.07, TOP + .007), OAKT, 0)
K.box("Papers", (.03, .02, .004), (-.615, -.07, TOP + .009), PAPER, .001, 1)
pre = K.cyl("PreRoll", .004, .006, .045, (-.585, -.07, TOP + .014), PAPER, 6); pre.rotation_euler.y = math.pi / 2
K.cyl("Grinder", .022, .022, .026, (.6, .075, TOP), K.GREEN, 12)
K.cyl("GrinderLid", .023, .023, .008, (.6, .075, TOP + .026), K.BRASS, 12)

K.finish(OUT, "rooftop_chefs_table", ortho=1.9, centre=(0, -.05, .4))
