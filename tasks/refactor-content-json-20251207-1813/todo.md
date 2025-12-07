# Implementation Checklist

## Setup
- [x] Create task folder and documentation files.

## Discovery
- [x] Review modular content docs and current manifest/API/hook behavior.
- [x] Inventory module files vs manifest entries; spot gaps (missing per-module overrides, unused pages).

## Design & Manifest
- [x] Rewrite `config/content/manifest.json` with per-module IDs matching filesystem.
- [x] Define env override conventions (module-id filenames) and update files accordingly.

## Composer
- [x] Implement module composer utility (load → merge → validate) in `src/lib/content/`.
- [x] Add script to build `config/content.json` from modules (for legacy consumers).
- [x] Cache composed output per env.

## Integration
- [x] Update `getContentSmart` (and `/api/content`) to use composed modular content behind a feature flag fallback.
- [x] Ensure `/api/content/modules/*` + `/api/content/manifest` align with new manifest structure and handle validation/errors.

## Testing
- [ ] Add unit tests for composer (manifest load, env overrides, ContentSchema validation, array merge strategy). *(composer schema sanity added; still need env override coverage)*
- [ ] Add regression test that composed content satisfies `ContentSchema` and legacy loader returns shape.

## Cleanup
- [x] Regenerate `config/content.json` from modules; annotate as generated to avoid manual edits.
- [ ] Document new workflow in docs (brief README or update modular guide) if needed.
