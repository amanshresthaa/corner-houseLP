'use client';

import { motion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
import Image from 'next/image';
import heroBg from '@cimages/Slideshow/whitehorsebuilding.png';
import { getContactInfo } from '@/lib/restaurantData';
import { useParsedData } from '@/hooks/useParsedData';
import { useContent } from '@/hooks/useContent';
import { useOpeningHours } from '@/hooks/data/useOpeningHours';
import { MarketingDataSchema } from '@/lib/schemas';
import Link from '@/lib/debugLink';
import { BRAND } from '@/src/lib/constants/brand';

export default function Hero() {
  const contact = getContactInfo();
  const phoneDisplay = contact.phone.display ?? contact.phone.primary;
  const { hours, isLoading: hoursLoading } = useOpeningHours();
  
  // Generate hours snippet from actual restaurant data
  const hoursSnippet = (() => {
    if (hoursLoading) return 'Loading hours...';
    if (!hours) return 'Open – see full hours';
    
    const { kitchenSummary, barSummary } = hours.summary;
    
    if (kitchenSummary && barSummary) {
      return `Kitchen: ${kitchenSummary} | Bar: ${barSummary}`;
    } else if (kitchenSummary) {
      return `Kitchen: ${kitchenSummary}`;
    } else if (barSummary) {
      return `Bar: ${barSummary}`;
    }
    
    return 'Open – see full hours';
  })();
  
  const { data: marketing } = useParsedData('marketing.json', MarketingDataSchema);
  const { data: content } = useContent();
  
  // Get content from content management system with fallbacks
  const heroContent = content?.pages?.home?.hero;
  const labelBookOnline = marketing?.buttons?.bookOnline || content?.global?.ui?.buttons?.bookOnline || 'Book Online';
  const labelCallForTakeaway = marketing?.buttons?.callForTakeaway || 'Call for Takeaway';
  const bookingUrl = contact.bookingUrl;
  
  // Hero content with fallbacks
  const heroTitle = heroContent?.title || 'Cambridge’s go-to sports pub with Nepalese plates and cosy snugs';
  const heroDescription = heroContent?.description || 'A 1930s art-deco corner pub opposite Cambridge Retail Park with Nepali-chef curries, heated cabins, HD sports screens, and CAMRA-awarded hospitality.';
  const heroCTA = heroContent?.cta || {};
  const primaryCTA = heroCTA.primary || labelBookOnline;
  const secondaryCTA = heroCTA.secondary || 'View Menu';

  const defaultPrimaryHref = heroCTA.primaryHref || '/book-a-table';
  const shouldUseBookingUrl = bookingUrl && (!heroCTA.primaryHref || heroCTA.primaryHref === '/book-a-table');
  const primaryHref = shouldUseBookingUrl ? bookingUrl : defaultPrimaryHref;
  const secondaryHref = heroCTA.secondaryHref || '/menu#starters';
  const primaryExternal = heroCTA.primaryExternal ?? (
    shouldUseBookingUrl || primaryHref.startsWith('http') || primaryHref.startsWith('tel:') || primaryHref.startsWith('mailto:')
  );
  const secondaryExternal = heroCTA.secondaryExternal ?? secondaryHref.startsWith('http');
  const altText =
    content?.global?.accessibility?.altTexts?.heroBanner ||
    `Art-deco exterior of ${BRAND.fullName} with cosy snugs and heated cabins`;
  
  // Feature tags from content or fallback
  const features = content?.pages?.home?.sections?.features?.items || [
    { title: 'Nepali chefs serving Himali Lamb & momo' },
    { title: 'Sky & TNT Sports + outdoor projector' },
    { title: 'Heated garden cabins & beer garden' },
    { title: 'Family & dog friendly with play space' },
    { title: 'TripAdvisor Travelers’ Choice 2025' }
  ];

  const renderCTAButton = (href: string, label: string, className: string, isExternal?: boolean) => {
    const safeLabel = label || 'Learn more';
    const destination = href || '/';
    const isTel = destination.startsWith('tel:');
    const isMail = destination.startsWith('mailto:');
    const isInternal = !isExternal && (destination.startsWith('/') || destination.startsWith('#'));
    const isAbsolute = isExternal || destination.startsWith('http');

    const content = (
      <>
        {(isTel ? '📞 ' : '')}
        {safeLabel}
      </>
    );

    if (isInternal) {
      return (
        <Link
          href={destination}
          className={className}
          aria-label={safeLabel}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        href={destination}
        className={className}
        aria-label={safeLabel}
        target={isAbsolute && !isTel && !isMail ? '_blank' : undefined}
        rel={isAbsolute && !isTel && !isMail ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  };
  
  return (
  <section className="relative h-[60vh] sm:h-[65vh] md:h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt={altText}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stout-900/80 via-stout-800/60 to-stout-700/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={mv.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0%' }}>
          {heroContent?.subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-accent-200 uppercase tracking-[0.35em] mb-4">
              {heroContent.subtitle}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-50 mb-6 leading-snug md:leading-tight">
            <span className="text-balance">{heroTitle}</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {heroDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-neutral-100 mb-10 max-w-3xl mx-auto">
            {features.map((feature: any, index: number) => (
              <span key={index} className="px-3 py-1 bg-neutral-50/15 rounded-full backdrop-blur border border-accent-400/25">
                {feature.title}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={mv.button.hover}
              whileTap={mv.button.tap}
              className="w-full sm:w-auto"
            >
              {renderCTAButton(
                primaryHref,
                primaryCTA,
                'inline-flex w-full items-center justify-center rounded-lg bg-brand-600 py-3 px-6 text-base font-bold text-neutral-50 shadow-lg transition-all duration-200 hover:bg-accent-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400 sm:py-4 sm:px-8 sm:text-lg',
                primaryExternal
              )}
            </motion.div>
            <motion.div
              whileHover={mv.button.hover}
              whileTap={mv.button.tap}
              className="w-full sm:w-auto"
            >
              {renderCTAButton(
                secondaryHref || contact.phone.tel,
                secondaryCTA || labelCallForTakeaway,
                'inline-flex w-full items-center justify-center rounded-lg bg-crimson-600 hover:bg-crimson-700 text-neutral-50 font-bold py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg shadow-lg transition-all duration-200',
                secondaryExternal || (secondaryHref?.startsWith('tel:') ?? false)
              )}
            </motion.div>
          </div>

          {/* Quick Info */}
          <motion.div variants={mv.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10% 0%' }}
            className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 text-neutral-100"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{contact?.address.area}, {contact?.address.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{hoursSnippet}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{phoneDisplay}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}
