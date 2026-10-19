"""Canopy rooftop lounge: the brass elevator cab that rides inside the glass shaft (rooftop.js shaft(), the cab group).

A dark floor plate, four brass corner posts, a brass ceiling with a warm lamp panel ("CabLamp", own material
"CabLamp" so code can drive its glow), a dark-oak back panel on the -X side, and a brass handrail round the open
sides at hip height.  Origin: the centre of the cab floor, so code moves it up and down in y.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P lounge_elevator_cab.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K

OUT = K.begin("LoungeElevatorCab")
H = lambda m: m / 1.69
V = lambda w: w * 0.7247
FLOOR = K.mat("CabFloor", "#2b302d", .6)
LAMP = K.mat("CabLamp", "#fff2c8", .4, 0, 3.)
OAKD = K.mat("CabOak", "#6e4a2c", .55)

def span(name, x0, x1, h0, h1, z0, z1, m, bevel=.004):
    return K.box(name, (H(x1 - x0), H(z1 - z0), V(h1 - h0)), (H((x0 + x1) / 2), -H((z0 + z1) / 2), V(h0)), m, bevel, 1)

CW, CD, CH = 1.1, 1.1, 2.35
cw, cd = CW / 2, CD / 2
span("Floor", -cw, cw, 0, .12, -cd, cd, FLOOR, .01)
span("FloorBrass", -cw - .01, cw + .01, .1, .125, -cd - .01, cd + .01, K.BRASS, 0)
span("Ceiling", -cw, cw, CH - .14, CH, -cd, cd, K.BRASS, .01)
for i, (sx, sz) in enumerate(((-1, -1), (1, -1), (1, 1), (-1, 1))):
    x, z = sx * (cw - .04), sz * (cd - .04)
    span(f"Post{i}", x - .04, x + .04, .12, CH - .14, z - .04, z + .04, K.BRASS)
span("BackPanel", -cw + .05, -cw + .1, .12, CH - .14, -cd + .1, cd - .1, OAKD, .006)
for k, (a, b) in enumerate(((.4, 1.0), (1.15, CH - .4))):      # two raised panels on the oak back
    span(f"BackInset{k}", -cw + .1, -cw + .115, .12 + a, .12 + b, -cd + .2, cd - .2, OAKD, .003)
# The handrail round the three open sides (the code's band at 1..1.05), with short brackets to the posts.
R0, R1, t = 1.0, 1.05, .035
span("RailN", -cw + .04, cw - .04, R0, R1, -cd + .02, -cd + .02 + t, K.BRASS, .006)
span("RailS", -cw + .04, cw - .04, R0, R1, cd - .02 - t, cd - .02, K.BRASS, .006)
span("RailE", cw - .02 - t, cw - .02, R0, R1, -cd + .04, cd - .04, K.BRASS, .006)
span("RailW", -cw + .1, -cw + .1 + t, R0, R1, -cd + .1, cd - .1, K.BRASS, .006)
span("CabLamp", -cw + .15, cw - .15, CH - .18, CH - .14, -cd + .15, cd - .15, LAMP, 0)

K.finish(OUT, "lounge_elevator_cab", ortho=2.2, centre=(0, 0, V(CH) / 2))
