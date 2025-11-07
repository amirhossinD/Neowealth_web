import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useStartups } from '../contexts/StartupContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const AddStartupPage: React.FC = () => {
  const { addStartup } = useStartups();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { userRole } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    sector: '',
    country: '',
    fundingGoal: '',
    description: '',
    logo: '',
    banner: '',
    founder: 'Current User', // Mock founder name
    tokenomics: {
        tokenName: 'TKN',
        supplyCap: 10000000
    }
  });

  if (userRole !== UserRole.Founder) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fundingGoalNumber = parseInt(formData.fundingGoal, 10);
    if (isNaN(fundingGoalNumber) || fundingGoalNumber <= 0) {
      alert('Please enter a valid funding goal.');
      return;
    }
    
    addStartup({
      name: formData.name,
      slogan: formData.slogan,
      sector: formData.sector,
      country: formData.country,
      fundingGoal: fundingGoalNumber,
      description: formData.description,
      logo: formData.logo || `https://picsum.photos/seed/${formData.name}/200`,
      banner: formData.banner || `https://picsum.photos/seed/${formData.name}-banner/1200/400`,
      founder: formData.founder,
      tokenomics: formData.tokenomics,
    });
    
    alert(t('startup_added_successfully'));
    navigate('/dashboard');
  };

  const fields = [
      { name: 'name', label: t('startup_name'), type: 'text' },
      { name: 'slogan', label: t('slogan'), type: 'text' },
      { name: 'sector', label: t('sector'), type: 'text' },
      { name: 'country', label: t('country'), type: 'text' },
      { name: 'fundingGoal', label: t('funding_goal_neo'), type: 'number' },
      { name: 'logo', label: t('logo_url'), type: 'url' },
      { name: 'banner', label: t('banner_url'), type: 'url' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('add_startup_title')}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{t('add_startup_subtitle')}</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-purple-950 p-8 rounded-lg shadow-lg space-y-6">
        {fields.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={formData[field.name as keyof typeof formData] as string}
              onChange={handleChange}
              required={field.name !== 'logo' && field.name !== 'banner'}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md"
            />
          </div>
        ))}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('description')}</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md"
          ></textarea>
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neo-gold hover:bg-neo-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neo-gold transition-all duration-300">
            {t('submit_startup')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStartupPage;