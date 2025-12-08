import { http, HttpResponse } from 'msw';
import { getMapLinks } from '@/lib/restaurantData';
import type { Menu, Marketing, Restaurant, AppConfig } from '@/src/lib/data/schemas';
import { BRAND } from '@/src/lib/constants/brand';

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
      name: `${BRAND.shortName} Specials`,
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
    title: BRAND.fullName,
    subtitle: 'Nepali chefs, HD sport, and heated cabins near the Abbey',
  },
  promos: [
    {
      id: 'early-bird',
      title: 'Early Bird Special',
      body: '20% off all meals before 6 PM',
    },
  ],
  seo: {
    title: `${BRAND.fullName} - Nepalese Kitchen & Sports Pub`,
    description: '1930s art-deco pub on Newmarket Road with Nepalese curries, pub classics, Sky & TNT Sports, and heated garden cabins.',
  },
  buttons: {
    book: 'Book Now',
    menu: 'View Menu',
  },
};

export const mockRestaurant: Restaurant = {
  name: BRAND.fullName,
  phone: '+44 1223 921122',
  email: BRAND.supportEmail,
  description: 'Art-deco Cambridge pub serving Nepalese cuisine, pub classics, and Sky & TNT sports.',
  identity: {
    name: BRAND.fullName,
    displayName: BRAND.fullName,
    tagline: 'Art-deco sports pub with Nepalese plates',
    description: 'Authentic Nepalese cuisine, British pub classics, and heated cabins opposite Cambridge Retail Park.',
    established: '1930s',
    type: 'pub-restaurant',
    cuisine: ['Nepalese', 'British'],
    slug: BRAND.slug,
  },
  contact: {
    phone: {
      primary: '+44 1223 921122',
      display: '+44 1223 921122',
      tel: 'tel:+441223921122',
      whatsapp: '+44 1223 921122',
    },
    email: {
      primary: BRAND.supportEmail,
      bookings: BRAND.supportEmail,
      events: BRAND.supportEmail,
    },
    website: `https://${BRAND.domain}`,
    bookingUrl: `https://${BRAND.domain}/book-a-table`,
  },
  address: {
    street: '231 Newmarket Road',
    city: 'Cambridge',
    state: 'Cambridgeshire',
    zip: 'CB5 8JE',
    area: 'Cambridge',
    postcode: 'CB5 8JE',
    country: 'United Kingdom',
    coordinates: { lat: 52.20948, lng: 0.14335 },
    map: getMapLinks(),
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
    facebook: {
      url: 'https://www.facebook.com/CornerHouseCambridge',
      handle: '@cornerhousecambridge',
      label: 'Follow us on Facebook',
    },
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
    slug: BRAND.slug,
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
    appName: BRAND.fullName,
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
