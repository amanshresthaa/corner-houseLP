'use client';

import { useMemo } from 'react';
import Link from '@/lib/debugLink';
import type { Menu } from '@/src/lib/data/schemas';
import MenuInteractive from './MenuInteractive';
import type { MenuHeroHighlight } from '@/src/lib/menu/page-patterns';

type Props = {
	sections: Menu['sections'];
	defaultSelected?: string | null;
	statHighlights: MenuHeroHighlight[];
	menuDescription?: string | null;
	telHref?: string;
	menuInformationHref?: string;
	contactDisplayPhone?: string;
	dietaryHighlights?: string[];
};

export default function MenuExploreSection({
	sections,
	defaultSelected,
	statHighlights,
	menuDescription,
	telHref,
	menuInformationHref = '/menu-information',
	contactDisplayPhone,
	dietaryHighlights,
}: Props) {
	const highlightCards = useMemo(() => statHighlights.slice(0, 3), [statHighlights]);
	const dietaryNotes = useMemo(() => (dietaryHighlights || []).slice(0, 2), [dietaryHighlights]);
	const hasHighlights = highlightCards.length > 0 || dietaryNotes.length > 0;

	return (
		<section
			aria-labelledby="menu-explore-heading"
			data-testid="menu-explore-section"
			className="bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 py-16 text-white sm:py-20"
		>
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:items-start">
					<div className="space-y-8 lg:sticky lg:top-8" data-testid="menu-explore-left">
						<div className="rounded-[2.75rem] border border-white/20 bg-white/5 p-6 shadow-2xl sm:p-8">
							<span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/80">
								Explore the menu
							</span>
							<h2 id="menu-explore-heading" className="mt-5 text-4xl font-display font-bold leading-tight text-white sm:text-[2.5rem]">
								Simple interactive menu
							</h2>
							<p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
								{menuDescription || 'Peek at every section, use a single search box, or tap a quick filter to narrow things down.'}
							</p>
							{hasHighlights ? (
								<div className="mt-6 space-y-4" data-testid="menu-explore-stats">
									{highlightCards.length ? (
										<dl className="grid gap-3 sm:grid-cols-3">
										{highlightCards.map((stat) => (
											<div key={stat.label} className="rounded-2xl border border-white/20 bg-white/5 p-4">
												<dt className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/70">{stat.label}</dt>
												<dd className="mt-2 text-2xl font-display font-semibold text-white">{stat.value}</dd>
												{stat.description ? (
													<p className="text-xs text-white/70">{stat.description}</p>
													) : null}
											</div>
										))}
									</dl>
								) : null}
								{dietaryNotes.length ? (
									<div className="rounded-2xl border border-white/20 bg-white/10 p-4">
										<p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/70">Dietary care</p>
										<ul className="mt-2 space-y-1 text-sm text-white/80" data-testid="menu-dietary-highlight-grid">
											{dietaryNotes.map((note) => (
												<li key={note} className="list-disc pl-4">
													{note}
												</li>
											))}
										</ul>
									</div>
								) : null}
							</div>
						) : null}
					</div>

					<div className="rounded-[2.25rem] border border-white/20 bg-white/5 p-6 shadow-lg">
							<div className="flex flex-wrap items-center gap-3">
								{telHref ? (
									<a
										href={telHref}
									className="btn rounded-full border border-white/30 bg-white text-brand-900 shadow-lg hover:bg-white/90"
										style={{ touchAction: 'manipulation' }}
									>
											Call {contactDisplayPhone || 'us'}
										</a>
								) : null}
							<Link href={menuInformationHref} className="btn btn-outline rounded-full border-white/30 text-white hover:bg-white/10">
									View menu info
								</Link>
							</div>
							<p className="mt-3 text-sm text-white/75">
								Prefer speaking to the team? Call us for allergens or booking notes before you arrive.
							</p>
						</div>
					</div>

					<div className="space-y-6" data-testid="menu-explore-right">
						<div className="rounded-[2.75rem] border border-white/10 bg-white p-5 text-brand-900 shadow-2xl sm:p-6 lg:p-8" id="menu-interactive-card">
							{/* Anchor aliases for legacy CTAs / marketing hashes */}
							<span id="nepalese" className="sr-only" aria-hidden />
							<span id="drinks" className="sr-only" aria-hidden />
							<span id="takeaway" className="sr-only" aria-hidden />
							<span id="lunch" className="sr-only" aria-hidden />
							<div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-100/70 pb-4">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">Interactive menu</p>
									<p className="text-sm text-brand-600">Search, filter, and jump through sections.</p>
								</div>
							</div>
							<MenuInteractive
								sections={sections}
								defaultSelected={defaultSelected || undefined}
								preloadedData
								tone="light"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
