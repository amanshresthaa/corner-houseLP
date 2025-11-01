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

  it.each(variants)('keeps weekly list expanded by default on the $context', async ({ variant }) => {
    const user = userEvent.setup();

    render(<RestaurantHoursCard variant={variant} />);

    expect(screen.getByRole('heading', { name: /restaurant & bar opening time/i })).toBeInTheDocument();
    expect(screen.getByText(/bar hours/i)).toBeInTheDocument();
    expect(screen.getByText(/kitchen hours/i)).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /show less/i });
    expect(buttons).toHaveLength(2);
    expect(screen.queryAllByRole('button', { name: /show all hours/i })).toHaveLength(0);
    expect(screen.getAllByText(/monday/i)).toHaveLength(2);

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent(/show all hours/i);

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent(/show less/i);
  });
});
