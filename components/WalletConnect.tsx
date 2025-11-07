import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Wallet as WalletIcon } from 'lucide-react';
import NeoIcon from './NeoIcon';

const WalletConnect: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useAuth();
  const { t } = useLanguage();

  const handleConnect = () => {
    // This simulates opening a Metamask-like modal
    alert("Connecting to mock wallet...");
    connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  if (wallet) {
    return (
      <div className="relative group">
        <div className="flex items-center gap-2 p-2 bg-neo-gold/10 dark:bg-neo-gold/20 text-neo-gold rounded-lg cursor-pointer">
          <WalletIcon size={20} />
          <div className="text-sm font-medium">
            <p className="truncate max-w-[100px]">{wallet.address}</p>
            <p className="font-bold flex items-center gap-1">{wallet.balance.toFixed(2)} <NeoIcon className="w-3 h-3" /></p>
          </div>
        </div>
        <div className="absolute top-full right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48 z-10">
           <button
            onClick={handleDisconnect}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {t('disconnect_wallet')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-4 py-2 bg-neo-gold hover:bg-neo-gold-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <WalletIcon size={20} />
      {t('connect_wallet')}
    </button>
  );
};

export default WalletConnect;