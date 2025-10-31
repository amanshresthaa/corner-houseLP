# Research: Interactive Menu Colors

## Existing Patterns
- `app/menu/page.tsx` renders the interactive menu block inside a light neutral wrapper (`bg-neutral-50`) but passes `tone="dark"` to `MenuInteractive`, forcing dark UI variants across `MenuInteractive`, `MenuSections`, and `MenuItemCard`.
- `MenuInteractive` (at `app/menu/_components/MenuInteractive.tsx`) already supports a `tone` prop with a default of `'light'`. When `tone='light'`, the sticky filters bar, buttons, and cards use white/neutral backgrounds and brand-colored text consistent with the homepage palette.
- `MenuItemCard` and downstream subcomponents (e.g., `MenuSections`) conditionally apply light vs. dark classes based on the same `tone` prop, so flipping the prop cascades the palette change.
- The homepage shell (`components/ClientHomeContent.tsx`) establishes the desired look: `bg-neutral-50` background with dark text (`text-brand-700`), which matches the default/light tone styles.

## External Resources
- None required; styling patterns are internal and already implemented in the light-tone branch of the interactive menu components.

## Technical Constraints
- Avoid hard-coding new color classes; rely on the existing `tone` variants so future palette changes stay centralized.
- Menu page currently assumes a dark variant for contrast sequencing with adjacent sections; changing the tone should not impact data fetching or SEO meta tags.
- Need to ensure contrast remains accessible (light background + dark text) and that sticky elements still maintain proper border/shadow separation.

## Recommendations
- Remove the explicit `tone="dark"` prop (or switch it to `'light'`) when `MenuInteractive` is rendered in `app/menu/page.tsx` so the component falls back to its light styling.
- Verify that no other hard-coded dark-specific classes remain in the wrapper; the surrounding section already uses light neutrals, so no additional class changes appear necessary.
- After updating, compare the menu page section against the homepage to confirm palette alignment and accessibility.
