import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    iconsSpritesheet({
      inputDir: './src/assets/svgs',
      outputDir: './src/assets',
      withTypes: true,
    }),
  ],
});
