import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, Briefcase, User, Home, Info, HelpCircle } from 'lucide-react';
import WalletConnect from './WalletConnect';
import NeoIcon from './NeoIcon';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { userRole } = useAuth();

  const navLinkClass = "flex items-center text-gray-600 dark:text-gray-300 hover:text-neo-gold dark:hover:text-neo-gold transition-colors duration-300";
  const activeNavLinkClass = "text-neo-gold dark:text-neo-gold font-semibold";

  const navItems = [
    { to: "/", text: t('nav_home'), icon: <Home size={18} /> },
    { to: "/dashboard", text: t('nav_dashboard'), icon: userRole === 'founder' ? <Briefcase size={18} /> : <User size={18} /> },
    { to: "/about", text: t('nav_about'), icon: <Info size={18} /> },
    { to: "/faq", text: t('nav_faq'), icon: <HelpCircle size={18} /> },
  ];

  return (
    <header className="bg-white/80 dark:bg-purple-950/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <NeoIcon className="w-8 h-8 text-neo-gold" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">{t('appName')}</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
              >
                <span className="me-2">{item.icon}</span>
                {item.text}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <WalletConnect />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;