# Implementation Checklist

## Config Update
- [x] Add an `async redirects()` export to `next.config.js` alongside existing rewrites.
- [x] Define rule mapping `/online-delivery` → `https://whitehorsecb25.touchtakeaway.net/store/2` with `permanent: true` and explanatory comment.

## Validation
- [x] Sanity-check `redirects()` via a quick Node script to ensure the new rule is returned as expected.
- [x] Note manual QA steps for verification phase (Chrome DevTools redirect confirmation: run dev server, open `/online-delivery` in Chrome DevTools MCP, verify 308 response and destination URL).

## Questions/Assumptions
- Assume marketing slug should be permanent; adjust to temporary only if stakeholders request.
