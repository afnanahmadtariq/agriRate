// Modified StatusBadge component. Sizes are updated to align with the 8‑pt
// spacing system: the medium badge now uses a vertical padding of 0.5rem (8px)
// instead of 0.375rem (6px). The status variants rely on the badge classes
// defined in the CSS.

import { ReactNode } from "react";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info";
  children: ReactNode;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, children, size = "md" }: StatusBadgeProps) {
  const variants = {
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
    info: "badge-info",
  } as const;
  // Adjust padding to the 8‑pt grid: md height uses py-2 (8px) instead of 1.5 (6px)
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2",
  } as const;
  return <span className={`badge ${variants[status]} ${sizes[size]}`}>{children}</span>;
}