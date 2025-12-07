# Implementation Checklist

## Setup
- [x] Create task folder and docs

## Core changes
- [x] Update `config/restaurant.json` address/coordinates/map to Corner House
- [x] Align `lib/restaurantData.ts` fallbacks to new contact/address
- [x] Replace legacy address/postcode/map strings across repo
- [x] Update mocks/tests expectations to new values

## Verification
- [x] Run `rg` to ensure old address/postcode removed
- [x] Manual QA via Chrome DevTools (key contact sections)
