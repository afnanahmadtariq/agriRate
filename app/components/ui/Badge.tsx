"use client";

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variants = {
    success:
      'bg-[var(--color-success-light)] text-[var(--color-success)] border-[var(--color-success)]',
    warning:
      'bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning)]',
    error:
      'bg-[var(--color-error-light)] text-[var(--color-error)] border-[var(--color-error)]',
    info: 'bg-[var(--color-info-light)] text-[var(--color-info)] border-[var(--color-info)]',
    neutral:
      'bg-[var(--color-surface-muted)] text-[var(--color-text)] border-[var(--color-border)]',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-md border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
