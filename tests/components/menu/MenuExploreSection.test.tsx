import { render, screen } from '@testing-library/react';
import MenuExploreSection from '@/app/menu/_components/MenuExploreSection';

jest.mock('@/app/menu/_components/MenuInteractive', () => {
	return function MockMenuInteractive() {
		return <div data-testid="menu-interactive-mock">Interactive shell</div>;
	};
});

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			addListener: jest.fn(),
			removeListener: jest.fn(),
		})),
	});
});

const sampleSections = [
	{
		id: 'starters',
		name: 'Starters',
		description: 'Light bites',
		items: [
			{
				id: 'samosa',
				name: 'Samosa',
				description: 'Crispy pastry',
				price: { amount: 7, currency: 'GBP' },
				dietary: { vegetarian: true },
				tags: ['popular'],
			},
		],
	},
];

const statHighlights = [
	{ label: 'Dishes', value: '12', description: 'Across 4 sections' },
];

describe('MenuExploreSection', () => {
	it('renders hero copy, stats, and CTA tray', () => {
		render(
			<MenuExploreSection
				sections={sampleSections as any}
				statHighlights={statHighlights as any}
				dietaryHighlights={["Natasha's Law log available"]}
			/>
		);

		expect(screen.getByText('Simple interactive menu')).toBeInTheDocument();
		expect(screen.getByText("Natasha's Law log available")).toBeInTheDocument();
		expect(screen.getByTestId('menu-interactive-mock')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /View menu info/i })).toBeInTheDocument();
	});
});
