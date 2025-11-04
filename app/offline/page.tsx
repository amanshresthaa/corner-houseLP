import { getSEOTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import { OfflineStatus, OfflineFeatures, OfflineActions, OfflineBackground } from './_components';

// SEO Metadata with noindex sourced from content.json
export async function generateMetadata() {
  const content = await getContentSmart();
  const off = content.pages?.offline || {};
  return getSEOTags({
    title: off.title || 'Offline',
    description: off.description || 'You are currently offline.',
    canonicalUrlRelative: '/offline',
    robots: { index: false, follow: false },
  });
}

export default function OfflinePage() {
  return (
    <section className="relative bg-brand-50 text-neutral-900 min-h-screen w-full flex flex-col justify-center gap-8 items-center p-10">
      <OfflineBackground />
      <OfflineStatus />
      <OfflineFeatures />
      <OfflineActions />
    </section>
  );
}
