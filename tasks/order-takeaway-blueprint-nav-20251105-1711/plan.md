# Implementation Plan: Blueprint “Order Takeaway” Nav

## Objective

Style the “Order Takeaway” nav item to resemble a compact blueprint tag with a subtle grid, white label text, corner marks, and a small top‑right note reading “free delivery”.

## Success Criteria

- [ ] Desktop and mobile render consistently with DaisyUI `btn` base
- [ ] Focus ring visible and accessible
- [ ] Hit target ≥44px on mobile
- [ ] “free delivery” note visible ≥360px width; hides gracefully if too narrow

## Architecture

- CSS: Add `.blueprint-btn` and `.blueprint-corner-note` utilities to `app/globals.css` using layered gradients (grid) and pseudo‑elements (corner ticks).
- React: In `components/restaurant/NavbarParts.tsx`, detect the Order Takeaway link and render the special markup for that single item; others remain unchanged.
- Data: No schema changes; keep `public/data/nav.json` as is.

## Components

- `NavLinks` (existing): extend rendering branch for the special item.

## Data Flow

- Links load via `useNavContent()` -> `NavLinks` -> conditional render.

## UI/UX Considerations

- Mobile-first sizing (`text-sm` base); responsive `sm:text-base`.
- Corner ticks only on non-reduced-motion? Visual only, no animation.
- Note positioned absolutely inside button (top-right). Hidden with `aria-hidden` and `sr-only` alt text for assistive tech.

## Testing Strategy

- Manual: Chrome DevTools on localhost, check focus, hover, reduced motion, and small viewports (375px).
- Console: Ensure no hydration/React warnings.

## Edge Cases

- Very narrow phones: hide the note via `hidden xs:block` breakpoint utility.
- External link behavior: ensure `Link` handles external URL correctly (existing `debugLink` wrapper).

## Rollout

- Safe: CSS + conditional render behind label match; no feature flag needed.

