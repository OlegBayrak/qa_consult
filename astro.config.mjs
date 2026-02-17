// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://olehbairak.github.io',
  base: '/qa_consult',
  integrations: [tailwind(), react()],
});
