/* eslint-disable react/no-unescaped-entities */
import RestaurantLayout from "@/components/restaurant/Layout";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import { getContentSmart } from '@/src/lib/data/server-loader';
import { SchemaInjector } from "@/components/seo/RestaurantSchema";
import Image from "next/image";
import Link from "next/link";
import contentConfig from '@/config/content.json';
import siteConfig from '@/config';

export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages as any)?.about?.seo || {};
  return getSEOTags({
    title: seo.title,
    description: seo.description,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/about',
    openGraph: seo.openGraph,
  });
}

export default function AboutPage() {
  return (
    <RestaurantLayout>
      <style
        dangerouslySetInnerHTML={{
          __html: `@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}html:focus-within{scroll-behavior:auto!important}}`,
        }}
      />
      {renderSchemaTags()}
      <SchemaInjector
        type="breadcrumb"
        data={(() => {
          const base = (process.env.NEXT_PUBLIC_SITE_URL || `https://${siteConfig.domainName}/`).replace(/\/$/, '/');
          return [
            { name: "Home", url: `${base}` },
            { name: "About", url: `${base}about` },
          ];
        })()}
        page="about"
      />

      <main id="main">
        <Hero />
        <OriginStory />
        <MissionVisionValues />
        <WhatWeDo />
        <ProofCredibility />
        <CallToAction />
      </main>
    </RestaurantLayout>
  );
}

// 1) Hero / Opening
function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-10 md:py-16" aria-labelledby="about-hero">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 id="about-hero" className="text-2xl md:text-3xl font-display font-bold text-white mb-3 leading-tight">
          A village pub with Nepalese soul
        </h1>
        <p className="text-base md:text-lg text-brand-100 mb-6 max-w-2xl mx-auto leading-relaxed">
          Opposite the Waterbeach green, we pair classic pub comfort with an authentic Nepalese kitchen — modern, relaxed, and welcoming.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/book-a-table"
            className="bg-white hover:bg-neutral-50 text-brand-800 border-2 border-brand-200 font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {contentConfig.global?.ui?.buttons?.bookOnline || 'Book Online'}
          </Link>
          <Link
            href="/takeaway"
            className="bg-brand-900 hover:bg-brand-950 text-white border-2 border-white/20 font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {contentConfig.global?.ui?.buttons?.orderTakeaway || 'Order Takeaway'}
          </Link>
        </div>
      </div>
    </section>
  );
}

// 2) The Origin Story
function OriginStory() {
  return (
    <section className="py-14" aria-labelledby="origin">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="origin" className="text-2xl font-display font-bold text-stout-700">
          Our origin
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-4 text-brand-800">
            <p>
              Why we exist: to keep a vital village pub alive and thriving — and to introduce Waterbeach to warm, generous Nepalese cooking.
            </p>
            <p>
              How we started: in 2025, new local-minded owners reopened The White Horse, preserving the pub’s social heart while launching a true Nepalese kitchen.
            </p>
            <ul className="grid gap-2 text-sm" aria-label="Key turning points">
              <li>• 2009: A large garden and Asian flavours begin to shape the offer.</li>
              <li>• 2023: Gastropub era with classic British/Italian dishes.</li>
              <li>• 2025: Revival under new ownership; authentic Nepalese dining meets the village pub.</li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-brand-100">
              <Image
                src="/images/white-horse/interior/bar-counter-cozy-lighting-taps-and-shelves-landscape.jpeg"
                alt="Warm, welcoming bar at The White Horse"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3) Mission / Vision / Values
function MissionVisionValues() {
  const cards = [
    {
      title: "Mission",
      text: "Bring people together with classic pub hospitality and true Nepalese flavour.",
    },
    {
      title: "Vision",
      text: "A lively, inclusive village hub — rooted in tradition, open to new tastes.",
    },
    {
      title: "Values",
      list: [
        "Community-first",
        "Warm, modern hospitality",
        "Quality & authenticity",
        "Family & dog friendly",
      ],
    },
  ];

  return (
    <section className="bg-brand-900 text-neutral-50 py-12" aria-labelledby="mvv">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="mvv" className="text-2xl font-display font-bold">
          Mission, vision & values
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <article key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-white">{c.title}</h3>
              {c.text ? (
                <p className="text-neutral-200 mt-1">{c.text}</p>
              ) : (
                <ul className="grid gap-2 text-sm text-neutral-200 mt-1">
                  {c.list?.map((v, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span aria-hidden>•</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4) What You Do / Offer
function WhatWeDo() {
  const items = [
    {
      title: "Dine-in",
      text: "Authentic Nepalese dishes and comforting pub favourites in modern, relaxed surroundings.",
      cta: { label: "View Menu", href: "/menu" },
    },
    {
      title: "Takeaway",
      text: "Enjoy our Nepalese kitchen at home with a full takeaway menu.",
      cta: { label: "Order Takeaway", href: "/takeaway" },
    },
    {
      title: "Who we serve",
      text: "Families, friends, sports fans and food lovers — with an easy, welcoming bar and a spacious garden.",
      cta: { label: "What’s On", href: "/events" },
    },
  ];

  return (
    <section className="py-14 bg-neutral-50" aria-labelledby="what-we-do">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="what-we-do" className="text-2xl font-display font-bold text-stout-700">
          What we do
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <article key={i} className="card bg-white shadow-lg ring-1 ring-brand-100">
              <div className="card-body">
                <h3 className="card-title text-lg">{it.title}</h3>
                <p className="text-brand-800">{it.text}</p>
                <Link href={it.cta.href} className="btn btn-sm mt-3 bg-brand-700 text-white hover:bg-brand-600">
                  {it.cta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5) The Team (brief, human)
// Team section removed per request

// 6) Proof / Credibility
function ProofCredibility() {
  const proofs = [
    {
      k: "Reopened",
      v: "Feb 2025 — saved and revived for the village",
    },
    {
      k: "Press",
      v: "Local coverage of our relaunch and Nepalese menu",
      href: "/press",
    },
    {
      k: "Cask ales",
      v: "Well‑kept handpulls and a proper pub bar",
    },
    {
      k: "Garden",
      v: "Large rear garden for sunny gatherings",
    },
  ];
  return (
    <section className="py-14 bg-brand-900 text-neutral-50" aria-labelledby="proof">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="proof" className="text-2xl font-display font-bold">
          Proof & credibility
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proofs.map((p, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-200">{p.k}</span>
              {p.href ? (
                <Link href={p.href} className="block mt-1 text-neutral-50 underline underline-offset-4">
                  {p.v}
                </Link>
              ) : (
                <span className="block mt-1 text-neutral-50">{p.v}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7) Call to Action
function CallToAction() {
  return (
    <section className="bg-brand-100 py-14" aria-labelledby="about-cta">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-brand-700 bg-gradient-to-r from-brand-600 to-brand-800 p-8 text-center text-white shadow-xl">
          <h2 id="about-cta" className="text-3xl md:text-4xl font-display font-bold drop-shadow">
            Ready to visit The White Horse?
          </h2>
          <p className="mt-3 text-white/95">Book a table, or pop in for a pint and a bite.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/book-a-table"
              className="btn btn-lg bg-white text-brand-700 font-bold rounded-xl shadow-lg hover:bg-brand-50 border-2 border-brand-100"
            >
              Book Online
            </Link>
            <a
              href="tel:+441223375578"
              className="btn btn-lg bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              Call +44 1223 375578
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
