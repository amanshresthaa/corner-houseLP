# Research: Signature Dishes Revamp

## Existing Patterns
- `components/homepage/HomepageSignatureDishes.tsx` renders a simple headline + DaisyUI carousel (mobile) and 2/3-column image cards (desktop). Only dish names are emphasized; subtitles/description fields are ignored to keep cards minimal.
- Dishes data originates from `config/content/pages/home.json -> sections.signatureDishes.items` (name, description, image). No pricing, tags, or CTA fields today.
- Section styling is currently flat (brand-900 background, minimal animation). No badges, stats, or interactive filtering.

## Inspiration / References
- `components/restaurant/DishCard.tsx` and `components/restaurant/sections/AboutWelcomeSection.tsx` show layered cards with badges and context text.
- DaisyUI `timeline`, `tabs`, and `stack` components could create a chef’s tasting story or highlight cards with neon glows.
- Modern restaurant hero sections often use split hero + ingredient overlays; we can adapt that look.

## Technical Constraints
- Must stay client-safe (component already `"use client"`).
- Need to preserve existing data contract or extend JSON + normalization responsibly.
- Keep mobile-first; ensure carousel accessible (keyboard/focus) or consider scroll-snap.
- Avoid heavy assets; use existing dish images under `/images/white-horse/dishes/*`.

## Findings
- Current component underuses `subtitle` and `description`. Opportunity to surface tasting notes, spice levels, vegetarian tags, etc.
- Section could benefit from hero intro (chef quote), featured dish highlight, ingredient chips, and matrix layout to feel “extremely highlighting”.
- Might extend JSON with `badges`, `price`, or `spotlight` metadata for certain dishes, plus `chefQuote` text.

## Open Questions
- Should we introduce interactions (tabs for Veg/Meat, marinade stories)? This likely requires schema extensions—need to decide scope (e.g., `items[].tags`, `items[].featured`).
- Do we add CTA buttons (View menu) or rely on existing quick links? We can include micro-CTA within section for emphasis.
