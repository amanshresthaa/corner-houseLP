import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
}

interface GallerySectionProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  images: GalleryImage[];
}

export default function GallerySection({
  title = 'Gallery',
  eyebrow = 'In photos',
  description = 'Moments inside the art-deco house — heated cabins, momo steam, and late-night glow.',
  images,
}: GallerySectionProps) {
  if (!images?.length) {
    return null;
  }

  return (
    <section className="bg-stout-950 py-16 text-white sm:py-20" aria-labelledby="about-gallery">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">{eyebrow}</p>
          <div>
            <h2 id="about-gallery" className="text-3xl font-display font-bold sm:text-4xl">
              {title}
            </h2>
            {description ? <p className="mt-2 text-white/80">{description}</p> : null}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, idx) => (
            <figure
              key={`about-gallery-${idx}`}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              {image.label ? (
                <figcaption className="px-4 py-3 text-sm font-semibold text-white/90">
                  {image.label}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
