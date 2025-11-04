"use client";

import { ReactNode, useState, useRef, useEffect } from 'react';
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
  BarChart3,
  LineChart,
  Check,
  AlertCircle,
  Info,
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

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  read: boolean;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Price Alert',
      message: 'Wheat prices increased by 5% in your region',
      type: 'info',
      time: '5 min ago',
      read: false,
    },
    {
      id: 2,
      title: 'Weather Update',
      message: 'Heavy rainfall expected tomorrow in Multan',
      type: 'warning',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'New Message',
      message: 'Expert replied to your forum post',
      type: 'success',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 4,
      title: 'Market Trend',
      message: 'Cotton prices showing downward trend',
      type: 'info',
      time: '5 hours ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notification dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };


  const adminNavItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    {
      name: 'Market Rates',
      href: '/admin/market-rates',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    { name: 'Forum', href: '/admin/forum', icon: <MessageSquare className="w-5 h-5" /> },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
    },
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
    {
      name: 'Price Trends',
      href: '/farmer/price-trends',
      icon: <LineChart className="w-5 h-5" />,
    },
    { name: 'Forum', href: '/forum', icon: <MessageSquare className="w-5 h-5" /> },
    {
      name: 'Live Baithak',
      href: '/baithak',
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: 'AgriMart',
      href: '/farmer/agrimart',
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
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-lg hover:bg-[var(--color-hover-overlay)] relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 bg-(--color-surface) border border-(--color-border) rounded-lg shadow-lg overflow-hidden z-50">
                  {/* Mark All Read Button */}
                  {unreadCount > 0 && (
                    <div className="px-4 py-2 border-b border-(--color-border) bg-(--color-surface-secondary)">
                      <button
                        onClick={markAllAsRead}
                        className="text-xs font-medium text-(--color-primary) hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>
                  )}

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-4 border-b border-(--color-border) hover:bg-(--color-surface-secondary) cursor-pointer transition-colors ${
                            !notification.read ? 'bg-(--color-primary-subtle)' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-medium text-sm text-(--color-text)">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-(--color-primary) rounded-full flex-shrink-0 mt-1"></div>
                                )}
                              </div>
                              <p className="text-xs text-(--color-text-secondary) mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-(--color-text-muted) mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="w-12 h-12 mx-auto mb-3 text-(--color-text-muted) opacity-50" />
                        <p className="text-sm text-(--color-text-secondary)">No notifications</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-(--color-border) bg-(--color-surface-secondary)">
                      <button className="w-full text-center text-sm text-(--color-primary) hover:underline">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

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
