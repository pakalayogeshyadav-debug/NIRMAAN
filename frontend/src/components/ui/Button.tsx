/**
 * NIRMAAN — Button Component
 */

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { ButtonVariant, ButtonSize } from '@/types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#3F6F5B] text-[#FFFFFF] hover:bg-[#315845] hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 active:bg-[#315845]',
  secondary:
    'bg-[#FFFFFF] text-[#25332D] border border-[#E7E2D9] hover:bg-[#F8F7F3] hover:border-[#D1CABC] active:bg-gray-100',
  outline:
    'bg-transparent text-nirmaan-green border border-nirmaan-green hover:bg-nirmaan-green-light active:bg-nirmaan-green/10',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface-soft hover:text-text-primary active:bg-border-default',
  danger:
    'bg-error text-white hover:text-white hover:bg-error/90 active:bg-error/80',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-[16px] py-[8px] text-[13px] gap-[6px] rounded-[10px]',
  md: 'min-h-[44px] px-[20px] py-[10px] text-[15px] gap-[8px] rounded-[10px]',
  lg: 'min-h-[48px] px-[22px] py-[12px] text-[16px] gap-[10px] rounded-[10px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nirmaan-green',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'cursor-pointer select-none whitespace-nowrap box-border',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="shrink-0">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
