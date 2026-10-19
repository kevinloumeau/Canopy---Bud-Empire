"""Canopy order desk (tier 2, the compact counter): green boarded body with oak pilasters and a brass foot rail,
cream top, a small till and card reader on a brass base, and an oak arch with an arched ORDER crown sign.

Needs canopy_kit.py and station_parts.py in the same folder.  Run headless with
    blender -b -P order_desk_tier2.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as P

OUT = K.begin("OrderDeskTier2")
M = P.mats()
LIGHT = K.mat("LightOak", "#d0a066", .6)

L, D, H = 1.15, .62, .9
K.box("Plinth", (L + .08, D + .08, .1), (0, 0, 0), LIGHT, .02)
K.box("Body", (L, D, H - .18), (0, 0, .1), K.GREEN, .01)
n = 9
for i in range(1, n):                                 # board grooves on the customer face
    K.box(f"Groove{i}", (.012, .012, H - .34), (-L / 2 + L / n * i, -D / 2 - .002, .2), K.GREEN_D, .003)
K.box("PanelFrame", (L - .14, .016, .016), (0, -D / 2 - .008, H - .14), K.BRASS, .004)
for sx in (-1, 1):
    for sy in (-1, 1):
        x, y = sx * (L / 2 + .005), sy * (D / 2 + .005)
        K.box(f"Pilaster{sx}{sy}", (.07, .07, H - .18), (x, y, .1), LIGHT, .01)
        K.box(f"PilCap{sx}{sy}", (.08, .08, .03), (x, y, H - .11), K.BRASS, .008)
for x in (-L / 2 + .14, L / 2 - .14):
    K.tube(f"RailPost{x:.2f}", [(x, -D / 2, .2), (x, -D / 2 - .09, .2)], .014, K.BRASS)
K.tube("FootRail", [(-L / 2 + .14, -D / 2 - .09, .2), (L / 2 - .14, -D / 2 - .09, .2)], .02, K.BRASS)
K.box("EndFrame", (.02, D - .16, .48), (L / 2 + .012, 0, .2), K.BRASS, .006)
K.box("EndInset", (.024, D - .2, .44), (L / 2 + .014, 0, .22), K.GREEN, .006)
K.box("Top", (L + .12, D + .12, .09), (0, 0, H - .08), M["TOPSTONE"], .04, 5)
TOP = H + .01
K.box("TillBase", (.36, .28, .025), (.18, -.02, TOP), K.BRASS, .01)
P.till(M, .22, .04, TOP + .025, .65)
P.card_reader(M, .08, -.1, TOP + .025, base=K.BRASS)
import bpy
for n in ("Reader", "Cradle"): bpy.data.objects[n].scale = (.6, .6, .6)

AY = -D / 2 + .03
ax0, ax1 = -L / 2 + .03, L / 2 - .03
AH, R, SH = 1.85, .14, .32
SW = ax1 - ax0 - .03
SZ = AH - SH - .03
for sx, x in ((-1, ax0), (1, ax1)):
    K.box(f"ArchPost{sx}", (.09, .09, AH - TOP + .06), (x, AY, TOP), LIGHT, .015)
    K.box(f"ArchShoe{sx}", (.12, .12, .05), (x, AY, TOP), K.BRASS, .012)
    K.box(f"ArchBand{sx}", (.11, .11, .04), (x, AY, TOP + .42), K.BRASS, .01)
    K.box(f"ArchKnee{sx}", (.11, .11, .05), (x, AY, SZ + .05), K.BRASS, .01)
    K.box(f"ArchCap{sx}", (.11, .11, .04), (x, AY, AH + .06), K.BRASS, .01)
P.order_sign(M, AY, SW, SH, SZ, bulge=.12)
K.finish(OUT, "order_desk_tier2", ortho=2.6, centre=(0, 0, 1.05))
