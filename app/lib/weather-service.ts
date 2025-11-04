import { WeatherData, WeatherAlert, HourlyForecast, SoilCondition } from '@/types';

// Mock weather data for development
export function getMockWeatherData(): WeatherData {
  return {
    current: {
      temp: 32,
      feelsLike: 35,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      icon: '⛅'
    },
    hourly: generateHourlyForecast(),
    alerts: getMockWeatherAlerts(),
    soil: {
      moisture: 45,
      temperature: 28,
      ph: 6.8,
      lastUpdated: new Date()
    }
  };
}

function generateHourlyForecast(): HourlyForecast[] {
  const forecast: HourlyForecast[] = [];
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    forecast.push({
      time: time.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }),
      temp: 28 + Math.random() * 8,
      humidity: 55 + Math.random() * 20,
      precipitation: Math.random() * 30,
      condition: i % 3 === 0 ? 'Cloudy' : 'Clear',
      icon: i % 3 === 0 ? '☁️' : '☀️'
    });
  }

  return forecast;
}

function getMockWeatherAlerts(): WeatherAlert[] {
  return [
    {
      id: '1',
      type: 'rain',
      severity: 'medium',
      title: 'Heavy Rain Expected',
      titleUrdu: 'شدید بارش متوقع ہے',
      description: 'Heavy rainfall expected in the next 24 hours',
      affectedCrops: ['Wheat', 'Cotton', 'Rice'],
      recommendations: [
        'Ensure proper drainage in fields',
        'Delay fertilizer application',
        'Protect seedlings from waterlogging'
      ],
      startTime: new Date(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'heat',
      severity: 'high',
      title: 'High Temperature Alert',
      titleUrdu: 'زیادہ درجہ حرارت کی انتباہ',
      description: 'Temperature expected to exceed 40°C',
      affectedCrops: ['Vegetables', 'Tomatoes', 'Peppers'],
      recommendations: [
        'Increase irrigation frequency',
        'Apply mulch to retain moisture',
        'Provide shade for sensitive crops'
      ],
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  ];
}

// Generate weather-based farming recommendations
export function getWeatherRecommendations(weatherData: WeatherData): string[] {
  const recommendations: string[] = [];

  if (weatherData.current.temp > 35) {
    recommendations.push('High temperature - Increase irrigation frequency');
  }

  if (weatherData.current.humidity > 70) {
    recommendations.push('High humidity - Monitor for fungal diseases');
  }

  if (weatherData.soil && weatherData.soil.moisture < 30) {
    recommendations.push('Low soil moisture - Water your crops immediately');
  }

  if (weatherData.alerts.some(alert => alert.type === 'rain')) {
    recommendations.push('Rain expected - Ensure proper drainage');
  }

  return recommendations;
}

// Calculate irrigation needs based on weather
export function calculateIrrigationNeeds(
  temp: number,
  humidity: number,
  soilMoisture: number
): { amount: number; frequency: string; urgency: 'low' | 'medium' | 'high' } {
  let amount = 0;
  let frequency = 'normal';
  let urgency: 'low' | 'medium' | 'high' = 'low';

  // Base calculation on temperature
  if (temp > 35) {
    amount = 50;
    frequency = 'twice daily';
    urgency = 'high';
  } else if (temp > 30) {
    amount = 35;
    frequency = 'daily';
    urgency = 'medium';
  } else {
    amount = 25;
    frequency = 'every 2 days';
    urgency = 'low';
  }

  // Adjust for humidity
  if (humidity < 40) {
    amount += 10;
  } else if (humidity > 70) {
    amount -= 5;
  }

  // Adjust for soil moisture
  if (soilMoisture < 30) {
    amount += 15;
    urgency = 'high';
  } else if (soilMoisture > 60) {
    amount -= 10;
    urgency = 'low';
  }

  return { amount: Math.max(amount, 0), frequency, urgency };
}

// Get crop-specific weather advice
export function getCropWeatherAdvice(crop: string, weatherData: WeatherData): string[] {
  const advice: string[] = [];
  const { temp, humidity } = weatherData.current;

  const cropAdvice: Record<string, any> = {
    wheat: {
      highTemp: 'Wheat prefers cooler temperatures. Consider planting in winter season.',
      lowHumidity: 'Wheat is drought-tolerant but needs adequate moisture during grain filling.',
      highHumidity: 'Monitor for rust diseases in high humidity conditions.'
    },
    rice: {
      highTemp: 'Rice thrives in warm conditions. Ensure adequate water supply.',
      lowHumidity: 'Maintain flooded conditions for paddy rice cultivation.',
      highHumidity: 'Ideal conditions for rice. Monitor for blast disease.'
    },
    cotton: {
      highTemp: 'Cotton tolerates heat well. Ensure deep watering.',
      lowHumidity: 'Low humidity may affect boll development. Monitor closely.',
      highHumidity: 'Watch for bollworm and other pests in humid conditions.'
    }
  };

  const cropKey = crop.toLowerCase();

  if (cropAdvice[cropKey]) {
    if (temp > 35) advice.push(cropAdvice[cropKey].highTemp);
    if (humidity < 40) advice.push(cropAdvice[cropKey].lowHumidity);
    if (humidity > 70) advice.push(cropAdvice[cropKey].highHumidity);
  }

  return advice.length > 0 ? advice : ['Weather conditions are suitable for this crop.'];
}
