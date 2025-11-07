import React, { useState, FormEvent } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FaqPage: React.FC = () => {
  const { t } = useLanguage();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
  ];

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(t('message_sent'));
    setContactForm({ name: '', email: '', message: '' });
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({...contactForm, [e.target.name]: e.target.value });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <section>
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">{t('faq_title')}</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-purple-950 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t('contact_title')}</h2>
        <form onSubmit={handleContactSubmit} className="bg-white dark:bg-purple-950 p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact_form_name')}</label>
            <input type="text" name="name" id="name" required value={contactForm.name} onChange={handleContactChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact_form_email')}</label>
            <input type="email" name="email" id="email" required value={contactForm.email} onChange={handleContactChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact_form_message')}</label>
            <textarea name="message" id="message" rows={4} required value={contactForm.message} onChange={handleContactChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-neo-gold focus:border-neo-gold sm:text-sm rounded-md"></textarea>
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-neo-gold hover:bg-neo-gold-dark text-white font-bold rounded-lg shadow-md transition-all">
            {t('send_message')}
          </button>
        </form>
      </section>
    </div>
  );
};

export default FaqPage;