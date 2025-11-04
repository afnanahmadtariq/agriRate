"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Lock, Shield } from 'lucide-react';
import ModernInput from '@/app/components/ModernInput';
import ModernButton from '@/app/components/ModernButton';
import { useAuth } from '@/app/lib/context/AuthContext';

export default function AdminLoginPage() {
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
      // Check user role after login
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          setErrors({ submit: 'Access denied. Admin credentials required.' });
          // Log out non-admin users
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
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
            <Shield className="w-5 h-5 text-(--color-warning)" />
            <p className="text-lg font-semibold text-(--color-text)">
              Admin Portal
            </p>
          </div>
          <p className="text-(--color-text-secondary)">
            Authorized personnel only
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-(--color-surface) rounded-xl border-2 border-(--color-warning) shadow-(--shadow-lg) p-8">
          <div className="mb-6 p-3 bg-(--color-warning-light) border border-(--color-warning) rounded-lg">
            <p className="text-sm text-(--color-text) text-center font-medium">
              🔐 Administrator Access Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ModernInput
              id="phone_number"
              label="Admin Phone Number"
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
              label="Admin Password"
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
              {isLoading ? 'Verifying...' : 'Sign In as Admin'}
            </ModernButton>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-(--color-border)">
            <p className="text-sm text-(--color-text-secondary)">
              Not an admin?{' '}
              <Link
                href="/"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary-hover)"
              >
                Go to Homepage
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-(--color-warning-light) border border-(--color-warning) rounded-lg">
          <p className="text-sm text-(--color-text-secondary) text-center mb-2">
            <strong>Demo Admin Credentials:</strong>
          </p>
          <p className="text-xs text-(--color-text-muted) text-center">
            Phone: admin | Password: admin123
          </p>
        </div>

        <div className="mt-4 p-4 bg-(--color-error-light) border border-(--color-error) rounded-lg">
          <p className="text-sm text-(--color-text-secondary) text-center">
            ⚠️ Unauthorized access attempts will be logged and reported
          </p>
        </div>
      </div>
    </div>
  );
}
