import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
// Critical above-fold components should NOT be dynamic
import Navbar from './Navbar';
import NavbarStatic from './NavbarStatic';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  noMotion?: boolean;
}

export default async function RestaurantLayout({ children, noMotion = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral">
      {noMotion ? <NavbarStatic /> : <Navbar />}
      <main 
        className="relative overflow-x-hidden" 
        id="main-content"
        tabIndex={-1}
        style={{
          minHeight: '100vh',
          isolation: 'isolate', // Create new stacking context
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
