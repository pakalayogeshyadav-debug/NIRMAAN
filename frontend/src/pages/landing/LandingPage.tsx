import { Link } from 'react-router-dom';
import { NirmaanPattern } from '@/components/shared/NirmaanPattern';
import { Button, Card, CardContent } from '@/components/ui';
import { ArrowRight, MapPin, ShieldCheck, Users, Activity, CheckCircle, BarChart, Building, Map as MapIcon, Image as ImageIcon } from 'lucide-react';
import { ActivityMap } from '@/components/map/ActivityMap';

export function LandingPage() {
  return (
    <div className="w-full bg-bg-primary overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[calc(100vh-80px)] grid items-center border-b border-border-default overflow-hidden py-12 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
          <div className="w-full max-w-[520px]">
            <span className="block text-sm font-medium text-nirmaan-green mb-4 tracking-wide uppercase">
              NIRMAAN
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-5 leading-[1.08] text-balance max-w-[540px]">
              Reclaiming Our Public Spaces.
            </h1>
            
            <p className="text-lg lg:text-xl text-[#69736D] mb-8 leading-[1.55] max-w-[480px] text-balance">
              Transform unstructured waste observations into verified civic action.
              Detect the problem. Verify the need. Act together. Prove the impact.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="shadow-sm w-full">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="shadow-none w-full">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-[380px] lg:h-[420px] hidden lg:flex items-center justify-center">
            <NirmaanPattern variant="hero-right" />
          </div>
        </div>
      </section>

      {/* ── PRODUCT STORY (ACTION LOOP) ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary border-b border-border-default overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-text-primary font-semibold mb-4 leading-tight">
              The Engine of Civic Action
            </h2>
            <p className="text-base md:text-lg text-text-secondary">
              A continuous loop from observation to verified impact.
            </p>
          </div>
          
          <div className="flex overflow-x-auto pb-6 hide-scrollbar snap-x gap-4 md:gap-6 justify-start">
            {[
              { icon: MapPin, title: 'DETECT', desc: 'Report waste with location and evidence.' },
              { icon: ShieldCheck, title: 'VERIFY', desc: 'Assess the reported situation.' },
              { icon: MapIcon, title: 'PRIORITIZE', desc: 'Identify activity that needs attention.' },
              { icon: Users, title: 'ACT', desc: 'Coordinate volunteers and cleanup drives.' },
              { icon: Activity, title: 'CLEAN', desc: 'Carry out the cleanup.' },
              { icon: ImageIcon, title: 'PROVE', desc: 'Submit before/after evidence.' },
              { icon: BarChart, title: 'IMPACT', desc: 'Track verified community action.' },
            ].map((step, idx) => (
              <div key={step.title} className="flex-none w-[200px] snap-center bg-bg-primary rounded-xl p-5 border border-border-default flex flex-col gap-3 relative">
                <div className="w-10 h-10 rounded-full bg-nirmaan-green-light text-nirmaan-green flex items-center justify-center shrink-0">
                  <step.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-nirmaan-green mb-1 tracking-wider">0{idx + 1}</div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
                {idx < 6 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-border-default">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIZEN + ORGANIZATION (HOW IT WORKS) ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <Card className="bg-surface-primary border-border-default shadow-xs hover:shadow-sm transition-shadow">
              <CardContent className="p-8 md:p-10">
                <div className="w-12 h-12 bg-nirmaan-green-light text-nirmaan-green rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">Citizen / Volunteer</h3>
                <ul className="space-y-4">
                  {[
                    'Report waste',
                    'Discover nearby activity',
                    'Join cleanup drives',
                    'Submit cleanup evidence',
                    'Track impact'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-text-secondary">
                      <CheckCircle className="h-5 w-5 text-nirmaan-green shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface-primary border-border-default shadow-xs hover:shadow-sm transition-shadow">
              <CardContent className="p-8 md:p-10">
                <div className="w-12 h-12 bg-accent-saffron-light text-accent-terracotta rounded-full flex items-center justify-center mb-6">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">NGO / Organization</h3>
                <ul className="space-y-4">
                  {[
                    'Coordinate volunteers',
                    'Create cleanup drives',
                    'Review cleanup evidence',
                    'Sponsor community action',
                    'Track organizational impact'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-text-secondary">
                      <CheckCircle className="h-5 w-5 text-accent-terracotta shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── MAP STORY ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary border-y border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl text-text-primary font-semibold mb-4 leading-tight">
              See where action is needed.
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Discover verified waste reports and upcoming cleanup drives in your area.
              Join a drive or take action independently to clear your neighborhood.
            </p>
            <Link to="/map">
              <Button variant="outline" className="shadow-sm">
                Explore Map
              </Button>
            </Link>
          </div>
          <div className="h-[400px] w-full bg-bg-primary rounded-2xl border border-border-default overflow-hidden relative shadow-xs">
            <ActivityMap
              activities={[
                { id: '1', type: 'WASTE_REPORT', latitude: 28.6139, longitude: 77.209, locationName: 'Metro Station', distanceKm: 1.2, title: 'Waste near Metro Station', status: 'VERIFIED', timestamp: '2h ago' },
                { id: '2', type: 'CLEANUP_DRIVE', latitude: 28.6239, longitude: 77.219, locationName: 'Central Park', distanceKm: 2.5, title: 'Weekend Community Cleanup', status: 'OPEN', timestamp: 'Oct 12' }
              ]}
              mapCenter={[28.6139, 77.209]}
              userLocation={null}
              locationError={null}
              onRequestLocation={() => {}}
              onActionClick={() => {}}
              mode="USER"
            />
            {/* Overlay to prevent actual map interaction on landing if desired, or let them interact */}
            <div className="absolute inset-0 z-50 bg-transparent pointer-events-auto" />
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl text-text-primary font-semibold mb-4">
            Measuring Real Change
          </h2>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
            Our platform tracks meaningful civic action through verified evidence, ensuring accountability for every drive.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Verified Reports', icon: ShieldCheck },
              { label: 'Cleanup Drives', icon: Activity },
              { label: 'Volunteer Participation', icon: Users },
              { label: 'Verified Cleanups', icon: CheckCircle }
            ].map((stat) => (
              <div key={stat.label} className="p-6 bg-surface-primary rounded-xl border border-border-default flex flex-col items-center justify-center gap-3">
                <stat.icon className="h-8 w-8 text-nirmaan-green" />
                <span className="text-sm font-medium text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-16 lg:py-20 border-t border-border-default bg-surface-primary overflow-hidden">
        <NirmaanPattern variant="auth" />
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl text-text-primary font-semibold mb-4">
            Turn observation into action.
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
            Help make your community cleaner, one verified action at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="shadow-sm w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
