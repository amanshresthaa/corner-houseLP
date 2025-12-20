'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
type AmenityItem = { icon?: string; text: string };

interface HomeAmenitiesSectionProps {
  title: string;
  subtitle?: string;
  amenities: AmenityItem[];
  className?: string;
}

export default function HomeAmenitiesSection({
  title,
  subtitle,
  amenities,
  className = ''
}: HomeAmenitiesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <section className={`bg-brand-800 py-16 text-white ${className}`} aria-labelledby="home-amenities-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 text-center">
          <h2 id="home-amenities-heading" className="text-3xl md:text-4xl font-display font-bold">
            {title}
          </h2>
          {subtitle && (
            <p className="text-brand-100 text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={mv.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0%' }}
        >
          {amenities.map((amenity, index) => {
            if (!amenity?.text) {
              return null;
            }

            return (
              <motion.li
                key={`${amenity.text}-${index}`}
                variants={prefersReducedMotion ? mv.fadeIn : mv.fadeUp}
                className="flex items-start gap-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur px-4 py-3 shadow-sm"
              >
                {amenity.icon && (
                  <span aria-hidden="true" className="text-2xl leading-none">
                    {amenity.icon}
                  </span>
                )}
                <span className="text-sm md:text-base text-brand-50">
                  {amenity.text}
                </span>
              </motion.li>
            );
          }).filter(Boolean)}
        </motion.ul>
      </div>
    </section>
  );
}
