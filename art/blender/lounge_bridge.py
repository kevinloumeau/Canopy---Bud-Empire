"""Canopy rooftop lounge: the short bridge from the elevator landing to the deck (rooftop.js shaft(), the bridge).

Cream boards on a slab, glass sides ("BridgeGlass") with brass cap rails, and the red velvet runner with its brass
edging.  The bridge runs along +X from the shaft's +X face to the deck's left edge (ROOFTOP.x0).  Origin: the centre
of the bridge slab's footprint at deck height (ROOFTOP.y), so the slab hangs below z=0.  The runner carries on
1.2 map units on to the deck past the +X end, as in code.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P lounge_bridge.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K

OUT = K.begin("LoungeBridge")
H = lambda m: m / 1.69
V = lambda w: w * 0.7247
BOARD = K.mat("BridgeBoards", "#e4ddcc", .6)
VELVET = K.mat("Velvet", "#6b2436", .8)
GLASS = K.mat("BridgeGlass", "#cfe6df", .08)
GLASS.node_tree.nodes["Principled BSDF"].inputs["Alpha"].default_value = .28
GLASS.surface_render_method = "BLENDED"

def span(name, x0, x1, h0, h1, z0, z1, m, bevel=.004):
    return K.box(name, (H(x1 - x0), H(z1 - z0), V(h1 - h0)), (H((x0 + x1) / 2), -H((z0 + z1) / 2), V(h0)), m, bevel, 1)

X0, X1 = -9.9 + .7, -6.5          # shaft's +x face to the deck edge
L = X1 - X0; a, b = -L / 2, L / 2  # local x, origin at the slab centre
RAIL = 1.05
span("Slab", a, b + .05, -.26, -.03, -.6, .6, K.mat("BridgeSlab", "#1f4a35", .45, .2), .01)
span("Boards", a, b + .05, -.03, 0, -.6, .6, BOARD, .004)
for k in range(1, 9):              # board joints
    x = a + L * k / 9
    span(f"Joint{k}", x - .006, x + .006, -.001, .002, -.58, .58, K.mat("BoardJoint", "#c9bfa8", .7) if k == 1 else K.col.objects["Joint1"].active_material, 0)
for side, z in (("N", -.6), ("S", .6)):
    span(f"Glass{side}", a, b, .05, RAIL - .05, z - .01, z + .01, GLASS, 0)
    span(f"Rail{side}", a, b, RAIL - .03, RAIL + .03, z - .05, z + .05, K.BRASS, .01)
    for k, x in enumerate((a + .05, 0, b - .05)):
        span(f"Post{side}{k}", x - .03, x + .03, 0, RAIL - .03, z - .03, z + .03, K.BRASS, .006)
span("RunnerBrass", a + .05, X1 + 1.2 - X0 + a, .004, .012, -.45, .45, K.BRASS, 0)
span("Runner", a + .05, X1 + 1.2 - X0 + a, .006, .016, -.38, .38, VELVET, 0)

K.finish(OUT, "lounge_bridge", ortho=2.6, centre=(H(.6), 0, .2))
