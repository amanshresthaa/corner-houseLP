# Implementation Plan: Booking Tips Dark Background

## Objective

Ensure the Booking Tips section looks correct on dark backgrounds, with accessible contrast and theme-aware styles, without altering surrounding layout.

## Success Criteria

- [ ] Wrapper uses a dark-appropriate background in dark theme
- [ ] Text and icons meet contrast (AA) in dark theme
- [ ] Light theme visuals remain unchanged
- [ ] Verified via Chrome DevTools MCP in dark+light

## Architecture

- Keep in-page section structure. Add Tailwind `dark:` variants to wrapper, heading, list, list items, and icons.

## Implementation Steps

1. Add dark variants to wrapper (`border`, `bg`)
2. Adjust heading color for dark
3. Adjust list text color for dark
4. Adjust list item bg and subtle border in dark
5. Adjust icon tint in dark
6. Run dev server and verify with DevTools

## Edge Cases

- User agents forcing dark mode via OS preference
- DaisyUI theme toggled via `data-theme` attribute

## Testing Strategy

- Manual QA with Chrome DevTools: switch dark/light, check contrast and readability
- Console check for warnings/errors

## Rollout

- Small, additive change; ship with normal deploy cadence

