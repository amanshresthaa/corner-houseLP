# Research: slideshow CTA count

## Phase 0 - Initial requirements & success criteria
- Requirement: determine how many CTA buttons the homepage slideshow renders.
- Success criteria: identify CTA count per slide and per rendered session, grounded in current content/config and component logic; note any variability.

## Existing patterns & data flow
- Homepage slideshow data pulled from `config/content.json` -> `getContentSmart` -> `components/ClientHomeContent` -> `components/slideshow/Showcase` -> `components/slideshow/DaisyUISlideshow.tsx`.
- CTA rendering centralized in `getCTAConfig` inside `components/slideshow/DaisyUISlideshow.tsx`; slides use shared `SlideCTAButton` variants.

## Slide definitions relevant to CTAs
- `config/content.json` defines 7 slides under `components.slideshow.slides` with CTA fields (`bookUrl`, `menuUrl`, `takeawayUrl`, `callTel`, `secondaryUrl`).
- Global fallback `links.takeaway` is `/online-delivery`, injected into the slideshow via `ClientHomeContent` -> `Showcase` prop `takeawayUrl`.
- Every slide includes `ctas.callTel`; several also include `menuUrl` and/or `bookUrl`; some include per-slide `takeawayUrl`.

## CTA logic observations (`components/slideshow/DaisyUISlideshow.tsx`)
- `getCTAConfig` prioritizes takeaway: if a per-slide or fallback takeaway URL exists, it always sets the primary CTA to `takeaway` and selects a secondary CTA based on availability (prefers call booking, otherwise book/menu/learn-more).
- Because the global fallback takeaway URL is present, **every slide enters the takeaway-first branch**, guaranteeing at least one CTA.
- Secondary CTA gets an href whenever `callTel`, `bookUrl`, or `menuUrl` exists (all current slides have `callTel`, so secondary always renders).

## Resulting counts (current content)
- Per slide: 2 CTA buttons (primary takeaway + secondary call/book/menu).
- Slides available: 7 total; slideshow session size defaults to 5, so each page load shows 5 slides -> 10 CTA buttons visible in the carousel for that session (order/shuffle may vary, count does not).

## Open questions
- None; content and logic consistently yield two CTAs per slide given current config.
