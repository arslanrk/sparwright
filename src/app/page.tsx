import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { Logo } from "@/components/foundation/Logo";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { CTA } from "@/components/foundation/cta";

/**
 * Holding page. PR 4 builds the real homepage against the §11 section order;
 * until then this exercises the foundation primitives on a light and a dark
 * band. The CTAs point at their planned destinations, which arrive in PR 5
 * (/products) and PR 9 (/quote).
 */
export default function Home() {
  return (
    <>
      <Section theme="light" width="copy" as="main">
        <Logo variant="primary" clearSpace={false} />
        <SectionHeader
          as="h1"
          eyebrow="Custom fight-gear manufacturing"
          title="Custom fight gear for clubs and brands."
          description="Boxing gloves, fightwear and club apparel manufactured in Sialkot with your logo, colours and specifications."
          className="mt-8"
        />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/quote" variant="primary" arrow>
            {CTA.mockup}
          </Button>
          <Button href="/products" variant="secondary">
            {CTA.products}
          </Button>
        </div>
        <div className="mt-6">
          <TextLink href="/products">{CTA.exploreGloves}</TextLink>
        </div>
      </Section>

      <Section theme="dark" width="copy">
        <SectionHeader
          eyebrow="Manufacturing"
          title="Ten years of hands-on fight-gear manufacturing experience."
          description="Based in Sialkot, our production work is built around clear product requirements, approved samples and checks before dispatch."
        />
        <div className="mt-8">
          <Button href="/manufacturing" variant="inverse" arrow>
            {CTA.manufacturing}
          </Button>
        </div>
      </Section>
    </>
  );
}
