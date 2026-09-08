import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allCreators } from "./creators";
import { Reveal, SplitLine } from "./motion-bits";

export const metadata: Metadata = {
  title: "Creator media kits",
  description:
    "Media kits for creators: verified audience data, recent work and a rate card, on a link you can send a brand.",
};

export default function Index() {
  const creators = allCreators();

  return (
    <main className="lacquer grain artdirected relative min-h-dvh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute -left-[20%] top-[-15%] h-[65vmax] w-[65vmax] animate-drift-a rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.38 0.128 20 / 0.6), transparent 62%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-10 lg:py-28">
        <p
          className="kicker animate-rise text-blush/70"
          style={{ animationDelay: "100ms" }}
        >
          Media kits for creators
        </p>

        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.02em]">
          <SplitLine text="The link you" delay={300} step={38} />
          <span className="block italic text-blush">
            <SplitLine text="send a brand" delay={860} step={38} />
          </span>
        </h1>

        <p
          className="mt-8 max-w-lg animate-rise text-lg leading-relaxed text-paper/75"
          style={{ animationDelay: "1500ms" }}
        >
          Audience data, recent work and a rate card, on one page that loads in
          under a second. Numbers come from Instagram, not from a screenshot.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {creators.map((c, i) => (
            <Reveal key={c.slug} delay={i * 120}>
              <Link
                href={`/${c.slug}`}
                className="group block overflow-hidden rounded-sm border border-blush/15 bg-maroon-900/60 transition-colors duration-500 hover:border-blush/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.heroSrc}
                    alt={c.photos[0].alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out-quint group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-4 p-6">
                  <div>
                    <h2 className="font-display text-2xl">{c.name}</h2>
                    <p className="kicker mt-2 text-paper/45">
                      {c.handle} · {c.base.split(",")[0]}
                    </p>
                  </div>
                  <span className="font-display text-xl tabular-nums text-blush">
                    {c.stats.followers.toLocaleString("en-IN")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-16 max-w-2xl text-sm text-paper/40">
          Both kits above are samples: fictional creators, illustrative figures,
          stock photography. Yours would use your own.
        </p>
      </div>
    </main>
  );
}
