# Implementation Plan: Menu Page Spacing & Palette Refresh

## Objective
Align the menu page with the new spacing guidelines and alternating light/dark section cadence without regressing existing menu functionality.

## Success Criteria
- [ ] Post-hero sections alternate: dark → light → dark → light, with text/adornments legible in each context.
- [ ] No top-level section relies on `space-y-*` or `mb-*` for vertical separation; each block manages spacing via internal `py-*`.
- [ ] `MenuSections` renders correctly without `space-y-12`, maintaining anchor targets and per-category spacing.
- [ ] Dark wrappers switch inner typography/components (e.g., `RestaurantHoursCard variant="dark"`) to the light palette.
- [ ] Viewports (mobile 375px, tablet 768px, desktop 1280px+) verified in DevTools with no layout bugs.

## Architecture
- Update `app/menu/page.tsx` structure: keep hero gradient, restructure `<main>` to render four sections with explicit backgrounds/padding.
- Import modular sections (`MenuInformationSection`, `MenuCTASection`) and dynamically load `RestaurantHoursCard` for reuse and consistent styling.
- Adjust `MenuSections` (`components/menu/MenuSections.tsx`) to remove `space-y-12` wrapper and apply section-level padding; optionally alternate per-category background if needed for rhythmic consistency.
- Ensure new dark sections use shared tokens (`bg-brand-900`, `bg-brand-700`) and light text utilities; light sections use `bg-white`/`bg-neutral-50`.

## Component Breakdown
- `app/menu/page.tsx`: orchestrate section sequence, feed CTA/FAQ data, ensure each section has `py` and background classes.
- `components/menu/MenuSections.tsx`: swap external spacing for internal `py`, verify scroll behavior; consider background alternation logic.
- `components/restaurant/RestaurantHoursCard.tsx`: already supports variants; ensure invocation passes `variant="dark"` inside new section.
- Potential helper wrappers (if necessary) to avoid repeated background logic (e.g., small utility function to compute background/text classes by index).

## Data Flow
- Continue fetching marketing/menu/content via existing `Promise.all` call; derive CTA labels and FAQ items from `content`/`menuContent`.
- Build `faqItems` array from `content.components.faq` (fallback to subset if missing) before passing to `MenuInformationSection`.
- Pass computed button set (book/order/story) into `MenuCTASection` to preserve CTA functionality.

## API Contracts
- No new endpoints; ensure `MenuSections` props remain backwards-compatible.
- `MenuCTASection` expects `buttons` array; confirm objects include proper `variant` and `href` properties.
- `RestaurantHoursCard` dynamic import should maintain default export signature.

## UI/UX Considerations
- Dark sections: apply `text-white`/`text-neutral-100`, ensure badges/links contrast (may need `aria-label` tweaks for icons on dark backgrounds).
- Light sections: keep typography consistent with rest of site (`text-brand-700`, `text-neutral-600`).
- Maintain mobile-first layout: ensure padding responsive (`py-16` scales appropriately), CTA buttons remain accessible with adequate touch targets.
- Preserve existing animation wrappers (`FadeIn`) while ensuring padding sits inside section to avoid overlap.

## Testing Strategy
- Unit: Update/extend tests for `MenuSections` (if present) to reflect removal of `space-y-12` and any new class logic.
- Visual/manual: Chrome DevTools (mobile/tablet/desktop) to confirm alternating backgrounds, spacing, sticky nav behavior, accessibility (contrast, keyboard nav).
- Regression: Smoke-run relevant lint/test suites (`npm run lint`, targeted component tests) if time permits.

## Edge Cases
- No FAQ items present → `MenuInformationSection` should gracefully skip (component already guards; verify fallback copy).
- Menu with zero sections → ensure `MenuSections` empty state still looks correct against new backgrounds.
- Opening hours API failure → `RestaurantHoursCard` fallback still legible in dark section.

## Rollout Plan
- No feature flag; deploy as part of next release once manual QA closes.
- Document palette alignment in task notes; coordinate with any concurrent global spacing work to avoid merge conflicts.
