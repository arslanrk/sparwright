# Sparwright — Project Brief

> **Who this is for.** This file briefs ChatGPT, which acts as the **planner** on this project: it decides what to build, in what order, and why. **Claude (Claude Code)** is the **executor**: it has the repository open, writes the code, runs it in a browser and commits. Read this whole file before proposing anything. When a detail here conflicts with something you assume about "typical" websites, this file wins.
>
> Snapshot taken **24 September 2026**, at commit `6a4f9ee` on branch `dev`.

---

## 1. The project in one paragraph

**Sparwright** (a working brand name, which may change) is a **B2B custom manufacturer of combat-sports gear** based in **Sialkot, Pakistan**. It makes boxing and MMA gloves, fightwear, protective gear, punch bags and pads, lifting gear and club apparel **to the buyer's specification** — their logo, colours, materials and packaging — for **gyms, clubs and academies** and for **private-label brands**, primarily in the **UK and Europe**. This repository is the company's **marketing and lead-generation website**. It does not sell online. Its single commercial job is to turn a visiting buyer into a **qualified request for a mockup or a manufacturing quote**, which a person then answers by hand.

**North star (from the design system):** make a UK or European club owner feel they have found *a specialised, transparent manufacturing partner — not another broad exporter and not a consumer sports shop.*

**Positioning line:** "Custom fight gear for clubs and brands."
**Brand promise:** "A clear path from initial concept to approved sample, controlled production and repeat orders."
**Tagline in use:** "Built for your corner." (design system cover); site title tagline "Custom boxing gloves and fightwear manufacturer".

---

## 2. How we work together (ChatGPT ↔ Claude)

1. **ChatGPT plans.** For each task, write a brief Claude can execute without guessing:
   - **Goal:** the buyer or business outcome, not only the UI change.
   - **Pages or files affected:** use the routes and file paths in this document.
   - **Content:** exact copy where it matters (headings, CTA labels, FAQ text). Otherwise give the intent and let Claude write to the voice rules in §9.
   - **Acceptance criteria:** how we will know it is done, e.g. "renders at 360 px with no horizontal scroll" or "H2 contains 'custom MMA gloves'".
   - **Out of scope:** what must *not* change.
2. **Claude executes.** It reads the code, pushes back if a brief breaks a rule below, implements the change, checks it in a real browser (desktop and 390 px), runs typecheck and lint, and reports what changed. It commits only when the user asks.
3. **The user decides.** Business facts (MOQs, lead times, names, certifications, prices) come **only** from the user. Neither AI invents them.
4. **Git workflow:** work happens on one `dev` branch and is merged to `main` per finished feature. There is no branch per task.
5. **Tech caveat for planning:** this repo runs **Next.js 16.3.4**, which has breaking changes from older Next.js. Plan in terms of behaviour and content. Leave API-level details to Claude, which checks `node_modules/next/dist/docs/`.

---

## 3. Hard rules (non-negotiables). Never plan anything that breaks these

From the design system (§15). Every page and every PR is held to them.

1. Use **real** manufacturing and product images. **No stock photos and no AI images presented as real evidence.**
2. Present **combat sports as the specialisation**.
3. Make the **quote and mockup process obvious**.
4. Keep **one primary CTA per section**.
5. **Never invent** metrics, customers, testimonials, certifications or capacity figures.
6. **Do not publish unconfirmed MOQs or lead times.** Answers say *how* the figure is set and that it is confirmed with the quote.
7. **Do not create dozens of weak product pages.** A product line gets its own page only when it can carry types, specification, customisation, QC and FAQ content. Everything else goes to the quote form with the product pre-filled.
8. **No generic exporter language.** Words like "leading exporter", "best quality", "world-class", "one-stop solution", "cheapest price" and "all kinds of products" are banned.
9. **Do not build a full configurator** (live colour switching, 3D, auto-pricing) before demand is proven.
10. **Every page must work properly at 360 px.**
11. **Keep approved artwork and specifications for reorders**, and say so.
12. **Hide social proof** (testimonials, case studies, client logos) until genuine, permissioned evidence exists.

Also locked:
- **CTA labels come from a fixed library** (§9.4). Never use "Submit", "Click Here", "Discover More", "Let's Go" or "Shop Now".
- **Nothing promises a response time, a price or a delivery date.**
- **Accessibility is required, not optional** (§11).

---

## 4. Business context

| Dimension | Decision |
|---|---|
| Business model | B2B custom manufacturing and private label (OEM) |
| Specialisation | Boxing gloves, combat equipment, fightwear, club apparel; lifting gear added since |
| Manufacturing story | Sialkot-based production, **10+ years** of hands-on fight-gear manufacturing |
| Primary market | **UK first**, then broader Europe after repeatable validation |
| Primary conversion | Request a custom **mockup** or a **manufacturing quote** |
| Budget posture | Lean, evidence-led, **manual-first**: a person handles every lead; no automation until proven |
| Design-system review trigger | After the first 100 qualified prospects or the first 3–5 club customers |

**Sialkot context (useful for copy and SEO).** Sialkot is Pakistan's sports-goods manufacturing cluster, with a long history of leather goods, gloves and sporting equipment and established export infrastructure. The site says "made in Sialkot, not relabelled". Do not add statistics about Sialkot unless the user supplies a source.

---

## 5. Target audience

### Primary buyers
| Buyer | What they need | Site pathway |
|---|---|---|
| **Boxing clubs and gyms** | Coordinated gloves, pads and protection plus apparel in club colours; ordering across member sizes; a dependable reorder path | `/for-clubs` ("Gyms & Academies") |
| **MMA, martial-arts and kickboxing gyms** | Open-palm gloves, shin guards, rashguards, fight shorts, team apparel | `/for-clubs` |
| **Strength and fitness gyms** | Lifting belts, straps, gloves, training wear | `/for-clubs`, `/products/custom-lifting-belts` |
| **Private-label / fightwear brands** (small to growing) | Product development from a reference, sketch or tech pack; their own labels and packaging; repeatable production | `/private-label` |

### Secondary
- **Specialist retailers** need differentiated products, clear specifications and sensible order planning. There is no dedicated page yet.
- **Retailers and distributors** are **deliberately not segmented** for now. It is a confirmed out-of-scope decision, but they place the largest orders in this segment, so revisit it first if strategy changes.

### Buyer psychology to design for
- They worry about **ordering from overseas**: quality, communication, "will it match the sample?", "will a reorder match?" The answers on the site are the **sample before bulk**, the **QC evidence**, **a person reads every request** and **artwork kept on file**.
- They think in terms of **their gym**, not our category names. That is why `/products` has a "start from your gym" section.
- Many arrive with only a logo and a rough idea. The form treats "Not sure" as a valid quantity, and only product type and quantity are required on step 1.

### Conversion hierarchy
| Priority | Action | For |
|---|---|---|
| Primary | **Request Your Mockup** | Clubs and gyms (lead magnet) |
| Secondary | **Get a Manufacturing Quote** | Buyers with defined requirements |
| Tertiary | **View Custom Products** | Research-stage visitors |
| Support | WhatsApp or email | Human follow-up, not the main capture path |

Note: the header and the homepage hero currently use newer quote-led wording ("Custom Quote", "Get a Custom Quote", "Start Your Sample Order"), while the rest of the site still says "Request Your Mockup". Unifying the two sets is an open decision.

---

## 6. Reference and competitor sites

| Site | Status | What to take from it |
|---|---|---|
| **RDX Wholesale** — https://wholesale.rdxsports.com/ | Verified 24 Sep 2026 | The benchmark for B2B combat-sports information architecture (see below) |
| **genxsportservice.com** | ⚠️ **Unverified**: the domain did not resolve on 24 Sep 2026, and `genxsports.com` is a parked domain. **Ask the user for the correct URL** before using it as a reference. | — |
| Other Sialkot makers in the same segment (for positioning contrast only): Canlo Sports (canlosports.com), Rakhra International (rakhraint.com), Sulah Fight Gear (sulahfightgear.com), Genix Sports (genixsports.com) | Found by search, not reviewed in depth | Most use the generic exporter language our rules ban. Sparwright should read as specialist and transparent by contrast. |

### RDX Wholesale: what it does (as of 24 Sep 2026)
- **Navigation:** Retailers · Gyms & Academies · Distributors · Private Label · Products (Boxing / MMA / Fitness Equipment) · Partner Growth Stories · News.
- **Boxing categories:** Boxing Gloves, Punch Bags, Focus Pads, Boxing Sticks & Punch Paddles, Hand Wraps & Inner Gloves, Headgear, Chest/Ribs/Belly Protectors, Knee Wraps, Shorts.
- **MMA categories:** Thai Pads & Kicking Shields, BJJ Gis & Belts, Forearm & Elbow Guards, Groin Guards, MMA Shin Guards, Ankle Sleeves & MMA Socks, Supports.
- **Fitness categories:** Gym Gloves, Gym Belts, Gym Wear, Skipping Ropes, Sandbags, Medicine Balls, Weighted Vests, Pull-up/Dip Bars, Lifting Grips/Straps, Ab Straps, Gym Kit Bags, Sauna Suits, Gym T-shirts/Vests, Kettlebells.
- **Homepage order:** Hero → stats → "Powering every level" (four partner types) → category showcase → testimonials and case studies → catalogue download → FAQ → footer with global offices.
- **CTAs:** Request a Call Back · Request Bulk Quote · View Case Study · Download Catalogue · Inquiry Form.
- **Trust signals:** published MOQs (about 50 units for gloves, 10 for bags), warehouses in the USA, UK, Germany, Canada and UAE, Net-30 terms, 20+ case studies.

**How Sparwright differs (keep it this way):** RDX is a large established brand with stats, warehouses, published MOQs and case studies. Sparwright **cannot honestly claim any of those yet** (rules #5, #6, #12). It wins instead on **specialisation, transparency, the sample-first process, a named workshop and a person answering every brief**. Borrow RDX's **information architecture**: the audience-first navigation (Gyms & Academies and Private Label are already borrowed) and the category breadth. **Do not borrow its claims.** The Sparwright catalogue in §7.3 was compiled from a same-segment maker's range, with that brand's own series names and sanctioning-body approvals removed.

---

## 7. What the company makes

### 7.1 The six product lines that have their own pages
| # | Route | Page name | Search title (meta) | What is covered |
|---|---|---|---|---|
| 1 | `/products/custom-boxing-gloves` (**anchor product**) | Custom Boxing Gloves | Custom Boxing Gloves Manufacturer in Pakistan | Training (10–16 oz), sparring (14–16 oz), bag (10–14 oz), competition (8–10 oz), kids' gloves; genuine leather or synthetic PU; hook-and-loop or lace-up |
| 2 | `/products/fightwear-club-apparel` | Fightwear and Club Apparel | Custom Fightwear and Club Apparel Manufacturer | Fight shorts and boxing trunks, rashguards, compression wear, club T-shirts and vests, hoodies, sweatshirts, tracksuits; sublimation vs print and embroidery |
| 3 | `/products/custom-mma-gloves` | Custom MMA Gloves and Gear | Custom MMA Gloves Manufacturer in Pakistan | MMA fight (about 4 oz), sparring (6–7 oz), grappling and hybrid gloves, shin guards, kids' MMA gloves |
| 4 | `/products/custom-lifting-belts` | Custom Lifting Belts and Gear | Custom Lifting Belts Manufacturer in Pakistan | Leather belts (10 or 13 mm), training belts, dipping belts, lifting straps and grips, weightlifting gloves; leather vs nylon |
| 5 | `/products/custom-protective-gear` | Custom Head Guards and Protective Gear | Custom Protective Gear Manufacturer | Head guards (open, cheek, full face), chest and body protectors, groin guards, shin and instep guards, hand wraps and inner gloves, supports |
| 6 | `/products/custom-pads-bags-mitts` | Custom Punch Bags, Pads and Mitts | Custom Punch Bags and Focus Mitts Manufacturer | Focus mitts and pads, Thai pads, kicking shields, paddle mitts, training sticks, punch bags (filled or unfilled), bag and mitt sets |

Every product page uses the same template, in this order:
1. Hero with breadcrumb
2. Gallery and overview
3. Types (numbered sections from here)
4. Use cases
5. Material comparison (optional)
6. Customisation (the boxing-glove page shows an "exploded glove" diagram)
7. Materials and construction specification
8. Sample and approval (dark band)
9. Quality-control points
10. Related products
11. Product FAQ (6–9 questions)
12. Closing CTA

**Customisation on every line:**
- **Branding:** embroidery, print, sublimation, embossing (leather), patches, woven labels.
- **Colour:** matched to colour codes or a physical swatch, and kept on file.
- **Construction:** materials, padding, closure, stitching.
- **Sizing:** kids' to adult.
- **Packaging:** polybags, retail boxes, inserts, export cartons.
- **Private label:** your labels.

### 7.2 Made to order without a page of its own
These go to `/quote?product=<name>`:
- **Martial arts uniforms:** BJJ gi, karate uniforms.
- **Fitness accessories:** jump ropes, fitness sandbags, leg stretchers, yoga straps.
- **Kit bags:** equipment bags, gym bags.
- **Sauna wear:** suits, vests, T-shirts, shorts, leggings.

### 7.3 The full catalogue: 89 items in 11 categories (`src/lib/product-list.ts`)
The whole list is marked **"NEEDS CONFIRMATION"** by the business. Items marked *(moulded)* are injection-moulded, rubber or foam goods. They are a different manufacturing competency and are **hidden from the site** until the business confirms it makes them.

- **Boxing:** Competition Gloves, Sparring Gloves, Training Gloves, Bag Gloves, Boxing Glove and Pad Sets
- **MMA:** MMA Sparring Gloves, MMA Training Gloves, Grappling Gloves
- **Martial Arts:** BJJ Gi, Karate Uniforms
- **Training Equipment:** Training Punching Bags, Freestanding Punch Bags, Angle and Uppercut Bags, Double End Bags, Speed Bags, Speed Bag Platforms, Punching Bag and Mitt Sets, Focus Pads, Focus Mitts, Paddle Mitts, Training Sticks, Kicking Shields, Thai Pads
- **Protective Gear:** Head Guards, Mouth Guards, Chest Guards, Body Protectors, Groin Protectors, Shin Guards, Hand Wraps, Inner Gloves, Knee Wraps, Elbow Supports, Back Supports, Wrist Supports, Knee Supports, Ankle Supports
- **Strength and Lifting:** Weightlifting Gloves, Leather Lifting Belts, Training Belts, Powerlifting Belts, Dipping Belts, Lifting Grips, Lifting Straps, Arm Blasters, Ab Straps, Triceps Ropes, Head Harnesses
- **Fitness Accessories:** Jump Ropes, Fitness Sandbags, Leg Stretchers, Kettlebells *(moulded)*, Ab Rollers *(moulded)*, Aerobic Steps *(moulded)*, Balance Boards *(moulded)*, Resistance Bands *(moulded)*, Resistance Tubes *(moulded)*
- **Apparel:** T-Shirts, Vests, Trousers, Sweatshirts, Hoodies, Tracksuits, Boxing Trunks, MMA Shorts, Rashguards, Compression Tops, Compression Shorts, Compression Pants, Sauna Suits, Sauna Vests, Sauna T-Shirts, Sauna Shorts, Sauna Leggings
- **Yoga:** Yoga Straps, and *(moulded)* Cork / PU / TPE / PVC Yoga Mats, Cork Yoga Blocks, EVA Foam Blocks, Gym Balls, Balance Trainers
- **Kids:** Kids Boxing Gloves, Kids MMA Gloves, Kids Grappling Gloves, Kids Head Guards, Kids Punch Bags, Kids Boxing Sets, Kids Protective Gear
- **Bags:** Equipment Bags, Gym Bags

The header's **Products mega menu** lists this catalogue (moulded items excluded) in five columns:
- Boxing / MMA / Kids
- Bags, Pads & Mitts / Kit Bags
- Protective Gear
- Strength & Lifting / Fitness
- Apparel / Martial Arts

Each item links to its product page, or to the quote form when the item has no page.

### 7.4 Homepage "collections" (a different grouping, for the homepage carousel)
| Collection | For | Products shown |
|---|---|---|
| Boxing | Boxing gyms and clubs | Boxing Gloves, Focus Pads and Mitts, Punching Bags, Head Guards, Hand Wraps |
| MMA | MMA gyms and fightwear brands | MMA Gloves, Grappling Gloves, Shin Guards, MMA Shorts, Rashguards |
| Strength and Lifting | Strength gyms and lifting brands | Lifting Belts, Lifting Straps, Weightlifting Gloves, Lifting Grips, Dipping Belts |
| Gym Wear | Fitness brands and studios | T-Shirts and Vests, Compression Wear, Trousers and Sweatshirts, Sauna Suits |
| Club and Team Kit | Clubs ordering across members | Club T-Shirts, Hoodies and Tracksuits, Kit Bags |

### 7.5 Capabilities claimed (`src/lib/expertise.ts`, marked "STILL NEEDS CONFIRMATION")
1. **Design and tech-pack development:** build to your tech pack, or write one from a sketch.
2. **Pattern making and cutting:** patterns digitised and graded; laser or steel-die cutting.
3. **Printing and decoration:** sublimation, screen print, transfer, vinyl, embroidery.
4. **Stitching and assembly:** flatlock and overlock on knits, heavy lockstitch on leather.
5. **Quality testing:** inline checks, then measurement, colour and logo placement against the approved sample.
6. **Packing and export:** polybagging, carton assortment and markings, export documents.

### 7.6 The order process (five stages, shown on the homepage and on /how-it-works)
1. **Share requirements:** product, quantity, logo, use case and destination are captured.
2. **Review the concept:** colours, logo placement and initial specifications are aligned.
3. **Approve the sample:** materials, construction, sizing and finish are confirmed.
4. **Production and QC:** bulk is made against the approved specification and checked.
5. **Packing and delivery:** final quantity, packing and shipment documents are completed.

### 7.7 The quality-control evidence matrix
| Check | Evidence |
|---|---|
| Dimensions and weight | Measured against the approved sample |
| Material and construction | Shell, fabric, padding, closure and stitching verified |
| Branding and colour | Logo placement, method and colour reference checked |
| Labels and sizing | Size, care, wrist, neck and packaging labels |
| Quantity and packing | Count, assortment, inner packing, cartons |
| Final approval | Photographs or inspection record kept before dispatch |

---

## 8. Site map: every page, as built

The navigation is: **Products** (mega menu) · **Gyms & Academies** · **Private Label** · **Portfolio** · **About Us** (dropdown) · **Resources** (dropdown) · **Contact**, with a red **"Custom Quote"** button on the right. On mobile there is a drawer and a sticky bottom "Custom Quote" bar, which is hidden on `/quote`. The footer has five columns: Products · Work With Us · About Us · Resources · Contact.

"Indexable" means indexable once the site-wide launch gate is opened (§12). "Starter" pages are **noindex** and left out of the sitemap until their content is written.

| Route | Status | H1 / purpose | Main sections (in order) |
|---|---|---|---|
| `/` Home | Indexable | "Custom boxing gloves and fightwear, built to your specification." | Photo hero with 4 proof points → 01 Product range carousel (5 collections) → 02 Two audience cards (Gyms & Academies, Private Label) → 03 Why Sparwright (6 reasons) → 04 Customization (exploded glove, dark) → 05 How it works (5-stage stepper) → 06 Our expertise (6 capabilities) → 07 About Sparwright → 08 FAQ (12 questions in 4 groups) → closing CTA |
| `/products` | Indexable | "Custom fight gear, lifting gear and apparel." (meta title: "Custom Fight Gear and Apparel Manufacturer") | Photo hero with jump links to the 6 lines → 01 Categories (6 photo cards; "Training and Protective Gear" also links to the protective page) → 02 "Start from your gym" (4 buyer cards) → 03 Full product list (whole catalogue, "+" = opens the quote form) → 04 "One OEM and private label manufacturer for every line" (6 specification points, dark) → 05 Ordering FAQ (7) → CTA |
| `/products/[slug]` ×6 | Indexable | See §7.1 | See the template in §7.1 |
| `/for-clubs` ("Gyms & Academies") | Indexable | "Put your club identity across the entire kit." | 01 Common requirements → 02 One identity (CTA "Build Your Club Kit") → 03 All 6 product lines → 04 Mockup request (dark) → 05 Sizes and quantities across members → 06 Sampling and production → 07 FAQ (6) → CTA |
| `/private-label` | Indexable | "Your fight gear brand, built on a clear manufacturing process." | 01 Three ways a product starts (reference / sketch / tech pack) → 02 Six lines → 03 What gets specified, plus labels and branding → 04 Packaging → 05 Sampling and revisions (dark) → 06 Bulk and QC → 07 What to include in a brief → 08 FAQ (6) → CTA |
| `/manufacturing` | Indexable | "Ten years of hands-on fight-gear manufacturing experience." | Who does what (**5 roles, all names "to be confirmed before launch"**) → 6 production stages (**image placeholders**) → QC matrix → "Made in Sialkot" → CTA |
| `/quote` | Indexable | Changes with `?intent=`: "Request your mockup." or "Get a manufacturing quote." | Dark header with a mockup/quote switch and 3 assurances → form card beside a sidebar ("What happens next", "Useful to have to hand", "Prefer email?"). See §10. |
| `/portfolio` | **Noindex** (empty) | "Work made to a buyer's specification." | Empty state: "Finished orders are being photographed." |
| `/how-it-works` | **Noindex** (starter) | "How a custom fight gear order is made." | The 5-stage stepper only, which duplicates the homepage |
| `/about` + `/about/capabilities`, `/factory-tour`, `/quality-standards`, `/export-process`, `/gallery` | **Noindex** (starters) | e.g. "Inside the Sialkot workshop." | Short content drawn from existing data; the gallery is "being photographed" |
| `/resources` + `/resources/size-guide`, `/moq-guide`, `/why-pakistan` | **Noindex** (starters) | e.g. "How minimum order quantities work." | Glove-weight table; what sets an MOQ (material / branding method / colourways / construction); why Sialkot |
| `/blog` | **Noindex** | "Articles for gyms, clubs and brands." | No articles yet |
| `/contact` | **Noindex** until contact details are real | "Talk to the team in Sialkot." | Cards: Send your brief / Write to us / Message us (WhatsApp, if configured) / Where we make |
| `/privacy`, `/terms`, `/cookies` | Indexable (low priority) | — | Written to match what the site actually does; company details and governing law are marked "to be confirmed before launch"; **need legal review** |

**Structured data (JSON-LD):**
- Every page: Organization (Sialkot, PK; areaServed UK and Europe) and WebSite.
- Home: FAQPage.
- `/products`: BreadcrumbList, CollectionPage with an ItemList, FAQPage.
- Product pages, `/for-clubs` and `/private-label`: BreadcrumbList and FAQPage.
- No Product schema, on purpose: there are no prices or reviews to mark up.

**Sitemap today (15 URLs):** home, `/quote`, `/products`, the 6 product pages, `/for-clubs`, `/private-label`, `/manufacturing` and the 3 legal pages. Starter pages join the sitemap automatically once they are marked ready.

---

## 9. Brand, voice and design system

The source documents live in the repo: `docs/Sparwright_B2B_Website_Design_System_v1.0.docx` (the authority) and `docs/Sparwright_Website_PR_Roadmap_v1.0.md` (build history; **partly out of date**: it predates the photography and the four newer product pages).

### 9.1 Visual concept: "Crafted Combat"
- **70% neutral surfaces**, **20% real imagery**, **10% red accent**.
- Structured rather than sterile: seam lines, measurement marks and specification tags.
- **Must not feel like:** a generic exporter, a discount fightwear shop, a fight-night poster (flames, blood, distressed textures) or a big factory with invented statistics.

| Token | Hex | Use |
|---|---|---|
| ink-950 | #0B0D10 | Main text, dark bands, footer |
| carbon-900 | #15191F | Dark cards |
| steel-700 | #39424E | Secondary text |
| slate-500 | #636D78 (darkened from #69737E for contrast) | Muted labels |
| line-200 | #DDE1E4 | Dividers |
| border-strong | #767F87 | Form-control borders (WCAG 3:1) |
| bone-50 | #F4F1E8 | Warm page background |
| white | #FFFFFF | Cards, alternate bands |
| **forge-600** | **#D83A20** | **Actions, active states, stage numbers only** |
| forge-700 | #B8321F | Hover; red *text* on light backgrounds |
| forge-100 | #FBE6E0 | Soft highlight |
| success-600 | #1F7A4D | Confirmations |

- **Section themes:** light (bone), white, dark (ink) and action (red band, used only for short conversion moments). **Two adjacent sections must never share a theme.**
- **Type:** **Archivo** 600/700 for headings and **Inter** 400/500/600 for body. Headings use sentence case; uppercase is only for short eyebrow labels.
- **Section header pattern:** a small uppercase eyebrow with a red rule and a section number (e.g. "— 03 · FULL PRODUCT LIST"), then the H2, then a lead paragraph.
- **Layout:**
  - Container widths: 1280 (shell), 1200 (work), 720 (prose), 640 (form).
  - Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128 px.
  - Radius: 6 px for controls, 10 px for cards, 16 px for panels.
- **Motion:** subtle only. A 2 px arrow nudge, image scale up to about 1.05, and short fades. Never auto-carousels, parallax or punch effects. Reduced-motion preferences are respected.
- **Imagery:**
  - Product and process first; fighters are secondary context.
  - Product card ratio 4:5, process 3:2, hero 4:5 or 5:6.
  - Alt text describes the work, e.g. "Team member inspecting glove stitching at the Sialkot workshop".
- **Logo:**
  - Uppercase geometric SPARWRIGHT wordmark with an "S" maker's mark.
  - Lockups: horizontal, wordmark only, and mark only.
  - The horizontal lockup was composed from the supplied artwork and should be replaced with a designer's version.

### 9.2 Voice
**Direct, specific, calm, human.** State the product, the buyer, the decision and the next step.

| Use | Avoid |
|---|---|
| Custom manufacturing | Leading exporter |
| Approved sample | Best quality |
| Product specifications | World-class |
| Materials and construction | Top-notch |
| Branding and packaging | One-stop solution |
| Production and quality control | Cheapest price |
| Buyer, club, brand, destination | We deal in all kinds of products |

**Headline formulas:**
- Outcome + audience: "Custom boxing gloves for your club."
- Process + confidence: "Turn your design into an approved sample."
- Identity + range: "Build a coordinated club fight kit."
- Service + buyer: "Private-label fightwear for growing brands."

**Product description formula:** what it is → who it is for → what can be customised → what to do next.

### 9.3 SEO conventions already in place
- Titles lead with the product plus "Manufacturer" (the word that separates a buying search from a shopping search), plus "in Pakistan" where natural. The format is "{Title} | Sparwright".
- H2s carry product terms, not instructions. Each product page has a `noun`, e.g. "custom boxing gloves", that is reused in its headings.
- Every page has its own canonical URL and Open Graph data. FAQ answers open with the answer, so each can stand alone as a snippet.
- Target search themes:
  - custom boxing gloves manufacturer
  - private label boxing gloves / fightwear
  - custom MMA gloves
  - custom lifting belts
  - custom fight shorts / rashguards
  - custom punch bags / focus mitts
  - club kit
  - boxing gloves manufacturer Pakistan / Sialkot
  - OEM combat sports gear
- **Keyword ownership (avoid cannibalisation):**

| Page | Owns |
|---|---|
| Home | "custom boxing gloves and fightwear manufacturer" |
| `/products` | "custom fight gear and apparel manufacturer" |
| Each product page | Its own line |
| `/for-clubs` | "custom gym and club kit" |
| `/private-label` | "private label fight gear" |

### 9.4 CTA library (use these labels exactly)
- **Conversion:** Request Your Mockup · Get a Manufacturing Quote · Start a Sample Request · Send Your Product Brief · Start Your Product Brief (on dark bands).
- **Browsing:** View Custom Products · View Custom Gloves · Explore Custom Gloves · Explore Fightwear · Explore Club Apparel · Explore Custom MMA Gear · Explore Custom Lifting Gear · Explore Protective Gear · Explore Pads and Bags.
- **Process:** See How Production Works · How It Works · View Manufacturing Process.
- **Pathways:** Private Label Manufacturing · Club Manufacturing · Build Your Club Kit (only where the link actually starts a kit request).
- **Header and hero (newer wording):** Custom Quote · Get a Custom Quote · Start Your Sample Order.

---

## 10. The lead flow: the most important part of the site

**`/quote`** is one form for both entry points. `?intent=mockup` changes the heading and the submit label, and `?product=<name>` pre-selects a product.

**Step 1: "What you want made"**
- **The product:**
  - **Product type\*** (12 cards): Boxing Gloves · MMA Gloves · Focus Mitts and Pads · Punch Bags · Protective Gear · Lifting Belts and Gear · Fight Shorts · Rashguards · Club T-Shirts · Hoodies and Tracksuits · Multiple Products · Something Else.
  - **Quantity\***: Not sure · Under 20 · 20–49 · 50–99 · 100–249 · 250+.
- **Specification:** intended use, target delivery month, material or construction, colours.
- **Branding and references:** logo upload (SVG, PDF, AI, EPS, PNG or JPG, up to 10 MB, with real upload progress), reference products.

**Step 2: "Where we send the reply"**
- **Required:** name, email, destination country.
- **Optional:** club or business, website or Instagram, anything else.
- **Contact:** preferred contact method (Email / WhatsApp / Phone). The phone number becomes required if WhatsApp or Phone is chosen.

**After submit:** "Your request has been received." The page promises no time, price or preview. Next steps are: a person reads it → we reply with a mockup, quote or questions → a sample before bulk.

**Server side** (`POST /api/quote`):
- Validates the request and assigns a reference `SW-YYMMDD-XXXX`.
- Builds a lead record: owner, stage (`new → qualifying → concept_sent → sample_agreed → quoted → won/lost`), source (intent, entry page, referrer), and a summary of product, quantity, destination and artwork.
- POSTs the record and the artwork to `QUOTE_WEBHOOK_URL` (any CRM or automation tool).
- **In production it refuses submissions (503) until a webhook is configured**, rather than silently dropping leads.

**Analytics:** 12 fixed events.
- `hero_mockup_click`, `hero_quote_click`
- `product_card_open`
- `mockup_form_start`, `quote_form_start`, `quote_form_submit`
- `logo_upload_start`, `logo_upload_complete`
- `whatsapp_click`, `email_click`
- `sample_request`, `case_study_open`

Events fire only after cookie consent and go to `window.dataLayer`. **No analytics vendor is chosen yet.**

---

## 11. Accessibility and responsive requirements (always in scope)
- **Required test widths:** 360, 390, 768, 1024, 1280 and 1440 px. No horizontal scroll, clipped text or overlapping sticky elements.
- **Structure:** logical heading order and one H1 per page.
- **Keyboard:** visible focus on every control; menus, accordions and uploads all work without a mouse.
- **Forms:** real labels, an error icon plus a written message, and nothing typed is lost after an error.
- **Contrast:** WCAG AA text contrast, and 3:1 for form-control borders.
- **Motion:** reduced-motion preferences are respected.
- **Colour:** status is never shown by colour alone.

---

## 12. Tech stack (for context only; Claude handles the implementation)
- **Framework:** Next.js 16.3.4 (App Router, Turbopack), React 19.2, TypeScript 5, Tailwind CSS 4, ESLint 9. There are no other runtime dependencies.
- **Rendering:** content lives in typed data files (`src/lib/products.ts`, `product-list.ts`, `faq.ts`, `collections.ts`, `expertise.ts`, `site-sections.ts`) and pages are built from them. **Adding a product means adding data, not a new page file.**
- **Launch gate:** the whole site is **noindex** unless `NEXT_PUBLIC_SITE_URL` is set **and** `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- **Environment variable names:**

| Group | Variables |
|---|---|
| Site | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING` |
| Leads | `QUOTE_WEBHOOK_URL`, `QUOTE_WEBHOOK_TOKEN`, `QUOTE_SALES_OWNERS` (`category=owner` pairs with a `*` fallback) |
| WhatsApp | `NEXT_PUBLIC_WHATSAPP_NUMBER` and `WHATSAPP_NUMBER` (see known issues) |
| Analytics | `NEXT_PUBLIC_ANALYTICS_DEBUG` |

- **Hosting:** not deployed yet. `VERCEL_PROJECT_PRODUCTION_URL` is supported, so Vercel is the likely target.
- **Photography in `public/images`:** banner, boxing gloves, boxing athlete, MMA fighter, strength and lifting, gym wear, club team kit, the gyms-and-academies and private-label audience images, an exploded glove, logo mockup to finished glove, the factory floor, and the workshop stages (design and tech pack, pattern cutting, printing and decoration, stitching and assembly, quality testing, packing and export).

---

## 13. Current status, launch blockers and known issues

### Launch decision: **NO-GO**
The build is complete; what blocks launch is business input, not code.
1. **Photography gaps:**
   - `/manufacturing`: hero plus 6 stage images are placeholders.
   - Product galleries: MMA (2 slots), lifting (2), protective (2), pads (2). The pads card photo is the factory floor, not a product.
   - `/portfolio` and `/about/gallery` are empty.
2. **Named roles:** 5 people on `/manufacturing` show "Name to be confirmed before launch".
3. **Company details:** registered name, number and address, plus a data-protection contact, on `/privacy` and `/terms`.
4. **Governing law** on `/terms`, and a **qualified legal review** of all three legal pages.
5. **Contact details:** `hello@sparwright.com` is a placeholder; there is no WhatsApp number or phone yet; all 5 social links are empty.
6. **Lead destination:** `QUOTE_WEBHOOK_URL` is not set, so the form refuses leads in production.
7. **Analytics vendor** not chosen.
8. **Artwork and specification retention process:** the site promises it, but the operational process is undecided.
9. **Business confirmation of content:**
   - the 89-item catalogue, including whether moulded goods are made
   - the equipment claims in capabilities
   - material and process wording
   - the "10+ years" claim
   - the final brand name
10. **Starter pages need real content** before they can be indexed: About (5), Resources (3), Blog, Contact, How It Works (currently duplicates the homepage).

### Known issues found in code
- **Quote reference never shown:** the API returns a reference, but the success panel doesn't display it.
- **Owner routing ineffective:** the form no longer sends a `category`, so `QUOTE_SALES_OWNERS` routing by category always falls back to `*` or "unassigned". Routing should switch to `productType`.
- **WhatsApp tracking and display:**
  - The floating WhatsApp button reports `whatsapp_launcher_click`, which is not one of the 12 allowed events, so those clicks are dropped.
  - The floating button reads `WHATSAPP_NUMBER`, while the footer, contact page and CTA band read `NEXT_PUBLIC_WHATSAPP_NUMBER`. They disagree.
- **Broken image in Chrome:** `public/images/club-team-kit.jpg` (2.5 MB, 300 dpi) hangs when Next.js converts it to WebP, so it doesn't load in Chrome. Re-export it as a normal 72 dpi JPEG under about 500 KB.
- **Fightwear pre-fill:** the fightwear page has no `quoteProduct`, so its quote links don't pre-select a product.
- **Fitness and Yoga card:** on `/products` it goes straight to the quote form ("Fitness and yoga accessories" → "Something Else").
- **Mixed CTA wording:** the header and homepage are quote-led, everything else is mockup-led. This needs a decision.
- **Unconfirmed homepage order:** the section order was flagged for business confirmation.
- **Stale comment:** `src/lib/collections.ts` still says there are two product pages.

### Recent work (September 2026)
- **Navigation:** rebuilt the Gyms & Academies and Private Label pages; unified the header dropdowns; added a mobile drawer; aligned the footer with the navigation.
- **Product pages:** added the MMA, lifting, protective and pads pages; redesigned the product page template.
- **Products index:** reworked `/products` for search, with the full product list and a specification section.
- **Quote page:** redesigned `/quote` with an intent switch, a sidebar, 12 product types and a compact grid.

---

## 14. Ideas backlog (for ChatGPT to prioritise; none approved yet)
- Publish real content on the starter pages (MOQ guide, size guide, why Sialkot, factory tour), which are strong for SEO and trust.
- A **catalogue PDF download**, as on RDX, once the catalogue is confirmed.
- A **retailer/distributor pathway**, if strategy changes (currently out of scope).
- Kids' gear as a landing section or page (it is a whole catalogue category).
- Glossary or comparison articles: leather vs synthetic, glove weights, sublimation vs embroidery.
- **Phase 2** (only after demand is proven): logo preview on mockup positions, live colour switching on product templates, an automated PDF brief, saved buyer projects, a reorder flow.
- **Phase 3:** 3D preview, automated price ranges, a distributor portal, multiple languages.

---

## 15. Quick glossary
| Term | Meaning |
|---|---|
| **Mockup** | A visual of the buyer's product with their logo and colours, prepared by hand before any sample |
| **Sample** | A physical pre-production piece the buyer approves; bulk production is checked against it |
| **Bulk** | The full production order |
| **MOQ** | Minimum order quantity. **Never published as a number** on this site |
| **Private label / OEM** | We make it; the buyer sells it under their own brand |
| **Tech pack** | The buyer's technical specification document |
| **Sublimation** | Dye printed into the fabric (rashguards, shorts); it can't crack |
| **Starter page** | Built and reachable from the menu, but noindex until its content is written |
| **Band** | A full-width page section with one of the four themes |
