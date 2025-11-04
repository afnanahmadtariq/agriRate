"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Lock, Mail } from 'lucide-react';
import ModernInput from '@/app/components/ModernInput';
import ModernButton from '@/app/components/ModernButton';
import { useAuth } from '@/app/lib/context/AuthContext';

export default function FarmerLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    credential: '', // Can be email or phone number
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [credentialType, setCredentialType] = useState<'email' | 'phone'>('email');

  // Check if input is email or phone
  const identifyCredentialType = (value: string): 'email' | 'phone' => {
    if (value.includes('@')) {
      return 'email';
    }
    return 'phone';
  };

  const handleCredentialChange = (value: string) => {
    setFormData({ ...formData, credential: value });
    // Auto-detect credential type
    if (value) {
      setCredentialType(identifyCredentialType(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.credential) {
      newErrors.credential = 'Email or phone number is required';
    } else {
      // Validate email format if it contains @
      if (formData.credential.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.credential)) {
          newErrors.credential = 'Please enter a valid email address';
        }
      }
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
      // For login, we can use the credential as-is
      // The backend should handle both email and phone
      await login(formData.credential, formData.password);
      
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
          <p className="text-lg font-semibold text-(--color-text) mb-1">
            Farmer Login
          </p>
          <p className="text-(--color-text-secondary)">
            Sign in to access your farm dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-(--color-surface) rounded-xl border border-(--color-border) shadow-(--shadow-lg) p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ModernInput
              id="credential"
              label="Email or Phone Number"
              type="text"
              placeholder="Enter your email or phone number"
              value={formData.credential}
              onChange={(e) => handleCredentialChange(e.target.value)}
              error={errors.credential}
              icon={credentialType === 'email' ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
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
                href="/auth/register"
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
          <p className="text-sm text-(--color-text-secondary) text-center mb-3">
            <strong>Demo Farmer Credentials:</strong>
          </p>
          <div className="space-y-2 text-xs text-(--color-text-muted) text-center">
            <p>📧 Email: farmer@example.com | Password: password</p>
            <p>📱 Phone: 03001234567 | Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
