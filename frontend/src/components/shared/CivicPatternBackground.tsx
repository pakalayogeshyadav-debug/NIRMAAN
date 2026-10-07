import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { NirmaanPattern } from '@/components/shared/NirmaanPattern';

interface CivicPatternBackgroundProps {
  variant?: 'auth' | 'register' | 'organization' | 'legal';
  className?: string;
  children?: ReactNode;
}

export function CivicPatternBackground({ 
  variant = 'auth', 
  className,
  children 
}: CivicPatternBackgroundProps) {
  // Use the new NirmaanPattern variants directly.
  return (
    <div className={cn("min-h-screen bg-bg-primary flex flex-col relative", className)}>
      {/* 
        We use the 'auth' variant from NirmaanPattern which provides fragments 
        suited for forms (top right, bottom right, top left, middle left).
        For 'legal' pages we use the 'subtle' variant so it doesn't distract.
      */}
      <NirmaanPattern variant={variant === 'legal' ? 'subtle' : 'auth'} className="fixed inset-0 z-0" />
      
      {/* CONTENT LAYER */}
      <div className="relative z-10 flex-1 flex flex-col w-full h-full">
        {children}
      </div>
    </div>
  );
}
