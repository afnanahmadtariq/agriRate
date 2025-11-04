"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Cloud, Lightbulb, DollarSign } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import StatsCard from '@/app/components/charts/StatsCard';
import PriceTrendChart from '@/app/components/charts/PriceTrendChart';
import ModernCard from '@/app/components/ModernCard';
import Badge from '@/app/components/ui/Badge';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { formatCurrency } from '@/app/lib/utils/format';

export default function FarmerDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock data - replace with real API calls
  const stats = {
    avgPrice: 2850,
    priceChange: 5.2,
    weatherTemp: 28,
    adviceCount: 3,
  };

  const mockPriceData = [
    { date: '2025-10-29', avg_price: 2700, min_price: 2600, max_price: 2800 },
    { date: '2025-10-30', avg_price: 2750, min_price: 2650, max_price: 2850 },
    { date: '2025-10-31', avg_price: 2800, min_price: 2700, max_price: 2900 },
    { date: '2025-11-01', avg_price: 2820, min_price: 2720, max_price: 2920 },
    { date: '2025-11-02', avg_price: 2840, min_price: 2740, max_price: 2940 },
    { date: '2025-11-03', avg_price: 2850, min_price: 2750, max_price: 2950 },
    { date: '2025-11-04', avg_price: 2850, min_price: 2750, max_price: 2950 },
  ];

  const mockAdvice = [
    {
      id: 1,
      text: 'Rain expected tomorrow - avoid watering your fields today',
      type: 'weather',
      confidence: 0.92,
    },
    {
      id: 2,
      text: 'Wheat prices increasing - consider selling within next 2 days',
      type: 'market',
      confidence: 0.87,
    },
    {
      id: 3,
      text: 'Temperature rising - increase irrigation frequency for cotton',
      type: 'weather',
      confidence: 0.79,
    },
  ];

  const mockTopCrops = [
    { crop: 'Wheat', price: 2850, change: 5.2 },
    { crop: 'Rice', price: 3200, change: -2.1 },
    { crop: 'Cotton', price: 8500, change: 3.8 },
    { crop: 'Sugarcane', price: 310, change: 0.5 },
  ];

  return (
    <ProtectedRoute allowedRoles={['farmer']}>
      <DashboardLayout role="farmer">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading dashboard..." />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Header */}
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
                Welcome back, Farmer!
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                Here's what's happening with your farm today
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Avg Crop Price"
                value={formatCurrency(stats.avgPrice)}
                change={stats.priceChange}
                icon={<DollarSign className="w-6 h-6 text-[var(--color-primary)]" />}
                variant="success"
              />
              <StatsCard
                title="Price Trend"
                value={`+${stats.priceChange}%`}
                icon={<TrendingUp className="w-6 h-6 text-[var(--color-success)]" />}
                variant="info"
              />
              <StatsCard
                title="Temperature"
                value={`${stats.weatherTemp}°C`}
                icon={<Cloud className="w-6 h-6 text-[var(--color-info)]" />}
              />
              <StatsCard
                title="AI Insights"
                value={stats.adviceCount}
                icon={<Lightbulb className="w-6 h-6 text-[var(--color-warning)]" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Price Trend Chart */}
              <ModernCard className="lg:col-span-2">
                <PriceTrendChart
                  data={mockPriceData}
                  title="7-Day Wheat Price Trend"
                  height={300}
                />
              </ModernCard>

              {/* Top Crops */}
              <ModernCard>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                  Today's Top Crops
                </h3>
                <div className="space-y-3">
                  {mockTopCrops.map((item) => (
                    <div
                      key={item.crop}
                      className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-alt)]"
                    >
                      <div>
                        <p className="font-semibold text-[var(--color-text)]">
                          {item.crop}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <Badge
                        variant={item.change >= 0 ? 'success' : 'error'}
                        size="sm"
                      >
                        {item.change >= 0 ? '+' : ''}
                        {item.change}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* AI Smart Advice */}
            <ModernCard>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-[var(--color-warning)]" />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  Smart Advice for You
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockAdvice.map((advice) => (
                  <div
                    key={advice.id}
                    className="p-4 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={advice.type === 'weather' ? 'info' : 'warning'}
                        size="sm"
                      >
                        {advice.type}
                      </Badge>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {Math.round(advice.confidence * 100)}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {advice.text}
                    </p>
                  </div>
                ))}
              </div>
            </ModernCard>

            {/* Quick Actions */}
            <ModernCard>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-hover-overlay)] transition-all text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[var(--color-primary)]" />
                  <p className="text-sm font-medium">View Rates</p>
                </button>
                <button className="p-4 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-hover-overlay)] transition-all text-center">
                  <Cloud className="w-6 h-6 mx-auto mb-2 text-[var(--color-info)]" />
                  <p className="text-sm font-medium">Weather</p>
                </button>
                <button className="p-4 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-hover-overlay)] transition-all text-center">
                  <Lightbulb className="w-6 h-6 mx-auto mb-2 text-[var(--color-warning)]" />
                  <p className="text-sm font-medium">Get Advice</p>
                </button>
                <button className="p-4 rounded-lg border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-hover-overlay)] transition-all text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[var(--color-success)]" />
                  <p className="text-sm font-medium">Forum</p>
                </button>
              </div>
            </ModernCard>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
