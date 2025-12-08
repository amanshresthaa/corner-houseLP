'use client';

import RestaurantHoursCard from './RestaurantHoursCard';
import InteractiveMap from './InteractiveMap';
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
  const googleMapsUrl = contact.address.map?.google;
  const appleMapsUrl = contact.address.map?.apple;

  return (
    <section
      className="relative overflow-hidden bg-brand-950 py-12 text-neutral-50 sm:py-16"
      aria-labelledby="location-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,233,212,0.12),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/30 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-100">
            Find us
          </span>
          <h2
            id="location-heading"
            className="mt-4 text-4xl font-display font-bold text-white md:text-5xl"
          >
            Plan your visit to <span className="text-accent">{identity.displayName}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-200">
            Opposite Cambridge Retail Park on Newmarket Road—perfect for pre-match meetups, cosy suppers, or takeaway collection across the city.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-100">
                    231 Newmarket Road
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-100">
                    CB5 8JE
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2" data-testid="find-us-actions">
                  {telHref ? (
                    <a
                      href={telHref}
                      className="btn btn-outline border-white/30 bg-transparent text-white shadow-lg transition hover:bg-white/10"
                      aria-label={`Call ${identity.displayName}`}
                    >
                      <PhoneCall className="h-4 w-4" aria-hidden="true" />
                      Call us
                    </a>
                  ) : null}
                  {googleMapsUrl ? (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn border-brand-100 bg-brand-100/10 text-white shadow-lg transition hover:bg-brand-100/20"
                    >
                      <Navigation className="h-4 w-4" aria-hidden="true" />
                      Google Maps
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                  {appleMapsUrl ? (
                    <a
                      href={appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn border-white/20 bg-white/5 text-white shadow-lg transition hover:bg-white/15"
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      Apple Maps
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                      Address
                    </div>
                    <address className="not-italic text-sm text-neutral-200">
                      {identity.displayName}
                      <br />
                      {contact.address.street}
                      <br />
                      {contact.address.area}, {contact.address.city}
                      <br />
                      {contact.address.postcode}
                    </address>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <PhoneCall className="h-4 w-4 text-accent" aria-hidden="true" />
                      Contact
                    </div>
                    <div className="space-y-2 text-sm text-neutral-200">
                      {contact.phone.display ? (
                        <a
                          href={telHref}
                          className="inline-flex items-center gap-2 text-white transition hover:text-accent"
                        >
                          {contact.phone.display}
                        </a>
                      ) : null}
                      <a
                        href={`mailto:${contact.email.primary}`}
                        className="inline-flex items-center gap-2 text-white/80 transition hover:text-white"
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
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-brand-900/40 px-4 py-3"
                    >
                      <span className="text-brand-50" aria-hidden="true">
                        {tip.icon}
                      </span>
                      <span className="text-sm text-neutral-200">{tip.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <RestaurantHoursCard
              variant="dark"
              className="rounded-[1.75rem] border border-white/10 bg-brand-900/40 p-4 shadow-xl backdrop-blur"
            />
          </div>

          <div>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
              <div className="rounded-[2rem] border border-white/10 bg-black/20 p-2">
                <InteractiveMap
                  data-testid="find-us-map"
                  className="h-[480px] w-full overflow-hidden rounded-[1.75rem] border border-white/5"
                  title={`${identity.displayName} location map`}
                />
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-neutral-200">
                <p className="font-semibold text-white">Get here fast</p>
                <p>Abbey Stadium (10 min walk) • Cambridge North (12 min cycle) • A14 & city centre via Newmarket Rd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
