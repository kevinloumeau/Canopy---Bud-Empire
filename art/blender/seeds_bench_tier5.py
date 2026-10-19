"""Canopy seeds bench, tier 5 (Lv 75): a lab-grade cloning cabinet.  The green lacquered base carries a glass-fronted
cream cabinet with brass framing, two lit shelves and a lit floor of clones in rockwool cubes, a crest with a brass
leaf logo, and a humidifier.  Same footprint, facing and origin as seeds_bench (tier 3).

Needs canopy_kit.py, station_parts.py and seedgrow45_parts.py in the same folder.  Run headless with
    blender -b -P seeds_bench_tier5.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as SP
import seedgrow45_parts as T

OUT = K.begin("SeedsBenchTier5")
rnd = K.rnd
M = T.mats()
CREAMBODY = K.mat("CabinetCream", "#efe4c8", .45)
SHELF = K.mat("ShelfGlass", "#e8f0ea", .05)
_b = SHELF.node_tree.nodes["Principled BSDF"]; _b.inputs["Alpha"].default_value = .12; _b.inputs["Coat Weight"].default_value = .6
if hasattr(SHELF, "blend_method"): SHELF.blend_method = "BLEND"
WOOL = K.mat("Rockwool", "#d8cdb2", .9)
L, D, H = 1.7, 1.0, .74
TOP = T.cabinet(M, L, D, H, panels=3, top_over=.1)

# ---------- the cloning cabinet on top: cream carcass, open glass front with a brass frame ----------
CL, CD, CH = 1.56, .66, .82
CY = .08                                     # set back a little from the front edge
Z0 = TOP
K.box("CabBack", (CL, .04, CH), (0, CY + CD / 2 - .02, Z0), M["LACQUER_D"], .01)   # deep green back so the clones read
for sx in (-1, 1):
    K.box(f"CabSide{sx}", (.04, CD, CH), (sx * (CL / 2 - .02), CY, Z0), CREAMBODY, .01)
K.box("CabFloor", (CL, CD, .04), (0, CY, Z0), CREAMBODY, .01)
K.box("CabTop", (CL + .06, CD + .06, .06), (0, CY, Z0 + CH), M["LACQUER"], .02)
K.box("CabTopBand", (CL + .07, CD + .07, .02), (0, CY, Z0 + CH - .005), K.BRASS, .006)
# crest with the leaf logo
K.box("Crest", (.5, .05, .26), (0, CY - CD / 2 + .04, Z0 + CH + .06), M["LACQUER"], .02)
K.box("CrestTrim", (.44, .052, .2), (0, CY - CD / 2 + .039, Z0 + CH + .09), K.BRASS, .006)
K.box("CrestInset", (.4, .054, .17), (0, CY - CD / 2 + .038, Z0 + CH + .105), M["LACQUER_D"], .006)
T.leaf_logo("LeafLogo", (0, CY - CD / 2 + .008, Z0 + CH + .115), .14)
# brass front frame: posts, two shelf rails, a glass front
FY = CY - CD / 2
for x in (-CL / 2 + .02, 0, CL / 2 - .02):
    K.box(f"FramePost{x:.2f}", (.035, .03, CH), (x, FY + .01, Z0), K.BRASS, .008)
for z in (Z0 + .02, Z0 + CH - .03):
    K.box(f"FrameRail{z:.2f}", (CL, .03, .03), (0, FY + .01, z), K.BRASS, .008)
FRONTGLASS = K.mat("FrontGlass", "#f2f8f4", .05)
_b = FRONTGLASS.node_tree.nodes["Principled BSDF"]; _b.inputs["Alpha"].default_value = .06; _b.inputs["Coat Weight"].default_value = .8
if hasattr(FRONTGLASS, "blend_method"): FRONTGLASS.blend_method = "BLEND"
K.box("FrontGlass", (CL - .04, .01, CH - .04), (0, FY + .02, Z0 + .02), FRONTGLASS, .002)
# ---------- shelves of clones, each lit by an LED strip under the shelf above ----------
LEVELS = [Z0 + .04, Z0 + .42]
for k, z in enumerate(LEVELS):
    if k:
        K.box(f"Shelf{k}", (CL - .08, CD - .08, .02), (0, CY, z - .02), SHELF, .004)
        K.box(f"ShelfEdge{k}", (CL - .08, .015, .025), (0, FY + .045, z - .025), K.BRASS, .004)
    above = LEVELS[k + 1] - .02 if k + 1 < len(LEVELS) else Z0 + CH
    K.box(f"Led{k}", (CL - .14, .02, .012), (0, FY + .07, above - .016), M["LED"], .003)
    for c in range(5):
        x = -CL / 2 + .18 + c * (CL - .36) / 4
        y = CY - .14 + (c % 2) * .1
        K.box(f"Cube{k}{c}", (.08, .08, .07), (x, y, z), WOOL, .008, 2)
        SP.seedling(f"S{k}{c}", x, y, z + .07, rnd.uniform(1.05, 1.2))
# humidifier tucked on the right
K.box("Humidifier", (.18, .18, .22), (CL / 2 - .16, CY + .18, LEVELS[0]), M["WHITE"], .03, 4)

K.finish(OUT, "seeds_bench_tier5", ortho=2.7, centre=(0, 0, .88))
