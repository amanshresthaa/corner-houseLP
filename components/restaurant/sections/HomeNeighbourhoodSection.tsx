'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
type NeighbourhoodSpot = {
  category?: string;
  name: string;
  description?: string;
  distance?: string;
  url?: string;
};

interface HomeNeighbourhoodSectionProps {
  title: string;
  subtitle?: string;
  spots: NeighbourhoodSpot[];
  className?: string;
}

export default function HomeNeighbourhoodSection({
  title,
  subtitle,
  spots,
  className = ''
}: HomeNeighbourhoodSectionProps) {
  if (!spots || spots.length === 0) {
    return null;
  }

  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`bg-white py-16 ${className}`} aria-labelledby="home-neighbourhood-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 text-center">
          <h2 id="home-neighbourhood-heading" className="text-3xl md:text-4xl font-display font-bold text-brand-800">
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
          {spots.map((spot, index) => {
            if (!spot?.name) {
              return null;
            }

            return (
              <motion.article
                key={`${spot.name}-${index}`}
                variants={prefersReducedMotion ? mv.fadeIn : mv.fadeUp}
                className="h-full rounded-2xl border border-brand-100 bg-brand-50/40 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
              >
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent-600 font-semibold">
                    {spot.category}
                  </p>
                  <h3 className="text-lg font-display font-semibold text-brand-800">
                    {spot.name}
                  </h3>
                </div>
                {spot.description && (
                  <p className="text-sm text-brand-600 flex-1">
                    {spot.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-brand-700">
                  <span className="font-medium">{spot.distance}</span>
                  {spot.url && (
                    <a
                      href={spot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-500 font-semibold underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 rounded-sm"
                      aria-label={`Open visitor information for ${spot.name}`}
                    >
                      Visit site ↗
                    </a>
                  )}
                </div>
              </motion.article>
            );
          }).filter(Boolean)}
        </motion.div>
      </div>
    </section>
  );
}
