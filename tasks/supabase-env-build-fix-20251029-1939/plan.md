# Implementation Plan: Stabilize Supabase-Free Builds

## Objective
Ensure production builds and static prerendering succeed when Supabase credentials are absent by hardening middleware handling and fixing manifest typing, without regressing future Supabase support or PWA metadata.

## Success Criteria
- [ ] `pnpm run build` completes locally with no Supabase-related errors or TypeScript failures when env vars are unset.
- [ ] Middleware avoids importing Supabase helpers on Edge runtime and logs at most once when credentials are missing.
- [ ] Web manifest compiles without TypeScript casts while still exposing maskable icons.

## Architecture
- Introduce a middleware helper that (a) validates Supabase env vars beyond simple truthiness, (b) guards against Edge runtime execution, and (c) lazy-loads Supabase helpers only when safe.
- Cache the lazy import result to avoid redundant dynamic imports while keeping the module out of the default bundle when unused.
- Replace `purpose: 'any maskable'` manifest entries with paired `any` and `maskable` icon descriptors constructed programmatically for clarity.

## Component Breakdown
- `middleware.ts`: add helper utilities, switch to dynamic Supabase import, and add single-use logging guard.
- `app/manifest.ts`: refactor icon list builder to emit separate entries for standard vs. maskable icons.

## Data Flow
- Middleware: request/response passes through unchanged; Supabase session fetch happens only when env + runtime allow. No data persisted.
- Manifest: icon metadata remains static JSON served to clients.

## API Contracts
- Middleware still returns `NextResponse`; no changes to headers or status codes.
- Manifest output continues to satisfy `MetadataRoute.Manifest` interface; only icon list structure changes (duplicate entries for maskable assets).

## UI/UX Considerations
- PWA install surfaces identical icons (duplicate descriptors for same file maintain browser support).
- No front-end component changes; no visual regressions expected.

## Testing Strategy
- Manual: run `pnpm run build` without Supabase env vars to confirm absence of prerender errors and type failures.
- Optional: run `pnpm run dev` smoke to ensure middleware skip path does not crash.
- Rely on existing tests for unaffected areas.

## Edge Cases
- Edge runtime detected but env present → skip Supabase gracefully and log once.
- Env strings set to `'undefined'`, `'null'`, or whitespace → treated as missing.
- Dynamic import rejection (package removed) → middleware logs warning and proceeds.

## Rollout Plan
- Local verification via build.
- Document behaviour in task verification file; no feature flags or migrations needed.
