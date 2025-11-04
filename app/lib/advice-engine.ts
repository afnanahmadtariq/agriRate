import { PriceItem, WeatherData } from '@/types';

export interface SmartAdvice {
  id: string;
  type: 'price' | 'weather' | 'task' | 'general';
  priority: 'high' | 'medium' | 'low';
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  actionable: boolean;
  actions?: string[];
}

// Generate smart advice based on price and weather data
export function generateSmartAdvice(
  prices: PriceItem[],
  weather?: WeatherData
): SmartAdvice[] {
  const advice: SmartAdvice[] = [];

  // Price-based advice
  advice.push(...generatePriceAdvice(prices));

  // Weather-based advice
  if (weather) {
    advice.push(...generateWeatherAdvice(weather));
  }

  // General farming advice
  advice.push(...generateGeneralAdvice());

  return advice.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

function generatePriceAdvice(prices: PriceItem[]): SmartAdvice[] {
  const advice: SmartAdvice[] = [];

  prices.forEach(item => {
    // High price advice
    if (item.change && item.change > 15) {
      advice.push({
        id: `price-high-${item.id}`,
        type: 'price',
        priority: 'high',
        title: `Good time to sell ${item.commodity}`,
        titleUrdu: `${item.commodityUrdu || item.commodity} فروخت کرنے کا اچھا وقت`,
        description: `${item.commodity} prices have increased by ${item.change.toFixed(1)}%. Consider selling your stock.`,
        descriptionUrdu: `${item.commodityUrdu || item.commodity} کی قیمتیں ${item.change.toFixed(1)}% بڑھ گئی ہیں۔ اپنا سٹاک فروخت کرنے پر غور کریں۔`,
        actionable: true,
        actions: ['Check market', 'Contact buyers', 'Transport to market']
      });
    }

    // Low price warning
    if (item.change && item.change < -10) {
      advice.push({
        id: `price-low-${item.id}`,
        type: 'price',
        priority: 'medium',
        title: `Price drop alert for ${item.commodity}`,
        titleUrdu: `${item.commodityUrdu || item.commodity} کی قیمت میں کمی`,
        description: `${item.commodity} prices have dropped by ${Math.abs(item.change).toFixed(1)}%. Hold if possible.`,
        descriptionUrdu: `${item.commodityUrdu || item.commodity} کی قیمتیں ${Math.abs(item.change).toFixed(1)}% کم ہوئی ہیں۔ ممکن ہو تو انتظار کریں۔`,
        actionable: true,
        actions: ['Wait for better prices', 'Check storage options', 'Monitor trends']
      });
    }

    // High demand advice
    if (item.demand === 'high' && item.supply === 'low') {
      advice.push({
        id: `demand-${item.id}`,
        type: 'price',
        priority: 'high',
        title: `High demand for ${item.commodity}`,
        titleUrdu: `${item.commodityUrdu || item.commodity} کی زیادہ مانگ`,
        description: `Market demand for ${item.commodity} is high. Excellent selling opportunity.`,
        descriptionUrdu: `${item.commodityUrdu || item.commodity} کی مارکیٹ میں زیادہ مانگ ہے۔ فروخت کا بہترین موقع۔`,
        actionable: true,
        actions: ['Sell immediately', 'Negotiate better prices', 'Contact multiple buyers']
      });
    }
  });

  return advice;
}

function generateWeatherAdvice(weather: WeatherData): SmartAdvice[] {
  const advice: SmartAdvice[] = [];
  const { current, alerts, soil } = weather;

  // Temperature advice
  if (current.temp > 38) {
    advice.push({
      id: 'weather-heat',
      type: 'weather',
      priority: 'high',
      title: 'Extreme heat warning',
      titleUrdu: 'شدید گرمی کی وارننگ',
      description: 'Temperatures exceeding 38°C. Take immediate action to protect crops.',
      descriptionUrdu: 'درجہ حرارت 38°C سے زیادہ ہے۔ فصلوں کی حفاظت کے لیے فوری اقدامات کریں۔',
      actionable: true,
      actions: ['Increase irrigation', 'Apply mulch', 'Provide shade', 'Spray water on leaves']
    });
  }

  // Soil moisture advice
  if (soil && soil.moisture < 30) {
    advice.push({
      id: 'weather-soil',
      type: 'weather',
      priority: 'high',
      title: 'Low soil moisture detected',
      titleUrdu: 'مٹی میں نمی کم ہے',
      description: `Soil moisture at ${soil.moisture}%. Immediate irrigation required.`,
      descriptionUrdu: `مٹی میں نمی ${soil.moisture}% ہے۔ فوری پانی دینے کی ضرورت ہے۔`,
      actionable: true,
      actions: ['Start irrigation', 'Check irrigation system', 'Add organic matter']
    });
  }

  // Weather alerts
  alerts.forEach(alert => {
    advice.push({
      id: `alert-${alert.id}`,
      type: 'weather',
      priority: alert.severity === 'high' ? 'high' : 'medium',
      title: alert.title,
      titleUrdu: alert.titleUrdu,
      description: `${alert.description}. Affected crops: ${alert.affectedCrops.join(', ')}`,
      descriptionUrdu: alert.titleUrdu,
      actionable: true,
      actions: alert.recommendations
    });
  });

  return advice;
}

function generateGeneralAdvice(): SmartAdvice[] {
  const currentMonth = new Date().getMonth();
  const advice: SmartAdvice[] = [];

  // Seasonal advice
  const seasonalAdvice: Record<number, SmartAdvice> = {
    0: { // January
      id: 'season-jan',
      type: 'general',
      priority: 'low',
      title: 'Winter crop care',
      titleUrdu: 'سردیوں کی فصلوں کی دیکھ بھال',
      description: 'Ideal time for wheat and rabi crops. Monitor for frost damage.',
      descriptionUrdu: 'گندم اور ربیع کی فصلوں کے لیے بہترین وقت۔ پالے سے نقصان کی نگرانی کریں۔',
      actionable: false
    },
    3: { // April
      id: 'season-apr',
      type: 'general',
      priority: 'low',
      title: 'Prepare for summer crops',
      titleUrdu: 'گرمیوں کی فصلوں کی تیاری',
      description: 'Start preparing fields for cotton, rice, and summer vegetables.',
      descriptionUrdu: 'کپاس، چاول، اور گرمیوں کی سبزیوں کے لیے کھیتوں کی تیاری شروع کریں۔',
      actionable: true,
      actions: ['Prepare land', 'Arrange seeds', 'Plan irrigation']
    },
    9: { // October
      id: 'season-oct',
      type: 'general',
      priority: 'low',
      title: 'Rabi season planting',
      titleUrdu: 'ربیع کی بوائی کا موسم',
      description: 'Best time to sow wheat, barley, and winter vegetables.',
      descriptionUrdu: 'گندم، جو، اور سردیوں کی سبزیوں کی بوائی کا بہترین وقت۔',
      actionable: true,
      actions: ['Sow seeds', 'Apply base fertilizer', 'Prepare irrigation']
    }
  };

  if (seasonalAdvice[currentMonth]) {
    advice.push(seasonalAdvice[currentMonth]);
  }

  return advice;
}

// KhetBot response engine
export function getKhetBotResponse(query: string, language: 'en' | 'ur' = 'en'): string {
  const lowerQuery = query.toLowerCase();

  const responses: Record<string, { en: string; ur: string }> = {
    pest: {
      en: "For pest control:\n• Inspect crops regularly\n• Use neem oil spray as natural pesticide\n• Maintain field hygiene\n• Rotate crops to break pest cycles\n• Consider biological controls like beneficial insects",
      ur: "کیڑوں سے بچاؤ کے لیے:\n• باقاعدگی سے فصلوں کی جانچ کریں\n• نیم کے تیل کا قدرتی کیڑے مار دوا کے طور پر استعمال کریں\n• کھیت کی صفائی رکھیں\n• فصلوں کی تبدیلی کریں\n• فائدہ مند کیڑوں کا استعمال کریں"
    },
    irrigation: {
      en: "Irrigation tips:\n• Water early morning or evening\n• Use drip irrigation to save water\n• Check soil moisture before watering\n• Avoid overwatering to prevent root rot\n• Mulch to retain moisture",
      ur: "آبپاشی کے نکات:\n• صبح سویرے یا شام کو پانی دیں\n• ڈرپ ایریگیشن استعمال کریں\n• پانی دینے سے پہلے مٹی کی نمی چیک کریں\n• زیادہ پانی سے بچیں\n• نمی برقرار رکھنے کے لیے ملچ استعمال کریں"
    },
    fertilizer: {
      en: "Fertilizer guidance:\n• Use NPK based on soil test\n• Apply organic manure for soil health\n• Split fertilizer application\n• Apply during cool hours\n• Water after application",
      ur: "کھاد کی رہنمائی:\n• مٹی کے ٹیسٹ کی بنیاد پر NPK استعمال کریں\n• نامیاتی کھاد استعمال کریں\n• کھاد تقسیم کر کے ڈالیں\n• ٹھنڈے اوقات میں ڈالیں\n• ڈالنے کے بعد پانی دیں"
    },
    crop: {
      en: "Crop protection:\n• Monitor for diseases regularly\n• Remove infected plants immediately\n• Ensure proper spacing\n• Use disease-resistant varieties\n• Practice crop rotation",
      ur: "فصل کی حفاظت:\n• بیماریوں کی باقاعدہ نگرانی کریں\n• متاثرہ پودے فوری ہٹائیں\n• مناسب فاصلہ رکھیں\n• بیماری سے مزاحم اقسام استعمال کریں\n• فصلوں کی تبدیلی کریں"
    }
  };

  // Match query to response
  for (const [key, value] of Object.entries(responses)) {
    if (lowerQuery.includes(key)) {
      return value[language];
    }
  }

  // Urdu specific queries
  if (lowerQuery.includes('کیڑے') || lowerQuery.includes('کیٹ')) {
    return responses.pest.ur;
  }
  if (lowerQuery.includes('پانی') || lowerQuery.includes('آبپاشی')) {
    return responses.irrigation.ur;
  }
  if (lowerQuery.includes('کھاد')) {
    return responses.fertilizer.ur;
  }

  // Default response
  return language === 'ur'
    ? "میں آپ کی مدد کے لیے حاضر ہوں۔ براہ کرم مخصوص سوال پوچھیں جیسے کیڑوں سے بچاؤ، پانی، یا کھاد کے بارے میں۔"
    : "I'm here to help! Please ask specific questions about pest control, irrigation, fertilizer, or crop protection.";
}
