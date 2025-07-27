// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/data': 'http://localhost:6969', // 👈 proxy all `/data` requests
    }
  }
})
