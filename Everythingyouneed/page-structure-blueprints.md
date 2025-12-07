# Page Structure Blueprints

```json
{
  "page": "Homepage",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Christmas Menu", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ],
      "notes": "Fixed DaisyUI header shared across site."
    },
    {
      "id": "hero",
      "name": "Hero / Slideshow",
      "layout": "full-bleed-carousel",
      "elements": [
        { "type": "image", "alt": "Featured experiences slideshow covering seasonal menus, events, and venue highlights" },
        { "type": "headline", "text": "The White Horse Waterbeach: Historic Thatched Pub & Authentic Nepalese Restaurant" },
        { "type": "subheadline", "text": "Minutes from Cambridge, blending Nepalese cuisine with British pub classics in England’s largest thatched pub." },
        { "type": "buttons", "items": ["Book Online", "View Menu"] },
        { "type": "carousel_indicators" }
      ]
    },
    {
      "id": "press_ticker",
      "name": "Press / Ticker Strip",
      "layout": "two-cards",
      "elements": [
        { "type": "label", "text": "In the Press" },
        { "type": "card", "slot": "left", "title": "Evening Standard: Country Pub of the Week", "cta": "Read the review" },
        { "type": "card", "slot": "right", "title": "Food Hygiene 5★ & CAMRA Listing" }
      ]
    },
    {
      "id": "about",
      "name": "Welcome to The White Horse",
      "layout": "two-column image-right",
      "elements": [
        { "type": "section_title", "text": "Welcome to The White Horse" },
        { "type": "paragraph", "text": "Waterbeach’s historic thatched pub just outside Cambridge – blending community heritage with a warmly spiced Nepalese kitchen and familiar British pub comfort." },
        { "type": "image", "align": "right", "alt": "The White Horse restaurant interior" },
        {
          "type": "feature_box",
          "title": "Why Guests Visit",
          "bullets": [
            "Distinctive thatched setting & village feel",
            "Authentic Nepalese flavour + pub classics",
            "Inclusive for mixed groups & families",
            "Close to Waterbeach College / north Cambridge",
            "Garden events, takeaway & free parking"
          ]
        },
        { "type": "feature_box", "variant": "compact", "bullets": ["Historic venue", "Welcoming service", "Community-focused experiences"] }
      ]
    },
    {
      "id": "signature_dishes",
      "name": "Our Signature Dishes",
      "layout": "3-up-cards",
      "elements": [
        {
          "type": "cards",
          "count": 3,
          "fields": ["photo", "title", "description", "button: View Menu"],
          "examples": [
            "Crispy Hot Wings – Spiced grilled wings with house marinade",
            "Himali Lamb – Himalayan green curry with yoghurt and mint",
            "Khasi Ko Masu (Goat Curry) – Slow-cooked goat with Nepalese spices"
          ]
        }
      ]
    },
    {
      "id": "reviews",
      "name": "Reviews / Social Proof",
      "layout": "cards",
      "elements": [
        { "type": "section_title", "text": "What Our Customers Say" },
        { "type": "badges", "items": ["Google Reviews", "TripAdvisor"] },
        { "type": "review_cards", "count": 3, "fields": ["stars", "reviewer", "snippet", "platform_badge"] }
      ]
    },
    {
      "id": "quick_links",
      "name": "Quick Links Trio",
      "layout": "3-up-tiles",
      "elements": [
        { "type": "tile", "title": "Community & Events", "description": "Live sport, seasonal gatherings, private hire guidance.", "link": "/events" },
        { "type": "tile", "title": "Heritage & Story", "description": "Discover how England’s largest thatched pub evolved.", "link": "/about" },
        { "type": "tile", "title": "Our Menu", "description": "Authentic Nepalese dishes plus British favourites.", "link": "/menu#starters" }
      ]
    },
    {
      "id": "takeaway_banner",
      "name": "Takeaway Promo Banner",
      "layout": "full-width gradient",
      "elements": [
        { "type": "title", "text": "Takeaway Available" },
        { "type": "copy", "text": "Enjoy our Nepalese cuisine from home. Call to place your collection order." },
        { "type": "primary_cta", "label": "Call to Order: +44 1223 921122" },
        { "type": "secondary_actions", "items": ["Download Takeaway Menu", "Book a Table", "Email the Team"] }
      ]
    },
    {
      "id": "find_us",
      "name": "Contact & Location",
      "layout": "two-column",
      "elements": [
        { "type": "contact_panel", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com"] },
        {
          "type": "opening_times",
          "groups": [
            { "name": "Bar Hours", "status_chip": true },
            { "name": "Kitchen Hours" }
          ]
        },
        { "type": "map", "placement": "right", "pin": true, "directions_control": true }
      ]
    },
    {
      "id": "closing_cta",
      "name": "Closing CTA Ribbon",
      "layout": "band",
      "elements": [
        { "type": "title", "text": "Ready to experience The White Horse Waterbeach?" },
        { "type": "buttons", "items": ["View Menu", "What’s On", "Book Online"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge mixing authentic Nepalese cuisine with British pub comforts." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Home", "Menu", "About", "Events", "Press", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar: Mon–Thu 12:00–22:00 · Fri–Sat 12:00–23:00 · Sun 12:00–22:00 | Kitchen: Mon–Fri 12:00–15:00 & 17:00–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00" },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Menu",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Christmas Menu", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "menu_hero",
      "name": "Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "Menu — Nepalese & Pub Classics" },
        { "type": "subheadline", "text": "Curated menu — quick to scan. Book or order takeaway." },
        { "type": "badges", "items": ["Wakes Menu", "Takeaway Menu"] },
        { "type": "buttons", "items": ["Wakes Menu", "Takeaway Menu", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "interactive_menu",
      "name": "Interactive Menu Explorer",
      "layout": "sticky-filtered-grid",
      "elements": [
        { "type": "search_toggle", "label": "Search & Filter", "states": ["Hidden", "Active"] },
        { "type": "filter_controls", "items": ["Search input", "Category chips", "Clear All"] },
        { "type": "category_nav", "style": "horizontal-scroll", "items": "Menu sections sourced from menu data" },
        { "type": "menu_section_list", "item_template": ["name", "description", "price", "dietary badges"] },
        { "type": "hash_navigation", "notes": "Supports #starters etc." }
      ]
    },
    {
      "id": "dietary_cta",
      "name": "Dietary Information CTA",
      "layout": "centered-panel",
      "elements": [
        { "type": "section_title", "text": "Need Dietary Information?" },
        { "type": "paragraph", "text": "Find comprehensive allergen information, dietary requirements, and food safety details." },
        { "type": "button", "labels": ["View Menu Information & Dietary Requirements"], "links": ["/menu-information"] },
        { "type": "chips", "items": ["14 Allergen Information", "Dietary Options", "Natasha's Law Compliant"] }
      ]
    },
    {
      "id": "menu_cta",
      "name": "Book & Order CTA",
      "layout": "gradient-band",
      "elements": [
        { "type": "title", "text": "🍽️ Experience Our Interactive Menu" },
        { "type": "copy", "text": "Use advanced search and dietary filters to find the perfect dish." },
        { "type": "buttons", "items": ["Book Online", "Order Takeaway", "Takeaway Menu", "Learn Our Story"] },
        { "type": "notice", "text": "Please inform us of any allergies or dietary requirements when ordering." }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Home", "Menu", "Menu Information", "Takeaway Menu", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar: Mon–Thu 12:00–22:00 · Fri–Sat 12:00–23:00 · Sun 12:00–22:00 | Kitchen: Mon–Fri 12:00–15:00 & 17:00–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00" },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Menu Information",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Christmas Menu", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Menu Information Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "Menu Information & Dietary Requirements" },
        { "type": "subheadline", "text": "Comprehensive allergen, dietary, and food safety guidance for every guest." },
        { "type": "badges", "items": ["UK Food Regulations 2014", "Natasha's Law Certified", "14 Allergen Information"] }
      ]
    },
    {
      "id": "emergency_notice",
      "name": "Emergency Allergy Notice",
      "layout": "alert-banner",
      "elements": [
        { "type": "icon", "value": "warning" },
        { "type": "copy", "text": "Severe allergies? Call +44 1223 921122 before visiting to discuss safety protocols." }
      ]
    },
    {
      "id": "breadcrumb",
      "name": "Breadcrumb",
      "layout": "horizontal",
      "elements": [
        { "type": "crumbs", "items": ["Home", "Menu Information"] }
      ]
    },
    {
      "id": "quick_cards",
      "name": "Quick Access Cards",
      "layout": "3-up-cards",
      "elements": [
        { "type": "card", "title": "Allergen Safety", "description": "14 major allergens clearly identified and cross-contamination prevention protocols." },
        { "type": "card", "title": "Dietary Options", "description": "Vegetarian, vegan, gluten-free, religious, and cultural accommodations." },
        { "type": "card", "title": "Legal Compliance", "description": "Full compliance with UK legislation and Natasha's Law." }
      ]
    },
    {
      "id": "faq",
      "name": "FAQ Accordion",
      "layout": "accordion",
      "elements": [
        { "type": "accordion_item", "title": "What allergen information do you provide?", "content": "List of 14 major allergens and availability of written guidance." },
        { "type": "accordion_item", "title": "How do you prevent cross-contamination?", "content": "Separate prep areas, dedicated utensils, strict cleaning protocols." },
        { "type": "accordion_item", "title": "Are you compliant with Natasha's Law?", "content": "PPDS labelling, highlighted allergens, on-package compliance." },
        { "type": "accordion_item", "title": "Do you offer vegetarian, vegan, halal, or kosher options?", "content": "Dedicated sections covering plant-forward, halal-certified suppliers, and adaptation guidance." },
        { "type": "accordion_item", "title": "Can you accommodate children and family dining?", "content": "Mild dishes, child-friendly seating, allergy-aware adjustments." },
        { "type": "accordion_item", "title": "Do you provide nutritional information?", "content": "Calories, macros, sodium, fibre, and wellness options available on request." },
        { "type": "accordion_item", "title": "How do I request special dietary accommodations?", "content": "Steps for booking and ordering, with contact information for advance notice." }
      ]
    },
    {
      "id": "contact_panel",
      "name": "Contact & Support",
      "layout": "centered-panel",
      "elements": [
        { "type": "section_title", "text": "Still Have Questions?" },
        { "type": "contact_option", "label": "Call Us", "value": "+44 1223 921122" },
        { "type": "contact_option", "label": "Email Us", "value": "cornerhouse@lapeninns.com" },
        { "type": "paragraph", "text": "Location: 231 Newmarket Road, Cambridge CB5 8JE" }
      ]
    },
    {
      "id": "legal_notice",
      "name": "Legal Notice",
      "layout": "compact",
      "elements": [
        { "type": "paragraph", "text": "Information reviewed regularly; cross-contamination cannot be fully eliminated. Last updated: 1 September 2025." }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Menu", "Menu Information", "Takeaway Menu", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar: Mon–Thu 12:00–22:00 · Fri–Sat 12:00–23:00 · Sun 12:00–22:00 | Kitchen: Mon–Fri 12:00–15:00 & 17:00–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00" },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Takeaway Menu",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "Takeaway", "About", "Events", "Press", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Takeaway Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "badge", "text": "Takeaway Menu" },
        { "type": "headline", "text": "Download the The White Horse Waterbeach Takeaway Menu" },
        { "type": "subheadline", "text": "Browse Nepalese signatures and British pub favourites, then call to place your order for collection." },
        { "type": "buttons", "items": ["Download Menu", "Call to Order"], "links": ["/takeaway-menu/the-white-horse-takeaway-menu.jpg", "tel:+441223921122"] },
        { "type": "support_text", "text": "Need help? Email cornerhouse@lapeninns.com for the latest copy." }
      ]
    },
    {
      "id": "collection_highlights",
      "name": "Collection Highlights",
      "layout": "3-up-cards",
      "elements": [
        { "type": "card", "title": "Order & collection times", "description": "Call ahead; pickups typically ready within 25 minutes." },
        { "type": "card", "title": "Easy parking outside", "description": "Use our free car park; collection support available." },
        { "type": "card", "title": "Allergens & dietary notes", "description": "PDF labels every dish. Mention allergies when you call." }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Menu", "Takeaway Menu", "Order Takeaway", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Kitchen takeaway hours follow kitchen schedule; confirm when calling." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Book a Table",
  "sections": [
    {
      "id": "redirect_notice",
      "name": "Automatic Redirect",
      "layout": "system",
      "elements": [
        { "type": "auto_redirect", "target": "/book-a-table", "label": "Togo Booking", "notes": "Client immediately redirected on load." }
      ]
    }
  ]
}
```

```json
{
  "page": "About",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Christmas Menu", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "About Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "About The White Horse Waterbeach" },
        { "type": "subheadline", "text": "A unique blend of authentic Nepalese cuisine and traditional British pub culture." }
      ]
    },
    {
      "id": "story_timeline",
      "name": "Our Story",
      "layout": "timeline",
      "elements": [
        { "type": "intro", "text": "Located in Waterbeach, England’s largest thatched pub pairs Nepalese dishes with pub favourites." },
        { "type": "timeline_item", "title": "Historic Beginnings", "description": "Village hub for centuries; the thatched building anchors community life." },
        { "type": "timeline_item", "title": "Culinary Evolution", "description": "Experimental eras including gastropub influences enrich the menu." },
        { "type": "timeline_item", "title": "Today", "description": "Nepalese-British fusion celebrating Cambridge’s multicultural community." }
      ]
    },
    {
      "id": "about_cta",
      "name": "Booking CTA",
      "layout": "highlight-panel",
      "elements": [
        { "type": "title", "text": "Ready to Book?" },
        { "type": "copy", "text": "Experience the perfect blend of Nepalese hospitality and British pub tradition." },
        { "type": "button", "labels": ["Book Online"], "links": ["/book-a-table"] },
        { "type": "contact_details", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "See footer for full hours"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Home", "Menu", "Events", "Press", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar: Mon–Thu 12:00–22:00 · Fri–Sat 12:00–23:00 · Sun 12:00–22:00 | Kitchen: Mon–Fri 12:00–15:00 & 17:00–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00" },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Events",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Christmas Menu", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Events Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "Events at The White Horse, Waterbeach" },
        { "type": "subheadline", "text": "Your hub for sport, celebrations & community." },
        { "type": "chips", "items": ["Celebrations", "Live Sports", "Community Events"] }
      ]
    },
    {
      "id": "events_intro",
      "name": "Events Introduction",
      "layout": "centered-copy",
      "elements": [
        { "type": "paragraph", "text": "Historic thatched setting hosting business lunches, family celebrations, live sports and seasonal gatherings." }
      ]
    },
    {
      "id": "curry_carols_highlight",
      "name": "Curry & Carols Highlight",
      "layout": "gradient-card",
      "elements": [
        { "type": "title", "text": "Two magical evenings of Curry & Carols this December" },
        { "type": "copy", "text": "£35 per guest Nepalese banquet with live carols on 16 & 17 December 2025." },
        { "type": "buttons", "items": ["Discover Curry & Carols", "View the Menu"], "links": ["/events/curry-and-carols", "/curry-and-carols-menu"] },
        { "type": "badge_row", "items": ["Live carols both evenings", "Festive banquet", "Mulled pairings"] }
      ]
    },
    {
      "id": "live_sports",
      "name": "Live Sports Spotlight",
      "layout": "feature-panel",
      "elements": [
        { "type": "section_title", "text": "Catch All the Live Action on Sky TV!" },
        { "type": "subheading", "text": "Your home for live sports in Cambridge." },
        { "type": "bulleted_features", "items": ["Sky TV access", "Great atmosphere", "Nepalese dishes & pub favourites", "Large garden & terrace", "Dog-friendly"] },
        { "type": "social_links", "items": ["Facebook", "Instagram"] }
      ]
    },
    {
      "id": "private_events",
      "name": "Private Events Showcase",
      "layout": "card-grid",
      "elements": [
        { "type": "section_title", "text": "Host Your Unforgettable Event" },
        { "type": "copy", "text": "Historic thatched building with Nepalese + British menus, garden spaces, easy parking, low deposits, family-friendly." },
        { "type": "cards", "count": 6, "fields": ["icon", "title", "description"], "examples": ["🏛️ Thatched Historic Building", "🍛 Unique Menus", "🌳 Large Garden", "🚗 Easy Parking", "💰 Low Deposits", "👨‍👩‍👧‍👦 Family-Friendly"] }
      ]
    },
    {
      "id": "occasions",
      "name": "Occasion Ideas",
      "layout": "two-column tiles",
      "elements": [
        { "type": "tile", "title": "Birthday Celebrations", "description": "Make milestones memorable in a unique setting." },
        { "type": "tile", "title": "Anniversaries", "description": "Celebrate with bold flavours and cosy interiors." },
        { "type": "tile", "title": "Student Socials", "description": "Ideal for societies and quiz nights." },
        { "type": "tile", "title": "Corporate Gatherings", "description": "Relaxed yet polished space for teams." },
        { "type": "tile", "title": "Community Events", "description": "Waterbeach’s hub for local groups." },
        { "type": "tile", "title": "Wakes & Memorials", "description": "Compassionate service with private hire options." }
      ]
    },
    {
      "id": "events_cta",
      "name": "Events CTA",
      "layout": "gradient-band",
      "elements": [
        { "type": "title", "text": "🎈 Ready to Plan Your Event?" },
        { "type": "copy", "text": "Reach out to check availability, discuss ideas, and make every occasion memorable." },
        { "type": "buttons", "items": ["Book Your Event Now", "View Our Menus", "Contact Us"], "links": ["/contact", "/menu#starters", "/contact"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Events", "Curry & Carols", "Private Hire", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar: Mon–Thu 12:00–22:00 · Fri–Sat 12:00–23:00 · Sun 12:00–22:00 | Kitchen: Mon–Fri 12:00–15:00 & 17:00–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00" },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Event Detail – Curry & Carols",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "Events", "Press", "Christmas Menu", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Curry & Carols Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "badge", "text": "Menu Now Live" },
        { "type": "headline", "text": "Curry & Carols 2025 at The White Horse Waterbeach" },
        { "type": "subheadline", "text": "Two sparkling nights of Nepalese curry, mulled cheer, and live carols under the thatched roof." },
        { "type": "buttons", "items": ["Register Interest", "Read the Evening Standard feature"], "links": ["mailto:cornerhouse@lapeninns.com", "https://www.standard.co.uk/going-out/bars/the-white-horse-girton-hotel-pub-review-b1249473.html"] },
        { "type": "badges", "items": ["16 & 17 December", "£35 per guest", "Live Choir"] }
      ]
    },
    {
      "id": "menu_preview",
      "name": "Menu Preview",
      "layout": "split-card",
      "elements": [
        { "type": "section_title", "text": "The 2025 Curry & Carols menu is ready" },
        { "type": "list", "items": ["Starters – sharing plates", "Mains & sides selection", "Desserts & hot drinks"] },
        { "type": "buttons", "items": ["Read the full menu", "Ask about availability"], "links": ["/curry-and-carols-menu", "/contact"] }
      ]
    },
    {
      "id": "experience_highlights",
      "name": "Event Highlights",
      "layout": "3-up-cards",
      "elements": [
        { "type": "card", "title": "£35 festive banquet", "description": "Seasonal sharing plates and mains prepared for joyful gatherings." },
        { "type": "card", "title": "Carols you can sing along to", "description": "Live performers lead classic and modern carols with lyric cards." },
        { "type": "card", "title": "Mulled pairings & mocktails", "description": "Limited-edition pours, zero-proof options, and warming tipples." }
      ]
    },
    {
      "id": "priority_signup",
      "name": "Priority Booking",
      "layout": "split-column",
      "elements": [
        { "type": "image_placeholder", "text": "Photography coming soon" },
        { "type": "list", "items": ["Dates: 16 & 17 December 2025", "Price: £35 per guest", "Ideal for: work dos, choirs, families" ] },
        { "type": "buttons", "items": ["Email the team", "Explore dining bookings"], "links": ["mailto:cornerhouse@lapeninns.com?subject=Curry%20and%20Carols%202025%20Interest", "/book-a-table"] }
      ]
    },
    {
      "id": "questions",
      "name": "Questions CTA",
      "layout": "centered-panel",
      "elements": [
        { "type": "title", "text": "Questions while you wait?" },
        { "type": "copy", "text": "Chat through dietary needs, group sizes, or corporate hire ideas." },
        { "type": "contact_options", "items": ["📞 +44 1223 921122", "✉️ cornerhouse@lapeninns.com"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Events", "Curry & Carols", "Curry & Carols Menu", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar: Mon–Thu 12:00–22:00 · Fri–Sat 12:00–23:00 · Sun 12:00–22:00 | Kitchen: Mon–Fri 12:00–15:00 & 17:00–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00" },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Press",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Christmas Menu", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Press Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "breadcrumb", "items": ["Home", "Press & Media"] },
        { "type": "headline", "text": "Press & Media" },
        { "type": "subheadline", "text": "Explore recent coverage, grab key facts, and contact our team for interviews and imagery." }
      ]
    },
    {
      "id": "food_hygiene",
      "name": "Food Hygiene Highlight",
      "layout": "badge-card",
      "elements": [
        { "type": "title", "text": "Food Hygiene Rating: 5 (Very Good)" },
        { "type": "copy", "text": "Inspection completed 18 February 2025." },
        { "type": "button", "labels": ["View rating"], "links": ["https://ratings.food.gov.uk/business/1750898/the-white-horse-girton"] }
      ]
    },
    {
      "id": "hero_feature",
      "name": "Press Feature Banner",
      "layout": "feature-banner",
      "elements": [
        { "type": "label", "text": "Country pub of the week" },
        { "type": "headline", "text": "Evening Standard spotlights The White Horse, Waterbeach" },
        { "type": "quote", "text": "The changes keep locals coming back." },
        { "type": "cta", "label": "Read the review", "link": "https://www.standard.co.uk/going-out/bars/the-white-horse-girton-hotel-pub-review-b1249473.html" }
      ]
    },
    {
      "id": "media_highlights",
      "name": "Media Highlights",
      "layout": "card-grid",
      "elements": [
        { "type": "section_title", "text": "Media Highlights" },
        { "type": "card_list", "items": "Press articles with source badges, summary, CTA (internal or external)." }
      ]
    },
    {
      "id": "press_kit",
      "name": "Press Kit & Contacts",
      "layout": "two-column",
      "elements": [
        { "type": "list", "title": "Press Kit & Quick Facts", "items": ["England's largest thatched pub", "Authentic Nepalese cuisine", "Family & dog friendly", "Garden & private dining"] },
        { "type": "contact_panel", "fields": ["Email: cornerhouse@lapeninns.com", "Phone: +44 1223 921122", "Address: 231 Newmarket Road, Cambridge CB5 8JE"], "buttons": ["Email Press Team", "Contact Page"], "notes": "Imagery available on request." }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
{ "type": "column", "title": "Contact", "fields": ["Press: cornerhouse@lapeninns.com", "Media phone: +44 1223 921122", "Address: 231 Newmarket Road, Cambridge"] },
        { "type": "column", "title": "Quick Links", "items": ["Press Kit", "Media Highlights", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar & kitchen hours as per footer." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Blog",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Blog", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Blog Hero",
      "layout": "content-block",
      "elements": [
        { "type": "headline", "text": "Stories from The White Horse Waterbeach" },
        { "type": "subheadline", "text": "Discover heritage, cuisine, and community from England’s largest thatched pub." }
      ]
    },
    {
      "id": "featured_story",
      "name": "Featured Story",
      "layout": "centered-card",
      "elements": [
        { "type": "section_title", "text": "Featured Story" },
        { "type": "card", "title": "A Guide to Authentic Momo Dumplings", "description": "Explore Himalayan flavours and momo craftsmanship." },
        { "type": "button", "labels": ["Read Story"], "links": ["/blog/authentic-momo-dumplings-nepalese-cuisine"] }
      ]
    },
    {
      "id": "filterable_posts",
      "name": "Blog Posts",
      "layout": "filter-grid",
      "elements": [
        { "type": "category_filters", "items": ["All", "Press & Media", "Food & Dining", "Nepalese Cuisine", "Business Dining", "Student Life", "History & Heritage", "Sports", "Local Sourcing", "Dog-Friendly"] },
        { "type": "post_cards", "fields": ["image", "title", "excerpt", "category", "date", "cta"] }
      ]
    },
    {
      "id": "newsletter",
      "name": "Newsletter CTA",
      "layout": "gradient-band",
      "elements": [
        { "type": "title", "text": "📰 Stay Updated" },
        { "type": "copy", "text": "Get the latest stories, events, and offers." },
        { "type": "form", "fields": ["Email address"], "buttons": ["Subscribe"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Blog", "Press", "Events", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar & kitchen hours as per footer." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Blog Article – Evening Standard",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Blog", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "breadcrumb",
      "name": "Breadcrumb",
      "layout": "horizontal",
      "elements": [
        { "type": "crumbs", "items": ["Home", "Blog", "Press & Media"] }
      ]
    },
    {
      "id": "article_header",
      "name": "Article Hero",
      "layout": "article-hero",
      "elements": [
        { "type": "badge", "text": "Press & Media" },
        { "type": "headline", "text": "Evening Standard Spotlights The White Horse, Waterbeach" },
        { "type": "meta", "items": ["By The White Horse Team", "19 December 2024", "2 min read"] },
        { "type": "image", "alt": "Thatched pub exterior" }
      ]
    },
    {
      "id": "article_body",
      "name": "Article Body",
      "layout": "prose",
      "elements": [
        { "type": "rich_text", "content": "HTML content including highlights list and Evening Standard quote." }
      ]
    },
    {
      "id": "external_cta",
      "name": "External Review CTA",
      "layout": "inline-cta",
      "elements": [
        { "type": "title", "text": "Read the Evening Standard review" },
        { "type": "copy", "text": "Full piece available on the Evening Standard website." },
        { "type": "button", "labels": ["Read the Evening Standard review"], "links": ["https://www.standard.co.uk/going-out/bars/the-white-horse-girton-hotel-pub-review-b1249473.html"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Blog", "Press", "Events", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar & kitchen hours as per footer." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Christmas Menu",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "Christmas Menu", "Events", "Press", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Christmas Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "Christmas Menu 2025" },
        { "type": "subheadline", "text": "Pick a starter, main, side, and dessert – mulled wine or drink included." },
        { "type": "chips", "items": ["Set menu £44.99", "Festive dining", "Mulled welcome"] },
        { "type": "buttons", "items": ["Request Booking", "Download Menu"], "links": ["mailto:cornerhouse@lapeninns.com?subject=Christmas%20Menu%202025", "/christmas-menu.pdf"] }
      ]
    },
    {
      "id": "choose_meal",
      "name": "Choose Your Christmas Meal",
      "layout": "accordion-cards",
      "elements": [
        { "type": "menu_section", "title": "Starters", "items": ["Sha Phaley Delight", "Turkey’s Nepalese Christmas Choyela", "Tandoori Broccoli", "Banana Dumpling"] },
        { "type": "menu_section", "title": "Mains", "items": ["Zesty Lemon Sea Bass", "Chicken Pistachio Korma", "Himalayan Christmas Sizzler", "Santa's Vegetarian Feast"] },
        { "type": "menu_section", "title": "Sides", "items": ["Fragrant Pilau Rice", "Mini Festive Naan"] },
        { "type": "menu_section", "title": "Desserts", "items": ["Coffee with Mince Pie", "Christmas Pudding with Brandy Sauce"] }
      ]
    },
    {
      "id": "chef_selection",
      "name": "Chef’s Christmas Selection",
      "layout": "feature-card",
      "elements": [
        { "type": "title", "text": "Chef’s Selection Banquet" },
        { "type": "copy", "text": "Pre-curated menu with mulled wine or alternative drink included." },
        { "type": "list", "items": ["Four-course festive journey", "Mulled wine included", "Vegetarian path available"] }
      ]
    },
    {
      "id": "festive_highlights",
      "name": "Festive Highlights",
      "layout": "card-grid",
      "elements": [
        { "type": "card", "title": "Decor & Ambience", "description": "Thatched roof dressed for the season with live carols available." },
        { "type": "card", "title": "Group Ready", "description": "Ideal for office socials, society dinners, and family celebrations." },
        { "type": "card", "title": "Dietary Friendly", "description": "Vegetarian, gluten-free, and low spice alternatives on request." }
      ]
    },
    {
      "id": "festive_support",
      "name": "Support & Booking",
      "layout": "two-column",
      "elements": [
        { "type": "copy", "text": "Contact the events team for availability, custom timings, or private space." },
        { "type": "contact_options", "items": ["📞 +44 1223 921122", "✉️ cornerhouse@lapeninns.com"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Christmas Menu", "Curry & Carols", "Events", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Holiday trading hours shared on enquiry." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Curry & Carols Menu",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "Events", "Curry & Carols", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Curry & Carols Menu Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "badge", "text": "Menu Now Live" },
        { "type": "headline", "text": "Curry & Carols Menu 2025" },
        { "type": "subheadline", "text": "Share starters, choose warming mains, finish with festive desserts while live carols fill the room." },
        { "type": "buttons", "items": ["Register Interest", "Contact the Team"], "links": ["mailto:cornerhouse@lapeninns.com?subject=Curry%20and%20Carols%20Menu", "/contact"] }
      ]
    },
    {
      "id": "menu_sections",
      "name": "Banquet Courses",
      "layout": "accordion-cards",
      "elements": [
        { "type": "menu_section", "title": "Starters", "items": ["Vegetable Samosa", "Gobi Manchurian", "Chicken Tikka", "Seekh Kebab"] },
        { "type": "menu_section", "title": "Mains", "items": ["Chicken Tikka Masala", "Lamb Curry", "Vegetable Curry", "Pilau Rice", "Vegetable Chow Mein"] },
        { "type": "menu_section", "title": "Dessert & Hot Drinks", "items": ["Coffee with Mince Pie", "Christmas Pudding"] }
      ]
    },
    {
      "id": "highlights",
      "name": "Experience Highlights",
      "layout": "card-grid",
      "elements": [
        { "type": "card", "title": "Festive Nepalese Banquet", "description": "Shareable starters, bold curries, comforting desserts." },
        { "type": "card", "title": "Live Carollers", "description": "Song sheets, warm lighting, joyful singalongs." },
        { "type": "card", "title": "Limited Seats", "description": "Two evenings only – 16 & 17 December." }
      ]
    },
    {
      "id": "assurance",
      "name": "Guest Assurance",
      "layout": "feature-list",
      "elements": [
        { "type": "list_item", "title": "Allergies handled with care", "description": "Notify us in advance for safe swaps." },
        { "type": "list_item", "title": "Planning support", "description": "Team assists with group or corporate bookings." },
        { "type": "list_item", "title": "Two evenings only", "description": "Arrive from 7pm to settle before the first song." }
      ]
    },
    {
      "id": "booking_cta",
      "name": "Booking CTA",
      "layout": "centered-panel",
      "elements": [
        { "type": "title", "text": "Ready to reserve your table?" },
        { "type": "buttons", "items": ["Email the team", "Call to enquire"], "links": ["mailto:cornerhouse@lapeninns.com?subject=Curry%20and%20Carols%20Booking", "tel:+441223921122"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Curry & Carols", "Menu", "Events", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Event seating opens 18:00; service 19:00–22:00." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Wakes Menu",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "Wakes Menu", "Events", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Wakes Buffet Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "badge", "text": "Wakes & Celebrations of Life" },
        { "type": "headline", "text": "A Quietly Considered Wakes Buffet" },
        { "type": "subheadline", "text": "£10 per guest for sandwich, chicken wing, and samosa with optional add-ons." },
        { "type": "chips", "items": ["Includes sandwich, wing & samosa", "Optional chicken pakora +£2.50", "Hosted in dining rooms"] }
      ]
    },
    {
      "id": "base_courses",
      "name": "Base Menu Steps",
      "layout": "step-cards",
      "elements": [
        { "type": "step", "title": "Select a sandwich", "description": "Each guest chooses egg & mayo or bacon & cheese." },
        { "type": "step", "title": "Add our wings", "description": "Warm lightly spiced chicken wing served with each plate." },
        { "type": "step", "title": "Finish with a samosa", "description": "Vegetable or meat samosa to suit your guests." }
      ]
    },
    {
      "id": "optional_extras",
      "name": "Optional Extras",
      "layout": "two-up-cards",
      "elements": [
        { "type": "card", "title": "Chicken pakora", "description": "Freshly fried with coriander chutney." },
        { "type": "card", "title": "Tea or coffee", "description": "Served alongside dessert and speeches." }
      ]
    },
    {
      "id": "contact_cta",
      "name": "Arrange a Wake",
      "layout": "centered-panel",
      "elements": [
        { "type": "copy", "text": "Compassionate team ready to support planning." },
        { "type": "buttons", "items": ["Email the team", "Call to discuss"], "links": ["mailto:cornerhouse@lapeninns.com?subject=Wakes%20Menu%20Enquiry", "tel:+441223921122"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Wakes Menu", "Events", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Private hire timings arranged on enquiry." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Contact",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Contact Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "Contact Us" },
        { "type": "subheadline", "text": "Get in touch for bookings, directions, or general enquiries." }
      ]
    },
    {
      "id": "contact_info",
      "name": "Contact & Hours",
      "layout": "two-column",
      "elements": [
        { "type": "section_title", "text": "Contact Information" },
        { "type": "contact_panel", "fields": ["Phone: +44 1223 921122", "Address: 231 Newmarket Road, Cambridge CB5 8JE"] },
        { "type": "hours_card", "title": "Opening Hours", "content": "Hours drawn from restaurant data component." },
        { "type": "feature_list", "items": ["Outdoor terrace", "Free parking", "Dog-friendly", "Accessible", "Free WiFi", "Private dining"] }
      ]
    },
    {
      "id": "map",
      "name": "Interactive Map",
      "layout": "map",
      "elements": [
        { "type": "map", "title": "The White Horse Waterbeach Location", "features": ["Embedded map", "Directions", "Zoom controls"] }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Menu", "Events", "Press", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar: Mon–Thu 12:00–22:00 · Fri–Sat 12:00–23:00 · Sun 12:00–22:00 | Kitchen: Mon–Fri 12:00–15:00 & 17:00–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00" },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Privacy Policy",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Privacy Policy Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "Privacy Policy" },
        { "type": "subheadline", "text": "How we collect, use, and protect your personal information." }
      ]
    },
    {
      "id": "breadcrumb",
      "name": "Breadcrumb",
      "layout": "horizontal",
      "elements": [
        { "type": "crumbs", "items": ["Home", "Privacy Policy"] }
      ]
    },
    {
      "id": "policy_article",
      "name": "Policy Content",
      "layout": "prose",
      "elements": [
        { "type": "timestamp", "text": "Last updated: September 1, 2025" },
        { "type": "rich_text", "content": "Sections covering data collection, legal basis, marketing preferences, cookies, user rights, contact details." }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Privacy Policy", "Terms of Service", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar & kitchen hours as per footer." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```

```json
{
  "page": "Terms of Service",
  "sections": [
    {
      "id": "navbar",
      "name": "Navbar / Header",
      "layout": "top-fixed",
      "elements": [
        { "type": "logo", "position": "left", "label": "The White Horse Waterbeach / Logo" },
        { "type": "nav_links", "position": "center", "items": ["Home", "Menu", "About", "Events", "Press", "Contact"] },
        { "type": "button", "position": "right", "labels": ["Call for Takeaway", "Book Online", "Order Takeaway"] }
      ]
    },
    {
      "id": "hero",
      "name": "Terms Hero",
      "layout": "gradient-hero",
      "elements": [
        { "type": "headline", "text": "Terms of Service" },
        { "type": "subheadline", "text": "Understand booking, dining, and website usage policies." }
      ]
    },
    {
      "id": "breadcrumb",
      "name": "Breadcrumb",
      "layout": "horizontal",
      "elements": [
        { "type": "crumbs", "items": ["Home", "Terms of Service"] }
      ]
    },
    {
      "id": "terms_article",
      "name": "Terms Content",
      "layout": "prose",
      "elements": [
        { "type": "timestamp", "text": "Last updated: September 1, 2025" },
        { "type": "rich_text", "content": "Sections covering service description, booking & payment terms, cancellation policy, conduct expectations, liability, data usage, governing law." }
      ]
    },
    {
      "id": "footer",
      "name": "Footer",
      "layout": "multi-column",
      "elements": [
        { "type": "column", "title": "About", "content": "Historic thatched pub near Cambridge blending Nepalese cuisine with British classics." },
        { "type": "column", "title": "Contact", "fields": ["231 Newmarket Road, Cambridge CB5 8JE", "+44 1223 921122", "cornerhouse@lapeninns.com", "Directions"] },
        { "type": "column", "title": "Quick Links", "items": ["Terms of Service", "Privacy Policy", "Contact"] },
        { "type": "column", "title": "Hours", "content": "Bar & kitchen hours as per footer." },
        { "type": "legal", "content": "© 2025 The White Horse Waterbeach — Privacy Policy / Terms of Service" },
        { "type": "social_icons", "position": "bottom-left" }
      ]
    }
  ]
}
```
