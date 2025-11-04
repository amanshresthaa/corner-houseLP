# Implementation Plan: White Horse Branding Update

## Objective
Replace Old Crown branding with White Horse across navbar and stray references. Use provided 500x500 logo and organize images.

## Success Criteria
- Navbar shows White Horse name and new logo.
- No visible 'Old Crown' references in codebase.
- Logo stored under public/images/brand.

## Architecture
- Update static imports and config content; no structural changes.

## Implementation Steps
1. Move logo to brand folder and update imports.
2. Replace 'oldcrown' references in configs and tests.
3. Adjust manifest related_applications id.
4. Verify via dev server snapshot and DevTools.

## Edge Cases
- Case-sensitive imports on some systems.
- Cached assets; use new filename to bust cache.

## Testing
- Run e2e and lint as needed.
