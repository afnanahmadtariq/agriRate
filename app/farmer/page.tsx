'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/app/components/shared/dashboard-layout';
import { ModernCard } from '@/app/components/ModernCard';
import { ModernButton } from '@/app/components/ModernButton';
import { ModernInput } from '@/app/components/ModernInput';
import { StatusBadge } from '@/app/components/StatusBadge';
import PriceAnalytics from '@/app/components/farmer/price-analytics';
import { useLanguage } from '@/app/hooks/useLanguage';
import { useVoiceInput } from '@/app/hooks/useVoiceInput';
import type { PriceItem } from '@/app/types';
import { generateSmartAdvice } from '@/app/lib/advice-engine';
import { getMockWeatherData } from '@/app/lib/weather-service';

// Mock price data
const mockPriceData: PriceItem[] = [
  {
    id: '1',
    commodity: 'Wheat',
    commodityUrdu: 'گندم',
    price: 4500,
    unit: 'per 40kg',
    change: 5.2,
    trend: 'up',
    market: 'Faisalabad',
    region: 'Punjab',
    date: new Date(),
    supply: 'medium',
    demand: 'high',
  },
  {
    id: '2',
    commodity: 'Rice',
    commodityUrdu: 'چاول',
    price: 6800,
    unit: 'per 40kg',
    change: -2.1,
    trend: 'down',
    market: 'Gujranwala',
    region: 'Punjab',
    date: new Date(),
    supply: 'high',
    demand: 'medium',
  },
  {
    id: '3',
    commodity: 'Cotton',
    commodityUrdu: 'کپاس',
    price: 8200,
    unit: 'per 40kg',
    change: 12.5,
    trend: 'up',
    market: 'Multan',
    region: 'Punjab',
    date: new Date(),
    supply: 'low',
    demand: 'high',
  },
  {
    id: '4',
    commodity: 'Sugarcane',
    commodityUrdu: 'گنا',
    price: 3200,
    unit: 'per 40kg',
    change: 0,
    trend: 'stable',
    market: 'Lahore',
    region: 'Punjab',
    date: new Date(),
    supply: 'medium',
    demand: 'medium',
  },
  {
    id: '5',
    commodity: 'Maize',
    commodityUrdu: 'مکئی',
    price: 3800,
    unit: 'per 40kg',
    change: 3.4,
    trend: 'up',
    market: 'Sahiwal',
    region: 'Punjab',
    date: new Date(),
    supply: 'medium',
    demand: 'high',
  },
  {
    id: '6',
    commodity: 'Tomato',
    commodityUrdu: 'ٹماٹر',
    price: 1200,
    unit: 'per kg',
    change: -8.5,
    trend: 'down',
    market: 'Karachi',
    region: 'Sindh',
    date: new Date(),
    supply: 'high',
    demand: 'low',
  },
];

export default function FarmerDashboard() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'prices' | 'analytics' | 'advice'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const { isListening, startListening, isSupported } = useVoiceInput({
    language: language === 'ur' ? 'ur-PK' : 'en-US',
    onResult: (transcript) => {
      setVoiceTranscript(transcript);
      setSearchQuery(transcript);
    },
    onError: (error) => console.error('Voice error:', error),
  });

  // Generate smart advice
  const weatherData = getMockWeatherData();
  const smartAdvice = generateSmartAdvice(mockPriceData, weatherData);

  // Filter prices
  const filteredPrices = mockPriceData.filter((item) => {
    const matchesSearch =
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.commodityUrdu && item.commodityUrdu.includes(searchQuery));
    const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const tabs = [
    { id: 'overview', label: { en: 'Overview', ur: 'جائزہ', roman: 'Jaiza' }, icon: '📊' },
    { id: 'prices', label: { en: 'Prices', ur: 'قیمتیں', roman: 'Qeematain' }, icon: '💰' },
    { id: 'analytics', label: { en: 'Analytics', ur: 'تجزیات', roman: 'Tajziyat' }, icon: '📈' },
    { id: 'advice', label: { en: 'Smart Advice', ur: 'سمارٹ مشورے', roman: 'Smart Mashware' }, icon: '💡' },
  ];

  return (
    <DashboardLayout
      title={t({ en: 'Farmer Dashboard', ur: 'کسان ڈیش بورڈ', roman: 'Kisaan Dashboard' })}
      userRole="farmer"
    >
      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <ModernButton
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              size="md"
              onClick={() => setActiveTab(tab.id as any)}
            >
              <span className="mr-2">{tab.icon}</span>
              {t(tab.label)}
            </ModernButton>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModernCard variant="elevated" padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {t({ en: 'Total Markets', ur: 'کل منڈیاں', roman: 'Kul Mandian' })}
                  </p>
                  <p className="text-3xl font-bold mt-1" style={{ color: 'var(--agri-dark)' }}>
                    24
                  </p>
                </div>
                <div className="text-4xl">🏪</div>
              </div>
            </ModernCard>

            <ModernCard variant="elevated" padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {t({ en: 'Commodities', ur: 'اشیاء', roman: 'Ashiya' })}
                  </p>
                  <p className="text-3xl font-bold mt-1" style={{ color: 'var(--agri-dark)' }}>
                    {mockPriceData.length}
                  </p>
                </div>
                <div className="text-4xl">🌾</div>
              </div>
            </ModernCard>

            <ModernCard variant="elevated" padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {t({ en: 'Price Updates', ur: 'قیمت اپ ڈیٹ', roman: 'Qeemat Update' })}
                  </p>
                  <p className="text-3xl font-bold mt-1" style={{ color: 'var(--color-success)' }}>
                    ↑ 15%
                  </p>
                </div>
                <div className="text-4xl">📈</div>
              </div>
            </ModernCard>
          </div>

          {/* Top Advice Cards */}
          <ModernCard variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Smart Recommendations', ur: 'سمارٹ سفارشات', roman: 'Smart Sifarishat' })}
            </h3>
            <div className="space-y-3">
              {smartAdvice.slice(0, 3).map((advice) => (
                <div
                  key={advice.id}
                  className="p-4 border-l-4 rounded-lg"
                  style={{
                    borderColor:
                      advice.priority === 'high'
                        ? 'var(--color-error)'
                        : advice.priority === 'medium'
                        ? 'var(--agri-orange)'
                        : 'var(--color-info)',
                    backgroundColor: 'var(--color-surface-muted)',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--agri-dark)' }}>
                        {language === 'ur' ? advice.titleUrdu : advice.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {language === 'ur' ? advice.descriptionUrdu : advice.description}
                      </p>
                    </div>
                    <StatusBadge
                      status={advice.priority === 'high' ? 'error' : advice.priority === 'medium' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {advice.priority}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      )}

      {/* Prices Tab */}
      {activeTab === 'prices' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <ModernCard variant="outlined" padding="md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <ModernInput
                  type="text"
                  placeholder={t({ en: 'Search commodities...', ur: 'اشیاء تلاش کریں...', roman: 'Ashiya Talash Karain' })}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={
                    isSupported && (
                      <button
                        onClick={startListening}
                        disabled={isListening}
                        className="p-2 rounded-lg hover:bg-[var(--color-hover-overlay)] transition-colors"
                        style={{ color: isListening ? 'var(--color-error)' : 'var(--agri-dark)' }}
                      >
                        {isListening ? '🎤' : '🎙️'}
                      </button>
                    )
                  }
                />
                {voiceTranscript && (
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {t({ en: 'Voice query:', ur: 'آواز کا سوال:', roman: 'Awaz ka Sawal:' })} {voiceTranscript}
                  </p>
                )}
              </div>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border rounded-lg"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                <option value="all">{t({ en: 'All Regions', ur: 'تمام علاقے', roman: 'Tamam Ilaqay' })}</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
                <option value="Balochistan">Balochistan</option>
              </select>
            </div>
          </ModernCard>

          {/* Price Table */}
          <ModernCard variant="elevated" padding="lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--agri-dark)' }}>
                      {t({ en: 'Commodity', ur: 'شے', roman: 'Shay' })}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--agri-dark)' }}>
                      {t({ en: 'Market', ur: 'منڈی', roman: 'Mandi' })}
                    </th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: 'var(--agri-dark)' }}>
                      {t({ en: 'Price', ur: 'قیمت', roman: 'Qeemat' })}
                    </th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: 'var(--agri-dark)' }}>
                      {t({ en: 'Change', ur: 'تبدیلی', roman: 'Tabdeeli' })}
                    </th>
                    <th className="text-center py-3 px-4 font-semibold" style={{ color: 'var(--agri-dark)' }}>
                      {t({ en: 'Supply/Demand', ur: 'سپلائی/مانگ', roman: 'Supply/Maang' })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrices.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }} className="hover:bg-[var(--color-surface-muted)] transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                            {language === 'ur' ? item.commodityUrdu : item.commodity}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {item.unit}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          {item.market}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="font-bold" style={{ color: 'var(--agri-dark)' }}>
                          PKR {item.price.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className="inline-flex items-center gap-1 font-semibold"
                          style={{
                            color: item.trend === 'up' ? 'var(--color-success)' : item.trend === 'down' ? 'var(--color-error)' : 'var(--color-text-muted)',
                          }}
                        >
                          {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                          {Math.abs(item.change || 0).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <StatusBadge status={item.supply === 'high' ? 'success' : item.supply === 'low' ? 'error' : 'warning'} size="sm">
                            S: {item.supply}
                          </StatusBadge>
                          <StatusBadge status={item.demand === 'high' ? 'success' : item.demand === 'low' ? 'error' : 'warning'} size="sm">
                            D: {item.demand}
                          </StatusBadge>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModernCard>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && <PriceAnalytics />}

      {/* Smart Advice Tab */}
      {activeTab === 'advice' && (
        <div className="space-y-4">
          {smartAdvice.map((advice) => (
            <ModernCard key={advice.id} variant="outlined" padding="lg" hoverable>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--agri-dark)' }}>
                      {language === 'ur' ? advice.titleUrdu : advice.title}
                    </h3>
                    <StatusBadge
                      status={advice.priority === 'high' ? 'error' : advice.priority === 'medium' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {advice.priority}
                    </StatusBadge>
                  </div>
                  <p className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {language === 'ur' ? advice.descriptionUrdu : advice.description}
                  </p>
                  {advice.actionable && advice.actions && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2" style={{ color: 'var(--agri-dark)' }}>
                        {t({ en: 'Recommended Actions:', ur: 'تجویز کردہ اقدامات:', roman: 'Tajweez Karda Aqdamat:' })}
                      </p>
                      <ul className="space-y-1">
                        {advice.actions.map((action, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            <span style={{ color: 'var(--agri-orange)' }}>•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
