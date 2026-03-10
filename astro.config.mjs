// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// Cloudflare Workers at root: set BASE_PATH=/ in build env. GitHub Pages: use default /qa_consult.
const base = process.env.BASE_PATH ?? '/qa_consult';

export default defineConfig({
  site: base === '/' ? 'https://qaconsult.bayrakoleg.workers.dev' : 'https://olehbairak.github.io',
  base,
  adapter: cloudflare(),
  integrations: [tailwind(), react()],
});
