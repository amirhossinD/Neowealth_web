import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useStartups } from '../contexts/StartupContext';
import StartupCard from '../components/StartupCard';
import { Zap, Target, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { startups } = useStartups();

  const featuredStartups = [...startups]
    .sort((a, b) => (b.raised / b.fundingGoal) - (a.raised / a.fundingGoal))
    .slice(0, 4);

  const steps = [
    { icon: <Zap className="w-10 h-10 text-neo-gold" />, title: t('step1_title'), desc: t('step1_desc') },
    { icon: <Target className="w-10 h-10 text-neo-gold" />, title: t('step2_title'), desc: t('step2_desc') },
    { icon: <Award className="w-10 h-10 text-neo-gold" />, title: t('step3_title'), desc: t('step3_desc') },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-white dark:bg-purple-950 rounded-lg shadow-inner">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
          {t('home_hero_title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          {t('home_hero_subtitle')}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-8 py-3 bg-neo-gold hover:bg-neo-gold-dark text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {t('explore_startups')}
          </Link>
          <Link
            to="/signin"
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {t('join_neowealth')}
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('how_it_works')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-purple-950 rounded-lg shadow-md">
              <div className="flex justify-center items-center mb-4 w-20 h-20 mx-auto bg-neo-gold/10 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Startups Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('featured_startups')}
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {featuredStartups.map(startup => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;