'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { variants as mv } from '@/lib/motion/variants';
import type { GalleryImage } from '@/app/_content/home-sections';

interface HomeGallerySectionProps {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  className?: string;
}

export default function HomeGallerySection({
  title,
  subtitle,
  images,
  className = ''
}: HomeGallerySectionProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`bg-neutral-950 py-16 text-white ${className}`} aria-labelledby="home-gallery-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 id="home-gallery-heading" className="text-3xl md:text-4xl font-display font-bold">
            {title}
          </h2>
          {subtitle && (
            <p className="text-brand-200 text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={mv.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0%' }}
        >
          {images.map((image, index) => {
            if (!image?.src) {
              return null;
            }

            const aspectClass =
              image.orientation === 'portrait'
                ? 'aspect-[3/4]'
                : image.orientation === 'landscape'
                ? 'aspect-[4/3]'
                : 'aspect-[4/3]';

            return (
              <motion.figure
                key={`${image.src}-${index}`}
                variants={prefersReducedMotion ? mv.fadeIn : mv.fadeUp}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg ${aspectClass}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={index === 0}
                />
                {image.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-black/0 px-3 py-4 text-sm md:text-base font-medium">
                    {image.caption}
                  </figcaption>
                )}
              </motion.figure>
            );
          }).filter(Boolean)}
        </motion.div>
      </div>
    </section>
  );
}
