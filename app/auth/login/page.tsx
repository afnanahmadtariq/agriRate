"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone, Lock } from 'lucide-react';
import ModernInput from '@/app/components/ModernInput';
import ModernButton from '@/app/components/ModernButton';
import { useAuth } from '@/app/lib/context/AuthContext';

export default function LoginPage() {
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
      router.push('/farmer/dashboard'); // Default redirect, will be updated based on role
    } catch (error: any) {
      setErrors({ submit: error.message || 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-surface-alt)]">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">
            🌾 AgriRate
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-lg)] p-8">
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
              <div className="p-4 bg-[var(--color-error-light)] border border-[var(--color-error)] rounded-lg">
                <p className="text-sm text-[var(--color-error)] font-medium">
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
            <p className="text-sm text-[var(--color-text-secondary)]">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-[var(--color-info-light)] border border-[var(--color-info)] rounded-lg">
          <p className="text-sm text-[var(--color-text-secondary)] text-center">
            <strong>Demo Mode:</strong> Backend API not configured yet.
          </p>
        </div>
      </div>
    </div>
  );
}
