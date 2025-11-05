# Implementation Plan: Fix Optional Supabase Import in Middleware

## Objective

Resolve Vercel build failure by preventing the bundler from resolving an optional Supabase helper package used in `middleware.ts` while preserving runtime behavior and graceful degradation.

## Success Criteria

- [ ] `next build` completes without module-not-found errors.
- [ ] Middleware still functions and skips Supabase on Edge or when env vars are missing.
- [ ] No regressions in API/page routing behavior.

## Architecture

### Approach

- Decouple type imports from the optional package by introducing a minimal local type.
- Use a non-literal dynamic import specifier to avoid bundler resolution.
- Retain existing env/runtime checks to prevent execution where unsupported.

### Components/Files

- `middleware.ts`: Adjust types and dynamic import specifier.

## Data Flow

- Request enters middleware → CDN middleware runs → Optional Supabase session fetch runs only in Node runtime when env is present → Security/CORS headers applied → Response continues.

## Testing Strategy

- Local `npm run build` must succeed.
- Basic `npm run dev` smoke test for the home page and a sample API route.
- Console check via DevTools for errors.

## Edge Cases

- Missing env vars: Supabase block must be skipped and log once.
- Edge runtime: Supabase block must be skipped.
- Package absent: Build must not fail (no bundler resolution of optional dep).

## Rollout Plan

- Patch, build locally, then redeploy to Vercel.

## Implementation Steps

1. Replace type-only import with a local minimal type.
2. Change dynamic import to a computed specifier.
3. Run local build to confirm.
4. Add verification report and proceed to deploy.

