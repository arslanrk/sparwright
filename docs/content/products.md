# Products page — content

Route: `/products` · Role: the hub for every product page, and the site's page for the head term. The menu, the footer, the breadcrumbs and every "view all" link land here.

Audience: gyms, clubs and academies ordering kit, and brands developing private label products, in the UK and Europe. Most arrive knowing roughly what they need and want to confirm three things: that Sparwright makes it, how it can be customised, and how an order across several products works.

Rules this copy keeps to: no invented numbers, customers or certifications; no published minimums, prices or lead times; no testimonials; one primary action per section. Where an answer depends on the product, the copy says what it depends on and when it gets confirmed.

Each section has one job: hero, what is made and for whom · 01 the categories · 02 route a buyer by the kind of gym or brand · 03 the full list, for "do you make my exact item?" · 04 what can be specified on any line, and who makes it · 05 how an order across lines works · closing, start a brief.

The product lines, their types and the full list come from `src/lib/products.ts`, `src/lib/product-list.ts` and the mega menu, so this document does not repeat them. Only the copy around them is written here.

---

## SEO

- **Meta title:** Custom Fight Gear and Apparel Manufacturer | Sparwright
- **Meta description:** Custom boxing and MMA gloves, fightwear, protective gear, punch bags and lifting belts, made in Sialkot, Pakistan for gyms, clubs and private label brands.
- **Primary keyword:** custom fight gear and apparel manufacturer (the phrase assigned to /products in the project brief)
- **Supporting:** custom boxing gloves manufacturer, OEM fight gear, private label combat sports equipment, custom MMA gloves, custom fightwear, custom lifting belts, fight gear manufacturer Pakistan

Target the UK and Europe as the market, never as the place of manufacture: production is in Sialkot, Pakistan.

---

## Hero

**Eyebrow:** Custom products

**H1:** Custom fight gear, lifting gear and apparel.

**Description:** Boxing and MMA gloves, fightwear, protective gear, pads and bags, and lifting gear, made in Sialkot, Pakistan for gyms, clubs and private label brands. Each product is made to a specification you approve on a physical sample before bulk production.

**Primary action:** Get a Manufacturing Quote → `/quote`

**Secondary action:** Request Your Mockup → `/quote?intent=mockup`

**Beside the copy:** the six product lines as tiles, each linking to its page. Tile labels are the lines' short names from `products.ts`.

---

## 01 — Product categories

**Eyebrow:** Product categories

**H2:** Custom boxing, MMA, fightwear, protective and lifting gear.

**Intro:** Six product lines, each specified, sampled and branded in the same way.

**Category cards:** one per dedicated product line, in this order. Each card shows the first three product types from `products.ts` and links to its page.

| Card | Destination |
|---|---|
| Boxing Gloves | `/products/custom-boxing-gloves` |
| MMA Gloves & Gear | `/products/custom-mma-gloves` |
| Fightwear & Club Apparel | `/products/fightwear-club-apparel` |
| Protective Gear | `/products/custom-protective-gear` |
| Pads, Bags & Mitts | `/products/custom-pads-bags-mitts` |
| Lifting Belts & Gear | `/products/custom-lifting-belts` |

Products with no page of their own (fitness accessories, yoga, kit bags, martial arts uniforms) stay in the full product list (03), where brief-only products belong.

---

## 02 — Start from your gym

**Eyebrow:** Start from your gym

**H2:** Find the products that fit your gym or brand.

**Description:** Not every buyer starts with a product category. Choose the gym, club or brand closest to yours to see which product lines usually fit. One quote can cover all of them.

**Buyer tabs** (title, one line, the product lines that usually fit, the page written for that buyer):

- **Boxing gyms and clubs:** Gloves for members, pads for coaches and protection for sparring. Lines: boxing gloves + pads, bags and mitts + protective gear. Page: Club Manufacturing → `/for-clubs`
- **MMA and kickboxing gyms:** Open-palm gloves and shin guards, with fightwear to match. Lines: MMA gear + fightwear and apparel + protective gear. Page: Club Manufacturing → `/for-clubs`
- **Strength and fitness gyms:** Belts, straps and gloves for the lifting floor, and training wear to go with them. Lines: strength and lifting + fightwear and apparel. Page: Club Manufacturing → `/for-clubs`
- **Private label brands:** Any product line, under your own name, labels and packaging, as one product or a range. Lines: boxing gloves + fightwear and apparel + strength and lifting. Page: Private Label Manufacturing → `/private-label`

**End tile:** One brief · One quote → opens a brief for several products

**Line under each set:** Written for [buyer]: [page link]

"Kit" is used only where it is natural for clubs; brands get "range".

---

## 03 — Full product list

**Eyebrow:** Full product list

**H2:** Everything we make to order.

**Description:** Search the list or filter by category. Products with their own page link to it; those marked Brief open a request with the product already named.

**Search placeholder:** Search, e.g. speed bag, gi, belt

**Result line:** Showing [n] of [total] products (for "[query]")

**No results:** **Not on the list?** Send us a reference or a description and we can confirm whether it is something we can make. Send a brief for "[query]".

---

## 04 — Made to your specification

**Eyebrow:** Made to your specification

**H2:** One OEM and private label manufacturer for every line.

**Description:** Sparwright makes custom fight gear, lifting gear and apparel in Sialkot, Pakistan, for gyms, clubs and brands in the UK and Europe. Every product on this page is specified in the same way, so one colour reference and one logo treatment can carry across a whole order.

**Photo label:** Every layer, specified

**Specification points:**

- **Logo and branding:** Embroidery, print, sublimation, embossing, patches or woven labels, with the method chosen for each product and material.
- **Colours matched to yours:** Send colour codes or a physical swatch. The colour is confirmed on the sample and kept on file for reorders.
- **Materials and construction:** Leather or synthetic, padding, fabrics, closures and stitching, chosen for how the product will be used.
- **Kids' to adult sizing:** Junior and adult sizing can be included where available, with the size mix confirmed in the product specification.
- **Private label and packaging:** Your labels, polybags, retail boxes, inserts and export cartons, so the product arrives under your name.
- **A sample before bulk:** A physical sample is approved before bulk production begins, and bulk is made and checked against it.

**Action:** View Manufacturing Process → `/manufacturing`

---

## 05 — Ordering FAQ

**Eyebrow:** Ordering

**H2:** Ordering custom gear across product lines

**Group: Mixed orders**

**Can one order include several product lines?**
Yes. Gloves, fightwear, pads, protective gear and lifting gear can go into one brief and be quoted together, so a club or brand can order several products at once.

**Is the minimum order per product or per order?**
Minimum quantities depend on each product and its specification, including materials, construction and branding. The applicable requirement is confirmed with your quote, before you commit.

**Does each product need its own sample?**
Products that require sampling are approved before their bulk production begins. Which products need a sample is confirmed with your quote.

*Business confirmation required:* if every product in a mixed order is sampled, this can go back to "Yes. A sample is made for each product in the order…"

**Can one logo and colour scheme carry across everything?**
Yes. One colour reference and one logo treatment can be applied across every line in the order and checked on each sample. Different materials reproduce colour differently, so the match is confirmed product by product.

**Group: Your range**

**Can we start with one line and add others later?**
Yes. Approved artwork, colour references and specifications can be kept on file, so a line added later is developed against the same reference.

**Do you make kids' boxing gloves and gear?**
Yes. Kids' boxing, MMA and grappling gloves, head guards, punch bags and boxing sets can be made alongside the adult range, in the same colours and branding.

**Do you make products that are not listed here?**
If the product is not listed, send a reference or a description. We can confirm whether it fits Sparwright's manufacturing capability before you proceed.

---

## Closing band

**Eyebrow:** Start your order

**H2:** Tell us what you want made.

**Description:** Send the product, your logo, a rough quantity and where it ships. A person reads every brief and replies with any questions left.

**Picker:** Start with… · Pick one to start a brief · six product tiles · **Several products in one order** — a full kit or range, quoted together

**Primary action:** Get a Manufacturing Quote → `/quote`

**Secondary action:** Request Your Mockup → `/quote?intent=mockup`

**Line on the panel:** Nothing goes to bulk until you approve it.

---

## Changes after review

Applied from the ChatGPT review (91/100, patch before publish):

- **Section 01:** now one card per dedicated product line: Boxing Gloves, MMA Gloves & Gear, Fightwear & Club Apparel, Protective Gear, Pads, Bags & Mitts, Lifting Belts & Gear. The cards are built from `products.ts`. Fitness and Yoga, which has no page, was removed. Protective and Pads are separate again. The H2 now names the lines it shows.
- **Unlisted products:** the unsupported claims "We often make products that are not listed" and "the list covers what we make most often" are replaced. The copy now says we can confirm whether a product is something we can make.
- **Samples:** "a sample for each product" is softened to "products that require sampling". This is flagged for business confirmation.
- **Minimums:** "minimums are set per product" is softened to "depend on each product and its specification".
- **Sizing:** "graded across the range" is replaced with "junior and adult sizing can be included where available". Grading capability is still unconfirmed.
- **Sample before bulk:** it no longer implies that every order goes mockup → sample.
- **SEO:** the primary keyword is "custom fight gear and apparel manufacturer", the phrase assigned to this page in the project brief.
- **Section 02:** renamed from "Find your kit". It now reads "Start from your gym" / "Find the products that fit your gym or brand", and brands get "range" instead of "kit".

### Still to confirm with the business

- Whether every product in a mixed order is sampled (FAQ, "Does each product need its own sample?").
- Pattern grading across sizes (section 04, sizing), before it can be stated more strongly.
- That the full product list is the confirmed catalogue.
