# Implementation Plan: Content Centralization Fix

## Objective

Resolve `/api/content` 500 errors by ensuring schema-valid content loading and fix cache stale-read errors. Keep content fully centralized in `config/content.json`.

## Success Criteria

- [ ] `/api/content` responds 200 with standardized payload
- [ ] No `Schema validation failed` logs for content
- [ ] No `loader is not a function` cache warnings
- [ ] Key pages render without content-related errors

## Architecture

- Reuse canonical filesystem loader `getContentData(env)` inside `ContentSmartLoader` to ensure consistent env-merge + parsing.
- Patch `BaseSmartLoader.tryLoadStaleFromCache` to pass a no-op loader function to `PerformanceCacheManager.get`.

## Implementation Steps

1. Patch stale cache loader to use no-op function
2. Switch `ContentSmartLoader.loadFromFilesystem` to use `getContentData(env)`
3. Validate content via script and spot-check pages
4. Manual QA in browser (DevTools)

## Edge Cases

- If content parsing still fails, add defensive logging around parse to capture keys; fallback will continue to file loader.

## Testing

- Run `npm run content:validate`
- Exercise `/api/content` and key routes (home, about, menu, events)

## Rollout

- No feature flags needed; patch is backward compatible.
