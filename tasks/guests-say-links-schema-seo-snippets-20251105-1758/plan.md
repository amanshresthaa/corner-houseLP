# Implementation Plan: What Guests Say – Links & SEO

## Objective
Update the testimonials section to link to Google and TripAdvisor profiles and surface SEO-friendly review snippets without adding duplicate schema.

## Success Criteria
- Google badge links to the Google Maps profile for The White Horse (Waterbeach).
- TripAdvisor badge links to the White Horse TripAdvisor listing page.
- Section includes concise, SEO-friendly snippets incorporating key phrases.
-  includes both profile URLs.

## Architecture
- Modify  to replace hrefs and render a snippets block.
- Update  to extend .

## Implementation Steps
1. Determine profile URLs and update anchors.
2. Insert an optional SEO