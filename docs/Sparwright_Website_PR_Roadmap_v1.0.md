# Sparwright Website: PR Roadmap

Thirteen sequential, reviewable pull requests that take `sparwright` from the current Next.js scaffold to a launch-ready B2B site, built directly against the tokens, components and page templates in `Sparwright_B2B_Website_Design_System_v1.0.docx`.

| | |
|---|---|
| Source | `docs/Sparwright_B2B_Website_Design_System_v1.0.docx` |
| Scope | 13 PRs across 4 phases |
| Stack | Next.js 16.3.4 · App Router · Tailwind v4 |
| Prepared | 09 September 2026 |
| Status | Draft — pending scope confirmation |

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

### PR 4 — Homepage

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

**Design system refs:** §11 Homepage order · §A Starter copy
**Depends on:** PR 3

> Open question: the source doc illustrates the homepage section stack as a figure, not an itemized list. This PR assumes Hero → Proof bar → product/audience overview → customization panel → process stepper → manufacturing teaser → final CTA. Confirm the exact order before merging.

### PR 5 — Product catalog

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

**Design system refs:** §11 Product page template · §09 Image ratios
**Depends on:** PR 4

### PR 6 — For Clubs and Gyms

The primary audience landing page — club identity across a full kit.

**Ships**
- `/for-clubs`: hero, common requirements, coordinated kit visual, product options, mockup request, size/quantity planning, sampling & production, reorders

**Files**
- `src/app/for-clubs/page.tsx`

**Design system refs:** §11 For Clubs template
**Depends on:** PR 5

### PR 7 — Private Label

Development, labelling and packaging story for fightwear-brand buyers.

**Ships**
- `/private-label`: brand-oriented hero, product development, materials/construction, labels/care/branding, packaging, sampling & revisions, bulk & QC, approved-spec retention, structured quote form entry point

**Files**
- `src/app/private-label/page.tsx`

**Design system refs:** §11 Private-label template
**Depends on:** PR 5

### PR 8 — Manufacturing and Quality

The credibility page — real process, named roles, inspectable QC.

**Ships**
- `/manufacturing`: 10-year experience intro, named ownership of product/manufacturing/QC/buyer comms, production-stage evidence, QC evidence matrix (dimensions, material/construction, branding/colour, labels/sizing, quantity/packing, final approval)

**Files**
- `src/app/manufacturing/page.tsx`
- `src/components/content/QualityMatrix.tsx`

**Design system refs:** §11 Manufacturing template · §11 QC evidence matrix
**Depends on:** PR 5

---

## Phase 3 — Conversion & operations

The workflow that turns a visitor into a qualified, trackable lead.

### PR 9 — Quote & mockup request flow

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

**Design system refs:** §08 Quote and mockup form · §08 File upload states · §14 Manual-first workflow
**Depends on:** PR 2

> Open question: confirm CRM/email destination and the sales owner assignment rule before wiring the route handler — the design system specifies the workflow, not the tooling.

### PR 10 — FAQ and legal pages

Answer the nine standard buyer questions; ship the pages the footer already links to.

**Ships**
- `FAQAccordion` (keyboard-operable) with the approved question set (MOQ, logo, samples, reference products, materials, lead time, UK/EU shipping, quote requirements, reorders); embedded on homepage and product pages
- `/privacy`, `/terms`, `/cookies`; `CookieBanner` wired to real policy content

**Files**
- `src/components/content/FAQAccordion.tsx`
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/cookies/page.tsx`

**Design system refs:** §08 FAQ accordion · §11 Legal row
**Depends on:** PR 3

---

## Phase 4 — Launch QA

No new surface area — these PRs audit and fix what already shipped, against the launch checklist.

### PR 11 — Accessibility, responsive & motion audit

Every page, every breakpoint, no mouse required.

**Ships**
- Manual + automated pass at 360, 390, 768, 1024, 1280, 1440px — no clipped text, overflow or overlapping sticky controls
- Keyboard-only walkthrough of menus, accordions and uploads; visible focus states everywhere
- Contrast check on every text/background pairing; `prefers-reduced-motion` respected; alt-text pass on all informative imagery
- Form-error states preserve user input

**Files:** fixes only — spans all components/pages

**Design system refs:** §12 Responsive & accessibility · §15 Design and responsive QA
**Depends on:** PR 1–10

### PR 12 — Analytics and lead ops

Measure the commercial funnel, not just traffic.

**Ships**
- Event tracking: `hero_mockup_click`, `hero_quote_click`, `product_card_open`, `mockup_form_start`, `logo_upload_start`/`complete`, `quote_form_start`/`submit`, `whatsapp_click`, `email_click`, `sample_request`, `case_study_open`
- Lead record captures source, product, quantity and destination; follow-up stage is trackable

**Files**
- `src/lib/analytics.ts`
- `src/app/api/quote/route.ts` (extend)

**Design system refs:** §14 Analytics events · §14 Commercial funnel
**Depends on:** PR 9

### PR 13 — Launch readiness

SEO metadata and the full §15 checklist run against the live preview.

**Ships**
- `opengraph-image`, `sitemap.ts`, `robots.ts` (Next 16 metadata file conventions)
- Launch checklist run as the PR description: brand/content, design/responsive QA, accessibility, operations — each item checked against the deployed preview, not assumed
- Go/no-go sign-off before removing any staging gate

**Files**
- `src/app/opengraph-image.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

**Design system refs:** §15 Launch checklist
**Depends on:** PR 1–12

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
| Status | Draft — pending scope confirmation |
| Review trigger | Before PR 4 and PR 9 merge |
| Working brand | Sparwright (replaceable) |
