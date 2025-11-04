# Research: Revamp /about – The White Horse Waterbeach

## Existing Patterns

- Next.js app directory present; About page at `app/about/page.tsx`.
- Content system via `getContentSmart()` merged from `config/content.json` and `data/<env>/content.json`.
- Established sections/components for About:
  - `StoryTimelineSection` (timeline + intro)
  - `AboutCTASection` (CTA band with address/hours)
- Additional reusable sections that match blueprint requirements:
  - `components/homepage/HomepageAboutSection` – two-column overview with features list and image (fits “Welcome to The White Horse” + “Why Guests Visit”).
  - `components/restaurant/sections/QuickLinksSection` – 3-up tiles for quick navigation.
  - `components/restaurant/sections/CallToActionSection` – closing CTA band with multiple buttons.
- Styling uses Tailwind + DaisyUI (plugin configured in `tailwind.config.js`); components include focus-visible states and motion variants.

## External Resources

- Source content: `Everythingyouneed/The White Horse , Waterbeach.md` (brand, positioning, values, quick facts, history).
- Structure guidance: `Everythingyouneed/page-structure-blueprints.md` (section layout patterns: hero, two-column about, feature box, quick links, closing CTA).

## Technical Constraints

- Must reuse existing components and patterns (DRY, DaisyUI-first).
- Maintain accessibility: semantic headings, focus-visible, reduced motion support.
- Mobile-first responsive layout; avoid CLS and large LCP regressions (use dynamic imports for non-LCP sections).

## Recommendations

- Keep current hero but improve downstream sections per blueprint:
  1) Add two-column overview (“Welcome to The White Horse”) using `HomepageAboutSection` with features + image from content.
  2) Retain `StoryTimelineSection` with refined copy.
  3) Add Quick Links (Menu, Events, Contact).
  4) Add closing CTA band with Book/View Menu/What’s On.
- Update `config/content.json` `pages.about` copy to reflect authoritative doc (largest thatched pub, Feb 2025 relaunch, dual identity, community values).

