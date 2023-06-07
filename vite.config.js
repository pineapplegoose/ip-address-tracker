import { defineConfig } from 'vite';
import imageminPlugin from 'vite-plugin-imagemin';
import react from '@vitejs/plugin-react';
import sassPlugin from 'vite-plugin-sass';

export default defineConfig({
  plugins: [
    react(),
    sassPlugin(),
    imageminPlugin({
      gifsicle: { optimizationLevel: 7, interlaced: false, colors: 256 },
      optipng: { optimizationLevel: 7 },
      jpegtran: { progressive: true },
      svgo: {},
    }),
  ]
});
