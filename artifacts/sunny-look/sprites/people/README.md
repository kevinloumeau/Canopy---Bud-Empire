# People sprites (brief section 5)

28 transparent PNGs: 14 figures x `stand` / `walk`, named `person.<role>.<nn>.<pose>.png`.

**Style:** every figure was generated with Ludo `image generate-with-style` using `person.customer.07.stand` (the look Kevin chose) as the style reference, 4 candidates each.

**Walk poses:** made with Ludo `sprite generate-pose` from each picked stand pose (mid-stride, facing front-right), then cleaned with `image remove-background`.

**Normalised scale:** every PNG is a 448x640 canvas. The figure is trimmed and scaled to 600 px tall, centred horizontally, and its feet sit 8 px above the bottom edge. Anchor each sprite at its bottom centre and use one scale factor for all of them in code. Width is capped at 432 px; no current figure hits the cap.

`person.customer.07` is based on a reference outfit Kevin supplied.
