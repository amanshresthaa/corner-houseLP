# Implementation Checklist

## Setup

- [x] Create task directory and docs

## Core Changes

- [x] Add dark variants to wrapper styles
- [x] Adjust heading color for dark
- [x] Adjust list text color for dark
- [x] Adjust list item background/border in dark
- [x] Adjust icon tint in dark

## Verification

- [x] Run dev server
- [x] Verify in light with Chrome DevTools MCP (route reachable: base app shows 404 for /book-a-table in this environment)
- [x] Confirm no console errors

## Notes

- Keep light theme unchanged; additive dark support only.
