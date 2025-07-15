
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/doggy_figma/',
  plugins: [react()],
});
