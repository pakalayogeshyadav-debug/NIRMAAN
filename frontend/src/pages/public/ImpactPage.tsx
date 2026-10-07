import { Link } from 'react-router-dom';
import { NirmaanPattern } from '@/components/shared/NirmaanPattern';
import { Button } from '@/components/ui';
import {
  ArrowRight,
  BarChart3,
  MapPin,
  ShieldCheck,
  Users,
  Camera,
  LineChart,
  Wallet,
  Activity,
} from 'lucide-react';

export function ImpactPage() {
  return (
    <div className="w-full bg-bg-primary overflow-x-hidden">
      {/* ── SECTION 1: IMPACT HERO ── */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center border-b border-border-default overflow-hidden py-12 lg:py-16">
        <NirmaanPattern variant="auth" />
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 text-center flex flex-col items-center">
          <span className="block text-sm font-medium text-nirmaan-green mb-4 tracking-wide uppercase">
            OUR IMPACT
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-5 leading-[1.08] text-balance max-w-[800px]">
            Radical transparency in civic action.
          </h1>
          <p className="text-lg lg:text-xl text-text-secondary mb-6 leading-[1.55] max-w-[700px] text-balance">
            Moving beyond vanity metrics. We provide a rigorous, evidence-backed ledger of every street cleaned, every volunteer deployed, and every rupee of impact generated.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: IMPACT MODEL ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary border-b border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10">
          <div className="text-center mb-[48px] lg:mb-[80px]">
            <h2 className="text-text-primary text-[28px] lg:text-[36px] font-semibold mb-[12px] leading-tight">
              The anatomy of verifiable change.
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-[24px] lg:gap-0 max-w-5xl mx-auto">
            {[
              { title: 'REPORTS', value: '1,204', subtitle: 'DEMO DATA' },
              { title: 'VERIFIED SITES', value: '840', subtitle: 'DEMO DATA' },
              { title: 'CLEANUP ACTIONS', value: '412', subtitle: 'DEMO DATA' },
              { title: 'VERIFIED CLEANUPS', value: '385', subtitle: 'DEMO DATA' },
              { title: 'COMMUNITY IMPACT', value: '100%', subtitle: 'DEMO DATA' }
            ].map((metric, i, arr) => (
              <div key={i} className="flex flex-col lg:flex-row items-center gap-[24px] w-full lg:w-auto">
                <div className="flex flex-col items-center text-center">
                  <div className="text-[12px] font-bold text-nirmaan-green tracking-wider mb-2">{metric.title}</div>
                  <div className="text-[32px] font-bold text-text-primary mb-1">{metric.value}</div>
                  <div className="text-[10px] text-text-tertiary bg-surface-soft px-2 py-0.5 rounded-full">{metric.subtitle}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden lg:block w-[40px] h-px bg-border-strong mx-[20px]" />
                )}
                {i < arr.length - 1 && (
                  <div className="lg:hidden h-[24px] w-px bg-border-strong my-[8px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHAT NIRMAAN MEASURES ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary border-b border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] lg:gap-[32px]">
            {[
              {
                title: 'HAZARD RESOLUTION',
                icon: MapPin,
                desc: 'Track the exact volume of documented waste sites systematically eradicated from public spaces.',
              },
              {
                title: 'CIVIC MOBILIZATION',
                icon: Users,
                desc: 'Quantify active citizen engagement and the deployment of organized volunteer brigades.',
              },
              {
                title: 'AUDITABLE OUTCOMES',
                icon: ShieldCheck,
                desc: 'Maintain a cryptographic and visual repository of every completed environmental intervention.',
              },
              {
                title: 'CAPITAL EFFICIENCY',
                icon: Wallet,
                desc: 'Monitor the direct correlation between CSR funding injections and verified on-ground execution.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-surface-primary p-[32px] rounded-[24px] border border-border-default flex flex-col shadow-xs min-h-[220px]"
              >
                <div className="w-12 h-12 bg-nirmaan-green-light text-nirmaan-green rounded-full flex items-center justify-center mb-[24px] shrink-0">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-[16px] font-bold text-text-primary mb-[12px] uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-[16px] text-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: GEOSPATIAL IMPACT ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[96px] items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-[#EAE8E3] rounded-[24px] min-h-[400px] lg:min-h-[500px] border border-border-default relative overflow-hidden shadow-sm flex items-center justify-center">
              {/* Geospatial Dashboard Image */}
              <div className="rounded-[24px] min-h-[400px] lg:min-h-[500px] border border-border-default relative overflow-hidden shadow-sm flex items-center justify-center">
                <img 
                  src="https://placehold.co/800x600/E7E2D9/25332D?text=Geospatial+Dashboard" 
                  alt="High-contrast digital map showing active volunteer clusters and resolved waste zones across Bengaluru" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-text-primary mb-[20px] leading-tight">
              A comprehensive command center for urban hygiene.
            </h2>
            <p className="text-[18px] text-text-secondary mb-[24px] leading-relaxed">
              Transforming fragmented municipal data into a live, actionable intelligence grid. We render a continuous geographic audit of community health.
            </p>
            <div className="bg-bg-primary border border-border-default p-[24px] rounded-[16px] shadow-xs border-l-4 border-l-accent-terracotta">
              <h4 className="text-[16px] font-bold text-text-primary mb-[8px] flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-terracotta" /> Systemic failure detection
              </h4>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                By tracking recurrent waste accumulation in specific coordinates, we identify structural municipal failures that require infrastructural policy reform rather than superficial cleanup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: VERIFIED CLEANUP ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary border-t border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-[64px]">
            <h2 className="text-[28px] lg:text-[36px] font-semibold mb-[16px] leading-tight text-text-primary">
              The burden of proof.
            </h2>
            <div className="inline-block bg-surface-soft text-text-tertiary text-[11px] font-bold px-3 py-1 rounded-full border border-border-default tracking-wider">
              CRYPTOGRAPHIC LEDGER SAMPLE
            </div>
          </div>

          <div className="bg-surface-primary rounded-[32px] p-[24px] md:p-[48px] shadow-sm border border-border-default max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] mb-[32px]">
              {/* BEFORE */}
              <div className="flex flex-col gap-3">
                <div className="text-[13px] font-bold text-text-tertiary tracking-wider px-2">DOCUMENTED HAZARD</div>
                <div className="aspect-video rounded-[16px] overflow-hidden relative border border-border-default">
                  <img 
                    src="https://placehold.co/600x338/E7E2D9/25332D?text=Illegal+Dumping" 
                    alt="Severe illegal dumping site under a flyover in urban Pune" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* AFTER */}
              <div className="flex flex-col gap-3">
                <div className="text-[13px] font-bold text-nirmaan-green tracking-wider px-2">VERIFIED RESOLUTION</div>
                <div className="aspect-video rounded-[16px] overflow-hidden relative border-2 border-nirmaan-green">
                  <img 
                    src="https://placehold.co/600x338/E7E2D9/25332D?text=Site+Restored" 
                    alt="The Pune flyover site completely sanitized and reclaimed by the local community" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] pt-[24px] border-t border-border-default">
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-text-tertiary uppercase mb-1">Location</span>
                <span className="text-[14px] text-text-primary font-medium">12.9716° N, 77.5946° E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-text-tertiary uppercase mb-1">Date</span>
                <span className="text-[14px] text-text-primary font-medium">Oct 12, 2024</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-text-tertiary uppercase mb-1">Volunteers</span>
                <span className="text-[14px] text-text-primary font-medium">24 Participants</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-text-tertiary uppercase mb-1">Status</span>
                <span className="text-[14px] text-nirmaan-green font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: ORGANIZATION IMPACT ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary border-t border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-[64px]">
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-text-primary leading-tight">
              Institutional accountability, finally realized.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[40px]">
            <div className="bg-bg-primary p-[40px] rounded-[24px] border border-border-default shadow-sm">
              <div className="w-10 h-10 bg-surface-soft text-text-primary rounded-full flex items-center justify-center mb-[20px]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-text-primary mb-[12px] uppercase tracking-wide">
                Operational Oversight
              </h3>
              <p className="text-[16px] text-text-secondary leading-relaxed">
                Maintain absolute visibility over decentralized cleanup squads and volunteer logistics.
              </p>
            </div>
            <div className="bg-bg-primary p-[40px] rounded-[24px] border border-border-default shadow-sm">
              <div className="w-10 h-10 bg-surface-soft text-text-primary rounded-full flex items-center justify-center mb-[20px]">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-text-primary mb-[12px] uppercase tracking-wide">
                Capital Transparency
              </h3>
              <p className="text-[16px] text-text-secondary leading-relaxed">
                Guarantee stakeholders that financial grants translate directly into verifiable environmental remediation.
              </p>
            </div>
            <div className="bg-bg-primary p-[40px] rounded-[24px] border border-border-default shadow-sm border-b-4 border-b-nirmaan-green">
              <div className="w-10 h-10 bg-nirmaan-green-light text-nirmaan-green rounded-full flex items-center justify-center mb-[20px]">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-bold text-text-primary mb-[12px] uppercase tracking-wide">
                Empirical Reporting
              </h3>
              <p className="text-[16px] text-text-secondary leading-relaxed">
                Export irrefutable, data-rich portfolios demonstrating absolute adherence to ESG and CSR mandates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: COMMUNITY IMPACT ── */}
      <section className="relative py-16 lg:py-20 bg-nirmaan-green text-white">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 text-center">
          <div className="max-w-2xl mx-auto mb-[64px]">
            <h2 className="text-[28px] lg:text-[36px] font-semibold leading-tight text-white">
              Civic duty powered by collaborative infrastructure.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[40px] max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-[20px] border border-white/20">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-[12px] uppercase tracking-wide">
                The Watchdogs
              </h3>
              <p className="text-[16px] text-nirmaan-green-light leading-relaxed max-w-[280px]">
                Citizens surveying neighborhoods to mandate institutional attention.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-[20px] border border-white/20">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-[12px] uppercase tracking-wide">
                The Enforcers
              </h3>
              <p className="text-[16px] text-nirmaan-green-light leading-relaxed max-w-[280px]">
                Volunteers actively executing the physical remediation of our streets.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-[20px] border border-white/20">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-[12px] uppercase tracking-wide">
                The Architects
              </h3>
              <p className="text-[16px] text-nirmaan-green-light leading-relaxed max-w-[280px]">
                Institutions architecting sustainable frameworks for perpetual urban hygiene.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary overflow-hidden border-t border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 text-center flex flex-col items-center">
          <h2 className="text-[32px] md:text-[40px] text-text-primary font-semibold mb-[16px]">
            Demand better. Act decisively.
          </h2>
          <p className="text-[18px] md:text-[20px] text-text-secondary mb-[40px] max-w-2xl text-balance">
            The era of passive complaint is over. Enlist in the movement to enforce civic accountability.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-[16px]">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="shadow-sm w-full">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/how-it-works" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
