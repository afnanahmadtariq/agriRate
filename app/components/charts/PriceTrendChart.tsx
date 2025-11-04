"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/app/lib/utils/format';

interface PriceTrendData {
  date: string;
  avg_price: number;
  min_price?: number;
  max_price?: number;
}

interface PriceTrendChartProps {
  data: PriceTrendData[];
  title?: string;
  height?: number;
}

export default function PriceTrendChart({
  data,
  title = 'Price Trend',
  height = 300,
}: PriceTrendChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₨${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="avg_price"
            name="Average Price"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={{ fill: 'var(--color-primary)', r: 4 }}
            activeDot={{ r: 6 }}
          />
          {data[0]?.min_price !== undefined && (
            <Line
              type="monotone"
              dataKey="min_price"
              name="Min Price"
              stroke="var(--color-info)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          {data[0]?.max_price !== undefined && (
            <Line
              type="monotone"
              dataKey="max_price"
              name="Max Price"
              stroke="var(--color-warning)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
