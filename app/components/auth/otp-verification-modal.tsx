'use client';

import React, { useState, useEffect } from 'react';
import { ModernButton } from '@/components/ModernButton';
import { ModernCard } from '@/components/ModernCard';
import { useLanguage } from '@/hooks/useLanguage';

interface OTPVerificationModalProps {
  emailOrPhone: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OTPVerificationModal({
  emailOrPhone,
  onClose,
  onSuccess,
}: OTPVerificationModalProps) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(180);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`#otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`#otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);

    try {
      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(180);
    setOtp(['', '', '', '', '', '']);
    setError('');
    console.log('OTP resent');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <ModernCard variant="elevated" padding="lg" className="w-full max-w-md animate-slide-up">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'OTP Verification', ur: 'تصدیق کوڈ', roman: 'OTP Verification' })}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t({
                en: 'Please enter the 6-digit verification code sent to your phone/email',
                ur: 'براہ کرم 6 ہندسے کا کوڈ درج کریں',
                roman: 'Braah Karim 6 Hind se ka Code Darj Karain',
              })}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              {emailOrPhone}
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium" style={{ color: 'var(--agri-dark)' }}>
              {t({ en: 'Enter OTP', ur: 'OTP درج کریں', roman: 'OTP Darj Karain' })}
            </label>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg transition-all focus:outline-none ${
                    success
                      ? 'border-green-500 bg-green-50 text-green-700 animate-pulse-success'
                      : 'border-[var(--color-border)] focus:border-[var(--agri-orange)] focus:ring-2'
                  }`}
                  style={{
                    backgroundColor: success ? '#f0fdf4' : 'var(--color-surface)',
                    color: success ? '#15803d' : 'var(--color-text)',
                  }}
                  disabled={loading || success}
                />
              ))}
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div
              className="p-3 border rounded-lg text-sm text-center font-medium flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--color-success-light)',
                borderColor: 'var(--color-success)',
                color: 'var(--color-success)',
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {t({ en: 'Verified Successfully!', ur: 'کامیابی سے تصدیق ہو گئی!', roman: 'Kamiyabi se Tasdiq!' })}
            </div>
          )}

          {/* Error Message */}
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

          {/* Timer and Resend */}
          <div className="text-center space-y-2">
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t({ en: 'Resend after', ur: 'بعد میں دوبارہ بھیجیں', roman: 'Baad Main Dobara Bhejan' })}:{' '}
              <span className="font-bold" style={{ color: 'var(--agri-orange)' }}>
                {formatTime(timeLeft)}
              </span>
            </p>
            <ModernButton
              variant="secondary"
              size="md"
              onClick={handleResend}
              disabled={timeLeft > 0 || loading}
              className="w-full"
            >
              {t({ en: 'Resend', ur: 'دوبارہ بھیجیں', roman: 'Dobara Bhejan' })}
            </ModernButton>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <ModernButton variant="secondary" size="md" onClick={onClose} disabled={loading} className="flex-1">
              {t({ en: 'Close', ur: 'بند کریں', roman: 'Band Karain' })}
            </ModernButton>
            <ModernButton
              variant="primary"
              size="md"
              onClick={handleVerify}
              disabled={loading || success || otp.some((digit) => !digit)}
              loading={loading}
              className="flex-1"
            >
              {t({ en: 'Verify', ur: 'تصدیق کریں', roman: 'Tasdiq Karain' })}
            </ModernButton>
          </div>
        </div>
      </ModernCard>
    </div>
  );
}
