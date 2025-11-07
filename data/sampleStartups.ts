import { Startup } from '../types';

export const sampleStartups: Startup[] = [
  {
    id: 'greenvolt-energy',
    name: 'GreenVolt Energy',
    logo: 'https://picsum.photos/seed/greenvolt/200',
    banner: 'https://picsum.photos/seed/greenvolt-banner/1200/400',
    slogan: 'greenvolt_slogan',
    sector: 'sector_renewable_energy',
    country: 'country_iran',
    founder: 'Sara Mohammadi',
    description: 'greenvolt_desc',
    fundingGoal: 150000,
    raised: 67000,
    tokenomics: {
      tokenName: 'GVE',
      supplyCap: 10000000,
    },
    roadmap: [
      { stage: 'Q1 2024', description: 'Prototype Development', date: '2024-03-01' },
      { stage: 'Q2 2024', description: 'Pilot Program Launch in 3 Villages', date: '2024-06-01' },
      { stage: 'Q4 2024', description: 'Scale Production', date: '2024-12-01' },
    ],
    updates: [
      { title: 'Successful Pilot!', content: 'Our pilot program has successfully brought power to over 500 homes.', date: '2024-07-15' },
    ],
  },
  {
    id: 'biotrace-diagnostics',
    name: 'BioTrace Diagnostics',
    logo: 'https://picsum.photos/seed/biotrace/200',
    banner: 'https://picsum.photos/seed/biotrace-banner/1200/400',
    slogan: 'biotrace_slogan',
    sector: 'sector_healthtech',
    country: 'country_singapore',
    founder: 'Dr. James Li',
    description: 'biotrace_desc',
    fundingGoal: 250000,
    raised: 120000,
    tokenomics: {
      tokenName: 'BTD',
      supplyCap: 5000000,
    },
     roadmap: [
      { stage: 'Q1 2024', description: 'Algorithm Refinement', date: '2024-02-15' },
      { stage: 'Q3 2024', description: 'Clinical Trials Phase 1', date: '2024-08-01' },
      { stage: 'Q1 2025', description: 'Regulatory Approval Submission', date: '2025-01-20' },
    ],
    updates: [
       { title: 'Clinical Trials Started', content: 'We are excited to announce the commencement of our Phase 1 clinical trials.', date: '2024-08-05' },
    ],
  },
  {
    id: 'neopay-microfinance',
    name: 'NeoPay MicroFinance',
    logo: 'https://picsum.photos/seed/neopay/200',
    banner: 'https://picsum.photos/seed/neopay-banner/1200/400',
    slogan: 'neopay_slogan',
    sector: 'sector_fintech',
    country: 'country_netherlands',
    founder: 'Amir Hossin Rezaei',
    description: 'neopay_desc',
    fundingGoal: 500000,
    raised: 300000,
    tokenomics: {
      tokenName: 'NPM',
      supplyCap: 15000000,
    },
    roadmap: [
      { stage: 'Q2 2024', description: 'Platform Beta Launch', date: '2024-05-10' },
      { stage: 'Q3 2024', description: 'Onboard 1000 Merchants', date: '2024-09-01' },
      { stage: 'Q1 2025', description: 'Expand to Southeast Asia', date: '2025-02-01' },
    ],
    updates: [
      { title: 'Beta is Live!', content: 'Our beta platform is now live for select merchants in Europe.', date: '2024-05-15' },
    ],
  },
  {
    id: 'edusphere-ai',
    name: 'EduSphere AI',
    logo: 'https://picsum.photos/seed/edusphere/200',
    banner: 'https://picsum.photos/seed/edusphere-banner/1200/400',
    slogan: 'edusphere_slogan',
    sector: 'sector_edtech',
    country: 'country_usa',
    founder: 'Emily Carter',
    description: 'edusphere_desc',
    fundingGoal: 200000,
    raised: 60000,
    tokenomics: {
      tokenName: 'EDU',
      supplyCap: 20000000,
    },
    roadmap: [
      { stage: 'Q1 2024', description: 'Core AI Model Development', date: '2024-03-20' },
      { stage: 'Q3 2024', description: 'Launch High School Math Module', date: '2024-07-15' },
      { stage: 'Q4 2024', description: 'Mobile App Release (iOS & Android)', date: '2024-11-01' },
    ],
    updates: [
       { title: 'Math Module Launched', content: 'Our AI-powered high school math module is now available to all users!', date: '2024-07-20' },
    ],
  },
];
