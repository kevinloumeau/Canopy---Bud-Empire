# Shop interior sprites (brief section 4)

42 transparent PNGs, about 640 px on the long side, named per the brief (`category.object.variant.png`).

- Generated with the Ludo CLI `image generate-with-style`, image type `sprite`, 4 candidates each, prompt augmentation on.
- Prompt = brief style prefix + `Object: <object line>, <tier line>` + the negative-prompt words as an "Avoid:" sentence (this endpoint has no negative-prompt field).
- Style reference: the approved hero `counter.png` for desks, counters, doors and fixtures; hero `grow.png` for the seed, grow and harvest benches, lounge and planters.
- `station.grow.tier2` and `station.orders.tier2` are copies of the approved hero sprites (512 px), not new generations.
- Regenerated with a sharper prompt: `station.pickup.tier2/3` (PICKUP lettering was missing), `shop.door.entrance` (sign strip was missing), all three awnings (first pass read as tents).
- Not upscaled yet. The menu board's flap letters are decorative gibberish; draw real menu text in code if needed.
- `previews/` holds the candidate contact sheets and `00-final-picks.jpg`.
