import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// SWC zamiast Babel — szybszy i stabilniejszy dev server (Babel potrafił się wieszać
// na transformacji). Relatywny base tylko dla builda; w dev musi być absolutny.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? './' : '/',
  server: {
    port: 5173,
    strictPort: false,
    // pre-transformacja plików wejściowych przy starcie — szybsze pierwsze wejście
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx'],
    },
  },
  optimizeDeps: {
    // deterministyczny pre-bundling przy starcie zamiast leniwego (które wieszało dev)
    include: ['react', 'react-dom', 'react-dom/client', 'gsap', 'gsap/ScrollTrigger'],
  },
}))
