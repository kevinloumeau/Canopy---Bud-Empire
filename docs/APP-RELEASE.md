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

- [x] **done** — Enrolled. The project signs automatically against team `X4JBDGN2QR`.
- [x] **done** — Bundle ID settled as `com.kevinloumeau.canopy` and set in the project. Permanent from here.
- [x] **done** — Xcode 27.1 installed with the iOS 27.1 simulator runtime.
- [ ] **you** — Confirm whether you have an iPhone or iPad to test on. Not a blocker — the Simulator is good and I
      can drive it from here — but at least one real device before submitting is strongly advised.

## Phase 1 · Make the web build ready to wrap

- [x] **done** — **Fonts bundled.** Bricolage Grotesque and DM Mono were fetched from Google Fonts; they now ship
      in the repo (OFL, latin + latin-ext, 119 KB). The built game makes no external requests at all, which is
      what lets the privacy answers below say "no data collected" honestly.
- [x] **done** — **Save survives iOS.** WKWebView's local storage can be evicted under storage pressure, so every
      save is mirrored into native preferences and a launch that finds the web view empty restores from it.
      Verified on the simulator by deleting the LocalStorage directory between launches.
- [x] **done** — **Safe areas need no work.** Verified on an iPhone 18 Pro Max: the HUD clears the Dynamic Island
      and the tray clears the home indicator. The game was built as an installable PWA and already uses
      `env(safe-area-inset-*)` in eighteen places across nine stylesheets.
- [x] **done** — Portrait lock, set in Info.plist.
- [x] **done** — Service worker stays dormant under Capacitor and nothing depends on it now the fonts are local.
- [ ] Already fine: `vite.config.js` sets `base: './'`, so built asset paths are relative and resolve in a wrapper.
- [ ] Not needed on iOS: Android hardware back-button handling. Required if Android is revisited.

## Phase 2 · Wrap it

- [x] **done** — Capacitor 8 added, iOS project created with **Swift Package Manager** rather than CocoaPods,
      which avoids needing Homebrew and a newer Ruby. `npm run ios` builds and syncs; `npm run ios:open` also
      opens Xcode. The app builds, launches and loads in the simulator.
- [x] **done** — iPhone locked to portrait to match the manifest; iPad keeps every orientation.
- [x] **done** — App icon: the game's sprout at 1024, full bleed and alpha-free as iOS requires, regenerable from
      `scripts/app-icon.html`. Verified masked correctly on the home screen.
- [x] **done** — Launch screen matches the shop's own green, so the app no longer flashes white on the way in.
      The status bar needed nothing: Capacitor keeps it light in both system appearances, checked either way.

Capacitor rather than a web view of the live site, deliberately: it bundles the game inside the app, so it launches
offline with no dependency on GitHub Pages staying up — and an app that works with the network off is the single
strongest answer to a Guideline 4.2 query.

## Phase 3 · Test

- [x] **done** — Simulator: the age gate, the start guide and a live shop all render correctly, and the save
      survives a force-quit and a wiped web view.
- [x] **done** — Manual save export/import is **web only**. In the app a web view has no download manager, so the
      export button did nothing at all — silently, which is the worst outcome for a backup control. Rather than
      rebuild it on the native share sheet, it is hidden in the app: the save is already held on the device twice
      (web view storage plus the native mirror) and iOS carries app data to a new phone in its own backup, so a
      manual export there is ceremony for something already handled. It remains on the web, where nothing else
      protects a save.
- [ ] **you** — Install on a real device if you have one. The Simulator does not reproduce memory pressure,
      thermals or real storage eviction, which is exactly the risk area for the save.
- [ ] **you** — Check frame rate on real hardware. Still open, and the simulator cannot answer it: it
      software-renders the canvas at 354ms a frame where the same build costs 5.5ms on this Mac, a 64x gap that
      says nothing about a phone. What the simulator *can* show is that startup is not a problem — the page is
      interactive 82ms in, complete at 314ms, and first paint lands at 1.14s.

## Phase 4 · Store listing

- [ ] **me** — Screenshots at the sizes App Store Connect currently requires. Convenient accident: the iPhone 18
      Pro Max simulator renders at exactly 1320x2868, which *is* the 6.9-inch requirement, so its screenshots can
      be submitted untouched. The 13-inch iPad set comes off the iPad Pro simulator the same way.
- [ ] **me** — Short subtitle and full description.
- [x] **done** — Privacy policy URL: `public/privacy.html`, live on the Pages site once main deploys.
- [ ] **you** — Privacy nutrition labels. Canopy's answer is the simple one — **Data Not Collected** — which is
      true only because the fonts are now bundled and no analytics provider is loaded. The app's own
      `PrivacyInfo.xcprivacy` already says the same thing in the form Apple checks automatically, so the two
      answers will agree.
- [ ] **you** — Age rating questionnaire. Answer honestly on drug references; expect the top tier (18+ since
      Apple's July 2025 overhaul). Comparable titles carry exactly that.
- [ ] **me** — Draft review notes explaining that the game is fiction, sells nothing, and runs entirely offline —
      pre-empting both the 4.2 question and any concern about the subject matter.

## Phase 4b · Things App Review checks that are already handled

- [x] **done** — **Privacy manifest.** `PrivacyInfo.xcprivacy` ships in the app. Uploads without one draw an
      ITMS-91053 notice. Capacitor's own frameworks each carry a manifest but declare nothing, because core does
      not touch the required-reason APIs — the Preferences plugin does, keeping the save mirror in UserDefaults,
      and it ships no manifest at all, so the reason (CA92.1, the app reading back what it wrote) is declared here
      on its behalf. Everything else is empty, which is the honest answer and not merely a convenient one.
- [x] **done** — **Export compliance.** `ITSAppUsesNonExemptEncryption` is false in Info.plist, which is accurate
      for a game that makes no network requests, and saves being asked on every upload.
- [x] **done** — **App size.** `cap sync` was copying the marketing site into the app: the launch page at
      `/welcome/` and two dozen full-bleed screenshots the game has no way to reach. `npm run ios` now prunes it,
      taking the web payload from 6.4 MB to 1.0 MB.
- [x] **done** — **iPad.** The app ships universal, so it will be reviewed on an iPad. Both orientations render
      correctly, and the native tab bar now follows the side panel instead of floating centre-screen.
- [x] **done** — **Accessibility.** Dynamic Type on the tab labels (capped so six tabs still fit), the `.selected`
      trait so VoiceOver announces the tab in the reader's own language, Reduce Motion honoured throughout and
      offered as a switch of the game's own, and Increase Contrast confirmed to reach both the native bar and the
      web sheet. **Reduce Transparency is the one gap** — the simulator never reports it however it is set, so the
      rules that answer it are unverified until someone runs the app on a device.

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
