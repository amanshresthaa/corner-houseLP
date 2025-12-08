import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { expect } from '@jest/globals';

import CallToActionSection from '../../../../components/restaurant/sections/CallToActionSection';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');
  
  const createMotionComponent = (tag: string) => {
    return ({ children, ...props }: any) => {
      // Filter out motion-specific props to avoid React warnings
      const {
        whileHover,
        whileTap,
        whileInView,
        initial,
        animate,
        exit,
        transition,
        variants,
        viewport,
        onAnimationComplete,
        onAnimationStart,
        ...domProps
      } = props;
      
      return React.createElement(tag, domProps, children);
    };
  };
  
  return {
    motion: {
      div: createMotionComponent('div'),
      section: createMotionComponent('section'),
      a: createMotionComponent('a'),
    },
  };
});

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, target, rel, ...props }: any) => {
    return (
      <a href={href} target={target} rel={rel} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => {
  return ({ alt, src, ...props }: any) => {
    const { fill, priority, ...rest } = props;
    return <img alt={alt} src={src} {...rest} />;
  };
});

describe('CallToActionSection', () => {
  const mockCTAData = {
    eyebrow: 'Takeaway hotline',
    badge: { label: 'Prep time', value: '20 min avg' },
    headline: 'Takeaway-ready Nepalese feasts',
    description: 'Reserve heated cabins, or tap the hotline for sizzling mixed grills to go.',
    features: [
      'Collection or delivery across Cambridge all week',
      'Heated cabins with HD sport and full table service',
      'Mixed grills, momos, and roasts prepped fast'
    ],
    contact: { label: 'Call to order', value: '+44 1223 921122', detail: 'Daily from noon' },
    image: { src: '/cta.jpg', alt: 'CTA' },
    buttons: [
      {
        text: 'View Menu',
        href: '/menu',
        variant: 'accent' as const,
        key: 'menu'
      },
      {
        text: 'Order Takeaway',
        href: '/takeaway',
        variant: 'brand' as const,
        key: 'takeaway'
      },
      {
        text: 'Book Online',
        href: '/book-a-table',
        variant: 'crimson' as const,
        external: false,
        key: 'bookOnline'
      }
    ]
  };

  it('renders headline and description correctly', () => {
    render(<CallToActionSection {...mockCTAData} />);

    expect(screen.getByText(/Takeaway-ready Nepalese feasts/)).toBeInTheDocument();
    expect(screen.getByText(/Reserve heated cabins/)).toBeInTheDocument();
    expect(screen.getByText('Takeaway hotline')).toBeInTheDocument();
    expect(screen.getByText('Prep time')).toBeInTheDocument();
  });

  it('renders all CTA buttons with correct text', () => {
    render(<CallToActionSection {...mockCTAData} />);

    expect(screen.getByRole('link', { name: 'View Menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Order Takeaway' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book Online' })).toBeInTheDocument();
  });

  it('applies correct href attributes to all buttons', () => {
    render(<CallToActionSection {...mockCTAData} />);

    const menuLink = screen.getByRole('link', { name: 'View Menu' });
    const takeawayLink = screen.getByRole('link', { name: 'Order Takeaway' });
    const bookingLink = screen.getByRole('link', { name: /Book Online/ });

    expect(menuLink).toHaveAttribute('href', '/menu');
    expect(takeawayLink).toHaveAttribute('href', '/takeaway');
    expect(bookingLink).toHaveAttribute('href', '/book-a-table');
  });

  it('renders book link without external attributes', () => {
    render(<CallToActionSection {...mockCTAData} />);

    const bookingLink = screen.getByRole('link', { name: /Book Online/ });
    expect(bookingLink).not.toHaveAttribute('target');
    expect(bookingLink).not.toHaveAttribute('rel');
  });

  it('applies correct button variant styling classes', () => {
    render(<CallToActionSection {...mockCTAData} />);

    const menuLink = screen.getByRole('link', { name: 'View Menu' });
    const takeawayLink = screen.getByRole('link', { name: 'Order Takeaway' });
    const bookingLink = screen.getByRole('link', { name: /Book Online/ });

    // Check accent variant
    expect(menuLink).toHaveClass('bg-white', 'text-brand-800');
    
    // Check brand variant
    expect(takeawayLink).toHaveClass('bg-brand-900', 'text-white');
    
    // Check crimson variant
    expect(bookingLink).toHaveClass('bg-white', 'text-crimson-700');
  });

  it('detects external links automatically by URL pattern', () => {
    const dataWithAutoDetectedExternal = {
      ...mockCTAData,
      buttons: [
        {
          text: 'External Link',
          href: 'https://example.com',
          variant: 'accent' as const
        }
      ]
    };

    render(<CallToActionSection {...dataWithAutoDetectedExternal} />);

    const externalLink = screen.getByRole('link', { name: /External Link.*opens in new tab/ });
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies proper accessibility attributes', () => {
    render(<CallToActionSection {...mockCTAData} />);

    const menuLink = screen.getByRole('link', { name: 'View Menu' });
    const bookingLink = screen.getByRole('link', { name: /Book Online/ });

    expect(menuLink).toHaveAttribute('aria-label', 'View Menu');
    expect(bookingLink).toHaveAttribute('aria-label', 'Book Online');
  });

  it('renders highlight chips for each feature item', () => {
    const { container } = render(<CallToActionSection {...mockCTAData} />);
    const grid = container.querySelector('[data-testid="cta-highlight-grid"]');
    expect(grid).toBeInTheDocument();
    const items = grid?.querySelectorAll('li') || [];
    expect(items).toHaveLength(mockCTAData.features.length);
  });

  it('shows hotline contact card when contact data is provided', () => {
    render(<CallToActionSection {...mockCTAData} />);
    const hotlineCard = screen.getByTestId('cta-hotline-card');
    expect(hotlineCard).toHaveTextContent('+44 1223 921122');
    const tapToCallLink = screen.getByRole('link', { name: 'Tap to call' });
    expect(tapToCallLink).toHaveAttribute('href', 'tel:+441223921122');
  });

  it('renders hero image wrapper even without provided image', () => {
    render(<CallToActionSection {...mockCTAData} image={undefined as any} />);
    expect(screen.getByTestId('cta-hero-image')).toBeInTheDocument();
  });

  it('renders semantic HTML structure', () => {
    const { container } = render(<CallToActionSection {...mockCTAData} />);
    
    const section = container.querySelector('section');
    const heading = container.querySelector('h2');

    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-12');
    expect(heading).toHaveClass('font-display', 'font-bold');
  });

  it('includes focus management for accessibility', () => {
    render(<CallToActionSection {...mockCTAData} />);

    const buttonContainer = screen.getByTestId('cta-buttons');
    const buttons = within(buttonContainer).getAllByRole('link');
    buttons.forEach(button => {
      expect(button).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-offset-2');
    });
  });

  it('returns null when no headline provided', () => {
    const { container } = render(
      <CallToActionSection 
        headline="" 
        description="Test description" 
        buttons={mockCTAData.buttons} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null when no buttons provided', () => {
    const { container } = render(
      <CallToActionSection 
        headline="Test headline" 
        description="Test description" 
        buttons={[]} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <CallToActionSection {...mockCTAData} className="custom-class" />
    );
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('handles responsive button layout correctly', () => {
    const { container } = render(<CallToActionSection {...mockCTAData} />);
    
    const buttonContainer = container.querySelector('[data-testid="cta-buttons"]');
    expect(buttonContainer).toHaveClass('flex-wrap', 'gap-3');
  });

  it('uses button key for React key when available', () => {
    // This test verifies that the key prop is handled correctly
    // We can't directly test React keys, but we ensure no console warnings
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<CallToActionSection {...mockCTAData} />);
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
