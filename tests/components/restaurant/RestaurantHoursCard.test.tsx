import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={typeof href === 'string' ? href : '#'} {...props}>
      {children}
    </a>
  );
});

const mockUseOpeningHours = jest.fn();

jest.mock('@/hooks/data/useOpeningHours', () => ({
  useOpeningHours: () => mockUseOpeningHours(),
}));

import RestaurantHoursCard from '@/components/restaurant/RestaurantHoursCard';

describe('RestaurantHoursCard', () => {
  beforeEach(() => {
    mockUseOpeningHours.mockReturnValue({
      hours: {
        kitchen: [
          { day: 'Monday', hours: '12:00 - 22:00', rawHours: '12:00-22:00', isToday: true, isOpen: true },
          { day: 'Tuesday', hours: '12:00 - 22:00', rawHours: '12:00-22:00', isToday: false, isOpen: false },
        ],
        bar: [
          { day: 'Monday', hours: '12:00 - 23:00', rawHours: '12:00-23:00', isToday: true, isOpen: true },
          { day: 'Tuesday', hours: '12:00 - 23:00', rawHours: '12:00-23:00', isToday: false, isOpen: false },
        ],
        summary: {
          kitchenSummary: 'Kitchen open daily',
          barSummary: 'Bar open daily',
        },
        currentStatus: {
          isOpen: true,
          currentService: 'kitchen',
          nextChange: null,
        },
      },
      isLoading: false,
      error: null,
      restaurant: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const variants: Array<{ variant: 'light' | 'dark'; context: string }> = [
    { variant: 'light', context: 'menu page (light variant)' },
    { variant: 'dark', context: 'home page (dark variant)' },
  ];

  it.each(variants)('shows weekly list collapsed by default on the $context', async ({ variant }) => {
    const user = userEvent.setup();

    render(<RestaurantHoursCard variant={variant} />);

    expect(screen.getByRole('heading', { name: /restaurant & bar opening time/i })).toBeInTheDocument();
    expect(screen.getByText(/bar hours/i)).toBeInTheDocument();
    expect(screen.getByText(/kitchen hours/i)).toBeInTheDocument();

    // Expect both sections collapsed initially
    const expandButtons = screen.getAllByRole('button', { name: /show all hours/i });
    expect(expandButtons).toHaveLength(2);
    expect(screen.queryAllByRole('button', { name: /show less/i })).toHaveLength(0);
    expect(screen.queryAllByText(/monday/i)).toHaveLength(0);

    // Toggle first section open then closed
    await user.click(expandButtons[0]);
    expect(expandButtons[0]).toHaveTextContent(/show less/i);
    expect(screen.getAllByText(/monday/i).length).toBeGreaterThanOrEqual(1);

    await user.click(expandButtons[0]);
    expect(expandButtons[0]).toHaveTextContent(/show all hours/i);
    // After collapsing again, Monday from first section should hide; the second remains closed
    // We can't easily disambiguate duplicates here; ensure at most one remains if any transient render
    // But ideally none should be visible
    expect(screen.queryAllByText(/monday/i)).toHaveLength(0);
  });
});
