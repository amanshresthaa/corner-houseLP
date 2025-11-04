import { getSEOTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import { NotFoundContent, NotFoundActions, NotFoundBackground } from './not-found/_components';

// SEO Metadata with noindex sourced from content.json
export async function generateMetadata() {
  const content = await getContentSmart();
  const nf = content.pages?.notFound || {};
  return getSEOTags({
    title: nf.title || 'Page Not Found',
    description: nf.description || 'The page you\'re looking for does not exist.',
    canonicalUrlRelative: '/not-found',
    robots: { index: false, follow: false },
  });
}

export default function Custom404() {
  return (
    <section className="relative bg-brand-50 text-neutral-900 min-h-screen w-full flex flex-col justify-center gap-8 items-center p-10">
      <NotFoundBackground />
      <NotFoundContent />
      <NotFoundActions />
    </section>
  );
}
