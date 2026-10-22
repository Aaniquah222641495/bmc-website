// Full static build: client bundle, server bundle, then prerender every page.
// BUILD_TIME is set once here so both builds (and the prerendered workshop lists)
// use the same date; otherwise the browser's first render could differ from the HTML.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vite = path.join(root, 'node_modules', '.bin', 'vite');
const env = { ...process.env, BUILD_TIME: process.env.BUILD_TIME ?? new Date().toISOString() };

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { cwd: root, env, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run(vite, ['build', '--config', 'vite.config.ts']);
run(vite, ['build', '--config', 'vite.config.ts', '--ssr', 'src/entry-server.tsx', '--outDir', 'dist/server']);
run(process.execPath, ['scripts/prerender.mjs']);
