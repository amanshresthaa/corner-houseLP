# Implementation Checklist

## Discovery
- [x] Confirm central content + env overrides (`config/content.json`, `data/<env>/content.json`).
- [x] Review `config/content/manifest.json` for modular files and env override locations.
- [x] Inspect loaders/hooks to map marketing/restaurant/menu/public data JSON usage.

## Listing
- [x] Compile categorized list of content JSON paths with brief purpose.
- [x] Note any auxiliary/unreferenced content-like JSON.

## Verification
- [x] Sanity-check list against `rg --files -g '*.json'` output to avoid omissions.
