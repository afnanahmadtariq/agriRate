# API Integration Guide for AgriRate Frontend

This document provides implementation patterns for integrating the API endpoints into all frontend pages.

## Table of Contents
1. [Forum Page](#forum-page)
2. [Baithak Page](#baithak-page)
3. [Market Rates Page](#market-rates-page)
4. [Weather Page](#weather-page)
5. [Admin Users Page](#admin-users-page)
6. [Farmer Dashboard](#farmer-dashboard)
7. [Admin Dashboard](#admin-dashboard)

---

## Forum Page

### Import Required Dependencies
```typescript
import { useState, useEffect, useCallback } from 'react';
import { forumApi } from '@/app/lib/api/endpoints';
import type { ForumPost } from '@/app/types';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
```

### State Management
```typescript
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [posts, setPosts] = useState<ForumPost[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);
```

### Fetch Posts
```typescript
const fetchPosts = useCallback(async () => {
  try {
    setIsLoading(true);
    setError(null);
    const response = await forumApi.getPosts({ 
      page: 1, 
      limit: 50,
      sort: 'latest',
      category: selectedCategory !== 'all' ? selectedCategory : undefined
    });
    if (response.success && response.data) {
      setPosts(response.data);
    }
  } catch (err) {
    console.error('Error fetching posts:', err);
    setError('Failed to load posts. Please try again.');
  } finally {
    setIsLoading(false);
  }
}, [selectedCategory]);

useEffect(() => {
  fetchPosts();
}, [fetchPosts]);
```

### Like Post
```typescript
const handleLikePost = async (postId: string) => {
  try {
    await forumApi.likePost(postId);
    // Optimistically update UI
    setPosts(posts.map(post => 
      post._id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  } catch (err) {
    console.error('Error liking post:', err);
  }
};
```

### Add Comment
```typescript
const handleAddComment = async (postId: string, commentText: string) => {
  if (!commentText.trim()) return;
  
  try {
    setIsSubmitting(true);
    const response = await forumApi.addComment(postId, commentText);
    if (response.success && response.data) {
      setPosts(posts.map(post => 
        post._id === postId ? response.data! : post
      ));
      setCommentText('');
    }
  } catch (err) {
    console.error('Error adding comment:', err);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Create Post
```typescript
const handleCreatePost = async () => {
  if (!newPost.title.trim() || !newPost.body.trim()) return;

  try {
    setIsSubmitting(true);
    const response = await forumApi.createPost(newPost);
    if (response.success && response.data) {
      setPosts([response.data, ...posts]);
      setIsCreateModalOpen(false);
      setNewPost({ title: '', body: '', category: 'General', language: 'en' });
    }
  } catch (err) {
    console.error('Error creating post:', err);
    alert('Failed to create post. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Delete Comment
```typescript
const handleDeleteComment = async (postId: string, commentId: string) => {
  try {
    await forumApi.deleteComment(postId, commentId);
    setPosts(posts.map(post =>
      post._id === postId
        ? {
            ...post,
            comments: post.comments?.filter(c => c.comment_id !== commentId) || [],
          }
        : post
    ));
  } catch (err) {
    console.error('Error deleting comment:', err);
  }
};
```

---

## Baithak Page

### Import Required Dependencies
```typescript
import { useState, useEffect, useCallback, useRef } from 'react';
import { baithakApi } from '@/app/lib/api/endpoints';
import type { BaithakRoom, BaithakMessage } from '@/app/types';
```

### State Management
```typescript
const [rooms, setRooms] = useState<BaithakRoom[]>([]);
const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
const [messages, setMessages] = useState<BaithakMessage[]>([]);
const [newMessage, setNewMessage] = useState('');
const [isLoading, setIsLoading] = useState(true);
```

### Fetch Rooms
```typescript
const fetchRooms = useCallback(async () => {
  try {
    setIsLoading(true);
    const response = await baithakApi.getRooms({ page: 1, limit: 20 });
    if (response.success && response.data) {
      setRooms(response.data);
      if (!selectedRoom && response.data.length > 0) {
        setSelectedRoom(response.data[0].room_id);
      }
    }
  } catch (err) {
    console.error('Error fetching rooms:', err);
  } finally {
    setIsLoading(false);
  }
}, [selectedRoom]);
```

### Fetch Messages
```typescript
const fetchMessages = useCallback(async (roomId: string) => {
  try {
    const response = await baithakApi.getMessages(roomId, { limit: 100 });
    if (response.success && response.data) {
      setMessages(response.data);
    }
  } catch (err) {
    console.error('Error fetching messages:', err);
  }
}, []);

useEffect(() => {
  if (selectedRoom) {
    fetchMessages(selectedRoom);
  }
}, [selectedRoom, fetchMessages]);
```

### Send Message
```typescript
const handleSendMessage = async () => {
  if (!newMessage.trim() || !selectedRoom) return;

  try {
    const response = await baithakApi.sendMessage(selectedRoom, {
      message_text: newMessage,
      language: 'en'
    });
    if (response.success && response.data) {
      setMessages([...messages, response.data]);
      setNewMessage('');
    }
  } catch (err) {
    console.error('Error sending message:', err);
  }
};
```

### Join Room
```typescript
const handleJoinRoom = async (roomId: string) => {
  try {
    await baithakApi.joinRoom(roomId);
    setSelectedRoom(roomId);
  } catch (err) {
    console.error('Error joining room:', err);
  }
};
```

---

## Market Rates Page

### Import Required Dependencies
```typescript
import { useState, useEffect, useCallback } from 'react';
import { marketApi } from '@/app/lib/api/endpoints';
import type { MarketRate } from '@/app/types';
```

### State Management
```typescript
const [rates, setRates] = useState<MarketRate[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [selectedCrop, setSelectedCrop] = useState<string>('');
const [selectedRegion, setSelectedRegion] = useState<string>('all');
const [selectedCategory, setSelectedCategory] = useState<string>('all');
```

### Fetch Market Rates
```typescript
const fetchRates = useCallback(async () => {
  try {
    setIsLoading(true);
    const response = await marketApi.getRates({
      page: 1,
      limit: 100,
      region: selectedRegion !== 'all' ? selectedRegion : undefined,
      category: selectedCategory !== 'all' ? selectedCategory as any : undefined,
      crop: selectedCrop || undefined,
      sort: 'date',
      order: 'desc'
    });
    if (response.success && response.data) {
      setRates(response.data);
    }
  } catch (err) {
    console.error('Error fetching rates:', err);
  } finally {
    setIsLoading(false);
  }
}, [selectedRegion, selectedCategory, selectedCrop]);

useEffect(() => {
  fetchRates();
}, [fetchRates]);
```

### Get Price Trends
```typescript
const fetchTrends = async (crop: string, region: string) => {
  try {
    const response = await marketApi.getTrends(crop, region, 30);
    if (response.success && response.data) {
      return response.data;
    }
  } catch (err) {
    console.error('Error fetching trends:', err);
  }
  return [];
};
```

### Compare Crops
```typescript
const handleCompareCrops = async (crops: string[], region: string) => {
  try {
    const response = await marketApi.compareCrops(crops, region, 7);
    if (response.success && response.data) {
      setComparisonData(response.data);
    }
  } catch (err) {
    console.error('Error comparing crops:', err);
  }
};
```

### Admin: Create Rate
```typescript
const handleCreateRate = async (formData: MarketRateFormData) => {
  try {
    const response = await marketApi.createRate(formData);
    if (response.success && response.data) {
      setRates([response.data, ...rates]);
      // Close modal and reset form
    }
  } catch (err) {
    console.error('Error creating rate:', err);
    alert('Failed to create market rate');
  }
};
```

### Admin: Update Rate
```typescript
const handleUpdateRate = async (rateId: number, data: Partial<MarketRateFormData>) => {
  try {
    const response = await marketApi.updateRate(rateId, data);
    if (response.success && response.data) {
      setRates(rates.map(r => r.rate_id === rateId ? response.data! : r));
    }
  } catch (err) {
    console.error('Error updating rate:', err);
  }
};
```

### Admin: Delete Rate
```typescript
const handleDeleteRate = async (rateId: number) => {
  if (!confirm('Are you sure you want to delete this rate?')) return;
  
  try {
    await marketApi.deleteRate(rateId);
    setRates(rates.filter(r => r.rate_id !== rateId));
  } catch (err) {
    console.error('Error deleting rate:', err);
  }
};
```

---

## Weather Page

### Import Required Dependencies
```typescript
import { useState, useEffect, useCallback } from 'react';
import { weatherApi } from '@/app/lib/api/endpoints';
import type { WeatherData } from '@/app/types';
```

### State Management
```typescript
const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
const [selectedCity, setSelectedCity] = useState<string>('');
const [selectedRegion, setSelectedRegion] = useState<string>('all');
const [isLoading, setIsLoading] = useState(true);
```

### Fetch All Weather
```typescript
const fetchWeather = useCallback(async () => {
  try {
    setIsLoading(true);
    const response = await weatherApi.getAllWeather({ page: 1, limit: 50 });
    if (response.success && response.data) {
      setWeatherData(response.data);
    }
  } catch (err) {
    console.error('Error fetching weather:', err);
  } finally {
    setIsLoading(false);
  }
}, []);

useEffect(() => {
  fetchWeather();
}, [fetchWeather]);
```

### Get Weather by City
```typescript
const fetchCityWeather = async (city: string) => {
  try {
    const response = await weatherApi.getWeatherByCity(city);
    if (response.success && response.data) {
      return response.data;
    }
  } catch (err) {
    console.error('Error fetching city weather:', err);
  }
  return null;
};
```

### Get Weather Forecast
```typescript
const fetchForecast = async (city: string) => {
  try {
    const response = await weatherApi.getWeatherForecast(city, 7);
    if (response.success && response.data) {
      setForecast(response.data);
    }
  } catch (err) {
    console.error('Error fetching forecast:', err);
  }
};
```

### Get Weather Alerts
```typescript
const fetchAlerts = useCallback(async () => {
  try {
    const response = await weatherApi.getWeatherAlerts(selectedRegion !== 'all' ? selectedRegion : undefined);
    if (response.success && response.data) {
      setAlerts(response.data);
    }
  } catch (err) {
    console.error('Error fetching alerts:', err);
  }
}, [selectedRegion]);
```

---

## Admin Users Page

### Import Required Dependencies
```typescript
import { useState, useEffect, useCallback } from 'react';
import { adminUserApi } from '@/app/lib/api/endpoints';
import type { User } from '@/app/types';
```

### State Management
```typescript
const [users, setUsers] = useState<User[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [searchQuery, setSearchQuery] = useState('');
const [roleFilter, setRoleFilter] = useState('all');
const [statusFilter, setStatusFilter] = useState('all');
const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
```

### Fetch Users
```typescript
const fetchUsers = useCallback(async () => {
  try {
    setIsLoading(true);
    const response = await adminUserApi.getAllUsers({
      page: pagination.page,
      limit: 20,
      search: searchQuery || undefined,
      role: roleFilter !== 'all' ? roleFilter : undefined,
      is_active: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
      sort: 'date',
      order: 'desc'
    });
    if (response.success && response.data) {
      setUsers(response.data);
      if (response.pagination) {
        setPagination(prev => ({ ...prev, totalPages: response.pagination!.totalPages }));
      }
    }
  } catch (err) {
    console.error('Error fetching users:', err);
  } finally {
    setIsLoading(false);
  }
}, [pagination.page, searchQuery, roleFilter, statusFilter]);

useEffect(() => {
  fetchUsers();
}, [fetchUsers]);
```

### Toggle User Status
```typescript
const handleToggleStatus = async (userId: string) => {
  try {
    const response = await adminUserApi.toggleUserStatus(userId);
    if (response.success && response.data) {
      setUsers(users.map(u => u.user_id === userId ? response.data! : u));
    }
  } catch (err) {
    console.error('Error toggling status:', err);
  }
};
```

### Change User Role
```typescript
const handleChangeRole = async (userId: string, newRole: string) => {
  try {
    const response = await adminUserApi.changeUserRole(userId, newRole);
    if (response.success && response.data) {
      setUsers(users.map(u => u.user_id === userId ? response.data! : u));
    }
  } catch (err) {
    console.error('Error changing role:', err);
  }
};
```

### Delete User
```typescript
const handleDeleteUser = async (userId: string) => {
  if (!confirm('Are you sure you want to delete this user?')) return;
  
  try {
    await adminUserApi.deleteUser(userId);
    setUsers(users.filter(u => u.user_id !== userId));
  } catch (err) {
    console.error('Error deleting user:', err);
  }
};
```

---

## Farmer Dashboard

### Import Required Dependencies
```typescript
import { useState, useEffect } from 'react';
import { dashboardApi, marketApi, weatherApi, adviceApi } from '@/app/lib/api/endpoints';
import type { DashboardStats } from '@/app/types';
```

### Fetch Dashboard Stats
```typescript
const [stats, setStats] = useState<DashboardStats | null>(null);
const [recentRates, setRecentRates] = useState([]);
const [recentAdvice, setRecentAdvice] = useState([]);

useEffect(() => {
  const fetchDashboardData = async () => {
    if (!user?.user_id) return;
    
    try {
      // Fetch farmer stats
      const statsResponse = await dashboardApi.getFarmerStats(user.user_id);
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }
      
      // Fetch recent market rates
      const ratesResponse = await marketApi.getLatestRates(5);
      if (ratesResponse.success && ratesResponse.data) {
        setRecentRates(ratesResponse.data);
      }
      
      // Fetch recent advice
      const adviceResponse = await adviceApi.getRecentAdvice(5);
      if (adviceResponse.success && adviceResponse.data) {
        setRecentAdvice(adviceResponse.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };
  
  fetchDashboardData();
}, [user]);
```

---

## Admin Dashboard

### Fetch Admin Stats
```typescript
const [stats, setStats] = useState<DashboardStats | null>(null);
const [userActivity, setUserActivity] = useState([]);

useEffect(() => {
  const fetchAdminData = async () => {
    try {
      // Fetch admin stats
      const statsResponse = await dashboardApi.getAdminStats();
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }
      
      // Fetch user activity
      const activityResponse = await dashboardApi.getUserActivity({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString()
      });
      if (activityResponse.success && activityResponse.data) {
        setUserActivity(activityResponse.data);
      }
      
      // Fetch user stats
      const userStatsResponse = await adminUserApi.getUserStats();
      if (userStatsResponse.success && userStatsResponse.data) {
        setUserStats(userStatsResponse.data);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };
  
  fetchAdminData();
}, []);
```

---

## Common Patterns

### Loading State UI
```typescript
{isLoading && (
  <div className="flex justify-center py-12">
    <LoadingSpinner size="lg" />
  </div>
)}
```

### Error State UI
```typescript
{error && (
  <ModernCard>
    <div className="text-center py-4 text-red-600">
      {error}
      <ModernButton
        variant="secondary"
        size="sm"
        onClick={refetch}
        className="ml-4"
      >
        Retry
      </ModernButton>
    </div>
  </ModernCard>
)}
```

### Empty State UI
```typescript
{!isLoading && data.length === 0 && (
  <ModernCard>
    <div className="text-center py-12">
      <Icon className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)]" />
      <p className="text-lg font-medium text-[var(--color-text)]">
        No data found
      </p>
      <p className="text-[var(--color-text-muted)] mb-4">
        {emptyMessage}
      </p>
    </div>
  </ModernCard>
)}
```

### Pagination
```typescript
const handlePageChange = (newPage: number) => {
  setPagination(prev => ({ ...prev, page: newPage }));
};

// In JSX
<div className="flex justify-center gap-2 mt-6">
  <ModernButton
    variant="secondary"
    onClick={() => handlePageChange(pagination.page - 1)}
    disabled={pagination.page === 1}
  >
    Previous
  </ModernButton>
  <span className="py-2 px-4">
    Page {pagination.page} of {pagination.totalPages}
  </span>
  <ModernButton
    variant="secondary"
    onClick={() => handlePageChange(pagination.page + 1)}
    disabled={pagination.page === pagination.totalPages}
  >
    Next
  </ModernButton>
</div>
```

---

## Error Handling

### Try-Catch Pattern
```typescript
try {
  const response = await api.method(params);
  if (response.success && response.data) {
    // Handle success
  } else {
    // Handle API error response
    console.error('API Error:', response.error || response.message);
  }
} catch (err) {
  // Handle network error or exception
  console.error('Error:', err);
  setError('An error occurred. Please try again.');
}
```

### Form Validation
```typescript
const validateForm = () => {
  if (!formData.field1.trim()) {
    setError('Field 1 is required');
    return false;
  }
  if (!formData.field2) {
    setError('Field 2 is required');
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    // Submit form
  } catch (err) {
    // Handle error
  }
};
```

---

## Implementation Checklist

### For Each Page:

- [ ] Import necessary API functions from `endpoints.ts`
- [ ] Import type definitions from `@/app/types`
- [ ] Add `LoadingSpinner` component
- [ ] Replace mock data arrays with state management
- [ ] Add `isLoading`, `error`, and `isSubmitting` states
- [ ] Create `fetch` functions using `useCallback`
- [ ] Add `useEffect` to fetch data on mount
- [ ] Update all CRUD operations to use API calls
- [ ] Add loading states to UI
- [ ] Add error handling and display
- [ ] Add success feedback (toasts/alerts)
- [ ] Implement optimistic UI updates where appropriate
- [ ] Add pagination if needed
- [ ] Test all operations (Create, Read, Update, Delete)

---

## Next Steps

1. **Start with Forum Page** - It's the most complex with CRUD operations
2. **Then Baithak** - Real-time messaging considerations
3. **Market Rates** - Includes charts and comparisons
4. **Weather** - Simpler data display
5. **Admin Pages** - Management interfaces
6. **Dashboards** - Aggregate data from multiple endpoints

## Notes

- All API calls should have proper error handling
- Use optimistic UI updates for better UX
- Add loading states to prevent multiple submissions
- Implement proper form validation
- Consider adding success/error toasts for user feedback
- Use TypeScript types from `@/app/types` for type safety
- Remember to handle edge cases (empty states, errors, network failures)
