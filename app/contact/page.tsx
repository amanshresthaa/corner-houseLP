import RestaurantLayout from "@/components/restaurant/Layout";
import { getContentSmart } from '@/src/lib/data/server-loader';
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { FadeIn } from '@/components/animations/MotionWrappers';
import dynamic from 'next/dynamic';
import { getContactInfo, getFormattedAddress } from '@/lib/restaurantData';

const CONTACT = getContactInfo();
const ADDRESS_LINE = getFormattedAddress();

// SEO Metadata
export const metadata = getSEOTags({
  title: "Contact The White Horse Waterbeach - Book Table | Directions | Opening Hours",
  description: `Contact The White Horse Waterbeach for bookings, directions & enquiries. Located at ${ADDRESS_LINE}. Phone: ${CONTACT.phone.display}. Free parking available.`,
  keywords: ["The White Horse Waterbeach contact", "book table Waterbeach pub", "Waterbeach pub phone number", "The White Horse directions", "Cambridge pub booking", "Waterbeach restaurant address"],
  canonicalUrlRelative: "/contact",
  openGraph: {
    title: "Contact The White Horse Waterbeach - Book Table | Directions",
    description: `Contact The White Horse Waterbeach for bookings, directions & enquiries. Located at ${ADDRESS_LINE}. Phone: ${CONTACT.phone.display}.`,
    url: "https://whitehorsepub.co//contact",
  },
});

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
    address: `${canonicalContact.address.street}, ${canonicalContact.address.area}, ${canonicalContact.address.city}, ${canonicalContact.address.postcode}`,
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
              <h1 id="contact-hero-heading" className="text-2xl md:text-3xl font-display font-bold text-white mb-3 leading-tight">
                {contactContent.hero.title}
              </h1>
              <p className="text-base md:text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
                {contactContent.hero.subtitle}
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Main contact content with progressive disclosure */}
        <main className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <section className="grid grid-cols-1 gap-8 pb-16 lg:grid-cols-2" aria-labelledby="contact-info-heading">
                <div>
                  <h2 id="contact-info-heading" className="text-2xl font-display font-bold text-brand-700 mb-6">Contact Information</h2>
                  <ContactInfoSection
                    phone={phoneInfo}
                    location={locationInfo}
                    email={emailInfo}
                  />
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-brand-700 mb-6">
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
              <section className="pt-16" aria-labelledby="map-heading">
                <h2 id="map-heading" className="mb-6 text-center text-2xl font-display font-bold text-brand-700">Find Us</h2>
                <div className="rounded-3xl bg-brand-50 p-4 shadow-lg shadow-brand-900/10">
                  <InteractiveMap
                    title="The White Horse Waterbeach Location"
                    className="h-[400px] w-full overflow-hidden rounded-2xl border border-brand-200/40"
                    height="400px"
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
