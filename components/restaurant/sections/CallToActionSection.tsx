'use client';
import Link from '@/lib/debugLink';

/**
 * Props interfaces for CallToActionSection component
 */
interface CTAButton {
  text: string;
  href: string;
  variant: 'accent' | 'brand' | 'crimson';
  external?: boolean;
  key?: string;
}

interface CallToActionSectionProps {
  headline: string;
  description: string;
  buttons: CTAButton[];
  className?: string;
}

/**
 * CallToActionSection Component
 * 
 * Displays a call-to-action section with headline, description, and action buttons.
 * Extracted from inline section in /app/page.tsx for better modularity.
 * 
 * Features:
 * - Multiple button variants with design system colors
 * - External link handling with proper security attributes
 * - Framer Motion animations for enhanced UX
 * - Responsive button layout
 * - Full accessibility support
 */
export default function CallToActionSection({ 
  headline, 
  description, 
  buttons, 
  className = '' 
}: CallToActionSectionProps) {
  if (!headline || !buttons || buttons.length === 0) {
    return null;
  }

  /**
   * Get button styling based on variant using design system tokens
   */
  const getButtonClasses = (variant: CTAButton['variant']): string => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-base font-semibold transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5';
    
    switch (variant) {
      case 'accent':
        return `${baseClasses} border border-brand-200 bg-white text-brand-800 shadow-lg focus:ring-brand-300 hover:bg-neutral-50`;
      case 'brand':
        return `${baseClasses} border border-white/20 bg-brand-900 text-white shadow-xl focus:ring-white/30 hover:bg-brand-950`;
      case 'crimson':
        return `${baseClasses} border border-crimson-200 bg-white text-crimson-700 shadow-lg focus:ring-crimson-300 hover:bg-neutral-50`;
      default:
        return `${baseClasses} border border-brand-200 bg-white text-brand-800 shadow-lg focus:ring-brand-300 hover:bg-neutral-50`;
    }
  };

  return (
    <section className={`bg-neutral-100 py-12 sm:py-14 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-100 bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 md:p-10">
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">
              Exclusive
            </span>
            <h2 className="text-3xl font-display font-bold text-foreground-strong md:text-4xl">
              🎉 {headline}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-700">
              {description}
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {buttons.map((button, index) => {
                const isExternal = button.external || button.href.startsWith('http');
                const buttonProps = isExternal
                  ? {
                      target: '_blank' as const,
                      rel: 'noopener noreferrer' as const,
                      'aria-label': `${button.text} (opens in new tab)`
                    }
                  : {
                      'aria-label': button.text
                    };

                return (
                  <div key={button.key || button.text || index}>
                    <Link
                      href={button.href}
                      className={getButtonClasses(button.variant)}
                      {...buttonProps}
                    >
                      {button.text}
                      {isExternal && (
                        <span className="text-xs" aria-hidden="true">
                          ↗
                        </span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
