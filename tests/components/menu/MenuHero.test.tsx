import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MenuHero from '@/app/menu/_components/MenuHero';

jest.mock('@/app/menu/_content/useMenuContent', () => ({
	useMenuContent: () => ({ hero: null }),
}));

describe('MenuHero', () => {
	it('renders highlights and CTA buttons when data is provided', () => {
		render(
			<MenuHero
				hero={{
					title: 'Menu & takeaway',
					subtitle: 'Discover the latest dishes fresh from the kitchen.',
					buttons: {
						bookOnline: {
							label: 'Book now',
							url: 'https://cornerhouse.com/book',
							target: '_blank',
						},
						orderTakeaway: {
							label: 'Call the kitchen',
							url: 'tel:+441223921122',
						},
					},
				}}
				eyebrow="Seasonal menu"
				highlights={[{ label: 'Dishes', value: '48', description: 'Across six sections' }]}
			/>
		);

		expect(screen.getByText('Menu & takeaway')).toBeInTheDocument();
		expect(screen.getByTestId('menu-hero-highlight-grid')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Book now/i })).toHaveAttribute('target', '_blank');
		expect(screen.getByRole('link', { name: /Call the kitchen/i })).toHaveAttribute('href', 'tel:+441223921122');
	});
});
