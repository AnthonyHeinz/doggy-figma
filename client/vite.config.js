import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Remove the base path for Vercel (Vercel serves from root)
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
