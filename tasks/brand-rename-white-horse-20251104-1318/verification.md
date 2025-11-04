# Verification Report

## DevTools Manual QA

Tool Used: Chrome DevTools (MCP)

### Console Inspection
- [x] No JS errors related to navbar/logo
- [x] No 404s for brand assets
- [!] Non-blocking PWA/analytics 500s observed (out of scope)

### DOM & Accessibility
- [x] Navbar link text reads "WHITE HORSE"
- [x] Logo `img` alt is "The White Horse Waterbeach logo"
- [x] Semantic `nav` landmark present

### Asset Verification
- [x] Image source resolved to `/_next/image?url=%2Fimages%2Fbrand%2Fwhitehorse-logo.png`
- [x] Physical file at `public/images/brand/whitehorse-logo.png`

### Device Testing
- [x] Desktop width renders logo correctly
- [x] Mobile menu retains logo and label

## Test Scenarios
- [x] Home page renders new logo and brand
- [x] Menu page navbar uses new asset

## Notes
- External review links updated to search pages for The White Horse on Google Maps and TripAdvisor.
