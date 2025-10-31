'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
import type { PressItem, RecognitionItem } from '@/app/_content/home-sections';

interface HomeRecognitionSectionProps {
  title: string;
  subtitle?: string;
  awards: RecognitionItem[];
  press: PressItem[];
  className?: string;
}

export default function HomeRecognitionSection({
  title,
  subtitle,
  awards,
  press,
  className = ''
}: HomeRecognitionSectionProps) {
  if ((!awards || awards.length === 0) && (!press || press.length === 0)) {
    return null;
  }

  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`bg-white py-16 ${className}`} aria-labelledby="home-recognition-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 id="home-recognition-heading" className="text-3xl md:text-4xl font-display font-bold text-brand-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-brand-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
          {awards && awards.length > 0 && (
            <motion.div
              className="space-y-4"
              variants={mv.staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-15% 0%' }}
            >
              <h3 className="text-xl font-display font-semibold text-brand-700">
                Awards & Listings
              </h3>
              {awards.map((item, index) => {
                if (!item?.title) {
                  return null;
                }
                const body = (
                  <motion.article
                    key={`${item.title}-${index}`}
                    variants={prefersReducedMotion ? mv.fadeIn : mv.fadeUp}
                    className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm text-accent-600 uppercase tracking-wide font-semibold">
                        {item.label && <span>{item.label}</span>}
                        {item.year && (
                          <span className="text-brand-500">• {item.year}</span>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-brand-800">
                        {item.title}
                      </h4>
                      {item.body && (
                        <p className="text-sm text-brand-600">
                          {item.body}
                        </p>
                      )}
                    </div>
                  </motion.article>
                );

                if (item.url) {
                  return (
                    <a
                      key={`${item.title}-${index}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-300 rounded-2xl"
                      aria-label={`Open ${item.title}`}
                    >
                      {body}
                    </a>
                  );
                }

                return body;
              }).filter(Boolean)}
            </motion.div>
          )}

          {press && press.length > 0 && (
            <motion.div
              className="space-y-4"
              variants={mv.staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-15% 0%' }}
            >
              <h3 className="text-xl font-display font-semibold text-brand-700">
                Press Highlights
              </h3>
              <div className="space-y-4">
                {press.map((item, index) => {
                  if (!item?.publication || !item?.headline) {
                    return null;
                  }

                  const content = (
                    <motion.article
                      key={`${item.publication}-${index}`}
                      variants={prefersReducedMotion ? mv.fadeIn : mv.fadeUp}
                      className="rounded-2xl border border-brand-100 bg-neutral-50 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                        {item.publication}
                      </p>
                      <h4 className="text-lg font-display font-semibold text-brand-800 mt-2">
                        {item.headline}
                      </h4>
                      {item.summary && (
                        <p className="text-sm text-brand-600 mt-3">
                          {item.summary}
                        </p>
                      )}
                      {item.quote && (
                        <blockquote className="mt-4 text-sm italic text-brand-600 border-l-2 border-accent-300 pl-3">
                          {item.quote}
                        </blockquote>
                      )}
                    </motion.article>
                  );

                  if (item.url) {
                    return (
                      <a
                        key={`${item.publication}-${index}`}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-300 rounded-2xl"
                        aria-label={`Read ${item.publication} coverage`}
                      >
                        {content}
                      </a>
                    );
                  }

                  return content;
                }).filter(Boolean)}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
