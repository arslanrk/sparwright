import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";

/**
 * CallToAction — Design System §04 Action band, §08 Button system.
 *
 * The Forge band is for short conversion moments only; §04 forbids long
 * paragraphs on red, so this takes one heading, one supporting line and one
 * action. On the action band the button renders inverse (§08).
 */

type CallToActionProps = {
  title: string;
  description: string;
  action: { label: string; href: string };
};

export function CallToAction({
  title,
  description,
  action,
}: CallToActionProps) {
  return (
    <Section theme="action" width="work">
      <div className="flex flex-col gap-[var(--space-5)] lg:flex-row lg:items-center lg:justify-between lg:gap-[var(--space-7)]">
        <div className="max-w-copy">
          <h2 className="text-heading-2">{title}</h2>
          <p className="mt-3 text-body-large">{description}</p>
        </div>
        <div className="shrink-0">
          <Button href={action.href} variant="inverse" arrow>
            {action.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
