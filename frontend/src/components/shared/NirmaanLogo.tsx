/**
 * NIRMAAN — Logo / Wordmark Component
 */

import { cn } from '@/lib/utils';

interface NirmaanLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Show only the geometric mark without the wordmark */
  markOnly?: boolean;
}

const sizeConfig = {
  sm: { mark: 28, text: 'text-body font-semibold', gap: 'gap-2' },
  md: { mark: 36, text: 'text-h3 font-semibold', gap: 'gap-2.5' },
  lg: { mark: 48, text: 'text-h2 font-bold', gap: 'gap-3' },
};

/**
 * NIRMAAN brand mark — a geometric mark derived from the jaali pattern DNA.
 * The mark is an octagonal/diamond form with inner lattice structure.
 */
export function NirmaanLogo({ size = 'md', className, markOnly = false }: NirmaanLogoProps) {
  const config = sizeConfig[size];
  const s = config.mark;

  return (
    <div className={cn('inline-flex items-center', config.gap, className)}>
      <svg
        width={s}
        height={s}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer octagonal frame */}
        <path
          d="M24,4 L38,12 L44,24 L38,36 L24,44 L10,36 L4,24 L10,12 Z"
          stroke="var(--color-nirmaan-green)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner diamond */}
        <path
          d="M24,12 L34,24 L24,36 L14,24 Z"
          stroke="var(--color-nirmaan-green)"
          strokeWidth="1.2"
          fill="var(--color-nirmaan-green-light)"
        />
        {/* Cross lines — jaali lattice */}
        <line
          x1="24" y1="12" x2="24" y2="36"
          stroke="var(--color-nirmaan-green)"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="14" y1="24" x2="34" y2="24"
          stroke="var(--color-nirmaan-green)"
          strokeWidth="0.8"
          opacity="0.5"
        />
        {/* Center node */}
        <circle
          cx="24" cy="24" r="2.5"
          fill="var(--color-nirmaan-green)"
        />
        {/* Accent petals */}
        <circle cx="24" cy="12" r="1.5" fill="var(--color-accent-terracotta)" opacity="0.6" />
        <circle cx="34" cy="24" r="1.5" fill="var(--color-accent-saffron)" opacity="0.5" />
        <circle cx="24" cy="36" r="1.5" fill="var(--color-accent-gold)" opacity="0.5" />
        <circle cx="14" cy="24" r="1.5" fill="var(--color-accent-terracotta)" opacity="0.4" />
      </svg>
      {!markOnly && (
        <span className={cn(config.text, 'tracking-wide text-text-primary')}>
          NIRMAAN
        </span>
      )}
    </div>
  );
}
