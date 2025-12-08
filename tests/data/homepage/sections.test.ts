import { buildHomeSections, HOME_SECTION_ORDER } from '@/src/lib/homepage/sections';

describe('buildHomeSections', () => {
  it('normalizes valid section data and preserves order', () => {
    const { sections, order } = buildHomeSections({
      pressTicker: {
        label: 'Press',
        items: [
          { title: 'Feature A', summary: 'Summary', href: '/press', ctaText: 'Read' },
          { title: 'Feature B' },
        ],
      },
      about: {
        title: 'About us',
        description: ['Para'],
        features: ['Feature'],
        stats: [
          { value: '800+', label: 'Reviews', description: 'Tripadvisor' },
          { value: '', label: 'Invalid' },
        ],
        ctaLinks: [
          { text: 'Book', href: '/book' },
          { text: '', href: '/missing' },
        ],
        milestones: [
          { year: '1930s', title: 'Opened', copy: 'Art-deco build' },
          { year: '', title: 'Invalid' },
        ],
        gallery: [
          { src: '/img.jpg', alt: 'Alt', label: 'Label' },
          { src: '', label: 'Invalid' },
        ],
        image: { src: '/about.jpg', alt: 'Alt' },
      },
      signatureDishes: {
        title: 'Dishes',
        subtitle: 'Chef picks',
        hero: {
          eyebrow: 'Chef',
          title: 'Highlights',
          description: 'Story',
          quote: 'Quote',
          quoteBy: 'Chef',
          cta: { text: 'See menu', href: '/menu' },
        },
        items: [
          {
            name: 'Dish A',
            description: 'Tasty',
            image: '/a.png',
            tags: ['Signature', 'Shared'],
            spiceLevel: 'Medium',
            price: '£12',
            featured: true,
            callout: 'Guest fav',
          },
          { name: 'Dish B', tags: ['Veg'] },
        ],
      },
      reviews: {
        title: 'Reviews',
        subtitle: 'Guests',
        hero: {
          eyebrow: 'Guest love',
          title: 'People rave',
          description: 'Proof from platforms',
          cta: { text: 'See more', href: '/reviews' },
          badge: { label: 'Average rating', value: '4.7★' },
        },
        stats: [
          { value: '4.7★', label: 'Average rating', description: 'Google + TripAdvisor' },
        ],
        spotlights: [
          { title: 'Atmosphere', copy: 'Snugs, cabins, HD sport', accent: 'accent' },
        ],
        items: [
          {
            quote: 'Great',
            source: 'Guest',
            platform: 'TripAdvisor',
            rating: 5,
            date: 'Nov 2025',
            accent: 'accent',
            featured: true,
          },
          { quote: 'Superb', platform: 'Google', rating: 5 },
        ],
      },
      quickLinks: {
        eyebrow: 'Plan',
        title: 'Plan visit',
        description: 'Do things',
        items: [
          {
            title: 'Menu',
            description: 'See menu',
            link: '/menu',
            linkText: 'View →',
            eyebrow: 'Eat',
            ctaText: 'Order',
            accent: 'brand',
            icon: 'menu',
          },
        ],
      },
      cta: {
        eyebrow: 'Takeaway',
        badge: { label: 'Hotline', value: '12-22' },
        headline: 'Visit us',
        description: 'Join now',
        features: ['Cabins', 'Takeaway'],
        contact: { label: 'Call', value: '01223', detail: 'Daily' },
        image: { src: '/cta.jpg', alt: 'CTA' },
        buttons: [
          { text: 'Book', href: '/book', variant: 'brand' },
          { text: 'Call', href: 'tel:+1', variant: 'foo' },
        ],
      },
    });

    expect(order).toEqual(HOME_SECTION_ORDER);
    expect(sections.pressTicker?.items).toHaveLength(2);
    expect(sections.about?.description).toEqual(['Para']);
    expect(sections.about?.stats).toHaveLength(1);
    expect(sections.about?.ctaLinks).toHaveLength(1);
    expect(sections.about?.milestones).toHaveLength(1);
    expect(sections.about?.gallery).toHaveLength(1);
    expect(sections.signatureDishes?.hero?.cta?.href).toBe('/menu');
    expect(sections.signatureDishes?.items).toHaveLength(2);
    expect(sections.signatureDishes?.items[0].tags).toEqual(['Signature', 'Shared']);
    expect(sections.reviews?.hero?.cta?.href).toBe('/reviews');
    expect(sections.reviews?.stats?.length).toBe(1);
    expect(sections.reviews?.spotlights?.length).toBe(1);
    expect(sections.reviews?.items).toHaveLength(2);
    expect(sections.reviews?.items[0].featured).toBe(true);
    expect(sections.quickLinks?.items).toHaveLength(1);
    expect(sections.quickLinks?.title).toBe('Plan visit');
    expect(sections.closingCta?.badge?.label).toBe('Hotline');
    expect(sections.closingCta?.buttons[1].variant).toBe('accent');
  });

  it('filters invalid entries and emits empty order when nothing is enabled', () => {
    const { sections, order } = buildHomeSections({
      pressTicker: { items: [{ title: '' }] },
      quickLinks: {
        items: [{ title: 'Missing fields' }],
      },
      cta: {
        headline: 'Hello',
        buttons: [{ text: 'Book', href: '' }],
      },
    });

    expect(order).toEqual([]);
    expect(sections.pressTicker).toBeNull();
    expect(sections.quickLinks).toBeNull();
    expect(sections.closingCta).toBeNull();
  });

  it('handles undefined or malformed input gracefully', () => {
    const { sections, order } = buildHomeSections(undefined);
    expect(order).toEqual([]);
    expect(sections.pressTicker).toBeNull();
  });
});
