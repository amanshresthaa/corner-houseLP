# Implementation Plan: Guest Highlights Revamp

## Objective
- Rebuild the Guest Highlights (reviews) section to match the elevated storytelling of other homepage sections, combining a hero trust panel, spotlighted reviews, stats, and a marquee/grid of guest quotes driven entirely from content JSON.

## Success Criteria
- [ ] Section renders even if only minimal review data is provided, but fully leverages hero metadata when available.
- [ ] Layout uses layered gradients/glass cards consistent with updated About/Signature sections (mobile-first, responsive to large screens).
- [ ] CTA buttons link to TripAdvisor/Google (from JSON or fallback) with accessible focus handling.
- [ ] Normalization + tests cover new schema fields.

## Architecture
- Extend `NormalizedHomeSections['reviews']` with:
  - `hero`: { `eyebrow`, `title`, `description`, `cta`, `badge`? }
  - `stats[]`: each with `value`, `label`, optional `icon` name.
  - `spotlights[]`: curated quote cards (title, copy, accent).
  - `items[]`: expand with optional `date`, `accent` badge, `highlight` flag.
- Update `buildHomeSections` normalization + types accordingly.
- Update `HomeSectionsRenderer` to pass new props into `HomepageReviewHighlights`.

## UI/UX Strategy
- Section structure:
  1. Hero grid (left column: eyebrow + title + summary + CTA + badges; right column: featured review card with rating + reviewer info + platform chips).
  2. Stats row using DaisyUI `stats` style.
  3. Spotlight row (cards describing Food/Atmosphere/Service) drawn from data.
  4. Auto-scrolling marquee or horizontally scrollable stack for rest of reviews; degrade to grid on desktop.
- Use gradients + glass backgrounds similar to Signature Dishes. Provide `prefers-reduced-motion` friendly degrade.
- Provide accessible markup (blockquote/figcaption). Ensure CTA uses `Link` for internal, `<a>` for external.

## Data Updates
- Enhance `config/content/pages/home.json -> reviews` with hero metadata (eyebrow/title/description/cta), stats array (value + label), spotlights, and extended review entries (platform, rating, date, highlight flag).
- Provide sample data for at least 5 reviews, one flagged as featured.

## Testing
- Extend `tests/data/homepage/sections.test.ts` to assert new fields normalization (hero cta, stats length, review highlight flag).
- Run targeted Jest + `npm run content:validate`.

## Rollout
- No feature flag; rely on optional fields for backwards compatibility.
- Document manual QA requirement in `verification.md`; request DevTools MCP access if needed.
