import type { Metadata } from "next";
import RestaurantLayout from "@/components/restaurant/Layout";
import { getContactInfo } from "@/lib/restaurantData";

export const metadata: Metadata = {
  title: "Events & What's On | The White Horse Waterbeach",
  description:
    "Live sports, regular happenings, and a weekly guide. Multiple screens, great food, family & dog-friendly.",
};

export default function EventsPage() {
  const contact = getContactInfo();
  const eventsEmail = contact.email.events ?? contact.email.primary;
  const enquireHref = contact.enquiryUrl || `mailto:${eventsEmail}`;
  const downloadHref = "/wakes-menu"; // Fallback while keeping static CTA label

  // Regular events section removed per request

  const matchDayFeatures = [
    {
      icon: "📺",
      title: "Multiple Screens",
      body: "Great views from bar and snug.",
    },
    { icon: "🔊", title: "Match Audio", body: "Commentary on for key fixtures." },
    { icon: "🍺", title: "Fresh Pints", body: "Lagers, cask ales & 0%." },
    { icon: "🍔", title: "Match Fuel", body: "Pub classics + Nepalese favourites." },
    { icon: "🪑", title: "Table Bookings", body: "Groups welcome for big games." },
  ];

  // Weekly Guide section removed per request

  return (
    <RestaurantLayout>
      <div className="bg-white">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <div className="space-y-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/90">
                What’s On
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                Events &amp; What’s On
              </h1>
              <p className="max-w-2xl mx-auto text-base md:text-lg text-white/90 leading-relaxed">
                Your home for live sport, community gatherings, and proper pub culture — with great food and a warm welcome every day.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center justify-center">
                <a
                  href={enquireHref}
                  className="btn btn-ghost text-white"
                  aria-label="Book for big games"
                >
                  Book for Big Games
                </a>
                <a
                  href="/menu"
                  className="btn btn-outline border-white text-white hover:bg-white/10"
                  aria-label="View our menu"
                >
                  View Menu
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Live Sport', 'Multiple Screens', 'Great Food'].map((t) => (
                  <span key={t} className="badge badge-outline border-white/40 text-white/90">{t}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Decorative sports emoji */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10 select-none">
            <div className="absolute -top-6 left-8 text-7xl">⚽</div>
            <div className="absolute top-10 right-16 text-8xl">🏉</div>
            <div className="absolute bottom-8 left-1/4 text-8xl">🏎️</div>
            <div className="absolute bottom-12 right-1/3 text-7xl">🎾</div>
            <div className="absolute top-1/2 left-10 text-7xl">🏏</div>
          </div>
        </section>

        {/* 2. Live Sports Banner */}
        <section className="relative bg-neutral-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="relative overflow-hidden rounded-2xl card bg-brand-700 text-white shadow-xl border border-brand-600">
              <div className="relative z-10 grid gap-6 p-8 md:p-10 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="badge badge-accent badge-outline gap-2">
                      <span className="relative inline-flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 rounded-full bg-current opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                      </span>
                      LIVE
                    </span>
                    <span className="badge badge-outline">Sky Sports</span>
                    <span className="badge badge-outline">TNT Sports</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    Big matches. Bigger atmosphere.
                  </h2>
                  <p className="text-white/90">
                    Premier League, Rugby, Cricket, Tennis, F1 and more — shown across multiple screens so you never miss the moments that matter.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2" aria-label="Sports we show">
                    {[
                      { e: "⚽", t: "Premier League" },
                      { e: "🏉", t: "Rugby" },
                      { e: "🏏", t: "Cricket" },
                      { e: "🎾", t: "Tennis" },
                      { e: "🏎️", t: "F1" },
                    ].map((s) => (
                      <span key={s.t} className="badge badge-outline">
                        <span aria-hidden="true" className="mr-1">{s.e}</span>
                        {s.t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-start lg:justify-end gap-3">
                  <a href={enquireHref} className="btn btn-outline border-white text-white hover:bg-white/10">Book for Big Games</a>
                </div>
              </div>
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl md:text-[12rem] lg:text-[16rem] font-extrabold tracking-tighter text-white/10 select-none">
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Regular Events section removed per request */}

        {/* 4. Match Day Experience Section */}
        <section className="bg-brand-900 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid gap-10 lg:grid-cols-2">
            {/* Left column */}
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">
                Match Day at The White Horse
              </h2>
              <p className="mt-3 text-white/80">
                Settle in with friends, follow every moment, and enjoy great food and drink while you watch. We’re built for sport — without losing the charm of a village pub.
              </p>
              <div className="mt-6 space-y-3">
                {matchDayFeatures.map((f) => (
                  <div key={f.title} className="flex items-start gap-3 rounded-lg border border-brand-100 bg-white p-4 text-brand-900">
                    <div className="text-xl" aria-hidden="true">{f.icon}</div>
                    <div>
                      <div className="font-semibold text-brand-900">{f.title}</div>
                      <div className="text-sm text-brand-700">{f.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right column */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-100 bg-white p-6 shadow-md text-brand-900">
              <div aria-hidden="true" className="absolute -right-4 -top-6 text-[10rem] opacity-10 select-none">📺</div>
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-md border border-brand-100 bg-neutral-50 px-3 py-1">
                  <span aria-hidden="true">📺</span>
                  <span className="text-sm text-brand-700">TVs across bar & snug</span>
                </div>
                <div>
                  <div className="text-sm text-brand-700/80">We show</div>
                  <ul className="mt-1 flex flex-wrap gap-2 text-sm">
                    {["Premier League", "FA Cup", "Champions League", "Rugby", "Cricket", "Tennis", "F1"].map((s) => (
                      <li key={s} className="badge badge-outline">{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline">Sky Sports</span>
                  <span className="badge badge-outline">TNT Sports</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Guide section removed per request */}
        {/* 6. Private Events CTA (design-system component) */}
        <section>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
            {/* Using shared CTA section for consistency */}
            {(() => {
              const CTA = require('@/components/restaurant/sections/CallToActionSection').default;
              return (
                <CTA
                  headline="Host Private Events & Group Bookings"
                  description="From celebrations and society socials to team gatherings — we’ve got flexible spaces, great food, and a friendly team to help plan it."
                  buttons={[
                    { text: 'Enquire About Private Events', href: enquireHref, variant: 'brand' },
                    { text: 'Download Events Pack', href: downloadHref, variant: 'accent' },
                  ]}
                  noBackground
                />
              );
            })()}
          </div>
        </section>
      </div>
    </RestaurantLayout>
  );
}
