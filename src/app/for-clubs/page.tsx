import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  Answer,
  BriefSheet,
  LogoFile,
  ReviewRoute,
  Swatches,
  Thumbs,
  type BriefField,
  type RouteStep,
} from "@/components/content/BriefBoard";
import { CallToAction } from "@/components/content/CallToAction";
import {
  ConceptStudio,
  type Colourway,
  type ConceptLogo,
  type ConceptProduct,
} from "@/components/content/ConceptStudio";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { HeroSlider, type HeroSlide } from "@/components/content/HeroSlider";
import {
  PlanningCards,
  ProductsVisual,
  QuantityChips,
  SizeTagsVisual,
  SizesVisual,
  UsesVisual,
} from "@/components/content/PlanningCards";
import { ReferenceFile, ReorderNeeds, type ReorderNeed } from "@/components/content/ReorderFile";
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
import { StageTimeline, type Stage } from "@/components/content/StageTimeline";
import { Button } from "@/components/foundation/Button";
import { Section } from "@/components/foundation/Container";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { CTA } from "@/components/foundation/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import type { ProductFaq } from "@/lib/products";
import { QUANTITY_CHOICES } from "@/lib/quote";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/structured-data";
import boxingClubsBanner from "../../../public/images/boxing-clubs-banner.jpg";
import factoryFloor from "../../../public/images/boxing-glove-factory-floor.jpg";
import rangeApparel from "../../../public/images/range/fightwear-and-club-apparel.jpg";
import rangeLifting from "../../../public/images/range/range-lifting.jpg";
import rangeMma from "../../../public/images/range/range-mma.jpg";
import rangePads from "../../../public/images/range/range-pads.jpg";
import rangeProtective from "../../../public/images/range/range-protective.jpg";
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
import mmaAcademiesBanner from "../../../public/images/mma-academies-banner.jpg";
import specExploded from "../../../public/images/exploded-boxing-glove.jpg";
import specPacking from "../../../public/images/packing-and-export.jpg";
import specPrinting from "../../../public/images/printing-and-decoration.jpg";
import stageBrief from "../../../public/images/design-and-tech-pack-development.jpg";
import stageConcept from "../../../public/images/review-the-concept.jpg";
import stageSample from "../../../public/images/approve-the-sample.jpg";
import stageProduction from "../../../public/images/quality-testing.jpg";

/**
 * Gyms & Academies — Design System §11 For Clubs template.
 *
 * The primary audience page. Named as the navbar and the homepage card name
 * it; the route stays /for-clubs so existing links hold.
 *
 * Sections run from who the kit is for to what happens after the order:
 *
 *   hero slider dark · 01 who it is for white · 02 what can be specified
 *   light · logo band dark · 03 the range, one product or a kit white ·
 *   04 sizes and planning light · 05 the brief white · 06 sample before bulk
 *   dark · 07 reorders light · 08 FAQ white · closing CTA action
 *
 * Two adjacent sections never share a surface. The page's one h1 is the
 * slider's (screen-reader only); every section below opens with an h2.
 *
 * Every product line links to its page (03), and every action goes where the
 * internal linking plan sends it: mockups to /quote?intent=mockup, briefs and quotes to /quote, the process to
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

/**
 * The six product lines as a range wall. `size` sets the tile: the anchor
 * product large, four square, apparel as the wide banner that closes it.
 */
const PRODUCT_LINES: {
  title: string;
  description: string;
  includes: string[];
  link: { label: string; href: string };
  size: "feature" | "square" | "wide";
  photo: {
    src: StaticImageData;
    alt: string;
    position?: string;
    /**
     * A studio product shot: on a square tile it is shown whole on its own
     * grey ground above the type, rather than cropped under it — the type
     * would otherwise sit over the product.
     */
    studio?: boolean;
  };
}[] = [
  {
    title: "Custom boxing gloves",
    description:
      "Training, sparring, bag, competition and junior boxing gloves can be developed around intended use, agreed construction, club colours and branding.",
    includes: ["Training", "Sparring", "Bag", "Competition", "Junior"],
    link: { label: CTA.exploreGloves, href: PAGE.gloves },
    size: "feature",
    photo: {
      src: gloveStrikeWhiteRedBlack,
      alt: "A pair of white custom boxing gloves with an angular red and black strike pattern and black wrist straps.",
      studio: true,
    },
  },
  {
    title: "Custom MMA gloves and gear",
    description:
      "Custom options include MMA fight gloves, sparring gloves, grappling and hybrid gloves, shin guards and junior MMA gloves.",
    includes: ["Fight gloves", "Sparring", "Grappling", "Shin guards"],
    link: { label: CTA.exploreMMA, href: PAGE.mma },
    size: "square",
    photo: {
      src: rangeMma,
      alt: "A pair of black and red open-palm MMA gloves in front of a pair of matching shin-and-instep guards.",
      studio: true,
    },
  },
  {
    title: "Pads, mitts and punch bags",
    description:
      "Build branded training equipment for coaches and gym sessions, including focus mitts, Thai pads, kicking shields, paddle mitts, training sticks and punch bags.",
    includes: ["Focus mitts", "Thai pads", "Shields", "Punch bags"],
    link: { label: CTA.explorePads, href: PAGE.pads },
    size: "square",
    photo: {
      src: rangePads,
      alt: "A black and red set: a punch bag, a Thai pad and a pair of curved focus mitts.",
      studio: true,
    },
  },
  {
    title: "Protective gear",
    description:
      "Customise equipment such as head guards, chest and body protectors, groin guards, shin and instep guards, hand wraps and other protective products.",
    includes: ["Head guards", "Body protectors", "Shin guards", "Hand wraps"],
    link: { label: CTA.exploreProtective, href: PAGE.protective },
    size: "square",
    photo: {
      src: rangeProtective,
      alt: "A black and red head guard with cheek protection, matching shin-and-instep guards and rolled hand wraps.",
      studio: true,
    },
  },
  {
    title: "Strength and lifting gear",
    description:
      "For facilities that combine combat training with strength work, the range also includes lifting belts, training belts, straps, grips and weightlifting gloves.",
    includes: ["Lifting belts", "Straps", "Grips", "Gloves"],
    link: { label: CTA.exploreLifting, href: PAGE.lifting },
    size: "square",
    photo: {
      src: rangeLifting,
      alt: "A black and red lifting set: a leather lever-buckle belt, weightlifting gloves, lifting straps and wrist wraps.",
      studio: true,
    },
  },
  {
    title: "Fightwear and club apparel",
    description:
      "Carry your identity onto fight shorts, boxing trunks, rashguards, compression wear, T-shirts, hoodies, sweatshirts and tracksuits.",
    includes: ["Fight shorts", "Rashguards", "Compression", "T-shirts", "Hoodies", "Tracksuits"],
    link: { label: CTA.exploreClubApparel, href: PAGE.apparel },
    size: "wide",
    photo: {
      src: rangeApparel,
      alt: "Three club members in black and red Sparwright kit: a quarter-zip top and joggers, a sports bra with fight shorts and MMA gloves, and a sports bra with leggings.",
      position: "right 20%",
    },
  },
];

/* -- 04 · One product or a complete club range ---------------------------- */

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

/** What to send, each with an example answer; two are left open on purpose. */
const BRIEF_FIELDS: BriefField[] = [
  {
    label: "The product or products",
    value: (
      <>
        <Answer strong>Boxing gloves</Answer>
        <Answer>Pads</Answer>
        <Answer>T-shirts</Answer>
      </>
    ),
  },
  { label: "Approximate quantity", value: <Answer>Not sure yet</Answer> },
  { label: "Club or academy logo", value: <LogoFile mark={CONCEPT_LOGOS[0].mark} name="club-crest.svg" /> },
  { label: "Destination country", value: <Answer>United Kingdom</Answer> },
  {
    label: "Intended use",
    value: (
      <>
        <Answer>Bag work</Answer>
        <Answer>Sparring</Answer>
      </>
    ),
  },
  { label: "Preferred colours", value: <Swatches colours={["#111111", "#D83A20", "#F4F1E8"]} /> },
  {
    label: "Reference photographs or products",
    value: <Thumbs shots={[gloveStrikeBlackRed, gloveClassicWhiteRedBlack]} />,
  },
  { label: "Material or construction preferences, if known" },
];

const ROUTE_ICON = "size-5";

const NEXT_STEPS: RouteStep[] = [
  {
    title: "A mockup",
    description: "Your branding on the product, before anything is made.",
    icon: (
      <svg viewBox="0 0 24 24" className={ROUTE_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m3 16 5-5 4 4 3-3 6 6" />
        <circle cx="15.5" cy="8.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "A manufacturing quote",
    description: "When the requirement is clear enough to price.",
    icon: (
      <svg viewBox="0 0 24 24" className={ROUTE_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
        <path d="M14 3v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    title: "Questions",
    description: "The details still needed to complete the specification.",
    icon: (
      <svg viewBox="0 0 24 24" className={ROUTE_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />
        <path d="M10 8.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2M12 13.5h.01" />
      </svg>
    ),
  },
];

/* -- 07 · Sample before bulk ---------------------------------------------- */

const STAGES: Stage[] = [
  {
    title: "Share your requirements",
    photo: { src: stageBrief, alt: "A pattern maker working from a glove drawing, with material swatches and the product's panels on screen." },
    description:
      "Product, approximate quantity, logo, intended use and destination form the starting brief. Add colours, references and product requirements where you already know them.",
  },
  {
    title: "Review the concept",
    photo: { src: stageConcept, alt: "A designer reviewing one glove design in three colourways on screen and in print, beside leather swatches and a colour fan." },
    description:
      "The initial product direction is aligned, including branding, colour and the specifications that need to be defined.",
  },
  {
    title: "Approve the sample",
    photo: {
      src: stageSample,
      alt: "A quality inspector checking a single sample boxing glove beside a scale, a tape measure and a ticked checklist.",
    },
    description:
      "Materials, construction, sizing and finish are confirmed through the physical sample before bulk production.",
  },
  {
    title: "Production and quality control",
    photo: { src: stageProduction, alt: "Gloves checked and sorted into crates on the Sparwright production floor." },
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
    photo: { src: specPacking, alt: "Packed cartons of finished gear on warehouse racking, ready for export." },
    description:
      "Final quantities, packing requirements and shipment documentation are completed for the order.",
  },
];

/* -- 08 · Reorders -------------------------------------------------------- */

const REORDER_ICON = "size-5";

const REORDER_NEEDS: ReorderNeed[] = [
  {
    text: "Replace regularly used equipment",
    icon: (
      <svg viewBox="0 0 24 24" className={REORDER_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
      </svg>
    ),
  },
  {
    text: "Add products for new members",
    icon: (
      <svg viewBox="0 0 24 24" className={REORDER_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5M19 8v6M16 11h6" />
      </svg>
    ),
  },
  {
    text: "Order another run of apparel",
    icon: (
      <svg viewBox="0 0 24 24" className={REORDER_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 3.5 4 5.5 2.5 10l3 1.2V20.5h13V11.2l3-1.2L20 5.5l-4.5-2a3.5 3.5 0 0 1-7 0Z" />
      </svg>
    ),
  },
  {
    text: "Expand into another product line",
    icon: (
      <svg viewBox="0 0 24 24" className={REORDER_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <path d="M17 14v6M14 17h6" />
      </svg>
    ),
  },
  {
    text: "Return to an existing approved design",
    icon: (
      <svg viewBox="0 0 24 24" className={REORDER_ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H6.5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V9Z" />
        <path d="M14 3v6h6M8.5 14.5l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
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
        <div className="grid items-center gap-[var(--space-7)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[var(--space-8)]">
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

      {/*
        03 — One product or a complete club range. The six product lines as
        a range wall — the anchor product large, four squares, apparel as a
        wide banner — each tile one link to its page and any one of them a
        valid start, and the intro says they can be combined in one brief.
        White: after the dark logo band.
      */}
      <Section theme="white" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <SectionHeader
            eyebrow="One product or a complete club range"
            index="03"
            title="Order what your gym actually needs."
          />
          <div className="flex flex-col gap-[var(--space-4)] lg:items-end lg:text-right">
            <p className="max-w-[28rem] text-body-large text-[var(--color-text-secondary)]">
              You do not have to build a complete club range to work with
              Sparwright. Start with one product or combine several product
              lines in the same club brief.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg)] px-3 py-1.5 text-small font-semibold text-[var(--color-text)]">
              <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full bg-forge-600 text-[0.6875rem] font-bold text-white">
                6
              </span>
              product lines · one brief
            </p>
          </div>
        </div>

        {/*
          The studio lines as grey cards — the card is the studio: the type at
          the head in ink, the product large beneath it on the same grey, with
          nothing laid over it. Apparel, a photograph of people, closes the
          wall as a dark banner. Every card is one link to its page.
        */}
        <ul className="mt-[var(--space-7)] grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_LINES.filter((line) => line.size !== "wide").map((line, i) => (
            <li
              key={line.title}
              className={cn(
                "group relative isolate flex min-h-[26rem] flex-col overflow-hidden rounded-2xl bg-[radial-gradient(120%_90%_at_50%_70%,#d6d7d9,#c2c3c6)] text-ink-950 lg:min-h-[27rem]",
                line.size === "feature" && "sm:col-span-2 lg:row-span-2 lg:min-h-0",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-forge-600 transition-transform duration-300 ease-standard group-hover:scale-x-100"
              />
              <div className={cn("relative z-10 p-[var(--space-5)]", line.size === "feature" && "sm:p-[var(--space-7)]")}>
                <p className="font-display text-small font-bold tabular-nums text-forge-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className={cn(
                    "mt-1.5 font-display font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]",
                    line.size === "feature" ? "text-[clamp(1.75rem,2.6vw,2.5rem)]" : "text-heading-4",
                  )}
                >
                  {line.title}
                </h3>
                {line.size === "feature" ? (
                  <>
                    <p className="mt-3 max-w-[30rem] text-body text-steel-700">{line.description}</p>
                    <ul className="mt-[var(--space-4)] flex flex-wrap gap-1.5">
                      {line.includes.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-ink-950/15 bg-white/50 px-2.5 py-1 text-[0.75rem] font-medium"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-small text-steel-700">{line.includes.join(" · ")}</p>
                    <p className="sr-only">{line.description}</p>
                  </>
                )}
              </div>

              {/* The product, on the card's own grey. */}
              <div className="relative flex-1">
                <Image
                  src={line.photo.src}
                  alt={line.photo.alt}
                  fill
                  sizes={line.size === "feature" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className={cn(
                    "transition-transform duration-700 ease-standard motion-safe:group-hover:scale-[1.04]",
                    line.photo.studio
                      ? "object-contain [mask-image:radial-gradient(farthest-side,black_80%,transparent)]"
                      : "rounded-t-xl object-cover",
                  )}
                  style={{ objectPosition: line.photo.position ?? "center bottom" }}
                />
              </div>

              {/* The link's ::after covers the card, so the card is the target. */}
              <Link
                href={line.link.href}
                aria-label={line.link.label}
                className="absolute bottom-[var(--space-4)] right-[var(--space-4)] z-10 flex size-11 items-center justify-center rounded-full bg-ink-950 text-white shadow-[0_8px_20px_-8px_rgb(0_0_0/0.5)] transition-colors after:absolute after:-inset-[100rem] group-hover:bg-forge-600"
              >
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>

        {PRODUCT_LINES.filter((line) => line.size === "wide").map((line) => (
          <div
            key={line.title}
            data-theme="dark"
            className="group relative isolate mt-3 flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink-950 text-white lg:justify-center"
          >
            <div className="absolute inset-0 -z-10 lg:left-auto lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]">
              <Image
                src={line.photo.src}
                alt={line.photo.alt}
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover transition-transform duration-700 ease-standard motion-safe:group-hover:scale-[1.03]"
                style={{ objectPosition: line.photo.position }}
              />
            </div>
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/70 via-50% to-ink-950/0 lg:hidden" />
            <div className="p-[var(--space-5)] sm:p-[var(--space-7)] lg:max-w-[42%]">
              <p className="font-display text-small font-bold tabular-nums text-white/60">
                {String(PRODUCT_LINES.length).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                {line.title}
              </h3>
              <p className="mt-3 text-body text-mist-300">{line.description}</p>
              <ul className="mt-[var(--space-4)] flex flex-wrap gap-1.5">
                {line.includes.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[0.75rem] font-medium backdrop-blur-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={line.link.href}
                className="mt-[var(--space-5)] inline-flex items-center gap-2 text-small font-semibold after:absolute after:inset-0 after:rounded-2xl"
              >
                {line.link.label}
                <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-forge-600">
                  <Arrow />
                </span>
              </Link>
            </div>
          </div>
        ))}

      </Section>

      {/*
        04 — Sizes and order planning. Four cards, one per thing to plan,
        each headed by a picture of it on the studio grey; then one slim dark
        strip: not sure of the quantity, and the form's own "Not sure".
        Light: between the white 03 and the white 05.
      */}
      <Section theme="light" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Sizes and order planning"
            index="04"
            title="Plan the order around the people who will use it."
            description="Club orders often include more variation than a single standard product."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            You may need different glove weights, junior and adult products,
            several apparel sizes or separate equipment for members, fighters
            and coaches.{" "}
            <span className="font-semibold text-[var(--color-text)]">
              Those requirements should be identified before production.
            </span>
          </p>
        </div>

        <div className="mt-[var(--space-7)]">
          <PlanningCards
            cards={[
              {
                ...PLANNING[0],
                visual: (
                  <UsesVisual
                    gloves={[
                      { src: gloveClassicWhiteRedBlack, use: "Bag", weight: "10 oz" },
                      { src: gloveStrikeWhiteRedBlack, use: "Training", weight: "12 oz" },
                      { src: gloveCrackleWhiteRedBlack, use: "Sparring", weight: "16 oz" },
                    ]}
                  />
                ),
              },
              { ...PLANNING[1], visual: <SizesVisual glove={gloveStrikeBlackRed} /> },
              { ...PLANNING[2], visual: <SizeTagsVisual /> },
              {
                ...PLANNING[3],
                visual: <ProductsVisual shots={[gloveStrikeWhiteRedBlack, rangeMma, rangePads, rangeLifting]} />,
              },
            ]}
          />
        </div>

        {/* "Not sure" is a real answer — said plainly, and shown. */}
        <div
          data-theme="dark"
          className="mt-3 grid items-center gap-[var(--space-5)] rounded-2xl bg-[var(--color-bg)] p-[var(--space-6)] text-[var(--color-text)] lg:grid-cols-[minmax(0,1.1fr)_auto_auto] lg:gap-[var(--space-7)]"
        >
          <div>
            <h3 className="font-body text-body-large font-semibold">
              Not sure about quantity yet? <span className="text-forge-600">You can still start.</span>
            </h3>
            <p className="mt-1.5 text-small text-[var(--color-text-secondary)]">
              The enquiry form accepts Not sure as a quantity option. Minimum
              quantities depend on the product and specification and are
              confirmed as part of the quote rather than published as one number
              for every order.
            </p>
          </div>
          <QuantityChips choices={QUANTITY_CHOICES.slice(0, 3)} />
          <Button href="/quote" variant="primary" arrow>
            {CTA.brief}
          </Button>
        </div>
      </Section>

      {/*
        05 — Start with your brief. A club brief as it might arrive, filled in
        with example answers and two fields left open; beside it, the route
        it takes: one person reviews it, then one of three next steps.
        White: between the light 04 and the dark 06.
      */}
      <Section theme="white" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Start with your brief"
            index="05"
            title="Tell us what you want to make."
            description="You do not need a finished tech pack to begin. A useful first enquiry can be simple."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Send what you already know — a product, a logo and where it is
            going is enough to begin.{" "}
            <span className="font-semibold text-[var(--color-text)]">
              The rest can be settled together.
            </span>
          </p>
        </div>

        <div className="mt-[var(--space-7)] grid gap-3">
          <BriefSheet
            title="Send what you already know"
            fields={BRIEF_FIELDS}
            footnote={
              <>
                <span className="font-semibold text-[var(--color-text)]">If something is undecided, say so.</span>{" "}
                The purpose of the request is to establish the requirement, not
                to pretend every decision has already been made.
              </>
            }
          />
          <ReviewRoute
            title="A person reviews every request."
            intro="Your submission is reviewed before the next step is decided. Depending on the brief, that next step may be:"
            steps={NEXT_STEPS}
            action={
              <Button
                href="/quote?intent=mockup"
                variant="primary"
                arrow
                data-analytics="hero_mockup_click"
                data-analytics-surface="clubs_brief"
              >
                {CTA.mockup}
              </Button>
            }
          />
        </div>
      </Section>

      {/*
        06 — Sample before bulk. The five stages as one rail, split by a gate
        at the sample: before it, one product; after it, the full order. Each
        stage opens with its own photograph. Then Sialkot, and the process
        link. Dark: between the white 05 and the light 07.
      */}
      <Section theme="dark" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Sample before bulk"
            index="06"
            title="Approve what is being made before the full order is produced."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            For an overseas manufacturing relationship, confidence should come
            from an agreed product — not from vague promises.{" "}
            <span className="font-semibold text-[var(--color-text)]">
              The Sparwright process moves through five stages.
            </span>
          </p>
        </div>

        <div className="mt-[var(--space-7)]">
          <StageTimeline stages={STAGES} gateAfter={2} label="The five stages, from brief to delivery" />
        </div>

        {/* Where it happens. */}
        <div className="mt-3 grid items-center gap-[var(--space-5)] rounded-2xl border border-[var(--color-border)] p-[var(--space-5)] sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-[var(--space-6)]">
          <div className="relative hidden h-20 w-32 overflow-hidden rounded-lg sm:block">
            <Image
              src={factoryFloor}
              alt="Machinists at sewing benches on the Sparwright production floor in Sialkot."
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-body text-body-large font-semibold">Made in Sialkot</h3>
            <p className="mt-1.5 text-small text-[var(--color-text-secondary)]">
              Sparwright&apos;s manufacturing is based in Sialkot, Pakistan. The
              product moves from specification and sampling through production,
              quality control and packing against the agreed requirements.
            </p>
          </div>
          <Button href="/manufacturing" variant="inverse" arrow>
            {CTA.process}
          </Button>
        </div>
      </Section>

      {/*
        07 — Reorders. The approved product kept on file — a record card with
        the orders that followed from it — beside the reasons a club comes
        back, and what a repeat order may still need to confirm.
        Light: between the dark 06 and the white 08.
      */}
      <Section theme="light" width="shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-[var(--space-9)]">
          <SectionHeader
            eyebrow="Reorders"
            index="07"
            title="Your next order should not begin from zero."
            description="A useful manufacturing relationship continues after the first order."
          />
          <p className="text-body text-[var(--color-text-secondary)]">
            Once artwork and product specifications have been approved,{" "}
            <span className="font-semibold text-[var(--color-text)]">
              they can be kept as the reference for future orders.
            </span>
          </p>
        </div>

        <div className="mt-[var(--space-8)] grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-[var(--space-9)]">
          <div>
            <ReferenceFile
              photo={gloveStrikeBlackRed}
              product="Club sparring glove"
              approved={["Artwork and branding", "Colours", "Specification", "Sample"]}
              orders={["First order", "Reorder", "Next reorder"]}
            />
            <p className="mt-[var(--space-6)] border-l-2 border-forge-600 pl-[var(--space-4)] text-small text-[var(--color-text-secondary)]">
              A repeat order may still need confirmation if materials, colours,
              sizing, quantity or construction have changed.{" "}
              <span className="font-semibold text-[var(--color-text)]">
                But the agreed product has a documented starting point.
              </span>
            </p>
          </div>

          <div>
            <ReorderNeeds intro="That matters when your club needs to:" needs={REORDER_NEEDS} />
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
        </div>
      </Section>

      {/* 08 — Club questions. */}
      <Section theme="white" width="copy">
        <SectionHeader
          eyebrow="Gyms & academies FAQ"
          index="08"
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
