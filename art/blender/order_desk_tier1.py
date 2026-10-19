"""Canopy order desk (tier 1, the compact counter): oak slatted front on a green plinth, cream top with a green
mat, a card reader, and an oak arch carrying the ORDER sign.

Needs canopy_kit.py and station_parts.py in the same folder.  Run headless with
    blender -b -P order_desk_tier1.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as P

OUT = K.begin("OrderDeskTier1")
M = P.mats()
LIGHT = K.mat("LightOak", "#d0a066", .6)

L, D, H = 1.15, .62, .9
K.box("Plinth", (L + .06, D + .06, .12), (0, 0, 0), K.GREEN, .02)
K.box("PlinthRail", (L + .08, .03, .03), (0, -D / 2 - .035, .12), K.BRASS, .01)
K.box("Body", (L, D, H - .2), (0, 0, .12), K.GREEN, .01)
n = 11
for i in range(n):                                    # vertical oak slats across the customer face
    K.box(f"Slat{i}", (L / n - .012, .03, H - .26), (-L / 2 + L / n * (i + .5), -D / 2 - .01, .15), LIGHT, .008)
K.box("SlatRail", (L + .02, .04, .04), (0, -D / 2 - .012, H - .12), LIGHT, .01)
K.box("EndFrame", (.022, D - .16, .45), (L / 2 + .01, 0, .25), K.BRASS, .006)
K.box("EndInset", (.026, D - .2, .41), (L / 2 + .012, 0, .27), K.GREEN, .006)
K.box("Top", (L + .12, D + .12, .09), (0, 0, H - .08), M["TOPSTONE"], .04, 5)
TOP = H + .01
K.box("OrderMat", (.42, .28, .012), (-.2, -.02, TOP), K.GREEN, .006)
K.box("MatTrim", (.44, .3, .006), (-.2, -.02, TOP), K.BRASS, .003)
P.card_reader(M, .3, -.12, TOP)

AY = -D / 2 + .03
ax0, ax1 = -L / 2 + .03, L / 2 - .03
AH, R, SH = 1.85, .2, .36
SW = ax1 - ax0 - .04
SZ = AH - SH + .02
for sx, x in ((-1, ax0), (1, ax1)):
    pts = [(x, AY, TOP), (x, AY, AH - SH / 2 - R)]
    pts += P.arc_pts((x - sx * R, AH - SH / 2 - R), R, 0 if sx > 0 else 3.14159, 1.5708, 8, AY)[1:]
    K.tube(f"ArchPost{sx}", pts, .052, LIGHT)
    K.box(f"ArchShoe{sx}", (.11, .11, .05), (x, AY, TOP), K.BRASS, .012)
    K.box(f"ArchBand{sx}", (.12, .12, .035), (x, AY, TOP + .3), K.BRASS, .01)
P.order_sign(M, AY, SW, SH, SZ)
K.finish(OUT, "order_desk_tier1", ortho=2.6, centre=(0, 0, 1.05))
