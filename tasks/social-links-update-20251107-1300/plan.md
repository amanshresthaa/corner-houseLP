# Implementation Plan: Social Links Cleanup

## Objective
Ensure the site only surfaces a single Facebook presence using `https://www.facebook.com/people/The-White-Horse/61572172781807/`, removing Instagram (and any other social) links from UI, content, SEO metadata, and tests.

## Success Criteria
- [ ] All user-facing components render only the new Facebook link/icon.
- [ ] Config/content sources expose only the Facebook entry with the new URL.
- [ ] SEO `sameAs` arrays, mocks, and tests reference only the Facebook profile.
- [ ] `rg 'instagram'` within the repo only returns schema definitions or comments that are intentionally retained (none expected after cleanup).

## Architecture & Components
- **Content Source**: `config/content.json` & `config/content/core/global.json` supply footer social data; update to only include Facebook with the new URL.
- **Restaurant Data Helpers**: rely on config; no structural change anticipated.
- **UI Components**: `components/restaurant/Footer.tsx`, `components/ClientFooter.tsx`, `components/restaurant/sections/SocialMediaSection.tsx`, `components/restaurant/sections/EventsUpdatesSection.tsx` – strip Instagram JSX & adjust layout.
- **SEO/Metadata**: `libs/seo.tsx`, `components/seo/RestaurantSchema.tsx` – ensure `sameAs` array only contains Facebook link.
- **Tests/Mocks**: `tests/api/EnhancedApiRoutes.test.ts`, `tests/test-utils/msw-handlers.ts`, `test-utils/mocks/handlers.ts` – match new data snapshot.

## Data Flow
Content JSON feeds `getContentSmart()` → Footer/social components. Removing Instagram there ensures components fall back to Facebook only. SEO helpers likely import static arrays – update them to only include the Facebook URL to maintain consistency.

## Implementation Steps
1. Update `config/content.json` and `config/content/core/global.json` social media objects (set Facebook URL to new value; remove Instagram entry entirely).
2. Adjust UI components to remove Instagram anchor blocks and collapse spacing (Footer, ClientFooter, SocialMediaSection, EventsUpdatesSection).
3. Update SEO files (`libs/seo.tsx`, `components/seo/RestaurantSchema.tsx`) to only include the new Facebook URL in `sameAs` arrays.
4. Align mocks/tests (`tests/api/EnhancedApiRoutes.test.ts`, `tests/test-utils/msw-handlers.ts`, `test-utils/mocks/handlers.ts`) with the new single-link configuration.
5. Run `rg 'instagram'` (and similar) to confirm no stray UI references; add TODO/test updates if needed.

## Edge Cases & UX
- Ensure layout remains balanced when only one icon exists (maybe remove `space-x` for a single child or accept existing spacing).
- Guard components so missing social data gracefully degrades (fallback `#` only as last resort, but config should provide the Facebook URL).

## Testing Strategy
- Unit/integration: existing automated tests referencing social data will validate new expectations.
- Manual QA: Later in verification phase, inspect relevant pages via Chrome DevTools MCP to confirm only Facebook link renders and points to the new URL.

## Rollout
- No feature flagging needed; low risk content/UI update. Deploy via standard pipeline after QA.
