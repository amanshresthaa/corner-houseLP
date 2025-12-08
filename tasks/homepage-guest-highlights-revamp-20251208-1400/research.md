# Research: Guest Highlights Revamp

## Existing Patterns
- `components/homepage/HomepageReviewHighlights.tsx` currently renders a centered heading, static grid of up to six quotes, and a CTA row linking to TripAdvisor/Google — aesthetic is fairly flat (white cards on neutral background) compared to the new About/Signature sections.
- Source data lives at `config/content/pages/home.json -> reviews` (title/subtitle/items). Items support `quote`, `source`, `platform`, `rating` but no hero/badge metadata.
- `src/lib/homepage/sections.ts` normalizes the reviews block by simply copying title/subtitle/items without extra typing. Tests in `tests/data/homepage/sections.test.ts` only assert presence of items.
- `components/restaurant/TestimonialsSection.tsx` demonstrates a richer storytelling approach: hero stats, review platform badges, marquee slider, and quote cards — good inspiration for layering.

## References
- TestimonialsSection (above) for hero metrics, slider, badges.
- DaisyUI components: `carousel`, `stack`, `timeline`, `stats`, `badge`, `hero` for building immersive experience consistent with updated homepage sections.

## Constraints
- Must remain data-driven: hero copy + stats + review links should come from JSON, not hard-coded.
- Need to keep review links wired to `getReviewLinks()` (TripAdvisor/Google). Maybe allow overriding CTA text via data but preserve fallback (from config or brand constants).
- Ensure accessibility: quotes remain blockquote/figcaption, slider elements keyboard accessible, focus states for CTA buttons.
- Section should still gracefully handle limited review entries (<3) or missing hero data.

## Findings
- There’s appetite to highlight aggregate scores (4.5 stars, 800+ reviews) and call out categories (food, service, atmosphere). Current data schema lacks these fields, so extend with `stats[]` (label/value/icon) and `heroCta` metadata.
- Layout opportunity: hero column with eyebrow + headline + summary + CTA + trust badges, side column with featured review stack; follow with auto-scroll grid/marquee for remaining quotes.
- Could add `spotlights[]` to highlight specific review categories (Food, Atmosphere) with copy from JSON.

## Open Questions
- Do we surface numeric ratings per platform? We can add optional fields in content: `platformScores` or `stats` (value/label/icon) to avoid hard-coded numbers.
- Should we include review dates? Items currently only have `quote`, `source`, `platform`, `rating`; we might add `date` or `badge`. For now maybe add `date` optional.
