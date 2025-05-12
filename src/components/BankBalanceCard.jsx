import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { fetchBankTransactions } from '../services/bankTransactionService';

const BankBalanceCard = ({ bankAccounts, isLoading, onClose }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  
  const RefreshCw = getIcon('RefreshCw');
  const X = getIcon('X');
  const CreditCard = getIcon('CreditCard');

  useEffect(() => {
    // Set the first account as default selected
    if (bankAccounts && bankAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(bankAccounts[0]);
      loadTransactions(bankAccounts[0].Id);
    }
  }, [bankAccounts, selectedAccount]);

  const loadTransactions = async (accountId) => {
    setLoadingTransactions(true);
    try {
      const data = await fetchBankTransactions({ bankAccountId: accountId });
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
    loadTransactions(account.Id);
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
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Bank Balances</h2>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors relative"
            disabled={isRefreshing}
          >
            <motion.div
              animate={{ rotate: isRefreshing ? 360 : 0 }}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <X className="w-5 h-5" />
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
            {bankAccounts.length === 0 ? (
              <div className="col-span-3 text-center py-4">
                <p className="text-surface-500">No bank accounts found.</p>
              </div>
            ) : (
              bankAccounts.map((account) => (
                <div 
                  key={account.Id}
                  onClick={() => handleAccountSelect(account)}
                  className={`card p-4 cursor-pointer transition-all ${
                    selectedAccount?.Id === account.Id 
                      ? 'ring-2 ring-primary' 
                      : 'hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${account.color} flex items-center justify-center text-white`}>
                        {account.bank_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold">{account.bank_name}</h3>
                        <p className="text-xs text-surface-500">{account.account_type} - {account.account_number}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-surface-500 text-xs mb-1">Available Balance</p>
                    <p className="text-xl font-bold">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedAccount && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Recent Transactions - {selectedAccount.bank_name}</h3>
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
                      key={transaction.Id}
                      className="card p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
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