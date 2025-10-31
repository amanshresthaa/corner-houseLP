# Research: Homepage Streamline

## Existing Patterns

- `app/page.tsx` renders a server component that pipes structured content from `config/content.json` and environment overrides into the client-only `components/ClientHomeContent.tsx`.
- `ClientHomeContent` orchestrates a long list of sections (hero slideshow, at-a-glance cards, recognition, events, neighbourhood, gallery, timeline, testimonials, CTA, etc.) via a `ProgressiveSection` helper for staggered loading.
- Hero media uses the DaisyUI-powered `components/slideshow/Showcase` component fed by `content.components.slideshow` entries (image paths now organized under `public/images/white-horse/…`).
- About/menu content is sourced through `app/_content/home-content.json` via the `useHomeContent` hook to hydrate React client sections.
- Reusable section modules already exist for quick links (`components/restaurant/sections/QuickLinksSection.tsx`), takeaway CTA (`components/restaurant/TakeawayBanner.tsx`), and contact/location (`components/restaurant/LocationSection.tsx` + `RestaurantHoursCard`).
- Copy + schema metadata currently hard-coded in `config/content.json` and `app/_content/home-content.json`, not strictly aligned with the blueprint and includes extra marketing flourishes beyond requested structure.

## External Resources

- `Everythingyouneed/page-structure-blueprints.md` – defines required homepage sections (navbar, hero/slideshow, press ticker, about, signature dishes, reviews, quick links, takeaway banner, contact, footer) and expected layout semantics.
- `Everythingyouneed/The White Horse, Waterbeach.docx` – detailed positioning, values, signature dishes, amenities, press references, history, and photography guidance for The White Horse.
- `Everythingyouneed/whitehorseinformation.md` – verified facts: address, hours, contact, signature dishes, awards, reviews, amenities, events, dog/family friendliness, garden features, etc.

## Technical Constraints

- Must respect project AGENTS workflow: DaisyUI components preferred, mobile-first, focus on accessibility, follow Context Engineering task files.
- Home content currently depends on multiple client-side hooks; major refactor should preserve SSR safety and avoid hydration mismatches.
- Image assets already live under `public/images/white-horse` grouped by exterior/interior/dishes/garden; reference those rather than scattering new uploads.
- Manual QA via Chrome DevTools MCP is mandatory during verification phase.
- Approval policy is `never`, so commands/tests must run inside current environment without escalation.

## Recommendations

- Replace the bloated `ClientHomeContent` tree with a streamlined layout that follows the blueprint order (hero slideshow → press ticker → about spotlight → signature dishes → reviews/social proof → quick links → takeaway banner → contact/location → footer).
- Reuse existing building blocks where practical (`Navbar`, `Showcase`, `QuickLinksSection`, `TakeawayBanner`, `ClientFooter`), but strip out extra sections (timeline, amenities grid, neighbourhood, gallery, etc.).
- Create focused section components (or refactor existing ones) for press highlights, about copy, signature dish cards, and review cards, populating them with copy distilled from the docx + info markdown so every line traces back to provided sources.
- Update `config/content.json` (and related content files if necessary) to hold just the data required for the slimmer homepage; ensure marketing copy cites facts from the two data documents.
- Align contact/location data with `config/restaurant.json` helpers to avoid duplication and keep schema facts consistent.
- Validate that DaisyUI styling/classes remain intact after simplification and that mobile view preserves spacing hierarchy.

## Open Questions

- Blueprint lists both “Press / Ticker Strip” and “Reviews” – should we surface both simultaneously on the trimmed homepage, or prioritise one? (Assuming we keep both unless instructed otherwise.)
- Are there any legacy marketing promos or feature flags that must survive the simplification (e.g., CTA button set)? Currently planning to keep a single CTA block matching blueprint unless told otherwise.
- Should slideshow retain all five existing slides or be reduced to a tighter set to match simplified intent? Defaulting to keep 3–4 slides using approved imagery unless directed differently.
