import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [currentTab, setCurrentTab] = useState('send');
  const CreditCard = getIcon('CreditCard');
  const Send = getIcon('SendHorizonal');
  const Wallet = getIcon('Wallet');
  const History = getIcon('ClockRewind');
  
  // Recent transactions data
  const [recentTransactions] = useState([
    { id: 1, name: 'Sarah Johnson', amount: -25.99, date: '2023-04-12', type: 'outgoing', avatar: 'https://source.unsplash.com/100x100/?portrait,woman,1' },
    { id: 2, name: 'Coffee Shop', amount: -4.50, date: '2023-04-10', type: 'outgoing', avatar: 'https://source.unsplash.com/100x100/?coffee,shop' },
    { id: 3, name: 'Michael Roberts', amount: 120.00, date: '2023-04-08', type: 'incoming', avatar: 'https://source.unsplash.com/100x100/?portrait,man,1' },
    { id: 4, name: 'Grocery Store', amount: -32.75, date: '2023-04-05', type: 'outgoing', avatar: 'https://source.unsplash.com/100x100/?grocery,store' }
  ]);
  
  // Wallet balance
  const [balance] = useState(1256.78);
  
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
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
              {getIcon('Plus')({ className: "w-4 h-4" })}
              <span>Add Money</span>
            </button>
            <button 
              onClick={() => toast.info("Withdraw feature coming soon!")}
              className="bg-white/20 hover:bg-white/30 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              {getIcon('ArrowDownToLine')({ className: "w-4 h-4" })}
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </motion.div>
      
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
              {getIcon('Download')({ 
                className: `w-4 h-4 ${currentTab === 'request' ? 'text-primary' : ''}` 
              })}
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
              {getIcon('ScanLine')({ 
                className: `w-4 h-4 ${currentTab === 'scan' ? 'text-primary' : ''}` 
              })}
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
            {getIcon('ChevronRight')({ className: "w-4 h-4" })}
          </button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="card p-4 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toast.info(`Transaction details for ${transaction.name}`)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={transaction.avatar} 
                    alt={transaction.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{transaction.name}</h4>
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
          ))}
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
            { icon: 'Ticket', label: 'Tickets', color: 'from-emerald-500 to-teal-500' },
            { icon: 'Bus', label: 'Transport', color: 'from-sky-500 to-blue-500' }
          ].map((item, index) => {
            const ItemIcon = getIcon(item.icon);
            return (
              <div 
                key={index}
                onClick={() => toast.info(`${item.label} feature coming soon!`)}
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

export default Home;