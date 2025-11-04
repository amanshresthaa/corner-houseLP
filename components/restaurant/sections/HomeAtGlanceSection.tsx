'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
type AtGlanceDetail = { label: string; value: string; href?: string; ariaLabel?: string };
type AtGlanceCard = { icon?: string; title: string; description?: string; details?: AtGlanceDetail[] };
import Link from '@/lib/debugLink';

interface HomeAtGlanceSectionProps {
  title: string;
  subtitle?: string;
  cards: AtGlanceCard[];
  className?: string;
}

export default function HomeAtGlanceSection({
  title,
  subtitle,
  cards,
  className = ''
}: HomeAtGlanceSectionProps) {
  if (!cards || cards.length === 0) {
    return null;
  }

  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`bg-white py-16 ${className}`} aria-labelledby="home-at-a-glance-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 id="home-at-a-glance-heading" className="text-3xl md:text-4xl font-display font-bold text-brand-700">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-brand-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={mv.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0%' }}
        >
          {cards.map((card, index) => {
            if (!card?.title) {
              return null;
            }

            return (
              <motion.article
                key={card.title}
                variants={prefersReducedMotion ? mv.fadeIn : mv.fadeUp}
                className="rounded-2xl border border-brand-100/70 bg-brand-50/30 p-6 shadow-md hover-lift gpu-fix transition-transform duration-200"
              >
                <div className="flex items-start gap-4">
                  {card.icon && (
                    <span aria-hidden="true" className="text-3xl leading-none">
                      {card.icon}
                    </span>
                  )}
                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-semibold text-brand-800">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-sm text-brand-600">
                        {card.description}
                      </p>
                    )}
                    <ul className="space-y-2 text-sm text-brand-700">
                      {card.details?.map((detail, detailIndex) => {
                        if (!detail?.value) {
                          return null;
                        }
                    const content = (
                      <>
                        <span className="font-semibold text-brand-800">{detail.label}:</span>{' '}
                        <span>{detail.value}</span>
                      </>
                    );
                    if (detail.href) {
                      const isExternal = detail.href.startsWith('http');
                      const isTel = detail.href.startsWith('tel:');
                      const isMail = detail.href.startsWith('mailto:');
                      if (isExternal || isTel || isMail) {
                        return (
                          <li key={`${card.title}-${detail.label}-${detailIndex}`}>
                            <a
                              href={detail.href}
                              className="text-accent-600 hover:text-accent-500 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 rounded-sm"
                              aria-label={detail.ariaLabel ?? detail.value}
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                            >
                              {content}
                            </a>
                          </li>
                        );
                      }

                      return (
                        <li key={`${card.title}-${detail.label}-${detailIndex}`}>
                          <Link
                            href={detail.href}
                                className="text-accent-600 hover:text-accent-500 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 rounded-sm"
                                aria-label={detail.ariaLabel ?? detail.value}
                              >
                                {content}
                              </Link>
                            </li>
                          );
                        }

                        return (
                          <li key={`${card.title}-${detail.label}-${detailIndex}`}>
                            {content}
                          </li>
                        );
                      }).filter(Boolean)}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          }).filter(Boolean)}
        </motion.div>
      </div>
    </section>
  );
}
