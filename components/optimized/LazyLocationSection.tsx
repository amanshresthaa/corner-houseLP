"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for LocationSection with network-aware loading
const LocationSection = dynamic(() => import('@/components/restaurant/LocationSection'), {
  ssr: false
});

interface LazyLocationSectionProps {
  threshold?: number;
  rootMargin?: string;
}

const LocationSectionPlaceholder = () => (
  <section className="bg-brand-50 py-16" aria-hidden="true">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="mb-8 text-center sm:mb-10">
        <div className="mx-auto h-6 w-32 rounded-full bg-brand-100" />
        <div className="mx-auto mt-4 h-10 w-3/4 rounded bg-brand-100" />
        <div className="mx-auto mt-3 h-5 w-2/3 rounded bg-brand-100" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="rounded-[2.5rem] border border-brand-100 bg-white/90 p-6 shadow-2xl">
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-brand-100" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-11 rounded bg-brand-100" />
                <div className="h-11 rounded bg-brand-100" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-28 rounded bg-brand-100" />
                <div className="h-28 rounded bg-brand-100" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-16 rounded bg-brand-100" />
                <div className="h-16 rounded bg-brand-100" />
              </div>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-brand-100 bg-white p-4 shadow-xl">
            <div className="h-32 rounded bg-brand-100" />
          </div>
        </div>
        <div>
          <div className="rounded-[2.5rem] border border-brand-100 bg-white/90 p-3 shadow-2xl">
            <div className="rounded-[2rem] border border-brand-100 bg-brand-50 p-2">
              <div className="h-[480px] w-full rounded-[1.75rem] bg-brand-100" />
            </div>
            <div className="mt-4 h-16 rounded-2xl border border-brand-100 bg-brand-50" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/**
 * Optimized lazy loader for LocationSection with intersection observer
 * Includes network-aware loading and reduced motion support
 */
export default function LazyLocationSection({ 
  threshold = 0.1, 
  rootMargin = '50px 0px 0px 0px' 
}: LazyLocationSectionProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Network detection for adaptive loading
  const [networkInfo, setNetworkInfo] = useState<{
    effectiveType: string;
    saveData: boolean;
  }>({ effectiveType: '4g', saveData: false });

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      setNetworkInfo({
        effectiveType: connection?.effectiveType || '4g',
        saveData: connection?.saveData || false
      });

      // Listen for network changes
      const updateNetworkInfo = () => {
        setNetworkInfo({
          effectiveType: connection?.effectiveType || '4g',
          saveData: connection?.saveData || false
        });
      };

      connection?.addEventListener('change', updateNetworkInfo);
      return () => connection?.removeEventListener('change', updateNetworkInfo);
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // For slow networks or data saver mode, use smaller root margin
    const adaptiveRootMargin = networkInfo.saveData || 
      ['slow-2g', '2g'].includes(networkInfo.effectiveType) 
      ? '20px 0px 0px 0px' 
      : rootMargin;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        if (entry.isIntersecting) {
          // Delayed loading for non-critical content
          const delay = networkInfo.saveData ? 500 : 100;
          
          setTimeout(() => {
            setShouldLoad(true);
            observer.disconnect();
          }, delay);
        }
      },
      { 
        threshold, 
        rootMargin: adaptiveRootMargin 
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, networkInfo]);

  // Handle reduced motion preferences
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && isIntersecting) {
      setShouldLoad(true);
    }
  }, [isIntersecting]);

  return (
    <div ref={ref} data-section="location">
      {shouldLoad ? (
        <Suspense fallback={null}>
          <LocationSection />
        </Suspense>
      ) : (
        <LocationSectionPlaceholder />
      )}
    </div>
  );
}
