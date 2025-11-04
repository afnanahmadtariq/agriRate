// Core Types for AgriRate Platform

export type UserRole = 'admin' | 'farmer' | 'expert';
export type Language = 'en' | 'ur' | 'roman_ur';

// User & Authentication
export interface User {
  user_id: string;
  full_name: string;
  email?: string;
  phone_number: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FarmerProfile {
  farmer_id: string;
  region: string;
  city: string;
  farm_size_acres: number;
  main_crop: string;
  soil_type: string;
  irrigation_method: string;
  experience_years: number;
  created_at: string;
  updated_at: string;
}

// Market Rates
export interface MarketRate {
  rate_id: number;
  crop_name: string;
  category: 'Fruit' | 'Vegetable' | 'Grain';
  region: string;
  date: string;
  min_price: number;
  max_price: number;
  avg_price: number;
  source: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface MarketRateTrend {
  date: string;
  min_price: number;
  max_price: number;
  avg_price: number;
}

// Weather Data
export interface WeatherData {
  weather_id: number;
  city: string;
  region: string;
  temperature: number;
  humidity: number;
  rainfall_mm: number;
  condition: 'Sunny' | 'Rain' | 'Cloudy' | 'Partly Cloudy' | 'Stormy';
  wind_speed: number;
  data_source: string;
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

// AI Advice
export interface AIAdvice {
  advice_id: number;
  farmer_id: string;
  context_type: 'weather' | 'market' | 'crop_health' | 'custom';
  context_value: string;
  advice_text: string;
  confidence_score: number;
  generated_by: 'AI' | 'Expert' | 'RuleEngine';
  created_at: string;
  updated_at: string;
}

// Notifications
export interface Notification {
  notif_id: number;
  user_id: string;
  type: 'weather' | 'market' | 'advice' | 'system';
  title: string;
  message: string;
  is_read: boolean;
  sent_at: string;
  created_at: string;
  updated_at: string;
}

// Forum & Community
export interface ForumPost {
  _id: string;
  user_id: string;
  user_name?: string;
  title: string;
  body: string;
  category: string;
  language: Language;
  images?: string[];
  likes: number;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}

export interface Comment {
  comment_id: string;
  user_id: string;
  user_name?: string;
  comment_text: string;
  created_at: string;
  updated_at: string;
}

// Live Baithak
export interface BaithakMessage {
  _id: string;
  room_id: string;
  sender_id: string;
  sender_name?: string;
  message_text: string;
  audio_url?: string;
  language: Language;
  timestamp: string;
  created_at: string;
  updated_at: string;
}

export interface BaithakRoom {
  room_id: string;
  room_name: string;
  description: string;
  active_users: number;
  created_at: string;
}

// Admin Articles
export interface AdminArticle {
  article_id: number;
  author_id: string;
  author_name?: string;
  title: string;
  content: string;
  tags: string[];
  language: Language;
  created_at: string;
  updated_at: string;
}

// AgriMart Products (Phase 2)
export interface AgriMartProduct {
  product_id: number;
  seller_id: string;
  product_name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  region: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

// Farm Health Reports (Phase 2)
export interface FarmHealthReport {
  _id: string;
  farmer_id: string;
  crop_type: string;
  image_url: string;
  detected_issue: string;
  confidence: number;
  ai_recommendation: string;
  analysis_date: string;
  created_at: string;
  updated_at: string;
}

// AI Forecasts (Phase 2)
export interface AIForecast {
  _id: string;
  crop_name: string;
  region: string;
  prediction_date: string;
  forecast_data: {
    expected_price: number;
    confidence: number;
    trend: 'Rising' | 'Falling' | 'Stable';
    ai_reasoning: string;
  };
  model_version: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginFormData {
  phone_number: string;
  password: string;
}

export interface RegisterFormData {
  full_name: string;
  phone_number: string;
  email?: string;
  password: string;
  confirm_password: string;
  role: UserRole;
}

export interface MarketRateFormData {
  crop_name: string;
  category: 'Fruit' | 'Vegetable' | 'Grain';
  region: string;
  date: string;
  min_price: number;
  max_price: number;
}

export interface ForumPostFormData {
  title: string;
  body: string;
  category: string;
  language: Language;
  images?: FileList;
}

// Dashboard Stats
export interface DashboardStats {
  total_crops: number;
  avg_price: number;
  price_change_percentage: number;
  active_users: number;
  total_posts: number;
  weather_alerts: number;
}
