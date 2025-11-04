import RestaurantLayout from "@/components/restaurant/Layout";
import { getSEOTags, renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
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
import { getRestaurantIdentity, getPostalAddressSchema } from '@/lib/restaurantData';
import Link from '@/lib/debugLink';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Images } from '@/src/lib/images';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback';

// SEO handled by generateMetadata()

const MotionDiv = dynamic(() => import('@/components/motion/DynamicMotion').then(mod => mod.MotionDiv), { ssr: false });

export default function EveningStandardPressPage() {
  const identity = getRestaurantIdentity();
  const postalAddress = getPostalAddressSchema();
  const post = {
    title: "Evening Standard Spotlights The White Horse, Waterbeach",
    excerpt: "David Ellis names The White Horse Waterbeach the Evening Standard’s Country Pub of the Week, highlighting our Nepalese cooking, welcoming atmosphere, and evolving menu.",
    content: `
      <p>The Evening Standard’s <em>Country Pub of the Week</em> column has shone a light on The White Horse Waterbeach, celebrating how our historic thatched pub keeps locals coming back with flavourful Nepalese cooking and a relaxed village welcome.</p>

      <p>Reviewer David Ellis praised the way our menu blends first-rate Nepalese dishes with the familiar comforts of a proper pub — from fresh momo to televised matches, a dog-friendly garden, and free parking for easy visits.</p>

      <blockquote cite="https://www.standard.co.uk/going-out/bars/the-white-horse-girton-hotel-pub-review-b1249473.html">
        “The changes keep locals coming back. Adapt or die, that’s the ticket.”
      </blockquote>

      <h2>Highlights from the review</h2>
      <ul>
        <li>A warm, lived-in pub atmosphere paired with authentic Nepalese curries cooked to order.</li>
        <li>Welcoming touches — from smiling waiters to tailoring spice levels — that make regulars feel at home.</li>
        <li>Practical comforts like football on the telly, dog-friendly spaces, and a generous beer garden.</li>
      </ul>

      <p>If you’d like to read the full piece, the Evening Standard has made it available online for fellow pub explorers.</p>
    `,
    image: Images.blog.thatchedExterior,
    category: "Press & Media",
    author: {
      name: "The White Horse Team",
      bio: "The team keeping Waterbeach’s historic thatched pub lively, welcoming, and delicious."
    },
    publishedDate: "2024-12-19T09:00:00+00:00",
    modifiedDate: "2024-12-19T09:00:00+00:00",
    readTime: "2 min read",
    slug: "evening-standard-country-pub-of-the-week",
    tags: ["press coverage", "Evening Standard", "Country pub of the week", "The White Horse Waterbeach"],
    articleUrl: "https://www.standard.co.uk/going-out/bars/the-white-horse-girton-hotel-pub-review-b1249473.html"
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (prefers-reduced-motion: reduce) {
          *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
          html:focus-within{scroll-behavior:auto!important}
        }
      ` }} />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <RestaurantLayout>
      {renderSchemaTags([
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "@id": "https://whitehorsepub.co/blog/evening-standard-country-pub-of-the-week#newsarticle",
          "headline": post.title,
          "description": post.excerpt,
          "url": "https://whitehorsepub.co/blog/evening-standard-country-pub-of-the-week",
          "datePublished": post.publishedDate,
          "dateModified": post.modifiedDate,
          "author": {
            "@type": "Organization",
            "name": post.author.name,
            "description": post.author.bio
          },
          "publisher": {
            "@type": "LocalBusiness",
            "name": identity.displayName,
            "logo": {
              "@type": "ImageObject",
              "url": "https://whitehorsepub.co/icon.png"
            },
            "address": postalAddress
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://whitehorsepub.co/blog/evening-standard-country-pub-of-the-week"
          },
          "image": {
            "@type": "ImageObject",
            "url": "https://whitehorsepub.co/" + post.image,
            "width": 1200,
            "height": 630
          },
          "articleSection": post.category,
          "keywords": post.tags.join(", "),
          "wordCount": 320,
          "inLanguage": "en-GB",
          "isPartOf": {
            "@type": "Blog",
            "name": "The White Horse Waterbeach Blog",
            "url": "https://whitehorsepub.co/blog"
          },
          "sameAs": [
            post.articleUrl
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://whitehorsepub.co/blog/evening-standard-country-pub-of-the-week#webpage",
          "name": post.title,
          "description": post.excerpt,
          "url": "https://whitehorsepub.co/blog/evening-standard-country-pub-of-the-week",
          "isPartOf": {
            "@type": "WebSite",
            "name": "The White Horse Waterbeach",
            "url": "https://whitehorsepub.co/"
          },
          "about": {
            "@type": "Restaurant",
            "name": "The White Horse Waterbeach",
            "servesCuisine": ["Nepalese", "British"]
          },
          "mainContentOfPage": {
            "@type": "WebPageElement",
            "cssSelector": "article"
          },
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", "h2"]
          }
        }
      ])}

      <div className="min-h-screen bg-neutral-50">
        <nav className="bg-white py-4 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Home</Link>
              <span aria-hidden="true">→</span>
              <Link href="/blog" className="hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Blog</Link>
              <span aria-hidden="true">→</span>
              <span className="text-brand-600">{post.category}</span>
            </div>
          </div>
        </nav>

        <header className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-700 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-600">
                <span>By {post.author.name}</span>
                <span aria-hidden="true">•</span>
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span aria-hidden="true">•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <MotionDiv className="absolute inset-0" layoutId={`post:${post.slug}:image`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority
                />
              </MotionDiv>
            </div>
          </div>
        </header>

        <main className="bg-white">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-brand">
            <div
              className="space-y-6 leading-relaxed text-neutral-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-10 border-t border-neutral-200 pt-10">
              <h2 className="text-xl font-display font-semibold text-brand-700 mb-4">
                Read the Evening Standard review
              </h2>
              <p className="text-neutral-700 mb-4">
                The full piece is available on the Evening Standard website. We’ve linked it here so you can explore the feature in David Ellis’s own words.
              </p>
              <Link
                href={post.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 text-white font-semibold px-5 py-3 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 hover:-translate-y-[1px] hover:bg-brand-700"
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'var(--tap-highlight-color, currentColor)' }}
              >
                Read the Evening Standard review
                <span aria-hidden="true" className="text-lg leading-none">↗</span>
              </Link>
            </div>
          </article>
        </main>
      </div>
        </RestaurantLayout>
      </ErrorBoundary>
    </>
  );
}
