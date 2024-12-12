import { defineConfig } from 'vite'; // Fix for "defineConfig is not defined"
import react from '@vitejs/plugin-react'; // Fix for "react is not defined"

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure '/' if served from the root, or '/frontend/' if it's a sub-path
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
  },
});