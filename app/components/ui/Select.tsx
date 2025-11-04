"use client";

import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}: SelectProps) {
  const hasError = Boolean(error);
  const selectId = props.id || undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-[var(--color-text)] mb-2"
        >
          {label}
          {props.required && (
            <span className="text-[var(--color-error)] ml-1">*</span>
          )}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full px-4 py-3
          text-base font-medium
          bg-[var(--color-surface)]
          text-[var(--color-text)]
          border-2 rounded-lg
          transition-all duration-200
          min-h-[48px]
          ${
            hasError
              ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-4 focus:ring-[var(--color-error)]/20'
              : 'border-[var(--color-border)] hover:border-[var(--color-primary-light)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/20'
          }
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-alt)]
          ${className}
        `}
        aria-invalid={hasError}
        aria-describedby={
          error
            ? `${selectId}-error`
            : helperText
            ? `${selectId}-helper`
            : undefined
        }
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-2 text-sm font-medium text-[var(--color-error)] flex items-start gap-1"
        >
          <svg
            className="w-4 h-4 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${selectId}-helper`}
          className="mt-2 text-sm text-[var(--color-text-muted)]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
