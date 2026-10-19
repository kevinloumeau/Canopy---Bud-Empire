"""Canopy display case (shop floor), modelled from the current sprite.

A long glass case on a green base with a brass frame: a raised back tier of brass-lidded jars of buds, a front shelf
of cream boxes and green tins, and a potted plant.  Sized to the 3D map's spec (0.41 x 1.24 m, 0.83 m tall) with the
long axis along Y and the display face toward -X.  Set CANOPY_SPRITE_VIEW=1 to render it turned like the sprite
(display face toward -Y) for comparison.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P display_case.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("DisplayCase")
rnd = K.rnd
PALEOAK = K.mat("PaleOak", "#d6a96c", .55)
CASEGLASS = K.mat("CaseGlass", "#eef6f2", .05)
CASEGLASS.node_tree.nodes["Principled BSDF"].inputs["Alpha"].default_value = .05
CASEGLASS.blend_method = "BLEND" if hasattr(CASEGLASS, "blend_method") else None

def nug(name, x, y, z, s=1.):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.1))

def leaf_print(name, x, y, z, s=.32, face="-y"):
    """A little green leaf printed on a vertical face."""
    o = K.leaf_at(name, (x, y, z), 0, math.pi / 2, s, K.LEAF_MESHES[0])
    o.rotation_euler = (math.pi / 2, 0, math.pi) if face == "-y" else (math.pi / 2, 0, -math.pi / 2)
    return o

def jar(tag, x, y, z, r=.075, h=.17):
    K.cyl(tag + "Glass", r, r, h, (x, y, z), K.GLASS, 40)
    for i in range(6):
        a = i * 2.4; rr = r * .4 * (i % 3) / 2
        nug(f"{tag}Nug{i}", x + math.cos(a) * rr, y + math.sin(a) * rr, z + .01 + (i // 3) * .06, .95)
    K.cyl(tag + "Band", r + .003, r + .003, .02, (x, y, z + h - .02), K.BRASS, 40)
    K.cyl(tag + "Lid", r + .006, r + .006, .035, (x, y, z + h), K.BRASS, 40)

def tin(tag, x, y, z, r=.075, h=.13):
    K.cyl(tag, r, r, h, (x, y, z), K.GREEN_D, 40)
    K.cyl(tag + "Lid", r + .004, r + .004, .03, (x, y, z + h), K.BRASS, 40)
    leaf_print(tag + "Leaf", x, y - r - .004, z + h * .3, .16)

def carton(tag, x, y, z, w=.16, d=.12, h=.2, face="-y"):
    K.box(tag, (w, d, h), (x, y, z), K.CREAM, .012)
    if face == "-y": leaf_print(tag + "Leaf", x, y - d / 2 - .004, z + h * .3, .22)
    else: leaf_print(tag + "Leaf", x + w / 2 + .004, y, z + h * .3, .22, "+x")

# ---------- green base with an oak plinth and rail ----------
L, D, BH, GH = 1.24, .41, .3, .53
K.box("Plinth", (L + .04, D + .04, .05), (0, 0, 0), PALEOAK, .012)
K.box("Base", (L, D, BH - .08), (0, 0, .05), K.GREEN_D, .008)
for i, x in enumerate((-L / 4, L / 4)):   # panels on both long sides: the map sees the staff side
    for sy in (-1, 1):
        K.box(f"BasePanel{i}{sy}", (L / 2 - .07, .01, BH - .15), (x, sy * (D / 2 + .003), .085), K.GREEN, .005)
for sx in (-1, 1):
    K.box(f"EndPanel{sx}", (.01, D - .07, BH - .15), (sx * (L / 2 + .003), 0, .085), K.GREEN, .005)
K.box("Rail", (L + .04, D + .04, .035), (0, 0, BH - .035), PALEOAK, .01)
K.box("Floor", (L - .03, D - .03, .015), (0, 0, BH), PALEOAK, .004)
FL = BH + .015

# ---------- glass box with a brass frame ----------
T = .022
for sx in (-1, 1):
    for sy in (-1, 1):
        K.box(f"Post{sx}{sy}", (T, T, GH), (sx * (L / 2 - T / 2), sy * (D / 2 - T / 2), BH), K.BRASS, .005)
K.box("PostMid", (T, T, GH), (0, -D / 2 + T / 2, BH), K.BRASS, .005)
for sy in (-1, 1):
    K.box(f"TopRailX{sy}", (L, T, T), (0, sy * (D / 2 - T / 2), BH + GH - T), K.BRASS, .005)
for sx in (-1, 1):
    K.box(f"TopRailY{sx}", (T, D, T), (sx * (L / 2 - T / 2), 0, BH + GH - T), K.BRASS, .005)
K.box("GlassFront", (L - .03, .006, GH - .02), (0, -D / 2 + .01, BH + .01), CASEGLASS, 0)
K.box("GlassBack", (L - .03, .006, GH - .02), (0, D / 2 - .01, BH + .01), CASEGLASS, 0)
for sx in (-1, 1):
    K.box(f"GlassEnd{sx}", (.006, D - .03, GH - .02), (sx * (L / 2 - .01), 0, BH + .01), CASEGLASS, 0)
K.box("GlassTop", (L - .03, D - .03, .006), (0, 0, BH + GH - .01), CASEGLASS, 0)

# ---------- back tier of jars, front shelf of cartons and tins ----------
TIER = FL + .11
K.box("Tier", (L - .08, .15, .11), (0, D / 2 - .1, FL), PALEOAK, .008)
for i in range(5):
    jar(f"Jar{i}", -.47 + i * .2, D / 2 - .1, TIER, .066 - .004 * i, .15 - .01 * i)
K.box("Shelf", (L - .08, .17, .02), (0, -.08, FL + .03), PALEOAK, .006)
SH = FL + .05
for i in range(4):
    carton(f"Box{i}", -.5 + i * .11, -.09, SH, .095, .08, .13 - .008 * (i % 2))
for i in range(3):
    tin(f"Tin{i}", -.03 + i * .11, -.085, SH, .048 - .003 * i, .095 - .008 * i)
for i in range(3):
    carton(f"Stack{i}", .47, -.08, SH + i * .09, .12, .1, .085, "+x")
K.cyl("PlantPot", .06, .048, .09, (.3, .02, FL), K.CREAM, 32)
K.cyl("PlantSoil", .056, .056, .008, (.3, .02, FL + .085), K.SOIL, 24)
K.plant("Plant", .3, .02, FL + .09, .15, .42)

# ---------- turn to the map's spec: display face toward -X, long axis along Y ----------
if os.environ.get("CANOPY_SPRITE_VIEW") != "1":
    import bpy
    from mathutils import Matrix
    bpy.context.view_layer.update()          # new objects' matrix_world is stale until the scene updates
    R = Matrix.Rotation(-math.pi / 2, 4, "Z")
    for o in bpy.data.objects:
        if o.parent is None and o.type in ("MESH", "CURVE", "FONT", "EMPTY"):
            o.matrix_world = R @ o.matrix_world

K.finish(OUT, "display_case" + ("_spriteview" if os.environ.get("CANOPY_SPRITE_VIEW") == "1" else ""), ortho=1.6, centre=(0, 0, .4))
