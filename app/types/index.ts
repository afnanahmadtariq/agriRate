// Core application types for AgriRate

export type Language = 'en' | 'ur' | 'roman';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'farmer' | 'admin';
  profileImage?: string;
  region?: string;
  district?: string;
  location?: string;
  crops?: string[];
  farmSize?: number;
  language?: Language;
  communicationMethod?: 'sms' | 'whatsapp' | 'call';
  createdAt: Date;
}

export interface PriceItem {
  id: string;
  commodity: string;
  commodityUrdu?: string;
  price: number;
  unit: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  market: string;
  region: string;
  date: Date;
  supply?: 'high' | 'medium' | 'low';
  demand?: 'high' | 'medium' | 'low';
}

export interface Market {
  id: string;
  name: string;
  nameUrdu?: string;
  region: string;
  district?: string;
  location?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface PriceEntry {
  id: string;
  marketId: string;
  commodity: string;
  price: number;
  unit: string;
  date: Date;
  enteredBy: string;
  validated?: boolean;
  anomaly?: boolean;
  anomalyReason?: string;
}

export interface Task {
  id: string;
  title: string;
  titleUrdu?: string;
  description?: string;
  category: 'irrigation' | 'pestControl' | 'fertilizer' | 'harvest' | 'preparation' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  checklist?: ChecklistItem[];
  userId: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  };
  hourly: HourlyForecast[];
  alerts: WeatherAlert[];
  soil?: SoilCondition;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  humidity: number;
  precipitation: number;
  condition: string;
  icon: string;
}

export interface WeatherAlert {
  id: string;
  type: 'rain' | 'heat' | 'cold' | 'storm' | 'frost';
  severity: 'low' | 'medium' | 'high';
  title: string;
  titleUrdu?: string;
  description: string;
  affectedCrops: string[];
  recommendations: string[];
  startTime: Date;
  endTime: Date;
}

export interface SoilCondition {
  moisture: number;
  temperature: number;
  ph: number;
  lastUpdated: Date;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: Language;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  category: 'question' | 'tip' | 'success' | 'issue';
  categoryUrdu?: string;
  likes: number;
  replies: number;
  views: number;
  createdAt: Date;
  tags?: string[];
  language?: Language;
}

export interface ForumReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface VoiceQuery {
  id: string;
  query: string;
  response: string;
  language: Language;
  timestamp: Date;
}

export interface PriceAnalytics {
  commodity: string;
  data: PriceTrend[];
  average: number;
  min: number;
  max: number;
  volatility: number;
}

export interface PriceTrend {
  date: string;
  price: number;
  market?: string;
}

export interface Achievement {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Activity {
  id: string;
  type: 'task' | 'post' | 'price-check' | 'weather-check';
  description: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'price-alert' | 'weather-alert' | 'task-reminder' | 'forum-reply';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

// Translation type for multi-language support
export interface Translation {
  en: string;
  ur: string;
  roman: string;
}
