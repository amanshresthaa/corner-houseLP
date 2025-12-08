# Research: Events Page Revamp

## Existing Patterns

- `app/events/page.tsx` currently hardcodes a hero, live sports banner, match-day features, and an inline CTA; layout uses ad-hoc spacing (`max-w-4xl`) instead of the shared container rhythm from docs/homepage-design-system.md.
- Events-specific building blocks already exist but are partly unused: `components/restaurant/sections/RegularEventsSection.tsx` (schema-friendly framer-motion cards), `EventsUpdatesSection.tsx` (social updates callout), and `EventsContactSection.tsx` (private events CTA) expose reusable props.
- Shared sections (QuickLinksSection, CallToActionSection, LocationSection, etc.) follow the alternating dark/light stacking pattern mandated in docs/homepage-design-system.md and across `app/about/page.tsx`.
- Content is sourced from `config/content.json` via `getContentSmart`; `pages.events` defines hero copy, regular event entries, and contact messaging that we can hydrate instead of duplicating strings.

## External Resources

- [Homepage Design System](docs/homepage-design-system.md) – defines spacing (`max-w-6xl px-4 sm:px-6 lg:px-8`, `py-12/16`), alternating palette order, DaisyUI button tokens, and card treatments to stay consistent with /about & homepage.

## Technical Constraints & Dependencies

- Page runs inside `RestaurantLayout` (Next.js app router, server components). Need to keep async data loading via `getContentSmart()` plus metadata generation.
- DaisyUI/Tailwind utility tokens drive typography, gradients, and buttons; new sections must reuse them (badges with uppercase tracking, `rounded-[2.5rem]` shells, etc.).
- Framer Motion already bundled (see RegularEventsSection); respect `useReducedMotion` toggles per docs.
- Accessibility needs: focus-visible outlines, aria-labels for CTAs, maintain semantic headings and badges.

## Open Questions

- Should additional data (live sports partners, cabin info) continue to be static or move into content config? (Assuming static for now; no schema provided.)
- Are there other CMS fields for Events (e.g., schedule feed) not surfaced yet? None discovered in config/content.json beyond hero/regular events/contact.

## Recommendations

- Rebuild `/events` as stacked sections mirroring homepage rhythm: dark hero, light highlights, dark quick links/updates, light regular events, dark CTA, light location/contact wrap-up.
- Hydrate hero badges, copy, and CTA labels from `content.pages.events` to avoid string drift; gracefully fall back to defaults when fields missing.
- Reintroduce `RegularEventsSection` (with Content data) and wire `EventsUpdatesSection` / `EventsContactSection` into the layout to provide social callouts + booking CTA cards.
- Extract repeated CTA styling by leaning on `CallToActionSection` for the closing panel and `QuickLinksSection` for mid-page navigation; ensures compliance with design system tokens without bespoke CSS.
