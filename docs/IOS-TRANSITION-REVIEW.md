# iOS transition review — September 27, 2026

The project is a working hybrid iOS game: Capacitor bundles the existing Canvas game locally, while UIKit supplies the tab bar and haptics. It is not a SwiftUI or SpriteKit rewrite. Keeping this architecture preserves the working shop, fixed camera orientation, Safari build and existing `shift-save` progression.

## Already present

- Local game assets and fonts, app icon and matching launch screen.
- Native glass tab bar, selection/purchase haptics, low-power rendering signal.
- Preferences save mirror, privacy manifest and export-compliance declaration.
- Portrait iPhone configuration and an adaptive universal iPad target.
- Existing onboarding, age screen, sound controls, upgrades, branches and offline earnings.

## Improvements made

- Native tabs now accept a second tap to collapse or reopen the selected panel. Scrubbing remains selection-only to avoid repeatedly toggling the panel beneath the finger.
- Native tabs start hidden until the game reports readiness, and also hide during Settings and other web dialogs. Web bridge commands reject navigation while a dialog owns the screen.
- Panel expansion is reported to UIKit; VoiceOver hints describe opening/collapsing, and badge availability has an accessible value.
- Scene activation/deactivation now reaches the game explicitly. Native and document visibility signals are combined so an interruption pauses simulation/rendering, saves departure once, and settles offline income once on return. User-selected pause/speed is preserved.
- Native backup writes begin immediately instead of waiting 1.2 seconds. Writes are serialized and intervening snapshots coalesced, preventing an older asynchronous write from landing last. Bridge failures are caught.
- Recovery considers malformed local JSON as missing data. Boot saves are withheld until recovery is resolved; a failed native read leaves the previous backup untouched for another launch. A genuinely empty native store receives the new save once its read completes.

## Verification

- 92 unit tests passed, including immediate native dispatch, write ordering and failure recovery.
- Classic production build and Capacitor sync passed.
- Xcode Debug and Release simulator builds passed. The Release build covers arm64 and x86_64 simulator architectures; this is not a signed device archive.
- Installed and launched on a separate iPhone review simulator. Its age screen renders correctly and the native tabs remain hidden. The user's simulator saves were not used.
- Production-browser checks at 390×844 and 1440×900 passed: all native bridge tabs, selected-tab collapse/reopen, Settings exclusion, equipment purchase, immediate backup, overlapping interruption signals, exact paused save/reload, delayed native recovery, corrupt local JSON and failed native reads.
- Live queue regression passed: 104 pickups, all queued customers on their route, no pickup stalls.
- Construction walkthrough passed at both sizes: seven build sites, opening, resume, skip and legacy save migration.
- Screenshots in `artifacts/ios-review/` show the browser bridge fixtures, not native UIKit controls.

## Remaining verification and release work

The computer-control tool could not connect to Simulator. Native tab taps/scrubbing, VoiceOver navigation, app-switch interruptions and real WKWebView storage eviction therefore still need an interactive iOS pass. Browser tests exercise the bridge contract, not the operating system. Physical-device performance, thermals, audio interruption recovery and save durability under memory pressure remain unverified; iPad native interaction should also be checked.

The existing release checklist still has iPad store screenshots, listing copy, review notes, a signed archive and TestFlight/device testing outstanding. No publication or submission was performed. Existing save export/import remains web-only, following the current project decision.

Xcode reports the existing `traitCollectionDidChange` deprecation and an unused App Intents metadata warning; neither prevents the build.
