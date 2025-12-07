import { http, HttpResponse } from 'msw';
import { getMapLinks } from '@/lib/restaurantData';
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
      name: 'The White Horse Specialities',
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
    title: 'The White Horse Restaurant',
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
    title: 'The White Horse - Best Nepalese Restaurant',
    description: 'Experience authentic Nepalese cuisine',
  },
  buttons: {
    book: 'Book Now',
    menu: 'View Menu',
  },
};

export const mockRestaurant: Restaurant = {
  name: 'The White Horse Waterbeach',
  phone: '+44 1223 921122',
  email: 'cornerhouse@lapeninns.com',
  description: 'Historic thatched pub serving Nepalese cuisine in Waterbeach.',
  identity: {
    name: 'The White Horse Waterbeach',
    displayName: 'The White Horse Waterbeach',
    tagline: 'Historic Thatched Pub & Nepalese Restaurant',
    description: 'Authentic Nepalese cuisine and traditional British pub classics in Waterbeach.',
    established: '1840s',
    type: 'pub-restaurant',
    cuisine: ['Nepalese', 'British'],
    slug: 'the-white-horse-girton',
  },
  contact: {
    phone: {
      primary: '+44 1223 921122',
      display: '+44 1223 921122',
      tel: 'tel:+441223921122',
      whatsapp: '+44 1223 921122',
    },
    email: {
      primary: 'cornerhouse@lapeninns.com',
      bookings: 'cornerhouse@lapeninns.com',
      events: 'cornerhouse@lapeninns.com',
    },
    website: 'https://whitehorsepub.co',
    bookingUrl: 'https://whitehorsepub.co/book-a-table',
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
      url: 'https://www.facebook.com/people/The-White-Horse/61572172781807/',
      handle: '@thewhitehorsewaterbeach',
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
    slug: 'the-white-horse-girton',
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
    appName: 'The White Horse',
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
