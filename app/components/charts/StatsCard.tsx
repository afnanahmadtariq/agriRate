"use client";

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ModernCard from '@/app/components/ModernCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  variant = 'default',
}: StatsCardProps) {
  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0)
      return <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />;
    if (change < 0)
      return <TrendingDown className="w-4 h-4 text-[var(--color-error)]" />;
    return <Minus className="w-4 h-4 text-[var(--color-text-muted)]" />;
  };

  const getTrendColor = () => {
    if (change === undefined) return 'text-[var(--color-text-muted)]';
    if (change > 0) return 'text-[var(--color-success)]';
    if (change < 0) return 'text-[var(--color-error)]';
    return 'text-[var(--color-text-muted)]';
  };

  const variantStyles = {
    default: '',
    success: 'border-l-4 border-l-[var(--color-success)]',
    warning: 'border-l-4 border-l-[var(--color-warning)]',
    error: 'border-l-4 border-l-[var(--color-error)]',
    info: 'border-l-4 border-l-[var(--color-info)]',
  };

  return (
    <ModernCard
      variant="elevated"
      hoverable={false}
      className={variantStyles[variant]}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-[var(--color-text)] mb-2">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`text-sm font-semibold ${getTrendColor()}`}>
                {Math.abs(change).toFixed(1)}%
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                vs last period
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-[var(--color-primary-subtle)]">
            {icon}
          </div>
        )}
      </div>
    </ModernCard>
  );
}
