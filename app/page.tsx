import Image from "next/image";
import Collage from "./Collage";
import Gallery from "./Gallery";
import { asset } from "./photos";
import {
  Bar,
  CountUp,
  Reveal,
  ScrollProgress,
  SplitLine,
} from "./motion-bits";

/* ---------------------------------------------------------------------------
 * SAMPLE MEDIA KIT
 * Aanya Rao is invented. Every figure below is illustrative and the
 * photography is stock. Swap this block for a real creator's data.
 * ------------------------------------------------------------------------- */
const creator = {
  name: "Aanya Rao",
  handle: "@aanyarao",
  line: "Fashion and beauty, made in Delhi. Reels that sell without sounding like ads.",
  base: "New Delhi, India",
  followers: 48200,
  engagement: "5.8%",
  avgReach: 62400,
  avgSaves: 1240,
  syncedAgo: "2 hours ago",
};

const age: [string, number][] = [
  ["18 – 24", 46],
  ["25 – 34", 38],
  ["35 – 44", 11],
  ["45+", 5],
];

const cities: [string, number][] = [
  ["Delhi NCR", 24],
  ["Mumbai", 17],
  ["Bengaluru", 11],
  ["Pune", 6],
  ["Hyderabad", 5],
];

const rates: [string, string, string][] = [
  ["Instagram Reel", "One 30–60s reel, 2 revisions", "₹18,000"],
  ["Story set", "Three frames, link sticker, 24h", "₹7,000"],
  ["Carousel post", "Up to 8 slides, copy included", "₹12,000"],
  ["Reel + stories bundle", "One reel, three stories", "₹24,000"],
  ["UGC, no posting", "Raw files, full usage rights", "₹15,000"],
];

const brands = [
  "Aurelia Skin",
  "Nord Coffee",
  "Studio Ferns",
  "Halo Beauty",
  "Marigold Stays",
  "Lune Atelier",
];

export default function Home() {
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
        {/* --------------------------------------------------------- nav */}
        <header className="sticky top-0 z-50 border-b border-blush/12 bg-maroon-900/78 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-lg tracking-wide">
                {creator.name}
              </span>
              <span className="kicker rounded-full border border-blush/30 px-2.5 py-1 text-blush/70">
                Sample
              </span>
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

        {/* -------------------------------------------------------- hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-16 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-24">
          <div>
            <p
              className="kicker animate-rise text-blush/70"
              style={{ animationDelay: "100ms" }}
            >
              Creator media kit · {creator.base}
            </p>

            <h1 className="mt-6 font-display text-[clamp(3rem,8.5vw,7rem)] leading-[0.86] tracking-[-0.02em]">
              <SplitLine text="Aanya" delay={300} step={55} />
              <span className="block italic text-blush">
                <SplitLine text="Rao" delay={620} step={55} />
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
              {creator.line}
            </p>

            {/* the product promise: numbers with a source, not self-reported */}
            <div
              className="mt-10 animate-rise"
              style={{ animationDelay: "1500ms" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blush/25 bg-blush/5 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose" />
                </span>
                <span className="kicker text-blush/80">
                  Verified via Instagram · synced {creator.syncedAgo}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-5">
                <Stat value={<CountUp to={creator.followers} />} label="Followers" />
                <Stat value={creator.engagement} label="Engagement" />
                <Stat value={<CountUp to={creator.avgReach} />} label="Avg. reach" />
                <Stat value={<CountUp to={creator.avgSaves} />} label="Avg. saves" />
              </div>
            </div>
          </div>

          <figure
            className="relative mx-auto w-full max-w-sm animate-unfold lg:max-w-none"
            style={{ animationDelay: "450ms" }}
          >
            <div className="group relative aspect-[3/4] overflow-hidden rounded-t-full border border-blush/25">
              <Image
                src={asset("/img/f01.jpg")}
                alt="Golden-hour beach walk, wide shot. Sample imagery."
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover transition-transform duration-[1400ms] ease-out-quint group-hover:scale-105"
              />
            </div>
            <figcaption className="kicker mt-3 text-center text-blush/60">
              Top performing reel · 214k views
            </figcaption>
          </figure>
        </section>

        {/* ---------------------------------------------------- audience */}
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
              <p className="kicker text-ink-soft">
                Pulled from Instagram Insights
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-14">
              <div>
                <p className="kicker mb-6 text-ink-soft">Age</p>
                <div className="space-y-5">
                  {age.map(([l, v], i) => (
                    <Bar key={l} label={l} value={v} delay={i * 110} />
                  ))}
                </div>
              </div>

              <div>
                <p className="kicker mb-6 text-ink-soft">Top cities</p>
                <div className="space-y-5">
                  {cities.map(([l, v], i) => (
                    <Bar key={l} label={l} value={v} delay={i * 110} />
                  ))}
                </div>
              </div>

              <div>
                <p className="kicker mb-6 text-ink-soft">At a glance</p>
                <dl className="space-y-5">
                  {(
                    [
                      ["Women", "71%"],
                      ["Men", "28%"],
                      ["India", "88% of audience"],
                      ["Peak activity", "8–11pm IST"],
                      ["Story completion", "74%"],
                    ] as [string, string][]
                  ).map(([k, v], i) => (
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

        {/* ----------------------------------------------------- collage */}
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
          <Collage />
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
          <Gallery />
        </section>

        {/* ------------------------------------------------------ brands */}
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-10 lg:pb-28">
          <Reveal>
            <p className="kicker text-blush/70">Worked with</p>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-blush/15 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((b, i) => (
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

        {/* ------------------------------------------------------- rates */}
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
              <p className="kicker text-ink-soft">
                Exclusive of GST · 50% upfront
              </p>
            </div>

            <dl className="mt-10 border-t border-ink/15">
              {rates.map(([k, note, price], i) => (
                <Reveal
                  key={k}
                  delay={i * 80}
                  className="grid gap-1 border-b border-ink/10 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <dt>
                    <span className="font-display text-xl">{k}</span>
                    <small className="mt-1 block text-sm text-ink-soft">
                      {note}
                    </small>
                  </dt>
                  <dd className="font-display text-2xl tabular-nums">{price}</dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ----------------------------------------------------- contact */}
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
                  hello@aanyarao.example
                </span>
                <span className="kicker border border-blush/15 px-6 py-4 text-paper/45">
                  {creator.handle}
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
                src={asset("/img/f07.jpg")}
                alt="Rooftop at dusk. Sample imagery."
                fill
                sizes="(min-width: 1024px) 28vw, 90vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-blush/12 px-5 py-8 sm:px-10">
          <p className="mx-auto max-w-7xl text-sm text-paper/40">
            Sample media kit. Aanya Rao is a fictional creator, every figure is
            illustrative, and the photography is stock. Built to show what a
            finished kit looks like.
          </p>
        </footer>
      </div>
    </main>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <div className="font-display text-4xl leading-none tabular-nums">
        {value}
      </div>
      <div className="kicker mt-2 text-paper/50">{label}</div>
    </div>
  );
}
