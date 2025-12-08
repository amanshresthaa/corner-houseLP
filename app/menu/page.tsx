/* eslint-disable react/no-unescaped-entities */
import RestaurantLayout from "@/components/restaurant/Layout";
import Link from '@/lib/debugLink';
import { Metadata } from 'next';
import { getMarketingSmart, getMenuSmart, getContentSmart } from '@/src/lib/data/server-loader';
import MenuHero from './_components/MenuHero';
import MenuExploreSection from './_components/MenuExploreSection';
import { FadeIn } from '@/components/animations/MotionWrappers';
import dynamic from 'next/dynamic';
import { getRestaurantIdentity, getPostalAddressSchema, getContactInfo } from '@/lib/restaurantData';
import siteConfig from '@/config';
import CallToActionSection from '@/components/restaurant/sections/CallToActionSection';
import QuickLinksSection from '@/components/restaurant/sections/QuickLinksSection';
import { BRAND } from '@/src/lib/constants/brand';
import { buildMenuPageData } from '@/src/lib/menu/page-patterns';
// Dynamic imports for Menu page sections - optimized for performance
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
	const bookingUrl = contact.bookingUrl ?? '/book-a-table';
	const bookingExternal = bookingUrl.startsWith('http');

		const labels = m.buttons || {};
		const labelBookOnline = labels.bookOnline || menuContent.hero.cta.book || content.global.ui.buttons.bookOnline;
	const callLabel =
		labels.callTakeaway ||
		labels.callUs ||
		content.global.ui.buttons.callNow ||
		`Call ${phoneDisplay}`;
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
	const menuPageData = buildMenuPageData({
		sections: optimizedMenu?.sections || [],
		allergenNotice,
		bookingUrl,
		telHref,
		orderUrl: contact.orderUrl,
		menuInformationHref: '/menu-information',
		contactDisplayPhone: phoneDisplay,
	});

	const { heroHighlights, dietaryHighlights, quickLinks } = menuPageData;

	const menuServiceCta = {
		eyebrow: 'Menu concierge',
		badge: {
			label: 'Kitchen hotline',
			value: phoneDisplay,
		},
		headline: `Plan your visit to ${BRAND.fullName}`,
		description: 'Reserve heated cabins, pre-order Nepalese feasts, or chat with the team before matchday.',
		features: dietaryHighlights.slice(0, 3),
		contact: {
			label: 'Call us',
			value: phoneDisplay,
			detail: 'Reservations & takeaway',
		},
		buttons: [
			{
				text: 'Book a Table',
				href: bookingUrl,
				variant: 'brand' as const,
				key: 'bookOnline',
			},
			{
				text: callLabel,
				href: contact.phone.tel,
				variant: 'accent' as const,
				key: 'call',
			},
		],
	};

	const visitHighlights = [
		{
			title: 'Where to find us',
			description: formattedAddress,
			ctaLabel: 'Get directions',
			ctaHref: directionsHref,
		},
		{
			title: 'Stay for longer',
			description: 'Dog-friendly snug, live sports, and heated garden huts for year-round gatherings.',
		},
		{
			title: 'Takeaway ready fast',
			description: 'Call ahead and we’ll package Nepalese favourites for collection in 20 minutes.',
		},
		{
			title: 'Access & parking',
			description: 'Free parking along the village green with level access through the front door.',
		},
	];

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
				<MenuHero
					hero={{
						title: menuContent?.hero?.title,
						subtitle: menuContent?.hero?.subtitle,
						buttons: {
							bookOnline: {
								label: (menuContent?.hero?.cta?.book as string) || 'Book Online',
								url: bookingUrl,
								target: bookingExternal ? '_blank' : '_self',
							},
							orderTakeaway: {
								label: callLabel,
								url: contact?.phone?.tel,
							},
						},
					}}
					eyebrow="Seasonal menu"
					highlights={heroHighlights}
				/>

				<main>
			<FadeIn>
				<MenuExploreSection
					sections={optimizedMenu?.sections || []}
					defaultSelected={defaultSelectedStarters}
					statHighlights={heroHighlights}
					menuDescription={menuDescription}
					telHref={telHref}
					menuInformationHref="/menu-information"
					contactDisplayPhone={phoneDisplay}
					dietaryHighlights={dietaryHighlights}
				/>
			</FadeIn>

				<FadeIn>
					<section
						aria-labelledby="menu-hours-heading"
						data-testid="menu-visit-section"
						className="bg-gradient-to-b from-white via-brand-50/40 to-white py-12 sm:py-16"
					>
						<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
							<div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
								<div className="space-y-8">
										<span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">
											Visit us soon
										</span>
									<h2 id="menu-hours-heading" className="text-4xl font-display font-bold text-stout-900 sm:text-[2.75rem]">
										Restaurant &amp; bar opening times
										</h2>
									<p className="text-base leading-relaxed text-brand-700 sm:text-lg">
											Drop in for a relaxed pint, cosy supper, or speedy takeaway pick-up. Let us know how many are dining and we’ll make sure your table is ready.
										</p>

									<ul className="grid gap-4 sm:grid-cols-2" data-testid="menu-visit-cards">
											{visitHighlights.map((card) => (
											<li key={card.title} className="rounded-[2rem] border border-brand-100/80 bg-white/95 p-6 shadow-md">
												<p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-brand-500">{card.title}</p>
												<p className="mt-2 text-sm text-brand-800 sm:text-base">{card.description}</p>
													{card.ctaHref ? (
														<a
															href={card.ctaHref}
															target="_blank"
															rel="noopener noreferrer"
															className="mt-3 inline-flex items-center text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
														>
															{card.ctaLabel}
															<span aria-hidden className="ml-1 text-xs">↗</span>
														</a>
													) : null}
												</li>
											))}
										</ul>

									<div className="flex flex-wrap gap-3" data-testid="menu-visit-cta-group">
											{(() => {
												const isExternal = bookingUrl.startsWith('http');
												const ariaLabel = isExternal ? `${labelBookOnline} now (opens in new tab)` : `${labelBookOnline} now`;
												const classes = 'btn rounded-full bg-brand-900 text-white border-none shadow-lg hover:-translate-y-0.5';
											return isExternal ? (
												<a
													href={bookingUrl}
													target="_blank"
													rel="noopener noreferrer"
													className={classes}
													aria-label={ariaLabel}
													style={{ touchAction: 'manipulation' }}
												>
													{labelBookOnline}
													<span aria-hidden className="ml-1 text-xs">↗</span>
												</a>
											) : (
												<Link href={bookingUrl} className={classes} aria-label={ariaLabel}>
													{labelBookOnline}
												</Link>
											);
											})()}
							<a
								href={telHref}
								className="btn rounded-full border border-brand-200 bg-white text-brand-800 hover:bg-white/90"
								aria-label={`Call ${phoneDisplay || 'the restaurant'}`}
								style={{ touchAction: 'manipulation' }}
							>
								{callLabel}
							</a>
							<a
								href={directionsHref}
								target="_blank"
								rel="noopener noreferrer"
								className="btn rounded-full border border-brand-200 bg-white text-brand-800 hover:bg-white/90"
								aria-label={`Open directions to ${identity.displayName} in a new tab`}
							>
												Get directions
											</a>
										</div>
									</div>
								<div className="rounded-[2.75rem] border border-brand-100/80 bg-white/95 p-4 shadow-2xl">
									<RestaurantHoursCard variant="light" className="w-full rounded-[1.75rem] border border-brand-100/60" />
									</div>
								</div>
							</div>
						</section>
					</FadeIn>

					{quickLinks.length ? (
						<FadeIn>
							<QuickLinksSection
								links={quickLinks}
								eyebrow="Plan ahead"
								title="Menu concierge shortcuts"
								description="Book, call, or check dietary notes without leaving this page."
								className="pt-0"
							/>
						</FadeIn>
					) : null}

					<FadeIn>
						<CallToActionSection
							{...menuServiceCta}
							theme="light"
							className="bg-gradient-to-b from-white via-brand-50 to-brand-100"
						/>
					</FadeIn>
				</main>
			</RestaurantLayout>
		</>
	);
}
