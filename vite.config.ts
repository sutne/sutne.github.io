import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      pages: '/src/pages',
      providers: '/src/providers',
      service: '/src/service',
      themes: '/src/themes',
    },
  },
});
