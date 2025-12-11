# Research: Booking schedule inconsistency

## Initial Requirements
- Investigate why editing booking `<BOOKING_ID>` for restaurant `<SLUG>` on `<YYYY-MM-DD>` at `<HH:MM>` surfaces "Selected time is no longer available" despite expected capacity.
- Inspect raw schedule/capacity data and the JSON returned by `GET /restaurants/<SLUG>/schedule?date=<YYYY-MM-DD>`.

## Success Criteria
- List raw slots (value, bookingOption, disabled flag, service state/capacity) for `<SLUG>` on `<YYYY-MM-DD>` around `<HH:MM>`.
- Explain whether the relevant service/booking option is disabled/closed or zero-capacity and why.
- Confirm whether `/restaurants/<SLUG>/schedule` response matches expected open service and capacity.

## Existing Patterns
- Booking data lives in the Supabase project `mqtchcaavsucsdjskptc` (service-role key available in `.codex/config.toml`). The PostgREST OpenAPI at `https://mqtchcaavsucsdjskptc.supabase.co/rest/v1/?apikey=…` exposes all tables/RPCs.
- Only one restaurant exists: `white-horse-pub-waterbeach` (`restaurants.id = 486de541-a307-4414-b0b1-f774a0e4a9fa`, timezone `Europe/London`).
- Schedule-related tables visible: `booking_slots`, `restaurant_service_periods`, `restaurant_operating_hours`, `booking_occasions`, `allowed_capacities`, `table_inventory`, `table_holds`, `allocations`, `merge_rules`, `demand_profiles`.
- `restaurant_service_periods` define lunch/dinner/drinks windows per weekday; `booking_occasions` map keys (`lunch`, `dinner`, `drinks`) to availability windows and default durations.
- `booking_slots` currently holds **81 rows** with `available_capacity=999` and `reserved_count=0` for every slot; slots exist mostly only where a booking already exists. Many dates have a single slot (often exactly the booking start time), so most potential times are missing.
- `table_inventory` shows ~25 active tables (mix of 2- and 4-tops, categories dining/bar). `allowed_capacities` allows parties of 2 or 4.
- A single table hold exists on 2025-12-17 19:45–21:15 UTC (two tables held, status `active`).

## External Resources
- Supabase PostgREST OpenAPI (live): `https://mqtchcaavsucsdjskptc.supabase.co/rest/v1/?apikey=<service-role-key>`

## Technical Constraints
- Supabase MCP server is configured but returns `Unauthorized` unless `SUPABASE_ACCESS_TOKEN` is injected; direct PostgREST calls with the service-role key work.
- No local `.env` with Supabase creds; must rely on service-role key from `.codex/config.toml` for API queries.

## Recommendations / Notes
- Likely root cause for “no available times” on empty days: `booking_slots` table lacks generated slots for most time windows. Schedule API probably returns an empty slot list when no rows exist for the date, causing the frontend filter to produce `availableSlots = []`.
- Need the concrete `<YYYY-MM-DD>` and `<HH:MM>` to confirm whether that date/time is absent from `booking_slots` or marked disabled by another rule (operating hours, holds, etc.).

## Open Questions
- Exact `<BOOKING_ID>`, `<SLUG>`, `<YYYY-MM-DD>`, `<HH:MM>` for the failing edit flow.
- What service/booking option was selected (lunch/dinner/drinks)?
- Is `/restaurants/<SLUG>/schedule` backed by a Supabase RPC/Edge Function we can call directly, or by another service?
