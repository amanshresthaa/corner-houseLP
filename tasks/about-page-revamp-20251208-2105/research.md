# Research: About Page Revamp

## Existing Implementation
- `/app/about/page.tsx` renders bespoke sections (hero, origin story, mission/vision/values, service cards, proof chips, CTA) with inconsistent spacing (`max-w-4xl`, `rounded-2xl`, legacy brand tokens) and no alternation rhythm from the homepage design system.
- The page only uses `getContentSmart()` for SEO metadata; all copy is hardcoded inline apart from CTA labels pulled from `contentConfig` and phone/booking data from `getContactInfo()`.
- No reusable homepage components are leveraged, so there is duplicated layout logic and little parity with sections like `HomepageAboutSection` or the restaurant CTA modules.

## Design System & Patterns (docs/homepage-design-system.md)
- Sections must adhere to `max-w-6xl px-4 sm:px-6 lg:px-8` containers with `py-12/py-16` rhythm and alternating dark/light gradients.
- Cards either use white shells (`rounded-3xl/4xl border-brand-100 shadow-xl`) for light bands or glassmorphic white/5 cards on dark bands; eyebrows are uppercase pills with 0.35em tracking.
- Existing homepage building blocks (`PressTicker`, `QuickLinksSection`, `HomepageSignatureDishes`, `HomepageReviewHighlights`, `HomepageAboutSection`, `CallToActionSection`, `TakeawayBanner`, `LocationSection`) already encode the gradients, typography, and DaisyUI button styles we should mirror or reuse.
- Buttons: primary CTAs are pill `btn` classes with brand outlines/solids that keep hover colors subtle; quick-link style CTAs use rounded-full outlines.

## Data Sources & Content
- `config/content/pages/about.json` carries structured content (hero, story intro, timeline milestones, CTA metadata) that we can hydrate into the new sections instead of hardcoding strings.
- `getContactInfo()` (from `@/lib/restaurantData`) supplies canonical booking URLs and phone/tel pairs required for CTA and contact blocks.
- Global button labels live in `contentConfig.global.ui.buttons`, matching how other pages fetch copy.

## Reusable Components Worth Leveraging
- `components/homepage/HomepageAboutSection.tsx` already implements a white glass card with stats, gallery, timeline, CTA tray, and feature chips following the documented token set.
- `components/restaurant/sections/QuickLinksSection.tsx`, `CallToActionSection.tsx`, `TakeawayBanner.tsx`, and `LocationSection.tsx` provide drop-in dark/light bands with correct spacing and accessibility behavior; inspect these if duplication is needed.
- Shared layout wrapper `RestaurantLayout` ensures nav/footer parity and is already in use.

## Testing Landscape
- No existing Jest/RTL suites target the about page (`tests/**` has no *about* specs per glob scan), so new tests will be required to lock in the new structure/components.
- Jest configuration already handles React components via `jest.config.mjs`; we can colocate tests under `tests/pages/about` or similar.

## Open Questions / Risks
- Need to confirm what additional imagery/assets are available for new sections or if placeholders suffice.
- Manual QA must be run through Chrome DevTools MCP to validate gradients, responsive layout, and accessibility contrasts once the revamp lands.
