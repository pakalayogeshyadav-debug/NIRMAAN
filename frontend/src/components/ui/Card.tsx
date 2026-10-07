/**
 * NIRMAAN — Card Component
 */

import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Whether the card has hover interaction */
  interactive?: boolean;
  /** Remove default padding */
  noPadding?: boolean;
}

export function Card({
  children,
  interactive = false,
  noPadding = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-primary border border-border-default',
        'rounded-[var(--radius-md)] shadow-xs',
        !noPadding && 'p-5',
        interactive && 'transition-shadow hover:shadow-sm cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Card Header — optional structured header area */
export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-4', className)}>
      {children}
    </div>
  );
}

/** Card Content — main body area */
export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('text-body-sm text-text-secondary', className)}>
      {children}
    </div>
  );
}

/** Card Footer — bottom action area */
export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t border-border-default', className)}>
      {children}
    </div>
  );
}
