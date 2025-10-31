# Research: Sitewide Section Spacing & Background Harmonisation

## Layout & Global Patterns
- `components/restaurant/Layout.tsx` wraps every page with a fixed navbar and `<main id="main-content">` that currently just renders children; vertical rhythm is left to individual pages.
- Earlier home-page work removed `space-y-*` utilities and relies on per-section internal `py-*`. Objective is to extend similar treatment to all top-level pages.
- Most pages follow the pattern: `RestaurantLayout` → hero `<section>` (gradient/dark) → `<main>` containing stacked sections separated via `space-y-*` or per-section `mb-*`.

## Pages Using `space-y-*` on `<main>`
- `app/menu/page.tsx`: `<main className="space-y-16">` stacks interactive menu, dietary CTA, hero CTA etc. Each child section already has internal padding; `space-y-16` introduces the unwanted extra whitespace.
- `app/contact/page.tsx`: `<main className="bg-white py-16 space-y-16">` mixes vertical padding + `space-y`, leading to double gaps between content cards and CTA blocks.
- `app/press/page.tsx`: `<main className="space-y-16 bg-white pb-16">` with numerous subsections (hero, press cards, CTA) that rely on the global spacing.
- `app/blog/page.tsx`: `<main className="space-y-0">` intentionally zeroed—no action needed unless we introduce a shared pattern.
- `app/about/page.tsx`: `<main className="space-y-0">`; sections already use explicit `py-16`.

## Pages Using Section Margins for Separation
- `app/events/page.tsx`: Each major `<section>` has `mb-16` or similar; wrappers also have `py-16`, causing stacked gaps.
- `app/book-a-table/page.tsx`: Top-level `<main>` has `py-16` (no `space-y`), but inner cards rely on `space-y-*` for content lists (acceptable). Need to check for trailing `mt-*` or `mb-*` between sections.
- `app/christmas-menu/page.tsx`, `app/wakes-menu/page.tsx`, `app/curry-and-carols-menu/page.tsx`: long-form marketing pages with repeated `space-y-6/12` blocks and frequent `mt-`/`mb-` classes, especially on hero to CTA transitions.
- Other content pages (`app/menu-information`, `app/privacy-policy`, `app/takeaway-menu`, etc.) often use `space-y-*` inside prose containers rather than between large sections—likely acceptable.

## Background Alternation & Contrast Issues
- Several hero → content sequences stick with same neutral background, causing monotony. Need to rotate light/dark backgrounds per section when neutral design allows (align with home page cadence). Candidate pages: menu CTA stack, press page feature columns, contact page support blocks.
- Dark-background sections sometimes keep dark text (observed previously in `LocationSection`; similar risk exists within `app/events` highlight cards and menu gradient CTAs, but they already use white text.

## Reusable Components & Dependencies
- `RestaurantHoursCard` now supports `variant="dark"`; ensure contact page usage (light) stays default, while dark sections (location, any other brand-900 blocks) pass the variant.
- `FadeIn` wrapper is common; removing `space-y` means we must ensure the `section` inside carries its own padding/margins without relying on parent spacing.
- Many sections share container pattern: `.max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` with `py-*`. We'll standardize on using `py` within sections and drop external `mb`/`space-y`.

## Constraints & Considerations
- Need to avoid touching slideshow/navbar (per original instruction) and maintain DaisyUI/Tailwind conventions.
- Must ensure no regressions on mobile—removing `space-y` might collapse sections if internal padding missing; will have to audit each section to confirm.
- Large number of pages; prioritise creating utilities or helper classes (e.g., a `SectionStack` wrapper) to reduce repetitive edits.
- Colour alternation should remain tasteful; not every block needs flipping if design already intentional.

## Open Questions / Follow-ups
- Should we enforce alternation via utility (e.g., nth-child selectors) or manual class tweaks per section? Manual gives better control but requires touching many files.
- Need to confirm which pages rely heavily on `space-y` for nested lists (should remain) vs. top-level stacking (should change).
