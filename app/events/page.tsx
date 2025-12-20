import type { Metadata } from "next";
import RestaurantLayout from "@/components/restaurant/Layout";
import { getContactInfo } from "@/lib/restaurantData";
import { BRAND } from '@/src/lib/constants/brand';

export function generateMetadata(): Metadata {
  return {
    title: `Events & Matchdays | ${BRAND.fullName}`,
    description:
      'Book tables for derby days, join quiz nights, and plan private takeovers at Cambridge’s Corner House.',
  };
}

export default function EventsPage() {
  const contact = getContactInfo();
  const enquireHref = contact.bookingUrl ?? '/book-a-table';
  const bookingExternal = enquireHref.startsWith('http');
  const bookingAria = bookingExternal ? 'Book for big games (opens in new tab)' : 'Book for big games';
  const matchDayFeatures = [
    {
      icon: "📺",
      title: "HD screens everywhere",
      body: "Bar, snug, and garden projector views for every seat.",
    },
    { icon: "🔊", title: "Commentary zones", body: "Sky, TNT & Prime audio stays on for headline fixtures." },
    { icon: "🍔", title: "Match fuel", body: "Nepalese grills, wings, veggie plates, and pub classics till late." },
    { icon: "🌿", title: "Covered garden", body: "Projector-ready covered seating plus cosy indoor snugs for away fans and locals." },
  ];

  const sportsBadges = [
    { emoji: "⚽", label: "Premier League" },
    { emoji: "🏉", label: "Rugby" },
    { emoji: "🏏", label: "Cricket" },
    { emoji: "🎾", label: "Tennis" },
    { emoji: "🏎️", label: "F1" },
  ];

  const heroContent = {
    eyebrow: "What's on",
    title: `Matchdays & Events at ${BRAND.shortName}`,
    subtitle: 'HD sport on every screen, covered garden projector, private hire options, and free Sunday pool.',
    badges: ['Sky, TNT & Prime', 'Garden projector', 'Free Sunday pool'],
  };

  const experienceCards = [
    {
      title: 'Watch every match',
      description: 'Book seats by the main screens or the garden projector with commentary on.',
      cta: {
        label: 'Book fixtures',
        href: enquireHref,
        external: bookingExternal,
      },
    },
    {
      title: 'Private hire & garden tables',
      description: 'Reserve dining rooms, snugs, or covered garden tables with tailored menus and AV support.',
      cta: {
        label: 'Plan private hire',
        href: '/contact#contact-info-heading',
      },
    },
    {
      title: 'Free Sunday pool',
      description: 'Pool table is completely free every Sunday from midday.',
      cta: {
        label: 'Lock a table',
        href: '#sunday-pool',
      },
    },
  ];

  return (
    <RestaurantLayout>
      <main className="bg-white text-brand-900">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 text-white sm:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute -top-10 left-8 text-7xl">⚽</div>
            <div className="absolute top-12 right-16 text-8xl">🏉</div>
            <div className="absolute bottom-8 left-1/4 text-8xl">🏎️</div>
            <div className="absolute bottom-12 right-1/3 text-7xl">🎾</div>
            <div className="absolute top-1/2 left-10 text-7xl">🏏</div>
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                {heroContent.eyebrow}
              </span>
              <h1 className="text-4xl font-display font-bold sm:text-5xl">
                {heroContent.title}
              </h1>
              <p className="mx-auto max-w-3xl text-base text-white/80 sm:text-lg">
                {heroContent.subtitle}
              </p>
              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row sm:items-center">
                <a
                  href={enquireHref}
                  className="btn rounded-full border-white/15 bg-white/90 text-brand-900 hover:bg-white"
                  aria-label={bookingAria}
                  {...(bookingExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  Book for Big Games {bookingExternal && <span aria-hidden className="text-xs">↗</span>}
                </a>
                <a
                  href="/menu"
                  className="btn btn-outline rounded-full border-white/40 text-white hover:bg-white/10"
                  aria-label="View our menu"
                >
                  View Menu
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-2" aria-label="Hero badges">
                {heroContent.badges.map((badge) => (
                  <span key={badge} className="badge badge-outline border-white/40 text-white/80">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white via-brand-50/40 to-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experienceCards.map((card) => (
                <article key={card.title} className="rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-2xl">
                  <h2 className="text-2xl font-display text-brand-900">{card.title}</h2>
                  <p className="mt-2 text-brand-700">{card.description}</p>
                  <div className="mt-6">
                    <a
                      href={card.cta.href}
                      className="btn btn-outline rounded-full border-brand-200 text-brand-900"
                      aria-label={card.cta.external ? `${card.cta.label} (opens in new tab)` : card.cta.label}
                      {...(card.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {card.cta.label}
                      {card.cta.external ? <span aria-hidden className="text-xs">↗</span> : null}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 text-white sm:py-20" aria-labelledby="live-sport-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="rounded-[2.5rem] border border-white/15 bg-white/5 p-8 shadow-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1">
                    Live sport hub
                  </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1">
                  Garden projector
                </span>
                </div>
                <h2 id="live-sport-heading" className="mt-6 text-3xl font-display font-bold text-white">
                  Matchday essentials at {BRAND.shortName}
                </h2>
                <p className="mt-3 text-lg text-white/75">
                  Sky Sports, TNT, Prime, and BBC coverage across the bar, snug, garden pergola, and cabins.
                </p>
                <div className="mt-6 flex flex-wrap gap-2" aria-label="Sports we show">
                  {sportsBadges.map((sport) => (
                    <span key={sport.label} className="badge badge-outline border-white/40 text-white">
                      <span aria-hidden="true" className="mr-1">{sport.emoji}</span>
                      {sport.label}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {matchDayFeatures.map((feature) => (
                    <article key={feature.title} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white">
                      <span className="text-xl" aria-hidden="true">{feature.icon}</span>
                      <div>
                        <p className="font-semibold text-white">{feature.title}</p>
                        <p className="text-sm text-white/80">{feature.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6 rounded-[2.5rem] border border-white/15 bg-white/5 p-8 shadow-2xl">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">Broadcast partners</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Sky Sports', 'TNT Sports', 'Prime Video', 'BBC Sport'].map((partner) => (
                      <span key={partner} className="badge badge-outline border-white/30 text-white">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-white/85">
                  <p className="font-semibold text-white">Tournaments on deck</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>• Champions League midweeks</li>
                    <li>• Six Nations & Rugby Championship weekends</li>
                    <li>• F1 Sundays on the garden projector</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-white">
                  <p className="font-semibold">Need commentary or cabin service?</p>
                  <p className="text-sm text-white/80">
                    Add requests when you book or call the team so we can prep before kick-off.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={enquireHref}
                      className="btn btn-outline rounded-full border-white/40 text-white hover:bg-white/10"
                      aria-label={bookingAria}
                      {...(bookingExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      Add to booking {bookingExternal && <span aria-hidden className="text-xs">↗</span>}
                    </a>
                    <a
                      href={contact.phone.tel}
                      className="btn btn-ghost rounded-full border border-white/20 text-white hover:bg-white/10"
                      aria-label={`Call ${contact.phone.display}`}
                    >
                      Call {contact.phone.display}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[2.25rem] border border-brand-100 bg-white/95 p-8 shadow-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">Garden & snugs</p>
                <h2 className="mt-3 text-3xl font-display text-brand-900">Book covered garden tables or cosy snugs</h2>
                <p className="mt-3 text-brand-700">
                  Reserve covered garden seating by the projector or indoor snugs near the main screens — ideal for away fans, hotel guests, and local crews.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-brand-700">
                  <li>• Pre-order momo, sharing grills, or pub classics</li>
                  <li>• Commentary-on zones; fast service for kick-off</li>
                  <li>• 2-minute walk from Premier Inn & Travelodge</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={enquireHref}
                    className="btn btn-outline rounded-full border-brand-200 text-brand-900"
                    aria-label={bookingAria}
                    {...(bookingExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    Reserve a table {bookingExternal && <span aria-hidden className="text-xs">↗</span>}
                  </a>
                  <a href={contact.phone.tel} className="btn btn-ghost rounded-full border border-brand-100 text-brand-900 hover:bg-brand-50">
                    Call {contact.phone.display}
                  </a>
                </div>
              </article>
              <article className="rounded-[2.25rem] border border-brand-100 bg-white/95 p-8 shadow-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">Private hire</p>
                <h2 className="mt-3 text-3xl font-display text-brand-900">Dining rooms, snug, or full takeovers</h2>
                <p className="mt-3 text-brand-700">
                  From society socials to company wrap parties, we tailor layouts, AV, and menus so your crew can watch, dine, or celebrate without stress.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-brand-700">
                  <li>• Dedicated events lead + on-site tech</li>
                  <li>• Feasting menus, bar tabs, or bespoke pairings</li>
                  <li>• Optional quiz hosts, DJs, or sport screenings</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/contact#contact-info-heading" className="btn btn-outline rounded-full border-brand-200 text-brand-900">
                    Plan a takeover
                  </a>
                  <a href={contact.phone.tel} className="btn btn-ghost rounded-full border border-brand-100 text-brand-900 hover:bg-brand-50">
                    Call {contact.phone.display}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="sunday-pool"
          className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 text-white sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                  Sundays
                </span>
                <h2 className="mt-4 text-3xl font-display font-bold text-white sm:text-4xl">
                  Free pool every Sunday
                </h2>
                <p className="mt-3 text-white/75">
                  Drop in from midday for complimentary pool time—ideal for pre-match hangs, relaxed gatherings, or casual tournaments.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={enquireHref} className="btn rounded-full border-white/20 bg-white/90 text-brand-900" aria-label={bookingAria} {...(bookingExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    Book Sunday spot {bookingExternal && <span aria-hidden className="text-xs">↗</span>}
                  </a>
                  <a href={contact.phone.tel} className="btn btn-outline rounded-full border-white/40 text-white hover:bg-white/10">
                    Call to plan
                  </a>
                </div>
              </div>
              <div className="rounded-[2.5rem] border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">Why Sundays work</p>
                <h3 className="mt-3 text-2xl font-display text-white">Slow match build-ups, zero table fees</h3>
                <p className="mt-3 text-white/75">
                  Settle into the pool corner with mates, order sharers from the bar, or weave games between live sport—no coins needed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </RestaurantLayout>
  );
}
