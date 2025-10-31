# Implementation Plan: Homepage Streamline

## Objective
- Deliver a simplified homepage that mirrors the `page-structure-blueprints.md` layout (hero slideshow, press ticker, about spotlight, signature dishes, reviews, quick links, takeaway banner, contact/footer) using only Waterbeach White Horse messaging from the supplied dossiers.

## Success Criteria
- [ ] Homepage renders only the blueprint-defined sections in the specified order.
- [ ] All copy, CTAs, and media references trace back to `The White Horse, Waterbeach.docx` or `whitehorseinformation.md`.
- [ ] DaisyUI styling remains intact; layout is mobile-first with accessible semantics.
- [ ] Legacy sections (amenities, neighbourhood, gallery, timeline, etc.) are removed from `ClientHomeContent`.
- [ ] `npm run lint` and relevant tests pass without regressions.

## Architecture
- Keep `app/page.tsx` as the server entry point but reshape the data payload it passes to the client so it aggregates hero + new sections from `config/content.json`.
- Refactor `components/ClientHomeContent.tsx` to accept a typed `homeContent` prop and render only the streamlined sections with simple DaisyUI layouts.
- Introduce lightweight section components (press ticker, about, signature dishes, reviews) to keep JSX focused and reusable.
- Reuse existing navbar, slideshow, quick links, takeaway banner, contact/location, and footer components where possible to minimise churn.

### Components
- `app/page.tsx`: build the new `homeContent` object, map `content.pages.home.sections` fields, and pass props down.
- `components/ClientHomeContent.tsx`: remove progressive loader sections, render the blueprint stack, and wire new subcomponents.
- New components (e.g., `HomepagePressTicker`, `HomepageAboutSection`, `HomepageSignatureDishes`, `HomepageReviews`) housed under `components/homepage/` or similar.
- Update/remove `app/_components/AboutSection.tsx` and `useHomeContent` if no longer needed.

### Data Flow
- Server loads content JSON, normalises into section objects, passes via props to client component.
- Client sections consume props directly, no additional async hooks; contact details still sourced via `restaurantData` helper to avoid duplication.

### API Contracts
- No external API changes; ensure `ContentSchema` remains satisfied by keeping required keys (`features`, `quickLinks`, `cta`) even if unused, leveraging `.passthrough()` for new section keys.

## Implementation Steps
1. Update `config/content.json` (and any overrides) to define hero copy, press ticker cards, about paragraphs/bullets, signature dish trio, review highlights, and quick links using verified information + image paths.
2. Adjust `app/page.tsx` to construct a `homeContent` prop bundle (slideshow, press ticker, about, dishes, reviews, quick links, etc.) and supply it to the client component.
3. Refactor `components/ClientHomeContent.tsx` to drop unused imports/sections, accept the new prop shape, and render sections in blueprint order.
4. Implement new section components with DaisyUI classes, responsive layouts, and accessible markup; ensure copy matches source docs.
5. Remove or rewrite `app/_components/AboutSection.tsx`/`useHomeContent` so about content relies on passed data instead of stale defaults.
6. Refresh `TakeawayBanner` and `LocationSection` messaging to ensure phrasing aligns with source documents (no invented claims).
7. Update or add unit tests if structure changes warrant; clean up obsolete tests referencing removed sections.
8. Run `npm run lint` (and targeted tests if available) to validate build integrity.

## Edge Cases
- Missing slideshow slides should still show fallback state (existing `SlideshowFallback`).
- Press ticker or reviews arrays with <2 items must degrade gracefully (hide section or adapt layout).
- Ensure mobile stacking prevents overflow and maintains readable hierarchy.
- Alt text/image paths must remain valid; include guard clauses if assets absent.

## Testing Strategy
- Automated: `npm run lint`; run relevant component/unit tests if suites exist.
- Manual: use Chrome DevTools MCP for responsive, accessibility, console, and performance checks once implementation completes.

## Rollout Plan
- Merge content + component changes, run tests, conduct DevTools QA, then release via normal deployment; no feature flag required.
- Monitor runtime logs/analytics post-deploy for regressions.

## Assumptions
- Blueprint requires keeping both press ticker and reviews; will implement both unless user clarifies otherwise.
- Existing CTA buttons can be simplified/removed if not part of blueprint; assume a single CTA lives inside sections as defined in content.
- No CMS syncing required—static JSON updates are acceptable.
