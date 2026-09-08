#!/usr/bin/env node
/**
 * Scaffold content/<slug>.json with every field present and marked TODO, plus
 * a rate card pre-filled from follower count so there is a number to argue
 * with rather than a blank page.
 *
 *   node scripts/new-creator.mjs <slug> [followers]
 */
import { writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const [slug, followersArg] = process.argv.slice(2);
if (!slug) {
  console.error("usage: node scripts/new-creator.mjs <slug> [followers]");
  process.exit(1);
}

const target = join("content", `${slug}.json`);
if (existsSync(target)) {
  console.error(`${target} already exists; edit it or pick another slug.`);
  process.exit(1);
}

const followers = Number(followersArg) || 25000;

// Rough US market heuristic: ~$100 per 10k followers for a reel, with the
// other formats scaled off that. A starting point to adjust, not a quote.
const usd = (n) => `$${Math.round(n / 25) * 25}`;
const reel = Math.max((followers / 10000) * 100, 150);

const photoDir = join("public", "img", slug);
const files = existsSync(photoDir)
  ? readdirSync(photoDir).filter((f) => f.endsWith(".jpg")).sort()
  : [];
if (files.length === 0) {
  console.warn(`No images in ${photoDir} yet. Run prep-images.mjs first.`);
}

const photos = (files.length ? files : Array.from({ length: 12 }, (_, i) => `f${String(i + 1).padStart(2, "0")}.jpg`))
  .map((f) => [f, "TODO metric", "TODO place", "TODO describe the frame", "#8c2a24"]);

const draft = {
  slug,
  name: "TODO Full Name",
  first: "TODO",
  last: "TODO",
  handle: "@todo",
  line: "TODO one sentence: what they make, where, and who it is for.",
  base: "TODO City, ST",
  email: "TODO@example.com",
  sample: false,
  syncedAgo: "TODO e.g. 2 hours ago",
  stats: {
    followers,
    engagement: "TODO e.g. 4.2%",
    avgReach: 0,
    avgSaves: 0,
  },
  age: [["18 – 24", 0], ["25 – 34", 0], ["35 – 44", 0], ["45+", 0]],
  cities: [["TODO", 0], ["TODO", 0], ["TODO", 0], ["TODO", 0], ["TODO", 0]],
  glance: [
    ["Women", "TODO%"],
    ["Men", "TODO%"],
    ["United States", "TODO% of audience"],
    ["Peak activity", "TODO"],
    ["Story completion", "TODO%"],
  ],
  rates: [
    ["Instagram Reel", "One 30–60s reel, 2 revisions", usd(reel)],
    ["Story set", "Three frames, link sticker, 24h", usd(reel * 0.38)],
    ["Carousel post", "Up to 8 slides, copy included", usd(reel * 0.7)],
    ["Reel + stories bundle", "One reel, three stories", usd(reel * 1.3)],
    ["UGC, no posting", "Raw files, full usage rights", usd(reel * 0.78)],
  ],
  brands: ["TODO", "TODO", "TODO", "TODO", "TODO", "TODO"],
  hero: photos[0]?.[0] ?? "f01.jpg",
  heroCaption: "TODO e.g. Top performing reel · 214k views",
  contactPhoto: photos[6]?.[0] ?? "f07.jpg",
  photos,
};

writeFileSync(target, JSON.stringify(draft, null, 2) + "\n");
console.log(`wrote ${target}`);
console.log(`rate card seeded from ${followers.toLocaleString("en-US")} followers`);
console.log(`\nfill in every TODO, then: npm run check && npm run dev`);
