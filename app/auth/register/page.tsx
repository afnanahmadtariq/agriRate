"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Phone, Mail, Lock } from 'lucide-react';
import ModernInput from '@/app/components/ModernInput';
import ModernButton from '@/app/components/ModernButton';
import Select from '@/app/components/ui/Select';
import { useAuth } from '@/app/lib/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'farmer' as 'farmer' | 'admin' | 'expert',
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
      await register(formData);
      router.push('/farmer/dashboard'); // Default redirect based on role
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setErrors({ submit: errorMessage });
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
            Create your account
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-lg)] p-8">
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

            <Select
              id="role"
              label="I am a"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as 'farmer' | 'admin' | 'expert',
                })
              }
              options={[
                { value: 'farmer', label: 'Farmer' },
                { value: 'expert', label: 'Agricultural Expert' },
                { value: 'admin', label: 'Administrator' },
              ]}
              required
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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </ModernButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
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
