"""Canopy pack bench (tier 2), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P pack_bench_tier2.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("PackBenchTier2")
rnd = K.rnd
TOPSTONE = K.mat("CreamTop", "#f0dfb6", .4)
POUCH = K.mat("Pouch", "#2f5a42", .55)

def nug(name, x, y, z, s=1.0):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

def jar(tag, x, y, z, r=.09, h=.2, lid=None):
    K.cyl(tag, r, r, h, (x, y, z), K.GLASS, 40)
    for j in range(9):
        a = j * 2.4; rr = r * .55 * ((j % 3) / 2)
        nug(f"{tag}Nug{j}", x + math.cos(a) * rr, y + math.sin(a) * rr, z + .01 + (j // 3) * h * .27, r / .09)
    K.cyl(tag + "Lid", r + .006, r + .006, .045, (x, y, z + h), lid or K.OAK, 40)
    K.cyl(tag + "Knob", r * .25, r * .25, .03, (x, y, z + h + .045), K.BRASS, 20)
    return z + h + .045

def crate(tag, x, y, z, w, d, h, m, slots=7, pouch=POUCH):
    """An open crate with a handle cut on the front and a row of pouches standing in it."""
    K.box(tag + "Floor", (w, d, .02), (x, y, z), m, .005)
    for n, (dx, dy, ww, dd) in enumerate(((0, -d / 2 + .01, w, .02), (0, d / 2 - .01, w, .02), (-w / 2 + .01, 0, .02, d), (w / 2 - .01, 0, .02, d))):
        K.box(f"{tag}Wall{n}", (ww, dd, h), (x + dx, y + dy, z), m, .006)
    K.box(tag + "Handle", (w * .35, .006, .03), (x, y - d / 2 - .001, z + h * .62), K.DARK, .006)
    for k in range(slots):
        K.box(f"{tag}Pouch{k}", (w - .07, .012, h + .03), (x, y - d / 2 + .05 + k * (d - .1) / max(1, slots - 1), z + .02), pouch, .003)

# ---------- open table: green frame, brass feet, oak lower shelf ----------
L, D, H = 1.5, .8, .82
for sx in (-1, 1):
    for sy in (-1, 1):
        x, y = sx * (L / 2 - .04), sy * (D / 2 - .04)
        K.box(f"Leg{sx}{sy}", (.07, .07, H - .1), (x, y, .04), K.GREEN, .012)
        K.box(f"Foot{sx}{sy}", (.1, .1, .05), (x, y, 0), K.BRASS, .01)
        K.box(f"Cap{sx}{sy}", (.08, .08, .03), (x, y, H - .1), K.BRASS, .008)
K.box("ApronF", (L - .1, .03, .08), (0, -D / 2 + .04, H - .14), K.GREEN, .008)
K.box("ApronB", (L - .1, .03, .08), (0, D / 2 - .04, H - .14), K.GREEN, .008)
K.box("ApronE", (.03, D - .1, .08), (L / 2 - .04, 0, H - .14), K.GREEN, .008)
K.box("ApronW", (.03, D - .1, .08), (-L / 2 + .04, 0, H - .14), K.GREEN, .008)
K.box("ShelfRail", (L - .08, D - .08, .05), (0, 0, .17), K.GREEN, .008)
K.box("Shelf", (L - .1, D - .1, .03), (0, 0, .21), K.OAK, .008)
K.box("Top", (L + .12, D + .12, .1), (0, 0, H - .06), TOPSTONE, .04, 4)
TOP = H + .04
SH = .24

# ---------- under the shelf: pouch crates, kraft boxes, jars ----------
crate("LowCrateA", -.5, .12, SH, .28, .3, .17, K.GREEN)
crate("LowCrateB", -.48, -.2, SH, .28, .26, .17, K.GREEN)
for k in range(3):
    K.box(f"LowBox{k}", (.28, .22, .085), (-.12, -.06, SH + k * .09), K.KRAFT, .012)
for k, (x, y) in enumerate([(.2, .14), (.37, .14), (.54, .14), (.2, -.14), (.37, -.14), (.54, -.14)]):
    jar(f"LowJar{k}", x, y, SH, .07, .16)

# ---------- on top: jars, a tray of buds, the press and a crate of pouches ----------
jar("JarA", -.5, .22, TOP, .11, .24)
jar("JarB", -.25, .22, TOP, .095, .19)
K.box("Tray", (.46, .3, .06), (-.38, -.15, TOP), K.GREEN, .014)
K.box("TrayWell", (.4, .24, .01), (-.38, -.15, TOP + .055), K.GREEN_D, .004)
for j in range(22):
    nug(f"TrayNug{j}", -.38 + rnd.uniform(-.17, .17), -.15 + rnd.uniform(-.09, .09), TOP + .06, .75)
for sx in (-1, 1):
    K.box(f"TrayHandle{sx}", (.03, .1, .025), (-.38 + sx * .245, -.15, TOP + .025), K.BRASS, .006)

PX, PY = .22, .0
K.box("PressBase", (.46, .38, .07), (PX, PY, TOP), K.GREEN, .015)
K.box("PressPad", (.24, .24, .03), (PX - .05, PY - .03, TOP + .07), K.CREAM, .008)
K.cyl("PressJar", .09, .09, .12, (PX - .05, PY - .03, TOP + .1), K.GLASS, 4).rotation_euler.z = math.pi / 4
for j in range(5):
    nug(f"PressNug{j}", PX - .05 + rnd.uniform(-.04, .04), PY - .03 + rnd.uniform(-.04, .04), TOP + .11, .9)
K.box("PressPlate", (.22, .22, .04), (PX - .05, PY - .03, TOP + .3), K.BRASS, .01)
K.cyl("PressRam", .03, .03, .14, (PX - .05, PY - .03, TOP + .34), K.BRASS, 20)
K.box("PressColumn", (.1, .1, .55), (PX + .14, PY + .12, TOP + .07), K.GREEN, .02)
K.cyl("PressCollar", .065, .065, .05, (PX + .14, PY + .12, TOP + .38), K.BRASS, 24)
K.box("PressArm", (.36, .12, .1), (PX + .02, PY + .12, TOP + .5), K.GREEN, .025)
K.box("PressHead", (.14, .14, .1), (PX - .05, PY - .02, TOP + .44), K.GREEN, .02)
K.tube("Lever", [(PX - .05, PY - .02, TOP + .56), (PX - .05, PY - .02, TOP + .66), (PX - .12, PY - .02, TOP + .72), (PX - .3, PY - .02, TOP + .74)], .02, K.BRASS)
K.tube("LeverGrip", [(PX - .27, PY - .02, TOP + .74), (PX - .46, PY - .02, TOP + .78)], .035, K.GREEN)

crate("TopCrate", .6, -.04, TOP, .3, .3, .2, K.OAK, 6)
K.box("TopCrateCards", (.24, .06, .14), (.6, -.14, TOP + .02), K.CREAM, .006)

K.finish(OUT, "pack_bench_tier2", ortho=2.2, centre=(0, 0, .7))
