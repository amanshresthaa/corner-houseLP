# Implementation Plan: /online-delivery redirect

## Objective
Create a friendly `/online-delivery` path that always redirects visitors to the Touchtakeaway store (`https://whitehorsecb25.touchtakeaway.net/store/2`) so marketing campaigns have a memorable URL while users land on the ordering platform immediately.

## Success Criteria
- [ ] Visiting `/online-delivery` in any environment performs an HTTP redirect to the Touchtakeaway store.
- [ ] The redirect leverages the built-in Next.js config so it works on Vercel/CDN and during local dev without extra middleware.
- [ ] No other routes or rewrites are affected; existing `/takeaway` page continues to render normally.

## Architecture
- Use a top-level `redirects()` definition in `next.config.js`. Next.js matches incoming requests before hitting the route handlers, giving us a reliable 308 response for every hit.
- Keep the rule declarative in config (no middleware/app route) to minimize runtime overhead and ensure caching.

## Component Breakdown
- `next.config.js`: add `async redirects()` export right next to the existing `rewrites()` definition and include the new rule.

## Data Flow
1. Browser requests `/online-delivery`.
2. Next.js applies redirect rule, issuing a 308 to `https://whitehorsecb25.touchtakeaway.net/store/2`.
3. Browser follows redirect; no React components render.

## API Contracts
- N/A (pure redirect).

## UI/UX Considerations
- Users should see minimal latency because the redirect is handled at the edge. Since it leaves the site, ensure rule uses permanent redirect to help search engines understand the canonical destination.

## Testing Strategy
- Manual: start dev server or rely on Next CLI `next dev` expectation. For this task we will simulate by running `node -e` using Next config? (Not necessary). Instead, add unit-style verification by running `npx next lint`? (Not needed). We'll validate by running `npx next config`? Actually we can run `node -e` to require config to ensure shape? We'll rely on reasoning and optionally run `node -e` to load config and log `redirects()` output.
- Automation: none required due to config-level change, but we can run `node -e "require('./next.config.js').redirects().then(console.log)"` to confirm structure.

## Edge Cases
- Query strings: Next redirect preserves them automatically; no extra config needed.
- Trailing slash: Next matches `/online-delivery` exactly. If we also want `/online-delivery/`, we can add `has` or regex, but requirement only names base path; Next automatically handles with and without trailing slash when `trailingSlash` not set. If QA finds issue, we can add `source: '/online-delivery/:path*'` -> but for now simple path.

## Rollout Plan
- Merge change; no feature flag needed. Because redirect lives in config, deployment to production automatically activates it. No data migrations.
