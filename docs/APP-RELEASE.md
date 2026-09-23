# Shipping Canopy as an app

Working checklist for wrapping the existing PWA with Capacitor. **iOS first** — see the reasoning below; the
Android notes are kept at the end as a later step, not a dead end.

**me** = I can do it in this repo. **you** = needs your account, your money, or your hardware.

Revised 23 September 2026, after establishing there are no Android devices to hand.

---

## Why iOS first, despite costing more

The first draft of this checklist recommended Android on cost: $25 once against Apple's $99 a year, for a game
that earns nothing. That reasoning held right up until the constraint that actually decides it.

**Google requires new personal developer accounts to run a closed test — at last check 12 testers, opted in
continuously for 14 days — before you may apply for production access.** With no Android devices and nobody to
hand who owns one, that is not a hurdle to plan around; it is a wall. You would be recruiting a dozen strangers
onto a pre-release build and keeping them there for a fortnight, before a single member of the public could
install the game.

Apple has no equivalent gate. TestFlight takes an internal build immediately, and you can install on your own
device the same afternoon. You already own the one machine iOS development requires — plenty of developers cannot
ship to the App Store at all for want of a Mac.

So the honest trade is $99 a year for a route you can finish, against $25 once for one you probably cannot start.
Take the route you can finish. **Verify Google's current testing rule before treating Android as reopened** — it
has changed repeatedly and may change again.

### What you give up, stated plainly

- **Cost.** $99 every year, indefinitely, with no revenue to offset it. Budget it as a subscription.
- **Review risk.** Guideline 4.2 ("minimum functionality") exists to reject repackaged websites, and a web-wrapped
  app invites that scrutiny. Canopy's defence is real and worth stating in the review notes: it is a substantial
  game with hours of progression, it plays fully offline with nothing fetched at runtime, and it is a live Canvas
  renderer rather than a site in a shell. Not a guarantee, but a good position.
- **Slower iteration.** Every build goes through App Review, where Play's internal track does not.

---

## Phase 0 · Decisions only you can make

- [ ] **you** — Enrol in the Apple Developer Program ($99/year). Identity verification takes days; start it first.
- [ ] **you** — Choose the bundle ID. Permanent, never changeable. Suggested: `com.kevinloumeau.canopy`.
- [ ] **you** — Install Xcode. Only Command Line Tools are present, and Xcode is a large download.
- [ ] **you** — Confirm whether you have an iPhone or iPad to test on. Not a blocker — the Simulator is good and I
      can drive it from here — but at least one real device before submitting is strongly advised.

## Phase 1 · Make the web build ready to wrap

- [x] **done** — **Fonts bundled.** Bricolage Grotesque and DM Mono were fetched from Google Fonts; they now ship
      in the repo (OFL, latin + latin-ext, 119 KB). The built game makes no external requests at all, which is
      what lets the privacy answers below say "no data collected" honestly.
- [ ] **me** — **Make the save survive iOS.** This matters more on iOS than it would have on Android: WKWebView's
      local storage can be evicted by the system under storage pressure, where Android WebView keeps it in app
      data. Persisting the save through Capacitor Preferences (native user defaults) takes it out of WebView
      storage entirely. The export/import already shipped is the manual safety net; this is the automatic one.
- [ ] **me** — Safe areas: notch, Dynamic Island and home indicator. The HUD sits at the top edge and the tray at
      the bottom, so both need insets. `viewport-fit=cover` is already set.
- [ ] **me** — Lock orientation to portrait to match the manifest, and confirm the canvas reflows on rotation
      lock changes.
- [ ] **me** — Confirm the service worker stays dormant under Capacitor (its guard excludes `localhost`, which is
      what Capacitor serves from) and that nothing depends on it now the fonts are local.
- [ ] Already fine: `vite.config.js` sets `base: './'`, so built asset paths are relative and resolve in a wrapper.
- [ ] Not needed on iOS: Android hardware back-button handling. Required if Android is revisited.

## Phase 2 · Wrap it

- [ ] **me** — Add `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`.
- [ ] **me** — `npx cap init` with the bundle ID from Phase 0; point `webDir` at `dist`.
- [ ] **me** — `npx cap add ios`, then wire `npm run build && npx cap sync` into one release script.
- [ ] **me** — App icon and launch screen from the existing 512px icon; status bar styled to `#1f3529`.

Capacitor rather than a web view of the live site, deliberately: it bundles the game inside the app, so it launches
offline with no dependency on GitHub Pages staying up — and an app that works with the network off is the single
strongest answer to a Guideline 4.2 query.

## Phase 3 · Test

- [ ] **me** — Run it in the iOS Simulator and verify: cold launch offline, the age gate, save persistence across
      a force-quit, and save export/import through the iOS file picker.
- [ ] **you** — Install on a real device if you have one. The Simulator does not reproduce memory pressure,
      thermals or real storage eviction, which is exactly the risk area for the save.
- [ ] **me** — Check frame rate on device-class hardware. 3.7ms/frame on a Mac says little about an older iPhone.

## Phase 4 · Store listing

- [ ] **me** — Screenshots at the sizes App Store Connect currently requires. The capture tooling in `scripts/`
      already produces device-sized frames and needs only a preset.
- [ ] **me** — Short subtitle and full description.
- [x] **done** — Privacy policy URL: `public/privacy.html`, live on the Pages site once main deploys.
- [ ] **you** — Privacy nutrition labels. Canopy's answer is the simple one — **Data Not Collected** — which is
      true only because the fonts are now bundled and no analytics provider is loaded.
- [ ] **you** — Age rating questionnaire. Answer honestly on drug references; expect the top tier (18+ since
      Apple's July 2025 overhaul). Comparable titles carry exactly that.
- [ ] **me** — Draft review notes explaining that the game is fiction, sells nothing, and runs entirely offline —
      pre-empting both the 4.2 question and any concern about the subject matter.

## Phase 5 · Release

- [ ] **you** — Create the App ID and signing certificates in the developer portal.
- [ ] **me** — Produce an archive build.
- [ ] **you** — Upload to TestFlight, install it yourself, play a full session from a cold start.
- [ ] **you** — Submit for review. Expect longer than average for a first submission in a sensitive category.

---

## Watch-outs specific to this game

- **The dispensary framing is untested.** Every competitor the research verified is a grow-op or dealer sim; the
  word "dispensary" appeared in none of the listings checked. Both stores' rules bite on *facilitating real sale*,
  not on simulation, and Canopy sells nothing — but a retail framing sits nearer that line than a farming one.
  Keep the description explicit that it is fiction and that nothing is purchasable.
- **Rating counts are not install counts** when benchmarking against Hempire and the rest.
- **Keep the web version.** It costs nothing, it is how people try the game without installing, and it is the
  fallback if a listing is ever pulled.

## If Android reopens later

Everything in Phases 1 and 2 is shared; only the wrapper target changes. Revisit if you acquire an Android device
or Google's closed-testing rule changes. The Android-specific work left undone is hardware back-button handling
and a Play-sized feature graphic (1024×500).
