import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { fetchBankTransactions } from '../utils/bankUtils';

const BankBalanceCard = ({ bankAccounts, isLoading, onClose }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    // Set the first account as default selected
    if (bankAccounts && bankAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(bankAccounts[0]);
      loadTransactions(bankAccounts[0].id);
    }
  }, [bankAccounts, selectedAccount]);

  const loadTransactions = async (accountId) => {
    setLoadingTransactions(true);
    try {
      const data = await fetchBankTransactions(accountId);
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to load transactions. Please try again.");
      console.error(error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    // Simulate refresh API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Bank balances updated successfully!");
    }, 1500);
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    loadTransactions(account.id);
  };

  return (
    <motion.div 
      className="card space-y-6 overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white"
            >
              <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
            </motion.svg>
          </div>
          <h2 className="text-xl font-bold">Bank Balances</h2>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors relative"
            disabled={isRefreshing}
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              animate={{ rotate: isRefreshing ? 360 : 0 }}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </motion.svg>
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bankAccounts.map((account) => (
              <div 
                key={account.id}
                onClick={() => handleAccountSelect(account)}
                className={`card p-4 cursor-pointer transition-all ${
                  selectedAccount?.id === account.id 
                    ? 'ring-2 ring-primary' 
                    : 'hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${account.color} flex items-center justify-center`}>
                      {account.bankName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{account.bankName}</h3>
                      <p className="text-xs text-surface-500">{account.accountType} - {account.accountNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-surface-500 text-xs mb-1">Available Balance</p>
                  <p className="text-xl font-bold">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedAccount && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Recent Transactions - {selectedAccount.bankName}</h3>
              {loadingTransactions ? (
                <div className="flex justify-center items-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : transactions.length === 0 ? (
                <p className="text-center py-6 text-surface-500">No recent transactions found.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide pr-2">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="card p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">{transaction.merchant}</h4>
                          <p className="text-xs text-surface-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className={`font-medium ${
                        transaction.type === 'credit' 
                          ? 'text-green-500' 
                          : 'text-red-500'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default BankBalanceCard;