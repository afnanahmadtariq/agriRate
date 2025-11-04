"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Lock, User } from 'lucide-react';
import ModernInput from '@/app/components/ModernInput';
import ModernButton from '@/app/components/ModernButton';
import { useAuth } from '@/app/lib/context/AuthContext';

export default function FarmerLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    phone_number: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.phone_number, formData.password);
      // Redirect will be handled after we check the user role
      // Get the user from localStorage to check role
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.role === 'farmer') {
          router.push('/farmer/dashboard');
        } else if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        router.push('/farmer/dashboard');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <User className="w-5 h-5 text-(--color-success)" />
            <p className="text-lg font-semibold text-(--color-text)">
              Farmer Login
            </p>
          </div>
          <p className="text-(--color-text-secondary)">
            Sign in to access your farm dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-(--color-surface) rounded-xl border border-(--color-border) shadow-(--shadow-lg) p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </ModernButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-(--color-text-secondary)">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/farmer/register"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary-hover)"
              >
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center pt-4 border-t border-(--color-border)">
            <p className="text-sm text-(--color-text-secondary)">
              Are you an admin?{' '}
              <a
                href="/admin"
                className="font-semibold text-(--color-warning) hover:text-(--color-warning-hover)"
              >
                Admin Login
              </a>
            </p>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-(--color-info-light) border border-(--color-info) rounded-lg">
          <p className="text-sm text-(--color-text-secondary) text-center mb-2">
            <strong>Demo Farmer Credentials:</strong>
          </p>
          <p className="text-xs text-(--color-text-muted) text-center">
            Phone: 1234567890 | Password: password
          </p>
        </div>
      </div>
    </div>
  );
}
