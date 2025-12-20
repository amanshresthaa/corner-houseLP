import RestaurantLayout from "@/components/restaurant/Layout";
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import Link from '@/lib/debugLink';
// PressFeatureBanner removed to keep page focused on essential, verified information
import { getContactInfo, getAddress, getPostalAddressSchema, getRestaurantIdentity } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';

const SITE_URL = `https://${BRAND.domain}`;
const PAGE_URL = `${SITE_URL}/press`;

const CONTACT = getContactInfo();
const ADDRESS = getAddress();
const POSTAL_ADDRESS = getPostalAddressSchema();
const IDENTITY = getRestaurantIdentity();
// Concise quick facts derived from the authoritative Markdown dossier, now using centralized data
const PRESS_FACTS = [
  `Address: ${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.city} ${ADDRESS.postcode}`,
  `Phone: ${CONTACT.phone.display} • Email: ${CONTACT.email.primary}`,
  "Ownership: Lapen Inns Hospitality (since 2024 relaunch)",
  "Hybrid: Art-deco sports pub with Nepalese kitchen, covered garden projector, and HD matchday screens",
  "Awards: TripAdvisor Travelers' Choice 2025 • CAMRA Most Improved City Pub 2020",
  "Amenities: Sky & TNT Sports, outdoor projector, family & dog friendly, shuffleboard, takeaway & delivery",
];
const MEDIA_CONTACT = {
  email: CONTACT.email.press || CONTACT.email.primary,
  phoneDisplay: CONTACT.phone.display,
  phoneTel: CONTACT.phone.tel,
  address: `${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.city}, ${ADDRESS.postcode}`,
};


export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages as any)?.press?.seo || {};
  return getSEOTags({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/press',
    openGraph: seo.openGraph,
  });
}

export default async function PressPage() {
  const content = await getContentSmart();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (prefers-reduced-motion: reduce) {
          *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
          html:focus-within{scroll-behavior:auto!important}
        }
      ` }} />
      <RestaurantLayout>
        {renderSchemaTags([
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${PAGE_URL}#webpage`,
            "name": `Press Kit - ${IDENTITY.displayName}`,
            "description": `Official press information, quick facts, and media contacts for ${IDENTITY.displayName} on Newmarket Road, Cambridge`,
            "url": PAGE_URL,
            "isPartOf": {
              "@type": "WebSite",
              "name": IDENTITY.displayName,
              "url": SITE_URL
            },
            "about": {
              "@type": "LocalBusiness",
              "name": IDENTITY.displayName,
              "address": POSTAL_ADDRESS
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Press & Media",
                "item": PAGE_URL
              }
            ]
          }
        ])}

        <main className="bg-white text-brand-900">
          <FadeIn>
            <section
              className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-12 sm:py-16 text-white"
              aria-labelledby="press-hero-heading"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 via-transparent to-brand-700/20" aria-hidden="true" />
              <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                  <nav aria-label="Breadcrumb" className="text-sm text-white/70">
                  <ol className="flex items-center gap-2">
                    <li>
                      <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="text-white">Press &amp; Media</li>
                  </ol>
                </nav>
                  <div className="space-y-4">
                    <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                      Press &amp; Media
                    </span>
                    <h1 id="press-hero-heading" className="text-4xl font-display font-semibold leading-tight sm:text-5xl">
                      Official press kit for {BRAND.fullName}
                    </h1>
                    <p className="max-w-3xl text-base text-white/80 sm:text-lg">
                      Story-ready facts, imagery access, and rapid contacts for The Corner House Cambridge—an art-deco sports pub with a Nepalese kitchen, covered garden projector, and HD matchday screens opposite Cambridge Retail Park (2 minutes from Premier Inn/Travelodge).
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                    <a
                      href={`mailto:${MEDIA_CONTACT.email}?subject=Press enquiry: ${BRAND.fullName}`}
                      className="btn border-none bg-white text-brand-900 hover:bg-white/90"
                      style={{ touchAction: 'manipulation' }}
                    >
                      Email press desk
                    </a>
                    <a
                      href={MEDIA_CONTACT.phoneTel}
                      className="btn btn-outline border-white/50 text-white hover:bg-white/10"
                      style={{ touchAction: 'manipulation' }}
                      aria-label={`Call ${MEDIA_CONTACT.phoneDisplay}`}
                    >
                      Call {MEDIA_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          <FadeIn>
            <section className="bg-white" aria-labelledby="press-kit-heading">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                  <div className="space-y-5">
                    <span className="inline-flex items-center rounded-full border border-brand-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">
                      Quick facts
                    </span>
                    <h2 id="press-kit-heading" className="text-3xl font-display font-semibold text-brand-900">
                      Press kit &amp; story starters
                    </h2>
                    <p className="text-brand-700">
                      Use the essentials below or reference our homepage design system for deeper dives into menu, events, and booking flows.
                    </p>
                    <ul className="space-y-3 text-brand-700">
                      {PRESS_FACTS.map((fact) => (
                        <li key={fact} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-400" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <article className="rounded-[2rem] border border-brand-100 bg-white p-6 sm:p-8 shadow-xl shadow-brand-900/10">
                    <h3 className="text-2xl font-display text-brand-900">Talk to the team</h3>
                    <p className="mt-3 text-brand-700">
                      Tell us your outlet, deadline, and angle so we can connect you with a spokesperson or chef quickly. We aim to reply within one working day.
                    </p>
                    <dl className="mt-6 space-y-3 text-sm text-brand-800">
                      <div>
                        <dt className="uppercase tracking-[0.35em] text-brand-500">Email</dt>
                        <dd>
                          <a href={`mailto:${MEDIA_CONTACT.email}`} className="text-brand-900 underline-offset-4 hover:underline">
                            {MEDIA_CONTACT.email}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.35em] text-brand-500">Phone</dt>
                        <dd>
                          <a href={MEDIA_CONTACT.phoneTel} className="text-brand-900 underline-offset-4 hover:underline">
                            {MEDIA_CONTACT.phoneDisplay}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-[0.35em] text-brand-500">Address</dt>
                        <dd className="text-brand-900">{MEDIA_CONTACT.address}</dd>
                      </div>
                    </dl>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <a
                        href={`mailto:${MEDIA_CONTACT.email}?subject=Press enquiry: ${BRAND.fullName}`}
                        className="btn border-none bg-brand-900 text-white hover:bg-brand-800"
                        style={{ touchAction: 'manipulation' }}
                      >
                        Email press team
                      </a>
                      <a
                        href={MEDIA_CONTACT.phoneTel}
                        className="btn btn-outline border-brand-200 text-brand-900 hover:bg-white"
                        style={{ touchAction: 'manipulation' }}
                      >
                        Call us
                      </a>
                    </div>
                    <div className="mt-6 rounded-2xl border border-dashed border-brand-200/80 p-4 text-sm text-brand-700">
                      Need imagery? Mention preferred format (web, print, portrait, landscape) so we can send the right files on first reply.
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </FadeIn>
        </main>
      </RestaurantLayout>
    </>
  );
}
