"""Shared helpers for the city-dressing models round Canopy's shop (city_buildings.py, city_props.py).

Imports canopy_kit and building_parts from ../blender (owned by the diorama thread; read only here).
Every model is exported as ONE mesh with ONE material whose colour comes from a vertex colour attribute, so the game
draws each kind with a single instanced draw call however many copies stand in the town.
"""
import os, sys, json, math
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "blender"))
import bpy, bmesh
import canopy_kit as K
import building_parts as B

def base_colour(m):
    if m is None or not m.use_nodes: return (.8, .8, .8, 1)
    b = m.node_tree.nodes.get("Principled BSDF")
    c = list(b.inputs["Base Color"].default_value)
    return (c[0], c[1], c[2], 1)

def flatten(name):
    """Apply modifiers, join every mesh into one object and turn its materials into a vertex colour."""
    bpy.ops.object.select_all(action="DESELECT")
    objs = [o for o in bpy.data.objects if o.type == "MESH"]
    for o in objs: o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.convert(target="MESH")
    # Remember each face's colour before joining (material slots merge on join, colours survive as an attribute).
    for o in objs:
        me = o.data
        attr = me.color_attributes.new("Col", "FLOAT_COLOR", "CORNER")
        cols = [base_colour(s.material) for s in o.material_slots] or [(.8, .8, .8, 1)]
        for p in me.polygons:
            c = cols[min(p.material_index, len(cols) - 1)]
            for li in p.loop_indices: attr.data[li].color = c
    # Faces painted with a material named *Paint stay on a second, white "CarPaint" material, so the game can tint
    # each copy (parked cars); everything else shares the vertex-coloured one.
    painted = {}
    for o in objs:
        for p in o.data.polygons:
            s = o.material_slots[p.material_index].material if o.material_slots else None
            painted[(o.name, p.index)] = bool(s and s.name.endswith("Paint"))
    for o in objs:
        flag = o.data.attributes.new("painted", "INT", "FACE")
        for p in o.data.polygons: flag.data[p.index].value = int(painted[(o.name, p.index)])
    bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active
    o.name = name
    me = o.data
    paint_faces = [p.index for p in me.polygons if me.attributes["painted"].data[p.index].value]
    me.materials.clear()
    m = bpy.data.materials.new("CityPaint"); m.use_nodes = True
    nt = m.node_tree; bsdf = nt.nodes["Principled BSDF"]
    ca = nt.nodes.new("ShaderNodeVertexColor"); ca.layer_name = "Col"
    nt.links.new(ca.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = .8
    me.materials.append(m)
    if paint_faces:
        cp = bpy.data.materials.new("CarPaint"); cp.use_nodes = True
        cp.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (1, 1, 1, 1)
        cp.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = .4
        me.materials.append(cp)
        for i in paint_faces: me.polygons[i].material_index = 1
    me.attributes.remove(me.attributes["painted"])
    me.color_attributes.active_color = me.color_attributes["Col"]
    # Merge coincident corners so the file stays small.
    bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5); bm.to_mesh(me); bm.free()
    return o

def bounds(o):
    xs = [ (o.matrix_world @ v.co) for v in o.data.vertices ]
    x0 = min(v.x for v in xs); x1 = max(v.x for v in xs); y0 = min(v.y for v in xs); y1 = max(v.y for v in xs); z1 = max(v.z for v in xs)
    # three.js: x = x, z = -y, y = z
    return {"x0": round(x0, 4), "x1": round(x1, 4), "z0": round(-y1, 4), "z1": round(-y0, 4), "top": round(z1, 4), "tris": sum(len(p.vertices) - 2 for p in o.data.polygons)}

def export(out, name, meta=None):
    o = flatten(name)
    info = bounds(o)
    if meta: info.update(meta)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out, name + ".blend"))
    bpy.ops.export_scene.gltf(filepath=os.path.join(out, name + ".glb"), export_format="GLB", export_apply=True, export_yup=True, export_vertex_color="ACTIVE")
    return info

def write_meta(out, table):
    path = os.path.join(out, "city_meta.json")
    old = json.load(open(path)) if os.path.exists(path) else {}
    old.update(table)
    json.dump(old, open(path, "w"), indent=1, sort_keys=True)
