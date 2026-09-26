"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * LineSlider — the six product lines as a horizontal track of tall photo
 * cards: a big index number, the line's name (an h3 carrying the term its
 * page ranks for), three of its types and the way in. The track scrolls and
 * snaps by itself on touch and trackpad; arrow buttons move it a card at a
 * time and a bar shows how far along you are. Nothing moves on its own
 * (§07). Every card is a plain link in the HTML.
 */

export type SliderCard = {
  title: string;
  items: string[];
  href: string;
  photo: { src: StaticImageData; alt: string };
};

export function LineSlider({ cards }: { cards: SliderCard[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function step(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const width = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * width, behavior: "smooth" });
  }

  return (
    <div>
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <li key={card.href} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
            <Link
              href={card.href}
              className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-ink-950 p-[var(--space-6)] text-white"
            >
              <Image
                src={card.photo.src}
                alt={card.photo.alt}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 46vw, 78vw"
                className="-z-10 object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.07]"
              />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/55 via-45% to-ink-950/10" />
              {/* The big index number, top left. */}
              <span aria-hidden="true" className="absolute left-[var(--space-6)] top-[var(--space-5)] font-display text-[4.5rem] font-black leading-none text-white/15 transition-colors duration-300 group-hover:text-forge-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-heading-3 leading-tight">{card.title}</h3>
              <ul className="mt-[var(--space-3)] flex flex-col gap-1 text-small text-mist-300">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-forge-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-[var(--space-5)] inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-small font-semibold backdrop-blur-sm transition-colors group-hover:bg-forge-600">
                Explore {card.title}
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 transition-transform motion-safe:group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Progress and the arrows. */}
      <div className="mt-[var(--space-5)] flex items-center gap-[var(--space-5)]">
        <div aria-hidden="true" className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-forge-600 transition-[width] duration-150"
            style={{ width: `${Math.max(progress, 0.08) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <SlideButton label="Previous product lines" disabled={edges.start} onClick={() => step(-1)} flip />
          <SlideButton label="Next product lines" disabled={edges.end} onClick={() => step(1)} />
        </div>
      </div>
    </div>
  );
}

function SlideButton({ label, onClick, disabled, flip = false }: { label: string; onClick: () => void; disabled: boolean; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-12 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text)] transition-colors hover:border-forge-600 hover:bg-forge-600 hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className={flip ? "size-4 rotate-180" : "size-4"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </button>
  );
}
