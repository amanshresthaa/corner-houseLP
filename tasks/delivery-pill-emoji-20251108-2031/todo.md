# Implementation Checklist

## Setup
- [x] Create task folder + docs scaffolding

## Config Updates
- [x] Add `layout.badgeGroup` classes to `config/banners/seasonalPromoBanner.json`

## Component Updates
- [x] Update `SeasonalPromoBanner` to render the emoji inside the badge group
- [x] Ensure guards handle optional badge/icon gracefully and avoid duplicate emoji renders

## Testing & Verification
- [x] Run targeted Jest test for `SeasonalPromoBanner`
- [x] Perform Chrome DevTools manual QA (mobile, tablet, desktop)
