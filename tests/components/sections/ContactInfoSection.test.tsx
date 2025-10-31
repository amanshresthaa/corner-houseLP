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
    number: '01223277217',
    href: 'tel:01223277217'
  };

  const mockLocation = {
    title: 'Location',
    description: 'Just 3 miles from Cambridge',
    address: '12 Green Side, Waterbeach, Cambridge, CB25 9HP'
  };

  const mockEmail = {
    address: 'hellothewhitehorsewaterbeach@gmail.com'
  };

  it('renders phone and location information correctly', () => {
    render(<ContactInfoSection phone={mockPhone} location={mockLocation} email={mockEmail} />);
    
    // Check phone section
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Call us for bookings')).toBeInTheDocument();
    expect(screen.getByText('01223277217')).toBeInTheDocument();
    
    // Check location section
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Just 3 miles from Cambridge')).toBeInTheDocument();
    expect(screen.getByText('12 Green Side')).toBeInTheDocument();
    expect(screen.getByText('CB25 9HP')).toBeInTheDocument();
    
    // Check email section
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('hellothewhitehorsewaterbeach@gmail.com')).toBeInTheDocument();
  });

  it('renders phone link with correct href', () => {
    render(<ContactInfoSection phone={mockPhone} location={mockLocation} email={mockEmail} />);

    const phoneLink = screen.getByRole('link', { name: '01223277217' });
    expect(phoneLink).toHaveAttribute('href', 'tel:01223277217');
  });

  it('renders email link with correct href', () => {
    render(<ContactInfoSection phone={mockPhone} location={mockLocation} email={mockEmail} />);

    const emailLink = screen.getByRole('link', { name: /email restaurant at hellothewhitehorsewaterbeach@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:hellothewhitehorsewaterbeach@gmail.com');
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
