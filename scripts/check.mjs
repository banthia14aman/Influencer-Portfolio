#!/usr/bin/env node
/**
 * Refuse to ship a half-finished kit. Runs before build: catches leftover
 * TODOs, zeroed stats, percentages that do not add up, and images referenced
 * in JSON that are not actually on disk.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

let failed = 0;
const fail = (slug, msg) => {
  console.error(`  ✗ ${slug}: ${msg}`);
  failed += 1;
};

const slugs = readdirSync("content")
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""));

if (slugs.length === 0) {
  console.error("no creators in content/");
  process.exit(1);
}

for (const slug of slugs) {
  const c = JSON.parse(readFileSync(join("content", `${slug}.json`), "utf8"));

  const blob = JSON.stringify(c);
  if (/TODO/i.test(blob)) fail(slug, "still contains TODO");
  if (c.slug !== slug) fail(slug, `slug field is "${c.slug}", file is ${slug}.json`);

  for (const k of ["followers", "avgReach", "avgSaves"]) {
    if (!c.stats?.[k]) fail(slug, `stats.${k} is empty`);
  }

  const ageSum = c.age.reduce((a, [, v]) => a + v, 0);
  if (ageSum < 90 || ageSum > 110) {
    fail(slug, `age split sums to ${ageSum}%, expected ~100`);
  }
  for (const [label, v] of c.cities) {
    if (v <= 0) fail(slug, `city "${label}" has no percentage`);
  }

  // every referenced image must exist, or the kit ships with holes
  const dir = join("public", "img", slug);
  const refs = new Set([c.hero, c.contactPhoto, ...c.photos.map((p) => p[0])]);
  for (const f of refs) {
    if (!existsSync(join(dir, f))) fail(slug, `missing image ${dir}/${f}`);
  }
  if (c.photos.length !== 12) {
    fail(slug, `${c.photos.length} photos, the layout expects 12`);
  }

  if (failed === 0) console.log(`  ✓ ${slug}`);
}

if (failed) {
  console.error(`\n${failed} problem(s). Not ready to ship.`);
  process.exit(1);
}
console.log(`\n${slugs.length} kit(s) ready.`);
