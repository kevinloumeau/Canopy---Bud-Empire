"""Canopy ID desk (tier 2): rounded green pedestal on a brass plinth, thick cream top with a recessed glass
scanner and a lit slot behind it.

Needs canopy_kit.py and station_parts.py in the same folder.  Run headless with
    blender -b -P id_desk_tier2.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as P

OUT = K.begin("IdDeskTier2")
M = P.mats()
SLOTLIGHT = K.mat("ScanSlot", "#8fd6a0", .3, 0, 1.5)

L, D, H = .95, .72, .92
K.box("Plinth", (L + .08, D + .08, .09), (0, 0, 0), K.BRASS, .04, 4)
K.box("Body", (L, D, H - .2), (0, 0, .08), K.GREEN, .07, 6)
K.box("Top", (L + .16, D + .16, .14), (0, 0, H - .14), M["TOPSTONE"], .06, 6)
TOP = H
K.box("ScanFrame", (.36, .3, .014), (.02, -.04, TOP - .004), K.BRASS, .006)
K.box("ScanWell", (.31, .25, .012), (.02, -.04, TOP + .0), K.GREEN_D, .004)
o = K.box("ScanGlass", (.27, .21, .01), (.02, -.04, TOP + .004), M["SCANGLASS"], .003)
K.box("SlotFrame", (.3, .05, .012), (-.02, .2, TOP - .004), K.GREEN_D, .006)
K.box("SlotLight", (.26, .025, .008), (-.02, .2, TOP + .004), SLOTLIGHT, .003)
K.finish(OUT, "id_desk_tier2", ortho=2.0, centre=(0, 0, .6))
