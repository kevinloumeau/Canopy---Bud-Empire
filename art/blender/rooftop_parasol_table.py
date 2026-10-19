"""Canopy rooftop lounge: one bistro set under a parasol (Terrace, lounge tier 4), laid out like rooftop.js on main.

A round cream table on a dark pedestal set with a brass ashtray and a small oak rolling tray (papers, a grinder), two oak stools with cream cushions either side along Blender X, and a
forest-and-cream striped eight-panel parasol on a cream pole.  The origin is the table's centre on the deck.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_parasol_table.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy, bmesh
import canopy_kit as K

M, V = 1 / 1.69, 0.7247
OUT = K.begin("RooftopParasol")
TOP = K.mat("TableTop", "#ece4d2", .35)
IRON = K.mat("Pedestal", "#2b302d", .45, .4)
OAK = K.mat("StoolOak", "#b98d5c", .55)
CUSH = K.mat("Cushion", "#efe4cf", .8)
POLE = K.mat("Pole", "#e1dbc0", .45)
CANVAS = K.mat("ParasolCream", "#f1e7cc", .8, two_sided=True)
STRIPE = K.mat("ParasolGreen", "#1f6b47", .75, two_sided=True)

def ashtray(tag, x, y, z):
    """A round brass ashtray with three rests."""
    K.cyl(tag, .045, .04, .015, (x, y, z), K.BRASS, 28)
    K.cyl(tag + "Well", .033, .033, .004, (x, y, z + .013), K.DARK, 24)
    for i in range(3):
        a = i * 2 * math.pi / 3
        K.box(f"{tag}Rest{i}", (.014, .01, .006), (x + .041 * math.cos(a), y + .041 * math.sin(a), z + .013), K.DARK, .002).rotation_euler.z = a

PAPER = K.mat("Papers", "#f6efdc", .8)
PACK = K.mat("PaperPack", "#1f6b47", .6)
TRAYOAK = K.mat("TrayOak", "#a8794a", .5)

# ---------- table ----------
TH = .74 * V
K.cyl("TableFoot", .17, .2, .025, (0, 0, 0), IRON, 32)
K.cyl("TablePedestal", .022, .03, TH - .06, (0, 0, .02), IRON, 20)
K.cyl("TableCollar", .06, .04, .04, (0, 0, TH - .075), IRON, 24)
K.cyl("TableTop", .42 * M, .42 * M, .05 * V, (0, 0, TH - .036), TOP, 48)
K.cyl("TableEdge", .42 * M + .004, .42 * M + .004, .008, (0, 0, TH - .03), K.BRASS, 48)
TZ = TH - .036 + .05 * V
ashtray("Ashtray", -.12, .06, TZ)
# the rolling tray: a shallow oak tray with a brass rim, a pack of papers, two loose papers and a grinder
tx, ty = .07, -.03
K.box("RollTray", (.18, .12, .012), (tx, ty, TZ), TRAYOAK, .004)
for n, (sx, sy, w, d) in enumerate(((0, .057, .18, .006), (0, -.057, .18, .006), (.087, 0, .006, .12), (-.087, 0, .006, .12))):
    K.box(f"TrayRim{n}", (w, d, .014), (tx + sx, ty + sy, TZ + .008), K.BRASS, .002)
K.box("PaperPack", (.07, .035, .008), (tx - .035, ty + .025, TZ + .012), PACK, .002)
K.box("PaperPackFlap", (.066, .031, .002), (tx - .035, ty + .025, TZ + .02), PAPER, .0005)
for n, (dx, dy, r) in enumerate(((-.03, -.03, .3), (.0, -.025, -.2))):
    K.box(f"Paper{n}", (.07, .036, .001), (tx + dx, ty + dy, TZ + .012 + n * .001), PAPER, 0).rotation_euler.z = r
K.cyl("Grinder", .022, .022, .022, (tx + .05, ty + .01, TZ + .012), K.BRASS, 24)
K.cyl("GrinderLid", .023, .023, .01, (tx + .05, ty + .01, TZ + .034), PACK, 24)
for k in range(2): K.cyl(f"GrinderBand{k}", .0225, .0225, .003, (tx + .05, ty + .01, TZ + .018 + k * .008), K.DARK, 24)

# ---------- two stools ----------
for i, sx in enumerate((-.62, .62)):
    x, s, h = sx * M, .38 * M, .45 * V
    K.box(f"Stool{i}", (s, s, h), (x, 0, 0), OAK, .02)
    K.box(f"StoolBand{i}", (s + .004, s + .004, .012), (x, 0, h - .05), K.BRASS, .003)
    K.box(f"Cushion{i}", (.4 * M, .4 * M, .05 * V + .01), (x, 0, h), CUSH, .02, 4)
# ---------- parasol ----------
PTOP = 2.85 * V                       # crown
RIM = (2.85 - .45) * V
R = 1.25 * M
K.cyl("Pole", .016, .016, PTOP + .06 - .02, (0, 0, .02), POLE, 16)
K.cyl("PoleCrank", .028, .028, .06, (0, 0, 1.15), K.BRASS, 16)
K.cyl("Finial", .03, .012, .06, (0, 0, PTOP + .02), K.BRASS, 16)
K.cyl("Hub", .03, .03, .03, (0, 0, PTOP - .1), POLE, 16)
N = 8
def panel(i, r0, r1, z0, z1, m, name):
    """One flat triangular gore of the canopy between ribs i and i+1, from radius r0 at z0 to r1 at z1."""
    a0, a1 = 2 * math.pi * i / N, 2 * math.pi * (i + 1) / N
    me = bpy.data.meshes.new(name)
    if r0 == 0:
        v = [(0, 0, z0), (r1 * math.cos(a0), r1 * math.sin(a0), z1), (r1 * math.cos(a1), r1 * math.sin(a1), z1)]
        me.from_pydata(v, [], [(0, 1, 2)])
    else:
        v = [(r0 * math.cos(a0), r0 * math.sin(a0), z0), (r1 * math.cos(a0), r1 * math.sin(a0), z1),
             (r1 * math.cos(a1), r1 * math.sin(a1), z1), (r0 * math.cos(a1), r0 * math.sin(a1), z0)]
        me.from_pydata(v, [], [(0, 1, 2, 3)])
    o = K.link(bpy.data.objects.new(name, me), m)
    sol = o.modifiers.new("Thick", "SOLIDIFY"); sol.thickness = .008
    return o
for i in range(N):
    panel(i, 0, R, PTOP, RIM, STRIPE if i % 2 == 0 else CANVAS, f"Gore{i}")
    # the valance: a short drop below the rim, colours swapped
    a0, a1 = 2 * math.pi * i / N, 2 * math.pi * (i + 1) / N
    me = bpy.data.meshes.new(f"Valance{i}"); r = R + .003
    v = [(r * math.cos(a0), r * math.sin(a0), RIM), (r * math.cos(a1), r * math.sin(a1), RIM),
         (r * math.cos(a1), r * math.sin(a1), RIM - .07), (r * math.cos(a0), r * math.sin(a0), RIM - .07)]
    me.from_pydata(v, [], [(0, 1, 2, 3)])
    o = K.link(bpy.data.objects.new(f"Valance{i}", me), CANVAS if i % 2 == 0 else STRIPE)
    o.modifiers.new("Thick", "SOLIDIFY").thickness = .006
    # ribs under the canopy, and stretchers from the pole
    a = a0
    K.tube(f"Rib{i}", [(0, 0, PTOP - .03), (R * .98 * math.cos(a), R * .98 * math.sin(a), RIM - .005)], .006, POLE)
    K.tube(f"Stretcher{i}", [(0, 0, PTOP - .35), (R * .55 * math.cos(a), R * .55 * math.sin(a), PTOP - (PTOP - RIM) * .55 - .012)], .005, POLE)
    K.cyl(f"RibTip{i}", .01, .01, .02, (R * math.cos(a), R * math.sin(a), RIM - .02), K.BRASS, 8)
K.finish(OUT, "rooftop_parasol_table", ortho=2.6, centre=(0, 0, .95))
