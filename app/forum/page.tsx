"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, Heart, MessageCircle, Eye, Trash2 } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import ModernInput from '@/app/components/ModernInput';
import Select from '@/app/components/ui/Select';
import Badge from '@/app/components/ui/Badge';
import Modal from '@/app/components/ui/Modal';
import Textarea from '@/app/components/ui/Textarea';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { formatRelativeTime } from '@/app/lib/utils/format';
import { useAuth } from '@/app/lib/context/AuthContext';
import { forumApi } from '@/app/lib/api/endpoints';
import type { ForumPost } from '@/app/types';

export default function ForumPage() {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [commentText, setCommentText] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    category: 'General',
    language: 'en' as const,
  });
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts on mount and when filters change
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const params: Parameters<typeof forumApi.getPosts>[0] = {
        limit: 50,
        sort: 'latest',
      };
      
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await forumApi.getPosts(params);
      if (response.success && response.data) {
        setPosts(response.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again.');
      // Fallback to empty array on error
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        fetchPosts();
      }
    }, 500);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post._id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    // Update selectedPost if it's being viewed
    if (selectedPost && selectedPost._id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim() || !user) return;

    const newComment = {
      comment_id: Date.now().toString(),
      user_name: user.full_name || 'Anonymous',
      comment_text: commentText,
      created_at: new Date().toISOString(),
    };

    setPosts(posts.map(post => 
      post._id === postId 
        ? { ...post, comments: [...(post.comments || []), newComment] }
        : post
    ));

    // Update selectedPost if it's being viewed
    if (selectedPost && selectedPost._id === postId) {
      setSelectedPost({
        ...selectedPost,
        comments: [...(selectedPost.comments || []), newComment],
      });
    }

    setCommentText('');
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post =>
      post._id === postId
        ? {
            ...post,
            comments: post.comments?.filter(c => c.comment_id !== commentId) || [],
          }
        : post
    ));

    // Update selectedPost if it's being viewed
    if (selectedPost && selectedPost._id === postId) {
      setSelectedPost({
        ...selectedPost,
        comments: selectedPost.comments?.filter(c => c.comment_id !== commentId) || [],
      });
    }
  };

  const handleCreatePost = () => {
    // Handle post creation
    console.log('Creating post:', newPost);
    setIsCreateModalOpen(false);
    setNewPost({ title: '', body: '', category: 'General' });
  };

  return (
    <ProtectedRoute allowedRoles={['farmer', 'admin', 'expert']}>
      <DashboardLayout role={user?.role === 'admin' ? 'admin' : 'farmer'}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                Community Forum
              </h1>
              <p className="text-(--color-text-secondary)">
                Share knowledge and learn from fellow farmers
              </p>
            </div>
            <ModernButton
              variant="primary"
              size="md"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </div>
            </ModernButton>
          </div>

          {/* Filters */}
          <ModernCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModernInput
                label=""
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
              <Select
                label=""
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'General', label: 'General' },
                  { value: 'Crop Advice', label: 'Crop Advice' },
                  { value: 'Crop Health', label: 'Crop Health' },
                  { value: 'Market Discussion', label: 'Market Discussion' },
                  { value: 'Technology', label: 'Technology' },
                ]}
              />
            </div>
          </ModernCard>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div 
                key={post._id}
                onClick={() => setSelectedPost(post)}
                className="cursor-pointer"
              >
                <ModernCard hoverable>
                  <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="w-12 h-12 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold shrink-0">
                    {post.user_name.charAt(0)}
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-(--color-text) mb-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
                          <span className="font-medium">{post.user_name}</span>
                          <span>•</span>
                          <span>{formatRelativeTime(post.created_at)}</span>
                        </div>
                      </div>
                      <Badge variant="info" size="sm">
                        {post.category}
                      </Badge>
                    </div>

                    <p className="text-(--color-text-secondary) mb-3 line-clamp-2">
                      {post.body}
                    </p>

                    {/* Post Stats */}
                    <div className="flex items-center gap-4 text-sm text-(--color-text-muted)">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikePost(post._id);
                        }}
                        className="flex items-center gap-1 hover:text-(--color-primary) transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-(--color-primary) transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments?.length || 0}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-(--color-primary) transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
                </ModernCard>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <ModernCard>
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-(--color-text-muted)" />
                <p className="text-lg font-medium text-(--color-text)">
                  No posts found
                </p>
                <p className="text-(--color-text-muted) mb-4">
                  Try adjusting your search or filters
                </p>
                <ModernButton
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Create First Post</span>
                  </div>
                </ModernButton>
              </div>
            </ModernCard>
          )}
        </div>

        {/* Post Detail Modal */}
        <Modal
          isOpen={selectedPost !== null}
          onClose={() => setSelectedPost(null)}
          title={selectedPost?.title || 'Post Details'}
          size="lg"
        >
          {selectedPost && (
            <div className="space-y-4">
              {/* Post Header */}
              <div className="pb-4 border-b border-(--color-border)">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold shrink-0">
                    {selectedPost.user_name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-(--color-text)">
                      {selectedPost.user_name}
                    </p>
                    <p className="text-sm text-(--color-text-muted)">
                      {formatRelativeTime(selectedPost.created_at)}
                    </p>
                  </div>
                  <Badge variant="info" size="sm">
                    {selectedPost.category}
                  </Badge>
                </div>
              </div>

              {/* Post Body */}
              <div>
                <p className="text-(--color-text) whitespace-pre-wrap">
                  {selectedPost.body}
                </p>
              </div>

              {/* Post Stats */}
              <div className="flex items-center gap-6 pt-4 border-t border-(--color-border) text-sm text-(--color-text-muted)">
                <button 
                  onClick={() => handleLikePost(selectedPost._id)}
                  className="flex items-center gap-2 hover:text-(--color-primary) transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>{selectedPost.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-(--color-primary) transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{selectedPost.comments?.length || 0} Comments</span>
                </button>
              </div>

              {/* Comments Section */}
              {selectedPost.comments && selectedPost.comments.length > 0 && (
                <div className="pt-4 border-t border-(--color-border)">
                  <h4 className="font-semibold text-(--color-text) mb-4">
                    Comments ({selectedPost.comments.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.comment_id} className="flex gap-3 p-3 bg-(--color-bg-secondary) rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-(--color-primary) flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {comment.user_name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-(--color-text)">
                              {comment.user_name}
                            </span>
                            <span className="text-xs text-(--color-text-muted)">
                              {formatRelativeTime(comment.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-(--color-text-secondary)">
                            {comment.comment_text}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(selectedPost._id, comment.comment_id)}
                          className="text-(--color-text-muted) hover:text-(--color-error) transition-colors shrink-0"
                          title="Delete comment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Comments State */}
              {(!selectedPost.comments || selectedPost.comments.length === 0) && (
                <div className="pt-4 border-t border-(--color-border) text-center py-6">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-(--color-text-muted)" />
                  <p className="text-sm text-(--color-text-muted)">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              )}

              {/* Reply/Comment Input */}
              <div className="pt-4 border-t border-(--color-border)">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Write a comment..."
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-2 justify-end mt-2">
                  <ModernButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedPost(null)}
                  >
                    Close
                  </ModernButton>
                  <ModernButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddComment(selectedPost._id)}
                  >
                    Post Comment
                  </ModernButton>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Create Post Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Post"
          size="lg"
        >
          <div className="space-y-4">
            <ModernInput
              label="Title"
              placeholder="Enter post title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />

            <Select
              label="Category"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              options={[
                { value: 'General', label: 'General' },
                { value: 'Crop Advice', label: 'Crop Advice' },
                { value: 'Crop Health', label: 'Crop Health' },
                { value: 'Market Discussion', label: 'Market Discussion' },
                { value: 'Technology', label: 'Technology' },
              ]}
              required
            />

            <Textarea
              label="Content"
              placeholder="Share your thoughts..."
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              rows={6}
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <ModernButton
                variant="secondary"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </ModernButton>
              <ModernButton variant="primary" onClick={handleCreatePost}>
                Post
              </ModernButton>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
