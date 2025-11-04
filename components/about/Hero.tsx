'use client';

interface HeroProps {
  title: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-12 md:py-16" aria-labelledby="about-hero-heading">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 id="about-hero-heading" className="text-3xl md:text-4xl font-display font-bold leading-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 text-base md:text-lg text-brand-100 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

