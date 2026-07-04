import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// La versión sale de package.json (única fuente de verdad) y se inyecta en el
// build como __APP_VERSION__ para mostrarla en el footer.
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8'),
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    host: true,
    port: 5173,
    // En desarrollo, /api va al backend de logs (Node) en :3000.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
})
