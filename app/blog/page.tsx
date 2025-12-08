import RestaurantLayout from "@/components/restaurant/Layout";
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import Link from '@/lib/debugLink';
import { Images } from '@/src/lib/images';
import { FadeIn } from '@/components/animations/MotionWrappers';
import { BlogHero, FilterableBlogSection } from './_components';
import { BRAND } from '@/src/lib/constants/brand';

export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages as any)?.blog?.defaultSeo || {};
  return getSEOTags({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/blog',
    openGraph: seo.openGraph,
  });
}



// No posts available after removals
const blogPosts: any[] = [];

const categories: any[] = [
  { name: "All Posts", count: 0, slug: "all" },
];

export default function BlogPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (prefers-reduced-motion: reduce) {
          *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
          html:focus-within{scroll-behavior:auto!important}
        }
      ` }} />
      <RestaurantLayout>
        {renderSchemaTags([
          // ... existing schema markup remains the same
        ])}
        
        {/* Blog Hero Section with motion animation */}
        <section aria-labelledby="blog-hero-heading">
          <BlogHero 
            title={`Stories from ${BRAND.fullName}`}
            subtitle="Discover Cambridge matchdays, heated cabins, Nepali chef specials, and the community keeping this art-deco pub buzzing"
          />
        </section>

        {/* Main blog content with progressive disclosure */}
        <main className="space-y-0">
          {/* Featured section removed after post removals */}

          <FadeIn>
            <FilterableBlogSection posts={blogPosts} categories={categories} />
          </FadeIn>

          <FadeIn>
            <section className="py-16 bg-white" aria-labelledby="newsletter-heading">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border-2 border-brand-700">
                  <div className="text-center">
                    <h2 id="newsletter-heading" className="h2 text-white mb-4 drop-shadow-lg">
                      📰 Stay Updated
                    </h2>
                    <p className="text-lg text-neutral-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                      Get the latest stories, event announcements, and special offers from {BRAND.fullName}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                      <input 
                        id="newsletter-email"
                        type="email" 
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20"
                        required
                      />
                      <button 
                        className="px-6 py-3 bg-accent-500 text-neutral-900 font-semibold rounded-lg hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-brand-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        type="submit"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
        </main>
      </RestaurantLayout>
    </>
  );
}
