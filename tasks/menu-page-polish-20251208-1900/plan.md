# Implementation Plan: Menu Page Polish

## Objective
- Bring the `/menu` experience in line with the homepage design system by tightening spacing, harmonizing the card shells, and eliminating layout friction (nested scroll, uneven gutters) while preserving all interactive features.

## Success Criteria
- [ ] Hero, explore, visit, and CTA sections all observe the `max-w-6xl px-4 sm:px-6 lg:px-8` + `py-12/16` rhythm.
- [ ] Menu list no longer uses nested scrolling; dietary/search filters remain functional.
- [ ] Quick presets + CTA group styles match DaisyUI pill/btn patterns; no visual regressions in tests.
- [ ] Jest suite for menu components passes locally.

## Architecture & Components
- `MenuHero`: keep structure but trim redundant padding/margins so hero sits closer to explore section; reuse eyebrow + highlight grid tokens from doc.
- `MenuExploreSection`: restructure left column spacing, highlight cards, dietary list, quick preset shell, and CTA tray to use `rounded-3xl border-brand-100 bg-white/95 shadow-xl`; update right column padding + header.
- `MenuInteractive`: modernize quick filter shell + nav pill spacing, drop negative margins, and ensure summary pill uses design colors; keep `menu:preset` wiring untouched.
- `MenuSearchFilter`: refactor container, inputs, chips, toggles, and slider to align with DaisyUI tokens (`rounded-[1.5rem]`, `border-brand-100`, `text-brand-700`) plus consistent focus rings.
- `MenuSections`: remove `max-h`/overflow, convert to gradient-backed cards per doc, enforce consistent typography + spacing between sections.
- `MenuPage` visit section: adopt `py-12 sm:py-16`, update cards/CTA area, and align `RestaurantHoursCard` wrapper with new radius + gradient.

## Data Flow
- Preserve `MenuExploreSection → window.dispatchEvent('menu:preset') → MenuInteractive/MenuSearchFilter` contract; adjustments stay purely presentational.
- Ensure `MenuInteractive` still updates URL hash/query when selecting categories and filtering; any DOM changes must not break `aria`/id relationships used in tests.
- `MenuSections` continues receiving derived `sections`, `selectedId`, `searchTerm`; removing nested scroll must not affect virtualization.

## UI/UX Considerations
- Maintain alternating light gradients with clear section boundaries; keep headings, eyebrows, badges following doc tokens.
- Improve readability by constraining line length, using consistent tracking for uppercase labels, and reducing extra whitespace between cards.
- Buttons + pills should respond with `hover:-translate-y-0.5` or subtle focus rings while keeping `touch-action: manipulation` on tel/booking links.
- Guarantee focus-visible styles remain accessible (contrasting outlines, high text contrast) when shifting colors.
- Use mobile-first ordering—sticky column should degrade gracefully on small screens without negative margins.

## Testing Strategy
- Update unit tests in `tests/components/menu/MenuExploreSection.test.tsx` (and add/extend tests for `MenuSections` or `MenuSearchFilter` if DOM expectations change).
- Run `npm run test -- Menu` to cover affected suites; if glob fails, fall back to `npm run test -- MenuExploreSection` etc.
- Perform manual QA in Chrome DevTools MCP across breakpoints, verifying focus order, keyboard nav, and no console warnings.

## Edge Cases
- Empty sections (already handled) must still show friendly fallback after removing nested scroll.
- Quick presets may be absent; ensure spacing collapses without gaps.
- Dietary/allergen notes may be short or long—use responsive grid/list that doesn’t break layout.
- Phone/booking links may be internal/external; button wrappers must respect both states.

## Rollout
- Direct release on `main`; no flags. Ensure sitemap/SEO unaffected because we are not touching metadata.
