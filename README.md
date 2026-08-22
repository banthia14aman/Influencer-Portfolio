# Media kit template

A single-page media-kit / portfolio template. Next.js 16 (App Router,
TypeScript, Tailwind v4), exported to static HTML.

The deployed page is currently a personal message, not the template. The
template lives in the components below and is not routed anywhere.

## Run it

```bash
npm run dev
```

## Build it

`next.config.ts` sets `output: "export"`, so `npm run build` writes a static
site to `out/` and **`npm run start` does not apply**. To preview a build:

```bash
npx serve out
```

## What's reusable

| File | What it is |
| --- | --- |
| `app/globals.css` | Design tokens (maroon/paper/rose palette in OKLCH) and the full keyframe set |
| `app/motion-bits.tsx` | `Reveal`, `SplitLine`, `CountUp`, `ScrollProgress` — CSS-driven, no animation library |
| `app/Collage.tsx` | Overlapping scatter canvas with scroll parallax |
| `app/Gallery.tsx` | Responsive grid with a keyboard-navigable lightbox |
| `app/photos.ts` | Image data. Currently placeholders |

To use it: drop images into `public/img`, point `photos.ts` at them, and
import `Collage` / `Gallery` from a page.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`. Two things that
build needs and a plain `npm run build` does not:

- `NEXT_PUBLIC_BASE_PATH=/<repo>`, because a project page is served from
  `/<repo>/`. Anything referencing `/public` must go through `asset()` in
  `app/photos.ts`: `next/image` with `unoptimized` will **not** add the base
  path on its own, and images 404 without it.
- `out/.nojekyll`, or Pages runs Jekyll and silently drops `_next`.
