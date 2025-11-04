"use client";

import { useState, useEffect } from 'react';
import { Users, Search, UserPlus, MoreVertical, Shield, CheckCircle, XCircle } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import ModernInput from '@/app/components/ModernInput';
import Table from '@/app/components/ui/Table';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import Modal from '@/app/components/ui/Modal';
import Select from '@/app/components/ui/Select';
import { User } from '@/app/types';
import { formatDateTime } from '@/app/lib/utils/format';

export default function UsersManagementPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock data - replace with real API calls
  const mockUsers: User[] = [
    {
      user_id: '1',
      full_name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      phone_number: '03001234567',
      role: 'farmer',
      is_active: true,
      created_at: '2025-10-15T10:00:00Z',
      updated_at: '2025-11-01T15:30:00Z',
    },
    {
      user_id: '2',
      full_name: 'Dr. Fatima Ali',
      email: 'fatima@example.com',
      phone_number: '03009876543',
      role: 'expert',
      is_active: true,
      created_at: '2025-09-20T08:00:00Z',
      updated_at: '2025-11-03T12:00:00Z',
    },
    {
      user_id: '3',
      full_name: 'Muhammad Bilal',
      phone_number: '03112345678',
      role: 'farmer',
      is_active: false,
      created_at: '2025-08-10T14:00:00Z',
      updated_at: '2025-10-20T09:00:00Z',
    },
    {
      user_id: '4',
      full_name: 'Admin User',
      email: 'admin@agrirate.com',
      phone_number: '03201234567',
      role: 'admin',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-11-04T10:00:00Z',
    },
  ];

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone_number.includes(searchQuery);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.is_active) ||
      (statusFilter === 'inactive' && !user.is_active);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      key: 'full_name',
      header: 'Name',
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-(--color-primary-light) flex items-center justify-center">
            <span className="text-sm font-semibold text-(--color-primary)">
              {user.full_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-(--color-text)">{user.full_name}</p>
            <p className="text-sm text-(--color-text-secondary)">{user.phone_number}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (user: User) => user.email || <span className="text-(--color-text-muted)">N/A</span>,
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          user.role === 'admin'
            ? 'bg-red-100 text-red-800'
            : user.role === 'expert'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      ),
    },
    {
      key: 'is_active',
      header: 'Status',
      render: (user: User) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          user.is_active
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {user.is_active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Joined',
      render: (user: User) => formatDateTime(user.created_at, 'MMM dd, yyyy'),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: User) => (
        <button
          onClick={() => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }}
          className="p-2 hover:bg-(--color-surface-alt) rounded-lg transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-(--color-text-secondary)" />
        </button>
      ),
    },
  ];

  const stats = {
    total: mockUsers.length,
    farmers: mockUsers.filter((u) => u.role === 'farmer').length,
    experts: mockUsers.filter((u) => u.role === 'expert').length,
    active: mockUsers.filter((u) => u.is_active).length,
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout role="admin">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading users..." />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                  User Management
                </h1>
                <p className="text-(--color-text-secondary)">
                  Manage all platform users and permissions
                </p>
              </div>
              <ModernButton variant="primary" size="md">
                <UserPlus className="w-5 h-5 mr-2" />
                Add User
              </ModernButton>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Total Users</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.total}</p>
                  </div>
                  <Users className="w-10 h-10 text-(--color-primary) opacity-20" />
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Farmers</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.farmers}</p>
                  </div>
                  <Users className="w-10 h-10 text-(--color-info) opacity-20" />
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Experts</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.experts}</p>
                  </div>
                  <Shield className="w-10 h-10 text-(--color-warning) opacity-20" />
                </div>
              </ModernCard>
              <ModernCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Active</p>
                    <p className="text-2xl font-bold text-(--color-text)">{stats.active}</p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-(--color-success) opacity-20" />
                </div>
              </ModernCard>
            </div>

            {/* Filters and Search */}
            <ModernCard>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <ModernInput
                    id="search"
                    label=""
                    placeholder="Search by name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                  />
                </div>
                <div className="flex gap-3">
                  <Select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    options={[
                      { value: 'all', label: 'All Roles' },
                      { value: 'farmer', label: 'Farmers' },
                      { value: 'expert', label: 'Experts' },
                      { value: 'admin', label: 'Admins' },
                    ]}
                  />
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={[
                      { value: 'all', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </div>
              </div>
            </ModernCard>

            {/* Users Table */}
            <ModernCard>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-(--color-text)">
                  All Users ({filteredUsers.length})
                </h3>
              </div>
              <Table data={filteredUsers} columns={columns} />
            </ModernCard>

            {/* User Details Modal */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedUser(null);
              }}
              title="User Details"
            >
              {selectedUser && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-(--color-border)">
                    <div className="w-16 h-16 rounded-full bg-(--color-primary-light) flex items-center justify-center">
                      <span className="text-2xl font-bold text-(--color-primary)">
                        {selectedUser.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-(--color-text)">
                        {selectedUser.full_name}
                      </h3>
                      <p className="text-(--color-text-secondary)">{selectedUser.phone_number}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-(--color-text-secondary)">
                        Email
                      </label>
                      <p className="text-(--color-text)">
                        {selectedUser.email || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-(--color-text-secondary)">
                        Role
                      </label>
                      <p className="text-(--color-text) capitalize">{selectedUser.role}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-(--color-text-secondary)">
                        Status
                      </label>
                      <p className="text-(--color-text)">
                        {selectedUser.is_active ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-(--color-text-secondary)">
                        Joined
                      </label>
                      <p className="text-(--color-text)">
                        {formatDateTime(selectedUser.created_at, 'MMM dd, yyyy hh:mm a')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-(--color-text-secondary)">
                        Last Updated
                      </label>
                      <p className="text-(--color-text)">
                        {formatDateTime(selectedUser.updated_at, 'MMM dd, yyyy hh:mm a')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-(--color-border)">
                    <ModernButton
                      variant={selectedUser.is_active ? 'secondary' : 'primary'}
                      size="md"
                      className="flex-1"
                    >
                      {selectedUser.is_active ? (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Activate
                        </>
                      )}
                    </ModernButton>
                    <ModernButton variant="secondary" size="md" className="flex-1">
                      Edit User
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
