"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, RegisterFormData } from '@/app/types';
import { authApi } from '@/app/lib/api/endpoints';

// Dummy users for development/testing
const DUMMY_FARMER: User = {
  user_id: 'dummy-farmer-123',
  full_name: 'Test Farmer',
  email: 'farmer@test.com',
  phone_number: '+923001234567',
  role: 'farmer',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DUMMY_ADMIN: User = {
  user_id: 'dummy-admin-456',
  full_name: 'Admin User',
  email: 'admin@agrirate.com',
  phone_number: '+923009999999',
  role: 'admin',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone_number: string, password: string) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (phone_number: string, password: string) => {
    try {
      // Check for dummy farmer credentials
      if (phone_number === '1234567890' && password === 'password') {
        const token = 'dummy-farmer-token-' + Date.now();
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(DUMMY_FARMER));
        setUser(DUMMY_FARMER);
        return;
      }

      // Check for dummy admin credentials
      if (phone_number === 'admin' && password === 'admin123') {
        const token = 'dummy-admin-token-' + Date.now();
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(DUMMY_ADMIN));
        setUser(DUMMY_ADMIN);
        return;
      }

      const response = await authApi.login({ phone_number, password });

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      throw new Error(errorMessage);
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      const response = await authApi.register(data);

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/farmer/login';
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
