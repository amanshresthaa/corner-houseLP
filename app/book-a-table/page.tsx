import RestaurantLayout from '@/components/restaurant/Layout';
import BookingForm from '@/components/restaurant/BookingForm';
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContactInfo, getHours } from '@/lib/restaurantData';
import Link from '@/lib/debugLink';

const CONTACT = getContactInfo();

export const metadata = getSEOTags({
  title: 'Book a Table | The White Horse Waterbeach Restaurant Reservations',
  description:
    `Reserve a table at The White Horse Waterbeach in Cambridge. Submit our quick booking request form or call ${CONTACT.phone.display} for immediate assistance.`,
  canonicalUrlRelative: '/book-a-table',
  openGraph: {
    title: 'Book a Table at The White Horse Waterbeach',
    description:
      `Request a reservation at The White Horse Waterbeach. Confirmations within an hour during opening times or call ${CONTACT.phone.display} for urgent enquiries.`,
    url: 'https://whitehorsepub.co/book-a-table',
  },
});

const reduceMotionStyles = `
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
  }
`;

function HoursList() {
  const hours = getHours();
  const kitchen = hours?.display?.kitchen || {};
  const bar = hours?.display?.bar || {};

  const kitchenEntries = Object.values(kitchen).filter(
    (line): line is string => typeof line === 'string' && line.length > 0,
  );
  const barEntries = Object.values(bar).filter(
    (line): line is string => typeof line === 'string' && line.length > 0,
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-600">Kitchen</h3>
        <ul className="mt-2 space-y-1 text-sm text-neutral-600">
          {kitchenEntries.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-600">Bar</h3>
        <ul className="mt-2 space-y-1 text-sm text-neutral-600">
          {barEntries.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function BookATablePage() {
  const contact = CONTACT;
  const googleMapLink = contact.address.map.google ?? contact.address.map.embed ?? '#';
  const reservationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'The White Horse Waterbeach',
    url: 'https://whitehorsepub.co/book-a-table',
    telephone: contact.phone.primary,
    email: contact.email.bookings || contact.email.primary,
    acceptsReservations: true,
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://whitehorsepub.co/book-a-table',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: 'Table Reservation',
      },
    },
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
              Book a Table at The White Horse Waterbeach
            </h1>
            <p className="mt-4 max-w-3xl text-base text-neutral-100 sm:text-lg">
              Secure your table for authentic Nepalese dishes, Sunday roasts, garden gatherings, and
              milestone celebrations. Submit the quick form below and our team will confirm within
              an hour during opening times.
            </p>
            <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              {[
                'Authentic Nepalese & British pub classics',
                'Family & dog friendly spaces',
                'Free on-site parking in Waterbeach',
                'Garden, marquee & private hire options',
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
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-8">
            <FadeIn className="lg:col-span-1">
              <div className="card border border-neutral-100 bg-white shadow-xl shadow-brand-900/10">
                <div className="card-body space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-brand-800">
                      Online Booking Request
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                      Tell us when you&apos;d like to visit. We confirm bookings within an hour
                      during opening times, or first thing next day if you submit late at night.
                    </p>
                  </div>

                  <BookingForm showInlineSuccess />

                  <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                    <p>
                      Need to amend or cancel a reservation? Email{' '}
                      <a
                        href={`mailto:${contact.email.bookings ?? contact.email.primary}`}
                        className="font-semibold text-brand-700 underline-offset-2 hover:underline"
                      >
                        {contact.email.bookings ?? contact.email.primary}
                      </a>{' '}
                      or call{' '}
                      <a
                      href={contact.phone.tel}
                        className="font-semibold text-brand-700 underline-offset-2 hover:underline"
                      >
                        {contact.phone.display}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn>
                <div className="card border border-neutral-100 bg-white shadow-lg">
                  <div className="card-body space-y-2">
                    <h3 className="text-lg font-semibold text-brand-800">Talk to the Team</h3>
                    <p className="text-sm text-neutral-600">
                      Prefer to speak to someone? Call or WhatsApp and we&apos;ll look after the
                      details.
                    </p>
                      <a
                      href={contact.phone.tel}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      📞 {contact.phone.display}
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="card border border-neutral-100 bg-white shadow-lg">
                  <div className="card-body space-y-4">
                    <h3 className="text-lg font-semibold text-brand-800">Opening Hours</h3>
                    <HoursList />
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="card border border-neutral-100 bg-white shadow-lg">
                  <div className="card-body space-y-3">
                    <h3 className="text-lg font-semibold text-brand-800">Large Groups & Events</h3>
                    <p className="text-sm text-neutral-600">
                      Planning a celebration, corporate dinner, or club gathering? Our garden
                      marquee and private areas host up to 120 guests.
                    </p>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                    >
                      Explore Private Hire Options →
                    </Link>
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="card border border-neutral-100 bg-white shadow-lg">
                  <div className="card-body space-y-2">
                    <h3 className="text-lg font-semibold text-brand-800">Find Us</h3>
                    <p className="text-sm text-neutral-600">
                      {`${contact.address.street}, ${contact.address.area}, ${contact.address.postcode}`}
                    </p>
                    <Link
                      href={googleMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                    >
                      View directions on Google Maps ↗
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
            <section aria-labelledby="booking-tips-heading" className="rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <h2 id="booking-tips-heading" className="text-2xl font-display font-semibold text-brand-800">
                Booking Tips
              </h2>
              <ul className="mt-4 grid gap-4 text-sm text-neutral-600 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-lg bg-neutral-100/70 px-3 py-2">
                  <span aria-hidden className="mt-1 text-brand-600">
                    🕒
                  </span>
                  <span>
                    Lunch reservations turn quickly—let us know if you&apos;re running late so we can keep
                    your table.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-neutral-100/70 px-3 py-2">
                  <span aria-hidden className="mt-1 text-brand-600">
                    🌶️
                  </span>
                  <span>
                    Mention dietary needs or spice preferences in &ldquo;Special Requests&rdquo; and the kitchen
                    team will tailor dishes.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-neutral-100/70 px-3 py-2">
                  <span aria-hidden className="mt-1 text-brand-600">
                    🥂
                  </span>
                  <span>
                    Celebrating? We can prepare welcome drinks or reserve a cosy corner of the garden—just tell us.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-neutral-100/70 px-3 py-2">
                  <span aria-hidden className="mt-1 text-brand-600">
                    🪑
                  </span>
                  <span>
                    Accessibility needs or highchairs required? Note it in the form so the team can have everything ready.
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
