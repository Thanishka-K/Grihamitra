import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request that starts with /api will be routed to your backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})