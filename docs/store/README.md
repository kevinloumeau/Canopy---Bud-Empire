# App Store screenshots

Captured from the simulator, at the exact pixel sizes App Store Connect asks for. Nothing here is resized or
retouched — they are submittable as they stand.

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

## Still to capture

A 13-inch iPad set (**2064 × 2752**) off the iPad Pro 13-inch simulator, since the app ships universal and
App Store Connect asks for iPad shots when it does. The same method applies; the iPad's tab bar sits under the
side panel rather than across the bottom, so frame them with the panel open.

## Re-capturing

The game state matters more than the tooling — a shop with a few stations built and some money on the clock reads
far better than a fresh save, where every panel is empty and every station says "Build". Play a few minutes first,
then walk the tabs with `xcrun simctl io <device> screenshot`.
