"use client";

import { useState, useEffect } from 'react';
import { MessageSquare, Search, Eye, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import ModernInput from '@/app/components/ModernInput';
import Table from '@/app/components/ui/Table';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import Modal from '@/app/components/ui/Modal';
import Select from '@/app/components/ui/Select';
import { ForumPost } from '@/app/types';
import { formatDateTime } from '@/app/lib/utils/format';

export default function ForumManagementPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock data
  const mockPosts: ForumPost[] = [
    {
      _id: '1',
      user_id: 'user1',
      user_name: 'Ahmed Khan',
      title: 'Best practices for wheat cultivation in winter?',
      body: 'I need advice on wheat cultivation during winter season in Multan region. What are the best irrigation practices?',
      category: 'Crop Cultivation',
      language: 'en',
      likes: 15,
      created_at: '2025-11-03T10:00:00Z',
      updated_at: '2025-11-03T10:00:00Z',
      comments: [
        {
          comment_id: '1',
          user_id: 'expert1',
          user_name: 'Dr. Fatima',
          comment_text: 'For winter wheat, ensure proper drainage and use drip irrigation...',
          created_at: '2025-11-03T11:00:00Z',
          updated_at: '2025-11-03T11:00:00Z',
        },
      ],
    },
    {
      _id: '2',
      user_id: 'user2',
      user_name: 'Muhammad Bilal',
      title: 'Cotton crop pest control',
      body: 'My cotton crop is being affected by pests. What organic pesticides can I use?',
      category: 'Pest Control',
      language: 'en',
      likes: 8,
      created_at: '2025-11-02T14:30:00Z',
      updated_at: '2025-11-02T14:30:00Z',
      comments: [],
    },
    {
      _id: '3',
      user_id: 'user3',
      user_name: 'Ali Hassan',
      title: 'Rice market prices dropping',
      body: 'Rice prices have dropped significantly in Lahore. Should I hold or sell?',
      category: 'Market Discussion',
      language: 'en',
      likes: 23,
      created_at: '2025-11-01T09:00:00Z',
      updated_at: '2025-11-01T09:00:00Z',
      comments: [
        {
          comment_id: '2',
          user_id: 'user4',
          comment_text: 'I think prices will go up next week...',
          created_at: '2025-11-01T10:00:00Z',
          updated_at: '2025-11-01T10:00:00Z',
        },
      ],
    },
  ];

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: 'title',
      header: 'Post',
      render: (post: ForumPost) => (
        <div className="max-w-md">
          <p className="font-medium text-(--color-text) mb-1">{post.title}</p>
          <p className="text-sm text-(--color-text-secondary) line-clamp-2">{post.body}</p>
        </div>
      ),
    },
    {
      key: 'user_name',
      header: 'Author',
      render: (post: ForumPost) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-(--color-primary-light) flex items-center justify-center">
            <span className="text-xs font-semibold text-(--color-primary)">
              {post.user_name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <span className="text-sm text-(--color-text)">{post.user_name || 'Unknown'}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (post: ForumPost) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {post.category}
        </span>
      ),
    },
    {
      key: 'likes',
      header: 'Likes',
      render: (post: ForumPost) => (
        <span className="font-medium text-(--color-text)">{post.likes}</span>
      ),
    },
    {
      key: 'comments',
      header: 'Replies',
      render: (post: ForumPost) => (
        <span className="font-medium text-(--color-text)">{post.comments?.length || 0}</span>
      ),
    },
    {
      key: 'created_at',
      header: 'Posted',
      render: (post: ForumPost) => (
        <span className="text-sm text-(--color-text-secondary)">
          {formatDateTime(post.created_at, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (post: ForumPost) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedPost(post);
              setIsModalOpen(true);
            }}
            className="p-1.5 hover:bg-(--color-info-light) text-(--color-info) rounded transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 hover:bg-(--color-error-light) text-(--color-error) rounded transition-colors"
            title="Delete Post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const stats = {
    total: mockPosts.length,
    today: 12,
    pending: 3,
    resolved: mockPosts.length - 3,
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout role="admin">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading forum posts..." />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                  Forum Management
                </h1>
                <p className="text-(--color-text-secondary)">
                  Monitor and moderate community discussions
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Total Posts</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.total}</p>
                  </div>
                  <MessageSquare className="w-10 h-10 text-(--color-primary) opacity-20" />
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Today</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.today}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xl">📝</span>
                  </div>
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Pending Review</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.pending}</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-(--color-warning) opacity-20" />
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Answered</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.resolved}</p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-(--color-success) opacity-20" />
                </div>
              </ModernCard>
            </div>

            {/* Search and Filters */}
            <ModernCard>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <ModernInput
                    id="search"
                    label=""
                    placeholder="Search posts by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Categories' },
                    { value: 'Crop Cultivation', label: 'Crop Cultivation' },
                    { value: 'Pest Control', label: 'Pest Control' },
                    { value: 'Market Discussion', label: 'Market Discussion' },
                    { value: 'Weather', label: 'Weather' },
                    { value: 'General', label: 'General' },
                  ]}
                />
              </div>
            </ModernCard>

            {/* Posts Table */}
            <ModernCard>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-(--color-text)">
                  Forum Posts ({filteredPosts.length})
                </h3>
              </div>
              <Table data={filteredPosts} columns={columns} />
            </ModernCard>

            {/* Post Details Modal */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedPost(null);
              }}
              title="Post Details"
            >
              {selectedPost && (
                <div className="space-y-4">
                  <div className="pb-4 border-b border-(--color-border)">
                    <h3 className="text-xl font-semibold text-(--color-text) mb-2">
                      {selectedPost.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-(--color-text-secondary)">
                      <span>by {selectedPost.user_name || 'Unknown'}</span>
                      <span>•</span>
                      <span>{formatDateTime(selectedPost.created_at, 'MMM dd, yyyy hh:mm a')}</span>
                      <span>•</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                        {selectedPost.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-(--color-text) leading-relaxed whitespace-pre-wrap">
                      {selectedPost.body}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-2 pb-4 border-b border-(--color-border)">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">❤️</span>
                      <span className="font-medium text-(--color-text)">{selectedPost.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-(--color-text-secondary)" />
                      <span className="font-medium text-(--color-text)">
                        {selectedPost.comments?.length || 0} replies
                      </span>
                    </div>
                  </div>

                  {selectedPost.comments && selectedPost.comments.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-(--color-text) mb-3">
                        Replies ({selectedPost.comments.length})
                      </h4>
                      <div className="space-y-3">
                        {selectedPost.comments.map((comment) => (
                          <div
                            key={comment.comment_id}
                            className="p-3 rounded-lg bg-(--color-surface-alt)"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-(--color-primary-light) flex items-center justify-center">
                                <span className="text-xs font-semibold text-(--color-primary)">
                                  {comment.user_name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-(--color-text)">
                                {comment.user_name || 'Unknown'}
                              </span>
                              <span className="text-xs text-(--color-text-muted)">
                                {formatDateTime(comment.created_at, 'MMM dd, hh:mm a')}
                              </span>
                            </div>
                            <p className="text-sm text-(--color-text-secondary)">
                              {comment.comment_text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-(--color-border)">
                    <ModernButton variant="secondary" size="md" className="flex-1">
                      Mark as Spam
                    </ModernButton>
                    <ModernButton variant="primary" size="md" className="flex-1">
                      Approve Post
                    </ModernButton>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
