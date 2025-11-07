import React from 'react';
import { Link } from 'react-router-dom';
import { Startup } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import NeoIcon from './NeoIcon';

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  const { t } = useLanguage();
  const progress = (startup.raised / startup.fundingGoal) * 100;

  return (
    <div className="bg-white dark:bg-purple-950 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1">
      <img src={startup.banner} alt={`${startup.name} banner`} className="w-full h-32 object-cover" />
      <div className="p-6">
        <div className="flex items-start -mt-16">
          <img src={startup.logo} alt={`${startup.name} logo`} className="w-20 h-20 rounded-full border-4 border-white dark:border-purple-950 shadow-md" />
          <div className="ms-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{startup.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t(startup.slogan)}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-baseline text-sm">
            <span className="text-gray-600 dark:text-gray-300">{t('raised')}</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">{progress.toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
            <div
              className="bg-neo-gold h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-baseline text-sm mt-1">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">{startup.raised.toLocaleString()} <NeoIcon className="w-3 h-3" /></span>
            <span className="text-gray-500 dark:text-gray-400">{t('funding_goal')}: {startup.fundingGoal.toLocaleString()} <NeoIcon className="w-3 h-3" /></span>
          </div>
        </div>
        
        <div className="mt-6">
           <Link
            to={`/startup/${startup.id}`}
            className="w-full text-center block px-4 py-2 bg-neo-gold hover:bg-neo-gold-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {t('view_details')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;