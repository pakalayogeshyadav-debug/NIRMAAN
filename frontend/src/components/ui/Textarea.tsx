/**
 * NIRMAAN — Textarea Component
 */

import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, className, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-body-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full rounded-[var(--radius-sm)] border bg-surface-primary',
            'px-3.5 py-2.5 text-body-sm text-text-primary',
            'placeholder:text-text-tertiary',
            'transition-colors resize-y min-h-[100px]',
            'focus:outline-none focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-soft',
            error
              ? 'border-error focus:ring-error/20 focus:border-error'
              : 'border-border-default',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-caption text-text-tertiary">{helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
