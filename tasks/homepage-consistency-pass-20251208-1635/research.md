# Research: Homepage Visual Consistency Pass

## Current State
- **QuickLinksSection**: Uses a dark gradient background (`from-brand-950 via-brand-900`) with white text and glass cards—clashes with newly lightened sections (About, Signature Dishes, Takeaway Banner, Find Us) that favor soft neutrals and daylight gradients.
- **PressTicker**: Similar dark treatment (brand-900 background, white text). Cards have dark gradients unlike the rest of the page.
- **Other sections** (About, Signature Dishes, Reviews, Quick Links CTA, Takeaway Banner, Find Us) now share a light palette with glassmorphism, DaisyUI badges, and lucide icons.
- Without updating QuickLinks + PressTicker, the page visually oscillates between dark and light themes, breaking the cohesive UX the user requested.

## Constraints
- Must keep data-driven aspects intact (no schema changes). Both components rely on props passed from normalization; only UI adjustments needed.
- Maintain accessibility: high contrast, focus-visible states, semantic headings.
- Reuse DaisyUI button styles and gradients consistent with other sections.

## Opportunities
- Switch backgrounds to light gradients, adjust typography to brand neutrals, and convert cards to glass/outlined style that matches other sections.
- Update CTA buttons to use existing `btn` variants (accent outlines) for consistency.
- Possibly add subtle accent lines or badges to match design tokens introduced elsewhere.

## Plan Overview
- Refresh QuickLinksSection + PressTicker to use light backgrounds, brand-colored headings, and consistent badge/button styles.
- Ensure tests remain valid (QuickLinks has tests; PressTicker currently not covered but change is structural only).
