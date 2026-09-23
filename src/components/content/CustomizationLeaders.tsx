"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Leader lines for CustomizationShowcase.
 *
 * Draws one line per card, from the card's inner edge to its hotspot on the
 * product image. Both ends are found by data attribute — `data-leader-card`
 * on the card, `data-leader-dot` on the hotspot, sharing a key — so the
 * showcase stays a server component and only the drawing runs on the client.
 *
 * Positions come from layout, so they are re-measured whenever the showcase
 * resizes. Decorative: hidden from assistive technology, and below `xl` the
 * parent hides it along with the dots.
 */

type Leader = { key: string; points: string };

/** How far the line runs straight out of the card before it turns. */
const ELBOW = 20;

export function CustomizationLeaders() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const root = svg?.parentElement;
    if (!svg || !root) return;

    const measure = () => {
      const origin = root.getBoundingClientRect();
      const next: Leader[] = [];

      root.querySelectorAll<HTMLElement>("[data-leader-card]").forEach((card) => {
        const key = card.dataset.leaderCard!;
        const dot = root.querySelector<HTMLElement>(`[data-leader-dot="${key}"]`);
        if (!dot) return;

        const c = card.getBoundingClientRect();
        const d = dot.getBoundingClientRect();
        const dx = d.left + d.width / 2 - origin.left;
        const dy = d.top + d.height / 2 - origin.top;
        // Leave from whichever edge faces the dot.
        const fromLeftEdge = dx < c.left - origin.left;
        const sx = (fromLeftEdge ? c.left : c.right) - origin.left;
        const sy = c.top + c.height / 2 - origin.top;
        const ex = sx + (fromLeftEdge ? -ELBOW : ELBOW);

        next.push({ key, points: `${sx},${sy} ${ex},${sy} ${dx},${dy}` });
      });

      setLeaders(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 hidden size-full overflow-visible xl:block"
    >
      {leaders.map((leader) => (
        <polyline
          key={leader.key}
          points={leader.points}
          fill="none"
          stroke="rgb(255 255 255 / 0.35)"
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}
