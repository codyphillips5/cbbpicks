import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const pages = [
  'index.html',
  'picks.html',
  'results.html',
  'standings.html',
  'totals.html',
  'signup.html',
  'log.html',
  'forgot.html',
  'rules.html',
  'live.html',
  'winners.html',
];

const input = Object.fromEntries(
  pages.map((p) => [p.replace('.html', ''), resolve(process.cwd(), p)])
);

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input,
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
