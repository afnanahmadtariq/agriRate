// Modified ProgressiveDisclosure component to align with design tokens and
// spacing conventions. Border and background colours are referenced via CSS
// variables, and the header height adheres to the 8‑pt grid (56 px). The
// component now uses a medium corner radius for consistency with other UI
// elements.

"use client";

import { ReactNode, useState } from "react";

interface ProgressiveDisclosureProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
}

export default function ProgressiveDisclosure({
  title,
  children,
  defaultOpen = false,
  icon,
}: ProgressiveDisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  // Unique identifier for aria-controls; using title as a fallback may cause collisions,
  // so in a real project you might generate a unique id.
  const panelId = `${title.replace(/\s+/g, "-").toLowerCase()}-panel`;
  return (
    <div className="border border-(--color-border-subtle) rounded-lg overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-[--color-surface] hover:bg-[--color-hover-overlay] transition-colors duration-200 min-h-14"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-center gap-4">
          {icon && <div className="shrink-0">{icon}</div>}
          <span className="text-lg font-semibold text-[--color-text]">
            {title}
          </span>
        </div>
        <svg
          className={`w-6 h-6 text-[--color-text-muted] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={panelId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 pt-0 bg-[--color-surface-alt]">{children}</div>
      </div>
    </div>
  );
}