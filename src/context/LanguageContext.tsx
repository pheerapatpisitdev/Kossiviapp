import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, type Locale } from '../i18n/translations';

type TranslationKey = keyof typeof translations.en;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: { n?: number; q?: string }) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'kossivi-locale';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      return saved === 'fr' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: { n?: number; q?: string }): string => {
      const value = translations[locale][key];
      if (typeof value === 'function') {
        if (key === 'cocktailsFound' && params?.n !== undefined) return (value as (n: number) => string)(params.n);
        if (key === 'noCocktailsFor' && params?.q !== undefined) return (value as (q: string) => string)(params.q);
      }
      return String(value);
    },
    [locale]
  );

  useEffect(() => {
    document.documentElement.lang = locale === 'fr' ? 'fr' : 'en';
    document.title = translations[locale].pageTitle;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
