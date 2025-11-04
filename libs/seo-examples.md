# SEO Implementation Examples

This document shows how to use the `getSEOTags` and `renderSchemaTags` functions from `libs/seo.tsx` in your Next.js pages.

## Basic Usage

### 1. Simple Page with Default SEO

```tsx
// app/about/page.tsx
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "About Us - Historic Thatched Pub in Waterbeach",
  description: "Learn about our historic thatched pub serving authentic Nepalese cuisine in Waterbeach, Cambridge.",
  canonicalUrlRelative: "/about"
});

export default function AboutPage() {
  return (
    <div>
      <h1>About The White Horse Waterbeach</h1>
      {/* Page content */}
    </div>
  );
}
```

### 2. Menu Page with Custom Keywords

```tsx
// app/menu/page.tsx
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Menu - Nepalese Restaurant & British Pub Food | The White Horse Waterbeach",
  description: "Discover our authentic Nepalese dishes and traditional British pub classics. Fresh ingredients, family recipes.",
  keywords: ["Nepalese menu Cambridge", "pub food Waterbeach", "momo dumplings", "curry Cambridge", "Sunday roast"],
  canonicalUrlRelative: "/menu"
});

export default function MenuPage() {
  return (
    <div>
      <h1>Our Menu</h1>
      {/* Menu content */}
    </div>
  );
}
```

### 3. Contact Page with Schema Data

```tsx
// app/contact/page.tsx
import { getSEOTags, renderSchemaTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Contact & Reservations - The White Horse Waterbeach",
  description: "Book a table, get directions, or contact The White Horse Waterbeach. Call our team for reservations.",
  canonicalUrlRelative: "/contact"
});

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      {/* Contact form and details */}
      
      {/* Include structured data for local business */}
      {renderSchemaTags()}
    </div>
  );
}
```

## Advanced Usage

### 4. Blog Post with Article Schema

```tsx
// app/blog/[slug]/page.tsx
import { getSEOTags, renderSchemaTags } from "@/libs/seo";

interface BlogPostProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostProps) {
  // In real app, fetch post data here
  const post = {
    title: "Authentic Momo Dumplings: A Taste of Nepal",
    description: "Learn about the history and preparation of traditional Nepalese momo dumplings at The White Horse Waterbeach.",
    publishedDate: "2024-03-15",
    author: "Chef Raj Gurung"
  };

  return getSEOTags({
    title: `${post.title} | The White Horse Waterbeach Blog`,
    description: post.description,
    canonicalUrlRelative: `/blog/${params.slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author]
    }
  });
}

export default function BlogPost({ params }: BlogPostProps) {
  // Article schema for blog posts
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Authentic Momo Dumplings: A Taste of Nepal",
    description: "Learn about the history and preparation of traditional Nepalese momo dumplings.",
    author: {
      "@type": "Person",
      name: "Chef Raj Gurung"
    },
    publisher: {
      "@type": "Organization",
      name: "The White Horse Waterbeach",
      logo: {
        "@type": "ImageObject",
        url: "https://whitehorsepub.co/icon.png"
      }
    },
    datePublished: "2024-03-15",
    dateModified: "2024-03-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://whitehorsepub.co/blog/authentic-momo-dumplings-nepalese-cuisine"
    }
  };

  return (
    <article>
      <h1>Authentic Momo Dumplings: A Taste of Nepal</h1>
      {/* Blog post content */}
      
      {/* Include article schema */}
      {renderSchemaTags([articleSchema])}
    </article>
  );
}
```

### 5. Events Page with Event Schema

```tsx
// app/events/page.tsx
import { getSEOTags, renderSchemaTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Events & Live Music - The White Horse Waterbeach",
  description: "Join us for live music, quiz nights, and special events at The White Horse Waterbeach. Check our events calendar.",
  canonicalUrlRelative: "/events"
});

export default function EventsPage() {
  // Event schema for upcoming events
  const eventSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Quiz Night",
      description: "Weekly quiz night with prizes and great food",
      startDate: "2024-04-01T19:00:00+01:00",
      endDate: "2024-04-01T22:00:00+01:00",
      location: {
        "@type": "Place",
        name: "The White Horse Waterbeach",
        address: {
          "@type": "PostalAddress",
          streetAddress: "12 Greenside",
          addressLocality: "Waterbeach",
          postalCode: "CB25 9HP",
          addressCountry: "GB"
        }
      },
      organizer: {
        "@type": "Organization",
        name: "The White Horse Waterbeach",
        url: "https://whitehorsepub.co"
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock"
      }
    }
  ];

  return (
    <div>
      <h1>Upcoming Events</h1>
      {/* Events listing */}
      
      {/* Include event schemas */}
      {renderSchemaTags(eventSchemas)}
    </div>
  );
}
```

## Best Practices

### 1. Always Set Canonical URLs
```tsx
export const metadata = getSEOTags({
  canonicalUrlRelative: "/your-page-path"
});
```

### 2. Customize Titles and Descriptions
- Keep titles under 60 characters
- Keep descriptions under 160 characters
- Include target keywords naturally

### 3. Use Appropriate Schema Types
- `Restaurant` schema for main pages (automatically included)
- `Article` schema for blog posts
- `Event` schema for events
- `LocalBusiness` schema for contact/location pages

### 4. Test Your Structured Data
Use Google's [Rich Results Test](https://search.google.com/test/rich-results) to validate your schema markup.

### 5. Monitor SEO Performance
- Check search console for crawl errors
- Monitor click-through rates
- Track keyword rankings
