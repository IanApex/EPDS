import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  publicDir: false,
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'component' }),
    dts({
      tsconfigPath: 'tsconfig.lib.json',
      include: ['src/index.ts', 'src/**/*.ts', 'src/**/*.vue'],
      exclude: ['**/*.stories.ts', 'src/stories/**', 'src/main.ts', 'src/App.vue'],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
      '@icons': path.resolve(dirname, 'icon'),
      '@logos': path.resolve(dirname, 'Logos'),
      '@illustrations': path.resolve(dirname, 'Illustrations'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'EPDS',
      formats: ['es'],
      fileName: 'epds',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        assetFileNames: (assetInfo) =>
          assetInfo.names?.[0] === 'style.css' ? 'epds.css' : (assetInfo.names?.[0] ?? 'asset'),
      },
    },
  },
})
