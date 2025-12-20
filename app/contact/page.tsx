import RestaurantLayout from '@/components/restaurant/Layout';
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import { getContactInfo, getAddress, getRestaurantIdentity } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';
import dynamic from 'next/dynamic';

const CONTACT = getContactInfo();
const ADDRESS = getAddress();
const IDENTITY = getRestaurantIdentity();
const SITE_URL = `https://${BRAND.domain}`;

const RestaurantHoursCard = dynamic(() => import('@/components/restaurant/RestaurantHoursCard'));
const InteractiveMap = dynamic(() => import('@/components/restaurant/InteractiveMap'));

const reduceMotionStyles = `
  @media (prefers-reduced-motion: reduce) {
    *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
    html:focus-within{scroll-behavior:auto!important}
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

// SEO Metadata from content.json
export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages?.contact as any)?.seo || {};
  return getSEOTags({
    title: seo.title || `Contact ${BRAND.fullName}`,
    description:
      seo.description || 'Call, email, or get directions to our art-deco pub on Newmarket Road.',
    keywords: seo.keywords,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/contact',
    openGraph: seo.openGraph,
  });
}

export default async function ContactPage() {
  const content = await getContentSmart();
  const contactContent = content.pages?.contact ?? {};
  const heroCopy = contactContent.hero ?? {};

  const phoneDisplay = CONTACT.phone.display;
  const phoneHref = CONTACT.phone.tel;
  const primaryEmail = fillBrandPlaceholders(CONTACT.email.primary);
  const bookingsEmail = fillBrandPlaceholders(CONTACT.email.bookings ?? CONTACT.email.primary);
  const mapGoogle = ADDRESS.map.google ?? '#';
  const mapApple = ADDRESS.map.apple ?? mapGoogle;

  const reservationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BRAND.fullName,
    url: `${SITE_URL}/contact`,
    telephone: phoneDisplay,
    email: bookingsEmail || primaryEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
      addressLocality: ADDRESS.city,
      postalCode: ADDRESS.postcode,
      addressCountry: 'GB',
    },
  };

  const heroBadges = [
    { label: 'Call', value: phoneDisplay },
    { label: 'Email', value: bookingsEmail || primaryEmail },
    { label: 'Find us', value: `${ADDRESS.street}, ${ADDRESS.city}` },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: reduceMotionStyles }} />
      <RestaurantLayout>
        {renderSchemaTags([reservationSchema])}

        <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]"
              aria-hidden
            />
            <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-brand-700/20 blur-3xl" aria-hidden />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <FadeIn className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80">
                Concierge desk
              </div>
              <div className="space-y-4">
                <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                  {heroCopy.title ?? `Contact ${IDENTITY.displayName}`}
                </h1>
                <p className="text-lg text-white/80 max-w-3xl mx-auto">
                  {heroCopy.subtitle ?? 'Call, email, or get directions. We respond within one working day — faster during open hours.'}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3" aria-label="Contact highlights">
                {heroBadges.map((chip) => (
                  <span
                    key={chip.label}
                    className="badge badge-outline border-white/40 bg-white/5 text-white/85"
                  >
                    {chip.label}: {chip.value}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <a
                  href={phoneHref}
                  className="btn btn-lg border-none bg-white text-brand-900 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/80"
                  aria-label={`Call ${IDENTITY.displayName} at ${phoneDisplay}`}
                  style={{ touchAction: 'manipulation' }}
                >
                  Call {phoneDisplay}
                </a>
                <a
                  href={`mailto:${primaryEmail}`}
                  className="btn btn-lg border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label={`Email ${IDENTITY.displayName}`}
                  style={{ touchAction: 'manipulation' }}
                >
                  Email our team
                </a>
                {mapGoogle && (
                  <a
                    href={mapGoogle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70"
                    aria-label={`Get directions to ${IDENTITY.displayName}`}
                    style={{ touchAction: 'manipulation' }}
                  >
                    Get directions ↗
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white via-brand-50/50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 lg:px-8">
            <FadeIn className="space-y-8">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-brand-500">Always-on support</p>
                <h2 id="contact-info-heading" className="mt-4 scroll-mt-24 font-display text-3xl font-bold text-brand-900 sm:text-4xl">Talk to the Corner House team</h2>
                <p className="mt-2 text-lg text-brand-600">Choose the quickest route — everything lands with the same concierge desk.</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2 items-start">
                {/* Card 1: Contact Routes */}
                <FadeIn className="h-full">
                  <article className="card h-full rounded-2xl border border-brand-100 bg-white shadow-xl shadow-brand-900/10">
                    <div className="card-body !p-6 sm:!p-8 space-y-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-brand-500">Contact</p>
                        <h3 className="mt-2 font-display text-2xl text-brand-900">We reply fast</h3>
                        <p className="mt-2 text-brand-700">Call for same-day answers or email for itineraries, menus, and access notes.</p>
                      </div>
                      <div className="space-y-3">
                        <a
                          href={phoneHref}
                          className="btn w-full rounded-full border-none bg-brand-900 text-white hover:bg-brand-800"
                          aria-label={`Call ${IDENTITY.displayName}`}
                          style={{ touchAction: 'manipulation' }}
                        >
                          Call {phoneDisplay}
                        </a>
                        <a
                          href={`mailto:${bookingsEmail || primaryEmail}`}
                          className="btn w-full rounded-full border border-brand-200 text-brand-900 hover:bg-white"
                          aria-label="Email the bookings team"
                        >
                          Email us
                        </a>
                      </div>
                      <div className="mt-auto rounded-xl border border-brand-100 bg-brand-50/70 p-4 text-sm text-brand-800">
                        <p className="font-semibold text-brand-900">Address</p>
                        <p className="mt-1">{ADDRESS.street}, {ADDRESS.area}, {ADDRESS.city} {ADDRESS.postcode}</p>
                        <p className="mt-2 text-xs text-brand-700">Opposite Cambridge Retail Park; step-free entry from Newmarket Road.</p>
                      </div>
                    </div>
                  </article>
                </FadeIn>

                {/* Card 2: Opening Hours */}
                <FadeIn className="h-full">
                  <article className="card h-full rounded-2xl border border-brand-100 bg-white shadow-xl shadow-brand-900/10">
                    <div className="card-body !p-6 sm:!p-8 space-y-4">
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
                      <p className="mt-auto text-sm text-brand-700">Walk-ins welcome daily; call for live wait times.</p>
                    </div>
                  </article>
                </FadeIn>

                {/* Card 3: Find Us (Full Width) */}
                <FadeIn className="lg:col-span-2">
                  <article className="card rounded-2xl border border-brand-100 bg-white shadow-xl shadow-brand-900/10">
                    <div className="card-body !p-6 sm:!p-8 space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-[0.3em] text-brand-500">Find us</p>
                          <h3 className="font-display text-2xl text-brand-900">Directions & access</h3>
                        </div>
                        <span className="self-start sm:self-center badge badge-outline border-brand-200 text-brand-700">{ADDRESS.postcode}</span>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-4">
                          <InteractiveMap
                            className="h-64 sm:h-72 rounded-2xl border border-brand-100 overflow-hidden"
                            height="100%"
                            directionLabel="Get directions"
                            hintLabel="Tap for directions"
                          />
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={mapGoogle}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm rounded-full border-none bg-brand-900 text-white hover:bg-brand-800"
                              aria-label="Open Google Maps directions (opens in new tab)"
                            >
                              Google Maps ↗
                            </a>
                            <a
                              href={mapApple}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline rounded-full border-brand-200 text-brand-900 hover:bg-white"
                              aria-label="Open Apple Maps directions (opens in new tab)"
                            >
                              Apple Maps
                            </a>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-brand-900">Access Guide</h4>
                          <ul className="space-y-3 text-sm text-brand-700">
                            <li className="flex items-start gap-3">
                              <span className="text-brand-500">🚗</span>
                              <span>Free short-stay parking available opposite the garden entrance for 2–4 hours (subject to retail park terms).</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-brand-500">🚶</span>
                              <span>10-minute walk from Abbey Stadium and local river paths. We&apos;re 2 minutes from the local Premier Inn.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-brand-500">♿</span>
                              <span>Step-free entrance and buggy space available; call ahead to reserve quiet seating or if you require specific table access.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              </div>
            </FadeIn>
          </div>
        </section>
      </RestaurantLayout>
    </>
  );
}
