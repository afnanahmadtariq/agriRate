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
  
  changePassword: (data: { current_password: string; new_password: string }) =>
    api.post<ApiResponse<null>>('/auth/change-password', data),
  
  forgotPassword: (phone_number: string) =>
    api.post<ApiResponse<null>>('/auth/forgot-password', { phone_number }),
  
  resetPassword: (data: { token: string; new_password: string }) =>
    api.post<ApiResponse<null>>('/auth/reset-password', data),
  
  verifyPhone: (data: { phone_number: string; otp: string }) =>
    api.post<ApiResponse<{ verified: boolean }>>('/auth/verify-phone', data),
};

// ========== Farmer Profile ==========
export const farmerApi = {
  getProfile: (farmerId: string) =>
    api.get<ApiResponse<FarmerProfile>>(`/farmers/${farmerId}`),

  updateProfile: (farmerId: string, data: Partial<FarmerProfile>) =>
    api.patch<ApiResponse<FarmerProfile>>(`/farmers/${farmerId}`, data),
  
  createProfile: (farmerId: string, data: Omit<FarmerProfile, 'farmer_id' | 'created_at' | 'updated_at'>) =>
    api.post<ApiResponse<FarmerProfile>>(`/farmers/${farmerId}`, data),
  
  getAllFarmers: (params?: { region?: string; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<FarmerProfile & { user: User }>>('/farmers', { params }),
};

// ========== Market Rates ==========
export const marketApi = {
  getRates: (params?: {
    crop?: string;
    category?: 'Fruit' | 'Vegetable' | 'Grain';
    region?: string;
    market?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
    sort?: 'date' | 'price' | 'crop';
    order?: 'asc' | 'desc';
  }) => api.get<PaginatedResponse<MarketRate>>('/market/rates', { params }),

  getRateById: (rateId: number) =>
    api.get<ApiResponse<MarketRate>>(`/market/rates/${rateId}`),

  getTrends: (crop: string, region: string, days: number = 7) =>
    api.get<ApiResponse<MarketRate[]>>('/market/trends', {
      params: { crop, region, days },
    }),

  compareCrops: (crops: string[], region: string, days: number = 7) =>
    api.get<ApiResponse<{ [crop: string]: MarketRate[] }>>('/market/compare', {
      params: { crops: crops.join(','), region, days },
    }),

  createRate: (data: MarketRateFormData) =>
    api.post<ApiResponse<MarketRate>>('/market/rates', data),

  updateRate: (rateId: number, data: Partial<MarketRateFormData>) =>
    api.patch<ApiResponse<MarketRate>>(`/market/rates/${rateId}`, data),

  deleteRate: (rateId: number) =>
    api.delete<ApiResponse<null>>(`/market/rates/${rateId}`),
  
  getMarketsByRegion: (region: string) =>
    api.get<ApiResponse<string[]>>('/market/markets', { params: { region } }),
  
  getAllRegions: () =>
    api.get<ApiResponse<string[]>>('/market/regions'),
  
  getCropCategories: () =>
    api.get<ApiResponse<{ category: string; crops: string[] }[]>>('/market/categories'),
  
  getLatestRates: (limit: number = 10) =>
    api.get<ApiResponse<MarketRate[]>>('/market/rates/latest', { params: { limit } }),
  
  searchCrops: (query: string) =>
    api.get<ApiResponse<string[]>>('/market/crops/search', { params: { q: query } }),
};

// ========== Weather ==========
export const weatherApi = {
  getWeatherByCity: (city: string) =>
    api.get<ApiResponse<WeatherData>>('/weather/city', { params: { name: city } }),

  getWeatherByRegion: (region: string) =>
    api.get<ApiResponse<WeatherData[]>>('/weather/region', { params: { region } }),

  getAllWeather: (params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<WeatherData>>('/weather/all', { params }),
  
  getWeatherForecast: (city: string, days: number = 7) =>
    api.get<ApiResponse<WeatherData[]>>('/weather/forecast', { params: { city, days } }),
  
  getWeatherAlerts: (region?: string) =>
    api.get<ApiResponse<{ alert_type: string; severity: string; message: string; region: string }[]>>('/weather/alerts', { params: { region } }),
  
  getCurrentWeather: () =>
    api.get<ApiResponse<WeatherData[]>>('/weather/current'),
  
  getRegionalWeather: () =>
    api.get<ApiResponse<{ [region: string]: WeatherData[] }>>('/weather/regional'),
};

// ========== AI Advice ==========
export const adviceApi = {
  generateAdvice: (context?: { crop?: string; region?: string; issue?: string; custom_query?: string }) =>
    api.post<ApiResponse<AIAdvice>>('/advice/generate', context),

  getAdviceHistory: (farmerId: string, params?: { limit?: number; page?: number; context_type?: string }) =>
    api.get<PaginatedResponse<AIAdvice>>(`/advice/history/${farmerId}`, { params }),

  getAdviceById: (adviceId: number) =>
    api.get<ApiResponse<AIAdvice>>(`/advice/${adviceId}`),
  
  deleteAdvice: (adviceId: number) =>
    api.delete<ApiResponse<null>>(`/advice/${adviceId}`),
  
  rateAdvice: (adviceId: number, rating: number) =>
    api.post<ApiResponse<AIAdvice>>(`/advice/${adviceId}/rate`, { rating }),
  
  getRecentAdvice: (limit: number = 10) =>
    api.get<ApiResponse<AIAdvice[]>>('/advice/recent', { params: { limit } }),
};

// ========== Notifications ==========
export const notificationApi = {
  getNotifications: (userId: string, params?: { page?: number; limit?: number; type?: string; is_read?: boolean }) =>
    api.get<PaginatedResponse<Notification>>(`/notifications/${userId}`, { params }),

  markAsRead: (notifId: number) =>
    api.patch<ApiResponse<Notification>>(`/notifications/${notifId}/read`),

  markAllAsRead: (userId: string) =>
    api.patch<ApiResponse<null>>(`/notifications/${userId}/read-all`),

  deleteNotification: (notifId: number) =>
    api.delete<ApiResponse<null>>(`/notifications/${notifId}`),
  
  deleteAllNotifications: (userId: string) =>
    api.delete<ApiResponse<null>>(`/notifications/${userId}/all`),
  
  getUnreadCount: (userId: string) =>
    api.get<ApiResponse<{ count: number }>>(`/notifications/${userId}/unread-count`),
  
  createNotification: (data: { user_id: string; type: string; title: string; message: string }) =>
    api.post<ApiResponse<Notification>>('/notifications', data),
};

// ========== Forum ==========
export const forumApi = {
  getPosts: (params?: {
    category?: string;
    language?: string;
    user_id?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: 'latest' | 'popular' | 'oldest';
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
  
  unlikePost: (postId: string) =>
    api.delete<ApiResponse<ForumPost>>(`/forum/posts/${postId}/like`),

  addComment: (postId: string, commentText: string) =>
    api.post<ApiResponse<ForumPost>>(`/forum/posts/${postId}/comments`, {
      comment_text: commentText,
    }),

  deleteComment: (postId: string, commentId: string) =>
    api.delete<ApiResponse<ForumPost>>(
      `/forum/posts/${postId}/comments/${commentId}`
    ),
  
  updateComment: (postId: string, commentId: string, commentText: string) =>
    api.patch<ApiResponse<ForumPost>>(
      `/forum/posts/${postId}/comments/${commentId}`,
      { comment_text: commentText }
    ),
  
  getPostsByUser: (userId: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<ForumPost>>(`/forum/users/${userId}/posts`, { params }),
  
  getPopularPosts: (limit: number = 10) =>
    api.get<ApiResponse<ForumPost[]>>('/forum/posts/popular', { params: { limit } }),
  
  getTrendingTopics: () =>
    api.get<ApiResponse<{ category: string; count: number }[]>>('/forum/trending'),
  
  reportPost: (postId: string, reason: string) =>
    api.post<ApiResponse<null>>(`/forum/posts/${postId}/report`, { reason }),
};

// ========== Live Baithak ==========
export const baithakApi = {
  getRooms: (params?: { search?: string; page?: number; limit?: number }) => 
    api.get<PaginatedResponse<BaithakRoom>>('/baithak/rooms', { params }),

  getRoomById: (roomId: string) =>
    api.get<ApiResponse<BaithakRoom>>(`/baithak/rooms/${roomId}`),

  getMessages: (roomId: string, params?: { limit?: number; before?: string; after?: string }) =>
    api.get<ApiResponse<BaithakMessage[]>>(`/baithak/rooms/${roomId}/messages`, { params }),

  createRoom: (data: { room_name: string; description: string }) =>
    api.post<ApiResponse<BaithakRoom>>('/baithak/rooms', data),
  
  updateRoom: (roomId: string, data: { room_name?: string; description?: string }) =>
    api.patch<ApiResponse<BaithakRoom>>(`/baithak/rooms/${roomId}`, data),
  
  deleteRoom: (roomId: string) =>
    api.delete<ApiResponse<null>>(`/baithak/rooms/${roomId}`),
  
  sendMessage: (roomId: string, data: { message_text: string; language?: string; audio_url?: string }) =>
    api.post<ApiResponse<BaithakMessage>>(`/baithak/rooms/${roomId}/messages`, data),
  
  deleteMessage: (roomId: string, messageId: string) =>
    api.delete<ApiResponse<null>>(`/baithak/rooms/${roomId}/messages/${messageId}`),
  
  joinRoom: (roomId: string) =>
    api.post<ApiResponse<null>>(`/baithak/rooms/${roomId}/join`),
  
  leaveRoom: (roomId: string) =>
    api.post<ApiResponse<null>>(`/baithak/rooms/${roomId}/leave`),
  
  getRoomMembers: (roomId: string) =>
    api.get<ApiResponse<User[]>>(`/baithak/rooms/${roomId}/members`),
  
  translateMessage: (messageId: string, targetLanguage: string) =>
    api.post<ApiResponse<{ translated_text: string }>>(`/baithak/messages/${messageId}/translate`, { target_language: targetLanguage }),
};

// ========== Admin Articles ==========
export const articlesApi = {
  getArticles: (params?: {
    language?: string;
    author_id?: string;
    tags?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: 'latest' | 'oldest';
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
  
  getArticlesByAuthor: (authorId: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<AdminArticle>>(`/articles/author/${authorId}`, { params }),
  
  searchArticles: (query: string, params?: { language?: string; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<AdminArticle>>('/articles/search', { params: { q: query, ...params } }),
  
  getPopularArticles: (limit: number = 10) =>
    api.get<ApiResponse<AdminArticle[]>>('/articles/popular', { params: { limit } }),
  
  getArticlesByTag: (tag: string, params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<AdminArticle>>('/articles/tags', { params: { tag, ...params } }),
};

// ========== Dashboard Stats ==========
export const dashboardApi = {
  getAdminStats: () =>
    api.get<ApiResponse<DashboardStats>>('/dashboard/admin/stats'),

  getFarmerStats: (farmerId: string) =>
    api.get<ApiResponse<DashboardStats>>(`/dashboard/farmer/${farmerId}/stats`),
  
  getSystemHealth: () =>
    api.get<ApiResponse<{ status: string; uptime: number; database: string; api: string }>>('/dashboard/health'),
  
  getUserActivity: (params?: { from?: string; to?: string; role?: string }) =>
    api.get<ApiResponse<{ date: string; count: number }[]>>('/dashboard/activity', { params }),
  
  getRevenueStats: (params?: { from?: string; to?: string }) =>
    api.get<ApiResponse<{ total: number; breakdown: Record<string, number> }>>('/dashboard/revenue', { params }),
};

// ========== Admin - User Management ==========
export const adminUserApi = {
  getAllUsers: (params?: { 
    role?: string; 
    is_active?: boolean; 
    search?: string;
    page?: number; 
    limit?: number;
    sort?: 'name' | 'date' | 'role';
    order?: 'asc' | 'desc';
  }) => api.get<PaginatedResponse<User>>('/admin/users', { params }),
  
  getUserById: (userId: string) =>
    api.get<ApiResponse<User & { profile?: FarmerProfile }>>(`/admin/users/${userId}`),
  
  createUser: (data: Omit<User, 'user_id' | 'created_at' | 'updated_at'> & { password: string }) =>
    api.post<ApiResponse<User>>('/admin/users', data),
  
  updateUser: (userId: string, data: Partial<User>) =>
    api.patch<ApiResponse<User>>(`/admin/users/${userId}`, data),
  
  deleteUser: (userId: string) =>
    api.delete<ApiResponse<null>>(`/admin/users/${userId}`),
  
  toggleUserStatus: (userId: string) =>
    api.patch<ApiResponse<User>>(`/admin/users/${userId}/toggle-status`),
  
  changeUserRole: (userId: string, role: string) =>
    api.patch<ApiResponse<User>>(`/admin/users/${userId}/role`, { role }),
  
  resetUserPassword: (userId: string, newPassword: string) =>
    api.post<ApiResponse<null>>(`/admin/users/${userId}/reset-password`, { new_password: newPassword }),
  
  getUserStats: () =>
    api.get<ApiResponse<{ total: number; by_role: Record<string, number>; active: number; inactive: number }>>('/admin/users/stats'),
};

// ========== Analytics ==========
export const analyticsApi = {
  getMarketTrends: (params?: { crop?: string; region?: string; from?: string; to?: string }) =>
    api.get<ApiResponse<{ date: string; avg_price: number; min_price: number; max_price: number }[]>>('/analytics/market-trends', { params }),
  
  getCropPerformance: (params?: { region?: string; year?: number }) =>
    api.get<ApiResponse<{ crop: string; avg_price: number; trend: string }[]>>('/analytics/crop-performance', { params }),
  
  getWeatherPatterns: (params?: { region?: string; from?: string; to?: string }) =>
    api.get<ApiResponse<{ date: string; temperature: number; rainfall: number }[]>>('/analytics/weather-patterns', { params }),
  
  getUserEngagement: (params?: { from?: string; to?: string }) =>
    api.get<ApiResponse<{ posts: number; comments: number; active_users: number; new_users: number }>>('/analytics/engagement', { params }),
  
  getTopCrops: (limit: number = 10, region?: string) =>
    api.get<ApiResponse<{ crop: string; count: number; avg_price: number }[]>>('/analytics/top-crops', { params: { limit, region } }),
  
  getRegionalComparison: (crop: string) =>
    api.get<ApiResponse<{ region: string; avg_price: number; change: number }[]>>('/analytics/regional-comparison', { params: { crop } }),
};
