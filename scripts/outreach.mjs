#!/usr/bin/env node
/**
 * Outreach pipeline. Sources, qualifies, tracks and drafts.
 * It deliberately does NOT send anything.
 *
 *   node scripts/outreach.mjs stats
 *   node scripts/outreach.mjs due
 *   node scripts/outreach.mjs draft <handle>
 *
 * The draft command refuses to produce a message without a `hook`: one
 * specific, true observation about that creator's work. That field is the
 * only thing separating this from the spam they already ignore, so the tool
 * will not let you skip it.
 */
import { readFileSync } from "node:fs";

const FILE = "outreach/prospects.csv";
const FOLLOW_UP_DAYS = 5;

function rows() {
  const [head, ...lines] = readFileSync(FILE, "utf8").trim().split("\n");
  const keys = head.split(",");
  return lines
    .filter(Boolean)
    .map((l) => {
      // naive split is fine: keep commas out of the CSV
      const vals = l.split(",");
      return Object.fromEntries(keys.map((k, i) => [k, (vals[i] ?? "").trim()]));
    })
    .filter((r) => !/EXAMPLE ROW/i.test(r.notes));
}

const daysSince = (d) =>
  d ? Math.floor((Date.now() - new Date(d).getTime()) / 86400000) : Infinity;

const cmd = process.argv[2];
const all = rows();

if (cmd === "stats") {
  if (!all.length) {
    console.log("No prospects yet. Add rows to outreach/prospects.csv.");
    process.exit(0);
  }
  const by = {};
  for (const r of all) by[r.status || "new"] = (by[r.status || "new"] || 0) + 1;

  console.log(`\n${all.length} prospects\n`);
  for (const [k, v] of Object.entries(by).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(v).padStart(4)}  ${k}`);
  }

  const contacted = all.filter((r) => r.status !== "new" && r.status !== "researched").length;
  const replied = all.filter((r) => ["replied", "won"].includes(r.status)).length;
  const won = all.filter((r) => r.status === "won").length;
  if (contacted) {
    console.log(`\n  reply rate  ${((replied / contacted) * 100).toFixed(0)}%  (${replied}/${contacted})`);
    console.log(`  close rate  ${((won / contacted) * 100).toFixed(0)}%  (${won}/${contacted})`);
  }

  // linktree in bio means they already care about a link they send people to
  const warm = all.filter((r) => r.bio_link === "linktree" && r.status === "new");
  if (warm.length) console.log(`\n  ${warm.length} untouched with a Linktree bio (strongest signal)`);
  console.log();
  process.exit(0);
}

if (cmd === "due") {
  const due = all.filter(
    (r) => r.status === "contacted" && daysSince(r.last_contact) >= FOLLOW_UP_DAYS,
  );
  if (!due.length) {
    console.log("Nothing due for follow-up.");
    process.exit(0);
  }
  console.log(`\n${due.length} due for one follow-up:\n`);
  for (const r of due) {
    console.log(`  @${r.handle.padEnd(22)} ${daysSince(r.last_contact)}d ago   ${r.name}`);
  }
  console.log("\nOne follow-up. Never two.\n");
  process.exit(0);
}

if (cmd === "draft") {
  const handle = (process.argv[3] || "").replace(/^@/, "");
  const r = all.find((x) => x.handle === handle);
  if (!r) {
    console.error(`@${handle} is not in ${FILE}`);
    process.exit(1);
  }
  if (!r.hook) {
    console.error(`\n@${handle} has no hook.\n`);
    console.error("Watch two of their reels and write one true, specific");
    console.error("sentence in the `hook` column. Something only someone who");
    console.error("actually looked would say.\n");
    console.error("Without it this is the same message they delete every day.\n");
    process.exit(1);
  }

  const first = r.name.split(" ")[0];
  const kit = r.niche === "food" ? "cole" : "nora";

  console.log(`
--- to @${r.handle} ${r.email ? `(${r.email})` : "(DM)"} ---

Subject: your media kit

Hi ${first} — ${r.hook}

I build media kits for creators: one link with your audience data,
recent work and rates, so brands stop asking for it over email.

Here's a live one so you can see the format:
https://banthia14aman.github.io/Influencer-Portfolio/${kit}/

$75, live in 24 hours, free if you don't like it. Want me to make yours?

Aman

---
Not interested? Reply "no" and I won't message again.
--- end ---
`);
  process.exit(0);
}

console.log(`
usage:
  node scripts/outreach.mjs stats            pipeline summary
  node scripts/outreach.mjs due              who needs a follow-up
  node scripts/outreach.mjs draft <handle>   personalised draft
`);
