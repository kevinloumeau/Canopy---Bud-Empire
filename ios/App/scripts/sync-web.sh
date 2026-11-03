#!/bin/sh
# Xcode runs this before it copies resources, on every build, so the app always ships the repo's current dist/
# (the same game GitHub Pages serves) instead of whatever ios/App/App/public held from an old `cap sync`.
set -eu

# Xcode's build shell has a bare PATH; Homebrew's node lives in one of these.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "${SRCROOT:-$(dirname "$0")/..}/../.."

if ! command -v node >/dev/null 2>&1; then
  echo "error: Node is not installed. Install it (brew install node) so Xcode can copy the web game into the app."
  exit 1
fi
if [ ! -f node_modules/@capacitor/cli/package.json ]; then
  echo "error: Capacitor is not installed. Run npm install in $(pwd), then build again."
  exit 1
fi
if [ ! -f dist/index.html ]; then
  echo "error: dist/ is missing. Pull the latest main or run npm run build in $(pwd)."
  exit 1
fi

echo "Copying $(pwd)/dist into the iOS app"
npx cap copy ios
