"""Canopy rooftop deck planter (rooftop.js, along the left balustrade): a forest-green box with a cream cap and soft
shrubs.  rooftop.js makes two, both 0.7 map units deep along x: one from z0+.2 to the second elevator's landing (1.9
long with today's ROOFTOP) and a short one beside the bridge (0.5 long).  Long along map z (Blender Y).
Origin at the footprint centre on the deck.  Pass a length in map units after the output folder for the short one:
    blender -b -P deck_planter.py -- OUT_DIR            -> deck_planter (1.9)
    blender -b -P deck_planter.py -- OUT_DIR 0.5        -> deck_planter_short

Needs canopy_kit.py, planter_parts.py and vine_parts.py in the same folder.
"""
import os, sys, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import planter_parts as P
import vine_parts as VP

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
LEN = float(argv[1]) if len(argv) > 1 else 1.9
NAME = "deck_planter" if LEN >= 1 else "deck_planter_short"
OUT = K.begin("DeckPlanter")
rnd = random.Random(7); M, V = P.M, P.V
BOX = K.mat("DeckPlanterGreen", "#1f5e40", .55); CAP = K.mat("DeckPlanterCap", "#e1dbc0", .45)
EARTH = K.mat("PlanterSoil", "#514633", 1.); DARK = K.mat("PlanterFoot", "#2b302d", .5)
SHRUBS = [K.mat("ShrubA", "#5c8f35", .8, two_sided=True), K.mat("ShrubB", "#6c9e3d", .8, two_sided=True), K.mat("ShrubC", "#78a744", .8, two_sided=True), K.mat("ShrubD", "#4e7f2f", .8, two_sided=True)]
SHRUBS.append(SHRUBS[0])          # weight the mid green
CORE = K.mat("ShrubCore", "#467328", .9)
FLOWERS = [K.mat("FlowerOrange", "#ef8a3a", .6), K.mat("FlowerPink", "#e58bb0", .6)]

W, D, H = .7 * M, LEN * M, .55 * V
K.box("Foot", (W - .03, D - .03, .02), (0, 0, 0), DARK, .006, 1)
K.box("Box", (W, D, H - .02), (0, 0, .02), BOX, .01, 1)
for sx in (-1, 1):   # a shadow line under the cap on the long faces
    K.box(f"Groove{sx}", (.006, D - .04, .012), (sx * (W / 2 + .001), 0, H - .05), DARK, 0, 1)
K.box("Cap", (W + .06 * M, D + .06 * M, .05 * V), (0, 0, H), CAP, .008, 1)
K.box("Soil", (W - .06, D - .06, .012), (0, 0, H + .05 * V - .008), EARTH, 0, 1)
# Shrubs every .55 from .35 in, as rooftop.js places them; the short box gets one small one in its middle.
zs = [z for z in [.35 + .55 * i for i in range(10)] if z < LEN - .2] or [LEN / 2]
for n, z in enumerate(zs):
    r = .32 * M * (1 if len(zs) > 1 or LEN > .9 else .7)
    # Dense round bushes shingled with small leaves and dotted with flowers (Kevin's reference, 2026-10-19).
    VP.scale_shrub(f"Shrub{n}", (rnd.uniform(-.01, .01), -(z - LEN / 2) * M, .8 * V - .02), r * 1.3, SHRUBS, CORE, FLOWERS, rnd, n=100, flowers=5)
K.finish(OUT, NAME, ortho=1.2 + D, centre=(0, 0, .35))
