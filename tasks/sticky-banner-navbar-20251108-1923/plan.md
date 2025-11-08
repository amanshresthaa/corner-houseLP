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
- `components/restaurant/Navbar.tsx`: convert the stack to a `fixed inset-x-0 top-0` container, keep `SeasonalPromoBanner` as the first child, and add a `useLayoutEffect` + `ResizeObserver` that records the combined height in CSS custom props (`--navbar-offset`, `--navbar-stack-offset`).
- `components/restaurant/Layout.tsx`, `components/restaurant/SeamlessLayout.tsx`, and `components/ClientHomeContent.tsx`: consume the custom props to pad their `<main>` elements so content never sits behind the fixed header.
- `app/globals.css`: seed default values for the navbar custom properties to avoid flashes before JS runs.
- `app/layout.tsx`: force the `themeColor` metadata to `#ffffff` for all schemes (already in place from the first iteration).

### Data / Props
- `SeasonalPromoBanner` already takes `className`; use it to add `w-full`, `bg-white`, and border overrides that align with the nav.

### State & Interaction
- Stickiness is driven by CSS `position: fixed`; a `useLayoutEffect` keeps CSS variables in sync via `ResizeObserver` so height adjustments propagate instantly (e.g., when the promo banner toggles or the mobile drawer opens).

## Implementation Steps
1. **Fixed nav stack**
   - Replace the wrapper with a `nav` element that has `className="fixed inset-x-0 top-0 z-50 … safe-area-top"`, keeping `SeasonalPromoBanner` as the first child so it inherits the fixed positioning alongside the nav controls.
   - Ensure the stack background stays white/opaque (for the notch) while the banner still uses its DaisyUI alert styling; add light dividers where needed.
2. **Dynamic offset tracking**
   - Inside `Navbar`, attach a `useLayoutEffect` with a `ResizeObserver` + `window.resize` listener to measure `offsetHeight` of the stack and write the value to `--navbar-offset` / `--navbar-stack-offset`. Clean up listeners on unmount and reset the variables to `0px`.
   - Seed both variables with default `0px` values in `app/globals.css` so SSR-rendered content doesn’t jump.
3. **Layout consumption**
   - Update `RestaurantLayout`, `SeamlessLayout`, and the homepage `ClientHomeContent` to add `padding-top: var(--navbar-stack-offset, 0px)` on their `<main>` tags.
   - Confirm the mobile drawer and any other absolutely positioned children still align now that their ancestor is fixed.
4. **Theme-color metadata**
   - (Already completed) keep `DEFAULT_THEME_COLOR` at `#ffffff` and ensure `<meta name="theme-color">` is emitted during SSR so the notch background is white before hydration.

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
