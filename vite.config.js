import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  // Relative asset URLs so the build works at the site root and under GitHub Pages' /Canopy---Bud-Empire/ path.
  base: './',
  // The desktop app's preview assigns each chat its own port through PORT; 5174 remains the hand-run default.
  server: { port: Number(process.env.PORT) || 5174 },
  build: {
    target: 'safari14',
    modulePreload: false,
    rollupOptions: {
      // Two pages: the game at the root and the launch page beside it at /welcome/.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        welcome: fileURLToPath(new URL('./welcome/index.html', import.meta.url))
      },
      output: {
        entryFileNames: 'assets/shift-[hash].js',
        assetFileNames: 'assets/shift-[hash].[ext]'
      }
    }
  }
});
