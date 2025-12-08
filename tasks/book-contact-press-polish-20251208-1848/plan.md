# Implementation Plan: Book/contact/press polish

## Objective

Tighten layouts for `/book-a-table`, `/contact`, and `/press` so the sections feel consistent, reduce excess whitespace on mobile, and align card spacing/margins without altering data fetching or SEO helpers.

## Success Criteria

- Hero and body sections use consistent horizontal padding (`px-4 sm:px-6 lg:px-8`) and trimmed vertical rhythm (`py-12 sm:py-16`).
- Card grids share unified spacing (`gap-6`/`gap-8`) and radius/padding tokens so visual density matches across pages.
- Button stacks wrap gracefully with `flex-wrap gap-3` patterns and maintain ≥44px touch targets.
- No regressions to schema tags, metadata, or dynamic imports; lint/tests pass.

## Architecture & Components

- **RestaurantLayout**: remains wrapper; no changes.
- **Hero sections**: restructure using responsive grid/flex combos, align `max-w-3xl` text blocks, reduce `space-y-*` duplication.
- **Cards**: reuse DaisyUI `card` or `rounded-3xl` containers with consistent `p-6 sm:p-8`. Keep `RestaurantHoursCard` and `InteractiveMap` props intact.
- **CTA groups**: standardize to `flex flex-wrap gap-3` and `btn` variants per brand palette.

## Data Flow

- All data remains derived from `getContactInfo`, `getContentSmart`, etc. Only presentation markup/classNames change, so no additional flow considerations.

## UI/UX Considerations

- Mobile-first: tighten hero paddings on small screens while retaining comfortable spacing on desktop.
- Accessibility: keep aria-labels, maintain contrast in gradient sections, ensure reorderings don’t break heading hierarchy.
- Motion: keep reduce-motion styles untouched.

## Testing Strategy

- Run targeted component/page tests via `npm run lint` (if available) or `npm run test` if required for sanity.
- Manual QA through Chrome DevTools MCP on each route to verify responsive behavior, console cleanliness, and accessibility basics.

## Implementation Steps

1. **Book-a-table**
   - Normalize hero container paddings, convert reassurance card stack to responsive grid with consistent gap.
   - Trim vertical spacing in booking options + sidebar, ensuring cards share common padding/radius.

2. **Contact page**
   - Adjust hero vertical rhythm, convert highlight chips and CTA stack to balanced spacing; lighten gradient background layering if needed.
   - Update two-card grid to share `rounded-3xl p-6 sm:p-8 gap-8`, streamline nested `space-y-*` usage, ensure consistent typography sizes.

3. **Press page**
   - Merge dual gradient sections or differentiate backgrounds; reduce redundant padding and ensure quick facts + contact card layout uses the same spacing tokens.
   - Align CTA groups and list spacing, using `space-y-4` + `gap-4` combos.

4. **Verification**
   - Run lint/tests.
   - Conduct Chrome DevTools MCP manual QA on `/book-a-table`, `/contact`, `/press`, recording outcomes in `verification.md`.

## Edge Cases

- Long hero badge values should wrap without overflow; keep `flex-wrap` on chip rows.
- Buttons linking to tel/mailto/external booking must maintain accessible labels.
- Gradient backgrounds should still provide contrast when text scales.

## Rollout

- Standard deploy via existing pipeline; no feature flag. Once QA passes, changes can merge to `main`.
