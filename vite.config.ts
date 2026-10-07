import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'nilo.html',
        'monumentos.html',
        'escrita.html',
        'linha-do-tempo.html',
        'egito-hoje.html',
      ],
    },
  },
});
