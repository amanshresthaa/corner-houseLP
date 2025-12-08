# Implementation Plan: Corner House Homepage Migration

## Objective
Replace the remaining White Horse homepage copy, imagery references, and hero slideshow content with Corner House-specific messaging derived exclusively from `CornerHouse1.md` and `CornerHouse2.md`, ensuring every above-the-fold section reflects the Cambridge sports-pub + Nepalese kitchen positioning.

## Success Criteria
- All homepage sections (hero/slideshow, features, press ticker, about, signature dishes, reviews, quick links, CTA) describe Corner House accurately and cite the doc-provided value props.
- No references to "White Horse" or Waterbeach remain in the homepage data.
- Images point to neutral or Corner House-appropriate assets (e.g., `/images/food/*.jpeg`) and include descriptive alt text.
- CTA targets use the correct phone number/email/URL combos.
- Content validates via existing schema; build/test suite passes.

## Architecture Overview
- Data Source: `config/content.json` contains global + `pages.home` content plus `components.slideshow`. These JSON entries feed Next.js server components through `getContentSmart` and are consumed by `ClientHomeContent` / `Showcase`.
- No structural code changes required. Updates remain localized to JSON while respecting the existing schema for arrays, CTA objects, and slideshow slide definitions.

## Component & Data Breakdown
1. **Slideshow (`components.slideshow.slides`)**
   - Rewrite each slide’s `headline`, `copy`, `eyebrow`, `badges`, CTAs, alt text to highlight heated cabins, HD sports, Nepalese dishes, fireplaces, family-friendly vibe, takeaway/delivery, etc.
   - Remove “White Horse” mentions; ensure `bookUrl`, `menuUrl`, `secondaryUrl` point to relevant Corner House routes.
2. **Home Hero & Feature Tiles**
   - Confirm hero text references Cambridge location, Nepalese kitchen, HD sports, Lapen Inns heritage.
   - Update `sections.features.items` to include doc facts (Abbey Stadium proximity, inclusive service, ramp access, heated cabins, CAMRA award, takeaway/delivery support if needed).
3. **Press ticker / awards**
   - Validate entries highlight Travelers’ Choice 2025, Google 4.4★ (800+), CAMRA 2020 per docs; adjust summaries/links accordingly.
4. **About section**
   - Expand copy to mention 1930s art-deco building, Lapen Inns relaunch, Nepalese chefs, HD screens, heated cabins, fireplaces, quiz nights, etc.
   - Swap `image.src` to a non-White-Horse asset (e.g., `/images/slideshow/whitehorsebuilding.png` rename? or use a neutral interior/garden image) and update alt text to describe The Corner House.
5. **Signature dishes**
   - Update descriptions to align with doc phrasing and swap image paths to `/images/food/HimaliLamb.jpeg`, etc.
6. **Review highlights**
   - Ensure quotes match doc text verbatim (Tony B., Colin S., C.V., Frances D., Josh P.). Already similar but re-verify and include descriptors (TripAdvisor, Google) for accuracy.
7. **Quick links & CTA**
   - Confirm copy encourages booking heated cabins, matchday planning, and accessible phone CTA referencing +44 1223 921122.

## Data Flow Considerations
- Changing JSON should not alter runtime shape. Preserve existing keys and arrays to satisfy `ContentSchema` validation (IDs optional but keep unique `id` fields in slides).
- When rewriting slides, keep `required` flags where originally set to avoid potential runtime dependencies.
- For alt texts/emojis, maintain ASCII requirement, substituting textual descriptions instead of emoji-only icons where necessary per guidelines.

## Implementation Steps
1. Update `components.slideshow.slides` entries (copy, alt text, CTA labels/links) to describe Corner House experiences (heated cabins, matchdays, Nepalese feasts, fireplaces, takeaway/delivery, Sunday roast).
2. Refresh `pages.home.sections.features` bullet content to include doc-specific differentiators.
3. Rewrite `pages.home.sections.about` paragraph array and features list; update `image` path + alt text.
4. Swap `pages.home.sections.signatureDishes.items[].image` to `/images/food/...` assets and align descriptions.
5. Double-check `pressTicker`, `reviews`, `quickLinks`, `cta` for doc accuracy; adjust where necessary.
6. Search `content.json` for lingering "White Horse" mentions and replace with Corner House-appropriate phrasing (without touching other pages yet, per scope).
7. Validate formatting/JSON (prettier?).
8. Run relevant tests (likely `npm run lint` or `npm test`), then perform manual QA via Chrome DevTools to confirm UI displays updated copy.

## Edge Cases & Risks
- Content Schema validation will fail if arrays become empty or keys missing; ensure each section retains valid structure.
- Image references must exist; repointing to nonexistent files would break build. Use verified `/public/images/food/*.jpeg` or existing slideshow assets.
- Need to ensure CTA URLs (book, menu, contact) remain valid and no `http://whitehorse...` references remain.
- When removing emojis, maintain accessible text; if using icons (allowed) keep ASCII.

## Testing Strategy
- `npm run lint` (or `npm run test` if required) to ensure no TypeScript/ESLint issues.
- Smoke test the homepage locally (if possible) focusing on hero, slideshow, features, about, signature dishes, and CTA sections.
- Manual QA with Chrome DevTools: check responsive behavior, verify updated text, inspect DOM for Corner House references, ensure alt text/respect for accessibility, confirm no console errors.
