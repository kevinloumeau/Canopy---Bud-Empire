# Assessment B — detector, browser and technical evidence

Independent reviewer: `/root/technical_review`. No Assessment A output was read. No application files were edited. Target: `index.html`, current `src/main.js`, served at `http://127.0.0.1:4180/` (the older project on 4173 was not used). Target slug: `index-html`. Reviewed current `PROJECT_CONTEXT.md`, `PRODUCT.md`, `DESIGN.md` and applicable `AGENTS.md`. No `.impeccable/critique/ignore.md` was present.

## Deterministic scan

Executed `/Users/kevinloumeau/.agents/skills/impeccable/scripts/impeccable detect --json index.html`. Exit 2 means findings, not a crash. Complete JSON is retained in `artifacts/review/assessment-b-detector.json`. The first tool display was truncated; the repeated invocation persisted the complete JSON and is the authoritative count. Parent should reuse this file, not rerun the detector.

**29 raw findings: 28 warnings, 1 advisory.** All report `index.html`, line 0, so those line numbers are not actionable source locations. Resolved source pointers follow below.

| Rule | Count | Raw subjects |
| --- | ---: | --- |
| `undersized-ui-text` | 15 | Bottleneck; seven station names; avg / order; three dispatch-stat captions; three receipt labels |
| `cramped-padding` | 9 | Seven employee rows; online-card; stock-item |
| `low-contrast` | 1 | Detector claims 4.0:1 for `#e2c586` on `#555f55` |
| `tiny-text` | 1 | 11px body text |
| `nested-cards` | 1 | Card inside card |
| `side-tab` | 1 | `.sheet .flow-guide::before` 3px stripe |
| `repeating-stripes-gradient` | 1 advisory | Repeating gradient |

## Browser and overlay evidence

Created an independent new Chrome tab `249299228`. Inspected at the existing desktop viewport **1460×891** and an explicit **390×844** phone viewport. Viewed Stations, the welcome guide, Settings, Staff, Menu and the locked Deliveries state. Mobile checks found no document-wide horizontal overflow. The scene remained functional and responsive to panel navigation; no FPS claim is made.

The CUA Playwright evaluate surface is read-only, but the advertised CDP capability permits mutation. A real `Runtime.evaluate` preflight changed `document.title` and appended a script successfully. Therefore the overlay was actually run, not skipped. The first sandboxed `live-server --background` attempt returned “Timed out waiting for live server to start.” A permitted escalation started the local overlay server on **8401, PID 9139**. Injected `http://localhost:8401/detect.js` into three freshly reloaded representative views and labeled the tab `[Human]`.

Observed console messages from the detector script:

- Deliveries: **172 anti-patterns found**, 2026-09-19T05:38:03.922Z.
- Staff: **179 anti-patterns found**, 2026-09-19T05:38:26.508Z.
- Menu: **173 anti-patterns found**, 2026-09-19T05:38:37.548Z.

These are raw whole-DOM overlay counts and overlap across views. They must not be summed or presented as independently verified defects. Overlay screenshots visibly outlined undersized labels and text in Menu; delivery helper copy was flagged as tiny. It also flagged the game's intentional soft glows and heading relationships in hidden content. No app-origin JavaScript errors were captured. Console warnings from a Chrome extension were excluded from the app assessment.

## Five actionable priorities

### 1. P1 — The global Space shortcut intercepts native button activation

**Location:** `src/main.js:2820–2825`.

**Reproduction:** With Staff open, focus the Menu tab button and press Space. The page announces **GAME PAUSED**, the HUD reads **Paused**, Staff remains `aria-pressed=true`, and Menu remains `aria-pressed=false`. This was reproduced through a real keyboard event. Normal speed was restored afterward.

**Cause:** The document handler excludes input/select/textarea/contenteditable, but not buttons, links, role=button or other interactive controls. It calls `preventDefault()` for Space, cancelling the control's normal behavior.

**Fix direction:** Limit game shortcuts to the map/page background, or return early for interactive ancestors. Keep Space-to-pause for background focus and preserve native keyboard activation everywhere else. Verify tabs, upgrades, custom stock buttons, settings and dialog actions with Enter/Space. This is a functional accessibility defect, not aesthetic preference.

### 2. P1 — Modal focus escapes into the game behind the overlay

**Locations:** `src/settings.js:21–26`; `src/start-guide.js:34–40`. Related reset open/close logic is in `src/main.js:2808`.

**Evidence:** Settings initially focuses Close settings, but **Shift+Tab moves to the background Empire tab while Settings remains open**. On the welcome guide, Tab from Show me reaches the document and then Goals behind the overlay. Both elements declare `aria-modal=true`, yet the full underlying game remains in the accessibility tree and keyboard order. The settings source only handles Escape; the guide has no focus restoration on close.

**Fix direction:** A small shared modal helper can make the game background inert, contain Tab/Shift+Tab and restore the opener. Apply the same helper to Settings, guide and reset/prestige/return overlays without changing their visual design or save behavior. Test backward as well as forward traversal. Modal `aria-modal` alone does not implement this behavior.

### 3. P2 — Mobile Staff status text runs under the Train buttons

**Locations:** `src/sheet-height.css:67–73`, in interaction with `src/stations-compact.css:127–135` and `:150–154`.

**Evidence:** At 390×844 the Staff screenshot shows the security check-time and every `1.0× speed` label ending under the first purchase button. The late sheet-height rule forces name + two status chips onto one row, sets status overflow to visible, and still reserves two 78px purchase buttons. At this width the central text column cannot contain its contents. This undermines the information the player needs before spending.

**Fix direction:** Restore a two-line name/status arrangement at phone widths (or use a container breakpoint) and prevent status chips from painting outside their grid cell. Keep both Train/Max actions, their prices and seven-row grouping. Do not solve it by shrinking the type further. Validate 390px and 320px, including large levels/prices.

### 4. P2 — Later component CSS overrides the documented type floor

**Locations:** `src/flower-menu.css:8,15,38,48`; `src/stations-compact.css:111`; `src/deliveries.css:8,30,35,37`; marker inline sizing at `src/main.js:2379–2389`.

**Browser evidence:** The visible Menu average-order caption computes to **9px** at 390px; the visible Bottleneck caption computes to **9.5px**; station-strip names compute to **10.5px** on desktop (the CLI reports 9.5px for those names, so its exact value is stale/inexact). Unlocked receipt/dispatch captions compute to 9.5–10px in source/DOM but were not visually tested after unlocking. The initial main-map name labels were inline-sized to **6.8px** on desktop, below the 11px CSS plaque intent; the level line has its own 10.5px declaration. Tiny scene plaques should be addressed with camera-aware minimum-size logic, not a general visual redesign.

**Fix direction:** Consolidate minimum text sizes in the last applicable stylesheet or tokens, then adjust spacing so all functional captions are at least the existing DESIGN.md floor (11px; paragraphs 12px). Prioritize the menu summary, status captions and map hit labels. Keep the intentionally compact game layout and established fonts.

### 5. P2 — Rendering does avoidable whole-shop DOM work on every animation frame

**Locations:** `src/main.js:2322,2378–2395`; `src/shop-browser.js:34–56`; related all-pane refreshes at `src/main.js:2410–2412,2830` and `src/empire-shell.js:77–90`.

**Source evidence:** Each main-map animation frame runs `updateMarkers()`. Besides moving map plaques, it rewrites drone controls and runs `shopBrowser.render()`, which visits 30 upgrade rows, five category buttons and badge text even when Shop is hidden. The same marker loop writes display/font styles and immediately reads `offsetWidth/offsetHeight` for seven labels. Separately, all-pane renderUI runs every 250ms and Empire sync runs every 250ms. This is a concrete unnecessary hot path; no device slowdown or numeric FPS regression was benchmarked.

**Fix direction:** Keep camera-dependent marker transforms in the frame loop for immediate pan/zoom tracking. Move economic/shop/drone text updates to the existing UI cadence or state changes; skip hidden-pane work where safe, and cache label dimensions until font/level/viewport changes. Measure before and after on a phone. Preserve Canvas 2D, the fixed simulation cadence, customer ordering, Safari classic build and save format.

## Detector reconciliation / smaller observations

- The seven `employee-card` cramped-padding warnings should not be treated as seven confirmed card defects. Current rows are transparent list rows with dividers and real padding (desktop computed `6px 3px`), not boxed cards flush on all sides. The actual phone overflow described above is the actionable issue.
- Receipt paper inside the delivery surface, its barcode stripe, the construction stripe, soft lime/gold glows and the bottleneck accent have product-specific purposes. Preserve them unless Assessment A independently finds a real hierarchy problem; generic style rules are not redesign authorization.
- The single CLI contrast ratio uses a computed background approximation. Translucent glass over Canvas needs actual composited-color checking before claiming WCAG failure. The chosen value is not a verified screenshot color sample.
- Phone targets measured: speed controls **25×30px**, Settings/Goals around **30×30px**, Staff purchase buttons **78×34.6px**, stock buttons **54–66×36px**. These are smaller than a comfortable 44px touch target; this is an ergonomic improvement opportunity, not automatically a WCAG 2.2 AA failure (whose minimum/spacing exceptions differ). Expand hit regions carefully without obscuring neighboring controls.
- The delivery guide still says to send web orders when the counter lights, while the current initial Deliveries state requires **Build $7.50K**. Consider aligning the guide copy with the new unlock, after the behavior/accessibility fixes.

## Cleanup and scope

Restored the normal viewport. Reloaded the review tab, which removed the temporary script, overlay and `[Human]` title; verified the original title, then closed the tab. The CLI `live-server stop --keep-inject` incorrectly reported no running server, so the known review PID 9139 was stopped directly with permission. A subsequent `lsof` check confirmed no listener on 8401. The pre-existing 8400 listener was not ours and was untouched. No live overlay/server remains from this assessment. The parent's game dev server was not stopped.

Only the two intended assessment artifacts were written. No purchase, reset, save migration, production build, app change or publication was performed. Normal gameplay advanced and autosaved in this fresh localhost review origin during inspection. This read-only critique does not claim production/Safari validation, saved-state regression coverage or unlocked late-game interaction coverage.
