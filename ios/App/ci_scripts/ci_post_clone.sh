#!/bin/sh
# Xcode Cloud runs this right after it clones the repo, before Xcode resolves Swift packages.
# The iOS app is the web game in a Capacitor shell, so the build needs:
#   - node_modules/@capacitor/* (CapApp-SPM points at node_modules/@capacitor/preferences)
#   - ios/App/App/public, capacitor.config.json and config.xml (gitignored; made by `cap sync`)
# The app ships the committed dist/ build, the same files GitHub Pages serves from main.
set -eu

cd "${CI_PRIMARY_REPOSITORY_PATH:-$(dirname "$0")/../../..}"

if ! command -v node >/dev/null 2>&1; then
  echo "Installing Node with Homebrew"
  export HOMEBREW_NO_AUTO_UPDATE=1
  export HOMEBREW_NO_INSTALL_CLEANUP=1
  brew install node@22
  brew link --overwrite --force node@22
fi
echo "Node $(node -v), npm $(npm -v)"

npm ci --no-audit --no-fund

# dist/ is committed on main. Build it only if a branch arrives without it.
if [ ! -f dist/index.html ]; then
  echo "dist/ missing, building the web game"
  npm run build
fi

npx cap sync ios
