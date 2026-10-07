/**
 * NIRMAAN — Loading Component
 */

import { cn } from '@/lib/utils';

interface LoadingProps {
  /** Full-page centered spinner */
  fullPage?: boolean;
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Optional loading text */
  text?: string;
  className?: string;
}

const sizeStyles = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

export function Loading({
  fullPage = false,
  size = 'md',
  text,
  className,
}: LoadingProps) {
  const spinner = (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <svg
        className={cn('animate-spin text-nirmaan-green', sizeStyles[size])}
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Loading"
        role="status"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {text && (
        <p className="text-body-sm text-text-secondary">{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {spinner}
      </div>
    );
  }

  return spinner;
}
