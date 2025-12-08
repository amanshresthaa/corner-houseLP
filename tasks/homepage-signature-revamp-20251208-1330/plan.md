# Implementation Plan: Signature Dishes Revamp

## Objective
- Transform the Signature Nepalese Dishes section into a hero-worthy highlight reel that showcases chef stories, tasting notes, and key dishes in a visually striking, immersive layout.

## Success Criteria
- [ ] Section features a bold hero headline + chef quote + CTA.
- [ ] Dishes are grouped into spotlight + gallery cards with ingredient badges and description overlays (works on mobile + desktop).
- [ ] Optional metadata (tags, spice level, price) is consumed from content JSON; component gracefully handles missing data.
- [ ] Tests + content validation cover the new schema additions.

## Architecture & Components
- Extend `sections.signatureDishes` schema to include:
  - `hero`: { `eyebrow`, `title`, `description`, `quote`, `quoteBy`, `cta` }
  - `items[]`: add `tags`, `spiceLevel`, `price`, `featured`, `callout` fields.
- Update `buildHomeSections` normalization to pass through new dish metadata (maybe share typed interface with component).
- Rebuild `HomepageSignatureDishes` to include sub-sections:
  1. Hero block (eyebrow, headline, description, CTA chip, chef quote card).
  2. Featured dish spotlight (for `featured: true`) with large photo + badges.
  3. Grid/slider for remaining dishes with ingredient tags, price, and quick description.
  4. Optional tags filter chips (non-interactive for now; just decorative) to reinforce highlights.

## UI/UX Strategy
- Use layered gradients (brand crimson + accent) with glassmorphism cards to make section “extremely highlighting”.
- Mobile-first: hero text stacked, featured card as scroll-snap, dish list as horizontal scroll with snap points.
- Desktop: two-column hero (copy left, featured dish right) followed by a 3-column grid for rest.
- Use DaisyUI `badge`, `chip`, `btn-glass`, and timeline/pill styles for tags.
- Add subtle animations (scale/tilt) respecting prefers-reduced-motion.

## Data Updates
- Update `config/content/pages/home.json` signature section with hero metadata, one featured dish flagged, and extra fields per dish (tags/spice/price/callout).
- Ensure fallback text exists for missing data, so component still renders when tags not supplied.

## Testing
- Extend `tests/data/homepage/sections.test.ts` to ensure new dish metadata is normalized.
- Run `npm run test -- --selectProjects=server --testPathPattern=tests/data/homepage/sections.test.ts` and `npm run content:validate`.
- Manual QA via Chrome DevTools (pending access) for layout + accessibility.

## Rollout Considerations
- No feature flag required; rely on optional fields for backward compatibility.
- Document schema expectations within JSON file / commit description.
