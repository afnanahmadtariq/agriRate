'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/shared/dashboard-layout';
import { ModernCard } from '@/components/ModernCard';
import { ModernButton } from '@/components/ModernButton';
import { ModernInput } from '@/components/ModernInput';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/app/hooks/useLanguage';
import type { User, Activity, Achievement } from '@/app/types';

// Mock user data
const mockUser: User = {
  id: 'user1',
  name: 'Ahmad Khan',
  email: 'ahmad.khan@example.com',
  phone: '+92 300 1234567',
  role: 'farmer',
  profileImage: '',
  region: 'Punjab',
  district: 'Faisalabad',
  location: 'Chak Jhumra',
  crops: ['Wheat', 'Cotton', 'Rice'],
  farmSize: 25,
  language: 'ur',
  communicationMethod: 'whatsapp',
  createdAt: new Date('2024-01-15'),
};

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task',
    description: 'Completed irrigation task',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'post',
    description: 'Created a post in community forum',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'price-check',
    description: 'Checked wheat prices',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'weather-check',
    description: 'Viewed weather forecast',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Task',
    titleUrdu: 'پہلا کام',
    description: 'Completed your first task',
    icon: '✅',
    earnedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    title: 'Community Helper',
    titleUrdu: 'کمیونٹی مددگار',
    description: 'Posted 10 helpful tips',
    icon: '🌟',
    earnedAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    title: 'Price Tracker',
    titleUrdu: 'قیمت ٹریکر',
    description: 'Checked prices 50 times',
    icon: '💰',
    earnedAt: new Date('2024-03-01'),
  },
];

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(mockUser);
  const [editedUser, setEditedUser] = useState<User>(mockUser);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const activityIcons: Record<Activity['type'], string> = {
    task: '✅',
    post: '📝',
    'price-check': '💰',
    'weather-check': '🌤️',
  };

  return (
    <DashboardLayout
      title={t({ en: 'My Profile', ur: 'میری پروفائل', roman: 'Meri Profile' })}
      userRole="farmer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <ModernCard variant="elevated" padding="lg">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl text-white"
                  style={{ backgroundColor: 'var(--agri-dark)' }}
                >
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                    {user.name}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {t({ en: 'Farmer', ur: 'کسان', roman: 'Kisaan' })} • {t({ en: 'Member since', ur: 'رکن بنے', roman: 'Rukn Banay' })}{' '}
                    {user.createdAt.getFullYear()}
                  </p>
                </div>
              </div>
              <ModernButton
                variant={isEditing ? 'secondary' : 'primary'}
                size="md"
                onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              >
                {isEditing
                  ? t({ en: 'Cancel', ur: 'منسوخ', roman: 'Mansookh' })
                  : t({ en: 'Edit Profile', ur: 'پروفائل میں ترمیم', roman: 'Profile Mein Tarmeam' })}
              </ModernButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModernInput
                label={t({ en: 'Full Name', ur: 'مکمل نام', roman: 'Mukammal Naam' })}
                type="text"
                value={isEditing ? editedUser.name : user.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                disabled={!isEditing}
              />

              <ModernInput
                label={t({ en: 'Email', ur: 'ای میل', roman: 'Email' })}
                type="email"
                value={isEditing ? editedUser.email : user.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                disabled={!isEditing}
              />

              <ModernInput
                label={t({ en: 'Phone', ur: 'فون', roman: 'Phone' })}
                type="tel"
                value={isEditing ? editedUser.phone || '' : user.phone || ''}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                disabled={!isEditing}
              />

              <ModernInput
                label={t({ en: 'Region', ur: 'علاقہ', roman: 'Ilaqah' })}
                type="text"
                value={isEditing ? editedUser.region || '' : user.region || ''}
                onChange={(e) => setEditedUser({ ...editedUser, region: e.target.value })}
                disabled={!isEditing}
              />

              <ModernInput
                label={t({ en: 'District', ur: 'ضلع', roman: 'Zila' })}
                type="text"
                value={isEditing ? editedUser.district || '' : user.district || ''}
                onChange={(e) => setEditedUser({ ...editedUser, district: e.target.value })}
                disabled={!isEditing}
              />

              <ModernInput
                label={t({ en: 'Location', ur: 'مقام', roman: 'Maqam' })}
                type="text"
                value={isEditing ? editedUser.location || '' : user.location || ''}
                onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                disabled={!isEditing}
              />

              <div className="md:col-span-2">
                <ModernInput
                  label={t({ en: 'Crops', ur: 'فصلیں', roman: 'Faslen' })}
                  type="text"
                  value={isEditing ? editedUser.crops?.join(', ') : user.crops?.join(', ')}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, crops: e.target.value.split(',').map((c) => c.trim()) })
                  }
                  disabled={!isEditing}
                  helperText={t({
                    en: 'Separate multiple crops with commas',
                    ur: 'متعدد فصلوں کو کوما سے الگ کریں',
                    roman: 'Multiple crops ko comma se alag karain',
                  })}
                />
              </div>

              <ModernInput
                label={t({ en: 'Farm Size (acres)', ur: 'فارم کا رقبہ (ایکڑ)', roman: 'Farm ka Raqba (Acre)' })}
                type="number"
                value={isEditing ? editedUser.farmSize || '' : user.farmSize || ''}
                onChange={(e) => setEditedUser({ ...editedUser, farmSize: Number(e.target.value) })}
                disabled={!isEditing}
              />

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                  {t({ en: 'Communication Method', ur: 'رابطے کا طریقہ', roman: 'Rabte ka Tareeqa' })}
                </label>
                <select
                  value={isEditing ? editedUser.communicationMethod : user.communicationMethod}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, communicationMethod: e.target.value as any })
                  }
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="call">Call</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6">
                <ModernButton variant="primary" size="md" onClick={handleSave}>
                  {t({ en: 'Save Changes', ur: 'تبدیلیاں محفوظ کریں', roman: 'Tabdeeliyan Mehfooz Karain' })}
                </ModernButton>
                <ModernButton variant="secondary" size="md" onClick={handleCancel}>
                  {t({ en: 'Cancel', ur: 'منسوخ', roman: 'Mansookh' })}
                </ModernButton>
              </div>
            )}
          </ModernCard>

          {/* Recent Activity */}
          <ModernCard variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Recent Activity', ur: 'حالیہ سرگرمی', roman: 'Haliya Sargirmi' })}
            </h3>
            <div className="space-y-3">
              {mockActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <span className="text-2xl">{activityIcons[activity.type]}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {activity.description}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {activity.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>

        {/* Right Column - Stats & Achievements */}
        <div className="space-y-6">
          {/* Stats */}
          <ModernCard variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Statistics', ur: 'اعداد و شمار', roman: 'Adaad o Shumaar' })}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {t({ en: 'Tasks Completed', ur: 'مکمل کام', roman: 'Mukammal Kaam' })}
                  </span>
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                  42
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {t({ en: 'Forum Posts', ur: 'فورم پوسٹس', roman: 'Forum Posts' })}
                  </span>
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                  18
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {t({ en: 'Price Checks', ur: 'قیمت چیک', roman: 'Qeemat Check' })}
                  </span>
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                  156
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {t({ en: 'KhetBot Queries', ur: 'کھیت بوٹ سوالات', roman: 'KhetBot Sawalat' })}
                  </span>
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                  89
                </span>
              </div>
            </div>
          </ModernCard>

          {/* Achievements */}
          <ModernCard variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Achievements', ur: 'کامیابیاں', roman: 'Kamiyabiyan' })}
            </h3>
            <div className="space-y-3">
              {mockAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--color-surface-muted)' }}
                >
                  <span className="text-3xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: 'var(--agri-dark)' }}>
                      {language === 'ur' && achievement.titleUrdu ? achievement.titleUrdu : achievement.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {achievement.description}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                      {achievement.earnedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>

          {/* Farm Info */}
          <ModernCard variant="outlined" padding="lg">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Farm Information', ur: 'فارم کی معلومات', roman: 'Farm ki Maloomat' })}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  {t({ en: 'Location', ur: 'مقام', roman: 'Maqam' })}
                </p>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                  {user.location}, {user.district}, {user.region}
                </p>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  {t({ en: 'Farm Size', ur: 'فارم کا رقبہ', roman: 'Farm ka Raqba' })}
                </p>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                  {user.farmSize} {t({ en: 'acres', ur: 'ایکڑ', roman: 'Acre' })}
                </p>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  {t({ en: 'Main Crops', ur: 'اہم فصلیں', roman: 'Ahem Faslen' })}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.crops?.map((crop, index) => (
                    <StatusBadge key={index} status="success" size="sm">
                      {crop}
                    </StatusBadge>
                  ))}
                </div>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
