import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: "hidden",
    target: 'es2015',
    lib: {
      entry: './src/mini.js',
      name: 'mini',
      formats: ['umd'],
      fileName: format => format === 'umd' ? 'mini.umd.js' : 'mini.js'
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
