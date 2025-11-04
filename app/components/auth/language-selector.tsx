'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Language } from '@/types';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰' },
    { code: 'roman', label: 'Roman Urdu', flag: '🇵🇰' },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all
            ${
              language === lang.code
                ? 'bg-[var(--agri-orange)] text-white shadow-md'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] border border-[var(--color-border)]'
            }
          `}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
