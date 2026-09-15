import { defineConfig } from 'vite';

export default defineConfig({
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
