import { Link } from 'react-router-dom';
import { NirmaanPattern } from '@/components/shared/NirmaanPattern';
import { FallingWasteIllustration } from '@/components/shared/FallingWasteIllustration';
import { Button } from '@/components/ui';
import {
  ArrowRight,
  Camera,
  ShieldCheck,
  Users,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  FileCheck2,
} from 'lucide-react';

export function HowItWorksPage() {
  return (
    <div className="w-full bg-bg-primary overflow-x-hidden">
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[calc(100vh-80px)] grid items-center border-b border-border-default overflow-hidden py-12 lg:py-16">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
          {/* LEFT: Content */}
          <div className="w-full max-w-[520px]">
            <span className="block text-sm font-medium text-nirmaan-green mb-4 tracking-wide uppercase">
              HOW NIRMAAN WORKS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-5 leading-[1.08] text-balance max-w-[540px]">
              A framework for verified civic restoration.
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary mb-6 leading-[1.55] max-w-[480px] text-balance">
              NIRMAAN provides the digital infrastructure to transform civic frustration into structured, accountable action. We bridge the gap between concerned citizens, willing volunteers, and equipped organizations.
            </p>
            <div className="mt-2">
              <Link to="/register">
                <Button size="lg" className="shadow-sm">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: Illustration — capped height to prevent section inflation */}
          <div className="relative w-full h-[380px] lg:h-[420px] hidden lg:flex items-center justify-center opacity-100">
            <FallingWasteIllustration />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE NIRMAAN LOOP ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary border-b border-border-default overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[32px] relative z-10">
          <div className="mb-[40px] lg:mb-[48px]">
            <h2 className="text-text-primary text-[28px] lg:text-[36px] font-semibold mb-[12px] leading-tight max-w-[600px]">
              One community loop. From report to impact.
            </h2>
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-[56px] left-[10%] right-[10%] h-px bg-nirmaan-green/20 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[20px] lg:gap-[24px] relative z-10">
            {[
              {
                num: '01',
                title: 'DETECT',
                icon: Camera,
                desc: 'Capture photographic evidence of urban waste hazards with precise geospatial tagging.',
              },
              {
                num: '02',
                title: 'VERIFY',
                icon: ShieldCheck,
                desc: 'Authenticate submissions through AI assessment and community corroboration to prioritize resources.',
              },
              {
                num: '03',
                title: 'ACT',
                icon: Users,
                desc: 'Deploy organized volunteer cohorts and municipal resources to validated crisis points.',
              },
              {
                num: '04',
                title: 'PROVE',
                icon: FileCheck2,
                desc: 'Record definitive post-cleanup imagery to establish a verifiable audit trail of civic work.',
              },
              {
                num: '05',
                title: 'IMPACT',
                icon: Activity,
                desc: 'Translate localized efforts into measurable, platform-wide metrics for transparent accountability.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-bg-primary p-[32px] rounded-[24px] border border-[#3F6F5B]/20 flex flex-col shadow-xs h-full min-h-[280px]"
              >
                <div className="w-12 h-12 bg-surface-soft text-nirmaan-green rounded-full flex items-center justify-center mb-[24px] shrink-0">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-bold text-text-tertiary mb-[8px] tracking-wider">
                  {step.num}
                </div>
                <h3 className="text-[17px] font-semibold text-text-primary mb-[12px]">
                  {step.title}
                </h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: REPORT A WASTE SITE ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[96px] items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-surface-primary border border-border-default rounded-[24px] p-[32px] md:p-[48px] shadow-sm relative overflow-hidden">
              {/* Application UI Mockup */}
              <div className="bg-bg-primary rounded-[16px] border border-border-default overflow-hidden shadow-xs h-full w-full aspect-[4/3] relative">
                <img 
                  src="https://placehold.co/800x600/E7E2D9/25332D?text=Mobile+App+Interface" 
                  alt="Mobile app interface showing AI waste severity detection identifying a plastic pile on a Mumbai street" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-text-primary mb-[20px] leading-tight">
              1. Document the ground reality.
            </h2>
            <p className="text-[18px] text-text-secondary mb-[32px] leading-relaxed">
              Civic intervention begins with accurate data. Citizens capture high-resolution evidence of waste accumulation, instantly embedding critical geospatial coordinates to map the crisis.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Report Waste
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: VERIFY THE SIGNAL ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary border-y border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[96px] items-center">
          <div>
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-text-primary mb-[20px] leading-tight">
              2. Validate and prioritize the threat.
            </h2>
            <p className="text-[18px] text-text-secondary mb-[24px] leading-relaxed">
              Raw data requires intelligence. Our infrastructure assesses incoming reports to filter noise and direct resources efficiently:
            </p>
            <ul className="flex flex-col gap-3 mb-[32px]">
              {[
                'Waste categorization',
                'Severity assessment',
                'Location validation',
                'Duplicate-report detection',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[16px] text-text-primary">
                  <CheckCircle2 className="w-5 h-5 text-nirmaan-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-text-tertiary border-l-2 border-border-strong pl-4">
              <strong>Protocol:</strong> AI acts as an initial structuring mechanism. Definitive validation is always confirmed through localized human consensus.
            </p>
          </div>
          <div className="bg-bg-primary border border-border-default rounded-[24px] p-[32px] md:p-[48px] shadow-sm">
            <div className="border border-border-strong rounded-[16px] p-[24px] bg-surface-soft relative">
              <div className="absolute -top-3 left-6 bg-nirmaan-green text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                AI-Assisted Assessment
              </div>
              <div className="flex flex-col gap-[20px] mt-2">
                <div className="flex items-center justify-between border-b border-border-default pb-[16px]">
                  <span className="text-text-secondary text-[14px]">Waste category</span>
                  <span className="font-semibold text-text-primary text-[15px]">Mixed waste</span>
                </div>
                <div className="flex items-center justify-between border-b border-border-default pb-[16px]">
                  <span className="text-text-secondary text-[14px]">Severity</span>
                  <span className="font-semibold text-error text-[15px] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> High
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-[14px]">Confidence</span>
                  <span className="font-semibold text-nirmaan-green text-[15px]">91%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: FIND AND ORGANIZE ACTION ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[96px] items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-surface-primary border border-border-default rounded-[24px] p-[24px] md:p-[32px] shadow-sm flex flex-col md:flex-row gap-[24px]">
              {/* Interactive Heatmap */}
              <div className="flex-1 rounded-[16px] border border-border-default relative overflow-hidden flex items-center justify-center min-h-[300px]">
                <img 
                  src="https://placehold.co/600x600/E7E2D9/25332D?text=Interactive+Heatmap" 
                  alt="Digital heatmap interface displaying concentrated waste hotspots across Chennai neighborhoods" 
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
              
              {/* Activity List */}
              <div className="w-full md:w-[220px] flex flex-col gap-[12px] shrink-0">
                <div className="bg-bg-primary p-[16px] rounded-[12px] border border-border-default shadow-xs">
                  <div className="text-[12px] font-bold text-text-primary mb-1">Adyar</div>
                  <div className="text-[13px] text-text-secondary mb-2">Waste report</div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-error bg-error/10 px-2 py-0.5 rounded-full">
                    High priority
                  </div>
                </div>
                <div className="bg-bg-primary p-[16px] rounded-[12px] border border-border-default shadow-xs border-l-4 border-l-nirmaan-green">
                  <div className="text-[12px] font-bold text-text-primary mb-1">Velachery</div>
                  <div className="text-[13px] text-text-secondary mb-2">Cleanup drive</div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-nirmaan-green bg-nirmaan-green/10 px-2 py-0.5 rounded-full">
                    12 volunteers
                  </div>
                </div>
                <div className="bg-bg-primary p-[16px] rounded-[12px] border border-border-default shadow-xs">
                  <div className="text-[12px] font-bold text-text-primary mb-1">Saidapet</div>
                  <div className="text-[13px] text-text-secondary">Recurring hotspot</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-text-primary mb-[20px] leading-tight">
              3. Mobilize the civic workforce.
            </h2>
            <p className="text-[18px] text-text-secondary mb-[24px] leading-relaxed">
              Visibility drives participation. NGOs and citizen groups utilize the unified platform to broadcast cleanup drives, recruit local volunteers, and dispatch equipment to validated hotspots.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PROVE THE CLEANUP ── */}
      <section className="relative py-16 lg:py-20 bg-nirmaan-green text-white overflow-hidden">
        <NirmaanPattern variant="auth" />
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-[64px]">
            <h2 className="text-[28px] lg:text-[36px] font-semibold mb-[20px] leading-tight text-white">
              4. Establish an immutable record of restoration.
            </h2>
            <p className="text-[18px] text-nirmaan-green-light leading-relaxed">
              Promises are insufficient. We mandate rigorous cryptographic and visual proof—matching before-and-after imagery against precise timestamps and coordinates.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-[32px] md:p-[48px] shadow-xl max-w-4xl mx-auto text-text-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[32px]">
              {/* BEFORE */}
              <div className="flex flex-col gap-3">
                <div className="text-[13px] font-bold text-text-tertiary tracking-wider">BEFORE</div>
                <div className="aspect-[4/3] bg-surface-soft rounded-[16px] border border-border-default flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://placehold.co/600x450/E7E2D9/25332D?text=Hazard+Before" 
                    alt="Accumulated plastic and organic waste overflowing onto a public sidewalk in Delhi" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* AFTER */}
              <div className="flex flex-col gap-3">
                <div className="text-[13px] font-bold text-nirmaan-green tracking-wider">AFTER</div>
                <div className="aspect-[4/3] bg-nirmaan-green-light/30 rounded-[16px] border-2 border-nirmaan-green flex items-center justify-center overflow-hidden relative">
                  <img 
                    src="https://placehold.co/600x450/E7E2D9/25332D?text=Restored+After" 
                    alt="The same Delhi sidewalk fully cleared of waste with community volunteers standing by" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface-primary rounded-[16px] border border-border-default p-[24px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[24px]">
                <div className="flex items-center gap-3 text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-nirmaan-green shrink-0" /> Location confirmed
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-nirmaan-green shrink-0" /> Submission time recorded
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-nirmaan-green shrink-0" /> Before/after evidence received
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-nirmaan-green shrink-0" /> Organizer confirmation
                </div>
                <div className="flex items-center gap-3 text-[14px] text-text-secondary">
                  <Navigation className="w-5 h-5 shrink-0" /> Image analysis (Pending)
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-[24px] border-t border-border-default">
                <div className="flex items-center gap-3 bg-surface-soft px-4 py-2 rounded-full border border-border-default">
                  <span className="text-[12px] font-bold text-text-tertiary">STATUS:</span>
                  <span className="text-[13px] font-semibold text-warning">UNDER VERIFICATION</span>
                </div>
                
                <div className="flex items-center gap-3 bg-nirmaan-green-light px-4 py-2 rounded-full border border-nirmaan-green/20">
                  <CheckCircle2 className="w-4 h-4 text-nirmaan-green" />
                  <span className="text-[13px] font-semibold text-nirmaan-green">CLEANUP VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FOR ORGANIZATIONS ── */}
      <section className="relative py-16 lg:py-20 bg-surface-primary border-b border-border-default">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-[64px]">
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-text-primary mb-[20px] leading-tight">
              Command infrastructure for civic leaders.
            </h2>
            <p className="text-[18px] text-text-secondary leading-relaxed">
              Equipping NGOs, municipal bodies, and corporate social responsibility (CSR) programs with enterprise-grade tools to orchestrate large-scale environmental remediation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[40px]">
            <div className="bg-bg-primary p-[40px] rounded-[24px] border border-border-default shadow-sm">
              <h3 className="text-[18px] font-bold text-text-primary mb-[12px] uppercase tracking-wide">
                Orchestrate
              </h3>
              <p className="text-[16px] text-text-secondary leading-relaxed">
                Deploy structured cleanup campaigns with automated volunteer tracking and logistics management.
              </p>
            </div>
            <div className="bg-bg-primary p-[40px] rounded-[24px] border border-border-default shadow-sm">
              <h3 className="text-[18px] font-bold text-text-primary mb-[12px] uppercase tracking-wide">
                Allocate
              </h3>
              <p className="text-[16px] text-text-secondary leading-relaxed">
                Direct financial and material resources precisely toward validated community-led initiatives.
              </p>
            </div>
            <div className="bg-bg-primary p-[40px] rounded-[24px] border border-border-default shadow-sm border-b-4 border-b-nirmaan-green">
              <h3 className="text-[18px] font-bold text-text-primary mb-[12px] uppercase tracking-wide">
                Audit
              </h3>
              <p className="text-[16px] text-text-secondary leading-relaxed">
                Generate definitive impact reports backed by comprehensive geospatial and visual evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ── */}
      <section className="relative py-16 lg:py-20 bg-bg-primary overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-[24px] md:px-[48px] lg:px-[80px] relative z-10 text-center flex flex-col items-center">
          <h2 className="text-[32px] md:text-[40px] text-text-primary font-semibold mb-[16px]">
            The environment demands accountability.
          </h2>
          <p className="text-[18px] md:text-[20px] text-text-secondary mb-[40px] max-w-2xl text-balance">
            Deploy the NIRMAAN protocol to enforce civic responsibility in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-[16px]">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="shadow-sm w-full">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/impact" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full">
                Explore Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
