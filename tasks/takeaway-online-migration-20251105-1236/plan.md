# Implementation Plan: Online Takeaway Focus + Takeaway Page

## Objective
Replace most “order takeaway via call” messaging with online ordering, and add a dedicated Takeaway page. Keep copy short, sweet, and emoji-first.

## Success Criteria
- [ ] FAQ/contact/menu/events copy points to online ordering; call remains as fallback.
- [ ] New `/takeaway` page with clear hero + CTAs.
- [ ] All links sourced from `global.links.takeaway` (no hardcoding).

## Steps
1. Add `/takeaway` page with centralized link and concise copy.
2. Update FAQ takeaway answer to prioritize online ordering.
3. Update contact/menu/events snippets to prefer online link; keep call as fallback.
4. Quick build to validate types.

## Edge Cases
- If `global.links.takeaway` missing, show call-only messaging.

## Testing
- Manual QA: Verify buttons, links, copy, and responsive layout.
