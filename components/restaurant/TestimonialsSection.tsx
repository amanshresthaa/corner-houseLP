"use client";

import React, { useEffect, useRef } from 'react';
import { AutoMarquee } from './AutoMarquee';
import { getReviewLinks } from '@/lib/restaurantData';
import { replaceBrandTokens } from '@/src/lib/utils/brand';
import { BRAND } from '@/src/lib/constants/brand';

interface Review {
  id: string;
  platform: 'google' | 'tripadvisor';
  stars: number;
  text: string;
  reviewer: {
    name: string;
    initials: string;
    timeAgo: string;
  };
}

const rawReviews: Review[] = [
  {
    id: "review_tony_b",
    platform: "tripadvisor",
    stars: 5,
    text: "Had the Himali Lamb Curry and it was superb! Friendly staff walked us through the Nepalese dishes, cask ales flowed, HD sports were on, and we ended up visiting three times in one weekend.",
    reviewer: { name: "Tony B.", initials: "TB", timeAgo: "Nov 2025" }
  },
  {
    id: "review_colin_s",
    platform: "tripadvisor",
    stars: 5,
    text: "Fantastic night in a lovely art-deco pub. Attentive team, brilliant atmosphere, and great drinks for our Cambridge reunion group — highly recommended for friends meeting up near the city.",
    reviewer: { name: "Colin S.", initials: "CS", timeAgo: "Nov 2025" }
  },
  {
    id: "review_cv",
    platform: "tripadvisor",
    stars: 5,
    text: "Old pub with a twist: proper pub grub plus Nepalese stars like lamb curry and sizzling platters. Lovely folk behind the bar, good beers, and Sky Sports on so you never miss the match.",
    reviewer: { name: "C.V.", initials: "CV", timeAgo: "Oct 2025" }
  },
  {
    id: "review_frances_d",
    platform: "tripadvisor",
    stars: 5,
    text: "Family-friendly service from the moment we crossed over from the Premier Inn. {{brand.shortName}} handled special diets with ease and served both comforting pub classics and fragrant saag aloo and naan.",
    reviewer: { name: "Frances D.", initials: "FD", timeAgo: "Jan 2025" }
  },
  {
    id: "review_josh_p",
    platform: "google",
    stars: 5,
    text: "Second visit and the curry is still outstanding. Prices are very reasonable for Cambridge, flavours are bold, and the friendly team makes it my go-to spot for a pint and momo night.",
    reviewer: { name: "Josh P.", initials: "JP", timeAgo: "Aug 2025" }
  },
  {
    id: "review_family_cambridge",
    platform: "tripadvisor",
    stars: 5,
    text: "Great pub for all ages — our kids loved the cosy snugs while we enjoyed goat curry and the mixed grill. The heated garden cabins and quiz-night energy make it a true Cambridge community hub.",
    reviewer: { name: "Local Family", initials: "LF", timeAgo: "2025" }
  }
];

const reviews: Review[] = rawReviews.map((review) => ({
  ...review,
  text: replaceBrandTokens(review.text),
}));

const TestimonialsSection: React.FC = () => {
  const reviewLinks = getReviewLinks();
  const isValidHref = (href?: string) => Boolean(href && href.trim() && href.trim() !== '#');
  const googleUrl = reviewLinks.google;
  const tripadvisorUrl = reviewLinks.tripadvisor;
  const hasGoogle = isValidHref(googleUrl);
  const hasTripadvisor = isValidHref(tripadvisorUrl);
  const showPlatformCtas = hasGoogle || hasTripadvisor;
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="text-yellow-400 text-lg md:text-xl drop-shadow-sm">
        {i < count ? '★' : '☆'}
      </span>
    ));
  };

  const getPlatformLogo = (platform: 'google' | 'tripadvisor') => {
    return platform === 'google' ? 'G' : 'T';
  };

  const getPlatformName = (platform: 'google' | 'tripadvisor') => {
    return platform === 'google' ? 'Google Reviews' : 'TripAdvisor';
  };

  return (
    <section className="bg-brand-100 py-16" id="testimonials-heading" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-brand-200 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 -right-5 w-16 h-16 bg-accent-200 rounded-full opacity-30"></div>
          <div className="absolute -bottom-5 left-1/4 w-12 h-12 bg-brand-300 rounded-full opacity-25"></div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-700 mb-4 font-display">
            What Our Customers Say
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-lg md:text-xl text-neutral-700 font-light tracking-wide">
              Real reviews from Google Maps and TripAdvisor — trusted by locals and visitors
            </p>
            {showPlatformCtas ? (
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-2 md:mt-0 flex-wrap w-full">
                {hasGoogle ? (
                  <a 
                    href={googleUrl!.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-lg border border-neutral-200 shrink-0"
                    aria-label={`View ${BRAND.fullName} reviews on Google Maps`}
                  >
                    <span className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-base shadow">G</span>
                    <span className="text-base font-semibold text-neutral-800">4.5</span>
                    <span className="text-yellow-400 ml-1">★</span>
                    <span className="text-sm text-neutral-600 ml-2">(800+)</span>
                  </a>
                ) : null}
                
                {hasGoogle && hasTripadvisor ? (
                  <div className="flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-brand-200 via-accent-300 to-brand-200 rounded-full"></div>
                  </div>
                ) : null}
                
                {hasTripadvisor ? (
                  <a
                    href={tripadvisorUrl!.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-lg border border-neutral-200 shrink-0"
                    aria-label={`View ${BRAND.fullName} reviews on TripAdvisor`}
                  >
                    <span className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-base shadow">T</span>
                    <span className="text-base font-semibold text-neutral-800">4.6</span>
                    <span className="text-yellow-400 ml-1">★</span>
                    <span className="text-sm text-neutral-600 ml-2">(400+)</span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* SEO-friendly review snippets */}
        <div className="mt-10 grid gap-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-xl md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-display text-xl font-bold text-stout-700">Overall Experience</h3>
            <p className="text-brand-700">
              Guests describe {BRAND.shortName} as the art-deco pub that nails Cambridge’s dual personality:
              <strong className="font-semibold"> HD matchdays up front</strong> and
              <strong className="font-semibold"> cosy snugs and heated cabins</strong> in back. Awards like
              CAMRA’s &quot;Most Improved City Pub&quot; and TripAdvisor Travelers’ Choice 2025 back up the praise, and its
              Newmarket Road location opposite the Premier Inn makes it an easy meet-up for locals, shoppers, and
              Abbey Stadium fans alike.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-display text-xl font-bold text-stout-700">Food &amp; Drink</h3>
            <p className="text-brand-700">
              Reviews call out <strong className="font-semibold">Himali Lamb Curry</strong>,
              <strong className="font-semibold">Khasi Ko Masu (goat)</strong>, <strong>Chicken Rum Rum</strong>, and sizzling
              mixed grills crafted by Nepali chefs, alongside <strong className="font-semibold">Sunday roasts, fish &amp; chips, and cask ales</strong>.
              Generous portions, momo dumplings, and a full takeaway/delivery offering keep Cambridge curry hunters
              coming back without sacrificing the pub classics.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-display text-xl font-bold text-stout-700">Service &amp; Atmosphere</h3>
            <p className="text-brand-700">
              Families praise the <strong className="font-semibold">attentive team who handle dietary tweaks</strong>, hotel guests love
              the <strong className="font-semibold">step-free garden cabins</strong>, and regulars mention <strong>dog-friendly staff, quiz nights,</strong>
              and shuffleboard between halves. Whether you’re catching Sky Sports or settling by the log fire, the
              service stays warm, efficient, and genuinely Cambridge.
            </p>
          </div>
        </div>

        {/* Guest Highlights */}
        <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-stout-700">Guest Highlights</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <blockquote className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-brand-800">
              “Had the Himali Lamb Curry and it was superb! Staff helped us navigate the Nepalese menu, ales were spot on, and plenty of sport on screen — we came back three times in one weekend.”
            </blockquote>
            <blockquote className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-brand-800">
              “Family-friendly pub serving great curries. We walked over from the Premier Inn, mentioned dietary needs, and the team took care of everything while the kids tucked into naan.”
            </blockquote>
            <blockquote className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-brand-800">
              {`“Second time coming to ${BRAND.shortName} and it’s the same delicious curry each visit. Fantastic flavours, fair Cambridge prices, and a friendly crew pouring well-kept pints.”`}
            </blockquote>
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-brand-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-brand-50 to-transparent z-10 pointer-events-none"></div>
          {/* Slider Container */}
          <AutoMarquee
            ariaLabel="Customer testimonials"
            direction="left"
            speedPxPerSec={40}
            duplicates={2}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`
                  flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl p-6 shadow-xl
                  ${review.platform === 'google' ? 'border-t-4 border-blue-500' : 'border-t-4 border-green-500'}
                `}
              >
                {/* Platform Header + Stars in same row */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md
                      ${review.platform === 'google' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-green-500 to-green-600'}
                    `}>
                      {getPlatformLogo(review.platform)}
                    </div>
                    <span className="text-sm font-semibold text-gray-600 tracking-wide">
                      {getPlatformName(review.platform)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-yellow-400 text-base">
                      {'★'.repeat(Math.max(0, Math.min(5, review.stars)))}
                    </div>
                  </div>
                </div>
                {/* Review Text - italic like design */}
                <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-6 font-medium italic">
                  &quot;{review.text}&quot;
                </p>
                {/* Reviewer Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {review.reviewer.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {review.reviewer.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {review.reviewer.timeAgo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </AutoMarquee>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
