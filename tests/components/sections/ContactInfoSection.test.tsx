import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactInfoSection from '../../../components/restaurant/sections/ContactInfoSection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, whileInView, transition, viewport, whileHover, variants, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
    a: ({ children, className, href, whileHover, whileTap, ...props }: any) => (
      <a className={className} href={href} {...props}>{children}</a>
    )
  }
}));

describe('ContactInfoSection', () => {
  const mockPhone = {
    title: 'Phone',
    description: 'Call us for bookings',
    number: '+44 1223 921122',
    href: 'tel:+441223921122'
  };

  const mockLocation = {
    title: 'Location',
    description: 'Just 3 miles from Cambridge',
    address: '231 Newmarket Road, Cambridge CB5 8JE'
  };

  const mockEmail = {
    address: 'cornerhouse@lapeninns.com'
  };

  it('renders phone and location information correctly', () => {
    render(<ContactInfoSection phone={mockPhone} location={mockLocation} email={mockEmail} />);
    
    // Check phone section
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Call us for bookings')).toBeInTheDocument();
    expect(screen.getByText('+44 1223 921122')).toBeInTheDocument();
    
    // Check location section
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Just 3 miles from Cambridge')).toBeInTheDocument();
    expect(screen.getByText('231 Newmarket Road')).toBeInTheDocument();
    expect(screen.getByText('CB5 8JE')).toBeInTheDocument();
    
    // Check email section
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('cornerhouse@lapeninns.com')).toBeInTheDocument();
  });

  it('renders phone link with correct href', () => {
    render(<ContactInfoSection phone={mockPhone} location={mockLocation} email={mockEmail} />);

    const phoneLink = screen.getByRole('link', { name: '+44 1223 921122' });
    expect(phoneLink).toHaveAttribute('href', 'tel:+441223921122');
  });

  it('renders email link with correct href', () => {
    render(<ContactInfoSection phone={mockPhone} location={mockLocation} email={mockEmail} />);

    const emailLink = screen.getByRole('link', { name: /email restaurant at cornerhouse@lapeninns.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:cornerhouse@lapeninns.com');
  });

  it('parses multi-line address correctly', () => {
    const locationWithMultiLine = {
      ...mockLocation,
      address: 'Line 1, Line 2, Line 3, Line 4'
    };
    
    render(<ContactInfoSection phone={mockPhone} location={locationWithMultiLine} email={mockEmail} />);
    
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
    expect(screen.getByText('Line 3')).toBeInTheDocument();
    expect(screen.getByText('Line 4')).toBeInTheDocument();
  });

  it('returns null when phone is missing', () => {
    const { container } = render(
      <ContactInfoSection phone={undefined as any} location={mockLocation} email={mockEmail} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null when location is missing', () => {
    const { container } = render(
      <ContactInfoSection phone={mockPhone} location={undefined as any} email={mockEmail} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <ContactInfoSection
        phone={mockPhone}
        location={mockLocation}
        email={mockEmail}
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<ContactInfoSection phone={mockPhone} location={mockLocation} email={mockEmail} />);
    
    // Check for proper semantic HTML structure
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings.length).toBeGreaterThan(0);
    
    // Check aria-hidden for decorative icons
    const icons = document.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
    
    // Check for proper address element
    const addressElement = document.querySelector('address');
    expect(addressElement).toBeInTheDocument();
  });
});
