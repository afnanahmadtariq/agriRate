"use client";

import { useState } from 'react';
import { TrendingUp, X } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import { useAuth } from '@/app/lib/context/AuthContext';
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

export default function PriceTrendsPage() {
  const { user } = useAuth();
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>(['Tomato']);
  const [timeRange, setTimeRange] = useState('7days');

  // 7-day price simulation data for multiple vegetables
  const priceDataByVegetable: Record<string, Array<{ date: string; price: number; avgPrice: number }>> = {
    Tomato: [
      { date: 'Nov 1', price: 85, avgPrice: 85 },
      { date: 'Nov 2', price: 88, avgPrice: 86.5 },
      { date: 'Nov 3', price: 82, avgPrice: 85 },
      { date: 'Nov 4', price: 90, avgPrice: 86.25 },
      { date: 'Nov 5', price: 92, avgPrice: 87.4 },
      { date: 'Nov 6', price: 95, avgPrice: 88.67 },
      { date: 'Nov 7', price: 98, avgPrice: 90 },
    ],
    Potato: [
      { date: 'Nov 1', price: 45, avgPrice: 45 },
      { date: 'Nov 2', price: 46, avgPrice: 45.5 },
      { date: 'Nov 3', price: 44, avgPrice: 45 },
      { date: 'Nov 4', price: 47, avgPrice: 45.5 },
      { date: 'Nov 5', price: 48, avgPrice: 46 },
      { date: 'Nov 6', price: 50, avgPrice: 46.67 },
      { date: 'Nov 7', price: 52, avgPrice: 47.43 },
    ],
    Onion: [
      { date: 'Nov 1', price: 35, avgPrice: 35 },
      { date: 'Nov 2', price: 36, avgPrice: 35.5 },
      { date: 'Nov 3', price: 34, avgPrice: 35 },
      { date: 'Nov 4', price: 37, avgPrice: 35.5 },
      { date: 'Nov 5', price: 38, avgPrice: 36 },
      { date: 'Nov 6', price: 40, avgPrice: 36.67 },
      { date: 'Nov 7', price: 42, avgPrice: 37.43 },
    ],
    Garlic: [
      { date: 'Nov 1', price: 120, avgPrice: 120 },
      { date: 'Nov 2', price: 125, avgPrice: 122.5 },
      { date: 'Nov 3', price: 118, avgPrice: 121 },
      { date: 'Nov 4', price: 130, avgPrice: 123.25 },
      { date: 'Nov 5', price: 135, avgPrice: 125.6 },
      { date: 'Nov 6', price: 140, avgPrice: 128 },
      { date: 'Nov 7', price: 145, avgPrice: 130.43 },
    ],
    Cabbage: [
      { date: 'Nov 1', price: 25, avgPrice: 25 },
      { date: 'Nov 2', price: 26, avgPrice: 25.5 },
      { date: 'Nov 3', price: 24, avgPrice: 25 },
      { date: 'Nov 4', price: 27, avgPrice: 25.5 },
      { date: 'Nov 5', price: 28, avgPrice: 26 },
      { date: 'Nov 6', price: 30, avgPrice: 26.67 },
      { date: 'Nov 7', price: 32, avgPrice: 27.43 },
    ],
    Carrot: [
      { date: 'Nov 1', price: 55, avgPrice: 55 },
      { date: 'Nov 2', price: 56, avgPrice: 55.5 },
      { date: 'Nov 3', price: 54, avgPrice: 55 },
      { date: 'Nov 4', price: 58, avgPrice: 55.75 },
      { date: 'Nov 5', price: 60, avgPrice: 56.6 },
      { date: 'Nov 6', price: 62, avgPrice: 57.5 },
      { date: 'Nov 7', price: 65, avgPrice: 58.57 },
    ],
    Cucumber: [
      { date: 'Nov 1', price: 40, avgPrice: 40 },
      { date: 'Nov 2', price: 41, avgPrice: 40.5 },
      { date: 'Nov 3', price: 39, avgPrice: 40 },
      { date: 'Nov 4', price: 42, avgPrice: 40.5 },
      { date: 'Nov 5', price: 43, avgPrice: 41 },
      { date: 'Nov 6', price: 45, avgPrice: 41.67 },
      { date: 'Nov 7', price: 47, avgPrice: 42.43 },
    ],
  };

  const vegetables = Object.keys(priceDataByVegetable);
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  // Merge data for comparison
  const getComparisonData = () => {
    if (selectedVegetables.length === 0) return [];

    // Get the data from the first selected vegetable as base
    const baseData = priceDataByVegetable[selectedVegetables[0]] || [];

    return baseData.map((item, index) => {
      const merged: Record<string, string | number> = { ...item };
      selectedVegetables.forEach((veg) => {
        if (priceDataByVegetable[veg] && priceDataByVegetable[veg][index]) {
          merged[veg] = priceDataByVegetable[veg][index].price;
        }
      });
      return merged;
    });
  };

  const handleAddVegetable = (veg: string) => {
    if (!selectedVegetables.includes(veg) && selectedVegetables.length < 4) {
      setSelectedVegetables([...selectedVegetables, veg]);
    }
  };

  const handleRemoveVegetable = (veg: string) => {
    setSelectedVegetables(selectedVegetables.filter(v => v !== veg));
  };

  const comparisonData = getComparisonData();

  // Calculate statistics
  const getStats = (veg: string) => {
    const data = priceDataByVegetable[veg] || [];
    if (data.length === 0) return { min: 0, max: 0, avg: 0, change: 0 };

    const prices = data.map((d: { date: string; price: number; avgPrice: number }) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round((prices.reduce((a: number, b: number) => a + b, 0) / prices.length) * 100) / 100;
    const change = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;

    return { min, max, avg, change: Math.round(change * 100) / 100 };
  };

  return (
    <ProtectedRoute allowedRoles={['farmer', 'admin']}>
      <DashboardLayout role={user?.role === 'admin' ? 'admin' : 'farmer'}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
              Price Trends Analysis
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Monitor vegetable prices over the last 7 days and compare trends
            </p>
          </div>

          {/* Time Range Filter */}
          <ModernCard>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--color-text)] mb-2">
                  Time Range
                </p>
                <div className="flex gap-2">
                  {['7days', '30days', '90days'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        timeRange === range
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-hover-overlay)]'
                      }`}
                    >
                      {range === '7days' ? 'Last 7 Days' : range === '30days' ? 'Last 30 Days' : 'Last 90 Days'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[var(--color-text)] mb-2">
                  Selected for Comparison
                </p>
                <div className="text-sm text-[var(--color-text-muted)]">
                  {selectedVegetables.length} / 4 vegetables
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Chart */}
          <ModernCard>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
                Price Comparison Chart
              </h2>
            </div>
            {selectedVegetables.length > 0 ? (
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis
                      dataKey="date"
                      stroke="var(--color-text-muted)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="var(--color-text-muted)"
                      style={{ fontSize: '12px' }}
                      label={{ value: 'Price (PKR)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        color: 'var(--color-text)',
                      }}
                      cursor={{ stroke: 'var(--color-primary)', strokeWidth: 2 }}
                    />
                    <Legend
                      wrapperStyle={{ color: 'var(--color-text)' }}
                      contentStyle={{
                        backgroundColor: 'transparent',
                      }}
                    />
                    {selectedVegetables.map((veg, idx) => (
                      <Line
                        key={veg}
                        type="monotone"
                        dataKey={veg}
                        stroke={colors[idx % colors.length]}
                        strokeWidth={2}
                        dot={{ fill: colors[idx % colors.length], r: 4 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={true}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center py-12 text-[var(--color-text-muted)]">
                <p>Select vegetables to display price trends</p>
              </div>
            )}
          </ModernCard>

          {/* Vegetable Selection */}
          <ModernCard>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
              Add Vegetables to Compare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {vegetables.map((veg) => (
                <button
                  key={veg}
                  onClick={() => handleAddVegetable(veg)}
                  disabled={selectedVegetables.includes(veg) || selectedVegetables.length >= 4}
                  className={`p-3 rounded-lg font-medium transition-all ${
                    selectedVegetables.includes(veg)
                      ? 'bg-[var(--color-primary)] text-white cursor-not-allowed opacity-50'
                      : selectedVegetables.length >= 4
                      ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] cursor-not-allowed opacity-50'
                      : 'bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white'
                  }`}
                >
                  {veg}
                </button>
              ))}
            </div>
          </ModernCard>

          {/* Selected Vegetables Stats */}
          {selectedVegetables.length > 0 && (
            <ModernCard>
              <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                Price Statistics (7-Day Period)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedVegetables.map((veg, idx) => {
                  const stats = getStats(veg);
                  const data = priceDataByVegetable[veg];
                  const isGaining = stats.change > 0;

                  return (
                    <div
                      key={veg}
                      className="p-4 rounded-lg border border-[var(--color-border)] relative"
                      style={{ borderLeftWidth: '4px', borderLeftColor: colors[idx % colors.length] }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text-muted)]">
                            {veg}
                          </p>
                          <p className="text-2xl font-bold text-[var(--color-text)] mt-1">
                            {data[data.length - 1].price} PKR
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveVegetable(veg)}
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-[var(--color-text-muted)]">Min</p>
                          <p className="font-semibold text-[var(--color-text)]">
                            {stats.min} PKR
                          </p>
                        </div>
                        <div>
                          <p className="text-[var(--color-text-muted)]">Max</p>
                          <p className="font-semibold text-[var(--color-text)]">
                            {stats.max} PKR
                          </p>
                        </div>
                        <div>
                          <p className="text-[var(--color-text-muted)]">Avg</p>
                          <p className="font-semibold text-[var(--color-text)]">
                            {stats.avg} PKR
                          </p>
                        </div>
                        <div>
                          <p className="text-[var(--color-text-muted)]">7-Day Change</p>
                          <p className={`font-semibold ${isGaining ? 'text-green-600' : 'text-red-600'}`}>
                            {isGaining ? '+' : ''}{stats.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ModernCard>
          )}

          {/* Empty State */}
          {selectedVegetables.length === 0 && (
            <ModernCard>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)]" />
                <p className="text-lg font-medium text-[var(--color-text)]">
                  No vegetables selected
                </p>
                <p className="text-[var(--color-text-muted)] mb-4">
                  Select up to 4 vegetables to see price trends
                </p>
              </div>
            </ModernCard>
          )}

          {/* Legend/Info */}
          <ModernCard>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">
              📊 How to Use
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>• Click on vegetables to add them to the comparison chart (max 4)</li>
              <li>• Hover over the chart to see exact prices for each date</li>
              <li>• Use time range buttons to view different periods</li>
              <li>• Each vegetable shows Min, Max, Average, and 7-Day change percentage</li>
              <li>• Click the X button on stat cards to remove a vegetable from comparison</li>
            </ul>
          </ModernCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
