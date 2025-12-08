import RestaurantLayout from '@/components/restaurant/Layout';
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';
import RestaurantHoursCard from '@/components/restaurant/RestaurantHoursCard';
import Link from '@/lib/debugLink';
import InteractiveMap from '@/components/restaurant/InteractiveMap';

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

const fillBrandPlaceholders = (value?: string | null) => {
  if (!value) return value ?? '';
  return value
    .replace(/{{brand\.domain}}/g, BRAND.domain)
    .replace(/{{brand\.supportEmail}}/g, BRAND.supportEmail)
    .replace(/{{brand\.fullName}}/g, BRAND.fullName)
    .replace(/{{brand\.shortName}}/g, BRAND.shortName);
};

export default async function BookATablePage() {
  const contact = CONTACT;
  const googleMapLink = contact.address.map.google ?? contact.address.map.embed ?? '#';
  const bookingHref = fillBrandPlaceholders(contact.bookingUrl) || '/contact#contact-info-heading';
  const bookingExternal = bookingHref.startsWith('http');
  const bookingEmail = fillBrandPlaceholders(contact.email.bookings ?? contact.email.primary);
  const primaryEmail = fillBrandPlaceholders(contact.email.primary);

  const heroBadges = ['Same-day replies', 'Heated cabins & snugs', 'Families & pups welcome'];
  const reassuranceCards = [
    {
      icon: '⚡',
      title: 'Fast confirmation',
      body: 'Replies land within one working day — faster during opening hours.',
    },
    {
      icon: '🧑‍🤝‍🧑',
      title: 'Group ready',
      body: 'Cabins for 6–10 and marquee space for gatherings; no deposit for standard tables.',
    },
    {
      icon: '🧭',
      title: 'Easy arrival',
      body: 'Opposite Abbey Stadium with step-free entry and nearby short-stay parking.',
    },
  ];

  const reservationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BRAND.fullName,
    url: BOOKING_PAGE_URL,
    telephone: contact.phone.primary,
    email: bookingEmail || primaryEmail,
    acceptsReservations: contact.bookingUrl ? [contact.bookingUrl, 'Telephone'] : 'Telephone',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.address.street}, ${contact.address.area}`,
      addressLocality: contact.address.city,
      postalCode: contact.address.postcode,
      addressCountry: 'GB',
    },
  };

  const renderBookingButton = (label: string, className: string, ariaLabel: string) => {
    if (bookingExternal) {
      return (
        <a
          key={label}
          href={bookingHref}
          className={className}
          aria-label={`${ariaLabel} (opens in new tab)`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
          <span aria-hidden className="text-xs">↗</span>
        </a>
      );
    }

    return (
      <Link key={label} href={bookingHref} className={className} aria-label={ariaLabel}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: reduceMotionStyles }} />
      <RestaurantLayout>
        {renderSchemaTags([reservationSchema])}

        <main className="bg-white text-brand-900">
          <section
            className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white"
            aria-labelledby="booking-page-hero"
          >
            <div className="absolute inset-0 opacity-40">
              <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-white/5 blur-3xl" aria-hidden />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-brand-800/50 blur-3xl" aria-hidden />
            </div>
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <FadeIn className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
                  <div className="space-y-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                      Bookings desk
                    </span>
                    <div className="space-y-4">
                      <h1 id="booking-page-hero" className="text-4xl font-display font-bold sm:text-5xl">
                        Book your table at {BRAND.fullName}
                      </h1>
                      <p className="max-w-2xl text-base text-white/80 sm:text-lg">
                        Reserve online in seconds or call the duty manager. We hold walk-in space daily and confirm requests quickly.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3" aria-label="Booking highlights">
                      {heroBadges.map((badge) => (
                        <span key={badge} className="badge badge-outline border-white/40 text-white/80">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1 sm:flex-row sm:items-center">
                      {renderBookingButton(
                        'Book online',
                        'btn rounded-full border-none bg-white text-brand-900 hover:bg-white/90',
                        'Book a table online'
                      )}
                      <a
                        href={contact.phone.tel}
                        className="btn btn-outline rounded-full border-white/40 text-white hover:bg-white/10"
                        aria-label={`Call ${contact.phone.display} to book a table`}
                        style={{ touchAction: 'manipulation' }}
                      >
                        Call {contact.phone.display}
                      </a>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {reassuranceCards.map((card) => (
                      <article
                        key={card.title}
                        className="rounded-3xl border border-white/15 bg-white/5 p-6 text-white shadow-2xl backdrop-blur"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl" aria-hidden>
                            {card.icon}
                          </span>
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                              {card.title}
                            </p>
                            <p className="mt-2 text-sm text-white/85">{card.body}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="bg-white" aria-labelledby="booking-options-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <FadeIn>
                  <article className="card h-full rounded-3xl border border-brand-100 bg-white shadow-xl shadow-brand-900/10">
                    <div className="card-body space-y-4 sm:space-y-5">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">
                          Booking routes
                        </p>
                        <h2 id="booking-options-heading" className="text-3xl font-display text-brand-900">
                          Book in seconds
                        </h2>
                        <p className="text-sm text-brand-700 sm:text-base">
                          Pick the fastest option for you — online, call, or email. We reply within one working day (faster during open hours).
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        {renderBookingButton(
                          'Book online',
                          'btn rounded-full border-none bg-brand-900 text-white hover:bg-brand-800',
                          'Book a table online'
                        )}
                        <a
                          href={contact.phone.tel}
                          className="btn btn-outline rounded-full border-brand-200 text-brand-900 hover:bg-white"
                          aria-label={`Call ${contact.phone.display} to book a table`}
                          style={{ touchAction: 'manipulation' }}
                        >
                          Call {contact.phone.display}
                        </a>
                        <a
                          href={`mailto:${bookingEmail || primaryEmail}`}
                          className="btn btn-ghost rounded-full border border-brand-100 text-brand-900 hover:bg-brand-50"
                          aria-label="Email the bookings team"
                        >
                          Email us
                        </a>
                      </div>
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                        <p className="font-semibold text-brand-800">Need help planning?</p>
                        <p className="mt-1">Share headcount, dietary notes, or access needs and we&apos;ll confirm the best space.</p>
                        <p className="mt-2 text-xs text-neutral-500">Same-day? Call for fastest response. We keep walk-in space daily.</p>
                      </div>
                    </div>
                  </article>
                </FadeIn>

                <FadeIn>
                  <div className="space-y-4">
                    <article className="card rounded-3xl border border-brand-100 bg-white shadow-lg shadow-brand-900/10">
                      <div className="card-body space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-display text-brand-900">Opening hours</h3>
                          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                            Live
                          </span>
                        </div>
                        <RestaurantHoursCard
                          variant="light"
                          className="!bg-transparent !border-none !shadow-none p-0"
                        />
                        <p className="text-sm text-brand-700">
                          Walk-ins held daily; call for live wait times or to flag accessibility needs.
                        </p>
                      </div>
                    </article>

                    <article className="card rounded-3xl border border-brand-100 bg-white shadow-lg shadow-brand-900/10">
                      <div className="card-body space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-display text-brand-900">Find us</h3>
                          <span className="badge badge-outline border-brand-200 text-brand-700">CB5 8JE</span>
                        </div>
                        <p className="text-sm text-brand-700">
                          {contact.address.street}, {contact.address.area}, {contact.address.city} {contact.address.postcode}
                        </p>
                        <InteractiveMap
                          className="h-60 sm:h-64 rounded-2xl border border-brand-100 overflow-hidden"
                          height="100%"
                          directionLabel="Get directions"
                          hintLabel="Tap for directions"
                        />
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={googleMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm rounded-full border-none bg-brand-900 text-white hover:bg-brand-800"
                            aria-label="Open Google Maps directions (opens in new tab)"
                          >
                            Google Maps ↗
                          </a>
                          <a
                            href={contact.address.map.apple ?? googleMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline rounded-full border-brand-200 text-brand-900 hover:bg-white"
                            aria-label="Open Apple Maps directions (opens in new tab)"
                          >
                            Apple Maps
                          </a>
                        </div>
                      </div>
                    </article>

                    <article className="card rounded-3xl border border-brand-100 bg-white shadow-lg shadow-brand-900/10">
                      <div className="card-body space-y-3">
                        <h3 className="text-xl font-display text-brand-900">Quick contact</h3>
                        <div className="flex flex-wrap gap-2">
                          {renderBookingButton(
                            'Book online',
                            'btn btn-sm rounded-full border-none bg-brand-900 text-white hover:bg-brand-800',
                            'Book online now'
                          )}
                          <a
                            href={contact.phone.tel}
                            className="btn btn-sm btn-outline rounded-full border-brand-200 text-brand-900 hover:bg-white"
                            aria-label={`Call ${contact.phone.display}`}
                            style={{ touchAction: 'manipulation' }}
                          >
                            Call {contact.phone.display}
                          </a>
                          <a
                            href={`mailto:${bookingEmail || primaryEmail}`}
                            className="btn btn-sm btn-ghost rounded-full border border-brand-100 text-brand-900 hover:bg-brand-50"
                            aria-label="Email the bookings team"
                          >
                            Email
                          </a>
                        </div>
                        <p className="text-sm text-brand-700">
                          Need same-day? Call for the fastest reply; we keep space across the bar, snug, and heaters.
                        </p>
                      </div>
                    </article>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        </main>
      </RestaurantLayout>
    </>
  );
}
