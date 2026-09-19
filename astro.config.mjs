import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nexuslabs.up.edu.mx',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
});
