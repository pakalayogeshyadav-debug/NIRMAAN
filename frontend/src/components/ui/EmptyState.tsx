/**
 * NIRMAAN — EmptyState Component
 *
 * Used when a list, feed, or section has no data.
 * Incorporates the NIRMAAN geometric pattern for visual consistency.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'py-16 px-6',
        className,
      )}
    >
      {/* Geometric empty-state motif */}
      <div className="relative mb-6">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M40,8 L56,24 L56,56 L40,72 L24,56 L24,24 Z"
            stroke="var(--color-accent-saffron)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M40,16 L50,26 L50,54 L40,64 L30,54 L30,26 Z"
            stroke="var(--color-accent-terracotta)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.2"
          />
          <circle cx="40" cy="40" r="4" fill="var(--color-accent-gold)" opacity="0.2" />
        </svg>
        {icon && (
          <div className="absolute inset-0 flex items-center justify-center text-text-tertiary">
            {icon}
          </div>
        )}
      </div>
      <h3 className="text-h3 text-text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-body-sm text-text-secondary max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
