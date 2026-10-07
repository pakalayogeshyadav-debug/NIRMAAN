/**
 * NIRMAAN — Avatar Component
 */

import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'w-8 h-8 text-caption',
  md: 'w-10 h-10 text-body-sm',
  lg: 'w-12 h-12 text-body',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover border border-border-default',
          sizeStyles[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center',
        'bg-nirmaan-green-light text-nirmaan-green-deep font-medium',
        'border border-nirmaan-green/10',
        sizeStyles[size],
        className,
      )}
      role="img"
      aria-label={alt}
    >
      {getInitials(name)}
    </div>
  );
}
