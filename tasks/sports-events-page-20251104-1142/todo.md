# Implementation Checklist

## Setup

- [x] Create task directory and docs
- [x] Replace `/events` with sports-focused structure

## Core Sections

- [x] Add Hero section with gradient + decorative emojis
- [x] Add Live Sports banner with pulsing LIVE and chips
- [x] Build 6-card Regular Events grid (responsive 3→2→1)
- [x] Implement Match Day Experience (2-col → 1-col)
- [x] Add Weekly Calendar (7 stacked cards; Sat/Sun highlighted)
- [x] Add Private Events CTA with two buttons

## UI/UX & A11y

- [x] Ensure mobile-first responsiveness
- [x] Ensure focus-visible rings and ARIA labels
- [x] Use DaisyUI components where suitable

## Testing

- [x] Manual QA via Chrome DevTools MCP
- [ ] Console clean, no a11y regressions (dev SW warnings noted)

## Notes/Assumptions

- Events pack asset not available; linking to safe fallback while keeping label.
- All content remains evergreen; no absolute dates.
