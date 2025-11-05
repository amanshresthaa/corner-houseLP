import RestaurantLayout from "@/components/restaurant/Layout";
import { FadeIn, FadeInUp, MotionLinkButton } from "@/components/animations/MotionWrappers";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import { getContentSmart } from '@/src/lib/data/server-loader';
import Link from "@/lib/debugLink";
import siteConfig from '@/config';
import { getContactInfo } from "@/lib/restaurantData";

// Download asset removed; page now focuses on online ordering

export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages as any)?.takeawayMenu?.seo || {};
  return getSEOTags({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/takeaway',
    openGraph: seo.openGraph,
  });
}

export default async function TakeawayMenuPage() {
  const contact = getContactInfo();
  const content = await getContentSmart();
  const links = (content.global as any)?.links || {};
  const ui = (content.global as any)?.ui || {};
  const orderHref = links?.takeaway as string | undefined;
  const orderLabel = ui?.buttons?.orderTakeaway || 'Order Online';

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || `https://${siteConfig.domainName}/`).replace(/\/$/, '/');
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Menu",
      name: "The White Horse Waterbeach Collection & Delivery",
      description:
        "Order authentic Nepalese specialties and British pub classics for collection or delivery from The White Horse Waterbeach.",
      url: orderHref || `${baseUrl}takeaway`,
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStorePickup",
      },
      provider: {
        "@type": "Restaurant",
        name: "The White Horse Waterbeach",
        telephone: contact.phone.primary,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.city,
          postalCode: contact.address.postcode,
          addressCountry: "GB",
        },
      },
    },
  ];

  return (
    <RestaurantLayout>
      {renderSchemaTags(structuredData)}

      <section
        className="relative bg-gradient-to-br from-brand-700 via-crimson-600 to-cardamom-700 text-white py-16 md:py-24"
        aria-labelledby="takeaway-menu-heading"
      >
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full backdrop-blur">
              <span aria-hidden="true" role="img">🛍️</span>
              <span className="text-sm font-semibold tracking-wide uppercase">Collection & Delivery</span>
              <span className="sr-only">Order for collection or delivery</span>
            </span>
          </FadeIn>
          <FadeInUp>
            <h1 id="takeaway-menu-heading" className="h2 leading-tight">
              🛍️ Order Online
            </h1>
          </FadeInUp>
          <FadeInUp>
            <p className="text-lg md:text-xl text-neutral-100 max-w-3xl mx-auto leading-relaxed">
              Explore Nepalese signatures and British pub favourites from the comfort of home. Order online for quick collection or delivery.
            </p>
          </FadeInUp>
          <FadeInUp>
            <p className="text-sm md:text-base text-accent-100 max-w-3xl mx-auto">
              <strong>Promos:</strong> 10% off Collection · Free delivery up to 3 miles, then £2/mile thereafter.
            </p>
          </FadeInUp>
          <FadeInUp>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {orderHref && (
                <a
                  href={orderHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-500 text-neutral-900 font-semibold shadow-lg hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-200 focus-visible:ring-offset-brand-700"
                  aria-label={orderLabel}
                >
                  <span aria-hidden="true" role="img">🛍️</span>
                  {orderLabel}
                </a>
              )}
              <MotionLinkButton
                href={contact.phone.tel}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-500 text-neutral-900 font-semibold shadow-lg hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-200 focus-visible:ring-offset-brand-700"
                ariaLabel="Call to place an order"
              >
                <span aria-hidden="true" role="img">📞</span>
                Call to Order
              </MotionLinkButton>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" aria-labelledby="takeaway-details-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl space-y-4 mb-12">
              <h2 id="takeaway-details-heading" className="h3 text-brand-800">
                Everything you need for effortless collection & delivery
              </h2>
              <p className="text-lg text-brand-600 leading-relaxed">
                Whether you&apos;re planning a cosy night in or a family feast, ordering from The White Horse Waterbeach makes it simple to bring our kitchen home.
              </p>
            </div>
          </FadeIn>
          <FadeInUp>
            <div className="grid gap-8 md:grid-cols-3">
              {[{
                icon: "🕒",
                title: "Order & collection times",
                description: "Order online to see available times — pickups are usually ready within ~25 minutes.",
              }, {
                icon: "🚗",
                title: "Easy parking outside",
                description: "Pull into our car park on arrival; we&apos;ll hand over your order at the bar or bring it to your vehicle on request.",
              }, {
                icon: "⚠️",
                title: "Allergens & dietary notes",
                description: "All dishes are clearly labelled online. Let us know about allergies when you order so the kitchen can advise on safe options.",
              }].map(card => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-brand-100 bg-neutral-50 p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus-within:shadow-2xl"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-2xl" aria-hidden="true">
                    {card.icon}
                  </div>
                  <h3 className="h5 font-semibold text-brand-700 mb-3">{card.title}</h3>
                  <p className="text-brand-600 leading-relaxed">{card.description}</p>
                </article>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

    </RestaurantLayout>
  );
}
