# Research: Blueprint-style nav button for “Order Takeaway”

## Existing Patterns

- Navbar composition lives in `components/restaurant/Navbar.tsx` and `components/restaurant/NavbarParts.tsx`.
- Links are loaded via `useParsedData('nav.json', NavDataSchema)`; primary data source at `public/data/nav.json` with fallback to `config/content.json`.
- DaisyUI is present (see `tailwind.config.js` -> `plugins: [require('daisyui')]`). Current nav links use DaisyUI `btn` variants (`btn`, `btn-ghost`).
- Global CSS is defined in `app/globals.css` and imports `styles/generated/colors.css` and `styles/accessibility.css`. This is the right place to add small project-wide utility styles.

## External References

- Blueprint-like grid can be created with layered CSS gradients for vertical and horizontal lines.
- Corner brackets can be simulated with pseudo-elements and borders sized to small lengths.

## Constraints

- Keep DaisyUI semantics: extend `btn` with a modifier class rather than a bespoke component.
- Accessibility: maintain visible focus ring and readable contrast (white text on brand/blue background).
- Mobile-first: keep hit target ≥44px; microcopy (“free delivery”) must remain readable but non-blocking on narrow screens.

## Recommendations

- Implement `.blueprint-btn` class that composes with `btn`.
- Provide a small top-right microcopy element styled as `.blueprint-corner-note` with the text “free delivery”.
- Detect the Order Takeaway link in `NavbarParts.tsx` (by label or outward href) and render the special button markup for just this item.
- Use CSS custom properties for line color and grid sizes so we can tweak without touching markup.

