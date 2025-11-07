# Implementation Checklist

## Prep
- [x] Add slideshow-specific typography classes to `app/globals.css` (eyebrow/headline/body).

## Component Updates
- [x] Center slide overlay wrapper in `components/slideshow/DaisyUISlideshow.tsx` with flex layout, min-height clamp, and balanced padding.
- [x] Swap existing typography classes for the new utilities; adjust spacing/gaps so content adapts to text length.
- [x] Ensure CTAs/badges remain aligned within the new centered stack.

## Verification
- [x] View `/` slideshow via Chrome DevTools MCP on mobile/tablet/desktop, confirm centering + fluid type.
- [x] Capture findings in `verification.md`.
