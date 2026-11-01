// Writes dist/public/workshops.json: the workshops open right now (not past), so the client's
// Apps Script can email the workshop waitlists when a new one is published (ADR-0031).
// Same "past" rule as src/data/workshops.ts: past from the day after its end (or only) date.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'content/workshops');
const now = new Date(process.env.BUILD_TIME ?? Date.now());

const isPast = (w) => {
  if (w.status === 'past') return true;
  const end = w.endDate ?? w.startDate;
  if (!end) return false;
  const d = new Date(end);
  if (Number.isNaN(d.getTime())) return false;
  d.setHours(23, 59, 59, 999);
  return now.getTime() > d.getTime();
};

const files = (await readdir(dir)).filter((f) => f.endsWith('.json'));
const open = [];
for (const f of files) {
  const w = JSON.parse(await readFile(path.join(dir, f), 'utf8'));
  if (isPast(w)) continue;
  open.push({
    id: f.replace(/\.json$/, '') + (w.startDate ? `@${w.startDate}` : ''),
    title: w.title,
    list: w.page === 'in-person' ? 'in-person-workshops' : 'workshops',
    startDate: w.startDate ?? null,
  });
}
await writeFile(path.join(root, 'dist/public/workshops.json'), JSON.stringify({ updated: now.toISOString(), open }, null, 2));
console.log(`workshops.json (${open.length} open)`);
