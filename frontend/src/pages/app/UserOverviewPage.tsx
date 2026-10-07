import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import { Plus, ArrowRight, MapPin, Activity, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserOverviewPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Citizen';

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-border-default">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Good morning, {firstName}
          </h1>
          <p className="text-lg text-text-secondary">
            Make an impact in your neighbourhood.
          </p>
        </div>
        <Link to="/app/report">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            <Plus className="w-5 h-5" />
            Report Waste
          </Button>
        </Link>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-primary border border-border-default rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-nirmaan-green-light/20 flex items-center justify-center shrink-0 border border-nirmaan-green/10">
            <MapPin className="w-6 h-6 text-nirmaan-green" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-1">Total Reports</p>
            <p className="text-2xl font-bold text-text-primary">0</p>
          </div>
        </div>
        
        <div className="bg-surface-primary border border-border-default rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-accent-saffron-light/20 flex items-center justify-center shrink-0 border border-accent-terracotta/10">
            <Activity className="w-6 h-6 text-accent-terracotta" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-1">Drives Joined</p>
            <p className="text-2xl font-bold text-text-primary">0</p>
          </div>
        </div>

        <div className="bg-surface-primary border border-border-default rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-accent-gold/20 flex items-center justify-center shrink-0 border border-accent-gold/20">
            <Award className="w-6 h-6 text-nirmaan-green-deep" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-1">Impact Score</p>
            <p className="text-2xl font-bold text-text-primary">0</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nearby Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Nearby Activity</h2>
            <Link to="/app/activity" className="text-sm font-semibold text-nirmaan-green hover:text-nirmaan-green-light flex items-center gap-1 group">
              View map <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="bg-surface-primary border border-border-default rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[240px]">
            <Activity className="w-10 h-10 text-text-tertiary mb-3" />
            <h3 className="text-text-primary font-semibold mb-2">No nearby activity yet.</h3>
            <p className="text-text-secondary text-sm max-w-sm mb-4">
              Activity reported in your area will appear here. Be the first to report waste in your neighbourhood!
            </p>
            <Link to="/app/report">
              <Button variant="outline">Start reporting</Button>
            </Link>
          </div>
        </section>

        {/* Upcoming Cleanup Drives */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Upcoming Drives</h2>
            <Link to="/app/drives" className="text-sm font-semibold text-nirmaan-green hover:text-nirmaan-green-light flex items-center gap-1 group">
              Browse all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="bg-surface-primary border border-border-default rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[240px]">
            <MapPin className="w-10 h-10 text-text-tertiary mb-3" />
            <h3 className="text-text-primary font-semibold mb-2">No upcoming drives</h3>
            <p className="text-text-secondary text-sm max-w-sm mb-4">
              There are no community cleanup drives scheduled near you right now. 
            </p>
            <Link to="/app/drives">
              <Button variant="outline">Explore other areas</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
