/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from '@/lib/debugLink';
import { getContactInfo } from '@/lib/restaurantData';

type Props = {
  labelBookOnline: string;
  labelOrderTakeaway: string;
};

export default function MenuHero({ labelBookOnline, labelOrderTakeaway }: Props) {
  const contact = getContactInfo();
  const phoneHref = contact.phone.tel;
  return (
  <section className="py-8 bg-gradient-to-br from-stout-800 to-stout-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Menu — Nepalese & Pub Classics</h1>
        <p className="text-sm sm:text-base text-neutral-200 mb-4">Curated menu — quick to scan. Book or order takeaway.</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/book-a-table"
            className="bg-accent text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors hover:bg-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-400"
            aria-label={labelBookOnline}
          >
            {labelBookOnline}
          </Link>
          <a href={phoneHref} className="bg-crimson-500 text-white font-semibold py-2 px-4 rounded-md text-sm">
            {labelOrderTakeaway}
          </a>
        </div>
      </div>
    </section>
  );
}
