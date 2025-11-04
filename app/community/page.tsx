'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/shared/dashboard-layout';
import { ModernCard } from '@/components/ModernCard';
import { ModernButton } from '@/components/ModernButton';
import { ModernInput } from '@/components/ModernInput';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/app/hooks/useLanguage';
import { mockForumPosts, mockForumReplies, getPostsByCategory, searchPosts } from '@/app/lib/forum-data';
import type { ForumPost } from '@/app/types';

export default function CommunityPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<ForumPost['category']>('question');

  const categories = [
    { id: 'all', label: { en: 'All', ur: 'تمام', roman: 'Tamam' }, icon: '📚' },
    { id: 'question', label: { en: 'Questions', ur: 'سوالات', roman: 'Sawalat' }, icon: '❓' },
    { id: 'tip', label: { en: 'Tips', ur: 'نکات', roman: 'Nukaat' }, icon: '💡' },
    { id: 'success', label: { en: 'Success Stories', ur: 'کامیابی', roman: 'Kamiyabi' }, icon: '🎉' },
    { id: 'issue', label: { en: 'Issues', ur: 'مسائل', roman: 'Masail' }, icon: '⚠️' },
  ];

  const posts = searchQuery
    ? searchPosts(searchQuery)
    : getPostsByCategory(selectedCategory === 'all' ? undefined : selectedCategory);

  const categoryIcons: Record<string, string> = {
    question: '❓',
    tip: '💡',
    success: '🎉',
    issue: '⚠️',
  };

  const handleCreatePost = () => {
    // Mock post creation
    console.log('Creating post:', { newPostTitle, newPostContent, newPostCategory });
    setShowCreatePost(false);
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <DashboardLayout
      title={t({ en: 'Community Forum', ur: 'کمیونٹی فورم', roman: 'Community Forum' })}
      userRole="farmer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Create Post Button */}
          <ModernButton
            variant="primary"
            size="md"
            onClick={() => setShowCreatePost(true)}
            className="w-full"
          >
            + {t({ en: 'Create Post', ur: 'پوسٹ بنائیں', roman: 'Post Banayein' })}
          </ModernButton>

          {/* Categories */}
          <ModernCard variant="outlined" padding="md">
            <h3 className="font-semibold mb-3" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Categories', ur: 'زمرے', roman: 'Zimray' })}
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    language === 'ur' ? 'text-right flex-row-reverse' : ''
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category.id ? 'var(--agri-dark)' : 'transparent',
                    color: selectedCategory === category.id ? 'white' : 'var(--color-text)',
                  }}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium">{t(category.label)}</span>
                </button>
              ))}
            </div>
          </ModernCard>

          {/* Stats */}
          <ModernCard variant="outlined" padding="md">
            <h3 className="font-semibold mb-3" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Community Stats', ur: 'کمیونٹی کے اعداد و شمار', roman: 'Community Stats' })}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {t({ en: 'Total Posts', ur: 'کل پوسٹس', roman: 'Kul Posts' })}
                </p>
                <p className="text-2xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                  {mockForumPosts.length}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {t({ en: 'Active Members', ur: 'فعال اراکین', roman: 'Faal Arakin' })}
                </p>
                <p className="text-2xl font-bold" style={{ color: 'var(--agri-dark)' }}>
                  1,234
                </p>
              </div>
            </div>
          </ModernCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search */}
          <ModernCard variant="outlined" padding="md">
            <ModernInput
              type="text"
              placeholder={t({ en: 'Search posts...', ur: 'پوسٹس تلاش کریں...', roman: 'Posts Talash Karain' })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </ModernCard>

          {/* Create Post Modal */}
          {showCreatePost && (
            <ModernCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
                {t({ en: 'Create New Post', ur: 'نئی پوسٹ بنائیں', roman: 'Nayi Post Banayein' })}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    {t({ en: 'Category', ur: 'زمرہ', roman: 'Zimra' })}
                  </label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as ForumPost['category'])}
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {t(cat.label)}
                      </option>
                    ))}
                  </select>
                </div>

                <ModernInput
                  label={t({ en: 'Title', ur: 'عنوان', roman: 'Unwaan' })}
                  type="text"
                  placeholder={t({ en: 'Enter post title...', ur: 'پوسٹ کا عنوان درج کریں...', roman: 'Post ka Unwaan Darj Karain' })}
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    {t({ en: 'Content', ur: 'مواد', roman: 'Mawad' })}
                  </label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={t({
                      en: 'Write your post content...',
                      ur: 'اپنی پوسٹ کا مواد لکھیں...',
                      roman: 'Apni Post ka Mawad Likhain',
                    })}
                    className={`w-full px-4 py-3 border rounded-lg resize-none ${language === 'ur' ? 'font-urdu text-right' : ''}`}
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                      minHeight: '120px',
                    }}
                    rows={5}
                  />
                </div>

                <div className="flex gap-3">
                  <ModernButton variant="primary" size="md" onClick={handleCreatePost}>
                    {t({ en: 'Post', ur: 'پوسٹ کریں', roman: 'Post Karain' })}
                  </ModernButton>
                  <ModernButton variant="secondary" size="md" onClick={() => setShowCreatePost(false)}>
                    {t({ en: 'Cancel', ur: 'منسوخ', roman: 'Mansookh' })}
                  </ModernButton>
                </div>
              </div>
            </ModernCard>
          )}

          {/* Posts List */}
          {!selectedPost ? (
            posts.map((post) => (
              <ModernCard
                key={post.id}
                variant="outlined"
                padding="lg"
                hoverable
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: 'var(--agri-dark)' }}
                  >
                    {post.authorName.charAt(0)}
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{categoryIcons[post.category]}</span>
                          <h3
                            className={`font-semibold ${language === 'ur' ? 'font-urdu' : ''}`}
                            style={{ color: 'var(--agri-dark)' }}
                          >
                            {post.title}
                          </h3>
                        </div>
                        <p
                          className={`text-sm mb-2 line-clamp-2 ${language === 'ur' ? 'font-urdu text-right' : ''}`}
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {post.content}
                        </p>
                      </div>
                    </div>

                    {/* Post Meta */}
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      <span className={language === 'ur' ? 'font-urdu' : ''}>{post.authorName}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        ❤️ {post.likes}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        💬 {post.replies}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        👁️ {post.views}
                      </span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            ))
          ) : (
            /* Post Detail View */
            <div className="space-y-4">
              <ModernButton variant="secondary" size="sm" onClick={() => setSelectedPost(null)}>
                ← {t({ en: 'Back to Posts', ur: 'پوسٹس پر واپس', roman: 'Posts par Wapas' })}
              </ModernButton>

              <ModernCard variant="elevated" padding="lg">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: 'var(--agri-dark)' }}
                  >
                    {selectedPost.authorName.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{categoryIcons[selectedPost.category]}</span>
                      <h2
                        className={`text-2xl font-bold ${language === 'ur' ? 'font-urdu' : ''}`}
                        style={{ color: 'var(--agri-dark)' }}
                      >
                        {selectedPost.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      <span className={language === 'ur' ? 'font-urdu' : ''}>{selectedPost.authorName}</span>
                      <span>•</span>
                      <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <p
                  className={`text-base mb-6 whitespace-pre-line ${language === 'ur' ? 'font-urdu text-right' : ''}`}
                  style={{ color: 'var(--color-text)' }}
                >
                  {selectedPost.content}
                </p>

                <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <button className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    ❤️ {selectedPost.likes} {t({ en: 'Likes', ur: 'پسند', roman: 'Pasand' })}
                  </button>
                  <button className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    💬 {selectedPost.replies} {t({ en: 'Replies', ur: 'جوابات', roman: 'Jawabat' })}
                  </button>
                </div>
              </ModernCard>

              {/* Replies */}
              <ModernCard variant="outlined" padding="lg">
                <h3 className="font-semibold mb-4" style={{ color: 'var(--agri-dark)' }}>
                  {t({ en: 'Replies', ur: 'جوابات', roman: 'Jawabat' })} ({mockForumReplies[selectedPost.id]?.length || 0})
                </h3>

                <div className="space-y-4">
                  {mockForumReplies[selectedPost.id]?.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: 'var(--agri-dark)' }}
                      >
                        {reply.authorName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold text-sm ${language === 'ur' ? 'font-urdu' : ''}`} style={{ color: 'var(--agri-dark)' }}>
                            {reply.authorName}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={`text-sm ${language === 'ur' ? 'font-urdu text-right' : ''}`} style={{ color: 'var(--color-text)' }}>
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>
          )}

          {posts.length === 0 && (
            <ModernCard variant="outlined" padding="lg">
              <div className="text-center py-8">
                <p className="text-4xl mb-2">📭</p>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  {t({ en: 'No posts found', ur: 'کوئی پوسٹ نہیں ملی', roman: 'Koi Post Nahi Mili' })}
                </p>
              </div>
            </ModernCard>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
