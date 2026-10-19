"""Canopy coffee cart: green body on an oak base with spoked wheels, brass espresso machine, red-striped awning on brass posts. Long along X.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_coffeecart.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetCoffeeCart")
RED = K.mat("StripeRed", "#cc4a3f", .55); CRM = K.mat("StripeCream", "#f2e6c8", .55)
CUP = K.mat("CupBlue", "#6a9fb8", .5)
L, D = 1.5, .8
K.box("Base", (L + .06, D + .06, .08), (0, 0, .2), K.OAK, .02)
K.box("Body", (L, D, .5), (0, 0, .28), K.GREEN, .08, 5)
K.box("Counter", (L + .1, D + .1, .07), (0, 0, .78), CRM, .03)
K.box("Well", (L - .5, D - .3, .02), (-.15, 0, .84), K.OAK, .01)
def wheel(tag, x, y, r):
    o = K.cyl(tag, r, r, .05, (x, y, r), K.OAK, 32); o.rotation_euler.x = math.pi / 2
    o = K.cyl(tag + "Tyre", r + .015, r + .015, .045, (x, y + (.0025 if y > 0 else -.0025), r), K.DARK, 32); o.rotation_euler.x = math.pi / 2
    for k in range(8):
        a = k * math.pi / 4
        K.tube(f"{tag}Spoke{k}", [(x, y - .03 * (1 if y < 0 else -1), r), (x + r * .9 * math.cos(a), y - .03 * (1 if y < 0 else -1), r + r * .9 * math.sin(a))], .01, K.BRASS)
    o = K.cyl(tag + "Hub", .035, .035, .06, (x, y, r), K.BRASS, 16); o.rotation_euler.x = math.pi / 2
for y in (-D / 2 - .03, D / 2 + .06):
    wheel(f"Wheel{y:.2f}", L / 2 - .25, y, .26)
for y in (-D / 2 + .1, D / 2 - .1):
    K.cyl(f"Castor{y:.2f}", .05, .05, .05, (-L / 2 + .12, y, .0), K.DARK, 16)
    K.box(f"CastorFork{y:.2f}", (.04, .04, .15), (-L / 2 + .12, y, .05), K.BRASS, .01)
K.tube("Handle", [(L / 2 + .03, -D / 2 + .1, .6), (L / 2 + .18, -D / 2 + .1, .62), (L / 2 + .18, D / 2 - .1, .62), (L / 2 + .03, D / 2 - .1, .6)], .018, K.DARK)
# espresso machine on the back of the counter
MX, MY = .2, .1
K.box("Machine", (.46, .34, .4), (MX, MY, .85), K.BRASS, .05)
K.box("MachineFace", (.38, .02, .18), (MX, MY - .175, .98), K.GREEN, .02)
K.cyl("Gauge", .035, .035, .02, (MX - .11, MY - .18, 1.14), CRM, 16).rotation_euler.x = math.pi / 2
for dx in (-.07, .07):
    K.box(f"Group{dx}", (.06, .08, .05), (MX + dx, MY - .2, .92), K.DARK, .01)
K.box("DripTray", (.3, .12, .02), (MX, MY - .23, .85), K.DARK, .005)
for dx in (-.06, .08):
    K.cyl(f"Cup{dx}", .035, .03, .07, (MX + dx, MY + .02, 1.25), CUP, 16)
# awning on four brass posts: alternating red and cream stripes running along Y
AH = 1.75
for x in (-L / 2 + .06, L / 2 - .06):
    for y in (-D / 2 + .06, D / 2 - .06):
        K.cyl(f"AwnPost{x:.2f}{y:.2f}", .018, .018, AH - .85, (x, y, .85), K.BRASS, 12)
N = 9; SW = (L + .3) / N
for i in range(N):
    x = -(L + .3) / 2 + SW * (i + .5)
    K.box(f"Stripe{i}", (SW, D + .3, .05), (x, 0, AH), RED if i % 2 == 0 else CRM, .02)
    for y in (-(D + .3) / 2, (D + .3) / 2):
        K.cyl(f"Scallop{i}{y:.2f}", SW / 2, SW / 2, .025, (x, y, AH - .1), RED if i % 2 == 0 else CRM, 16).rotation_euler.x = math.pi / 2
    K.box(f"Valance{i}", (SW, .025, .1), (x, -(D + .3) / 2, AH - .1), RED if i % 2 == 0 else CRM, .006)
    K.box(f"ValanceB{i}", (SW, .025, .1), (x, (D + .3) / 2, AH - .1), RED if i % 2 == 0 else CRM, .006)
K.finish(OUT, "street_coffeecart", ortho=2.6, centre=(0, 0, .95))
