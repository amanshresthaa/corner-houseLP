import { render, screen } from '@testing-library/react';
import React from 'react';
import BookByPhoneCard from '@/app/book-a-table/_components/BookByPhoneCard';

describe('BookByPhoneCard', () => {
  const telHref = 'tel:+441223921122';
  const displayNumber = '+44 1223 921122';
  const email = 'cornerhouse@lapeninns.com';

  it('renders online booking CTA with correct attributes when bookingUrl is provided', () => {
    const bookingUrl = 'https://thecornerhousepub.co/book-a-table';

    render(
      <BookByPhoneCard
        telHref={telHref}
        displayNumber={displayNumber}
        email={email}
        bookingUrl={bookingUrl}
      />
    );

    const onlineLink = screen.getByRole('link', {
      name: /Book online via our booking page \(opens in new tab\)/i,
    });

    expect(onlineLink).toHaveAttribute('href', bookingUrl);
    expect(onlineLink).toHaveAttribute('target', '_blank');
    expect(onlineLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('always renders the call CTA with the provided phone number', () => {
    render(<BookByPhoneCard telHref={telHref} displayNumber={displayNumber} email={email} />);

    const callLink = screen.getByRole('link', {
      name: /Call .*book a table/i,
    });

    expect(callLink).toHaveAttribute('href', telHref);
    expect(callLink).toHaveTextContent(displayNumber);
  });

  it('omits the online CTA when bookingUrl is not provided', () => {
    render(<BookByPhoneCard telHref={telHref} displayNumber={displayNumber} email={email} />);

    const onlineLink = screen.queryByRole('link', {
      name: /Book online via our booking page/i,
    });

    expect(onlineLink).not.toBeInTheDocument();
  });
});
