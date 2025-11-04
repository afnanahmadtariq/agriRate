'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ModernButton } from '@/app/components/ModernButton';
import { ModernInput } from '@/app/components/ModernInput';
import { ModernCard } from '@/app/components/ModernCard';
import { useLanguage } from '@/app/hooks/useLanguage';
import LanguageSelector from '@/app/components/auth/language-selector';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Basic Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2: Farm Details
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [crops, setCrops] = useState('');

  // Step 3: Preferences
  const [communicationMethod, setCommunicationMethod] = useState('sms');

  const validateStep1 = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!region || !district || !farmLocation || !crops) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step < 3) setStep((step + 1) as 1 | 2 | 3);
  };

  const handleBack = () => {
    setError('');
    if (step > 1) setStep((step - 1) as 1 | 2 | 3);
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Registration successful');
      router.push('/farmer');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2 rounded-full transition-all ${s === step ? 'w-8' : 'w-2'}`}
          style={{
            backgroundColor: s <= step ? 'var(--agri-orange)' : 'var(--color-border)',
          }}
        />
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: 'var(--agri-dark)' }}>
        {t({ en: 'Basic Information', ur: 'بنیادی معلومات', roman: 'Bunyadi Maloomat' })}
      </h3>

      <ModernInput
        label={t({ en: 'Full Name', ur: 'مکمل نام', roman: 'Mukammal Naam' })}
        type="text"
        placeholder="Ahmad Khan"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <ModernInput
        label={t({ en: 'Email or Phone', ur: 'ای میل یا فون', roman: 'Email ya Phone' })}
        type="text"
        placeholder="name@example.com or +92 300 1234567"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <ModernInput
        label={t({ en: 'Password', ur: 'پاس ورڈ', roman: 'Password' })}
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ModernInput
        label={t({ en: 'Confirm Password', ur: 'پاس ورڈ کی تصدیق', roman: 'Password Confirm Karain' })}
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: 'var(--agri-dark)' }}>
        {t({ en: 'Farm Details', ur: 'فارم کی تفصیلات', roman: 'Farm ki Tafseelat' })}
      </h3>

      <ModernInput
        label={t({ en: 'Region', ur: 'علاقہ', roman: 'Ilaqah' })}
        type="text"
        placeholder="Punjab, Sindh, KPK, Balochistan"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />

      <ModernInput
        label={t({ en: 'District', ur: 'ضلع', roman: 'Zila' })}
        type="text"
        placeholder="Lahore, Faisalabad, Multan..."
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />

      <ModernInput
        label={t({ en: 'Farm Location', ur: 'فارم کی جگہ', roman: 'Farm ki Jagah' })}
        type="text"
        placeholder="Village/Town name"
        value={farmLocation}
        onChange={(e) => setFarmLocation(e.target.value)}
      />

      <ModernInput
        label={t({ en: 'Crops You Grow', ur: 'آپ کی فصلیں', roman: 'Aap ki Faslen' })}
        type="text"
        placeholder="Wheat, Rice, Cotton..."
        value={crops}
        onChange={(e) => setCrops(e.target.value)}
        helperText={t({
          en: 'Separate multiple crops with commas',
          ur: 'متعدد فصلوں کو کوما سے الگ کریں',
          roman: 'Multiple crops ko comma se alag karain',
        })}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: 'var(--agri-dark)' }}>
        {t({ en: 'Preferences', ur: 'ترجیحات', roman: 'Tarjeehaat' })}
      </h3>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
          {t({ en: 'Communication Method', ur: 'مواصلات کا طریقہ', roman: 'Mawasalat ka Tareekah' })}
        </label>
        <div className="space-y-2">
          {['sms', 'whatsapp', 'call'].map((method) => (
            <label key={method} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-[var(--color-surface-muted)] transition-colors"
              style={{ borderColor: communicationMethod === method ? 'var(--agri-orange)' : 'var(--color-border)' }}>
              <input
                type="radio"
                name="communication"
                value={method}
                checked={communicationMethod === method}
                onChange={(e) => setCommunicationMethod(e.target.value)}
                className="w-4 h-4"
                style={{ accentColor: 'var(--agri-orange)' }}
              />
              <span className="text-sm font-medium capitalize">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div
        className="p-4 border rounded-lg"
        style={{ backgroundColor: 'var(--color-success-light)', borderColor: 'var(--color-success)' }}
      >
        <p className="text-sm" style={{ color: 'var(--color-success)' }}>
          {t({
            en: 'You\'re almost done! Review your information and submit to create your account.',
            ur: 'آپ تقریباً مکمل کر چکے ہیں! معلومات کا جائزہ لیں اور اپنا اکاؤنٹ بنانے کے لیے جمع کروائیں۔',
            roman: 'Aap Taqreeban Mukammal Kar Chuke Hain!',
          })}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: 'var(--agri-dark)' }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {t({ en: 'Join AgriRate', ur: 'اگری ریٹ میں شامل ہوں', roman: 'AgriRate Main Shamil Hon' })}
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--agri-orange)' }}>
            {t({
              en: 'Start your smart farming journey',
              ur: 'اپنی سمارٹ کاشتکاری کا سفر شروع کریں',
              roman: 'Apni Smart Kashtkari ka Safar Shuru Karain',
            })}
          </p>
        </div>

        {/* Registration Card */}
        <ModernCard variant="elevated" padding="lg" className="animate-slide-up">
          {renderStepIndicator()}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {error && (
            <div
              className="p-3 border rounded-lg text-sm mt-4"
              style={{
                backgroundColor: 'var(--color-error-light)',
                borderColor: 'var(--color-error)',
                color: 'var(--color-error)',
              }}
            >
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <ModernButton variant="secondary" size="md" onClick={handleBack} disabled={loading} className="flex-1">
                {t({ en: 'Back', ur: 'پیچھے', roman: 'Peechay' })}
              </ModernButton>
            )}
            {step < 3 ? (
              <ModernButton variant="primary" size="md" onClick={handleNext} className="flex-1">
                {t({ en: 'Next', ur: 'اگلا', roman: 'Agla' })}
              </ModernButton>
            ) : (
              <ModernButton variant="primary" size="md" onClick={handleSubmit} loading={loading} disabled={loading} className="flex-1">
                {t({ en: 'Complete Registration', ur: 'اندراج مکمل کریں', roman: 'Indraj Mukammal Karain' })}
              </ModernButton>
            )}
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {t({ en: 'Already have an account?', ur: 'پہلے سے اکاؤنٹ ہے؟', roman: 'Pehlay Say Account Hai?' })}{' '}
            <Link href="/login" className="font-medium hover:underline" style={{ color: 'var(--agri-orange)' }}>
              {t({ en: 'Sign In', ur: 'سائن ان کریں', roman: 'Sign In Karain' })}
            </Link>
          </div>
        </ModernCard>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
