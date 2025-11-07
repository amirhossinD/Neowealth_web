import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    localStorage.setItem('language', language);
    
    if (dir === 'rtl') {
      document.body.style.fontFamily = 'Vazirmatn, sans-serif';
    } else {
      document.body.style.fontFamily = 'Inter, sans-serif';
    }

    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        // Paths for fetch are relative to the index.html file.
        const response = await fetch(`./locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${language}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(error);
        // Fallback to empty object, which will cause keys to be displayed as text.
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTranslations();

  }, [language, dir]);

  const t = useCallback((key: string, replacements?: { [key: string]: string }) => {
    let translation = translations[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        translation = translation.replace(`{${rKey}}`, replacements[rKey]);
      });
    }
    return translation;
  }, [translations]);

  if (isLoading) {
    // Show a simple loading state to prevent flash of untranslated content
    return <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
