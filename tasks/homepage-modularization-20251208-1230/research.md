# Research: Homepage Modularization

## Existing Patterns
- `app/page.tsx` is a Server Component that fetches `content.pages.home` via `getContentSmart`, cherry-picks the parts it needs, and passes a manually curated `sections` object plus slideshow/config props into a single `ClientHomeContent` client component.
- `components/ClientHomeContent.tsx` owns most of the orchestration: it normalizes each optional section inline, performs ad-hoc filtering, and renders each section component in a fixed order together with `Navbar`, `TakeawayBanner`, `LocationSection`, and `CallToActionSection`.
- Section UIs already exist in `components/homepage/*` (PressTicker, About, SignatureDishes, ReviewHighlights) and `components/restaurant/sections/*` (QuickLinksSection, CallToActionSection) but their props are loosely typed and normalization logic lives outside of them.
- Content for all homepage slices comes from `config/content/pages/home.json` under `sections.*`, which already includes additional structures (`features`, `pressFeature`) that the current page ignores.
- Brand-specific literals are being cleaned up via helpers under `src/lib/constants/brand.ts` and `src/lib/utils/brand.ts`, indicating an ongoing push toward reusable tokens.

## External Resources
- DaisyUI component patterns and Tailwind utility classes are already used across the homepage (e.g., QuickLinksSection, Signature dishes carousel) and should continue to guide any new UI extraction.

## Technical Constraints
- Next.js App Router with Server Components + client-side dynamic import (see `app/page.tsx` + `ClientHomeContent`). Any new orchestration must keep server/client boundaries clear.
- Must respect AGENTS.md requirements: DaisyUI-first components, mobile-first layouts, SOLID + accessible markup, and manual Chrome DevTools verification.
- Section data originates from JSON config and includes brand replacement tokens; normalization utilities should avoid mutating the original config object and should be reusable from tests.
- Tests are written with both Jest and Playwright/Vitest; homepage refactor should remain testable without relying on browser-only APIs.

## Recommendations
- Introduce a `HomeSectionDefinition` registry that encapsulates (a) whether a section has data, (b) how to normalize it, and (c) which React component renders it. This lets `ClientHomeContent` simply iterate over registered sections instead of owning every conditional.
- Extract normalization helpers into a dedicated module (e.g., `src/lib/homepage/sections.ts`) that can be unit-tested and reused between server + client contexts, aligning with Single Responsibility and Open/Closed principles.
- Reorganize `ClientHomeContent` into smaller composable pieces: keep layout scaffolding (navbar/main/footer) but delegate section mapping/rendering to a `HomeSectionsRenderer` component that consumes the registry.
- Prepare types that mirror the JSON schema (pressTicker, about, etc.) so sections can evolve independently without massive touching of `ClientHomeContent` (Interface Segregation + Dependency Inversion by passing only the props each section needs).
- Consider support for currently unused `sections.features`/`sections.pressFeature` either by creating dedicated components or intentionally skipping with clear extension points so that future additions are trivial.

## Open Questions
- Should the refactor enable lazy-loading/order customization for homepage sections, or is the current static order sufficient?
- Are new UI components needed for `sections.features`/`pressFeature`, or should they be excluded until content requirements are confirmed?
- What level of test coverage (unit vs. integration) is expected for the new normalize/registry utilities?
