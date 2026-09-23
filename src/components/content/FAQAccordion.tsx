import { cn } from "@/lib/cn";
import type { ProductFaq } from "@/lib/products";

/**
 * FAQAccordion — Design System §08 FAQ accordion, §12 Accessibility, §07 Motion.
 *
 * Built on native `<details>`/`<summary>`. §12 requires accordions to be
 * keyboard-operable, and the platform gives that away for free here: Enter and
 * Space toggle, the open state is exposed to assistive technology without any
 * `aria-expanded` bookkeeping, and the whole thing works before — or without —
 * JavaScript. Answers are in the HTML whether or not they are open, so search
 * engines read them all. A scripted button-and-region version would be more
 * code for a worse result.
 *
 * Each question is a row; an open one lifts into a card on the band's surface
 * with a Forge edge, and its plus turns into a close mark. Where the browser
 * supports it the answer eases open (`.faq-item` in globals.css); elsewhere it
 * simply appears.
 *
 * One answer at a time: every item carries the same `name`, which makes the
 * browser close the open one when another opens — across separate accordions
 * too, so a grouped list behaves as one. That is native behaviour, so it needs
 * no script, and a browser without it simply lets several stay open. The
 * answers are in the HTML either way, closed or not.
 *
 * A server component: there is no state to hold.
 */

type FAQAccordionProps = {
  items: ProductFaq[];
  /**
   * Number the questions from this value. Lets a grouped list keep one
   * running count across its groups. Omit for no numbers.
   */
  start?: number;
  /**
   * Exclusive group. Accordions on one page that share a name open one answer
   * between them.
   */
  name?: string;
  /** Open the first question on load. */
  openFirst?: boolean;
  className?: string;
};

export function FAQAccordion({
  items,
  start,
  name = "faq",
  openFirst = false,
  className,
}: FAQAccordionProps) {
  const numbered = start !== undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item, i) => (
        <details
          key={item.question}
          name={name}
          open={openFirst && i === 0}
          className={cn(
            "faq-item group rounded-xl border border-[var(--color-border)] transition-[background-color,border-color,box-shadow] duration-200 ease-standard",
            "hover:border-[var(--color-border-strong)]",
            "open:border-transparent open:bg-[var(--color-surface)] open:shadow-[inset_3px_0_0_var(--color-action)]",
          )}
        >
          <summary
            className={cn(
              // The default triangle is replaced by the mark on the right.
              "flex cursor-pointer list-none items-start gap-[var(--space-4)] rounded-xl px-[var(--space-5)] py-[var(--space-4)]",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            {numbered ? (
              <span
                aria-hidden="true"
                className="mt-1 w-6 shrink-0 font-display text-small font-bold tabular-nums text-[var(--color-text-muted)] transition-colors group-open:text-[var(--color-action-text)]"
              >
                {String(start + i).padStart(2, "0")}
              </span>
            ) : null}
            <span className="flex-1 font-body text-body-large font-semibold leading-snug text-[var(--color-text)]">
              {item.question}
            </span>
            <ToggleMark />
          </summary>
          <div
            className={cn(
              "pb-[var(--space-5)] pr-[var(--space-5)] text-body sm:pr-[var(--space-7)] text-[var(--color-text-secondary)]",
              // Aligned under the question text, not under the number.
              numbered
                ? "pl-[calc(var(--space-5)+1.5rem+var(--space-4))]"
                : "pl-[var(--space-5)]",
            )}
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

/** A plus in a ring; open, it turns a quarter-and-a-half into a close mark. */
function ToggleMark() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)]",
        "transition-[background-color,border-color,color] duration-200",
        "group-hover:border-[var(--color-border-strong)]",
        "group-open:border-transparent group-open:bg-[var(--color-text)] group-open:text-[var(--color-bg)]",
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 transition-transform duration-200 ease-standard group-open:rotate-45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      >
        <path d="M8 3v10M3 8h10" />
      </svg>
    </span>
  );
}
