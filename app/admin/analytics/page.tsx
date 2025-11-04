"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Users, MessageSquare, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import StatsCard from '@/app/components/charts/StatsCard';
import PriceTrendChart from '@/app/components/charts/PriceTrendChart';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock data
  const userGrowthData = [
    { date: '2025-10-01', value: 800 },
    { date: '2025-10-08', value: 920 },
    { date: '2025-10-15', value: 1050 },
    { date: '2025-10-22', value: 1120 },
    { date: '2025-10-29', value: 1180 },
    { date: '2025-11-04', value: 1247 },
  ];

  const engagementData = [
    { date: '2025-10-29', value: 345 },
    { date: '2025-10-30', value: 412 },
    { date: '2025-10-31', value: 378 },
    { date: '2025-11-01', value: 456 },
    { date: '2025-11-02', value: 389 },
    { date: '2025-11-03', value: 423 },
    { date: '2025-11-04', value: 467 },
  ];

  const topCrops = [
    { name: 'Wheat', searches: 1234, change: 12.5 },
    { name: 'Rice', searches: 987, change: 8.3 },
    { name: 'Cotton', searches: 856, change: -3.2 },
    { name: 'Sugarcane', searches: 743, change: 15.7 },
    { name: 'Maize', searches: 621, change: 5.4 },
  ];

  const topRegions = [
    { name: 'Punjab', users: 645, percentage: 51.7 },
    { name: 'Sindh', users: 312, percentage: 25.0 },
    { name: 'KPK', users: 187, percentage: 15.0 },
    { name: 'Balochistan', users: 103, percentage: 8.3 },
  ];

  const stats = {
    totalUsers: 1247,
    activeUsers: 89,
    totalPosts: 432,
    marketRates: 156,
    userGrowth: 12.5,
    engagement: 8.3,
    postsGrowth: 15.2,
    ratesGrowth: 5.4,
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout role="admin">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading analytics..." />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                Platform Analytics
              </h1>
              <p className="text-(--color-text-secondary)">
                Track key metrics and platform performance
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value={stats.totalUsers.toLocaleString()}
                change={stats.userGrowth}
                icon={<Users className="w-6 h-6 text-(--color-primary)" />}
                variant="info"
              />
              <StatsCard
                title="Active Now"
                value={stats.activeUsers.toLocaleString()}
                change={stats.engagement}
                icon={<Eye className="w-6 h-6 text-(--color-success)" />}
                variant="success"
              />
              <StatsCard
                title="Forum Posts"
                value={stats.totalPosts.toLocaleString()}
                change={stats.postsGrowth}
                icon={<MessageSquare className="w-6 h-6 text-(--color-warning)" />}
                variant="warning"
              />
              <StatsCard
                title="Market Rates"
                value={stats.marketRates.toLocaleString()}
                change={stats.ratesGrowth}
                icon={<TrendingUp className="w-6 h-6 text-(--color-info)" />}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth */}
              <ModernCard>
                <PriceTrendChart
                  data={userGrowthData.map(d => ({ date: d.date, avg_price: d.value }))}
                  title="User Growth (Last 30 Days)"
                  height={300}
                />
              </ModernCard>

              {/* Daily Engagement */}
              <ModernCard>
                <PriceTrendChart
                  data={engagementData.map(d => ({ date: d.date, avg_price: d.value }))}
                  title="Daily Active Users (Last 7 Days)"
                  height={300}
                />
              </ModernCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Crops */}
              <ModernCard>
                <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                  Most Searched Crops
                </h3>
                <div className="space-y-4">
                  {topCrops.map((crop, index) => (
                    <div key={crop.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-(--color-primary-light) flex items-center justify-center">
                          <span className="text-sm font-bold text-(--color-primary)">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-(--color-text)">{crop.name}</p>
                          <p className="text-sm text-(--color-text-secondary)">
                            {crop.searches.toLocaleString()} searches
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          crop.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {crop.change >= 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span>{Math.abs(crop.change)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>

              {/* Regional Distribution */}
              <ModernCard>
                <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                  Users by Region
                </h3>
                <div className="space-y-4">
                  {topRegions.map((region, index) => (
                    <div key={region.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📍'}
                          </span>
                          <span className="font-medium text-(--color-text)">{region.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-(--color-text)">
                            {region.users} users
                          </p>
                          <p className="text-xs text-(--color-text-secondary)">
                            {region.percentage}%
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-(--color-surface-alt) rounded-full h-2">
                        <div
                          className="bg-(--color-primary) h-2 rounded-full transition-all duration-500"
                          style={{ width: `${region.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModernCard>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-(--color-text-secondary)">
                    Avg. Session Duration
                  </h4>
                  <TrendingUp className="w-5 h-5 text-(--color-success)" />
                </div>
                <p className="text-3xl font-bold text-(--color-text) mb-1">8m 32s</p>
                <p className="text-sm text-(--color-success) font-medium">+15.3% from last week</p>
              </ModernCard>

              <ModernCard>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-(--color-text-secondary)">
                    Posts per Day
                  </h4>
                  <MessageSquare className="w-5 h-5 text-(--color-warning)" />
                </div>
                <p className="text-3xl font-bold text-(--color-text) mb-1">62</p>
                <p className="text-sm text-(--color-success) font-medium">+8.7% from last week</p>
              </ModernCard>

              <ModernCard>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-(--color-text-secondary)">
                    Expert Response Rate
                  </h4>
                  <Users className="w-5 h-5 text-(--color-info)" />
                </div>
                <p className="text-3xl font-bold text-(--color-text) mb-1">87%</p>
                <p className="text-sm text-(--color-success) font-medium">+3.2% from last week</p>
              </ModernCard>
            </div>

            {/* Platform Health */}
            <ModernCard>
              <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                Platform Health Score
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-(--color-text)">User Engagement</span>
                    <span className="text-sm font-bold text-(--color-primary)">92%</span>
                  </div>
                  <div className="w-full bg-(--color-surface-alt) rounded-full h-2">
                    <div
                      className="bg-(--color-primary) h-2 rounded-full"
                      style={{ width: '92%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-(--color-text)">Content Quality</span>
                    <span className="text-sm font-bold text-(--color-success)">88%</span>
                  </div>
                  <div className="w-full bg-(--color-surface-alt) rounded-full h-2">
                    <div
                      className="bg-(--color-success) h-2 rounded-full"
                      style={{ width: '88%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-(--color-text)">Response Time</span>
                    <span className="text-sm font-bold text-(--color-warning)">75%</span>
                  </div>
                  <div className="w-full bg-(--color-surface-alt) rounded-full h-2">
                    <div
                      className="bg-(--color-warning) h-2 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-(--color-text)">Data Accuracy</span>
                    <span className="text-sm font-bold text-(--color-primary)">95%</span>
                  </div>
                  <div className="w-full bg-(--color-surface-alt) rounded-full h-2">
                    <div
                      className="bg-(--color-primary) h-2 rounded-full"
                      style={{ width: '95%' }}
                    />
                  </div>
                </div>
              </div>
            </ModernCard>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
