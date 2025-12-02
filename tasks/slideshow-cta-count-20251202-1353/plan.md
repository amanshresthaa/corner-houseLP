# Implementation Plan: slideshow CTA count

## Objective
Report the number of CTA buttons rendered by the homepage slideshow using current code and content configuration.

## Success Criteria
- Answer states CTA count per slide and per rendered session.
- References the source of truth (CTA logic + content data) to justify the count.
- Notes any conditions that could change the count (e.g., missing CTA URLs, session size).

## Approach
1. Review slideshow content source (`config/content.json`) to see CTA fields and global links.
2. Inspect slideshow rendering logic (`components/slideshow/DaisyUISlideshow.tsx`) to understand how many CTAs are produced per slide.
3. Combine findings to compute CTA counts (per slide and per session given default session size).
4. Summarize findings for the user.

## Testing Strategy
- No code changes; rely on static analysis of configuration and component logic. If code changes were made, UI verification via DevTools would be required.

## Edge Considerations
- CTA count would drop to 1 per slide only if all secondary hrefs were absent (e.g., no call/book/menu URLs) despite takeaway fallback; current content prevents this.
- Session size determines how many slides (and thus CTAs) appear in a single render cycle.
