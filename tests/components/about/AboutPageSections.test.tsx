import { render, screen } from '@testing-library/react';
import { buildHeroStats } from '@/app/about/_components/sections';
import Timeline from '@/components/about/Timeline';

describe('About page sections', () => {
  it('buildHeroStats returns timeline-driven defaults', () => {
    const stats = buildHeroStats([
      { period: '1930s', title: 'Art-deco pub opens' },
      { period: '2020', title: 'CAMRA award', description: 'CAMRA Most Improved City Pub' },
      { period: '2025', title: 'Travelers’ Choice' },
    ]);

    expect(stats[0]).toMatchObject({ value: '1930s', label: 'Since' });
    expect(stats[1].description).toContain('CAMRA');
    expect(stats[2].value).toBe('2025');
  });

  it('renders standalone timeline without duplicating intro', () => {
    render(
      <Timeline
        items={[
          { period: '1930s', title: 'Pub opens', description: 'Art-deco landmark on Newmarket Road.' },
          { period: '2024', title: 'Relaunch', description: 'Lapen Inns relaunches with Nepalese kitchen.' },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: /Our Story/i })).toBeInTheDocument();
    expect(screen.getByText(/1930s/i)).toBeInTheDocument();
    expect(screen.getByText(/Lapen Inns relaunches/i)).toBeInTheDocument();
  });
});
