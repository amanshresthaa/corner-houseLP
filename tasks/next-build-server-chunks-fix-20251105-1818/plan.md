# Implementation Plan: Fix server chunk path mismatch in Next build

## Objective
Ensure server runtime loads chunks from `.next/server/chunks/` so `next build` completes without module not found errors.

## Success Criteria
- [ ] `pnpm run build` completes successfully
- [ ] No `Cannot find module './*.js'` from `.next/server/webpack-runtime.js`
- [ ] Pages render in a local start (`next start`) sanity check

## Architecture / Approach
- Adjust webpack config for server production build to emit chunk filenames under `chunks/` by setting `config.output.chunkFilename = 'chunks/[id].js'` (and the hot update variant for completeness).
- Do not alter client-side splitting logic.

## Components / Files
- `next.config.js` — minimal server build output tweak.

## Testing Strategy
- Clean `.next/`.
- Run `pnpm run build` and confirm success.
- Optionally run `pnpm start` and hit a few routes to sanity check.

## Edge Cases
- Ensure change only applies to `isServer && !dev` to avoid affecting dev.
- Keep existing client optimization untouched.

## Steps
1. Update `next.config.js` to set server `output.chunkFilename` and `hotUpdateChunkFilename`.
2. Remove `.next/` and rebuild.
3. If still failing, inspect regenerated `webpack-runtime.js` to verify `__webpack_require__.u` returns `"chunks/" + id + ".js"`.

