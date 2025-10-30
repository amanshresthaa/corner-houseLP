import type { Metadata } from "next";
import type { ReactElement } from "react";
import config from "@/config";
import { getRestaurantIdentity, getContactInfo, getAddress, getHours } from "@/lib/restaurantData";

/**
 * Contract for getSEOTags inputs.
 * We accept all Next.js Metadata fields and two helpers:
 * - canonicalUrlRelative: relative path (e.g. "/about") that will be turned into the canonical alternate
 * - extraTags: arbitrary extra metadata you may want to merge in
 */
type SEOTagOptions = Metadata & {
  canonicalUrlRelative?: string;
  extraTags?: Record<string, any>;
};

/**
 * Build a Metadata object prefilled from `config` with sane defaults.
 * Returns a value compatible with Next.js app router `metadata` export.
 */
export const getSEOTags = (opts: SEOTagOptions = {}): Metadata => {
  const { title, description, keywords, openGraph, canonicalUrlRelative, extraTags } = opts;

  const metadataBase = new URL(
    process.env.NODE_ENV === "development" ? "http://localhost:3000/" : `https://${config.domainName}/`
  );

  // Normalize keywords: accept string | string[] | undefined
  const normalizedKeywords: Metadata["keywords"] = Array.isArray(keywords)
    ? keywords
    : typeof keywords === "string"
    ? keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [config.appName];

  const defaultOGUrl = `${metadataBase.origin}/`;

  const metadata: Metadata = {
    title: title || config.appName,
    description: description || config.appDescription,
    keywords: normalizedKeywords,
    applicationName: config.appName,
    metadataBase,

    openGraph: {
      title: openGraph?.title || title || config.appName,
      description: openGraph?.description || description || config.appDescription,
      url: openGraph?.url || defaultOGUrl,
      siteName: openGraph?.siteName || config.appName,
      locale: "en_US",
      type: "website",
      ...(openGraph?.images ? { images: openGraph.images } : {}),
    },

    twitter: {
      title: openGraph?.title || title || config.appName,
      description: openGraph?.description || description || config.appDescription,
      card: "summary_large_image",
      creator: "@lapeninns",
    },

    // Merge any additional tags (be careful not to clobber typed fields)
    ...extraTags,
  };

  if (canonicalUrlRelative) {
    // Next.js will resolve this relative canonical with metadataBase
    metadata.alternates = { canonical: canonicalUrlRelative };
  }

  return metadata;
};

/**
 * Render structured data scripts for Schema.org rich results.
 * Pass an array of JSON-LD objects or let the helper render a sensible default.
 */
export const renderSchemaTags = (schemas?: Array<Record<string, any>>): ReactElement | null => {
  const identity = getRestaurantIdentity();
  const contact = getContactInfo();
  const address = getAddress();
  const hours = getHours();

  const dayMap: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  const openingHoursSpecification = Object.entries(hours.kitchen).map(([day, value]) => {
    const dayName = dayMap[day.toLowerCase()] || day;
    const firstRange = value.split(',')[0]?.trim() ?? '';
    const [opens, closes] = firstRange.includes('-')
      ? firstRange.split('-').map((part) => part.trim())
      : ['12:00', '22:00'];

    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [dayName],
      opens,
      closes,
    };
  });

  const defaultSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: identity.displayName,
    description: identity.description,
    image: `${config.domainName.startsWith("http") ? config.domainName : `https://${config.domainName}`}/icon.png`,
    url: `https://${config.domainName}/`,
    telephone: contact.phone.primary,
    email: contact.email.primary,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.area,
      addressRegion: address.city,
      postalCode: address.postcode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.coordinates.lat,
      longitude: address.coordinates.lng,
    },
    openingHoursSpecification,
    servesCuisine: identity.cuisine,
    priceRange: "££",
    acceptsReservations: true,
    hasMenu: `https://${config.domainName}/menu`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "127",
    },
  };

  const schemasToRender = schemas && schemas.length > 0 ? schemas : [defaultSchema];

  return (
    <>
      {schemasToRender.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
