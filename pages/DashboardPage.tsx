import React, { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useStartups } from '../contexts/StartupContext';
import { useLanguage } from '../contexts/LanguageContext';
import { UserRole } from '../types';
import StartupCard from '../components/StartupCard';
import { PlusCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { userRole, wallet } = useAuth();
  const { startups } = useStartups();
  const { t } = useLanguage();
  const [sectorFilter, setSectorFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  const uniqueSectors = useMemo(() => ['all', ...Array.from(new Set(startups.map(s => s.sector)))], [startups]);
  const uniqueCountries = useMemo(() => ['all', ...Array.from(new Set(startups.map(s => s.country)))], [startups]);

  const filteredStartups = useMemo(() => {
    return startups.filter(startup => {
      const sectorMatch = sectorFilter === 'all' || startup.sector === sectorFilter;
      const countryMatch = countryFilter === 'all' || startup.country === countryFilter;
      return sectorMatch && countryMatch;
    }).sort((a, b) => (b.raised / b.fundingGoal) - (a.raised / a.fundingGoal));
  }, [startups, sectorFilter, countryFilter]);


  if (!userRole) {
    return <Navigate to="/signin" />;
  }

  const InvestorDashboard = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('dashboard_investor_title')}</h1>
      { !wallet && <p className="mb-6 text-yellow-600 dark:text-yellow-400">Please connect your wallet to invest.</p>}
      
      {/* Filters */}
      <div className="mb-8 p-4 bg-white dark:bg-purple-950 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="sector-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('filter_by_sector')}</label>
          <select id="sector-filter" value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md">
            {uniqueSectors.map(sector => <option key={sector} value={sector}>{sector === 'all' ? t('all_sectors') : t(sector)}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="country-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('filter_by_country')}</label>
          <select id="country-filter" value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md">
            {uniqueCountries.map(country => <option key={country} value={country}>{country === 'all' ? t('all_countries') : t(country)}</option>)}
          </select>
        </div>
      </div>

      {filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStartups.map(startup => <StartupCard key={startup.id} startup={startup} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">{t('no_startups_found')}</p>
      )}
    </div>
  );

  const FounderDashboard = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard_founder_title')}</h1>
        <Link to="/add-startup" className="flex items-center gap-2 px-4 py-2 bg-neo-gold hover:bg-neo-gold-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
          <PlusCircle size={20} />
          {t('add_new_startup')}
        </Link>
      </div>
      {/* For this demo, we assume founders see all startups. A real app would filter by owner. */}
      {startups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {startups.map(startup => <StartupCard key={startup.id} startup={startup} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">{t('no_startups_added')}</p>
      )}
    </div>
  );

  return userRole === UserRole.Investor ? <InvestorDashboard /> : <FounderDashboard />;
};

export default DashboardPage;