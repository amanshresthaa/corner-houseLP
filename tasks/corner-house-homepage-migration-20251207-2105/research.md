# Research: Corner House Homepage Migration

## Existing Patterns & Architecture
- Homepage rendering is driven by the server component in `app/page.tsx`, which loads structured content via `getContentSmart` and hydrates `ClientHomeContent` with section payloads and slideshow data.
- The entire homepage copy, CTA configuration, review quotes, and quick links live in `config/content.json` under `pages.home` plus the global `components.slideshow` object. There are no per-environment overrides (empty `/data/{env}` trees), so editing this file updates all deployments.
- `ClientHomeContent` selectively renders sections when arrays contain items, and passes `components.slideshow.slides` into the `Showcase` hero. This means we only need to edit JSON content; no component-level refactors are required.
- Visual assets referenced in `content.json` currently pull from `/public/images/white-horse/...` even though `/public/images/corner-house` is empty. For food photography we can leverage `/public/images/food/*.jpeg` which already contain Himalayan dishes aligned with the new venue.

## Source Material Highlights (CornerHouse1.md & CornerHouse2.md)
- Identity: 1930s art-deco pub on Newmarket Road with Nepalese kitchen, HD sports focus, heated cabins, quiz nights, CAMRA award (2020) and Tripadvisor Travelers’ Choice 2025.
- Offerings: Dual menu (Nepalese curries like Himali Lamb, Chicken Rum Rum, Khasi Ko Masu; pub classics including fish & chips and Sunday roast). Emphasize momo, mixed grills, goat curry, Nepalese chefs, vegetarian & gluten-free accommodation.
- Facilities: Heated garden cabins, covered beer garden, fireplaces, shuffleboard/games, HD wall-to-wall screens plus outdoor projector, table service plus family/dog friendly policies, accessible ramp/WC.
- Contact & Logistics: +44 1223 921122 (WhatsApp-enabled), cornerhouse@lapeninns.com, address 231 Newmarket Road CB5 8JE, limited parking + Park & Ride, Citi 3 bus, Abbey Stadium proximity. Kitchen hours split weekdays/weekends; bar later Fri/Sat.
- Reputation: Google 4.4★ (800+), Tripadvisor 4.6★, Travelers’ Choice 2025, CAMRA Most Improved City Pub 2020, Food Hygiene 5★ (2025). Testimonial snippets given (Tony B., Colin S., C.V., Frances D., Josh P.).
- Differentiators: Hybrid "Desi Pub" proposition, "Casual Luxe" positioning, multi-zone layout (front sports bar, dining wing, snugs, heated cabins), community-forward story via Lapen Inns network.

## Gaps Identified in Current Homepage Content
- Slideshow copy still references “The White Horse”, generic village pub positioning, and CTA labels for White Horse-specific sections. Imagery alt text and eyebrow copy do not describe Corner House experiences (heated cabins, Abbey Stadium, Nepalese sports hub).
- Signature dish imagery still points to `/images/white-horse/dishes/...` assets. Need to swap to available food imagery or create corner-house specific asset references to reduce White Horse coupling.
- About section hero image path references `white-horse/exterior/...`; should describe Corner House art-deco facade or at least use neutral asset, plus update body text with doc-specific facts (CAMRA award, Lapen Inns acquisition, heated cabins, Nepalese chef team, sports credentials, Sunday roast callouts, etc.).
- Feature bullets mention relevant ideas but can be deepened with doc-derived specifics (Abbey Stadium walkability, heated cabins, CAMRA accolades, inclusive service, multi-zone layout) for better SEO alignment.
- Quick links & CTA copy mostly OK but can mention phone number / multi-action emphasis (book cabin, call for events, view menu) consistent with new contact details.
- Need to ensure hero/SEO data stress Cambridge location, HD sports, Nepalese kitchen, dual-service hours, and contact info from doc. Some of this already updated but should be double-checked for accuracy against provided data (e.g., midday closures, last orders, delivery partners) when referenced.

## Reusable Patterns & Considerations
- Use the doc-provided testimonials and ratings to reinforce credibility in `reviews` and `pressTicker` arrays; they already match but copy may need tweaks referencing Travelers’ Choice and CAMRA data.
- When updating slideshow JSON, follow existing object schema (id, image, alt, eyebrow, headline, copy, badges, ctas). We can reuse available slideshow imagery while rewriting textual content to highlight Corner House experiences (heated cabins, sports projectors, Nepalese plates, fireplace snugs, takeaway/delivery, etc.).
- Maintain consistent CTA structures (primary `bookUrl`/`callTel` fields). Ensure `ariaLabel` fields or alt text mention Corner House explicitly for accessibility.
- No code-level changes anticipated; focus is JSON content plus verifying that bundlers pick up new strings. After edits, run lint/tests if specified (likely `npm run lint` or `npm run test`?), and perform manual QA with Chrome DevTools per AGENTS instructions.
