import { http, HttpResponse } from 'msw';

/**
 * MSW handlers for mocking API responses in tests
 * Covers the restaurant booking system's API endpoints
 */

// Mock restaurant data (matches the structure from data/restaurant.json)
const mockRestaurantData = {
  name: "The White Horse Waterbeach",
  phone: "+44 1223 375578",
  email: "hellothewhitehorsewaterbeach@gmail.com",
  description: "Historic thatched pub serving Nepalese cuisine in Waterbeach.",
  identity: {
    name: "The White Horse Waterbeach",
    displayName: "The White Horse Waterbeach",
    tagline: "Historic Thatched Pub & Nepalese Restaurant",
    description: "Authentic Nepalese cuisine and traditional British pub classics.",
    established: "1840s",
    type: "pub-restaurant",
    cuisine: ["Nepalese", "British"],
    slug: "the-white-horse-girton"
  },
  contact: {
    phone: {
      primary: "+44 1223 375578",
      display: "01223 375578",
      tel: "tel:+441223375578",
      whatsapp: "+44 1223 375578"
    },
    email: {
      primary: "hellothewhitehorsewaterbeach@gmail.com",
      bookings: "hellothewhitehorsewaterbeach@gmail.com",
      events: "hellothewhitehorsewaterbeach@gmail.com"
    },
    website: "https://whitehorsepub.co",
    bookingUrl: "https://whitehorsepub.co/book-a-table"
  },
  address: {
    street: "12 Green Side",
    area: "Waterbeach",
    city: "Cambridge",
    state: "Cambridgeshire",
    postcode: "CB25 9HP",
    zip: "CB25 9HP",
    country: "United Kingdom",
    coordinates: { lat: 52.2425913, lng: 0.0814946 },
    map: {
      google: "https://www.google.com/maps/dir/?api=1&destination=52.2425913,0.0814946&travelmode=driving",
      apple: "https://maps.apple.com/?daddr=52.2425913,0.0814946&dirflg=d"
    },
    timezone: "Europe/London"
  },
  hours: {
    kitchen: {
      monday: "12:00-22:00",
      tuesday: "12:00-22:00",
      wednesday: "12:00-22:00",
      thursday: "12:00-22:00",
      friday: "12:00-22:30",
      saturday: "12:00-22:30",
      sunday: "12:00-21:30"
    },
    bar: {
      monday: "12:00-23:00",
      tuesday: "12:00-23:00",
      wednesday: "12:00-23:00",
      thursday: "12:00-23:00",
      friday: "12:00-23:30",
      saturday: "12:00-23:30",
      sunday: "12:00-22:30"
    },
    display: {
      kitchen: {
        weekdays: "Mon-Thu: 12:00-22:00",
        friday: "Fri: 12:00-22:30",
        saturday: "Sat: 12:00-22:30",
        sunday: "Sun: 12:00-21:30"
      },
      bar: {
        weekdays: "Mon-Thu: 12:00-23:00",
        friday: "Fri: 12:00-23:30",
        saturday: "Sat: 12:00-23:30",
        sunday: "Sun: 12:00-22:30"
      }
    },
    notes: ["Kitchen closes 30 minutes before closing time."],
    timezone: "Europe/London"
  },
  features: [
    "Dog Friendly",
    "Family Friendly",
    "Student Offers",
    "Live Sport",
    "Sunday Roast",
    "Private Hire",
    "Group Dining"
  ],
  menu: {
    highlights: [
      { name: "Fish & Chips", price: "£14.95", description: "Fresh cod with hand-cut chips" },
      { name: "Sunday Roast", price: "£16.95", description: "Traditional roast with all the trimmings" },
      { name: "Steak & Ale Pie", price: "£15.95", description: "Homemade with local ale" }
    ]
  },
  social: {
    facebook: { url: "https://www.facebook.com/whitehorsewaterbeach", handle: "@whitehorsewaterbeach" },
    instagram: { url: "https://www.instagram.com/whitehorsewaterbeach", handle: "@whitehorsewaterbeach" }
  },
  booking: {
    online: true,
    walkIns: true,
    leadTimeMinutes: 15,
    partySizeLimit: 12,
    depositRequired: false,
    cancellationPolicy: "Please contact us 24 hours in advance for cancellations."
  },
  meta: {
    slug: "the-white-horse-girton",
    category: ["restaurant", "pub"],
    rating: {
      average: 4.8,
      reviewCount: 327
    }
  }
};

// Mock booking form submission
const handleBookingRequest = http.post('/api/booking', async ({ request }) => {
  const body = await request.json() as any;
  
  // Simulate validation
  if (!body.name || !body.phone) {
    return HttpResponse.json(
      { error: 'Name and phone are required' },
      { status: 400 }
    );
  }

  // Simulate successful booking
  return HttpResponse.json({
    success: true,
    message: 'Booking request received',
    bookingId: 'BOOK-' + Math.random().toString(36).substr(2, 9),
    data: body
  });
});

// Mock contact form submission
const handleContactForm = http.post('/api/contact', async ({ request }) => {
  const body = await request.json() as any;
  
  if (!body.email || !body.message) {
    return HttpResponse.json(
      { error: 'Email and message are required' },
      { status: 400 }
    );
  }

  return HttpResponse.json({
    success: true,
    message: 'Message sent successfully'
  });
});

// Mock restaurant data loading
const handleRestaurantData = http.get('/api/restaurant', () => {
  return HttpResponse.json(mockRestaurantData);
});

// Mock data loading with environment awareness
const handleDataLoad = http.get('/api/data', ({ request }) => {
  const url = new URL(request.url);
  const env = url.searchParams.get('env') || 'development';
  
  return HttpResponse.json({
    ...mockRestaurantData,
    environment: env,
    timestamp: new Date().toISOString()
  });
});

// Mock newsletter subscription
const handleNewsletterSignup = http.post('/api/newsletter', async ({ request }) => {
  const body = await request.json() as any;
  
  if (!body.email) {
    return HttpResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }

  return HttpResponse.json({
    success: true,
    message: 'Successfully subscribed to newsletter'
  });
});

// Mock Stripe webhook (for testing payment flows)
const handleStripeWebhook = http.post('/api/webhooks/stripe', async ({ request }) => {
  const signature = request.headers.get('stripe-signature');
  
  if (!signature) {
    return HttpResponse.json(
      { error: 'Missing Stripe signature' },
      { status: 400 }
    );
  }

  return HttpResponse.json({ received: true });
});

// Mock Mailgun webhook (for testing email flows)
const handleMailgunWebhook = http.post('/api/webhooks/mailgun', async ({ request }) => {
  const body = await request.json() as any;
  
  return HttpResponse.json({
    success: true,
    event: body.event || 'delivered'
  });
});

// Mock menu data with different formats
const handleMenuData = http.get('/api/menu', ({ request }) => {
  const url = new URL(request.url);
  const format = url.searchParams.get('format') || 'json';
  
  const menuData = {
    categories: [
      {
        name: "Starters",
        items: [
          { name: "Soup of the Day", price: "£5.95", description: "Ask your server for today's selection" },
          { name: "Garlic Bread", price: "£4.95", description: "With herbs and cheese" }
        ]
      },
      {
        name: "Mains", 
        items: [
          { name: "Fish & Chips", price: "£14.95", description: "Fresh cod with hand-cut chips" },
          { name: "Steak & Ale Pie", price: "£15.95", description: "Homemade with local ale" }
        ]
      }
    ]
  };
  
  if (format === 'pdf') {
    return new HttpResponse(
      new Blob(['Mock PDF content'], { type: 'application/pdf' }),
      {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="menu.pdf"'
        }
      }
    );
  }
  
  return HttpResponse.json(menuData);
});

// Error simulation handlers
const handleServerError = http.get('/api/error', () => {
  return HttpResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
});

const handleNotFound = http.get('/api/notfound', () => {
  return HttpResponse.json(
    { error: 'Resource not found' },
    { status: 404 }
  );
});

const handleUnauthorized = http.get('/api/unauthorized', () => {
  return HttpResponse.json(
    { error: 'Unauthorized access' },
    { status: 401 }
  );
});

// Rate limiting simulation
let requestCount = 0;
const handleRateLimit = http.post('/api/ratelimit', () => {
  requestCount++;
  
  if (requestCount > 5) {
    return HttpResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  return HttpResponse.json({ success: true });
});

// Network delay simulation
const handleSlowResponse = http.get('/api/slow', async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return HttpResponse.json({ data: 'Slow response' });
});

// Export all handlers
export const handlers = [
  handleBookingRequest,
  handleContactForm,
  handleRestaurantData,
  handleDataLoad,
  handleNewsletterSignup,
  handleStripeWebhook,
  handleMailgunWebhook,
  handleMenuData,
  handleServerError,
  handleNotFound,
  handleUnauthorized,
  handleRateLimit,
  handleSlowResponse,
];

// Export individual handlers for specific test needs
export {
  handleBookingRequest,
  handleContactForm,
  handleRestaurantData,
  handleDataLoad,
  handleNewsletterSignup,
  handleStripeWebhook,
  handleMailgunWebhook,
  handleMenuData,
  handleServerError,
  handleNotFound,
  handleUnauthorized,
  handleRateLimit,
  handleSlowResponse,
};

// Export mock data for direct use in tests
export { mockRestaurantData };

// Helper to reset request counters for rate limiting tests
export function resetMockState(): void {
  requestCount = 0;
}
