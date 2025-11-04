# Implementation Plan: Revamp Contact Page

## Objective
Improve Contact page layout for clarity and actionability while reusing existing components and keeping accessibility strong.

## Success Criteria
- [ ] Add Quick Actions (Call, Email, Directions) under hero
- [ ] Maintain two-column layout with clearer spacing
- [ ] Keep map within cohesive section with consistent styling
- [ ] Preserve accessibility and mobile-first behaviour

## Architecture
- Modify `app/contact/page.tsx` only; leave shared components intact.
- Add a simple Quick Actions row using CONTACT and address.map URLs.

## Steps
1. Add Quick Actions row (buttons with tel/mailto/directions)
2. Adjust main spacing and section labels
3. Light visual refinement for map container
4. Manual QA with DevTools and responsiveness checks
