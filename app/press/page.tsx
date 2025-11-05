import RestaurantLayout from "@/components/restaurant/Layout";
import { FadeIn } from '@/components/animations/MotionWrappers';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import Link from '@/lib/debugLink';
// PressFeatureBanner removed to keep page focused on essential, verified information
import { getContactInfo, getAddress, getPostalAddressSchema, getRestaurantIdentity } from '@/lib/restaurantData';

// Concise quick facts derived from the authoritative Markdown dossier
const PRESS_FACTS = [
  "Address: 12 Greenside, Waterbeach, Cambridge, CB25 9HP",
  "Phone: +44 1223 375578 • Email: whitehorse@lapeninns.com",
  "Ownership: Lapen Inns",
  "Dual identity: Traditional village pub + authentic Nepalese restaurant",
  "Amenities: Live sports (Sky & TNT), large garden, outdoor seating, dog-friendly (bar area), family-friendly, pool table, takeaway, wheelchair access",
  "Cask ales: Greene King IPA, Timothy Taylor Landlord",
];

const CONTACT = getContactInfo();
const ADDRESS = getAddress();
const POSTAL_ADDRESS = getPostalAddressSchema();
const IDENTITY = getRestaurantIdentity();
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

export default function PressPage() {
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
              <h1 id="press-hero-heading" className="text-2xl md:text-3xl font-display font-bold text-white mb-3 leading-tight">
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

		  <FadeIn>
			<section className="bg-brand-50 pt-16 pb-6" aria-labelledby="press-kit-heading">
			  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                  <div>
                    <h2 id="press-kit-heading" className="text-2xl md:text-3xl font-display font-bold text-brand-700">
                      Press Kit &amp; Quick Facts
                    </h2>
                    <p className="mt-3 text-brand-600 leading-relaxed">
                      Need context for your story? Start with the essentials below or drop us a line for high-resolution imagery, quotes, and spokespeople availability.
                    </p>
                    <ul className="mt-6 space-y-3 text-brand-700">
                      {PRESS_FACTS.map((fact) => (
                        <li key={fact} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-1 text-brand-500">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-brand-100 p-6 sm:p-8 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-brand-700">Talk to the team</h3>
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
        </main>
      </RestaurantLayout>
    </>
  );
}
