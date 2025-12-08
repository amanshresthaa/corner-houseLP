import Image from 'next/image';
import sportsImage from '@cimages/Slideshow/bar-counter-cozy-lighting-taps-and-shelves-landscape.png';
import Link from '@/lib/debugLink';
import React from 'react';
import { BRAND } from '@/src/lib/constants/brand';

export const SportsSlide: React.FC = () => {
  return (
    <section
      aria-roledescription="slide"
      aria-label={`Live sports at ${BRAND.fullName}`}
      className="relative bg-neutral-900 text-white overflow-hidden rounded-lg shadow-lg"
    >
      <figure className="relative w-full h-[420px] sm:h-[520px]">
        <Image
          src={sportsImage}
          alt="Warm wood bar with pendant lighting, glass racks, and polished beer taps ready for matchday service"
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover filter brightness-[0.55]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />
        <figcaption id="sports-slide-desc" className="sr-only">
          {`Copper-topped ${BRAND.nickname} bar with HD screens, polished taps, and glass racks ready for Cambridge matchdays.`}
        </figcaption>
      </figure>

      <div className="p-6 md:p-8 lg:p-10">
        <p className="text-sm font-semibold text-accent-200">SKY SPORTS · TNT · OUTDOOR PROJECTOR</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
          Cambridge’s go-to pub for Premier League, rugby, and big finals
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-100 max-w-3xl">
          Opposite Cambridge Retail Park and minutes from Abbey Stadium, {BRAND.shortName} keeps every
          Premier League weekend, Champions League tie, and international clash on wall-to-wall HD screens
          and the heated garden projector. Reserve matchday cabins, share momo platters at halftime,
          and soak up the electric sports-bar energy with crisp pints and Nepali grills.
        </p>

        <div className="mt-5 flex gap-3">
          <Link href="/book" className="inline-block bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-md font-medium">
            Book a Table
          </Link>
          <Link href="/events" className="inline-block border border-white/20 text-white px-4 py-2 rounded-md">
            See Fixtures & Events
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-300">Image caption: {BRAND.nickname} matchday bar — polished taps, cocktails, and HD screens glowing for kick-off.</p>
        <p className="mt-2 text-xs text-gray-400">Photo: {BRAND.fullName}</p>
      </div>
    </section>
  );
};

export default SportsSlide;
