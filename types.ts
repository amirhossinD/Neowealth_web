
export interface Startup {
  id: string;
  name: string;
  logo: string;
  banner: string;
  slogan: string;
  sector: string;
  country: string;
  founder: string;
  description: string;
  fundingGoal: number;
  raised: number;
  tokenomics: {
    tokenName: string;
    supplyCap: number;
  };
  roadmap: { stage: string; description: string; date: string }[];
  updates: { title: string; content: string; date: string }[];
}

export enum UserRole {
  Investor = 'investor',
  Founder = 'founder',
}

export interface Wallet {
  address: string;
  balance: number;
}
   