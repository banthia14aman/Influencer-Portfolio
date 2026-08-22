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
  /** dominant colour, used for the swatch chips and card tints */
  swatch: string;
};

/**
 * Placeholder set for the template components (Collage, Gallery).
 * Drop your own files into /public/img, point `src` at them and set the real
 * `w`/`h`; nothing else needs to change.
 */
const frames: Photo[] = Array.from({ length: 12 }, (_, i) => ({
  src: "/img/placeholder.svg",
  w: 480,
  h: 640,
  date: `Frame ${String(i + 1).padStart(2, "0")}`,
  place: "Add a caption",
  alt: "Placeholder frame. Replace with your own image and a real description.",
  swatch: ["#8c2a24", "#4a2630", "#a8202c", "#5c3b2e"][i % 4],
}));

export const photos: Photo[] = frames.map((p) => ({ ...p, src: asset(p.src) }));
