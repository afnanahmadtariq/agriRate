'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/app/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: { en: string; ur: string; roman: string }) => string;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Load language from localStorage
    const saved = localStorage.getItem('agrirate-language') as Language;
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
      setIsRTL(saved === 'ur');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setIsRTL(lang === 'ur');
    localStorage.setItem('agrirate-language', lang);

    // Set direction on html element
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang === 'ur' ? 'ur' : 'en';
    }
  };

  const t = (translations: { en: string; ur: string; roman: string }) => {
    return translations[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}
