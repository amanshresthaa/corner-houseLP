'use client';

import RestaurantHoursCard from './RestaurantHoursCard';
import InteractiveMap from './InteractiveMap';
import SmartMapLink from './SmartMapLink';
import { getContactInfo, getRestaurantIdentity } from '@/lib/restaurantData';
import {
  ArrowUpRight,
  Bike,
  Bus,
  MapPin,
  Navigation,
  ParkingCircle,
  PhoneCall,
} from 'lucide-react';

interface TravelTip {
  icon: React.ReactNode;
  label: string;
}

const formatTelHref = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  const digits = value.replace(/[^+\d]/g, '');
  return digits ? `tel:${digits}` : undefined;
};

const buildTravelTips = (): TravelTip[] => [
  {
    icon: <Bus className="h-4 w-4" aria-hidden="true" />,
    label: 'Buses 2, 3, 11 stop within 2 min walk',
  },
  {
    icon: <ParkingCircle className="h-4 w-4" aria-hidden="true" />,
    label: 'Retail park parking & limited on-site bays',
  },
  {
    icon: <Bike className="h-4 w-4" aria-hidden="true" />,
    label: '10-min cycle from city centre riverside',
  },
];

export default function LocationSection() {
  const contact = getContactInfo();
  const identity = getRestaurantIdentity();
  const travelTips = buildTravelTips();
  const telHref = formatTelHref(contact.phone.display);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white via-neutral-50 to-brand-50 py-12 text-brand-900 sm:py-16"
      aria-labelledby="location-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(246,214,189,0.55),_transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">
            Find us
          </span>
          <h2
            id="location-heading"
            className="mt-4 text-4xl font-display font-bold text-brand-950 md:text-5xl"
          >
            Plan your visit to <span className="text-accent">{identity.displayName}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-700">
            Opposite Cambridge Retail Park on Newmarket Road—perfect for pre-match meetups, cosy suppers, or takeaway collection across the city.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="rounded-[2.5rem] border border-brand-100 bg-white/90 p-6 shadow-2xl backdrop-blur">
              <div className="space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">
                    231 Newmarket Road
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">
                    CB5 8JE
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2" data-testid="find-us-actions">
                  {telHref ? (
                    <a
                      href={telHref}
                      className="btn btn-outline border-brand-200 bg-transparent text-brand-900 shadow-lg transition hover:bg-brand-50"
                      aria-label={`Call ${identity.displayName}`}
                    >
                      <PhoneCall className="h-4 w-4" aria-hidden="true" />
                      Call us
                    </a>
                  ) : null}
                  <SmartMapLink
                    variant="outline"
                    className="bg-brand-50 shadow-lg transition hover:bg-brand-100"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    Get directions
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </SmartMapLink>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-900">
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      Address
                    </div>
                    <address className="not-italic text-sm text-brand-700">
                      {identity.displayName}
                      <br />
                      {contact.address.street}
                      <br />
                      {contact.address.area}, {contact.address.city}
                      <br />
                      {contact.address.postcode}
                    </address>
                  </div>
                  <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-900">
                      <PhoneCall className="h-4 w-4 text-accent" aria-hidden="true" />
                      Contact
                    </div>
                    <div className="space-y-2 text-sm text-brand-700">
                      {contact.phone.display ? (
                        <a
                          href={telHref}
                          className="inline-flex items-center gap-2 text-brand-900 transition hover:text-accent"
                        >
                          {contact.phone.display}
                        </a>
                      ) : null}
                      <a
                        href={`mailto:${contact.email.primary}`}
                        className="inline-flex items-center gap-2 text-brand-600 transition hover:text-brand-900"
                      >
                        {contact.email.primary}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2" data-testid="find-us-travel-tips">
                  {travelTips.map((tip, index) => (
                    <div
                      key={`tip-${index}`}
                      className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3"
                    >
                      <span className="text-brand-600" aria-hidden="true">
                        {tip.icon}
                      </span>
                      <span className="text-sm text-brand-700">{tip.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <RestaurantHoursCard
              variant="light"
              className="rounded-[1.75rem] border border-brand-100 bg-white p-4 shadow-xl backdrop-blur"
            />
          </div>

          <div>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/90 p-3 shadow-2xl">
              <div className="rounded-[2rem] border border-brand-100 bg-brand-50 p-2">
                <InteractiveMap
                  data-testid="find-us-map"
                  className="h-[480px] w-full overflow-hidden rounded-[1.75rem] border border-brand-100"
                  title={`${identity.displayName} location map`}
                />
              </div>
              <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
                <p className="font-semibold text-brand-900">Get here fast</p>
                <p>Abbey Stadium (10 min walk) • Cambridge North (12 min cycle) • A14 & city centre via Newmarket Rd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
