"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { getContactInfo, getAddress, getRestaurantIdentity } from "@/lib/restaurantData";
import { useParsedData } from "@/hooks/useParsedData";
import { MarketingDataSchema, MarketingDataParsed } from "@/lib/schemas";
import config from "@/config";
import contentConfig from '@/config/content.json';
import { usePathname } from "next/navigation";
import Link from '@/lib/debugLink';

// Dynamic motion import to reduce bundle size
const DynamicMotion = dynamic(() => import('@/lib/motion/DynamicMotion'), {
  ssr: false,
  loading: () => <div className="contents" /> // Invisible wrapper while loading
});

// Utility to sanitize phone number for tel: links
const formatTelHref = (raw?: string) =>
	`tel:${(raw || "").replace(/[^+\d]/g, "")}`;

const STATIC_CONTACT = getContactInfo();
const STATIC_ADDRESS = getAddress();
const STATIC_IDENTITY = getRestaurantIdentity();

interface StickyCallButtonProps {
	/** Optional override phone */
	phone?: string;
}

/**
 * Floating Action Button (FAB) that expands to quick actions: Call & Book.
 * Mobile-first: large touch targets (min 56px), placed bottom-right (thumb zone),
 * respects safe area insets, accessible via keyboard, reduced-motion friendly.
 */
export default function StickyCallButton({ phone }: StickyCallButtonProps) {
	// Tooltip (nudge) removed
	// Restore: always show sticky button
	const hideForFooter = false;
	const hideForModal = false;
	const [crispOffset, setCrispOffset] = useState(false);
	// Button rotation state: 0 = directions, 1 = call, 2 = booking
	const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
	// Responsive flag removed: not currently used (kept minimal to avoid UI changes)
	const fallbackDisplay = STATIC_CONTACT.phone.display || STATIC_CONTACT.phone.primary;
	const fallbackTel = STATIC_CONTACT.phone.tel || formatTelHref(STATIC_CONTACT.phone.primary);
	const restaurantPhoneDisplay = phone || fallbackDisplay;
	const restaurantTel = phone ? formatTelHref(phone) : fallbackTel;
	const pathname = usePathname();

	// Marketing copy (button labels) externalized
	const { data: marketing } = useParsedData<MarketingDataParsed>("marketing.json", MarketingDataSchema);
	const btnLabelCall = marketing?.buttons?.callUs || `Call ${restaurantPhoneDisplay.replace(/\s+/g, " ")}`;

	// Routes where FAB should not appear (can't early return before hooks; decide later)
	const excludedRoutes = ["/admin", "/dashboard", "/signin"]; // add more as needed

	// Tooltip (nudge) effect removed

	// Button rotation: automatically cycle through buttons every 4 seconds (slightly longer for better UX)
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentButtonIndex((prevIndex) => (prevIndex + 1) % 3);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

		// viewport tracking removed — not used in current behavior

	// No menu to close anymore

	// Detect footer intersection to auto-hide (avoid overlap & distraction at conversion zone)
	// Disabled auto-hide for footer intersection

	// Listen for booking modal open/close events
	// Disabled auto-hide for booking modal

	// Detect Crisp widget presence to adjust offset (avoid overlap)
	useEffect(() => {
		if (!config?.crisp?.id) return; // Crisp not configured
		const check = () => {
			const el = document.querySelector(".crisp-client");
			if (el) {
				const style = window.getComputedStyle(el as HTMLElement);
				setCrispOffset(style.display !== "none");
			}
		};
		check();
		const mo = new MutationObserver(check);
		mo.observe(document.documentElement, { childList: true, subtree: true });
		return () => mo.disconnect();
	}, []);

	// Helper: generic analytics dispatcher
	const track = (action: string, meta: Record<string, any> = {}) => {
		// dataLayer (GTM) support
		if ((window as any).dataLayer) {
			(window as any).dataLayer.push({ event: "fab_action", action, ...meta });
		}
		// Custom event fallback
		window.dispatchEvent(new CustomEvent("fab-analytics", { detail: { action, ...meta } }));
	};

	const hidden = false;
	// removed preview/confirmation state — Directions now opens app immediately

	if (excludedRoutes.some((r) => pathname?.startsWith(r))) return null;
	return (
			<div
				className={`fixed z-[55] pointer-events-none print:hidden transition-all duration-500 ease-out ${hidden ? "opacity-0 pointer-events-none transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
				style={{
					paddingBottom: "env(safe-area-inset-bottom)",
					right: '1.25rem',
					bottom: crispOffset ? "7.5rem" : "1.25rem",
				}}
				aria-live="polite"
				aria-hidden={hidden}
			>
				{/* Glass morphism backdrop */}
				<div className="absolute inset-0 bg-gradient-to-t from-neutral-900/5 via-transparent to-transparent rounded-full blur-xl" />
				
				{/* Show only the currently active button in rotation */}
				<div className={`relative pointer-events-auto flex flex-col items-end gap-4`}>
					<DynamicMotion>
						{({ motion, AnimatePresence }) => (
							<AnimatePresence mode="wait">
						{currentButtonIndex === 0 && (
							<motion.div
								key="directions"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
							>
								{/** Directions button: open Apple Maps on iOS, Google Maps otherwise */}
							{(() => {
								const lat = STATIC_ADDRESS.coordinates.lat.toString();
								const lng = STATIC_ADDRESS.coordinates.lng.toString();
								const googleHref = STATIC_ADDRESS.map.google || `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
								const appleHref = STATIC_ADDRESS.map.apple || `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
								const appleNative = `maps://?daddr=${lat},${lng}&dirflg=d`;
								const isiOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
								const href = isiOS ? appleHref : googleHref; // DOM-facing href (https) so tests can read it

									return (
            										<a
            												href={href}
            										aria-label={`${contentConfig?.global?.ui?.buttons?.getDirections || 'Get Directions'} to ${STATIC_IDENTITY.displayName}`}
											data-testid="directions-sticky"
											className="group relative inline-flex items-center justify-center rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-xl bg-gradient-to-br from-secondary-500 to-secondary-600 text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary-300 hover:from-secondary-600 hover:to-secondary-700 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
											onClick={(e) => {
												// Attempt native maps on iOS immediately
												if (isiOS) {
													e.preventDefault();
													try {
														window.location.href = appleNative;
														// Fallback to https appleHref after a short delay in case native scheme isn't handled
														window.setTimeout(() => window.open(appleHref, '_blank', 'noopener'), 1200);
													} catch (err) {
														window.open(appleHref, '_blank', 'noopener');
													}
												} else {
													// non-iOS: let the anchor navigate (opens Google Maps URL)
												}
												track('directions_click', { href });
											}}
										>
											{/* Subtle rotating animation for the compass */}
											<motion.span 
												aria-hidden 
												className="text-xl relative z-10"
												animate={{ rotate: [0, 5, -5, 0] }}
												transition={{ 
													duration: 3,
													repeat: Infinity,
													ease: "easeInOut"
												}}
											>
												🧭
											</motion.span>
            												<span className="sr-only">{contentConfig?.global?.ui?.buttons?.getDirections || 'Get Directions'}</span>
										</a>
									);
								})()}
							</motion.div>
						)}
						
						{currentButtonIndex === 1 && (
							<motion.div
								key="call"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
							>
						<motion.a
							href={restaurantTel}
							aria-label={btnLabelCall}
							className="group relative flex items-center justify-center rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-xl bg-gradient-to-br from-crimson-500 to-crimson-600 text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-crimson-300 hover:from-crimson-600 hover:to-crimson-700 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
							data-analytics-event="fab_call_click"
							onClick={() => track("call_click", { phone: restaurantPhoneDisplay })}
								>
									{/* Animated background pulse effect */}
									<motion.div
										className="absolute inset-0 rounded-full bg-gradient-to-br from-crimson-400 to-crimson-500 opacity-30"
										animate={{ 
											scale: [1, 1.2, 1],
											opacity: [0.3, 0.1, 0.3]
										}}
										transition={{ 
											duration: 2,
											repeat: Infinity,
											ease: "easeInOut"
										}}
									/>
									
									<motion.span
										initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
										animate={{ scale: 1, opacity: 1, rotate: 0 }}
										transition={{ type: "spring", stiffness: 400, damping: 30 }}
										className="text-2xl relative z-10"
										aria-hidden
									>
										📞
									</motion.span>
									<span className="sr-only">{btnLabelCall}</span>
								</motion.a>
							</motion.div>
						)}
						
						{currentButtonIndex === 2 && (
							<motion.div
								key="booking"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
							>
								<Link
									href="/book-a-table"
									aria-label="Book a table"
									data-testid="booking-sticky"
									className="group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-neutral-900 shadow-xl transition-all duration-300 hover:from-accent-600 hover:to-accent-700 hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-300 sm:h-16 sm:w-16"
									onClick={() => track('book_click', { href: '/book-a-table' })}
								>
									<div className="absolute inset-0 -skew-x-12 translate-x-[-100%] rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
									
									<span aria-hidden className="relative z-10 text-xl font-semibold">📅</span>
									<span className="sr-only">Book</span>
								</Link>
							</motion.div>
						)}
							</AnimatePresence>
						)}
					</DynamicMotion>
					
					{/* Tooltip removed as requested */}
				</div>
			</div>
	);
}

// Tailwind plugin not guaranteed to have custom pulse, add utility via global CSS if missing.
