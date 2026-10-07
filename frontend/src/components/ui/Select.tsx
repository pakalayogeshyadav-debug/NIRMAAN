/**
 * NIRMAAN — Select Component
 */

import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InputSize } from '@/types';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  selectSize?: InputSize;
  options: SelectOption[];
  placeholder?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-body-sm',
  md: 'h-10 px-3.5 text-body-sm',
  lg: 'h-12 px-4 text-body',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      selectSize = 'md',
      options,
      placeholder,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-body-sm font-medium text-text-primary"
          >
            {label}
            {props.required && <span className="text-nirmaan-green ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full rounded-[var(--radius-sm)] border bg-surface-primary',
              'text-text-primary appearance-none pr-10',
              'transition-colors cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-nirmaan-green/20 focus:border-nirmaan-green',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-soft',
              error
                ? 'border-error focus:ring-error/20 focus:border-error'
                : 'border-border-default',
              sizeStyles[selectSize],
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p className="text-caption text-error" role="alert">
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

Select.displayName = 'Select';
