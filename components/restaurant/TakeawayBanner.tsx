'use client';

import EmojiIcon from '@/components/common/EmojiIcon';
import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';

export default function TakeawayBanner() {
  const contact = getContactInfo();
  const phoneDisplay = contact.phone.display;
  const phoneHref = contact.phone.tel;
  return (
    <section className="bg-gradient-to-r from-neutral-100 via-neutral-50 to-white py-11 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center text-brand-800">
          <div className="flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
              <EmojiIcon emoji="🥡" size="lg" />
              Takeaway ready
            </span>
            <h2 className="text-3xl font-display font-bold md:text-4xl text-foreground-strong">
              Take the {BRAND.nickname} feast home
            </h2>
          </div>

          <p className="max-w-3xl text-lg md:text-xl md:leading-relaxed">
            Order Himali lamb curries, goat specials, sizzling grills, or Sunday roasts for collection — boxed, hot, and ready opposite Cambridge Retail Park.
          </p>

          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-9 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100"
            aria-label={`Call to order at ${phoneDisplay}`}
          >
            <EmojiIcon emoji="📞" className="text-xl" />
            Call to order: {phoneDisplay}
          </a>

          <div className="flex w-full flex-wrap justify-center gap-3 text-sm font-semibold text-brand-700 md:text-base">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 shadow-sm">
              <EmojiIcon emoji="⏰" size="lg" />
              <span>Ready in 20–30 mins</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 shadow-sm">
              <EmojiIcon emoji="🚗" size="lg" />
              <span>Free collection</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 shadow-sm">
              <EmojiIcon emoji="📞" size="lg" />
              <span>Call for today&apos;s menu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
