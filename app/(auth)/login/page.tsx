'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModernButton } from '@/app/components/ModernButton';
import { ModernInput } from '@/app/components/ModernInput';
import { ModernCard } from '@/app/components/ModernCard';
import { useLanguage } from '@/app/hooks/useLanguage';
import OTPVerificationModal from '@/app/components/auth/otp-verification-modal';
import LanguageSelector from '@/app/components/auth/language-selector';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [useOTP, setUseOTP] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!emailOrPhone || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock login - redirect to farmer dashboard
      router.push('/farmer');
    } catch (err) {
      setError('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPRequest = () => {
    if (!emailOrPhone) {
      setError('Please enter email or phone number');
      return;
    }
    setShowOTPModal(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: 'var(--agri-dark)' }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {t({ en: 'AgriRate', ur: 'اگری ریٹ', roman: 'AgriRate' })}
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--agri-orange)' }}>
            {t({
              en: "Pakistan's Intelligent Farming Ecosystem",
              ur: 'پاکستان کی ذہین کاشتکاری کی نظام',
              roman: 'Pakistan ki Intelligent Farming Ecosystem',
            })}
          </p>
        </div>

        {/* Login Card */}
        <ModernCard variant="elevated" padding="lg" className="animate-slide-up">
          <form onSubmit={handleSignIn} className="space-y-4">
            <ModernInput
              label={t({ en: 'Email or Phone Number', ur: 'ای میل یا فون نمبر', roman: 'Email ya Phone Number' })}
              type="text"
              placeholder="name@example.com"
              value={emailOrPhone}
              onChange={(e) => {
                setEmailOrPhone(e.target.value);
                setError('');
              }}
              disabled={loading}
            />

            <ModernInput
              label={t({ en: 'Password', ur: 'پاس ورڈ', roman: 'Password' })}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              disabled={loading || useOTP}
            />

            {error && (
              <div
                className="p-3 border rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--color-error-light)',
                  borderColor: 'var(--color-error)',
                  color: 'var(--color-error)',
                }}
              >
                {error}
              </div>
            )}

            <ModernButton type="submit" variant="primary" size="md" disabled={loading || useOTP} loading={loading} className="w-full">
              {t({ en: 'Sign In', ur: 'سائن ان کریں', roman: 'Sign In' })}
            </ModernButton>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: '1px solid var(--color-border)' }} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
                {t({ en: 'Or continue with', ur: 'یا اس کے ساتھ جاری رکھیں', roman: 'Ya Is Ke Sath Jari Rahen' })}
              </span>
            </div>
          </div>

          {/* OTP Option */}
          <ModernButton
            variant="secondary"
            size="md"
            onClick={handleOTPRequest}
            disabled={loading}
            className="w-full"
            style={{ borderColor: 'var(--agri-orange)', color: 'var(--agri-orange)' }}
          >
            {t({ en: 'Sign In with OTP', ur: 'OTP کے ساتھ سائن ان کریں', roman: 'OTP ke Sath Sign In Karain' })}
          </ModernButton>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <ModernButton variant="secondary" size="md">
              Google
            </ModernButton>
            <ModernButton variant="secondary" size="md">
              Facebook
            </ModernButton>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 text-sm text-center mt-6">
            <button type="button" className="font-medium transition-colors" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Forgot Password?', ur: 'پاس ورڈ بھول گئے؟', roman: 'Password Bhool Gaye?' })}
            </button>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {t({ en: "Don't have an account?", ur: 'اکاؤنٹ نہیں ہے؟', roman: 'Account Nahi Hai?' })}{' '}
              <Link href="/register" className="font-medium hover:underline" style={{ color: 'var(--agri-orange)' }}>
                {t({ en: 'Sign Up', ur: 'سائن اپ کریں', roman: 'Sign Up' })}
              </Link>
            </p>
          </div>
        </ModernCard>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <LanguageSelector />
          <button className="text-white/70 hover:text-white transition-colors text-sm">
            {t({ en: 'Need Help?', ur: 'مدد چاہیے؟', roman: 'Madad Chahiye?' })}
          </button>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPVerificationModal
          emailOrPhone={emailOrPhone}
          onClose={() => setShowOTPModal(false)}
          onSuccess={() => {
            setShowOTPModal(false);
            router.push('/farmer');
          }}
        />
      )}
    </div>
  );
}
