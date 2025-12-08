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
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-neutral-50 to-brand-50 py-12 text-brand-900 sm:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(246,214,189,0.55),_transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">
                Takeaway ready
              </span>
              <h2 className="text-3xl font-display font-bold text-brand-950 sm:text-4xl lg:text-5xl">
                Take the {BRAND.nickname} feast home tonight
              </h2>
              <p className="max-w-2xl text-lg text-brand-700">
                From sizzling mixed grills to Nepalese curries and Sunday roasts, we box everything hot for collection or send it across Cambridge with our delivery partners.
              </p>
            </div>

            <div className="flex flex-wrap gap-3" data-testid="takeaway-banner-cta">
              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="btn border-none bg-brand-900 text-white shadow-xl transition hover:-translate-y-0.5"
                  aria-label={`Call to order at ${phoneDisplay}`}
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  Call to order
                </a>
              ) : null}
              <Link
                href="/menu#takeaway"
                className="btn btn-outline border-brand-200 text-brand-900 hover:border-brand-500 hover:bg-white"
              >
                <MenuSquare className="h-4 w-4" aria-hidden="true" />
                View takeaway menu
              </Link>
              <Link
                href="/takeaway"
                className="btn border-brand-200 bg-white/80 text-brand-900 hover:bg-white"
              >
                <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
                Order online
              </Link>
            </div>

            <div
              className="grid gap-4 text-left text-brand-900 sm:grid-cols-3"
              data-testid="takeaway-highlight-grid"
            >
              {highlightChips.map((chip, index) => (
                <div
                  key={`chip-${index}`}
                  className="rounded-2xl border border-brand-100 bg-white/80 p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                    {chip.icon}
                    <span>{chip.title}</span>
                  </div>
                  <p className="mt-1 text-sm text-brand-600">{chip.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/70 p-4 shadow-2xl">
              <div className="rounded-[2rem] border border-brand-100 bg-brand-900/10 p-2">
                <div className="relative h-[360px] w-full overflow-hidden rounded-[1.75rem]">
                  <Image
                    src="/images/white-horse/dishes/sizzler-mixed-grill-with-lemon-landscape.jpeg"
                    alt="Takeaway mixed grill platter ready for collection"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" aria-hidden="true" />
                </div>
              </div>
              <div className="absolute right-6 top-6 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-brand-900 shadow-xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                  <Flame className="h-4 w-4 text-brand-500" aria-hidden="true" />
                  Fresh off the grill
                </div>
                <p className="text-xs text-brand-600">Collection hotspot opposite Retail Park</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
