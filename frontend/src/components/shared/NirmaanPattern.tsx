/**
 * NIRMAAN — Background Pattern System
 * 
 * A subtle, premium background system made from small individual line-art elements.
 * Motifs are clustered intentionally (Location -> Waste -> Action -> Verification)
 * and heavily distributed to tell the project story globally across the page.
 */

import { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Leaf, 
  MapPin, 
  Recycle, 
  Building2, 
  CheckCircle2,
  Circle
} from 'lucide-react';

interface NirmaanPatternProps {
  variant?: 'hero' | 'hero-right' | 'auth' | 'dashboard' | 'subtle' | 'landing' | 'map';
  className?: string;
}

// Custom Indian Diamond Motif
const Diamond = ({ size = 20, className = '', style }: { size?: number, className?: string, style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} style={style}>
    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
  </svg>
);

export const NirmaanPattern = memo(function NirmaanPattern({
  variant = 'landing',
  className,
}: NirmaanPatternProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Normalize legacy variants
  let activeVariant = variant;
  if (variant === 'hero' || variant === 'hero-right' || variant === 'auth') activeVariant = 'landing';
  if (variant === 'subtle') activeVariant = 'dashboard';
  
  // Decide density
  const isLanding = activeVariant === 'landing';
  const isDashboard = activeVariant === 'dashboard';
  const isMap = activeVariant === 'map';

  // Opacities - Increased for stronger presence without being overwhelming
  const oPrimary = isLanding ? 0.18 : isDashboard ? 0.14 : 0.08;
  const oSecondary = isLanding ? 0.14 : isDashboard ? 0.10 : 0.06;
  const oDots = isLanding ? 0.12 : isDashboard ? 0.08 : 0.05;

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-1000',
        mounted ? 'opacity-100' : 'opacity-0',
        className
      )}
      aria-hidden="true"
    >
      <style>{`
        /* INDEPENDENT ANIMATIONS (Travel 15-25px max) */
        @keyframes float-1 { 50% { transform: translateY(-22px); } }
        @keyframes float-2 { 50% { transform: translateY(18px); } }
        @keyframes drift-1 { 50% { transform: translate(18px, -12px); } }
        @keyframes drift-2 { 50% { transform: translate(-22px, 15px); } }
        @keyframes drift-3 { 50% { transform: translate(15px, 20px); } }
        @keyframes rotate-slow { to { transform: rotate(360deg); } }
        @keyframes rotate-slow-rev { to { transform: rotate(-360deg); } }
        @keyframes pulse-gentle { 50% { transform: scale(1.08); } }

        /* Prime number durations for natural desynchronization */
        .anim-float-1 { animation: float-1 29s ease-in-out infinite; }
        .anim-float-2 { animation: float-2 37s ease-in-out infinite; }
        .anim-drift-1 { animation: drift-1 43s ease-in-out infinite; }
        .anim-drift-2 { animation: drift-2 31s ease-in-out infinite; }
        .anim-drift-3 { animation: drift-3 53s ease-in-out infinite; }
        .anim-rotate { animation: rotate-slow 59s linear infinite; }
        .anim-rotate-rev { animation: rotate-slow-rev 47s linear infinite; }
        .anim-pulse { animation: pulse-gentle 24s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .anim-float-1, .anim-float-2, .anim-drift-1, .anim-drift-2, .anim-drift-3, 
          .anim-rotate, .anim-rotate-rev, .anim-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* 
        ==================================================
        LEFT SIDE (Whitespace Hugging)
        ==================================================
      */}

      {/* TOP LEFT CLUSTER */}
      <div className="absolute top-[8%] left-[4%] md:left-[8%] anim-float-1 flex items-center gap-3" style={{ animationDelay: '-12s' }}>
        <Leaf strokeWidth={1.5} size={42} style={{ color: '#3F6F5B', opacity: oPrimary }} />
        <div className="flex flex-col gap-1 anim-drift-2" style={{ color: '#D8C08A', opacity: oDots, animationDelay: '-5s' }}>
          <Circle size={4} fill="currentColor" stroke="none" />
          <Circle size={4} fill="currentColor" stroke="none" />
        </div>
      </div>

      {/* MIDDLE LEFT CLUSTER */}
      <div className="absolute top-[45%] left-[3%] md:left-[6%] anim-drift-2 flex flex-col items-center gap-4" style={{ animationDelay: '-33s' }}>
        <Recycle strokeWidth={1.5} size={38} className="anim-rotate" style={{ color: '#E8B08A', opacity: oPrimary }} />
        {isLanding && <Diamond size={18} className="anim-pulse" style={{ color: '#3F6F5B', opacity: oSecondary }} />}
      </div>

      {/* BOTTOM LEFT CLUSTER */}
      <div className="absolute bottom-[12%] left-[6%] md:left-[10%] anim-float-2 flex items-center gap-3" style={{ animationDelay: '-27s' }}>
        <CheckCircle2 strokeWidth={1.5} size={46} className="anim-pulse" style={{ color: '#3F6F5B', opacity: oPrimary }} />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D8C08A" strokeWidth="1.5" style={{ opacity: oSecondary }} className="anim-rotate-rev">
          <circle cx="12" cy="12" r="10" strokeDasharray="3 5" />
        </svg>
      </div>


      {/* 
        ==================================================
        CENTER AREA (Top / Bottom Margins)
        ==================================================
      */}

      {/* TOP CENTER CLUSTER (Hidden on Maps to protect headers) */}
      {!isMap && (
        <div className="absolute top-[5%] left-[40%] md:left-[50%] anim-drift-3 hidden sm:flex items-center gap-4" style={{ transform: 'translateX(-50%)', animationDelay: '-19s' }}>
          <MapPin strokeWidth={1.5} size={40} style={{ color: '#E8B08A', opacity: oPrimary }} />
          <div className="flex gap-1.5 anim-float-1" style={{ color: '#3F6F5B', opacity: oDots, animationDelay: '-8s' }}>
            <Circle size={5} fill="currentColor" stroke="none" />
            <Circle size={5} fill="currentColor" stroke="none" />
            <Circle size={5} fill="currentColor" stroke="none" />
          </div>
        </div>
      )}

      {/* BOTTOM CENTER CLUSTER */}
      {!isMap && (
        <div className="absolute bottom-[8%] left-[45%] md:left-[55%] anim-float-1 flex items-center gap-3" style={{ animationDelay: '-42s' }}>
          <Leaf strokeWidth={1.5} size={34} style={{ color: '#3F6F5B', opacity: oPrimary }} />
          {isLanding && <Diamond size={22} className="anim-rotate" style={{ color: '#D8C08A', opacity: oSecondary }} />}
        </div>
      )}


      {/* 
        ==================================================
        RIGHT SIDE (Denser visual interest zone)
        ==================================================
      */}

      {/* TOP RIGHT CLUSTER */}
      <div className="absolute top-[12%] right-[8%] md:right-[15%] anim-drift-1 flex flex-col items-center gap-3" style={{ animationDelay: '-3s' }}>
        <MapPin strokeWidth={1.5} size={50} style={{ color: '#E8B08A', opacity: oPrimary }} />
        <Diamond size={16} className="anim-rotate-rev" style={{ color: '#3F6F5B', opacity: oSecondary, animationDelay: '-17s' }} />
      </div>

      {/* UPPER MIDDLE RIGHT CLUSTER */}
      <div className="absolute top-[30%] right-[20%] md:right-[30%] anim-float-2 flex items-center gap-4 hidden sm:flex" style={{ animationDelay: '-22s' }}>
        <div className="flex flex-col gap-1.5 anim-drift-3" style={{ color: '#E8B08A', opacity: oDots, animationDelay: '-11s' }}>
          <Circle size={4} fill="currentColor" stroke="none" />
          <Circle size={4} fill="currentColor" stroke="none" />
          <Circle size={4} fill="currentColor" stroke="none" />
        </div>
        <Leaf strokeWidth={1.5} size={48} style={{ color: '#3F6F5B', opacity: oPrimary }} />
      </div>

      {/* MIDDLE RIGHT CLUSTER */}
      <div className="absolute top-[52%] right-[5%] md:right-[10%] anim-drift-2 flex flex-col items-end gap-3" style={{ animationDelay: '-38s' }}>
        <Building2 strokeWidth={1.5} size={55} style={{ color: '#3F6F5B', opacity: oPrimary }} />
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none" stroke="#F3D5BD" strokeWidth="1.5" strokeDasharray="3 4" style={{ opacity: oSecondary }}>
          <path d="M0 6 Q 10 0, 20 6 T 40 6" />
        </svg>
      </div>

      {/* LOWER MIDDLE RIGHT CLUSTER */}
      {(isLanding || isDashboard) && (
        <div className="absolute top-[70%] right-[25%] md:right-[35%] anim-rotate flex items-center gap-2 hidden md:flex" style={{ animationDelay: '-14s' }}>
          <Recycle strokeWidth={1.5} size={42} style={{ color: '#E8B08A', opacity: oPrimary }} />
          {isLanding && <Circle size={6} fill="#3F6F5B" stroke="none" style={{ opacity: oDots }} />}
        </div>
      )}

      {/* BOTTOM RIGHT CLUSTER */}
      <div className="absolute bottom-[10%] right-[10%] md:right-[18%] anim-float-1 flex items-center gap-4" style={{ animationDelay: '-49s' }}>
        <CheckCircle2 strokeWidth={1.5} size={48} className="anim-pulse" style={{ color: '#3F6F5B', opacity: oPrimary }} />
        <Diamond size={24} className="anim-drift-1" style={{ color: '#D8C08A', opacity: oSecondary, animationDelay: '-25s' }} />
      </div>


      {/* 
        ==================================================
        CONNECTING ARCS / ABSTRACT SHAPES
        ==================================================
      */}
      {!isMap && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          preserveAspectRatio="none"
          style={{ opacity: oSecondary }}
        >
          <g strokeWidth="1.5" fill="none" strokeDasharray="4 8">
            {/* Subtle connection on right */}
            <path d="M calc(100vw - 120px) 250 C calc(100vw - 280px) 400, calc(100vw - 220px) 600, calc(100vw - 80px) 750" stroke="#3F6F5B" className="anim-drift-3" style={{ animationDelay: '-9s' }} />
            
            {/* Subtle connection on left */}
            {isLanding && (
              <path d="M 120 300 C 280 450, 180 650, 320 850" stroke="#E8B08A" className="anim-float-2" style={{ animationDelay: '-34s' }} />
            )}

            {/* Extra connection on bottom for large displays */}
            {isLanding && (
              <path d="M 300 calc(100vh - 100px) Q 500 calc(100vh - 200px) 700 calc(100vh - 100px)" stroke="#D8C08A" className="anim-drift-1" style={{ animationDelay: '-45s' }} />
            )}
          </g>
        </svg>
      )}
    </div>
  );
});

/**
 * Geometric connector between process steps
 */
export function ProcessConnector({ className }: { className?: string }) {
  return (
    <div
      className={cn('hidden lg:flex items-center absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10', className)}
      role="separator"
      aria-hidden="true"
    >
      <div className="h-px w-full bg-border-default relative">
        <div className="absolute top-1/2 left-[12.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 border border-accent-terracotta/40 rotate-45 bg-surface-primary" />
        </div>
        <div className="absolute top-1/2 left-[37.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 border border-accent-terracotta/40 rotate-45 bg-surface-primary" />
          <div className="absolute w-1 h-1 bg-accent-gold/60 rotate-45" />
        </div>
        <div className="absolute top-1/2 left-[62.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 border border-accent-terracotta/40 rotate-45 bg-surface-primary" />
          <div className="absolute w-1 h-1 bg-accent-gold/60 rotate-45" />
        </div>
        <div className="absolute top-1/2 left-[87.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 border border-accent-terracotta/40 rotate-45 bg-surface-primary" />
        </div>
      </div>
    </div>
  );
}
