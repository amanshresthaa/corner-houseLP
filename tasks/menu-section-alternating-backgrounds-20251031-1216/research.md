# Research: Menu Page Section Alternation

## Initial Requirements
- Alternate section backgrounds after the hero: dark → light → dark → light.
- Leave hero, footer, and stats sections unchanged (remain dark).
- Ensure any dark section flips its typography, icons, borders, and child components to light variants (`text-white`, `text-neutral-100`, `text-neutral-200`, `variant="dark"` props where supported).
- Update the menu page (including interactive block) as needed to keep styling consistent; hero can stay as-is.

## Existing Patterns & Components
- `app/menu/page.tsx` already renders four post-hero sections in the required order: interactive menu (`bg-brand-900`), information CTA (`bg-white`), hours (`bg-brand-800`), and CTA (`bg-neutral-50`). Section alternation exists, but inner components still use light-surface styling even within dark blocks.
- `MenuInteractive` (`app/menu/_components/MenuInteractive.tsx`) contains the sticky filters nav (`bg-white/95`, neutral borders) and renders `MenuSearchFilter` and `MenuSections`. It does not currently accept a tone/variant prop to flip its internal palette.
- `MenuSections` (`components/menu/MenuSections.tsx`) already supports a `tone` prop (`light` | `dark`) that changes headings and body copy, but `MenuInteractive` always uses the default light tone.
- `MenuItemCard` (`components/menu/MenuItemCard.tsx`) assumes a light card surface (`bg-white`, neutral borders/text`) with emoji + colored badges. There is no tone/variant handling, so cards clash when embedded in dark blocks.
- `MenuSearchFilter` (`components/menu/MenuSearchFilter.tsx`) uses hard-coded light styles (white surface, dark text/borders). Needs tone awareness so dark sections can flip to transparent/dark-friendly surfaces.
- `RestaurantHoursCard` already accepts `variant="dark"` and inherits appropriate colors; the menu page already passes the dark variant.

## Technical Constraints & Considerations
- Need to ensure accessible contrast for light text on dark backgrounds; lighten icons/borders using opacity or `border-white/20`.
- Sticky menu nav must retain backdrop blur and readability while using dark palette.
- Cards within dark sections should either adopt translucent light-on-dark styling or opt for neutral offset that still meets contrast guidelines.
- Implementation must stay mobile-first; check responsive states when in dark mode.
- Updates may require adjusting DaisyUI/Tailwind classes; keep tokens consistent (`brand-*`, `neutral-*`, `accent-*`).

## Open Questions
- None blocked; assumption: alternating pattern only covers sections inside this page (hero untouched, footer stays dark).

## Recommended Approach
- Introduce a `tone` (or `variant`) prop on `MenuInteractive`, defaulting to `light`, pass `tone="dark"` from menu page for the interactive block.
- Thread the tone to `MenuSearchFilter` and `MenuSections`; adjust classnames for dark tone (transparent backgrounds, light typography, lighten icons).
- Extend `MenuItemCard` to accept a `tone` prop, updating background, border, and text colors for dark mode while preserving accessibility and badge colors (may lighten badge backgrounds or add opacity).
- Audit CTA/light sections to ensure they use the proper light palette and that alternating order stays intact.
- After updates, rerun relevant unit tests (Menu components) or add new coverage if necessary.
