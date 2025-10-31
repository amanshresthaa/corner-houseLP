# Implementation Checklist

## Helpers
- [x] Add/export convenience getters/constants from `lib/restaurantData.ts` if needed for client components.

## Server Pages
- [x] Replace literal contact info in `app/wakes-menu/page.tsx`.
- [x] Replace literals in `app/curry-and-carols-menu/page.tsx` & related event pages.
- [x] Update legal pages (`app/privacy-policy/page.tsx`, `app/tos/page.tsx`).
- [x] Sweep remaining pages/components for `oldcrown@`, `01223 375578`, `12 Green Side`, etc., and refactor to use helpers.

## Client Hooks & Shared Components
- [x] Update `usePrivacyContent` / `useTOSContent` fallbacks.
- [x] Ensure CTA components (`StickyCallButton`, `TakeawayBanner`, etc.) rely on shared data.

## Validation
- [ ] Run ESLint on updated files.
- [x] `pnpm run build`.
- [x] Manual QA spot-check via Chrome DevTools.

## Notes
- Tests may still assert literal strings; only adjust if necessary for failing suites.
