# Audio: music, sound effects and licences

## Licence record

Every sound in Canopy is **original and synthesised at runtime** by the game's own code with the Web Audio API.
The game ships **no audio files**, no samples, no loops and no third-party sound libraries, so there is nothing to
license, credit or pay royalties on, and the audio adds **0 bytes** to the download.

| Source | What it makes | Author | Licence |
| --- | --- | --- | --- |
| `src/music.js` | Background music (day and night), street hum, vinyl crackle, passing cars | Canopy project, original code | Same as the game (proprietary, all rights reserved) |
| `src/sfx.js` | Every effect: taps, sales, buys, level-ups, cash, builds, achievements, openings, reopen | Canopy project, original code | Same as the game |
| `src/sound-cues.js` | Which effect each in-game moment plays | Canopy project, original code | Same as the game |

If a recorded or generated track is ever added (for example from Ludo, Meshy or a stock library), add a row here with
the file, its source, the licence or receipt, and whether attribution is required, and keep the file under 1 MB
(AAC or MP3, mono, 96 kbps or lower).

## How it fits together

- **Music** (`music.js`): a 74 BPM lo-fi loop in sixteen-bar rounds (A section, B section, a small fill), with every
  fourth round a breather without drums. In the map's daylight it plays F major with a brushed kit; at night it moves
  to D minor with darker keys, a slow pad, a half-time quiet kit and fewer cars. Night is read at the top of each round,
  so the change never lands mid-phrase.
- **Effects** (`sfx.js`): short, soft cues in the same key as the music, through a small room reverb and a gentle
  compressor shared with the music, so they never clip on the phone speaker. Taps vary slightly in pitch; station
  level-ups bought in a run climb the scale.
- **Routing** (`sound-cues.js`): every toast goes through `cueFor()`, so each moment plays exactly one matching sound:
  cash for rewards and away pay, a chord for achievements and chapters, a knock when construction starts, a ring when
  it finishes, a fanfare for an opening and a slow sunrise for a reopen. Only the fanfare, the reopen and achievements
  dip the music.
- **Haptics**: taps buzz where they happen (`haptics.js`); moments that arrive without a tap (an achievement, away pay)
  bring their own buzz from `PASSIVE_HAPTIC`, and a second buzz right after a firm one is folded into it.

## iPhone rules

- Audio starts only after a tap. The game primes the audio on `pointerdown`, `pointerup`, `touchend`, `click` and
  `keydown`, because iOS counts the end of a touch as the gesture, and the same listeners revive the audio after a
  phone call or Siri interrupts it.
- The app's audio session is **ambient** (`AppDelegate.swift`, and `navigator.audioSession` on iOS 17+): the game's
  sound mixes with the player's own music or podcast instead of stopping it, and it follows the ring/silent switch.
- Sound and Music are separate switches in Settings; both are saved and respected, and everything stops while the app
  is in the background.

## Listening without the game

`node scripts/audio-preview.mjs <out-dir> [seconds]` renders the day and night music and every effect to WAV files in
headless Chromium and prints each one's peak and loudness. It needs Playwright installed globally (run it with
`NODE_PATH=$(npm root -g)`), and `CHROME=<path>` when the browser is not Playwright's default.
