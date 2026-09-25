import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FramedPhoto } from "@/components/content/AudienceBlocks";
import { CallToAction } from "@/components/content/CallToAction";
import {
  ConceptStudio,
  type Colourway,
  type ConceptLogo,
  type ConceptProduct,
} from "@/components/content/ConceptStudio";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { HeroSlider, type HeroSlide } from "@/components/content/HeroSlider";
import { RolePanels, type RolePanel } from "@/components/content/RolePanels";
import {
  ColourStudy,
  IconTiles,
  PointList,
  SpecPhoto,
  SpecSheet,
  type SpecArea,
  type SpecIcon,
} from "@/components/content/SpecSheet";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import type { ProductFaq } from "@/lib/products";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import boxingClubsBanner from "../../../public/images/boxing-clubs-banner.jpg";
import factoryFloor from "../../../public/images/boxing-glove-factory-floor.jpg";
import gloveStrikeWhiteRedBlack from "../../../public/images/concept/boxing-gloves_strike_white-red-black.jpg";
import gloveStrikeBlackRed from "../../../public/images/concept/boxing-gloves_strike_black-red.jpg";
import gloveStrikeBlackTan from "../../../public/images/concept/boxing-gloves_strike_black-tan.jpg";
import gloveClassicWhiteRedBlack from "../../../public/images/concept/boxing-gloves_classic_white-red-black.jpg";
import gloveClassicBlackRed from "../../../public/images/concept/boxing-gloves_classic_black-red.jpg";
import gloveClassicBlackTan from "../../../public/images/concept/boxing-gloves_classic_black-tan.jpg";
import gloveCrackleWhiteRedBlack from "../../../public/images/concept/boxing-gloves_crackle_white-red-black.jpg";
import gloveCrackleBlackRed from "../../../public/images/concept/boxing-gloves_crackle_black-red.jpg";
import gloveCrackleBlackTan from "../../../public/images/concept/boxing-gloves_crackle_black-tan.jpg";
import roleMembers from "../../../public/images/for-clubs/members.jpg";
import roleCoaches from "../../../public/images/for-clubs/coach.jpg";
import roleTeam from "../../../public/images/for-clubs/team.png";
import roleFighters from "../../../public/images/mma-fighter.jpg";
import clubApparelGroup from "../../../public/images/club-apparel-group.webp";
import gymAthletes from "../../../public/images/gyms-and-academies.png";
import mmaAcademiesBanner from "../../../public/images/mma-academies-banner.jpg";
import specExploded from "../../../public/images/exploded-boxing-glove.jpg";
import specPacking from "../../../public/images/packing-and-export.jpg";
import specPrinting from "../../../public/images/printing-and-decoration.jpg";

/**
 * Gyms & Academies — Design System §11 For Clubs template.
 *
 * The primary audience page. Named as the navbar and the homepage card name
 * it; the route stays /for-clubs so existing links hold.
 *
 * Sections run from who the kit is for to what happens after the order:
 *
 *   hero slider dark · 01 who it is for white · 02 what can be specified
 *   light · 03 product lines white · 04 one product or a full kit dark ·
 *   05 sizes and planning light · 06 the brief white · 07 sample before bulk
 *   dark · 08 reorders light · 09 FAQ white · closing CTA action
 *
 * Two adjacent sections never share a surface. The page's one h1 is the
 * slider's (screen-reader only); every section below opens with an h2.
 *
 * Every product line links to its page (03), and every action goes where the
 * internal linking plan sends it: mockups and "Build Your Club Kit" to
 * /quote?intent=mockup, briefs and quotes to /quote, the process to
 * /manufacturing. No MOQ, price, lead time or certification anywhere —
 * non-negotiables #5 and #6; the FAQ answers both by saying how they are set.
 */

export const metadata: Metadata = pageMetadata({
  path: "/for-clubs",
  title: "Custom Gym and Club Kit Manufacturer",
  description:
    "Custom boxing and MMA gloves, fightwear, protective gear and club apparel for gyms and academies — in your colours, with your logo, sized for every member.",
});

const PAGE = {
  gloves: "/products/custom-boxing-gloves",
  mma: "/products/custom-mma-gloves",
  pads: "/products/custom-pads-bags-mitts",
  protective: "/products/custom-protective-gear",
  apparel: "/products/fightwear-club-apparel",
  lifting: "/products/custom-lifting-belts",
};

/** The hero's one action, the same on every slide. */
function MockupAction({ slide }: { slide: string }) {
  return (
    <Button
      href="/quote?intent=mockup"
      variant="primary"
      arrow
      data-analytics="hero_mockup_click"
      data-analytics-surface={`clubs_hero_${slide}`}
    >
      {CTA.mockup}
    </Button>
  );
}

/**
 * One slide per kind of club. Each product links to the page that covers
 * it, so the hero is also the page's first route into the range.
 */
const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Boxing clubs",
    title: "Custom boxing gear for your club.",
    description:
      "Equip members, fighters and coaches with boxing gloves, pads, protective equipment and training gear made around your club colours, branding and product requirements.",
    products: [
      { label: "Boxing Gloves", href: PAGE.gloves },
      { label: "Focus Mitts & Pads", href: PAGE.pads },
      { label: "Punch Bags", href: PAGE.pads },
      { label: "Protective Gear", href: PAGE.protective },
    ],
    action: <MockupAction slide="boxing" />,
    photo: {
      src: boxingClubsBanner,
      alt: "Boxers of every level in one gym: a fighter in a head guard, a woman in white gloves, a coach holding focus mitts and junior members on the bag.",
      // Cropped to its figures — the right-hand photo area on a desktop, a
      // strip on a phone — centred on the boxer in white gloves.
      position: "62% center",
      layout: "full",
    },
  },
  {
    eyebrow: "MMA & martial arts",
    title: "Custom MMA gear built around your academy.",
    description:
      "Create MMA gloves, shin protection, grappling gear and fightwear around the way your members train, compete and represent your academy.",
    products: [
      { label: "MMA Gloves", href: PAGE.mma },
      { label: "Shin Guards", href: PAGE.mma },
      { label: "Grappling Gear", href: PAGE.mma },
      { label: "Rashguards & Fight Shorts", href: PAGE.apparel },
    ],
    action: <MockupAction slide="mma" />,
    photo: {
      src: mmaAcademiesBanner,
      alt: "Martial artists in a caged training gym: an MMA fighter in fight shorts and hand wraps, a woman in open-palm MMA gloves, a kickboxer, a fighter at the heavy bag and a martial artist wrapping his hands.",
      // Shown whole from xl; where it is cropped (the right-hand area, or a
      // strip on a phone) it centres on the woman in MMA gloves.
      position: "58% center",
      layout: "full",
    },
  },
  {
    eyebrow: "Fightwear & club apparel",
    title: "Take your club identity beyond the training floor.",
    description:
      "Bring your colours and branding across fightwear and apparel for fighters, coaches and members — from competition gear to everyday club clothing.",
    products: [
      { label: "Fight Shorts", href: PAGE.apparel },
      { label: "Rashguards", href: PAGE.apparel },
      { label: "T-Shirts", href: PAGE.apparel },
      { label: "Hoodies", href: PAGE.apparel },
      { label: "Tracksuits", href: PAGE.apparel },
    ],
    action: <MockupAction slide="apparel" />,
    // The six models in public/images/modals, composed into one transparent
    // group (public/images/club-apparel-group.webp): models 4 and 6 front and
    // centre at full size, 1 and 5 behind on the left, 3 and 2 on the right,
    // smaller and dimmed.
    photo: {
      src: clubApparelGroup,
      alt: "Six club members standing together in training apparel: at the front a long-sleeve top with striped leggings and a colour-block jacket with joggers, behind them a sports bra and leggings, a pullover hoodie, a T-shirt and shorts, and a matching pink set.",
      layout: "cutout",
    },
  },
];

/* -- 01 · For the way your club trains ------------------------------------ */

/**
 * The four people a club kits out — each a different requirement, each a
 * panel in the section's expanding strip, with the products it points to.
 * Full-size photographs: the MMA fighter is the site's own original, the
 * member, the coach and the team supplied for this section.
 */
const ROLES: RolePanel[] = [
  {
    label: "Members",
    title: "Equip the people who train every week.",
    description:
      "Gloves, protective gear and other training products planned around use, size and session requirements.",
    products: [
      { label: "Boxing gloves", href: PAGE.gloves },
      { label: "MMA gloves", href: PAGE.mma },
      { label: "Protective gear", href: PAGE.protective },
    ],
    photo: {
      src: roleMembers,
      alt: "A club member in blue boxing gloves working a heavy bag among rows of punch bags in the gym.",
      position: "42% 40%",
      side: "right",
    },
  },
  {
    label: "Coaches",
    title: "Give coaches the right tools for drills.",
    description:
      "Focus mitts, Thai pads, kicking shields, training sticks and punch bags for everyday coaching.",
    products: [
      { label: "Focus mitts", href: PAGE.pads },
      { label: "Thai pads", href: PAGE.pads },
      { label: "Punch bags", href: PAGE.pads },
    ],
    photo: {
      src: roleCoaches,
      alt: "A coach in a black vest and red shin guards holding up focus mitts in the gym.",
      // Cropped to the coach alone; weighted right so he clears the type.
      position: "70% 25%",
    },
  },
  {
    label: "Fighters",
    title: "Separate training, sparring and competition needs.",
    description:
      "Different uses can require different glove weights, protection and equipment specifications.",
    products: [
      { label: "Sparring gloves", href: PAGE.gloves },
      { label: "MMA gloves", href: PAGE.mma },
      { label: "Shin guards", href: PAGE.mma },
    ],
    photo: {
      src: roleFighters,
      alt: "An MMA fighter throwing a jab in open-palm MMA gloves with red wrist straps, in front of a training cage.",
      position: "center 30%",
    },
  },
  {
    label: "Team",
    title: "Carry the club identity beyond the training floor.",
    description:
      "Fight shorts, rashguards, T-shirts, hoodies and tracksuits built around the same club colours and branding.",
    products: [
      { label: "Fight shorts", href: PAGE.apparel },
      { label: "Rashguards", href: PAGE.apparel },
      { label: "Hoodies & tracksuits", href: PAGE.apparel },
    ],
    photo: {
      src: roleTeam,
      alt: "Three club members in matching black and red Sparwright training kit — a sports bra and shorts, a T-shirt and shorts, and a long-sleeve top and leggings.",
      position: "52% 30%",
    },
  },
];

/* -- 02 · Made to your requirements --------------------------------------- */

const BRANDING_METHODS: { label: string; icon: SpecIcon }[] = [
  { label: "Print", icon: "print" },
  { label: "Embroidery", icon: "embroidery" },
  { label: "Sublimation", icon: "sublimation" },
  { label: "Embossing", icon: "embossing" },
  { label: "Patches", icon: "patch" },
  { label: "Woven labels", icon: "label" },
];

const CONSTRUCTION_POINTS = [
  "Shell or fabric",
  "Padding",
  "Closure",
  "Stitching",
  "Sizing",
  "Finish",
  "Branding placement",
];

const PACKAGING_ITEMS: { label: string; icon: SpecIcon }[] = [
  { label: "Polybags", icon: "polybag" },
  { label: "Retail boxes", icon: "box" },
  { label: "Inserts", icon: "insert" },
  { label: "Labels", icon: "tag" },
  { label: "Export cartons", icon: "carton" },
];

/** The four areas of a club specification, as sheet tabs. */
const SPEC_AREAS: SpecArea[] = [
  {
    code: "BR",
    title: "Club branding",
    summary: "Crest, wordmark and sponsors",
    body: (
      <>
        <p>
          Add your club crest, wordmark, sponsor artwork or other approved
          branding. Depending on the product and material, available methods
          can include:
        </p>
        <IconTiles items={BRANDING_METHODS} columns={2} />
      </>
    ),
    visual: (
      <SpecPhoto
        src={specPrinting}
        alt="An operator at a wide-format sublimation printer as a printed club design feeds out."
        tag="Decoration"
        position="center 40%"
      />
    ),
  },
  {
    code: "CO",
    title: "Club colours",
    summary: "Matched to your references",
    body: (
      <>
        <p>Supply colour codes or a physical colour reference where available.</p>
        <p>
          Because different materials can reproduce colour differently, the
          relevant appearance is confirmed through the product and sample
          process.
        </p>
      </>
    ),
    visual: <ColourStudy />,
  },
  {
    code: "CN",
    title: "Product construction",
    summary: "What it is made of, and how",
    body: (
      <>
        <p>Depending on the product, your specification may cover:</p>
        <PointList items={CONSTRUCTION_POINTS} />
      </>
    ),
    visual: (
      <SpecPhoto
        src={specExploded}
        alt="A leather boxing glove shown exploded into its cuff, lace closure, woven label and padding layers."
        tag="Construction"
        position="center 45%"
      />
    ),
  },
  {
    code: "PK",
    title: "Packaging",
    summary: "How it arrives",
    body: (
      <>
        <p>
          Where required, the manufacturing brief can also define polybags,
          retail boxes, inserts, labels and export cartons.
        </p>
        <IconTiles items={PACKAGING_ITEMS} columns={2} />
      </>
    ),
    visual: (
      <SpecPhoto
        src={specPacking}
        alt="Shelves of packed and labelled export cartons in the Sparwright warehouse."
        tag="Packing"
        position="center 40%"
      />
    ),
  },
];

/*
 * The concept studio: sample logos (club marks, not real clubs) and the
 * product concepts it switches between. Each concept is one photograph in
 * public/images/concept; `patches` are where its logo label sits, in percent
 * of the square frame — they also cover the marks the source photographs
 * carry.
 */
const CONCEPT_LOGOS: ConceptLogo[] = [
  {
    id: "crest",
    label: "Crest",
    mark: (
      <svg viewBox="0 0 40 40" className="h-full w-auto" fill="none">
        <path d="M20 3 6 8v11c0 9 6 15 14 18 8-3 14-9 14-18V8Z" fill="currentColor" />
        <path d="M13 24 27 12" stroke="#D83A20" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "monogram",
    label: "Monogram",
    mark: (
      <svg viewBox="0 0 40 40" className="h-full w-auto" fill="none">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" />
        <path d="M13 13v14M13 20l7-7M13 20l7 7M24 13v14h5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "wordmark",
    label: "Wordmark",
    mark: (
      <svg viewBox="0 0 64 28" className="h-full w-auto" fill="none">
        <path d="M4 4h56L54 14l6 10H4l6-10Z" fill="#D83A20" />
        <text x="32" y="18" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="800" fill="currentColor" letterSpacing="1">CLUB</text>
      </svg>
    ),
  },
];

/** The nine glove photographs, one per design and colourway. */
const GLOVE_PHOTOS: Record<string, StaticImageData> = {
  "strike_white-red-black": gloveStrikeWhiteRedBlack,
  "strike_black-red": gloveStrikeBlackRed,
  "strike_black-tan": gloveStrikeBlackTan,
  "classic_white-red-black": gloveClassicWhiteRedBlack,
  "classic_black-red": gloveClassicBlackRed,
  "classic_black-tan": gloveClassicBlackTan,
  "crackle_white-red-black": gloveCrackleWhiteRedBlack,
  "crackle_black-red": gloveCrackleBlackRed,
  "crackle_black-tan": gloveCrackleBlackTan,
};

const GLOVE_DESIGNS = [
  { id: "strike", label: "Strike" },
  { id: "classic", label: "Classic" },
  { id: "crackle", label: "Crackle" },
];

const GLOVE_COLOURWAYS: Colourway[] = [
  { id: "white-red-black", label: "White, red and black", swatches: ["#F4F2EE", "#9E1F1F", "#0B0D10"] },
  { id: "black-red", label: "Black and fight red", swatches: ["#0B0D10", "#E0281E", "#5A5E66"] },
  // The tan strap takes a dark logo; light would disappear on it.
  { id: "black-tan", label: "Black and tan", swatches: ["#0B0D10", "#B98A57", "#EFE3CF"], logoInk: "#1A1510" },
];

const GLOVE_DESIGN_TEXT: Record<string, string> = {
  strike: "an angular strike pattern",
  classic: "a plain shell and a thin piped edge",
  crackle: "an all-over crackle pattern",
};
const GLOVE_COLOUR_TEXT: Record<string, string> = {
  "white-red-black": "White boxing gloves in deep red and black",
  "black-red": "Black boxing gloves in fight red",
  "black-tan": "Black boxing gloves with tan detailing and tan wrist straps",
};

const CONCEPT_PRODUCTS: ConceptProduct[] = [
  {
    id: "gloves",
    label: "Boxing gloves",
    designs: GLOVE_DESIGNS,
    colourways: GLOVE_COLOURWAYS,
    // Every glove photograph shares one framing; the wrist panels are blank,
    // so the logo sits on them directly.
    patches: [
      { x: 27.5, y: 73.5, w: 20, h: 12.5, ground: "transparent", ink: "#E8E8E8" },
      { x: 72.2, y: 73.5, w: 20, h: 12.5, ground: "transparent", ink: "#E8E8E8" },
    ],
    photos: Object.fromEntries(
      GLOVE_DESIGNS.flatMap((d) =>
        GLOVE_COLOURWAYS.map((c) => [
          `${d.id}_${c.id}`,
          {
            src: GLOVE_PHOTOS[`${d.id}_${c.id}`],
            alt: `${GLOVE_COLOUR_TEXT[c.id]}, ${GLOVE_DESIGN_TEXT[d.id]}, the club logo on each wrist strap.`,
          },
        ]),
      ),
    ),
  },
];

/** Icons for the three steps from a logo to a sample: send, define, approve. */
const STEP_ICONS = [
  <svg key="send" viewBox="0 0 24 24" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>,
  <svg key="define" viewBox="0 0 24 24" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>,
  <svg key="approve" viewBox="0 0 24 24" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>,
];

/** From only a logo and an idea to an approved sample. */
const LOGO_TO_SAMPLE = [
  { title: "Send what you have", description: "The product, your logo, a rough quantity, any colours or references." },
  { title: "Define what is left", description: "The remaining product decisions are identified with you." },
  { title: "Approve the sample", description: "Nothing goes to bulk until the sample is signed off." },
];

/* -- 03 · Equipment and apparel ------------------------------------------- */

const PRODUCT_LINES = [
  {
    title: "Custom boxing gloves",
    description:
      "Training, sparring, bag, competition and junior boxing gloves can be developed around intended use, agreed construction, club colours and branding.",
    link: { label: CTA.exploreGloves, href: PAGE.gloves },
  },
  {
    title: "Custom MMA gloves and gear",
    description:
      "Custom options include MMA fight gloves, sparring gloves, grappling and hybrid gloves, shin guards and junior MMA gloves.",
    link: { label: CTA.exploreMMA, href: PAGE.mma },
  },
  {
    title: "Pads, mitts and punch bags",
    description:
      "Build branded training equipment for coaches and gym sessions, including focus mitts, Thai pads, kicking shields, paddle mitts, training sticks and punch bags.",
    link: { label: CTA.explorePads, href: PAGE.pads },
  },
  {
    title: "Protective gear",
    description:
      "Customise equipment such as head guards, chest and body protectors, groin guards, shin and instep guards, hand wraps and other protective products.",
    link: { label: CTA.exploreProtective, href: PAGE.protective },
  },
  {
    title: "Fightwear and club apparel",
    description:
      "Carry your identity onto fight shorts, boxing trunks, rashguards, compression wear, T-shirts, hoodies, sweatshirts and tracksuits.",
    link: { label: CTA.exploreClubApparel, href: PAGE.apparel },
  },
  {
    title: "Strength and lifting gear",
    description:
      "For facilities that combine combat training with strength work, the range also includes lifting belts, training belts, straps, grips and weightlifting gloves.",
    link: { label: CTA.exploreLifting, href: PAGE.lifting },
  },
];

/* -- 04 · One product or a complete club range ---------------------------- */

const SINGLE_STARTS = [
  "Custom boxing gloves for members",
  "New pads for coaches",
  "Protective equipment",
  "Branded rashguards",
  "Club hoodies or tracksuits",
];

const CLUB_KIT = [
  {
    title: "Training floor",
    items: [
      "Boxing gloves",
      "MMA gloves",
      "Focus mitts",
      "Thai pads",
      "Punch bags",
      "Protective gear",
    ],
  },
  {
    title: "Fighters",
    items: [
      "Sparring equipment",
      "Fight shorts",
      "Rashguards",
      "Protective equipment",
    ],
  },
  {
    title: "Club apparel",
    items: ["T-shirts", "Hoodies", "Sweatshirts", "Tracksuits"],
  },
];

/* -- 05 · Sizes and order planning ---------------------------------------- */

const PLANNING = [
  {
    title: "Different equipment for different uses",
    description:
      "A glove intended for sparring does not necessarily have the same requirement as one intended for bag work or another training purpose. Tell us how the product will be used so the relevant specification can be discussed before sampling.",
  },
  {
    title: "Junior and adult requirements",
    description:
      "Where the product is available across junior and adult options, include the expected mix in your brief.",
  },
  {
    title: "Apparel size breakdowns",
    description:
      "For fightwear and club apparel, provide the expected size mix when you know it. If the final breakdown is not ready at the enquiry stage, begin with the information you have.",
  },
  {
    title: "Ordering several products",
    description:
      "Choose Multiple Products on the request form when your enquiry covers more than one line. You can explain the range you are considering in one brief.",
  },
];

/* -- 06 · Start with your brief ------------------------------------------- */

const BRIEF_ITEMS = [
  "The product or products",
  "Approximate quantity",
  "Club or academy logo",
  "Destination country",
  "Intended use",
  "Preferred colours",
  "Reference photographs or products",
  "Material or construction preferences, if known",
];

const NEXT_STEPS = [
  { title: "A mockup", description: "Your branding on the product, before anything is made." },
  { title: "A manufacturing quote", description: "When the requirement is clear enough to price." },
  {
    title: "Questions",
    description: "The details still needed to complete the specification.",
  },
];

/* -- 07 · Sample before bulk ---------------------------------------------- */

const STAGES: { title: string; description: string; checks?: string[] }[] = [
  {
    title: "Share your requirements",
    description:
      "Product, approximate quantity, logo, intended use and destination form the starting brief. Add colours, references and product requirements where you already know them.",
  },
  {
    title: "Review the concept",
    description:
      "The initial product direction is aligned, including branding, colour and the specifications that need to be defined.",
  },
  {
    title: "Approve the sample",
    description:
      "Materials, construction, sizing and finish are confirmed through the physical sample before bulk production.",
  },
  {
    title: "Production and quality control",
    description:
      "The order is produced against the approved specification. Quality-control checks can include:",
    checks: [
      "Dimensions and weight",
      "Materials and construction",
      "Branding and colour",
      "Labels and sizing",
      "Quantity and packing",
    ],
  },
  {
    title: "Packing and delivery",
    description:
      "Final quantities, packing requirements and shipment documentation are completed for the order.",
  },
];

/* -- 08 · Reorders -------------------------------------------------------- */

const REORDER_NEEDS = [
  "Replace regularly used equipment",
  "Add products for new members",
  "Order another run of apparel",
  "Expand into another product line",
  "Return to an existing approved design",
];

/* -- 09 · FAQ -------------------------------------------------------------- */

const FAQS: ProductFaq[] = [
  {
    question: "Can you put our club logo on boxing gloves and equipment?",
    answer:
      "Yes. Club branding can be applied using methods suited to the product and material, including print, embroidery, sublimation, embossing, patches and woven labels. Logo placement and branding method are agreed as part of the product specification.",
  },
  {
    question: "Can we start with only one product?",
    answer:
      "Yes. You do not need to order a complete club kit. Your enquiry can begin with one product, such as boxing gloves, pads, protective equipment, fightwear or apparel. If you later want to expand the range, existing approved artwork and specifications can provide a reference.",
  },
  {
    question: "Can we order several types of equipment together?",
    answer:
      "Yes. A club brief can cover multiple product types. Choose Multiple Products on the request form and describe the equipment and apparel you are considering.",
  },
  {
    question: "Do we need a complete tech pack?",
    answer:
      "No. A logo, product idea and basic requirements are enough to start the discussion. If you already have a tech pack, sketch or detailed reference, include it. Otherwise, the next step is to identify what must be defined before sampling.",
  },
  {
    question: "Can we order different sizes for different members?",
    answer:
      "Yes. Orders can be planned around the size mix required by the club, including junior and adult options where available. Provide the size breakdown when you know it.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "Minimum quantities depend on the product and specification. Material, construction, branding method and colour requirements can affect how an order needs to be planned. Send the product and approximate quantity you are considering and the applicable requirement can be confirmed with the quote.",
  },
  {
    question: "How long does an order take?",
    answer:
      "Timing depends on the products, specification, sampling requirements, quantity and destination. The relevant production and delivery requirements are confirmed with the quote once the brief has been reviewed.",
  },
  {
    question: "Can we approve a sample before bulk production?",
    answer:
      "Yes. The process is built around confirming the physical sample and product specification before bulk production. Materials, construction, sizing, branding and finish are agreed at the sample stage, and production is then checked against the approved reference.",
  },
  {
    question: "Can you keep our design for future orders?",
    answer:
      "Approved artwork and product specifications can be retained as a reference for reorders. Any changes to colours, materials, construction, sizing or other requirements should still be identified before the next production run.",
  },
];

/** The closing ticket: what happens after the brief, as section 06 says. */
const CLOSING_STEPS = [
  {
    title: "Send what you know",
    description: "The product, approximate quantity, logo and destination.",
  },
  {
    title: "A person reviews it",
    description: "Every brief is read before the next step is decided.",
  },
  {
    title: "The next step is defined",
    description: "A mockup, a manufacturing quote or the questions still open.",
  },
];

export default function ForClubsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd([{ name: "Gyms & Academies", path: "/for-clubs" }]),
            faqJsonLd(FAQS),
          ]),
        }}
      />

      {/*
        Hero: three slides, one per kind of club — boxing, MMA and martial
        arts, then apparel. The page's h1 is constant and names the page for
        search; each slide's headline is an h2, since the slides are
        alternatives shown one at a time, not a document outline.
      */}
      <HeroSlider
        label="Custom gear for gyms and academies"
        slides={HERO_SLIDES}
        top={
          <>
            <Breadcrumb items={[{ label: "Gyms & Academies" }]} />
            <h1 className="sr-only">Custom fight gear for gyms and academies.</h1>
          </>
        }
      />

      {/*
        01 — Who the kit is for. The heading, the four roles as an expanding
        strip of photographs, then the one action beneath them. White: it follows the dark
        hero and precedes the light section 02.
      */}
      <Section theme="white" width="shell">
        <SectionHeader
          eyebrow="For the way your club trains"
          index="01"
          title="The right equipment depends on who is using it and how they train."
          className="lg:max-w-[46rem]"
        />

        <div className="mt-[var(--space-8)]">
          <RolePanels panels={ROLES} />
        </div>

        {/* The one action, under the panels it follows from. */}
        <div className="mt-[var(--space-7)] flex justify-center">
          <Button href="/quote" variant="primary" arrow>
            {CTA.brief}
          </Button>
        </div>
      </Section>

      {/*
        02 — What can be specified. The four areas of a brief as a tech-pack
        sheet, one tab each with a visual of its own.
        Light: between the white 01 and the white 03.
      */}
      <Section theme="light" width="shell">
        <SectionHeader
          eyebrow="Made to your requirements"
          index="02"
          title="Your club should not have to fit an off-the-shelf product."
          description="Custom manufacturing starts with defining what you actually need. That may be as simple as adding your club identity to an established product type, or it may involve decisions about materials, construction, sizing, branding and packaging."
          className="lg:max-w-[52rem]"
        />

        <div className="mt-[var(--space-8)]">
          <SpecSheet areas={SPEC_AREAS} label="What a club specification covers" />
        </div>

      </Section>

      {/*
        Between 02 and 03, unnumbered: a logo and an idea are enough to start.
        Its own band rather than part of the specification, since it answers
        a different question — not "what can we decide?" but "do we have to
        decide it all first?". The studio on the left shows it: a logo, a
        colour and a design idea in, a finished product out.
        Dark: between the light 02 and the white 03.
      */}
      <Section theme="dark" width="shell">
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-[var(--space-8)]">
          <ConceptStudio products={CONCEPT_PRODUCTS} logos={CONCEPT_LOGOS} />
          <div>
            <p className="inline-flex rounded-sm bg-forge-600 px-2.5 py-1 text-eyebrow font-semibold uppercase tracking-[0.14em]">
              Starting point
            </p>
            <h3 className="mt-[var(--space-4)] font-display text-[clamp(2rem,3vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
              Starting with only a logo and an idea?
            </h3>
            <p className="mt-[var(--space-4)] text-body-large text-mist-300">
              <span className="font-semibold text-white">That is a valid starting point.</span>{" "}
              You do not need every detail decided before you contact us.
            </p>

            {/* Points at the studio: left of it on a desktop, above on a phone. */}
            <p className="mt-[var(--space-4)] inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-small text-mist-300">
              <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-forge-600 text-white">
                <svg viewBox="0 0 16 16" className="size-3.5 -rotate-90 lg:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
              Try it: pick a logo, colourway and design.
            </p>

            {/* The route from here, as a connected track: brief to sample. */}
            <ol className="mt-[var(--space-6)] flex flex-col gap-[var(--space-4)]">
              {LOGO_TO_SAMPLE.map((step, i) => {
                const last = i === LOGO_TO_SAMPLE.length - 1;
                return (
                  <li key={step.title} className="relative flex gap-[var(--space-4)]">
                    {/* The track to the next step; none after the last. */}
                    {!last ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-5 top-10 -bottom-[var(--space-4)] w-px",
                          i === LOGO_TO_SAMPLE.length - 2
                            ? "bg-linear-to-b from-forge-600 to-success-600"
                            : "bg-forge-600/70",
                        )}
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-4 ring-[var(--color-bg)]",
                        last ? "bg-success-600 text-white" : "border border-forge-600/70 bg-ink-950 text-forge-600",
                      )}
                    >
                      {STEP_ICONS[i]}
                    </span>
                    <div className="pt-1">
                      <p className="flex items-baseline gap-2 font-body text-body font-semibold">
                        <span className="font-display text-small tabular-nums text-mist-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step.title}
                      </p>
                      <p className="mt-1 text-small text-mist-300">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-x-[var(--space-5)] gap-y-3">
              <Button
                href="/quote?intent=mockup"
                variant="primary"
                arrow
                data-analytics="hero_mockup_click"
                data-analytics-surface="clubs_requirements"
              >
                {CTA.mockup}
              </Button>
              <Link
                href="/quote"
                data-analytics="hero_quote_click"
                data-analytics-surface="clubs_requirements"
                className="text-small font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-forge-600"
              >
                or {CTA.brief.toLowerCase()}
              </Link>
            </div>
            <p className="mt-[var(--space-4)] flex items-center gap-2 text-small text-mist-300">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-success-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 8.5 3 3 7-7" />
              </svg>
              Reviewed by a person, not an automated quote.
            </p>
          </div>
        </div>
      </Section>

      {/* 03 — The six product lines, each linked to its page. */}
      <Section theme="white" width="work">
        <SectionHeader
          eyebrow="Equipment and apparel"
          index="03"
          title="Custom combat-sports products across the gym."
          description="Start with one product or combine several product lines in the same club brief."
        />
        <ul className="mt-[var(--space-7)] grid gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_LINES.map((line, i) => (
            <li
              key={line.title}
              className="group relative flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] transition-[border-color,transform] duration-200 ease-standard hover:border-forge-600/60 motion-safe:hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="font-display text-heading-3 font-bold tabular-nums text-[var(--color-border-strong)]/50 transition-colors group-hover:text-forge-600"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-[var(--space-4)] font-body text-body-large font-semibold leading-snug">
                {line.title}
              </h3>
              <p className="mt-2 flex-1 text-small text-[var(--color-text-secondary)]">
                {line.description}
              </p>
              {/* The link's ::after covers the card, so the card is the target. */}
              <Link
                href={line.link.href}
                className="mt-[var(--space-5)] inline-flex items-center gap-2 text-small font-semibold text-forge-700 after:absolute after:inset-0 after:rounded-xl"
              >
                {line.link.label}
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 04 — One product or the whole kit. Dark, with the coordinated kit laid out. */}
      <Section theme="dark" width="work">
        <div className="grid items-center gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionHeader
              eyebrow="One product or a complete club range"
              index="04"
              title="Order what your gym actually needs."
              description="You do not have to build a complete club range to work with Sparwright."
            />
            <p className="mt-[var(--space-6)] text-body text-[var(--color-text-secondary)]">
              Some gyms may begin with one clearly defined requirement:
            </p>
            <Chips items={SINGLE_STARTS} tone="dark" className="mt-[var(--space-4)]" />
            <p className="mt-[var(--space-5)] text-body text-[var(--color-text-secondary)]">
              Others may want several products developed together.
            </p>
          </div>
          <FramedPhoto
            src={gymAthletes}
            alt="A boxer and a club member in matching custom kit, both carrying the same club emblem."
            ratio="aspect-[5/4]"
            cutout
          />
        </div>

        <div className="mt-[var(--space-8)] rounded-xl border border-[var(--color-border)] bg-white/[0.03] p-[var(--space-6)] sm:p-[var(--space-7)]">
          <h3 className="text-heading-3">Build a coordinated club kit when it makes sense.</h3>
          <p className="mt-[var(--space-4)] max-w-copy text-body text-[var(--color-text-secondary)]">
            If you do want a broader club kit, your equipment and apparel can be
            planned around the same identity. For example:
          </p>
          <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] md:grid-cols-3">
            {CLUB_KIT.map((group) => (
              <div key={group.title} className="border-t-2 border-forge-600 pt-[var(--space-4)]">
                <h4 className="font-body text-body font-semibold">{group.title}</h4>
                <TickList items={group.items} className="mt-[var(--space-3)]" />
              </div>
            ))}
          </div>
          <div className="mt-[var(--space-6)] grid gap-[var(--space-5)] border-t border-[var(--color-border)] pt-[var(--space-5)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <p className="max-w-copy text-body text-[var(--color-text-secondary)]">
              The products do not need to be identical. The aim is to carry the
              agreed club identity across the range while giving each item the
              construction and specification appropriate to its use.
            </p>
            <Button
              href="/quote?intent=mockup"
              variant="inverse"
              arrow
              data-analytics="hero_mockup_click"
              data-analytics-surface="clubs_kit"
            >
              {CTA.clubKit}
            </Button>
          </div>
        </div>
      </Section>

      {/* 05 — Sizes and order planning. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionHeader
              eyebrow="Sizes and order planning"
              index="05"
              title="Plan the order around the people who will use it."
              description="Club orders often include more variation than a single standard product."
            />
            <Prose className="mt-[var(--space-5)]">
              <p>
                You may need different glove weights, junior and adult products,
                several apparel sizes or separate equipment for members, fighters
                and coaches.
              </p>
              <p>Those requirements should be identified before production.</p>
            </Prose>
          </div>
          <NumberedCardList items={PLANNING} />
        </div>

        {/* "Not sure" is a real answer — said plainly, with the way in. */}
        <div className="mt-[var(--space-7)] grid gap-[var(--space-5)] rounded-xl border border-forge-600/30 bg-forge-100/60 p-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h3 className="text-heading-4">Not sure about quantity yet?</h3>
            <p className="mt-2 max-w-copy text-body text-[var(--color-text-secondary)]">
              You can still start. The enquiry form accepts Not sure as a
              quantity option. Minimum quantities depend on the product and
              specification and are confirmed as part of the quote rather than
              published as one number for every order.
            </p>
          </div>
          <Button href="/quote" variant="primary" arrow>
            {CTA.brief}
          </Button>
        </div>
      </Section>

      {/* 06 — Start with your brief: what to send, and what happens to it. */}
      <Section theme="white" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionHeader
              eyebrow="Start with your brief"
              index="06"
              title="Tell us what you want to make."
              description="You do not need a finished tech pack to begin. A useful first enquiry can be simple."
            />
            <h3 className="mt-[var(--space-7)] font-body text-body-large font-semibold">
              Send what you already know
            </h3>
            <TickList items={BRIEF_ITEMS} columns={2} className="mt-[var(--space-4)]" />
            <p className="mt-[var(--space-6)] border-l-2 border-forge-600 pl-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
              If something is undecided, say so. The purpose of the request is to
              establish the requirement, not to pretend every decision has already
              been made.
            </p>
          </div>

          <div
            data-theme="dark"
            className="self-start rounded-xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)] sm:p-[var(--space-7)]"
          >
            <h3 className="text-heading-3">A person reviews every request.</h3>
            <p className="mt-[var(--space-4)] text-body text-[var(--color-text-secondary)]">
              Your submission is reviewed before the next step is decided.
              Depending on the brief, that next step may be:
            </p>
            <ul className="mt-[var(--space-5)] flex flex-col gap-3">
              {NEXT_STEPS.map((step) => (
                <li
                  key={step.title}
                  className="rounded-lg border border-[var(--color-border)] p-[var(--space-4)]"
                >
                  <p className="font-body text-body font-semibold">{step.title}</p>
                  <p className="mt-1 text-small text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-[var(--space-6)]">
              <Button
                href="/quote?intent=mockup"
                variant="inverse"
                arrow
                data-analytics="hero_mockup_click"
                data-analytics-surface="clubs_brief"
              >
                {CTA.mockup}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 07 — Sample before bulk: the five stages, and where they happen. */}
      <Section theme="dark" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionHeader
              eyebrow="Sample before bulk"
              index="07"
              title="Approve what is being made before the full order is produced."
              description="For an overseas manufacturing relationship, confidence should come from an agreed product — not from vague promises."
            />
            <p className="mt-[var(--space-5)] text-body text-[var(--color-text-secondary)]">
              The Sparwright process moves through five stages.
            </p>

            <div className="mt-[var(--space-7)] overflow-hidden rounded-xl border border-[var(--color-border)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={factoryFloor}
                  alt="Machinists at sewing benches on the Sparwright production floor in Sialkot."
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-[var(--space-5)]">
                <h3 className="font-body text-body-large font-semibold">Made in Sialkot</h3>
                <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                  Sparwright&apos;s manufacturing is based in Sialkot, Pakistan. The
                  product moves from specification and sampling through
                  production, quality control and packing against the agreed
                  requirements.
                </p>
                <div className="mt-[var(--space-5)]">
                  <Button href="/manufacturing" variant="inverse" arrow>
                    {CTA.process}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <ol className="relative flex flex-col gap-[var(--space-5)]">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-5 top-6 w-0.5 bg-linear-to-b from-forge-600 to-success-600"
            />
            {STAGES.map((stage, i) => (
              <li key={stage.title} className="relative flex gap-[var(--space-5)]">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-display text-small font-bold tabular-nums text-white ring-4 ring-[var(--color-bg)]",
                    i === STAGES.length - 1 ? "bg-success-600" : "bg-forge-600",
                  )}
                >
                  {i + 1}
                </span>
                <div className="flex-1 rounded-xl border border-[var(--color-border)] bg-white/[0.03] p-[var(--space-5)]">
                  <h3 className="font-body text-body-large font-semibold leading-snug">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                    {stage.description}
                  </p>
                  {stage.checks ? (
                    <Chips items={stage.checks} tone="dark" className="mt-[var(--space-4)]" />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 08 — Reorders. */}
      <Section theme="light" width="work">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Reorders"
              index="08"
              title="Your next order should not begin from zero."
              description="A useful manufacturing relationship continues after the first order."
            />
            <Prose className="mt-[var(--space-5)]">
              <p>
                Once artwork and product specifications have been approved, they
                can be kept as the reference for future orders.
              </p>
            </Prose>
            <div className="mt-[var(--space-6)]">
              <Button
                href="/quote"
                variant="primary"
                arrow
                data-analytics="hero_quote_click"
                data-analytics-surface="clubs_reorders"
              >
                {CTA.quote}
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)]">
            <p className="font-body text-body font-semibold">That matters when your club needs to:</p>
            <TickList items={REORDER_NEEDS} className="mt-[var(--space-4)]" />
            <p className="mt-[var(--space-5)] border-t border-[var(--color-border)] pt-[var(--space-4)] text-small text-[var(--color-text-secondary)]">
              A repeat order may still need confirmation if materials, colours,
              sizing, quantity or construction have changed. But the agreed
              product has a documented starting point.
            </p>
          </div>
        </div>
      </Section>

      {/* 09 — Club questions. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Gyms & academies FAQ"
          index="09"
          title="Questions about custom equipment for your club."
        />
        <FAQAccordion
          items={FAQS}
          name="clubs-faq"
          openFirst
          className="mt-[var(--space-6)]"
        />
      </Section>

      {/*
        The closing band keeps to a heading and one short paragraph — §04 rules
        out long copy on red — so the brief's five questions are folded into
        one line, and the ticket carries what happens after the click.
      */}
      <CallToAction
        title="Start with the gear your club needs now."
        description="Gloves for your members, pads and protective equipment for the gym, fightwear for your fighters, club apparel — or several products under one identity. Start with the requirement you have today."
        steps={CLOSING_STEPS}
        action={{
          label: CTA.mockup,
          href: "/quote?intent=mockup",
          analytics: "hero_mockup_click",
          surface: "clubs_cta",
        }}
        secondaryAction={{
          label: CTA.quote,
          href: "/quote",
          analytics: "hero_quote_click",
          surface: "clubs_cta",
        }}
      />
    </>
  );
}

/* -- Page-local building blocks ------------------------------------------- */

/** Stacked paragraphs in the section's secondary text colour. */
function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex max-w-copy flex-col gap-[var(--space-4)] text-body text-[var(--color-text-secondary)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Short labels as tags: branding methods, construction points, checks. */
function Chips({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-full border px-3 py-1 text-small font-medium",
            tone === "dark"
              ? "border-white/20 bg-white/5 text-white"
              : "border-[var(--color-border-strong)]/40 bg-[var(--color-surface)] text-[var(--color-text)]",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A plain ticked list — lighter than `CheckList`'s bordered cards. */
function TickList({
  items,
  columns = 1,
  className,
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-[var(--space-6)] gap-y-2.5", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-body text-[var(--color-text-secondary)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="mt-1 size-4 shrink-0 text-forge-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Numbered planning cards, stacked in two columns beside the section intro. */
function NumberedCardList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <ul className="grid gap-[var(--space-4)] sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)]"
        >
          <span
            aria-hidden="true"
            className="font-display text-heading-4 font-bold tabular-nums text-forge-600"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-[var(--space-3)] font-body text-body-large font-semibold leading-snug">
            {item.title}
          </h3>
          <p className="mt-2 text-small text-[var(--color-text-secondary)]">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
