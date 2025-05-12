import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import MainFeature from '../components/MainFeature';
import BankBalanceCard from '../components/BankBalanceCard';
import getIcon from '../utils/iconUtils';
import { fetchTransactions } from '../services/transactionService';
import { fetchBankAccounts } from '../services/bankAccountService';
import { fetchWallet, createWallet } from '../services/walletService';

const Dashboard = () => {
  const user = useSelector(state => state.user.user);
  const [currentTab, setCurrentTab] = useState('send');
  const [showBankBalance, setShowBankBalance] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch transactions
        const transactionsData = await fetchTransactions({ limit: 4 });
        setRecentTransactions(transactionsData);
        
        // Fetch bank accounts
        const bankAccountsData = await fetchBankAccounts();
        setBankAccounts(bankAccountsData);
        
        // Fetch or create wallet
        let walletData = await fetchWallet();
        if (!walletData) {
          // Create a wallet if none exists
          walletData = await createWallet({
            Name: `${user.firstName}'s Wallet`,
            balance: 1000 // Default starting balance
          });
        }
        
        if (walletData) {
          setBalance(walletData.balance || 0);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Failed to load some data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  const CreditCard = getIcon('CreditCard');
  const Send = getIcon('SendHorizonal');
  const Download = getIcon('Download');
  const ScanLine = getIcon('ScanLine');
  const Wallet = getIcon('Wallet');
  const Plus = getIcon('Plus');
  const ArrowDownToLine = getIcon('ArrowDownToLine');
  const ChevronRight = getIcon('ChevronRight');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const handleCheckBalance = () => {
    setIsCheckingBalance(true);
    setShowBankBalance(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsCheckingBalance(false);
      toast.success("Bank balances updated successfully!");
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Welcome Message */}
      <motion.div
        variants={itemVariants}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome back, <span className="text-primary">{user?.firstName || 'User'}</span>
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          Here's an overview of your finances
        </p>
      </motion.div>
      
      {/* Balance Card */}
      <motion.div 
        variants={itemVariants}
        className="card bg-gradient-to-r from-primary to-secondary text-white overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/4 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-x-1/6 translate-y-1/3"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium opacity-80">Your Balance</h2>
            <CreditCard className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-3xl font-bold mb-4">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={() => toast.info("Add money feature coming soon!")}
              className="bg-white/20 hover:bg-white/30 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Money</span>
            </button>
            <button 
              onClick={() => toast.info("Withdraw feature coming soon!")}
              className="bg-white/20 hover:bg-white/30 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Bank Balance Section */}
      {showBankBalance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <BankBalanceCard 
            bankAccounts={bankAccounts} 
            isLoading={isCheckingBalance} 
            onClose={() => setShowBankBalance(false)}
          />
        </motion.div>
      )}
      
      {/* Main Feature Section */}
      <motion.div 
        variants={itemVariants}
        className="mt-8"
      >
        <div className="flex justify-center mb-6">
          <div className="p-1 bg-surface-100 dark:bg-surface-700 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
            <button 
              onClick={() => setCurrentTab('send')}
              className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                currentTab === 'send' 
                  ? 'bg-white dark:bg-surface-800 shadow-soft' 
                  : 'hover:bg-white/50 dark:hover:bg-surface-600'
              }`}
            >
              <Send className={`w-4 h-4 ${currentTab === 'send' ? 'text-primary' : ''}`} />
              <span className={currentTab === 'send' ? 'font-medium text-primary' : ''}>Send Money</span>
            </button>
            <button 
              onClick={() => setCurrentTab('request')}
              className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                currentTab === 'request' 
                  ? 'bg-white dark:bg-surface-800 shadow-soft' 
                  : 'hover:bg-white/50 dark:hover:bg-surface-600'
              }`}
            >
              <Download className={`w-4 h-4 ${currentTab === 'request' ? 'text-primary' : ''}`} />
              <span className={currentTab === 'request' ? 'font-medium text-primary' : ''}>Request</span>
            </button>
            <button 
              onClick={() => setCurrentTab('scan')}
              className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                currentTab === 'scan' 
                  ? 'bg-white dark:bg-surface-800 shadow-soft' 
                  : 'hover:bg-white/50 dark:hover:bg-surface-600'
              }`}
            >
              <ScanLine className={`w-4 h-4 ${currentTab === 'scan' ? 'text-primary' : ''}`} />
              <span className={currentTab === 'scan' ? 'font-medium text-primary' : ''}>Scan QR</span>
            </button>
            <button 
              onClick={() => setCurrentTab('cards')}
              className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                currentTab === 'cards' 
                  ? 'bg-white dark:bg-surface-800 shadow-soft' 
                  : 'hover:bg-white/50 dark:hover:bg-surface-600'
              }`}
            >
              <Wallet className={`w-4 h-4 ${currentTab === 'cards' ? 'text-primary' : ''}`} />
              <span className={currentTab === 'cards' ? 'font-medium text-primary' : ''}>Cards</span>
            </button>
          </div>
        </div>
        
        <MainFeature activeTab={currentTab} />
      </motion.div>
      
      {/* Recent Transactions */}
      <motion.div 
        variants={itemVariants}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button 
            onClick={() => toast.info("View all transactions coming soon!")}
            className="text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-surface-500 dark:text-surface-400">No recent transactions found.</p>
            </div>
          ) : (
            recentTransactions.map((transaction) => (
              <div 
                key={transaction.Id}
                className="card p-4 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => toast.info(`Transaction details for ${transaction.Name}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={transaction.avatar || 'https://source.unsplash.com/100x100/?portrait'} 
                      alt={transaction.Name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.Name}</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {new Date(transaction.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className={`font-medium ${
                  transaction.type === 'incoming' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {transaction.type === 'incoming' ? '+' : '-'}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
      
      {/* Quick Access */}
      <motion.div 
        variants={itemVariants}
        className="mt-8"
      >
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: 'Receipt', label: 'Bills', color: 'from-purple-500 to-pink-500' },
            { icon: 'ShoppingBag', label: 'Shopping', color: 'from-amber-500 to-orange-500' },
            { icon: 'Building', label: 'Bank Balance', color: 'from-emerald-500 to-teal-500', 
              onClick: handleCheckBalance },
            { icon: 'Bus', label: 'Transport', color: 'from-sky-500 to-blue-500' }
          ].map((item, index) => {
            const ItemIcon = getIcon(item.icon);
            return (
              <div 
                key={index}
                onClick={item.onClick || (() => toast.info(`${item.label} feature coming soon!`))}
                className="card flex flex-col items-center justify-center py-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-3`}>
                  <ItemIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-center font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;