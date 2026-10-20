"""Founder's finish: the seventh station look, unlocked by the founder perk of the same name (Lv 100 stations, a
Lv 75 security booth). It is the flagship (tier 5) model rebuilt in ebony, emerald lacquer and gold, so every part
name the station animations drive stays the same.

Run headless with
    blender -b -P founder_finish.py -- OUT_DIR SCRIPT [TIER]
e.g. `-- out order_desk_tier5.py` writes out/order_desk_founder.glb, and `-- out security_booth.py 5` writes
out/security_booth_founder.glb. Plants, buds, glass, screens and lights keep their colours.
"""
import os, sys, runpy
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import canopy_kit as K

# Material name -> (colour, roughness or None to keep it). Woods go ebony, greens go deep emerald, brass goes gold.
FOUNDER = {
    "Walnut": ("#2a211c", None), "WalnutDark": ("#1b1512", None), "Oak": ("#3b2f27", None), "LightOak": ("#3b2f27", None),
    "FlutedOak": ("#2f2620", .42), "PanelInset": ("#14100d", None),
    "CanopyGreen": ("#13573f", .35), "CanopyGreenDeep": ("#0d3a2a", .4), "GreenLacquer": ("#11523b", .25),
    "GreenLacquerDeep": ("#0b3426", .3), "GreenTile": ("#0f4d37", .18), "GreenMarble": ("#123e2e", .2), "DoorMat": ("#0d2a1f", None),
    "Brass": ("#e9c35f", .22), "PolishedBrass": ("#f2cd68", .14),
    "CreamStone": ("#f6f1e6", None), "Marble": ("#f8f4ec", .18), "MarbleVein": ("#d8c79a", None), "CreamTop": ("#f6efdc", None),
    "Cream": ("#f6f0e2", None), "CreamPaint": ("#f4eedf", None), "CabinetCream": ("#f4ecd8", None), "Grout": ("#c9a957", None),
    "PotCream": ("#1b1512", .35), "Terracotta": ("#1f1915", .4), "TerracottaRim": ("#d9b45a", .25),
}
_mat = K.mat
def mat(name, hexcol, rough=.5, metal=0., emit=0., two_sided=False):
    if name in FOUNDER:
        hexcol, r = FOUNDER[name]; rough = rough if r is None else r
    return _mat(name, hexcol, rough, metal, emit, two_sided)
K.mat = mat

_finish = K.finish
def finish(out, name, *a, **kw):
    base = name.split("_tier")[0]
    return _finish(out, base + "_founder", *a, **kw)
K.finish = finish

argv = sys.argv[sys.argv.index("--") + 1:]
out, script = argv[0], argv[1]
sys.argv = [script, "--", out] + argv[2:] + [x for x in sys.argv if x == "--no-render"]
runpy.run_path(os.path.join(HERE, script), run_name="__main__")
