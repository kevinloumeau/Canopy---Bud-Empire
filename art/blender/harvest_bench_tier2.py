"""Canopy harvest bench (tier 2), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P harvest_bench_tier2.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("HarvestBenchTier2")
rnd = K.rnd
TOPSTONE = K.mat("CreamTop", "#f0e2c4", .4)
SCREEN = K.mat("DryScreen", "#9a9585", .8)
CAB = K.mat("CabinetGreen", "#2f5d43", .5)

def nug(name, x, y, z, s=1.0):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

def jar(tag, x, y, z, r, h):
    K.cyl(tag + "Glass", r, r, h, (x, y, z), K.GLASS, 40)
    for i in range(9):
        a = i * 2.4; rr = r * .5 * (i % 3) / 2
        nug(f"{tag}Nug{i}", x + math.cos(a) * rr, y + math.sin(a) * rr, z + .01 + (i // 3) * .06, 1.05)
    K.cyl(tag + "Lid", r + .004, r + .004, .04, (x, y, z + h), K.OAK, 40)

# ---------- green cabinet with three framed drawers ----------
L, D, H = 1.85, .86, .86
K.box("Plinth", (L + .08, D + .08, .1), (0, 0, 0), K.GREEN_D, .02)
K.box("BaseBrass", (L + .02, D + .02, .025), (0, 0, .1), K.BRASS, .006)
K.box("Body", (L, D, H - .11), (0, 0, .11), CAB, .012)
DW = (L - .1) / 3
for i in range(3):
    cx = -L / 2 + .05 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .05, .02, .5), (cx, -D / 2 - .008, .17), CAB, .01)
    K.box(f"DrawerInset{i}", (DW - .15, .012, .4), (cx, -D / 2 - .02, .22), CAB, .02)
    K.box(f"Pull{i}", (.18, .035, .035), (cx, -D / 2 - .032, .42), K.BRASS, .014)
K.box("EndPanel", (.02, D - .1, .5), (L / 2 + .008, 0, .17), CAB, .01)
K.box("EndInset", (.012, D - .2, .4), (L / 2 + .02, 0, .22), CAB, .02)
K.box("Top", (L + .12, D + .12, .07), (0, 0, H), TOPSTONE, .03, 4)
TOP = H + .07

# ---------- back upstand with a brass hanging rail, shears and two planter boxes ----------
BY = D / 2 - .03
K.box("Upstand", (L - .1, .06, .52), (0, BY, TOP), TOPSTONE, .015)
K.box("UpstandCap", (L - .02, .1, .07), (0, BY, TOP + .52), K.GREEN, .02)
for sx in (-1, 1):
    K.box(f"UpstandSide{sx}", (.07, .1, .52), (sx * (L / 2 - .04), BY, TOP), K.GREEN, .015)
K.tube("HangRail", [(-L / 2 + .12, BY - .08, TOP + .43), (L / 2 - .12, BY - .08, TOP + .43)], .016, K.BRASS)
for sx in (-1, 1):
    K.tube(f"RailBracket{sx}", [(sx * (L / 2 - .12), BY - .08, TOP + .43), (sx * (L / 2 - .12), BY - .02, TOP + .43)], .014, K.BRASS)
HX = -.42   # shears hanging from a hook
K.tube("Hook", [(HX, BY - .08, TOP + .43), (HX, BY - .09, TOP + .38)], .008, K.BRASS)
for a in (-1, 1):
    K.tube(f"ShearGrip{a}", [(HX, BY - .09, TOP + .37), (HX + a * .05, BY - .09, TOP + .22), (HX + a * .03, BY - .09, TOP + .13)], .02, K.GREEN)
    K.tube(f"ShearBlade{a}", [(HX, BY - .09, TOP + .37), (HX + a * .012, BY - .09, TOP + .45)], .008, K.BRASS)
for i, x in enumerate((-.08, .3)):
    K.box(f"Planter{i}", (.34, .18, .14), (x, BY - .14, TOP), K.GREEN, .015)
    K.box(f"PlanterSoil{i}", (.3, .14, .01), (x, BY - .14, TOP + .135), K.SOIL, .004)
    if i == 0:
        for j in range(4):
            K.leaf_at(f"Plt{i}Leaf{j}", (x - .1 + j * .07, BY - .14, TOP + .14), rnd.uniform(0, 6.3), .5, 1.3, K.LEAF_MESHES[2])
    else:
        for j in range(5):
            nug(f"Plt{i}Nug{j}", x - .1 + j * .05, BY - .14 + rnd.uniform(-.03, .03), TOP + .15, .95)

# ---------- potted plant at the back left ----------
K.pot("Pot", -.7, .05, TOP)
K.plant("Plant", -.7, .05, TOP + .22, .3, .7, colas=False)

# ---------- drying screen of buds and fan leaves ----------
TX, TY = -.2, -.1
TW, TD = .95, .56
K.box("Tray", (TW, TD, .06), (TX, TY, TOP), K.GREEN, .015)
K.box("Screen", (TW - .1, TD - .1, .01), (TX, TY, TOP + .055), SCREEN, .004)
for dx, dy, w, d in ((0, TD / 2, TW, .05), (0, -TD / 2, TW, .05), (TW / 2, 0, .05, TD), (-TW / 2, 0, .05, TD)):
    K.box(f"TrayRim{dx}{dy}", (w, d, .05), (TX + dx, TY + dy, TOP + .04), K.GREEN, .01)
for i in range(18):
    nug(f"TrayNug{i}", TX - .34 + rnd.uniform(0, .36), TY + rnd.uniform(-.17, .17), TOP + .065, .85)
for i in range(5):
    K.leaf_at(f"TrayLeaf{i}", (TX + .06 + rnd.uniform(0, .24), TY + rnd.uniform(-.15, .1), TOP + .068), rnd.uniform(0, 6.3), .15, 1.6, K.LEAF_MESHES[2])

# ---------- jars behind a brass gallery rail at the front right ----------
GX0, GX1, GY0, GY1 = .42, .9, -.42, -.02
K.box("GalleryBase", (GX1 - GX0, GY1 - GY0, .015), ((GX0 + GX1) / 2, (GY0 + GY1) / 2, TOP), K.BRASS, .005)
corners = [(GX0, GY1), (GX0, GY0), (GX1, GY0), (GX1, GY1)]
K.tube("GalleryRail", [(x, y, TOP + .09) for x, y in corners], .012, K.BRASS)
for i, (x, y) in enumerate(corners + [((GX0 + GX1) / 2, GY0)]):
    K.tube(f"GalleryPost{i}", [(x, y, TOP), (x, y, TOP + .09)], .01, K.BRASS)
for i, (x, y, r, h) in enumerate([(.53, -.3, .075, .17), (.68, -.18, .09, .22), (.8, -.08, .095, .25)]):
    jar(f"Jar{i}", x, y, TOP + .015, r, h)

K.finish(OUT, "harvest_bench_tier2", ortho=2.6, centre=(0, 0, .75))
