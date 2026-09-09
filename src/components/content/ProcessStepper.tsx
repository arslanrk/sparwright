import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";

/**
 * ProcessStepper — Design System §08 Process stepper.
 *
 * Five stages, each stated as the outcome for the buyer rather than as our
 * internal workflow (§10 Direct, Specific). The stage number is one of the two
 * places §04 permits Forge outside an action.
 *
 * `id` matters: the header's "How It Works" item links to this section.
 */

export type ProcessStage = {
  /** 01–05. */
  number: string;
  title: string;
  outcome: string;
};

type ProcessStepperProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  stages: ProcessStage[];
};

export function ProcessStepper({
  id,
  eyebrow,
  title,
  description,
  stages,
}: ProcessStepperProps) {
  return (
    <Section id={id} theme="light" width="work">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <ol className="mt-[var(--space-7)] grid gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-5">
        {stages.map((stage) => (
          <li
            key={stage.number}
            className="border-t-2 border-[var(--color-border)] pt-[var(--space-4)]"
          >
            <p className="font-display text-heading-4 text-[var(--color-action-text)]">
              {stage.number}
            </p>
            <h3 className="mt-2 font-body text-body-large font-semibold">
              {stage.title}
            </h3>
            <p className="mt-2 text-small text-[var(--color-text-secondary)]">
              {stage.outcome}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
