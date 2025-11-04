"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User, Phone, Mail, Lock } from 'lucide-react';
import ModernInput from '@/app/components/ModernInput';
import ModernButton from '@/app/components/ModernButton';
import { useAuth } from '@/app/lib/context/AuthContext';
import { authApi } from '@/app/lib/api/endpoints';
import { authHelpers } from '@/app/lib/api/client';

export default function FarmerRegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'farmer' as const,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required';
    }
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Use authApi to register
      const response = await authApi.register(formData);
      
      if (response.success && response.data) {
        // Store token and user data
        authHelpers.setToken(response.data.token);
        authHelpers.setUser(response.data.user as unknown as Record<string, unknown>);
        
        // Call context register to update state
        await register(formData);
        
        // Redirect to dashboard based on role
        if (response.data.user.role === 'farmer') {
          router.push('/farmer/dashboard');
        } else if (response.data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-(--color-surface-alt)">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="AgriRate" width={64} height={64} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-(--color-primary) mb-2">
            AgriRate
          </h1>
          <p className="text-(--color-text-secondary)">
            Create your farmer account
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-(--color-surface) rounded-xl border border-(--color-border) shadow-(--shadow-lg) p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ModernInput
              id="full_name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              error={errors.full_name}
              icon={<User className="w-5 h-5" />}
              required
            />

            <ModernInput
              id="phone_number"
              label="Phone Number"
              type="tel"
              placeholder="03XX-XXXXXXX"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              error={errors.phone_number}
              icon={<Phone className="w-5 h-5" />}
              required
            />

            <ModernInput
              id="email"
              label="Email (Optional)"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              icon={<Mail className="w-5 h-5" />}
            />

            <ModernInput
              id="password"
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            <ModernInput
              id="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({ ...formData, confirm_password: e.target.value })
              }
              error={errors.confirm_password}
              icon={<Lock className="w-5 h-5" />}
              required
            />

            {errors.submit && (
              <div className="p-4 bg-(--color-error-light) border border-(--color-error) rounded-lg">
                <p className="text-sm text-(--color-error) font-medium">
                  {errors.submit}
                </p>
              </div>
            )}

            <ModernButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Farmer Account'}
            </ModernButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-(--color-text-secondary)">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary-hover)"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
