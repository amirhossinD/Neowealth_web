import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { UserRole } from '../types';
import { User, Briefcase } from 'lucide-react';

const SignInPage: React.FC = () => {
  const { setUserRole } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-purple-950 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('signin_title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('signin_subtitle')}
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelect(UserRole.Investor)}
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-neo-gold hover:bg-neo-gold-dark transition-transform transform hover:scale-105"
          >
            <User className="me-3" />
            {t('i_am_investor')}
          </button>
          <button
            onClick={() => handleRoleSelect(UserRole.Founder)}
            className="w-full flex items-center justify-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            <Briefcase className="me-3" />
            {t('i_am_founder')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;