import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';
export default defineConfig({
  site, base, trailingSlash: 'always',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Avoid Windows drive-discovery subprocesses in restricted local environments.
    resolve: { preserveSymlinks: true },
  },
});
