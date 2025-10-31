# Implementation Plan: Home Page Layout Refresh

## Objective

Apply light-touch layout and styling refinements across the home page sections (excluding the navbar and slideshow) to modernize spacing, visual hierarchy, and responsiveness without altering content structure or data contracts.

## Success Criteria

- [ ] Each home page section (press ticker, about, signature dishes, reviews, quick links, takeaway banner, location, CTA) reflects refreshed spacing/visual hierarchy with existing content preserved.
- [ ] Layout remains mobile-first and accessible, with DaisyUI/Tailwind patterns consistent with rest of codebase.
- [ ] No regressions to navigation, slideshow, or data loading logic.

## Architecture

### Components Impacted

- `components/homepage/PressTicker.tsx`
- `components/homepage/HomepageAboutSection.tsx`
- `components/homepage/HomepageSignatureDishes.tsx`
- `components/homepage/HomepageReviewHighlights.tsx`
- `components/restaurant/sections/QuickLinksSection.tsx`
- `components/restaurant/TakeawayBanner.tsx`
- `components/restaurant/LocationSection.tsx`
- `components/restaurant/sections/CallToActionSection.tsx`
- `components/ClientHomeContent.tsx` (spacing orchestration only)

### Design Approach

- Emphasize section separation via consistent vertical rhythm (`py-20` / `pt-24`), background layers, and container alignment.
- Use Tailwind + DaisyUI utilities already present (cards, badges, gradients) to avoid bespoke CSS.
- Add subtle decorative elements (accent badges, dividers, quote icons) through semantic markup and accessible text.
- Keep DOM structure largely intact—adjust classes and small wrappers only when required for layout.

## Component Breakdown & Key Changes

1. **PressTicker**: introduce label pill, convert container to responsive flex/grid hybrid with equal-height cards, add subtle divider.
2. **HomepageAboutSection**: wrap content in elevated panel, adjust grid to `lg:grid-cols-12` with text/image span ratios, add feature list styling improvements.
3. **HomepageSignatureDishes**: rework grid to support 2-up mobile, 3-up desktop, add accent badge + consistent card padding and footer.
4. **HomepageReviewHighlights**: add quote iconography, responsive grid (2 cols tablet, 3 cols desktop), adjust card contrast and spacing.
5. **QuickLinksSection**: increase gap, add decorative border gradient on hover, ensure accessible focus outlines.
6. **TakeawayBanner**: tighten typography hierarchy, balance CTA button block and metrics row, ensure mobile spacing.
7. **LocationSection**: shift to 12-column grid for asymmetry, add info cards with icon badges, ensure map scales with rounded container.
8. **CallToActionSection**: add top badge, tune padding, refine button wrap for mobile.
9. **ClientHomeContent**: inject section spacing utilities (`space-y`) without touching slideshow/navbar, optionally add subtle background transitions.

## Data Flow

- No API or data layer changes. Components continue to read props from `sections` object provided by `ClientHomeContent`.
- Ensure new decorative elements derive from existing props (e.g., first letter icons, static text) without expecting new CMS data.

## Testing Strategy

- Manual review in Chrome DevTools across mobile (375px), tablet (768px), desktop (1280px+) viewports.
- Check keyboard navigation/focus states on links and buttons.
- Verify Lighthouse accessibility pass for updated sections.
- Ensure no console warnings triggered by layout changes.

## Edge Cases

- Handle missing optional content gracefully (e.g., no features list, no review platform) without layout collapse.
- Ensure limited numbers of items (1–2 quick links, single review) still render cleanly with responsive classes.
- Reduced motion preference should disable hover lifts where applicable (respect existing Framer Motion logic).

## Rollout Plan

- Ship as standard web update (no feature flags). Validate locally, document verification in `verification.md`, and hand off for deployment once QA complete.

