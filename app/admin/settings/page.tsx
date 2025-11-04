"use client";

import { useState, useEffect } from 'react';
import { Save, Bell, Shield, Database, Mail, Globe } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import ModernInput from '@/app/components/ModernInput';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import Select from '@/app/components/ui/Select';
import Textarea from '@/app/components/ui/Textarea';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'AgriRate',
    siteDescription: 'Empowering Pakistani Farmers with Smart Agriculture Solutions',
    adminEmail: 'admin@agrirate.com',
    supportEmail: 'support@agrirate.com',
    language: 'en',
    timezone: 'Asia/Karachi',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    userRegistration: true,
    newForumPost: false,
    marketRateUpdates: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
  ];

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout role="admin">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading settings..." />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                  Settings
                </h1>
                <p className="text-(--color-text-secondary)">
                  Configure platform settings and preferences
                </p>
              </div>
              <ModernButton
                variant="primary"
                size="md"
                onClick={handleSave}
                loading={isSaving}
                disabled={isSaving}
              >
                <Save className="w-5 h-5 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </ModernButton>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-(--color-primary) text-white'
                      : 'bg-(--color-surface) text-(--color-text-secondary) hover:bg-(--color-surface-alt)'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <ModernCard>
                  <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                    Site Information
                  </h3>
                  <div className="space-y-4">
                    <ModernInput
                      id="siteName"
                      label="Site Name"
                      type="text"
                      value={generalSettings.siteName}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                      }
                    />
                    <div>
                      <label className="block text-sm font-medium text-(--color-text) mb-2">
                        Site Description
                      </label>
                      <Textarea
                        value={generalSettings.siteDescription}
                        onChange={(e) =>
                          setGeneralSettings({
                            ...generalSettings,
                            siteDescription: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </ModernCard>

                <ModernCard>
                  <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ModernInput
                      id="adminEmail"
                      label="Admin Email"
                      type="email"
                      value={generalSettings.adminEmail}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })
                      }
                      icon={<Mail className="w-5 h-5" />}
                    />
                    <ModernInput
                      id="supportEmail"
                      label="Support Email"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                      }
                      icon={<Mail className="w-5 h-5" />}
                    />
                  </div>
                </ModernCard>

                <ModernCard>
                  <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                    Regional Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-(--color-text) mb-2">
                        Default Language
                      </label>
                      <Select
                        value={generalSettings.language}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, language: e.target.value })
                        }
                        options={[
                          { value: 'en', label: 'English' },
                          { value: 'ur', label: 'Urdu' },
                          { value: 'roman_ur', label: 'Roman Urdu' },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--color-text) mb-2">
                        Timezone
                      </label>
                      <Select
                        value={generalSettings.timezone}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, timezone: e.target.value })
                        }
                        options={[
                          { value: 'Asia/Karachi', label: 'Asia/Karachi (PKT)' },
                          { value: 'UTC', label: 'UTC' },
                        ]}
                      />
                    </div>
                  </div>
                </ModernCard>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <ModernCard>
                <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-(--color-surface-alt)">
                    <div>
                      <p className="font-medium text-(--color-text)">Email Notifications</p>
                      <p className="text-sm text-(--color-text-secondary)">
                        Receive notifications via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-(--color-surface-alt)">
                    <div>
                      <p className="font-medium text-(--color-text)">Push Notifications</p>
                      <p className="text-sm text-(--color-text-secondary)">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-(--color-surface-alt)">
                    <div>
                      <p className="font-medium text-(--color-text)">Weekly Reports</p>
                      <p className="text-sm text-(--color-text-secondary)">
                        Receive weekly platform analytics
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            weeklyReports: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-(--color-surface-alt)">
                    <div>
                      <p className="font-medium text-(--color-text)">User Registration Alerts</p>
                      <p className="text-sm text-(--color-text-secondary)">
                        Get notified when new users register
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.userRegistration}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            userRegistration: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-(--color-surface-alt)">
                    <div>
                      <p className="font-medium text-(--color-text)">Market Rate Updates</p>
                      <p className="text-sm text-(--color-text-secondary)">
                        Get notified about significant price changes
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.marketRateUpdates}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            marketRateUpdates: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </ModernCard>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <ModernCard>
                  <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                    Authentication
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-(--color-surface-alt)">
                      <div>
                        <p className="font-medium text-(--color-text)">Two-Factor Authentication</p>
                        <p className="text-sm text-(--color-text-secondary)">
                          Add an extra layer of security
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              twoFactorAuth: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </ModernCard>

                <ModernCard>
                  <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                    Session & Login Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-(--color-text) mb-2">
                        Session Timeout (minutes)
                      </label>
                      <Select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeout: e.target.value,
                          })
                        }
                        options={[
                          { value: '15', label: '15 minutes' },
                          { value: '30', label: '30 minutes' },
                          { value: '60', label: '1 hour' },
                          { value: '120', label: '2 hours' },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-(--color-text) mb-2">
                        Max Login Attempts
                      </label>
                      <Select
                        value={securitySettings.loginAttempts}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            loginAttempts: e.target.value,
                          })
                        }
                        options={[
                          { value: '3', label: '3 attempts' },
                          { value: '5', label: '5 attempts' },
                          { value: '10', label: '10 attempts' },
                        ]}
                      />
                    </div>
                  </div>
                </ModernCard>
              </div>
            )}

            {/* Database Settings */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                <ModernCard>
                  <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                    Database Management
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-(--color-surface-alt)">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-(--color-text)">Backup Database</p>
                          <p className="text-sm text-(--color-text-secondary)">
                            Create a backup of all platform data
                          </p>
                        </div>
                        <ModernButton variant="secondary" size="sm">
                          Create Backup
                        </ModernButton>
                      </div>
                      <p className="text-xs text-(--color-text-muted)">
                        Last backup: November 3, 2025 at 2:00 AM
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-(--color-surface-alt)">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-(--color-text)">Optimize Database</p>
                          <p className="text-sm text-(--color-text-secondary)">
                            Improve database performance
                          </p>
                        </div>
                        <ModernButton variant="secondary" size="sm">
                          Optimize Now
                        </ModernButton>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-red-800">Clear All Cache</p>
                          <p className="text-sm text-red-600">
                            Remove all cached data (may affect performance temporarily)
                          </p>
                        </div>
                        <ModernButton variant="secondary" size="sm">
                          Clear Cache
                        </ModernButton>
                      </div>
                    </div>
                  </div>
                </ModernCard>

                <ModernCard>
                  <h3 className="text-lg font-semibold text-(--color-text) mb-4">
                    Database Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-(--color-surface-alt) text-center">
                      <p className="text-2xl font-bold text-(--color-primary)">1,247</p>
                      <p className="text-sm text-(--color-text-secondary)">Total Users</p>
                    </div>
                    <div className="p-4 rounded-lg bg-(--color-surface-alt) text-center">
                      <p className="text-2xl font-bold text-(--color-success)">432</p>
                      <p className="text-sm text-(--color-text-secondary)">Forum Posts</p>
                    </div>
                    <div className="p-4 rounded-lg bg-(--color-surface-alt) text-center">
                      <p className="text-2xl font-bold text-(--color-warning)">156</p>
                      <p className="text-sm text-(--color-text-secondary)">Market Rates</p>
                    </div>
                    <div className="p-4 rounded-lg bg-(--color-surface-alt) text-center">
                      <p className="text-2xl font-bold text-(--color-info)">2.4 GB</p>
                      <p className="text-sm text-(--color-text-secondary)">DB Size</p>
                    </div>
                  </div>
                </ModernCard>
              </div>
            )}
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
