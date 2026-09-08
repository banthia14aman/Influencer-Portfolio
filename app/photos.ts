/**
 * next/image with `unoptimized` does NOT prepend basePath to a src, so on a
 * GitHub project page every image would 404. Everything pointing at /public
 * goes through here.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE}${path}`;

export type Photo = {
  src: string;
  w: number;
  h: number;
  date: string;
  place: string;
  alt: string;
  swatch: string;
};

/**
 * Sample content for the demo. Stock photography, self-hosted so nothing
 * depends on a CDN that can expire.
 *
 * To make this a real kit: drop the creator's files into /public/img, point
 * `src` at them, set the real `w`/`h`, and write honest alt text. Nothing
 * else changes.
 */
const meta: [string, string, string][] = [
  ["Reel · 214k views", "Goa", "Golden-hour beach walk, wide shot"],
  ["Carousel · 9.1k saves", "New Delhi", "Studio flatlay of a skincare set"],
  ["Reel · 88k views", "Mumbai", "Get-ready-with-me in a hotel mirror"],
  ["Post · 6.4k likes", "Jaipur", "Courtyard architecture, arched doorway"],
  ["Reel · 156k views", "Goa", "Cafe table, iced coffee and a notebook"],
  ["Carousel · 4.8k saves", "New Delhi", "Outfit grid, five looks"],
  ["Post · 7.2k likes", "Udaipur", "Rooftop at dusk over the lake"],
  ["Reel · 61k views", "Mumbai", "Street market walk-and-talk"],
  ["Post · 5.5k likes", "New Delhi", "Product close-up on linen"],
  ["Reel · 122k views", "Goa", "Sunrise swim, handheld"],
  ["Carousel · 3.9k saves", "Bengaluru", "Cafe interior and menu detail"],
  ["Post · 8.8k likes", "Jaipur", "Textile stall, colour study"],
];

const frames: Photo[] = meta.map(([date, place, alt], i) => ({
  src: `/img/f${String(i + 1).padStart(2, "0")}.jpg`,
  w: 900,
  h: 1200,
  date,
  place,
  alt: `${alt}. Sample imagery.`,
  swatch: ["#8c2a24", "#4a2630", "#a8202c", "#5c3b2e"][i % 4],
}));

export const photos: Photo[] = frames.map((p) => ({ ...p, src: asset(p.src) }));
