# Research: Stabilize Builds Without Supabase Env Vars

## Existing Patterns
- `middleware.ts` already guards Supabase session fetching behind env checks, but it statically imports `@supabase/auth-helpers-nextjs` (Edge-incompatible) and invokes `createMiddlewareClient`, which throws when env variables are missing.
- API routes rely on `ContentSmartLoader` / `RestaurantSmartLoader` to pull JSON from the filesystem with optional remote fetch; no other Supabase dependencies appear in app or lib code.
- Environment helpers in `src/lib/data/env.ts` centralize environment resolution, suggesting a preference for graceful fallbacks when configuration is missing.
- Manifest generation in `app/manifest.ts` pulls color tokens from `theme/colors` to keep brand styling consistent.

## External Resources
- [Supabase Auth Helpers Edge incompatibility](https://supabase.com/docs/guides/auth/server-side/nextjs#edge-runtimes) – middleware runs on the Edge runtime and cannot use Node-only Supabase helpers.
- [Web App Manifest `purpose` spec](https://developer.mozilla.org/docs/Web/Manifest/icons#purpose) – valid values are `any`, `maskable`, `monochrome`, `badge`; multiple purposes require either an array of icons or space-separated values but TypeScript types often restrict to union members.
- [Next.js Middleware env handling](https://nextjs.org/docs/app/building-your-application/routing/middleware) – middleware should avoid Node-only dependencies and noisy failures during prerender.

## Technical Constraints
- Middleware always executes in the Edge runtime; importing Node-centric Supabase helpers triggers runtime warnings and throws when credentials are absent.
- Build pipeline runs `prebuild` (color generation) before `next build`, so manifest must type-check against latest TypeScript definitions.
- CI likely expects `pnpm run build` to pass without SECRET env vars, so solutions must short-circuit or stub Supabase usage when creds are missing.

## Open Questions
- Do we need Supabase session hydration in middleware at all, or can it be deferred to authenticated routes/components? (Defaulting to no-op unless env + non-edge runtime seems acceptable.)
- Should icons that require both `any` and `maskable` be duplicated to satisfy manifest typing while keeping UX parity?

## Recommendations
- Refactor `middleware.ts` to lazy-import Supabase helpers only when valid env vars exist, and add string sanity checks (exclude `'undefined'`, empty strings). Provide a no-op fallback to prevent runtime errors/warnings on Edge builds.
- Limit Supabase middleware to run only when explicitly opted-in (e.g., via guard function) and log once per process when skipped to avoid noisy console output.
- Adjust `app/manifest.ts` to duplicate icon entries for maskable variants instead of casting `'any maskable'`, keeping TypeScript happy while exposing both purposes.
- After refactor, rerun `pnpm run build` to confirm no prerender failures and ensure manifest still serves both standard and maskable icons.
