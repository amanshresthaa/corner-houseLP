# Implementation Plan: Sticky Banner & Navbar

## Objective

Keep the seasonal promo banner and primary navbar pinned to the top of every page and ensure the OS notch/safe-area background is always white regardless of theme.

## Success Criteria

- [ ] The banner + navbar stack never scrolls out of view; both remain visible when the user scrolls any page that uses `Navbar`.
- [ ] On iOS/Android notch devices the safe-area padding above the navbar renders as white (verified via devtools emulation + checking `meta[name="theme-color"]`).
- [ ] No layout shift or overlap occurs between the banner and navbar on desktop or mobile.
- [ ] Metadata changes pass TypeScript build checks.

## Architecture & Approach

### Components Affected
- `components/restaurant/Navbar.tsx`: wrap the banner+nav stack in a single sticky, white background container and pass extra sticky/spacing classes to `SeasonalPromoBanner`.
- `app/globals.css` (only if needed) to guarantee `.safe-area-top` background stays white; ideally handled via Tailwind utilities on the header itself.
- `app/layout.tsx`: force the `themeColor` metadata to `#ffffff` for all schemes.

### Data / Props
- `SeasonalPromoBanner` already takes `className`; use it to add `w-full`, `bg-white`, and border overrides that align with the nav.

### State & Interaction
- Stickiness is purely CSS; no new React state required. Ensure stacking context/z-index keep the header above content.

## Implementation Steps
1. **Navbar wrapper adjustments**
   - Add `bg-white`, `safe-area-top`, and `backdrop-blur` classes to the `<header>` wrapper and ensure it remains `sticky top-0 z-50`.
   - Wrap banner+nav content in a `div` that shares the white background so the notch padding matches.
   - Pass a `className` to `SeasonalPromoBanner` to enforce full-width layout and ensure its border transitions cleanly into the nav below.
2. **Nav refinements**
   - Ensure the `<nav>` element also uses `bg-white` and, if the banner already provides a border, switch the nav border to `border-t` so there is only one dividing line.
   - Double-check mobile menu background so it matches the sticky header.
3. **Theme-color metadata**
   - Update `app/layout.tsx` to set `themeColor` to white for both media queries (or collapse to a single string) so browsers paint the notch/status bar white regardless of theme tokens.
4. **Optional CSS helper** (only if the Tailwind classes cannot express the safe-area background): add a `.safe-area-top-bg-white` helper in `globals.css`.

## Edge Cases
- Long promo banner text: ensure sticky stack still works on 2-line banner; nav should remain accessible (maybe add `divide-y` to keep separation clear).
- Mobile drawers: confirm the fixed mobile menu button works with the new sticky context and that the dropdown inherits the correct background.
- Pages without the seasonal banner (if meta toggles `status`): sticky nav should still look correct with safe-area padding.

## Testing Strategy
- Manual: Scroll on `/`, `/menu`, `/contact` in desktop + mobile widths to ensure the header stays pinned and notch padding is white.
- Automated: Run `npm run lint` (fast) to catch TypeScript/JSX issues since we touch shared layout + metadata files.
- Accessibility: Use Chrome DevTools to emulate iPhone notch + inspect safe-area color.

## Rollout
- No feature flag; Navbar is shared, so release once verified. Deploy with extra QA on mobile.
