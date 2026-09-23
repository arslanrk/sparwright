import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { cn } from "@/lib/cn";
import { TextLink } from "@/components/foundation/TextLink";
import type { SectionTheme } from "@/components/foundation/Container";

/**
 * ExpertiseGrid — Design System §08, §09 iconography, §06 surfaces.
 *
 * What the business can do to an order, rather than what happens to any one
 * product. The process stepper answers "what happens when"; this answers
 * "could you actually make my thing, at my volume" — the question that decides
 * whether a bulk buyer starts a conversation at all.
 *
 * Written to hold for every category in `product-list.ts`, not just gloves.
 * An earlier version listed the operations that finish a boxing glove, which
 * said nothing about a lifting belt, a rashguard or a kit bag.
 *
 * A grid, not a carousel. The reference this grew from hides nine cards behind
 * a slider, and under 1% of visitors advance past a carousel's first slide — a
 * capability list is the last thing worth hiding, since its whole job is to be
 * scanned. It is also the second icon set on this page, so it is deliberately
 * unlike the stepper: bordered cards, no numerals, no connecting route.
 *
 * §06 warns against "excessive rounded cards" and asks for an identity that
 * feels constructed rather than soft, so the radius is small and the border is
 * a hairline rather than a shadow.
 *
 * The copy is deliberately shorter than the same six operations on
 * /manufacturing rather than repeated verbatim: two pages carrying identical
 * paragraphs compete with each other. This is the summary; that page is the
 * detail, and the link below points at it.
 */

export type ExpertiseItem = {
  title: string;
  description: string;
  /**
   * Which phase of the job this sits in. Six equal cards are hard to parse at
   * a glance; grouping them into development, production, quality and dispatch
   * is a real division of the work rather than decoration.
   */
  phase: string;
  /** §09 shot this card is waiting on, 3:2. */
  shot: string;
  /**
   * The photograph itself, once it exists. Same shape as a collection's: src
   * and alt travel together so one cannot land without the other.
   */
  photo?: { src: StaticImageData; alt: string };
};

type ExpertiseGridProps = {
  theme?: SectionTheme;
  eyebrow?: string;
  title: string;
  description?: string;
  items: ExpertiseItem[];
  /** Where the full version of this lives. Omit both for no link. */
  href?: string;
  linkLabel?: string;
};

export function ExpertiseGrid({
  theme = "light",
  eyebrow,
  title,
  description,
  items,
  href,
  linkLabel,
}: ExpertiseGridProps) {
  return (
    <Section theme={theme} width="work">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      {/*
        The photograph is the card. Each plate is a 4:5 frame filled by the
        image, with an opaque panel across its foot carrying the phase and the
        title. Portrait, not landscape: the panel is around 130px at rest and
        230px expanded, and against a 4:3 card that left a sliver of photograph
        on hover. The taller frame keeps the picture the larger half in both
        states, which is the only reason it leads the card. The description sits inside that panel, collapsed, and the panel
        grows to show it on hover.

        THE PANEL IS SOLID, NOT GLASS, and that is the whole point. Frosted
        glass was tried across four passes — a flat tint at 62%, then 40%, then
        backdrop-brightness at 0.45 and 0.7 — and every one of them traded the
        photograph against the type: whatever made the words legible made the
        picture murky, because both were competing for the same pixels. At the
        best setting the type measured 13.95:1 and the photograph still came
        through at 0.58 of its uncovered luminance, which is a dimmed picture
        however it is framed.

        The way out is to stop reading the photograph through the panel at all.
        Where the type sits, the panel is fully opaque, so the photograph above
        it is untouched — no blur, no brightness scaling, no tint. Nothing is
        burned, because nothing is covered twice.

        It costs the strip of image behind the panel, which is the right thing
        to spend: a caption area is not what anyone is looking at, and a clean
        two-thirds beats a dimmed whole.

        The top edge is a fixed 2.5rem gradient ramp rather than a hard line, so
        the panel dissolves into the photograph instead of cutting it. The ramp
        is sized in rem, not a percentage, so it does not stretch when the panel
        grows on hover and push the type up into the translucent part.

        The gradient is unconditional, with no `sm:` guard. Below `sm` the panel
        sits in flow on the card's own ink ground, so a ramp to transparent
        resolves to ink over ink and is simply invisible — the same declaration
        is correct in both layouts.

        Solid ground also retires the contrast problem. An earlier pass had to
        force the body text to white because mist-300 measured 4.16:1 over the
        glass, under the 4.5:1 §12 asks for. On opaque ink the designed muted
        and secondary roles hold at their documented values, for any photograph,
        including the five not yet shot.

        The badge straddles the panel's top edge, half on the photograph. It is
        the one filled Forge shape in the section: §09 restricts Forge to active
        or emphasized states, and a solid fill is far more assertive than the
        hairline icons elsewhere, so it earns its place by replacing the inline
        icon rather than joining it. The glyph is white on Forge-600 at 4.62:1,
        past the 3:1 a non-text graphic needs.

        The card carries `cursor-pointer` although it is not a link. That is a
        deliberate exception, asked for directly, and it is worth knowing what
        it costs: a pointer cursor is the convention for "clicking this does
        something", so anyone who follows it and clicks gets nothing. The fix
        is a real destination per card rather than dropping the cursor, but
        /manufacturing currently renders these six operations as items inside
        one section with no per-operation ids, so there is nothing distinct to
        point at yet. Giving all six the same href would land us back at the
        duplicate-anchor problem already fixed once on this page.

        THE REVEAL IS HOVER-GATED. A touch screen has no hover, so collapsing
        the description by default would hide it from every phone visitor. The
        collapse is wrapped in `@media (hover: hover)`: pointer devices get the
        reveal, touch devices get the description open from the start.

        Animated through grid-template-rows 0fr → 1fr rather than height, which
        needs no measured value and does not thrash layout the way an animated
        height does. 200ms is `--motion-standard`, which §07 assigns to "hover,
        focus and accordion change" — this is all three.
      */}
      <ul className="mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item.title}
            data-theme="dark"
            className="group relative cursor-pointer overflow-hidden rounded-md bg-[var(--color-bg)] text-[var(--color-text)] sm:aspect-[4/5]"
          >
            {/*
              Overlaid from `sm` up, stacked below it. On a phone the
              description is always open — there is no hover to open it — and
              an overlaid panel carrying three lines of copy left a sliver of
              photograph above it, which defeats leading with the image. Below
              `sm` the picture keeps its own 3:2 band and the panel sits under
              it on the card's own ground.
            */}
            <div className="relative aspect-[3/2] sm:absolute sm:inset-0 sm:aspect-auto">
              <OperationShot item={item} />
            </div>

            <div
              className={cn(
                "relative px-[var(--space-5)] pb-[var(--space-5)]",
                // Clears the half of the badge that hangs below the top edge.
                "pt-[calc(1.375rem+var(--space-5))]",
                "sm:absolute sm:inset-x-0 sm:bottom-0",
              )}
              style={{
                backgroundImage:
                  "linear-gradient(to top, var(--color-ink-950) calc(100% - 2.5rem), transparent)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute left-[var(--space-5)] top-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-md bg-[var(--color-action)] text-[var(--color-white)]"
              >
                {OPERATION_ICONS[i] ?? <IconCut />}
              </span>

              <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
                {item.phase}
              </p>

              <h3 className="mt-[var(--space-3)] font-body text-body-large font-semibold">
                {item.title}
              </h3>

              <div
                className={cn(
                  "grid grid-rows-[1fr] transition-[grid-template-rows] duration-[var(--motion-standard)] ease-[var(--ease-standard)]",
                  // Only a device that can hover gets the collapsed state.
                  "[@media(hover:hover)]:grid-rows-[0fr]",
                  "[@media(hover:hover)]:group-hover:grid-rows-[1fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pt-[var(--space-3)] text-small text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {href && linkLabel ? (
        <div className="mt-[var(--space-6)]">
          <TextLink href={href}>{linkLabel}</TextLink>
        </div>
      ) : null}
    </Section>
  );
}

/** The photograph where one exists, otherwise the brief it is waiting on.
    Both fill the plate absolutely; the card's own 4:3 sets the shape. */
function OperationShot({ item }: { item: ExpertiseItem }) {
  if (!item.photo) {
    return (
      <div className="absolute inset-0 bg-white/[0.04] p-[var(--space-5)]">
        <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
          Photograph required
        </p>
        <p className="mt-1 text-small text-[var(--color-text-secondary)]">
          {item.shot}
        </p>
      </div>
    );
  }
  return (
    <Image
      src={item.photo.src}
      alt={item.photo.alt}
      fill
      placeholder="blur"
      // One of three columns inside the work container; never wider.
      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
      className={cn(
        "object-cover",
        // A 4% push as the panel opens, so the card reads as one movement
        // rather than a panel sliding over a still picture. Runs at emphasis
        // against the panel's standard, which is deliberate: the image is
        // still easing as the panel lands, and two things stopping on the
        // same frame is what makes a hover feel abrupt.
        "transition-transform duration-[var(--motion-emphasis)] ease-[var(--ease-standard)]",
        // Gated like the description it accompanies. A tap on iOS can leave
        // :hover latched until the next tap elsewhere, which would strand the
        // image zoomed on a device that never asked for the effect.
        "[@media(hover:hover)]:group-hover:scale-[1.04]",
      )}
    />
  );
}

/* -------------------------------------------------------------------------
   §09 iconography: one line family, ~1.75px stroke, single colour.

   Indexed to the operations in production order. Two of these cover the same
   ground as the stepper's icons — inspection and packing — so they are drawn
   differently on purpose: a record sheet rather than a magnifier, a taped
   carton face rather than an isometric box. Repeating a glyph two sections
   apart reads as a mistake.
------------------------------------------------------------------------- */

const ICON = {
  "aria-hidden": true as const,
  viewBox: "0 0 24 24",
  className: "size-5",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Design and development — a pattern drawn on screen. */
function IconDesign() {
  return (
    <svg {...ICON}>
      <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
      <path d="M9 21h6M12 17v4" />
      <path d="M6 13.5c3-6.5 6 2 9-3.5" />
    </svg>
  );
}

/**
 * Pattern making and cutting — a head tracking a cut line across a sheet.
 * Scissors were here while this section described finishing a glove by hand;
 * the capability being stated now is laser and die cutting at volume, and a
 * pair of scissors says the opposite of that.
 */
function IconCut() {
  return (
    <svg {...ICON}>
      <path d="M12 3v4.5" />
      <path d="M9.5 7.5h5L12 11Z" />
      <rect x="3" y="12.5" width="18" height="8" rx="1" />
      <path d="M7 16.5h10" strokeDasharray="2 2.5" />
    </svg>
  );
}

/** Printing and decoration — a press running a sheet through. */
function IconPrint() {
  return (
    <svg {...ICON}>
      <path d="M7 9V3.5h10V9" />
      <rect x="3.5" y="9" width="17" height="7" rx="1.5" />
      <path d="M7 16h10v4.5H7z" />
      <path d="M17.5 12h.01" />
    </svg>
  );
}

/** Stitching — a seam worked along a panel edge. */
function IconStitch() {
  return (
    <svg {...ICON}>
      <path d="M3 17h18" />
      <path d="m4 13 3-5 3 5 3-5 3 5 3-5 2 3" />
    </svg>
  );
}

/** Inspection — checks recorded against the approved specification. */
function IconRecord() {
  return (
    <svg {...ICON}>
      <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
      <path d="m9 13.5 2 2 4-4" />
    </svg>
  );
}

/** Packing — a taped export carton, seen face on. */
function IconCarton() {
  return (
    <svg {...ICON}>
      <rect x="3" y="6" width="18" height="14" rx="1" />
      <path d="M3 10.5h18" />
      <path d="M10 6v4.5M14 6v4.5" />
    </svg>
  );
}

const OPERATION_ICONS: ReactNode[] = [
  <IconDesign key="design" />,
  <IconCut key="cut" />,
  <IconPrint key="print" />,
  <IconStitch key="stitch" />,
  <IconRecord key="record" />,
  <IconCarton key="carton" />,
];
