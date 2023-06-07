import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassPlugin from 'vite-plugin-sass';

export default defineConfig({
  plugins: [
    react(),
    sassPlugin()
  ]
});
