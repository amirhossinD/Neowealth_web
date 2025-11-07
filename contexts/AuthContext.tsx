
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { UserRole, Wallet } from '../types';

interface AuthContextType {
  userRole: UserRole | null;
  wallet: Wallet | null;
  setUserRole: (role: UserRole | null) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
  updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRoleState] = useState<UserRole | null>(() => {
    return localStorage.getItem('userRole') as UserRole | null;
  });

  const [wallet, setWallet] = useState<Wallet | null>(() => {
    const storedWallet = localStorage.getItem('wallet');
    return storedWallet ? JSON.parse(storedWallet) : null;
  });

  const setUserRole = (role: UserRole | null) => {
    setUserRoleState(role);
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  };

  const connectWallet = () => {
    // Mock wallet connection
    const newWallet: Wallet = {
      address: `NEO_${Math.random().toString(36).substring(2, 15)}`,
      balance: Math.floor(Math.random() * 5000) + 1000, // Random balance between 1000 and 6000 NEO
    };
    setWallet(newWallet);
    localStorage.setItem('wallet', JSON.stringify(newWallet));
  };

  const disconnectWallet = () => {
    setWallet(null);
    localStorage.removeItem('wallet');
  };

  const updateBalance = (newBalance: number) => {
    if (wallet) {
      const updatedWallet = { ...wallet, balance: newBalance };
      setWallet(updatedWallet);
      localStorage.setItem('wallet', JSON.stringify(updatedWallet));
    }
  }

  return (
    <AuthContext.Provider value={{ userRole, wallet, setUserRole, connectWallet, disconnectWallet, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
   