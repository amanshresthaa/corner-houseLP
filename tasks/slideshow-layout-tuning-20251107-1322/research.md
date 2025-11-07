# Research: Slideshow Layout & Typography

## Existing Implementation
- The homepage slideshow renders through `components/slideshow/DaisyUISlideshow.tsx`, which wraps each slide in a `.carousel-item` overlay with absolutely positioned background imagery.
- Content block uses `flex-col items-center text-center text-white` but the parent wrapper has only padding (`px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.75rem,7vw,5.75rem)]`), so vertical alignment depends on padding rather than full-height centering.
- Minimum height is not enforced per slide; shorter copy clusters near the top, longer copy can overflow bottom padding.
- Typography relies on semantic helpers (`.eyebrow`, `.h1`, `.lead`) defined in `app/globals.css`; these map to Tailwind tokens (e.g., `text-fluid-h1`) but do not adapt to extremely short/long copy per slide beyond a limited clamp range.
- Badges and CTAs already use responsive spacing via `clamp()` but the main text stack does not scale its gaps or type ramp once slide copy changes length.

## Constraints & Patterns
- DaisyUI/Tailwind present in codebase; prior components use `clamp()` utilities (e.g., slider padding) to provide fluid spacing.
- Accessibility requirements: maintain focus styles, text contrast, `aria-live` updates already implemented.
- Need to avoid regressions in slideshow sizing across viewports (phones, tablets, desktops) and preserve CTA layout.

## Opportunities
- Introduce a flex or grid container with `min-h` tied to viewport height (e.g., `min-h-[clamp(32rem,85vh,60rem)]`) so text stays centered top/bottom/left/right inside each slide.
- Apply `justify-center` and `text-balance`/`text-pretty` plus enhanced gap clamps to keep consistent spacing regardless of copy length.
- Define dedicated slideshow typography utility classes (or inline class combos) using `clamp()` to "auto" scale headline, eyebrow, and body copy more aggressively than global defaults.
- Maintain generous padding via `clamp()` so text never hugs edges even when centered.

## External References
- Tailwind fluid typography tokens already configured in `tailwind.config.js` (`fluid-h1`, etc.) – can leverage them or extend for slideshow-specific scale.
- DaisyUI carousel docs stress wrapping slides in `relative flex items-center justify-center` for centered content; adopting similar structure keeps style consistent with library guidance.

## Risks / Considerations
- Increasing `min-h` could push content too tall on very small devices; must use `clamp()` and ensure scroll remains accessible.
- Changing typography tokens globally might impact other components; better to scope adjustments via slideshow-specific classes.
- Need to re-test hero on multiple viewports (mobile/tablet/desktop) via Chrome DevTools per AGENTS instructions.
