import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { expect } from '@jest/globals';

import LocationSection from '../../../../components/restaurant/LocationSection';

jest.mock('../../../../lib/restaurantData', () => ({
  getContactInfo: () => ({
    phone: { display: '+44 1223 921122' },
    email: { primary: 'cornerhouse@lapeninns.com' },
    address: {
      street: '231 Newmarket Road',
      area: 'Cambridge',
      city: 'Cambridge',
      postcode: 'CB5 8JE',
      map: {
        google: 'https://maps.google.com',
        apple: 'https://maps.apple.com',
      },
    },
  }),
  getRestaurantIdentity: () => ({
    displayName: 'The Corner House Cambridge',
  }),
}));

jest.mock('../../../../components/restaurant/InteractiveMap', () => ({
  __esModule: true,
  default: ({ title, ...props }: any) => <div data-mock="map" aria-label={title} {...props} />, // eslint-disable-line react/prop-types
}));

jest.mock('../../../../components/restaurant/RestaurantHoursCard', () => ({
  __esModule: true,
  default: ({ className }: any) => <div data-mock="hours-card" className={className} />, // eslint-disable-line react/prop-types
}));

describe('LocationSection', () => {
  it('renders heading, description, and map wrapper', () => {
    render(<LocationSection />);

    expect(screen.getByRole('heading', { name: /Plan your visit/i })).toBeInTheDocument();
    expect(screen.getByText(/Opposite Cambridge Retail Park/)).toBeInTheDocument();
    const map = screen.getByTestId('find-us-map');
    expect(map).toHaveAttribute('data-mock', 'map');
  });

  it('shows action buttons with tel and map links', () => {
    render(<LocationSection />);

    const actions = screen.getByTestId('find-us-actions');
    const links = within(actions).getAllByRole('link');
    const callLink = links.find((link) => link.textContent?.includes('Call us'));
    const googleLink = links.find((link) => link.textContent?.includes('Google Maps'));
    const appleLink = links.find((link) => link.textContent?.includes('Apple Maps'));

    expect(callLink).toHaveAttribute('href', 'tel:+441223921122');
    expect(googleLink).toHaveAttribute('href', 'https://maps.google.com');
    expect(appleLink).toHaveAttribute('href', 'https://maps.apple.com');
  });

  it('renders travel tips chips matching configured count', () => {
    render(<LocationSection />);
    const tipsWrapper = screen.getByTestId('find-us-travel-tips');
    const items = within(tipsWrapper).getAllByText(/walk|parking|cycle/i);
    expect(items.length).toBeGreaterThanOrEqual(3);
  });
});
