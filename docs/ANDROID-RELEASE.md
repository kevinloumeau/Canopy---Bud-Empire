# Shipping Canopy on Google Play

Working checklist for wrapping the existing PWA as an Android app. Written 23 September 2026.

**me** = I can do it in this repo. **you** = needs your account, your money, or your machine.

---

## Is Android the right first platform?

Yes, for three reasons:

- **Cost.** $25 once, against Apple's $99 every year. Canopy earns nothing, so Apple's fee is a permanent
  subtraction with no offset, renewed annually whether or not anyone plays.
- **Precedent.** The competitor research verified live, currently-updated cannabis cultivation-and-dealing games
  on Play at Mature 17+ — Hempire at 10M+ installs is the clearest example. Play distributes this genre today.
- **Rejection risk.** Apple's Guideline 4.2 ("minimum functionality") is aimed squarely at repackaged websites and
  is the standard reason web-wrapped apps get bounced. Play has no equivalent rule.

**The catch, and it is a real one.** Google requires new *personal* developer accounts to run a closed test —
at last check 12 testers, opted in continuously for 14 days — before you may apply for production access.
Organisation accounts have historically been exempt but need a D-U-N-S number. **Verify the current rule in the
Play Console before planning around it**; it has changed repeatedly and my information has a cutoff. Recruiting 12
real testers is the single most underestimated step here, so start it early rather than at the end.

---

## Phase 0 · Decisions only you can make

- [ ] **you** — Decide personal vs organisation developer account (changes the closed-testing requirement above).
- [ ] **you** — Register the Play Developer account and pay the $25 one-time fee. Identity verification takes days,
      not minutes, so do this first even if nothing else is ready.
- [ ] **you** — Choose the application ID. It is permanent and can never be changed after first upload.
      Suggested: `com.kevinloumeau.canopy`.
- [ ] **you** — Install Android Studio (bundles the SDK and a JDK). Comparable in size to Xcode, but it is the only
      way to build, sign and emulate.
- [ ] **you** — Line up testers if the closed-test rule applies. Twelve people who will install and keep it
      installed for two weeks.

## Phase 1 · Make the web build ready to wrap

These are real gaps I found in the current code, not boilerplate.

- [ ] **me** — **Bundle the fonts.** `src/style.css` pulls Bricolage Grotesque and DM Mono from Google Fonts by
      `@import`. The service worker caches them on the web, but it will not register under Capacitor (its guard
      excludes `localhost`, which is exactly what Capacitor serves from). Left as-is the app fetches fonts over the
      network on every cold start, looks wrong offline, and sends each player's IP to Google — which would also
      force a Data Safety disclosure and make the new privacy page inaccurate. Self-host the two families instead.
- [ ] **me** — **Handle the Android back button.** Nothing in the code listens for it, so the hardware back button
      will quit the game outright, even with a sheet or modal open. Should close the top sheet, then the tray, and
      only then confirm exit.
- [ ] **me** — Verify the service worker stays dormant under Capacitor and that nothing depends on it for assets.
- [ ] **me** — Confirm the save survives app restart, backgrounding and update in a WebView. WebView local storage
      lives in app data and is more durable than a browser's, but this needs proving, not assuming.
- [ ] **me** — Check safe areas on a notched device, and lock orientation to match the manifest's `portrait`.
- [ ] Already fine: `vite.config.js` sets `base: './'`, so built asset paths are relative and will resolve inside
      the app. No change needed.

## Phase 2 · Wrap it

- [ ] **me** — Add Capacitor: `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`.
- [ ] **me** — `npx cap init` with the app name and the ID chosen in Phase 0; point `webDir` at `dist`.
- [ ] **me** — `npx cap add android`, then wire `npm run build && npx cap sync` into a single release script.
- [ ] **me** — Set the app icon and splash from the existing 512px icon; set the status/navigation bar to the
      game's `#1f3529`.

Capacitor rather than a Trusted Web Activity, deliberately: Capacitor bundles the game inside the package, so it
launches offline with no dependency on GitHub Pages staying up and no Digital Asset Links to maintain. A TWA is a
thinner wrapper but tethers the app to the live site.

## Phase 3 · Test on real hardware

- [ ] **you** — Run it on an emulator and at least one physical phone. An older mid-range device is the honest
      test; the renderer holds 3.7ms/frame on a Mac, which tells you nothing about a $150 Android.
- [ ] **me** — Verify offline launch with airplane mode on from a cold start.
- [ ] **me** — Verify save export and import through the Android file picker, which behaves differently from a
      desktop browser's.
- [ ] **you** — Check the age gate, and that back/home/recents behave sanely.

## Phase 4 · Store listing

- [ ] **me** — Phone screenshots (min 2, up to 8). The capture tooling in `scripts/` already produces these; it
      needs a Play-sized preset.
- [ ] **me** — Feature graphic, 1024×500. Required, and there is no existing asset at that ratio.
- [ ] **me** — App icon at 512×512 — the existing `public/icon-512.png` should serve.
- [ ] **me** — Short description (80 characters) and full description (4000).
- [x] **done** — Privacy policy URL. `public/privacy.html`, live at the Pages site once main deploys.
- [ ] **you** — Content rating questionnaire. Answer honestly about drug references; expect Mature 17+, which is
      what comparable titles carry.
- [ ] **you** — Data safety form. Canopy's answers are unusually simple: no data collected, no data shared, no
      third-party SDKs — provided the fonts are bundled first. That dependency is why Phase 1 comes before this.
- [ ] **you** — Set target audience to adults and declare no ads.

## Phase 5 · Release

- [ ] **you** — Generate an upload keystore and **back it up somewhere you will still have in five years**. Lose it
      and you cannot ship an update to your own app. Enrol in Play App Signing.
- [ ] **me** — Produce a signed release bundle (`.aab` — Play no longer accepts plain APKs).
- [ ] **you** — Upload to internal testing, confirm it installs from the Play listing rather than from a local file.
- [ ] **you** — Run the closed test if required, for the full duration.
- [ ] **you** — Apply for production access, then submit. Review is typically days, and first submissions in a
      sensitive category should be expected to take longer.

---

## Watch-outs specific to this game

- **The dispensary framing is untested.** Every competitor the research verified is a grow-op or dealer sim; the
  word "dispensary" appeared in none of the listings checked. Both stores' rules bite on *facilitating real sale*,
  not on simulation, and Canopy sells nothing — but a retail-storefront framing sits nearer that line than a
  farming one. Keep the store description explicit that it is fiction and that nothing is purchasable.
- **Rating counts are not install counts.** When benchmarking against Hempire and the rest, do not convert one into
  the other; the research flagged this specifically.
- **Keep the web version.** It costs nothing to maintain, it is how people try the game without installing, and it
  is the fallback if a store listing is ever pulled.
