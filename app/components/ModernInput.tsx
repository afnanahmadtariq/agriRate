// Modified ModernInput component to align with design-system variables and
// accessible spacing. Colours reference CSS variables using Tailwind's
// arbitrary value syntax. Spacing follows an 8‑pt grid, and rounded corners
// use the medium radius (rounded‑lg = 12 px). Focus rings reference
// design-system tokens instead of hard-coded colours.

"use client";

import { InputHTMLAttributes } from "react";

interface ModernInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function ModernInput({
  label,
  helperText,
  error,
  icon,
  className = "",
  ...props
}: ModernInputProps) {
  const hasError = Boolean(error);
  const inputId = props.id || undefined;
  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-(--color-text) mb-2"
      >
        {label}
        {props.required && (
          <span className="text-(--color-error) ml-1">*</span>
        )}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-subtle)">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full px-4 py-3 ${icon ? "pl-12" : ""}
            text-base font-medium
            bg-[--color-surface]
            text-(--color-text)
            border-2 rounded-lg
            transition-all duration-200
            placeholder:text-[--color-text-subtle]
            min-h-12
            ${hasError
              ? `border-[--color-error] focus:border-[--color-error] focus:ring-4 focus:ring-[--color-error]`
              : `border-[--color-border] hover:border-[--color-primary-light] focus:border-[--color-primary] focus:ring-4 focus:ring-[--color-primary]`}
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[--color-surface-alt]
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {hasError && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-[--color-error]"
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
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-sm font-medium text-[--color-error] flex items-start gap-1"
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
          id={`${inputId}-helper`}
          className="mt-2 text-sm text-[--color-text-muted]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}