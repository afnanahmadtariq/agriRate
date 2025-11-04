"use client";

import { ReactNode, useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  width?: string;
  sortable?: boolean;
  sortValue?: (item: T) => string | number; // Custom value for sorting
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    if (sortColumn === column.key) {
      // Toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, start with asc
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;

    const column = columns.find((col) => col.key === sortColumn);
    if (!column) return 0;

    let aValue: any;
    let bValue: any;

    if (column.sortValue) {
      aValue = column.sortValue(a);
      bValue = column.sortValue(b);
    } else {
      aValue = a[column.key];
      bValue = b[column.key];
    }

    // Handle different types
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      return sortDirection === 'asc' ? comparison : -comparison;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Fallback to string comparison
    const aStr = String(aValue);
    const bStr = String(bValue);
    const comparison = aStr.localeCompare(bStr);
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    if (sortColumn === column.key) {
      return sortDirection === 'asc' ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      );
    }

    return <ChevronsUpDown className="w-4 h-4 opacity-30" />;
  };
  if (isLoading) {
    return (
      <div className="w-full bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
          <span className="ml-3 text-[var(--color-text-muted)]">Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-8">
        <p className="text-center text-[var(--color-text-muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-[var(--color-hover-overlay)] transition-colors' : ''
                }`}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center gap-2">
                  <span>{column.header}</span>
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={`
                border-b border-[var(--color-border-subtle)] last:border-0
                ${onRowClick ? 'cursor-pointer hover:bg-[var(--color-hover-overlay)] transition-colors' : ''}
              `}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 text-sm text-[var(--color-text-secondary)]"
                >
                  {column.render
                    ? column.render(item)
                    : item[column.key]?.toString() || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
