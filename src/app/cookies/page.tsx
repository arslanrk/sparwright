import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/content/LegalPage";
import { CookieSettings } from "@/components/navigation/CookieSettings";

/**
 * Cookies — Design System §11 Legal row.
 *
 * §11 calls the third legal link "cookie settings", so this page carries the
 * control as well as the explanation: a visitor who accepted or declined can
 * change their mind here rather than clearing site data.
 *
 * The description is accurate for the site as it stands today. Analytics ship
 * in PR 12 and are gated on the choice recorded here, so this page and that one
 * have to be revisited together.
 */

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "What this site stores in your browser, what it does not, and how to change your choice.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "The short version",
    paragraphs: [
      "This site stores one thing in your browser by default: whether you accepted or declined analytics cookies. That choice stays on your device and is never sent to us.",
    ],
  },
  {
    heading: "Essential storage",
    paragraphs: [
      "Your cookie choice is kept in your browser's local storage so the banner does not ask again on every page. There is no way to switch this off other than declining to use the site — without it we cannot remember that you said no.",
    ],
  },
  {
    heading: "Analytics cookies",
    paragraphs: [
      "If you accept analytics, we measure which products buyers look at and which steps of the quote request they complete, so we can fix the parts that are not working. It tells us about pages and journeys, not about you personally.",
      "If you choose essential only, nothing analytics-related runs. The site works exactly the same.",
    ],
  },
  {
    heading: "What we do not do",
    bullets: [
      "No advertising or retargeting cookies.",
      "No sharing of your browsing with advertising networks.",
      "No tracking across other websites.",
      "No cookies that identify you personally.",
    ],
  },
  {
    heading: "Changing your mind",
    paragraphs: [
      "Use the control below at any time. Clearing your browser's site data for this site also resets the choice, and the banner will ask again on your next visit.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      intro="What this site stores in your browser, what it does not, and how to change your choice."
      updated="September 2026"
      sections={SECTIONS}
      footer={<CookieSettings />}
    />
  );
}
