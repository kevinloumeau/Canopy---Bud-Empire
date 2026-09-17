import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset URLs so the build works at the site root and under GitHub Pages' /Canopy---Bud-Empire/ path.
  base: './',
  build: {
    target: 'safari14',
    modulePreload: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/shift-[hash].js',
        assetFileNames: 'assets/shift-[hash].[ext]'
      }
    }
  }
});
