# Research: About Page Rewrite

## Existing Patterns
- Next.js App Router with `app/about/page.tsx` using `RestaurantLayout` and SEO helpers from `libs/seo`.
- DaisyUI + Tailwind utility classes (`btn`, `card`, badges) across pages; semantic sections with ARIA labels.
- Images live under `public/images/white-horse/{exterior,interior,garden}` and are used via `next/image`.
- Structured data via `renderSchemaTags()` and `SchemaInjector` for Restaurant schema.

## External Resources (Provided Dossier)
- Comprehensive brand, operations, and copy framework for The White Horse, Waterbeach covering positioning, quick facts, story, culinary, team, events, accessibility, press, reviews, neighbourhood guide, and imagery guidance.

## Technical Constraints
- Keep to existing layout and SEO conventions; avoid breaking imports.
- Mobile-first; prefer DaisyUI components over custom.
- Maintain accessible structure (headings, landmark regions, focusable CTAs) and reduced-motion safety.

## Opportunities / Notes
- Quick Facts can be rendered as responsive cards (mobile-friendly) with tel:/mailto: links.
- Hours are not centralized in `public/data`; acceptable to include in-page facts per dossier.
- Keep image references to existing files to avoid missing assets.

## Recommended Approach
- Replace About page content entirely with sections mirroring the dossier: Hero & Positioning, Dual Identity, Values, Quick Facts, Story & Timeline, Culinary, Team, Events & Hire, Accessibility, Press, Reviews, Neighbourhood Guide, Imagery, and a clear CTA.
- Reuse `RestaurantLayout`, SEO helpers, and schema injection. Keep copy authoritative yet concise for web.
