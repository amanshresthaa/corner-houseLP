import { render, screen } from '@testing-library/react';
import SeasonalPromoBanner from '@/components/seasonal/SeasonalPromoBanner';

describe('SeasonalPromoBanner', () => {
  it('renders delivery promo copy, badge, and CTA link', () => {
    render(<SeasonalPromoBanner />);

    expect(screen.getByText('Delivery Service')).toBeInTheDocument();
    expect(
      screen.getByText('Now delivering. £20 minimum. 10% off collection. Free delivery within 3 miles, then £2 per extra mile.')
    ).toBeInTheDocument();

    const cta = screen.getByRole('link', {
      name: /Order for delivery or collection from The White Horse/i,
    });
    expect(cta).toHaveAttribute('href', '/online-delivery');
    expect(cta).toHaveAttribute('data-analytics-id', 'banner-delivery-service-cta');
  });

  it('exposes dataset + meta attributes for instrumentation', () => {
    render(<SeasonalPromoBanner />);

    const container = screen.getByTestId('seasonal-promo-banner');
    const wrapper = container.closest('aside');

    expect(wrapper).toHaveAttribute('data-seasonal-banner', 'true');
    expect(wrapper).toHaveAttribute('data-season', 'christmas-2025');
    expect(wrapper).toHaveAttribute('data-banner-id', 'seasonalPromoBanner');
  });
});
