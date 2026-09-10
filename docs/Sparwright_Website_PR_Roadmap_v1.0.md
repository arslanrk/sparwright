# Sparwright Website: PR Roadmap

Thirteen sequential, reviewable pull requests that take `sparwright` from the current Next.js scaffold to a launch-ready B2B site, built directly against the tokens, components and page templates in `Sparwright_B2B_Website_Design_System_v1.0.docx`.

| | |
|---|---|
| Source | `docs/Sparwright_B2B_Website_Design_System_v1.0.docx` |
| Scope | 13 PRs across 4 phases |
| Stack | Next.js 16.3.4 · App Router · Tailwind v4 |
| Prepared | 09 September 2026 |
| Status | All 13 PRs built · launch **blocked** on nine non-code items (see PR 13) |

> This repo runs Next.js 16.3.4, which differs from training-era Next.js in places (see `AGENTS.md`). Before implementing any PR below, check the relevant guide under `node_modules/next/dist/docs/` — routing conventions, `next/font`, metadata files and typed route props have all moved since most training data.

## Scope

**In scope (PR 1–13)**
- Design tokens, primitives, navigation, homepage
- Products index + reusable product template
- For Clubs, Private Label, Manufacturing & Quality
- Two-stage quote/mockup form with manual-first routing
- FAQ, legal pages, accessibility QA, analytics wiring

**Explicitly deferred**
- Live colour switching, logo preview on mockups (Phase 2, §14)
- Automated PDF brief, buyer portal, reorder flow (Phase 2)
- 3D preview, auto-pricing, account pricing, i18n (Phase 3)
- Case studies / testimonials — build the component, keep it hidden until a real customer project exists (§11, non-negotiable #12)

---

## Phase 1 — Foundation

Tokens, typography and the primitives every later page is built from. Nothing user-facing ships yet beyond a bare-bones layout.

### PR 1 — Design tokens & typography ✅

Replace the default Next.js scaffold's colours and fonts with the Sparwright token set.

**Ships**
- Archivo (600/700) + Inter (400/500/600) via `next/font/google`, replacing Geist
- Full colour, spacing, radius and motion tokens in `@theme`
- Container widths: page shell 1280px, working area 1200px, prose 720px, form 640px
- Metadata title/description set to the positioning statement
- Remove default scaffold assets (next/vercel/file/globe/window SVGs, sample homepage copy)

**Files**
- `src/app/layout.tsx`
- `src/app/globals.css`
- `public/*.svg` (remove)

**Design system refs:** §04 Colour system · §05 Typography · §06 Layout · §07 Motion · §13 Tokens
**Depends on:** nothing
**Status:** Complete — typecheck, lint and build pass; `/` prerenders static

> Two deviations for PR 2 onward. Tokens are declared with `@theme static`: a plain `@theme` tree-shakes any token that generates no utility, so `--space-*`, `--motion-*` and `--border-*` were emitted zero times and `var(--space-5)` would have resolved to nothing. And the 720px prose container is `--container-copy` (`max-w-copy`), not `--container-prose` — `max-w-prose` is a built-in Tailwind utility hardcoded to 65ch that overrides the theme token. The spacing scale is deliberately not mapped into Tailwind's `--spacing-*` namespace, since §06 diverges from the numeric scale above `space-4`; use `var(--space-5)`, not `p-5`.

### PR 2 — Foundation primitives ✅

The small set of components every page and pattern composes from.

**Ships**
- `Button` — primary / secondary / inverse / text-link, 52px height, 6px radius, full state set (hover, focus-visible, disabled, loading)
- `Logo` — primary lockup, wordmark-only, maker's mark, with clear-space rules baked in
- `TextLink`, `SectionHeader`, `Container`/`Section` layout helpers
- §04 theme recipes (light / white / dark / action band) as `data-theme` role overrides, so a band restyles its children through the semantic tokens

**Files**
- `src/components/foundation/Button.tsx`
- `src/components/foundation/Logo.tsx`
- `src/components/foundation/TextLink.tsx`
- `src/components/foundation/SectionHeader.tsx`
- `src/components/foundation/Container.tsx` (Container + Section)
- `src/components/foundation/cta.ts` (locked §08/§10 CTA labels)
- `src/lib/cn.ts`
- `src/app/globals.css` (theme recipes, `.section-band`)

**Design system refs:** §03 Logo system · §08 Button system · §13 Required states
**Depends on:** PR 1
**Status:** Complete — typecheck, lint and build pass; every button variant verified in the prerendered HTML

> CTA copy is locked. Only use approved labels (Request Your Mockup, Get a Manufacturing Quote, View Custom Products, How It Works…). Never Submit, Click Here, Discover More or Shop Now — §08.

### PR 3 — Navigation shell ✅

Header, mobile navigation and footer, wired into the root layout for every route.

**Ships**
- Desktop header: 76px, sticky, light surface, 1px bottom border; 6 nav items max (Products, For Clubs, Private Label, Manufacturing, How It Works)
- Products dropdown: Custom Boxing Gloves, Fightwear, Club Apparel, View All Products
- Mobile header (64px) + sticky bottom "Request a Mockup" bar, positioned to never overlap WhatsApp
- Footer: Brand, Products, Manufacturing, Contact, legal row
- `Breadcrumb` and `CookieBanner` (built now, content wired in PR 10)

**Files**
- `src/components/navigation/Header.tsx`
- `src/components/navigation/MobileNavigation.tsx` (drawer + `MobileActionBar`)
- `src/components/navigation/Footer.tsx`
- `src/components/navigation/Breadcrumb.tsx`
- `src/components/navigation/CookieBanner.tsx`
- `src/components/navigation/nav.ts` (shared navigation model)
- `src/app/layout.tsx` (wire in)
- `src/app/globals.css` (shell metrics, skip link)

**Design system refs:** §08 Header and navigation · §08 Footer
**Depends on:** PR 2
**Status:** Complete — typecheck, lint and build pass; `/` still prerenders static with the shell in place

> Header, drawer and footer read one `nav.ts` model so they cannot drift. The
> two header heights and the action bar are published as `--header-height` and
> `--action-bar-height`: `body` reserves the bar's height, and anything else
> fixed to the bottom of the viewport — the cookie banner, and the WhatsApp
> launcher when it lands — offsets against that token, which is how the §08
> no-overlap rule is held. A skip link ships alongside, since a keyboard user
> now has a header to skip past. Two follow-ups: the Products dropdown assumes
> slugs `custom-boxing-gloves`, `fightwear` and `club-apparel`, which PR 5 must
> reconcile with its seed content; and `CONTACT.email` in `nav.ts` is an
> unconfirmed placeholder for the PR 13 checklist. `Breadcrumb` and
> `CookieBanner` are built but not mounted — PR 10 wires them to real content.

---

## Phase 2 — Core pages

The six launch pathways from the information architecture, each built as a reviewable PR against its own template.

### PR 4 — Homepage ✅

Establish proposition, proof and the primary conversion action.

**Ships**
- `Hero`, `ProofBar`, `ProductCard`, `AudienceCard`, `CustomizationCard`, `ProcessStepper`, `CallToAction`
- Hero copy, proof points (10+ Years / Custom Branding / Sample Before Bulk / Made in Sialkot) and final CTA taken verbatim from the starter copy library (§A)
- Case-study section deliberately omitted — no genuine customer evidence exists yet

**Files**
- `src/app/page.tsx`
- `src/components/content/Hero.tsx`
- `src/components/content/ProofBar.tsx`
- `src/components/content/ProcessStepper.tsx`
- `src/components/content/CallToAction.tsx`
- `src/components/content/ProductCard.tsx`
- `src/components/content/AudienceCard.tsx`
- `src/components/content/CustomizationCard.tsx`
- `src/components/content/ImagePlaceholder.tsx` (named §09 shot slots)
- `src/components/foundation/cta.ts` (§08 "or equivalent" product actions)
- `src/components/foundation/Container.tsx` (`Section density`)
- `src/app/layout.tsx` (single `<main>` landmark)
- `src/app/globals.css` (`.section-band-compact`)

**Design system refs:** §11 Homepage order · §A Starter copy
**Depends on:** PR 3
**Status:** Complete — typecheck, lint and build pass; `/` prerenders static with all eight bands in order

> Open question, still open: the source doc illustrates the homepage section stack as a figure, not an itemized list. This PR ships Hero → Proof bar → products → audiences → customization panel → process stepper → manufacturing teaser → final CTA. Confirm the exact order before merging.

> Hero, proof bar, customization panel and process stepper are §08/§A verbatim.
> Three things to know. **No photography exists**, and §09 rules out stock and
> AI imagery, so every image region renders an `ImagePlaceholder` naming the
> §09 minimum-launch shot it waits on (`Hero boxing-glove image`, `Full glove
> front`, `Fight shorts`, `Club apparel flat lay`, `Workshop wide view`) —
> visible, trackable, and a PR 13 blocker. **§A gives the final CTA as "REQUEST
> A QUOTE"**, which is not in the §08 CTA library; the button renders
> "Get a Manufacturing Quote" and `cta.ts` gained three §08 "or equivalent"
> labels for the other product cards and the private-label pathway. And the
> process stepper carries `id="how-it-works"`, which is what the header's
> How It Works item has been pointing at since PR 3.

### PR 5 — Product catalog ✅

A products index plus one reusable template that every product page renders from.

**Ships**
- `/products` — `ProductCard` grid, max 4 per row desktop, 4:5 image ratio
- `/products/[slug]` — 10-section template: hero, gallery, use cases, materials/construction, customization, sample & approval, QC points, related products, FAQ, quote CTA
- Seed content for two slugs: `custom-boxing-gloves` (anchor product) and `fightwear-club-apparel`
- `ImageGallery`, `SpecificationTable`; `Testimonial`/`CaseStudyCard` built but not rendered anywhere yet

**Files**
- `src/app/products/page.tsx`
- `src/app/products/[slug]/page.tsx`
- `src/lib/products.ts`
- `src/components/content/ImageGallery.tsx`
- `src/components/content/SpecificationTable.tsx`
- `src/components/content/Testimonial.tsx` (built, rendered nowhere)
- `src/components/content/CaseStudyCard.tsx` (built, rendered nowhere)
- `src/components/navigation/nav.ts` (dropdown now built from the catalogue)
- `src/app/page.tsx` (homepage cards now read the catalogue)

**Design system refs:** §11 Product page template · §09 Image ratios
**Depends on:** PR 4
**Status:** Complete — typecheck, lint and build pass; both slugs prerender as static SSG

> **Slug reconciliation, resolved.** PR 3 guessed at three product slugs before
> the catalogue existed. §11 launches with two product pages — the anchor
> product and one combined Fightwear and Club Apparel page — and non-negotiable
> #7 rules out splitting that into thin category pages, so the catalogue seeds
> `custom-boxing-gloves` and `fightwear-club-apparel`. The Products dropdown and
> the homepage cards are now generated from `src/lib/products.ts`, so the menu
> can only offer pages that exist.

> Product copy states no MOQ, lead time or certification (non-negotiables #5,
> #6): the MOQ and lead-time FAQ answers commit to confirming per order rather
> than publishing a figure, and specification rows say what the buyer decides
> and when it is fixed. `Testimonial` and `CaseStudyCard` are built but rendered
> nowhere, and their props enforce §08 — an attributed name is required and
> `permission` only accepts the literal `"granted"`. The product FAQ renders as
> a description list; PR 10 swaps in `FAQAccordion` without moving the content.
> One fix carried over from PR 3: nav links now separate `data-active` (the
> section you are in) from `aria-current="page"` (the page you are on), so a
> product page no longer announces two links as current.

### PR 6 — For Clubs and Gyms ✅

The primary audience landing page — club identity across a full kit.

**Ships**
- `/for-clubs`: hero, common requirements, coordinated kit visual, product options, mockup request, size/quantity planning, sampling & production, reorders

**Files**
- `src/app/for-clubs/page.tsx`

**Design system refs:** §11 For Clubs template
**Depends on:** PR 5
**Status:** Complete — typecheck, lint and build pass; `/for-clubs` prerenders static

> All eight template sections in order, with the §A hero copy verbatim. Product
> options render from the catalogue rather than a second hand-written list. The
> page carries one conversion action throughout — the mockup — and "Build Your
> Club Kit" appears only where §10 permits it, on the coordinated-kit section
> whose destination is unambiguous. No MOQ, price break or lead time anywhere
> (#5, #6); the reorder section describes retention of the approved
> specification, which is non-negotiable #11.

### PR 7 — Private Label ✅

Development, labelling and packaging story for fightwear-brand buyers.

**Ships**
- `/private-label`: brand-oriented hero, product development, materials/construction, labels/care/branding, packaging, sampling & revisions, bulk & QC, approved-spec retention, structured quote form entry point

**Files**
- `src/app/private-label/page.tsx`

**Design system refs:** §11 Private-label template
**Depends on:** PR 5
**Status:** Complete — typecheck, lint and build pass; `/private-label` prerenders static

> All nine template sections in order, §A hero copy verbatim. The audience is a
> brand owner rather than a club, so the action is "Send Your Product Brief"
> rather than the mockup. Section 9 is the entry point to the structured quote
> form — it lists what to include in a brief; the form itself ships in PR 9.

> Review fix applied across PR 5 and PR 7: two pages had leaked design-system
> section numbers into buyer-facing copy ("§11 rules out publishing any we
> would not"). The rationale now lives in a code comment and the visible
> sentence states the commitment plainly.

### PR 8 — Manufacturing and Quality ✅

The credibility page — real process, named roles, inspectable QC.

**Ships**
- `/manufacturing`: 10-year experience intro, named ownership of product/manufacturing/QC/buyer comms, production-stage evidence, QC evidence matrix (dimensions, material/construction, branding/colour, labels/sizing, quantity/packing, final approval)

**Files**
- `src/app/manufacturing/page.tsx`
- `src/components/content/QualityMatrix.tsx`

**Design system refs:** §11 Manufacturing template · §11 QC evidence matrix
**Depends on:** PR 5
**Status:** Complete — typecheck, lint and build pass; `/manufacturing` prerenders static

> Opens with the §A ten-years line, then named ownership, six production
> stages and the §11 QC evidence matrix verbatim. `QualityMatrix` is a real
> `<table>` with `scope` and a caption — the check-to-evidence pairing is
> information a description list would lose — and it scrolls inside its own
> container rather than making the page scroll sideways at 360px.

> **Two launch blockers are visible on the page by design.** §11 wants each
> responsibility named, and non-negotiable #5 forbids inventing a person to do
> it, so all five roles render "Name to be confirmed before launch" until the
> real names are added. Every production stage names the §09 shot it waits on
> (`Pattern cutting`, `Stitching process`, `Printing or embroidery`,
> `Quality inspection`, `Packaging`, `Workshop wide view`). No certification is
> claimed anywhere.

---

## Phase 3 — Conversion & operations

The workflow that turns a visitor into a qualified, trackable lead.

### PR 9 — Quote & mockup request flow ✅

Replace the generic contact form with the two-stage structured workflow.

**Ships**
- `/quote`: Step 1 — product requirements (category, type, quantity, use, material, colours, logo, references, target month); Step 2 — buyer info (name, club/business, country, email, phone/WhatsApp, site/Instagram, notes)
- `FileUpload` with default / uploading (real progress) / success / error states; form data preserved on error
- `QuoteForm`, `FormField`, `SelectField`, `RadioCard`, `Checkbox`, `Alert`, `SuccessPanel`
- Route handler → email/CRM notification with an assigned sales owner (manual-first workflow, no automated pricing/preview yet)

**Files**
- `src/app/quote/page.tsx`
- `src/app/api/quote/route.ts`
- `src/components/forms/QuoteForm.tsx`
- `src/components/forms/FileUpload.tsx`
- `src/components/forms/FormField.tsx`
- `src/components/forms/SelectField.tsx`, `RadioCard.tsx`, `Checkbox.tsx`, `Alert.tsx`, `SuccessPanel.tsx`
- `src/lib/quote.ts` (field set, options and validation shared by browser and server)
- `src/lib/leads.ts` (delivery adapter and sales-owner assignment)

**Design system refs:** §08 Quote and mockup form · §08 File upload states · §14 Manual-first workflow
**Depends on:** PR 2
**Status:** Complete — typecheck, lint and build pass; route handler exercised end to end (201 with reference, 422 field errors, 415 bad artwork, 413 oversize, 503 unconfigured)

> **Open question, answered with a pluggable default — confirm before launch.**
> §14 specifies the workflow, not the tooling, so delivery sits behind one
> adapter in `src/lib/leads.ts` chosen by environment variable:
> `QUOTE_WEBHOOK_URL` (multipart POST, artwork included — works with any CRM,
> mailer or automation platform), optional `QUOTE_WEBHOOK_TOKEN`, and
> `QUOTE_SALES_OWNERS` as declarative `category=owner` pairs with a `*`
> fallback. Verified against a local receiver: the webhook gets the bearer
> token, the fields and the file. With nothing configured the lead is logged in
> development and **refused with a 503 in production** — accepting a lead we
> cannot deliver is worse than an honest error. Swapping in the real
> destination is a config change, not a rewrite.

> Progress on the upload is genuinely the browser's upload progress:
> `XMLHttpRequest`, because `fetch` still cannot report request-body progress
> and §08 asks for real progress, not an animated bar. Artwork rides in the
> same multipart submission, so there is one network call and one thing that
> can fail. Both steps stay mounted and nothing is cleared on error — a failure
> returns the buyer to the step that needs attention with every answer intact
> (§08, §12). No price, preview or response time is promised anywhere (§14,
> non-negotiables #6 and #9).

### PR 10 — FAQ and legal pages ✅

Answer the nine standard buyer questions; ship the pages the footer already links to.

**Ships**
- `FAQAccordion` (keyboard-operable) with the approved question set (MOQ, logo, samples, reference products, materials, lead time, UK/EU shipping, quote requirements, reorders); embedded on homepage and product pages
- `/privacy`, `/terms`, `/cookies`; `CookieBanner` wired to real policy content

**Files**
- `src/components/content/FAQAccordion.tsx`
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/cookies/page.tsx`
- `src/components/content/LegalPage.tsx` (shared shell for the three)
- `src/components/navigation/CookieSettings.tsx` (§11 "cookie settings")
- `src/lib/faq.ts` (the §08 nine, site-wide)
- `src/app/layout.tsx` (CookieBanner mounted), `src/app/page.tsx`, `src/app/products/[slug]/page.tsx`

**Design system refs:** §08 FAQ accordion · §11 Legal row
**Depends on:** PR 3
**Status:** Complete — typecheck, lint and build pass; all three legal routes prerender static

> `FAQAccordion` is built on native `<details>`/`<summary>`. §12 requires a
> keyboard-operable accordion and the platform gives that away free — Enter and
> Space toggle, the open state reaches assistive technology with no
> `aria-expanded` bookkeeping, and it works before JavaScript loads. Answers open
> independently: §08 does not ask for one-at-a-time, and closing someone's answer
> because they opened another is a small hostility on a page meant to answer
> questions. The site-wide nine sit on the homepage; product pages keep their own
> narrower set, which replaces PR 5's description list.

> **The legal pages describe what the site actually does** — a quote form that
> reaches a person, and one consent value in local storage — and claim no
> certification or processor we have not chosen. Company name, registration,
> data-protection contact and governing law render as marked gaps rather than
> plausible inventions (non-negotiable #5); that is four blockers on each of
> Privacy and Terms for the PR 13 checklist. **These pages need review by someone
> qualified before launch.** The cookie page carries the §11 "cookie settings"
> control, so a visitor can change their mind without clearing site data, and the
> banner is now mounted in the root layout.

---

## Phase 4 — Launch QA

No new surface area — these PRs audit and fix what already shipped, against the launch checklist.

### PR 11 — Accessibility, responsive & motion audit ✅

Every page, every breakpoint, no mouse required.

**Ships**
- Manual + automated pass at 360, 390, 768, 1024, 1280, 1440px — no clipped text, overflow or overlapping sticky controls
- Keyboard-only walkthrough of menus, accordions and uploads; visible focus states everywhere
- Contrast check on every text/background pairing; `prefers-reduced-motion` respected; alt-text pass on all informative imagery
- Form-error states preserve user input

**Files:** fixes only — spans all components/pages

**Design system refs:** §12 Responsive & accessibility · §15 Design and responsive QA
**Depends on:** PR 1–10
**Status:** Complete — audited in a real browser (Playwright/Chromium) across 6 widths × 11 routes; all findings fixed and the suite re-run clean

**What the audit covered and found**

| Check | Result |
|---|---|
| Horizontal overflow at 360/390/768/1024/1280/1440 | Clean on all 11 routes, first run |
| Sticky mobile bar vs. content | Clean — `body` reserves `--action-bar-height` |
| Heading order | **3 fixed** — `/products` jumped h1 → h3 |
| Tap targets (WCAG 2.5.8, 24px) | **2 fixed** — footer/breadcrumb link lists, product-card titles |
| Contrast, every text/background pairing | **6 fixed** — see below |
| Keyboard walkthrough, 30 focus stops | Clean — visible ring on every stop, skip link first |
| Mobile drawer | Clean — scroll locked, Escape closes, focus returns |
| `prefers-reduced-motion` | Clean — zero elements animate under reduce |
| Alt text | Nothing to check yet: no `<img>` exists, only named §09 shot slots |
| Form data preserved through errors | Clean — verified through a real 503, a validation failure and a rejected upload |

> **The contrast failures were real, and three were in the §04 palette itself.**
> Slate #69737e scored 4.27:1 on the Bone band — under 4.5 for the 12px
> eyebrows and hints that use it everywhere — so it is darkened to #636d78
> (4.66 on Bone, 5.26 on White). Forge 600 as *text* is 4.09:1 on Bone, so a
> new `--color-action-text` role resolves to Forge 700 on light bands while
> fills keep Forge 600, which only owes 3:1. And Line #dde1e4 is a 1.32:1
> hairline: correct for a divider, not legal as the boundary of a form control,
> which WCAG 1.4.11 holds to 3:1 — inputs, radios and checkboxes now use a new
> `--color-border-strong` (#767f87). The customization spec tag dropped Forge
> for the muted role: it is 12px on the dark band, where Forge is 4.21:1.
> The contrast check reads the tokens straight out of `globals.css`, so it
> cannot drift from what ships; all 21 pairings pass.

> The product-card title is now a stretched link — its `::after` covers the
> card — so the activation area is the whole card rather than 22px of text.
> Reproducing the audit needs Playwright with Chromium; it was run as a
> development tool and deliberately not added to `package.json`, since this PR
> is fixes only.

### PR 12 — Analytics and lead ops ✅

Measure the commercial funnel, not just traffic.

**Ships**
- Event tracking: `hero_mockup_click`, `hero_quote_click`, `product_card_open`, `mockup_form_start`, `logo_upload_start`/`complete`, `quote_form_start`/`submit`, `whatsapp_click`, `email_click`, `sample_request`, `case_study_open`
- Lead record captures source, product, quantity and destination; follow-up stage is trackable

**Files**
- `src/lib/analytics.ts`
- `src/components/analytics/AnalyticsListener.tsx` (one delegated listener)
- `src/app/api/quote/route.ts`, `src/lib/leads.ts` (lead record extended)
- CTA wiring across the homepage, product, for-clubs, header, drawer and footer

**Design system refs:** §14 Analytics events · §14 Commercial funnel
**Depends on:** PR 9
**Status:** Complete — all twelve §14 events defined and wired; funnel verified end to end in a real browser, with consent on and off

> **Consent gates everything.** `track` drops the event unless the visitor
> accepted analytics on the PR 10 banner, and events are not queued for
> retroactive replay. Verified: a session that chooses "Essential Only" records
> zero events through a full click-through.

> **No vendor is wired in** — which analytics product to use is a launch
> decision. Events push to `window.dataLayer` (the shape GTM and GA4 read) and
> dispatch a DOM event alongside; adding the vendor script later costs one
> `<script>` tag. `NEXT_PUBLIC_ANALYTICS_DEBUG=true` logs the funnel to the
> console so it can be checked before any vendor exists. Event names are a
> closed union of the §14 twelve: a typo fails to compile rather than quietly
> creating a new event.

> Pages stay server components — measured CTAs carry `data-analytics` and one
> delegated listener in the layout does the work, rather than turning every
> page into a client component for a counter.

> **The funnel test found a real attribution bug.** The header, drawer and
> sticky-bar CTAs all say "Request Your Mockup" but linked to a bare `/quote`,
> so every mockup request that did not start at a hero was recorded as a plain
> quote. They now carry `intent=mockup` and report `hero_mockup_click` with a
> `surface` property (hero / header / drawer / action_bar) — §14 fixes the
> twelve names, so surfaces are told apart by a property, not an invented name.

> Lead records now carry `stage` (starting at `new`, with the §14 follow-up
> stages typed), `source` (intent, entry path, external referrer) and a
> `summary` of the four fields the commercial funnel reports on — product,
> quantity, destination, artwork — lifted out so the destination system does
> not need to know our field names. Verified against a local receiver.

> §14 also lists WhatsApp as the secondary contact. It sits in the footer, not
> as a floating launcher, so it cannot compete with the primary CTA (§15), and
> it appears only when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set — no invented number.

### PR 13 — Launch readiness ✅ (built) · ⛔ NO-GO to publish

SEO metadata and the full §15 checklist run against the live preview.

**Ships**
- `opengraph-image`, `sitemap.ts`, `robots.ts` (Next 16 metadata file conventions)
- Launch checklist run as the PR description: brand/content, design/responsive QA, accessibility, operations — each item checked against the deployed preview, not assumed
- Go/no-go sign-off before removing any staging gate

**Files**
- `src/app/opengraph-image.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/lib/site.ts` (canonical origin, indexing gate)
- `src/app/layout.tsx` (`metadataBase`, Open Graph, robots directive)

**Design system refs:** §15 Launch checklist
**Depends on:** PR 1–12
**Status:** Metadata complete and verified. **The launch checklist does not pass — see the go/no-go below.**

> **Indexing is off until someone turns it on.** `robots.ts` and the layout's
> robots directive both return `noindex` unless `NEXT_PUBLIC_SITE_URL` is set
> *and* `NEXT_PUBLIC_ALLOW_INDEXING=true`. §15 gates launch on a go/no-go
> decision, and a preview build getting quietly indexed would make that
> decision for us. Verified in both modes: unset gives `Disallow: /` and
> `noindex, nofollow`; set gives the full sitemap of 11 URLs at the real
> origin, `Allow: /` with `/api/` excluded, and `index, follow`.

> **Brand artwork, added after the thirteen PRs.** The supplied sources live in
> `public/images` and `scripts/build-brand-assets.mjs` (`npm run brand`) cuts
> them into §03's three variants plus the browser icons. The crops are measured
> at run time rather than hard-coded, which is what caught the real trap here:
> the light and dark lockups are *different renderings*, so the box measured
> from one sliced the S and the T off the other's wordmark. `Logo` imports the
> files statically, so each tone's aspect ratio comes from its own artwork.
> The header, drawer and footer all carry the mark. The supplied set has no
> horizontal lockup and the stacked one falls under §03's 140px minimum in a 64px
> header, so the build script composes one: the mark set to the height of the
> wordmark block, and the gap between them taken from the stacked lockup's own
> mark-to-wordmark spacing, applied on the other axis. That keeps it a
> rearrangement of the brand's spacing rather than an invention. **Replace it
> with a real horizontal lockup when the designer supplies one.**

> The Open Graph image is no longer typographic: it carries the real inverse
> wordmark. It is still not photographic, for the same reason the rest of the
> site is not. A link preview is where a borrowed stock image would do the most
> damage, since it is the first thing a buyer sees. It renders at build time
> (1200×630 PNG, verified) and swaps for a real one when the shoot lands. The
> sitemap is generated from the catalogue, so a new product page cannot be
> added and quietly left out.

#### §15 launch checklist, run against a production build

Run locally with `next build && next start`, not against a deployed preview —
no deployment exists yet. Everything below marked ✅ was checked, not assumed.

**Brand and content**

| Item | |
|---|---|
| Working or final name used consistently | ✅ one `SITE_NAME`, and the real §03 wordmark now renders in the header, footer, drawer and link preview |
| Product, buyer and manufacturing model clear above the fold | ✅ §A hero copy verbatim on every landing page |
| No invented customer, capacity or satisfaction statistics | ✅ proof bar is four factual points; `Testimonial`/`CaseStudyCard` render nowhere |
| Every MOQ, material, lead-time and process statement confirmed internally | ⛔ **not confirmed** — the site publishes no MOQ or lead time by design, but the material and process wording still needs a read by the team |
| Primary CTA language consistent | ✅ every label comes from the locked `cta.ts` |
| Sialkot origin and team roles presented accurately | ⛔ **five roles have no name** |
| Brand artwork in place | ✅ supplied logo and mark cut into the §03 variants, plus browser icons |

**Design and responsive QA**

| Item | |
|---|---|
| All pages tested at 360/390/768/1024/1280/1440 | ✅ 11 routes × 6 widths, automated |
| No clipped text, overflow, broken grids, overlapping sticky controls | ✅ clean |
| Hero and product imagery crops correctly at every breakpoint | ⛔ **no imagery exists to crop** |
| Forms comfortable on mobile and preserve input | ✅ verified through a 503, a validation failure and a rejected upload |
| Typography, colour, radius and spacing use approved tokens | ✅ (with the three §04 contrast corrections from PR 11) |
| WhatsApp does not compete with the primary CTA | ✅ footer only, and only when a number is configured |

**Accessibility and interaction**

| Item | |
|---|---|
| Keyboard navigation without traps | ✅ 30 focus stops, skip link first, drawer traps and releases correctly |
| Visible focus on every control | ✅ |
| Contrast in all states | ✅ 21 pairings, computed from the shipped tokens |
| Reduced motion respected | ✅ zero elements animate under `reduce` |
| Alt text on informative imagery | n/a — no `<img>` exists yet; **becomes a blocker the moment photography lands** |

**Operations**

| Item | |
|---|---|
| Email or CRM notification with assigned owner | ✅ built and verified against a receiver — ⛔ **no destination configured** |
| Lead status and follow-up tracking | ✅ stage, source and funnel summary on every lead |
| Basic analytics events and funnel reporting | ✅ all twelve §14 events verified — ⛔ **no vendor chosen** |
| Approved artwork and specification storage process | ⛔ **not decided** — the site describes retention; the process behind it does not exist yet |

#### Go/no-go

**NO-GO.** The build is complete and every automated check passes, but §15 is
explicit that trust lost through an unsupported claim costs more than an
unfinished feature — and the site cannot yet honour what it would be saying.
Nine things block publication, none of them code:

1. **Photography.** 18 named §09 shots are still placeholders, including the
   homepage hero and every production stage. §09 rules out stock and AI
   imagery, so this is a shoot, not a sourcing task. *(Brand artwork has since
   landed and is wired in — this blocker is product and manufacturing
   photography only.)*
2. **Named roles.** Five responsibilities on `/manufacturing` render
   "Name to be confirmed before launch".
3. **Company identification.** Registered name, number, address and
   data-protection contact are marked gaps on `/privacy`.
4. **Governing law** and company identification are marked gaps on `/terms`.
5. **Legal review.** Both pages were written to describe what the site
   actually does; neither has been read by anyone qualified.
6. **Contact details.** `hello@sparwright.com` is an unconfirmed placeholder
   and no WhatsApp number exists.
7. **Lead destination.** `QUOTE_WEBHOOK_URL` is unset, so the form correctly
   refuses submissions in production rather than dropping them.
8. **Analytics vendor.** Events fire into `dataLayer` with nothing reading it.
9. **Artwork retention process.** The site promises approved specifications
   are kept; the operational process behind that promise is undecided.

Items 6–8 are configuration and could be done in an afternoon. Items 1–5 and 9
need the business, not the repo. **Do not set `NEXT_PUBLIC_ALLOW_INDEXING`
until items 1–5 are closed** — the staging gate is the last thing to remove.

---

## Non-negotiables — hold at every PR review

1. Use real manufacturing and product images.
2. Present combat sports as the specialization.
3. Make the quote and mockup process obvious.
4. Keep one primary CTA per section.
5. Never invent metrics, customers or certifications.
6. Do not publish unconfirmed MOQs or lead times.
7. Do not create dozens of weak product pages.
8. Do not use generic exporter language.
9. Do not build the full configurator before demand is proven.
10. Make every page work properly at 360px.
11. Preserve approved artwork and specifications for reorders.
12. Hide social proof until genuine evidence exists.

---

## Document control

| Field | Value |
|---|---|
| Plan | Sparwright website PR roadmap |
| Based on | Design system v1.0 |
| Prepared | 09 September 2026 |
| Status | All 13 PRs built; see PR 13 for the go/no-go |
| Review trigger | Before PR 4 and PR 9 merge — PR 4 order still unconfirmed, PR 9 destination still unconfigured |
| Working brand | Sparwright (replaceable) |
