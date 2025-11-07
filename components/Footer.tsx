import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-purple-950 border-t border-gray-200 dark:border-purple-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            {t('footer_text')}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Language:</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-neo-gold text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              🇬🇧 {t('lang_en')}
            </button>
            <button
              onClick={() => setLanguage('fa')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'fa' ? 'bg-neo-gold text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              🇮🇷 {t('lang_fa')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;