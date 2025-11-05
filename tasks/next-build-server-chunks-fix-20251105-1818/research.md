# Research: Next build fails with missing server chunk (Cannot find module './1682.js')

## Symptoms
- `next build` fails during “Collecting page data” with:
  - `Cannot find module './1682.js'` from `.next/server/webpack-runtime.js` while loading `pages/_document.js`.
- Warning: `middleware.ts` critical dependency about dynamic request (not fatal).

## Findings
- Built server chunks are present under `.next/server/chunks/` (e.g., `1682.js`).
- Server runtime (`.next/server/webpack-runtime.js`) uses require chunk loader:
  - `require("./" + __webpack_require__.u(chunkId))` where `__webpack_require__.u = chunkId => "" + chunkId + ".js"`.
  - This makes it look for `./1682.js` in `.next/server/` root, not in `./chunks/`.
- Therefore, runtime is misconfigured to resolve chunk files without the `chunks/` prefix, causing the module not found error even though the file exists under `chunks/`.

## Probable root cause
- Webpack `output.chunkFilename` for the server build is being set to `[id].js` instead of `chunks/[id].js`.
- Our `next.config.js` custom webpack config doesn’t explicitly change server `output`, but the generated runtime demonstrates the wrong template. Explicitly setting `config.output.chunkFilename = 'chunks/[id].js'` for server prod builds should correct `__webpack_require__.u` and the require path.

## Related context reviewed
- `next.config.js` has client-only `splitChunks` tuning (safe).
- No custom `devtool` set; the runtime shows `eval-source-map` banner but that’s incidental and not the primary failure.

## Recommendation
- Set `config.output.chunkFilename = 'chunks/[id].js'` (and optionally `hotUpdateChunkFilename`) in server, non-dev builds within `webpack()` in `next.config.js`.
- Clean `.next/` and rebuild to verify.

