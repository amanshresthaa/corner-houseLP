'use client';
import Link from '@/lib/debugLink';
import { motion, useReducedMotion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
import { sanitizeHref, createHrefKey, isValidHref, logHrefIssue } from '@/utils/href';

/**
 * Props interface for QuickLinksSection component
 * Following the established pattern from existing components
 */
export interface QuickLinkItem {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
}

interface QuickLinksSectionProps {
  links: QuickLinkItem[];
  className?: string;
}

/**
 * QuickLinksSection Component
 * 
 * Displays a grid of quick navigation links for the home page.
 * Extracted from inline section in /app/page.tsx for better modularity.
 * 
 * Features:
 * - Responsive grid layout (1 col mobile, 3 cols desktop)
 * - Framer Motion animations following existing patterns
 * - Semantic HTML and accessibility features
 * - Design system color tokens
 */
export default function QuickLinksSection({ links, className = '' }: QuickLinksSectionProps) {
  if (!links || links.length === 0) {
    return null;
  }

  const prefersReduced = useReducedMotion();
  const itemVariant = prefersReduced ? mv.fadeIn : mv.fadeUp;

  return (
    <section className={`bg-brand-900 py-11 text-neutral-50 sm:py-12 ${className} lazy-section`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          variants={mv.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0%' }}
        >
          {links.map((link, index) => {
            // Skip items with missing required data
            if (!link.title || !link.description || !link.link || !link.linkText) {
              return null;
            }

            return (
              <motion.div
                key={index}
                variants={itemVariant as any}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-neutral-50 shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent-200/60 hover:shadow-2xl focus-within:border-accent-200/60 focus-within:shadow-2xl"
                whileHover={prefersReduced ? undefined : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="mb-2 font-display text-xl font-bold text-white">
                  {link.title}
                </h3>
                <p className="mb-4 text-sm text-neutral-200">
                  {link.description}
                </p>
                <Link
                  key={index}
                  href={sanitizeHref(link.link)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
                  aria-label={`${link.title}: ${link.linkText}`}
                >
                  {link.linkText}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
