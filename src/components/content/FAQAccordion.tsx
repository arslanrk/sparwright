import { cn } from "@/lib/cn";
import type { ProductFaq } from "@/lib/products";

/**
 * FAQAccordion — Design System §08 FAQ accordion, §12 Accessibility, §07 Motion.
 *
 * Built on native `<details>`/`<summary>`. §12 requires accordions to be
 * keyboard-operable, and the platform gives that away for free here: Enter and
 * Space toggle, the open state is exposed to assistive technology without any
 * `aria-expanded` bookkeeping, and the whole thing works before — or without —
 * JavaScript. A scripted button-and-region version would be more code for a
 * worse result.
 *
 * Answers stay open independently. §08 does not ask for a one-at-a-time
 * accordion, and closing someone's answer because they opened another one is a
 * small hostility on a page whose job is to answer questions.
 *
 * A server component: there is no state to hold.
 */

type FAQAccordionProps = {
  items: ProductFaq[];
  className?: string;
};

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group border-b border-[var(--color-border)]"
        >
          <summary
            className={cn(
              // The default triangle is replaced by the chevron below.
              "flex cursor-pointer list-none items-start justify-between gap-[var(--space-4)]",
              "py-[var(--space-4)] font-body text-body-large font-semibold text-[var(--color-text)]",
              "transition-colors hover:text-[var(--color-link-hover)]",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <span>{item.question}</span>
            <Chevron />
          </summary>
          <div className="pb-[var(--space-5)] pr-[var(--space-6)] text-body text-[var(--color-text-secondary)]">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-1.5 size-4 shrink-0 transition-transform group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
