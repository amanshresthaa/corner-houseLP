# Research: Content Centralization Fix

## Existing Patterns

- Content is centralized in `config/content.json` and validated via Zod `ContentSchema` in `src/lib/data/schemas.ts`.
- Smart loader pattern is used for API routes via `BaseSmartLoader` and specific loaders like `ContentSmartLoader`.
- Filesystem content loading with environment override merging is implemented in `src/lib/data/loader.ts#getContentData`.
- API routes wrap responses with `StandardizedApiResponseBuilder`.

## External/Adjacent References

- `PerformanceCacheManager` in `src/lib/data/cache.ts` requires a loader function.
- `scripts/validate-content.js` performs basic structural validation but not full Zod checks.

## Observed Issues

- API error: Zod validation fail reported as `fieldErrors.pages: ["Required","Required"]` when calling `/api/content`.
- Cache error: `TypeError: loader is not a function` from `PerformanceCacheManager.get` when attempting stale cache reads in `BaseSmartLoader.tryLoadStaleFromCache`.

## Hypotheses

- The stale cache error is caused by passing `null` instead of a function to `globalCache.get`.
- Content validation may be failing due to `ContentSmartLoader` reading raw file without env merge or due to inconsistent parsing path versus the canonical loader.

## Recommendations

- Fix stale cache read by providing a no-op loader function.
- Reuse `getContentData(env)` from `src/lib/data/loader.ts` inside `ContentSmartLoader.loadFromFilesystem` to ensure consistent env merging and parsing.
- Re-run validation and manual QA after patch.
