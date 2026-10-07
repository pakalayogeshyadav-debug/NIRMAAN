/**
 * NIRMAAN — Badge Component
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { BadgeVariant } from '@/types';

interface BadgeProps {
  variant?: BadgeVariant;
  children?: ReactNode;
  className?: string;
  /** Render as a small dot indicator instead of text */
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-soft text-text-secondary border-border-default',
  success: 'bg-nirmaan-green-light text-nirmaan-green-deep border-nirmaan-green/20',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  error: 'bg-red-50 text-error border-red-200',
  info: 'bg-sky-50 text-info border-sky-200',
  accent: 'bg-accent-saffron-light text-amber-900 border-accent-saffron',
};

export function Badge({
  variant = 'default',
  children,
  className,
  dot = false,
}: BadgeProps) {
  if (dot) {
    return (
      <span
        className={cn(
          'inline-block w-2 h-2 rounded-full',
          variant === 'success' && 'bg-nirmaan-green',
          variant === 'warning' && 'bg-warning',
          variant === 'error' && 'bg-error',
          variant === 'info' && 'bg-info',
          variant === 'default' && 'bg-text-tertiary',
          variant === 'accent' && 'bg-accent-terracotta',
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5',
        'text-caption font-medium',
        'rounded-full border',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
