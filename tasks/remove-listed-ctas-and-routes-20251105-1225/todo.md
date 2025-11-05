# Implementation Checklist

## Route removals
- [ ] Delete `app/wakes-menu/page.tsx`
- [ ] Delete `app/curry-and-carols-menu/page.tsx`
- [ ] Delete `app/cls-optimized/page.tsx`
- [ ] Delete `app/events/curry-and-carols/page.tsx`
- [ ] Delete blog post pages (10 listed)
- [ ] Delete `app/offline/page.tsx`
- [ ] Delete `app/test-hours/page.tsx`

## Cleanup references
- [ ] Update `app/blog/page.tsx` (remove featured+posts, adjust categories)
- [ ] Remove Events CTA to `/wakes-menu`
- [ ] Remove `/events/curry-and-carols` in `app/sitemap.ts`
- [ ] Tidy excludes in `next-sitemap.config.js`
- [ ] Remove e2e test block referencing `/cls-optimized`

## Verification
- [ ] Grep slugs to ensure no dangling references
- [ ] Build and smoke test (optional)

## Assumptions / Notes
- Offline SW fallback left as-is; route removed per request
- Empty `app/blog` directories left are harmless; routes removed by deleting `page.tsx`

