import { buildMenuExplorePresets, buildMenuFeaturedItems, buildMenuPageData, buildMenuStats } from '@/src/lib/menu/page-patterns';

const sampleSections = [
	{
		id: 'starters',
		name: 'Starters',
		description: 'Warm up before the mains.',
		items: [
			{
				id: 'momo',
				name: 'Chicken momo',
				description: 'Steamed dumplings with tomato achaar.',
				price: { amount: 9, currency: 'GBP' },
				dietary: { spicy: true },
			},
			{
				id: 'veggie-platter',
				name: 'Vegetable platter',
				description: 'Seasonal veg with toasted spices.',
				price: { amount: 11, currency: 'GBP' },
				dietary: { vegetarian: true, vegan: true },
			},
		],
	},
	{
		id: 'curries',
		name: 'Curries',
		items: [
			{
				id: 'himalayan-lamb',
				name: 'Himalayan lamb',
				price: { amount: 18, currency: 'GBP' },
				dietary: { glutenFree: true },
			},
			{
				id: 'butter-chicken',
				name: 'Butter chicken',
				price: { amount: 16, currency: 'GBP' },
			},
		],
	},
];

describe('buildMenuStats', () => {
	it('computes totals and dietary counts from sections', () => {
		const stats = buildMenuStats(sampleSections as any);

		expect(stats.totalSections).toBe(2);
		expect(stats.totalItems).toBe(4);
		expect(stats.vegetarianItems).toBe(1);
		expect(stats.veganItems).toBe(1);
		expect(stats.glutenFreeItems).toBe(1);
		expect(stats.spicyItems).toBe(1);
		expect(stats.priceRange.min).toBe(9);
		expect(stats.priceRange.max).toBe(18);
		expect(stats.priceRange.currency).toBe('GBP');
	});
});

describe('buildMenuPageData', () => {
	it('returns highlights, dietary notes, and quick links', () => {
		const data = buildMenuPageData({
			sections: sampleSections as any,
			allergenNotice: "Natasha's Law log available.",
			bookingUrl: '/book-a-table',
			telHref: 'tel:+441223921122',
			orderUrl: 'https://orders.cornerhouse.com',
			menuInformationHref: '/menu-information',
			contactDisplayPhone: '+44 1223 921122',
		});

		expect(data.stats.totalItems).toBe(4);
		expect(data.heroHighlights.length).toBeGreaterThan(0);
		expect(data.dietaryHighlights).toContain("Natasha's Law log available.");
			expect(data.quickLinks.length).toBeGreaterThanOrEqual(3);
			expect(data.quickLinks[0]).toHaveProperty('title');
			expect(data.featuredItems.length).toBeGreaterThan(0);
			expect(data.explorePresets.length).toBeGreaterThan(0);
	});
});

	describe('buildMenuFeaturedItems', () => {
		it('prioritizes tagged dishes and limits results', () => {
			const featured = buildMenuFeaturedItems(sampleSections as any, 2);
			expect(featured).toHaveLength(2);
			expect(featured[0]).toHaveProperty('name');
			expect(featured[0]).toHaveProperty('sectionName');
		});
	});

	describe('buildMenuExplorePresets', () => {
		it('creates presets based on available stats', () => {
			const stats = buildMenuStats(sampleSections as any);
			const presets = buildMenuExplorePresets(stats);
			expect(presets.length).toBeGreaterThan(0);
			expect(presets[0]).toHaveProperty('filters');
		});
	});
