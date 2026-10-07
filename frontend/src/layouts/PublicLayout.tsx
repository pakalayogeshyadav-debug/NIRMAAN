/**
 * NIRMAAN — Public Layout
 *
 * Layout wrapper for public pages (landing, how-it-works, impact, auth).
 * Includes the public navigation header and footer.
 */

import { Outlet } from 'react-router-dom';
import { PublicHeader } from '@/components/navigation/PublicHeader';
import { Footer } from '@/components/navigation/Footer';

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary relative">
      <div className="relative z-10">
        <PublicHeader />
      </div>
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
