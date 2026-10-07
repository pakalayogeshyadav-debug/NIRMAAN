/**
 * NIRMAAN — Divider Component
 */

import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  /** Vertical divider */
  vertical?: boolean;
}

export function Divider({ className, vertical = false }: DividerProps) {
  if (vertical) {
    return (
      <div
        className={cn('w-px self-stretch bg-border-default', className)}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <div
      className={cn('h-px w-full bg-border-default', className)}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}
