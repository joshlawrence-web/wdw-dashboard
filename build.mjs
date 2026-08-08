// Compiles trip.meta.json + days/*.json into the trip.json the page fetches.
// Run: node build.mjs   (CI does it on push, see .github/workflows/build-trip.yml)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const read = f => JSON.parse(readFileSync(f, 'utf8'));
const meta = read('trip.meta.json');
const days = readdirSync('days').filter(f => f.endsWith('.json')).sort()
  .map(f => read(`days/${f}`));

const m = t => +t.slice(0, 2) * 60 + +t.slice(3, 5);
for (const d of days) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) throw new Error(`bad date: ${d.date}`);
  for (const b of d.blocks ?? []) {
    if (!meta.categories[b.cat]) throw new Error(`${d.date}: unknown cat "${b.cat}"`);
    if (m(b.end) <= m(b.start)) throw new Error(`${d.date}: "${b.title}" ends before it starts`);
    if (m(b.start) < m(meta.dayStart) || m(b.end) > m(meta.dayEnd))
      throw new Error(`${d.date}: "${b.title}" outside ${meta.dayStart}–${meta.dayEnd}`);
  }
}

writeFileSync('trip.json', JSON.stringify({ ...meta, days }, null, 2) + '\n');
console.log(`trip.json: ${days.length} days, ${days.reduce((n, d) => n + d.blocks.length, 0)} blocks`);
