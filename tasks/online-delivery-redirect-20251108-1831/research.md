# Research: /online-delivery redirect

## Existing Patterns
- `next.config.js` already defines `async rewrites()` for path shims (e.g., `/images/dishes/:path* → /images/food/:path*`). There is **no** `redirects()` implementation yet, so adding one would centralize path-level redirects without touching middleware.
- No `app/online-delivery` route exists today (`rg "online-delivery"` returns nothing), so the new path is unused and safe to repurpose as a pure redirect.
- Middleware (`middleware.ts`) runs on most routes but currently only handles Supabase auth, CDN headers, and API concerns; it does not implement marketing redirects, so using `next.config.js` keeps things simple and static-cached.
- External Touchtakeaway links already live in content sources (`config/content.json`, `public/data/nav.json`). Prior work (`tasks/update-delivery-link-20251108-1811`) standardized the `https://whitehorsecb25.touchtakeaway.net/store/2` URL, so reusing that value remains consistent.

## External Resources
- [Next.js Redirects docs](https://nextjs.org/docs/app/api-reference/next-config-js/redirects) — describes how to add permanent/external redirects via `next.config.js` so the framework can serve 308 responses efficiently from the edge/CDN.

## Technical Constraints
- Need the redirect to work for both static export and server rendering; Next config redirects are evaluated at build time and work on Vercel/CDN without extra runtime code.
- Since the destination is an external domain, the redirect rule must set `destination` to the full URL and use `permanent: true` only if we are certain this path will never change (marketing slug implies permanence, but we can still choose 308 for better caching and SEO).
- Ensure `rewrites()` remains unaffected—Next.js allows both `rewrites` and `redirects` simultaneously but they must be separate top-level functions.

## Open Questions
- Should the redirect be permanent (308) or temporary (307)? Requirement “should always trigger” suggests permanence, but there’s no explicit instruction. Defaulting to 308 ensures browsers/search engines update to the external URL.

## Recommendations
- Add an `async redirects()` export to `next.config.js` returning an array with a single rule: `{ source: '/online-delivery', destination: 'https://whitehorsecb25.touchtakeaway.net/store/2', permanent: true }`.
- Document the intent in a code comment so future contributors know to update the rule if the takeaway provider changes again.
- No other files need touching because nav links already reference the Touchtakeaway URL directly; this route just offers a friendly slug for marketing campaigns.
