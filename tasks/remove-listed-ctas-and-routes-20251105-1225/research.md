# Research: Remove listed CTAs and routes

## Scope
Remove the following routes and any CTAs linking to them:
- /wakes-menu — app/wakes-menu/page.tsx
- /curry-and-carols-menu — app/curry-and-carols-menu/page.tsx
- /cls-optimized — app/cls-optimized/page.tsx
- /events/curry-and-carols — app/events/curry-and-carols/page.tsx
- Blog posts (10):
  - /blog/largest-thatched-pub-history — app/blog/largest-thatched-pub-history/page.tsx
  - /blog/perfect-sunday-roast-guide — app/blog/perfect-sunday-roast-guide/page.tsx
  - /blog/ultimate-sports-viewing-guide — app/blog/ultimate-sports-viewing-guide/page.tsx
  - /blog/business-lunch-cambridge-guide — app/blog/business-lunch-cambridge-guide/page.tsx
  - /blog/evening-standard-country-pub-of-the-week — app/blog/evening-standard-country-pub-of-the-week/page.tsx
  - /blog/nepalese-cuisine-journey — app/blog/nepalese-cuisine-journey/page.tsx
  - /blog/authentic-momo-dumplings-nepalese-cuisine — app/blog/authentic-momo-dumplings-nepalese-cuisine/page.tsx
  - /blog/local-suppliers-fresh-ingredients — app/blog/local-suppliers-fresh-ingredients/page.tsx
  - /blog/dog-friendly-dining-guide — app/blog/dog-friendly-dining-guide/page.tsx
  - /blog/student-guide-cambridge-university — app/blog/student-guide-cambridge-university/page.tsx
- /offline — app/offline/page.tsx
- /test-hours — app/test-hours/page.tsx

## Findings
- All specified pages exist under `app/` as `page.tsx` and map 1:1 to routes.
- `app/blog/page.tsx` explicitly lists many of these posts in `featuredPost` and `blogPosts` arrays; must update to avoid broken links after deletion.
- `app/events/page.tsx` includes a CTA button linking to `/wakes-menu` (Download Events Pack); must remove.
- `app/sitemap.ts` includes `/events/curry-and-carols`; must remove entry.
- `next-sitemap.config.js` lists several of these paths in `exclude` (cosmetic); removing lines keeps config tidy.
- E2E test `e2e/lazy-loading.spec.ts` references `/cls-optimized`; must adjust or remove test block.
- Service worker `public/sw.js` references `/offline` for offline fallback. Removing the route will degrade the offline fallback but won’t break build. We’ll leave SW untouched unless asked to change offline behaviour.

## References discovered
- next-sitemap.config.js: excludes `/curry-and-carols-menu`, `/wakes-menu`, `/cls-optimized`, `/test-hours`.
- app/sitemap.ts: adds `/events/curry-and-carols`.
- app/events/page.tsx: CTA links to `/wakes-menu`.
- e2e/lazy-loading.spec.ts: navigates to `/cls-optimized`.
- Blog post directories present and referenced from index.

## Constraints / Considerations
- Removing `page.tsx` removes the route; empty directories can remain without affecting routing.
- Blog index must gracefully handle zero posts; component supports empty posts and categories.
- Offline route removal may affect SW’s offline fallback; acceptable per request.

## Recommendation
- Delete listed `page.tsx` files.
- Update blog index to remove featured + posts arrays or set to empty and keep UI with empty state.
- Remove CTA button in Events page and its unused variable.
- Remove `/events/curry-and-carols` from `app/sitemap.ts`.
- Tidy `next-sitemap.config.js` excludes.
- Remove the single e2e test block that depends on `/cls-optimized`.

