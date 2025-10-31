'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
import type { RatingStat } from '@/app/_content/home-sections';
import Link from '@/lib/debugLink';

interface HomeRatingsSectionProps {
  title: string;
  subtitle?: string;
  ratings: RatingStat[];
  className?: string;
}

export default function HomeRatingsSection({
  title,
  subtitle,
  ratings,
  className = ''
}: HomeRatingsSectionProps) {
  if (!ratings || ratings.length === 0) {
    return null;
  }

  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`bg-brand-50 py-16 ${className}`} aria-labelledby="home-ratings-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 id="home-ratings-heading" className="text-3xl md:text-4xl font-display font-bold text-brand-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-brand-600 text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={mv.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0%' }}
        >
          {ratings.map((rating, index) => {
            if (!rating?.source) {
              return null;
            }

            const content = (
              <motion.article
                key={`${rating.source}-${index}`}
                variants={prefersReducedMotion ? mv.fadeIn : mv.fadeUp}
                className="h-full rounded-2xl border border-brand-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-display font-semibold text-brand-800">
                  {rating.source}
                </h3>
                <p className="text-3xl font-bold text-accent-600 mt-3">
                  {rating.rating}
                </p>
                {rating.reviews && (
                  <p className="text-sm text-brand-600 mt-2">
                    {rating.reviews}
                  </p>
                )}
                {rating.highlight && (
                  <p className="text-sm text-brand-700 mt-4">
                    {rating.highlight}
                  </p>
                )}
                {rating.quote && (
                  <blockquote className="mt-5 text-sm italic text-brand-600 border-l-2 border-accent-300 pl-3">
                    {rating.quote}
                  </blockquote>
                )}
              </motion.article>
            );

            if (rating.url) {
              const external = rating.url.startsWith('http');
              if (external) {
                return (
                  <a
                    key={`${rating.source}-${index}`}
                    href={rating.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-300 rounded-2xl"
                    aria-label={`Open ${rating.source} reviews`}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link
                  key={`${rating.source}-${index}`}
                  href={rating.url}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-300 rounded-2xl"
                  aria-label={`Open ${rating.source} reviews`}
                >
                  {content}
                </Link>
              );
            }

            return content;
          }).filter(Boolean)}
        </motion.div>
      </div>
    </section>
  );
}
