import rawRestaurant from '../config/restaurant.json';
import { RestaurantSchema, type Restaurant } from '@/src/lib/data/schemas';

type DetailedHours = {
  kitchen: Record<string, string>;
  bar: Record<string, string>;
  display: {
    kitchen: Record<string, string>;
    bar: Record<string, string>;
  };
  notes?: string[];
  timezone?: string;
};

interface NormalizedAddress {
  street: string;
  area: string;
  city: string;
  state: string;
  postcode: string;
  zip: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  map: {
    google?: string;
    apple?: string;
    waze?: string;
    embed?: string;
    placeId?: string;
  };
  timezone?: string;
}

interface NormalizedIdentity {
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  established?: string;
  type?: string;
  cuisine: string[];
  slug?: string;
}

interface NormalizedContact {
  phone: {
    primary: string;
    display: string;
    tel: string;
    whatsapp?: string;
    reservations?: string | null;
  };
  email: {
    primary: string;
    bookings?: string;
    events?: string;
    press?: string | null;
    support?: string | null;
  };
  website?: string;
  bookingUrl?: string;
  orderUrl?: string;
  enquiryUrl?: string;
  address: NormalizedAddress;
}

type SocialCollection = Record<string, { url?: string; handle?: string; label?: string }>;

interface NormalizedRestaurant extends Restaurant {
  identity: NormalizedIdentity;
  contact: NormalizedContact;
  address: NormalizedAddress;
  hours: DetailedHours;
  social: SocialCollection;
  booking: NonNullable<Restaurant['booking']> & {
    online?: boolean;
    walkIns?: boolean;
    leadTimeMinutes?: number;
    partySizeLimit?: number;
    depositRequired?: boolean;
    cancellationPolicy?: string;
  };
  meta: NonNullable<Restaurant['meta']>;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  order?: number;
  subcategories?: MenuSubcategory[];
}

export interface MenuSubcategory {
  id: string;
  name: string;
  order?: number;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: {
    amount: number;
    display: string;
  };
  dietary?: string[];
  spice_level?: number;
  image?: string;
  available?: boolean;
  popular?: boolean;
  prep_time?: string;
}

const FALLBACK_IDENTITY: NormalizedIdentity = {
  name: 'Old Crown Girton',
  displayName: 'Old Crown Girton',
  tagline: 'Historic Thatched Pub & Nepalese Restaurant',
  description: 'Authentic Nepalese cuisine and traditional British pub classics served in Girton\'s historic thatched inn.',
  established: '1840s',
  type: 'pub-restaurant',
  cuisine: ['Nepalese', 'British', 'Pub Food'],
  slug: 'old-crown-girton',
};

const FALLBACK_ADDRESS: NormalizedAddress = {
  street: '89 High Street',
  area: 'Girton',
  city: 'Cambridge',
  state: 'Cambridgeshire',
  postcode: 'CB3 0QQ',
  zip: 'CB3 0QQ',
  country: 'United Kingdom',
  coordinates: {
    lat: 52.2425913,
    lng: 0.0814946,
  },
  map: {
    google: 'https://www.google.com/maps/dir/?api=1&destination=52.2425913,0.0814946&travelmode=driving',
    apple: 'https://maps.apple.com/?daddr=52.2425913,0.0814946&dirflg=d',
    embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.713554807221!2d0.0790434!3d52.2422262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8707f0f84f5af%3A0x9c66cf5437f52b1!2sThe%20Old%20Crown%20Girton!5e0!3m2!1sen!2suk!4v1709302800000!5m2!1sen!2suk',
  },
  timezone: 'Europe/London',
};

const FALLBACK_CONTACT_BASE = {
  phone: {
    primary: '+44 1223 277217',
    display: '01223 277217',
    whatsapp: '+44 1223 277217',
  },
  email: {
    primary: 'oldcrown@lapeninns.com',
    bookings: 'bookings@oldcrowngirton.com',
    events: 'events@oldcrowngirton.com',
    press: 'press@oldcrowngirton.com',
    support: 'support@oldcrowngirton.com',
  },
  website: 'https://oldcrowngirton.com',
  bookingUrl: 'https://oldcrowngirton.com/book-a-table',
  orderUrl: 'https://oldcrowngirton.com/takeaway-menu',
  enquiryUrl: 'mailto:oldcrown@lapeninns.com',
};

const FALLBACK_HOURS: DetailedHours = {
  kitchen: {
    monday: '12:00-15:00,17:00-22:00',
    tuesday: '12:00-15:00,17:00-21:00',
    wednesday: '12:00-15:00,17:00-22:00',
    thursday: '12:00-15:00,17:00-22:00',
    friday: '12:00-15:00,17:00-22:00',
    saturday: '12:00-22:00',
    sunday: '12:00-21:00',
  },
  bar: {
    monday: '12:00-22:00',
    tuesday: '12:00-22:00',
    wednesday: '12:00-22:00',
    thursday: '12:00-22:00',
    friday: '12:00-23:00',
    saturday: '12:00-23:00',
    sunday: '12:00-22:00',
  },
  display: {
    kitchen: {
      weekdays: 'Mon-Thu: 12:00-15:00 & 17:00-22:00',
      friday: 'Fri: 12:00-15:00 & 17:00-22:00',
      saturday: 'Sat: 12:00-22:00',
      sunday: 'Sun: 12:00-21:00',
    },
    bar: {
      weekdays: 'Mon-Thu: 12:00-22:00',
      friday: 'Fri: 12:00-23:00',
      saturday: 'Sat: 12:00-23:00',
      sunday: 'Sun: 12:00-22:00',
    },
  },
  notes: [
    'Kitchen closes 30 minutes before listed times.',
    'Bank holiday hours may differ.',
  ],
  timezone: 'Europe/London',
};

const FALLBACK_SOCIAL: SocialCollection = {
  facebook: { url: 'https://www.facebook.com/oldcrowngirton', handle: '@oldcrowngirton' },
  instagram: { url: 'https://www.instagram.com/oldcrowngirton', handle: '@oldcrowngirton' },
  twitter: { url: 'https://twitter.com/oldcrowngirton', handle: '@oldcrowngirton' },
};

const FALLBACK_BOOKING = {
  online: true,
  walkIns: true,
  leadTimeMinutes: 15,
  partySizeLimit: 12,
  depositRequired: false,
  cancellationPolicy: 'Please contact the restaurant for cancellation requests or changes.',
};

const FALLBACK_META = {
  slug: FALLBACK_IDENTITY.slug,
  category: ['restaurant', 'pub'],
  rating: {
    average: 4.8,
    reviewCount: 327,
  },
};

const restaurantData: NormalizedRestaurant = (() => {
  const parsed = RestaurantSchema.safeParse(rawRestaurant);
  const base: Restaurant = parsed.success
    ? parsed.data
    : ({
        name: FALLBACK_IDENTITY.name,
        phone: FALLBACK_CONTACT_BASE.phone.primary,
        email: FALLBACK_CONTACT_BASE.email.primary,
        address: {
          street: FALLBACK_ADDRESS.street,
          city: FALLBACK_ADDRESS.city,
          state: FALLBACK_ADDRESS.state,
          zip: FALLBACK_ADDRESS.zip,
        },
        hours: FALLBACK_HOURS,
        description: FALLBACK_IDENTITY.description,
      } as unknown as Restaurant);
  return normalizeRestaurant(base);
})();

function normalizeRestaurant(data: Restaurant): NormalizedRestaurant {
  const address = normalizeAddress(data.address);
  const identity = normalizeIdentity(data.identity, data.name ?? FALLBACK_IDENTITY.name, data.description);
  const contact = normalizeContact(data.contact, data.phone, data.email, address);
  const hours = normalizeHours(data.hours);
  const social = normalizeSocial(data.social);
  const booking = normalizeBooking(data.booking);
  const meta = normalizeMeta(data.meta, identity);

  return {
    ...data,
    name: identity.name,
    phone: contact.phone.primary,
    email: contact.email.primary,
    identity,
    contact,
    address,
    hours,
    social,
    booking,
    meta,
  };
}

function normalizeAddress(address: Restaurant['address'] | undefined): NormalizedAddress {
  if (!address) {
    return {
      ...FALLBACK_ADDRESS,
      coordinates: { ...FALLBACK_ADDRESS.coordinates },
      map: { ...FALLBACK_ADDRESS.map },
    };
  }

  const area = (address as any).area ?? FALLBACK_ADDRESS.area;
  const postcode = (address as any).postcode ?? address.zip ?? FALLBACK_ADDRESS.postcode;
  const zip = address.zip ?? (address as any).postcode ?? FALLBACK_ADDRESS.zip;
  const country = (address as any).country ?? FALLBACK_ADDRESS.country;
  const coordinates = (address as any).coordinates ?? FALLBACK_ADDRESS.coordinates;
  const map = {
    ...FALLBACK_ADDRESS.map,
    ...(address as any).map,
  };
  const timezone = (address as any).timezone ?? FALLBACK_ADDRESS.timezone;

  return {
    street: address.street ?? FALLBACK_ADDRESS.street,
    area,
    city: address.city ?? FALLBACK_ADDRESS.city,
    state: address.state ?? FALLBACK_ADDRESS.state,
    postcode,
    zip,
    country,
    coordinates,
    map,
    timezone,
  };
}

function normalizeIdentity(
  identity: Restaurant['identity'] | undefined,
  fallbackName: string,
  fallbackDescription?: string,
): NormalizedIdentity {
  if (!identity) {
    return { ...FALLBACK_IDENTITY, name: fallbackName, displayName: fallbackName };
  }

  return {
    name: identity.name ?? fallbackName,
    displayName: identity.displayName ?? identity.name ?? fallbackName,
    tagline: identity.tagline ?? FALLBACK_IDENTITY.tagline,
    description: identity.description ?? fallbackDescription ?? FALLBACK_IDENTITY.description,
    established: identity.established ?? FALLBACK_IDENTITY.established,
    type: identity.type ?? FALLBACK_IDENTITY.type,
    cuisine: identity.cuisine ?? FALLBACK_IDENTITY.cuisine,
    slug: identity.slug ?? FALLBACK_IDENTITY.slug,
  };
}

function normalizeContact(
  contact: Restaurant['contact'] | undefined,
  fallbackPhone: string | undefined,
  fallbackEmail: string | undefined,
  address: NormalizedAddress,
): NormalizedContact {
  const primaryPhone = contact?.phone?.primary ?? fallbackPhone ?? FALLBACK_CONTACT_BASE.phone.primary;
  const displayPhone = contact?.phone?.display ?? FALLBACK_CONTACT_BASE.phone.display ?? primaryPhone;
  const tel = contact?.phone?.tel ?? sanitizeTel(primaryPhone);

  const primaryEmail = contact?.email?.primary ?? fallbackEmail ?? FALLBACK_CONTACT_BASE.email.primary;
  const bookingsEmail =
    contact?.email?.bookings ?? contact?.email?.primary ?? FALLBACK_CONTACT_BASE.email.bookings ?? primaryEmail;
  const eventsEmail =
    contact?.email?.events ?? FALLBACK_CONTACT_BASE.email.events ?? contact?.email?.primary ?? primaryEmail;
  const pressEmail = contact?.email?.press ?? FALLBACK_CONTACT_BASE.email.press ?? null;
  const supportEmail = contact?.email?.support ?? FALLBACK_CONTACT_BASE.email.support ?? null;

  return {
    phone: {
      primary: primaryPhone,
      display: displayPhone,
      tel,
      whatsapp: contact?.phone?.whatsapp ?? FALLBACK_CONTACT_BASE.phone.whatsapp,
      reservations: contact?.phone?.reservations ?? null,
    },
    email: {
      primary: primaryEmail,
      bookings: bookingsEmail,
      events: eventsEmail,
      press: pressEmail,
      support: supportEmail,
    },
    website: contact?.website ?? FALLBACK_CONTACT_BASE.website,
    bookingUrl: contact?.bookingUrl ?? FALLBACK_CONTACT_BASE.bookingUrl,
    orderUrl: contact?.orderUrl ?? FALLBACK_CONTACT_BASE.orderUrl,
    enquiryUrl: contact?.enquiryUrl ?? FALLBACK_CONTACT_BASE.enquiryUrl ?? `mailto:${primaryEmail}`,
    address,
  };
}

function normalizeHours(hours: Restaurant['hours'] | undefined): DetailedHours {
  if (isDetailedHours(hours)) {
    const kitchen = { ...FALLBACK_HOURS.kitchen, ...hours.kitchen };
    const bar = { ...FALLBACK_HOURS.bar, ...hours.bar };
    const display = {
      kitchen: hours.display?.kitchen ?? buildKitchenDisplay(kitchen),
      bar: hours.display?.bar ?? buildBarDisplay(bar),
    };
    return {
      kitchen,
      bar,
      display,
      notes: hours.notes ?? FALLBACK_HOURS.notes,
      timezone: hours.timezone ?? FALLBACK_HOURS.timezone,
    };
  }

  if (isRecordHours(hours)) {
    const kitchen = { ...FALLBACK_HOURS.kitchen, ...hours };
    const bar = { ...FALLBACK_HOURS.bar, ...hours };
    return {
      kitchen,
      bar,
      display: {
        kitchen: buildKitchenDisplay(kitchen),
        bar: buildBarDisplay(bar),
      },
      notes: FALLBACK_HOURS.notes,
      timezone: FALLBACK_HOURS.timezone,
    };
  }

  return {
    kitchen: { ...FALLBACK_HOURS.kitchen },
    bar: { ...FALLBACK_HOURS.bar },
    display: {
      kitchen: { ...FALLBACK_HOURS.display.kitchen },
      bar: { ...FALLBACK_HOURS.display.bar },
    },
    notes: FALLBACK_HOURS.notes,
    timezone: FALLBACK_HOURS.timezone,
  };
}

function normalizeSocial(social: Restaurant['social'] | undefined): SocialCollection {
  const merged: SocialCollection = {};
  for (const [key, value] of Object.entries(FALLBACK_SOCIAL)) {
    merged[key] = { ...value };
  }

  if (social) {
    for (const [key, value] of Object.entries(social)) {
      merged[key] = { ...merged[key], ...value };
    }
  }

  return merged;
}

function normalizeBooking(booking: Restaurant['booking'] | undefined) {
  return {
    online: booking?.online ?? FALLBACK_BOOKING.online,
    walkIns: booking?.walkIns ?? FALLBACK_BOOKING.walkIns,
    leadTimeMinutes: booking?.leadTimeMinutes ?? FALLBACK_BOOKING.leadTimeMinutes,
    partySizeLimit: booking?.partySizeLimit ?? FALLBACK_BOOKING.partySizeLimit,
    depositRequired: booking?.depositRequired ?? FALLBACK_BOOKING.depositRequired,
    cancellationPolicy: booking?.cancellationPolicy ?? FALLBACK_BOOKING.cancellationPolicy,
  };
}

function normalizeMeta(meta: Restaurant['meta'] | undefined, identity: NormalizedIdentity) {
  return {
    slug: meta?.slug ?? identity.slug ?? FALLBACK_META.slug,
    category: meta?.category ?? FALLBACK_META.category,
    rating: {
      average: meta?.rating?.average ?? FALLBACK_META.rating.average,
      reviewCount: meta?.rating?.reviewCount ?? FALLBACK_META.rating.reviewCount,
    },
  };
}

function isDetailedHours(
  hours: Restaurant['hours'],
): hours is {
  kitchen: Record<string, string>;
  bar: Record<string, string>;
  display?: { kitchen?: Record<string, string>; bar?: Record<string, string> };
  notes?: string[];
  timezone?: string;
} {
  return Boolean(hours && typeof hours === 'object' && 'kitchen' in hours && 'bar' in hours);
}

function isRecordHours(hours: Restaurant['hours']): hours is Record<string, string> {
  return Boolean(hours && !Array.isArray(hours) && typeof hours === 'object' && !('kitchen' in hours));
}

function buildKitchenDisplay(hours: Record<string, string>) {
  return {
    weekdays: generateDisplayHours(hours, ['monday', 'tuesday', 'wednesday', 'thursday']),
    friday: generateDisplayHours(hours, ['friday']),
    saturday: generateDisplayHours(hours, ['saturday']),
    sunday: generateDisplayHours(hours, ['sunday']),
  };
}

function buildBarDisplay(hours: Record<string, string>) {
  return {
    weekdays: generateDisplayHours(hours, ['monday', 'tuesday', 'wednesday', 'thursday']),
    friday: generateDisplayHours(hours, ['friday']),
    saturday: generateDisplayHours(hours, ['saturday']),
    sunday: generateDisplayHours(hours, ['sunday']),
  };
}

function generateDisplayHours(hoursData: Record<string, string>, days: string[]): string {
  if (days.length === 0) return '';

  const dayHours = days.map((day) => hoursData[day]).filter(Boolean);
  if (dayHours.length === 0) return 'Closed';

  const firstHours = dayHours[0];
  const allSame = dayHours.every((hours) => hours === firstHours);

  const dayAbbrevs: Record<string, string> = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  };

  if (allSame) {
    const dayNames = days.map((day) => dayAbbrevs[day] ?? day);
    const rangeStr = dayNames.length > 1 ? `${dayNames[0]}-${dayNames[dayNames.length - 1]}` : dayNames[0];
    return `${rangeStr}: ${firstHours.replace(',', ', ')}`;
  }

  const leadingDay = dayAbbrevs[days[0]] ?? days[0];
  return `${leadingDay}: ${firstHours.replace(',', ', ')}`;
}

function sanitizeTel(value: string) {
  return `tel:${value.replace(/[^+\d]/g, '')}`;
}

function cloneAddress(address: NormalizedAddress): NormalizedAddress {
  return {
    ...address,
    coordinates: { ...address.coordinates },
    map: { ...address.map },
  };
}

function cloneHours(hours: DetailedHours): DetailedHours {
  return {
    kitchen: { ...hours.kitchen },
    bar: { ...hours.bar },
    display: {
      kitchen: { ...hours.display.kitchen },
      bar: { ...hours.display.bar },
    },
    notes: hours.notes ? [...hours.notes] : undefined,
    timezone: hours.timezone,
  };
}

export const getRestaurant = (): NormalizedRestaurant => ({
  ...restaurantData,
  identity: { ...restaurantData.identity, cuisine: [...restaurantData.identity.cuisine] },
  contact: {
    ...restaurantData.contact,
    phone: { ...restaurantData.contact.phone },
    email: { ...restaurantData.contact.email },
    address: cloneAddress(restaurantData.address),
  },
  address: cloneAddress(restaurantData.address),
  hours: cloneHours(restaurantData.hours),
  social: Object.fromEntries(
    Object.entries(restaurantData.social).map(([key, value]) => [key, { ...value }]),
  ),
  booking: { ...restaurantData.booking },
  meta: {
    slug: restaurantData.meta.slug,
    category: restaurantData.meta.category ? [...restaurantData.meta.category] : undefined,
    rating: restaurantData.meta.rating ? { ...restaurantData.meta.rating } : undefined,
  },
});

export const getRestaurantIdentity = (): NormalizedIdentity => ({
  ...restaurantData.identity,
  cuisine: [...restaurantData.identity.cuisine],
});

export const getContactInfo = (): NormalizedContact => ({
  ...restaurantData.contact,
  phone: { ...restaurantData.contact.phone },
  email: { ...restaurantData.contact.email },
  address: cloneAddress(restaurantData.contact.address),
});

export const getAddress = (): NormalizedAddress => cloneAddress(restaurantData.address);

export const getHours = (): DetailedHours => cloneHours(restaurantData.hours);

export const getSocialMedia = (): SocialCollection =>
  Object.fromEntries(Object.entries(restaurantData.social).map(([key, value]) => [key, { ...value }]));

export const getBookingDetails = () => ({ ...restaurantData.booking });

export const getRestaurantMeta = () => ({
  ...restaurantData.meta,
  category: restaurantData.meta.category ? [...restaurantData.meta.category] : undefined,
  rating: restaurantData.meta.rating ? { ...restaurantData.meta.rating } : undefined,
});

export const getMenu = () => ({
  metadata: {
    last_updated: new Date().toISOString(),
    version: '1.0.0',
    currency: 'GBP',
    currency_symbol: '£',
    allergen_info: 'Please inform us of any allergies before ordering.',
    disclaimer: 'Cross-contamination is possible despite care.',
    notes: ['All dishes are prepared fresh to order'],
    dietary_legend: { veg: 'Vegetarian', GF: 'Gluten Free' },
  },
  categories: [] as MenuCategory[],
});

export const getMenuCategories = (): MenuCategory[] => [];
export const getTestimonials = (): any[] => [];
export const getEvents = (): any[] => [];
export const getGallery = (): any => ({
  hero: { main: { src: '', alt: '', caption: '' }, secondary: [] },
  categories: { dishes: [], restaurant: [], events: [] },
});

export const getSEO = () => ({
  title: `${restaurantData.identity.displayName} | ${restaurantData.identity.tagline}`,
  description: restaurantData.identity.description,
  keywords: restaurantData.identity.cuisine,
  og: {
    title: restaurantData.identity.displayName,
    description: restaurantData.identity.description,
    image: '',
    url: FALLBACK_CONTACT_BASE.website,
  },
  schema: {},
});

export const getDeliveryInfo = () => ({
  available: false,
  radius_miles: 0,
  minimum_order: { amount: 0, display: '£0.00' },
  delivery_fee: { amount: 0, display: '£0.00' },
  free_delivery_threshold: { amount: 0, display: '£0.00' },
  estimated_time: '',
  partners: [] as string[],
  coverage_areas: [] as string[],
});

export const getFeatures = () => ({
  services: {},
  dining: {},
  accessibility: {},
  amenities: {},
  payment_methods: ['Cash', 'Card'],
});
