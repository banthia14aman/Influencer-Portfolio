"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { photos } from "./photos";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const move = useCallback(
    (step: number) => setOpen((i) => (i === null ? i : (i + step + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, move]);

  const current = open === null ? null : photos[open];

  return (
    <>
      {/* Uniform 3:4 grid. The collage above already carries the irregular
          rhythm; mixed row-spans here just fought the fixed aspect ratio. */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {photos.map((p, n) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => setOpen(n)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: (n % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[3/4] overflow-hidden bg-maroon-800"
            aria-label={`Open frame ${n + 1}: ${p.date}, ${p.place}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-out-quint group-hover:scale-[1.06]"
            />
            <span className="pointer-events-none absolute inset-0 bg-maroon-900/0 transition-colors duration-500 group-hover:bg-maroon-900/25" />
            <span className="kicker pointer-events-none absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-maroon-900/95 to-transparent p-3 pt-8 text-left text-paper/80 transition-transform duration-500 ease-out-quint group-hover:translate-y-0">
              {p.date} · {p.place}
            </span>
          </motion.button>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null);
        }}
        className="max-h-none max-w-none bg-transparent p-0 backdrop:bg-maroon-900/92 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-dvh w-dvw items-center justify-center p-4 sm:p-10">
            <figure className="relative flex max-h-full flex-col items-center gap-3">
              <Image
                src={current.src}
                alt={current.alt}
                width={current.w}
                height={current.h}
                className="max-h-[78dvh] w-auto object-contain shadow-2xl"
              />
              <figcaption className="kicker text-blush/70">
                {open! + 1} / {photos.length} · {current.date} · {current.place}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous frame"
              className="kicker absolute left-3 top-1/2 -translate-y-1/2 border border-blush/25 px-3 py-4 text-paper/70 transition-colors hover:bg-paper hover:text-ink sm:left-8"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next frame"
              className="kicker absolute right-3 top-1/2 -translate-y-1/2 border border-blush/25 px-3 py-4 text-paper/70 transition-colors hover:bg-paper hover:text-ink sm:right-8"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="kicker absolute right-3 top-4 border border-blush/25 px-4 py-2 text-paper/70 transition-colors hover:bg-paper hover:text-ink sm:right-8 sm:top-8"
            >
              Close
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
