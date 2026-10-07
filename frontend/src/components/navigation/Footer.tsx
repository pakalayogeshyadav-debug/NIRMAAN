/**
 * NIRMAAN — Footer
 */

import { Link } from 'react-router-dom';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';

export function Footer() {
  return (
    <footer className="bg-bg-soft border-t border-border-default pt-[48px] pb-[40px]">
      <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] flex flex-col">
        
        {/* Top grid section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[48px] lg:gap-[64px] mb-[64px]">
          
          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="flex items-center h-[24px] mb-[16px]">
              <NirmaanLogo size="sm" />
            </div>
            <p className="text-[15px] lg:text-[16px] leading-[1.6] text-text-secondary">
              Verified community action for cleaner communities.
            </p>
          </div>

          {/* Platform */}
          <div className="flex flex-col">
            <h4 className="flex items-center h-[24px] text-[13px] font-semibold tracking-[0.08em] text-text-tertiary uppercase mb-[16px]">
              Platform
            </h4>
            <ul className="space-y-[12px]">
              <li>
                <Link to="/how-it-works" className="text-[15px] lg:text-[16px] text-text-secondary hover:text-nirmaan-green transition-colors block">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-[15px] lg:text-[16px] text-text-secondary hover:text-nirmaan-green transition-colors block">
                  Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Participate */}
          <div className="flex flex-col">
            <h4 className="flex items-center h-[24px] text-[13px] font-semibold tracking-[0.08em] text-text-tertiary uppercase mb-[16px]">
              Participate
            </h4>
            <ul className="space-y-[12px]">
              <li>
                <Link to="/register" className="text-[15px] lg:text-[16px] text-text-secondary hover:text-nirmaan-green transition-colors block">
                  Join as Citizen
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-[15px] lg:text-[16px] text-text-secondary hover:text-nirmaan-green transition-colors block">
                  Register Organization
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="flex flex-col">
            <h4 className="flex items-center h-[24px] text-[13px] font-semibold tracking-[0.08em] text-text-tertiary uppercase mb-[16px]">
              About
            </h4>
            <ul className="space-y-[12px]">
              <li>
                <span className="text-[15px] lg:text-[16px] text-text-secondary block">
                  Built for India
                </span>
              </li>
              <li>
                <span className="text-[15px] lg:text-[16px] text-text-secondary block">
                  Open Civic Technology
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-[32px] border-t border-border-default flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[14px] text-text-tertiary">
            &copy; {new Date().getFullYear()} NIRMAAN
          </div>
          <div className="text-[14px] text-text-tertiary">
            Built for cleaner communities.
          </div>
        </div>

      </div>
    </footer>
  );
}
