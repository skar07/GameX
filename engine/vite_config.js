import { defineConfig } from 'vite'

export default defineConfig({
  root: './renderer',
  server: {
    port: 3000,
    proxy: {
      // WebSocket proxy
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
        changeOrigin: true
      },
      // API proxy
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../renderer-dist',
    emptyOutDir: true
  }
})