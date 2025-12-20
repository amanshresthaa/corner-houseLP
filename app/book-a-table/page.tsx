import RestaurantLayout from '@/components/restaurant/Layout';
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';
import RestaurantHoursCard from '@/components/restaurant/RestaurantHoursCard';
import Link from '@/lib/debugLink';
import InteractiveMap from '@/components/restaurant/InteractiveMap';
import dynamic from 'next/dynamic';

const SmartMapLink = dynamic(() => import('@/components/restaurant/SmartMapLink'));

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
  const bookingHref = fillBrandPlaceholders(contact.bookingUrl) || '/contact#contact-info-heading';
  const bookingExternal = bookingHref.startsWith('http');
  const bookingEmail = fillBrandPlaceholders(contact.email.bookings ?? contact.email.primary);
  const primaryEmail = fillBrandPlaceholders(contact.email.primary);

  const heroBadges = ['2 min from Premier Inn/Travelodge', 'Same-day replies', 'Families, pups & away fans welcome'];
  const reassuranceCards = [
    {
      icon: '⚡',
      title: 'Fast confirmation',
      body: 'Replies land within one working day — faster during opening hours.',
    },
    {
      icon: '🧑‍🤝‍🧑',
      title: 'Group ready',
      body: 'Covered garden tables and indoor snugs for 6–10; no deposit for standard tables.',
    },
    {
      icon: '🧭',
      title: 'Easy arrival',
      body: '2-minute walk from Premier Inn/Travelodge, 10 minutes to Abbey Stadium; step-free entry and nearby parking.',
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
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
              <FadeIn className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                      Bookings desk
                    </span>
                    <div className="space-y-3">
                      <h1 id="booking-page-hero" className="text-3xl font-display font-bold sm:text-4xl lg:text-5xl">
                        Book your table at {BRAND.fullName}
                      </h1>
                      <p className="max-w-2xl text-base text-white/80 sm:text-lg">
                        Call the duty manager or email us to book your table. We hold walk-in space daily and confirm requests quickly.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2" aria-label="Booking highlights">
                      {heroBadges.map((badge) => (
                        <span key={badge} className="badge badge-sm badge-outline border-white/40 text-white/80">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1 sm:flex-row sm:items-center">
                      <a
                        href={contact.phone.tel}
                        className="btn btn-sm sm:btn-md rounded-full border-none bg-white text-brand-900 hover:bg-white/90"
                        aria-label={`Call ${contact.phone.display} to book a table`}
                        style={{ touchAction: 'manipulation' }}
                      >
                        Call {contact.phone.display}
                      </a>
                      <a
                        href={`mailto:${bookingEmail || primaryEmail}`}
                        className="btn btn-sm sm:btn-md btn-outline rounded-full border-white/40 text-white hover:bg-white/10"
                        aria-label="Email the bookings team"
                      >
                        Email us
                      </a>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {reassuranceCards.map((card) => (
                      <article
                        key={card.title}
                        className="rounded-2xl border border-white/15 bg-white/5 p-4 text-white shadow-xl backdrop-blur sm:p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl" aria-hidden>
                            {card.icon}
                          </span>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                              {card.title}
                            </p>
                            <p className="mt-1 text-sm text-white/85">{card.body}</p>
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
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="grid gap-6 lg:grid-cols-2 items-start">
                <FadeIn className="h-full">
                  <article className="card h-full rounded-2xl border border-brand-100 bg-white shadow-xl shadow-brand-900/10">
                    <div className="card-body !p-6 sm:!p-8 space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">
                          Booking routes
                        </p>
                        <h2 id="booking-options-heading" className="text-3xl font-display text-brand-900">
                          Book in seconds
                        </h2>
                        <p className="text-sm text-brand-700 sm:text-base">
                          Call or email our team to secure your space. We reply within one working day (faster during open hours).
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href={contact.phone.tel}
                          className="btn rounded-full border-none bg-brand-900 text-white hover:bg-brand-800"
                          aria-label={`Call ${contact.phone.display} to book a table`}
                          style={{ touchAction: 'manipulation' }}
                        >
                          Call {contact.phone.display}
                        </a>
                        <a
                          href={`mailto:${bookingEmail || primaryEmail}`}
                          className="btn btn-outline rounded-full border-brand-200 text-brand-900 hover:bg-white"
                          aria-label="Email the bookings team"
                        >
                          Email us
                        </a>
                      </div>
                      <div className="mt-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                        <p className="font-semibold text-brand-800">Need help planning?</p>
                        <p className="mt-1">Share headcount, dietary notes, or access needs and we&apos;ll confirm the best space.</p>
                        <p className="mt-2 text-xs text-neutral-500">Same-day? Call for fastest response. We keep walk-in space daily.</p>
                      </div>
                    </div>
                  </article>
                </FadeIn>

                <FadeIn className="h-full">
                  <article className="card h-full rounded-2xl border border-brand-100 bg-white shadow-lg shadow-brand-900/10">
                    <div className="card-body !p-6 sm:!p-8 space-y-3">
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
                      <p className="text-sm text-brand-700 mt-auto">
                        Walk-ins held daily; call for live wait times or to flag accessibility needs.
                      </p>
                    </div>
                  </article>
                </FadeIn>

                <FadeIn className="lg:col-span-2">
                  <article className="card rounded-2xl border border-brand-100 bg-white shadow-lg shadow-brand-900/10">
                    <div className="card-body !p-6 sm:!p-8 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-display text-brand-900">Find us</h3>
                          <p className="text-sm text-brand-700 mt-1">
                            {contact.address.street}, {contact.address.area}, {contact.address.city} {contact.address.postcode}
                          </p>
                        </div>
                        <span className="self-start sm:self-center badge badge-outline border-brand-200 text-brand-700">CB5 8JE</span>
                      </div>

                      <InteractiveMap
                        className="h-64 sm:h-72 rounded-xl border border-brand-100 overflow-hidden"
                        height="100%"
                        directionLabel="Get directions"
                        hintLabel="Tap for directions"
                      />

                      <SmartMapLink
                        variant="primary"
                        size="sm"
                      />
                    </div>
                  </article>
                </FadeIn>
              </div>
            </div>
          </section>
        </main>
      </RestaurantLayout >
    </>
  );
}
