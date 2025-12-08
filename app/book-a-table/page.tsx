import RestaurantLayout from '@/components/restaurant/Layout';
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';
import RestaurantHoursCard from '@/components/restaurant/RestaurantHoursCard';
import Link from '@/lib/debugLink';
import BookByPhoneCard from './_components/BookByPhoneCard';
// Removed TalkToTheTeam section per request
import LargeGroupsCard from './_components/LargeGroupsCard';
import FindUsCard from './_components/FindUsCard';

const CONTACT = getContactInfo();
const SITE_URL = `https://${BRAND.domain}`;
const BOOKING_PAGE_URL = `${SITE_URL}/book-a-table`;

export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages as any)?.bookTable?.seo || {};
  return getSEOTags({
    title: seo.title,
    description: seo.description,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/book-a-table',
    openGraph: seo.openGraph,
  });
}

const reduceMotionStyles = `
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
  }
`;

// Removed legacy HoursList in favor of shared RestaurantHoursCard

export default async function BookATablePage() {
  const contact = CONTACT;
  const googleMapLink = contact.address.map.google ?? contact.address.map.embed ?? '#';
  const reservationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BRAND.fullName,
    url: BOOKING_PAGE_URL,
    telephone: contact.phone.primary,
    email: contact.email.bookings || contact.email.primary,
    acceptsReservations: contact.bookingUrl ? [contact.bookingUrl, 'Telephone'] : 'Telephone',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.address.street}, ${contact.address.area}`,
      addressLocality: contact.address.city,
      postalCode: contact.address.postcode,
      addressCountry: 'GB',
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: reduceMotionStyles }} />
      <RestaurantLayout>
        {renderSchemaTags([reservationSchema])}

        <section
          className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-stout-900 py-16 text-neutral-50"
          aria-labelledby="booking-page-heading"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay" />
          <FadeIn className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-200">
              Plan Your Visit
            </p>
            <h1
              id="booking-page-heading"
              className="mt-4 text-3xl font-display font-bold leading-tight sm:text-4xl lg:text-5xl"
            >
              Book a Table at {BRAND.fullName}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-neutral-100 sm:text-lg">
              Secure your table for authentic Nepalese dishes, pub classics, garden gatherings, and
              milestone celebrations. Book online in moments or call us and we’ll confirm your reservation during opening hours.
            </p>
            <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              {[
                'Authentic Nepalese & British pub classics',
                'Family & dog friendly spaces',
                'Opposite Cambridge Retail Park & Abbey Stadium',
                'Heated cabins, garden marquee & private hire options',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur"
                >
                  <span aria-hidden className="text-lg">
                    ✅
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <main className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Opening Hours: 12 → 6 (md) → 8 (lg) */}
            <FadeIn className="col-span-12 md:col-span-6 lg:col-span-8">
              <div className="h-full">
                <RestaurantHoursCard variant="light" className="h-full" />
              </div>
            </FadeIn>

            {/* Booking: 12 → 6 (md) → 4 (lg) */}
            <FadeIn className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="h-full">
                <BookByPhoneCard
                  telHref={contact.phone.tel}
                  displayNumber={contact.phone.display}
                  email={contact.email.bookings ?? contact.email.primary}
                  bookingUrl={contact.bookingUrl}
                />
              </div>
            </FadeIn>

            {/* Find Us: 12 → 6 (md) → 4 (lg) */}
            <FadeIn className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="h-full">
                <FindUsCard
                  addressLine={`${contact.address.street}, ${contact.address.area}, ${contact.address.postcode}`}
                  mapHref={googleMapLink}
                />
              </div>
            </FadeIn>

            {/* Contact: 12 → 6 (md) → 8 (lg) */}
            <FadeIn className="col-span-12 md:col-span-6 lg:col-span-8">
              <div className="h-full">
                <LargeGroupsCard href="/contact" />
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
            <section
              aria-labelledby="booking-tips-heading"
              className="rounded-2xl border border-brand-700/40 bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6 shadow-lg"
            >
              <h2
                id="booking-tips-heading"
                className="text-2xl font-display font-semibold text-white"
              >
                Booking Tips
              </h2>
              <ul className="mt-4 grid gap-4 text-sm text-neutral-100 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/10 px-3 py-2">
                  <span aria-hidden className="mt-1 text-white">
                    🕒
                  </span>
                  <span>
                    Lunch reservations turn quickly—let us know if you&apos;re running late so we can keep
                    your table.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/10 px-3 py-2">
                  <span aria-hidden className="mt-1 text-white">
                    🌶️
                  </span>
                  <span>
                    Mention dietary needs or spice preferences when you call and the kitchen team will tailor dishes.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/10 px-3 py-2">
                  <span aria-hidden className="mt-1 text-white">
                    🥂
                  </span>
                  <span>
                    Celebrating? We can prepare welcome drinks or reserve a cosy corner of the garden—just tell us when you call.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/10 px-3 py-2">
                  <span aria-hidden className="mt-1 text-white">
                    🪑
                  </span>
                  <span>
                    Accessibility needs or highchairs required? Mention it when you call so the team can have everything ready.
                  </span>
                </li>
              </ul>
            </section>
          </FadeIn>
        </main>
      </RestaurantLayout>
    </>
  );
}
