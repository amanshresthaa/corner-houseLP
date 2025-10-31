# Implementation Plan: Menu Section Theme

## Objective
Align the “Need Dietary Information?” block on the menu page with the intended light → dark → light section rhythm while maintaining accessibility and existing interactions.

## Success Criteria
- [ ] Section wrapper uses a dark brand/stout background and contrasts with adjacent light sections.
- [ ] Headline, copy, badges, and CTA achieve minimum WCAG AA contrast against the dark surface.
- [ ] Button focus rings, hover states, and touch targets remain visible and consistent.
- [ ] Layout spacing, motion wrappers, and responsive alignment stay unchanged.

## Architecture
### Components
- `app/menu/page.tsx`: adjust the dietary information section styling in-place; no new components introduced.

### State Management
- No state or data flow changes required; render-only styling updates.

### Data Flow
- Unchanged—section continues consuming static copy from `menuContent`.

### API Contracts
- None; no network or props interfaces modified.

### UI/UX Considerations
- Ensure text colors shift to light neutrals (`text-neutral-100`/`text-white`) on the dark surface.
- Update pill badges to translucent light chips so they are legible and still feel clickable.
- Adjust CTA focus ring offset to reference the dark background token instead of white.
- Respect existing padding (`py-20 sm:py-24`) and center alignment to avoid layout drift.

### Testing Strategy
- Manual visual QA in Chrome DevTools (device toolbar for mobile/tablet/desktop, console checks).
- Contrast spot-check with DevTools color picker eyedropper.
- No automated test updates anticipated; styles only.

### Edge Cases
- Small screens: ensure badges wrap and maintain contrast.
- Reduced motion: confirm `FadeIn` still functions (class-only change should be safe).
- High contrast modes: verify button ring offset contrast.

### Rollout Plan
- Standard deployment; no feature flag required.

## Implementation Steps
1. Update the section wrapper classes to use a dark background (`bg-brand-900` or similar) and set base text color to light neutral.
2. Adjust heading, paragraph, and CTA link text classes to ensure readability on dark background.
3. Tweak CTA button ring offset/background so focus styles harmonize with the new dark wrapper.
4. Restyle the informational pills to semi-transparent light chips suited for dark surfaces.
5. Run manual QA via Chrome DevTools to confirm visual cadence and accessibility.
