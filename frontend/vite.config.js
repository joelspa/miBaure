import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Reducir tamaño de chunks
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Code splitting manual para mejorar performance
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'markdown': ['react-markdown']
        }
      }
    },
    // Minificación con terser (más agresiva que esbuild)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.logs en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Optimizar CSS
    cssMinify: true
  },
  // Optimizar dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    strictPort: true
  }
})
