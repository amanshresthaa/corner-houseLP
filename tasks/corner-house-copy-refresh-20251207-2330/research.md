# Research: Corner House Copy Refresh

## Source Material Consulted
- `CornerHouse1.md`: Comprehensive profile covering identity, tagline, history (1930s Art-Deco building replacing the Butchers Arms), Nepalese kitchen under Nepali chefs, sports pub positioning, facilities (HD screens, heated cabins, fireplaces), contact info, hours, amenities, reviews, awards.
- `CornerHouse2.md`: Brand/operational audit detailing hybrid "Desi pub" proposition, Lapen Inns portfolio context, demand drivers (Abbey Stadium, retail parks, Abbey neighborhood), accessibility insights, culinary strategy (dual menu, hero dishes), service zoning, and digital sentiment.

## Key Story Pillars to Reflect in Copy
1. **Identity & Tagline**
   - Official name: The Corner House Cambridge.
   - Tagline: "Cambridge’s go-to sports pub with Nepalese plates and cosy snugs."
   - Ownership: Part of Lapen Inns Hospitality (multi-pub group rescuing locals, emphasising "Keeping the Local Alive").

2. **Heritage & Location**
   - Built in the 1930s Art-Deco style (former Butchers Arms site) on Newmarket Road, near Cambridge Retail Park and Abbey Stadium.
   - CAMRA "Most Improved City Pub" (2020); TripAdvisor Travelers’ Choice 2025; 5★ Food Hygiene (Feb 2025).
   - Acts as both community hub and destination restaurant with heated cabins and fireplaces.

3. **Experience & Facilities**
   - Dual-zoned layout: lively HD-sport front bar + quieter dining wing + heated garden cabins.
   - Features: shuffleboard, log fires, beer garden, free WiFi, family- and dog-friendly, accessible ramp entrance + accessible restroom.

4. **Cuisine & Menu Highlights**
   - Nepali chefs delivering goat curry (Khasi Ko Masu), Himali Lamb, Chicken Rum Rum, momos, mixed grill platters.
   - Pub staples remain (fish & chips, gourmet burgers, Sunday roasts) to appeal to mixed groups.
   - Takeaway & third-party delivery (Uber Eats/Deliveroo/Just Eat) plus call-and-collect.

5. **Reviews & Social Proof**
   - Google 4.4★ (800+ reviews), TripAdvisor 4.6★ (#6 nightlife Cambridge), Facebook 4.3★.
   - Testimonials emphasize: welcoming service, Nepalese flavours paired with pints, match-day energy, generous portions, value.

6. **Audience Segments**
   - Sports fans (matchday packages, outdoor projector, HD screens) – especially Cambridge United matches.
   - Families and hotel guests (Premier Inn/Travelodge nearby) seeking cosy meals.
   - Foodies wanting authentic Nepalese dishes without leaving Newmarket Road corridor.
   - Groups needing private dining or heated cabins.

## Observations for Update Scope
- `rg "White Horse"` still returns occurrences across `app/`, `components/`, `config/content`, `lib/`, `tests/`, and markdown docs. Many contexts (hero copy, testimonials, alt texts) require bespoke rewrites referencing the pillars above rather than a naive find/replace.
- Some text should be updated to highlight art-deco heritage, Nepalese kitchen authenticity, sports hub credentials, and awards to keep messaging credible.

## Risks & Constraints
- Ensure new prose stays accurate to sources; avoid inventing amenities not mentioned.
- Maintain accessibility and UX context (aria labels, alt text) when updating copy.
- Keep tests/mocks aligned with new naming to avoid failing assertions.

## Next Steps
1. Enumerate remaining `White Horse` occurrences and categorise by content type.
2. Draft context-specific replacement text referencing research pillars.
3. Update components/content/test fixtures systematically.
4. Re-run lint/tests where feasible and document inherited failures.
