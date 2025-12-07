'use client';
import RestaurantHoursCard from './RestaurantHoursCard';
import InteractiveMap from './InteractiveMap';
import { getContactInfo, getRestaurantIdentity } from '@/lib/restaurantData';
import EmojiIcon from '@/components/common/EmojiIcon';

export default function LocationSection() {
  const contact = getContactInfo();
  const identity = getRestaurantIdentity();

  return (
    <section className="bg-brand-900 py-14 text-neutral-50 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-200/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent-100">
            Find us
          </span>
          <h2
            id="location-heading"
            className="mt-4 text-4xl font-display font-bold text-white md:text-5xl"
          >
            Visit <span className="text-accent">{identity.displayName}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-200">
            Find us on Newmarket Road in Cambridge — a quick hop from the city centre, Abbey Stadium, and retail park parking.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-12">
          {/* Contact Information */}
          <div className="space-y-7 lg:col-span-5">
            {/* Address */}
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-neutral-100 shadow-xl backdrop-blur-sm">
              <h3 className="mb-3 flex items-center gap-3 text-xl font-display font-bold text-white">
                <EmojiIcon emoji="📍" className="text-accent-100" />
                Address
              </h3>
              <address className="not-italic leading-relaxed text-neutral-300">
                {identity.displayName}
                <br />
                {contact.address.street}
                <br />
                {contact.address.area}, {contact.address.city}
                <br />
                {contact.address.postcode}
              </address>
            </div>

            {/* Contact Details */}
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-neutral-100 shadow-xl backdrop-blur-sm">
              <h3 className="mb-3 flex items-center gap-3 text-xl font-display font-bold text-white">
                <EmojiIcon emoji="📞" className="text-accent-100" />
                Contact
              </h3>
              <div className="space-y-3 text-neutral-200">
                <p className="flex items-center gap-3 text-sm sm:text-base">
                  <strong className="text-white">Phone:</strong>
                  <a
                    href={contact.phone.tel}
                    className="inline-flex items-center gap-1 text-accent-100 transition-colors hover:text-accent-50"
                    aria-label={`Call ${identity.displayName} at ${contact.phone.display}`}
                  >
                    {contact.phone.display}
                  </a>
                </p>
                <p className="flex items-center gap-3 text-sm sm:text-base">
                  <strong className="text-white">Email:</strong>
                  <a
                    href={`mailto:${contact.email.primary}`}
                    className="inline-flex items-center gap-1 text-accent-100 transition-colors hover:text-accent-50"
                  >
                    {contact.email.primary}
                  </a>
                </p>
              </div>
            </div>

            {/* Opening Hours - New Restaurant Hours Card */}
            <RestaurantHoursCard
              variant="dark"
              className="rounded-3xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-sm"
            />
          </div>

          {/* Map */}
          <div className="lg:col-span-7">
            <InteractiveMap
              className="h-[500px] rounded-3xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-sm overflow-hidden"
              title={`${identity.displayName} Location`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
