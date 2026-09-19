# Canopy experience review and improvements

Method: dual-agent (design: `/root/design_review`; technical: `/root/technical_review`). Both inspected the current app independently. Source target: `index.html` and `src/main.js`; target slug `index-html`. The older app at port 4173 was excluded. The parent implemented and tested the changes.

## Review

The architectural shop, materials, lighting and visible production chain are Canopy's strongest features. The weak points were inconsistent next-action guidance, late-game tasks presented before their prerequisites, keyboard traps, small mobile type, and unnecessary work in the animation loop.

The initial heuristic score was **27/40**: status 3, real-world match 3, user control 3, consistency 3, error prevention 3, recognition 2, efficiency 3, minimalist design 2, recovery 2, help 3. No heuristic was omitted. This is a qualitative design review, not an accessibility certification.

| Priority | Finding | Change |
| --- | --- | --- |
| P1 | Goals recommended the cheapest Seeds upgrade while Stations recommended Pickup | Both now use the same bottleneck recommendation; the journal shortcut navigates without spending cash |
| P1 | Space on a focused button paused the game instead of activating it | Preserve native Space activation for buttons, links, summaries and custom controls |
| P1 | Keyboard focus escaped modal dialogs | Shared focus containment, background inertness and opener restoration for Settings, guide, reset, prestige and return report |
| P2 | Delivery goals appeared before the delivery pad was built | Prerequisite text, navigation to the pad, cash funding meter and accurate guide copy |
| P2 | Progression lacked a clear narrative thread | Seven persistent shop-story chapters link sales, stations, the menu, stores and existing regulars |
| P2 | Staff labels overlapped purchase buttons on phones | Two-line staff labels, readable status chips and internal scrolling when needed |
| P2 | Bottleneck explanations were truncated while handoff times had three decimals | Complete concise comparison and readable time precision |
| P2 | Menus were rewritten every animation frame | Commerce updates moved to the existing UI cadence, stable map-label DOM and cached spatial measurement |

The story adds no new currency or economic rewards. It recognizes existing progress, remembers completed chapters, and directs players to the actual station, menu, store or character. Shift goals remain available under a disclosure. The familiar Canvas architecture, fixed orientation, save key and hosting identity are preserved.

## Animation and graphics

Per the user's follow-up, no lighter-animation mode was added. Existing animation now includes distinct employee task rhythms, moving harvest shears, watering droplets, gentle customer turn lean, a carried bag that settles after pickup and swings with walking, and smoothly interpolated counter-service progress. Pause, game speed and the existing reduced-motion preference remain authoritative.

The phone tray retains the same height across tabs while allowing more map space. Unselected phone map labels show the station name; the selected station retains its level. Names remain accessible and all map hit targets retain their original station actions. Small menu and delivery captions are more readable.

## Performance evidence

At the same 1055×998 local preview viewport, a five-second MutationObserver sample counted 59,236 DOM mutation records before changes and 19,352 afterward (about 67% fewer). Gameplay progressed between samples, so these are diagnostic observations, not a controlled device benchmark or an FPS claim. The underlying cause is directly addressed: Shop/drone rendering no longer occurs per Canvas frame, marker geometry is only measured when it changes, hidden pages skip interface refreshes, and paused scenes redraw less often while input still invalidates immediately.

## Verification

- Production Vite build passes and retains the Safari-targeted classic deferred script.
- All 59 unit tests pass, including journal migration, completion, out-of-order legacy credit and economy preservation.
- A pre-existing economy test assumed the unscaled ten-pickup goal at 4× rewards. It now checks rejection below the already-scaled target, then a successful scaled claim. No reward economy was changed.
- Production browser checks used a dedicated local origin (port 4181), separate from the open development preview and its save. Starter and established fixtures passed at 1440×1000 and 390×844; additional 320×740 checks verified HUD bounds, wrapping and non-overlapping station sections.
- Interactions covered chapter navigation, delivery prerequisites and funding, upgrades, staff training, stock-preserving dispatch, branch selection, panels, pause/resume, lighting, zoom and recentering. A pointer drag changed pan without changing camera orientation.
- A paused reload preserved an exact comparison of money, station levels, staff, completed chapters, selected store and drone settings. Active desktop and phone gameplay showed order/pickup/leaving phases with no customer carrying a bag before ordering. Paused Canvas pixels remained unchanged over 1.2 seconds.
- Native Space activated the focused Menu tab without resuming the game. Settings and guide keyboard checks covered Tab/Shift+Tab containment and Escape; Settings returned focus to its opener. No browser errors were observed in the checked run.
- Actual iPhone/Safari hardware was not tested; Safari compatibility here refers to the retained build target and classic script, not a device certification. Existing OS reduced-motion behavior was preserved in code but was not separately emulated in this run.
- Reusable interaction checks: `tests/experience-check.js` (browser module, imported from the dev server into the dedicated test preview).

## Review provenance

No critique ignore file existed. The detector returned 29 raw findings (28 warnings, one advisory); its line-0 pointers and intentional game styling were reconciled with actual browser evidence. Raw output and the technical assessment are retained beside this report. The technical reviewer verified a live injected overlay on three representative surfaces, then removed it and stopped its own port-8401 server. The parent did not rerun the detector. No production publication was performed.

The parent removed the dedicated test save, closed its temporary tab, restored the browser's normal viewport and stopped the port-4181 test server. The development preview remains available on port 4180 with the user's existing save.

Questions skipped: the user authorized implementation and chose two independent review agents; further design choices were resolved within the established game direction.
