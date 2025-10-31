# Implementation Plan: Home Page Revamp

## Objective
Revamp the marketing home page to showcase the full White Horse Waterbeach story using the supplied dossier (`Everythingyouneed/The White Horse, Waterbeach.docx`), fact sheet (`Everythingyouneed/whitehorseinformation.md`), and photography (`Everythingyouneed/whitehorseimages`). The refreshed page must clearly communicate positioning, amenities, menu signatures, events, history, ratings, and neighborhood context while staying consistent with existing design-system standards and accessibility requirements.

## Success Criteria
- [ ] Hero/intro immediately communicates dual Nepalese + British identity, reopening story, and key CTAs (call/email/menu).
- [ ] All factual content (contact, hours, awards, ratings, amenities, events, history, neighborhood) from both reference documents is represented.
- [ ] New imagery from `whitehorseimages/` powers hero/gallery visuals with descriptive alt text.
- [ ] Layout remains fully responsive (mobile-first) and accessible (semantic headings, focus order, aria labels).
- [ ] Existing performance patterns (progressive loading, reduced-motion support) maintained or improved.
- [ ] Regression-free: navigation, CTAs, existing sections (about, menu highlights, testimonials, location, CTA) still function.

## Architecture
- Keep `app/page.tsx` server wrapper unchanged; extend `ClientHomeContent` client component to orchestrate new sections using existing `ProgressiveSection`.
- Introduce a centralised data module (e.g., `app/_content/home-sections.ts`) that exports structured constants derived from the dossier/fact sheet for reuse by home-specific components.
- Update JSON content sources (`config/content/pages/home.json`, `app/_content/home-content.json`, maybe `config/content.json` slideshow entries) to align with new copy and maintain schema compatibility (`src/lib/data/schemas.ts`).
- Store selected JPEGs under `public/images/white-horse/` (exterior/interior/dishes/garden) and reference via `next/image`; update `src/lib/images.ts` registry where appropriate.
- Compose new presentational sections under `components/restaurant/sections/` (e.g., `HomeAtAGlanceSection`, `HomeAmenitiesSection`, `HomePressGrid`, `HomeRatingsStrip`, `HomeNeighbourhoodSection`, `HomeGalleryMasonry`) leveraging DaisyUI utilities and existing motion helpers.
- Reuse existing generic components where possible (`StoryTimelineSection`, `RegularEventsSection`, `ContactFeaturesSection`, `PressFeatureBanner`) with new data props to avoid duplication.

## Component Breakdown
- **Data layer**
  - `app/_content/home-sections.ts`: exports typed objects for hero facts, quick stats, awards, press, events, amenities, neighbourhood spots, testimonials.
  - Update `config/content/pages/home.json` & `app/_content/home-content.json` with revised copy (menu highlights, about text, CTAs).
  - Extend `config/content.json` slideshow `slides` array with new hero slides referencing actual photos and updated CTAs.
- **UI sections**
  - `HomeHeroPanel` (optional) to sit above slideshow with succinct USP + contact CTA if not handled within slideshow copy.
  - `HomeAtAGlanceSection`: grid of cards summarising contact, hours, booking info, price range, coordinates.
  - `HomeHighlightsSection`: emphasise dual-identity story, reopening mission (could extend existing `AboutSection` or wrap new summary block).
  - `HomeSignatureDishes` adjustments via `MenuHighlights` data update.
  - `HomePressShowcase`: multi-card layout for press links & awards derived from dossier.
  - `HomeRatingsSection`: display Google/TripAdvisor/internal scores with quotes.
  - `HomeAmenitiesSection`: use `ContactFeaturesSection` styled for features/badges.
  - `HomeEventsSection`: drive `RegularEventsSection` with quiz night, curry evening, sports schedule.
  - `HomeHistorySection`: reuse `StoryTimelineSection` with condensed timeline.
  - `HomeNeighbourhoodSection`: card list linking to nearby attractions.
  - `HomeGalleryStrip`: responsive collage using new imagery.
- **Support**
  - Update `app/_components/AboutSection` content to align with new copy if necessary.
  - Ensure CTA buttons emphasise phone/email (no online booking) per dossier.

## Data Flow
1. Server loaders (`getMarketingSmart`, `getContentSmart`) continue supplying base content objects including slideshow configuration.
2. `ClientHomeContent` imports new home data constants for static sections; merges with remote content (for CTA/quick links) as needed.
3. Each new section component receives typed props from data module ensuring consistent structure and enabling reuse/testability.
4. Image registry updates feed `next/image` references across modules (avoid hard-coded paths scattered through JSX).

## API Contracts
- No external API calls added; all data local.
- Validate changes remain compatible with existing schemas (`src/lib/data/schemas.ts`). Ensure new fields added to JSON respect schema definitions or extend schema if required.
- Maintain CTA button shapes `{ text, href, variant, external? }`.

## UI / UX Considerations
- Mobile-first layout: stack cards, use DaisyUI components (`card`, `badge`, `stat`) for consistency.
- Visible focus states via `focus-visible` utilities; maintain `touch-action: manipulation` for tappable elements.
- Ensure hero slideshow honours `prefers-reduced-motion`; provide textual hero summary so users disabling autoplay still get context.
- Provide accessible headings hierarchy (H1 already set elsewhere; start new sections from H2).
- Alt text for every image, including new gallery/hero assets referencing doc descriptions.
- Represent states: highlight Sunday brunch/roast times, takeaway availability, dog-friendly markers, gift cards.

## Testing Strategy
- **Automated**: run existing unit/integration suites (`npm test` or targeted commands) if impacted components have coverage.
- **Manual**:
  - Verify each new section renders with accurate copy on desktop/tablet/mobile (Chrome DevTools responsive mode).
  - Confirm slideshow displays new imagery, CTAs navigate correctly.
  - Check CTA buttons trigger tel/mailto correctly.
  - Navigation unaffected; scroll/skip-to-content works.
  - Accessibility: heading order, aria labels, focus traps (none introduced) validated.
  - Performance: ensure progressive loading still behaves (no layout shift, no blocking hero).
  - Chrome DevTools manual QA per AGENTS (Console, Lighthouse, Network, Performance, Device Toolbar).

## Edge Cases
- Handle missing data gracefully (fallbacks) to avoid runtime crashes if marketing CMS incomplete.
- Ensure telephone/email CTAs degrade for devices without tel/mail handlers (provide copy visible).
- Avoid huge images causing layout shift (define aspect ratio containers).
- Reduced-motion preference should disable animations for new sections (use `useReducedMotion` where animating).
- Validate sections degrade on old browsers (no reliance on unsupported CSS features).

## Rollout Plan
- Implement behind standard build (no feature flag).
- After verification, summarise changes for stakeholders; follow-up tasks may include social media links gap if required.
- Prepare imagery optimization follow-up if bundler size increases significantly.
