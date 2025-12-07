# Research: Core Content Migration to Corner House

## Existing Patterns
- Core content stored in JSON under `config/content/core/*.json` with manifest in `config/content/manifest.json`; modules use `mountPath` keys for runtime composition.
- `global.json` currently holds White Horse identity (name, title, description, keywords, branding tagline/slogan, nav links, footer, social, CTA links).
- `ui.json` provides reusable labels/buttons/messages/placeholders across pages; mostly venue-agnostic but includes order/delivery buttons.
- `accessibility.json` defines aria labels and alt texts that reference the White Horse brand and thatched pub imagery.
- `forms.json` standardizes validation strings and labels for booking/contact forms.
- Manifest marks core modules as `loadStrategy: always` with 30m cache and dependencies (ui/accessibility depend on global). Forms are conditional via `hasFormsOnPage`.

## External Resources
- CornerHouse1.md: detailed brand story, contact info (phone +44 1223 921122, emails), address (231 Newmarket Road, Cambridge CB5 8JE), hours (kitchen split weekdays, continuous Sat/Sun; bar to 23:00 Fri/Sat), amenities (HD sports, heated cabins, beer garden), awards (TripAdvisor Travelers' Choice 2025, CAMRA 2020, 5★ hygiene 2025), delivery partners (Uber Eats, Deliveroo, Just Eat), booking guidance (call/email, online booking), reviews/testimonials, accessibility notes.
- CornerHouse2.md: positioning as “Desi Pub” hybrid; tagline “Cambridge’s go-to sports pub with Nepalese plates and cosy snugs”; group context (Lapen Inns, sustainability badge), zoning (front bar, dining wing, snugs, heated cabins), differentiators (HD screens, projector, goat curry, momos, Sunday roast, gluten-free/vegan options), transport (bus Citi 3/PR2, near Abbey Stadium/retail park), collection-first preference, FAQ drafts.

## Technical Constraints / Dependencies
- Must retain manifest structure (version, module keys, mount paths, cache durations) unless change required; other modules rely on these IDs.
- Navigation URLs currently White Horse-specific (Waterbeach URLs and “nabatable” booking link); need Corner House equivalents or neutral placeholders.
- Accessibility alt text/logo references must switch to Corner House imagery; ensure default text remains descriptive and semantic.
- Cache and load strategies likely shared with environments; avoid breaking `hasFormsOnPage` condition.

## Open Questions
- Final online booking URL for Corner House? (Not in provided docs; may need temporary placeholder or keep call-to-book emphasis.)
- Preferred delivery CTA: promote call & collect vs. third-party apps? CornerHouse2 suggests collection-first but CornerHouse1 lists UberEats/Deliveroo/JustEat availability.
- Social media links for Corner House not provided; may need to omit or use placeholder until confirmed.

## Recommendations
- Rebrand `global.json` to Corner House Cambridge: update `site` identity (name, title, description, keywords, tagline) reflecting sports pub + Nepalese kitchen + Cambridge location.
- Refresh navigation labels if relevant (e.g., keep existing pages but ensure “Order Online”/“Book a Table” align with available channels; include “Sports” or “Cabins” only if pages exist—avoid adding routes without pages).
- Update footer copyright to Corner House Cambridge and adjust social link to placeholder/omit until real link available.
- Update accessibility alt texts to describe Corner House logo and art-deco pub exterior with heated cabins/garden.
- Adjust forms/messages minimally (venue-agnostic) but ensure success message still appropriate; keep validation wording.
- In manifest, update description and lastUpdated timestamp to today; keep module map but align description to Corner House migration (no load-strategy changes).
