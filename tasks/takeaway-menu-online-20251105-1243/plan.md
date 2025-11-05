# Implementation Plan: Add Online Link to Takeaway Menu & Remove Takeaway Page

## Objective
Surface the centralized online takeaway link on `/takeaway-menu` and delete the redundant `/takeaway` page.

## Steps
1. Update `app/takeaway-menu/page.tsx` to fetch content and render an Order Takeaway button using `global.links.takeaway`.
2. Tweak hero copy to prefer online ordering (emoji-first).
3. Remove `app/takeaway/page.tsx`.
4. Build to validate.

## Success Criteria
- Button appears on `/takeaway-menu`, opens in a new tab, uses centralized link and label.
- `/takeaway` route removed.
