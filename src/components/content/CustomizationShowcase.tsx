import Image, { type StaticImageData } from "next/image";
import { CustomizationLeaders } from "@/components/content/CustomizationLeaders";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { cn } from "@/lib/cn";

/**
 * CustomizationShowcase — Design System §08 Customization panel.
 *
 * The four things a buyer controls, laid out around one product so each reads
 * as a part of it rather than an abstract category: branding and packaging on
 * the left, colour and construction on the right, each card wired to the glove
 * by a leader line. The uppercase tag is the §09 "product specification tag"
 * motif, and the chips under each card are the same motif at a smaller size.
 *
 * From `xl` the cards flank the image and a leader line runs from each card's
 * inner edge to its `hotspot` — a point on the photograph, in percent, so it
 * stays on the same part of the glove at any width. Below `xl` there is no
 * room for the lines to mean anything, so the image comes first and the cards
 * stack beneath it. The hotspots are tuned to the current photograph; a new
 * one means new coordinates.
 */

export type CustomizationDetail =
  | { kind: "chips"; items: string[] }
  /** Decorative swatches: illustrative colours, not real references. */
  | { kind: "swatches" };

export type CustomizationItem = {
  tag: string;
  title: string;
  description: string;
  /** Which side of the product the card sits on from `xl`. */
  side: "left" | "right";
  /** Where the leader line lands on the photograph, in percent. */
  hotspot?: { x: number; y: number };
  detail?: CustomizationDetail;
};

type CustomizationShowcaseProps = {
  items: CustomizationItem[];
  /** The product photograph, 3:4. Falls back to a placeholder naming `shot`. */
  image?: { src: StaticImageData; alt: string };
  /** §09 shot the centre image is waiting for. */
  shot: string;
};

export function CustomizationShowcase({
  items,
  image,
  shot,
}: CustomizationShowcaseProps) {
  const left = items.filter((item) => item.side === "left");
  const right = items.filter((item) => item.side === "right");

  return (
    <div className="relative grid gap-[var(--space-5)] md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] xl:gap-x-[var(--space-7)] xl:gap-y-0">
      {/* The product. First in the source so it leads on a phone. */}
      <div className="relative mx-auto w-full max-w-md md:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:max-w-none xl:self-center">
        {image ? (
          <>
            {/* Edges fade into the band so the photograph's own backdrop
                never reads as a box on the section. */}
            <Image
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 28rem, 100vw"
              className="h-auto w-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent),linear-gradient(to_bottom,transparent,black_9%,black_91%,transparent)]"
            />
            {items.map((item) =>
              item.hotspot ? (
                <span
                  key={item.tag}
                  aria-hidden="true"
                  data-leader-dot={item.tag}
                  style={{ left: `${item.hotspot.x}%`, top: `${item.hotspot.y}%` }}
                  className="absolute hidden size-3 -translate-1/2 rounded-full bg-forge-600 ring-4 ring-forge-600/30 xl:block"
                />
              ) : null,
            )}
          </>
        ) : (
          <ImagePlaceholder shot={shot} ratio="portrait" className="w-full" />
        )}
      </div>

      <CardColumn items={left} side="left" all={items} />
      <CardColumn items={right} side="right" all={items} />

      {image ? <CustomizationLeaders /> : null}
    </div>
  );
}

function CardColumn({
  items,
  side,
  all,
}: {
  items: CustomizationItem[];
  side: "left" | "right";
  /** The full list, so stacked cards keep its order below `xl`. */
  all: CustomizationItem[];
}) {
  return (
    <div
      className={cn(
        // Below `xl` the column dissolves and its cards join the parent grid.
        "contents xl:row-start-1 xl:flex xl:flex-col xl:justify-around xl:gap-[var(--space-6)]",
        side === "left" ? "xl:col-start-1" : "xl:col-start-3",
      )}
    >
      {items.map((item) => (
        <ShowcaseCard
          key={item.tag}
          item={item}
          order={all.indexOf(item) + 1}
        />
      ))}
    </div>
  );
}

function ShowcaseCard({
  item,
  order,
}: {
  item: CustomizationItem;
  order: number;
}) {
  return (
    <div
      style={{ order }}
      data-leader-card={item.hotspot ? item.tag : undefined}
      className="relative z-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/85 p-[var(--space-5)] backdrop-blur-sm"
    >
      {/* Muted, not Forge: this tag is 12px on the dark band, where Forge 600
          is 4.21:1 — under the 4.5 §12 needs for small text. */}
      <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
        {item.tag}
      </p>
      <h3 className="mt-2 text-heading-4">{item.title}</h3>
      <p className="mt-2 text-small text-[var(--color-text-secondary)]">
        {item.description}
      </p>

      {item.detail ? <Detail detail={item.detail} /> : null}
    </div>
  );
}

/** Illustrative only: a club-kit spread, not colour references. */
const SWATCHES = ["#d83a20", "#0b0d10", "#b08d57", "#1e4fa3", "#f4f1e8"];

function Detail({ detail }: { detail: CustomizationDetail }) {
  if (detail.kind === "swatches") {
    return (
      <div aria-hidden="true" className="mt-[var(--space-4)] flex gap-2">
        {SWATCHES.map((colour) => (
          <span
            key={colour}
            className="size-7 rounded-full border border-white/20 shadow-inner"
            style={{ backgroundColor: colour }}
          />
        ))}
      </div>
    );
  }

  return (
    <ul className="mt-[var(--space-4)] flex flex-wrap gap-2">
      {detail.items.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.75rem] font-medium leading-5 text-[var(--color-text-secondary)]"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}
