# Implementation Plan: Homepage Consistency Pass

## Objective
Align the remaining dark-themed sections (QuickLinks + PressTicker) with the light, glassy aesthetic introduced elsewhere on the homepage.

## Steps
1. **QuickLinksSection.tsx**
   - Change section background to a light gradient (brand-50 → white) and swap text colors to dark brand palette.
   - Update cards to glass/outlined style with neutral text while keeping accent overlays subtle.
   - Adjust CTA button styles to DaisyUI outline/filled combos using brand colors.
   - Ensure mobile carousel still works and maintain motion preferences.

2. **PressTicker.tsx**
   - Move to light gradient background, change pill/description text to brand neutrals.
   - Update cards to white/glass style with subtle border and accent link button.

3. **Testing**
   - Run existing QuickLinks tests (`npm run test -- --selectProjects=client --testPathPattern=QuickLinksSection`).
   - No dedicated PressTicker tests yet; rely on manual verification.

4. **Verification**
   - Manual QA via Chrome DevTools MCP after build/tests (still pending access).
