# Implementation Checklist

## Setup
- [x] Create task folder and docs
- [x] Update `config/content.json` with new keys

## Code Changes
- [x] `app/menu/page.tsx`: metadata via content; loading/labels from content
- [x] `app/contact/page.tsx`: metadata via content; CTA labels from content
- [x] `app/not-found.tsx`: metadata via content
- [x] `app/offline/page.tsx`: metadata via content
- [x] `app/press/page.tsx`, `app/privacy-policy/page.tsx`, `app/tos/page.tsx`, `app/events/page.tsx`: metadata via content
- [x] `app/wakes-menu/page.tsx`, `app/takeaway-menu/page.tsx`, `app/christmas-menu/page.tsx`, `app/menu-information/page.tsx`: metadata via content
- [x] `app/layout.tsx`: site metadata from content
- [x] `app/blog/*`: add generateMetadata using content default blog SEO
- [x] `components/restaurant/InteractiveMap.tsx` + use in contact: centralized labels via props
- [x] `components/StickyCallButton.tsx`: sr-only and aria labels centralized
- [x] API routes: checkout/portal messages from content

## Testing
- [ ] Build compiles locally
- [ ] Manual QA via Chrome DevTools (after starting dev server)

## Notes
- Avoid changing domain fallbacks in `lib/restaurantData.ts` in this task.
