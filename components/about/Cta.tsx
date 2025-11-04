'use client';

interface CtaProps {
  title: string;
  description?: string;
  primaryText: string;
  primaryHref: string;
}

export default function Cta({ title, description, primaryText, primaryHref }: CtaProps) {
  const isExternal = /^https?:/i.test(primaryHref);
  const anchorProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <section className="bg-brand-100 py-14" aria-labelledby="about-cta">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-brand-700 bg-gradient-to-r from-brand-600 to-brand-800 p-8 text-center text-white shadow-xl">
          <h2 id="about-cta" className="text-3xl md:text-4xl font-display font-bold drop-shadow">{title}</h2>
          {description ? <p className="mt-3 text-white/95">{description}</p> : null}
          <div className="mt-6">
            <a href={primaryHref} {...anchorProps} className="btn btn-lg bg-white text-brand-700 font-bold rounded-xl shadow-lg hover:bg-brand-50 border-2 border-brand-100">
              {primaryText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

