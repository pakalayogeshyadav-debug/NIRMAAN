/**
 * NIRMAAN — Input Component
 */

import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { InputSize } from '@/types';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-body-sm',
  md: 'h-10 px-3.5 text-body-sm',
  lg: 'h-12 px-4 text-body',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      inputSize = 'md',
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText && !error ? `${inputId}-helper` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-sm font-medium text-text-primary"
          >
            {label}
            {props.required && <span className="text-nirmaan-green ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-[var(--radius-sm)] border bg-surface-primary',
              'text-text-primary placeholder:text-text-tertiary',
              'transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-soft',
              error
                ? 'border-error focus:ring-error/20 focus:border-error'
                : 'border-border-default',
              sizeStyles[inputSize],
              leftIcon ? 'pl-10' : undefined,
              rightIcon ? 'pr-10' : undefined,
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={errorId || helperId}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-caption text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
