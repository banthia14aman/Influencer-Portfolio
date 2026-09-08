#!/usr/bin/env node
/**
 * Turn a folder of whatever the creator sent into the twelve files the kit
 * expects: 900x1200, centre-cropped, EXIF stripped, named f01..f12.
 *
 *   node scripts/prep-images.mjs <slug> <folder-they-sent>
 *
 * EXIF stripping is not cosmetic. Phone photos routinely carry GPS
 * coordinates, and these end up on a public URL.
 */
import { mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const [slug, src] = process.argv.slice(2);
if (!slug || !src) {
  console.error("usage: node scripts/prep-images.mjs <slug> <source-folder>");
  process.exit(1);
}
if (!existsSync(src)) {
  console.error(`no such folder: ${src}`);
  process.exit(1);
}

const OK = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".avif"]);
const files = readdirSync(src)
  .filter((f) => OK.has(extname(f).toLowerCase()))
  .sort();

if (files.length === 0) {
  console.error(`no images found in ${src}`);
  process.exit(1);
}
if (files.length < 12) {
  console.warn(`only ${files.length} images; the kit is designed for 12.`);
}

const out = join("public", "img", slug);
mkdirSync(out, { recursive: true });

const chosen = files.slice(0, 12);
let n = 0;

for (const f of chosen) {
  n += 1;
  const name = `f${String(n).padStart(2, "0")}.jpg`;
  const meta = await sharp(join(src, f)).metadata();
  await sharp(join(src, f))
    .rotate() // honour EXIF orientation before we discard the metadata
    .resize(900, 1200, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(out, name));
  console.log(`  ${f}  ${meta.width}x${meta.height}  ->  ${name}`);
}

console.log(`\n${n} images written to ${out}`);
console.log(`next: node scripts/new-creator.mjs ${slug}`);
