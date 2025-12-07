# Research: Pages Content Migration (Home, About, Contact, Events)

## Existing Content Patterns
- `config/content/pages/home.json` holds hero, feature list, press ticker, about snippet, signature dishes, reviews, press feature, quick links, CTA, and SEO schemas (WebSite + Restaurant). Currently tailored to The White Horse (Waterbeach) with its address, phone, images, and media links.
- `config/content/pages/about.json` contains SEO, hero, story intro, timeline, and CTA block with address/hours reference — all White Horse-specific.
- `config/content/pages/contact.json` captures SEO metadata, hero, contact info (phone/address), hours note, and a feature list; presently describes Waterbeach, free parking, and outdoor terrace.
- `config/content/pages/events.json` defines SEO, hero badge/title/subtitle/buttons, and regularEvents list (Takeaway Friday, Live Sports, Community Gatherings) referencing White Horse.

## Corner House Facts to Reuse
- Brand/Tagline: “Cambridge’s go-to sports pub with Nepalese plates and cosy snugs.” (CornerHouse2)
- Address: 231 Newmarket Road, Cambridge, CB5 8JE (CornerHouse1)
- Phone/WhatsApp: +44 1223 921122 (CornerHouse1)
- Email: cornerhouse@lapeninns.com (general/bookings); cornerhouse@lapeninns.com for events (CornerHouse1)
- Hours: Kitchen Mon–Fri 12–15 & 17–22, Sat 12–22, Sun 12–21; Bar Mon–Thu/Sun 12–22, Fri–Sat 12–23 (CornerHouse1)
- Key amenities: HD sports screens + outdoor projector; heated garden cabins; covered beer garden; Nepalese + pub classics + Sunday roast; family- & dog-friendly; wheelchair ramp & accessible WC; small on-site parking (free, limited) (CornerHouse1)
- Awards/ratings: Google 4.4 (800+), TripAdvisor 4.6 (Travelers’ Choice 2025), CAMRA “Most Improved City Pub” 2020, 5★ Food Hygiene 2025 (CornerHouse1)
- Delivery/Takeaway: Call & collect; available on Uber Eats, Deliveroo, Just Eat; typical 20–30 min collection; 45–60 min delivery (CornerHouse1)
- Events: Quiz nights, live sports focus, occasional live music/open mic; matchday hub for Abbey Stadium crowd; private cabins for small groups (CornerHouse1/2)
- Coordinates: 52.20948, 0.14335 (CornerHouse1)

## Constraints / Considerations
- Keep existing structure/keys for compatibility with loaders and schema validation.
- Avoid introducing new routes; use existing `/menu`, `/events`, `/about`, `/contact`, `/book-a-table`, `/online-delivery` links.
- Images currently White Horse-specific; keep paths but update alt text and copy; image swap not required now.
- SEO schemas should reflect Corner House name, URL (assumed https://thecornerhousepub.co/), address, telephone, geo, cuisine list, ratings.
- Feature copy must be concise, mobile-friendly, and highlight sports + Nepalese kitchen + cabins.

## Open Questions
- Confirm official website domain and social handles (only inferred booking URL). Using `thecornerhousepub.co` and placeholder-friendly social if needed.
- Exact cadence of events (quiz night day, open mic schedule) not specified; will generalize to regular weekly quiz and live sports focal points.

## Proposed Content Direction
- Home hero: emphasize sports pub + Nepalese kitchen + matchday energy + heated cabins; CTA primary Call/Book, secondary View Menu.
- Features: sports screens/projector, authentic Nepalese kitchen, heated cabins/beer garden, family/dog friendly.
- About story: heritage 1930s art-deco pub, CAMRA award 2020, Lapen Inns takeover 2024, Nepalese kitchen launch; dual identity (pub + Nepalese restaurant).
- Contact: highlight phone/WhatsApp, email, address with landmark (opposite Cambridge Retail Park), note limited parking and bus access; features updated to HD screens, cabins, accessible WC, WiFi.
- Events: matchdays, weekly quiz, live sport every week, occasional live music/open-mic, private cabin bookings; CTA to book for big games and view menu.
