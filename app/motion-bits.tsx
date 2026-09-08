"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Small CSS-driven animation primitives shared by both pages.
 * IntersectionObserver + class toggles rather than an animation library:
 * everything here is a transition or a keyframe, which is all it needs to be.
 */

/** Adds `.in` when the element scrolls into view, once. */
export function useInView<T extends HTMLElement>(margin = "-12%") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    // Backstop. IntersectionObserver callbacks ride the rendering steps, so a
    // throttled or background tab can leave them undelivered; without this a
    // whole page of `.reveal` content would sit at opacity 0 forever.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
        setSeen(true);
        return true;
      }
      return false;
    };

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin: `0px 0px ${margin} 0px` },
    );
    io.observe(el);

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    document.addEventListener("visibilitychange", check);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [seen, margin]);

  return { ref, seen };
}

type RevealProps = {
  children: ReactNode;
  /** stagger in ms */
  delay?: number;
  className?: string;
  /** also slow-push-in any <img> inside */
  kenburns?: boolean;
  as?: "div" | "section" | "li" | "article" | "figure" | "span";
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  kenburns = false,
  as = "div",
}: RevealProps) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return createElement(
    as,
    {
      ref,
      style: { "--d": `${delay}ms` } as CSSProperties,
      className: `reveal ${kenburns ? "kenburns" : ""} ${seen ? "in" : ""} ${className}`,
    },
    children,
  );
}

/**
 * Splits a line into per-character spans that rise in sequence.
 * Spaces stay as real spaces so the line still wraps and reads to a
 * screen reader as one string.
 */
export function SplitLine({
  text,
  delay = 0,
  step = 34,
  className = "",
  play = true,
}: {
  text: string;
  delay?: number;
  step?: number;
  className?: string;
  play?: boolean;
}) {
  return (
    <span className={className}>
      {/* the animated glyphs are aria-hidden, so carry the real string here:
          aria-label on a plain span is not reliably announced */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i}> </span>
          ) : (
            <span
              key={i}
              className={play ? "inline-block animate-letter" : "inline-block"}
              style={{ animationDelay: `${delay + i * step}ms` }}
            >
              {ch}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

/** Labelled percentage bar that fills when scrolled into view. */
export function Bar({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: number;
  delay?: number;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-ink-soft">{label}</span>
        <span className="font-display text-lg tabular-nums">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div
          className="bar h-full rounded-full bg-rose"
          style={
            {
              "--d": `${delay}ms`,
              transform: `scaleX(${seen ? value / 100 : 0})`,
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}

/** Hairline reading-progress bar pinned to the top of the page. */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-rose"
      style={{ transform: `scaleX(${p})` }}
    />
  );
}

/** Counts up to `to` when scrolled into view. Renders the final value if JS never runs. */
export function CountUp({
  to,
  duration = 1600,
  className = "",
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!seen) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out-quint
      setN(Math.round(to * (1 - Math.pow(1 - t, 5))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("en-IN")}
    </span>
  );
}
