# Implementation Checklist

## Content Updates
- [x] Update `config/content.json` social media section to only include the new Facebook URL.
- [x] Update `config/content/core/global.json` to match the new Facebook-only setup.

## UI Components
- [x] Remove Instagram link from `components/restaurant/Footer.tsx` and ensure layout still looks correct.
- [x] Remove Instagram link from `components/ClientFooter.tsx` and point Facebook anchor to the new URL.
- [x] Simplify `components/restaurant/sections/SocialMediaSection.tsx` to only render Facebook with the new URL.
- [x] Simplify `components/restaurant/sections/EventsUpdatesSection.tsx` to only render Facebook with the new URL.

## Metadata & Tests
- [x] Update Facebook URL and prune Instagram from `libs/seo.tsx` & `components/seo/RestaurantSchema.tsx`.
- [x] Update social data for tests/mocks (`tests/api/EnhancedApiRoutes.test.ts`, `tests/test-utils/msw-handlers.ts`, `test-utils/mocks/handlers.ts`).

## Verification Prep
- [x] Run `rg 'instagram'` (and other networks) to confirm no stray references remain besides schema definitions.
- [x] Note manual QA scenarios for verification.md.
