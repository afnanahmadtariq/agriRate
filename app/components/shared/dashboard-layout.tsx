'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from 'next-themes';

interface NavItem {
  href: string;
  label: { en: string; ur: string; roman: string };
  icon: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  userRole?: 'farmer' | 'admin';
}

export default function DashboardLayout({ children, title, userRole = 'farmer' }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const farmerNavItems: NavItem[] = [
    {
      href: '/farmer',
      label: { en: 'Dashboard', ur: 'ڈیش بورڈ', roman: 'Dashboard' },
      icon: '📊',
    },
    {
      href: '/tasks',
      label: { en: 'Tasks', ur: 'کام', roman: 'Kaam' },
      icon: '✅',
    },
    {
      href: '/weather',
      label: { en: 'Weather', ur: 'موسم', roman: 'Mosam' },
      icon: '🌤️',
    },
    {
      href: '/khetbot',
      label: { en: 'KhetBot', ur: 'کھیت بوٹ', roman: 'KhetBot' },
      icon: '🤖',
    },
    {
      href: '/community',
      label: { en: 'Community', ur: 'کمیونٹی', roman: 'Community' },
      icon: '👥',
    },
    {
      href: '/profile',
      label: { en: 'Profile', ur: 'پروفائل', roman: 'Profile' },
      icon: '👤',
    },
  ];

  const adminNavItems: NavItem[] = [
    {
      href: '/admin',
      label: { en: 'Admin Dashboard', ur: 'ایڈمن ڈیش بورڈ', roman: 'Admin Dashboard' },
      icon: '⚙️',
    },
    {
      href: '/admin/markets',
      label: { en: 'Markets', ur: 'منڈیاں', roman: 'Mandian' },
      icon: '🏪',
    },
    {
      href: '/admin/analytics',
      label: { en: 'Analytics', ur: 'تجزیات', roman: 'Tajziyat' },
      icon: '📈',
    },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : farmerNavItems;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      {/* Top Navigation */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg"
                style={{ color: 'var(--color-text)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/farmer" className="flex items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                  AgriRate
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      language === 'ur' ? 'font-urdu' : ''
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--agri-dark)' : 'transparent',
                      color: isActive ? 'white' : 'var(--color-text-secondary)',
                    }}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {t(item.label)}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-[var(--color-hover-overlay)] transition-colors"
                style={{ color: 'var(--color-text)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Notifications */}
              <button
                className="relative p-2 rounded-lg hover:bg-[var(--color-hover-overlay)] transition-colors"
                style={{ color: 'var(--color-text)' }}
                aria-label="Notifications"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-error)' }}
                />
              </button>

              {/* User Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: 'var(--agri-dark)' }}
              >
                {userRole === 'admin' ? 'A' : 'F'}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--color-border)' }}>
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      language === 'ur' ? 'font-urdu' : ''
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--agri-dark)' : 'transparent',
                      color: isActive ? 'white' : 'var(--color-text-secondary)',
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {t(item.label)}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className={`text-3xl font-bold mb-6 ${language === 'ur' ? 'font-urdu text-right' : ''}`}
          style={{ color: 'var(--agri-dark)' }}
        >
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
}
