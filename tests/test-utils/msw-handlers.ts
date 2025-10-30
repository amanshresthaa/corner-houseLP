import { http, HttpResponse } from 'msw';
import type { Menu, Marketing, Restaurant, AppConfig } from '@/src/lib/data/schemas';

// Mock data builders
export const mockMenu: Menu = {
  updatedAt: '2025-08-12T00:00:00Z',
  sections: [
    {
      id: 'starters',
      name: 'Starters',
      items: [
        {
          id: 'onion-bhaji',
          name: 'Onion Bhaji',
          description: 'Crispy fried onions with spices',
          price: { amount: 4.25, currency: 'GBP' },
          available: true,
          dietary: { glutenFree: true },
          tags: [],
        },
        {
          id: 'veg-momo',
          name: 'Momo (Veg)',
          description: 'Traditional Nepalese dumplings',
          price: { amount: 6.25, currency: 'GBP' },
          available: true,
          dietary: { vegetarian: true },
          tags: ['nepalese', 'dumpling'],
        },
      ],
    },
    {
      id: 'specials',
      name: 'Old Crown Specialities',
      items: [
        {
          id: 'bhutuwa-chicken',
          name: 'Bhutuwa (Chicken)',
          description: 'Traditional Nepalese speciality',
          price: { amount: 12.0, currency: 'GBP' },
          available: true,
          dietary: { glutenFree: true },
          tags: ['nepalese'],
        },
      ],
    },
  ],
};

export const mockMarketing: Marketing = {
  hero: {
    title: 'Old Crown Restaurant',
    subtitle: 'Authentic Nepalese Cuisine',
  },
  promos: [
    {
      id: 'early-bird',
      title: 'Early Bird Special',
      body: '20% off all meals before 6 PM',
    },
  ],
  seo: {
    title: 'Old Crown - Best Nepalese Restaurant',
    description: 'Experience authentic Nepalese cuisine',
  },
  buttons: {
    book: 'Book Now',
    menu: 'View Menu',
  },
};

export const mockRestaurant: Restaurant = {
  name: 'Old Crown Girton',
  phone: '+44 1223 277217',
  email: 'oldcrown@lapeninns.com',
  description: 'Historic thatched pub serving Nepalese cuisine in Girton.',
  identity: {
    name: 'Old Crown Girton',
    displayName: 'The Old Crown Girton',
    tagline: 'Historic Thatched Pub & Nepalese Restaurant',
    description: 'Authentic Nepalese cuisine and traditional British pub classics in Girton.',
    established: '1840s',
    type: 'pub-restaurant',
    cuisine: ['Nepalese', 'British'],
    slug: 'old-crown-girton',
  },
  contact: {
    phone: {
      primary: '+44 1223 277217',
      display: '01223 277217',
      tel: 'tel:+441223277217',
      whatsapp: '+44 1223 277217',
    },
    email: {
      primary: 'oldcrown@lapeninns.com',
      bookings: 'bookings@oldcrowngirton.com',
      events: 'events@oldcrowngirton.com',
    },
    website: 'https://oldcrowngirton.com',
    bookingUrl: 'https://oldcrowngirton.com/book-a-table',
  },
  address: {
    street: '89 High Street',
    city: 'Cambridge',
    state: 'Cambridgeshire',
    zip: 'CB3 0QQ',
    area: 'Girton',
    postcode: 'CB3 0QQ',
    country: 'United Kingdom',
    coordinates: { lat: 52.2425913, lng: 0.0814946 },
    map: {
      google: 'https://www.google.com/maps/dir/?api=1&destination=52.2425913,0.0814946&travelmode=driving',
      apple: 'https://maps.apple.com/?daddr=52.2425913,0.0814946&dirflg=d',
    },
    timezone: 'Europe/London',
  },
  hours: {
    kitchen: {
      monday: '12:00-22:00',
      tuesday: '12:00-22:00',
      wednesday: '12:00-22:00',
      thursday: '12:00-22:00',
      friday: '12:00-22:30',
      saturday: '12:00-22:30',
      sunday: '12:00-21:30',
    },
    bar: {
      monday: '12:00-23:00',
      tuesday: '12:00-23:00',
      wednesday: '12:00-23:00',
      thursday: '12:00-23:00',
      friday: '12:00-23:30',
      saturday: '12:00-23:30',
      sunday: '12:00-22:30',
    },
    display: {
      kitchen: {
        weekdays: 'Mon-Thu: 12:00-22:00',
        friday: 'Fri: 12:00-22:30',
        saturday: 'Sat: 12:00-22:30',
        sunday: 'Sun: 12:00-21:30',
      },
      bar: {
        weekdays: 'Mon-Thu: 12:00-23:00',
        friday: 'Fri: 12:00-23:30',
        saturday: 'Sat: 12:00-23:30',
        sunday: 'Sun: 12:00-22:30',
      },
    },
    notes: ['Kitchen closes 30 minutes before closing time.'],
    timezone: 'Europe/London',
  },
  social: {
    facebook: { url: 'https://www.facebook.com/oldcrowngirton', handle: '@oldcrowngirton' },
    instagram: { url: 'https://www.instagram.com/oldcrowngirton', handle: '@oldcrowngirton' },
  },
  booking: {
    online: true,
    walkIns: true,
    leadTimeMinutes: 15,
    partySizeLimit: 12,
    depositRequired: false,
    cancellationPolicy: 'Please contact us 24 hours in advance for cancellations.',
  },
  meta: {
    slug: 'old-crown-girton',
    category: ['restaurant', 'pub'],
    rating: {
      average: 4.8,
      reviewCount: 327,
    },
  },
};

export const mockConfig: AppConfig = {
  env: 'app',
  featureFlags: { cms: false },
  api: {
    baseUrl: 'http://localhost:3000',
    menuEndpoint: 'http://localhost:3000/api/menu',
  },
  cms: { enabled: false },
  metadata: {
    appName: 'Old Crown',
    domainName: 'localhost',
  },
};

// MSW Handlers
export const handlers = [
  // Menu API
  http.get('/api/menu', () => HttpResponse.json(mockMenu)),
  http.get('/api/menu', () => HttpResponse.json(mockMenu, { status: 200 })),
  
  // Marketing API
  http.get('/api/marketing', () => HttpResponse.json(mockMarketing)),
  
  // Restaurant API
  http.get('/api/restaurant', () => HttpResponse.json(mockRestaurant)),
  
  // Config API
  http.get('/api/config', () => HttpResponse.json(mockConfig)),
  
  // Error scenarios
  http.get('/api/menu/error', () => HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 })),
  http.get('/api/menu/timeout', () => new Promise(() => {})), // Never resolves to simulate timeout
  http.get('/api/menu/empty', () => HttpResponse.json({ sections: [] })),
  
  // Booking endpoints
  http.post('/api/reservations', async ({ request }) => {
    const data = await request.json() as Record<string, any>;
    return HttpResponse.json({ id: 'booking-123', status: 'confirmed', ...data });
  }),
  
  // Analytics/vitals
  http.post('/api/vitals', () => HttpResponse.json({ success: true })),
  http.post('/api/analytics', () => HttpResponse.json({ success: true })),
];
