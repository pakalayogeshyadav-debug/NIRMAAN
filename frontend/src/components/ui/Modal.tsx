/**
 * NIRMAAN — Modal (Dialog) Component
 */

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  /** Maximum width class */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleClose() {
      onClose();
    }

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'w-full rounded-[var(--radius-lg)] border border-border-default',
        'bg-surface-primary shadow-md p-0',
        'backdrop:bg-text-primary/40 backdrop:backdrop-blur-[2px]',
        sizeStyles[size],
        className,
      )}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="p-6">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-[var(--radius-sm)] text-text-tertiary hover:text-text-primary hover:bg-surface-soft transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {children}
      </div>
    </dialog>
  );
}
