# Research: White Horse Branding Update

## Existing Patterns
- Navbar uses `config.appName` and imports the logo from `public/images/brand/whitehorse-logo.png`.
- Public assets organized under `public/images/brand` and `public/images/white-horse`.
- Some references to 'oldcrown' remain in data configs, manifest, and e2e tests.

## External Resources
- Next.js static image imports from `public`.
- DaisyUI used for styling.

## Technical Constraints
- Next.js 14 app dir; ensure image paths under `public`.
- Keep minimal changes; reuse existing brand folder.

## Recommendations
- Move provided `whitehorse-logo.png` to `public/images/brand/whitehorse-logo.png`.
- Update header to import the new asset.
- Replace 'Old Crown' occurrences across configs/tests/manifest.
- Keep organized image structure under `public/images/brand`.
