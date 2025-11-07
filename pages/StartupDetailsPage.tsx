import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useStartups } from '../contexts/StartupContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { UserRole } from '../types';
import { Share2, Heart, Info, TrendingUp, BarChart2, MessageSquare } from 'lucide-react';
import NeoIcon from '../components/NeoIcon';

const StartupDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getStartupById, investInStartup } = useStartups();
  const { wallet, updateBalance, userRole } = useAuth();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');

  const startup = id ? getStartupById(id) : undefined;

  if (!startup) {
    return <Navigate to="/dashboard" />;
  }

  const progress = (startup.raised / startup.fundingGoal) * 100;

  const handleInvest = () => {
    const amount = parseFloat(investmentAmount);
    if (!wallet || !amount || amount <= 0) {
      alert(t('invalid_amount'));
      return;
    }
    if (wallet.balance < amount) {
      alert(t('insufficient_funds'));
      return;
    }

    if (investInStartup(startup.id, amount)) {
      updateBalance(wallet.balance - amount);
      alert(t('investment_successful'));
      setIsInvestModalOpen(false);
      setInvestmentAmount('');
    }
  };

  const tabs = [
    { id: 'overview', label: t('startup_details_overview'), icon: <Info size={18} /> },
    { id: 'roadmap', label: t('startup_details_roadmap'), icon: <TrendingUp size={18} /> },
    { id: 'tokenomics', label: t('startup_details_tokenomics'), icon: <BarChart2 size={18} /> },
    { id: 'updates', label: t('startup_details_updates'), icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="bg-white dark:bg-purple-950 rounded-lg shadow-xl overflow-hidden">
      <img className="w-full h-48 md:h-64 object-cover" src={startup.banner} alt={`${startup.name} banner`} />
      
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start -mt-24">
          <img className="w-32 h-32 rounded-full border-4 border-white dark:border-purple-950 shadow-lg" src={startup.logo} alt={`${startup.name} logo`} />
          <div className="sm:ms-6 mt-4 sm:mt-8 flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{startup.name}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{t(startup.slogan)}</p>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>{t(startup.sector)}</span> &bull; <span>{t(startup.country)}</span> &bull; <span>by {startup.founder}</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-8 flex gap-2">
            <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"><Heart /></button>
            <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"><Share2 /></button>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-1">{t('raised')}: {startup.raised.toLocaleString()} <NeoIcon className="w-4 h-4" /></span>
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">{t('funding_goal')}: {startup.fundingGoal.toLocaleString()} <NeoIcon className="w-4 h-4" /></span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div className="bg-neo-gold h-4 rounded-full text-center text-purple-950 text-xs font-bold" style={{ width: `${progress > 100 ? 100 : progress}%` }}>{progress.toFixed(1)}%</div>
            </div>
          </div>
          {userRole === UserRole.Investor && (
            <button 
              onClick={() => setIsInvestModalOpen(true)}
              disabled={!wallet}
              className="w-full sm:w-auto px-8 py-3 bg-neo-gold hover:bg-neo-gold-dark text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              {t('invest_now')}
            </button>
          )}
        </div>

        <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-neo-gold text-neo-gold'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'overview' && <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t(startup.description)}</p>}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              {startup.roadmap.length > 0 ? startup.roadmap.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-24 font-bold text-gray-800 dark:text-gray-100">{item.stage}</div>
                  <div className="ms-4 text-gray-600 dark:text-gray-300">{item.description}</div>
                </div>
              )) : <p className="text-gray-500 dark:text-gray-400">Roadmap not available yet.</p>}
            </div>
          )}
          {activeTab === 'tokenomics' && (
             <div className="space-y-2">
                <p><strong className="text-gray-800 dark:text-gray-100">Token Name:</strong> <span className="text-gray-600 dark:text-gray-300">{startup.tokenomics.tokenName}</span></p>
                <p><strong className="text-gray-800 dark:text-gray-100">Supply Cap:</strong> <span className="text-gray-600 dark:text-gray-300">{startup.tokenomics.supplyCap.toLocaleString()}</span></p>
            </div>
          )}
          {activeTab === 'updates' && (
            <div className="space-y-4">
               {startup.updates.length > 0 ? startup.updates.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-purple-900/50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                </div>
              )) : <p className="text-gray-500 dark:text-gray-400">No updates posted yet.</p>}
            </div>
          )}
        </div>
      </div>
      
      {isInvestModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-purple-950 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('invest_modal_title', { startupName: startup.name })}</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{t('your_balance')}: <span className="font-bold flex items-center gap-1">{wallet?.balance.toFixed(2)} <NeoIcon className="w-4 h-4" /></span></p>
            <div>
              <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('amount_to_invest')}</label>
              <input 
                type="number"
                id="investmentAmount"
                value={investmentAmount}
                onChange={e => setInvestmentAmount(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md"
                placeholder="0.00"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setIsInvestModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Cancel</button>
              <button onClick={handleInvest} className="px-4 py-2 bg-neo-gold text-white rounded-lg">{t('confirm_investment')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupDetailsPage;