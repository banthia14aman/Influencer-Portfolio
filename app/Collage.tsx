"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { photos } from "./photos";

/**
 * Scattered editorial collage. Desktop places frames on a percentage canvas so
 * they overlap properly; below md it falls back to an offset two-column stack,
 * because absolute placement at phone widths just becomes a pile.
 */
type Slot = {
  i: number;
  left: string;
  top: string;
  width: string;
  rotate: number;
  /** parallax strength; 0 is pinned, 1 drifts most */
  depth: number;
  z: number;
};

const slots: Slot[] = [
  { i: 0, left: "2%", top: "6%", width: "23%", rotate: -5.5, depth: 0.85, z: 30 },
  { i: 1, left: "26%", top: "0%", width: "20%", rotate: 3, depth: 0.35, z: 20 },
  { i: 2, left: "48%", top: "9%", width: "26%", rotate: -2, depth: 1, z: 40 },
  { i: 3, left: "76%", top: "2%", width: "21%", rotate: 6, depth: 0.5, z: 25 },
  { i: 4, left: "12%", top: "41%", width: "21%", rotate: 4.5, depth: 0.6, z: 35 },
  { i: 5, left: "35%", top: "48%", width: "24%", rotate: -3.5, depth: 0.9, z: 45 },
  { i: 6, left: "61%", top: "44%", width: "19%", rotate: 2.5, depth: 0.4, z: 28 },
  { i: 7, left: "81%", top: "50%", width: "17%", rotate: -6, depth: 0.75, z: 22 },
  { i: 8, left: "0%", top: "64%", width: "18%", rotate: 3, depth: 0.55, z: 18 },
];

export default function Collage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref}>
      {/* --- desktop canvas --- */}
      {/* 4:3 canvas: the lowest slot bottoms out near 96%, leaving room for
          its caption. Shorter than this and the collage spills into the
          next section. */}
      <div className="relative hidden aspect-[4/3] w-full md:block">
        {slots.map((s) => (
          <Frame
            key={s.i}
            slot={s}
            progress={scrollYProgress}
            reduced={!!reduced}
          />
        ))}
      </div>

      {/* --- phone fallback: offset stack, still overlapping a little --- */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {photos.slice(0, 8).map((p, n) => (
          <figure
            key={p.src}
            className="relative aspect-[3/4] overflow-hidden border border-blush/20 shadow-xl shadow-maroon-900/60"
            style={{
              transform: `rotate(${n % 2 ? 2.5 : -2.5}deg)`,
              marginTop: n % 2 ? "1.75rem" : 0,
            }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

function Frame({
  slot,
  progress,
  reduced,
}: {
  slot: Slot;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const p = photos[slot.i];
  const drift = reduced ? 0 : 90 * slot.depth;
  const y = useTransform(progress, [0, 1], [drift, -drift]);

  return (
    <motion.figure
      style={{
        left: slot.left,
        top: slot.top,
        width: slot.width,
        zIndex: slot.z,
        rotate: slot.rotate,
        y,
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, zIndex: 60, rotate: 0 }}
      className="absolute origin-center"
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-blush/25 bg-maroon-800 shadow-2xl shadow-maroon-900/80">
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes="26vw"
          className="object-cover"
        />
      </div>
      <figcaption className="kicker mt-2 text-blush/60">
        {p.date} · {p.place}
      </figcaption>
    </motion.figure>
  );
}
