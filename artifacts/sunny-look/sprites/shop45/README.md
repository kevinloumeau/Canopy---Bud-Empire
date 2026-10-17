# Shop pieces at the 45° camera (brief section 12)

30 transparent PNGs with the same names as before, so the code picks them up.

How they were made (all Ludo `image edit`):
1. Lift the shape from the matching `guides-45` crop with no style reference. This keeps the exact 45° angle, footprint and orientation.
2. Run a second pass on that result to restyle it as soft 3D clay.
3. Clean with `image remove-background`.

The guides showing several objects (mezzanine, top floor, stairs, lounge/menu wall) were cropped to one object first. `station.orders.tier2/3` were made by upgrading the picked tier 1 counter, so all three share one shape.

Using a style reference image made Ludo copy the reference's content (every piece became an order counter) and drop the 45° angle, so step 1 does without one. As a result, these pieces are a little flatter and closer to the drawn guide look than the earlier sprites.

Known weak spots: the open lounge door's drapes are green rather than burgundy, `station.pack.tier3` is busy, and sprite sizes are not normalised to a common scale.

Cleanup: several Ludo outputs had a checkerboard baked into the pixels that `remove-background` left behind. Those pixels were cleared with a border flood fill of near-neutral light pixels; on the order counters this was also applied to regions enclosed by the arch. Stray fragments were removed from `station.pickup.tier3` and `station.orders.tier3`. `station.pickup.tier3` has no PICKUP arch, because the arch was cropped off in generation.

Update 2026-10-16: Kevin regenerated `shell.lounge.door.open`, `station.pickup.tier3`, `station.pack.tier3`, `deck.delivery.site` and `deck.delivery.built` in ChatGPT, and those files replace the Ludo versions. All five have real transparency and were downscaled to 512 px on the long side to match the rest of the set.
