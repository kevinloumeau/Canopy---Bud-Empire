import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => ({
  // Relative asset URLs so the build works at the site root and under GitHub Pages' /Canopy---Bud-Empire/ path.
  base: './',
  // The desktop app's preview assigns each chat its own port through PORT; 5174 remains the hand-run default.
  server: { port: Number(process.env.PORT) || 5174 },
  build: {
    target: 'safari14',
    modulePreload: false,
    // The map3d pass writes beside the first pass's output.
    emptyOutDir: mode !== 'map3d',
    rollupOptions: {
      // Two pages: the game at the root and the launch page beside it at /welcome/.
      // The 3D map is its own entry, not a dynamic-import chunk: Vite's import() helper needs import.meta,
      // which the classic deferred script make-classic.mjs turns the game into cannot contain. make-classic.mjs writes its
      // hashed file name into index.html and main.js loads it from there.
      // It builds in a second pass (`vite build --mode map3d`): in one pass, a module both sides import becomes a shared
      // chunk, and the classic game script cannot import it.
      input: mode === 'map3d'
        ? { map3d: fileURLToPath(new URL('./src/three/map3d.js', import.meta.url)) }
        : {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          welcome: fileURLToPath(new URL('./welcome/index.html', import.meta.url))
        },
      preserveEntrySignatures: 'exports-only',
      output: {
        entryFileNames: chunk => chunk.name === 'map3d' ? 'assets/map3d-[hash].js' : 'assets/shift-[hash].js',
        assetFileNames: 'assets/shift-[hash].[ext]'
      }
    }
  }
}));
