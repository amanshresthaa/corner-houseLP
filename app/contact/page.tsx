import RestaurantLayout from "@/components/restaurant/Layout";
import { getContentSmart } from '@/src/lib/data/server-loader';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { FadeIn } from '@/components/animations/MotionWrappers';
import dynamic from 'next/dynamic';
import { getContactInfo, getFormattedAddress, getAddress, getRestaurantIdentity } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';

const CONTACT = getContactInfo();
const ADDRESS_LINE = getFormattedAddress();
const ADDRESS = getAddress();
const IDENTITY = getRestaurantIdentity();

// SEO Metadata from content.json
export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages?.contact as any)?.seo || {};
  return getSEOTags({
    title: seo.title || `Contact ${BRAND.fullName}`,
    description: seo.description || 'Contact us for bookings, cabins, directions, or matchday enquiries on Newmarket Road.',
    keywords: seo.keywords,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/contact',
    openGraph: seo.openGraph,
  });
}

// Dynamic imports for Contact page sections
const ContactInfoSection = dynamic(() => import("@/components/restaurant/sections/ContactInfoSection"));
const RestaurantHoursCard = dynamic(() => import("@/components/restaurant/RestaurantHoursCard"));
const ContactFeaturesSection = dynamic(() => import("@/components/restaurant/sections/ContactFeaturesSection"));
const SocialMediaSection = dynamic(() => import("@/components/restaurant/sections/SocialMediaSection"));
const InteractiveMap = dynamic(() => import("@/components/restaurant/InteractiveMap"));

export default async function ContactPage() {
  const content = await getContentSmart();
  const contactContent = content.pages.contact;
  const canonicalContact = CONTACT;
  const phoneInfo = {
    ...contactContent.contactInfo.phone,
    number: canonicalContact.phone.display,
    href: canonicalContact.phone.tel,
  };
  const locationInfo = {
    ...contactContent.contactInfo.location,
    address: ADDRESS_LINE,
  };
  const emailInfo = {
    address: canonicalContact.email.primary,
  };
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
          // ... existing schema markup remains the same
        ])}
        
        {/* Hero Section with motion animation */}
        <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-10 md:py-16" aria-labelledby="contact-hero-heading">
          <div className="absolute inset-0 bg-black/10"></div>
          <FadeIn>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 id="contact-hero-heading" className="h2 text-white mb-3 leading-tight">
                {contactContent.hero.title}
              </h1>
              <p className="text-base md:text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
                {contactContent.hero.subtitle}
              </p>
              {/* Quick Actions CTA inside hero */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={CONTACT.phone.tel}
                  className="btn bg-white text-brand-800 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
                  aria-label={`Call ${IDENTITY.displayName} at ${CONTACT.phone.display}`}
                  style={{ touchAction: 'manipulation' }}
                >
                  📞 Call {CONTACT.phone.display}
                </a>
                <a
                  href={`mailto:${CONTACT.email.primary}`}
                  className="btn btn-outline border-white text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
                  aria-label={`Email ${IDENTITY.displayName} at ${CONTACT.email.primary}`}
                  style={{ touchAction: 'manipulation' }}
                >
                  📧 {content.global?.ui?.buttons?.emailUs || 'Email Us'}
                </a>
                <a
                  href={ADDRESS.map.google || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost text-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
                  aria-label={`Get directions to ${IDENTITY.displayName}`}
                  style={{ touchAction: 'manipulation' }}
                >
                  🧭 {content.global?.ui?.buttons?.getDirections || 'Get Directions'}
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Main contact content with progressive disclosure */}
        <main className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Quick Actions are now inside the hero */}
            <FadeIn>
              <section className="grid grid-cols-1 gap-8 pb-16 lg:grid-cols-2" aria-labelledby="contact-info-heading">
                <div>
                  <h2 id="contact-info-heading" className="h3 text-brand-700 mb-6">Contact Information</h2>
                  <ContactInfoSection
                    phone={phoneInfo}
                    location={locationInfo}
                    email={emailInfo}
                  />
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="h3 text-brand-700 mb-6 font-semibold">
                      {contactContent.hours.title}
                    </h2>
                    <RestaurantHoursCard />
                  </div>

                  <ContactFeaturesSection
                    title={contactContent.features.title}
                    items={contactContent.features.items}
                  />

                  <SocialMediaSection />
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section className="pt-12" aria-labelledby="map-heading">
                <h2 id="map-heading" className="mb-6 text-center h3 text-brand-700">Find Us</h2>
                <div className="rounded-3xl bg-brand-50 p-4 shadow-lg shadow-brand-900/10">
                  <InteractiveMap
                    title={`${IDENTITY.displayName} Location`}
                    className="h-[420px] w-full overflow-hidden rounded-2xl border border-brand-200/40"
                    height="400px"
                    directionLabel={content.global?.ui?.buttons?.getDirections || 'Get Directions'}
                    hintLabel={content.global?.ui?.labels?.clickForDirections || 'Click for directions'}
                  />
                </div>
              </section>
            </FadeIn>
          </div>
        </main>
      </RestaurantLayout>
    </>
  );
}
