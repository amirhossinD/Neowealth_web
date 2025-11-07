
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const teamMembers = [
    { name: 'Alex Doe', role: 'CEO & Founder', image: 'https://picsum.photos/seed/alex/300' },
    { name: 'Jane Smith', role: 'Lead Blockchain Dev', image: 'https://picsum.photos/seed/jane/300' },
    { name: 'Sam Wilson', role: 'UX/UI Designer', image: 'https://picsum.photos/seed/sam/300' },
    { name: 'Chris Lee', role: 'Marketing Lead', image: 'https://picsum.photos/seed/chris/300' },
  ];

  return (
    <div className="space-y-16">
      <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">{t('about_title')}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center">
          {t('about_mission')}
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">{t('about_vision')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center">
          {t('about_vision_text')}
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t('meet_the_team')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
   