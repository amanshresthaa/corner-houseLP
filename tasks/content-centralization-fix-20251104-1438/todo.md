# Implementation Checklist

## Patches

- [x] Fix stale cache loader (no-op loader function)
- [x] Reuse `getContentData(env)` in `ContentSmartLoader`

## Validation

- [x] Run `npm run content:validate`
- [ ] Verify `/api/content` returns 200 locally
- [ ] Sanity-check home/about/menu/events pages

## Notes/Assumptions

- Env remains `app` for local; no CMS endpoint used.
- Content lives in `config/content.json` with required sections.
