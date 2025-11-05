# Research: Revise Signature Nepalese Dishes

## Goal
Revise the Signature Nepalese Dishes section to:
- Use a great grid layout
- Show dish name only (no descriptions or badges)
- Use the actual dish names from content (no placeholders)
- Add a scrolling slideshow on mobile if possible
- Use DaisyUI components where available

## Findings
- Component: `components/homepage/HomepageSignatureDishes.tsx`
- Data source: `config/content.json` > `pages.home.sections.signatureDishes.items`
- DaisyUI available; provides `card`, `image-full`, and `carousel` utilities
- Client home renders via `components/ClientHomeContent.tsx`

## Approach
- Replace existing static grid limited to 3 items with:
  - Mobile: DaisyUI `carousel` with `card image-full` slides
  - Desktop: grid (`sm:grid-cols-2`, `xl:grid-cols-3`) of image cards
- Enforce `name` presence, skip any item without a name
- Remove all per-card description/badges; do not render section subtitle

