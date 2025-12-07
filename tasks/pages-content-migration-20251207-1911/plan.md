# Implementation Plan: Pages Content Migration to Corner House

## Objective
Rebrand the Home, About, Contact, and Events content JSON to The Corner House (Cambridge), reflecting its sports-pub + Nepalese kitchen identity, location, and amenities while preserving schema structure and routes.

## Success Criteria
- [ ] Home hero, features, quick links, CTA, and SEO reference Corner House (name, phone, address, ratings, geo, cuisine) with consistent messaging.
- [ ] About page hero, story, timeline, and CTA updated to Cambridge location and history (1930s origins, CAMRA 2020, Lapen Inns 2024 Nepalese relaunch).
- [ ] Contact page SEO, phone, address, and feature list match Corner House; hours note remains dynamic.
- [ ] Events page highlights matchdays/HD sports, quiz/open-mic cadence, cabins/garden use, with updated CTA labels.
- [ ] JSON remains valid and compatible with existing loaders (no key removals/renames beyond content values).

## Approach
1) Rewrite textual content using CornerHouse1/2 facts; keep existing section shapes.
2) Update phone numbers/links to +44 1223 921122 and `/book-a-table`/`/menu` paths; maintain call-to-book options.
3) Refresh SEO schema blocks (WebSite & Restaurant) with new name, URL, address, geo, phone, ratings, and cuisine tags.
4) Validate JSON with `python3 -m json.tool`.

## Edge Cases & Notes
- Domain assumed `https://thecornerhousepub.co/`; replace if a different canonical is provided.
- Image paths currently point to White Horse assets; leaving paths intact to avoid broken references, but alt text will describe Corner House context.
- Parking is limited; avoid promising ample free parking.

## Testing
- JSON validation via `python3 -m json.tool` on each updated file.
- (Later) Manual UI smoke and DevTools QA after content swap.
