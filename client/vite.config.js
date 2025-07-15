import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/doggy-figma/',
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
