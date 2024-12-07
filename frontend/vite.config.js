// export default defineConfig({
//   plugins: [react()],
//   base: '/',  // Ensure '/' if served from the root, or '/frontend/' if it's a sub-path
//   build: {
//     outDir: 'dist',
//   },
//   server: {
//     historyApiFallback: true,
//   },
// });



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the configuration
export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust this if deploying to a sub-path
  build: {
    outDir: 'dist',
  },
  server: {
    host: '0.0.0.0', // To allow access from the network
    port: 3000,
    open: true, // Automatically opens the browser
    historyApiFallback: true,
  },
});
