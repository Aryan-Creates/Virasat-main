import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        // Suppress Rollup comment annotations from node_modules/zod
        if (warning.code === 'INVALID_ANNOTATION') return;
        defaultHandler(warning);
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    open: false,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
