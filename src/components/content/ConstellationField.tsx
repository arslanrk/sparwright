"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * ConstellationField — the drifting node network behind the homepage hero.
 *
 * §09 lists "measurement marks and restrained coordinate-like labels" among the
 * approved graphic motifs, and this is the moving form of that survey net.
 *
 * A deliberate deviation from §07, which puts "constant floating objects" on
 * the Avoid list. The brief asked for the net to move, so it does — but it is
 * tuned to stay a backdrop rather than become the fight-promotion motion §07
 * warns about:
 *
 *   - Drift is ~0.14px per frame, roughly a tenth of the speed a stock particle
 *     preset ships with. Nothing crosses the viewport during a read.
 *   - No parallax, no pointer interaction, no scroll coupling — all three are
 *     named on the Avoid list, and the overlay stays `pointer-events-none` so
 *     it can never sit between a buyer and the hero's call to action.
 *   - Link opacity falls off with distance, so the net thins out instead of
 *     strobing as nodes pass each other.
 *
 * Under `prefers-reduced-motion: reduce` it paints a single frame and never
 * starts the loop, which lands on the same resting composition the static SVG
 * version used to leave behind.
 *
 * Canvas rather than animated SVG: 30 nodes and their links re-drawn per frame
 * is ~200 DOM attribute writes on an SVG, and the compositor has to re-rasterise
 * the whole overlay each time. On a canvas it is one clear and one path batch.
 */

/** Reference box the composition is authored in; scaled to the real canvas. */
const VIEW_W = 1200;
const VIEW_H = 620;

const COUNT = 30;
/** Nodes closer than this (in view units) are joined. */
const LINK_DISTANCE = 210;
/** View units per frame at 60fps. Slow enough to read as a settling net. */
const SPEED = 0.14;

/** §07 resting opacities, carried over from the static SVG it replaces. */
const NODE_OPACITY = 0.5;
const LINK_OPACITY = 0.22;

/** Small deterministic PRNG, so the opening composition is the same every load. */
function mulberry32(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number; vx: number; vy: number; r: number };

function buildNodes(): Node[] {
  const random = mulberry32(20260911);
  const nodes: Node[] = [];

  for (let i = 0; i < COUNT; i += 1) {
    // Biased left: the right of the photograph is where the people and the
    // gloves are, and a net drawn across their faces reads as clutter rather
    // than as a motif. Raising a 0–1 value to a power pulls it toward 0.
    const bias = random() ** 1.7;
    // Direction is uniform on the circle; only the heading is random, so every
    // node drifts at the same rate and none of them outruns the composition.
    const angle = random() * Math.PI * 2;
    nodes.push({
      x: bias * VIEW_W,
      y: random() * VIEW_H,
      vx: Math.cos(angle) * SPEED,
      vy: Math.sin(angle) * SPEED,
      r: 1.6 + random() * 2.2,
    });
  }

  return nodes;
}

export function ConstellationField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = buildNodes();

    // The token is the source of truth for the colour; the hero sets
    // `data-theme="dark"`, so resolving it here picks up that scope.
    const accent =
      getComputedStyle(canvas).getPropertyValue("--color-action").trim() ||
      "#d24a1f";

    let width = 0;
    let height = 0;
    /** View units → device-independent pixels. `slice`-style: cover, don't fit. */
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    function measure() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Mirrors the old SVG's preserveAspectRatio="xMidYMid slice".
      scale = Math.max(width / VIEW_W, height / VIEW_H);
      offsetX = (width - VIEW_W * scale) / 2;
      offsetY = (height - VIEW_H * scale) / 2;
      return true;
    }

    const toX = (x: number) => offsetX + x * scale;
    const toY = (y: number) => offsetY + y * scale;

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Links first, so nodes sit on top of their own connections.
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance >= LINK_DISTANCE) continue;

          // Fade with distance so links arrive and leave instead of blinking.
          const strength = 1 - distance / LINK_DISTANCE;
          ctx!.globalAlpha = LINK_OPACITY * strength;
          ctx!.strokeStyle = accent;
          ctx!.beginPath();
          ctx!.moveTo(toX(a.x), toY(a.y));
          ctx!.lineTo(toX(b.x), toY(b.y));
          ctx!.stroke();
        }
      }

      ctx!.globalAlpha = NODE_OPACITY;
      ctx!.fillStyle = accent;
      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(toX(node.x), toY(node.y), node.r * scale, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
    }

    function step(node: Node) {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce at the edges of the authored box. Clamping as well as flipping
      // keeps a node from sticking to the wall if it ever lands outside.
      if (node.x <= 0 || node.x >= VIEW_W) {
        node.vx = -node.vx;
        node.x = Math.min(Math.max(node.x, 0), VIEW_W);
      }
      if (node.y <= 0 || node.y >= VIEW_H) {
        node.vy = -node.vy;
        node.y = Math.min(Math.max(node.y, 0), VIEW_H);
      }
    }

    // `measure` fails while the canvas has no box — below `lg` the overlay is
    // `display: none`. That is not a reason to bail out of the effect: a
    // desktop window that starts narrow and is widened past the breakpoint has
    // to pick the net up, so the observers below are wired either way and
    // `measured` gates the drawing instead.
    let measured = measure();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let running = false;

    function tick() {
      for (const node of nodes) step(node);
      draw();
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (running || !measured || reduceMotion.matches) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    }

    if (measured) draw();

    // Only animate while the hero is actually on screen and the tab is in
    // front — a decoration has no business holding a phone's radio or GPU
    // awake once the buyer has scrolled past it.
    const visible = { onScreen: true, tabActive: !document.hidden };

    function sync() {
      if (visible.onScreen && visible.tabActive) start();
      else stop();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    function onVisibilityChange() {
      visible.tabActive = !document.hidden;
      sync();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Re-measure on resize; the composition keeps its state, only the mapping
    // from view units to pixels changes. Crossing the `lg` breakpoint in
    // either direction arrives here too, as a box appearing or collapsing.
    const resizeObserver = new ResizeObserver(() => {
      measured = measure();
      if (!measured) {
        stop();
        return;
      }
      // Resizing resets the backing store, so an idle canvas needs repainting.
      if (!running) draw();
      sync();
    });
    resizeObserver.observe(canvas);

    // If the buyer turns reduced motion on mid-visit, settle where we are.
    function onMotionPreferenceChange() {
      if (reduceMotion.matches) stop();
      else sync();
    }
    reduceMotion.addEventListener("change", onMotionPreferenceChange);

    sync();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("constellation-field h-full w-full", className)}
    />
  );
}
