import { Section } from "@/components/foundation/Container";

/**
 * ProofBar — Design System §08 Proof bar.
 *
 * Sits immediately after the hero. Four concise, factual trust points; §08 and
 * non-negotiable #5 forbid invented customer totals, reorder rates or
 * satisfaction scores, so nothing here is a number we cannot stand behind.
 */

export type ProofPoint = { title: string; description: string };

type ProofBarProps = {
  points: ProofPoint[];
};

export function ProofBar({ points }: ProofBarProps) {
  return (
    <Section theme="white" density="compact" width="work">
      <ul className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] lg:grid-cols-4">
        {points.map((point) => (
          <li key={point.title}>
            <p className="font-display text-heading-4">{point.title}</p>
            <p className="mt-1 text-small text-[var(--color-text-secondary)]">
              {point.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
