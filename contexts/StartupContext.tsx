
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Startup } from '../types';
import { sampleStartups } from '../data/sampleStartups';

interface StartupContextType {
  startups: Startup[];
  getStartupById: (id: string) => Startup | undefined;
  addStartup: (startup: Omit<Startup, 'id' | 'raised' | 'roadmap' | 'updates'>) => void;
  investInStartup: (id: string, amount: number) => boolean;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'neowealth_startups';

export const StartupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [startups, setStartups] = useState<Startup[]>(() => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        return JSON.parse(localData);
      }
    } catch (error) {
      console.error("Error reading startups from localStorage", error);
    }
    // Initialize with sample data if localStorage is empty or corrupted
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleStartups));
    return sampleStartups;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(startups));
    } catch (error) {
      console.error("Error writing startups to localStorage", error);
    }
  }, [startups]);

  const getStartupById = (id: string): Startup | undefined => {
    return startups.find(s => s.id === id);
  };

  const addStartup = (startupData: Omit<Startup, 'id' | 'raised' | 'roadmap' | 'updates'>) => {
    const newStartup: Startup = {
      ...startupData,
      id: startupData.name.toLowerCase().replace(/\s+/g, '-'),
      raised: 0,
      roadmap: [],
      updates: [],
    };
    setStartups(prev => [...prev, newStartup]);
  };
  
  const investInStartup = (id: string, amount: number): boolean => {
    const startupIndex = startups.findIndex(s => s.id === id);
    if (startupIndex > -1) {
      const updatedStartups = [...startups];
      updatedStartups[startupIndex].raised += amount;
      setStartups(updatedStartups);
      return true;
    }
    return false;
  };

  return (
    <StartupContext.Provider value={{ startups, getStartupById, addStartup, investInStartup }}>
      {children}
    </StartupContext.Provider>
  );
};

export const useStartups = (): StartupContextType => {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error('useStartups must be used within a StartupProvider');
  }
  return context;
};
   