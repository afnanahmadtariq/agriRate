// Modified ModernCard component adopting an 8‑pt spacing system and design tokens.
//
// Cards use a medium corner radius (rounded‑xl = 12 px) to align with
// our design system and consistent spacing values. Hover elevation and
// translation have been tuned to a subtle 2 px shift, matching the interactive
// guidance used across components. See design systems research for the
// benefits of consistent spatial rhythm【419364714267935†L39-L69】.

import { ReactNode } from "react";

interface ModernCardProps {
  children: ReactNode;
  variant?: "elevated" | "outlined" | "glass";
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg";
  className?: string;
}

export default function ModernCard({
  children,
  variant = "elevated",
  hoverable = false,
  padding = "md",
  className = "",
}: ModernCardProps) {
  const baseStyles =
    "rounded-xl transition-all duration-300 ease-out";
  const variants = {
    elevated:
      "bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]",
    outlined: "bg-[var(--color-surface)] border-2 border-[var(--color-border)]",
    glass: "glass",
  } as const;
  // Hover interactions: subtle lift and stronger shadow when hoverable
  const hoverStyles = hoverable
    ? "hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-border)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
    : "";
  // Padding values correspond to 16/24/32 px (2×/3×/4× 8‑pt) per design system
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  } as const;
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${paddings[padding]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}