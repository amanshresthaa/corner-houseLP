import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MenuSections from '@/components/menu/MenuSections';

const sections = [
	{
		id: 'starters',
		name: 'Starters',
		description: 'Kick off with sharing bites',
		items: [
			{
				id: 'momo',
				name: 'Steamed momo',
				description: 'Nepalese dumplings, house chutney',
				price: { amount: 9, currency: 'GBP' },
				dietary: { vegetarian: true },
			},
		],
	},
	{
		id: 'mains',
		name: 'Mains',
		description: 'Hearty pub favourites',
		items: [
			{
				id: 'thali',
				name: 'Nepalese thali',
				description: 'Sharing platter with rice and pickles',
				price: { amount: 18, currency: 'GBP' },
				dietary: { glutenFree: true },
			},
		],
	},
] as any;

describe('MenuSections', () => {
	it('renders section metadata and menu items', () => {
		render(<MenuSections sections={sections} />);
		expect(screen.getByRole('heading', { name: 'Starters' })).toBeInTheDocument();
		expect(screen.getByText('Kick off with sharing bites')).toBeInTheDocument();
		expect(screen.getByText('Steamed momo')).toBeInTheDocument();
		expect(screen.getByText('£18')).toBeInTheDocument();
		const listRegion = screen.getByTestId('section-list-starters');
		expect(listRegion).toHaveAttribute('role', 'region');
		expect(listRegion).toHaveAttribute('aria-labelledby', 'section-starters-title');
		expect(listRegion).toHaveAttribute('tabindex', '0');
	});

	it('respects selectedId filtering', () => {
		render(<MenuSections sections={sections} selectedId="mains" />);
		expect(screen.getByRole('heading', { name: 'Mains' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'Starters' })).not.toBeInTheDocument();
		expect(screen.getByText('Nepalese thali')).toBeInTheDocument();
	});
});
