"""Canopy harvest bench (tier 3), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P harvest_bench.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K
from mathutils import Vector

OUT = K.begin("HarvestBench")
rnd = K.rnd

def nug(name, x, y, z, s=1.0, lying=True):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

def jar(tag, x, y, z, r=.07, h=.16, lid=None):
    K.cyl(tag + "Glass", r, r, h, (x, y, z), K.GLASS, 40)
    for i in range(7):
        a = i * 2.4; rr = r * .45 * (i % 3) / 2
        nug(f"{tag}Nug{i}", x + math.cos(a) * rr, y + math.sin(a) * rr, z + .01 + (i // 3) * .055, .95, lying=False)
    K.cyl(tag + "Lid", r + .004, r + .004, .035, (x, y, z + h), lid or K.OAK, 40)

# ---------- cabinet ----------
L, D, H = 1.9, .86, .78
K.box("Plinth", (L + .08, D + .08, .08), (0, 0, 0), K.WOOD_D, .015)
K.box("Body", (L, D, H - .08), (0, 0, .08), K.GREEN, .012)
K.box("BaseBrass", (L + .02, D + .02, .03), (0, 0, .08), K.BRASS, .008)
DW = (L - .12) / 3
for i in range(3):
    cx = -L / 2 + .06 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .06, .02, .48), (cx, -D / 2 - .008, .17), K.GREEN, .008)
    for dz in (.17, .65):
        K.box(f"RailH{i}{dz}", (DW - .04, .024, .02), (cx, -D / 2 - .016, dz - .01), K.BRASS, .006)
    for dx in (-(DW - .06) / 2, (DW - .06) / 2):
        K.box(f"RailV{i}{dx:.2f}", (.02, .024, .48), (cx + dx, -D / 2 - .016, .17), K.BRASS, .006)
    K.box(f"Pull{i}", (.11, .04, .045), (cx, -D / 2 - .03, .5), K.BRASS, .02)
K.box("EndDrawer", (.02, D - .14, .48), (L / 2 + .008, 0, .17), K.GREEN, .008)
for dz in (.17, .65): K.box(f"EndRailH{dz}", (.024, D - .12, .02), (L / 2 + .016, 0, dz - .01), K.BRASS, .006)
for dy in (-(D - .14) / 2, (D - .14) / 2): K.box(f"EndRailV{dy:.2f}", (.024, .02, .48), (L / 2 + .016, dy, .17), K.BRASS, .006)
K.box("EndPull", (.04, .11, .045), (L / 2 + .03, 0, .5), K.BRASS, .02)
K.box("TopBand", (L + .1, D + .1, .04), (0, 0, H), K.BRASS, .01)
K.box("Top", (L + .12, D + .12, .06), (0, 0, H + .035), K.STONE, .028, 4)
TOP = H + .095

# ---------- back troughs with young plants, and the light bar ----------
for t, (x0, ln, n) in enumerate([(-.5, .82, 4), (.42, .72, 3)]):
    K.box(f"Trough{t}", (ln, .3, .1), (x0, .22, TOP), K.OAK, .015)
    K.box(f"TroughRim{t}", (ln + .02, .32, .015), (x0, .22, TOP + .095), K.BRASS, .005)
    K.box(f"TroughSoil{t}", (ln - .06, .24, .01), (x0, .22, TOP + .085), K.SOIL, .004)
    for i in range(n):
        K.plant(f"T{t}P{i}", x0 - ln / 2 + ln * (i + .5) / n + rnd.uniform(-.02, .02), .22 + rnd.uniform(-.04, .04), TOP + .09, rnd.uniform(.26, .32), .62)
PH = 1.45
for sx in (-1, 1):
    px = sx * (L / 2 - .03)
    K.box(f"Post{sx}", (.06, .06, PH - TOP), (px, D / 2 - .05, TOP), K.GREEN, .015)
    K.cyl(f"PostKnob{sx}", .04, .04, .05, (px + sx * .04, D / 2 - .05, PH - .06), K.BRASS, 24)
K.box("LightBar", (L, .07, .1), (0, D / 2 - .05, PH), K.GREEN, .02)
K.box("LightPanel", (L - .14, .012, .07), (0, D / 2 - .09, PH + .015), K.GLOW, .004)

# ---------- cutting board with trimmed buds and scissors ----------
K.box("Board", (.56, .36, .03), (-.12, -.1, TOP), K.OAK, .012)
for i, (x, y) in enumerate([(-.3, -.02), (-.14, .02), (.02, -.04), (-.22, -.16), (-.04, -.18)]):
    nug(f"BoardNug{i}", x, y, TOP + .05)
for i, (x, y) in enumerate([(-.33, -.13), (.06, .05), (-.1, -.08)]):
    K.leaf_at(f"Trim{i}", (x, y, TOP + .035), rnd.uniform(0, 6), -.05, .9, K.LEAF_MESHES[2])
sx0, sy0 = .02, -.2   # scissors: two blades and two green ring handles
for a in (.18, -.18):
    K.tube(f"Blade{a}", [(sx0, sy0, TOP + .036), (sx0 + .12 * math.cos(a), sy0 + .12 * math.sin(a), TOP + .036)], .006, K.BRASS)
    cx, cy = sx0 - .05 * math.cos(a), sy0 - .05 * math.sin(a) + (.02 if a > 0 else -.02)
    K.tube(f"Ring{a}", [(cx + .028 * math.cos(t / 12 * 6.283), cy + .028 * math.sin(t / 12 * 6.283), TOP + .036) for t in range(13)], .008, K.GREEN)

# ---------- two trays of buds ----------
for t, (x, y) in enumerate([(.34, -.2), (.66, -.12)]):
    K.box(f"Tray{t}", (.3, .26, .05), (x, y, TOP), K.GREEN_D, .01)
    for dx, dy, w, d in ((0, .135, .32, .014), (0, -.135, .32, .014), (.155, 0, .014, .28), (-.155, 0, .014, .28)):
        K.box(f"TrayRim{t}{dx}{dy}", (w, d, .014), (x + dx, y + dy, TOP + .045), K.BRASS, .004)
    for i in range(7):
        nug(f"Tray{t}Nug{i}", x + rnd.uniform(-.09, .09), y + rnd.uniform(-.07, .07), TOP + .045)

# ---------- jars of buds and a small potted plant ----------
for i, (x, y) in enumerate([(-.78, -.04), (-.62, -.22), (-.44, -.3)]):
    jar(f"Jar{i}", x, y, TOP, .088 - .008 * i, .21 - .02 * i)
K.cyl("PotCream", .09, .11, .15, (.84, .12, TOP), K.CREAM, 32)
K.cyl("PotBand", .112, .112, .03, (.84, .12, TOP + .1), K.GREEN, 32)
K.cyl("PotSoil", .1, .1, .01, (.84, .12, TOP + .145), K.SOIL, 24)
K.plant("Corner", .84, .12, TOP + .15, .28, .6)

K.finish(OUT, "harvest_bench", ortho=2.7, centre=(0, 0, .85))
