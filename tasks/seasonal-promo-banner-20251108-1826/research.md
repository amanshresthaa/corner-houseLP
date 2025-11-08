# Research: Seasonal Promo Banner

## Existing Patterns & References
- `components/restaurant/Layout.tsx` and `components/restaurant/SeamlessLayout.tsx` fix the navbar to the top and offset page content with `paddingTop: 64px`; any site-wide banner should sit inside the `<main>` region so it is not hidden beneath the fixed nav.
- `components/ClientHomeContent.tsx` renders the homepage without `RestaurantLayout`, so homepage-specific injection must happen inside this file to preserve parity with other routes.
- DaisyUI utility classes (e.g., `alert`, `btn`, `card`) are already used in surface components such as `components/homepage/PressTicker.tsx`; we can lean on the same pattern for a promo banner.
- `components/restaurant/TakeawayBanner.tsx` demonstrates the current styling tone: brand palette tokens (`text-brand-*`, `border-brand-*`) plus the shared `EmojiIcon` helper for emoji-based pictograms.
- Brand colors are defined via CSS variables in `tailwind.config.js` → `theme.extend.colors.brand[...]`; sticking to `brand-*` classes keeps the palette on brand without introducing raw hex values.

## External / Supporting Assets
- `/app/christmas-menu/page.tsx` already exists, so the CTA target `/christmas-menu` is live.
- `EmojiIcon` (`components/common/EmojiIcon.tsx`) provides consistent rendering + `aria-hidden` handling for emoji used as decorative icons; we can reuse it for the 🎄 badge icon to align with other surfaces.

## Technical Constraints & Considerations
- Navbar is fixed height; the new banner must not alter the nav height or require additional `paddingTop` adjustments. Place it inside `main` wrappers and ensure it is keyboard-focusable via `focus-visible` ring per accessibility guidelines.
- Need to support DaisyUI + Tailwind classes only; no custom CSS files should be introduced.
- JSON brief mentions `dataset` attributes (`seasonal-banner: true`), `meta` fields (`status`, `season`, `lastUpdated`), and icon path metadata. We should keep the JSON as a standalone artifact so marketing can share/edit without touching TSX.
- CTA needs `analyticsId` → expose as `data-analytics-id` attribute to feed any instrumentation later.
- Mobile-first: banner layout must stack vertically on small viewports (`flex-col`, center-aligned) and shift to row layout on `md` as per provided classes.

## Recommendations
1. Create `config/banners/seasonalPromoBanner.json` that mirrors the provided JSON verbatim so non-React contexts can reuse it.
2. Build a reusable `SeasonalPromoBanner` client component under `components/marketing/SeasonalPromoBanner.tsx` that consumes the JSON, renders DaisyUI alert markup, applies dataset/meta attributes, and exposes CTA/focus states.
3. Inject the component immediately after the nav inside:
   - `components/restaurant/Layout.tsx` and `components/restaurant/SeamlessLayout.tsx` (covers most interior pages), and
   - `components/ClientHomeContent.tsx` (covers homepage) so the banner is truly “site-wide.”
4. Add a focused Jest test (Testing Library) to ensure the banner renders the badge, message, and CTA correctly plus carries the data attributes.
5. During verification, QA the banner in Chrome DevTools across mobile/tablet/desktop widths to confirm wrapping, focus ring, and hover states remain on-brand.
