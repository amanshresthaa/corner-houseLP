# Restaurant Website Content Extraction Prompt

## Purpose
Use this prompt when you need an LLM to ingest one or more restaurant web pages and return a structured summary of key sections for content modelling. It mirrors the modular content layout used in `config/content` and captures the elements stakeholders routinely request (navigation, hero, press, menu highlights, testimonials, events, contact, location, footer).

## Input Expectations
- Provide the model with a JSON payload under the variable name `website_data`. Recommended shape:

```json
{
  "website_data": {
    "pages": [
      { "url": "https://example.com/", "html": "<!doctype html>..." },
      { "url": "https://example.com/about", "html": "<!doctype html>..." }
    ],
    "retrieved_at": "2025-10-28T20:33:00Z"
  }
}
```

- Include raw HTML (minified is acceptable) or high-fidelity text renders. If sections are loaded via JS, capture the rendered DOM.
- When available, add metadata such as HTTP status, language, or viewport-specific captures in `pages[i].notes`.

## Output Schema Overview
The prompt enforces a JSON-only response shaped as:

```json
{
  "siteMetadata": {
    "name": string | null,
    "primaryDomain": string | null,
    "description": string | null,
    "capturedAt": string | null
  },
  "home": { ...sectionPayload },
  "navbar": { ...sectionPayload },
  "slideshow": { ...sectionPayload },
  "press": { ...sectionPayload },
  "about": { ...sectionPayload },
  "signatureHighlights": { ...sectionPayload },
  "testimonials": { ...sectionPayload },
  "events": { ...sectionPayload },
  "takeawayContact": { ...sectionPayload },
  "findUs": { ...sectionPayload },
  "footer": { ...sectionPayload }
}
```

Where every section payload follows:

```json
{
  "status": "found" | "partial" | "not_found",
  "confidence": number,     // 0.0 – 1.0
  "notes": string | null,   // reasoning, caveats, missing data
  "data": {                 // section-specific object described below
    "...": "..."
  }
}
```

Section-specific `data` fields:

- `home.data`: `{ "headline": string | null, "subheadline": string | null, "supportingCopy": string | null, "ctas": [{ "label": string, "href": string | null, "context": string | null }], "highlightedMedia": [{ "type": "image" | "video" | "other", "src": string | null, "altOrCaption": string | null }] }`
- `navbar.data`: `{ "items": [{ "label": string, "href": string | null, "type": "internal" | "external" | "anchor", "ariaLabel": string | null, "order": number }], "ctaButtons": [{ "label": string, "href": string | null }] }`
- `slideshow.data`: `{ "slides": [{ "title": string | null, "caption": string | null, "mediaType": "image" | "video" | "unknown", "mediaSrc": string | null, "actions": [{ "label": string, "href": string | null }] }], "transitionStyle": string | null }`
- `press.data`: `{ "features": [{ "outlet": string | null, "title": string | null, "summary": string | null, "quote": string | null, "publishedDate": string | null, "link": string | null }] }`
- `about.data`: `{ "headline": string | null, "paragraphs": [string], "keyPoints": [string], "historyTimeline": [{ "yearOrEra": string | null, "description": string | null }] }`
- `signatureHighlights.data`: `{ "items": [{ "name": string | null, "description": string | null, "price": string | null, "dietaryTags": [string], "image": { "src": string | null, "alt": string | null } }] }`
- `testimonials.data`: `{ "items": [{ "author": string | null, "quote": string | null, "rating": number | null, "source": string | null, "date": string | null }] }`
- `events.data`: `{ "items": [{ "name": string | null, "description": string | null, "date": string | null, "time": string | null, "recurrence": string | null, "bookingLink": string | null }], "upcomingCount": number | null }`
- `takeawayContact.data`: `{ "takeawayOptions": [{ "platform": string | null, "description": string | null, "link": string | null }], "contactMethods": [{ "type": "phone" | "email" | "form" | "social" | "other", "label": string | null, "value": string | null, "availableHours": string | null }], "reservations": [{ "method": string | null, "link": string | null }] }`
- `findUs.data`: `{ "address": string | null, "mapEmbedUrl": string | null, "directions": [string], "parkingOrTransit": [string], "openingHours": [{ "day": string, "hours": string }], "neighbourhoodHighlights": [string] }`
- `footer.data`: `{ "columns": [{ "heading": string | null, "links": [{ "label": string, "href": string | null }] }], "legalText": string | null, "socialLinks": [{ "platform": string | null, "label": string | null, "href": string | null }] }`

Any arrays can be empty when no data is available. When nothing is found, set `"status": "not_found"`, `"data": null`, and use `"notes"` to explain.

## Prompt Template
Use the following prompt verbatim (fill the `{{INSERT WEBSITE DATA HERE}}` placeholder with your payload or pass `website_data` via the API `input` parameter).

```text
You are a structured-content analyst specializing in restaurant and hospitality websites. Your job is to extract human-readable content modules that align with the Restaurant_BP content model.

Context:
- You will receive restaurant website captures in `website_data.pages`. Each page includes its URL and rendered HTML/text.
- HTML may include scripts, tracking pixels, or inline styles; focus only on meaningful user-facing content.
- Some sections may not be present; never fabricate information. When uncertain, mark the section as `"status": "partial"` and explain in `notes`.

Instructions:
1. Review every page in `website_data.pages`. Prioritize homepage content but use supporting pages (about, events, menu, contact) when needed.
2. For each required section (home, navbar, slideshow, press, about, signature food highlights, testimonials, events, takeaway/contact, find us, footer):
   - Locate relevant headings, text, imagery captions, CTA labels, and URLs.
   - Capture copy verbatim where possible (trim whitespace, preserve punctuation).
   - Record CTA/button/link labels together with their target URLs (absolute or relative).
   - Note any accessibility cues (e.g., aria-labels) when they clarify purpose.
3. Populate the output JSON according to the schema described below. Include:
   - `status`: `"found"`, `"partial"`, or `"not_found"` depending on coverage.
   - `confidence`: value between 0.0 and 1.0 reflecting your certainty.
   - `notes`: short explanation of ambiguities, assumptions, or missing elements. Use `null` when there is nothing to note.
   - `data`: section-specific object fitting the contract.
4. When data is extracted from images or PDFs, mention the source in `notes`.
5. If multiple variants of the same section appear (e.g., seasonal nav, duplicate footers), include the most prominent version and mention alternates in `notes`.
6. After assembling the JSON, perform a self-check:
   - Confirm every requested section key exists in the object.
   - Ensure all strings are valid UTF-8 and no trailing commentary is added.
   - Verify each link is paired with its label. If URL missing, use `null`.
   - Confirm there are no placeholders like "TBD" unless the source contains them.

Output format:
- Reply with **only** the final JSON object matching this schema:
```
{
  "siteMetadata": {
    "name": string | null,
    "primaryDomain": string | null,
    "description": string | null,
    "capturedAt": string | null
  },
  "home": sectionPayload,
  "navbar": sectionPayload,
  "slideshow": sectionPayload,
  "press": sectionPayload,
  "about": sectionPayload,
  "signatureHighlights": sectionPayload,
  "testimonials": sectionPayload,
  "events": sectionPayload,
  "takeawayContact": sectionPayload,
  "findUs": sectionPayload,
  "footer": sectionPayload
}
```
- `sectionPayload` refers to `{ "status": "...", "confidence": 0-1, "notes": string | null, "data": {...} }` with the detailed structures documented earlier.

Begin by acknowledging the number of pages scanned in your `notes` where helpful, but do not include narrative commentary outside the JSON.

Input payload:
{{INSERT WEBSITE DATA HERE}}
```

## QA Checklist
- ✅ Validate the prompt with at least two sample websites (rich & minimal) and confirm sections populate correctly.
- ✅ Run JSON output through a schema validator or TypeScript type guard before using in production workflows.
- ✅ Periodically refresh the prompt when the content model evolves (e.g., new sections added).
- ⚠️ If a site heavily relies on interactive JS, ensure the scraper captures the hydrated DOM before calling the LLM.
- ⚠️ Monitor for hallucinated URLs or fabricated testimonials; tighten instructions if false positives appear.
