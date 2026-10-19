"""Canopy shop column (at the foot of the ground-floor stair), modelled from shell.column.

A green tiled base, a cream cap moulding and a cream square shaft up to the mezzanine slab, with a brass sconce under
a green shade on the -Y face.  The bulb is the object "Sconce" with its own material (SconceGlow) so code can drive
its glow after dark.  The origin is the centre of the footprint on the floor.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P shop_column.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
import canopy_kit as K

OUT = K.begin("ShopColumn")
TILE = K.mat("ColumnTile", "#2c6a4a", .3)
GROUT = K.mat("TileGrout", "#cfdcc4", .8)
PLASTER = K.mat("ColumnCream", "#f4e7c8", .6)
CAPM = K.mat("CapCream", "#e8dbb8", .5)
SHADE = K.mat("SconceShade", "#2d6a4c", .45)
BULB = K.mat("SconceGlow", "#fff2c8", .3, 0, 6.)

BW, BD, BH = .462, .432, 1.254       # tiled base
TOP = 3.174                          # up to the mezzanine slab

# ---------- tiled base: grout core with a grid of glazed tiles on every face ----------
K.box("BaseCore", (BW, BD, BH), (0, 0, 0), GROUT, .006)
tile_me = bpy.data.meshes.new("Tile"); bm = bmesh.new()
bmesh.ops.create_cube(bm, size=1); bm.to_mesh(tile_me); bm.free()
tile_me.materials.append(TILE)
tile_obj = K.link(bpy.data.objects.new("TileProto", tile_me))
bv = tile_obj.modifiers.new("Bevel", "BEVEL"); bv.width = .006; bv.segments = 2
# a real mesh so the bevel exports: apply it into a fresh mesh shared by every tile
dg = bpy.context.evaluated_depsgraph_get()
TILE_ME = bpy.data.meshes.new_from_object(tile_obj.evaluated_get(dg)); TILE_ME.name = "GlazedTile"
for p in TILE_ME.polygons: p.use_smooth = True
bpy.data.objects.remove(tile_obj)
ROWS, G = 7, .007
th = (BH - .02) / ROWS
def face_tiles(axis, sign, width, depth):
    cols = 3
    tw = (width - .01) / cols
    for r in range(ROWS):
        for c in range(cols):
            u = -width / 2 + .005 + tw * (c + .5); z = .01 + th * (r + .5)
            if axis == "y":
                loc = (u, sign * (depth / 2 + .004), z); scale = (tw - G, .012, th - G)
            else:
                loc = (sign * (depth / 2 + .004), u, z); scale = (.012, tw - G, th - G)
            K.inst(f"Tile{axis}{sign}{r}{c}", TILE_ME, loc, (0, 0, 0)).scale = scale
face_tiles("y", -1, BW, BD); face_tiles("y", 1, BW, BD)
face_tiles("x", -1, BD, BW); face_tiles("x", 1, BD, BW)

# ---------- cap moulding, shaft and the top moulding ----------
K.box("CapLower", (.5, .47, .05), (0, 0, BH), CAPM, .02)
K.box("CapUpper", (.475, .445, .037), (0, 0, BH + .05), PLASTER, .012)
K.box("Shaft", (.444, .414, TOP - BH - .087 - .2), (0, 0, BH + .087), PLASTER, .01)
K.box("TopNeck", (.48, .45, .05), (0, 0, TOP - .2), CAPM, .015)
K.box("TopCap", (.54, .51, .15), (0, 0, TOP - .15), PLASTER, .04, 5)

# ---------- brass sconce on the -Y face ----------
SZ, FY, S = 1.884, -.414 / 2, 1.7   # S scales the sconce up to the sprite's chunky fitting
K.cyl("SconcePlate", .035 * S, .035 * S, .016, (0, FY + .002, SZ + .05 * S), K.BRASS, 24).rotation_euler.x = math.pi / 2
K.tube("SconceArm", [(0, FY - .01, SZ + .05 * S), (0, FY - .05 * S, SZ + .06 * S), (0, FY - .09 * S, SZ + .03 * S), (0, FY - .1 * S, SZ - .0)], .011 * S, K.BRASS)
AX = FY - .1 * S
K.cyl("ShadeCollar", .02 * S, .02 * S, .03 * S, (0, AX, SZ - .03 * S), K.BRASS, 16)
K.cyl("Shade", .085 * S, .03 * S, .07 * S, (0, AX, SZ - .1 * S), SHADE, 32)
K.cyl("ShadeRim", .087 * S, .087 * S, .008 * S, (0, AX, SZ - .103 * S), K.BRASS, 32)
bulb = bpy.data.meshes.new("Sconce"); bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=.04 * S); bm.to_mesh(bulb); bm.free()
for p in bulb.polygons: p.use_smooth = True
o = K.link(bpy.data.objects.new("Sconce", bulb), BULB); o.location = (0, AX, SZ - .105 * S)

K.finish(OUT, "shop_column", ortho=3.6, centre=(0, 0, 1.6))
