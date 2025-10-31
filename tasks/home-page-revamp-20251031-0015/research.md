# Research: Home Page Revamp

## Existing Patterns
- `app/page.tsx` renders `ClientHomeContent` via server-side loaders `getMarketingSmart`/`getContentSmart`; schema tags injected by `renderSchemaTags`.
- `components/ClientHomeContent.tsx` orchestrates sections with progressive loading and DaisyUI/Tailwind utility classes; follows mobile-first responsive grid layouts.
- Core sections already exist as modular components: `Showcase` (hero slideshow), `AboutSection`, `MenuHighlights`, `TestimonialsSection`, `QuickLinksSection`, `TakeawayBanner`, `LocationSection`, `CallToActionSection`, and `ClientFooter`.
- `app/_content/home-content.json` + `app/_content/useHomeContent.ts` supply structured copy for About/Menu blocks with default fallbacks; `config/content/pages/home.json` drives quick links, CTA buttons, press feature, etc.
- `lib/restaurantData.ts` normalises contact, address, hours, social links from `config/restaurant.json`, reused by `LocationSection` and other modules.
- Image paths centralised in `src/lib/images.ts`; slideshow expects `Slide` objects (`components/slideshow/types.ts`) consumed by DaisyUI carousel in `components/slideshow/DaisyUISlideshow.tsx`.

## External Resources
- Content sources provided in repo: `Everythingyouneed/The White Horse, Waterbeach.docx` (brand & operations dossier) and `Everythingyouneed/whitehorseinformation.md` (fact sheet).
- Image assets for new design located in `Everythingyouneed/whitehorseimages/` (24 JPEGs covering interior, exterior, dishes, garden, décor).
- Existing brand/site metadata inside `config/content.json`, `config/restaurant.json`, plus fallback hero/menu copy in `app/_content/home-content.json`.

## Technical Constraints
- Project is Next.js (app router) with SSR + client components; must keep `ClientHomeContent` client-side and respect progressive loading strategy.
- DaisyUI/Tailwind design system enforced (see `tailwind.config.js`, `design-system`); new UI should extend existing tokens (`bg-brand-*`, `text-accent`, etc.).
- Accessibility requirements from `AGENTS.md`: semantic structure, focus management, `aria` labelling, mobile-first, reduced-motion support already embedded in `ClientHomeContent`.
- Slideshow expects optimised images under `public/`; new assets need `next/image` compatibility (web-ready dimensions/alt text).
- Data likely cached via `getMarketingSmart`/`getContentSmart`; modifications should keep shapes consistent with schemas in `src/lib/data/schemas.ts`.
- Must ensure copy additions don't break `useHomeContent` defaults or escalate bundle size; consider splitting long content into collapsible/sectioned blocks.

## Findings & Recommendations
- Need richer hero/intro highlighting dual identity, awards, reopening story, ratings, and amenity badges described in dossier.
- Create structured sections for: quick facts (contact, coordinates, price range), opening hours, awards/press quotes, signature dishes, amenities, events/sports highlights, history timeline, reviews, garden & interior showcases.
- Build reusable data modules (e.g., `data/homepage.ts`) or expand `app/_content/home-content.json`/`config/content/pages/home.json` to include new sections so `ClientHomeContent` can render them declaratively.
- Leverage new imagery: convert/select key photos for hero slideshow, gallery cards, menu highlights.
- Ensure CTA buttons include booking phone/email per dossier (online booking unavailable; emphasise call/email).
- Consider adding `aria-live` for updates only if dynamic components introduced; maintain progressive enhancement.
- Verification must include Chrome DevTools manual QA (per AGENTS), with responsiveness, accessibility, performance passes after implementation.
