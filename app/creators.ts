import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Creator, Photo } from "./types";

/**
 * Creators are flat JSON in /content, read at build time. There is no database
 * because there is nothing yet that a database would do: every field here is
 * typed in by hand. When stats start arriving from the Instagram Graph API,
 * this is the one module that changes.
 */

// next/image with `unoptimized` does not prepend basePath, so image paths are
// resolved here, once, before anything renders.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE}${path}`;

const DIR = join(process.cwd(), "content");

type RawPhoto = [file: string, date: string, place: string, alt: string, swatch: string];

type Raw = Omit<Creator, "photos" | "heroSrc" | "contactSrc"> & {
  photos: RawPhoto[];
  hero: string;
  contactPhoto: string;
};

function hydrate(raw: Raw): Creator {
  const img = (file: string) => asset(`/img/${raw.slug}/${file}`);

  const photos: Photo[] = raw.photos.map(([file, date, place, alt, swatch]) => ({
    src: img(file),
    w: 900,
    h: 1200,
    date,
    place,
    alt: `${alt}.${raw.sample ? " Sample imagery." : ""}`,
    swatch,
  }));

  return {
    ...raw,
    photos,
    heroSrc: img(raw.hero),
    contactSrc: img(raw.contactPhoto),
  };
}

export function allSlugs(): string[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

export function getCreator(slug: string): Creator {
  const raw = JSON.parse(
    readFileSync(join(DIR, `${slug}.json`), "utf8"),
  ) as Raw;
  return hydrate(raw);
}

export function allCreators(): Creator[] {
  return allSlugs().map(getCreator);
}
