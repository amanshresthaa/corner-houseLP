# Research: Sticky Banner & Navbar

## Initial Requirements
- Make the banner section sticky so it remains visible when scrolling.
- Make the navbar sticky as well.
- Ensure the notch background remains white regardless of theme settings.

## Success Criteria
- Banner and navbar stay fixed at the top (or intended position) while scrolling without layout glitches.
- The notch area visually keeps a white background across themes/modes.
- No regressions introduced to layout or interactions.

## Existing Patterns
- `components/restaurant/Navbar.tsx` already wraps `SeasonalPromoBanner` and the nav inside a `<header className="sticky top-0 z-50 w-full">`, so anything inside that header should be eligible for sticky positioning. The nav itself uses DaisyUI/Tailwind utilities (`border-b bg-white shadow-sm`) and responsive flex layout.
- `SeasonalPromoBanner` (in `components/seasonal/SeasonalPromoBanner.tsx`) consumes the JSON spec under `config/banners/seasonalPromoBanner.json`. It accepts an optional `className` that is concatenated with the JSON-driven surface classes, so we can layer additional behavior (stickiness, padding, z-index) without editing the JSON.
- `RestaurantLayout` and `SeamlessLayout` both place `<Navbar />` at the top of the page, meaning a single Navbar change will propagate to most routes, as well as `ClientHomeContent` for the homepage.
- Safe-area helpers already exist in `app/globals.css` (`.safe-area-top { padding-top: env(safe-area-inset-top); }`), and the marketing `Header` component uses that class to keep content out of the notch.
- Global metadata in `app/layout.tsx` currently sets `themeColor` using the light/dark palette tokens, which controls the color that fills the OS notch/status area in many browsers.

## External Resources
- [MDN – `position: sticky`](https://developer.mozilla.org/docs/Web/CSS/position) confirms sticky elements respect the nearest scrolling ancestor and require a `top` offset.
- [Apple HIG – Safe Area](https://developer.apple.com/design/human-interface-guidelines/safe-areas) reinforces using `env(safe-area-inset-top)` padding plus a solid background to control the notch fill color.
- [MDN – `theme-color` meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta/name/theme-color) details how browsers derive the status/notch color from this metadata, regardless of site theme.

## Technical Constraints
- Must continue using DaisyUI/Tailwind utility classes that already drive navbar styling; avoid bespoke CSS unless necessary.
- The sticky header needs to play nicely with `NextTopLoader`, the slideshow hero, and safe-area padding, so we should not introduce layout shifts or hard-coded heights.
- The `SeasonalPromoBanner` background currently comes from the JSON config; forcing a hard white notch background should happen via the surrounding wrapper (e.g., header) instead of mutating the JSON spec so future banner styles keep flexibility.
- Metadata is generated server-side in `app/layout.tsx`; changing `themeColor` requires updating this file and ensuring TypeScript types remain satisfied.

## Findings & Recommendations
1. Wrap the navbar content in a dedicated sticky container that applies `bg-white` + `safe-area-top` so both the banner and nav inherit the same pinned background and notch padding. Use `backdrop-blur`/opacity tokens sparingly to keep the background solid.
2. Pass an explicit `className` to `SeasonalPromoBanner` to ensure it stretches full width within the sticky stack and inherits any safe-area background adjustments.
3. Explicitly set the meta `themeColor` array to `#ffffff` for light/dark (or collapse to a single string) so browsers always paint the notch/status bar white, regardless of theme tokens.
4. Add a small CSS utility (if needed) to guarantee the safe-area padding background stays white; otherwise, ensure the header wrapper sets the background directly.

## Open Questions
- Confirm whether any other top-level banner (e.g., development environment notices) also needs the sticky treatment; for now we assume the seasonal promo banner is the primary "banner" referenced by the request.
