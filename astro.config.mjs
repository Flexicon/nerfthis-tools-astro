import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  output: 'server',
  server: {
    host: 'tools.localhost',
    port: 4321,
    open: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
