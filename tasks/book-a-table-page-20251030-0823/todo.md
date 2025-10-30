# Implementation Checklist

## Setup

- [x] Extract booking form logic into reusable component skeleton
- [x] Identify all files/tests referencing the legacy Togo URL

## Core Functionality

- [x] Refactor `BookingModal` to consume the shared form component
- [x] Build the new `/book-a-table` page with hero, form, and supporting info
- [x] Replace legacy Togo links with `/book-a-table` across configs, components, and content

## UI/UX

- [x] Ensure booking form/page follow DaisyUI + accessibility patterns (focus, labels, reduced motion)
- [x] Verify sticky FAB + CTA buttons navigate internally without regressions

## Testing

- [x] Update Jest + Playwright specs to reflect new booking URL and behaviours
- [x] Run targeted test suite and record results

## Questions/Blockers

- None noted yet (will document if discovered)
