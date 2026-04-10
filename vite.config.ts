import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), svgLoader({ defaultImport: 'component' })],
  build: {
    outDir: 'dist-app',
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
      '@icons': path.resolve(dirname, 'icon'),
      '@logos': path.resolve(dirname, 'Logos'),
      '@illustrations': path.resolve(dirname, 'Illustrations'),
    },
  },
});
