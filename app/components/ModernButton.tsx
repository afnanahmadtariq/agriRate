// Modified version of the ModernButton component.
//
// This component adopts spatial and accessibility best practices from
// design‑system research. A consistent 8‑pt grid is used for sizing and
// spacing【419364714267935†L75-L85】, and button heights align to 40/48/56 px.
// Additional ARIA attributes improve screen‑reader support when loading or
// disabled. Border radii use a medium (8 px) token to match the design system.

"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
}

export default function ModernButton({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  className = "",
  disabled,
  ...props
}: ModernButtonProps) {
  // Base styles include consistent radius and ring tokens. Use rounded-lg for
  // an 8 px corner radius and apply focus rings via CSS variables.
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none relative overflow-hidden group";

  // Variant definitions map to the colour palette defined in CSS variables.
  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white shadow-md hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:-translate-y-0.5 active:bg-[var(--color-primary-strong)] active:translate-y-0 focus-visible:ring-[var(--color-focus-ring)]",
    secondary:
      "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary-hover)] hover:text-[var(--color-primary-hover)] active:bg-[rgba(1,65,28,0.12)] focus-visible:ring-[var(--color-focus-ring)]",
    ghost:
      "text-[var(--color-text)] hover:bg-[var(--color-hover-overlay)] active:bg-[rgba(1,65,28,0.08)] focus-visible:ring-[var(--color-focus-ring)]",
    destructive:
      "bg-[var(--color-error)] text-white shadow-md hover:bg-[#991b1b] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[var(--color-error)]/40",
  } as const;

  // Size definitions align with the 8‑pt spacing system: 40, 48, 56 px heights.
  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]",
  } as const;

  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {/* Ripple effect overlay */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-200" />
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}