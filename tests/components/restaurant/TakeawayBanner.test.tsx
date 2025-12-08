import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';

import TakeawayBanner from '../../../components/restaurant/TakeawayBanner';

jest.mock('@/lib/restaurantData', () => ({
  getContactInfo: () => ({
    phone: {
      display: '+44 1223 921122',
    },
  }),
}));

jest.mock('@/src/lib/constants/brand', () => ({
  BRAND: {
    nickname: 'Corner House',
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, fill, priority, ...props }: any) => ( // eslint-disable-line react/prop-types
    <img alt={alt} {...props} />
  ),
}));

describe('TakeawayBanner', () => {
  it('renders headline with brand nickname', () => {
    render(<TakeawayBanner />);
    expect(screen.getByRole('heading', { name: /Corner House feast home/i })).toBeInTheDocument();
  });

  it('shows CTA buttons with correct hrefs', () => {
    render(<TakeawayBanner />);

    const callButton = screen.getByRole('link', { name: /Call to order/i });
    const menuButton = screen.getByRole('link', { name: /View takeaway menu/i });
    const orderButton = screen.getByRole('link', { name: /Order online/i });

    expect(callButton).toHaveAttribute('href', 'tel:+441223921122');
    expect(menuButton).toHaveAttribute('href', '/menu#takeaway');
    expect(orderButton).toHaveAttribute('href', '/takeaway');
  });

  it('renders highlight chips grid with expected count', () => {
    render(<TakeawayBanner />);
    const chips = screen.getByTestId('takeaway-highlight-grid').querySelectorAll('div.rounded-2xl');
    expect(chips.length).toBeGreaterThanOrEqual(3);
  });

  it('displays hero image fallback', () => {
    render(<TakeawayBanner />);
    expect(screen.getByAltText(/Takeaway mixed grill platter/)).toBeInTheDocument();
  });
});
