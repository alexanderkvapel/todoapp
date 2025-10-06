import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: './src/pages/index.html',
      }
    }
  },
  server: {
    open: './src/pages/index.html',
    port: 3000,
    host: true
  },
})