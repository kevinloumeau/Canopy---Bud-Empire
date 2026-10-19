"""Canopy grow bench, tier 5 (Lv 75): the flagship grow room bench.  A green lacquered bench under a brass and green
greenhouse frame with glass side and back panels, glowing LED panels under its roof, two clip fans, and six lush
bushy plants in flower with colas, in brass-banded planters on a drip line.
Same footprint, facing and origin as grow_bench (tier 3).

Needs canopy_kit.py and seedgrow45_parts.py in the same folder.  Run headless with
    blender -b -P grow_bench_tier5.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import seedgrow45_parts as T

OUT = K.begin("GrowBenchTier5")
rnd = K.rnd
M = T.mats()
L, D, H = 1.9, .78, .78
TOP = T.cabinet(M, L, D, H, panels=3, top_over=.06)
T.leaf_logo("LeafLogo", (0, -D / 2 - .03, H * .55 - .07), .11)

def planter(tag, x, y, z):
    K.box(f"{tag}Pot", (.3, .3, .22), (x, y, z), M["LACQUER"], .03, 3)
    K.box(f"{tag}Rim", (.31, .31, .03), (x, y, z + .15), K.BRASS, .008)
    K.box(f"{tag}Soil", (.25, .25, .02), (x, y, z + .205), K.SOIL, .006)

# ---------- greenhouse frame: green posts, brass ridge and eaves, glass back, ends and roof ----------
FH, RH = 2.05, 2.35                          # eave and ridge heights
X0, X1, Y0, Y1 = -L / 2 - .03, L / 2 + .03, -D / 2 - .03, D / 2 + .03
for x in (X0, 0, X1):
    for y in (Y0, Y1):
        K.box(f"FramePost{x:.2f}{y:.2f}", (.05, .05, FH - TOP), (x, y, TOP), M["LACQUER_D"], .01)
    K.box(f"Rafter{x:.2f}", (.04, D + .06, .04), (x, 0, FH), K.BRASS, .008)
    K.tube(f"Gable{x:.2f}", [(x, Y0, FH + .04), (x, 0, RH), (x, Y1, FH + .04)], .018, K.BRASS)
for y in (Y0, Y1):
    K.box(f"Eave{y:.2f}", (L + .1, .05, .05), (0, y, FH - .02), K.BRASS, .01)
K.tube("Ridge", [(X0, 0, RH), (X1, 0, RH)], .02, K.BRASS)
# glass: back wall, both ends, and the two roof slopes (front left open so the plants read)
K.box("GlassBack", (L + .04, .01, FH - TOP - .02), (0, Y1, TOP + .01), M["CLEAR"], .002)
K.box("GlassEnd", (.01, D + .04, FH - TOP - .02), (X0, 0, TOP + .01), M["CLEAR"], .002)   # far end only, so the plants read
ROOFGLASS = K.mat("RoofGlass", "#f2f8f4", .05)
_b = ROOFGLASS.node_tree.nodes["Principled BSDF"]; _b.inputs["Alpha"].default_value = .07; _b.inputs["Coat Weight"].default_value = .8
if hasattr(ROOFGLASS, "blend_method"): ROOFGLASS.blend_method = "BLEND"
slope = math.atan2(RH - FH, D / 2 + .03); half = math.hypot(RH - FH, D / 2 + .03)
for s in (-1, 1):
    o = K.box(f"GlassRoof{s}", (L + .06, half, .01), (0, s * (D / 4 + .015), (FH + RH) / 2 - .005), ROOFGLASS, .002)
    o.rotation_euler.x = -s * slope
# LED panels under the roof and two clip fans on the back posts
for i, y in enumerate((-.18, .18)):
    K.box(f"LedBar{i}", (L - .16, .14, .05), (0, y, FH - .12), M["LACQUER_D"], .015)
    K.box(f"LedPanel{i}", (L - .26, .1, .01), (0, y, FH - .125), M["GROWLED"], .003)
    K.box(f"LedEdge{i}", (L - .2, .006, .02), (0, y - .073, FH - .11), M["GROWLED"], .002)
    for sx in (-1, 1):
        K.tube(f"Hanger{i}{sx}", [(sx * (L / 2 - .3), y, FH), (sx * (L / 2 - .3), y, FH - .07)], .006, K.BRASS)
for sx in (-1, 1):
    fx = sx * (L / 2 - .05); fz = TOP + .95
    K.cyl(f"FanRing{sx}", .11, .11, .04, (fx - sx * .04, Y1 - .07, fz), M["LACQUER_D"], 24).rotation_euler = (math.pi / 2, 0, 0)
    K.cyl(f"FanHub{sx}", .03, .03, .05, (fx - sx * .04, Y1 - .07, fz), K.BRASS, 12).rotation_euler = (math.pi / 2, 0, 0)
    for b in range(3):
        o = K.box(f"FanBlade{sx}{b}", (.16, .006, .045), (fx - sx * .04, Y1 - .075, fz - .0225), K.CREAM, .003)
        o.rotation_euler.y = b * 2.094 + .3

# ---------- six lush plants in flower ----------
SPOTS = [(-.66, .1), (-.02, .12), (.6, .1), (-.4, -.25), (.26, -.24), (.8, -.27)]
for i, (x, y) in enumerate(SPOTS):
    planter(f"P{i}", x, y, TOP)
    K.plant(f"P{i}", x, y, TOP + .22, rnd.uniform(.6, .68), sc=1.2, spread=1.4)
HZ = TOP + .05
K.tube("DripHeader", [(-L / 2 + .05, D / 2 - .12, HZ), (L / 2 - .05, D / 2 - .12, HZ)], .014, K.BRASS)
for i, (x, y) in enumerate(SPOTS):
    K.tube(f"Drip{i}", [(x, D / 2 - .12, HZ), (x, (y + D / 2 - .12) / 2, HZ + .2), (x + .09, y + .09, TOP + .24)], .005, M["DRIP"])

K.finish(OUT, "grow_bench_tier5", ortho=3.2, centre=(0, 0, 1.1))
