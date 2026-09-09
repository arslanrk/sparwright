import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Container and Section — Design System §06 Layout and §13 Foundation utilities.
 *
 * Container fixes the reading width; Section supplies the vertical rhythm and
 * the §04 theme recipe for a band. Compose them: a Section renders a Container
 * for you unless you opt out with `contained={false}`.
 */

/** §06 container system. `copy` is the 720px "Prose" container. */
const CONTAINER_WIDTHS = {
  shell: "max-w-shell", // 1280px — primary page sections
  work: "max-w-work", // 1200px — content and component grids
  copy: "max-w-copy", // 720px — long-form copy, FAQs, manufacturing explanations
  form: "max-w-form", // 640px — quote, mockup and sampling workflows
} as const;

export type ContainerWidth = keyof typeof CONTAINER_WIDTHS;

/** §06 outer margins: 20px mobile, 24px tablet, 32px desktop. */
const OUTER_MARGIN = "px-5 md:px-6 lg:px-8";

type ContainerProps = {
  width?: ContainerWidth;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({
  width = "work",
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        OUTER_MARGIN,
        CONTAINER_WIDTHS[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** §04 theme recipes. A section overrides the page roles for its own band. */
export type SectionTheme = "light" | "white" | "dark" | "action";

type SectionProps = {
  theme?: SectionTheme;
  /** Width of the container this section renders around its children. */
  width?: ContainerWidth;
  /** Opt out of the container for full-bleed content. */
  contained?: boolean;
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  theme = "light",
  width = "work",
  contained = true,
  as: Tag = "section",
  id,
  className,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-theme={theme}
      className={cn("section-band", className)}
    >
      {contained ? <Container width={width}>{children}</Container> : children}
    </Tag>
  );
}
