import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
=======
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  server: {
    historyApiFallback: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
