'use client';

import Link from '@/lib/debugLink';

interface QuickItem {
  title: string;
  description: string;
  href: string;
  cta: string;
}

interface AboutQuickLinksProps {
  items: QuickItem[];
  className?: string;
}

export default function AboutQuickLinks({ items = [], className = '' }: AboutQuickLinksProps) {
  if (!items.length) return null;

  return (
    <section className={`bg-brand-900 py-12 text-neutral-50 ${className}`} aria-labelledby="about-quick-links">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="about-quick-links" className="sr-only">Quick Links</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-1">
              <h3 className="mb-2 font-display text-xl font-bold text-white">{it.title}</h3>
              <p className="mb-4 text-sm text-neutral-200">{it.description}</p>
              <Link href={it.href} className="inline-flex items-center gap-2 text-sm font-semibold text-accent-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900" aria-label={`${it.title}: ${it.cta}`}>
                {it.cta}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

