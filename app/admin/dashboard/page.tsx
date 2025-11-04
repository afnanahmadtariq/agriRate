"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Users, FileText, MessageSquare } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import StatsCard from '@/app/components/charts/StatsCard';
import PriceTrendChart from '@/app/components/charts/PriceTrendChart';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import Table from '@/app/components/ui/Table';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { formatCurrency, formatDateTime } from '@/app/lib/utils/format';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock data - replace with real API calls
  const stats = {
    totalUsers: 1247,
    totalPosts: 432,
    totalRates: 156,
    activeUsers: 89,
  };

  const mockPriceData = [
    { date: '2025-10-29', avg_price: 2700 },
    { date: '2025-10-30', avg_price: 2750 },
    { date: '2025-10-31', avg_price: 2800 },
    { date: '2025-11-01', avg_price: 2820 },
    { date: '2025-11-02', avg_price: 2840 },
    { date: '2025-11-03', avg_price: 2850 },
    { date: '2025-11-04', avg_price: 2850 },
  ];

  const recentRates = [
    {
      crop_name: 'Wheat',
      region: 'Multan',
      avg_price: 2850,
      date: '2025-11-04',
    },
    { crop_name: 'Rice', region: 'Lahore', avg_price: 3200, date: '2025-11-04' },
    {
      crop_name: 'Cotton',
      region: 'Faisalabad',
      avg_price: 8500,
      date: '2025-11-04',
    },
    {
      crop_name: 'Sugarcane',
      region: 'Multan',
      avg_price: 310,
      date: '2025-11-03',
    },
  ];

  const rateColumns = [
    { key: 'crop_name', header: 'Crop' },
    { key: 'region', header: 'Region' },
    {
      key: 'avg_price',
      header: 'Price',
      render: (item: any) => formatCurrency(item.avg_price),
    },
    {
      key: 'date',
      header: 'Date',
      render: (item: any) => formatDateTime(item.date, 'MMM dd, yyyy'),
    },
  ];

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout role="admin">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading dashboard..." />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                  Manage your AgriRate platform
                </p>
              </div>
              <ModernButton variant="primary" size="md">
                Add Market Rate
              </ModernButton>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value={stats.totalUsers.toLocaleString()}
                change={12.5}
                icon={<Users className="w-6 h-6 text-[var(--color-primary)]" />}
                variant="info"
              />
              <StatsCard
                title="Total Posts"
                value={stats.totalPosts.toLocaleString()}
                change={8.3}
                icon={
                  <MessageSquare className="w-6 h-6 text-[var(--color-success)]" />
                }
                variant="success"
              />
              <StatsCard
                title="Market Rates"
                value={stats.totalRates.toLocaleString()}
                change={5.2}
                icon={<TrendingUp className="w-6 h-6 text-[var(--color-warning)]" />}
                variant="warning"
              />
              <StatsCard
                title="Active Now"
                value={stats.activeUsers.toLocaleString()}
                icon={<Users className="w-6 h-6 text-[var(--color-info)]" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Trend Chart */}
              <ModernCard>
                <PriceTrendChart
                  data={mockPriceData}
                  title="Average Market Price Trend"
                  height={300}
                />
              </ModernCard>

              {/* Quick Stats */}
              <ModernCard>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                  Platform Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-alt)]">
                    <span className="text-sm font-medium text-[var(--color-text)]">
                      Farmers
                    </span>
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      1,089
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-alt)]">
                    <span className="text-sm font-medium text-[var(--color-text)]">
                      Experts
                    </span>
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      47
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-alt)]">
                    <span className="text-sm font-medium text-[var(--color-text)]">
                      Forum Posts
                    </span>
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      432
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-alt)]">
                    <span className="text-sm font-medium text-[var(--color-text)]">
                      Articles
                    </span>
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      78
                    </span>
                  </div>
                </div>
              </ModernCard>
            </div>

            {/* Recent Market Rates */}
            <ModernCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  Recent Market Rates
                </h3>
                <ModernButton variant="secondary" size="sm">
                  View All
                </ModernButton>
              </div>
              <Table data={recentRates} columns={rateColumns} />
            </ModernCard>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
