"use client";
import { useMemo } from 'react';
import type { ZodSchema } from 'zod';
import { useContent } from './useContent';

type SupportedPath = 'nav.json' | 'footer.json' | 'marketing.json' | 'home.json';

export function useParsedData<T>(path: SupportedPath, schema: ZodSchema<T>) {
  const { data: content, error: contentError, loading: contentLoading } = useContent();

  const derived = useMemo(() => {
    if (!content) return null;
    switch (path) {
      case 'nav.json': {
        const links = content.global?.navigation?.header?.links || [];
        return { links } as any;
      }
      case 'footer.json': {
        const sections = content.global?.navigation?.footer?.sections || [];
        return { sections } as any;
      }
      case 'marketing.json': {
        const buttons = content.global?.ui?.buttons || {};
        return { buttons } as any;
      }
      case 'home.json': {
        const hero = content.pages?.home?.hero;
        return {
          heroHeadline: hero?.title || content.global?.site?.title || 'Welcome',
          heroSubheadline: hero?.subtitle || hero?.description || content.global?.site?.description || '',
          heroCtaLabel: hero?.cta?.primary || content.global?.ui?.buttons?.getStarted || 'Get Started',
          heroImage: '/images/brand/placeholder.png'
        } as any;
      }
      default:
        return null;
    }
  }, [content, path]);

  const parsed = useMemo(() => {
    if (!derived) return null;
    const result = schema.safeParse(derived);
    if (!result.success) {
      console.warn('Schema validation failed for', path, result.error.flatten());
      return null;
    }
    return result.data;
  }, [derived, path, schema]);

  const error = contentError || (derived && !parsed ? new Error('Schema validation failed') : null);
  const loading = contentLoading || (!parsed && !error);

  return { data: parsed, error, loading };
}
