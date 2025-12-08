# Implementation Plan: Corner House Copy Refresh

## Objective
Replace all lingering "White Horse" references with accurate, section-specific Corner House copy derived exclusively from `CornerHouse1.md` and `CornerHouse2.md`, ensuring each context (hero text, testimonials, metadata, mocks, tests) reflects the venue’s identity, history, and amenities.

## Scope & Strategy
1. **Audit Remaining References**
   - Use `rg` to list all occurrences of "White Horse" (and slug variants) after prior constant work.
   - Categorise by file type: runtime content (JSON, components), UI copy (app pages), data mocks/tests, legacy docs.

2. **Content Buckets & Messaging**
   - **Hero/About/Story Sections**: Highlight art-deco heritage, 1930s roots, Nepalese kitchen, sports hub, awards.
   - **Testimonials & Reviews**: Replace fabricated quotes with ones grounded in provided testimonials (Tony B., Colin S., etc.) or synthesize summaries consistent with doc sentiments.
   - **Navigation/CTA Labels**: Ensure brand-related aria labels and alt text mention Corner House Cambridge; add descriptors referencing cosy snugs, HD sports, heated cabins where appropriate.
   - **Mock/Test Data**: Update names/descriptions/URLs to reflect new domain and narrative to keep tests coherent.

3. **Implementation Steps**
   1. Run `rg "White Horse"` to capture full list; prioritise content that surfaces in UI or metadata first, then tests/docs.
   2. For each major page/component (e.g., `app/about`, `components/homepage`, `components/restaurant/*`), rewrite paragraphs referencing White Horse to Corner House narratives referencing doc facts (location, dishes, events, awards, heated cabins, etc.).
   3. Update testimonials JSON/arrays with new copy derived from actual testimonials listed in doc, ensuring names + sentiments match.
   4. Refresh alt texts and aria labels to reflect new imagery (art-deco frontage, HD sports bar, heated cabins) rather than thatched Waterbeach references.
   5. Adjust config/content JSON entries (if any remain) and metadata strings referencing White Horse to the new doc-based messaging.
   6. Update tests/mocks/fixtures to align with new naming (Corner House Cambridge) so assertions remain valid.

4. **Quality Checks**
   - After replacements, re-run `rg "White Horse"` to confirm elimination (excluding archival docs if intentionally unchanged).
   - Run `npm run lint` (expect prior known failures; ensure no new ones introduced).
   - Document any unavoidable residual references (e.g., historical docs) in verification notes.

## Dependencies & Tools
- Node/Next lint for sanity checks.
- Existing `BRAND` constants for names/domains where structured data is needed.
- Manual QA (DevTools) if UI changes require visual verification.

## Risks & Mitigations
- **Risk**: Overwriting context-specific copy with generic replacements. → Mitigate by referencing doc facts before editing each section.
- **Risk**: Breaking JSON formatting. → Use careful editing and re-validate via `jq` or TypeScript compilation implicitly through lint/test.
- **Risk**: Tests referencing old strings. → Update test snapshots/mocks concurrently.
