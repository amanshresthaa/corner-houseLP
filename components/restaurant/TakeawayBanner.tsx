'use client';

import Image from 'next/image';
import Link from '@/lib/debugLink';
import { PhoneCall, MenuSquare, UtensilsCrossed, Clock, Flame, Truck, BadgeCheck } from 'lucide-react';
import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';

const highlightChips = [
  {
    icon: <Clock className="h-4 w-4" aria-hidden="true" />,
    title: '20–30 mins',
    description: 'avg prep time',
  },
  {
    icon: <Truck className="h-4 w-4" aria-hidden="true" />,
    title: 'Collection & delivery',
    description: 'Cambridge coverage',
  },
  {
    icon: <BadgeCheck className="h-4 w-4" aria-hidden="true" />,
    title: 'Partnered apps',
    description: 'Deliveroo • Uber Eats • Just Eat',
  },
];

const formatTelHref = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  const digits = value.replace(/[^+\d]/g, '');
  return digits ? `tel:${digits}` : undefined;
};

export default function TakeawayBanner() {
  const contact = getContactInfo();
  const phoneDisplay = contact.phone.display;
  const phoneHref = formatTelHref(phoneDisplay);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,233,212,0.12),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
                Takeaway ready
              </span>
              <h2 className="text-3xl font-display font-bold text-white sm:text-4xl lg:text-5xl">
                Take the {BRAND.nickname} feast home tonight
              </h2>
              <p className="max-w-2xl text-lg text-white/80">
                From sizzling mixed grills to Himalayan curries and pub classics, we box everything hot for collection or send it across Cambridge with our delivery partners.
              </p>
            </div>

            <div className="flex flex-wrap gap-3" data-testid="takeaway-banner-cta">
              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="btn border-none bg-accent text-white shadow-xl transition hover:-translate-y-0.5"
                  aria-label={`Call to order at ${phoneDisplay}`}
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  Call to order
                </a>
              ) : null}
              <Link
                href="/menu#takeaway"
                className="btn btn-outline border-white/30 text-white hover:border-white/50 hover:bg-white/10"
              >
                <MenuSquare className="h-4 w-4" aria-hidden="true" />
                View takeaway menu
              </Link>
              <Link
                href="/takeaway"
                className="btn border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
                Order online
              </Link>
            </div>

            <div
              className="grid gap-4 text-left text-white sm:grid-cols-3"
              data-testid="takeaway-highlight-grid"
            >
              {highlightChips.map((chip, index) => (
                <div
                  key={`chip-${index}`}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    {chip.icon}
                    <span>{chip.title}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{chip.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl">
              <div className="rounded-[2rem] border border-white/10 bg-black/20 p-2">
                <div className="relative h-[360px] w-full overflow-hidden rounded-[1.75rem]">
                  <Image
                    src="/assets-dishes/mixed-grill.png"
                    alt="Sizzling mixed grill platter ready for collection"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" aria-hidden="true" />
                </div>
              </div>
              <div className="absolute right-6 top-6 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-white shadow-xl backdrop-blur">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Flame className="h-4 w-4 text-accent" aria-hidden="true" />
                  Fresh off the grill
                </div>
                <p className="text-xs text-white/70">Collection hotspot opposite Retail Park</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
