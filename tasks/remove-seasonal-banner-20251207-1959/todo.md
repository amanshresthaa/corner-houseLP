# Implementation Checklist

- [x] Remove SeasonalPromoBanner import/render and offset handling in navbar.
- [x] Delete banner component, JSON config, and related Jest test/fixture.
- [x] Confirm no remaining code references (ripgrep shows only historical blueprint json).
- [ ] Run targeted tests (or note skipped if none relevant).
- [x] Manual QA with Chrome DevTools MCP: home page nav area shows no banner; spacing OK on desktop (desktop only; mobile not checked).
