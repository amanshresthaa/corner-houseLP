import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';

import QuickLinksSection from '../../../../components/restaurant/sections/QuickLinksSection';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');

  const createMotionComponent = (tag: keyof JSX.IntrinsicElements) => {
    return ({ children, ...props }: any) => {
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
        ...rest
      } = props;
      return React.createElement(tag, rest, children);
    };
  };

  return {
    motion: {
      div: createMotionComponent('div'),
      section: createMotionComponent('section'),
      a: createMotionComponent('a'),
      article: createMotionComponent('article'),
    },
    useReducedMotion: () => false,
  };
});

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('QuickLinksSection', () => {
  const mockLinks = [
    {
      title: 'Community & Events',
      eyebrow: 'Gather',
      description: 'Seasonal gatherings & live sports – see what\'s coming up.',
      link: '/events',
      linkText: 'View Events →',
      ctaText: 'See schedule',
      accent: 'emerald',
      icon: 'ticket',
    },
    {
      title: 'Heritage & Story',
      description: 'Discover how our thatched village pub evolved into a Nepalese + British hub.',
      link: '/about',
      linkText: 'Explore Heritage →',
      accent: 'brand',
    },
    {
      title: 'Our Menu',
      description: 'Authentic Nepalese dishes alongside classic pub favorites.',
      link: '/menu',
      linkText: 'View Menu →',
      ctaText: 'Order Nepalese',
      accent: 'amber',
      icon: 'takeaway',
    },
  ];

  it('renders hero content and quick linker cards', () => {
    render(
      <QuickLinksSection
        links={mockLinks}
        eyebrow="Plan your visit"
        title="Book or order"
        description="Find what you need fast"
      />
    );

    expect(screen.getByText('Plan your visit')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Book or order' })).toBeInTheDocument();
    expect(screen.getByText(/Find what you need fast/)).toBeInTheDocument();
    expect(screen.getAllByText('Community & Events').length).toBeGreaterThan(0);
    expect(screen.getAllByText('See schedule').length).toBeGreaterThan(0);
  });

  it('renders correct href attributes for all links', () => {
    render(<QuickLinksSection links={mockLinks} />);

    const eventsLink = screen.getAllByRole('link', { name: /Community & Events: See schedule/ })[0];
    const aboutLink = screen.getAllByRole('link', { name: /Heritage & Story: Explore Heritage/ })[0];
    const menuLink = screen.getAllByRole('link', { name: /Our Menu: Order Nepalese/ })[0];

    expect(eventsLink).toHaveAttribute('href', '/events');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(menuLink).toHaveAttribute('href', '/menu');
  });

  it('applies accessibility labels with CTA text', () => {
    render(<QuickLinksSection links={mockLinks} />);

    const eventsLink = screen.getAllByRole('link', { name: /Community & Events: See schedule/ })[0];
    expect(eventsLink).toHaveAttribute('aria-label', 'Community & Events: See schedule');
  });

  it('returns null when no links provided', () => {
    const { container } = render(<QuickLinksSection links={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when links is undefined', () => {
    const { container } = render(<QuickLinksSection links={undefined as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <QuickLinksSection links={mockLinks} className="custom-class" />
    );
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });
});
