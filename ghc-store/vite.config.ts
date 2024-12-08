import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://ghc-store-backend-production.up.railway.app',
        changeOrigin: true
      }
    }
  }
})