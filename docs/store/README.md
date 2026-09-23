# App Store screenshots

Captured from the simulator, at the exact pixel sizes App Store Connect asks for. Nothing here is resized or
retouched — they are submittable as they stand.

**The images themselves are not in git.** They are 5.7-megapixel PNGs, about 47 MB a set, they are retaken
whenever the interface changes, and git would keep every past set forever. So the recipe is versioned and the
pictures are not: they sit in these folders on disk, ready to upload, and this file says exactly how to make them
again. Lossless recompression only reaches 86%, so there is no clever way to keep them cheaply.

## iphone-6.9/

**1320 × 2868**, which is the 6.9-inch requirement, and also exactly what the iPhone 18 Pro Max simulator
renders. That coincidence is why these need no post-processing: a resized screenshot would resample text, and
App Store Connect rejects anything that is not the precise size anyway.

| File | Shows |
| --- | --- |
| `01-stations.png` | The shop, with the stations panel and the bottleneck banner |
| `02-menu.png` | The strain menu — trend, potency and price |
| `03-deliveries.png` | The delivery pad, before it is built |
| `04-empire.png` | Daily goals and the branch stores |

The status bar is the canonical one Apple uses in its own marketing — 9:41, full bars, full battery — set with:

```bash
xcrun simctl status_bar booted override --time "9:41" --batteryState charged --batteryLevel 100 \
  --cellularMode active --cellularBars 4 --wifiMode active --wifiBars 3 --dataNetwork wifi
```

Clear it again with `xcrun simctl status_bar booted clear`.

## ipad-13/

**2064 × 2752**, off the iPad Pro 13-inch simulator, which renders at exactly that. Needed because the app ships
universal, so App Store Connect asks for an iPad set. Same four screens as the iPhone set. The iPad layout puts
the sheet down the right-hand side with the tab bar tucked under it, which is worth showing — it is visibly a
tablet layout rather than a stretched phone.

## Re-capturing

Both device sizes come straight out of their simulators, so no resizing step is involved at any point.

The game state matters more than the tooling — a shop with a few stations built and some money on the clock reads
far better than a fresh save, where every panel is empty and every station says "Build". Play a few minutes first, then walk the tabs
with `xcrun simctl io <device> screenshot`.

A shortcut worth knowing: on a fresh install, taking the age gate and then pressing **Skip** on the opening guide
leaves a shop with all seven stations built and customers already in it, which photographs far better than
anything reachable by tapping around for the same length of time.
