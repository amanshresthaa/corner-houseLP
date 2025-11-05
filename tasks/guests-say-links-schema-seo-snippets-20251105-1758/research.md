# Research: What Guests Say – Links & SEO

## Existing Patterns
- Found  rendering the main testimonials section with Google/TripAdvisor badges and links.
-  renders a compact highlights grid but without outbound links.
-  injects Restaurant JSON-LD site-wide using internal data and testimonials.

## External Resources
- TripAdvisor profile: TBD exact URL, use establishment listing page.
- Google Maps profile: use Place URL for The White Horse, Waterbeach with address.

## Technical Constraints
- Next.js app; components are client components using Tailwind/DaisyUI-like classes.
- Structured data already injected; avoid duplicate conflicting JSON-LD types.

## Recommendations
- Update  platform links to point to profile pages (TripAdvisor listing + Google Maps place).
- Add SEO-friendly review snippets (summary bullets) above or within the testimonials section.
- Augment   with Google Maps and TripAdvisor profile URLs.
- Do not inject an additional hard-coded JSON-LD block to avoid duplication; rely on existing schema injector.
