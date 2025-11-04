"use client";

import { useState } from 'react';
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  CloudDrizzle,
} from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import Badge from '@/app/components/ui/Badge';
import Select from '@/app/components/ui/Select';

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState('Multan');

  // Mock weather data
  const mockWeatherData = [
    {
      city: 'Multan',
      region: 'Punjab',
      temperature: 32,
      humidity: 65,
      rainfall_mm: 0,
      condition: 'Sunny',
      wind_speed: 12,
      forecast: [
        { day: 'Today', temp: 32, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 30, condition: 'Partly Cloudy' },
        { day: 'Wed', temp: 28, condition: 'Rain' },
        { day: 'Thu', temp: 29, condition: 'Cloudy' },
        { day: 'Fri', temp: 31, condition: 'Sunny' },
      ],
    },
    {
      city: 'Lahore',
      region: 'Punjab',
      temperature: 28,
      humidity: 70,
      rainfall_mm: 5,
      condition: 'Rain',
      wind_speed: 15,
      forecast: [
        { day: 'Today', temp: 28, condition: 'Rain' },
        { day: 'Tomorrow', temp: 27, condition: 'Rain' },
        { day: 'Wed', temp: 26, condition: 'Cloudy' },
        { day: 'Thu', temp: 28, condition: 'Partly Cloudy' },
        { day: 'Fri', temp: 30, condition: 'Sunny' },
      ],
    },
    {
      city: 'Karachi',
      region: 'Sindh',
      temperature: 30,
      humidity: 80,
      rainfall_mm: 0,
      condition: 'Partly Cloudy',
      wind_speed: 20,
      forecast: [
        { day: 'Today', temp: 30, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', temp: 31, condition: 'Sunny' },
        { day: 'Wed', temp: 32, condition: 'Sunny' },
        { day: 'Thu', temp: 30, condition: 'Partly Cloudy' },
        { day: 'Fri', temp: 29, condition: 'Cloudy' },
      ],
    },
    {
      city: 'Faisalabad',
      region: 'Punjab',
      temperature: 29,
      humidity: 68,
      rainfall_mm: 2,
      condition: 'Cloudy',
      wind_speed: 10,
      forecast: [
        { day: 'Today', temp: 29, condition: 'Cloudy' },
        { day: 'Tomorrow', temp: 28, condition: 'Rain' },
        { day: 'Wed', temp: 27, condition: 'Rain' },
        { day: 'Thu', temp: 28, condition: 'Cloudy' },
        { day: 'Fri', temp: 30, condition: 'Sunny' },
      ],
    },
  ];

  const currentWeather = mockWeatherData.find((w) => w.city === selectedCity) || mockWeatherData[0];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      case 'cloudy':
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'partly cloudy':
        return <CloudDrizzle className="w-16 h-16 text-gray-400" />;
      default:
        return <Cloud className="w-16 h-16 text-gray-400" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'warning';
      case 'rain':
        return 'info';
      case 'cloudy':
      case 'partly cloudy':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getWeatherAdvice = (weather: any) => {
    if (weather.condition.toLowerCase() === 'rain') {
      return {
        text: 'Rain expected - Avoid watering crops today',
        variant: 'info' as const,
      };
    } else if (weather.temperature > 35) {
      return {
        text: 'High temperature - Increase irrigation frequency',
        variant: 'warning' as const,
      };
    } else if (weather.humidity < 40) {
      return {
        text: 'Low humidity - Monitor crop moisture levels',
        variant: 'warning' as const,
      };
    }
    return {
      text: 'Optimal conditions for farming',
      variant: 'success' as const,
    };
  };

  const advice = getWeatherAdvice(currentWeather);

  return (
    <ProtectedRoute allowedRoles={['farmer', 'admin']}>
      <DashboardLayout role="farmer">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
                Weather Intelligence
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                Real-time weather data and forecasts
              </p>
            </div>
            <div className="w-64">
              <Select
                label=""
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                options={mockWeatherData.map((w) => ({
                  value: w.city,
                  label: `${w.city}, ${w.region}`,
                }))}
              />
            </div>
          </div>

          {/* Weather Advice */}
          <ModernCard variant="elevated" className={`border-l-4 border-l-[var(--color-${advice.variant})]`}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--color-${advice.variant}-light)]">
                <Thermometer className={`w-5 h-5 text-[var(--color-${advice.variant})]`} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text)] mb-1">
                  Weather Advice
                </h3>
                <p className="text-[var(--color-text-secondary)]">{advice.text}</p>
              </div>
            </div>
          </ModernCard>

          {/* Current Weather */}
          <ModernCard>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Weather Info */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  {getWeatherIcon(currentWeather.condition)}
                  <div>
                    <h2 className="text-5xl font-bold text-[var(--color-text)]">
                      {currentWeather.temperature}°C
                    </h2>
                    <Badge
                      variant={getConditionColor(currentWeather.condition)}
                      className="mt-2"
                    >
                      {currentWeather.condition}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-1">
                  {currentWeather.city}
                </h3>
                <p className="text-[var(--color-text-muted)]">
                  {currentWeather.region}
                </p>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--color-surface-alt)] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-[var(--color-info)]" />
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      Humidity
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text)]">
                    {currentWeather.humidity}%
                  </p>
                </div>
                <div className="p-4 bg-[var(--color-surface-alt)] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-[var(--color-success)]" />
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      Wind Speed
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text)]">
                    {currentWeather.wind_speed} km/h
                  </p>
                </div>
                <div className="p-4 bg-[var(--color-surface-alt)] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudRain className="w-5 h-5 text-[var(--color-info)]" />
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      Rainfall
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text)]">
                    {currentWeather.rainfall_mm} mm
                  </p>
                </div>
                <div className="p-4 bg-[var(--color-surface-alt)] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-5 h-5 text-[var(--color-warning)]" />
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      Temperature
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text)]">
                    {currentWeather.temperature}°C
                  </p>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* 5-Day Forecast */}
          <ModernCard>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {currentWeather.forecast.map((day, index) => (
                <div
                  key={index}
                  className="p-4 bg-[var(--color-surface-alt)] rounded-lg text-center"
                >
                  <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
                    {day.day}
                  </p>
                  <div className="flex items-center justify-center mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <p className="text-xl font-bold text-[var(--color-text)] mb-1">
                    {day.temp}°C
                  </p>
                  <Badge variant={getConditionColor(day.condition)} size="sm">
                    {day.condition}
                  </Badge>
                </div>
              ))}
            </div>
          </ModernCard>

          {/* All Cities Overview */}
          <ModernCard>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
              Pakistan Weather Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockWeatherData.map((weather) => (
                <div
                  key={weather.city}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    weather.city === selectedCity
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                  }`}
                  onClick={() => setSelectedCity(weather.city)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[var(--color-text)]">
                      {weather.city}
                    </h4>
                    <div className="scale-75">
                      {getWeatherIcon(weather.condition)}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text)] mb-1">
                    {weather.temperature}°C
                  </p>
                  <Badge variant={getConditionColor(weather.condition)} size="sm">
                    {weather.condition}
                  </Badge>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
