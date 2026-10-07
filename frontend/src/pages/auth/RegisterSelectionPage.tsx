import { Link } from 'react-router-dom';
import { CivicPatternBackground } from '@/components/shared/CivicPatternBackground';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';
import { Users, Building2, ArrowRight } from 'lucide-react';

export function RegisterSelectionPage() {
  return (
    <CivicPatternBackground variant="auth">

      <header className="w-full p-6 lg:p-8 flex items-center justify-between relative z-10">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
          <NirmaanLogo size="sm" />
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-secondary hidden sm:inline-block">Already have an account?</span>
          <Link 
            to="/login" 
            className="text-sm font-semibold text-nirmaan-green hover:text-nirmaan-green-light transition-colors"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-10 pb-20 px-6 relative z-10 w-full max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Join NIRMAAN</h1>
          <p className="text-lg text-text-secondary max-w-[500px] mx-auto">
            Choose how you want to contribute to cleaner communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-[800px]">
          {/* USER CARD */}
          <Link 
            to="/register/user"
            className="group bg-surface-primary border border-border-default rounded-[24px] p-8 md:p-10 flex flex-col items-start transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-nirmaan-green/30"
          >
            <div className="w-14 h-14 bg-nirmaan-green-light/20 text-nirmaan-green rounded-2xl flex items-center justify-center mb-6 border border-nirmaan-green/10">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">Citizen / Volunteer</h2>
            <p className="text-text-secondary leading-relaxed mb-8 flex-1">
              Report waste sites, join cleanup drives, volunteer in your community and track your impact.
            </p>
            <div className="text-nirmaan-green font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              Continue as User <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* ORGANIZATION CARD */}
          <Link 
            to="/register/organization"
            className="group bg-surface-primary border border-border-default rounded-[24px] p-8 md:p-10 flex flex-col items-start transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-accent-terracotta/30"
          >
            <div className="w-14 h-14 bg-accent-saffron-light/20 text-accent-terracotta rounded-2xl flex items-center justify-center mb-6 border border-accent-terracotta/10">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">NGO / Organization</h2>
            <p className="text-text-secondary leading-relaxed mb-8 flex-1">
              Create cleanup drives, coordinate volunteers, sponsor community action and measure impact.
            </p>
            <div className="text-accent-terracotta font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              Continue as Organization <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </main>
    </CivicPatternBackground>
  );
}
