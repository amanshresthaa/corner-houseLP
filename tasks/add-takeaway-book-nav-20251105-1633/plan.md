# Implementation Plan: Add Header Nav Items

## Objective
Expose "Book a Table" and "Order Takeaway" in top navigation.

## Steps
1. Update `public/data/nav.json` to include two new links after "Events".
2. Mirror changes in `config/content.json` (`global.navigation.header.links`).
3. Restart dev server (or wait for cache) and verify via DevTools.

## Success Criteria
- [ ] New links render in header on desktop and mobile.
- [ ] "Book a Table" routes to `/book-a-table`.
- [ ] "Order Takeaway" routes to external takeaway URL.
