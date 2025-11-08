# Implementation Checklist

## Header & Banner
- [x] Add safe-area padded sticky wrapper with solid white background around the navbar stack.
- [x] Pass sticky/layout classes to `SeasonalPromoBanner` so it spans full width and aligns with the nav border.

## Navbar Styling
- [x] Ensure `<nav>` and the mobile drawer keep the white background/border treatment without duplication.

## Offset Tracking
- [x] Measure the fixed banner+nav height with `useLayoutEffect` + `ResizeObserver` and push it into `--navbar-offset` / `--navbar-stack-offset`.
- [x] Seed default CSS custom properties in `app/globals.css`.
- [x] Consume the CSS variables in `RestaurantLayout`, `SeamlessLayout`, and `ClientHomeContent` so content is padded below the fixed stack.

## Notch/Metadata
- [x] Force `themeColor` metadata to `#ffffff` for all schemes to keep the notch background white.

## Verification
- [x] Run `npm run lint` to catch JSX/TS issues. *(Fails on unrelated legacy lint errors; targeted lint of touched files passes.)*
- [x] Perform Chrome DevTools manual QA (desktop + mobile, safe-area emulation).
