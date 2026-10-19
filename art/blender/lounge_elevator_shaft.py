"""Canopy rooftop lounge: the sleek glass elevator shaft (rooftop.js shaft()), modelled for the 3D map.

Slim forest-green corner posts from the ground to the crown, a thin green ring at each landing, a flat green cap with
a fine brass edge, the thin flat canopy over the doorway on to the bridge (on the +X side), and glass on all four
sides as one material "ShaftGlass".  The cab and the bridge are separate models.  Origin: the shaft's footprint
centre on the ground.  Its height is fixed to today's roof (ROOFTOP.y 14.1): the crown sits 2.9 world above it.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P lounge_elevator_shaft.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K

OUT = K.begin("LoungeElevatorShaft")
H = lambda m: m / 1.69          # map units across -> metres
V = lambda w: w * 0.7247        # world heights -> metres
STEEL = K.mat("ShaftSteel", "#1f4a35", .45, .2)
GLASS = K.mat("ShaftGlass", "#cfe6df", .08)
GLASS.node_tree.nodes["Principled BSDF"].inputs["Alpha"].default_value = .28
GLASS.surface_render_method = "BLENDED"

def span(name, x0, x1, h0, h1, z0, z1, m, bevel=.004):
    """A box given in map space around the shaft centre (x, z in map units, heights in world units)."""
    return K.box(name, (H(x1 - x0), H(z1 - z0), V(h1 - h0)), (H((x0 + x1) / 2), -H((z0 + z1) / 2), V(h0)), m, bevel, 1)

W, D, PIER = 1.4, 1.4, .09
hw, hd = W / 2, D / 2
FLOORS, ROOF = (0, 4.7, 9.4), 14.1
CROWN = ROOF + 2.9
for i, (sx, sz) in enumerate(((-1, -1), (1, -1), (1, 1), (-1, 1))):
    x = sorted((sx * hw, sx * (hw - PIER))); z = sorted((sz * hd, sz * (hd - PIER)))
    span(f"Post{i}", x[0], x[1], 0, CROWN, z[0], z[1], STEEL)
def band(tag, h, t, m, out=.01, w=.04):
    a0, a1, b0, b1 = -hw - out, hw + out, -hd - out, hd + out
    span(tag + "N", a0, a1, h, h + t, b0, b0 + w, m, 0); span(tag + "S", a0, a1, h, h + t, b1 - w, b1, m, 0)
    span(tag + "W", a0, a0 + w, h, h + t, b0 + w, b1 - w, m, 0); span(tag + "E", a1 - w, a1, h, h + t, b0 + w, b1 - w, m, 0)
for k, h in enumerate(FLOORS + (ROOF,)):
    band(f"Ring{k}", h + 2.62, .06, STEEL)
span("Cap", -hw - .03, hw + .03, CROWN, CROWN + .16, -hd - .03, hd + .03, STEEL, .01)
band("CapBrass", CROWN + .16, .025, K.BRASS, .03)
span("Canopy", hw, hw + .6, ROOF + 2.5, ROOF + 2.55, -hd + .05, hd - .05, STEEL, .006)
span("CanopyEdge", hw + .57, hw + .6, ROOF + 2.47, ROOF + 2.55, -hd + .05, hd - .05, K.BRASS, 0)
span("Plinth", -hw - .05, hw + .05, 0, .14, -hd - .05, hd + .05, STEEL, .01)
span("PlinthBrass", -hw - .06, hw + .06, .14, .17, -hd - .06, hd + .06, K.BRASS, .004)
# Glass on all four sides, inset from the posts, as the code builds it.
span("GlassN", -hw + .06, hw - .06, .05, CROWN, -hd - .01, -hd + .01, GLASS, 0)
span("GlassS", -hw + .06, hw - .06, .05, CROWN, hd - .01, hd + .01, GLASS, 0)
span("GlassW", -hw - .01, -hw + .01, .05, CROWN, -hd + .06, hd - .06, GLASS, 0)
span("GlassE", hw - .01, hw + .01, .05, CROWN, -hd + .06, hd - .06, GLASS, 0)
for o in [o for o in K.col.objects if o.name.startswith("Glass")]:
    o.modifiers.clear()
gl = [o for o in K.col.objects if o.name.startswith("Glass")]
import bpy
bpy.ops.object.select_all(action="DESELECT")
for o in gl: o.select_set(True)
bpy.context.view_layer.objects.active = gl[0]; bpy.ops.object.join(); gl[0].name = "ShaftGlass"; gl[0].data.name = "ShaftGlass"

K.finish(OUT, "lounge_elevator_shaft", ortho=V(CROWN) * 1.25, centre=(0, 0, V(CROWN) / 2))
