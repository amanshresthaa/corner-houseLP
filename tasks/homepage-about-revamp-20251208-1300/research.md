# Research: Homepage About Section Revamp

## Existing Patterns
- `components/homepage/HomepageAboutSection.tsx` currently renders a two-column layout: copy on left, image on right, with DaisyUI badge, House highlights list, and optional hero image. Styling leans on Tailwind + brand tokens (brand/accent palette) and uses `BRAND` constant for default alt text.
- Home sections follow the new registry/renderer pipeline (`buildHomeSections` → `HomeSectionsRenderer`), so any prop changes must remain compatible with normalized data structure (title/tagline/description/features/image from `config/content/pages/home.json`).
- Other homepage slices (signature dishes, reviews) use DaisyUI cards, carousels, and gradient backgrounds; they demonstrate accepted animation and responsive patterns we can mirror.

## Inspiration / References
- Storytelling cards in `components/restaurant/sections/AboutWelcomeSection.tsx` mix text blocks with stat chips and iconography; we can borrow the stats-treatment.
- `components/restaurant/Hero.tsx` uses layered gradient backgrounds and subtle glass panels which could translate to an “Art-Deco” aesthetic for the about section.

## Technical Constraints
- Must stay mobile-first, accessible (ARIA labels, heading hierarchy), and remain within DaisyUI/Tailwind primitives.
- Component is client-side (`"use client"`) and uses `next/image`; any new assets must exist or fall back to placeholders.
- Content is sourced from JSON, so new UI that needs extra data either has to derive from existing fields or extend the JSON schema (requires updates to config + normalization helper).

## Findings
- Current section feels text-heavy; lacks secondary imagery or metrics; highlight list is plain bullet list. Opportunity to split content into storytelling paragraphs + stat tiles + CTA chips.
- `home.json` `sections.about` only contains `title`, `tagline`, `description[]`, `features[]`, single `image` plus our newly-added `stats`/`ctaLinks`. To push the design further we need additional fields like `milestones` (timeline data) and `gallery` items for mosaic cards.
- Layout should include safe area for gradient background, optional accent image frames, and interactive affordances (hover/focus states) similar to other sections. A timeline rail + polaroid gallery will require stacked flexbox/grid with scroll/overflow support on mobile.

## Open Questions
- Do we introduce new config fields (e.g., `about.milestones`, `about.gallery`)? Yes, to unlock the new concept; ensure normalization + tests cover them.
- Should the section include inline CTA buttons (Book, Menu) or rely on closing CTA? (Lean toward concise micro-CTAs within the section for context.)
