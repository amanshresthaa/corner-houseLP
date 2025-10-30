'use client';
import RestaurantHoursCard from './RestaurantHoursCard';
import InteractiveMap from './InteractiveMap';
import { getContactInfo, getRestaurantIdentity } from '@/lib/restaurantData';
import EmojiIcon from '@/components/common/EmojiIcon';

export default function LocationSection() {
  const contact = getContactInfo();
  const identity = getRestaurantIdentity();

  return (
    <section className="bg-brand-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="location-heading" className="text-4xl md:text-5xl font-display font-bold text-foreground-strong mb-4">
            Visit <span className="text-accent">{identity.displayName}</span>
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Located in the heart of Girton village, we&apos;re easily accessible 
            and just a short drive from Cambridge city center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-neutral-50 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-display font-bold text-foreground-strong mb-4 flex items-center gap-2">
                <EmojiIcon emoji="📍" className="text-accent" />
                Address
              </h3>
              <p className="text-foreground">
                {identity.displayName}<br />
                {contact.address.street}<br />
                {contact.address.area}, {contact.address.city}<br />
                {contact.address.postcode}
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-neutral-50 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-display font-bold text-foreground-strong mb-4 flex items-center gap-2">
                <EmojiIcon emoji="📞" className="text-accent" />
                Contact
              </h3>
              <div className="space-y-2 text-foreground">
                <p>
                  <strong>Phone:</strong>
                  <a
                    href={contact.phone.tel}
                    className="text-accent hover:underline ml-2"
                    aria-label={`Call ${identity.displayName} at ${contact.phone.display}`}
                  >
                    {contact.phone.display}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>
                  <a
                    href={`mailto:${contact.email.primary}`}
                    className="text-accent hover:underline ml-2"
                  >
                    {contact.email.primary}
                  </a>
                </p>
              </div>
            </div>

            {/* Opening Hours - New Restaurant Hours Card */}
            <div className="mt-8">
              <RestaurantHoursCard />
            </div>
          </div>

          {/* Map */}
          <div>
            <InteractiveMap 
              className="h-[600px] bg-neutral-50 rounded-xl shadow-lg overflow-hidden"
              title="Old Crown Girton Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
