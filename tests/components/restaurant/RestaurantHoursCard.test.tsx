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

  it('renders sections and keeps weekly list expanded by default', async () => {
    const user = userEvent.setup();

    render(<RestaurantHoursCard />);

    expect(screen.getByRole('heading', { name: /restaurant & bar opening time/i })).toBeInTheDocument();
    expect(screen.getByText(/bar hours/i)).toBeInTheDocument();
    expect(screen.getByText(/kitchen hours/i)).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /show less/i });
    expect(buttons).toHaveLength(2);
    expect(screen.getAllByText(/monday/i).length).toBeGreaterThan(0);

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent(/show all hours/i);

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent(/show less/i);
  });
});
