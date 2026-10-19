"""Canopy ID desk (tier 1): oak slatted pedestal on a green plinth, thick cream top with a flush green scan pad.

Needs canopy_kit.py and station_parts.py in the same folder.  Run headless with
    blender -b -P id_desk_tier1.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as P

OUT = K.begin("IdDeskTier1")
M = P.mats()
LIGHT = K.mat("LightOak", "#d0a066", .6)
EDGE = K.mat("ScanEdge", "#8fd6a0", .3, 0, 1.2)

L, D, H = .95, .72, .92
K.box("Plinth", (L + .06, D + .06, .1), (0, 0, 0), K.GREEN, .025)
K.box("PlinthBand", (L + .07, D + .07, .02), (0, 0, .1), K.BRASS, .006)
K.box("Core", (L - .04, D - .04, H - .22), (0, 0, .12), K.WOOD_D, .01)
for i in range(4):
    K.box(f"SlatF{i}", (L / 4 - .02, .04, H - .22), (-L / 2 + L / 4 * (i + .5), -D / 2 + .02, .12), LIGHT, .012)
for i in range(3):
    K.box(f"SlatE{i}", (.04, D / 3 - .02, H - .22), (L / 2 - .02, -D / 2 + D / 3 * (i + .5), .12), LIGHT, .012)
K.box("Top", (L + .16, D + .16, .12), (0, 0, H - .12), M["TOPSTONE"], .05, 5)
TOP = H
K.box("ScanFrame", (.34, .3, .012), (.0, -.02, TOP - .004), K.BRASS, .006)
K.box("ScanPad", (.3, .26, .012), (.0, -.02, TOP - .002), K.GREEN, .006)
K.box("ScanEdge", (.24, .2, .004), (.0, -.02, TOP + .008), EDGE, .002)
K.box("ScanGlass", (.22, .18, .006), (.0, -.02, TOP + .008), M["SCANGLASS"], .002)
K.finish(OUT, "id_desk_tier1", ortho=2.0, centre=(0, 0, .6))
