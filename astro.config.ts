import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    site: 'https://valeriocomella.github.io',
    base: '/',
    integrations: [tailwind(), mdx(), sitemap()],
    vite: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@site-config': path.resolve(__dirname, './src/site.config.ts'),
                '@icon-config': path.resolve(__dirname, './src/icon.config.ts'),
            },
        },
    },
});