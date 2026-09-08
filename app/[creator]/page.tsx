import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Collage from "../Collage";
import Gallery from "../Gallery";
import { allSlugs, getCreator } from "../creators";
import { Bar, CountUp, Reveal, ScrollProgress, SplitLine } from "../motion-bits";

type Params = { params: Promise<{ creator: string }> };

export function generateStaticParams() {
  return allSlugs().map((creator) => ({ creator }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { creator } = await params;
  const c = getCreator(creator);
  return {
    title: `${c.name} — Creator Media Kit${c.sample ? " (Sample)" : ""}`,
    description: c.line,
  };
}

export default async function CreatorPage({ params }: Params) {
  const { creator } = await params;
  const c = getCreator(creator);

  return (
    <main className="lacquer grain artdirected relative overflow-hidden">
      <ScrollProgress />

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
        <div
          className="absolute -right-[25%] top-[45%] h-[70vmax] w-[70vmax] animate-drift-b rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.60 0.185 18 / 0.45), transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ------------------------------------------------------- nav */}
        <header className="sticky top-0 z-50 border-b border-blush/12 bg-maroon-900/78 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
            <div className="flex items-baseline gap-3">
              <Link href="/" className="font-display text-lg tracking-wide">
                {c.name}
              </Link>
              {c.sample && (
                <span className="kicker rounded-full border border-blush/30 px-2.5 py-1 text-blush/70">
                  Sample
                </span>
              )}
            </div>
            <nav className="hidden gap-8 md:flex">
              {["Audience", "Content", "Rates", "Contact"].map((n) => (
                <a
                  key={n}
                  href={`#${n.toLowerCase()}`}
                  className="kicker group relative text-paper/60 transition-colors duration-300 hover:text-blush"
                >
                  {n}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-blush transition-transform duration-500 ease-out-quint group-hover:scale-x-100" />
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className="kicker border border-blush/30 px-4 py-2 transition-all duration-500 ease-out-quint hover:scale-105 hover:bg-paper hover:text-ink"
            >
              Book
            </a>
          </div>
        </header>

        {/* ------------------------------------------------------ hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-16 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-24">
          <div>
            <p
              className="kicker animate-rise text-blush/70"
              style={{ animationDelay: "100ms" }}
            >
              Creator media kit · {c.base}
            </p>

            <h1 className="mt-6 font-display text-[clamp(3rem,8.5vw,7rem)] leading-[0.86] tracking-[-0.02em]">
              <SplitLine text={c.first} delay={300} step={55} />
              <span className="block italic text-blush">
                <SplitLine text={c.last} delay={620} step={55} />
              </span>
            </h1>

            <div
              className="my-8 h-px max-w-md origin-left animate-draw bg-gradient-to-r from-blush/45 to-transparent"
              style={{ animationDelay: "1100ms" }}
            />

            <p
              className="max-w-md animate-rise text-lg leading-relaxed text-paper/75"
              style={{ animationDelay: "1250ms" }}
            >
              {c.line}
            </p>

            <div
              className="mt-10 animate-rise"
              style={{ animationDelay: "1500ms" }}
            >
              {/* the product promise: numbers with a source, not self-reported */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blush/25 bg-blush/5 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose" />
                </span>
                <span className="kicker text-blush/80">
                  Verified via Instagram · synced {c.syncedAgo}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-5">
                <Stat value={<CountUp to={c.stats.followers} />} label="Followers" />
                <Stat value={c.stats.engagement} label="Engagement" />
                <Stat value={<CountUp to={c.stats.avgReach} />} label="Avg. reach" />
                <Stat value={<CountUp to={c.stats.avgSaves} />} label="Avg. saves" />
              </div>
            </div>
          </div>

          <figure
            className="relative mx-auto w-full max-w-sm animate-unfold lg:max-w-none"
            style={{ animationDelay: "450ms" }}
          >
            <div className="group relative aspect-[3/4] overflow-hidden rounded-t-full border border-blush/25">
              <Image
                src={c.heroSrc}
                alt={c.photos[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover transition-transform duration-[1400ms] ease-out-quint group-hover:scale-105"
              />
            </div>
            <figcaption className="kicker mt-3 text-center text-blush/60">
              {c.heroCaption}
            </figcaption>
          </figure>
        </section>

        {/* -------------------------------------------------- audience */}
        <section
          id="audience"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-10 lg:py-28"
        >
          <Reveal className="rounded-sm bg-paper p-6 text-ink sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker text-rose">Audience</p>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-[-0.02em]">
                  Who actually sees the work
                </h2>
              </div>
              <p className="kicker text-ink-soft">Pulled from Instagram Insights</p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-14">
              <div>
                <p className="kicker mb-6 text-ink-soft">Age</p>
                <div className="space-y-5">
                  {c.age.map(([l, v], i) => (
                    <Bar key={l} label={l} value={v} delay={i * 110} />
                  ))}
                </div>
              </div>

              <div>
                <p className="kicker mb-6 text-ink-soft">Top cities</p>
                <div className="space-y-5">
                  {c.cities.map(([l, v], i) => (
                    <Bar key={l} label={l} value={v} delay={i * 110} />
                  ))}
                </div>
              </div>

              <div>
                <p className="kicker mb-6 text-ink-soft">At a glance</p>
                <dl className="space-y-5">
                  {c.glance.map(([k, v], i) => (
                    <Reveal
                      key={k}
                      delay={i * 90}
                      className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
                    >
                      <dt className="text-ink-soft">{k}</dt>
                      <dd className="font-display text-lg">{v}</dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </section>

        {/* --------------------------------------------------- collage */}
        <section
          id="content"
          className="mx-auto max-w-[92rem] px-5 pb-20 sm:px-10 lg:pb-28"
        >
          <Reveal className="mb-12 max-w-2xl">
            <p className="kicker text-blush/70">Recent work</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
              The last quarter, <em className="text-blush">all at once</em>.
            </h2>
          </Reveal>
          <Collage photos={c.photos} />
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-10 lg:pb-28">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="kicker text-blush/70">The grid</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
                Twelve frames
              </h2>
            </div>
            <p className="kicker text-paper/45">Tap any frame to open it</p>
          </Reveal>
          <Gallery photos={c.photos} />
        </section>

        {/* ---------------------------------------------------- brands */}
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-10 lg:pb-28">
          <Reveal>
            <p className="kicker text-blush/70">Worked with</p>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-blush/15 sm:grid-cols-2 lg:grid-cols-3">
            {c.brands.map((b, i) => (
              <Reveal
                key={b}
                delay={i * 70}
                className="bg-maroon-900/85 px-7 py-8 text-center font-display text-xl transition-colors duration-500 hover:bg-maroon-800/85"
              >
                {b}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- rates */}
        <section
          id="rates"
          className="mx-auto max-w-7xl px-5 pb-20 sm:px-10 lg:pb-28"
        >
          <Reveal className="rounded-sm bg-paper p-6 text-ink sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker text-rose">Rate card</p>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-[-0.02em]">
                  What it costs
                </h2>
              </div>
              <p className="kicker text-ink-soft">Exclusive of GST · 50% upfront</p>
            </div>

            <dl className="mt-10 border-t border-ink/15">
              {c.rates.map(([k, note, price], i) => (
                <Reveal
                  key={k}
                  delay={i * 80}
                  className="grid gap-1 border-b border-ink/10 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <dt>
                    <span className="font-display text-xl">{k}</span>
                    <small className="mt-1 block text-sm text-ink-soft">{note}</small>
                  </dt>
                  <dd className="font-display text-2xl tabular-nums">{price}</dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* --------------------------------------------------- contact */}
        <section
          id="contact"
          className="mx-auto max-w-7xl px-5 pb-28 sm:px-10 lg:pb-40"
        >
          <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <Reveal>
              <p className="kicker text-blush/70">Bookings</p>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.03em]">
                Let&rsquo;s make
                <span className="block italic text-blush">something</span>
              </h2>
              <p className="mt-8 max-w-md text-lg text-paper/70">
                Usually replies within a day. Send the brief, the timeline and
                the usage rights you need.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="kicker border border-blush/30 px-6 py-4">
                  {c.email}
                </span>
                <span className="kicker border border-blush/15 px-6 py-4 text-paper/45">
                  {c.handle}
                </span>
              </div>
            </Reveal>

            <Reveal
              as="figure"
              delay={180}
              kenburns
              className="relative aspect-[3/4] overflow-hidden rounded-t-full border border-blush/25"
            >
              <Image
                src={c.contactSrc}
                alt={c.photos[6].alt}
                fill
                sizes="(min-width: 1024px) 28vw, 90vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-blush/12 px-5 py-8 sm:px-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl text-sm text-paper/40">
              {c.sample
                ? `Sample media kit. ${c.name} is a fictional creator, every figure is illustrative, and the photography is stock.`
                : `Media kit for ${c.name}.`}
            </p>
            <Link href="/" className="kicker text-paper/40 hover:text-blush">
              All kits
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl leading-none tabular-nums">
        {value}
      </div>
      <div className="kicker mt-2 text-paper/50">{label}</div>
    </div>
  );
}
