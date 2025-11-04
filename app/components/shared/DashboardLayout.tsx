"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Menu,
  X,
  Home,
  TrendingUp,
  Cloud,
  Lightbulb,
  MessageSquare,
  Users,
  Bell,
  Settings,
  LogOut,
  ShoppingBag,
} from 'lucide-react';
import { useAuth } from '@/app/lib/context/AuthContext';
import ModernButton from '@/app/components/ModernButton';

interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'farmer';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const adminNavItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    {
      name: 'Market Rates',
      href: '/admin/market-rates',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      name: 'Articles',
      href: '/admin/articles',
      icon: <Lightbulb className="w-5 h-5" />,
    },
    { name: 'Forum', href: '/forum', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
  ];

  const farmerNavItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/farmer/dashboard',
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: 'Market Rates',
      href: '/farmer/market-rates',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    { name: 'Weather', href: '/farmer/weather', icon: <Cloud className="w-5 h-5" /> },
    {
      name: 'Smart Advice',
      href: '/farmer/advice',
      icon: <Lightbulb className="w-5 h-5" />,
    },
    { name: 'Forum', href: '/forum', icon: <MessageSquare className="w-5 h-5" /> },
    {
      name: 'Live Baithak',
      href: '/baithak',
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: 'AgriMart',
      href: '/agrimart',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
  ];

  const navItems = role === 'admin' ? adminNavItems : farmerNavItems;

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-hover-overlay)]"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AgriRate" width={32} height={32} />
              <span className="font-bold text-xl text-[var(--color-primary)]">
                AgriRate
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-[var(--color-hover-overlay)] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full"></span>
            </button>

            {/* User menu */}
            <div className="flex items-center gap-3 pl-3 border-l border-[var(--color-border)]">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {user?.full_name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] capitalize">
                  {user?.role}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-[var(--color-hover-overlay)] text-[var(--color-error)]"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:sticky top-[57px] left-0 z-30 h-[calc(100vh-57px)]
          w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)]
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white shadow-md'
                        : 'text-[var(--color-text)] hover:bg-[var(--color-hover-overlay)]'
                    }
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8 max-w-[1600px]">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
