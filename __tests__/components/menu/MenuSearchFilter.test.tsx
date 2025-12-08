import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MenuSearchFilter from '../../../components/menu/MenuSearchFilter';
import type { Menu } from '../../../src/lib/data/schemas';

const mockSections: Menu['sections'] = [
  {
    id: 'starters',
    name: 'Starters',
    description: 'Delicious appetizers',
    items: [
      {
        id: 'item-1',
        name: 'Chicken Wings',
        description: 'Spicy chicken wings',
        price: { amount: 8.99, currency: 'GBP' },
        available: true,
        dietary: { spicy: true },
        tags: ['popular']
      },
      {
        id: 'item-2',
        name: 'Vegetable Soup',
        description: 'Fresh vegetable soup',
        price: { amount: 6.50, currency: 'GBP' },
        available: true,
        dietary: { vegetarian: true, vegan: true },
        tags: ['healthy']
      }
    ]
  },
  {
    id: 'mains',
    name: 'Main Courses',
    description: 'Hearty main dishes',
    items: [
      {
        id: 'item-3',
        name: 'Fish and Chips',
        description: 'Classic British dish',
        price: { amount: 14.99, currency: 'GBP' },
        available: true,
        dietary: { glutenFree: false },
        tags: ['classic']
      }
    ]
  }
];

const advanceTimers = async (ms: number) => {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
};

const flushPendingTimers = async () => {
  await act(async () => {
    jest.runOnlyPendingTimers();
  });
};

describe('MenuSearchFilter', () => {
  const mockOnFilterChange = jest.fn();
  const defaultProps = {
    sections: mockSections,
    onFilterChange: mockOnFilterChange,
    className: ''
  };

  const getLastCall = () => {
    const calls = mockOnFilterChange.mock.calls;
    return calls[calls.length - 1] || [];
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    window.history.replaceState(null, '', '/');
  });

  afterEach(async () => {
    await flushPendingTimers();
    jest.useRealTimers();
  });

  it('renders search input', () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search menu items...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders filter button', () => {
    render(<MenuSearchFilter {...defaultProps} />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('calls onFilterChange when search term is entered', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search menu items...');
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    
    // Fast-forward past the debounce delay
    await advanceTimers(300);
    
    await waitFor(() => {
      expect(mockOnFilterChange.mock.calls.length).toBeGreaterThan(1);
      const [filteredSections, term] = getLastCall();
      expect(term).toBe('chicken');
      expect(filteredSections).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'starters',
            items: expect.arrayContaining([
              expect.objectContaining({ name: 'Chicken Wings' })
            ])
          })
        ])
      );
    });
  });

  it('filters by dietary options', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    // Expand filters
    const filterButton = screen.getByText('Filters');
    fireEvent.click(filterButton);
    
    // Check vegetarian filter
    const vegetarianCheckbox = screen.getByLabelText(/vegetarian/i);
    fireEvent.click(vegetarianCheckbox);
    
    await advanceTimers(300);
    
    await waitFor(() => {
      expect(mockOnFilterChange.mock.calls.length).toBeGreaterThan(1);
      const [filteredSections, term, meta] = getLastCall();
      expect(term).toBe('');
      expect(meta?.filters.dietary.vegetarian).toBe(true);
      expect(filteredSections).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'starters',
            items: expect.arrayContaining([
              expect.objectContaining({ name: 'Vegetable Soup' })
            ])
          })
        ])
      );
    });
  });

  it('shows active filter count', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    // Add search term
    const searchInput = screen.getByPlaceholderText('Search menu items...');
    fireEvent.change(searchInput, { target: { value: 'soup' } });
    
    await advanceTimers(300);
    
    await waitFor(() => {
      const matches = screen.getAllByText(/1 item/i);
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it('clears search when clear button is clicked', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search menu items...');
    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    
    // Wait for clear button to appear
    await advanceTimers(300);
    
    await waitFor(() => {
      const clearButton = screen.getByLabelText('Clear search');
      fireEvent.click(clearButton);
    });
    
    expect(searchInput).toHaveValue('');
  });

  it('shows clear all button when filters are active', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search menu items...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    await advanceTimers(300);
    
    await waitFor(() => {
      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });
  });

  it('clears all filters when clear all button is clicked', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search menu items...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    await advanceTimers(300);
    
    await waitFor(() => {
      const clearAllButton = screen.getByText('Clear all');
      fireEvent.click(clearAllButton);
    });
    
    expect(searchInput).toHaveValue('');
    
    // Wait for the clear action to complete
    await waitFor(() => {
      expect(mockOnFilterChange.mock.calls.length).toBeGreaterThan(1);
      const [filteredSections, term] = getLastCall();
      expect(term).toBe('');
      expect(filteredSections).toHaveLength(mockSections.length);
    });
  });

  it('filters by price range', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    // Expand filters
    const filterButton = screen.getByText('Filters');
    fireEvent.click(filterButton);
    
    // Change max price
    const maxPriceInput = screen.getByLabelText('Maximum price');
    fireEvent.change(maxPriceInput, { target: { value: '10' } });
    
    await advanceTimers(300);
    
    await waitFor(() => {
      expect(mockOnFilterChange.mock.calls.length).toBeGreaterThan(1);
      const [filteredSections, term, meta] = getLastCall();
      expect(term).toBe('');
      expect(meta?.filters.priceRange.max).toBe(10);
      expect(filteredSections).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            items: expect.not.arrayContaining([
              expect.objectContaining({ name: 'Fish and Chips' })
            ])
          })
        ])
      );
    });
  });

  it('debounces search input', async () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search menu items...');
    
    // Type multiple characters quickly
    fireEvent.change(searchInput, { target: { value: 'c' } });
    fireEvent.change(searchInput, { target: { value: 'ch' } });
    fireEvent.change(searchInput, { target: { value: 'chi' } });
    
    // Should not call onFilterChange yet
    const initialCallCount = mockOnFilterChange.mock.calls.length;
    expect(mockOnFilterChange).toHaveBeenCalledTimes(initialCallCount);
    
    // Fast-forward past debounce delay
    await advanceTimers(300);
    
    // Should only call once with final value
    await waitFor(() => {
      expect(mockOnFilterChange.mock.calls.length).toBe(initialCallCount + 1);
      const [filteredSections, term] = getLastCall();
      expect(term).toBe('chi');
      expect(filteredSections).toBeInstanceOf(Array);
    });
  });

  it('responds to preset events dispatched on window', async () => {
    render(<MenuSearchFilter {...defaultProps} />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent('menu:preset', {
          detail: {
            filters: {
              searchTerm: 'veg',
              dietary: { vegetarian: true },
            },
          },
        })
      );
    });

    await advanceTimers(300);

    await waitFor(() => {
      const [filteredSections, term, meta] = getLastCall();
      expect(term).toBe('veg');
      expect(meta?.filters.dietary.vegetarian).toBe(true);
      expect(filteredSections).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'starters',
          }),
        ])
      );
    });

    act(() => {
      window.dispatchEvent(new CustomEvent('menu:preset', { detail: { reset: true } }));
    });

    await advanceTimers(300);

    await waitFor(() => {
      const [, resetTerm, meta] = getLastCall();
      expect(resetTerm).toBe('');
      expect(meta?.filters.dietary.vegetarian).toBe(false);
    });
  });

  it('has proper accessibility attributes', () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveAttribute('aria-label', 'Search menu items by name or description');
    
    const filterButton = screen.getByRole('button', { name: /filters/i });
    expect(filterButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('maintains accessibility when filters are expanded', () => {
    render(<MenuSearchFilter {...defaultProps} />);
    
    const filterButton = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(filterButton);
    
    expect(filterButton).toHaveAttribute('aria-expanded', 'true');
    expect(filterButton).toHaveAttribute('aria-controls', 'filter-options');
  });

  it('applies custom className', () => {
    const { container } = render(<MenuSearchFilter {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});