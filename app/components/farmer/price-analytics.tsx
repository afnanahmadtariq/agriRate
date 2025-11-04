'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ModernCard } from '@/components/ModernCard';
import { ModernButton } from '@/components/ModernButton';
import { useLanguage } from '@/hooks/useLanguage';
import type { PriceTrend } from '@/types';

interface PriceAnalyticsProps {
  commodity: string;
  data: PriceTrend[];
}

// Mock 7-day price data generator
function generate7DayData(commodity: string): PriceTrend[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const basePrice = Math.random() * 2000 + 3000;

  return days.map((day, index) => ({
    date: day,
    price: Math.round(basePrice + (Math.random() - 0.5) * 500),
  }));
}

const commodities = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Tomato'];

export default function PriceAnalytics() {
  const { t } = useLanguage();
  const [selectedCommodity, setSelectedCommodity] = useState('Wheat');
  const [compareMode, setCompareMode] = useState(false);

  const data = generate7DayData(selectedCommodity);
  const compareData = compareMode
    ? commodities.slice(0, 3).map((commodity) => ({
        name: commodity,
        data: generate7DayData(commodity),
      }))
    : [];

  const stats = {
    average: Math.round(data.reduce((sum, item) => sum + item.price, 0) / data.length),
    min: Math.min(...data.map((item) => item.price)),
    max: Math.max(...data.map((item) => item.price)),
    trend: data[data.length - 1].price > data[0].price ? 'up' : 'down',
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <ModernCard variant="outlined" padding="md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
              {t({ en: 'Select Commodity', ur: 'فصل منتخب کریں', roman: 'Fasal Muntakhib Karain' })}
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="px-4 py-2 border rounded-lg min-w-[200px]"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              {commodities.map((commodity) => (
                <option key={commodity} value={commodity}>
                  {commodity}
                </option>
              ))}
            </select>
          </div>

          <ModernButton
            variant={compareMode ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setCompareMode(!compareMode)}
          >
            {compareMode
              ? t({ en: 'Single View', ur: 'واحد منظر', roman: 'Wahid Manzar' })
              : t({ en: 'Compare', ur: 'موازنہ کریں', roman: 'Muwazana Karain' })}
          </ModernButton>
        </div>
      </ModernCard>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ModernCard variant="elevated" padding="md">
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'Average', ur: 'اوسط', roman: 'Ausat' })}
            </p>
            <p className="text-2xl font-bold" style={{ color: 'var(--agri-dark)' }}>
              PKR {stats.average}
            </p>
          </div>
        </ModernCard>

        <ModernCard variant="elevated" padding="md">
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'Minimum', ur: 'کم سے کم', roman: 'Kam se Kam' })}
            </p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-info)' }}>
              PKR {stats.min}
            </p>
          </div>
        </ModernCard>

        <ModernCard variant="elevated" padding="md">
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'Maximum', ur: 'زیادہ سے زیادہ', roman: 'Zyada se Zyada' })}
            </p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
              PKR {stats.max}
            </p>
          </div>
        </ModernCard>

        <ModernCard variant="elevated" padding="md">
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {t({ en: 'Trend', ur: 'رجحان', roman: 'Rujhan' })}
            </p>
            <p
              className="text-2xl font-bold flex items-center justify-center gap-1"
              style={{ color: stats.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)' }}
            >
              {stats.trend === 'up' ? '↗' : '↘'}
              {stats.trend === 'up'
                ? t({ en: 'Rising', ur: 'بڑھ رہا', roman: 'Barh Raha' })
                : t({ en: 'Falling', ur: 'گر رہا', roman: 'Gir Raha' })}
            </p>
          </div>
        </ModernCard>
      </div>

      {/* Chart */}
      <ModernCard variant="elevated" padding="lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
          {compareMode
            ? t({ en: '7-Day Price Comparison', ur: '7 دن کی قیمت کا موازنہ', roman: '7 Din ki Qeemat ka Muwazana' })
            : t({ en: '7-Day Price Trend', ur: '7 دن کی قیمت کا رجحان', roman: '7 Din ki Qeemat ka Rujhan' })}
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          {compareMode ? (
            <LineChart data={compareData[0]?.data || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-text-muted)" />
              <YAxis stroke="var(--color-text-muted)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              {compareData.map((commodity, index) => (
                <Line
                  key={commodity.name}
                  type="monotone"
                  data={commodity.data}
                  dataKey="price"
                  name={commodity.name}
                  stroke={['#0f5132', '#f4a300', '#1e40af'][index]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-text-muted)" />
              <YAxis stroke="var(--color-text-muted)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--agri-dark)"
                strokeWidth={3}
                dot={{ fill: 'var(--agri-orange)', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>

        {/* Export Buttons */}
        <div className="flex gap-3 mt-6 justify-end">
          <ModernButton variant="ghost" size="sm">
            {t({ en: 'Export PNG', ur: 'PNG برآمد کریں', roman: 'PNG Baraamd Karain' })}
          </ModernButton>
          <ModernButton variant="ghost" size="sm">
            {t({ en: 'Export PDF', ur: 'PDF برآمد کریں', roman: 'PDF Baraamd Karain' })}
          </ModernButton>
        </div>
      </ModernCard>
    </div>
  );
}
