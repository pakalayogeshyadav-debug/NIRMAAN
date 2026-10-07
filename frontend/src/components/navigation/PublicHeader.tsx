/**
 * NIRMAAN — Public Header / Navigation
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Impact', href: '/impact' },
];

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-sm border-b border-border-default transition-colors duration-200">
      <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px]">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center" aria-label="NIRMAAN Home">
            <NirmaanLogo size="md" />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-body font-medium transition-colors hover:text-text-primary',
                  location.pathname === link.href
                    ? 'text-nirmaan-green'
                    : 'text-text-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth actions */}
          <div className="hidden md:flex items-center gap-[20px]">
            <Link to="/login">
              <Button variant="ghost" size="lg" className="font-medium text-text-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="lg" className="font-medium">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-6 pt-4 border-t border-border-default animate-in slide-in-from-top-2" aria-label="Mobile">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-3 rounded-[var(--radius-md)] text-body font-medium transition-colors',
                    location.pathname === link.href
                      ? 'text-nirmaan-green bg-nirmaan-green-light'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-soft'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border-default">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" fullWidth>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
