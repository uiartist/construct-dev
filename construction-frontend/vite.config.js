import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 important for Flight/XAMPP setup
  build: {
    outDir: '../public', // 👈 build directly into your public folder
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://construct.local', // Your Flight backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
