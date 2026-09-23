import Image, { type StaticImageData } from "next/image";
import { Button, type ButtonVariant } from "@/components/foundation/Button";
import { cn } from "@/lib/cn";

/**
 * AudienceCard — Design System §11 Launch architecture, §A Starter copy.
 *
 * One card per audience pathway: a wide dark banner with the copy held on the
 * left and the figures filling the right.
 *
 * THE CARD IS DARK BECAUSE THE PHOTOGRAPH IS A CUT-OUT. These are figures on a
 * transparent ground, lit with a cool rim light down the outer arms so they
 * separate from what is behind them. That rim only reads against a dark
 * surface; on the white card this used to be, it inverted into a pale halo and
 * the figures looked pasted on. The surface follows the photograph.
 *
 * NO DESCRIPTION PARAGRAPH. The card carries an eyebrow, a heading and an
 * action, and nothing else — at this width a paragraph pushed the card to
 * twice the height and made the figures too small to read. What the paragraph
 * said belongs on the page the card opens, which is the point of the card.
 *
 * `object-contain`, not `cover`. Cover was cropping the boxer's leading glove
 * off the left edge: the source is square, and any column narrower than it
 * trims both sides to fill. The column is half the card so it sits close to
 * square, which means contain costs a few pixels of gap rather than a visible
 * letterbox, and nothing is cut. `object-bottom` keeps the figures standing on
 * the card's lower edge, so what little slack there is lands above their heads.
 */

export type AudienceCardItem = {
  eyebrow: string;
  title: string;
  href: string;
  action: string;
  /**
   * Defaults to the Forge fill. Pass "secondary" for the outlined form — white
   * rule and white label on the card's own black — so that two banners sitting
   * side by side are not both shouting. §04 keeps Forge for the action that
   * matters most, and these two are not equals: the club pathway is the wider
   * door, and private label is the specialist one behind it.
   */
  actionVariant?: ButtonVariant;
  /** §09 shot this card is waiting on, if the photograph does not exist yet. */
  shot?: string;
  /** Cut-out figures on a transparent ground. src and alt travel together. */
  photo?: { src: StaticImageData; alt: string };
};

export function AudienceCard({
  item,
  className,
}: {
  item: AudienceCardItem;
  className?: string;
}) {
  return (
    <article
      data-theme="dark"
      className={cn(
        "h-full overflow-hidden rounded-lg bg-[var(--color-bg)] text-[var(--color-text)]",
        className,
      )}
    >
      {/*
        Stacked below `sm` — at phone width a two-column split leaves neither
        the copy nor the figures enough room. The figures lead there, because a
        banner that opens with a label and a line of type is just a link.
      */}
      <div className="grid h-full sm:min-h-[17rem] sm:grid-cols-[1fr_minmax(0,42%)]">
        <div className="order-2 flex flex-col justify-center p-[var(--space-6)] sm:order-1">
          <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
            {item.eyebrow}
          </p>
          {/*
            heading-4, not the heading-3 a section card usually takes. The copy
            column is around half of a 555px card, and heading-3 broke a
            six-word title across three lines.
          */}
          <h3 className="mt-3 text-heading-4">{item.title}</h3>
          <div className="mt-[var(--space-5)]">
            <Button href={item.href} variant={item.actionVariant ?? "primary"}>
              {item.action}
            </Button>
          </div>
        </div>

        <AudienceFigure item={item} />
      </div>
    </article>
  );
}

/** The cut-out where one exists, otherwise the brief it is waiting on. */
function AudienceFigure({ item }: { item: AudienceCardItem }) {
  if (!item.photo) {
    return (
      <div className="order-1 flex aspect-[4/3] w-full items-end bg-white/[0.04] p-[var(--space-5)] sm:order-2 sm:aspect-auto">
        <div>
          <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
            Photograph required
          </p>
          <p className="mt-1 text-small text-[var(--color-text-secondary)]">
            {item.shot}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative order-1 aspect-[4/3] w-full sm:order-2 sm:aspect-auto">
      <Image
        src={item.photo.src}
        alt={item.photo.alt}
        fill
        // The right-hand column of one of two cards inside the work container.
        sizes="(min-width: 1024px) 290px, 100vw"
        className="object-contain object-bottom"
      />
    </div>
  );
}
