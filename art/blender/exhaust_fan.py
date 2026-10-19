"""Canopy exhaust fan (the top floor's wall fan in its solid glazing bay).

A green square housing with a dark round throat behind a brass guard ring, four pale blades and a brass hub.  The fan
faces -Y with its back on y=0; the origin is the housing's centre on its back face, since it hangs on the glazing.
"Rotor" holds the blades and the hub, with its origin on the spin axis (Blender Y), so code spins Rotor.rotation.y in
Blender terms (three.js: rotation about its z after the y-up export).

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P exhaust_fan.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
import canopy_kit as K

OUT = K.begin("ExhaustFan")
HOUSING = K.mat("FanHousing", "#2f6b52", .5)
THROAT = K.mat("FanThroat", "#1d3028", .7)
BLADE = K.mat("FanBlade", "#b9cbb4", .45)

S = .852                 # housing, square
HD = .083                # housing depth
R = .331                 # throat radius

def ring_y(name, r_out, r_in, y0, y1, m, n=48):
    """A flat ring around the Y axis from y0 to y1 (centre at x=0, z=0)."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    loops = [[bm.verts.new((rr * math.cos(2 * math.pi * i / n), y, rr * math.sin(2 * math.pi * i / n))) for i in range(n)] for y in (y0, y1) for rr in (r_out, r_in)]
    o0, i0, o1, i1 = loops
    for k in range(n):
        j = (k + 1) % n
        bm.faces.new((o0[k], o0[j], i0[j], i0[k])); bm.faces.new((o1[k], i1[k], i1[j], o1[j]))
        bm.faces.new((o0[k], o1[k], o1[j], o0[j])); bm.faces.new((i0[k], i0[j], i1[j], i1[k]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    for f in bm.faces: f.smooth = True
    bm.to_mesh(me); bm.free()
    return K.link(bpy.data.objects.new(name, me), m)

# ---------- housing: a beveled green box with a raised front frame and corner bolts ----------
K.box("Housing", (S, HD, S), (0, -HD / 2, -S / 2), HOUSING, .03, 4)
K.box("FrontFrame", (S - .06, .02, S - .06), (0, -HD - .005, -(S - .06) / 2), HOUSING, .015, 3)
for sx in (-1, 1):
    for sz in (-1, 1):
        o = K.cyl(f"Bolt{sx}{sz}", .016, .016, .012, (0, 0, 0), K.BRASS, 16)
        o.rotation_euler.x = math.pi / 2; o.location = (sx * (S / 2 - .06), -HD - .013, sz * (S / 2 - .06))
# the throat: a dark recess with a brass guard ring
o = K.cyl("Throat", R, R, .03, (0, 0, 0), THROAT, 48); o.rotation_euler.x = math.pi / 2; o.location = (0, -HD + .01, 0)
ring_y("ThroatLip", R + .03, R, -HD - .048, -HD - .015, HOUSING)
ring_y("GuardRing", R + .012, R - .01, -HD - .065, -HD - .048, K.BRASS)
for a in (0, math.pi / 2):   # two thin guard bars across the opening
    o = K.box(f"GuardBar{a:.1f}", (2 * R, .008, .012), (0, -HD - .06, -.006), K.BRASS, .003); o.rotation_euler.y = a + math.pi / 4

# ---------- rotor: four pitched blades and a brass hub, spinning about Y ----------
rotor = bpy.data.objects.new("Rotor", None); K.link(rotor); rotor.location = (0, -HD - .034, 0)
for b in range(4):
    piv = bpy.data.objects.new(f"BladeArm{b}", None); K.link(piv); piv.parent = rotor
    piv.rotation_euler.y = b * math.pi / 2
    bl = K.box(f"Blade{b}", (.26, .012, .13), (.16, 0, -.065), BLADE, .005)
    bl.parent = piv; bl.rotation_euler.x = .25
hub = K.cyl("Hub", .06, .05, .035, (0, 0, 0), K.BRASS, 24); hub.rotation_euler.x = math.pi / 2
hub.parent = rotor; hub.location = (0, .01, 0)
cap = bpy.data.meshes.new("HubCap"); bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=10, radius=.035); bm.to_mesh(cap); bm.free()
for p in cap.polygons: p.use_smooth = True
c = K.link(bpy.data.objects.new("HubCap", cap), K.BRASS); c.parent = rotor; c.location = (0, -.024, 0); c.scale = (1, .6, 1)

K.finish(OUT, "exhaust_fan", ortho=1.4, centre=(0, 0, 0))
