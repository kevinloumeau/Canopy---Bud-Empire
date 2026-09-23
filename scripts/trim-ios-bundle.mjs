// Takes the launch page back out of the iOS app.
//
// `cap sync` copies the whole of dist/ into the app, and dist/ holds two sites: the game at the root and the
// marketing page at /welcome/, which exists to be linked to from the web. The app opens index.html and has no way
// to reach the other one — no link, no route, no deep link — so everything only that page uses is weight the
// player downloads and never sees. It is most of the bundle: a couple of dozen full-bleed screenshots.
//
// Rather than name files, which are content-hashed and change every build, this walks the references out from each
// of the two entry points and removes what the launch page reaches and the game does not. Anything both of them
// use — the four web fonts — is reached from the game as well, so it stays. Files neither reaches are left alone
// too: not being able to see a reference is a reason to keep a file, not to delete it.
import {readFileSync, readdirSync, existsSync, rmSync, statSync} from 'node:fs';
import {join, basename} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../ios/App/App/public', import.meta.url));
const assetDir = join(root, 'assets');
if (!existsSync(assetDir)) {
  console.log('trim-ios-bundle: no iOS bundle to trim (run `npx cap sync ios` first)');
  process.exit(0);
}

const READABLE = /\.(html|js|css|json|webmanifest)$/;
// Vite's hashed names, matched bare as well as with a path: stylesheets reference fonts by filename alone, and
// missing those would put a font in the removable pile purely because the reference was written differently.
const REFERENCE = /[\w\-.]*shift-[\w-]+\.(?:css|js|jpg|jpeg|png|webp|svg|woff2?|mp3|json|avif)/g;

const present = new Set(readdirSync(assetDir));
const bytes = (names) => [...names].reduce((sum, n) => sum + statSync(join(assetDir, n)).size, 0);

function reachableFrom(entry) {
  const found = new Set();
  const queue = [entry];
  while (queue.length) {
    const current = queue.pop();
    const path = join(root, current);
    if (!existsSync(path) || !READABLE.test(current)) continue;
    for (const hit of readFileSync(path, 'utf8').matchAll(REFERENCE)) {
      const name = basename(hit[0]);
      if (present.has(name) && !found.has(name)) {
        found.add(name);
        queue.push(join('assets', name));
      }
    }
  }
  return found;
}

const game = reachableFrom('index.html');
if (!game.size) {
  // The game reaching nothing means the walk is broken, not that the bundle is empty. Removing things on the
  // strength of that would delete the app.
  console.error('trim-ios-bundle: index.html references no assets — refusing to trim');
  process.exit(1);
}

const launch = existsSync(join(root, 'welcome', 'index.html')) ? reachableFrom(join('welcome', 'index.html')) : new Set();
const removable = [...launch].filter((name) => !game.has(name));
const freed = bytes(removable) + (existsSync(join(root, 'welcome')) ? statSync(join(root, 'welcome', 'index.html')).size : 0);

for (const name of removable) rmSync(join(assetDir, name));
rmSync(join(root, 'welcome'), {recursive: true, force: true});

const kept = bytes(game);
console.log(`trim-ios-bundle: removed the launch page and ${removable.length} assets only it used, ${Math.round(freed / 1024)} KB`);
console.log(`trim-ios-bundle: the game keeps ${game.size} assets, ${Math.round(kept / 1024)} KB`);
