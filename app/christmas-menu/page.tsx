import RestaurantLayout from "@/components/restaurant/Layout";
import { FadeIn, FadeInUp, MotionLinkButton } from "@/components/animations/MotionWrappers";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import { getContentSmart } from "@/src/lib/data/server-loader";
import { SchemaInjector } from "@/components/seo/RestaurantSchema";
import Link from "@/lib/debugLink";
import { getContactInfo } from "@/lib/restaurantData";
import ChristmasMusicPlayer from "./_components/ChristmasMusicPlayer";
import { BRAND } from "@/src/lib/constants/brand";

const SITE_URL = `https://${BRAND.domain}`;
const CHRISTMAS_MENU_URL = `${SITE_URL}/christmas-menu`;
const CHRISTMAS_MENU_PDF_PATH = "/documents/corner-house-christmas-menu.pdf";
const CHRISTMAS_MENU_PDF_FILENAME = "corner-house-christmas-menu.pdf";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type MenuItemData = {
  id: string;
  name: string;
  description: string;
};

type MenuSectionData = {
  id: string;
  name: string;
  description?: string;
  items: MenuItemData[];
};

type FestiveMenu = {
  title: string;
  description: string;
  price: {
    value: string;
    display: string;
  };
  notes: string[];
  sections: MenuSectionData[];
};

const CHRISTMAS_MENU: FestiveMenu = {
  title: "Christmas Menu 2025",
  description:
    `Four courses of Himalayan-inspired festive dishes for £39.99 per person at ${BRAND.fullName}.`,
  price: {
    value: "39.99",
    display: "£39.99 per person",
  },
  notes: [
    "Seafood dishes carry a £3 supplement.",
    "Choose one rice or bread to accompany your meal.",
  ],
  sections: [
    {
      id: slugify("Starters"),
      name: "Starters",
      items: [
        {
          id: slugify("Vegetable Chop"),
          name: "Vegetable Chop",
          description:
            "Nepali street snack of potatoes, peas, beans and carrots blended with Himalayan herbs, breaded and fried crisp.",
        },
        {
          id: slugify("Chicken Sekuwa Satey"),
          name: "Chicken Sekuwa Satey",
          description:
            "Marinated chicken grilled with Himalayan herbs, served with tangy tomato chutney.",
        },
        {
          id: slugify("Stuffed Turkey Kofta Kebab"),
          name: "Stuffed Turkey Kofta Kebab",
          description:
            "Minced turkey seasoned with festive spices, stuffed with cheese and butter, pan-fried until golden.",
        },
        {
          id: slugify("Lamb Sekuwa"),
          name: "Lamb Sekuwa",
          description:
            "Juicy lamb pieces marinated in traditional Himalayan herbs and slow-cooked in a clay oven for smoky depth.",
        },
      ],
    },
    {
      id: slugify("Mains"),
      name: "Mains",
      items: [
        {
          id: slugify("Honey Hunter Chicken"),
          name: "Honey Hunter Chicken",
          description:
            "Gurung-inspired chicken cooked with honey and aromatic herbs for a celebratory sweetness.",
        },
        {
          id: slugify("Sherpa Lamb"),
          name: "Sherpa Lamb",
          description:
            "Tender lamb slow-cooked with baby potatoes, Himalayan spices and seasonal herbs.",
        },
        {
          id: slugify("Seasonal Tawa Mixed Vegetables"),
          name: "Seasonal Tawa Mixed Vegetables",
          description:
            "Garden vegetables in a rich, spiced tomato sauce for a hearty vegetarian main.",
        },
        {
          id: slugify("Pan-Fried Tilapia"),
          name: "Pan-Fried Tilapia",
          description:
            "Marinated tilapia fillet pan-fried to a delicate crisp with festive herbs. Seafood supplement applies.",
        },
        {
          id: slugify("Tawa King Prawn"),
          name: "Tawa King Prawn (£3 Supplement)",
          description:
            "Succulent king prawns cooked with peppers, onions and spiced tomato sauce - rich and indulgent.",
        },
      ],
    },
    {
      id: slugify("Sides"),
      name: "Sides",
      items: [
        {
          id: slugify("Makai Saag"),
          name: "Makai Saag",
          description: "Baby corn and fresh spinach sautéed with Himalayan spices.",
        },
        {
          id: slugify("Aloo Dum"),
          name: "Aloo Dum",
          description: "Baby potatoes simmered in a hearty tomato sauce.",
        },
        {
          id: slugify("Three Beans Stir Fry"),
          name: "Three Beans Stir Fry",
          description: "Stir-fried mangetout, green beans and sugar snaps with mustard seeds and curry leaves.",
        },
      ],
    },
    {
      id: slugify("Rice and Breads"),
      name: "Rice & Breads",
      description: "Choose one to complement your meal.",
      items: [
        { id: slugify("Steamed Rice"), name: "Steamed Rice", description: "Fluffy, simply seasoned basmati." },
        { id: slugify("Pilau Rice"), name: "Pilau Rice", description: "Fragrant rice cooked with gentle spices." },
        { id: slugify("Butter Naan"), name: "Butter Naan", description: "Soft tandoor-baked naan with butter gloss." },
        { id: slugify("Roti"), name: "Roti", description: "Light wholewheat flatbread." },
      ],
    },
    {
      id: slugify("Desserts"),
      name: "Desserts",
      items: [
        {
          id: slugify("Lalmohan Yogurt"),
          name: "Lalmohan Yogurt",
          description: "Golden fried milk dumplings in syrup with chilled yogurt.",
        },
        {
          id: slugify("Jeri Yogurt"),
          name: "Jeri Yogurt",
          description: "Crispy spirals of sweet jeri paired with creamy yogurt - a festive Nepali favourite.",
        },
      ],
    },
  ],
};

const HIGHLIGHT_CARDS = [
  {
    icon: "🎄",
    title: "Festive Nepali flavours",
    body: "Seasonal dishes built on Himalayan herbs, balanced with cosy pub comfort.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Made for gatherings",
    body: "Tables for couples, families and teams with space to celebrate together.",
  },
  {
    icon: "🥘",
    title: "Vegetarian friendly",
    body: "Plenty of meat-free options plus clear notes on seafood supplements.",
  },
  {
    icon: "📞",
    title: "Easy to book",
    body: "Reserve online, call, or email the team - we will help plan the details.",
  },
] as const;

const SUPPORT_POINTS = [
  {
    icon: "✅",
    title: "Allergies welcomed",
    description: "Tell us your requirements - we offer safe swaps and clear guidance.",
  },
  {
    icon: "🕯️",
    title: "Cosy dining room",
    description: "Warm lighting, festive decor and plenty of space to linger over dessert.",
  },
  {
    icon: "📍",
    title: "Central to Waterbeach",
    description: "Opposite Cambridge Retail Park on Newmarket Road with easy links to the city and Abbey Stadium.",
  },
];

const FALLBACK_DESCRIPTION =
  "Celebrate Christmas in Cambridge with a £39.99 four-course menu featuring Himalayan-inspired starters, mains, sides, breads and desserts.";

export async function generateMetadata() {
  try {
    const content = await getContentSmart();
    const seo = (content as any)?.pages?.christmasMenu?.seo || {};

    return getSEOTags({
      title: seo.title ?? `Christmas Menu 2025 | ${BRAND.fullName}`,
      description: seo.description ?? FALLBACK_DESCRIPTION,
      keywords:
        seo.keywords ?? [
          `${BRAND.fullNameNoArticle} Christmas menu`,
          "Cambridge Christmas dinner",
          "Newmarket Road festive menu",
          "Nepalese Christmas menu",
        ],
      canonicalUrlRelative: seo.canonicalUrlRelative ?? "/christmas-menu",
      openGraph: {
        title: seo.openGraph?.title ?? `Christmas Menu 2025 at ${BRAND.fullName}`,
        description: seo.openGraph?.description ?? FALLBACK_DESCRIPTION,
        url: seo.openGraph?.url ?? CHRISTMAS_MENU_URL,
        images: seo.openGraph?.images,
      },
    });
  } catch (error) {
    return getSEOTags({
      title: `Christmas Menu 2025 | ${BRAND.fullName}`,
      description: FALLBACK_DESCRIPTION,
      keywords: [
        `${BRAND.fullNameNoArticle} Christmas menu`,
        "Cambridge Christmas dinner",
        "Newmarket Road festive menu",
        "Nepalese Christmas menu",
      ],
      canonicalUrlRelative: "/christmas-menu",
      openGraph: {
        title: `Christmas Menu 2025 at ${BRAND.fullName}`,
        description: FALLBACK_DESCRIPTION,
        url: CHRISTMAS_MENU_URL,
      },
    });
  }
}

export default async function ChristmasMenuPage() {
  const contact = getContactInfo();
  const telHref = contact.phone.tel;
  const phoneDisplay = contact.phone.display.replace(/\s+/g, "\u00a0");
  const googleMapLink = contact.address.map.google ?? contact.address.map.embed ?? "#";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Menu",
      name: `${BRAND.fullName} Christmas Menu 2025`,
      description: CHRISTMAS_MENU.description,
      url: CHRISTMAS_MENU_URL,
      hasMenuSection: CHRISTMAS_MENU.sections.map((section) => ({
        "@type": "MenuSection",
        name: section.name,
        description: section.description,
        hasMenuItem: section.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStoreOnly",
          },
        })),
      })),
      offers: [
        {
          "@type": "Offer",
          price: CHRISTMAS_MENU.price.value,
          priceCurrency: "GBP",
          description: `Per person Christmas menu price at ${BRAND.fullName}.`,
          availability: "https://schema.org/InStoreOnly",
          url: CHRISTMAS_MENU_URL,
        },
      ],
      provider: {
        "@type": "Restaurant",
        name: BRAND.fullName,
        telephone: contact.phone.primary,
        email: contact.email.primary,
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@media (prefers-reduced-motion: reduce) {*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important} html:focus-within{scroll-behavior:auto!important}}",
        }}
      />
      <RestaurantLayout>
        {renderSchemaTags(structuredData)}
        <SchemaInjector
          type="breadcrumb"
          data={[
            { name: "Home", url: SITE_URL },
            { name: "Christmas Menu", url: CHRISTMAS_MENU_URL },
          ]}
          page="christmas-menu"
        />

        <section
          className="relative bg-gradient-to-br from-brand-700 via-crimson-600 to-cardamom-700 text-white py-16 md:py-24"
          aria-labelledby="christmas-hero-heading"
        >
          <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full backdrop-blur">
                <span aria-hidden="true" role="img">🎄</span>
                <span className="text-sm font-semibold tracking-wide uppercase">Festive Menu 2025</span>
                <span className="sr-only">Christmas menu now available</span>
              </div>
            </FadeIn>
            <FadeInUp>
              <h1 id="christmas-hero-heading" className="h2 leading-tight">
                Christmas Menu 2025 at {BRAND.fullName}
              </h1>
            </FadeInUp>
            <FadeInUp>
              <p className="text-lg md:text-xl text-neutral-100 max-w-3xl mx-auto leading-relaxed">
                {CHRISTMAS_MENU.description}
              </p>
            </FadeInUp>
            <FadeInUp>
              <div
                className="flex flex-wrap justify-center gap-3 text-base font-semibold"
                role="list"
                aria-label="Festive highlights"
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-500 px-4 py-2 text-neutral-900 shadow-sm"
                  role="listitem"
                >
                  <span aria-hidden="true" role="img">
                    💷
                  </span>
                  {CHRISTMAS_MENU.price.display}
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-white shadow-sm backdrop-blur"
                  role="listitem"
                >
                  <span aria-hidden="true" role="img">
                    🐟
                  </span>
                  {CHRISTMAS_MENU.notes[0]}
                </span>
              </div>
            </FadeInUp>
            <FadeInUp>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <MotionLinkButton
                  href={CHRISTMAS_MENU_PDF_PATH}
                  download={CHRISTMAS_MENU_PDF_FILENAME}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-brand-800 font-semibold shadow-lg hover:bg-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-300 focus-visible:ring-offset-brand-700"
                  ariaLabel="Download the Christmas menu PDF"
                >
                  <span aria-hidden="true" role="img">⬇️</span>
                  Download Christmas Menu
                </MotionLinkButton>
                <MotionLinkButton
                  href="/book-a-table"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-brand-800 font-semibold shadow-lg hover:bg-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-300 focus-visible:ring-offset-brand-700"
                  ariaLabel="Book your table online"
                >
                  <span aria-hidden="true" role="img">🗓️</span>
                  Book Your Table Online
                </MotionLinkButton>
                <MotionLinkButton
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-500 text-neutral-900 font-semibold shadow-lg hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-200 focus-visible:ring-offset-brand-700"
                  ariaLabel="Book your table via call"
                >
                  <span aria-hidden="true" role="img">📞</span>
                  Book by Phone
                </MotionLinkButton>
              </div>
            </FadeInUp>
            <FadeInUp>
              <div className="flex justify-center">
                <ChristmasMusicPlayer />
              </div>
            </FadeInUp>
            <FadeIn>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-neutral-100/90">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                  <span aria-hidden="true" role="img">📍</span>
                  Waterbeach, Cambridge
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                  <span aria-hidden="true" role="img">👨‍👩‍👧</span>
                  Great for groups and families
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                  <span aria-hidden="true" role="img">✨</span>
                  Himalayan flavours with festive warmth
                </span>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-neutral-50 py-16 md:py-20" aria-labelledby="full-christmas-menu-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h2 id="full-christmas-menu-heading" className="h3 text-brand-800">
                  {CHRISTMAS_MENU.title}
                </h2>
                <p className="text-lg text-brand-600 leading-relaxed">
                  {CHRISTMAS_MENU.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm font-semibold text-brand-700">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1">
                    <span aria-hidden="true" role="img">💷</span>
                    {CHRISTMAS_MENU.price.display}
                  </span>
                  {CHRISTMAS_MENU.notes.map((note) => (
                    <span
                      key={note}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1"
                    >
                      <span aria-hidden="true" role="img">ℹ️</span>
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeInUp>
              <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {CHRISTMAS_MENU.sections.map((section) => (
                  <article
                    key={section.id}
                    className="flex h-full flex-col rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg"
                    aria-labelledby={`section-${section.id}-title`}
                  >
                    <header className="mb-4">
                      <h3
                        id={`section-${section.id}-title`}
                        className="h5 font-semibold text-brand-700"
                      >
                        {section.name}
                      </h3>
                      {section.description && (
                        <p className="mt-1 text-brand-600 leading-relaxed">{section.description}</p>
                      )}
                    </header>
                    <ul className="space-y-4" role="list" aria-label={`${section.name} options`}>
                      {section.items.map((item) => (
                        <li
                          key={item.id}
                          className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4"
                        >
                          <h4 className="h5 font-semibold text-brand-800 leading-tight">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-sm text-brand-600 leading-relaxed">
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>

        <section className="bg-white py-14 md:py-16" aria-labelledby="christmas-details-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex flex-col gap-3">
                <h2 id="christmas-details-heading" className="h3 text-brand-800">
                  Good to know before you book
                </h2>
                <p className="text-brand-600 leading-relaxed">
                  Reserve online, download the menu, or call us - we will make sure your festive meal is seamless.
                </p>
              </div>
            </FadeIn>
            <FadeInUp>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-brand-100 bg-brand-50/70 p-5 shadow-sm">
                  <dt className="text-sm font-semibold uppercase tracking-wide text-brand-600">Price</dt>
                  <dd className="mt-2 text-brand-800 text-lg font-semibold">{CHRISTMAS_MENU.price.display}</dd>
                  <dd className="mt-1 text-brand-600 text-sm">Supplements: {CHRISTMAS_MENU.notes[0]}</dd>
                </div>
                <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
                  <dt className="text-sm font-semibold uppercase tracking-wide text-brand-600">Location</dt>
                  <dd className="mt-2 text-brand-700 leading-relaxed">
                    <address className="not-italic">
                      {contact.address.street}, {contact.address.area}, {contact.address.postcode}
                    </address>
                    <Link
                      href={googleMapLink}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline"
                    >
                      Open in Maps
                    </Link>
                  </dd>
                </div>
                <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
                  <dt className="text-sm font-semibold uppercase tracking-wide text-brand-600">Contact</dt>
                  <dd className="mt-2 text-brand-700 leading-relaxed">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={contact.website ?? SITE_URL} className="font-semibold underline">
                        {BRAND.domain}
                      </Link>
                      <span aria-hidden="true" className="text-brand-500">•</span>
                      <Link href={telHref} className="font-semibold underline">
                        {phoneDisplay}
                      </Link>
                    </div>
                    <div className="mt-2 text-sm text-brand-600">
                      <Link href={`mailto:${contact.email.bookings}`} className="underline font-semibold">
                        {contact.email.bookings}
                      </Link>
                    </div>
                  </dd>
                </div>
                <div className="rounded-xl border border-brand-100 bg-brand-50/70 p-5 shadow-sm">
                  <dt className="text-sm font-semibold uppercase tracking-wide text-brand-600">Booking options</dt>
                  <dd className="mt-2 text-brand-700 leading-relaxed">
                    Book online, call us, or download the PDF and share with your group before confirming.
                  </dd>
                </div>
              </dl>
            </FadeInUp>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20" aria-labelledby="festive-highlights-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h2 id="festive-highlights-heading" className="h3 text-brand-800">
                  Why guests love our Christmas menu
                </h2>
                <p className="text-lg text-brand-600 leading-relaxed">
                  Warm pub hospitality meets bold Nepalese flavours on the green at Waterbeach.
                </p>
              </div>
            </FadeIn>
            <FadeInUp>
              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {HIGHLIGHT_CARDS.map((card) => (
                  <article
                    key={card.title}
                    className="h-full rounded-2xl border border-brand-100 bg-neutral-50 p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus-within:shadow-2xl"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-2xl" aria-hidden="true">
                      {card.icon}
                    </div>
                    <h3 className="h5 text-brand-700 mb-3 font-semibold">{card.title}</h3>
                    <p className="text-brand-600 leading-relaxed">{card.body}</p>
                  </article>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>

        <section className="bg-white pb-20" aria-labelledby="festive-support-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-6">
                  <h2 id="festive-support-heading" className="h3 text-brand-800">
                    Plan your visit with us
                  </h2>
                  <p className="text-lg text-brand-600 leading-relaxed">
                    Tell us about your guests, timings and any needs. We will reserve the right space, handle deposits and keep everything running smoothly.
                  </p>
                  <div className="flex flex-col gap-4">
                    <Link
                      href={`mailto:${contact.email.bookings}`}
                      className="inline-flex items-center gap-3 rounded-lg bg-brand-700 px-5 py-3 text-white shadow-lg transition hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-300"
                    >
                      <span aria-hidden="true" role="img">📧</span>
                      Email the festive team
                    </Link>
                    <Link
                      href={googleMapLink}
                      className="inline-flex items-center gap-3 rounded-lg border border-brand-200 px-5 py-3 text-brand-700 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-300"
                    >
                      <span aria-hidden="true" role="img">📍</span>
                      Visit {BRAND.fullName}
                    </Link>
                  </div>
                  <p className="text-sm text-brand-500 leading-relaxed">
                    Prefer a call? Ring us on <a className="font-semibold underline" href={telHref}>{phoneDisplay}</a> and ask for the Christmas team.
                  </p>
                </div>
                <div className="space-y-5">
                  {SUPPORT_POINTS.map((point) => (
                    <div
                      key={point.title}
                      className="rounded-xl border border-brand-100 bg-brand-50/60 p-6 shadow-md"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl" aria-hidden="true">
                        {point.icon}
                      </div>
                      <h3 className="h5 text-brand-700 font-semibold">{point.title}</h3>
                      <p className="text-brand-600 leading-relaxed">{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </RestaurantLayout>
    </>
  );
}
