import { fileURLToPath, URL } from 'node:url';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      hooks: fileURLToPath(new URL('./src/hooks', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      providers: fileURLToPath(new URL('./src/providers', import.meta.url)),
      service: fileURLToPath(new URL('./src/service', import.meta.url)),
      themes: fileURLToPath(new URL('./src/themes', import.meta.url)),
    },
  },
});
