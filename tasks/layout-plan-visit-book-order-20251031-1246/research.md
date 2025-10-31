# Research: Menu Page Section Layout

## Existing Patterns
- `app/menu/page.tsx` renders sequential `<FadeIn>` wrapped sections with alternating background colors (dark hero -> dark interactive section -> light info -> dark hours -> light CTA).
- "Explore the menu" block uses `bg-brand-900` with `MenuInteractive` inside a translucent container; typography assumes light-on-dark contrast.
- The "Plan your visit" section (`bg-brand-800`) pairs copy with `RestaurantHoursCard` in a two-column layout, leaning on dark styling.
- `MenuCTASection` component provides the "🍽️ Book or Order in Moments" CTA with a light outer background and gradient inner card; accepts `className` overrides for background spacing.

## External Resources
- No additional docs referenced; existing design system utilities (Tailwind + DaisyUI-style tokens) suffice.

## Technical Constraints
- Page relies on `FadeIn` animation wrapper and dynamic imports, so merged sections should preserve hydration-friendly layout and avoid breaking SSR-only imports.
- `MenuCTASection` expects button arrays and optional allergen notice; combining with hours content may require inline JSX restructuring rather than modifying the shared component drastically.
- `MenuInteractive` component currently ignores the `tone` prop; color changes must be driven by surrounding container styles.

## Recommendations
- Convert "Explore the menu" container to a light theme (e.g., `bg-neutral-50` or `bg-white`) and adjust inner card styling to maintain contrast.
- Merge the "Plan your visit" hours content and CTA buttons into a single light section to reinforce the light/dark alternation (e.g., create a composite layout that keeps hours card alongside CTA gradient card).
- Consider reusing `MenuCTASection` markup inline or extending the component to accept additional JSX slots so both hours info and CTA reside in one unified section.
- Verify resulting section flow matches desired light→dark→light pattern starting from the hero successor.

## Open Questions
- Should the merged section keep the gradient CTA styling or be simplified to match hours card aesthetics?
- Any requirement to retain `MenuCTASection` standalone export for reuse elsewhere?

