# Implementation Plan: Remove listed CTAs and routes

## Objective
Remove specified routes and any CTAs that link to them, ensuring there are no remaining internal references that would break the build or navigation.

## Success Criteria
- [ ] Listed routes return 404 (files removed)
- [ ] No CTAs point to removed routes
- [ ] Blog index contains no links to removed posts
- [ ] Sitemap outputs do not include removed event subroute
- [ ] Tests don’t reference removed routes

## Architecture / Changes
- Route removals: delete `app/**/page.tsx` for each listed route.
- Blog: Update `app/blog/page.tsx` to remove featured post and posts array referencing deleted slugs; pass empty arrays to render empty-state.
- Events page: Remove ‘Download Events Pack’ button that links to `/wakes-menu` and its variable.
- Sitemap: Remove `/events/curry-and-carols` from `app/sitemap.ts`.
- next-sitemap: Remove exclude entries for removed routes.
- E2E: Remove the test block referencing `/cls-optimized`.

## Steps
1. Delete route files under `app/**/page.tsx` (as listed)
2. Update blog index to empty featured/posts and adjust categories
3. Remove Events CTA pointing to `/wakes-menu`
4. Remove `/events/curry-and-carols` from `app/sitemap.ts`
5. Tidy `next-sitemap.config.js` exclude list
6. Remove e2e test block that uses `/cls-optimized`
7. Quick grep to confirm no dangling references

## Edge Cases
- Service worker still references `/offline` for fallback; acceptable per request unless asked to change SW behavior.

## Testing Strategy
- Build app locally (if/when desired) and verify the removed routes 404.
- Grep for slug references to ensure no dangling links.
- Run e2e tests if configured; ensure no `/cls-optimized` references remain.

