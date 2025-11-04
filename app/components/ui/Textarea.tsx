"use client";

import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Textarea({
  label,
  error,
  helperText,
  className = '',
  ...props
}: TextareaProps) {
  const hasError = Boolean(error);
  const textareaId = props.id || undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-[var(--color-text)] mb-2"
        >
          {label}
          {props.required && (
            <span className="text-[var(--color-error)] ml-1">*</span>
          )}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-3
          text-base font-medium
          bg-[var(--color-surface)]
          text-[var(--color-text)]
          border-2 rounded-lg
          transition-all duration-200
          placeholder:text-[var(--color-text-subtle)]
          min-h-[120px]
          resize-y
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
            ? `${textareaId}-error`
            : helperText
            ? `${textareaId}-helper`
            : undefined
        }
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
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
          id={`${textareaId}-helper`}
          className="mt-2 text-sm text-[var(--color-text-muted)]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
