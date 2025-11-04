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
  Search,
  MapPin,
} from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernInput from '@/app/components/ModernInput';
import Badge from '@/app/components/ui/Badge';
import Select from '@/app/components/ui/Select';

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState('Multan');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

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
    {
      city: 'Islamabad',
      region: 'Islamabad Capital',
      temperature: 26,
      humidity: 55,
      rainfall_mm: 0,
      condition: 'Sunny',
      wind_speed: 8,
      forecast: [
        { day: 'Today', temp: 26, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 27, condition: 'Sunny' },
        { day: 'Wed', temp: 25, condition: 'Partly Cloudy' },
        { day: 'Thu', temp: 24, condition: 'Cloudy' },
        { day: 'Fri', temp: 26, condition: 'Sunny' },
      ],
    },
    {
      city: 'Rawalpindi',
      region: 'Punjab',
      temperature: 25,
      humidity: 58,
      rainfall_mm: 1,
      condition: 'Partly Cloudy',
      wind_speed: 9,
      forecast: [
        { day: 'Today', temp: 25, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', temp: 26, condition: 'Sunny' },
        { day: 'Wed', temp: 24, condition: 'Cloudy' },
        { day: 'Thu', temp: 23, condition: 'Rain' },
        { day: 'Fri', temp: 25, condition: 'Sunny' },
      ],
    },
    {
      city: 'Peshawar',
      region: 'Khyber Pakhtunkhwa',
      temperature: 27,
      humidity: 50,
      rainfall_mm: 0,
      condition: 'Sunny',
      wind_speed: 11,
      forecast: [
        { day: 'Today', temp: 27, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 28, condition: 'Sunny' },
        { day: 'Wed', temp: 26, condition: 'Partly Cloudy' },
        { day: 'Thu', temp: 25, condition: 'Cloudy' },
        { day: 'Fri', temp: 27, condition: 'Sunny' },
      ],
    },
    {
      city: 'Quetta',
      region: 'Balochistan',
      temperature: 22,
      humidity: 40,
      rainfall_mm: 0,
      condition: 'Sunny',
      wind_speed: 14,
      forecast: [
        { day: 'Today', temp: 22, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 23, condition: 'Sunny' },
        { day: 'Wed', temp: 21, condition: 'Partly Cloudy' },
        { day: 'Thu', temp: 20, condition: 'Cloudy' },
        { day: 'Fri', temp: 22, condition: 'Sunny' },
      ],
    },
    {
      city: 'Hyderabad',
      region: 'Sindh',
      temperature: 31,
      humidity: 75,
      rainfall_mm: 0,
      condition: 'Sunny',
      wind_speed: 16,
      forecast: [
        { day: 'Today', temp: 31, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 32, condition: 'Sunny' },
        { day: 'Wed', temp: 30, condition: 'Partly Cloudy' },
        { day: 'Thu', temp: 29, condition: 'Cloudy' },
        { day: 'Fri', temp: 31, condition: 'Sunny' },
      ],
    },
  ];

  // Filtered weather data based on search and region
  const filteredWeatherData = mockWeatherData.filter((weather) => {
    const matchesSearch = weather.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         weather.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === 'all' || weather.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const currentWeather = filteredWeatherData.find((w) => w.city === selectedCity) || filteredWeatherData[0] || mockWeatherData[0];

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
              <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                🌤️ Weather Intelligence
              </h1>
              <p className="text-(--color-text-secondary)">
                Real-time weather data and forecasts across Pakistan
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <ModernCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModernInput
                id="search-weather"
                label=""
                type="text"
                placeholder="Search by city or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
              <Select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Regions' },
                  { value: 'Punjab', label: 'Punjab' },
                  { value: 'Sindh', label: 'Sindh' },
                  { value: 'Khyber Pakhtunkhwa', label: 'Khyber Pakhtunkhwa' },
                  { value: 'Balochistan', label: 'Balochistan' },
                  { value: 'Islamabad Capital', label: 'Islamabad Capital' },
                ]}
              />
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                options={filteredWeatherData.map((w) => ({
                  value: w.city,
                  label: `${w.city}, ${w.region}`,
                }))}
              />
            </div>
          </ModernCard>

          {/* Interactive Pakistan Map */}
          <ModernCard>
            <h3 className="text-lg font-semibold text-(--color-text) mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-(--color-primary)" />
              Pakistan Weather Map - Interactive View
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Visualization */}
              <div className="lg:col-span-2">
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-[400px] border-2 border-(--color-border)">
                  {/* SVG-style map representation */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {/* Punjab Region */}
                      <div 
                        className={`relative p-6 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                          regionFilter === 'Punjab' || regionFilter === 'all' 
                            ? 'bg-amber-100 border-4 border-amber-400' 
                            : 'bg-gray-100 opacity-50'
                        }`}
                        onClick={() => setRegionFilter('Punjab')}
                      >
                        <div className="text-center">
                          <h4 className="font-bold text-lg mb-2">Punjab</h4>
                          <div className="text-3xl mb-2">🌾</div>
                          <div className="text-sm">
                            {mockWeatherData.filter(w => w.region === 'Punjab').map(w => (
                              <div key={w.city} className="flex items-center justify-between mb-1 bg-white rounded px-2 py-1">
                                <span className="font-medium">{w.city}</span>
                                <span className="font-bold text-amber-600">{w.temperature}°C</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Sindh Region */}
                      <div 
                        className={`relative p-6 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                          regionFilter === 'Sindh' || regionFilter === 'all' 
                            ? 'bg-blue-100 border-4 border-blue-400' 
                            : 'bg-gray-100 opacity-50'
                        }`}
                        onClick={() => setRegionFilter('Sindh')}
                      >
                        <div className="text-center">
                          <h4 className="font-bold text-lg mb-2">Sindh</h4>
                          <div className="text-3xl mb-2">🌊</div>
                          <div className="text-sm">
                            {mockWeatherData.filter(w => w.region === 'Sindh').map(w => (
                              <div key={w.city} className="flex items-center justify-between mb-1 bg-white rounded px-2 py-1">
                                <span className="font-medium">{w.city}</span>
                                <span className="font-bold text-blue-600">{w.temperature}°C</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* KPK Region */}
                      <div 
                        className={`relative p-6 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                          regionFilter === 'Khyber Pakhtunkhwa' || regionFilter === 'all' 
                            ? 'bg-green-100 border-4 border-green-400' 
                            : 'bg-gray-100 opacity-50'
                        }`}
                        onClick={() => setRegionFilter('Khyber Pakhtunkhwa')}
                      >
                        <div className="text-center">
                          <h4 className="font-bold text-lg mb-2">KPK</h4>
                          <div className="text-3xl mb-2">⛰️</div>
                          <div className="text-sm">
                            {mockWeatherData.filter(w => w.region === 'Khyber Pakhtunkhwa').map(w => (
                              <div key={w.city} className="flex items-center justify-between mb-1 bg-white rounded px-2 py-1">
                                <span className="font-medium">{w.city}</span>
                                <span className="font-bold text-green-600">{w.temperature}°C</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Balochistan Region */}
                      <div 
                        className={`relative p-6 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                          regionFilter === 'Balochistan' || regionFilter === 'all' 
                            ? 'bg-orange-100 border-4 border-orange-400' 
                            : 'bg-gray-100 opacity-50'
                        }`}
                        onClick={() => setRegionFilter('Balochistan')}
                      >
                        <div className="text-center">
                          <h4 className="font-bold text-lg mb-2">Balochistan</h4>
                          <div className="text-3xl mb-2">🏜️</div>
                          <div className="text-sm">
                            {mockWeatherData.filter(w => w.region === 'Balochistan').map(w => (
                              <div key={w.city} className="flex items-center justify-between mb-1 bg-white rounded px-2 py-1">
                                <span className="font-medium">{w.city}</span>
                                <span className="font-bold text-orange-600">{w.temperature}°C</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Islamabad marker in center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div 
                        className={`p-4 rounded-full cursor-pointer transition-all ${
                          regionFilter === 'Islamabad Capital' || regionFilter === 'all'
                            ? 'bg-red-200 border-4 border-red-500 shadow-lg'
                            : 'bg-gray-200 opacity-50'
                        }`}
                        onClick={() => setRegionFilter('Islamabad Capital')}
                      >
                        <div className="text-center">
                          <div className="text-2xl">🏛️</div>
                          <div className="text-xs font-bold mt-1">ICT</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Legend */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-(--color-text) mb-3">Region Color Codes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-amber-50 rounded border border-amber-200">
                      <div className="w-4 h-4 bg-amber-400 rounded"></div>
                      <span className="text-sm font-medium">Punjab (🌾)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="w-4 h-4 bg-blue-400 rounded"></div>
                      <span className="text-sm font-medium">Sindh (🌊)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                      <div className="w-4 h-4 bg-green-400 rounded"></div>
                      <span className="text-sm font-medium">KPK (⛰️)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded border border-orange-200">
                      <div className="w-4 h-4 bg-orange-400 rounded"></div>
                      <span className="text-sm font-medium">Balochistan (🏜️)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-200">
                      <div className="w-4 h-4 bg-red-400 rounded"></div>
                      <span className="text-sm font-medium">Islamabad (🏛️)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-(--color-surface-secondary) p-4 rounded-lg">
                  <h4 className="font-semibold text-(--color-text) mb-2">How to Use</h4>
                  <ul className="text-sm text-(--color-text-secondary) space-y-1">
                    <li>• Click on any region to filter</li>
                    <li>• Hover for interactive view</li>
                    <li>• Temperature shown for each city</li>
                    <li>• Real-time weather updates</li>
                  </ul>
                </div>

                <div className="bg-(--color-info-light) p-4 rounded-lg border border-(--color-info)">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-(--color-info) flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-(--color-info)">Interactive Map</p>
                      <p className="text-xs text-(--color-text-secondary) mt-1">
                        Click regions to view detailed weather data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>

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
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              {regionFilter === 'all' ? 'Pakistan Weather Overview' : `${regionFilter} Weather Overview`}
              {searchQuery && <span className="text-sm font-normal text-(--color-text-secondary) ml-2">
                (Showing results for "{searchQuery}")
              </span>}
            </h3>
            {filteredWeatherData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredWeatherData.map((weather) => (
                  <div
                    key={weather.city}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      weather.city === selectedCity
                        ? 'border-(--color-primary) bg-(--color-primary-subtle)'
                        : 'border-(--color-border) hover:border-(--color-primary)'
                    }`}
                    onClick={() => setSelectedCity(weather.city)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-(--color-text)">
                          {weather.city}
                        </h4>
                        <p className="text-xs text-(--color-text-secondary)">{weather.region}</p>
                      </div>
                      <div className="scale-75">
                        {getWeatherIcon(weather.condition)}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-(--color-text) mb-1">
                      {weather.temperature}°C
                    </p>
                    <Badge variant={getConditionColor(weather.condition)} size="sm">
                      {weather.condition}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-(--color-text-secondary)">
                  No cities found matching your search criteria.
                </p>
              </div>
            )}
          </ModernCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
