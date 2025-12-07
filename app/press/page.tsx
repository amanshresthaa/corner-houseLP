import RestaurantLayout from "@/components/restaurant/Layout";
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import Link from '@/lib/debugLink';
// PressFeatureBanner removed to keep page focused on essential, verified information
import { getContactInfo, getAddress, getPostalAddressSchema, getRestaurantIdentity } from '@/lib/restaurantData';

const CONTACT = getContactInfo();
const ADDRESS = getAddress();
const POSTAL_ADDRESS = getPostalAddressSchema();
const IDENTITY = getRestaurantIdentity();
// Concise quick facts derived from the authoritative Markdown dossier, now using centralized data
const PRESS_FACTS = [
  `Address: ${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.city} ${ADDRESS.postcode}`,
  `Phone: ${CONTACT.phone.display} • Email: ${CONTACT.email.primary}`,
  "Ownership: Lapen Inns",
  "Dual identity: Traditional village pub + authentic Nepalese restaurant",
  "Amenities: Live sports (Sky & TNT), large garden, outdoor seating, dog-friendly (bar area), family-friendly, pool table, takeaway, wheelchair access",
  "Cask ales: Greene King IPA, Timothy Taylor Landlord",
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

function getSourceFromTitle(title: string): { source: string; headline: string } {
  if (!title) return { source: 'Source', headline: '' };
  const parts = title.split(':');
  if (parts.length >= 2) {
    const source = parts[0].trim();
    const headline = parts.slice(1).join(':').trim();
    return { source, headline };
  }
  return { source: 'Source', headline: title };
}

function getDomainLabel(href: string): string {
  try {
    const u = new URL(href);
    const host = u.hostname.replace(/^www\./, '');
    return host;
  } catch {
    return 'external link';
  }
}

export default async function PressPage() {
  const content = await getContentSmart();
  const pressItems = (content?.pages as any)?.home?.sections?.pressTicker?.items || [];
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
            "@id": "https://whitehorsepub.co//press#webpage",
            "name": "Press Kit - The White Horse Waterbeach",
            "description": "Official press information, quick facts, and media contact for The White Horse Waterbeach.",
            "url": "https://whitehorsepub.co//press",
            "isPartOf": {
              "@type": "WebSite",
              "name": IDENTITY.displayName,
              "url": "https://whitehorsepub.co/"
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
                "item": "https://whitehorsepub.co/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Press & Media",
                "item": "https://whitehorsepub.co//press"
              }
            ]
          }
        ])}

        <section
          className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-10 md:py-16"
          aria-labelledby="press-hero-heading"
        >
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
          <FadeIn>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex justify-center items-center gap-2 text-sm text-brand-100">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li className="text-brand-50 font-medium">Press Kit</li>
                </ol>
              </nav>
              <h1 id="press-hero-heading" className="h2 text-white mb-3 leading-tight">
                Press Kit
              </h1>
              <p className="text-base md:text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
                At-a-glance facts and media contact for The White Horse, Waterbeach — a revitalised community hub blending a traditional village pub with authentic Nepalese cuisine.
              </p>
            </div>
          </FadeIn>
        </section>

		<main className="bg-white pb-4">
          {/* Hygiene card removed: not present in the provided Markdown and out of scope for press kit */}

          {/* External press feature banner removed to keep page minimal and source-aligned */}

          {/* Media highlights removed: keep only essential, verified information */}

          {/* (moved) Press Kit now follows Media Coverage to match dark/light alternation */}
          {/* Media coverage list */}
          <FadeIn>
            <section className="py-12 md:py-16 bg-white" aria-labelledby="media-coverage-heading">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <h2 id="media-coverage-heading" className="h2 text-neutral-900">
                      Media Coverage
                    </h2>
                    <p className="mt-2 text-neutral-600">Independent articles about The White Horse Waterbeach.</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                  {pressItems.map((item: any) => {
                    const { source, headline } = getSourceFromTitle(item?.title ?? '');
                    const summary = item?.summary ?? '';
                    const href = item?.href ?? '#';
                    const domain = getDomainLabel(href);
                    const aria = item?.ariaLabel || `Open ${source} article in a new tab`;
                    return (
                      <article key={href} className="group relative rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-brand-300">
                        <div className="p-5 md:p-6">
                          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                            <span className="inline-flex items-center rounded-full border border-neutral-200 px-2 py-0.5 text-xs font-medium bg-neutral-50 text-neutral-700">
                              {source}
                            </span>
                            <span aria-hidden="true" className="text-neutral-300">•</span>
                            <span className="text-neutral-500" aria-label={`Domain ${domain}`}>{domain}</span>
                          </div>

                          <h3 className="h5 text-neutral-900 leading-snug font-semibold">
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer external"
                              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded"
                              aria-label={aria}
                            >
                              <span className="absolute inset-0" aria-hidden="true" />
                              {headline || source}
                            </a>
                          </h3>
                          {summary && (
                            <p className="mt-2 text-neutral-700 leading-relaxed">{summary}</p>
                          )}

                          <div className="mt-4 flex items-center justify-between">
                            <cite className="not-italic text-sm text-neutral-600" title={`Source: ${source}`}>Source: {source}</cite>
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer external"
                              className="link link-hover text-brand-700"
                              aria-label={`Read ${source} article (opens in new tab)`}
                            >
                              Read article →
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                  {pressItems.length === 0 && (
                    <p className="text-neutral-600">Press coverage coming soon.</p>
                  )}
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Press Kit second (dark brand gradient to match palette) */}
          <FadeIn>
            <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-16" aria-labelledby="press-kit-heading">
              <div className="absolute inset-0 bg-black/5" aria-hidden="true" />
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                  <div>
                    <h2 id="press-kit-heading" className="h2 text-white">
                      Press Kit &amp; Quick Facts
                    </h2>
                    <p className="mt-3 text-brand-100 leading-relaxed">
                      Need context for your story? Start with the essentials below or drop us a line for high-resolution imagery, quotes, and spokespeople availability.
                    </p>
                    <ul className="mt-6 space-y-3 text-brand-100">
                      {PRESS_FACTS.map((fact) => (
                        <li key={fact} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-1 text-brand-200">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-brand-100 p-6 sm:p-8 space-y-6">
                    <div>
                      <h3 className="h5 text-brand-700 font-semibold">Talk to the team</h3>
                      <p className="mt-2 text-sm text-brand-600 leading-relaxed">
                        We aim to reply to press enquiries within one working day. Please include your deadline, outlet, and angle so we can connect you with the right spokesperson.
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-brand-700">
                      <p><strong>Email:</strong> <a href={`mailto:${MEDIA_CONTACT.email}`} className="link link-hover text-brand-600">{MEDIA_CONTACT.email}</a></p>
                      <p><strong>Phone:</strong> <a href={MEDIA_CONTACT.phoneTel} className="link link-hover text-brand-600">{MEDIA_CONTACT.phoneDisplay}</a></p>
                      <p><strong>Address:</strong> {MEDIA_CONTACT.address}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`mailto:${MEDIA_CONTACT.email}?subject=Press enquiry: The White Horse Waterbeach`}
                        className="btn bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        style={{ touchAction: 'manipulation' }}
                      >
                        Email Press Team
                      </a>
                      <Link
                        href="/contact"
                        className="btn btn-outline border-brand-300 text-brand-700 hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        style={{ touchAction: 'manipulation' }}
                      >
                        Contact Page
                      </Link>
                    </div>
                    <div className="border border-dashed border-brand-200 rounded-xl p-4 text-sm text-brand-600 bg-brand-50/60">
                      <p className="font-medium text-brand-700 mb-1">Need imagery?</p>
                      <p>
                        We can supply exterior/interior photography and chef portraits sized for print or web. Mention your preferred format when you get in touch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Food Hygiene Rating (light section) */}
          <FadeIn>
            <section className="py-16 bg-brand-50" aria-labelledby="food-hygiene-heading">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {(() => {
                  const FSA = {
                    FHRSID: 1807077,
                    businessName: 'The White Horse',
                    ratingValue: '4',
                    ratingDate: '2025-08-06T00:00:00',
                  } as const;
                  const RATING_TEXT: Record<string, string> = {
                    '0': 'Urgent Improvement Necessary',
                    '1': 'Major Improvement Necessary',
                    '2': 'Improvement Necessary',
                    '3': 'Generally Satisfactory',
                    '4': 'Good',
                    '5': 'Very Good',
                  };
                  const date = new Date(FSA.ratingDate);
                  const formatted = isNaN(date.getTime())
                    ? 'Unknown date'
                    : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
                  const fsaHref = `https://ratings.food.gov.uk/business/${FSA.FHRSID}`;
                  const ratingText = RATING_TEXT[FSA.ratingValue] ?? '';
                  return (
                    <div className="card bg-brand-700 text-white shadow-xl border border-brand-600">
                      <div className="card-body gap-6 md:gap-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
                          <div className="flex items-start md:items-center gap-5">
                            <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white text-brand-700 font-display text-3xl font-bold">
                              {FSA.ratingValue}
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-brand-200 font-semibold">Food Standards Agency</p>
                              <h2 id="food-hygiene-heading" className="h4 leading-snug">
                                Food Hygiene Rating: {FSA.ratingValue} {ratingText ? `(${ratingText})` : ''}
                              </h2>
                              <p className="mt-2 text-brand-100 text-sm md:text-base leading-relaxed">
                                Official inspection completed on {formatted}. View the full report for detailed hygiene, structure, and management scores.
                              </p>
                            </div>
                          </div>
                          <a
                            href={fsaHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline border-white text-white hover:bg-white/10 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
                            aria-label={`View ${FSA.businessName} Food Standards Agency hygiene rating (opens in new tab)`}
                            style={{ touchAction: 'manipulation' }}
                          >
                            View rating ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </section>
          </FadeIn>
        </main>
      </RestaurantLayout>
    </>
  );
}
