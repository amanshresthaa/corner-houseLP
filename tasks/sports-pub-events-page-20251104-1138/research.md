# Research: Sports-Focused Pub Events Page

## Existing Patterns
- No existing UI framework/build pipeline in this repo context; single-file HTML preferred.
- DaisyUI typically requires Tailwind build; CDN full.css exists but embedding full DaisyUI CSS would bloat a single file.

## External Resources
- DaisyUI has a compiled CSS via CDN (e.g., jsdelivr) but not ideal for embedded-only single file.
- Accessible, mobile-first layout patterns for cards and grids.

## Technical Constraints
- Single-file HTML with embedded CSS required.
- No build tools (Tailwind, PostCSS) available.
- Keep content evergreen (no specific dates/times).

## Recommendations
- Implement semantic HTML with embedded, lightweight CSS; emulate DaisyUI-like tokens (rounded, shadows, badges) without including full DaisyUI.
- Use CSS variables for colors, spacing, and consistent section padding.
- Ensure responsive grid (3→2→1) and two-column layout responsiveness.
- Include basic a11y: headings, landmarks, focus styles, aria labels.

## Open Questions
- None blocking; all content is static/evergreen by requirement.
