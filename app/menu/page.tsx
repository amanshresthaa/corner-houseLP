/* eslint-disable react/no-unescaped-entities */
import RestaurantLayout from "@/components/restaurant/Layout";
import Link from '@/lib/debugLink';
import { Metadata } from 'next';
import { getMarketingSmart, getMenuSmart, getContentSmart } from '@/src/lib/data/server-loader';
import MenuHero from './_components/MenuHero';
import { FadeIn } from '@/components/animations/MotionWrappers';
import dynamic from 'next/dynamic';
import { getRestaurantIdentity, getPostalAddressSchema, getContactInfo } from '@/lib/restaurantData';
import siteConfig from '@/config';
import CallToActionSection from '@/components/restaurant/sections/CallToActionSection';
import contentConfig from '@/config/content.json';
// Dynamic imports for Menu page sections - optimized for performance
const MenuInteractive = dynamic(() => import('./_components/MenuInteractive'), {
	ssr: true,
	loading: () => (
		<div className="min-h-96 bg-white flex items-center justify-center">
			<div className="text-lg text-neutral-500">{contentConfig?.pages?.menu?.messages?.loading || contentConfig?.global?.ui?.labels?.loading || 'Loading…'}</div>
		</div>
	)
});
const RestaurantHoursCard = dynamic(() => import('@/components/restaurant/RestaurantHoursCard'));
// Dynamic imports for Menu page sections - optimized for performance

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContentSmart();
  const seo = (content.pages?.menu as any)?.seo || {};
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: seo.openGraph,
  } as Metadata;
}

export default async function MenuPage({ searchParams }: { searchParams?: { category?: string } }) {
	// Detect priority category from search params or URL hash (for server-side optimization)
	const priorityCategory = searchParams?.category;
	
	// Preload all data concurrently with priority category optimization
	const [m, content, menu] = await Promise.all([
		getMarketingSmart(),
		getContentSmart(),
		getMenuSmart(priorityCategory) // Pass priority category for optimized loading
	]);

	const menuContent = content.pages.menu;
	const contact = getContactInfo();
	const identity = getRestaurantIdentity();
	const postalAddress = getPostalAddressSchema();
	const telHref = contact.phone.tel;
	const phoneDisplay = contact.phone.display;
	const takeawayHref = (content.global as any)?.links?.takeaway as string | undefined;

		const labels = m.buttons || {};
		const labelBookOnline = labels.bookOnline || menuContent.hero.cta.book || content.global.ui.buttons.bookOnline;
	const labelOrderTakeaway = labels.orderTakeaway || menuContent.hero.cta.order || `Order Takeaway: ${phoneDisplay}`;
	const allergenNotice = menuContent.sections.allergenNotice;
	const menuDescription = menuContent.sections.description;
	const formattedAddress = `${contact.address.street}, ${contact.address.area}, ${contact.address.city} ${contact.address.postcode}`;
	const directionsHref = contact.address.map?.google || contact.address.map?.apple || contact.address.map?.embed || '#';
	
	// Optimize menu data structure for faster client-side rendering
	const optimizedMenu = {
		...menu,
		sections: (menu?.sections || []).map(section => ({
			...section,
			// Pre-calculate section metadata for faster navigation
			itemCount: section.items?.length || 0,
			hasVegetarian: section.items?.some(item => item.dietary?.vegetarian) || false,
			hasGlutenFree: section.items?.some(item => item.dietary?.glutenFree) || false,
			priceRange: section.items?.length > 0 ? {
				min: Math.min(...section.items.map(item => item.price?.amount || 0)),
				max: Math.max(...section.items.map(item => item.price?.amount || 0))
			} : null
		}))
	};
	
	// Enhanced structured data with optimized menu
	const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || `https://${siteConfig.domainName}/`).replace(/\/$/, '/');
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Menu',
		'@id': `${siteBase}menu#menu`,
		name: menuContent.hero.title,
		description: `${menuContent.sections.description} Browse with advanced search and filtering.`,
		inLanguage: 'en-GB',
		provider: {
			'@type': 'Restaurant',
			name: identity.displayName,
			address: postalAddress
		},
		menuSection: (optimizedMenu?.sections || []).map((section: any) => ({
			'@type': 'MenuSection',
			name: section.name,
			description: (section as any).description || undefined,
			hasMenuItem: (section.items || []).map((item: any) => ({
				'@type': 'MenuItem',
				name: item.name,
				description: item.description || undefined,
				offers: item.price
					? {
							'@type': 'Offer',
							price: String(item.price.amount),
							priceCurrency: item.price.currency || 'GBP',
						}
					: undefined,
				suitableForDiet: [
					...(item.dietary?.vegetarian ? ['https://schema.org/VegetarianDiet'] : []),
					...(item.dietary?.vegan ? ['https://schema.org/VeganDiet'] : []),
					...(item.dietary?.glutenFree ? ['https://schema.org/GlutenFreeDiet'] : [])
				].filter(Boolean),
				nutrition: {
					'@type': 'NutritionInformation',
					// Enhanced with nutrition information
					calories: '300-600 calories (varies by item)'
				}
			})),
		})),
	};

	// Helper function to normalize IDs
	function normalizeId(input?: string | number | null) {
		return ((input || '') as string).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
	}

	// Find starters section and set as default
	const startersSection = optimizedMenu?.sections?.find((section: any) => 
		section.name?.toLowerCase().includes('starter') || 
		section.name?.toLowerCase().includes('appetizer') ||
		section.id?.toLowerCase().includes('starter')
	);
	
	const defaultSelectedStarters = startersSection ? normalizeId(startersSection.id || startersSection.name) : null;
	const menuServiceCta = {
		headline: 'Plan Your Visit to The White Horse',
		description: 'Reserve your table, arrange a takeaway, or download our full menu before you arrive.',
		buttons: [
			{
				text: 'Book a Table',
				href: '/book-a-table',
				variant: 'brand' as const,
				key: 'menu-cta-book-table',
			},
			{
				text: contact.orderUrl ? 'Order for Collection' : labelOrderTakeaway,
				href: contact.orderUrl ?? contact.phone.tel,
				variant: 'accent' as const,
				key: 'menu-cta-order',
			},
			{
				text: 'Order Takeaway',
				href: '/takeaway',
				variant: 'crimson' as const,
				key: 'menu-cta-takeaway',
			},
		],
	};

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: `
			  @media (prefers-reduced-motion: reduce) {
			    *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
			    html:focus-within{scroll-behavior:auto!important}
			  }
			` }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<RestaurantLayout>
				{/* Hero Section with motion animation */}
				<section aria-label="Menu introduction">
					<MenuHero 
						hero={{
							title: menuContent?.hero?.title,
							subtitle: menuContent?.hero?.subtitle,
							buttons: {
								bookOnline: {
									label: (menuContent?.hero?.cta?.book as string) || 'Book Online',
									url: '/book-a-table',
									target: '_self',
								},
								orderTakeaway: {
									label: takeawayHref
										? (content?.global?.ui?.buttons?.orderTakeaway as string) || 'Order Takeaway'
										: `Call ${phoneDisplay}`,
									url: (takeawayHref as string) || contact?.phone?.tel,
								},
							},
						}}
					/>
				</section>

			{/* Main menu content with progressive disclosure */}
			<main>
				<FadeIn>
					<section
						aria-labelledby="interactive-menu-heading"
						className="bg-neutral-50 py-20 sm:py-24"
					>
						<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
							<header className="mb-12 text-center">
								<span className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">
									Explore the menu
								</span>
								<h2
									id="interactive-menu-heading"
									className="mt-4 text-3xl font-display font-bold text-stout-800 md:text-4xl"
								>
									Interactive Menu Experience
								</h2>
								{menuDescription && (
									<p className="mx-auto mt-4 max-w-3xl text-base text-neutral-600 md:text-lg">
										{menuDescription}
									</p>
								)}
							</header>
							<div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl sm:p-6 lg:p-8">
								<MenuInteractive
									sections={optimizedMenu?.sections || []}
									defaultSelected={defaultSelectedStarters}
									preloadedData={true}
								/>
							</div>
						</div>
					</section>
				</FadeIn>

			<FadeIn>
				<section
					aria-labelledby="menu-info-cta-heading"
					className="bg-brand-900 py-20 sm:py-24 text-neutral-100"
				>
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
						<h2 id="menu-info-cta-heading" className="text-3xl font-display font-bold text-white md:text-4xl">
							Need Dietary Information?
						</h2>
						<p className="mt-6 text-lg text-neutral-200">
							Find comprehensive allergen information, dietary requirements, and food safety details to help you make informed choices.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
							<Link
								href="/menu-information"
								className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
							>
								View Menu Information & Dietary Requirements
								<svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>
						<div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-white/80">
							<span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/90">14 Allergen Information</span>
							<span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/90">Dietary Options</span>
							<span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/90">Natasha&apos;s Law Compliant</span>
						</div>
					</div>
				</section>
			</FadeIn>

			<FadeIn>
				<section
					aria-labelledby="menu-hours-heading"
					className="bg-brand-50 py-20 sm:py-24"
				>
					<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
							<div className="order-2 flex flex-col gap-10 xl:order-1">
								<div className="space-y-5">
									<span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">
										Visit us soon
									</span>
									<h2 id="menu-hours-heading" className="text-3xl font-display font-bold text-stout-800 md:text-4xl">
										Restaurant &amp; Bar Opening Time
									</h2>
									<p className="max-w-xl text-base text-neutral-700 md:text-lg">
										Drop in for a relaxed pint, cosy supper, or speedy takeaway pick-up. Let us know how many are dining and we’ll make sure your table is ready.
									</p>
								</div>

								<ul className="grid gap-4 sm:grid-cols-2">
									<li className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
										<p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Where to find us</p>
										<address className="mt-2 space-y-1 not-italic text-neutral-700">
											<span className="block font-semibold text-stout-800">{formattedAddress}</span>
											<a
												href={directionsHref}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center text-sm font-semibold text-brand-700 underline-offset-4 transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50"
											>
												Get directions
												<span aria-hidden className="ml-1 text-xs">↗</span>
											</a>
										</address>
									</li>
									<li className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
										<p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Stay for longer</p>
										<p className="mt-2 text-neutral-700">
											Quiz night every Wednesday, dog-friendly snug, and heated garden huts for year-round gatherings.
										</p>
									</li>
									<li className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
										<p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Takeaway ready fast</p>
										<p className="mt-2 text-neutral-700">
											Call ahead and we’ll package Nepalese favourites for collection in as little as 20 minutes.
										</p>
									</li>
									<li className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
										<p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Access &amp; parking</p>
										<p className="mt-2 text-neutral-700">
											Free parking along the village green with level access through the front door.
										</p>
									</li>
								</ul>

								<div className="flex flex-col gap-3 sm:flex-row">
									<Link
										href="/book-a-table"
										className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50 sm:w-auto"
										aria-label={`${labelBookOnline} now`}
									>
										Book now
									</Link>
									<a
										href={telHref}
										className="inline-flex w-full items-center justify-center rounded-lg bg-stout-800 px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-stout-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-stout-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50 sm:w-auto"
									>
										Call now
									</a>
									<a
										href={directionsHref}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex w-full items-center justify-center rounded-lg border border-brand-300 bg-white px-6 py-3 text-base font-semibold text-brand-700 transition-colors duration-200 hover:border-brand-400 hover:text-brand-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50 sm:w-auto"
									>
										Get directions
									</a>
								</div>
							</div>
							<div className="order-1 flex items-stretch xl:order-2">
								<RestaurantHoursCard variant="light" />
							</div>
						</div>
					</div>
				</section>
			</FadeIn>

			<FadeIn>
				<CallToActionSection
					headline={menuServiceCta.headline}
					description={menuServiceCta.description}
					buttons={menuServiceCta.buttons}
					className="border-t border-neutral-200"
				/>
			</FadeIn>
			</main>
			</RestaurantLayout>
		</>
	);
}
