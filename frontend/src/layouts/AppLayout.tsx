/**
 * NIRMAAN — App Layout
 *
 * Layout wrapper for authenticated application pages.
 * Includes sidebar navigation, app header, and responsive layout.
 */

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { NirmaanPattern } from '@/components/shared/NirmaanPattern';

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isMapRoute = location.pathname.includes('/map') || 
                     location.pathname.includes('/nearby') || 
                     location.pathname.includes('/activity');

  return (
    <div className="flex h-screen bg-surface-soft relative overflow-hidden">
      {/* Background Pattern Layer */}
      <NirmaanPattern variant={isMapRoute ? "map" : "dashboard"} className="absolute inset-0 z-0 opacity-50" />
      
      {/* Content Layer */}
      <div className="flex w-full h-full relative z-10">
        <Sidebar />
        <MobileSidebar 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
        
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-bg-primary relative z-10 border-l border-border-default">
          <AppHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden relative custom-scrollbar">
            <div className="max-w-[1200px] mx-auto w-full relative z-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
