"use client";
import useSWR, { useSWRConfig } from 'swr';
import { ContentSchema, type Content } from '@/src/lib/data/schemas';
import { fetchWithResilience } from '@/src/lib/data/fetchWithResilience';

type UseContentResult = {
  data: Content | null;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

async function fetchContent(): Promise<Content> {
  const res = await fetchWithResilience('/api/content', {
    headers: { accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Content fetch failed: ${res.status} ${res.statusText} ${text}`);
  }
  const json = await res.json();
  // Handle standardized response shape or raw content fallback
  const payload = (json && json.status === 'success' && json.data) ? json.data : json;
  return ContentSchema.parse(payload);
}

// Hook for loading complete content data (unwraps standardized API shape)
export function useContent(): UseContentResult {
  const { fallback } = useSWRConfig();
  const hasFallback = typeof fallback === 'object' &&
    fallback !== null &&
    Object.prototype.hasOwnProperty.call(fallback as Record<string, unknown>, '/api/content');
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<Content, Error>(
    '/api/content',
    fetchContent,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: !hasFallback,
      revalidateIfStale: !hasFallback,
      refreshInterval: 0,
      dedupingInterval: 5 * 60 * 1000,
      keepPreviousData: true,
    }
  );

  const refetch = async () => {
    await mutate();
  };

  return { data: data ?? null, error: error ?? null, loading: isLoading, refetch };
}

// Hook for loading specific page content
export function usePageContent(pageName: keyof Content['pages']) {
  const { data: content, error, loading, refetch } = useContent();
  const pageData = content?.pages?.[pageName];
  return { data: pageData, error, loading, refetch };
}

// Hook for loading global content (navigation, UI, etc.)
export function useGlobalContent() {
  const { data: content, error, loading, refetch } = useContent();
  const globalData = content?.global;
  return { data: globalData, error, loading, refetch };
}

// Hook for component-specific content
export function useComponentContent(componentName: keyof Content['components']) {
  const { data: content, error, loading, refetch } = useContent();
  const componentData = content?.components?.[componentName];
  return { data: componentData, error, loading, refetch };
}

// Utility hook for getting content with fallbacks
export function useContentWithFallback<T>(path: string, fallback: T): {
  data: T;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<void>;
} {
  const { data: content, error, loading, refetch } = useContent();
  const getValue = (obj: any, path: string): T => path.split('.').reduce((curr, key) => curr?.[key], obj) ?? fallback;
  const data = content ? getValue(content, path) : fallback;
  return { data, error, loading, refetch };
}
