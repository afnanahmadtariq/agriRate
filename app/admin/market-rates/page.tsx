"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Plus, Edit2, Trash2, Download } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import ModernInput from '@/app/components/ModernInput';
import Table from '@/app/components/ui/Table';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import Modal from '@/app/components/ui/Modal';
import Select from '@/app/components/ui/Select';
import PriceTrendChart from '@/app/components/charts/PriceTrendChart';
import { MarketRate } from '@/app/types';
import { formatCurrency, formatDateTime } from '@/app/lib/utils/format';

export default function MarketRatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<MarketRate | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [marketFilter, setMarketFilter] = useState('all');

  const [formData, setFormData] = useState({
    crop_name: '',
    category: 'Grain' as 'Fruit' | 'Vegetable' | 'Grain',
    region: '',
    market: '',
    date: new Date().toISOString().split('T')[0],
    min_price: '',
    max_price: '',
    avg_price: '',
    source: 'Admin',
  });

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

  const availableMarkets = formData.region ? marketsByRegion[formData.region] || [] : [];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock data
  const mockRates: MarketRate[] = [
    {
      rate_id: 1,
      crop_name: 'Wheat',
      category: 'Grain',
      region: 'Multan',
      market: 'Multan Mandi',
      date: '2025-11-04',
      min_price: 2800,
      max_price: 2900,
      avg_price: 2850,
      source: 'Manual Entry',
      created_by: 'admin',
      created_at: '2025-11-04T10:00:00Z',
      updated_at: '2025-11-04T10:00:00Z',
    },
    {
      rate_id: 2,
      crop_name: 'Rice',
      category: 'Grain',
      region: 'Lahore',
      market: 'Badami Bagh',
      date: '2025-11-04',
      min_price: 3100,
      max_price: 3300,
      avg_price: 3200,
      source: 'Market Survey',
      created_by: 'admin',
      created_at: '2025-11-04T09:30:00Z',
      updated_at: '2025-11-04T09:30:00Z',
    },
    {
      rate_id: 3,
      crop_name: 'Tomato',
      category: 'Vegetable',
      region: 'Karachi',
      market: 'Sabzi Mandi',
      date: '2025-11-04',
      min_price: 40,
      max_price: 60,
      avg_price: 50,
      source: 'API',
      created_by: 'system',
      created_at: '2025-11-04T08:00:00Z',
      updated_at: '2025-11-04T08:00:00Z',
    },
    {
      rate_id: 4,
      crop_name: 'Mango',
      category: 'Fruit',
      region: 'Multan',
      market: 'Shah Rukn-e-Alam Market',
      date: '2025-11-03',
      min_price: 120,
      max_price: 180,
      avg_price: 150,
      source: 'Manual Entry',
      created_by: 'admin',
      created_at: '2025-11-03T14:00:00Z',
      updated_at: '2025-11-03T14:00:00Z',
    },
    {
      rate_id: 5,
      crop_name: 'Wheat',
      category: 'Grain',
      region: 'Lahore',
      market: 'Shahdara Market',
      date: '2025-11-04',
      min_price: 2850,
      max_price: 2950,
      avg_price: 2900,
      source: 'Manual Entry',
      created_by: 'admin',
      created_at: '2025-11-04T10:30:00Z',
      updated_at: '2025-11-04T10:30:00Z',
    },
  ];

  const trendData = [
    { date: '2025-10-29', avg_price: 2700 },
    { date: '2025-10-30', avg_price: 2750 },
    { date: '2025-10-31', avg_price: 2800 },
    { date: '2025-11-01', avg_price: 2820 },
    { date: '2025-11-02', avg_price: 2840 },
    { date: '2025-11-03', avg_price: 2850 },
    { date: '2025-11-04', avg_price: 2850 },
  ];

  const filteredRates = mockRates.filter((rate) => {
    const matchesCategory = categoryFilter === 'all' || rate.category === categoryFilter;
    const matchesRegion = regionFilter === 'all' || rate.region === regionFilter;
    const matchesMarket = marketFilter === 'all' || rate.market === marketFilter;
    return matchesCategory && matchesRegion && matchesMarket;
  });

  const columns = [
    { key: 'crop_name', header: 'Crop', sortable: true },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (rate: MarketRate) => (
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
          rate.category === 'Grain'
            ? 'bg-amber-100 text-amber-800'
            : rate.category === 'Vegetable'
            ? 'bg-green-100 text-green-800'
            : 'bg-pink-100 text-pink-800'
        }`}>
          {rate.category}
        </span>
      ),
    },
    { 
      key: 'region', 
      header: 'Region',
      sortable: true,
      render: (rate: MarketRate) => (
        <div>
          <p className="font-medium text-(--color-text)">{rate.region}</p>
          {rate.market && (
            <p className="text-xs text-(--color-text-secondary)">{rate.market}</p>
          )}
        </div>
      ),
    },
    {
      key: 'min_price',
      header: 'Min Price',
      sortable: true,
      sortValue: (item: MarketRate) => item.min_price,
      render: (rate: MarketRate) => formatCurrency(rate.min_price),
    },
    {
      key: 'max_price',
      header: 'Max Price',
      sortable: true,
      sortValue: (item: MarketRate) => item.max_price,
      render: (rate: MarketRate) => formatCurrency(rate.max_price),
    },
    {
      key: 'avg_price',
      header: 'Avg Price',
      sortable: true,
      sortValue: (item: MarketRate) => item.avg_price,
      render: (rate: MarketRate) => (
        <span className="font-semibold text-(--color-primary)">
          {formatCurrency(rate.avg_price)}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      sortValue: (item: MarketRate) => new Date(item.date).getTime(),
      render: (rate: MarketRate) => formatDateTime(rate.date, 'MMM dd, yyyy'),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (rate: MarketRate) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedRate(rate);
              setIsModalOpen(true);
            }}
            className="p-1.5 hover:bg-(--color-info-light) text-(--color-info) rounded transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-(--color-error-light) text-(--color-error) rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      crop_name: '',
      category: 'Grain',
      region: '',
      market: '',
      date: new Date().toISOString().split('T')[0],
      min_price: '',
      max_price: '',
      avg_price: '',
      source: 'Admin',
    });
  };

  const stats = {
    total: mockRates.length,
    grains: mockRates.filter((r) => r.category === 'Grain').length,
    vegetables: mockRates.filter((r) => r.category === 'Vegetable').length,
    fruits: mockRates.filter((r) => r.category === 'Fruit').length,
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout role="admin">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading market rates..." />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                  Market Rates Management
                </h1>
                <p className="text-(--color-text-secondary)">
                  Add, edit, and manage crop prices across regions
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ModernButton variant="secondary" size="md">
                  <div className="flex items-center">
                    <Download className="w-5 h-5 mr-2" />
                    <span>Export</span>
                  </div>
                </ModernButton>
                <ModernButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setSelectedRate(null);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    <span>Add Rate</span>
                  </div>
                </ModernButton>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Total Entries</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.total}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-(--color-primary) opacity-20" />
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Grains</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.grains}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 text-xl">🌾</span>
                  </div>
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Vegetables</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.vegetables}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xl">🥬</span>
                  </div>
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Fruits</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.fruits}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-pink-600 text-xl">🍎</span>
                  </div>
                </div>
              </ModernCard>
            </div>

            {/* Price Trend Chart */}
            <ModernCard>
              <PriceTrendChart
                data={trendData}
                title="Average Market Price Trend (Last 7 Days)"
                height={300}
              />
            </ModernCard>

            {/* Filters */}
            <ModernCard>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Categories' },
                    { value: 'Grain', label: 'Grains' },
                    { value: 'Vegetable', label: 'Vegetables' },
                    { value: 'Fruit', label: 'Fruits' },
                  ]}
                />
                <Select
                  value={regionFilter}
                  onChange={(e) => {
                    setRegionFilter(e.target.value);
                    setMarketFilter('all'); // Reset market filter when region changes
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
                {regionFilter !== 'all' && (
                  <Select
                    value={marketFilter}
                    onChange={(e) => setMarketFilter(e.target.value)}
                    options={[
                      { value: 'all', label: 'All Markets' },
                      ...(marketsByRegion[regionFilter] || []).map((market) => ({
                        value: market,
                        label: market,
                      })),
                    ]}
                  />
                )}
              </div>
            </ModernCard>

            {/* Rates Table */}
            <ModernCard>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-(--color-text)">
                  Market Rates ({filteredRates.length})
                </h3>
              </div>
              <Table data={filteredRates} columns={columns} />
            </ModernCard>

            {/* Add/Edit Rate Modal */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedRate(null);
              }}
              title={selectedRate ? 'Edit Market Rate' : 'Add New Market Rate'}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <ModernInput
                  id="crop_name"
                  label="Crop Name"
                  type="text"
                  placeholder="e.g., Wheat, Rice, Tomato"
                  value={formData.crop_name}
                  onChange={(e) =>
                    setFormData({ ...formData, crop_name: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-(--color-text) mb-2">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'Fruit' | 'Vegetable' | 'Grain',
                      })
                    }
                    options={[
                      { value: 'Grain', label: 'Grain' },
                      { value: 'Vegetable', label: 'Vegetable' },
                      { value: 'Fruit', label: 'Fruit' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--color-text) mb-2">
                    Region
                  </label>
                  <Select
                    value={formData.region}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        region: e.target.value,
                        market: '', // Reset market when region changes
                      });
                    }}
                    options={[
                      { value: '', label: 'Select Region' },
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
                </div>

                {formData.region && (
                  <div>
                    <label className="block text-sm font-medium text-(--color-text) mb-2">
                      Market (Optional)
                    </label>
                    <Select
                      value={formData.market}
                      onChange={(e) =>
                        setFormData({ ...formData, market: e.target.value })
                      }
                      options={[
                        { value: '', label: 'General / All Markets' },
                        ...availableMarkets.map((market) => ({
                          value: market,
                          label: market,
                        })),
                      ]}
                    />
                  </div>
                )}

                <ModernInput
                  id="date"
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />

                <div className="grid grid-cols-3 gap-3">
                  <ModernInput
                    id="min_price"
                    label="Min Price (Rs)"
                    type="number"
                    placeholder="2800"
                    value={formData.min_price}
                    onChange={(e) =>
                      setFormData({ ...formData, min_price: e.target.value })
                    }
                    required
                  />
                  <ModernInput
                    id="max_price"
                    label="Max Price (Rs)"
                    type="number"
                    placeholder="2900"
                    value={formData.max_price}
                    onChange={(e) =>
                      setFormData({ ...formData, max_price: e.target.value })
                    }
                    required
                  />
                  <ModernInput
                    id="avg_price"
                    label="Avg Price (Rs)"
                    type="number"
                    placeholder="2850"
                    value={formData.avg_price}
                    onChange={(e) =>
                      setFormData({ ...formData, avg_price: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <ModernButton
                    type="button"
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </ModernButton>
                  <ModernButton type="submit" variant="primary" size="md" className="flex-1">
                    {selectedRate ? 'Update Rate' : 'Add Rate'}
                  </ModernButton>
                </div>
              </form>
            </Modal>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
