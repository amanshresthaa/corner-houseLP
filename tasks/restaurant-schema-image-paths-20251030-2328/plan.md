# Implementation Plan: Restaurant Schema Image Paths

## Objective
Ensure the restaurant schema JSON-LD uses resolvable image imports so the Next.js production build succeeds.

## Success Criteria
- [ ] `pnpm run build` completes without module resolution errors.
- [ ] Structured data emitted by `RestaurantSchema` continues to include the intended images.

## Architecture
### Components
- `components/seo/RestaurantSchema.tsx`: adjust image import paths to match existing assets.

### State Management
No state changes required; the component remains stateless aside from effect hook.

### Data Flow
- Imported image asset URLs flow into the `image` array for the JSON-LD payload. Updating the imports ensures the `img...src` values remain valid.

### API Contracts
None impacted.

## UI/UX Considerations
No visual changes expected; ensure that the client bundle still references accessible image URLs.

## Testing Strategy
- Run `pnpm run build` to validate module resolution and ensure the build output succeeds.

## Edge Cases
- Confirm the selected filenames exist in `src/assets/images/components/Slideshow/...` and correspond to the `.jpeg`/`.jpg` variants already in use.

## Rollout Plan
- Standard merge and deployment flow once build passes.
