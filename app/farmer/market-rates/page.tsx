"use client";

import { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernInput from '@/app/components/ModernInput';
import Select from '@/app/components/ui/Select';
import Badge from '@/app/components/ui/Badge';
import Modal from '@/app/components/ui/Modal';
import PriceTrendChart from '@/app/components/charts/PriceTrendChart';
import { formatCurrency, formatDateTime } from '@/app/lib/utils/format';

export default function MarketRatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Market data by region
  const marketsByRegion: Record<string, string[]> = {
    Multan: ['Multan Mandi', 'Shah Rukn-e-Alam Market', 'Vehari Road Market', 'New Multan'],
    Lahore: ['Badami Bagh', 'Azam Cloth Market', 'Shahdara Market', 'Model Town Market'],
    Karachi: ['Sabzi Mandi', 'Empress Market', 'Saddar Market', 'SITE Market'],
    Faisalabad: ['Jhang Bazar', 'Rail Bazar', 'Aminpur Bazar', 'D-Ground Market'],
    Islamabad: ['Sabzi Mandi', 'F-6 Market', 'I-8 Market', 'F-10 Market'],
    Rawalpindi: ['Raja Bazar', 'Moti Bazar', 'Committee Chowk', 'Saddar Bazar'],
    Peshawar: ['Qissa Khwani Bazar', 'Saddar Bazar', 'Hashtnagri Market', 'Charsadda Road'],
    Quetta: ['Sariab Road Market', 'Kandahari Bazar', 'Joint Road Market', 'Brewery Road'],
  };

  // Mock data
  const mockRates = [
    {
      rate_id: 1,
      crop_name: 'Wheat',
      category: 'Grain',
      region: 'Multan',
      market: 'Multan Mandi',
      avg_price: 2850,
      min_price: 2750,
      max_price: 2950,
      date: '2025-11-04',
      change: 5.2,
    },
    {
      rate_id: 2,
      crop_name: 'Rice',
      category: 'Grain',
      region: 'Lahore',
      market: 'Badami Bagh',
      avg_price: 3200,
      min_price: 3100,
      max_price: 3300,
      date: '2025-11-04',
      change: -2.1,
    },
    {
      rate_id: 3,
      crop_name: 'Tomato',
      category: 'Vegetable',
      region: 'Karachi',
      market: 'Sabzi Mandi',
      avg_price: 85,
      min_price: 70,
      max_price: 100,
      date: '2025-11-04',
      change: 12.5,
    },
    {
      rate_id: 4,
      crop_name: 'Cotton',
      category: 'Grain',
      region: 'Faisalabad',
      market: 'Jhang Bazar',
      avg_price: 8500,
      min_price: 8300,
      max_price: 8700,
      date: '2025-11-04',
      change: 3.8,
    },
    {
      rate_id: 5,
      crop_name: 'Mango',
      category: 'Fruit',
      region: 'Multan',
      market: 'Shah Rukn-e-Alam Market',
      avg_price: 120,
      min_price: 100,
      max_price: 140,
      date: '2025-11-04',
      change: 8.3,
    },
    {
      rate_id: 6,
      crop_name: 'Potato',
      category: 'Vegetable',
      region: 'Lahore',
      market: 'Shahdara Market',
      avg_price: 45,
      min_price: 40,
      max_price: 50,
      date: '2025-11-04',
      change: -1.5,
    },
    {
      rate_id: 7,
      crop_name: 'Wheat',
      category: 'Grain',
      region: 'Lahore',
      market: 'Model Town Market',
      avg_price: 2900,
      min_price: 2800,
      max_price: 3000,
      date: '2025-11-04',
      change: 4.8,
    },
  ];

  const mockTrendData = [
    { date: '2025-10-29', avg_price: 2700, min_price: 2600, max_price: 2800 },
    { date: '2025-10-30', avg_price: 2750, min_price: 2650, max_price: 2850 },
    { date: '2025-10-31', avg_price: 2800, min_price: 2700, max_price: 2900 },
    { date: '2025-11-01', avg_price: 2820, min_price: 2720, max_price: 2920 },
    { date: '2025-11-02', avg_price: 2840, min_price: 2740, max_price: 2940 },
    { date: '2025-11-03', avg_price: 2850, min_price: 2750, max_price: 2950 },
    { date: '2025-11-04', avg_price: 2850, min_price: 2750, max_price: 2950 },
  ];

  const filteredRates = mockRates.filter((rate) => {
    const matchesSearch = rate.crop_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || rate.category === selectedCategory;
    const matchesRegion =
      selectedRegion === 'all' || rate.region === selectedRegion;
    const matchesMarket =
      selectedMarket === 'all' || rate.market === selectedMarket;
    return matchesSearch && matchesCategory && matchesRegion && matchesMarket;
  });

  const handleViewTrend = (crop: any) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute allowedRoles={['farmer', 'admin']}>
      <DashboardLayout role="farmer">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
              Market Rates
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Real-time crop prices across Pakistan
            </p>
          </div>

          {/* Filters */}
          <ModernCard>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModernInput
                label=""
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
              <Select
                label=""
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'Grain', label: 'Grains' },
                  { value: 'Vegetable', label: 'Vegetables' },
                  { value: 'Fruit', label: 'Fruits' },
                ]}
              />
              <Select
                label=""
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedMarket('all'); // Reset market when region changes
                }}
                options={[
                  { value: 'all', label: 'All Regions' },
                  { value: 'Multan', label: 'Multan' },
                  { value: 'Lahore', label: 'Lahore' },
                  { value: 'Karachi', label: 'Karachi' },
                  { value: 'Faisalabad', label: 'Faisalabad' },
                  { value: 'Islamabad', label: 'Islamabad' },
                  { value: 'Rawalpindi', label: 'Rawalpindi' },
                  { value: 'Peshawar', label: 'Peshawar' },
                  { value: 'Quetta', label: 'Quetta' },
                ]}
              />
              {selectedRegion !== 'all' && (
                <Select
                  label=""
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Markets' },
                    ...(marketsByRegion[selectedRegion] || []).map((market) => ({
                      value: market,
                      label: market,
                    })),
                  ]}
                />
              )}
            </div>
          </ModernCard>

          {/* Market Rates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRates.map((rate) => (
              <button
                key={rate.rate_id}
                onClick={() => handleViewTrend(rate)}
                className="text-left w-full"
              >
                <ModernCard
                  hoverable
                  className="cursor-pointer h-full"
                >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)]">
                      {rate.crop_name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {rate.region}
                    </p>
                    {rate.market && (
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        📍 {rate.market}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={rate.change >= 0 ? 'success' : 'error'}
                    size="sm"
                  >
                    {rate.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(rate.change)}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-text-muted)]">
                      Average
                    </span>
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      {formatCurrency(rate.avg_price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">Range</span>
                    <span className="text-[var(--color-text-secondary)]">
                      {formatCurrency(rate.min_price)} -{' '}
                      {formatCurrency(rate.max_price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-[var(--color-border)]">
                    <span className="text-[var(--color-text-muted)]">
                      Category
                    </span>
                    <Badge variant="neutral" size="sm">
                      {rate.category}
                    </Badge>
                  </div>
                </div>
              </ModernCard>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredRates.length === 0 && (
            <ModernCard>
              <div className="text-center py-12">
                <Filter className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)]" />
                <p className="text-lg font-medium text-[var(--color-text)]">
                  No crops found
                </p>
                <p className="text-[var(--color-text-muted)]">
                  Try adjusting your filters
                </p>
              </div>
            </ModernCard>
          )}
        </div>

        {/* Trend Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`${selectedCrop?.crop_name} - 7-Day Price Trend`}
          size="lg"
        >
          {selectedCrop && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[var(--color-surface-alt)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">
                    Current
                  </p>
                  <p className="text-xl font-bold text-[var(--color-primary)]">
                    {formatCurrency(selectedCrop.avg_price)}
                  </p>
                </div>
                <div className="text-center p-4 bg-[var(--color-surface-alt)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">
                    Min
                  </p>
                  <p className="text-xl font-bold text-[var(--color-text)]">
                    {formatCurrency(selectedCrop.min_price)}
                  </p>
                </div>
                <div className="text-center p-4 bg-[var(--color-surface-alt)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">
                    Max
                  </p>
                  <p className="text-xl font-bold text-[var(--color-text)]">
                    {formatCurrency(selectedCrop.max_price)}
                  </p>
                </div>
              </div>
              <PriceTrendChart data={mockTrendData} height={350} />
            </div>
          )}
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
