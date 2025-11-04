import { api } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  FarmerProfile,
  MarketRate,
  WeatherData,
  AIAdvice,
  Notification,
  ForumPost,
  BaithakRoom,
  BaithakMessage,
  AdminArticle,
  DashboardStats,
  LoginFormData,
  RegisterFormData,
  MarketRateFormData,
  ForumPostFormData,
} from '@/app/types';

// ========== Authentication ==========
export const authApi = {
  login: (data: LoginFormData) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', data),

  register: (data: RegisterFormData) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', data),

  logout: () => api.post<ApiResponse<null>>('/auth/logout'),

  getCurrentUser: () => api.get<ApiResponse<User>>('/auth/me'),

  updateProfile: (data: Partial<User>) =>
    api.patch<ApiResponse<User>>('/auth/profile', data),
};

// ========== Farmer Profile ==========
export const farmerApi = {
  getProfile: (farmerId: string) =>
    api.get<ApiResponse<FarmerProfile>>(`/farmers/${farmerId}`),

  updateProfile: (farmerId: string, data: Partial<FarmerProfile>) =>
    api.patch<ApiResponse<FarmerProfile>>(`/farmers/${farmerId}`, data),
};

// ========== Market Rates ==========
export const marketApi = {
  getRates: (params?: {
    crop?: string;
    region?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }) => api.get<PaginatedResponse<MarketRate>>('/market/rates', { params }),

  getRateById: (rateId: number) =>
    api.get<ApiResponse<MarketRate>>(`/market/rates/${rateId}`),

  getTrends: (crop: string, region: string, days: number = 7) =>
    api.get<ApiResponse<MarketRate[]>>('/market/trends', {
      params: { crop, region, days },
    }),

  compareCrops: (crops: string[], region: string) =>
    api.get<ApiResponse<{ [crop: string]: MarketRate[] }>>('/market/compare', {
      params: { crops: crops.join(','), region },
    }),

  createRate: (data: MarketRateFormData) =>
    api.post<ApiResponse<MarketRate>>('/market/rates', data),

  updateRate: (rateId: number, data: Partial<MarketRateFormData>) =>
    api.patch<ApiResponse<MarketRate>>(`/market/rates/${rateId}`, data),

  deleteRate: (rateId: number) =>
    api.delete<ApiResponse<null>>(`/market/rates/${rateId}`),
};

// ========== Weather ==========
export const weatherApi = {
  getWeatherByCity: (city: string) =>
    api.get<ApiResponse<WeatherData>>('/weather/city', { params: { name: city } }),

  getWeatherByRegion: (region: string) =>
    api.get<ApiResponse<WeatherData[]>>('/weather/region', { params: { region } }),

  getAllWeather: () =>
    api.get<ApiResponse<WeatherData[]>>('/weather/all'),
};

// ========== AI Advice ==========
export const adviceApi = {
  generateAdvice: (context?: { crop?: string; region?: string }) =>
    api.post<ApiResponse<AIAdvice>>('/advice/generate', context),

  getAdviceHistory: (farmerId: string, limit: number = 10) =>
    api.get<ApiResponse<AIAdvice[]>>(`/advice/history/${farmerId}`, {
      params: { limit },
    }),

  getAdviceById: (adviceId: number) =>
    api.get<ApiResponse<AIAdvice>>(`/advice/${adviceId}`),
};

// ========== Notifications ==========
export const notificationApi = {
  getNotifications: (userId: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Notification>>(`/notifications/${userId}`, { params }),

  markAsRead: (notifId: number) =>
    api.patch<ApiResponse<Notification>>(`/notifications/${notifId}/read`),

  markAllAsRead: (userId: string) =>
    api.patch<ApiResponse<null>>(`/notifications/${userId}/read-all`),

  deleteNotification: (notifId: number) =>
    api.delete<ApiResponse<null>>(`/notifications/${notifId}`),
};

// ========== Forum ==========
export const forumApi = {
  getPosts: (params?: {
    category?: string;
    language?: string;
    page?: number;
    limit?: number;
  }) => api.get<PaginatedResponse<ForumPost>>('/forum/posts', { params }),

  getPostById: (postId: string) =>
    api.get<ApiResponse<ForumPost>>(`/forum/posts/${postId}`),

  createPost: (data: ForumPostFormData) =>
    api.post<ApiResponse<ForumPost>>('/forum/posts', data),

  updatePost: (postId: string, data: Partial<ForumPostFormData>) =>
    api.patch<ApiResponse<ForumPost>>(`/forum/posts/${postId}`, data),

  deletePost: (postId: string) =>
    api.delete<ApiResponse<null>>(`/forum/posts/${postId}`),

  likePost: (postId: string) =>
    api.post<ApiResponse<ForumPost>>(`/forum/posts/${postId}/like`),

  addComment: (postId: string, commentText: string) =>
    api.post<ApiResponse<ForumPost>>(`/forum/posts/${postId}/comments`, {
      comment_text: commentText,
    }),

  deleteComment: (postId: string, commentId: string) =>
    api.delete<ApiResponse<ForumPost>>(
      `/forum/posts/${postId}/comments/${commentId}`
    ),
};

// ========== Live Baithak ==========
export const baithakApi = {
  getRooms: () => api.get<ApiResponse<BaithakRoom[]>>('/baithak/rooms'),

  getRoomById: (roomId: string) =>
    api.get<ApiResponse<BaithakRoom>>(`/baithak/rooms/${roomId}`),

  getMessages: (roomId: string, limit: number = 50) =>
    api.get<ApiResponse<BaithakMessage[]>>(`/baithak/rooms/${roomId}/messages`, {
      params: { limit },
    }),

  createRoom: (data: { room_name: string; description: string }) =>
    api.post<ApiResponse<BaithakRoom>>('/baithak/rooms', data),
};

// ========== Admin Articles ==========
export const articlesApi = {
  getArticles: (params?: {
    language?: string;
    page?: number;
    limit?: number;
  }) => api.get<PaginatedResponse<AdminArticle>>('/articles', { params }),

  getArticleById: (articleId: number) =>
    api.get<ApiResponse<AdminArticle>>(`/articles/${articleId}`),

  createArticle: (data: Omit<AdminArticle, 'article_id' | 'created_at' | 'updated_at'>) =>
    api.post<ApiResponse<AdminArticle>>('/articles', data),

  updateArticle: (
    articleId: number,
    data: Partial<Omit<AdminArticle, 'article_id' | 'created_at' | 'updated_at'>>
  ) => api.patch<ApiResponse<AdminArticle>>(`/articles/${articleId}`, data),

  deleteArticle: (articleId: number) =>
    api.delete<ApiResponse<null>>(`/articles/${articleId}`),
};

// ========== Dashboard Stats ==========
export const dashboardApi = {
  getAdminStats: () =>
    api.get<ApiResponse<DashboardStats>>('/dashboard/admin/stats'),

  getFarmerStats: (farmerId: string) =>
    api.get<ApiResponse<DashboardStats>>(`/dashboard/farmer/${farmerId}/stats`),
};
