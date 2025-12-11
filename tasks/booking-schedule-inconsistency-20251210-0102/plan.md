# Implementation Plan: Booking schedule inconsistency

## Objective
Ensure the schedule returned to the booking UI always contains a full grid of 15‑minute slots from opening to closing for the selected date, even when `booking_slots` rows are missing, so times like 12:00 and 17:45 appear as available when the restaurant is open.

## Success Criteria
- [ ] Schedule endpoint (or frontend fallback) returns all 15‑min times inside operating + service windows for the date.
- [ ] Times absent from `booking_slots` are still surfaced with computed capacity (or marked available) instead of disappearing.
- [ ] Edit/Create flows show 12:00–closing grid for 2025-12-10 (example) and accept 17:45.
- [ ] No regressions for existing slots/capacity; still honours disabled/closed periods when present.

## Architecture / Approach
- Keep existing `/restaurants/<slug>/schedule?date=` call.
- Inside that fetch layer (preferably the server/data loader), after fetching schedule data:
  1) Derive service windows for the date from `restaurant_service_periods` + `restaurant_operating_hours`.
  2) Build a 15‑minute grid across those windows (respect `reservation_interval_minutes` if available; default 15).
  3) For each grid time, attach any existing slot record; if none, synthesize an available slot with default capacity (e.g., allowed_capacities max or table_inventory count) and `disabled=false`.
  4) Keep existing disabled flags/capacity when records exist.
- Return merged list to the frontend so it does not need to change.

## Implementation Steps
1. Locate the schedule fetch implementation (API route or data loader) used by `/restaurants/<slug>/schedule`.
2. Add grid-generation logic that builds times from opening→closing using 15‑min intervals and merges with fetched slots.
3. Use restaurant config to pick interval (`reservation_interval_minutes` fallback 15) and booking_option windows per day.
4. Set default capacity for synthetic slots (e.g., max table capacity or allowed_capacities max; start with generous value).
5. Return combined slots to the frontend; ensure existing filters still work (`disabled` stays false for synthetic slots).
6. Add a unit test (or integration) covering: a date with sparse slots returns full grid; existing slots are preserved.
7. Verify manually in the booking UI (DevTools) that 12:00 and 17:45 appear for 2025-12-10.

## Edge Cases
- Day marked closed (`is_closed=true`) → no slots.
- Special service-period holes (e.g., lunch end before dinner start) → gap respected.
- Custom `reservation_interval_minutes` not divisible into window length.
- Existing disabled slots remain disabled and override synthetic availability at that time.

## Testing Strategy
- Unit: function that merges grid + slots returns expected times and preserves disabled flags.
- Manual QA: date 2025-12-10 shows full grid incl. 12:00 and 17:45; selecting 17:45 no longer errors.
- (If time) Integration/API test for schedule endpoint returning full grid when underlying table sparse.

## Rollout
- Ship behind a small toggle if present; otherwise direct change.
- Monitor bookings created on sparse dates for any unexpected capacity issues.
