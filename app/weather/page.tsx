'use client';

import React from 'react';
import DashboardLayout from '@/components/shared/dashboard-layout';
import { ModernCard } from '@/components/ModernCard';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/app/hooks/useLanguage';
import { getMockWeatherData, getWeatherRecommendations } from '@/app/lib/weather-service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeatherPage() {
  const { t, language } = useLanguage();
  const weatherData = getMockWeatherData();
  const recommendations = getWeatherRecommendations(weatherData);

  const weatherIcons: Record<string, string> = {
    Clear: '☀️',
    Cloudy: '☁️',
    'Partly Cloudy': '⛅',
    Rain: '🌧️',
    Storm: '⛈️',
  };

  // Generate 30-day pattern data
  const patternData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    temp: 28 + Math.random() * 10,
    humidity: 50 + Math.random() * 30,
  }));

  return (
    <DashboardLayout
      title={t({ en: 'Weather Intelligence', ur: 'موسمی معلومات', roman: 'Mosami Maloomat' })}
      userRole="farmer"
    >
      <div className="space-y-6">
        {/* Current Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ModernCard variant="elevated" padding="lg" className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Current Conditions', ur: 'موجودہ حالات', roman: 'Mojuda Halaat' })}
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{weatherIcons[weatherData.current.condition] || '🌤️'}</span>
                  <div>
                    <p className="text-5xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                      {weatherData.current.temp}°C
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {t({ en: 'Feels like', ur: 'محسوس ہوتا ہے', roman: 'Mehsoos Hota Hai' })}{' '}
                      {weatherData.current.feelsLike}°C
                    </p>
                  </div>
                </div>
                <p className="text-lg mb-2" style={{ color: 'var(--color-text)' }}>
                  {weatherData.current.condition}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {t({ en: 'Humidity', ur: 'نمی', roman: 'Nami' })}
                    </p>
                    <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
                      {weatherData.current.humidity}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">💨</span>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {t({ en: 'Wind Speed', ur: 'ہوا کی رفتار', roman: 'Hawa ki Raftar' })}
                    </p>
                    <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
                      {weatherData.current.windSpeed} km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Soil Conditions */}
          {weatherData.soil && (
            <ModernCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
                {t({ en: 'Soil Conditions', ur: 'مٹی کی حالت', roman: 'Mitti ki Halat' })}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {t({ en: 'Moisture', ur: 'نمی', roman: 'Nami' })}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--agri-dark)' }}>
                      {weatherData.soil.moisture}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${weatherData.soil.moisture}%`,
                        backgroundColor: 'var(--color-info)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {t({ en: 'Temperature', ur: 'درجہ حرارت', roman: 'Darja Hararat' })}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--agri-dark)' }}>
                      {weatherData.soil.temperature}°C
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(weatherData.soil.temperature / 40) * 100}%`,
                        backgroundColor: 'var(--agri-orange)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      pH {t({ en: 'Level', ur: 'سطح', roman: 'Satah' })}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--agri-dark)' }}>
                      {weatherData.soil.ph}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(weatherData.soil.ph / 14) * 100}%`,
                        backgroundColor: 'var(--color-success)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </ModernCard>
          )}
        </div>

        {/* Weather Alerts */}
        {weatherData.alerts && weatherData.alerts.length > 0 && (
          <ModernCard variant="outlined" padding="lg">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Weather Alerts', ur: 'موسم کی وارننگ', roman: 'Mosam ki Warning' })}
            </h3>
            <div className="space-y-3">
              {weatherData.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border-l-4 rounded-lg"
                  style={{
                    borderColor:
                      alert.severity === 'high'
                        ? 'var(--color-error)'
                        : alert.severity === 'medium'
                        ? 'var(--agri-orange)'
                        : 'var(--color-info)',
                    backgroundColor: 'var(--color-surface-muted)',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold" style={{ color: 'var(--agri-dark)' }}>
                          {language === 'ur' && alert.titleUrdu ? alert.titleUrdu : alert.title}
                        </h4>
                        <StatusBadge
                          status={alert.severity === 'high' ? 'error' : alert.severity === 'medium' ? 'warning' : 'info'}
                          size="sm"
                        >
                          {alert.severity}
                        </StatusBadge>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                        {alert.description}
                      </p>
                      <div className="mb-3">
                        <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-muted)' }}>
                          {t({ en: 'Affected Crops:', ur: 'متاثرہ فصلیں:', roman: 'Mutassira Faslen:' })}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {alert.affectedCrops.map((crop, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded"
                              style={{
                                backgroundColor: 'var(--color-surface)',
                                color: 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                              }}
                            >
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-2" style={{ color: 'var(--agri-dark)' }}>
                          {t({ en: 'Recommendations:', ur: 'سفارشات:', roman: 'Sifarishat:' })}
                        </p>
                        <ul className="space-y-1">
                          {alert.recommendations.map((rec, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                              style={{ color: 'var(--color-text-secondary)' }}
                            >
                              <span style={{ color: 'var(--agri-orange)' }}>•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        )}

        {/* Hourly Forecast */}
        <ModernCard variant="elevated" padding="lg">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
            {t({ en: '24-Hour Forecast', ur: '24 گھنٹے کی پیشن گوئی', roman: '24 Ghantay ki Peshingoi' })}
          </h3>
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {weatherData.hourly.slice(0, 12).map((hour, index) => (
                <div key={index} className="flex flex-col items-center gap-2 min-w-[80px]">
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {hour.time}
                  </p>
                  <span className="text-3xl">{weatherIcons[hour.condition] || '🌤️'}</span>
                  <p className="font-bold" style={{ color: 'var(--agri-dark)' }}>
                    {Math.round(hour.temp)}°C
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">💧</span>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {Math.round(hour.humidity)}%
                    </p>
                  </div>
                  {hour.precipitation > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs">🌧️</span>
                      <p className="text-xs" style={{ color: 'var(--color-info)' }}>
                        {Math.round(hour.precipitation)}%
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ModernCard>

        {/* 30-Day Weather Pattern */}
        <ModernCard variant="elevated" padding="lg">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
            {t({ en: '30-Day Weather Pattern', ur: '30 دن کا موسمی نمونہ', roman: '30 Din ka Mosami Namuna' })}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patternData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="day"
                stroke="var(--color-text-muted)"
                label={{
                  value: t({ en: 'Days', ur: 'دن', roman: 'Din' }),
                  position: 'insideBottom',
                  offset: -5,
                }}
              />
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
                dataKey="temp"
                name={t({ en: 'Temperature (°C)', ur: 'درجہ حرارت (°C)', roman: 'Darja Hararat (°C)' })}
                stroke="var(--agri-orange)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                name={t({ en: 'Humidity (%)', ur: 'نمی (%)', roman: 'Nami (%)' })}
                stroke="var(--color-info)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ModernCard>

        {/* Smart Recommendations */}
        <ModernCard variant="outlined" padding="lg">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
            {t({ en: 'Weather-Based Recommendations', ur: 'موسم پر مبنی سفارشات', roman: 'Mosam par Mabni Sifarishat' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                    {rec}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ModernCard>
      </div>
    </DashboardLayout>
  );
}
