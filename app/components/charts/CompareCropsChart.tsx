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

interface CompareChartData {
  date: string;
  [key: string]: string | number; // Dynamic crop names
}

interface CompareCropsChartProps {
  data: CompareChartData[];
  crops: string[];
  title?: string;
  height?: number;
}

const CHART_COLORS = [
  'var(--color-primary)',
  'var(--color-info)',
  'var(--color-warning)',
  'var(--color-success)',
  '#8b5cf6',
  '#ec4899',
];

export default function CompareCropsChart({
  data,
  crops,
  title = 'Compare Crop Prices',
  height = 300,
}: CompareCropsChartProps) {
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
          {crops.map((crop, index) => (
            <Line
              key={crop}
              type="monotone"
              dataKey={crop}
              name={crop}
              stroke={CHART_COLORS[index % CHART_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
