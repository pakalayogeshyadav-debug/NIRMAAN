import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
export function FallingWasteIllustration({ className }: { className?: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={cn("relative w-full h-full overflow-hidden flex items-center justify-center", className)}>
      
      {/* Geometric transition particles are kept, but the overlapping NirmaanPattern is completely removed to ensure a clean solid background */}      <style>
        {`
          @keyframes fall-1 {
            0% { transform: translate3d(40px, 10px, 0) rotate(0deg) scale(0.9); opacity: 0; }
            10% { opacity: 0.85; }
            45% { transform: translate3d(90px, 150px, 0) rotate(90deg) scale(1); opacity: 0.85; }
            75% { transform: translate3d(180px, 320px, 0) rotate(180deg) scale(0.8); opacity: 0.85; }
            85% { transform: translate3d(180px, 360px, 0) rotate(200deg) scale(0.5); opacity: 0; }
            100% { transform: translate3d(180px, 360px, 0) rotate(200deg) scale(0.5); opacity: 0; }
          }
          @keyframes fall-2 {
            0% { transform: translate3d(160px, -20px, 0) rotate(0deg) scale(0.9); opacity: 0; }
            10% { opacity: 0.85; }
            45% { transform: translate3d(240px, 120px, 0) rotate(45deg) scale(1); opacity: 0.85; }
            75% { transform: translate3d(200px, 310px, 0) rotate(90deg) scale(0.8); opacity: 0.85; }
            85% { transform: translate3d(200px, 360px, 0) rotate(120deg) scale(0.5); opacity: 0; }
            100% { transform: translate3d(200px, 360px, 0) rotate(120deg) scale(0.5); opacity: 0; }
          }
          @keyframes fall-3 {
            0% { transform: translate3d(320px, 30px, 0) rotate(0deg) scale(0.9); opacity: 0; }
            10% { opacity: 0.85; }
            45% { transform: translate3d(300px, 180px, 0) rotate(-45deg) scale(1); opacity: 0.85; }
            75% { transform: translate3d(210px, 330px, 0) rotate(-90deg) scale(0.8); opacity: 0.85; }
            85% { transform: translate3d(210px, 370px, 0) rotate(-120deg) scale(0.5); opacity: 0; }
            100% { transform: translate3d(210px, 370px, 0) rotate(-120deg) scale(0.5); opacity: 0; }
          }
          @keyframes fall-4 {
            0% { transform: translate3d(280px, -10px, 0) rotate(0deg) scale(0.9); opacity: 0; }
            10% { opacity: 0.85; }
            45% { transform: translate3d(200px, 150px, 0) rotate(45deg) scale(1); opacity: 0.85; }
            75% { transform: translate3d(190px, 330px, 0) rotate(90deg) scale(0.8); opacity: 0.85; }
            85% { transform: translate3d(190px, 370px, 0) rotate(135deg) scale(0.5); opacity: 0; }
            100% { transform: translate3d(190px, 370px, 0) rotate(135deg) scale(0.5); opacity: 0; }
          }
          @keyframes fall-5 {
            0% { transform: translate3d(80px, 60px, 0) rotate(0deg) scale(0.9); opacity: 0; }
            10% { opacity: 0.85; }
            45% { transform: translate3d(100px, 200px, 0) rotate(180deg) scale(1); opacity: 0.85; }
            75% { transform: translate3d(190px, 320px, 0) rotate(360deg) scale(0.8); opacity: 0.85; }
            85% { transform: translate3d(190px, 360px, 0) rotate(400deg) scale(0.5); opacity: 0; }
            100% { transform: translate3d(190px, 360px, 0) rotate(400deg) scale(0.5); opacity: 0; }
          }
          @keyframes fall-6 {
            0% { transform: translate3d(220px, -40px, 0) rotate(0deg) scale(0.9); opacity: 0; }
            10% { opacity: 0.85; }
            45% { transform: translate3d(150px, 160px, 0) rotate(-90deg) scale(1); opacity: 0.85; }
            75% { transform: translate3d(200px, 330px, 0) rotate(-180deg) scale(0.8); opacity: 0.85; }
            85% { transform: translate3d(200px, 370px, 0) rotate(-200deg) scale(0.5); opacity: 0; }
            100% { transform: translate3d(200px, 370px, 0) rotate(-200deg) scale(0.5); opacity: 0; }
          }
          
          /* Geometric Transition Particles */
          @keyframes fall-particle-1 {
            0% { transform: translate3d(60px, -20px, 0) rotate(0deg) scale(0.5); opacity: 0; }
            10% { opacity: 0.25; }
            70% { transform: translate3d(160px, 300px, 0) rotate(180deg) scale(0.3); opacity: 0.25; }
            80% { transform: translate3d(160px, 340px, 0) rotate(220deg) scale(0); opacity: 0; }
            100% { transform: translate3d(160px, 340px, 0) rotate(220deg) scale(0); opacity: 0; }
          }
          @keyframes fall-particle-2 {
            0% { transform: translate3d(260px, -50px, 0) scale(0.5); opacity: 0; }
            10% { opacity: 0.25; }
            70% { transform: translate3d(210px, 320px, 0) scale(0.3); opacity: 0.25; }
            80% { transform: translate3d(210px, 360px, 0) scale(0); opacity: 0; }
            100% { transform: translate3d(210px, 360px, 0) scale(0); opacity: 0; }
          }
          @keyframes fall-particle-3 {
            0% { transform: translate3d(340px, 10px, 0) rotate(0deg) scale(0.6); opacity: 0; }
            10% { opacity: 0.25; }
            70% { transform: translate3d(220px, 300px, 0) rotate(-180deg) scale(0.3); opacity: 0.25; }
            80% { transform: translate3d(220px, 340px, 0) rotate(-220deg) scale(0); opacity: 0; }
            100% { transform: translate3d(220px, 340px, 0) rotate(-220deg) scale(0); opacity: 0; }
          }

          .animate-waste-1 { animation: fall-1 11s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 0s; }
          .animate-waste-2 { animation: fall-2 13s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 2.1s; }
          .animate-waste-3 { animation: fall-3 14s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 4.5s; }
          .animate-waste-4 { animation: fall-4 12s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 6.8s; }
          .animate-waste-5 { animation: fall-5 15s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 1.2s; }
          .animate-waste-6 { animation: fall-6 10s cubic-bezier(0.4, 0, 0.6, 1) infinite; animation-delay: 8.3s; }

          .animate-particle-1 { animation: fall-particle-1 14s linear infinite; animation-delay: 3s; }
          .animate-particle-2 { animation: fall-particle-2 12s linear infinite; animation-delay: 7s; }
          .animate-particle-3 { animation: fall-particle-3 16s linear infinite; animation-delay: 1s; }
        `}
      </style>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Container Context (400x500) */}
        <div className="relative w-full max-w-[400px] h-[500px]">
          
          {/* ── GEOMETRIC PARTICLES ── */}
          <div className="absolute top-0 left-0 animate-particle-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="8" y="0" width="11.31" height="11.31" transform="rotate(45 8 0)" stroke="#3F6F5B" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 animate-particle-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#D8C08A" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 animate-particle-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C10 2 2 8 2 15C2 17.76 4.24 20 7 20C9.76 20 10 17 10 17C10 17 10.24 20 13 20C15.76 20 18 17.76 18 15C18 8 10 2 10 2Z" stroke="#3F6F5B" strokeWidth="1.5" strokeOpacity="0.6"/>
            </svg>
          </div>

          {/* ── BIN BACK (Inside Rim) ── */}
          {/* Bin positioned at left: 140px, top: 320px. Width: 120, Height: 160 */}
          <div className="absolute left-[140px] top-[320px] opacity-90 z-10">
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
              <path d="M40 8V4C40 1.79086 41.7909 0 44 0H76C78.2091 0 80 1.79086 80 4V8" stroke="#3F6F5B" strokeWidth="3" strokeLinecap="round"/>
              <ellipse cx="60" cy="20" rx="50" ry="10" fill="#EBF0EE" stroke="#3F6F5B" strokeWidth="2" />
            </svg>
          </div>

          {/* ── FALLING WASTE (Between Back and Front of Bin) ── */}
          <div className="absolute top-0 left-0 z-20">
            {/* Object 1: Paper sheet */}
            <div className="absolute top-0 left-0 animate-waste-1">
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                <path d="M4 0H28L40 12V44C40 46.2091 38.2091 48 36 48H4C1.79086 48 0 46.2091 0 44V4C0 1.79086 1.79086 0 4 0Z" fill="#D8C08A" fillOpacity="0.6" stroke="#D8C08A" strokeWidth="2"/>
                <path d="M28 0V12H40" stroke="#D8C08A" strokeWidth="2" strokeLinejoin="round"/>
                <line x1="8" y1="20" x2="32" y2="20" stroke="#D8C08A" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="28" x2="24" y2="28" stroke="#D8C08A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Object 2: Small plastic bottle */}
            <div className="absolute top-0 left-0 animate-waste-2">
              <svg width="24" height="64" viewBox="0 0 24 64" fill="none">
                <rect x="6" y="0" width="12" height="8" rx="2" fill="#3F6F5B" fillOpacity="0.4" stroke="#3F6F5B" strokeWidth="2"/>
                <rect x="8" y="8" width="8" height="6" fill="#3F6F5B" fillOpacity="0.4" stroke="#3F6F5B" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 18C2 16.8954 2.89543 16 4 16H20C21.1046 16 22 16.8954 22 18V60C22 62.2091 20.2091 64 18 64H6C3.79086 64 2 62.2091 2 60V18Z" fill="#3F6F5B" fillOpacity="0.15" stroke="#3F6F5B" strokeWidth="2"/>
                <line x1="2" y1="32" x2="22" y2="32" stroke="#3F6F5B" strokeWidth="2"/>
                <line x1="2" y1="48" x2="22" y2="48" stroke="#3F6F5B" strokeWidth="2"/>
              </svg>
            </div>

            {/* Object 3: Crumpled wrapper */}
            <div className="absolute top-0 left-0 animate-waste-3">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L24 6L30 14L28 24L18 30L8 26L2 18L6 8L16 2Z" fill="#E8B08A" fillOpacity="0.5" stroke="#E8B08A" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M8 26L16 16L30 14" stroke="#E8B08A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 8L16 16L18 30" stroke="#E8B08A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Object 4: Cardboard fragment */}
            <div className="absolute top-0 left-0 animate-waste-4">
              <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
                <path d="M4 2L36 6L38 28L6 34L4 2Z" fill="#F3D5BD" fillOpacity="0.7" stroke="#D8C08A" strokeWidth="2" strokeLinejoin="round"/>
                <line x1="10" y1="12" x2="30" y2="16" stroke="#D8C08A" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="20" x2="32" y2="24" stroke="#D8C08A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Object 5: Tin can */}
            <div className="absolute top-0 left-0 animate-waste-5">
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                <ellipse cx="16" cy="6" rx="14" ry="4" fill="#69736D" fillOpacity="0.3" stroke="#69736D" strokeWidth="2"/>
                <path d="M2 6V34C2 36.2091 8.26801 38 16 38C23.732 38 30 36.2091 30 34V6" fill="#69736D" fillOpacity="0.15" stroke="#69736D" strokeWidth="2"/>
                <line x1="2" y1="16" x2="30" y2="16" stroke="#69736D" strokeWidth="2"/>
                <line x1="2" y1="26" x2="30" y2="26" stroke="#69736D" strokeWidth="2"/>
              </svg>
            </div>
            
            {/* Object 6: Leaf / Organic */}
            <div className="absolute top-0 left-0 animate-waste-6">
              <svg width="28" height="42" viewBox="0 0 28 42" fill="none">
                <path d="M14 2C14 2 2 12 2 24C2 30.6274 7.37258 36 14 36C20.6274 36 26 30.6274 26 24C26 12 14 2 14 2Z" fill="#3F6F5B" fillOpacity="0.4" stroke="#3F6F5B" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M14 36V42" stroke="#3F6F5B" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 12V36" stroke="#3F6F5B" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* ── BIN FRONT (Body and Front Rim) ── */}
          <div className="absolute left-[140px] top-[320px] opacity-90 z-30 pointer-events-none">
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
              {/* Opaque Body */}
              <path d="M10 20L25 150C25.5 155.5 30 160 36 160H84C90 160 94.5 155.5 95 150L110 20" fill="#F6F8F7" stroke="#3F6F5B" strokeWidth="3" strokeLinejoin="round"/>
              
              {/* Front Rim (covers the seam between body and inside rim) */}
              <path d="M10 20C10 25.5228 32.3858 30 60 30C87.6142 30 110 25.5228 110 20" fill="#F6F8F7" stroke="#3F6F5B" strokeWidth="3"/>
              
              {/* Vertical Details */}
              <line x1="30" y1="35" x2="40" y2="150" stroke="#3F6F5B" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
              <line x1="60" y1="35" x2="60" y2="150" stroke="#3F6F5B" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
              <line x1="90" y1="35" x2="80" y2="150" stroke="#3F6F5B" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
            </svg>
          </div>
          
        </div>
      </div>
    </div>
  );
}
