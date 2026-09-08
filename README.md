# Media kit template

Media kits for creators. Next.js 16 (App Router, TypeScript, Tailwind v4),
exported to static HTML. One deploy serves every creator.

**Live:** https://banthia14aman.github.io/Influencer-Portfolio/

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

## Adding a creator

Three steps, no database, no code:

1. Drop their twelve images in `public/img/<slug>/` as `f01.jpg` … `f12.jpg`
2. Copy `content/aanya.json` to `content/<slug>.json` and fill it in
3. Commit

`generateStaticParams` picks up the new file and prerenders `/<slug>` on the
next deploy. `content/` is the whole data layer; when stats start arriving
from the Instagram Graph API, `app/creators.ts` is the only module that
changes.

## What's reusable

| File | What it is |
| --- | --- |
| `app/globals.css` | Design tokens (maroon/paper/rose palette in OKLCH) and the full keyframe set |
| `app/motion-bits.tsx` | `Reveal`, `SplitLine`, `CountUp`, `ScrollProgress` — CSS-driven, no animation library |
| `app/Collage.tsx` | Overlapping scatter canvas with scroll parallax |
| `app/Gallery.tsx` | Responsive grid with a keyboard-navigable lightbox |
| `app/creators.ts` | Reads `content/*.json` at build time, resolves image paths |
| `app/[creator]/page.tsx` | The kit itself, rendered from one JSON file |

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`. Two things that
build needs and a plain `npm run build` does not:

- `NEXT_PUBLIC_BASE_PATH=/<repo>`, because a project page is served from
  `/<repo>/`. Anything referencing `/public` must go through `asset()` in
  `app/creators.ts`: `next/image` with `unoptimized` will **not** add the base
  path on its own, and images 404 without it. (`next/link` does handle it.)
- `out/.nojekyll`, or Pages runs Jekyll and silently drops `_next`.
