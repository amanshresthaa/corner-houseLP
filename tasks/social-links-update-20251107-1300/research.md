# Research: Social Links Cleanup

## Initial Requirements & Success Criteria
- Remove every social media link except Facebook across the entire experience.
- Update all remaining Facebook references to `https://www.facebook.com/people/The-White-Horse/61572172781807/`.
- Ensure no UI surfaces links for Instagram (or other networks) in navigation, schema data, or tests.

## Existing Patterns & Data Sources
- `getSocialMedia()` (from `@/lib/restaurantData`) feeds multiple components including `components/restaurant/Footer.tsx` and `components/restaurant/sections/SocialMediaSection.tsx`.
- Static fallback content lives in `config/content.json` and `config/content/core/global.json`, each exposing `global.navigation.footer.socialMedia` entries for Facebook & Instagram.
- `components/ClientFooter.tsx` hardcodes both Facebook and Instagram anchors.
- Events/landing promos replicate icon buttons in `components/restaurant/sections/EventsUpdatesSection.tsx`.
- SEO metadata (`libs/seo.tsx`, `components/seo/RestaurantSchema.tsx`) lists both Facebook & Instagram profiles.
- API mocks and schema tests (`tests/api/EnhancedApiRoutes.test.ts`, `tests/test-utils/msw-handlers.ts`, `test-utils/mocks/handlers.ts`) serialize Facebook & Instagram URLs.
- Contact schema (`src/lib/data/schemas.ts`) defines optional entries for multiple social networks; no change required unless we want to forbid other networks.

## Constraints & Considerations
- DaisyUI/Tailwind styling already wraps social icons; removing Instagram must preserve spacing/alignment.
- Manual QA later must ensure no stray Instagram/Twitter links remain in DOM (search + DevTools audit).
- Update tests/mocks/SEO data to keep build & lint green.

## Recommended Approach
1. Centralize the new Facebook URL in config content + restaurant data fallbacks to avoid duplicates.
2. Remove/guard Instagram blocks within UI components so only Facebook renders; adjust layout spacing accordingly.
3. Update SEO structured data (JSON-LD) to only emit the new Facebook URL in `sameAs` arrays.
4. Clean up tests/mocks referencing Instagram to reflect the single-link reality.
5. Verify via `rg` that no other social URLs remain and run targeted tests if available.
