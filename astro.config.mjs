import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitio 100% estático: se compila a /dist y se sirve como Cloudflare Worker
// mediante Workers Static Assets (ver worker/index.ts y wrangler.jsonc).
// Sin adaptador SSR: mantiene el bundle mínimo y el rendimiento en el edge.
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
