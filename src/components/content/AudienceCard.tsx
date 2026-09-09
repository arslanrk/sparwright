import { Button } from "@/components/foundation/Button";
import { cn } from "@/lib/cn";

/**
 * AudienceCard — Design System §11 Launch architecture, §A Starter copy.
 *
 * One card per audience pathway. The heading and body are the audience page's
 * own hero copy from §A, so the promise the visitor reads here is the promise
 * the page opens with.
 */

export type AudienceCardItem = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  action: string;
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
      className={cn(
        "flex h-full flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-[var(--space-6)]",
        className,
      )}
    >
      <p className="text-eyebrow uppercase text-[var(--color-text-muted)]">
        {item.eyebrow}
      </p>
      <h3 className="mt-3 text-heading-3">{item.title}</h3>
      <p className="mt-4 text-body-large text-[var(--color-text-secondary)]">
        {item.description}
      </p>
      <div className="mt-auto pt-[var(--space-6)]">
        <Button href={item.href} variant="secondary">
          {item.action}
        </Button>
      </div>
    </article>
  );
}
